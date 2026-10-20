#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeInput, safeFile, digest, cycleDirectory, readApproval, saveReceipt } from './editorial.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const [cycleId] = process.argv.slice(2);
normalizeInput({ cycleId });
const directory = cycleDirectory(cycleId);
const reviewPath = `${directory}/review.json`;
const reviewRaw = await fs.readFile(await safeFile(root, reviewPath));
const review = JSON.parse(reviewRaw);
const handoff = JSON.parse(await fs.readFile(await safeFile(root, `${directory}/handoff.json`), 'utf8'));
const files = [];
for (const file of handoff.files) files.push({ path: file, sha256: digest(await fs.readFile(await safeFile(root, file))) });
if (JSON.stringify(review.files) !== JSON.stringify(files)) throw new Error('Independent review hashes do not match the current handoff');
const manifest = { schemaVersion: 1, cycleId, topics: handoff.topics, urls: handoff.urls, files, executor: handoff.executor, reviewPath, reviewSha256: digest(reviewRaw) };
const target = path.join(root, directory, 'editorial.json');
try { const previous = await fs.readFile(target, 'utf8'); if (previous !== `${JSON.stringify(manifest, null, 2)}\n`) throw new Error('Existing frozen approval differs; do not overwrite it'); }
catch (error) { if (error.code !== 'ENOENT') throw error; await saveReceipt(root, cycleId, 'editorial', manifest); }
const approval = await readApproval(root, cycleId);
console.log(JSON.stringify({ status: 'editorial_ready', manifestPath: approval.manifestPath, manifestSha256: approval.manifestSha256, files: files.length }, null, 2));
