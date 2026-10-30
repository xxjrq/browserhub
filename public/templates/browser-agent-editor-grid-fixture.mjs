#!/usr/bin/env node
// Synthetic local-only checks for controlled contenteditable state and a
// two-axis virtualized grid. No account or production/server writes.
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

const html = `<!doctype html><meta charset="utf-8"><title>Local editor and grid fixture</title>
<style>
  body { font: 16px sans-serif; margin: 2rem; }
  #editor { border: 1px solid #777; min-height: 2rem; padding: .5rem; }
  #grid-viewport { border: 1px solid #777; height: 190px; width: 440px; overflow: auto; }
  #grid { position: relative; }
  [role="row"] { box-sizing: border-box; position: relative; height: 30px; width: 800px; }
  [role="columnheader"], [role="cell"], [role="rowheader"] { box-sizing: border-box; width: 160px; height: 30px; padding: 4px 6px; line-height: 20px; white-space: nowrap; border: 1px solid #ddd; }
  [role="columnheader"], [role="cell"] { position: absolute; top: 0; }
  [role="rowheader"] { position: sticky; left: 0; background: white; z-index: 1; }
  [role="row"][data-grid-header="true"] { position: sticky; top: 0; z-index: 3; background: white; }
  [role="row"][data-record-key] { position: absolute; left: 0; }
</style>
<h1>Local synthetic fixture</h1>
<section aria-labelledby="editor-title">
  <h2 id="editor-title">Controlled editor</h2>
  <div id="editor" role="textbox" aria-label="Draft note" contenteditable="true">Starting note</div>
  <button id="save" disabled>Save draft</button>
  <output id="editor-state">unchanged</output>
</section>
<section aria-labelledby="grid-title">
  <h2 id="grid-title">Virtualized support grid</h2>
  <div id="grid-viewport" aria-label="Synthetic cases viewport"><div id="grid" role="grid" aria-label="Synthetic cases"></div></div>
  <output id="opened-case">none</output>
</section>
<script>
  const editor = document.querySelector('#editor');
  const save = document.querySelector('#save');
  const editorState = document.querySelector('#editor-state');
  let draft = editor.textContent;
  editor.addEventListener('input', event => {
    draft = event.currentTarget.textContent;
    save.disabled = false;
    editorState.textContent = 'draft:' + draft;
  });

  const viewport = document.querySelector('#grid-viewport');
  const grid = document.querySelector('#grid');
  const openedCase = document.querySelector('#opened-case');
  const allColumns = ['Owner', 'Status', 'Updated', 'Action'];
  const cases = Array.from({ length: 60 }, (_, i) => ({
    id: 'CASE-' + String(4177 + i).padStart(4, '0'),
    owner: 'Team ' + (i % 4 + 1),
    status: i % 2 ? 'Open' : 'Waiting',
    updated: '2026-10-' + String(i % 28 + 1).padStart(2, '0'),
  }));
  grid.style.width = ((allColumns.length + 1) * 160) + 'px';
  grid.style.height = ((cases.length + 1) * 30) + 'px';
  function render() {
    const firstRow = Math.max(0, Math.min(cases.length - 8, Math.floor(Math.max(0, viewport.scrollTop - 30) / 30)));
    const firstColumn = Math.max(0, Math.min(allColumns.length - 2, Math.floor(viewport.scrollLeft / 160)));
    const visibleColumns = allColumns.slice(firstColumn, firstColumn + 2);
    const head = '<div role="row" data-grid-header="true"><div role="columnheader" style="position:sticky;left:0;background:white;z-index:4">Case ID</div>' +
      visibleColumns.map(name => {
        const columnIndex = allColumns.indexOf(name);
        return '<div role="columnheader" data-column="' + name + '" style="left:' + ((columnIndex + 1) * 160) + 'px">' + name + '</div>';
      }).join('') + '</div>';
    const body = cases.slice(firstRow, firstRow + 8).map((item, visibleIndex) => {
      const cells = visibleColumns.map(name => {
        if (name === 'Action') return '<div role="cell" data-column="Action" style="left:' + ((allColumns.indexOf(name) + 1) * 160) + 'px"><button type="button" data-action="open">Open</button></div>';
        const value = name === 'Owner' ? item.owner : name === 'Status' ? item.status : item.updated;
        return '<div role="cell" data-column="' + name + '" style="left:' + ((allColumns.indexOf(name) + 1) * 160) + 'px">' + value + '</div>';
      }).join('');
      return '<div role="row" data-record-key="' + item.id + '" style="top:' + ((firstRow + visibleIndex + 1) * 30) + 'px"><div role="rowheader">' + item.id + '</div>' + cells + '</div>';
    }).join('');
    grid.innerHTML = head + body;
    grid.querySelectorAll('[data-action="open"]').forEach(button => {
      button.addEventListener('click', event => {
        const row = event.currentTarget.closest('[data-record-key]');
        openedCase.textContent = 'opened:' + row.dataset.recordKey;
      });
    });
  }
  viewport.addEventListener('scroll', render);
  render();
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
  const context = await browser.newContext({ serviceWorkers: "block" });
  context.setDefaultTimeout(5000);
  await context.route("**/*", async route => {
    if (new URL(route.request().url()).origin !== origin) return route.abort("blockedbyclient");
    return route.continue();
  });
  const page = await context.newPage();
  await page.goto(origin, { waitUntil: "load", timeout: 5000 });

  const editor = page.getByRole("textbox", { name: "Draft note" });
  await editor.fill("Synthetic revised note");
  await page.waitForFunction(() => document.querySelector("#save")?.disabled === false);
  assert.equal(await page.getByRole("button", { name: "Save draft" }).isEnabled(), true, "the local draft control should become enabled");
  const draftResult = await page.locator("#editor-state").textContent();
  assert.equal(draftResult, "draft:Synthetic revised note", "the input event should update the synthetic app model");

  const viewport = page.locator("#grid-viewport");
  const initialGrid = await viewport.evaluate(element => ({
    logicalHeight: element.querySelector('#grid').getBoundingClientRect().height,
    renderedRows: element.querySelectorAll('[data-record-key]').length,
    targetRendered: !!element.querySelector('[data-record-key="CASE-4219"]'),
    actionRendered: !!element.querySelector('[role="columnheader"][data-column="Action"]'),
  }));
  assert.equal(initialGrid.logicalHeight, 61 * 30, "all 60 logical rows plus the header must occupy scroll space");
  assert.equal(initialGrid.renderedRows, 8, "only eight data rows should be mounted");
  assert.equal(initialGrid.targetRendered, false, "the requested row should initially be virtualized away");
  assert.equal(initialGrid.actionRendered, false, "the Action column should initially be virtualized away");
  await viewport.evaluate(element => { element.scrollTop = 42 * 30; element.dispatchEvent(new Event("scroll")); });
  await page.getByRole("rowheader", { name: "CASE-4219", exact: true }).waitFor({ state: "visible" });
  await viewport.evaluate(element => { element.scrollLeft = element.scrollWidth - element.clientWidth; element.dispatchEvent(new Event("scroll")); });
  await page.getByRole("columnheader", { name: "Action", exact: true }).waitFor({ state: "visible" });
  // Re-resolve the business key and column after both scrolls; DOM presence alone
  // does not prove that a virtualized cell occupies the visible target row.
  const targetRow = page.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "CASE-4219", exact: true }) });
  const keyBefore = await targetRow.getAttribute("data-record-key");
  assert.equal(keyBefore, "CASE-4219", "the currently rendered row must match the requested business key");
  const openButton = targetRow.locator('[role="cell"][data-column="Action"]').getByRole("button", { name: "Open", exact: true });
  const geometry = await openButton.evaluate(button => {
    const viewport = document.querySelector('#grid-viewport');
    const row = button.closest('[data-record-key]');
    const key = row.querySelector('[role="rowheader"]');
    const cell = button.closest('[role="cell"]');
    const header = document.querySelector('[role="columnheader"][data-column="Action"]');
    const viewportRect = viewport.getBoundingClientRect();
    const bounds = {
      left: viewportRect.left + viewport.clientLeft,
      top: viewportRect.top + viewport.clientTop,
      right: viewportRect.left + viewport.clientLeft + viewport.clientWidth,
      bottom: viewportRect.top + viewport.clientTop + viewport.clientHeight,
    };
    const rowRect = row.getBoundingClientRect();
    const keyRect = key.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const inside = (rect, area) => rect.width > 0 && rect.height > 0 &&
      rect.left >= area.left && rect.right <= area.right && rect.top >= area.top && rect.bottom <= area.bottom;
    const visible = rect => inside(rect, bounds) && inside(rect, { left: 0, top: 0, right: innerWidth, bottom: innerHeight });
    const hit = element => {
      const rect = element.getBoundingClientRect();
      return element.contains(document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2));
    };
    return {
      rowKey: row.dataset.recordKey,
      checks: {
        visibleBusinessKey: key.textContent === 'CASE-4219' && visible(keyRect) && hit(key),
        visibleActionHeader: header.textContent === 'Action' && visible(headerRect) && hit(header),
        sameRow: keyRect.top === rowRect.top && cellRect.top === rowRect.top && cellRect.height === rowRect.height,
        sameColumn: cell.dataset.column === 'Action' && cellRect.left === headerRect.left && cellRect.width === headerRect.width,
        buttonInsideCell: inside(buttonRect, cellRect),
        belowStickyHeader: keyRect.top >= headerRect.bottom && buttonRect.top >= headerRect.bottom,
        visibleActionButton: visible(buttonRect) && hit(button),
      },
      scrollTop: viewport.scrollTop,
      scrollLeft: viewport.scrollLeft,
    };
  });
  assert.equal(geometry.rowKey, "CASE-4219", "the fresh Action locator must still belong to the requested key");
  for (const [check, passed] of Object.entries(geometry.checks)) assert.equal(passed, true, "pre-click geometry: " + check);
  await openButton.click();
  const actionResult = await page.locator("#opened-case").textContent();
  assert.equal(actionResult, "opened:CASE-4219", "the details action must retain the requested row key");

  console.log(JSON.stringify({
    result: "local_editor_and_virtual_grid_fixture_passed",
    nodeVersion: process.version,
    browserVersion: browser.version(),
    editor: { input: "Synthetic revised note", visibleState: draftResult, saveEnabled: true },
    grid: { logicalRows: 60, renderedRows: await page.getByRole("row").count() - 1, targetKey: keyBefore, visibleActionColumn: true, geometry, result: actionResult },
    externalPageRequestsAllowed: false,
    realAccounts: false,
    localStateChanged: true,
    serverWrites: false,
    productionWrites: false,
    productionEditorOrGridTested: false,
    columnVirtualizationModel: "synthetic fixture only",
    networkScope: "Playwright page-request routing; not a physical network audit",
  }, null, 2));
  await context.close();
} catch (error) {
  console.error("Local editor/grid fixture failed:", error);
  process.exitCode = 1;
} finally {
  try {
    if (browser) await browser.close();
  } finally {
    await new Promise(resolveClose => server.close(resolveClose));
  }
}
