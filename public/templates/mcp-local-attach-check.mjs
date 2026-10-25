import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
// Prerequisites: Node 22.12+, npm packages @modelcontextprotocol/sdk@1.32.2,
// @playwright/mcp@0.0.83, chrome-devtools-mcp@1.12.0, and Chrome/Chromium.
const modulesRoot = process.env.MCP_CHECK_NODE_MODULES || join(process.cwd(), 'node_modules');
const sdkClient = await import(pathToFileURL(join(modulesRoot, '@modelcontextprotocol/sdk/dist/esm/client/index.js')).href);
const sdkStdio = await import(pathToFileURL(join(modulesRoot, '@modelcontextprotocol/sdk/dist/esm/client/stdio.js')).href);
const { Client } = sdkClient;
const { StdioClientTransport } = sdkStdio;

const chromePath = process.env.CHROME_EXECUTABLE_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const playwrightBin = join(modulesRoot, '@playwright/mcp/cli.js');
const devtoolsBin = join(modulesRoot, 'chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js');
const results = [];

function bounded(promise, label, ms = 15000) {
  let timer;
  const timeout = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms); });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function stopProcess(proc) {
  if (!proc || proc.exitCode !== null) return;
  const exited = once(proc, 'close').catch(() => {});
  proc.kill('SIGTERM');
  try { await bounded(exited, 'process shutdown', 5000); }
  catch { proc.kill('SIGKILL'); await bounded(exited, 'process kill', 3000).catch(() => {}); }
}

async function runCase(name, serverArgs) {
  const fixture = createServer((req, res) => {
    if (req.url === '/favicon.ico') { res.writeHead(204).end(); return; }
    if (req.url !== '/') { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end('<!doctype html><title>Local MCP fixture</title><main><label for="task">Task label</label><input id="task" value="" /><button id="save">Save</button><output id="result" aria-live="polite"></output></main><script>document.getElementById("save").addEventListener("click",()=>{document.getElementById("result").textContent=document.getElementById("task").value})</script>');
  });
  fixture.listen(0, '127.0.0.1');
  await bounded(once(fixture, 'listening'), 'fixture startup', 3000);
  const fixtureUrl = `http://127.0.0.1:${fixture.address().port}/`;
  const profile = await mkdtemp(join(tmpdir(), `mcp-${name}-`));
  let chrome;
  let transport;
  let client;
  try {
    chrome = spawn(chromePath, [
      '--headless=new', '--no-first-run', '--no-default-browser-check',
      '--password-store=basic', '--use-mock-keychain',
      `--user-data-dir=${profile}`, '--remote-debugging-port=0',
      fixtureUrl,
    ], { stdio: ['ignore', 'ignore', 'ignore'] });
    let endpoint;
    const activeFile = join(profile, 'DevToolsActivePort');
    for (let attempt = 0; attempt < 100; attempt++) {
      try {
        const [port] = (await readFile(activeFile, 'utf8')).trim().split('\n');
        endpoint = `http://127.0.0.1:${port}`;
        const response = await fetch(`${endpoint}/json/version`, { signal: AbortSignal.timeout(1000) });
        if (response.ok) break;
      } catch {}
      if (chrome.exitCode !== null) throw new Error(`Chrome exited: ${chrome.exitCode}`);
      await delay(100);
    }
    if (!endpoint) throw new Error('Chrome CDP endpoint did not become ready within 10 seconds');
    const version = await (await fetch(`${endpoint}/json/version`, { signal: AbortSignal.timeout(1000) })).json();
    transport = new StdioClientTransport({ command: process.execPath, args: [serverArgs.bin, ...serverArgs.args(endpoint)], cwd: profile, stderr: 'pipe', env: { ...process.env, CI: '1' } });
    let stderr = '';
    transport.stderr?.setEncoding('utf8').on('data', chunk => { stderr = (stderr + chunk).slice(-4000); });
    client = new Client({ name: `browserhub-${name}-check`, version: '1.0.0' }, { capabilities: {} });
    await bounded(client.connect(transport), 'MCP initialize');
    const toolList = await bounded(client.listTools(), 'tools/list');
    const names = toolList.tools.map(tool => tool.name);
    const call = params => bounded(client.callTool(params), `tools/call ${params.name}`);
    let initialSnapshot;
    let finalSnapshot;
    let correctedSchemaError;
    let fill;
    let click;
    let outputAssertion = false;
    if (name === 'playwright-mcp') {
      const bad = await call({ name: 'browser_type', arguments: { element: 'Task label', text: 'synthetic-ok' } });
      correctedSchemaError = bad.content?.map(x => x.text || '').join('\n') || '';
      initialSnapshot = await call({ name: 'browser_snapshot', arguments: {} });
      fill = await call({ name: 'browser_fill_form', arguments: { fields: [{ target: 'e3', name: 'Task label', type: 'textbox', value: 'synthetic-ok' }] } });
      click = await call({ name: 'browser_click', arguments: { target: 'e4' } });
      finalSnapshot = await call({ name: 'browser_snapshot', arguments: {} });
      const text = finalSnapshot.content?.map(x => x.text || '').join('\n') ?? '';
      outputAssertion = /^\s*- status(?: \[ref=[^\]]+\])?: synthetic-ok$/m.test(text);
    } else {
      const bad = await call({ name: 'fill', arguments: { uid: 'task', value: 'synthetic-ok' } });
      correctedSchemaError = bad.content?.map(x => x.text || '').join('\n') || '';
      const pages = await call({ name: 'list_pages', arguments: {} });
      const pagesText = pages.content?.map(x => x.text || '').join('\n') ?? '';
      initialSnapshot = await call({ name: 'take_snapshot', arguments: { pageId: 1 } });
      const snapText = initialSnapshot.content?.map(x => x.text || '').join('\n') ?? '';
      const fieldUid = snapText.match(/uid=([A-Za-z0-9_-]+) textbox/)?.[1];
      fill = await call({ name: 'fill', arguments: { pageId: 1, uid: fieldUid, value: 'synthetic-ok', includeSnapshot: true } });
      const afterFill = fill.content?.map(x => x.text || '').join('\n') ?? '';
      const buttonUid = afterFill.match(/uid=([A-Za-z0-9_-]+) button/)?.[1];
      click = await call({ name: 'click', arguments: { pageId: 1, uid: buttonUid, includeSnapshot: true } });
      finalSnapshot = click;
      const text = click.content?.map(x => x.text || '').join('\n') ?? '';
      outputAssertion = /uid=\S+ "synthetic-ok"/.test(text);
      initialSnapshot.content.unshift({ type: 'text', text: pagesText });
    }
    results.push({
      case: name,
      node: process.version,
      chrome: version.Browser,
      mcpTools: names,
      initialSnapshot: initialSnapshot.content?.map(x => x.text || '').join('\n') ?? '',
      rejectedInitialToolArguments: correctedSchemaError,
      fill: fill.content?.map(x => x.text || '').join('\n') ?? '',
      click: click.content?.map(x => x.text || '').join('\n') ?? '',
      finalSnapshot: finalSnapshot.content?.map(x => x.text || '').join('\n') ?? '',
      outputAssertion,
      stderr,
    });
  } catch (error) {
    results.push({ case: name, error: String(error) });
  } finally {
    const mcpProcess = transport?._process;
    await bounded(client?.close() ?? Promise.resolve(), 'MCP client close', 5000).catch(() => {});
    await stopProcess(mcpProcess);
    await stopProcess(chrome);
    if (fixture.listening) {
      fixture.closeAllConnections();
      await bounded(new Promise(resolve => fixture.close(resolve)), 'fixture shutdown', 3000).catch(() => {});
    }
    await rm(profile, { recursive: true, force: true });
  }
}

await bounded(runCase('playwright-mcp', {
  bin: playwrightBin,
  args: endpoint => ['--cdp-endpoint', endpoint, '--timeout-action', '5000', '--timeout-navigation', '10000'],
}), 'Playwright case', 90000);
await bounded(runCase('chrome-devtools-mcp', {
  bin: devtoolsBin,
  args: endpoint => ['--browser-url', endpoint, '--no-usage-statistics', '--no-performance-crux'],
}), 'Chrome DevTools case', 90000);
console.log(JSON.stringify(results, null, 2));
if (results.length !== 2 || results.some(result => !result.outputAssertion)) process.exitCode = 1;
