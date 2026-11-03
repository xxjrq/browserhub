import assert from 'node:assert/strict';
import http from 'node:http';

const timeoutMs = 3000;
const workerReadyMs = 3000;
const server = http.createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  if (url.pathname === '/sw.js') {
    response.writeHead(200, { 'content-type': 'text/javascript', 'cache-control': 'no-store' });
    response.end(`self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === '/api/worker-generated') {
    event.respondWith(new Response(JSON.stringify({ source: 'worker-generated-fixture' }), { headers: { 'content-type': 'application/json' } }));
  } else if (url.pathname === '/api/routed') {
    event.respondWith(fetch(event.request));
  }
});`);
    return;
  }
  if (url.pathname === '/strict') {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(`<!doctype html><main><ul><li><span>Orchid plan · SKU-4102</span><button>Archive</button></li><li><span>Orchid plan draft · SKU-4103</span><button>Archive</button></li></ul><output id="status"></output></main><nav><button>Archive</button></nav><button>Archive all</button><script>document.querySelector('main li').addEventListener('click', event => { if (event.target.tagName === 'BUTTON') document.querySelector('#status').textContent = 'archived SKU-4102'; });</script>`);
    return;
  }
  if (url.pathname === '/diagnostics') {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(`<!doctype html><main><button id="emit">Emit fixture signals</button><output id="status"></output><script>
      document.querySelector('#emit').addEventListener('click', async () => {
        console.error('fixture-console-error');
        setTimeout(() => { throw new Error('fixture-page-error'); }, 0);
        try { await fetch('/api/aborted'); } catch {}
        document.querySelector('#status').textContent = 'signals emitted';
      });
    </script></main>`);
    return;
  }
  if (url.pathname === '/websocket') {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(`<!doctype html><main><button id="send">Send synthetic command</button><output id="status">waiting</output><script>
      const socket = new WebSocket('ws://127.0.0.1:${server.address()?.port ?? 0}/ws');
      socket.addEventListener('open', () => { document.querySelector('#status').textContent = 'connected'; });
      document.querySelector('#send').addEventListener('click', () => socket.send(JSON.stringify({ type: 'fixture-command', id: 'local-1' })));
      socket.addEventListener('message', event => { const reply = JSON.parse(event.data); document.querySelector('#status').textContent = reply.type + ':' + reply.id; });
    </script></main>`);
    return;
  }
  if (url.pathname === '/sw-test') {
    response.writeHead(200, { 'content-type': 'text/html' });
    response.end(`<!doctype html><main><button id="generated">Read worker-generated response</button><button id="routed">Read routed response</button><output id="generated-result"></output><output id="routed-result"></output><script>
      document.querySelector('#generated').addEventListener('click', async () => { const r = await fetch('/api/worker-generated'); document.querySelector('#generated-result').textContent = JSON.stringify(await r.json()); });
      document.querySelector('#routed').addEventListener('click', async () => { const r = await fetch('/api/routed'); document.querySelector('#routed-result').textContent = JSON.stringify(await r.json()); });
    </script></main>`);
    return;
  }
  if (url.pathname === '/api/404') {
    response.writeHead(404, { 'content-type': 'application/json' });
    response.end('{"error":"synthetic not found"}');
    return;
  }
  response.writeHead(404, { 'content-type': 'text/plain' });
  response.end('not found');
});

let browser;
let context;
const cleanupEvents = [];
try {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const port = server.address().port;
  const origin = `http://127.0.0.1:${port}`;
  const moduleUrl = process.env.PLAYWRIGHT_MODULE_URL;
  const playwrightModule = moduleUrl ? await import(moduleUrl) : await import('playwright');
  const chromium = playwrightModule.chromium ?? playwrightModule.default?.chromium;
  assert.ok(chromium, 'Playwright module must export chromium');
  const executablePath = process.env.CHROME_EXECUTABLE_PATH || undefined;
  browser = await chromium.launch({ headless: true, timeout: timeoutMs, args: ['--password-store=basic', '--use-mock-keychain'], ...(executablePath ? { executablePath } : {}) });

  const newContext = async options => {
    const ctx = await browser.newContext(options);
    await ctx.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    return ctx;
  };

  // 1. Reproduce strictness safely: inspect matches, then scope the target.
  context = await newContext();
  const strictPage = await context.newPage();
  await strictPage.goto(`${origin}/strict`, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
  const broad = strictPage.getByRole('button', { name: 'Archive' });
  assert.equal(await broad.count(), 4);
  await assert.rejects(() => broad.click({ timeout: timeoutMs }), /strict mode violation/i);
  const exact = strictPage.getByRole('button', { name: 'Archive', exact: true });
  assert.equal(await exact.count(), 3);
  const intended = strictPage.getByRole('main').getByRole('listitem').filter({ hasText: 'SKU-4102' }).getByRole('button', { name: 'Archive', exact: true });
  assert.equal(await intended.count(), 1);
  await intended.click({ timeout: timeoutMs });
  await strictPage.getByRole('status').filter({ hasText: 'archived SKU-4102' }).waitFor({ state: 'visible', timeout: timeoutMs });
  await context.close();
  context = undefined;

  // 2. Classify separate browser signals on a synthetic loopback page.
  context = await newContext();
  const diagnosticPage = await context.newPage();
  const signals = { consoleErrors: [], pageErrors: [], failedRequests: [], httpStatuses: [] };
  diagnosticPage.on('console', message => { if (message.type() === 'error') signals.consoleErrors.push(message.text()); });
  diagnosticPage.on('pageerror', error => signals.pageErrors.push(error.message));
  diagnosticPage.on('requestfailed', request => signals.failedRequests.push(request.url()));
  diagnosticPage.on('response', response => { if (response.status() >= 400) signals.httpStatuses.push(response.status()); });
  const abortedUrl = `${origin}/api/aborted`;
  await context.route(abortedUrl, route => route.abort());
  await diagnosticPage.goto(`${origin}/diagnostics`, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
  const notFound = await diagnosticPage.evaluate(async () => (await fetch('/api/404')).status);
  assert.equal(notFound, 404);
  const pageErrorPromise = diagnosticPage.waitForEvent('pageerror', { predicate: error => error.message.includes('fixture-page-error'), timeout: timeoutMs });
  const failedRequestPromise = diagnosticPage.waitForEvent('requestfailed', { predicate: request => request.url().endsWith('/api/aborted'), timeout: timeoutMs });
  await diagnosticPage.getByRole('button', { name: 'Emit fixture signals' }).click({ timeout: timeoutMs });
  await Promise.all([pageErrorPromise, failedRequestPromise, diagnosticPage.getByRole('status').filter({ hasText: 'signals emitted' }).waitFor({ state: 'visible', timeout: timeoutMs })]);
  assert.ok(signals.consoleErrors.some(message => message.includes('fixture-console-error')));
  assert.ok(signals.pageErrors.some(message => message.includes('fixture-page-error')));
  assert.ok(signals.failedRequests.some(url => url.endsWith('/api/aborted')));
  assert.ok(signals.httpStatuses.includes(404));
  await context.close();
  context = undefined;

  // 3. Observe the mocked route's command and verify its UI acknowledgement.
  context = await newContext();
  let observedCommandResolve;
  const observedCommandPromise = new Promise(resolve => { observedCommandResolve = resolve; });
  await context.routeWebSocket(`${origin.replace('http:', 'ws:')}/ws`, socket => {
    socket.onMessage(payload => {
      const message = JSON.parse(String(payload));
      if (message.type === 'fixture-command' && message.id === 'local-1') observedCommandResolve(message);
      socket.send(JSON.stringify({ type: 'fixture-ack', id: message.id }));
    });
  });
  const wsPage = await context.newPage();
  await wsPage.goto(`${origin}/websocket`, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
  await wsPage.getByRole('status').filter({ hasText: 'connected' }).waitFor({ state: 'visible', timeout: timeoutMs });
  let commandWatchdog;
  const commandPromise = Promise.race([
    observedCommandPromise,
    new Promise((_, reject) => { commandWatchdog = setTimeout(() => reject(new Error('mock WebSocket route did not observe the expected command within the bound')), timeoutMs); })
  ]).finally(() => clearTimeout(commandWatchdog));
  await wsPage.getByRole('button', { name: 'Send synthetic command' }).click({ timeout: timeoutMs });
  const observedCommand = await commandPromise;
  assert.deepEqual(observedCommand, { type: 'fixture-command', id: 'local-1' });
  await wsPage.getByRole('status').filter({ hasText: 'fixture-ack:local-1' }).waitFor({ state: 'visible', timeout: timeoutMs });
  await context.close();
  context = undefined;

  // 4. Compare route-visible traffic with a response generated by a Service Worker.
  context = await newContext();
  const workerRoutes = [];
  await context.route(`${origin}/api/routed`, async route => {
    const request = route.request();
    workerRoutes.push({ path: new URL(request.url()).pathname, workerOwned: Boolean(request.serviceWorker()) });
    await route.fulfill({ contentType: 'application/json', body: JSON.stringify({ source: 'playwright-route-fixture' }) });
  });
  const swPage = await context.newPage();
  await swPage.goto(`${origin}/sw-test`, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
  await swPage.evaluate(async ({ timeoutMs }) => {
    let watchdogId;
    try {
      const watchdog = new Promise((_, reject) => { watchdogId = setTimeout(() => reject(new Error('service worker did not become ready within the bound')), timeoutMs); });
      await Promise.race([(async () => { await navigator.serviceWorker.register('/sw.js'); await navigator.serviceWorker.ready; })(), watchdog]);
    } finally {
      clearTimeout(watchdogId);
    }
  }, { timeoutMs: workerReadyMs });
  await swPage.reload({ waitUntil: 'domcontentloaded', timeout: timeoutMs });
  await swPage.waitForFunction(() => Boolean(navigator.serviceWorker.controller), undefined, { timeout: workerReadyMs });
  await swPage.getByRole('button', { name: 'Read worker-generated response' }).click({ timeout: timeoutMs });
  await swPage.getByRole('button', { name: 'Read routed response' }).click({ timeout: timeoutMs });
  await swPage.getByText('worker-generated-fixture').waitFor({ state: 'visible', timeout: timeoutMs });
  await swPage.getByText('playwright-route-fixture').waitFor({ state: 'visible', timeout: timeoutMs });
  assert.equal(workerRoutes.length, 1);
  assert.equal(workerRoutes[0].path, '/api/routed');
  assert.equal(workerRoutes[0].workerOwned, true);
  const workerNames = (await context.serviceWorkers()).length;
  assert.ok(workerNames >= 1);
  const normalClosePage = await context.newPage();
  normalClosePage.on('close', () => cleanupEvents.push('close'));
  await normalClosePage.close();
  assert.deepEqual(cleanupEvents, ['close']);
  await context.close();
  context = undefined;

  console.log(JSON.stringify({
    result: 'local_playwright_diagnostics_fixtures_completed',
    nodeVersion: process.version,
    playwrightVersion: playwrightModule.version ?? 'not-exported',
    browserVersion: browser.version(),
    strictMode: { broadMatchCount: 4, broadActionRejectedAsAmbiguous: true, exactNameCount: 3, scopedTargetCount: 1, visibleResult: 'archived SKU-4102' },
    browserSignals: signals,
    websocket: { mockedRouteObservedCommandBeforeAcknowledgement: observedCommand, correlationId: 'local-1', uiAssertion: 'matching acknowledgement visible', pageWebSocketEventOrReceivedFrameObserved: false },
    serviceWorker: { routedRequests: workerRoutes, workerCount: workerNames, workerResponseSource: 'generated by the synthetic Service Worker, not CacheStorage' },
    lifecycle: { normalPageCloseObserved: cleanupEvents.includes('close'), crashForcedOrSimulated: false },
    boundary: 'Fresh headless Chromium contexts; synthetic loopback-only pages and responses; no external API, user profile, production site, forced crash, or browser-background traffic audit.'
  }, null, 2));
} catch (error) {
  console.error('local_playwright_diagnostics_fixture_failed');
  console.error(error?.stack ?? String(error));
  process.exitCode = 1;
} finally {
  if (context) await context.close().catch(() => {});
  if (browser) await browser.close().catch(() => {});
  if (server.listening) await new Promise(resolve => server.close(resolve));
}
