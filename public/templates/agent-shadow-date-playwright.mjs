import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({
	headless: true,
	...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
		? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
		: {})
});

try {
	const context = await browser.newContext();
	await context.route("**/*", (route) => route.abort());
	const page = await context.newPage();
	page.setDefaultTimeout(5000);
	await page.setContent(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Offline controls fixture</title></head>
  <body>
    <open-settings></open-settings>
    <label for="native-date">Start date</label>
    <input id="native-date" type="date">

    <label for="custom-date">Custom date</label>
    <input id="custom-date" type="text" readonly>
    <button id="choose-date" type="button" aria-haspopup="dialog">Choose date</button>
    <div id="calendar" role="dialog" aria-label="Choose date" hidden>
      <button type="button" aria-label="June 15, 2026">15</button>
    </div>
    <script>
      customElements.define('open-settings', class extends HTMLElement {
        connectedCallback() {
          const root = this.attachShadow({ mode: 'open' });
          root.innerHTML = '<button type="button">Open settings</button><div role="dialog" aria-label="Settings" hidden>Fixture settings</div>';
          const button = root.querySelector('button');
          const dialog = root.querySelector('[role="dialog"]');
          button.addEventListener('click', () => { dialog.hidden = false; });
        }
      });
      const choose = document.querySelector('#choose-date');
      const calendar = document.querySelector('#calendar');
      const output = document.querySelector('#custom-date');
      choose.addEventListener('click', () => { calendar.hidden = false; });
      calendar.querySelector('button').addEventListener('click', (event) => {
        output.value = '2026-06-15';
        calendar.hidden = true;
      });
    </script>
  </body>
</html>`, { waitUntil: "domcontentloaded" });

	await page.getByRole("button", { name: "Open settings" }).click();
	assert.equal(await page.getByRole("dialog", { name: "Settings" }).isVisible(), true);

	const nativeDate = page.getByLabel("Start date");
	await nativeDate.fill("2026-06-15");
	assert.equal(await nativeDate.inputValue(), "2026-06-15");

	await page.getByRole("button", { name: "Choose date" }).click();
	const calendar = page.getByRole("dialog", { name: "Choose date" });
	await calendar.getByRole("button", { name: "June 15, 2026", exact: true }).click();
	assert.equal(await page.getByLabel("Custom date").inputValue(), "2026-06-15");
	assert.equal(await calendar.isVisible(), false);

	console.log(JSON.stringify({
		fixture: "synthetic local HTML; application requests blocked",
		shadowDom: "passed",
		nativeDateInput: "passed",
		customDateDialog: "passed",
		externalNavigation: "not used",
		realFormSubmission: "not used"
	}));
} finally {
	await browser.close();
}
