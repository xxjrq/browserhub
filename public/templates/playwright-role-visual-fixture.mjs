import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createServer } from "node:http";

const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL
  ? await import(process.env.PLAYWRIGHT_MODULE_URL)
  : await import("playwright");
const { chromium } = playwrightModule;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Local role and screenshot fixture</title>
  <style>
    body { font: 16px sans-serif; margin: 48px auto; max-width: 760px; color: #14213d; }
    main { border: 1px solid #b8c3d1; border-radius: 12px; padding: 24px; }
    #timestamp { color: #475569; display: block; font-family: monospace; height: 24px; width: 340px; }
    #audit { margin-top: 18px; background: #eef4ff; padding: 14px; }
    .status { min-height: 1.5em; }
  </style>
</head>
<body>
  <main>
    <h1>Workspace access</h1>
    <p id="role">Role: loading</p>
    <p id="timestamp" aria-label="Current fixture time"></p>
    <a id="audit-link" href="#audit" hidden>Open synthetic audit panel</a>
    <section id="audit" hidden aria-label="Synthetic audit panel">
      <h2>Audit panel</h2>
      <p>This record is synthetic local fixture data.</p>
    </section>
    <p id="api-status" class="status" role="status">Checking access</p>
  </main>
  <script>
    // This caller-controlled cookie is a toy role selector, never an authentication credential.
    const role = document.cookie.match(/(?:^|; )fixture-role=([^;]+)/)?.[1] || "anonymous";
    document.querySelector("#role").textContent = "Role: " + role;
    document.querySelector("#timestamp").textContent = "Checked at 2026-11-01T12:00:00.000Z";
    if (role === "admin") document.querySelector("#audit-link").hidden = false;
    document.querySelector("#audit-link").addEventListener("click", event => {
      event.preventDefault();
      document.querySelector("#audit").hidden = false;
    });
    fetch("/api/audit").then(async response => {
      const body = await response.json();
      document.querySelector("#api-status").textContent = response.status + ": " + body.message;
    });
  </script>
</body>
</html>`;

const server = createServer((request, response) => {
  const url = new URL(request.url || "/", "http://127.0.0.1");
  if (url.pathname === "/api/audit") {
    // Synthetic authorization branch only; not an authn/authz implementation to copy.
    const isAdmin = /(?:^|;\s*)fixture-role=admin(?:;|$)/.test(request.headers.cookie || "");
    response.writeHead(isAdmin ? 200 : 403, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(isAdmin
      ? { message: "synthetic audit record available", id: "fixture-record-01" }
      : { message: "forbidden in synthetic fixture" }));
    return;
  }
  if (url.pathname !== "/" && url.pathname !== "/app") {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("not found");
    return;
  }
  response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  response.end(html);
});

const waitForListen = serverInstance => new Promise((resolve, reject) => {
  serverInstance.once("error", reject);
  serverInstance.listen(0, "127.0.0.1", () => {
    serverInstance.off("error", reject);
    resolve(serverInstance.address().port);
  });
});

const sha256 = buffer => createHash("sha256").update(buffer).digest("hex");
const differingBytes = (left, right) => {
  let count = Math.abs(left.length - right.length);
  for (let index = 0; index < Math.min(left.length, right.length); index += 1) {
    if (left[index] !== right[index]) count += 1;
  }
  return count;
};

let browser;
let adminContext;
let memberContext;
try {
  const port = await waitForListen(server);
  const baseURL = `http://127.0.0.1:${port}`;
  const launchOptions = {
    headless: true,
    args: [
      "--password-store=basic",
      "--use-mock-keychain",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--no-first-run",
      "--no-default-browser-check"
    ]
  };
  if (process.env.CHROME_EXECUTABLE_PATH) launchOptions.executablePath = process.env.CHROME_EXECUTABLE_PATH;
  browser = await chromium.launch(launchOptions);
  const contextOptions = {
    viewport: { width: 1200, height: 760 },
    deviceScaleFactor: 1,
    serviceWorkers: "block"
  };
  adminContext = await browser.newContext(contextOptions);
  memberContext = await browser.newContext(contextOptions);
  for (const [context, role] of [[adminContext, "admin"], [memberContext, "member"]]) {
    // Deliberately readable and caller-controlled so the toy page can render the state.
    await context.addCookies([{ name: "fixture-role", value: role, url: baseURL, httpOnly: false, sameSite: "Lax" }]);
    await context.route("**/*", route => {
      const target = new URL(route.request().url());
      return target.origin === baseURL ? route.continue() : route.abort();
    });
  }

  const adminPage = await adminContext.newPage();
  const memberPage = await memberContext.newPage();
  await Promise.all([adminPage.goto(`${baseURL}/app`), memberPage.goto(`${baseURL}/app`)]);
  await Promise.all([
    adminPage.waitForFunction(() => document.querySelector("#api-status")?.textContent?.startsWith("200:"), null, { timeout: 5000 }),
    memberPage.waitForFunction(() => document.querySelector("#api-status")?.textContent?.startsWith("403:"), null, { timeout: 5000 })
  ]);
  const adminStatus = await adminPage.locator("#api-status").textContent();
  const memberStatus = await memberPage.locator("#api-status").textContent();
  assert.match(adminStatus || "", /^200:/);
  assert.match(memberStatus || "", /^403:/);
  assert.equal(await adminPage.locator("#audit-link").isVisible(), true);
  assert.equal(await memberPage.locator("#audit-link").isVisible(), false);
  await adminPage.locator("#audit-link").click();
  assert.equal(await adminPage.getByRole("heading", { name: "Audit panel" }).isVisible(), true);
  const directMemberResponse = await memberContext.request.get(`${baseURL}/api/audit`, { timeout: 5000 });
  assert.equal(directMemberResponse.status(), 403);

  const timestamp = memberPage.locator("#timestamp");
  const firstText = "Checked at 2026-11-01T12:00:00.000Z";
  const secondText = "Checked at 2026-11-01T12:00:01.000Z";
  await timestamp.evaluate((element, text) => { element.textContent = text; }, firstText);
  const firstTextObserved = await timestamp.textContent();
  assert.equal(firstTextObserved, firstText);
  const firstUnmasked = await memberPage.screenshot({ fullPage: true });
  const firstMasked = await memberPage.screenshot({ fullPage: true, mask: [timestamp] });

  await timestamp.evaluate((element, text) => { element.textContent = text; }, secondText);
  const secondTextObserved = await timestamp.textContent();
  assert.equal(secondTextObserved, secondText);
  const secondUnmasked = await memberPage.screenshot({ fullPage: true });
  const secondMasked = await memberPage.screenshot({ fullPage: true, mask: [timestamp] });

  assert.notDeepEqual(firstUnmasked, secondUnmasked, "Unmasked screenshots should preserve the timestamp difference");
  assert.deepEqual(firstMasked, secondMasked, "Mask should isolate only the changing timestamp in this controlled same-process capture");

  console.log(JSON.stringify({
    result: "local_synthetic_role_and_mask_comparison_completed",
    nodeVersion: process.version,
    browserVersion: browser.version(),
    roles: {
      admin: { renderedStatus: adminStatus, auditLinkVisible: true, panelOpened: true },
      member: { renderedStatus: memberStatus, auditLinkVisible: false, directProtectedRequest: directMemberResponse.status() }
    },
    screenshotComparison: {
      scope: "Same page, same process and browser, same rendered layout; synthetic timestamp text is the only intentional state change.",
      firstTextAsserted: firstTextObserved,
      secondTextAsserted: secondTextObserved,
      unmaskedPngSha256: [sha256(firstUnmasked), sha256(secondUnmasked)],
      unmaskedPngDifferingByteCount: differingBytes(firstUnmasked, secondUnmasked),
      maskedPngSha256: [sha256(firstMasked), sha256(secondMasked)],
      maskedPngDifferingByteCount: differingBytes(firstMasked, secondMasked),
      maskedPngBytesEqual: firstMasked.equals(secondMasked),
      screenshotFilesWritten: false
    },
    pageRequestsAllowed: "exact 127.0.0.1 origin and ephemeral port only through Playwright page routing; service workers blocked",
    roleSelector: "Readable caller-controlled synthetic fixture cookie, not authentication or a security mechanism",
    realAccounts: false,
    productionWrites: false,
    applicationBackendTested: false,
    authorizationScope: "Synthetic Node HTTP branch only; not an authentication or production authorization assessment",
    portabilityClaim: "No cross-OS, cross-browser-build, CI-worker, baseline, or real-application compatibility claim"
  }, null, 2));
} finally {
  await Promise.allSettled([adminContext?.close(), memberContext?.close(), browser?.close()]);
  await new Promise(resolve => server.close(() => resolve()));
}
