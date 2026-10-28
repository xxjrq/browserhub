#!/usr/bin/env node
// Local-only synthetic fixtures for native HTML5 drag-and-drop and a mocked API.
// The request route is scoped to this fixture context and fails closed by default.
// This is not an HAR capture/replay test and does not test JS sortable/canvas widgets.
// Requirements: Node.js 22+, Playwright, and its Chromium browser.
// In a Node project: npm install playwright && npx playwright install chromium
// Optional: PLAYWRIGHT_MODULE_URL and CHROME_EXECUTABLE_PATH select existing installs.
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createServer } from "node:http";

const configuredModule = process.env.PLAYWRIGHT_MODULE_URL;
const moduleUrl = configuredModule
  ? (configuredModule.startsWith("file:") ? configuredModule : pathToFileURL(resolve(configuredModule)).href)
  : "playwright";
const playwrightModule = await import(moduleUrl);
const chromium = playwrightModule.chromium ?? playwrightModule.default?.chromium;
if (!chromium) throw new Error("The selected Playwright module did not export chromium");

const fixtureDir = await mkdtemp(join(tmpdir(), "browserhub-interaction-fixture-"));
const html = `<!doctype html><meta charset="utf-8"><title>Local browser task</title>
<h1>Local synthetic fixture</h1>
<ol id="items"><li draggable="true" data-id="alpha">Alpha</li><li draggable="true" data-id="beta">Beta</li></ol>
<button id="load">Load mock API data</button><output id="status">Ready</output>
<script>
  const list = document.querySelector('#items');
  let dragged = null;
  list.addEventListener('dragstart', event => {
    dragged = event.target.closest('[data-id]');
    event.dataTransfer.setData('text/plain', dragged.dataset.id);
    event.dataTransfer.effectAllowed = 'move';
  });
  list.addEventListener('dragover', event => event.preventDefault());
  list.addEventListener('drop', event => {
    event.preventDefault();
    const target = event.target.closest('[data-id]');
    if (dragged && target && dragged !== target) list.insertBefore(dragged, target);
  });
  document.querySelector('#load').addEventListener('click', async () => {
    const response = await fetch('/api/items');
    const data = await response.json();
    document.querySelector('#status').textContent = data.items.join(',');
  });
</script>`;

let server;
let browser;
try {
  server = createServer((request, response) => {
    if (request.url !== "/") {
      response.writeHead(404, { "content-type": "text/plain" });
      response.end("not found");
      return;
    }
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(html);
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;
  browser = await chromium.launch({
    headless: true,
    timeout: 3000,
    ...(process.env.CHROME_EXECUTABLE_PATH ? { executablePath: process.env.CHROME_EXECUTABLE_PATH } : {}),
    args: ["--disable-background-networking", "--password-store=basic", "--use-mock-keychain"],
  });
  const context = await browser.newContext();
  context.setDefaultTimeout(3000);
  await context.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.origin === origin && url.pathname === "/api/items" && route.request().method() === "GET") {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ items: ["mock-alpha", "mock-beta"] }) });
      return;
    }
    if (url.origin === origin && url.pathname === "/" && route.request().method() === "GET") {
      await route.fulfill({ status: 200, contentType: "text/html; charset=utf-8", body: html });
      return;
    }
    await route.abort("blockedbyclient");
  });
  const page = await context.newPage();
  await page.goto(origin, { waitUntil: "load", timeout: 3000 });
  const alpha = page.locator('[data-id="alpha"]');
  const beta = page.locator('[data-id="beta"]');
  await beta.dragTo(alpha, { steps: 5, timeout: 3000 });
  const order = await page.locator("#items [data-id]").evaluateAll(nodes => nodes.map(node => node.dataset.id));
  assert.deepEqual(order, ["beta", "alpha"], "native HTML5 drag should change the actual destination order");
  await page.getByRole("button", { name: "Load mock API data" }).click();
  await page.getByText("mock-alpha,mock-beta").waitFor({ state: "visible", timeout: 3000 });
  console.log(JSON.stringify({
    result: "local_synthetic_fixture_passed",
    nodeVersion: process.version,
    browserVersion: browser.version(),
    html5DragOrder: order,
    requestMock: "loopback fixture route returned synthetic JSON",
    harCaptureOrReplay: false,
    realSites: false,
    accounts: false,
    externalPageRequestsAllowed: false,
    browserBackgroundNetworkingAudited: false,
    JSWidgetsOrCanvas: false,
  }, null, 2));
  await context.close();
} catch (error) {
  console.error("Local synthetic fixture failed:", error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
  await rm(fixtureDir, { recursive: true, force: true });
}
