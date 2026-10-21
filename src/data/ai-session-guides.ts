import type {
  EditorialGuide,
  EditorialGuideCopy,
  EditorialLocale,
} from "./editorial-guides";

type BilingualAiSessionGuide = {
  slug: string;
  relatedGuides: string[];
  sources: { title: string; url: string }[];
  copy: Record<EditorialLocale, EditorialGuideCopy>;
};

const articles: BilingualAiSessionGuide[] = [
  {
    slug: "browser-use-existing-browser-session",
    relatedGuides: [
      "browser-automation-profile-persistence",
      "ai-browser-vs-browser-agent",
      "playwright-mcp-existing-browser",
    ],
    sources: [
      {
        title: "Browser Use: Python CDP example",
        url: "https://github.com/browser-use/browser-use/blob/main/examples/browser/using_cdp.py",
      },
      {
        title: "Browser Use: Browser configuration reference",
        url: "https://github.com/browser-use/browser-use/blob/main/skills/open-source/references/browser.md",
      },
      {
        title: "Browser Use: BrowserProfile source",
        url: "https://github.com/browser-use/browser-use/blob/main/browser_use/browser/profile.py",
      },
      {
        title: "Browser Use: Agent lifecycle source",
        url: "https://github.com/browser-use/browser-use/blob/main/browser_use/agent/service.py",
      },
      {
        title: "Browser Use: BrowserSession lifecycle source",
        url: "https://github.com/browser-use/browser-use/blob/main/browser_use/browser/session.py",
      },
      {
        title: "Browser Use: Python library quickstart",
        url: "https://github.com/browser-use/browser-use",
      },
      {
        title: "Chrome for Developers: Changes to remote debugging switches",
        url: "https://developer.chrome.com/blog/remote-debugging-port",
      },
    ],
    copy: {
      en: {
        title: "Browser Use with an existing Chrome session: Python CDP setup",
        description:
          "Attach Browser Use to a Chrome session you started, set keep_alive so Agent cleanup preserves Chrome, and disconnect cleanly.",
        category: "Browser agent guides",
        content:
          "Browser Use can attach to local Chrome through Chrome DevTools Protocol (CDP), letting a Python agent continue in a session you opened. Start a dedicated profile with a loopback debugging port, verify the endpoint, set keep_alive=True, then connect with Browser Use’s current Python API. CDP grants access to the profile’s open tabs and signed-in sites, so use an account and pages you are allowed to automate.",
        sections: [
          {
            heading: "Choose an existing session when its state matters",
            body: `Use this approach when a human has already opened the application, accepted a consent screen, or prepared a test account and the agent needs to continue that same browser session. Browser Use’s current repository example configures BrowserSession with a BrowserProfile CDP URL and marks it local. The library then attaches to the running browser instead of launching a separate one.

This is different from asking Browser Use to launch its own browser or choosing a saved profile directory. It also is not a way to bypass a site’s login or permission flow. The agent receives browser control through CDP and may be able to see every tab in the attached profile. Start with a disposable test profile and an account you are allowed to automate.`,
          },
          {
            heading: "Start Chrome with a dedicated profile and local port",
            body: `Close the Chrome process that owns the profile you intend to use, then start Chrome with a non-default user-data directory and a loopback debugging port. On macOS, for example, launch the Chrome executable with --remote-debugging-port=9222 and --user-data-dir=/tmp/browser-use-profile. On Windows and Linux, use the corresponding Chrome executable path and a private directory you control. Do not add a remote bind address or forward this port to a public interface.

Chrome 136 changed the behavior of both remote-debugging switches: Chrome ignores them when they target the default data directory. A separate --user-data-dir is required. That directory is a real profile and can retain cookies and other browser data between runs; choose an access-controlled location and remove it when the test is complete if you do not need it.`,
          },
          {
            heading: "Confirm CDP before starting the Python agent",
            body: `Open http://127.0.0.1:9222/json/version locally. A JSON response containing browser information and a webSocketDebuggerUrl confirms that Chrome is exposing the expected debugging endpoint. If the page does not load, check that the Chrome process was started with the flags, that another process does not own port 9222, and that you are checking the same machine or network namespace.

Install Python 3.11 or newer and the Browser Use package in an isolated project environment. The [downloadable Python example](/templates/browser-use-existing-cdp-session.py) uses the project’s current BrowserSession and BrowserProfile CDP API with an OpenAI model, then asks only for the active page title. Set OPENAI_API_KEY before running it. The code is an example based on Browser Use’s current official CDP sample; it has not been run as a BrowserHub compatibility test.`,
          },
          {
            heading: "Attach using Browser Use’s Python API",
            body: `The example reads CDP_URL from the environment and defaults to the loopback endpoint at port 9222. BrowserSession receives BrowserProfile(cdp_url=..., is_local=True, keep_alive=True), and the Agent receives that session. BrowserProfile’s current source defines keep_alive as the setting to keep a browser alive after an agent run. Keep the first task narrow: read the current page title or summarize a page you control before allowing navigation, clicks or form submission.

When attaching through CDP, the useful starting objects are the active browser session and its tabs, not a new isolated Playwright context. If the agent appears to open a different page or sees no tabs, check the endpoint first and confirm Chrome is running with the intended profile. Do not infer that a visible signed-in state will be preserved by every browser restart or library upgrade; verify the test profile directly.`,
          },
          {
            heading: "Disconnect without closing the human’s browser",
            body: `Agent.run() closes the Agent in its own finally path. Agent.close() kills the browser session when BrowserProfile.keep_alive is false or unset; a later call to BrowserSession.stop() cannot undo that shutdown. Set keep_alive=True on the profile before creating the Agent. The Agent then releases its event bus without killing Chrome, and the example’s outer finally block calls session.stop() to clean up the Browser Use session. The BrowserSession implementation preserves the browser on a non-forced stop when keep_alive is true; an explicit forced kill still closes it.

The agent may have changed the page before disconnecting. Review the browser state, close any test-only tabs, then close Chrome yourself when you are finished. If the profile is disposable, remove its directory only after Chrome has exited. Avoid automatic cleanup of a profile that contains data someone still needs.`,
          },
          {
            heading: "Troubleshoot connection and session problems",
            body: `A connection refusal usually means Chrome did not expose CDP, the port differs, or the agent is running in another container or VM. A response at /json/version with a connection failure later often points to a stale endpoint or blocked WebSocket route. If Chrome 136 or newer opens normally but ignores the debugging flag, use a dedicated non-default data directory and restart the process with both flags.

If Browser Use attaches but has the wrong account or tabs, stop it and verify which profile Chrome launched; the browser executable’s default profile behavior can differ from the path you expected. If the signed-in state disappears after you restart, verify that you reopened the same user-data directory. Never print cookies, bearer tokens, full debugging WebSocket URLs or personal page contents into logs. Browser Use and Chrome versions change; check the current API example before upgrading a pinned environment.`,
          },
        ],
        faq: [
          {
            question: "Does Browser Use start Chrome for this example?",
            answer:
              "No. The example points BrowserSession at a CDP URL for Chrome you started separately. Browser Use’s other launch modes have different profile and lifecycle behavior.",
          },
          {
            question: "Can I use my everyday Chrome profile?",
            answer:
              "Chrome 136 and later require a non-default user-data directory for command-line remote debugging. Use a dedicated profile because CDP grants control over its open pages and browser data.",
          },
          {
            question: "Will the agent close Chrome when it finishes?",
            answer:
              "The example sets keep_alive=True on BrowserProfile before running the Agent, then calls BrowserSession.stop in its outer cleanup. Without keep_alive=True, Agent.run() cleanup calls Agent.close(), which kills the session. A forced kill still closes Chrome.",
          },
          {
            question: "Why does port 9222 refuse the connection?",
            answer:
              "Check Chrome’s debugging arguments, whether the port is free, and whether Python reaches the same loopback interface.",
          },
        ],
      },
      "zh-cn": {
        title: "Browser Use 接入已有 Chrome 会话：Python CDP 配置",
        description:
          "让 Browser Use 接入已启动的 Chrome 会话，并设置 keep_alive，避免 Agent 清理流程关闭 Chrome。",
        category: "浏览器智能体指南",
        content:
          "Browser Use 可以通过 Chrome DevTools Protocol（CDP）连接本机 Chrome，让 Python 智能体继续使用已打开的会话。用专用配置目录和本机调试端口启动 Chrome，确认端点后在 BrowserProfile 中设 keep_alive=True，再通过 Browser Use 当前的 Python API 连接。CDP 会开放该配置中的标签页和登录状态，因此只用于获准操作的账号与页面。",
        sections: [
          {
            heading: "需要沿用页面状态时再接入已有会话",
            body: `如果有人已经打开应用、处理了同意页面或准备好了测试账号，而智能体要继续使用同一个浏览器会话，可以采用这种连接方式。Browser Use 当前仓库示例通过 BrowserSession 和 BrowserProfile 配置 CDP 地址，并将其标记为本地浏览器。连接后，库会接入已经运行的 Chrome，而不是另开一个浏览器。

这不同于让 Browser Use 自己启动浏览器，也不同于指定一个保存下来的配置目录。它不能绕过网站的登录或授权流程。CDP 会把浏览器控制权交给智能体，连接后可能看到该配置中的全部标签页。先用可丢弃的测试配置和获准自动化的账号验证。`,
          },
          {
            heading: "使用专用配置目录和本地端口启动 Chrome",
            body: `先关闭占用目标配置目录的 Chrome 进程，再用非默认用户数据目录和仅限本机的调试端口启动 Chrome。例如，在 macOS 上用 Chrome 可执行文件启动时添加 --remote-debugging-port=9222 和 --user-data-dir=/tmp/browser-use-profile。Windows 与 Linux 使用各自的 Chrome 可执行文件路径，并选择自己管理且权限受控的目录。不要将端口绑定到公网地址，也不要把它转发到公网。

Chrome 136 调整了两个远程调试开关的行为：若目标是默认数据目录，Chrome 会忽略这些参数。必须提供单独的 --user-data-dir。该目录是真实浏览器配置，可能在多次运行间保留 Cookie 和其他数据；请限制目录访问权限，并在测试结束且确认不再需要时清理。`,
          },
          {
            heading: "启动 Python 智能体前先确认 CDP",
            body: `在本机打开 http://127.0.0.1:9222/json/version。如果返回包含浏览器信息和 webSocketDebuggerUrl 的 JSON，说明 Chrome 已在预期地址暴露调试端点。如果页面打不开，检查 Chrome 是否带参数启动、9222 端口是否被其他进程占用，以及 Python 与浏览器是否位于同一台机器或网络命名空间。

使用隔离的项目环境，安装 Python 3.11 或更新版本及 Browser Use 包。[可下载的 Python 示例](/templates/browser-use-existing-cdp-session.py)使用 Browser Use 当前的 BrowserSession 与 BrowserProfile CDP API，以及 OpenAI 模型，并且只请求读取当前页面标题。运行前设置 OPENAI_API_KEY。这段代码参考 Browser Use 官方当前 CDP 示例编写，但没有作为 BrowserHub 兼容性测试实际运行。`,
          },
          {
            heading: "用 Browser Use 的 Python API 连接",
            body: `示例从环境变量 CDP_URL 读取地址，默认使用 9222 端口的本机环回地址。BrowserSession 接收 BrowserProfile(cdp_url=..., is_local=True, keep_alive=True)，Agent 再使用这个 session。BrowserProfile 当前源码把 keep_alive 定义为智能体运行后保持浏览器进程的设置。第一次把任务限定为读取当前页面标题或总结自己控制的页面，再逐步开放导航、点击和表单提交。

通过 CDP 接入时，应从已有的浏览器会话与标签页开始操作，而不是新建隔离的 Playwright context。如果智能体打开了另一个页面或看不到标签页，先检查端点，再确认 Chrome 使用的是预期配置目录。不能假设每次重启或升级后登录状态都一定保留；应直接核对测试配置中的实际状态。`,
          },
          {
            heading: "断开连接，同时保留人工浏览器",
            body: `Agent.run() 会在自己的 finally 流程中关闭 Agent。若 BrowserProfile.keep_alive 为 false 或未设置，Agent.close() 会杀掉浏览器会话；外层之后再调用 BrowserSession.stop() 也无法恢复 Chrome。创建 Agent 前必须在配置中设 keep_alive=True。这样 Agent 会释放事件总线而不结束 Chrome，示例外层 finally 再调用 session.stop() 清理 Browser Use 会话。BrowserSession 当前源码说明，keep_alive 为 true 时，非强制停止会保留浏览器；显式强制 kill 仍会关闭它。

断开前智能体可能已经改变页面。请检查浏览器状态，关闭只用于测试的标签页；完成操作后由你自行关闭 Chrome。若配置目录是一次性测试数据，等 Chrome 退出后再删除。不要自动清理仍有人需要的浏览器资料。`,
          },
          {
            heading: "连接失败或会话异常时怎么查",
            body: `连接被拒绝通常表示 Chrome 没有暴露 CDP、端口不一致，或者智能体运行在另一个容器或虚拟机中。/json/version 能返回数据，但随后连接失败，可能是地址过期或 WebSocket 链路被阻断。若 Chrome 136 或更新版本正常打开，却忽略调试参数，请使用非默认数据目录，并同时添加两个参数后重新启动。

Browser Use 连上后如果看到错误的账号或标签页，先停止智能体并确认 Chrome 启动时实际使用的配置目录。不同启动方式的默认配置可能与你预期的路径不同。重启后登录状态消失时，确认重新打开的是同一个用户数据目录。日志中不要输出 Cookie、Bearer 令牌、完整的调试 WebSocket 地址或私人页面内容。Browser Use 与 Chrome 会继续更新，升级固定依赖前应查看现行 API 示例。`,
          },
        ],
        faq: [
          {
            question: "这个示例会启动 Chrome 吗？",
            answer:
              "不会。示例把 BrowserSession 指向你事先启动的 CDP 地址。Browser Use 的其他启动方式在配置目录和生命周期上有所不同。",
          },
          {
            question: "可以使用日常 Chrome 配置吗？",
            answer:
              "Chrome 136 及更新版本的命令行远程调试要求使用非默认用户数据目录。建议使用专用配置，因为 CDP 可以控制其中打开的页面并访问浏览器资料。",
          },
          {
            question: "智能体结束后会关闭 Chrome 吗？",
            answer:
              "示例在 BrowserProfile 中设置 keep_alive=True，再由外层清理调用 BrowserSession.stop。若不设置 keep_alive=True，Agent.run() 的清理流程会调用 Agent.close() 并杀掉会话；显式强制 kill 仍会关闭 Chrome。",
          },
          {
            question: "为什么 9222 端口连接被拒绝？",
            answer:
              "检查 Chrome 的调试参数、端口是否空闲，以及 Python 能否访问同一个本机环回接口。",
          },
        ],
      },
    },
  },
  {
    slug: "chrome-devtools-mcp-existing-browser",
    relatedGuides: [
      "playwright-mcp-vs-chrome-devtools-mcp",
      "playwright-mcp-existing-browser",
      "browser-automation-profile-persistence",
    ],
    sources: [
      {
        title: "Chrome DevTools MCP: Advanced usage",
        url: "https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/advanced-usage.md",
      },
      {
        title: "Chrome DevTools MCP: Configuration",
        url: "https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/configuration.md",
      },
      {
        title: "Chrome DevTools MCP: Troubleshooting",
        url: "https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/troubleshooting.md",
      },
      {
        title: "Chrome DevTools MCP: Repository and security notes",
        url: "https://github.com/ChromeDevTools/chrome-devtools-mcp",
      },
      {
        title: "Chrome for Developers: Changes to remote debugging switches",
        url: "https://developer.chrome.com/blog/remote-debugging-port",
      },
    ],
    copy: {
      en: {
        title:
          "Chrome DevTools MCP with an existing browser: auto-connect or CDP URL",
        description:
          "Configure Chrome DevTools MCP to inspect a running Chrome profile, choose autoConnect or a manual CDP endpoint, and diagnose version and consent issues.",
        category: "Browser agent guides",
        content:
          "Chrome DevTools MCP normally starts a separate profile. To reuse an open browser, choose autoConnect or a manual CDP URL. autoConnect requires Chrome 144 or newer, remote debugging enabled in Chrome, and user approval. Manual attach needs a Chrome process started with a debugging port and a dedicated non-default data directory. The methods have different version and profile requirements.",
        sections: [
          {
            heading: "Pick the connection mode before editing MCP settings",
            body: `Use autoConnect when Chrome 144 or newer is running locally and a person will approve the connection in Chrome. The MCP server looks for the running Chrome profile identified by the channel option, which defaults to stable. If several profiles are open, Chrome chooses its default profile, and the server can access all open windows in that profile.

Use a manual browser URL when you need to name a specific debugging endpoint, connect across a sandbox boundary, or support a Chrome version before 144. That route requires you to launch Chrome with a CDP port and a dedicated data directory. If you do not need an existing session, leave both options out: the server can create its own reusable profile, or use an isolated temporary profile for disposable work.`,
          },
          {
            heading: "Use autoConnect on Chrome 144 or newer",
            body: `In Chrome, open chrome://inspect/#remote-debugging, enable remote debugging, and read the consent dialog before allowing incoming connections. The current MCP option is --autoConnect, with --auto-connect as an alias. It is false by default. The [official configuration reference](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/configuration.md) documents the supported flag and current prerequisites; the [official advanced-usage guide](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/advanced-usage.md) shows client configuration.

Add --autoConnect to the Chrome DevTools MCP server arguments in your MCP client, start Chrome first, then restart or reload the MCP client. The Chrome permission prompt is a meaningful security boundary. Approve only when you intend that MCP client to inspect or change pages in the selected profile. If Chrome is older than 144, this flow will not work; upgrade Chrome or use the manual port route instead.`,
          },
          {
            heading: "Attach to a specific profile with a manual CDP URL",
            body: `The [manual attach configuration](/templates/chrome-devtools-mcp-manual-attach.json) uses the official server’s --browser-url option with http://127.0.0.1:9222. Start the intended Chrome process with --remote-debugging-port=9222 and --user-data-dir=/tmp/chrome-devtools-mcp-profile, then reload your MCP client. Check http://127.0.0.1:9222/json/version before debugging the MCP connection. Keep the endpoint on loopback unless you have deliberately built a secured, access-controlled tunnel.

Chrome 136 and later ignore the command-line remote debugging port and pipe switches for the default data directory. The separate user-data directory is required. Chrome DevTools MCP’s own documentation repeats this requirement and warns that any local application with access to the port can control the browser. Do not attach a valuable personal profile or leave the debugging endpoint exposed while visiting sensitive sites.`,
          },
          {
            heading: "Understand what profile and page access the agent gets",
            body: `A browser connection is broader than a single tab. With autoConnect, the server selects the default profile for the chosen Chrome channel and can access all its open windows. With a manual endpoint, it can inspect the browser instance behind that port. Chrome DevTools MCP says the MCP client can inspect, debug and modify browser data; treat page content and signed-in state as shared with that client.

The server’s default behavior is to launch a dedicated profile. That profile persists between runs unless isolated mode is enabled; isolated mode creates a temporary data directory that is cleared when Chrome closes. Choosing an existing browser changes that lifecycle. Decide which tabs and accounts may be exposed before connecting, and close or move unrelated pages out of the selected profile.`,
          },
          {
            heading: "Check versions and common connection failures",
            body: `If --autoConnect is not recognized, confirm you installed the current chrome-devtools-mcp package and used the spelling documented by that version. If Chrome does not offer the remote-debugging control or the server finds no browser, verify Chrome 144 or later, the selected channel, and that Chrome is already running. A consent prompt that was denied must be resolved in Chrome before retrying.

For manual attach, connection refused usually means Chrome is not listening on that port or the server is running in a container that cannot reach the host’s loopback address. A blank or stale endpoint can mean Chrome restarted on another port. Confirm the JSON version URL locally first, then check VM port forwarding or sandbox-to-host routing. If startup succeeds but the wrong tabs appear, verify the Chrome process and profile associated with that endpoint rather than changing the MCP tool list.`,
          },
          {
            heading: "Limit the exposed tools and finish deliberately",
            body: `Chrome DevTools MCP includes page automation and debugging tools; the repository documents optional categories and a slim mode. Enable only what the task needs, especially when an agent can inspect network requests, console output or page performance. The server also collects usage statistics by default; its repository documents --no-usage-statistics as an opt-out option, included in the downloadable manual configuration.

When work is done, stop or disconnect the MCP client. For a manual session, close Chrome to stop the debugging endpoint; remove its dedicated profile only if it contains no state you need. With autoConnect, close the selected browser or disable remote debugging in Chrome when you no longer want MCP clients to connect. The article describes documented setup, not an independent compatibility test across all Chrome channels or MCP clients.`,
          },
        ],
        faq: [
          {
            question: "Does autoConnect work with Chrome 136?",
            answer:
              "No. Chrome DevTools MCP documents autoConnect for Chrome 144 and newer. With earlier versions, use a manual CDP URL if your Chrome build supports it and a dedicated user-data directory.",
          },
          {
            question: "Does autoConnect attach to the profile I click on?",
            answer:
              "The documentation says it uses the default profile determined by Chrome for the selected channel. If multiple profiles are active, check which one Chrome selects before granting consent.",
          },
          {
            question: "Why is there no permission prompt?",
            answer:
              "Confirm that remote debugging is enabled at chrome://inspect/#remote-debugging, Chrome is already running, and the MCP server uses the documented autoConnect flag.",
          },
          {
            question: "Can I connect through a VM?",
            answer:
              "Yes, with manual --browser-url if the VM or sandbox can reach the forwarded CDP endpoint. Keep the tunnel access-controlled.",
          },
        ],
      },
      "zh-cn": {
        title: "Chrome DevTools MCP 接入已有浏览器：自动连接还是 CDP 地址",
        description:
          "配置 Chrome DevTools MCP 检查正在运行的 Chrome 配置，选择 autoConnect 或手动 CDP 端点，并排查版本与授权问题。",
        category: "浏览器智能体指南",
        content:
          "Chrome DevTools MCP 默认会启动独立配置。连接已打开的浏览器时，可选 autoConnect 或手动 CDP 地址。autoConnect 要求 Chrome 144 或更新版本、在 Chrome 中启用远程调试并由用户授权。手动连接则要求 Chrome 以调试端口和非默认数据目录启动。两种方式的版本和配置要求不同。",
        sections: [
          {
            heading: "修改 MCP 配置前先选连接方式",
            body: `如果本机运行 Chrome 144 或更新版本，而且有人可以在 Chrome 中确认连接，使用 autoConnect。MCP 服务会根据 channel 选择正在运行的 Chrome，默认通道是 stable。如果同时打开多个配置，Chrome 会选择它的默认配置；MCP 服务可以访问该配置中的所有窗口。

需要指定某个调试端点、跨越沙箱边界连接，或使用低于 144 的 Chrome 时，选手动 browser URL。此方式要求启动带 CDP 端口和专用数据目录的 Chrome。如果无需沿用已有会话，则省略这两类参数：服务可以创建自己的可复用配置，也可以用隔离临时配置完成一次性任务。`,
          },
          {
            heading: "在 Chrome 144 及更新版本使用 autoConnect",
            body: `在 Chrome 地址栏打开 chrome://inspect/#remote-debugging，启用远程调试，并阅读授权对话框后再决定是否允许连接。当前 MCP 参数是 --autoConnect，也可以写作 --auto-connect，默认值为 false。[官方配置参考](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/configuration.md)列出受支持的参数和当前前提；[官方高级用法说明](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/advanced-usage.md)提供客户端配置示例。

在 MCP 客户端的 Chrome DevTools MCP 服务参数中加入 --autoConnect，先启动 Chrome，再重启或重新载入 MCP 客户端。Chrome 的权限提示是实际的安全控制。只有确实希望 MCP 客户端查看或修改所选配置中的页面时才允许连接。Chrome 低于 144 时此流程不可用；升级 Chrome，或改用手动端口连接。`,
          },
          {
            heading: "通过手动 CDP 地址连接指定配置",
            body: `[手动连接配置文件](/templates/chrome-devtools-mcp-manual-attach.json)使用官方服务的 --browser-url 参数，指向 http://127.0.0.1:9222。用 --remote-debugging-port=9222 和 --user-data-dir=/tmp/chrome-devtools-mcp-profile 启动指定的 Chrome 进程，然后重新载入 MCP 客户端。开始排查前，先访问 http://127.0.0.1:9222/json/version。除非你专门搭建了受控安全隧道，否则端点应保持在本机环回接口。

Chrome 136 及更新版本会忽略针对默认数据目录的命令行远程调试端口和 pipe 参数，必须使用独立用户数据目录。Chrome DevTools MCP 官方文档也重复了这项要求，并提醒本机任意能够访问该端口的应用都可以控制浏览器。不要连接重要个人配置，也不要在访问敏感网站时暴露调试端点。`,
          },
          {
            heading: "确认智能体能访问哪些配置和页面",
            body: `浏览器连接的访问范围通常超过一个标签页。autoConnect 会连接所选 Chrome 通道对应的默认配置，并能访问其中所有已打开窗口。手动端点则访问对应端口背后的整个浏览器实例。Chrome DevTools MCP 项目说明，MCP 客户端可以检查、调试和修改浏览器数据；页面内容与登录状态都应视为已经共享给该客户端。

服务默认启动一个专用配置。除非启用 isolated，它会在多次运行间保留数据；isolated 会创建临时目录，并在 Chrome 关闭后清理。连接到已有浏览器会改变数据生命周期。连接前先决定哪些标签页和账号允许暴露，把无关页面移出选定配置。`,
          },
          {
            heading: "检查版本与常见连接故障",
            body: `如果服务不认识 --autoConnect，确认安装的是当前 chrome-devtools-mcp 包，并使用该版本文档中的参数拼写。如果 Chrome 没有远程调试开关，或服务找不到浏览器，检查 Chrome 是否为 144 或更新版本、channel 是否正确，以及 Chrome 是否已经运行。若用户拒绝了授权提示，应先回到 Chrome 处理权限，再重试。

手动连接被拒绝通常表示 Chrome 没有监听该端口，或 MCP 服务所在容器无法访问宿主机的环回地址。端点为空或已经过期，可能因为 Chrome 重启后使用了另一端口。先在本机确认 JSON 版本地址，再检查虚拟机端口转发或沙箱到宿主机的路由。服务启动后看到错误标签页，应确认端点关联的 Chrome 进程和配置目录，不要先去改 MCP 工具清单。`,
          },
          {
            heading: "按任务限制工具，并在结束时关闭连接",
            body: `Chrome DevTools MCP 提供页面自动化和调试工具；项目文档列有可选工具类别和 slim 模式。只启用任务所需能力，尤其要留意智能体能否读取网络请求、控制台输出或性能信息。该服务默认收集使用统计；项目文档提供 --no-usage-statistics 作为退出选项，已加入可下载的手动配置。

任务完成后，停止或断开 MCP 客户端。使用手动连接时，关闭 Chrome 可以停止调试端点；只有确认专用目录中的状态不再需要时才删除。使用 autoConnect 时，若不再希望 MCP 客户端连接，可关闭所选浏览器或在 Chrome 中停用远程调试。本文依据官方文档说明配置，没有声称对所有 Chrome 通道和 MCP 客户端做过兼容性实测。`,
          },
        ],
        faq: [
          {
            question: "autoConnect 能用于 Chrome 136 吗？",
            answer:
              "不能。Chrome DevTools MCP 文档要求 Chrome 144 或更新版本。较早版本可尝试手动 CDP 地址，但 Chrome 构建版本必须支持该方式，并且需要专用用户数据目录。",
          },
          {
            question: "autoConnect 会连接我点击选择的配置吗？",
            answer:
              "文档说明它使用所选通道下由 Chrome 判定的默认配置。若有多个配置正在运行，授权前应先确认 Chrome 实际选择了哪个。",
          },
          {
            question: "为什么没有出现权限提示？",
            answer:
              "检查 chrome://inspect/#remote-debugging 是否已启用远程调试、Chrome 是否已经运行，以及 MCP 服务参数是否使用文档要求的 autoConnect。",
          },
          {
            question: "虚拟机连接失败时怎么查？",
            answer:
              "确认虚拟机或沙箱可以访问转发后的 CDP 地址，并为隧道配置访问控制。",
          },
        ],
      },
    },
  },
];

export const aiSessionGuides: EditorialGuide[] = articles.map((article) => ({
  ...article.copy["zh-cn"],
  slug: article.slug,
  date: "2026-10-21",
  sourcePath: `src/data/ai-session-guides.ts#${article.slug}`,
  availableLocales: ["en", "zh-cn"],
  relatedBrowsers: [],
  relatedTools: [],
  sources: article.sources,
  relatedGuides: article.relatedGuides,
}));

export const aiSessionTranslations: Record<
  string,
  Record<"en" | "zh-cn", EditorialGuideCopy>
> = Object.fromEntries(articles.map((article) => [article.slug, article.copy]));
