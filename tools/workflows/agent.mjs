#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Machine paths stay in ignored project-local configuration, never in this source.
try {
  const config = JSON.parse(await fs.readFile(new URL('../../.local/workflows/runtime.local.json', import.meta.url), 'utf8'));
  const args = process.argv.slice(2);
  if (args.some((arg) => /^--(?:project|registry)(?:=|$)/.test(arg))) {
    throw new Error('This entry point fixes --project and --registry to local project configuration');
  }
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const child = spawn(process.execPath, [path.join(config.runtimeRoot, 'bin/lgw.mjs'), ...args,
    '--project', config.project, '--registry', config.registryPath], { cwd: root, shell: false, stdio: 'inherit' });
  const onInterrupt = () => child.kill('SIGINT');
  const onTerminate = () => child.kill('SIGTERM');
  process.once('SIGINT', onInterrupt);
  process.once('SIGTERM', onTerminate);
  child.once('error', (error) => { console.error(error.message); process.exitCode = 1; });
  child.once('close', (code, signal) => {
    process.removeListener('SIGINT', onInterrupt);
    process.removeListener('SIGTERM', onTerminate);
    process.exitCode = code ?? (signal === 'SIGINT' ? 130 : signal === 'SIGTERM' ? 143 : 1);
  });
} catch (error) {
  console.error(`Project launcher: ${error.message}`);
  process.exitCode = 1;
}
