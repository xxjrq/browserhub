import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sourcesBySlug: Record<string, { title: string; url: string }[]> = {
  "playwright-test-service-worker-route-visibility": [
    { title: "Playwright: Service Workers guide", url: "https://playwright.dev/docs/service-workers" },
    { title: "Playwright: Network guide", url: "https://playwright.dev/docs/network" },
    { title: "QASkills: Playwright Service Worker network mocking gotchas", url: "https://qaskills.sh/blog/playwright-service-worker-network-mocking-gotchas" },
    { title: "MobileStalk: capturing background requests and responses", url: "https://mobilestalk.net/how-to-capture-background-requests-and-responses-in-playwright/" },
    { title: "Simplified Guide: intercepting network requests in Playwright", url: "https://www.simplified.guide/playwright/network-request-intercept" }
  ],
  "playwright-await-websocket-ui-update": [
    { title: "Playwright: WebSocket API", url: "https://playwright.dev/docs/api/class-websocket" },
    { title: "Playwright: WebSocketRoute API", url: "https://playwright.dev/docs/api/class-websocketroute" },
    { title: "TestDino: Playwright WebSockets and real-time testing guide", url: "https://github.com/testdino-hq/playwright-skill/blob/main/core/websockets-and-realtime.md" },
    { title: "Reddit: Playwright not detecting changes from Socket.IO", url: "https://www.reddit.com/r/Playwright/comments/1d95nhw/playwright_not_detecting_changes_from_socketio/" },
    { title: "Reddit: WebSocket calls and browser automation", url: "https://www.reddit.com/r/Playwright/comments/1wsech7/web_socket_calls_automation/" }
  ],
  "playwright-diagnose-strict-mode-matches": [
    { title: "Playwright: Locators guide", url: "https://playwright.dev/docs/locators" },
    { title: "Smoketest: Fixing the Playwright strict mode violation", url: "https://smoketest.sh/blog/playwright-strict-mode-violation" },
    { title: "QASkills: Playwright strict mode locator fixes", url: "https://qaskills.sh/blog/playwright-strict-mode-violation-fix" },
    { title: "Stack Overflow: Playwright locator strict mode violation", url: "https://stackoverflow.com/questions/76043713/playwright-locator-error-strict-mode-violation" },
    { title: "QA Vibes: Playwright strict mode violation fixes", url: "https://qavibes.com/blog/playwright-strict-mode-violation" }
  ],
  "playwright-classify-browser-console-errors": [
    { title: "Playwright: Page API", url: "https://playwright.dev/docs/api/class-page" },
    { title: "Playwright: Request API", url: "https://playwright.dev/docs/api/class-request" },
    { title: "TechYorker: Read console errors in Playwright tests", url: "https://techyorker.com/how-to-read-console-errors-with-playwright/" },
    { title: "iTechGuides: Capture browser logs with Playwright", url: "https://www.itechguides.com/how-to-capture-browser-logs-with-playwright/" },
    { title: "GeekChamp: Capture browser logs, exceptions and network failures", url: "https://geekchamp.com/how-to-capture-browser-logs-with-playwright-console-exceptions-http-and-network-failures/" }
  ],
  "playwright-handle-page-crash-event": [
    { title: "Playwright: Page API crash event", url: "https://playwright.dev/docs/api/class-page#page-event-crash" },
    { title: "Playwright MCP issue: crashed page reference remains selected", url: "https://github.com/microsoft/playwright-mcp/issues/1599" },
    { title: "Playwright issue: WebKit Linux content process crash on reload", url: "https://github.com/microsoft/playwright/issues/43070" },
    { title: "TurnSignal: diagnose Target page/context/browser closed", url: "https://turnsignal.ai/blog/playwright-target-page-context-or-browser-has-been-closed" },
    { title: "QA Vibes: diagnose Target closed errors", url: "https://qavibes.com/blog/playwright-target-closed" },
    { title: "Apify Academy: fix the Playwright Target closed error", url: "https://docs.apify.com/academy/node-js/how_to_fix_target-closed" }
  ]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "playwright-test-service-worker-route-visibility": {
    en: {
      title: "Why Playwright Routes Miss Requests Handled by a Service Worker",
      description: "Choose whether to block a service worker for network mocks or keep it enabled and observe worker-owned requests at context scope.",
      category: "AI browser developer guides",
      content: "When a Playwright route does not fire, an active service worker may already have answered the page request from cache or generated a response. A frame-owned request handled by the worker does not reach page or context routing; a separate fetch initiated by the worker can be visible at context scope. For a browser agent developer, first decide whether the task tests application behavior with a controlled network or the service worker itself. Blocking workers makes a routing test easier to reason about, but it changes the runtime under test.",
      sections: [
        { heading: "Decide which layer the test is meant to cover", body: `Write the assertion before choosing a routing setting. If the test asks “does this page render the mocked API response?”, a page or context route may be the right seam and a service worker can obscure it. If the test asks “does this worker serve a cached response while offline?”, the worker is the behavior under test, so blocking it invalidates the scenario. These are different test contracts; one setup cannot answer both questions.

The official Playwright service-worker guide says support is limited to Chromium-based browsers. A cross-browser suite that depends on service-worker behavior needs an explicit project boundary. A test that only checks ordinary page rendering can still run across browsers, but do not present a Chromium worker result as a cross-browser finding.` },
        { heading: "For route-focused tests, block workers deliberately", body: `Set serviceWorkers to block in the test project or browser context used for network interception. Install the route before navigation or before the click that causes the request. Then assert that the route handler ran and that the page consumed the mocked response. Keep the route pattern narrow enough that unrelated assets and application requests remain visible.

Blocking workers changes how a service-worker-enabled site behaves. It is appropriate when the test is specifically about a direct page request or a mocked API boundary; it is not a universal flakiness switch. If the production page depends on cached shell assets, offline support, background synchronization or worker-generated responses, a blocked-worker pass can hide regressions. Label the project and test purpose so another developer does not copy the setting into a worker test.` },
        { heading: "For worker tests, observe context events and response provenance", body: `Keep service workers enabled. Playwright documents that browser-context request, response, requestfinished and requestfailed events include requests made by service workers, while a page route does not intercept a page request already handled by the worker. A worker-originated request may have no frame; calling request.frame() can throw. Check request.serviceWorker() before asking for a frame, and use response.fromServiceWorker() when you need to know whether a response came from a worker.

Register event listeners before navigation, then wait for the worker to activate and control the page before testing a fetch. A serviceworker event means the worker was created, not necessarily that it has taken control. The page can check its registration and await controllerchange when the test requires a controlled client. Avoid arbitrary sleeps: wait for the state your assertion depends on.` },
        { heading: "Separate cache results from network failures", body: `A page can update even when no route event appears because the worker served a cached value. That observation does not show that the server was contacted. Conversely, a route may receive the worker's own fetch to the network while the page's original fetch is already controlled. Track URLs, methods, event scope and response provenance rather than counting every callback as a separate user request.

HAR replay has the same boundary: it can satisfy requests that reach routing, but a cached worker response may prevent a matching routed request. The existing [HAR mocking guide](/en/guides/browser-agent-request-mocking-har/) covers replay setup; use this page to decide whether a worker sits in front of it. When the purpose is deterministic HAR replay, blocking the worker may be appropriate. When the purpose is to validate cache logic, use a fresh, explicit worker/cache setup and assert the returned data and provenance. Do not infer that an empty HAR match means the file is corrupt until you rule out the worker path.` },
        { heading: "Use a diagnostic sequence instead of adding retries", body: `First record whether the service worker is enabled and whether the browser context has one. Next attach passive context request and response listeners before navigation. Add the route only for the request the test owns. If the page changes but routing remains silent, check whether a worker controlled the page and whether the value came from cache. If a worker test has no events, confirm activation, control and exact URL scope. Retrying the click will not make a worker-served response travel through a route that does not own it.

A compact evidence record should include the Playwright version, browser project, serviceWorkers setting, URL pattern, event scope, whether request.serviceWorker() was non-null, response status, response.fromServiceWorker(), and the visible page assertion. That lets a failure be classified as “mock not installed,” “worker answered,” “scope mismatch,” or “page never requested it” instead of “Playwright dropped a request.”` },
        { heading: "Run the local routing and worker fixture", body: `Download [playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs) and keep that exact filename. It needs Node.js 22 or newer, the Playwright Node module already installed in a Node project, and Chromium installed for that Playwright version. It starts a synthetic server bound to 127.0.0.1, serves a page and a small service worker, and uses Playwright routing for a controlled request. It does not contact an external API or use a real profile.

Run each command separately:

- Install Playwright in an existing Node project if it is not already available: npm install playwright
- Install the matching Chromium if needed: npx playwright install chromium
- From the directory containing the downloaded asset, run: node playwright-diagnostics-local-fixtures.mjs

The exact file ran in Node.js 22.22.3, Playwright 1.64.1 and headless Chrome 156.0.8078.76. It returned a synthetic worker-generated response and separately observed one worker-owned routed fetch at /api/routed; one worker was active. Playwright documents that a page request handled by a Service Worker is not intercepted by page or context routing. The generated response is not a CacheStorage hit or offline test. The run used fresh loopback contexts and did not test another application, engine, production worker or background browser traffic. If you only need normal API mocking, use a routing-focused context with workers blocked; if you need worker semantics, keep them enabled and assert the worker state explicitly. The script's finally block closes its contexts, browser process and loopback server. It creates no persistent browser profile or output file; the downloaded script and any Playwright npm dependencies you install remain.` }
      ],
      faq: [
        { question: "Why does page.route not see a request?", answer: "An active service worker may have handled the page request before it reached Playwright's page routing layer. Check worker control and observe browser-context events." },
        { question: "Should I always set serviceWorkers to block?", answer: "No. Blocking is useful for a direct routing or mock test. It changes behavior and should not be used when the service worker itself is under test." },
        { question: "Can a service-worker request have no frame?", answer: "Yes. Check request.serviceWorker() before calling request.frame(), which may throw for worker-owned requests." },
        { question: "Does a route miss prove that the HAR file is wrong?", answer: "No. A worker cache may answer without a matching routed request. Check the worker path before editing the HAR." },
        { question: "Does the local fixture test every browser?", answer: "No. Playwright documents service-worker support for Chromium-based browsers; the linked example is a local demonstration, not a compatibility matrix." }
      ]
    },
    "zh-cn": {
      title: "Playwright 路由为什么看不到 Service Worker 处理的请求",
      description: "网络模拟时决定是否阻止 Service Worker；测试 Worker 本身时则保留它，并在浏览器上下文层观察请求。",
      category: "AI 浏览器开发指南",
      content: "Playwright 路由没有触发，不一定是监听器失效：活动的 Service Worker 可能已经从缓存返回页面请求，或自行生成响应。由 Worker 处理的页面请求不会进入 page 或 context route；Worker 自己另行发出的 fetch 则可能在 context 层观察到。浏览器智能体开发者应先确定任务是在模拟页面网络，还是验证 Service Worker。阻止 Worker 会改变被测运行环境。",
      sections: [
        { heading: "先确定测试覆盖哪一层", body: `先写清断言，再决定路由配置。如果问题是“页面能否显示模拟 API 响应”，page 或 context route 可能是合适的接缝，但 Service Worker 会绕过它。如果问题是“离线时 Worker 是否返回缓存”，Worker 本身就是被测对象，阻止它会让场景失效。这是两种不同的测试约定，不能用同一个配置回答。

Playwright 的 Service Worker 指南说明该功能只支持基于 Chromium 的浏览器。依赖 Worker 行为的跨浏览器套件应明确项目范围。只检查普通页面渲染的测试可以继续覆盖其他引擎，但不能把 Chromium 的 Worker 结果说成跨浏览器结论。` },
        { heading: "路由测试中有意阻止 Worker", body: `在负责网络拦截的测试项目或浏览器上下文中，把 serviceWorkers 设为 block。导航前或触发请求的点击之前就注册路由，然后断言路由处理器运行，并确认页面确实使用了模拟响应。URL 匹配范围应尽量具体，避免顺手拦截无关资源或 API。

阻止 Worker 会改变启用了 Service Worker 的网站行为。测试直接页面请求或模拟 API 边界时，这样做有明确用途；它不是普遍的稳定性开关。如果生产页面依赖缓存外壳、离线访问、后台同步或 Worker 生成的响应，阻止 Worker 后通过可能掩盖回归。请在项目名称和测试说明中写清目的，避免别人把配置复制到 Worker 测试。` },
        { heading: "测试 Worker 时查看上下文事件和响应来源", body: `保留 Service Worker。Playwright 文档说明 BrowserContext 的 request、response、requestfinished 和 requestfailed 事件也涵盖 Worker 发出的请求；但已经由 Worker 处理的页面请求不会经过页面路由。Worker 自己发出的请求可能没有 frame。调用 request.frame() 前先检查 request.serviceWorker()；需要判断响应是否来自 Worker 时，查看 response.fromServiceWorker()。

导航前注册事件监听器，然后等 Worker 激活并控制页面后再测 fetch。serviceworker 事件只表示 Worker 已创建，并不代表它已经接管页面。若断言要求客户端受控，可检查页面注册信息并等待 controllerchange。不要加任意长延时，应等待断言真正依赖的状态。` },
        { heading: "把缓存结果与网络故障分开", body: `页面已经更新但没有路由事件，可能是 Worker 返回了缓存值；这不说明服务器收到了请求。相反，页面请求已受 Worker 控制时，Worker 自己发出的网络 fetch 仍可能被拦截。记录网址、方法、事件作用域和响应来源，不要把每次回调都当作一次用户请求。

HAR 回放也受这层边界影响：它能处理到达路由层的请求，但 Worker 命中缓存时，可能没有对应的路由请求。已有的[HAR 模拟指南](/zh-cn/guides/browser-agent-request-mocking-har/)说明回放配置；本文用于判断前面是否还有 Worker。若目标是确定性回放 HAR，可以阻止 Worker；若目标是验证缓存逻辑，就应显式准备新的 Worker 和缓存状态，并断言数据与响应来源。排除 Worker 路径前，不要因为没有 HAR 命中就先判定文件损坏。` },
        { heading: "按诊断顺序排查，不要先加重试", body: `先记录 Worker 是否启用、当前上下文里是否存在 Worker。导航前安装被动的 context request 和 response 监听器；只对测试负责的 URL 注册 route。页面有变化但路由没有触发时，检查 Worker 是否已控制页面、值是否来自缓存。Worker 测试没有事件时，确认激活、控制状态和 URL 作用域。重复点击不会让已经由 Worker 返回的响应重新经过路由。

最小证据记录可包含 Playwright 版本、浏览器项目、serviceWorkers 配置、URL 模式、事件作用域、request.serviceWorker() 是否非空、响应状态、response.fromServiceWorker() 以及页面可见状态断言。这样更容易区分“模拟未安装”“Worker 已响应”“作用域不匹配”和“页面根本没请求”，不必先归咎于 Playwright 丢请求。` },
        { heading: "运行本地路由与 Worker 夹具", body: `下载[playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs)，并保留这个准确文件名。需要 Node.js 22 或更新版本、Node 项目中已安装的 Playwright 模块，以及该 Playwright 版本对应的 Chromium。夹具会在 127.0.0.1 启动合成服务，提供页面和小型 Service Worker，并用 Playwright 路由拦截一个受控请求；不访问外部 API，也不使用真实浏览器资料。

每次单独运行一条命令：

- 如果现有 Node 项目还没有 Playwright：npm install playwright
- 如果还没安装匹配的 Chromium：npx playwright install chromium
- 在下载文件所在目录运行：node playwright-diagnostics-local-fixtures.mjs

准确文件已在 Node.js 22.22.3、Playwright 1.64.1 和无头 Chrome 156.0.8078.76 中运行。夹具返回一条合成 Worker 响应，并另外观察到一条 Worker 发起且经过路由的 /api/routed 请求；共检测到一个 Worker。Playwright 文档说明，已由 Service Worker 处理的页面请求不会被页面或上下文路由拦截。该生成响应不是 CacheStorage 命中，也不是离线测试。运行只使用全新的回环上下文，不代表其他应用、浏览器引擎、生产 Worker 或浏览器后台流量。只需要普通 API 模拟时，可在路由测试上下文里阻止 Worker；需要验证 Worker 语义时，应保留它并显式断言状态。脚本的 finally 会关闭新建上下文、浏览器进程和回环服务。它不会创建持久浏览器资料或输出文件；下载的脚本和安装的 Playwright npm 依赖会保留。` }
      ],
      faq: [
        { question: "page.route 为什么看不到请求？", answer: "活动的 Service Worker 可能在请求到达页面路由前就已经处理了它。检查页面是否受 Worker 控制，并在 BrowserContext 层观察事件。" },
        { question: "应该总是把 serviceWorkers 设为 block 吗？", answer: "不应该。普通路由或模拟测试可以阻止 Worker；如果测试目标是 Worker 本身，就应保留它。" },
        { question: "Service Worker 请求可能没有 frame 吗？", answer: "可能。调用 request.frame() 前检查 request.serviceWorker()，因为 Worker 请求调用 frame 可能抛错。" },
        { question: "路由没触发能证明 HAR 文件写错了吗？", answer: "不能。Worker 可能从缓存返回结果，没有匹配的路由请求。先排除 Worker 路径。" },
        { question: "本地夹具覆盖所有浏览器吗？", answer: "不覆盖。Playwright 文档说明 Service Worker 支持基于 Chromium 的浏览器；示例不是兼容性测试矩阵。" }
      ]
    }
  },
  "playwright-await-websocket-ui-update": {
    en: {
      title: "Wait for a WebSocket-Driven UI Update in Playwright",
      description: "Register socket and UI assertions before the action, then distinguish a received frame from the application state that the user sees.",
      category: "AI browser developer guides",
      content: "A WebSocket frame can arrive before a test starts waiting for it, and receiving a frame does not prove that the application rendered the corresponding update. A browser agent or Playwright test should register the expected event first, trigger one action, and assert the resulting UI state separately. Keep transport evidence, application rendering and backend completion as different claims; a local mock demonstrates event ordering, not a production socket service.",
      sections: [
        { heading: "Choose whether to observe or mock the socket", body: `For a real application integration test, let the page create its WebSocket and observe the connection Playwright exposes. For a deterministic component test, route the socket with the documented WebSocketRoute API and provide a controlled reply. Those answer different questions: observation checks the app's real server path, while a route checks the UI response to a chosen frame. A mocked acknowledgement cannot establish backend availability or protocol compatibility.

Keep the test on an application and endpoint you are authorized to exercise. Do not capture unrelated socket traffic from an existing user browser, and do not log authentication tokens or private message payloads. If the app multiplexes several message types over one socket, filter on the expected event name and a synthetic request identifier rather than treating any frame as success.` },
        { heading: "Install the wait before the action can send data", body: `The event may happen quickly. Before navigation or the action that opens the socket, register page.waitForEvent('websocket'). When it resolves, create a promise for the expected received frame before clicking or submitting the control that causes the reply. If the server can push an initial frame as soon as the socket opens, attach the frame listener inside a page.on('websocket') callback installed before navigation; waiting for the socket and only then attaching a frame listener can miss that first message. Pair waits with a finite timeout and a predicate for the expected type or payload. After the frame resolves, assert the visible state with a web-first locator assertion.

Do not create the frame wait after the click: the server can respond between the action and the listener registration. Do not replace the wait with a fixed three-second sleep. A sleep may be too short on a loaded runner and wastes time when a local response is immediate. If your question is only whether the interface updated, prefer an assertion on that interface; a direct frame wait is additional evidence when the transport itself matters.` },
        { heading: "Treat the frame and rendered state as two checkpoints", body: `A robust scenario can record three checkpoints: the user action, the matching frame, and the visible state derived from it. The frame confirms that the browser observed data on the socket. The locator assertion confirms the application consumed that data and rendered the expected result. If the frame arrives but the UI assertion times out, inspect parsing, event dispatch, state updates and rendering. For ordinary DOM readiness without a live socket, see [how to wait for browser-agent pages to be ready](/en/guides/browser-agent-wait-for-page-ready/). If no frame arrives, check connection creation, server behavior, event filtering and whether the action was actually sent.

Socket implementations may send text, binary payloads, heartbeat frames or application-level error events. Restrict the predicate to the message your scenario expects. A server acknowledgement can still describe a failed application operation; inspect its status field and assert the user-visible error state when that is the intended outcome.` },
        { heading: "Keep reconnection and duplicate delivery outside this first test", body: `A test of one request and one reply should not claim reconnect reliability, exactly-once delivery or ordering across reconnects. Those require a separate scenario with a bounded disconnect, a defined resume token or cursor, duplicate frames, and an assertion about the final state. Without an application contract for replay and deduplication, retrying a WebSocket action may repeat a command.

If the page replaces its socket after navigation, attach the listener to the new connection before sending the next action. Record the socket URL without credentials, the event type, the sanitized fixture payload, and whether the page rendered the result. Keep the test payload synthetic so traces and CI artifacts cannot disclose customer data.` },
        { heading: "Use a local route rather than a public echo server", body: `A public echo server introduces a changing dependency and can receive content you did not intend to disclose. The downloadable local fixture opens a loopback page and intercepts only its synthetic WebSocket through Playwright. It arms a bounded promise for the command observed by the mock route before clicking, returns a short mock acknowledgement, and checks the status text on the page. The fixture does not claim that Playwright's page WebSocket event or received-frame event fired for the mocked route; use those event waits with a real page-created socket, and keep the route example focused on the UI's reaction to a controlled reply. It does not run an AI model, connect to a production backend or send a frame outside the local browser process.

Download [playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs). Use Node.js 22 or newer, an existing Node project with Playwright installed and its matching Chromium. From the folder containing the exact filename, run one command:

- Run the fixture: node playwright-diagnostics-local-fixtures.mjs

Optional module and browser paths are read from PLAYWRIGHT_MODULE_URL and CHROME_EXECUTABLE_PATH. The exact file ran in Node.js 22.22.3, Playwright 1.64.1 and headless Chrome 156.0.8078.76. The mock route observed the synthetic command with correlation ID local-1, and the page displayed the matching acknowledgement. Playwright's page websocket and received-frame events were not observed for that mocked route, so this run verifies route-to-UI behavior only; it does not establish a real socket server or frame-event integration. The script's finally block closes its fresh contexts, browser process and loopback server. It creates no persistent browser profile or output file; the downloaded script and any Playwright npm dependencies you install remain.` },
        { heading: "Diagnose a frame that arrives but never changes the page", body: `First confirm that the page opened the expected socket and that the test waited for the intended received event. Then inspect whether the payload is text or binary, whether a JSON parse or schema check rejected it, and whether the UI subscribes to the same message type. Check the console and page error streams separately from request failures; WebSocket transport has its own lifecycle and a successful socket connection does not guarantee that a later message was accepted by application logic.

When the app uses Socket.IO, its protocol adds event framing around the underlying WebSocket. A raw WebSocket mock is not automatically a valid Socket.IO server. Exercise the real Socket.IO client/server for an integration test, or use an app-level test seam that injects the event object. Label which layer the test covers so a small mock is not mistaken for end-to-end protocol verification.` }
      ],
      faq: [
        { question: "Should I wait for the WebSocket frame after clicking?", answer: "Create the frame promise before the action, or a fast reply may arrive before the listener is attached." },
        { question: "Does receiving a frame prove the UI updated?", answer: "No. Assert the rendered state separately; the frame only confirms transport-level receipt." },
        { question: "Does this mocked reply test a real server?", answer: "No. This fixture intercepts locally and supplies its own reply. WebSocketRoute.connectToServer can forward to a real upstream in a different test; this mock does not use that path." },
        { question: "Can I use a raw WebSocket mock for Socket.IO?", answer: "Not automatically. Socket.IO adds its own protocol framing; use a compatible server or an app-level event seam." },
        { question: "Does this test prove reconnect or exactly-once behavior?", answer: "No. Reconnect, replay and deduplication need separate scenarios based on the application's explicit contract." }
      ]
    },
    "zh-cn": {
      title: "在 Playwright 中等待 WebSocket 驱动的页面更新",
      description: "先注册 Socket 和界面断言，再触发操作；分别确认收到消息和页面状态变化。",
      category: "AI 浏览器开发指南",
      content: "WebSocket 消息可能在测试开始等待之前就已到达；即使收到了帧，也不能证明应用已渲染相应内容。浏览器智能体或 Playwright 测试应先注册预期事件，再触发一次操作，并单独断言最终界面。传输层证据、应用渲染和后端完成情况是不同结论；本地模拟只说明事件顺序，不代表生产 Socket 服务正常。",
      sections: [
        { heading: "先选观察真实 Socket 还是模拟 Socket", body: `真实应用集成测试应让页面按正常逻辑创建 WebSocket，再观察 Playwright 暴露的连接。确定性的组件测试可以使用 WebSocketRoute 拦截，并返回受控响应。两种方式回答的问题不同：观察真实连接可检查应用到服务器的路径；模拟帧则检查界面对指定消息的响应。模拟确认消息无法证明后端可用或协议兼容。

只在获准测试的应用和端点上执行。不要从现有用户浏览器捕获无关 Socket 流量，也不要记录认证令牌或私人消息内容。如果应用在同一连接上传输多种消息，应按事件名称和合成请求 ID 匹配，不能把任意一帧都当成功。` },
        { heading: "在操作发送消息之前注册等待", body: `事件可能很快发生。在导航或触发 Socket 连接的操作之前，先注册 page.waitForEvent('websocket')。连接出现后，在点击或提交触发回复的控件之前，为预期接收帧创建等待。如果服务器会在连接建立时立即推送第一帧，应在导航前注册 page.on('websocket')，并在回调中同步安装帧监听器；等到 socket 事件返回后才监听，可能错过最早的一条消息。等待要有有限超时，并通过 predicate 匹配预期类型或载荷。帧到达后，再用会自动重试的定位器断言页面状态。

不要点击后才开始等帧：服务器可能已在监听器注册前回复。也不要用固定三秒延时替代事件等待。共享运行器繁忙时，延时可能仍不够；本地响应很快时，又白白浪费时间。如果你只关心界面是否更新，直接断言页面状态即可；只有传输过程本身也重要时，才额外等待帧。` },
        { heading: "把收到帧与页面渲染分成两个检查点", body: `可靠的流程至少区分三个步骤：用户操作、匹配的消息帧、由该帧产生的可见状态。帧证明浏览器通过 Socket 观察到数据；定位器断言证明应用处理了数据并呈现预期内容。如果帧到了但页面断言超时，检查解析、事件派发、状态更新和组件渲染。普通 DOM 页面何时可操作，可参考[浏览器智能体页面就绪指南](/zh-cn/guides/browser-agent-wait-for-page-ready/)。完全没帧时，再查连接创建、服务器行为、过滤条件以及操作是否真的发送。

Socket 可能传输文本、二进制、心跳或应用层错误事件。predicate 只匹配场景期待的消息。服务器确认收到请求仍可能返回业务失败；应检查状态字段，并在目标是错误处理时断言页面显示了对应错误。` },
        { heading: "第一次测试先别混入断线重连和重复投递", body: `一个请求加一个响应的测试不能证明重连可靠、恰好投递一次或重连后的顺序。这些都应单独设计：限定断开时长、定义恢复令牌或游标，构造重复消息，并断言最终状态。若应用没有重放和去重约定，重试 Socket 操作可能重复执行命令。

页面导航后若应用重建 Socket，发送下一条操作前应把监听器挂到新连接。记录不含凭据的 Socket URL、事件类型、脱敏后的夹具载荷，以及页面是否渲染。载荷使用合成数据，避免 trace 和 CI 附件泄露客户内容。` },
        { heading: "用本地路由代替公共回声服务器", body: `公共回声服务会引入随时变化的外部依赖，也可能收到不该外传的数据。下载的本地夹具只打开回环地址页面，并通过 Playwright 拦截合成 WebSocket。脚本在点击前，为 mock route 观察到的命令准备有界等待；随后返回一条模拟确认消息，并检查页面状态。它不声称 Playwright 的 page WebSocket 事件或 received-frame 事件会对该模拟路由触发；真实页面创建的连接可使用这些事件等待，route 示例则只检查界面对受控回复的反应。它不运行 AI 模型、不连接生产后端，也不把消息发送到本地浏览器进程之外。

下载[playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs)。需要 Node.js 22 或更新版本、已安装 Playwright 的 Node 项目及匹配的 Chromium。请每次单独运行一条命令：

- 在保存文件的目录运行：node playwright-diagnostics-local-fixtures.mjs

可选模块和浏览器路径通过 PLAYWRIGHT_MODULE_URL 与 CHROME_EXECUTABLE_PATH 指定。准确文件已在 Node.js 22.22.3、Playwright 1.64.1 和无头 Chrome 156.0.8078.76 中运行：mock route 观察到关联 ID 为 local-1 的合成命令，页面显示对应确认状态。对该模拟路由，Playwright 的页面 websocket 和 received-frame 事件没有被观察到，因此本次只验证路由到界面行为，不证明真实 Socket 服务或帧事件集成。脚本的 finally 会关闭新建上下文、浏览器进程和回环服务。它不会创建持久浏览器资料或输出文件；下载的脚本和安装的 Playwright npm 依赖会保留。` },
        { heading: "排查消息到了却没更新页面", body: `先确认页面打开的是预期 Socket，并且测试等的是正确的接收事件。然后检查载荷是文本还是二进制、JSON 解析或 schema 校验是否拒绝了数据，以及 UI 是否订阅了同一种消息。控制台错误、页面未捕获异常和网络请求失败应分开查看；Socket 已连通，不代表后续消息通过了应用逻辑。

Socket.IO 在底层 WebSocket 之上还有自己的事件封装。原生 WebSocket 模拟器不一定能充当 Socket.IO 服务端。集成测试应使用真实 Socket.IO 客户端和服务端；也可以使用应用级测试接缝注入事件对象。请标明测试覆盖的层次，不要把小型 mock 称为端到端协议测试。` }
      ],
      faq: [
        { question: "点击之后再等待 WebSocket 帧可以吗？", answer: "应先创建帧等待，再执行操作；否则快速回复可能早于监听器注册。" },
        { question: "收到帧能证明页面更新了吗？", answer: "不能。帧只证明传输层收到了数据，页面还需要单独断言可见状态。" },
        { question: "这个模拟回复测试了真实服务器吗？", answer: "没有。此夹具在本地拦截并自行返回回复。另一个测试可使用 WebSocketRoute.connectToServer 转发到真实上游；本模拟没有走这条路径。" },
        { question: "原生 WebSocket mock 能用于 Socket.IO 吗？", answer: "不能直接假设可以。Socket.IO 还包含自己的协议封装，应使用兼容服务端或应用级事件接缝。" },
        { question: "这个测试能证明断线重连或只处理一次吗？", answer: "不能。这些需要依据应用明确约定另行测试。" }
      ]
    }
  },
  "playwright-diagnose-strict-mode-matches": {
    en: {
      title: "Fix a Playwright Strict Mode Violation by Finding the Extra Match",
      description: "Read the matched elements, tighten semantic locators, and scope repeated controls before reaching for positional selectors.",
      category: "AI browser developer guides",
      content: "A Playwright strict-mode violation means an action or single-element assertion matched more than one element. The locator has not clicked the wrong button yet; Playwright stopped because it cannot tell which one you meant. For browser-agent developers, treat the numbered matches as evidence about the page structure, then encode the intended role, exact name, row or landmark. A blanket first() or nth() can silence the error while making the task less reliable.",
      sections: [
        { heading: "Read the full error before editing the locator", body: `The call log names the locator and usually lists each matched element with an “aka” selector. Compare those matches: is one a navigation button and one a main-content button? Did a dialog add another copy? Does “Archive” also match “Archive all”? The failure is useful because it prevents an ambiguous action. Do not start by disabling strictness or adding a delay; neither changes which elements match.

Use count() or a locator assertion such as toHaveCount() when multiple elements are expected. For click, fill, check and other single-target operations, define why exactly one element represents the target. A read operation that supports multiple elements can use allTextContents or evaluateAll, but that does not make a later click safe.` },
        { heading: "Tighten the accessible role and name", body: `Start with the control users can identify: role and accessible name. If “Archive” also matches the longer “Archive all,” set exact: true. Exact matching fixes a substring collision, but it cannot distinguish two buttons both named exactly “Archive.” For that, use a stable containing landmark, dialog, form or row that matches the task context.

Prefer a page structure that makes the intended control unique, such as the Archive action in the product row. Avoid text selectors that match a heading and a button, or CSS selectors based on generated class names that change during a build. A semantic locator says what the user is acting on; the parent scope says which part of the page owns that action. For a changing virtualized table, compare the separate [row-action test guide](/en/guides/playwright-virtualized-grid-row-actions/) before relying on an index.` },
        { heading: "Scope repeated cards and table rows by their content", body: `For a repeated list, first locate the row or card that contains a stable identifying field, then find the action within that container. For example, identify the row by a user-visible email or product name and locate its Edit button from the row locator. If the key text is not unique, include another visible field. Assert that the filtered row count is one before acting when duplicate data is a realistic condition.

Avoid locating every Edit button and assuming index 2 remains the same record. Sorting, filtering, inserted banners and virtualized rendering can reorder elements. first(), last() and nth() are appropriate only when position is itself the behavior, such as the first item in a deliberately sorted list. If position is used, assert the list order and count as part of the test.` },
        { heading: "Handle alternative states without combining two visible targets", body: `Locator.or() represents either locator and can match both when both UI states are visible. If a dialog and the page button appear together, an assertion on the union can itself throw a strict-mode violation. Prefer a condition that distinguishes the state, then act on the target for that branch. For a transient drawer or responsive duplicate, wait for the expected state change instead of filtering by visibility during an animation. The force option bypasses actionability checks such as visibility or receiving events; it does not make a multi-match locator unique or turn off locator strictness.

Do not use force or hidden-element filters to hide a real ambiguity. If a duplicate is visually concealed but remains exposed to assistive technology, the page may have an accessibility defect. A test should not only locate whichever duplicate happens to be clickable; it should model the user-facing state and flag an incorrect accessible tree when relevant.` },
        { heading: "Reproduce the ambiguity in a small local page", body: `The linked local fixture uses repeated Archive buttons in product rows plus a navigation action and a longer Archive all label. A broad role/name locator has multiple matches; exact naming removes the longer substring, and identifying the row by its visible SKU selects one product action. The fixture checks counts and the resulting status before cleanup. It is synthetic and does not execute your application's component framework or prove a locator is stable across a redesign.

Download [playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs). Prerequisites are Node.js 22 or newer, a Node project with Playwright, and its matching Chromium. Save the exact filename and run one command from its directory:

- Run the fixture: node playwright-diagnostics-local-fixtures.mjs

The fixture uses a loopback page and a fresh disposable context. The exact file ran in Node.js 22.22.3, Playwright 1.64.1 and headless Chrome 156.0.8078.76: the broad Archive locator matched four buttons and its click was rejected; exact naming matched three, then row scoping matched one and produced the visible result archived SKU-4102. For application code, keep the scope based on labels, roles and content that remain meaningful to users. The script's finally block closes its fresh contexts, browser process and loopback server. It creates no persistent browser profile or output file; the downloaded script and any Playwright npm dependencies you install remain.` },
        { heading: "Know when the fix belongs in the page", body: `Sometimes the locator is not the only problem. If two visible buttons share an unclear name, improve the application labels or add a distinct accessible name before encoding a brittle selector. If hidden navigation remains in the accessibility tree, fix its hidden state. If the page unexpectedly shows both a dialog and its background control as available, inspect the modal focus behavior. A test selector should not compensate for a user-interface defect.

Keep the original failing locator, the full error and the final match count in the change note. That records whether the fix removed an accidental substring, scoped an action correctly or exposed a product ambiguity. The useful outcome is a locator whose uniqueness follows from the task, not simply one that happens to pass on today's DOM.` }
      ],
      faq: [
        { question: "Does strict mode mean Playwright clicked the wrong element?", answer: "No. For a single-target operation, Playwright stopped because more than one element matched." },
        { question: "Should I always add first() to fix the error?", answer: "No. Use positional selection only when order is the intended meaning, and assert the list order and size." },
        { question: "Does exact: true distinguish two buttons both named Archive?", answer: "No. It removes substring matches such as Archive all. Scope to a stable form, dialog, landmark or row to distinguish identical names." },
        { question: "Does force bypass a strict-mode violation?", answer: "No. It bypasses actionability checks such as visibility, but multiple matched elements remain ambiguous. Narrow the locator or fix the interface." }
      ]
    },
    "zh-cn": {
      title: "先找出多余匹配项，再修复 Playwright 严格模式错误",
      description: "检查错误列出的元素，收紧语义定位器，并在重复控件中先缩小到具体行或区域。",
      category: "AI 浏览器开发指南",
      content: "Playwright 严格模式错误表示某个单元素操作或断言匹配了多个元素。此时 Playwright 还没有误点；它是因为无法判断你想选哪个元素而停止。浏览器智能体开发者应把错误列出的匹配项当作页面结构线索，再用角色、精确名称、表格行或页面区域表达目标。直接加 first() 或 nth() 虽然可能消除错误，却会让操作更不可靠。",
      sections: [
        { heading: "先读完整错误，再改定位器", body: `调用日志会指出产生冲突的定位器，通常还会列出每个匹配元素及“aka”选择器。对照这些元素：一个是导航区按钮、另一个在正文里吗？对话框是否多出一份副本？“Archive”是否也匹配了“Archive all”？错误本身很有用，它避免了含糊操作。不要先尝试取消严格性检查或增加延时；这两种改法都不会改变匹配结果。

多个元素属于预期结果时，用 count() 或 toHaveCount()。click、fill、check 等单目标操作则应明确为什么恰好有一个元素代表目标。支持多元素的读取操作可以用 allTextContents 或 evaluateAll，但这不能让之后的点击变安全。` },
        { heading: "收紧可访问角色和名称", body: `从用户能识别的控件开始：角色和可访问名称。“Archive”同时匹配“Archive all”时，可设 exact: true。它能处理子串冲突，但区分不了两个名称完全相同的“归档”按钮。此时要用稳定的页面区域、对话框、表单或具体行限定上下文。

例如，定位商品行中的归档按钮。避免用同时匹配标题和按钮的文本定位器，也不要依赖每次构建都可能改变的 CSS 生成类名。语义定位器说明用户正在操作什么，父级区域说明该操作属于页面哪一部分。若目标是动态虚拟表格中的行按钮，可对照[虚拟表格行操作测试指南](/zh-cn/guides/playwright-virtualized-grid-row-actions/)再决定是否使用索引。` },
        { heading: "按可见内容定位重复卡片和表格行", body: `重复列表中，先找到包含稳定标识字段的行或卡片，再从该容器里查找操作按钮。例如先用用户可见的邮箱、SKU 或商品名称定位某一行，再找该行里的编辑按钮。如果文本不唯一，再加入另一个可见字段。数据可能重复时，操作前断言筛出的行只有一条。

不要先找出页面上所有“编辑”按钮，再假设索引 2 永远指向同一条记录。排序、筛选、新增提示条和虚拟滚动都会改变顺序。只有当位置本身就是被测行为时，first()、last() 或 nth() 才合适，例如刻意排序列表的第一项。若使用位置，就把列表顺序和数量也加入断言。` },
        { heading: "处理多个界面状态，避免同时匹配两个目标", body: `Locator.or() 表示两个定位器中的任意一个；如果两种界面状态同时可见，它可能同时匹配二者。对话框和页面按钮并存时，对联合定位器的断言本身也可能触发严格模式错误。应先用条件判断确定当前状态，再操作该分支中的控件。抽屉切换或响应式布局出现短暂副本时，应等待目标状态稳定，不要在动画中仅按可见性筛选。

force 会跳过可见性、接收事件等操作性检查，但不会让多重匹配的定位器变唯一，也不会关闭 locator 严格性。不要用 force 或隐藏元素过滤器掩盖真实歧义。视觉上隐藏的副本若仍在辅助技术树里，页面可能存在无障碍缺陷。测试不应只挑一个碰巧可点的重复项；必要时还要校验用户实际看到的状态和可访问结构。` },
        { heading: "用本地小页面复现冲突", body: `链接的本地夹具会在商品行中重复显示“Archive”，导航区还有一个同名操作，另有更长的“Archive all”按钮。宽泛的角色与名称定位会匹配多个元素；exact 名称先去掉较长标签，再按可见 SKU 定位具体商品行。夹具会检查匹配数和执行后的状态。它是合成页面，不会运行你的应用组件框架，也不能证明页面改版后定位器仍然稳定。

下载[playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs)。需要 Node.js 22 或更新版本、含 Playwright 的 Node 项目及匹配的 Chromium。保存准确文件名后，请在该目录单独运行：

- 运行夹具：node playwright-diagnostics-local-fixtures.mjs

夹具使用回环网页和全新的临时上下文。准确文件已在 Node.js 22.22.3、Playwright 1.64.1 和无头 Chrome 156.0.8078.76 中运行：宽泛的 Archive 定位器匹配四个按钮，点击因歧义被拒绝；精确名称匹配三个按钮，按行限定后匹配一个，并显示 archived SKU-4102。应用代码应根据用户能理解的标签、角色和内容来限定范围。脚本的 finally 会关闭新建上下文、浏览器进程和回环服务。它不会创建持久浏览器资料或输出文件；下载的脚本和安装的 Playwright npm 依赖会保留。` },
        { heading: "有时需要修复页面本身", body: `如果两个可见按钮名称相同，问题可能不只在定位器。可先修正应用标签，或提供清晰且不同的可访问名称，再写稳定选择器。若隐藏导航仍暴露在无障碍树里，应修正隐藏状态。若对话框和背景控件同时可用，检查模态焦点行为。测试选择器不应替界面缺陷兜底。

在修改记录里保留原始定位器、完整错误和最终匹配数量。这样能看出修复究竟移除了子串冲突、正确限定了操作，还是发现了产品界面的命名问题。目标是让定位器的唯一性来自任务本身，而非刚好通过今天的 DOM。` }
      ],
      faq: [
        { question: "严格模式错误说明 Playwright 已误点了吗？", answer: "没有。单目标操作发现多个匹配后，Playwright 会停止，避免擅自选择。" },
        { question: "应该总是加 first() 来修复吗？", answer: "不应该。只有顺序本身就是任务含义时才按位置选择，并断言列表顺序和数量。" },
        { question: "exact: true 能区分两个同名“归档”按钮吗？", answer: "不能。它可以去掉“Archive all”这样的较长子串匹配，但不能区分两个相同名称；还需按表单、对话框、区域或行限定。" },
        { question: "多个按钮匹配时用 count() 会报错吗？", answer: "不会。计数是多元素操作，可用来检查集合，然后再执行唯一目标操作。" },
        { question: "force 能绕过严格模式错误吗？", answer: "不能。它跳过可见性等操作性检查，但多个匹配项仍然有歧义。应收紧定位器或修复界面。" }
      ]
    }
  },
  "playwright-classify-browser-console-errors": {
    en: {
      title: "Separate Playwright Console Errors, Page Errors and Failed Requests",
      description: "Capture each browser signal separately and make assertions match the failure your test is meant to detect.",
      category: "AI browser developer guides",
      content: "A browser log can show console.error, an uncaught JavaScript exception, an HTTP 404 response and a failed network request in one run. They are different signals with different causes. For an AI browser or Playwright developer, attaching listeners is only the collection step; the test still needs to decide which events violate the application contract. Treating every console line as a failed test creates noise, while looking only at requestfailed misses ordinary HTTP error responses.",
      sections: [
        { heading: "Know which event describes which failure", body: `page.on('console') receives calls made by page JavaScript through console methods, including error, warning and informational messages. page.on('pageerror') reports an uncaught exception. page.on('requestfailed') means a request failed at the network or transport layer; it may happen before a response arrives or after response headers were received. page.on('response') carries HTTP status and headers; a 404 or 500 alone is an HTTP response and can complete normally rather than trigger requestfailed.

These streams overlap in time but do not mean the same thing. An application may log an expected validation error while correctly showing a message to the user. A failed analytics request may be nonessential, while a 500 from the data endpoint may break the page. Define the assertion around the feature under test instead of using a blanket rule that every console or network event is fatal.` },
        { heading: "Register listeners before navigation or interaction", body: `Attach the relevant listeners before the page action that can emit them. Store small records with event kind, message or error text, URL when relevant, response status, and the action that was running. Avoid serializing arbitrary console arguments: they may contain tokens, customer details or large objects. Keep the diagnostic buffer bounded and redact query parameters that could contain secrets.

A useful local diagnostic sequence can deliberately produce one console.error message, one uncaught exception, one HTTP 404 and one aborted request. Then assert that the four records land in the expected buckets. It demonstrates classification and listener timing; it does not set policy for your application. The linked fixture includes only synthetic messages and a loopback request.` },
        { heading: "Fail on the condition that matters to this test", body: `For a page expected to render without uncaught exceptions, assert that no pageerror event occurred during the relevant action. If a specific endpoint must succeed, inspect that response's status. For a deliberate offline case, expect the matching requestfailed event. If the application intentionally logs a validation warning, assert the visible validation result and do not fail just because a console message exists.

Broad “no console errors anywhere” policies can be useful for a controlled component, but can also fail on browser extensions, third-party widgets or unrelated background requests. Scope listeners to the page and test step, filter only known harmless noise with a written reason, and keep unexpected messages visible. Do not suppress all messages after the first failure; later errors may identify the root cause.` },
        { heading: "Use traces to connect messages to an action", body: `A trace viewer can show browser console output, test-runner output, actions and network activity along a timeline. The [browser-agent trace guide](/en/guides/browser-agent-debugging-traces/) explains capture and review; this page focuses on classifying events before deciding what should fail. That helps answer whether a message occurred before the click, during navigation, or after the page had already displayed a result. Save traces on failure under the project's approved artifact policy and avoid uploading private logs that contain session data. A trace correlates events with actions; it does not change their meaning or prove that a server-side operation succeeded.

For a standalone script, use a bounded in-memory log during the scenario and print only the classification summary on failure. Record the browser and Playwright versions when an event differs across engines. Keep the exact message and a minimal reproduction in private debugging records; public documentation should use synthetic examples rather than copied production logs.` },
        { heading: "Check version before using buffered error helpers", body: `Current Playwright Page documentation lists page.pageErrors() from v1.56, with filtering options added later, and a buffered console API with its own version boundary. Projects on earlier versions should use event listeners available in their installed release. Check the reference for that exact package version instead of relying on a current documentation page and assuming a pinned project has the same methods.

Do not treat a timeout as a console error or an HTTP status as a transport failure. The sequence is easier to reason about when each record carries an explicit type. If a 404 is expected for one negative test, record it as a response and assert the expected status. For a network or transport failure, inspect request.failure(); it may occur before a response or after the response event, and remains separate from JavaScript exceptions.` },
        { heading: "Run the synthetic diagnostics fixture", body: `Download [playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs). It needs Node.js 22 or newer, a Node project with Playwright installed and the matching Chromium. Save the exact filename, then run one command from its directory:

- Run the fixture: node playwright-diagnostics-local-fixtures.mjs

The fixture emits a console message, throws one synthetic page exception, serves an HTTP 404 and aborts a separate local request. Its bounded summary labels those signals independently. In the exact run with Node.js 22.22.3, Playwright 1.64.1 and headless Chrome 156.0.8078.76, the browser emitted three console errors (the fixture marker plus two browser resource messages), one page error, one aborted request and one HTTP 404 response. The 404 remained a response; the aborted request was the transport failure.

The example uses fresh contexts and loopback-only page requests. It does not visit public sites, use a customer account, test your product's error policy or audit browser background traffic. The script's finally block closes its contexts, browser process and loopback server. It creates no persistent browser profile or output file; the downloaded script and any Playwright npm dependencies you install remain. The browser-level console count can include native resource messages, so the fixture asserts the marker and separate event classes instead of a universal console count. Choose failure conditions based on the requirement being checked.` }
      ],
      faq: [
        { question: "Does a 404 fire requestfailed?", answer: "A 404 alone is an HTTP response, not a transport failure. requestfailed means the request did not complete at the network layer and may occur before or after response headers." },
        { question: "Are console.error and pageerror the same?", answer: "No. One is a console method call; pageerror is an uncaught JavaScript exception." },
        { question: "Should every console.error fail every test?", answer: "Only if that matches the test contract. Expected validation messages and unrelated dependencies may need separate handling." },
        { question: "When should listeners be attached?", answer: "Before the navigation or action that may emit the event, so fast events are not missed." },
        { question: "Can the trace prove a backend write succeeded?", answer: "No. It correlates browser-side evidence with test actions, but server-side completion needs its own confirmation." }
      ]
    },
    "zh-cn": {
      title: "区分 Playwright 控制台错误、页面异常和请求失败",
      description: "分别收集浏览器信号，并让断言对应测试真正要检测的问题。",
      category: "AI 浏览器开发指南",
      content: "一次运行可能同时出现 console.error、未捕获的 JavaScript 异常、HTTP 404 响应和网络请求失败。这些信号的成因并不相同。对 AI 浏览器或 Playwright 开发者来说，注册监听器只是收集证据；还要判断哪些事件违反当前应用约定。把所有控制台消息都判为测试失败会引入噪声，只看 requestfailed 又会漏掉普通 HTTP 错误响应。",
      sections: [
        { heading: "先分清每种事件说明什么", body: `page.on('console') 接收页面 JavaScript 调用控制台方法时产生的消息，包括 error、warning 和信息日志。page.on('pageerror') 表示未捕获的页面异常。page.on('requestfailed') 表示请求在网络或传输层未能完成；它可能发生在响应到达前，也可能发生在收到响应标头后。page.on('response') 提供 HTTP 状态和标头；单独的 404 或 500 是 HTTP 响应，请求也可能正常结束，而不触发 requestfailed。

这些事件可能同时发生，但含义不同。应用记录预期的表单校验错误，同时向用户正确显示提示，未必是测试失败。分析服务的请求失败可能不影响核心功能；数据接口返回 500 则可能破坏页面。测试应按功能约定断言，不能简单规定所有控制台或网络事件都致命。` },
        { heading: "在导航或操作前安装监听器", body: `在可能产生错误的页面操作之前注册相关监听器。仅保存必要字段，例如事件类型、消息或异常文字、相关网址、响应状态和发生时的操作。不要序列化任意控制台参数，它们可能包含令牌、客户资料或大型对象。诊断缓冲区设定上限，并对可能含有凭据的查询参数脱敏。

一个本地诊断顺序可以依次触发一条 console.error、一项未捕获异常、一个 HTTP 404 和一次请求中止，再检查四条记录是否进入正确类别。这只演示事件分类与监听时机，并不替你的应用决定失败规则。链接夹具只产生合成消息和回环请求。` },
        { heading: "只让测试关心的条件触发失败", body: `页面应正常运行且不产生未捕获异常时，可断言相关操作期间没有 pageerror。某个 API 必须成功时，检查该响应的状态。离线场景则等待指定请求的 requestfailed。如果应用按约定记录表单校验警告，应断言用户看到的提示，不要仅因控制台有消息就判失败。

在受控组件中，“不允许任何控制台错误”的规则可能有用，但也可能被浏览器扩展、第三方控件或无关后台请求触发。监听范围应限于目标页面和测试步骤；若过滤已知无害消息，要写明原因并保留其他异常。首条错误出现后不要屏蔽剩余事件，后续记录可能才暴露根因。` },
        { heading: "用 trace 把消息与操作对应起来", body: `Trace Viewer 可以沿时间线显示浏览器控制台、测试运行器输出、操作和网络活动。[浏览器智能体 trace 指南](/zh-cn/guides/browser-agent-debugging-traces/)介绍如何采集和查看；本文聚焦事件分类以及何时应让测试失败。这有助于确认消息是在点击前、导航中，还是页面已显示结果后出现。失败时按项目批准的附件策略保留 trace，并避免上传含会话数据的日志。Trace 只能关联事件和操作；它不会改变事件含义，也不能证明服务器端操作已成功。

独立脚本可以在场景期间用有上限的内存缓冲保存日志，只在失败时打印分类摘要。浏览器之间的事件不同，记录 Playwright 和浏览器版本。内部排障记录保留准确消息与最小复现；公开示例使用合成数据，不粘贴生产日志。` },
        { heading: "使用缓冲错误 API 前先核对版本", body: `当前 Playwright Page 文档列出 page.pageErrors() 从 v1.56 开始提供，后续版本又增加了筛选选项；缓冲控制台 API 也有自己的版本界限。项目版本较旧时，应使用该版本已有的事件监听器。查看项目实际安装版本对应的 API 参考，不要把最新版文档中的方法假定为已固定版本具备。

不要把超时当成控制台错误，也不要把 HTTP 状态当成传输失败。每条诊断记录显式标注类型会更容易排查。某个负向测试预期得到 404 时，应把它记为响应并断言状态；网络或传输故障可能发生在响应之前，也可能发生在收到响应标头之后，可查看 request.failure()，并与 JavaScript 异常分开处理。` },
        { heading: "运行合成诊断夹具", body: `下载[playwright-diagnostics-local-fixtures.mjs](/templates/playwright-diagnostics-local-fixtures.mjs)。需要 Node.js 22 或更新版本、含 Playwright 的 Node 项目及匹配的 Chromium。保存准确文件名后，请在所在目录单独运行：

- 运行夹具：node playwright-diagnostics-local-fixtures.mjs

夹具会发出一条控制台消息、抛出一个合成页面异常、返回 HTTP 404，并中止另一条本地请求；摘要会分别标出这几种信号。本次准确文件运行环境为 Node.js 22.22.3、Playwright 1.64.1 和无头 Chrome 156.0.8078.76。浏览器共发出三条 console error（夹具标记和两条浏览器资源消息），记录到一个 page error、一条中止请求和一个 HTTP 404 响应。404 仍是响应；被中止的请求才属于传输失败。

示例使用全新上下文和仅回环网页，不访问公开站点、不使用客户账户，也不测试你产品的错误策略或审计浏览器后台流量。脚本的 finally 会关闭全部上下文、浏览器进程和回环服务。它不会创建持久浏览器资料或输出文件；下载的脚本和安装的 Playwright npm 依赖会保留。浏览器原生资源消息也可能进入 console 计数，因此夹具断言标记和分开的事件类别，不把 console 总数当作跨环境固定值。应根据具体测试需求选择失败条件。` }
      ],
      faq: [
        { question: "404 会触发 requestfailed 吗？", answer: "单独的 404 是 HTTP 响应，不是传输失败。requestfailed 表示请求未能在网络层完成，可能在响应前或收到响应标头后触发。" },
        { question: "console.error 和 pageerror 是一回事吗？", answer: "不是。前者是页面调用控制台方法，后者是未捕获的 JavaScript 异常。" },
        { question: "每个测试都应因 console.error 失败吗？", answer: "只有当这符合测试约定时才应如此。预期校验消息和无关依赖需要分别处理。" },
        { question: "监听器应该何时注册？", answer: "在可能产生事件的导航或操作之前注册，避免错过快速事件。" },
        { question: "Trace 能证明后端写入成功吗？", answer: "不能。它可关联浏览器证据和操作；服务器端完成状态需要单独确认。" }
      ]
    }
  },
  "playwright-handle-page-crash-event": {
    en: {
      title: "Distinguish a Playwright Page Crash from a Closed Page",
      description: "Listen for the page crash event, stop using a crashed target, and separate renderer failure from normal close or ordinary application errors.",
      category: "AI browser developer guides",
      content: "A renderer crash, a page that closes itself, a JavaScript exception and a failed request can all leave a browser task incomplete, but they call for different diagnosis. Playwright emits a page crash event; subsequent operations on that crashed page throw. A browser agent should stop issuing actions to the stale target, preserve the error context, and create a fresh page only through an explicit recovery path. This guide documents detection and triage; the linked local fixture does not force or claim to reproduce a real renderer crash.",
      sections: [
        { heading: "Separate crash, close and application failure", body: `A page crash is a browser-renderer failure. Playwright documents a page.on('crash') event and says ongoing and subsequent operations on that page will throw. A normal close is a different lifecycle event. An uncaught page exception is reported through pageerror, while a network transport problem is observed through requestfailed. The message “Target page, context or browser has been closed” alone does not identify which event happened first.

For a browser-agent developer, this distinction matters because a retry on the same crashed Page object will not restore its renderer. The [network interruption recovery guide](/en/guides/browser-agent-network-interruption-recovery/) covers recoverable transport failures; a renderer crash invalidates the page target and needs a separate checkpoint decision. Capture whether crash or close fired, the operation that was active, the browser and Playwright versions, and any earlier timeout or browser log. Do not convert every closed-target error into “browser crashed”; a forgotten await, fixture teardown, popup closing itself or test timeout can produce related symptoms.` },
        { heading: "Register crash and close listeners before work begins", body: `Attach crash and close listeners immediately after creating the page, before navigation or expensive rendering. Keep booleans or timestamped events so the catch block can report lifecycle evidence even when the action itself throws. Include the URL without sensitive query parameters and the last completed user action. Avoid logging cookies, storage state, page text from private accounts or full request headers.

When an operation rejects, preserve the original exception and compare it with the lifecycle events. If the crash event fired, mark that page unusable. If only close fired, find the code or application action that closed it. If neither fired, inspect the call log, test timeout and launch output before blaming a renderer. A screenshot taken after the renderer has crashed may fail too, so save artifacts continuously or use trace retention configured before the test.` },
        { heading: "Do not retry the same action on a dead page", body: `Once a page crash has occurred, ongoing and later Playwright operations on that page are expected to throw. Do not loop the same click against the same object, and do not silently replace the page and repeat a non-idempotent action. A fresh page is a new browser state; the application may have completed a server-side action just before the crash. Confirm the state through an authorized read-only view before deciding whether a task can resume.

A recovery policy should be explicit about what survives: browser context, cookies, local storage, tabs, task checkpoint and pending network operations. For a single-page test with synthetic data, creating a new page in the same context may be acceptable. For a browser-agent task involving a real user session, ask for a safe resume point or return control to the user instead of replaying a form submission, payment, message or other write.` },
        { heading: "Treat MCP stale-tab behavior as a versioned incident", body: `A public Playwright MCP issue documented a renderer crash where the server's selected tab reference remained stale because its cleanup path listened to close but not crash. That report is tied to specific versions and an environment; it is an example of why a client may keep returning “Page crashed,” not proof that every MCP version behaves the same way. The issue also records a server restart as a workaround for users of the affected build. Re-check the issue and release notes for the MCP version actually installed before applying that workaround.

For a browser agent, record the client, MCP server and bundled Playwright versions separately. If the server cannot discard a crashed tab, a fresh server/browser context may be needed, but this can discard unsaved page state. Tell the user what state may be lost and get an explicit checkpoint before destructive recovery. Do not promise transparent crash recovery unless the installed agent documents and verifies it.` },
        { heading: "Use a bounded incident checklist", body: `Record the first failing call, exact exception text, whether crash and close events fired, last navigation URL, current browser engine and version, Playwright version, operating system or container, memory limits if known, and whether the failure repeats after a clean context. If it occurs only after a browser update, compare the installed browser revision and package lock against a known prior run. Reduce the case to one page and one operation before filing an upstream issue.

Do not stress a renderer intentionally on a workstation or user session. A forced crash would destroy state and would not tell you how a production agent recovers. A safe lab reproduction should use a disposable context, synthetic content, a pinned browser build and a recovery procedure that is allowed to lose the fixture state. This article does not execute such a crash reproduction.` },
        { heading: "Run the safe lifecycle fixture and understand its limit", body: `The linked [local diagnostics fixture](/templates/playwright-diagnostics-local-fixtures.mjs) listens for a normal page close during cleanup and reports that lifecycle separately from console errors, page exceptions and failed requests. It does not call a crash API, exhaust memory, terminate Chromium, or simulate a renderer fault. That boundary is intentional: the example verifies event bookkeeping without risking a real profile or encouraging a destructive crash test.

Download the exact file playwright-diagnostics-local-fixtures.mjs. It requires Node.js 22 or newer, an existing Node project with Playwright and the matching Chromium. From the folder where you saved it, run one command:

- Run the fixture: node playwright-diagnostics-local-fixtures.mjs

The exact file ran in Node.js 22.22.3, Playwright 1.64.1 and headless Chrome 156.0.8078.76. Cleanup emitted a normal close event. No crash was forced or simulated, so this run verifies normal-close bookkeeping only; it does not test renderer-crash handling or a recovery policy. The script's finally block closes its fresh contexts, browser process and loopback server. It creates no persistent browser profile or output file; the downloaded script and any Playwright npm dependencies you install remain. Use the source and official Page API for crash handling, then validate any recovery policy in a disposable environment owned by your team.` }
      ],
      faq: [
        { question: "Does a page crash also fire close?", answer: "Do not assume so. Record crash and close as separate events; their lifecycle behavior can differ." },
        { question: "Can I retry a click on the same crashed Page?", answer: "No. Playwright says ongoing and subsequent operations on that page throw after a crash." },
        { question: "Does Target page/context/browser closed prove a renderer crash?", answer: "No. Teardown, missing awaits, timeouts, self-closing popups and other causes can produce related errors." },
        { question: "Is restarting an MCP server always safe?", answer: "No. It may discard unsaved browser state. Check the affected version and preserve a safe checkpoint first." },
        { question: "Does the linked fixture reproduce a crash?", answer: "No. It records normal close and other synthetic diagnostics only; it never forces a renderer crash." }
      ]
    },
    "zh-cn": {
      title: "区分 Playwright 页面崩溃与页面关闭",
      description: "监听页面 crash 事件，停止操作失效目标，并将渲染器故障与正常关闭或应用错误区分开。",
      category: "AI 浏览器开发指南",
      content: "渲染器崩溃、页面自行关闭、JavaScript 异常和网络请求失败都可能让浏览器任务中断，但需要不同的排查方法。Playwright 会发出 page crash 事件；崩溃后继续操作该页面会抛错。浏览器智能体应停止向失效目标发指令，保留错误上下文，只通过明确的恢复流程新建页面。本文介绍检测和分诊；链接的本地夹具不会强行制造或声称复现真实渲染器崩溃。",
      sections: [
        { heading: "区分崩溃、关闭和应用错误", body: `页面崩溃意味着浏览器渲染进程故障。Playwright 文档说明可监听 page.on('crash')；事件发生后，该页面正在执行和后续的操作都会抛错。正常关闭是另一种生命周期事件。未捕获的页面异常通过 pageerror 报告，网络传输问题则可通过 requestfailed 观察。单看“Target page/context/browser has been closed”无法判断先发生了哪一种情况。

这对浏览器智能体开发很重要：在已经崩溃的 Page 对象上重试，不会恢复渲染器。[网络中断恢复指南](/zh-cn/guides/browser-agent-network-interruption-recovery/)讨论可恢复的传输问题；渲染器崩溃会让页面目标失效，需要另行确认任务检查点。记录 crash 或 close 是否触发、当时正在执行的操作、浏览器与 Playwright 版本，以及之前是否发生超时或浏览器日志错误。不要把所有目标关闭错误都说成“浏览器崩溃”；漏写 await、夹具清理、弹窗自行关闭和测试超时也会造成相似症状。` },
        { heading: "操作开始前同时监听 crash 和 close", body: `创建页面后、导航或复杂渲染开始前，就安装 crash 和 close 监听器。可保存布尔值或带时间戳的事件，确保操作抛错时 catch 仍能报告生命周期证据。记录去掉敏感查询参数的网址和最后一个完成的用户操作。不要记录 Cookie、存储状态、私人账户页面文本或完整请求标头。

操作拒绝时，保留原始异常并对照生命周期事件。如果 crash 已触发，就标记页面不可再用。只有 close 时，检查是哪段代码或应用行为关闭了页面。两个事件都没有时，先查调用日志、测试超时和浏览器启动输出。渲染器崩溃后截图也可能失败，所以可在测试开始前配置 trace 保留，或持续保存受控诊断附件。` },
        { heading: "不要在失效页面上重试同一操作", body: `页面崩溃后，Playwright 预期该页面当前和后续的操作都会抛错。不要对同一个对象循环点击，也不要悄悄新建页面后重放非幂等操作。新页面代表新的浏览器状态；崩溃前服务器可能已经完成了某项写入。决定是否恢复前，先通过获准的只读页面确认状态。

恢复策略应明确保留哪些内容：浏览器上下文、Cookie、本地存储、标签页、任务检查点和待完成网络请求。使用合成数据的单页测试可能可以在同一上下文里新建 Page。真实用户会话中的智能体任务则应先询问安全的恢复位置，或交还用户处理；不要自动重放表单提交、付款、消息或其他写操作。` },
        { heading: "把 MCP 失效标签问题当作有版本范围的事故", body: `一条公开的 Playwright MCP issue 记录了渲染器崩溃后，服务端选中的标签引用仍然失效：清理路径监听了 close，却没有处理 crash。该报告只对应特定版本与环境，可说明客户端为什么会持续返回“Page crashed”，但不能证明所有 MCP 版本都如此。issue 也记录了受影响构建的用户可通过重启服务恢复；采用前应核对当前安装的 MCP 版本和发行记录。

浏览器智能体排障记录应分别写客户端、MCP 服务和其捆绑的 Playwright 版本。如果服务无法丢弃崩溃标签，可能需要新建服务或浏览器上下文，但这会丢失未保存页面状态。执行破坏性恢复前，应告知用户哪些状态可能丢失，并先取得明确的检查点。除非当前 agent 文档说明且已验证，否则不要承诺自动无感恢复。` },
        { heading: "按有限清单记录故障", body: `记录第一个失败调用、完整异常、crash 与 close 是否触发、最后导航网址、浏览器引擎及版本、Playwright 版本、操作系统或容器、已知内存限制，以及全新上下文能否复现。如果故障只在浏览器更新后出现，对比安装的浏览器修订版、依赖锁文件和上一次正常运行。提交上游问题前，把案例缩小到一个页面和一个操作。

不要在工作机或用户会话里故意耗尽内存来压测渲染器。强制崩溃会丢失状态，也不能说明生产智能体会如何恢复。安全实验应使用一次性上下文、合成内容、固定浏览器版本，以及明确允许丢弃夹具状态的恢复步骤。本文没有执行这种崩溃复现。` },
        { heading: "运行安全的生命周期夹具并理解限制", body: `链接的[本地诊断夹具](/templates/playwright-diagnostics-local-fixtures.mjs)会在清理时监听正常的页面关闭，并把它与控制台错误、页面异常和请求失败分开记录。它不会调用崩溃 API、耗尽内存、终止 Chromium 或模拟渲染器故障。这样设计是为了验证事件记录，同时不影响真实资料，也不鼓励破坏性测试。

下载准确文件名 playwright-diagnostics-local-fixtures.mjs。需要 Node.js 22 或更新版本、已安装 Playwright 的 Node 项目及匹配的 Chromium。请在保存目录单独运行：

- 运行夹具：node playwright-diagnostics-local-fixtures.mjs

准确文件在 Node.js 22.22.3、Playwright 1.64.1 和无头 Chrome 156.0.8078.76 中运行。清理期间观察到正常 close 事件。没有强制或模拟崩溃，因此本次只验证正常关闭事件记录，不验证渲染器崩溃处理或恢复策略。脚本的 finally 会关闭新建上下文、浏览器进程和回环服务。它不会创建持久浏览器资料或输出文件；下载的脚本和安装的 Playwright npm 依赖会保留。崩溃处理依据官方 Page API；任何恢复策略都应在团队管理的一次性测试环境验证。` }
      ],
      faq: [
        { question: "页面 crash 后一定会触发 close 吗？", answer: "不能这样假设。应分别记录 crash 和 close，生命周期行为可能不同。" },
        { question: "可以在同一个崩溃 Page 上重试点击吗？", answer: "不可以。Playwright 说明崩溃后该页面当前及后续操作都会抛错。" },
        { question: "Target page/context/browser closed 能证明渲染器崩溃吗？", answer: "不能。清理、漏写 await、超时、自动关闭弹窗等原因都可能产生相似错误。" },
        { question: "重启 MCP 服务总是安全吗？", answer: "不一定。可能丢失未保存状态。先核对受影响版本并保留安全检查点。" },
        { question: "链接夹具会复现崩溃吗？", answer: "不会。它只记录正常关闭和合成诊断，不会强制渲染器崩溃。" }
      ]
    }
  }
};

const related: Record<string, string[]> = {
  "playwright-test-service-worker-route-visibility": ["browser-agent-request-mocking-har", "browser-agent-debugging-traces", "playwright-api-request-context-econnreset-retries"],
  "playwright-await-websocket-ui-update": ["browser-agent-wait-for-page-ready", "browser-agent-debugging-traces", "browser-agent-monitor-page-changes-meaningfully"],
  "playwright-diagnose-strict-mode-matches": ["browser-agent-structured-data-extraction", "playwright-dynamic-combobox-option-selection", "playwright-virtualized-grid-row-actions", "browser-agent-diagnose-blocked-clicks"],
  "playwright-classify-browser-console-errors": ["browser-agent-debugging-traces", "playwright-api-request-context-econnreset-retries", "browser-agent-request-mocking-har"],
  "playwright-handle-page-crash-event": ["browser-agent-debugging-traces", "browser-agent-network-interruption-recovery", "browser-agent-human-takeover"]
};

export const aiCycleTranslations03: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides03: EditorialGuide[] = Object.keys(copies).map((slug) => ({
  ...copies[slug]["zh-cn"], slug, date: "2026-11-03", sourcePath: `src/data/ai-cycle-2026-11-03.ts#${slug}`,
  availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sourcesBySlug[slug], relatedGuides: related[slug] ?? []
}));
