#!/usr/bin/env node
// Local-only fixtures for permission-scoped geolocation, native JavaScript dialogs,
// and clipboard application logic. The clipboard API below is an in-memory stub.
// This script never reads from or writes to the host operating system clipboard.
// Requirements: Node.js 22 or newer. In a Node project run `npm install playwright`
// and `npx playwright install chromium`. Optional PLAYWRIGHT_MODULE_URL may point
// to a Playwright module file path or file URL. Optional CHROME_EXECUTABLE_PATH
// selects an installed Chromium-compatible executable.
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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

const fixtureDir = await mkdtemp(join(tmpdir(), "browserhub-agent-fixtures-"));
const fixturePath = join(fixtureDir, "fixture.html");
const html = `<!doctype html>
<meta charset="utf-8">
<title>BrowserHub synthetic browser task fixture</title>
<h1>Local synthetic fixture</h1>
<p>This page uses synthetic coordinates and a test-only in-memory clipboard.</p>
<button id="location">Read synthetic location</button>
<button id="dialog">Ask native confirmation</button>
<button id="copy">Copy synthetic text</button>
<button id="paste">Read mock clipboard</button>
<output id="status" aria-live="polite">Ready</output>
<script>
  window.__mockClipboard = "";
  Object.defineProperty(Navigator.prototype, "clipboard", {
    configurable: true,
    get() {
      return {
        writeText: async (value) => { window.__mockClipboard = String(value); },
        readText: async () => window.__mockClipboard,
      };
    },
  });
  const status = document.querySelector("#status");
  document.querySelector("#location").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { status.textContent = "location:" + coords.latitude.toFixed(3) + "," + coords.longitude.toFixed(3); },
      (error) => { status.textContent = "location-error:" + error.code; },
    );
  });
  document.querySelector("#dialog").addEventListener("click", () => {
    status.textContent = confirm("Accept the synthetic action?") ? "dialog-accepted" : "dialog-dismissed";
  });
  document.querySelector("#copy").addEventListener("click", async () => {
    await navigator.clipboard.writeText("synthetic clipboard value");
    status.textContent = "mock-copy-complete";
  });
  document.querySelector("#paste").addEventListener("click", async () => {
    status.textContent = "mock-paste:" + await navigator.clipboard.readText();
  });
</script>`;

let server;
let browser;
try {
  await writeFile(fixturePath, html, { encoding: "utf8", mode: 0o600 });
  server = createServer(async (_request, response) => {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(await readFile(fixturePath));
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}`;
  browser = await chromium.launch({
    headless: true,
    timeout: 3000,
    ...(process.env.CHROME_EXECUTABLE_PATH ? { executablePath: process.env.CHROME_EXECUTABLE_PATH } : {}),
    args: ["--disable-background-networking", "--password-store=basic", "--use-mock-keychain"],
  });
  const context = await browser.newContext({
    geolocation: { latitude: 47.606, longitude: -122.332, accuracy: 100 },
  });
  await context.grantPermissions(["geolocation"], { origin });
  const page = await context.newPage();
  page.setDefaultTimeout(3000);
  await page.goto(origin, { waitUntil: "load", timeout: 3000 });

  await page.getByRole("button", { name: "Read synthetic location" }).click();
  await page.getByText("location:47.606,-122.332").waitFor({ state: "visible" });

  let dialogHandlerError;
  page.once("dialog", async (dialog) => {
    try {
      assert.equal(dialog.type(), "confirm");
      assert.equal(dialog.message(), "Accept the synthetic action?");
    } catch (error) {
      dialogHandlerError = error;
    } finally {
      await dialog.dismiss();
    }
  });
  await page.getByRole("button", { name: "Ask native confirmation" }).click();
  if (dialogHandlerError) throw dialogHandlerError;
  await page.getByText("dialog-dismissed").waitFor({ state: "visible" });

  await page.getByRole("button", { name: "Copy synthetic text" }).click();
  await page.getByText("mock-copy-complete").waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Read mock clipboard" }).click();
  await page.getByText("mock-paste:synthetic clipboard value").waitFor({ state: "visible" });

  console.log(JSON.stringify({
    result: "local_synthetic_fixture_passed",
    nodeVersion: process.version,
    browserVersion: browser.version(),
    geolocation: "synthetic_coordinates_returned_for_loopback_origin",
    dialog: "registered_before_click_and_dismissed",
    clipboard: "in_memory_stub_only_no_host_clipboard_access",
    realSites: false,
    accounts: false,
    payment: false,
    pageNavigations: "loopback_only",
    browserBackgroundNetworkingAudited: false,
    nativeClipboard: false,
    llmTesting: false,
    consentManagerTesting: false,
    storeTesting: false,
  }, null, 2));
  await context.close();
} catch (error) {
  console.error("Local synthetic fixture failed:", error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (server) await new Promise((resolve) => server.close(resolve));
  await rm(fixtureDir, { recursive: true, force: true });
}
