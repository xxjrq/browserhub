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
    "title": "Connect Playwright MCP to an existing browser session",
    "description": "Set up the Playwright browser extension or CDP for an already open Chrome or Edge session. Compare profile reuse, connection checks, troubleshooting and disconnects.",
    "category": "AI browser guides",
    "content": "To automate an already open tab, use Playwright MCP’s browser extension. Use CDP when you can start or configure a Chromium browser with a debugging endpoint. The extension prerequisites list Chrome, Edge and Chromium, with installation through the Chrome Web Store. This guide follows Microsoft’s documentation checked on October 21, 2026; no hands-on compatibility test was performed.",
    "sections": [
      {
        "heading": "Choose extension or CDP",
        "body": "Use extension mode when a task needs existing tabs, a signed-in session or another installed browser extension. Install the Playwright Extension in the intended Chrome or Edge profile; the MCP server uses the --extension argument. On first connection, the extension presents a tab-selection page and asks you to approve the connection.\n\nCDP fits a Chromium browser that you start or expose for debugging. The documented endpoint form is --cdp-endpoint=http://localhost:9222. For supported Chrome or Edge channels, Playwright points to chrome://inspect/#remote-debugging, where you enable “Allow remote debugging for this browser instance”. Chrome 136 changed remote-debugging switches: the documented setup requires a non-default user-data directory.\n\n| Route | Best fit | Setup | Profile used |\n| --- | --- | --- | --- |\n| Extension | Existing tabs, login state, installed extensions | Install extension; select tab; approve connection | Existing browser profile |\n| CDP endpoint | Browser you start or expose | Enable a supported endpoint | Browser at the endpoint |\n| Persistent profile | MCP-managed state across sessions | Set a dedicated user-data directory | Separate MCP profile |"
      },
      {
        "heading": "Configure the extension and select a profile",
        "body": "Add a Playwright MCP server entry to your client with command npx and arguments @playwright/mcp@latest, --extension. A minimal JSON example is available in the [downloadable template](/templates/playwright-mcp-existing-browser.json). Put it in the client’s documented server settings and reload the client if it reads configuration only at startup.\n\nWhen more than one Chrome profile has the extension, open chrome://version in the target profile and note the last directory name in Profile Path, such as Profile 1. Add --profile-dir-name=Profile 1 to the arguments to pin that profile. Without this option, the extension connects to the last-used browser profile that has the extension installed.\n\nOn first connection, choose the intended tab and approve access. Microsoft also documents an optional profile-specific PLAYWRIGHT_MCP_EXTENSION_TOKEN shown in the extension UI. Passing it through the MCP client environment skips approval on later connections. Keep the token out of source control; it authenticates the connection but does not restrict actions after attachment."
      },
      {
        "heading": "Connect a browser through CDP",
        "body": "Start a separate test browser with a dedicated user-data directory and CDP port, then set --cdp-endpoint=http://127.0.0.1:9222 in the MCP server arguments. For a current Chrome or Edge channel, documented values include --cdp-endpoint=chrome and --cdp-endpoint=msedge. Check chrome://inspect/#remote-debugging for the browser’s connection setting.\n\nKeep a local debugging endpoint on loopback, such as 127.0.0.1. Do not expose an unauthenticated debugging port to a network. When a container or remote MCP host runs the server, its localhost points to that host, not your desktop browser; configure a protected route if you need a remote connection.\n\nCDP and extension modes attach to a browser the MCP server does not own. Playwright does not automatically close attached browsers. An idle timeout disconnects the server while leaving the pages open, so close a test browser yourself when finished."
      },
      {
        "heading": "Verify the target and diagnose connection failures",
        "body": "After connecting, inspect a page snapshot and verify the hostname, title and visible account. In extension mode, check that the tab is in the intended client tab group; the extension status page lists connections and lets you disconnect a client. Confirm the target before a click, form submission, download, message or account change.\n\nNo tab appears: check that the extension is enabled in the selected profile, the profile is open, and the server arguments include --extension. If several profiles have the extension, set --profile-dir-name.\n\nApproval appears on every connection: if you use token authentication, check that PLAYWRIGHT_MCP_EXTENSION_TOKEN comes from the selected profile and is in the MCP server environment. The extension documentation does not describe a token revocation control. If exposed, remove it from local configuration and logs, then consult the current extension instructions about rotation.\n\nCDP refuses or times out: verify the browser process, host, port and reachability from the MCP server. If it connects to the wrong tab, check the profile and tab selection instead of raising the timeout. If the server opens a new browser, check that its active arguments contain the intended --extension or --cdp-endpoint option."
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
    "title": "Playwright MCP 如何接入已有浏览器会话",
    "description": "用浏览器扩展或 CDP 接入已打开的 Chrome、Edge，了解 profile 选择、连接检查、常见故障与断开方式。",
    "category": "AI 浏览器指南",
    "content": "要自动化已经打开的标签页，可以使用 Playwright MCP 浏览器扩展；如果你能启动或配置 Chromium 调试端点，也可以用 CDP。扩展文档列出的浏览器前置条件是 Chrome、Edge 或 Chromium，安装链接指向 Chrome 网上应用店。本文依据 2026 年 10 月 21 日核对的 Microsoft 文档整理，没有做兼容性实测。",
    "sections": [
      {
        "heading": "选择扩展还是 CDP",
        "body": "任务需要已有标签页、登录会话或其他浏览器扩展时，用扩展模式。在目标 Chrome 或 Edge profile 中安装 Playwright Extension，MCP 服务使用 --extension 参数。首次连接会打开标签页选择页，并要求你批准连接。\n\nCDP 适合由你启动或开放调试的 Chromium 浏览器。官方端点示例是 --cdp-endpoint=http://localhost:9222。连接当前 Chrome 或 Edge 通道时，Playwright 指向 chrome://inspect/#remote-debugging，并要求为该浏览器实例启用“Allow remote debugging for this browser instance”。Chrome 136 改变了远程调试开关的使用条件：官方文档说明需要非默认用户数据目录。\n\n| 方式 | 适合什么情况 | 配置 | 使用的 profile |\n| --- | --- | --- | --- |\n| 浏览器扩展 | 现有标签页、登录状态、已安装扩展 | 安装扩展、选择标签、批准连接 | 当前浏览器 profile |\n| CDP 端点 | 你启动或开放调试的浏览器 | 启用受支持端点 | 端点对应的浏览器 |\n| 持久 profile | 跨会话保留 MCP 管理的状态 | 指定专用用户目录 | 独立 MCP profile |"
      },
      {
        "heading": "配置扩展并选定 profile",
        "body": "在 MCP 客户端中添加 Playwright 服务，command 使用 npx，args 包含 @playwright/mcp@latest 和 --extension。[下载最小 JSON 配置](/templates/playwright-mcp-existing-browser.json)。按客户端文档放入服务配置；如果客户端只在启动时读取配置，保存后需重新加载。\n\n多个 Chrome profile 都安装扩展时，在目标 profile 打开 chrome://version，查看 Profile Path 最后一段目录名，例如 Profile 1。把 --profile-dir-name=Profile 1 加到服务参数中即可固定 profile。不指定时，扩展连接最近使用且安装了扩展的浏览器 profile。\n\n首次连接时选择目标标签并批准连接。Microsoft 还记录了可选的 profile 专属 PLAYWRIGHT_MCP_EXTENSION_TOKEN，可从扩展界面查看。配置该 token 后可跳过后续连接批准。通过 MCP 客户端环境设置传递，不要提交到源码仓库。它只认证连接，不限制接入后的操作。"
      },
      {
        "heading": "通过 CDP 接入浏览器",
        "body": "为测试启动独立浏览器，指定专用用户数据目录和 CDP 端口，再在 MCP 服务参数中设置 --cdp-endpoint=http://127.0.0.1:9222。连接当前 Chrome 或 Edge 通道时，文档列出的参数还包括 --cdp-endpoint=chrome 和 --cdp-endpoint=msedge。可在 chrome://inspect/#remote-debugging 查看浏览器连接设置。\n\n本机调试端点应留在回环地址，例如 127.0.0.1。不要把未认证的调试端口开放到网络。如果 MCP 服务运行在容器或远程主机上，它的 localhost 指向该主机而不是桌面浏览器；需要远程连接时，配置受保护的网络路径。\n\nCDP 和扩展模式接入的是 MCP 服务不拥有的浏览器，Playwright 不会自动关闭它们。设置闲置超时后，服务会断开，但页面仍然打开；测试结束后应自行关闭浏览器。"
      },
      {
        "heading": "核对目标并排查连接问题",
        "body": "连接后读取页面快照，检查域名、标题和当前账号。扩展模式还要确认目标标签位于正确的客户端标签组；扩展状态页会列出连接，并允许单独断开客户端。点击、提交表单、下载、发送消息或更改账号状态前，核对操作对象。\n\n没有标签可选：检查扩展是否在所选 profile 启用、profile 是否已打开，以及服务参数是否包含 --extension。多个 profile 并存时指定 --profile-dir-name。\n\n每次都要求批准：如果使用 token，确认 PLAYWRIGHT_MCP_EXTENSION_TOKEN 来自所选 profile，且已设置在 MCP 服务环境中。扩展文档没有介绍 token 撤销控件。若 token 暴露，从本地配置和日志中移除，并查阅当前扩展说明了解是否支持轮换。\n\nCDP 拒绝连接或超时：检查浏览器进程、主机、端口，以及 MCP 服务能否访问端点。连接到了错误标签时，检查 profile 和标签选择，不要只增加超时时间。若服务另开了浏览器，确认实际参数中使用了预期的 --extension 或 --cdp-endpoint。"
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
  date: "2026-10-21",
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
