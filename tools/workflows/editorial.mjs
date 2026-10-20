import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

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
  if (!/^content-\d{4}-\d{2}-\d{2}$/.test(input.cycleId ?? '')) throw new Error('Use content-YYYY-MM-DD as the durable daily identity');
  if (Object.keys(input).some(key => !['cycleId', 'authorization'].includes(key))) throw new Error('Unexpected cycle input');
  return { cycleId: input.cycleId, authorization: { external: input.authorization?.external === true } };
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
export async function verifyLive(root, cycleId, urls) {
  const results = [];
  for (const canonical of urls) {
    const pathname = new URL(canonical).pathname;
    const expected = await fs.readFile(path.join(root, 'out', pathname, 'index.html'), 'utf8');
    const body = html => (html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/\s+/g, ' ').trim();
    for (const origin of ['https://browsers.draxgr.cc', 'https://browserhub.co']) {
      const response = await fetch(`${origin}${pathname}`, { signal: AbortSignal.timeout(25000) });
      const html = await response.text();
      results.push({ url: `${origin}${pathname}`, status: response.status, contentMatches: Boolean(body(expected)) && body(expected) === body(html), canonical: html.includes(`rel="canonical" href="${canonical}"`) });
    }
  }
  const ok = results.every(result => result.status === 200 && result.contentMatches && result.canonical);
  const receiptPath = await saveReceipt(root, cycleId, 'live', { checkedAt: new Date().toISOString(), ok, results });
  if (!ok) throw new Error(`Live content differs; see ${receiptPath}`);
  return { status: 'live_verified', responses: results.length, receiptPath };
}
