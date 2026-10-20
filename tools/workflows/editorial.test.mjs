import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import adapter from './adapter.mjs';
import { digest, readApproval, normalizeInput, ensureFrozen, verifyModelSelection } from './editorial.mjs';

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'browserhub-flow-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, 'src/data'), { recursive: true });
  const directory = '.local/workflows/cycles/content-2026-10-20';
  await fs.mkdir(path.join(root, directory), { recursive: true });
  const file = { path: 'src/data/article.ts', sha256: digest('original') };
  await fs.writeFile(path.join(root, file.path), 'original');
  const review = { cycleId: 'content-2026-10-20', decision: 'approved', role: 'reviewer', modelRequested: 'gpt-6.1-sol', modelEffective: null, independentContext: true, files: [file] };
  const raw = JSON.stringify(review);
  await fs.writeFile(path.join(root, directory, 'review.json'), raw);
  const manifest = { schemaVersion: 1, cycleId: review.cycleId, files: [file], topics: ['fixture'], urls: ['https://browserhub.co/en/guides/fixture/', 'https://browserhub.co/zh-cn/guides/fixture/'], executor: { modelRequested: 'gpt-6-luna', modelEffective: null }, reviewPath: `${directory}/review.json`, reviewSha256: digest(raw) };
  await fs.writeFile(path.join(root, directory, 'editorial.json'), JSON.stringify(manifest));
  return { root, directory, manifest, review };
}

test('real file hashes and independent review are required, stale content cannot publish', async t => {
  const f = await fixture(t);
  const receipt = await readApproval(f.root, f.manifest.cycleId);
  assert.equal(receipt.manifest.files.length, 1);
  await fs.writeFile(path.join(f.root, 'src/data/article.ts'), 'changed after review');
  await assert.rejects(readApproval(f.root, f.manifest.cycleId), /Reviewed content changed/);
});

test('missing approval pauses before intent and malformed or forged review is rejected', async t => {
  const f = await fixture(t);
  const ready = adapter.workflows['content-cycle'].steps.find(step => step.id === 'editorial-ready');
  await fs.rm(path.join(f.root, f.directory, 'editorial.json'));
  const waiting = await ready.wait({ project: { root: f.root }, input: { cycleId: f.manifest.cycleId } });
  assert.equal(waiting.status, 'awaiting_editorial');
  const raw = JSON.stringify({ ...f.review, independentContext: false });
  await fs.writeFile(path.join(f.root, f.directory, 'review.json'), raw);
  await fs.writeFile(path.join(f.root, f.directory, 'editorial.json'), JSON.stringify({ ...f.manifest, reviewSha256: digest(raw) }));
  await assert.rejects(readApproval(f.root, f.manifest.cycleId), /Independent review/);
});

test('unrelated user edits and changed Git HEAD are preserved and block deployment', async t => {
  const f = await fixture(t);
  const ctx = { project: { root: f.root }, input: { cycleId: f.manifest.cycleId }, steps: {}, exec: async () => ({ exitCode: 0, stdout: ' M src/app/unrelated.tsx\n' }) };
  await assert.rejects(ensureFrozen(ctx), /Unreviewed worktree changes/);
  ctx.steps.checkpoint = { commit: 'reviewed' };
  ctx.exec = async (_command, args) => ({ exitCode: 0, stdout: args[0] === 'status' ? '' : 'another-commit\n' });
  await assert.rejects(ensureFrozen(ctx), /Git HEAD changed/);
});

test('manual model choice overrides role defaults only with explicit scoped evidence', () => {
  verifyModelSelection({ modelRequested: 'gpt-6-luna', modelEffective: null }, 'executor', 'gpt-6-luna');
  assert.throws(() => verifyModelSelection({ modelRequested: 'gpt-5.6-sol' }, 'executor', 'gpt-6-luna'), /Unapproved/);
  verifyModelSelection({ modelRequested: 'gpt-6.1-sol', selectionSource: 'human_task', humanOverride: { model: 'gpt-6.1-sol', originalRequest: '这次写作用 Sol', roles: ['executor'] } }, 'executor', 'gpt-6-luna');
  assert.throws(() => verifyModelSelection({ modelRequested: 'gpt-6-luna', modelEffective: 'gpt-5.6-sol' }, 'executor', 'gpt-6-luna'), /Actual/);
  assert.equal(normalizeInput({ cycleId: 'content-2026-10-20' }).authorization.external, false);
});

test('public LangGraph persists editorial wait and deduplicates a resumed completed task', async t => {
  const f = await fixture(t);
  const machine = JSON.parse(await fs.readFile(new URL('../../.local/workflows/runtime.local.json', import.meta.url), 'utf8'));
  const { Runtime } = await import(pathToFileURL(path.join(machine.runtimeRoot, 'index.mjs')));
  const registry = path.join(f.root, 'registry.json');
  const adapterPath = path.join(f.root, 'adapter.mjs');
  await fs.writeFile(adapterPath, `import fs from 'node:fs/promises'; export default {id:'fixture',workflows:{cycle:{version:'1',steps:[{id:'first',effect:'local',async run(ctx){await fs.writeFile(ctx.project.root+'/once','first');return {status:'checked'}}},{id:'wait',effect:'local',async wait({project}){try{await fs.access(project.root+'/ready');return false}catch{return {status:'awaiting_editorial'}}},async run(ctx){await fs.appendFile(ctx.project.root+'/once','-second');return {status:'done'}}}]}}};`);
  await fs.writeFile(registry, JSON.stringify({ schemaVersion: 1, projects: [{ id: 'fixture', root: f.root, adapter: 'adapter.mjs', stateDir: '.state' }] }));
  const runtime = new Runtime({ registryPath: registry, sharedStateDir: path.join(f.root, '.shared') });
  const start = await runtime.run({ project: 'fixture', workflow: 'cycle', task: 'daily', input: {} });
  assert.equal(start.status, 'paused');
  await fs.writeFile(path.join(f.root, 'ready'), 'ready');
  const resumed = await runtime.resume('fixture', 'daily');
  assert.equal(resumed.status, 'completed');
  await runtime.run({ project: 'fixture', workflow: 'cycle', task: 'daily', input: {} });
  assert.equal(await fs.readFile(path.join(f.root, 'once'), 'utf8'), 'first-second');
});
