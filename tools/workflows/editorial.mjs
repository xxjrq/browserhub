import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const runFile = promisify(execFile);

export const digest = value => createHash('sha256').update(value).digest('hex');
export const cycleDirectory = cycle => `.local/workflows/cycles/${cycle}`;
export function verifyModelSelection(record, role, expected) {
  if (!record?.modelRequested?.trim()) throw new Error(`Missing explicit ${role} model`);
  const override = record.humanOverride;
  const human = ['human_task', 'human_project'].includes(record.selectionSource) && override?.model === record.modelRequested && typeof override.originalRequest === 'string' && override.originalRequest.trim() && Array.isArray(override.roles) && override.roles.includes(role);
  if (record.modelRequested !== expected && !human) throw new Error(`Unapproved ${role} model selection`);
  if (record.modelEffective != null && record.modelEffective !== record.modelRequested) throw new Error(`Actual ${role} model differs from requested model`);
}
export function normalizeInput(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Expected cycle input');
  if (!/^content-\d{4}-\d{2}-\d{2}(?:-batch-(?:0[2-9]|[1-9]\d))?$/.test(input.cycleId ?? '')) throw new Error('Use content-YYYY-MM-DD or its ordered batch-02..99 identity');
  if (Object.keys(input).some(key => !['cycleId', 'authorization'].includes(key))) throw new Error('Unexpected cycle input');
  return { cycleId: input.cycleId, authorization: { external: input.authorization?.external === true } };
}
export async function verifyPredecessor(ctx) {
  const match = /^(content-\d{4}-\d{2}-\d{2})-batch-(\d{2})$/.exec(ctx.input.cycleId);
  if (!match) return { status: 'initial_daily_batch' };
  const previous = Number(match[2]) === 2 ? match[1] : `${match[1]}-batch-${String(Number(match[2]) - 1).padStart(2, '0')}`;
  const result = await ctx.exec(process.execPath, ['tools/workflows/agent.mjs', 'status', '--task', previous]);
  let state;
  try { state = JSON.parse(result.stdout); } catch { throw new Error(`Cannot verify predecessor ${previous}`); }
  if (result.exitCode !== 0 || state?.task !== previous || state?.workflow !== 'content-cycle' || state?.unknownSteps?.length || state?.status !== 'completed' || state.outcome?.attentionRequired !== false || state.outcome?.statuses?.receipt !== 'content_cycle_completed') throw new Error(`Previous batch ${previous} is not successfully completed; preserve and reconcile it first`);
  const receipt = JSON.parse(await fs.readFile(await safeFile(ctx.project.root, `${cycleDirectory(previous)}/completed.json`), 'utf8'));
  const live = JSON.parse(await fs.readFile(await safeFile(ctx.project.root, `${cycleDirectory(previous)}/live.json`), 'utf8'));
  const push = JSON.parse(await fs.readFile(await safeFile(ctx.project.root, `${cycleDirectory(previous)}/push.json`), 'utf8'));
  const publish = JSON.parse(await fs.readFile(await safeFile(ctx.project.root, `${cycleDirectory(previous)}/publish.json`), 'utf8'));
  const editorial = JSON.parse(await fs.readFile(await safeFile(ctx.project.root, `${cycleDirectory(previous)}/editorial.json`), 'utf8'));
  const expectedUrls = new Set((editorial.urls ?? []).flatMap(url => ['https://browserhub.co', 'https://browsers.draxgr.cc'].map(origin => `${origin}${new URL(url).pathname}`)));
  if (receipt.status !== 'completed' || !receipt.release || receipt.release !== state.outcome.steps?.publish?.release || !receipt.commit || receipt.commit !== state.outcome.steps?.checkpoint?.commit || receipt.commit !== state.outcome.steps?.push?.commit || push.exitCode !== 0 || publish.exitCode !== 0 || !publish.stdout?.split('\n').includes(`Published: ${receipt.release}`) || editorial.cycleId !== previous || !expectedUrls.size || !live.ok || live.results?.length !== expectedUrls.size || new Set(live.results.map(row => row.url)).size !== expectedUrls.size || !live.results.every(row => expectedUrls.has(row.url) && row.status === 200 && row.contentMatches === true && row.canonical === true)) throw new Error(`Predecessor ${previous} lacks verified publication evidence`);
  return { status: 'previous_batch_verified', predecessor: previous, release: receipt.release };
}
export async function safeFile(root, relative) {
  if (typeof relative !== 'string' || path.isAbsolute(relative) || relative.split(/[\\/]/).includes('..')) throw new Error('Invalid project artifact path');
  const canonicalRoot = await fs.realpath(root);
  const candidate = path.resolve(canonicalRoot, relative);
  const canonical = await fs.realpath(candidate);
  if (!canonical.startsWith(`${canonicalRoot}${path.sep}`) || canonical !== candidate) throw new Error('Artifact must stay inside project without symlinks');
  return canonical;
}
export async function readApproval(root, cycleId, optional = false) {
  const relative = `${cycleDirectory(cycleId)}/editorial.json`;
  let raw;
  try { raw = await fs.readFile(await safeFile(root, relative)); }
  catch (error) { if (optional && error.code === 'ENOENT') return null; throw error; }
  const manifest = JSON.parse(raw);
  if (manifest.schemaVersion !== 1 || manifest.cycleId !== cycleId || !Array.isArray(manifest.files) || !manifest.files.length) throw new Error('Invalid editorial manifest');
  if (!Array.isArray(manifest.urls) || manifest.urls.length < 2 || manifest.urls.length > 40) throw new Error('Expected reviewed canonical URLs');
  for (const url of manifest.urls) {
    const parsed = new URL(url);
    if (parsed.origin !== 'https://browserhub.co' || parsed.search || parsed.hash || !parsed.pathname.endsWith('/')) throw new Error('Invalid canonical review URL');
  }
  const seen = new Set();
  for (const file of manifest.files) {
    if (!/^(src\/data\/[\w.-]+\.ts|src\/app\/(?:page\.tsx|\[locale\]\/\[\[\.\.\.segments\]\]\/page\.tsx)|docs\/seo\/[\w.-]+\.json|scripts\/audit-seo\.mjs|public\/templates\/[\w.-]+)$/.test(file.path) || seen.has(file.path)) throw new Error(`Unapproved content path: ${file.path}`);
    seen.add(file.path);
    if (!/^[a-f0-9]{64}$/.test(file.sha256 ?? '') || digest(await fs.readFile(await safeFile(root, file.path))) !== file.sha256) throw new Error(`Reviewed content changed: ${file.path}`);
  }
  if (!manifest.reviewPath?.startsWith(`${cycleDirectory(cycleId)}/`) || !/^[a-f0-9]{64}$/.test(manifest.reviewSha256 ?? '')) throw new Error('Missing independent review receipt');
  const reviewRaw = await fs.readFile(await safeFile(root, manifest.reviewPath));
  if (digest(reviewRaw) !== manifest.reviewSha256) throw new Error('Review receipt changed');
  const review = JSON.parse(reviewRaw);
  if (review.cycleId !== cycleId || review.decision !== 'approved' || review.role !== 'reviewer' || review.independentContext !== true) throw new Error('Independent review required');
  verifyModelSelection(review, 'reviewer', 'gpt-6.1-sol');
  if (JSON.stringify(review.files) !== JSON.stringify(manifest.files)) throw new Error('Review does not cover the same artifact hashes');
  verifyModelSelection(manifest.executor, 'executor', 'gpt-6-luna');
  return { manifest, manifestPath: relative, manifestSha256: digest(raw), review };
}
export async function ensureFrozen(ctx) {
  const approval = await readApproval(ctx.project.root, ctx.input.cycleId);
  if (ctx.steps['editorial-ready'] && approval.manifestSha256 !== ctx.steps['editorial-ready'].manifestSha256) throw new Error('Approved manifest changed after checkpoint');
  const status = await ctx.exec('git', ['status', '--porcelain', '--untracked-files=all']);
  if (status.exitCode !== 0) throw new Error('Cannot inspect working tree');
  const reviewed = new Set(approval.manifest.files.map(file => file.path));
  const unrelated = status.stdout.split('\n').filter(Boolean).map(line => line.slice(3)).filter(file => !reviewed.has(file));
  if (unrelated.length) throw new Error(`Unreviewed worktree changes preserved: ${unrelated.join(', ')}`);
  if (ctx.steps.checkpoint) {
    const head = await ctx.exec('git', ['rev-parse', 'HEAD']);
    if (head.stdout.trim() !== ctx.steps.checkpoint.commit) throw new Error('Git HEAD changed after the reviewed checkpoint');
  }
  return approval;
}
export async function saveReceipt(root, cycleId, phase, value) {
  const directory = path.resolve(root, cycleDirectory(cycleId));
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  const target = path.join(directory, `${phase}.json`);
  const temporary = `${target}.${process.pid}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await fs.rename(temporary, target);
  return path.relative(root, target);
}
export async function execChecked(ctx, command, args, phase, timeoutMs = 600000) {
  const result = await ctx.exec(command, args, { timeoutMs, maxOutputBytes: 1048576 });
  await saveReceipt(ctx.project.root, ctx.input.cycleId, phase, { phase, checkedAt: new Date().toISOString(), exitCode: result.exitCode, stdout: result.stdout, stderr: result.stderr });
  if (result.exitCode !== 0) throw new Error(`${phase} failed (exit ${result.exitCode}); see the project-local receipt`);
  return result;
}
export async function verifyLive(root, cycleId, urls, { signal } = {}) {
  // curl uses this machine's configured proxy; Node fetch bypasses it and may
  // time out on the Cloudflare domain. Keep the same strict body/canonical gate.
  const results = (await Promise.all(urls.map(async canonical => {
    const pathname = new URL(canonical).pathname;
    const expected = await fs.readFile(path.join(root, 'out', pathname, 'index.html'), 'utf8');
    const body = html => (html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/\s+/g, ' ').trim();
    return Promise.all(['https://browsers.draxgr.cc', 'https://browserhub.co'].map(async origin => {
      const url = `${origin}${pathname}`;
      try {
        // One response per buffer: curl retries can concatenate response bodies
        // on stdout. A failed read is safe to retry by resuming this graph node.
        const { stdout } = await runFile('curl', ['-sS', '--compressed', '--connect-timeout', '15', '--max-time', '60', '--write-out', '\n%{http_code}', url], { cwd: root, signal, timeout: 70000, maxBuffer: 4194304 });
        const boundary = stdout.lastIndexOf('\n');
        const status = Number(stdout.slice(boundary + 1));
        const html = stdout.slice(0, boundary);
        return { url, status, contentMatches: Boolean(body(expected)) && body(expected) === body(html), canonical: html.includes(`rel="canonical" href="${canonical}"`) };
      } catch (error) {
        return { url, status: 0, contentMatches: false, canonical: false, error: `curl transport failed (${error.code ?? 'unknown'})` };
      }
    }));
  }))).flat();
  const ok = results.every(result => result.status === 200 && result.contentMatches && result.canonical);
  const receiptPath = await saveReceipt(root, cycleId, 'live', { checkedAt: new Date().toISOString(), ok, results });
  if (!ok) throw new Error(`Live content differs; see ${receiptPath}`);
  return { status: 'live_verified', responses: results.length, receiptPath };
}
