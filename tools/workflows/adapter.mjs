import fs from 'node:fs/promises';
import { normalizeInput, readApproval, ensureFrozen, saveReceipt, execChecked, verifyLive, cycleDirectory } from './editorial.mjs';

const inspect = async ctx => {
  const required = ['package.json', 'scripts/deploy.sh', 'scripts/audit-seo.mjs', 'scripts/check-product-evidence.mjs', 'src/data/resources.ts', 'src/data/guide-editions.ts', '.agents/product-marketing.md'];
  const missing = [];
  for (const file of required) { try { await fs.access(`${ctx.project.root}/${file}`); } catch { missing.push(file); } }
  const manifest = await ctx.readJSON('package.json');
  if (!manifest.scripts?.ci) missing.push('package.json scripts.ci');
  const git = await ctx.exec('git', ['branch', '--show-current']);
  const node = await ctx.exec(process.execPath, ['--version']);
  if (git.exitCode !== 0 || git.stdout.trim() !== 'main') missing.push('main Git branch');
  return { status: missing.length ? 'not_ready' : 'checked', missing, node: node.stdout.trim(), branch: git.stdout.trim(), scope: 'BrowserHub content, validation and deployment entry points', note: 'Research and writing are performed by this chat’s scheduled agent; this graph persists reviewed publication stages.' };
};
export default {
  id: 'browserhub',
  workflows: {
    inspect: { version: '2', description: 'Check real BrowserHub content and executor dependencies', validate: input => { if (!input || Object.keys(input).length) throw new Error('inspect accepts {}'); return {}; }, steps: [{ id: 'dependencies', effect: 'read', run: inspect }] },
    'content-cycle': {
      version: '1',
      description: 'Daily research/writing handoff → independent review hashes → CI → Git checkpoint → push → atomic deploy → live verification',
      validate: normalizeInput,
      resources: ['browserhub:content-production'],
      steps: [
        { id: 'dependencies', effect: 'read', async run(ctx) { const result = await inspect(ctx); if (result.missing.length) throw new Error(`Missing: ${result.missing.join(', ')}`); return result; } },
        { id: 'editorial-ready', effect: 'local', async wait({ project, input }) { return await readApproval(project.root, input.cycleId, true) ? false : { status: 'awaiting_editorial', cycleId: input.cycleId, manifestPath: `${cycleDirectory(input.cycleId)}/editorial.json` }; }, async run(ctx) { const a = await readApproval(ctx.project.root, ctx.input.cycleId); return { status: 'editorial_approved', manifestPath: a.manifestPath, manifestSha256: a.manifestSha256, files: a.manifest.files.length, topics: a.manifest.topics, modelRequested: a.review.modelRequested, modelEffective: a.review.modelEffective ?? null }; } },
        { id: 'build', effect: 'local', async run(ctx) { await ensureFrozen(ctx); await execChecked(ctx, 'npm', ['run', 'ci'], 'build'); return { status: 'build_verified', receiptPath: `${cycleDirectory(ctx.input.cycleId)}/build.json` }; } },
        { id: 'checkpoint', effect: 'local', async run(ctx) {
          const a = await ensureFrozen(ctx); const files = a.manifest.files.map(file => file.path);
          const staged = await ctx.exec('git', ['diff', '--cached', '--name-only']);
          if (staged.stdout.trim().split('\n').filter(Boolean).some(file => !files.includes(file))) throw new Error('Unrelated staged changes; preserve them');
          await execChecked(ctx, 'git', ['add', '--', ...files], 'git-add');
          const changed = await ctx.exec('git', ['diff', '--cached', '--quiet']);
          if (changed.exitCode === 1) await execChecked(ctx, 'git', ['commit', '-m', `Publish reviewed BrowserHub content ${ctx.input.cycleId}`], 'git-commit');
          else if (changed.exitCode !== 0) throw new Error('Unable to inspect staged content');
          const head = await ctx.exec('git', ['rev-parse', 'HEAD']);
          return { status: 'content_committed', commit: head.stdout.trim() };
        } },
        { id: 'push', effect: 'external', async run(ctx) { await ensureFrozen(ctx); const result = await execChecked(ctx, 'git', ['push', 'origin', 'main'], 'push', 120000); return { status: 'pushed', commit: ctx.steps.checkpoint.commit, receiptPath: `${cycleDirectory(ctx.input.cycleId)}/push.json`, output: result.stdout.slice(-1000) }; } },
        { id: 'publish', effect: 'external', async run(ctx) { await ensureFrozen(ctx); const result = await ctx.exec('bash', ['scripts/deploy.sh'], { env: { SKIP_BUILD: '1' }, timeoutMs: 900000, maxOutputBytes: 1048576 }); const receiptPath = await saveReceipt(ctx.project.root, ctx.input.cycleId, 'publish', { checkedAt: new Date().toISOString(), exitCode: result.exitCode, stdout: result.stdout, stderr: result.stderr }); if (result.exitCode !== 0) return { status: 'needs_reconciliation', receiptPath, reason: 'Inspect original deployment receipt and current origin; do not resubmit blindly' }; const release = result.stdout.match(/Published: (.+)/)?.[1]; if (!release) return { status: 'needs_reconciliation', receiptPath, reason: 'Deployment returned no release receipt' }; return { status: 'published', release, receiptPath }; } },
        { id: 'verify', effect: 'read', async run(ctx) { const a = await ensureFrozen(ctx); return verifyLive(ctx.project.root, ctx.input.cycleId, a.manifest.urls); } },
        { id: 'receipt', effect: 'local', async run(ctx) { const a = await ensureFrozen(ctx); const receiptPath = await saveReceipt(ctx.project.root, ctx.input.cycleId, 'completed', { status: 'completed', completedAt: new Date().toISOString(), topics: a.manifest.topics, commit: ctx.steps.checkpoint.commit, release: ctx.steps.publish.release, live: ctx.steps.verify }); return { status: 'content_cycle_completed', receiptPath }; } }
      ]
    }
  }
};
