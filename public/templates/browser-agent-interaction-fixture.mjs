#!/usr/bin/env node
// Synthetic local-only examples for dynamic comboboxes, blocked clicks and
// help tooltips. Playwright creates and removes its disposable browser profile.
// No external pages, accounts, models or production writes.
// Requires Node.js 22+, Playwright, and Chromium.
// Optional: PLAYWRIGHT_MODULE_URL and CHROME_EXECUTABLE_PATH select existing installs.
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const configuredModule = process.env.PLAYWRIGHT_MODULE_URL;
const moduleUrl = configuredModule
  ? configuredModule.startsWith("file:")
    ? configuredModule
    : pathToFileURL(resolve(configuredModule)).href
  : "playwright";
const playwrightModule = await import(moduleUrl);
const chromium = playwrightModule.chromium ?? playwrightModule.default?.chromium;
if (!chromium) throw new Error("The selected Playwright module did not export chromium");

const html = `<!doctype html><meta charset="utf-8"><title>Local browser-agent interaction fixture</title>
<style>
  body { font: 16px/1.5 sans-serif; margin: 2rem; }
  section { border-block-end: 1px solid #bbb; margin-block: 1.5rem; padding-block-end: 1rem; }
  label { display: block; margin-block-end: .4rem; }
  input { padding: .45rem; width: 18rem; }
  #suggestions { background: white; border: 1px solid #777; margin: 0; max-width: 19rem; padding: 0; }
  #suggestions[hidden] { display: none; }
  #suggestions [role="option"] { cursor: pointer; list-style: none; padding: .4rem; }
  #suggestions [role="option"]:hover { background: #e8eef8; }
  #save { margin-block: .5rem; padding: .45rem .8rem; }
  #blocked-zone { min-height: 6rem; position: relative; width: 22rem; }
  #fixture-scrim { background: rgb(30 40 50 / .35); inset: 0; position: absolute; z-index: 2; }
  #dismiss-fixture-overlay { left: .5rem; position: absolute; top: .5rem; z-index: 3; }
  #fixture-tooltip { background: #222; border-radius: .25rem; color: white; max-width: 19rem; padding: .55rem; }
  #fixture-tooltip[hidden] { display: none; }
</style>
<h1>Local synthetic interaction fixture</h1>
<section aria-labelledby="combo-heading">
  <h2 id="combo-heading">Dynamic department picker</h2>
  <label for="department">Department</label>
  <input id="department" role="combobox" aria-autocomplete="list" aria-controls="suggestions" aria-expanded="false" autocomplete="off">
  <ul id="suggestions" role="listbox" aria-label="Department suggestions" hidden></ul>
  <output id="department-committed">No department committed</output>
</section>
<section aria-labelledby="click-heading">
  <h2 id="click-heading">Blocked local action</h2>
  <div id="blocked-zone">
    <button id="save" type="button">Save local draft</button>
    <div id="fixture-scrim" aria-hidden="true"></div>
    <button id="dismiss-fixture-overlay" type="button">Dismiss fixture overlay</button>
  </div>
  <output id="save-result">Not saved</output>
</section>
<section aria-labelledby="tooltip-heading">
  <h2 id="tooltip-heading">Supplementary help</h2>
  <button id="renewal-help" type="button" aria-describedby="fixture-tooltip">Renewal date help</button>
  <div id="fixture-tooltip" role="tooltip" hidden>Renewal date is shown in the selected plan's time zone.</div>
</section>
<script>
  const picker = document.querySelector('#department');
  const list = document.querySelector('#suggestions');
  const committed = document.querySelector('#department-committed');
  let requestNumber = 0;
  picker.addEventListener('input', () => {
    const currentRequest = ++requestNumber;
    const query = picker.value.trim();
    picker.setAttribute('aria-expanded', 'true');
    list.hidden = false;
    list.replaceChildren();
    setTimeout(() => {
      if (currentRequest !== requestNumber) return;
      const matches = ['Research', 'Support'].filter(name => name.toLowerCase().includes(query.toLowerCase()));
      list.innerHTML = matches.map(name => '<li role="option" tabindex="-1" data-value="' + name.toLowerCase() + '">' + name + '</li>').join('');
      list.querySelectorAll('[role="option"]').forEach(option => option.addEventListener('click', () => {
        picker.value = option.textContent;
        picker.setAttribute('aria-expanded', 'false');
        list.hidden = true;
        committed.textContent = 'department:' + option.dataset.value;
      }));
    }, 120);
  });

  const scrim = document.querySelector('#fixture-scrim');
  document.querySelector('#dismiss-fixture-overlay').addEventListener('click', event => { scrim.hidden = true; event.currentTarget.hidden = true; });
  document.querySelector('#save').addEventListener('click', () => {
    document.querySelector('#save-result').textContent = 'Saved local draft';
  });

  const helpTrigger = document.querySelector('#renewal-help');
  const tooltip = document.querySelector('#fixture-tooltip');
  const showHelp = () => { tooltip.hidden = false; };
  const hideHelp = () => { tooltip.hidden = true; };
  helpTrigger.addEventListener('mouseenter', showHelp);
  helpTrigger.addEventListener('mouseleave', hideHelp);
  helpTrigger.addEventListener('focus', showHelp);
  helpTrigger.addEventListener('blur', hideHelp);
  helpTrigger.addEventListener('keydown', event => { if (event.key === 'Escape') hideHelp(); });
</script>`;

const server = createServer((request, response) => {
  if (request.method !== "GET" || request.url !== "/") {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("not found");
    return;
  }
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(html);
});

let browser;
let context;
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
  context = await browser.newContext({ serviceWorkers: "block" });
  context.setDefaultTimeout(5000);
  await context.route("**/*", async route => {
    if (new URL(route.request().url()).origin !== origin) return route.abort("blockedbyclient");
    return route.continue();
  });
  const page = await context.newPage();
  await page.goto(origin, { waitUntil: "load", timeout: 5000 });

  const picker = page.getByRole("combobox", { name: "Department" });
  await picker.fill("Res");
  await page.getByRole("option", { name: "Research", exact: true }).waitFor({ state: "visible" });
  assert.equal(await page.locator("#department-committed").textContent(), "No department committed", "typed query must not be mistaken for a selected value");
  await page.getByRole("option", { name: "Research", exact: true }).click();
  assert.equal(await page.locator("#department-committed").textContent(), "department:research", "the local model should record an explicit option selection");
  assert.equal(await picker.inputValue(), "Research", "the control should show the selected label");

  const save = page.getByRole("button", { name: "Save local draft" });
  let blockedClickEvidence = "";
  try {
    await save.click({ trial: true });
  } catch (error) {
    blockedClickEvidence = String(error);
  }
  assert.match(blockedClickEvidence, /intercepts pointer events/i, "the covered target should fail a real Playwright actionability trial");
  assert.equal(await page.locator("#save-result").textContent(), "Not saved", "a trial must not activate the covered control");
  // This fixture explicitly authorizes only its named local dismissal action.
  await page.getByRole("button", { name: "Dismiss fixture overlay" }).click();
  await save.click();
  assert.equal(await page.locator("#save-result").textContent(), "Saved local draft", "the normal click should succeed after the fixture overlay is dismissed");

  const helpTrigger = page.getByRole("button", { name: "Renewal date help" });
  const tooltip = page.getByRole("tooltip");
  await helpTrigger.hover();
  await tooltip.waitFor({ state: "visible" });
  const hoverHelp = await tooltip.textContent();
  const describedBy = await helpTrigger.getAttribute("aria-describedby");
  assert.equal(describedBy, "fixture-tooltip", "the help trigger should reference its description");
  assert.equal(await tooltip.getAttribute("id"), describedBy, "the revealed tooltip must match the trigger association");
  assert.match(hoverHelp ?? "", /selected plan's time zone/i);
  await page.mouse.move(2, 2);
  await tooltip.waitFor({ state: "hidden" });
  await helpTrigger.focus();
  await tooltip.waitFor({ state: "visible" });
  const programmaticHelp = await tooltip.textContent();
  assert.equal(programmaticHelp, hoverHelp, "programmatic locator.focus() should reveal the same associated help text");

  console.log(JSON.stringify({
    result: "local_browser_agent_interaction_fixture_passed",
    nodeVersion: process.version,
    browserVersion: browser.version(),
    combobox: { query: "Res", matchedOption: "Research", committed: "department:research", typedTextWasNotTreatedAsSelection: true },
    blockedClick: { trialDetectedIntercept: true, fixtureDismissalAuthorized: true, resultAfterNormalClick: "Saved local draft" },
    tooltip: { hoverText: hoverHelp, programmaticFocusText: programmaticHelp, ariaDescribedBy: describedBy },
    externalPageRequestsAllowed: false,
    realAccounts: false,
    localStateChanged: true,
    serverWrites: false,
    productionWrites: false,
    appFrameworkOrVendorWidgetTested: false,
    modelOrAgentReasoningTested: false,
    networkScope: "Playwright page-request routing; not a physical network audit",
  }, null, 2));
} catch (error) {
  console.error("Local browser-agent interaction fixture failed:", error);
  process.exitCode = 1;
} finally {
  try {
    if (context) await context.close();
    if (browser) await browser.close();
  } finally {
    await new Promise(resolveClose => server.close(resolveClose));
  }
}
