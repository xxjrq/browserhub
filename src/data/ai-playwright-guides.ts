import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const slug = "playwright-mcp-existing-browser";
const sources = [
  {
    "title": "Microsoft Playwright MCP: Connecting to Browsers",
    "url": "https://playwright.dev/mcp/configuration/browser-extension"
  },
  {
    "title": "Microsoft Playwright: Playwright Chrome Extension README",
    "url": "https://github.com/microsoft/playwright/blob/main/packages/extension/README.md"
  },
  {
    "title": "Microsoft Playwright MCP: README and configuration",
    "url": "https://github.com/microsoft/playwright-mcp"
  },
  {
    "title": "Chrome for Developers: Changes to remote debugging switches",
    "url": "https://developer.chrome.com/blog/remote-debugging-port"
  }
];
const copy: Record<"en" | "zh-cn", EditorialGuideCopy> = {
  "en": {
    "title": "Connect Playwright MCP to an existing Chrome browser",
    "description": "Choose a Chrome or Edge channel, CDP endpoint or Playwright extension for an existing browser. Check profile selection, connection errors and session cleanup.",
    "category": "AI browser guides",
    "content": "Use Playwright MCP’s extension to attach to an existing tab and reuse its session. For an open Chrome or Edge instance without a chosen port, use its channel name; use an HTTP CDP endpoint when you control the debugging URL or need a forwarded connection. The route determines which profile and network checks apply. Official documentation was checked on November 4, 2026. No hands-on compatibility test was performed. For Chrome DevTools MCP’s corresponding choices, see the [Chrome connection guide](/en/guides/chrome-devtools-mcp-existing-browser/).",
    "sections": [
      {
        "heading": "Choose extension or CDP",
        "body": "Use the extension when you need a tab that is already open, its signed-in session or another installed extension. Use a channel name for a running Chrome or Edge instance that exposes the documented in-browser remote-debugging permission. Choose an HTTP CDP endpoint when you set the port yourself or connect through a forwarded route.\n\n| Route | Best fit | Setup | Profile used |\n| --- | --- | --- | --- |\n| Chrome or Edge channel | Running browser, no manually chosen port | Set --cdp-endpoint=chrome or --cdp-endpoint=msedge; allow remote debugging in chrome://inspect/#remote-debugging | Browser selected by that channel |\n| HTTP CDP endpoint | Browser launched with a known port, including a forwarded endpoint | Set --cdp-endpoint=http://127.0.0.1:9222 to the reachable browser URL | Browser behind that endpoint |\n| Extension | Existing tab, sign-in or browser extension state | Install Playwright Extension; add --extension; select tab and approve | Profile with the extension |\n| Persistent profile | MCP-managed state that should survive sessions | Set a dedicated user-data directory | Separate MCP profile |\n\nThe channel route discovers Chrome or Edge through its supported integration; it does not require you to set a port or pass remote-debugging command-line switches. The manual HTTP endpoint has separate port and profile requirements. Chrome 136 and later require a non-default user-data directory when you start Chrome with command-line remote-debugging switches."
      },
      {
        "heading": "Configure the extension and select a profile",
        "body": "Add a Playwright MCP server entry to your client with command npx and arguments @playwright/mcp@latest, --extension. A minimal JSON example is available in the [downloadable template](/templates/playwright-mcp-existing-browser.json). Put it in the client’s documented server settings and reload the client if it reads configuration only at startup.\n\nWhen more than one Chrome profile has the extension, open chrome://version in the target profile and note the last directory name in Profile Path, such as Profile 1. Add --profile-dir-name=Profile 1 to the arguments to pin that profile. Without this option, the extension connects to the last-used browser profile that has the extension installed.\n\nOn first connection, choose the intended tab and approve access. Microsoft also documents an optional profile-specific PLAYWRIGHT_MCP_EXTENSION_TOKEN shown in the extension UI. Passing it through the MCP client environment skips approval on later connections. Keep the token out of source control; it authenticates the connection but does not restrict actions after attachment."
      },
      {
        "heading": "Connect a browser through CDP",
        "body": "For a manual endpoint, start a separate test browser with a dedicated user-data directory and CDP port, then point --cdp-endpoint at that exact URL, for example http://127.0.0.1:9222. Chrome 136 and later ignore remote-debugging switches when they target the default user-data directory. Keep the endpoint on loopback unless you have secured a route to it.\n\nA container’s localhost is the container, not your desktop. Check the endpoint from the environment running the MCP server and configure port forwarding or another protected route if Chrome is elsewhere. If Chrome is running locally in a supported channel, use --cdp-endpoint=chrome or --cdp-endpoint=msedge and enable “Allow remote debugging for this browser instance” in chrome://inspect/#remote-debugging instead of configuring a manual port.\n\nCDP and extension modes attach to a browser the MCP server does not own. Playwright does not automatically close attached browsers. An idle timeout disconnects the server while leaving the pages open, so close a test browser yourself when finished."
      },
      {
        "heading": "Verify the target and diagnose connection failures",
        "body": "After connecting, inspect a page snapshot and verify the hostname, title and visible account. In extension mode, confirm the intended tab in the client and use the extension status page to review or disconnect clients. Check the target before a click, form submission, download, message or account change.\n\nNo tab appears in extension mode: confirm the extension is enabled in the profile that is open and that the server arguments include --extension. By default, the extension uses the last-used profile where it is installed. Pin the intended profile with --profile-dir-name=Profile 1, using the final folder name shown in chrome://version.\n\nThe tab disappears after connection: the extension README says Chrome detaches its debugger when a page contains a restricted frame such as chrome:// or chrome-extension://, which can be injected by another extension. Disable that extension on the site, change its Site access to On click, or use a clean profile, then navigate again.\n\nA channel connection fails: enable “Allow remote debugging for this browser instance” in the target Chrome or Edge and use the matching channel value. Do not troubleshoot it as a missing manual port. For an HTTP CDP refusal or timeout, check that the browser is running, the URL has the same host and port, and the MCP server can reach it. In a container, test from inside the container. If it opens a new browser, check which route is active in the server arguments.\n\nApproval appears on every extension connection: if you use token authentication, check that PLAYWRIGHT_MCP_EXTENSION_TOKEN comes from the selected profile and is available in the MCP server environment. The extension documentation does not describe a token revocation control. If exposed, remove it from local configuration and logs, then check current extension instructions for rotation."
      },
      {
        "heading": "Disconnect and choose the right persistence mode",
        "body": "When the task ends, disconnect the client from the extension status page. Close the browser window and process if you started it for CDP; stopping the MCP server does not close an externally owned browser. For temporary access, remove the server entry and token from the client settings, and uninstall the extension from profiles that no longer need it. Apply the profile’s data-retention policy to cookies and other signed-in state.\n\nA Playwright-managed persistent profile is useful when state must survive between sessions but the task does not need the tabs already open in another browser. Playwright MCP also has isolated mode, which discards session storage when its browser closes. A persistent user-data directory can be used by only one browser instance at a time. For supported web authentication state, a storage-state file may be enough. These options have different persistence boundaries; choose based on what the workflow must retain."
      }
    ],
    "faq": [
      {
        "question": "Does Playwright MCP use my current Chrome login?",
        "answer": "Yes, when the extension attaches to the profile and tab holding that login. A Playwright-managed persistent profile is separate from your existing Chrome profile."
      },
      {
        "question": "Does the extension token limit browser actions?",
        "answer": "No. Microsoft documents it as connection authentication that skips repeated approval. It does not restrict actions after attachment."
      },
      {
        "question": "Should I use CDP or the extension for an existing tab?",
        "answer": "The extension is the direct documented route for existing tabs and installed extensions. CDP fits a browser you start or expose for debugging."
      },
      {
        "question": "Will the browser close when the MCP server exits?",
        "answer": "Not automatically for browsers attached through CDP or extension. The server disconnects while an externally owned browser remains open."
      }
    ]
  },
  "zh-cn": {
    "title": "Playwright MCP 连接已有 Chrome 浏览器",
    "description": "选择 Chrome 或 Edge 通道、CDP 端点或 Playwright 扩展连接现有浏览器。核对 profile 选择、连接错误与会话清理。",
    "category": "AI 浏览器指南",
    "content": "需要复用已有标签页和登录状态时，使用 Playwright MCP 扩展。若要连接正在运行的 Chrome 或 Edge 但没有指定端口，可用浏览器通道名；自己管理调试 URL 或需要转发连接时，使用 HTTP CDP 端点。连接方式会影响后续应检查的 profile 和网络路径。本文依据 2026 年 11 月 4 日核对的官方文档整理，没有做兼容性实测。Chrome DevTools MCP 的对应选项见 [Chrome 连接指南](/zh-cn/guides/chrome-devtools-mcp-existing-browser/)。",
    "sections": [
      {
        "heading": "选择扩展还是 CDP",
        "body": "如果需要已打开的标签页、当前登录状态或其他浏览器扩展，使用 Playwright 扩展。Chrome 或 Edge 已运行且无需指定端口时，可用浏览器通道名连接。自己设置端口或需要通过转发地址连接时，使用 HTTP CDP 端点。\n\n| 方式 | 适合情况 | 配置 | 使用的 profile |\n| --- | --- | --- | --- |\n| Chrome 或 Edge 通道 | 正在运行的浏览器，不需要手动指定端口 | 设置 --cdp-endpoint=chrome 或 --cdp-endpoint=msedge；在 chrome://inspect/#remote-debugging 允许远程调试 | 该通道选择的浏览器 |\n| HTTP CDP 端点 | 通过已知端口启动的浏览器，或转发的端点 | 将 --cdp-endpoint=http://127.0.0.1:9222 指向可达的浏览器地址 | 端点背后的浏览器 |\n| 浏览器扩展 | 已有标签页、登录状态或扩展状态 | 安装 Playwright Extension，添加 --extension，选择标签并批准 | 安装了扩展的 profile |\n| 持久 profile | 需要跨会话保存 MCP 自管状态 | 设置专用用户数据目录 | 单独的 MCP profile |\n\n通道方式通过 Playwright 支持的浏览器集成查找 Chrome 或 Edge，不需要设置端口或添加远程调试命令行开关。手动 HTTP 端点有自己的端口和 profile 条件。Chrome 136 及更新版本若通过命令行开启远程调试，需使用非默认用户数据目录。"
      },
      {
        "heading": "配置扩展并选定 profile",
        "body": "在 MCP 客户端中添加 Playwright 服务，command 使用 npx，args 包含 @playwright/mcp@latest 和 --extension。[下载最小 JSON 配置](/templates/playwright-mcp-existing-browser.json)。按客户端文档放入服务配置；如果客户端只在启动时读取配置，保存后需重新加载。\n\n多个 Chrome profile 都安装扩展时，在目标 profile 打开 chrome://version，查看 Profile Path 最后一段目录名，例如 Profile 1。把 --profile-dir-name=Profile 1 加到服务参数中即可固定 profile。不指定时，扩展连接最近使用且安装了扩展的浏览器 profile。\n\n首次连接时选择目标标签并批准连接。Microsoft 还记录了可选的 profile 专属 PLAYWRIGHT_MCP_EXTENSION_TOKEN，可从扩展界面查看。配置该 token 后可跳过后续连接批准。通过 MCP 客户端环境设置传递，不要提交到源码仓库。它只认证连接，不限制接入后的操作。"
      },
      {
        "heading": "通过 CDP 接入浏览器",
        "body": "使用手动端点时，为测试启动独立浏览器，指定专用用户数据目录和 CDP 端口，再把 --cdp-endpoint 指向相同 URL，例如 http://127.0.0.1:9222。Chrome 136 及更新版本会忽略针对默认用户数据目录的远程调试开关。除非已经配置安全连接路径，否则端点应保持在本机环回接口。\n\n容器中的 localhost 指向容器本身，而不是桌面。应从 MCP 服务运行环境检查端点；Chrome 位于其他主机时，再配置端口转发或其他受保护的连接。若 Chrome 在本机且属于支持的通道，使用 --cdp-endpoint=chrome 或 --cdp-endpoint=msedge，并在 chrome://inspect/#remote-debugging 启用“Allow remote debugging for this browser instance”，无需配置手动端口。\n\nCDP 和扩展模式接入的是 MCP 服务不拥有的浏览器。Playwright 不会自动关闭它们；闲置超时只会断开服务，页面仍保持打开。完成后应自行关闭测试浏览器。"
      },
      {
        "heading": "核对目标并排查连接问题",
        "body": "连接后读取页面快照，检查域名、标题和当前账号。扩展模式下，应在客户端确认目标标签；扩展状态页会列出连接，并允许单独断开客户端。点击、提交表单、下载、发送消息或更改账号状态前，先核对操作对象。\n\n扩展模式没有可选标签：确认目标 profile 已打开、扩展处于启用状态，且服务参数包含 --extension。默认情况下，扩展连接最近使用且安装了扩展的 profile。可在 chrome://version 查看 Profile Path 最后的目录名，再用 --profile-dir-name=Profile 1 固定 profile。\n\n连接后标签页消失：Playwright 扩展说明指出，页面中出现 chrome://、chrome-extension:// 等受限 frame 时，Chrome 会断开调试器。其他扩展可能会向页面注入此类 frame。可在待自动化网站停用该扩展、把 Site access 改成 On click，或改用干净 profile，然后重新打开页面。\n\n通道连接失败：在目标 Chrome 或 Edge 中启用“Allow remote debugging for this browser instance”，并核对服务参数里的 channel。此时不要按手动端口未开放来排查。HTTP CDP 拒绝连接或超时时，检查浏览器是否运行、URL 的主机和端口是否一致，以及 MCP 服务是否能访问端点；服务在容器中时，从容器内部检查。若启动了新浏览器，确认服务器参数中实际启用的连接方式。\n\n每次连接扩展都要批准：若使用 token，确认 PLAYWRIGHT_MCP_EXTENSION_TOKEN 来自所选 profile，并可被 MCP 服务环境读取。扩展文档没有说明 token 撤销控件。若 token 暴露，从本地配置和日志中移除，再查阅当前扩展说明确认轮换方式。"
      },
      {
        "heading": "断开连接并选择合适的持久化方式",
        "body": "任务结束后，在扩展状态页断开客户端。CDP 浏览器若为测试启动，应关闭窗口和进程；停止 MCP 服务不会自动关闭外部管理的浏览器。临时使用时，移除客户端里的服务配置和 token；不再需要扩展的 profile 可以卸载扩展。按数据保留要求处理 Cookie 和其他登录状态。\n\n如果需要跨会话保留状态，但不需要接入另一个浏览器里已打开的标签页，可以使用 Playwright 管理的持久 profile。Playwright MCP 也提供 isolated 模式，关闭浏览器后会丢弃会话存储。持久用户目录同一时间只能由一个浏览器实例使用。若只需支持的网页认证状态，storageState 文件可能已够用。先按工作流实际需要选择状态范围。"
      }
    ],
    "faq": [
      {
        "question": "Playwright MCP 会使用我当前 Chrome 的登录状态吗？",
        "answer": "通过扩展接入持有该登录状态的 profile 和标签页时会复用。Playwright 管理的持久 profile 与现有 Chrome profile 分开。"
      },
      {
        "question": "扩展 token 会限制浏览器操作吗？",
        "answer": "不会。Microsoft 将它说明为连接认证，用于跳过重复批准；连接后仍不限制具体操作。"
      },
      {
        "question": "已有标签页该选 CDP 还是扩展？",
        "answer": "已有标签页和浏览器扩展依赖通常用 Playwright Extension。CDP 适合由你启动或开放调试的浏览器。"
      },
      {
        "question": "MCP 服务退出时浏览器会关闭吗？",
        "answer": "通过 CDP 或扩展接入的浏览器不会自动关闭。服务断开后，外部管理的浏览器仍会保持打开。"
      }
    ]
  }
};

export const aiPlaywrightGuides: EditorialGuide[] = [{
  ...copy["zh-cn"],
  slug,
  date: "2026-11-04",
  sourcePath: `src/data/ai-playwright-guides.ts#${slug}`,
  availableLocales: ["en", "zh-cn"],
  relatedBrowsers: [],
  relatedTools: ["playwright", "cdp"],
  sources,
  relatedGuides: ["browser-automation-profile-persistence", "browser-use-existing-browser-session"]
}];

export const aiPlaywrightTranslations: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  [slug]: copy
};
