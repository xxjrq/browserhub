#!/usr/bin/env node
// Local-only, read-only request lifecycle fixture. No real account or website.
// Requires Node.js 22+, Playwright, and its Chromium browser.
// Optional: PLAYWRIGHT_MODULE_URL and CHROME_EXECUTABLE_PATH select existing installs.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const configuredModule = process.env.PLAYWRIGHT_MODULE_URL;
const moduleUrl = configuredModule
  ? (configuredModule.startsWith("file:") ? configuredModule : pathToFileURL(resolve(configuredModule)).href)
  : "playwright";
const playwrightModule = await import(moduleUrl);
const chromium = playwrightModule.chromium ?? playwrightModule.default?.chromium;
if (!chromium) throw new Error("The selected Playwright module did not export chromium");

const server = createServer((request, response) => {
  if (request.method !== "GET") {
    response.writeHead(405, { "content-type": "text/plain" });
    response.end("method not allowed");
    return;
  }
  if (request.url === "/") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end("<!doctype html><meta charset=utf-8><title>Local recovery fixture</title><h1>Local recovery fixture</h1>");
    return;
  }
  if (request.url === "/api/status") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ state: "read-only-ok", fixture: true }));
    return;
  }
  if (request.url === "/api/unavailable") {
    response.writeHead(503, { "content-type": "text/plain" });
    response.end("synthetic unavailable response");
    return;
  }
  response.writeHead(404, { "content-type": "text/plain" });
  response.end("not found");
});

let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;
  browser = await chromium.launch({
    headless: true,
    timeout: 5000,
    ...(process.env.CHROME_EXECUTABLE_PATH ? { executablePath: process.env.CHROME_EXECUTABLE_PATH } : {}),
    args: ["--disable-background-networking", "--password-store=basic", "--use-mock-keychain"],
  });
  const context = await browser.newContext();
  context.setDefaultTimeout(5000);
  await context.route("**/*", async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) return route.abort("blockedbyclient");
    return route.continue();
  });
  const page = await context.newPage();
  const events = [];
  page.on("requestfailed", request => events.push({ type: "requestfailed", path: new URL(request.url()).pathname }));
  page.on("response", response => events.push({ type: "response", path: new URL(response.url()).pathname, status: response.status() }));
  page.on("requestfinished", request => events.push({ type: "requestfinished", path: new URL(request.url()).pathname }));

  await page.goto(origin, { waitUntil: "load", timeout: 5000 });
  await page.getByRole("heading", { name: "Local recovery fixture" }).waitFor({ state: "visible" });

  await context.setOffline(true);
  const offlineResult = await page.evaluate(async () => {
    try {
      await fetch("/api/status");
      return "unexpected-success";
    } catch {
      return "fetch-rejected";
    }
  });
  assert.equal(offlineResult, "fetch-rejected", "offline fetch should reject");
  assert(events.some(event => event.type === "requestfailed" && event.path === "/api/status"), "offline GET should emit requestfailed");

  await context.setOffline(false);
  const status = await page.evaluate(async () => {
    const response = await fetch("/api/status");
    return { status: response.status, body: await response.json() };
  });
  assert.deepEqual(status, { status: 200, body: { state: "read-only-ok", fixture: true } }, "recovered read should return the same synthetic state");
  assert(events.some(event => event.type === "requestfinished" && event.path === "/api/status"), "recovered GET should finish");

  const unavailable = await page.evaluate(async () => {
    const response = await fetch("/api/unavailable");
    return { status: response.status, body: await response.text() };
  });
  assert.deepEqual(unavailable, { status: 503, body: "synthetic unavailable response" }, "fixture should return a real HTTP 503 response");
  assert(events.some(event => event.type === "response" && event.path === "/api/unavailable" && event.status === 503), "503 should emit response");
  assert(events.some(event => event.type === "requestfinished" && event.path === "/api/unavailable"), "503 response body should finish normally");

  console.log(JSON.stringify({
    result: "local_read_only_recovery_fixture_passed",
    nodeVersion: process.version,
    browserVersion: browser.version(),
    transportFailure: "loopback GET failed while BrowserContext offline",
    recoveredRead: status,
    http503: unavailable.status,
    observations: events.filter(event => ["/api/status", "/api/unavailable"].includes(event.path)),
    realAccounts: false,
    externalRequestsAllowed: false,
    applicationWrites: false,
    writeRetries: false,
    automaticRetryLoop: false,
    recoveredReadCount: 1,
    productionRecoveryOrMFA: false,
  }, null, 2));
  await context.close();
} catch (error) {
  console.error("Local read-only recovery fixture failed:", error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
