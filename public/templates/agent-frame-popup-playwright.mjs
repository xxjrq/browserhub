import assert from "node:assert/strict";
import { chromium } from "playwright";

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
const browser = await chromium.launch({
	headless: true,
	...(executablePath ? { executablePath } : {})
});

try {
	const context = await browser.newContext();
	context.setDefaultTimeout(10_000);
	await context.route("**/*", (route) => route.abort());
	const page = await context.newPage();
	const iframeDocument = `<!doctype html>
<html lang="en">
	<head><meta charset="utf-8"><title>Local form</title></head>
	<body>
		<label for="display-name">Display name</label>
		<input id="display-name" name="display-name">
		<button type="button" id="save">Save local value</button>
		<p role="status" aria-live="polite"></p>
		<script>
			document.querySelector("#save").addEventListener("click", () => {
				const value = document.querySelector("#display-name").value;
				document.querySelector('[role="status"]').textContent = "Saved example: " + value;
			});
		</script>
	</body>
</html>`;
	const encodedSrcdoc = iframeDocument.replaceAll('"', "&quot;");

	await page.setContent(`<!doctype html>
<html lang="en">
	<head><meta charset="utf-8"><title>Offline browser-agent fixture</title></head>
	<body>
		<h1>Offline browser-agent fixture</h1>
		<iframe title="Local test form" srcdoc="${encodedSrcdoc}"></iframe>
		<button type="button" id="open-popup">Open local popup</button>
		<script>
			document.querySelector("#open-popup").addEventListener("click", () => {
				const popup = window.open("about:blank", "agent-fixture-popup");
				if (!popup) return;
				popup.document.title = "Local popup fixture";
				const heading = popup.document.createElement("h1");
				heading.textContent = "Synthetic popup ready";
				popup.document.body.append(heading);
			});
		</script>
	</body>
</html>`);

	const frame = page.frameLocator('iframe[title="Local test form"]');
	await frame.getByLabel("Display name").fill("Example User");
	await frame.getByRole("button", { name: "Save local value" }).click();
	const frameStatus = (await frame.getByRole("status").textContent())?.trim();
	assert.equal(frameStatus, "Saved example: Example User");

	const [popup] = await Promise.all([
		page.waitForEvent("popup"),
		page.getByRole("button", { name: "Open local popup" }).click()
	]);
	assert.equal(popup.url(), "about:blank");
	assert.equal(await popup.opener(), page, "popup should belong to the page that opened it");
	const popupHeading = (await popup.getByRole("heading").textContent())?.trim();
	assert.equal(popupHeading, "Synthetic popup ready");
	await popup.close();

	console.log(JSON.stringify({
		fixture: "synthetic fixture; application requests blocked",
		frame: "passed",
		popup: "passed",
		authentication: "not used"
	}));
} finally {
	await browser.close();
}
