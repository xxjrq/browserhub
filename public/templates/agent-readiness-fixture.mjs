/*
Prerequisites: Node.js and npm. In a project directory, install the dependency and browser:

  npm install --save-dev playwright
  npx playwright install chromium
  node agent-readiness-fixture.mjs

Set PLAYWRIGHT_MODULE_URL to a file URL for an existing Playwright module if it is not
resolvable from this project. Set CHROME_EXECUTABLE_PATH to the browser executable if
you need a specific Chrome build; macOS Google Chrome is auto-detected when present.

The page is local-only. This script launches a fresh headless Chromium context, uses
finite timeouts, writes a temporary screenshot, then removes its own temporary output.
*/
import { access, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { constants } from "node:fs";
import { pathToFileURL } from "node:url";

const moduleSpecifier = process.env.PLAYWRIGHT_MODULE_URL || "playwright";
const { chromium } = await import(moduleSpecifier);

const fixtureHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Local browser agent readiness fixture</title>
  <style>
    body { font: 16px system-ui, sans-serif; margin: 2rem; color: #18212c; }
    .status { padding: .75rem; background: #edf7ed; width: fit-content; }
    .chart { width: 360px; height: 130px; margin-top: 1rem; background: linear-gradient(135deg, transparent 44%, #1565c0 45% 47%, transparent 48%), #f3f6fa; border: 1px solid #ccd5df; }
    .chart-label { color: #334155; }
  </style>
</head>
<body>
  <main>
    <h1>Local readiness fixture</h1>
    <p class="status" role="status" aria-live="polite">Loading report</p>
    <button type="button" disabled>Open report</button>
    <div class="chart" role="img" aria-label="A blue rising line represents a value increasing from left to right"></div>
    <p class="chart-label">Trend graphic: value increases from left to right.</p>
  </main>
  <script>
    window.startReport = () => {
      window.setTimeout(() => {
        const status = document.querySelector('[role="status"]');
        status.textContent = 'Ready: report is available';
        const button = document.querySelector('button');
        button.disabled = false;
      }, 250);
    };
  </script>
</body>
</html>`;

const actionTimeoutMs = 3000;
let executablePath = process.env.CHROME_EXECUTABLE_PATH;
if (!executablePath && process.platform === "darwin") {
  const macChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  try { await access(macChromePath, constants.X_OK); executablePath = macChromePath; } catch {}
}
const outputDir = await mkdtemp(path.join(tmpdir(), "browserhub-readiness-"));
let browser;

try {
  const fixturePath = path.join(outputDir, "fixture.html");
  await writeFile(fixturePath, fixtureHtml, { flag: "wx", mode: 0o600 });

  browser = await chromium.launch({
    headless: true,
    timeout: actionTimeoutMs,
    executablePath: executablePath || undefined,
    args: ["--password-store=basic", "--use-mock-keychain"]
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultTimeout(actionTimeoutMs);
  await page.goto(pathToFileURL(fixturePath).href, { waitUntil: "domcontentloaded", timeout: actionTimeoutMs });

  const status = page.getByRole("status");
  await status.waitFor({ state: "visible", timeout: actionTimeoutMs });
  const initialText = await status.textContent();
  if (initialText !== "Loading report") throw new Error(`Unexpected initial status: ${initialText}`);
  await page.evaluate(() => window.startReport());
  await page.waitForFunction(
    () => document.querySelector('[role="status"]')?.textContent === "Ready: report is available",
    undefined,
    { timeout: actionTimeoutMs }
  );
  const readyText = await status.textContent();
  const actionEnabled = await page.getByRole("button", { name: "Open report" }).isEnabled();
  const aria = await page.locator("main").ariaSnapshot();
  const screenshotPath = path.join(outputDir, "fixture.png");
  await page.screenshot({ path: screenshotPath, fullPage: true, timeout: actionTimeoutMs });

  if (initialText !== "Loading report" || readyText !== "Ready: report is available" || !actionEnabled) {
    throw new Error(`Unexpected state: initial=${initialText}; ready=${readyText}; enabled=${actionEnabled}`);
  }
  if (!aria.includes("Ready: report is available") || !aria.includes("A blue rising line")) {
    throw new Error("The accessibility snapshot did not include the expected status and chart description.");
  }

  console.log(JSON.stringify({
    result: "synthetic_fixture_passed",
    initialText,
    readyText,
    actionEnabled,
    accessibilitySnapshotContainsReadyStatus: true,
    accessibilitySnapshotContainsChartDescription: true,
    screenshotCaptured: true,
    temporaryScreenshotRemovedAfterCapture: true
  }, null, 2));
  await context.close();
} finally {
  if (browser) await browser.close();
  await rm(outputDir, { recursive: true, force: true });
}
