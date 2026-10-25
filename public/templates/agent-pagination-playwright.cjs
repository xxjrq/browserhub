async function collect(page) {
  const cards = page.locator('[data-testid="result-card"]');
  const end = page.getByTestId('results-end');
  const seen = new Map();
  const maxAdvances = 40;
  let stopReason = 'advance_limit';
  if (await cards.count() === 0) throw new Error('No result cards matched the inspected selector');

  for (let step = 0; step <= maxAdvances; step++) {
    const rows = await cards.evaluateAll(elements => elements.map(element => ({
      key: element.getAttribute('data-record-id'),
      text: element.innerText
    })));
    for (const row of rows) {
      if (row.key) seen.set(row.key, row.text);
    }
    if (await end.isVisible().catch(() => false)) {
      stopReason = 'end_marker';
      break;
    }
    if (step === maxAdvances) break;
    const before = await cards.last().getAttribute('data-record-id').catch(() => null);
    await cards.last().scrollIntoViewIfNeeded();
    try {
      await page.waitForFunction(
        ({ selector, previous }) => {
          const rows = [...document.querySelectorAll(selector)];
          return rows.length > 0 && rows.at(-1)?.getAttribute('data-record-id') !== previous;
        },
        { selector: '[data-testid="result-card"]', previous: before },
        { timeout: 8000 }
      );
    } catch {
      stopReason = 'no_new_last_key_before_timeout';
      break;
    }
  }
  return { records: [...seen.entries()], stopReason, completion: stopReason === 'end_marker' ? 'complete' : 'incomplete_or_stalled', uniqueKeysSeen: seen.size };
}

(async () => {
  const target = process.env.AUTHORIZED_TEST_URL;
  if (!target) throw new Error('Set AUTHORIZED_TEST_URL to a page you are authorized to automate');
  const url = new URL(target);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Only HTTP(S) URLs are accepted');
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(15000);
    await page.goto(url.href, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const result = await collect(page);
    console.log(JSON.stringify(result));
    if (result.stopReason !== 'end_marker') process.exitCode = 2;
  } finally {
    await browser.close();
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
