import assert from "node:assert/strict";
import { createServer } from "node:http";

const playwrightModule = process.env.PLAYWRIGHT_MODULE_URL
  ? await import(process.env.PLAYWRIGHT_MODULE_URL)
  : await import("playwright");
const { chromium, request } = playwrightModule;

const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Local SPA history fixture</title></head>
<body>
  <main>
    <h1 id="view">Home</h1>
    <button id="profile" type="button">Open profile</button>
    <button id="settings" type="button">Open settings</button>
  </main>
  <script>
    const view = document.querySelector("#view");
    const render = () => {
      const route = location.pathname.split("/").filter(Boolean).at(-1);
      view.textContent = route === "profile" ? "Profile" : route === "settings" ? "Settings" : "Home";
    };
    document.querySelector("#profile").addEventListener("click", () => {
      history.pushState({}, "", "/app/profile");
      render();
    });
    document.querySelector("#settings").addEventListener("click", () => {
      history.pushState({}, "", "/app/settings");
      render();
    });
    addEventListener("popstate", render);
    render();
  </script>
</body>
</html>`;

let resetRequests = 0;
let statusRequests = 0;
const server = createServer((incoming, response) => {
  const url = new URL(incoming.url || "/", "http://127.0.0.1");
  if (incoming.method === "GET" && url.pathname === "/api/reset-once") {
    resetRequests += 1;
    if (resetRequests === 1) {
      incoming.socket.destroy();
      return;
    }
    response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ ok: true, attempts: resetRequests }));
    return;
  }
  if (incoming.method === "GET" && url.pathname === "/api/status-500") {
    statusRequests += 1;
    response.writeHead(500, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "synthetic server error" }));
    return;
  }
  if (incoming.method === "GET" && url.pathname.startsWith("/app")) {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    response.end(html);
    return;
  }
  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("not found");
});

const waitForListen = instance => new Promise((resolve, reject) => {
  instance.once("error", reject);
  instance.listen(0, "127.0.0.1", () => {
    instance.off("error", reject);
    resolve(instance.address().port);
  });
});
const closeServer = instance => new Promise((resolve, reject) => {
  if (!instance.listening) return resolve();
  instance.close(error => error ? reject(error) : resolve());
});
const assertRouteAndView = async (page, path, heading) => {
  await page.waitForFunction(({ expectedPath, expectedHeading }) =>
    location.pathname === expectedPath && document.querySelector("#view")?.textContent === expectedHeading,
  { expectedPath: path, expectedHeading: heading }, { timeout: 5000 });
  assert.equal(new URL(page.url()).pathname, path);
  assert.equal(await page.locator("#view").textContent(), heading);
};

let browser;
let context;
let apiContext;
try {
  const port = await waitForListen(server);
  const origin = `http://127.0.0.1:${port}`;
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
  context = await browser.newContext({ serviceWorkers: "block" });
  await context.route("**/*", route => {
    const target = new URL(route.request().url());
    return target.origin === origin ? route.continue() : route.abort();
  });
  const page = await context.newPage();

  // A direct deep link is a full document load, separate from SPA history changes.
  await page.goto(`${origin}/app/profile`);
  await assertRouteAndView(page, "/app/profile", "Profile");
  await page.goto(`${origin}/app`);
  await assertRouteAndView(page, "/app", "Home");

  await page.getByRole("button", { name: "Open profile" }).click();
  await assertRouteAndView(page, "/app/profile", "Profile");
  await page.getByRole("button", { name: "Open settings" }).click();
  await assertRouteAndView(page, "/app/settings", "Settings");
  await page.goBack();
  await assertRouteAndView(page, "/app/profile", "Profile");
  await page.goBack();
  await assertRouteAndView(page, "/app", "Home");
  await page.goForward();
  await assertRouteAndView(page, "/app/profile", "Profile");
  await page.goForward();
  await assertRouteAndView(page, "/app/settings", "Settings");

  apiContext = await request.newContext({ baseURL: origin, timeout: 5000 });
  const recovered = await apiContext.get("/api/reset-once", { maxRetries: 1 });
  assert.equal(recovered.status(), 200);
  assert.deepEqual(await recovered.json(), { ok: true, attempts: 2 });
  assert.equal(resetRequests, 2, "the local GET should have been sent twice after one ECONNRESET");

  const errorResponse = await apiContext.get("/api/status-500", { maxRetries: 1 });
  assert.equal(errorResponse.status(), 500);
  assert.equal(statusRequests, 1, "an HTTP response code is not retried by maxRetries");

  console.log(JSON.stringify({
    result: "local_spa_history_and_api_reset_fixture_completed",
    nodeVersion: process.version,
    browserVersion: browser.version(),
    directDeepLink: { path: "/app/profile", visibleHeading: "Profile" },
    history: [
      { action: "pushState", path: "/app/profile", visibleHeading: "Profile" },
      { action: "pushState", path: "/app/settings", visibleHeading: "Settings" },
      { action: "back", path: "/app/profile", visibleHeading: "Profile" },
      { action: "back", path: "/app", visibleHeading: "Home" },
      { action: "forward", path: "/app/profile", visibleHeading: "Profile" },
      { action: "forward", path: "/app/settings", visibleHeading: "Settings" }
    ],
    api: {
      resetGetStatus: recovered.status(),
      resetGetLocalRequestCount: resetRequests,
      http500Status: errorResponse.status(),
      http500LocalRequestCount: statusRequests,
      methodsUsed: ["GET"]
    },
    pageOriginPolicy: "Exact ephemeral 127.0.0.1 origin only; Service Workers blocked",
    externalPageRequestsAllowed: false,
    networkScope: "Exact-origin page routing and fixed local API URLs; browser-background and physical network traffic were not audited",
    productionBackendTested: false
  }, null, 2));
} finally {
  await Promise.allSettled([apiContext?.dispose(), context?.close(), browser?.close()]);
  await closeServer(server);
}
