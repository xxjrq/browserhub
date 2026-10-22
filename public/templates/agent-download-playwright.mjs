import path from 'node:path';
import { mkdir, mkdtemp } from 'node:fs/promises';
import { chromium } from 'playwright';

// Example: node public/templates/agent-download-playwright.mjs https://example.com "Export CSV"
const [url, accessibleName] = process.argv.slice(2);
if (!url || !accessibleName) {
  throw new Error('Usage: node agent-download-playwright.mjs <page-url> <download-button-accessible-name>');
}

const downloadsRoot = path.resolve('downloads');
await mkdir(downloadsRoot, { recursive: true });
const outputDir = await mkdtemp(path.join(downloadsRoot, 'run-'));
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
try {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Promise.all registers the event waiter before running the click and handles both outcomes.
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 30_000 }),
    page.getByRole('button', { name: accessibleName }).click()
  ]);
  const failure = await download.failure();
  if (failure) throw new Error('Browser reported download failure: ' + failure);

  // suggestedFilename comes from page content; discard any path components.
  const filename = path.basename(download.suggestedFilename().replaceAll('\\', '/'));
  if (!filename || filename === '.' || filename === '..' || filename === path.sep) {
    throw new Error('The browser did not provide a usable suggested filename.');
  }
  const destination = path.join(outputDir, filename);
  await download.saveAs(destination);
  console.log('Saved download to ' + destination);
} finally {
  // Save before closing the context; Playwright's temporary download is context-scoped.
  await context.close();
  await browser.close();
}
