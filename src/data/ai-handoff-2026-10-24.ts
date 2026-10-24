import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const slug = "browser-agent-human-takeover";
const sources = [
  {
    "title": "Browser Use: Add Tools (custom actions and human-in-the-loop)",
    "url": "https://docs.browser-use.com/open-source/customize/tools/add"
  },
  {
    "title": "Browser Use: Tools overview and browser_session injection",
    "url": "https://docs.browser-use.com/open-source/customize/tools/basics"
  },
  {
    "title": "Browser Use: open-source agent and browser lifecycle",
    "url": "https://github.com/browser-use/browser-use/blob/main/skills/open-source/references/browser.md"
  },
  {
    "title": "Playwright: Debugging tests (page.pause and Inspector)",
    "url": "https://playwright.dev/docs/debug"
  },
  {
    "title": "Playwright: Authentication and reusable browser state",
    "url": "https://playwright.dev/docs/auth"
  },
  {
    "title": "Reddit r/LangChain: What do you do when your agent gets stuck on a CAPTCHA or login?",
    "url": "https://www.reddit.com/r/LangChain/comments/1s9hgxi/what_do_you_do_when_your_agent_gets_stuck_on_a/"
  },
  {
    "title": "Browser Use GitHub issue #3659: asking the user for required information",
    "url": "https://github.com/browser-use/browser-use/issues/3659"
  }
];

const copy: Record<"en" | "zh-cn", EditorialGuideCopy> = {
  "en": {
    "title": "Browser agent human handoff: pause safely for login, MFA, or CAPTCHA",
    "description": "A practical runtime handoff contract for browser agents: pause automation, let an authorized person finish a challenge in the same session, verify the account, then resume from a fresh observation.",
    "category": "AI browser guides",
    "content": "When a browser agent reaches a login prompt, MFA challenge, or CAPTCHA that requires a person, it should pause and hand control of the same live browser page to an authorized user. After the person finishes, verify that the intended account is signed in, inspect the current page again, and only then resume the task. If the session expires, the page changes, or the handoff times out, cancel the pending continuation and start from a new observation. This guide describes a runtime design pattern, not a default feature shared by all AI browsers. It does not automate or bypass CAPTCHA challenges. The public demand examples below are questions, not usage or traffic measurements.\n\nContinue with [Playwright and an existing browser session](/en/guides/playwright-mcp-existing-browser/) and [Browser Use with an existing browser session](/en/guides/browser-use-existing-browser-session/).",
    "sections": [
      {
        "heading": "Make a human handoff a first-class task state",
        "body": "A browser task needs a state between “agent is acting” and “task is finished.” Call it waiting_for_human. Enter it when the next required step depends on a person, such as entering a password, approving MFA, or completing a site’s CAPTCHA. The agent should stop issuing browser actions before the person takes control. Keep the task open, but make the pause visible to the controller that owns the browser session.\n\nA useful handoff record contains a task ID, session ID, current page URL and title, a short reason, the time the pause began, and a deadline. Avoid putting passwords, one-time codes, cookies, or full page text in the notification. Give the user a link or desktop control only if your application can authenticate that person and route them to the actual browser session. A status message alone does not transfer control.\n\nThe lifecycle can be expressed as running → waiting_for_human → verifying → running. A timeout, cancellation, expired session, or changed page moves the task to needs_attention; it does not silently jump back to running. This state contract is framework-neutral. Each browser SDK still needs a supported way to retain and reconnect to its own browser session."
      },
      {
        "heading": "Keep control attached to the same browser and page",
        "body": "The handoff only helps if the human sees the page where the agent stopped. Preserve the existing browser session and identify the exact tab or page handle before showing it. Do not open a new browser and assume it shares cookies or local storage. Do not assume the person’s everyday Chrome window is the agent’s browser. A hosted browser provider may offer its own live-view feature, but that capability must be confirmed for the provider and plan in use. The Reddit discussion that surfaced this topic mentions Browserbase Live View and notes that it is tied to Browserbase; it is a public product discussion, not proof of a general live-view standard.\n\nFor a local browser, the controller needs a supported headed session or a secure remote-control channel. Playwright’s page.pause() opens its Inspector for debugging and requires a headed browser; it is useful during development, but the docs present it as a debugging workflow, not as a durable queue, notification, authentication, or production recovery system. Build those parts in your application.\n\nWith Browser Use’s open-source Python library, the current docs show custom tools for human-in-the-loop actions and allow tools to receive the active browser_session by its documented parameter name. Use the current SDK’s supported session API for your installed version. Browser Use documents keep_alive=True as a browser lifecycle setting; it can be necessary when a later run must use the browser after an agent run. It does not promise that an owned Chrome window will always survive cleanup or that the session can be resumed automatically. Test the exact installed release and close the session explicitly when the task is cancelled or complete. Browser Use uses its own browser/session runtime here; do not substitute Playwright page-handle code unless the application actually uses Playwright."
      },
      {
        "heading": "Verify completion before you resume automation",
        "body": "When the person signals completion, first check that the handoff still belongs to the same task and browser session. Confirm the session is connected, the expected page or origin is still present, and the page has not navigated to an unrelated destination. Then take a new observation using the framework’s normal snapshot or page-state API. The model must reason from that fresh state, not from the DOM it saw before the human interaction.\n\nCheck an application-specific signal that the authorized account is ready: for example, a known signed-in page element or a landing page your own workflow expects. Do not ask the model to infer success from the user clicking “done.” If the site returns to login, shows an error, changes account, or moves to a different page, keep automation paused and ask the human to review. Resume only the next allowed task step; the takeover does not grant broader account permissions.\n\nA practical controller can reject stale callbacks by matching task ID, session ID, and a handoff generation number. The completion event should be accepted once. If a callback arrives after cancellation or timeout, discard it. This prevents an old “continue” signal from waking a newer task that happens to use the same worker."
      },
      {
        "heading": "Set timeouts and failure paths explicitly",
        "body": "Choose a human response window that fits the job, and show the deadline to the person. On timeout, stop the agent, mark the task for review, and release or close the browser only according to the owner’s lifecycle policy. Do not keep sending actions while waiting. If the browser disconnects, the login expires, or the page handle becomes invalid, do not reconnect to a guessed tab and continue. Re-authenticate through the intended flow and take a new snapshot before proceeding.\n\nA CAPTCHA is a reason to stop and request authorized human completion when the site requires it. It does not, by itself, prove that a browser fingerprint failed or that a proxy caused a block. Sites may request a challenge for different reasons, and the agent cannot reliably diagnose the site’s risk decision from the challenge alone. Do not add CAPTCHA solvers, evasion steps, or proxy-switching tricks to this handoff. If the human cannot complete the site’s own flow, leave the task paused and follow the site’s support or account recovery process.\n\nFor Playwright-based tests, saved authentication state has separate security and lifecycle concerns. Playwright warns that state files can contain cookies and headers capable of impersonating an account, so keep them out of source control. Reusing a saved state is different from handing a running page to a human: it may start another context and will not preserve the current page’s transient challenge automatically."
      },
      {
        "heading": "Implementation checklist and common mistakes",
        "body": "Before shipping, confirm that the pause signal reaches the person who can control this exact browser; that the automation loop is blocked; that one human completion event is accepted; and that the resumed agent takes a fresh observation. Log task and session identifiers, state transitions, timeouts, and sanitized errors. Keep credentials and challenge responses out of model prompts and routine logs. Restrict who can take over a session, because the visible page may contain private account data.\n\n| Symptom | Likely design problem | Safer response |\n| --- | --- | --- |\n| User clicks “done,” but the agent repeats the previous action | The controller reused an old page snapshot | Capture a fresh page state before resuming |\n| Human sees a login screen different from the agent’s | The handoff opened another browser or tab | Route control to the recorded session and page |\n| Agent continues after the deadline | Timeout only changed the UI, not the worker state | Cancel the pending continuation and require review |\n| Browser Use browser closes after a run | Lifecycle settings or installed version do not retain the session | Verify current keep_alive behavior and session ownership for that release |\n| CAPTCHA appears and the system changes proxies | Challenge was misread as a fingerprint diagnosis | Stop and use the site’s human flow; do not infer the cause |\n\nThis design applies when a human is authorized to use the account and the site’s rules permit the task. Some sites prohibit automation or impose additional review. A handoff mechanism cannot override those terms."
      }
    ],
    "faq": [
      {
        "question": "Does Playwright page.pause() resume a production agent after a person logs in?",
        "answer": "page.pause() opens Playwright Inspector for interactive debugging in a headed browser. It is not a durable production handoff service. Your application must manage notification, access control, timeouts, session ownership, and a fresh observation after the person is done."
      },
      {
        "question": "Does a CAPTCHA mean the browser fingerprint or proxy failed?",
        "answer": "No. A challenge alone does not identify why the site requested it. Pause automation and let an authorized person follow the site’s flow. Do not infer a fingerprint or proxy failure from that signal alone."
      },
      {
        "question": "Can the agent keep working after Browser Use Agent.run() returns?",
        "answer": "The current Browser Use docs describe keep_alive=True for browser lifecycle, but behavior depends on the exact SDK release and session owner. Verify the installed version’s current API and explicitly manage cleanup. Keeping a process alive does not guarantee that an owned Chrome window or page state can always be resumed."
      }
    ]
  },
  "zh-cn": {
    "title": "浏览器智能体遇到登录、MFA 或 CAPTCHA 时如何安全交给人工",
    "description": "为浏览器智能体设计运行时人工接管：暂停自动操作，让获授权的人在同一会话完成验证，检查登录状态，再从最新页面观察恢复任务。",
    "category": "AI 浏览器指南",
    "content": "浏览器智能体遇到必须由人完成的登录、MFA 或 CAPTCHA 时，应暂停自动操作，把当前仍在运行的浏览器页面交给获授权的用户。用户完成网站流程后，先确认目标账户已登录，再重新读取页面状态，之后才能恢复任务。如果会话过期、页面改变或等待超时，就取消待恢复动作并重新观察。本文介绍的是运行时设计模式，不是所有 AI 浏览器默认具备的功能，也不自动解决或绕过 CAPTCHA。下文的公开讨论只能证明有人提出过这类问题，不能代表使用量或流量数据。\n\n继续阅读 [Playwright MCP 连接已有浏览器](/zh-cn/guides/playwright-mcp-existing-browser/) 和 [Browser Use 连接现有浏览器会话](/zh-cn/guides/browser-use-existing-browser-session/)。",
    "sections": [
      {
        "heading": "把人工接管设为明确的任务状态",
        "body": "浏览器任务需要一个介于“智能体正在操作”和“任务已结束”之间的状态，可以命名为 waiting_for_human。当下一步必须由人完成时进入这个状态，例如输入密码、批准 MFA 或处理网站给出的 CAPTCHA。进入暂停状态前，智能体应停止继续发送浏览器操作。任务仍由原控制器管理，但暂停原因必须清楚可见。\n\n一条交接记录可包含任务 ID、会话 ID、当前页面 URL 与标题、暂停原因、开始时间和截止时间。通知中不要放密码、一次性验证码、Cookie 或完整页面正文。只有应用能够验证用户身份并把用户带到实际浏览器会话时，才发送可交互链接。单独发一条“需要帮助”的消息并没有完成浏览器控制权交接。\n\n生命周期可以表示为 running → waiting_for_human → verifying → running。超时、取消、会话失效或页面改变时，任务转到 needs_attention，不能自动跳回运行状态。这个状态约定适用于多种框架；具体 SDK 仍须通过自身支持的 API 保留和重新连接浏览器会话。"
      },
      {
        "heading": "让人工操作落在原浏览器和原页面",
        "body": "交接有效的前提是用户看到智能体暂停时所在的页面。保留原浏览器会话，并在交接前记录准确的标签页或页面句柄。不要新开一个浏览器就假定它拥有相同 Cookie 或 localStorage，也不要假设用户日常使用的 Chrome 就是智能体控制的浏览器。托管浏览器供应商可能提供自己的实时查看能力，但要针对实际供应商和套餐核实。Reddit 上的讨论提到 Browserbase Live View，并指出该能力与 Browserbase 平台绑定；这只是公开产品讨论，不能证明行业已有通用的实时接管标准。\n\n本地浏览器需要受支持的有头模式，或安全的远程控制通道。Playwright 的 page.pause() 会打开 Inspector 调试器，并要求使用有头浏览器。官方文档把它放在调试流程中，没有把它描述成生产环境的任务队列、通知、身份验证或恢复服务。这些部分仍需由你的应用实现。\n\nBrowser Use 开源 Python 库的当前文档展示了通过自定义工具实现 human-in-the-loop，并允许工具按文档指定的参数名接收当前 browser_session。应使用与你安装版本相符的会话 API。Browser Use 将 keep_alive=True 作为浏览器生命周期设置；当 Agent 本轮运行后还要继续使用浏览器时，它可能是必要配置。但它不保证 Agent 清理后自有 Chrome 窗口一定保留，也不表示会话可自动恢复。请验证确切版本的行为，并在取消或完成时显式关闭会话。这里讲的是 Browser Use 自己的浏览器与会话运行时，只有实际应用使用 Playwright 时才应采用 Playwright 页面句柄。"
      },
      {
        "heading": "恢复自动化前检查登录结果和最新页面",
        "body": "用户表示已完成后，先确认交接仍属于原任务和浏览器会话。检查会话是否仍连接、预期页面或站点是否仍在前台，以及页面有没有跳转到无关目的地。然后用框架正常的快照或页面状态 API 重新观察。模型应依据人工操作之后的最新状态推理，不能沿用接管前的 DOM 结果。\n\n还要验证账户确实可用，例如查找预期的登录后页面元素，或确认到达工作流程预定的落地页。不能只根据用户点了“完成”就让模型判定成功。如果页面又显示登录框、错误提示，或账户发生变化，就继续暂停并请用户检查。恢复后只执行原任务允许的下一步；人工接管并不会扩大账户权限。\n\n控制器可以同时校验任务 ID、会话 ID 和交接代数，以拒绝过期回调。一次完成事件只应被接受一次。任务取消或超时后才到达的回调应直接丢弃，避免旧任务的“继续”信号误唤醒复用了同一工作进程的新任务。"
      },
      {
        "heading": "明确等待时限和失败后的处理",
        "body": "为人工响应设定符合任务的等待时限，并把截止时间展示给用户。超时后停止智能体，将任务标记为待检查；浏览器是否释放或关闭，应由会话所有者的生命周期规则决定。等待期间不能继续发送操作。如果浏览器断开、登录失效或页面句柄不可用，就不要猜一个标签页重新连接后继续。应按预定流程重新验证，再读取新快照。\n\n网站要求由人处理 CAPTCHA 时，应暂停并请获授权的用户完成网站自己的验证流程。出现挑战本身不能证明浏览器指纹失败，也不能证明代理导致拦截。网站会在不同情况下要求验证，智能体无法只凭这一页诊断网站的风控原因。不要在这套交接里加入 CAPTCHA 求解器、规避步骤或换代理技巧。如果人工也无法完成网站流程，就保持暂停并遵循网站的支持或账户恢复步骤。\n\nPlaywright 测试中保存的认证状态另有安全和生命周期问题。Playwright 警告状态文件可能含有能够冒用账户的 Cookie 和请求头，因此不能提交到代码仓库。复用已保存状态与把正在运行的页面交给人工是两回事：它可能启动新的上下文，也不会自动保留当前页面上尚未处理的验证挑战。"
      },
      {
        "heading": "实现检查表与常见误区",
        "body": "上线前逐项确认：暂停通知能送达有权操作这台浏览器的人；自动化循环确实被阻塞；一次人工完成事件只会被接受一次；恢复前会重新读取页面状态。日志保留任务和会话标识、状态变化、超时与脱敏错误即可。不要把登录凭据或挑战响应写入模型上下文和常规日志。由于页面可能展示账户隐私，应限制能够接管会话的人。\n\n| 现象 | 可能的设计问题 | 更安全的处理 |\n| --- | --- | --- |\n| 用户点了“完成”，智能体又重复原操作 | 控制器沿用了人工介入前的页面快照 | 恢复前重新读取页面状态 |\n| 人工看到的登录页与智能体不同 | 交接打开了另一浏览器或标签页 | 使用交接记录中的会话和页面 |\n| 超时后智能体仍继续执行 | 超时只改了界面，没有取消后台任务 | 取消待恢复动作并要求人工复核 |\n| Browser Use 每轮运行后浏览器关闭 | 生命周期设置或已安装版本未保留会话 | 按该版本核对 keep_alive 行为与会话所有权 |\n| 出现 CAPTCHA 后系统自动换代理 | 把挑战误当作指纹诊断结果 | 停止操作，使用网站人工流程，不推断原因 |\n\n本文适用于有权操作该账户且网站规则允许自动化的情况。有些网站禁止自动化或要求额外审核，人工接管机制不能覆盖这些条款。"
      }
    ],
    "faq": [
      {
        "question": "Playwright 的 page.pause() 能否让生产智能体等人登录后继续？",
        "answer": "page.pause() 会在有头浏览器中打开 Playwright Inspector，用于交互式调试。它不是持久化的生产交接服务。应用仍需负责通知、访问控制、超时、会话归属，以及人工完成后的最新页面观察。"
      },
      {
        "question": "出现 CAPTCHA 就说明浏览器指纹或代理失败了吗？",
        "answer": "不能这样判断。单凭挑战页无法确定网站要求验证的原因。应暂停自动操作，让获授权的人按网站流程处理，不要仅凭这一信号推断指纹或代理故障。"
      },
      {
        "question": "Browser Use 的 Agent.run() 返回后还能继续用浏览器吗？",
        "answer": "当前 Browser Use 文档介绍了用于浏览器生命周期的 keep_alive=True，但实际行为取决于安装的 SDK 版本和会话所有者。请核对该版本的 API 并显式管理清理流程。进程保持运行并不能保证自有 Chrome 窗口或页面状态总能恢复。"
      }
    ]
  }
};

export const aiHandoffGuides: EditorialGuide[] = [
  {
    ...copy["zh-cn"],
    slug,
    date: "2026-10-24",
    sourcePath: "src/data/ai-handoff-2026-10-24.ts#browser-agent-human-takeover",
    availableLocales: ["en", "zh-cn"],
    relatedBrowsers: [],
    relatedTools: [],
    sources,
    relatedGuides: ["playwright-mcp-existing-browser", "browser-use-existing-browser-session"]
  }
];

export const aiHandoffTranslations: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  [slug]: copy
};
