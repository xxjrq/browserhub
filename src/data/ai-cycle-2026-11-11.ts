import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
	"notion-agent-web-browsing-access": [
		{ title: "Notion Help: Turn on web browser for Notion Agent", url: "https://www.notion.com/en-gb/help/turn-on-web-browser-for-notion-agent" },
		{ title: "Notion Help: Get started with Notion Agent", url: "https://www.notion.com/en-gb/help/notion-agent" },
		{ title: "Individual Notion Agent browser-access question", url: "https://www.reddit.com/r/Notion/comments/1wrqszo/why_does_notion_think_browser_access_is_disabled/" }
	],
	"dia-ai-content-data-controls": [
		{ title: "Dia: Security and data controls", url: "https://www.diabrowser.com/security" },
		{ title: "Dia: Privacy policy", url: "https://www.diabrowser.com/privacy" },
		{ title: "Individual question about Dia page context and Morning Brief", url: "https://www.reddit.com/r/diabrowser/comments/1x2b99j/what_does_dia_send_to_ai-providers-from-sites/" }
	],
	"firefox-ios-reader-ai-summary-controls": [
		{ title: "Mozilla Support: Summarize pages in Firefox for iOS", url: "https://support.mozilla.org/en-US/kb/summarize-pages-ios" },
		{ title: "Mozilla Support: Manage remote improvements settings", url: "https://support.mozilla.org/en-US/kb/remote-improvements" },
		{ title: "Mozilla Firefox Privacy Notice", url: "https://www.mozilla.org/en-US/privacy/firefox/" }
	],
	"genspark-chrome-extension-page-task-boundary": [
		{ title: "Genspark Help: Chrome extension", url: "https://www.genspark.ai/helpcenter/chrome-extension" },
		{ title: "Genspark Help: Credits guide", url: "https://www.genspark.ai/helpcenter/credits-guide" },
		{ title: "Genspark: Privacy Policy", url: "https://www.genspark.ai/privacy" }
	],
	"safari-iphone-webpage-summary": [
		{ title: "Apple iPhone User Guide: Summarize a webpage in Safari", url: "https://support.apple.com/guide/iphone/browse-the-web-iph1fbef4daa/ios" },
		{ title: "Apple Support: Apple Intelligence availability", url: "https://support.apple.com/en-us/121115" },
		{ title: "Apple iPhone User Guide: Writing Tools in iOS 27", url: "https://support.apple.com/guide/iphone/writing-tools-write-improve-summarize-iph6f08da1d2/27/ios/27" }
	]
};

const related: Record<string, string[]> = {
	"notion-agent-web-browsing-access": ["ai-browser-tab-access-permissions", "ai-browser-vs-ai-search-engine", "browser-agent-human-takeover"],
	"dia-ai-content-data-controls": ["comet-assistant-history-data-controls", "brave-leo-byom-local-vs-hosted", "opera-ai-page-content-permission"],
	"firefox-ios-reader-ai-summary-controls": ["firefox-ai-controls-chatbot-provider-boundary", "ai-browser-youtube-summary", "ai-browser-webpage-translation"],
	"genspark-chrome-extension-page-task-boundary": ["ai-browser-tab-access-permissions", "comet-extension-compatibility", "browser-agent-human-takeover"],
	"safari-iphone-webpage-summary": ["ai-browser-webpage-translation", "ai-browser-youtube-summary", "firefox-ios-reader-ai-summary-controls"]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"notion-agent-web-browsing-access": {
		en: {
			title: "Notion Agent Says Web Browsing Is Disabled: Check Both Controls",
			description: "Find the workspace and per-agent Notion settings that govern web browsing, then distinguish search answers from browser actions and local Chrome access.",
			category: "AI browser guides",
			content: "A Notion Agent message that browser access is disabled can involve a workspace permission and a separate Web browsing setting for the Agent. Notion says an Enterprise workspace, or a workspace working with an account manager, may require an owner or admin to enable computer browsing. Search or a text answer does not prove the Agent can open websites or interact with a page. Check the workspace and Agent that produced the message before changing a setting.",
			sections: [
				{ heading: "Identify whether the task needs search or browser access", body: `Start with the requested result. If the agent only needs an answer from its existing knowledge or a search result, web browsing may not be required. If it must open a page, inspect its contents, or continue through a website, check the browser capability. Notion's Help Center describes the feature as a browser for the Agent's computer; it is separate from a search answer and from a local Chrome extension. The documentation does not say that the Agent inherits your open Chrome tabs, cookies, or saved passwords. Keep those browser surfaces distinct while troubleshooting.

Use a public, non-sensitive URL for a first check. Ask the Agent to identify the page title and one visible detail, then compare its answer with the page. This read-only check confirms the type of access being attempted; it does not verify a form submission, a login, or every supported site. If the request is only to summarize a search result, do not widen browsing access just because the answer is incomplete. First establish which capability the request actually needs.` },
				{ heading: "Check the workspace-level permission", body: `If the workspace is Enterprise or works with an account manager, Notion says a workspace owner or admin may need to enable computer browsing. In workspace settings, open Notion AI and look for Enable web browsing for computer. Notion says this permission is on by default for most plans; the additional Enterprise control is an administrative setting. These statements describe different account contexts. Check the role that controls your workspace instead of assuming every member sees the same switch.

- If your workspace is Enterprise or works with an account manager, ask a workspace owner or admin about Enable web browsing for computer.
- If the control is absent, confirm the workspace plan and your role with its administrator.
- Then check Web browsing in the Agent's Notion AI settings.

If you cannot see the control, confirm your workspace plan and role with the administrator. Avoid changing unrelated AI, sharing, or security settings as a diagnostic shortcut. A workspace owner can enable the documented permission, but an individual member should not try to bypass an organization policy. Note whether the toggle is visible, who controls it, and whether the current account belongs to the expected workspace. These details are more useful than repeatedly asking the Agent to browse while the permission remains unavailable.` },
				{ heading: "Check the Agent setting", body: `After confirming workspace access, open the Agent's settings and inspect Notion AI > Web browsing. Notion documents this separately from the workspace permission, so workspace access does not by itself establish the Agent's setting. Conversely, turning on the Agent option cannot override a workspace-level restriction. If the setting is missing, confirm that you are viewing the Agent that produced the error.

Notion's Help Center uses the label Web browser in its FAQ and Web browsing in the settings description. Follow the wording shown in your current UI instead of looking for an older fixed button position. If both documented controls are enabled and the message persists, preserve the exact wording and workspace role for Support rather than changing broader permissions.` },
				{ heading: "Understand login prompts and the Agent's browser state", body: `When a site requires authentication, Notion says the Agent can pause and wait for you to take over its browser. Complete the login in that browser only after checking the domain and the requested account. Notion states that credentials are entered directly into the browser and are not saved by Notion as passwords; browser cookies may keep a session signed in. A persisted sign-in is therefore browser session state, not a password stored for later reuse. Do not paste passwords, recovery codes, or session cookies into an Agent prompt.

The takeover flow is a human checkpoint. Review the page after signing in and before resuming the Agent, particularly if it can access private workspace content or perform an action. A login prompt does not show that the Agent has your local Chrome session. If you need the existing local profile, use a product that explicitly documents that connection instead of assuming Notion's built-in computer shares it. After any interrupted action, inspect the destination page before retrying so you do not duplicate a submission.` },
				{ heading: "Diagnose the message with a small decision table", body: `| What you observe | Check first | What the result means |
| --- | --- | --- |
| Agent answers from search but will not open a page | Per-agent Web browsing, then workspace permission | Search capability and browser access are separate |
| The current Agent reports access disabled | The Agent's Web browsing setting | Check it separately from workspace permission |
| No workspace control is visible | Plan, role, and administrator settings | The documented Enterprise control may not apply to your role or plan |
| A site asks for sign-in | The domain and browser takeover prompt | The Agent may wait while you sign in to its browser session |
| Both controls appear enabled but error remains | Account/workspace identity and exact error text | Record the message and workspace role |

Change one relevant setting at a time, then retry a short read-only request on a public page. Record whether the error changes. Do not test by having an Agent submit a form or modify a workspace record. If access is managed by an organization, ask the administrator before changing a control that affects other members.` },
				{ heading: "When to stop and contact Notion", body: `If the documented controls are enabled for the right workspace and Agent, collect the exact error, date and time, workspace plan and role, and whether a public page could be opened. Include only a concise reproduction using a public URL. Do not attach private page text, customer records, browser cookies, passwords, or screenshots that expose workspace content.

Notion's Agent has its own browser workflow, while the [general tab-access guide](/en/guides/ai-browser-tab-access-permissions/) covers how other products expose tabs and permissions. The [AI browser versus search guide](/en/guides/ai-browser-vs-ai-search-engine/) explains why a search result is not the same as opening a page. For actions that need a person to review a step, see the [browser-agent takeover guide](/en/guides/browser-agent-human-takeover/). BrowserHub checked Notion's public instructions on November 11, 2026 and did not connect a workspace or run an Agent task.` },
				{ heading: "Sources and scope", body: `Notion's [current help page](https://www.notion.com/en-gb/help/turn-on-web-browser-for-notion-agent) documents the workspace and Agent controls, browser takeover for sign-in, and its description of credential handling. The [Notion Agent overview](https://www.notion.com/en-gb/help/notion-agent) describes its built-in computer. An [individual reader question](https://www.reddit.com/r/Notion/comments/1wrqszo/why_does_notion_think_browser_access_is_disabled/) reports the disabled message; it does not establish a cause or broader outage. Checked November 11, 2026; confirm eligibility and labels in your workspace.` }
			],
			faq: [
				{ question: "Why does Notion say web browsing is disabled?", answer: "Check both the workspace permission, where applicable, and the Web browsing switch for the specific Agent. Search answers do not prove browser access is enabled." },
				{ question: "Does workspace permission replace the Agent setting?", answer: "No. Notion documents an Agent-level Web browsing setting separately from workspace computer-browsing permission." },
				{ question: "Can Notion Agent use my Chrome tabs and cookies?", answer: "The public instructions describe the Agent's own browser and do not document attaching a local Chrome profile or inheriting its open tabs." },
				{ question: "Does Notion save my password when I take over the browser?", answer: "Notion says credentials entered into the browser are not saved by Notion as passwords. A browser cookie may keep the site session signed in." },
				{ question: "What if both controls are on?", answer: "Confirm the workspace and Agent identity, retry a read-only public page, then send Support the exact error and account role without private page data." }
			]
		},
		"zh-cn": {
			title: "Notion Agent 提示网页浏览已关闭：分别检查两级开关",
			description: "核对 Notion Agent 的工作区权限和单个 Agent 开关，区分搜索回答、网页操作与本机 Chrome 会话。",
			category: "AI 浏览器指南",
			content: "Notion Agent 提示网页浏览已关闭时，可能涉及两个不同控制项。Notion 文档说明，如果工作区属于 Enterprise 套餐或与客户经理合作，工作区所有者或管理员可能需要先启用电脑浏览；Agent 另有 Web browsing 设置。搜索或文本回答不代表 Agent 可以打开网站并操作页面。先核对报错的账号、工作区和 Agent，再考虑修改设置。",
			sections: [
				{ heading: "先判断任务需要搜索还是浏览器访问", body: `先看你要的结果。如果 Agent 只需根据已有知识或搜索结果回答，可能不需要网页浏览；如果它必须打开网页、查看页面内容或继续浏览网站，就要检查浏览器能力。Notion 帮助中心把它描述为 Agent 电脑中的浏览器，与搜索回答和本机 Chrome 扩展不同。文档没有说 Agent 会继承你打开的 Chrome 标签、Cookie 或保存的密码。排查时应把这些浏览器入口分开。

第一次检查可使用不含敏感信息的公开网址。让 Agent 说出页面标题和一个可见信息，再与你看到的页面核对。这种只读检查能帮助确认正在使用哪类访问能力，但不能验证表单提交、登录或所有网站。如果请求只是总结搜索结果，不要因为回答不完整就扩大浏览权限。先确定任务实际需要哪项能力。` },
				{ heading: "检查工作区级权限", body: `如果工作区属于 Enterprise 套餐或与客户经理合作，Notion 说明可能需要工作区所有者或管理员启用电脑网页浏览。在工作区设置的 Notion AI 中查找 Enable web browsing for computer。Notion 说大多数套餐默认开启，而 Enterprise 工作区控制项属于管理设置。这两句话指的是不同账号情形；不能据此推断所有工作区都看到相同的管理员开关，也不能认为默认开启就不需要检查 Agent 开关。

- 如果工作区属于 Enterprise 或与客户经理合作，向工作区所有者或管理员询问 Enable web browsing for computer。
- 若看不到该控制项，向管理员确认工作区套餐和你的角色。
- 然后检查 Agent 的 Notion AI > Web browsing 设置。

如果看不到该控制项，先向管理员确认套餐和自己的角色。不要把无关的 AI、共享或安全设置一起改掉，也不要绕过组织策略。工作区管理员可以启用文档描述的权限，普通成员不应自行规避限制。记录开关是否可见、由谁管理，以及当前账号是否属于预期工作区。这些信息比在权限未开放时反复让 Agent 浏览更有帮助。` },
				{ heading: "再检查单个 Agent 的设置", body: `确认工作区允许后，打开产生错误的那个 Agent 设置，查看 Notion AI > Web browsing。Notion 文档将 Agent 的 Web browsing 设置与工作区权限分开说明，因此工作区允许浏览，并不能证明当前 Agent 开关已开启。反过来，打开 Agent 开关也不能覆盖工作区级限制。如果找不到设置，确认你查看的是产生提示的 Agent。

Notion 帮助页在说明中使用 Web browsing，在常见问题中也称 Web browser。应以当前界面显示的文字为准，不要追寻旧版按钮的位置。如果两个文档控制项都已开启而提示仍在，保存准确报错文字和工作区角色后联系支持，不要扩大其他权限。` },
				{ heading: "理解登录提示和 Agent 浏览器状态", body: `网站要求登录时，Notion 说 Agent 可以暂停并等待你接管它的浏览器。先核对域名和目标账号，再决定是否在该浏览器里登录。Notion 表示凭据直接输入浏览器，不会作为密码保存在 Notion；浏览器 Cookie 可能让网站保持登录。因此，持续登录的是浏览器会话状态，不等于 Notion 保存了可复用密码。不要把密码、恢复码或会话 Cookie 粘贴到 Agent 提示中。

接管是一个由人确认的节点。登录后先检查页面，再决定是否让 Agent 继续，尤其当它可能访问私密工作区内容或执行操作时。出现登录提示不代表 Agent 获得了本机 Chrome 会话。如果任务必须使用本地配置文件，应选择明确说明支持该连接的产品，不要假设 Notion 内置电脑会共享它。若任务中断，重试前先检查目标页面，避免重复提交。` },
				{ heading: "用小型对照表定位提示", body: `| 看到的情况 | 先检查 | 结果说明 |
| --- | --- | --- |
| Agent 能搜索回答，却打不开网页 | 单个 Agent 的 Web browsing，再查工作区权限 | 搜索能力和浏览器访问不同 |
| 当前 Agent 报关闭 | 当前 Agent 的 Web browsing 设置 | 单独核对 Agent 和工作区权限 |
| 看不到工作区控制项 | 套餐、角色和管理员设置 | Enterprise 管理控制可能不适用于你的角色或套餐 |
| 网站要求登录 | 域名和浏览器接管提示 | Agent 可能会等待你登录其浏览器会话 |
| 两项都开启但仍报错 | 工作区身份和准确报错文字 | 记录报错文字和工作区角色 |

一次只改一个相关设置，再用公开网页上的简短只读请求重试，并记录提示是否变化。不要让 Agent 通过提交表单或修改工作区记录来测试访问。如果访问由组织管理，修改影响其他成员的设置前应先询问管理员。` },
				{ heading: "何时停止排查并联系 Notion", body: `如果正确工作区和 Agent 的两个文档控制项都已开启，记录准确报错、日期时间、工作区套餐和角色、Agent 名称，以及能否打开公开网页。只提供公开网址和简短复现步骤。不要附上私密页面文字、客户记录、浏览器 Cookie、密码或包含工作区内容的截图。

Notion Agent 使用自己的浏览器流程；[通用标签访问指南](/zh-cn/guides/ai-browser-tab-access-permissions/)介绍其他产品如何提供标签和权限。[AI 浏览器与搜索引擎指南](/zh-cn/guides/ai-browser-vs-ai-search-engine/)解释搜索结果与打开网页的区别。需要人工检查步骤时，可看[浏览器智能体接管指南](/zh-cn/guides/browser-agent-human-takeover/)。BrowserHub 于 2026 年 11 月 11 日核对 Notion 公开说明，没有连接工作区或运行 Agent 任务。` },
				{ heading: "来源与范围", body: `Notion 的[当前帮助页](https://www.notion.com/en-gb/help/turn-on-web-browser-for-notion-agent)说明工作区和 Agent 控制项、登录接管，以及凭据处理方式。[Notion Agent 概览](https://www.notion.com/en-gb/help/notion-agent)介绍其内置电脑。[一条用户提问](https://www.reddit.com/r/Notion/comments/1wrqszo/why_does_notion_think_browser_access_is_disabled/)报告了关闭提示，但不能确定原因或普遍故障。核查日期为 2026 年 11 月 11 日；界面标签和账号资格可能变化，应以自己工作区当前显示为准。` }
			],
			faq: [
				{ question: "为什么 Notion 提示网页浏览已关闭？", answer: "分别检查适用的工作区权限，以及具体 Agent 的 Web browsing 开关。能搜索回答不代表浏览器访问已启用。" },
				{ question: "工作区权限会代替 Agent 设置吗？", answer: "不会。Notion 文档将 Agent 的 Web browsing 设置与工作区电脑浏览权限分开说明。" },
				{ question: "Notion Agent 能使用我的 Chrome 标签和 Cookie 吗？", answer: "公开说明描述的是 Agent 自己的浏览器，没有说明可连接本机 Chrome 配置文件或继承打开的标签。" },
				{ question: "接管浏览器时 Notion 会保存我的密码吗？", answer: "Notion 表示在浏览器中输入的凭据不会作为密码保存在 Notion。浏览器 Cookie 可能保持网站会话登录。" },
				{ question: "两个开关都开启了怎么办？", answer: "确认工作区和 Agent 身份，用公开网页做只读重试，再向支持团队提供准确报错和账号角色，不要附私密页面数据。" }
			]
		}
	},
	"dia-ai-content-data-controls": {
		en: {
			title: "Dia Privacy Settings: Separate Provider Processing, Training, and Sync",
			description: "Check Dia's default content-sharing control, provider processing, proactive Morning Brief, local browser data, and encrypted Sync without treating one switch as a blanket opt-out.",
			category: "AI browser guides",
			content: "Dia's security page describes two ways content may be processed: relevant page context sent to an AI provider for a request, and content used by default to improve Dia and its small on-device models. The provider terms described by Dia restrict training and retention beyond processing; the separate improvement-sharing setting is at Settings > Privacy > Share content data to help improve Dia. Dia says shared improvement content is retained for 30 days. Morning Brief can also prepare information proactively, so page processing is not limited to a request you type.",
			sections: [
				{ heading: "Start by naming the data path", body: `Separate three questions before using a page: will this feature send context to an AI provider, is content sharing for Dia improvement enabled, and can the feature prepare information proactively? Dia's security page says provider processing may happen when an AI request uses page context. It also describes Morning Brief as proactively preparing information, which may involve relevant data without a new prompt. Dia's content-improvement sharing is a separate default use.

Dia describes sensitive-site filtering as best effort for passive processing such as content improvement. It is not a guarantee and does not apply when a user deliberately includes a site in an AI request. If a page must not be processed, do not use an AI feature on it.` },
				{ heading: "Review the content-improvement switch", body: `Dia says content sharing for product improvement is on by default. To opt out, use Settings > Privacy > Share content data to help improve Dia. Dia describes shared improvement content as unlinked from the user's account and retained for 30 days. It also says small on-device models may be improved using content, and an organization can disable sharing for its users. These are Dia's statements; check the wording in your current build and whether an administrator manages the setting.

- Open Settings > Privacy.
- Review Share content data to help improve Dia; Dia says it is on by default.
- Turn it off to opt out of the documented improvement-sharing use.
- Check separately whether Morning Brief or an active prompt may send relevant page context for processing.

Turning off sharing addresses the documented improvement-sharing path. It does not mean that no page context is sent to an AI provider when you actively request an answer. Nor should local deletion or account deletion be described as immediately purging data already shared for improvement; Dia's stated retention period is 30 days. If a control is unavailable, greyed out, or changes back, record the build and management status and ask Dia or your organization. Do not infer that an absent toggle means sharing is either enabled or disabled without checking the current policy.` },
				{ heading: "Separate provider use from Dia's own improvement use", body: `When Dia answers a page question, its security explanation says the prompt and relevant page context pass through Dia's servers and an Atlassian gateway to providers. Dia says provider agreements prohibit training on submitted data and retention beyond the processing needed to answer. That is Dia's description of the product and contracts; BrowserHub has not independently inspected provider traffic or agreements.

Morning Brief is proactive, while an AI question is user initiated. Before using either with sensitive material, check Dia's current explanation for that exact feature. The improvement-sharing opt-out alone does not prevent provider processing for active or proactive features.` },
				{ heading: "Check local history and Sync separately", body: `Dia says conversations, browsing history, bookmarks, and files are stored locally by default. Sync is separate: Dia describes Sync as end-to-end encrypted, with the service unable to read synced data. This statement applies to Sync, not to AI inference or content sent to providers. Clearing local history does not establish that previously shared improvement content has been deleted. For that shared content, Dia states a 30-day retention period. Check the current privacy page for the exact data type and control you need.` },
				{ heading: "Use a setting-by-setting decision table", body: `| Your question | Dia control or statement to check | Boundary to keep in mind |
| --- | --- | --- |
| Can a page be sent to answer my prompt? | AI request and the current security explanation | Relevant context may pass through Dia servers to providers |
| Can my data be used to improve Dia? | Settings > Privacy > Share content data to help improve Dia | Dia describes a separate 30-day improvement-sharing path |
| Are provider models trained on my request? | Provider restrictions described by Dia | Contractual no-training does not mean no processing |
| Where are conversations and bookmarks stored? | Local history and the current privacy page | Local storage does not describe every AI request |
| Does Sync protect content? | Dia Sync explanation | End-to-end encryption applies to Sync, not all AI inference |
| Will deleting history erase prior sharing? | Retention statement and deletion terms | Do not promise immediate removal of shared improvement data |

For a work device, ask the administrator whether organization-wide improvement sharing is disabled. The [Comet history controls guide](/en/guides/comet-assistant-history-data-controls/) covers another browser's local history and retention controls; the [Brave model guide](/en/guides/brave-leo-byom-local-vs-hosted/) compares a different product's local and hosted processing. Neither product's setting applies to Dia.` },
				{ heading: "Choose a cautious test and know when to stop", body: `To inspect a control without exposing private material, open a public page, review the relevant setting, and ask a simple question about a non-sensitive sentence. Do not use a customer dashboard, medical record, private message, or internal document as a test. A successful answer only shows that the feature responded. It cannot establish which network systems handled the request or independently validate a retention claim.

If a page must not be processed by AI, do not include it in a request. Organizations that need to block AI on specific sites can use MDM controls; this is separate from Dia's best-effort passive filtering. For a settings issue, record the Dia version, operating system, and whether an administrator manages the control. Dia says not to use it for work involving protected health information; it is not HIPAA-compliant and the company does not offer a Business Associate Agreement.` },
				{ heading: "Sources and scope", body: `Dia's [security page](https://www.diabrowser.com/security) and [privacy policy](https://www.diabrowser.com/privacy) were checked November 11, 2026. An [individual reader question](https://www.reddit.com/r/diabrowser/comments/1x2b99j/what_does_dia_send_to_ai-providers-from-sites/) asks about page context and Morning Brief. Product and contract statements are attributed to Dia; BrowserHub did not inspect traffic or independently audit contracts.` }
			],
			faq: [
				{ question: "Does switching off Share content data stop every AI request?", answer: "No. Dia says improvement sharing is on by default and this setting opts out of that use. A page request or proactive Morning Brief may still send relevant context for processing." },
				{ question: "Does Dia send page content to an AI provider?", answer: "Dia says prompts and relevant page context may pass through its servers to providers to answer a request. Its provider restrictions do not mean the content is never processed." },
				{ question: "Are provider models trained on my request?", answer: "Dia says provider agreements already prohibit training on submitted data. This contractual restriction is separate from Dia's own content-improvement switch, which is on by default and has a separate opt-out." },
				{ question: "Does deleting local history remove shared content immediately?", answer: "Do not assume that. Dia states improvement-sharing content is retained for 30 days; local history deletion is a separate control." },
				{ question: "Is Dia Sync the same as private AI processing?", answer: "No. Dia describes Sync as end-to-end encrypted. That claim concerns Sync and does not describe all AI inference or provider requests." }
			]
		},
		"zh-cn": {
			title: "Dia 隐私设置：区分模型处理、内容改进与同步",
			description: "核对 Dia 默认内容共享、服务商处理、主动 Morning Brief、本地浏览数据与加密同步，避免把一个开关当成全面退出。",
			category: "AI 浏览器指南",
			content: "Dia 安全页说明了两类内容处理：为回答请求向 AI 服务商发送相关网页上下文，以及默认使用内容改进 Dia 和本地小模型。Dia 描述的服务商条款限制模型训练和超出处理所需的保留；产品改进共享另有 Settings > Privacy > Share content data to help improve Dia 开关。共享的改进内容据称保留 30 天。Morning Brief 也会主动准备信息，因此页面处理不只发生在用户输入问题之后。",
			sections: [
				{ heading: "先说清楚是哪条数据路径", body: `使用网页前，先分清三个问题：该功能是否会把上下文发送给 AI 服务商、Dia 改进共享是否开启，以及功能是否会主动准备信息。Dia 安全页称，AI 请求使用网页上下文时可能进行服务商处理；Morning Brief 也会主动准备信息，可能不需要新的提示。Dia 的产品改进共享是单独的默认用途。

Dia 称敏感网站过滤对产品改进等被动处理尽力而为。这不是保证，也不适用于用户主动将网站加入 AI 请求的情况。网页若不得经过 AI 处理，不要在该页面使用 AI 功能。` },
				{ heading: "查看内容改进开关", body: `Dia 称产品改进内容共享默认开启。若要退出，可进入 Settings > Privacy > Share content data to help improve Dia。Dia 说明共享的改进内容与账号解绑并保留 30 天；它也称小型本地模型可能使用内容改进，组织可为用户关闭共享。这些都是 Dia 的表述。查看当前版本中的完整说明，并确认设置是否由管理员管理。

- 打开 Settings > Privacy。
- 查看 Share content data to help improve Dia；Dia 称该项默认开启。
- 关闭此项可退出文档所述的产品改进共享。
- 另行核对 Morning Brief 或主动提问是否会发送相关网页上下文进行处理。

Morning Brief 会主动准备信息，可能在没有新提问时处理相关数据。这与产品改进共享和用户主动发起的 AI 请求不同。不要把改进共享的退出开关理解成能停止其他功能的数据处理。` },
				{ heading: "区分服务商处理与 Dia 自身改进", body: `Dia 回答网页问题时，安全说明称提示和相关页面上下文会经过 Dia 服务器及 Atlassian 网关发送给服务商。Dia 表示服务商协议禁止用提交数据训练模型，也禁止在完成回答所需处理后继续保留。这是 Dia 对产品和合同的说明；BrowserHub 未独立检查流量或协议。

产品改进共享开关不覆盖其他处理路径。Morning Brief 会主动准备信息，AI 提问则由用户发起。对敏感内容使用这些功能前，应查看对应功能的当前说明。如果政策禁止外部处理，仅关闭改进共享并不够。` },
				{ heading: "分别检查本地数据与 Sync", body: `Dia 称对话、浏览历史、书签和文件默认保存在本地。Sync 是另一条路径：Dia 将其描述为端到端加密，服务方无法读取已同步数据。这一说法针对 Sync，不代表 AI 推理或发送给服务商的内容。清除本地历史也不能证明此前共享的改进内容已删除；Dia 对这类共享内容说明了 30 天保留期。应查看当前隐私页，确认具体数据类型和对应控制项。` },
				{ heading: "逐项对照设置与说明", body: `| 你关心的问题 | 要检查的 Dia 控制或说明 | 需要保留的边界 |
| --- | --- | --- |
| 页面会发给服务商回答问题吗？ | AI 请求和当前安全说明 | 相关上下文可能经过 Dia 服务器发送给服务商 |
| 数据会用于改进 Dia 吗？ | Settings > Privacy > Share content data to help improve Dia | Dia 描述了单独的 30 天改进共享路径 |
| 服务商会用请求训练模型吗？ | Dia 对服务商限制的说明 | 合同不训练不等于不处理 |
| 对话和书签存在哪里？ | 本地历史设置及当前隐私页 | 本地保存不说明每类 AI 请求的处理方式 |
| Sync 能保护内容吗？ | Dia 对 Sync 的说明 | 端到端加密针对 Sync，不覆盖所有 AI 推理 |
| 删除历史会立即清除共享吗？ | 保留声明和删除条款 | 不要承诺已共享内容会立即清除 |

工作设备上可向管理员确认是否已为组织关闭改进共享。[Comet 历史控制指南](/zh-cn/guides/comet-assistant-history-data-controls/)介绍另一款浏览器的本地历史和保留控制；[Brave 模型指南](/zh-cn/guides/brave-leo-byom-local-vs-hosted/)比较不同产品的本地与托管处理。它们的设置不适用于 Dia。` },
				{ heading: "低风险检查以及何时停止", body: `若某页不得经过 AI 处理，不要把它加入请求。组织如需阻止特定网站使用 AI，可使用 MDM 控制；这与 Dia 对被动处理所做的尽力过滤不同。设置问题可记录 Dia 版本、操作系统，以及是否由管理员管理该控制。Dia 表示不应将其用于涉及受保护健康信息的工作；它不符合 HIPAA 要求，也不提供 Business Associate Agreement。` },
				{ heading: "来源与范围", body: `Dia 的[安全说明](https://www.diabrowser.com/security)和[隐私政策](https://www.diabrowser.com/privacy)于 2026 年 11 月 11 日核查。[一条用户提问](https://www.reddit.com/r/diabrowser/comments/1x2b99j/what_does_dia_send_to_ai-providers-from-sites/)询问网页上下文和 Morning Brief。产品与合同说明均归因于 Dia；BrowserHub 未检查流量或独立审计合同。` }
			],
			faq: [
				{ question: "关闭 Share content data 会停止所有 AI 请求吗？", answer: "不会。Dia 表示改进共享默认开启，这个设置用于退出该用途。网页请求或主动 Morning Brief 仍可能发送相关上下文进行处理。" },
				{ question: "Dia 会把网页内容发给 AI 服务商吗？", answer: "Dia 表示，回答请求时提示和相关网页上下文可能经过 Dia 服务器发送给服务商。服务商限制不代表内容从未被处理。" },
				{ question: "服务商会用请求训练模型吗？", answer: "Dia 表示服务商协议已禁止使用提交数据训练模型。这项合同限制与 Dia 自身默认开启、可单独退出的内容改进共享不同。" },
				{ question: "删除本地历史会立即清除已共享内容吗？", answer: "不要这样推断。Dia 表示改进共享内容保留 30 天；本地历史删除是另一项控制。" },
				{ question: "Dia Sync 等同于私密 AI 处理吗？", answer: "不等同。Dia 将 Sync 描述为端到端加密，这一说法针对同步，不代表所有 AI 推理或服务商请求。" }
			]
		}
	},
	"firefox-ios-reader-ai-summary-controls": {
		en: {
			title: "Firefox on iPhone: Keep Reader Mode, Turn Off Summary Gestures",
			description: "Use Firefox for iOS settings to disable shake-triggered summaries or all page summaries, while preserving Reader View and manual controls.",
			category: "AI browser guides",
			content: "Firefox for iOS page summaries can be opened manually or triggered by shaking the iPhone. If a summary appears accidentally, you can turn off Shake to Summarize while keeping the manual action, or turn off Summarize Pages to disable the feature. Mozilla says summaries require Reader View and are rolling out progressively. Device, operating-system, daily-use, and language details matter, so check Mozilla's current instructions and the controls in your installed version.",
			sections: [
				{ heading: "Choose whether to disable one trigger or all summaries", body: `If the problem is an unexpected summary after moving the phone, start by disabling the shake trigger. Mozilla's iOS help page lists Settings > Page Summaries and a separate Shake to Summarize control. Turning off the gesture leaves a manual route available. If you do not want Firefox to create page summaries at all, turn off Summarize Pages; Mozilla says that disables all summary actions. These choices are different, so decide whether the unwanted behavior is the gesture or the feature itself.

The settings name may vary slightly by release or rollout. Open Firefox settings and look for Page Summaries instead of relying on an older screenshot. Try one short, non-sensitive Reader View page after changing a control, then confirm whether the manual entry and shake action behave as expected. Do not use a private or logged-in page to test a summary feature.` },
				{ heading: "Turn off the accidental shake action", body: `Mozilla documents a shake-to-summarize gesture on iOS. To stop accidental activation without removing summaries entirely, open Firefox Settings, choose Page Summaries, and switch off Shake to Summarize. Leave Summarize Pages on if you still want to request a summary manually. If you want no page summaries, use the main Summarize Pages control instead. Make one change at a time so it is clear which behavior changed.

If the toggle is missing, check Mozilla's current iOS help page for the available settings and rollout state.` },
				{ heading: "Keep Reader View while controlling AI summaries", body: `Page summaries depend on a page that Firefox can display in Reader View. To keep distraction-reduced reading without summaries, leave Reader View available and disable the summary trigger you do not want. Mozilla says tapping the page-with-thunderbolt icon creates a summary, while touching and holding that same icon opens Reader View. Reader View is a reading layout, while a summary is generated content. Turning off summaries does not mean Reader View itself must be disabled.

If Summarize Page does not appear, first check whether Firefox offers Reader View for that article. Mozilla documents Reader View as a requirement for page summaries, so test the feature only on a page where that control is available.` },
				{ heading: "Check device path, limits, and rollout", body: `Mozilla's current page distinguishes two processing paths. On an iPhone 15 Pro or later with iOS 26 or later, it describes Apple Intelligence processing on device. On other eligible devices, it describes a Mozilla-hosted Mistral Small 3.1 path. Mozilla lists a 3,000-word limit for the Apple Intelligence path, a 5,000-word limit for the other path, and up to five summaries per day. It also says feature availability is a progressive rollout and Remote Improvements must be enabled. Check the current help page because eligibility and availability can change.

The help page currently lists seven content languages in its feature description, while its FAQ still says summaries are English-only. That is an inconsistency in Mozilla's own page; do not promise a language beyond what your installed version accepts. Mozilla's [AI controls help](https://support.mozilla.org/en-US/kb/ios-ai-controls) describes the on-device and Mozilla-hosted paths and says personal browsing data is not used to train AI models. The [Firefox Privacy Notice](https://www.mozilla.org/en-US/privacy/firefox/) explains that requested summaries are created on-device on compatible systems; otherwise page content goes to a Mozilla server and the notice says it does not store the content or resulting summary. These statements apply to the summary request, not every Firefox data flow. For the required rollout setting, [Remote Improvements help](https://support.mozilla.org/en-US/kb/remote-improvements) gives the iOS path and explains that disabling it stops remote fixes and progressive feature rollouts, while regular updates continue. If a page exceeds the stated limit or a language is not handled as expected, use Reader View without a summary or check Mozilla's current support instructions.` },
				{ heading: "Find the manual summary controls", body: `Mozilla documents three routes: tap the page-with-thunderbolt icon to create a summary, choose Summarize Page in the three-dot menu, or shake the iPhone if that gesture is enabled. Touch and hold the same icon to open Reader View. Start with these steps:

- Open a page that offers Reader View.
- Tap the page-with-thunderbolt icon or open the three-dot menu and choose Summarize Page.
- To open Reader View instead, touch and hold the icon.
- To stop the shake gesture, turn off Shake to Summarize in Settings > Page Summaries. If you want summaries but no gesture, leave the main feature enabled and disable Shake to Summarize. 

If you want to remove every summary route, disable Summarize Pages. Record the Firefox version, iOS version, device model, whether Remote Improvements is enabled, and whether Reader View is available. These facts help distinguish unsupported content, rollout status, and a settings issue.` },
				{ heading: "A short decision table", body: `| What you want | Setting to check | Expected effect in Mozilla's guide |
| --- | --- | --- |
| Stop accidental summaries after movement | Settings > Page Summaries > Shake to Summarize off | Manual summary entry can remain available |
| Disable summaries everywhere | Summarize Pages off | Mozilla says all summary actions are disabled |
| Read a compatible page without a summary | Use Reader View; disable the unwanted trigger | Reader layout and summary generation are separate |
| No summary button on one page | Check whether Reader View is offered | The page may not be compatible with summaries |
| Feature or language not available | Check rollout, device path, and current help text | Mozilla's support page contains conflicting language statements |

Mozilla's Help Center is the source for these paths. Older launch coverage may describe an earlier release, so use it for background only. BrowserHub checked the current help page on November 11, 2026 and did not test a personal Firefox installation.` },
				{ heading: "Sources and scope", body: `Mozilla's [current iOS instructions](https://support.mozilla.org/en-US/kb/summarize-pages-ios) document Reader View, settings, device paths, limits, and rollout. The page lists seven languages in its feature description but says English-only in its FAQ. See the [desktop Firefox AI controls guide](/en/guides/firefox-ai-controls-chatbot-provider-boundary/), which covers a different surface. Checked November 11, 2026; no iPhone was tested.` }
			],
			faq: [
				{ question: "Can I stop shake summaries but keep manual summaries?", answer: "Yes. Mozilla documents a separate Shake to Summarize setting. Turn it off while leaving Summarize Pages enabled." },
				{ question: "How do I disable all Firefox page summaries?", answer: "Mozilla's iOS instructions say to turn off Summarize Pages in Settings > Page Summaries. It disables summary actions." },
				{ question: "Will Reader View stop working if summaries are off?", answer: "Mozilla documents Reader View as a page-reading mode and a requirement for summaries. Turning summaries off does not mean Reader View itself must be disabled." },
				{ question: "Why is there no Summarize Page option?", answer: "Check whether Firefox offers Reader View for that page and whether the feature has rolled out to your version. Not every page is compatible." },
				{ question: "Which languages does Firefox support?", answer: "Mozilla's current page is inconsistent: the feature description lists seven languages, while its FAQ says English-only. Check the current app behavior and do not assume broader support." }
			]
		},
		"zh-cn": {
			title: "iPhone 版 Firefox：保留阅读模式并关闭摘要手势",
			description: "通过 Firefox iOS 设置关闭摇动触发的摘要，或关闭全部页面摘要，同时保留阅读视图和手动入口。",
			category: "AI 浏览器指南",
			content: "Firefox for iOS 的页面摘要既可以手动打开，也可能由摇动 iPhone 触发。如果摘要意外弹出，可以关闭 Shake to Summarize，同时保留手动入口；也可以关闭 Summarize Pages 来停用所有摘要。Mozilla 表示摘要要求页面支持 Reader View，并正在逐步开放。设备、系统、每日次数和语言都会影响可用性，应核对当前说明和已安装版本中的控制项。",
			sections: [
				{ heading: "先选关闭一个触发方式还是全部摘要", body: `如果问题是手机移动后意外出现摘要，先关闭摇动触发。Mozilla 的 iOS 帮助页列出 Settings > Page Summaries，并提供单独的 Shake to Summarize 开关。关闭手势后仍可手动发起摘要。如果完全不希望 Firefox 生成页面摘要，关闭 Summarize Pages；Mozilla 说这会停用所有摘要操作。两个选择不同，先判断你想停掉的是误触手势还是整个功能。

设置名称可能随版本或灰度略有变化。打开 Firefox 设置，查找 Page Summaries，不要只依赖旧截图。修改后用一篇简短、无敏感信息且支持 Reader View 的网页测试，再确认手动入口和摇动触发是否符合预期。不要用私人或登录后的页面测试摘要。` },
				{ heading: "关闭意外触发的摇动操作", body: `Mozilla 说明 iOS 上有摇动触发页面摘要的手势。若希望避免误触但保留摘要功能，可打开 Firefox 设置，进入 Page Summaries，关闭 Shake to Summarize。如果还要手动总结，保持 Summarize Pages 开启；如果不希望任何摘要入口可用，则改为关闭主 Summarize Pages 开关。一次只改一个选项，便于判断效果。

若找不到开关，查看 Mozilla 当前 iOS 帮助页确认设置位置和逐步开放状态。` },
				{ heading: "关闭摘要时仍可使用阅读视图", body: `页面摘要依赖 Firefox 能以 Reader View 显示该网页。若想保留简洁阅读，但不要摘要，可以继续使用阅读视图，同时关闭不需要的摘要触发方式。Mozilla 说明轻点带闪电的页面图标可生成摘要，触摸并按住同一图标可打开 Reader View。阅读视图是阅读布局，摘要则是生成内容。关闭摘要不等于必须关闭阅读视图。

如果没有 Summarize Page，先检查 Firefox 是否为该文章提供 Reader View。Mozilla 将 Reader View 列为页面摘要的前提，因此只在提供该入口的页面上测试摘要。` },
				{ heading: "核对设备路径、限制和灰度", body: `Mozilla 当前帮助页区分两种处理路径。iPhone 15 Pro 或更新机型搭配 iOS 26 或更新版本时，说明使用设备上的 Apple Intelligence。其他符合条件的设备则说明使用 Mozilla 托管的 Mistral Small 3.1。Mozilla 列出前一路径 3,000 词限制、另一路径 5,000 词限制，以及每天最多五次。页面还称功能逐步开放，并要求启用 Remote Improvements。资格和可用性可能变化，应查看当前帮助页。

当前帮助页正文列出了七种内容语言，但常见问题仍写着仅支持英文。这是 Mozilla 自己页面中的信息不一致；不要承诺当前版本没有确认支持的语言。Mozilla 的[iOS AI 控制说明](https://support.mozilla.org/en-US/kb/ios-ai-controls)介绍设备端与 Mozilla 托管处理路径，并称不会使用个人浏览数据训练 AI。[Firefox 隐私声明](https://www.mozilla.org/en-US/privacy/firefox/)说明，兼容设备会在本机生成所请求的摘要；其他情况下，页面内容会发送到 Mozilla 服务器，声明称不会保存页面内容或生成的摘要。这些说明针对摘要请求，不代表 Firefox 的所有数据流。[Remote Improvements 帮助页](https://support.mozilla.org/en-US/kb/remote-improvements)列出 iOS 设置路径，并说明关闭后会停止远程修复和渐进式功能开放，但常规更新仍会继续。若页面超过所列字数限制或语言处理不符合预期，可仅使用 Reader View，或查看 Mozilla 当前支持说明。` },
				{ heading: "查找手动摘要入口", body: `Mozilla 说明了三个入口：轻点带闪电的页面图标生成摘要，在三点菜单选择 Summarize Page，或在开启手势时摇动 iPhone。触摸并按住同一图标可打开 Reader View。可按以下步骤检查：

- 打开支持 Reader View 的网页。
- 轻点带闪电的页面图标，或打开三点菜单并选择 Summarize Page。
- 若要进入 Reader View，触摸并按住该图标。
- 若要关闭摇动手势，在 Settings > Page Summaries 中关闭 Shake to Summarize。

如果希望保留摘要但避免误触，保持主功能开启并关闭 Shake to Summarize。

如果要移除所有摘要入口，关闭 Summarize Pages。记录 Firefox 版本、iOS 版本、设备机型、Remote Improvements 状态和页面是否提供 Reader View。这些信息可以帮助区分页面不兼容、功能未开放和设置问题。` },
				{ heading: "对照表", body: `| 你的目标 | 要检查的设置 | Mozilla 文档中的预期效果 |
| --- | --- | --- |
| 避免移动时意外生成摘要 | Settings > Page Summaries > 关闭 Shake to Summarize | 仍可保留手动摘要入口 |
| 关闭所有 Firefox 页面摘要 | 关闭 Summarize Pages | Mozilla 表示会停用全部摘要操作 |
| 阅读兼容网页但不生成摘要 | 使用 Reader View，关闭不需要的触发方式 | 阅读布局和摘要生成是两项功能 |
| 某页没有摘要按钮 | 检查该页是否提供 Reader View | 页面可能不兼容摘要功能 |
| 功能或语言不可用 | 核对灰度、设备路径和当前帮助文字 | Mozilla 支持页的语言说明存在冲突 |

以 Mozilla 帮助中心作为设置路径的主要依据。旧版发布报道可作背景参考，但可能描述早期界面。BrowserHub 于 2026 年 11 月 11 日核对当前帮助页，没有使用个人 Firefox 安装进行测试。` },
				{ heading: "来源与范围", body: `Mozilla 的[当前 iOS 说明](https://support.mozilla.org/en-US/kb/summarize-pages-ios)介绍 Reader View、设置、设备路径、限制和灰度。正文列出七种语言，常见问题却称仅支持英文。[桌面 Firefox AI 控制指南](/zh-cn/guides/firefox-ai-controls-chatbot-provider-boundary/)讲的是另一入口。核查日期为 2026 年 11 月 11 日，未使用 iPhone 测试。` }
			],
			faq: [
				{ question: "能关闭摇动摘要但保留手动摘要吗？", answer: "可以。Mozilla 说明 Shake to Summarize 是单独设置。关闭它并保持 Summarize Pages 开启即可。" },
				{ question: "如何关闭 Firefox 的所有页面摘要？", answer: "Mozilla 的 iOS 说明称，在 Settings > Page Summaries 中关闭 Summarize Pages，会停用摘要操作。" },
				{ question: "关闭摘要后 Reader View 还可用吗？", answer: "Mozilla 将 Reader View 作为阅读模式，并把它列为摘要要求。关闭摘要不代表必须停用阅读视图。" },
				{ question: "为什么看不到 Summarize Page？", answer: "检查该页是否支持 Reader View，以及功能是否已开放到你的版本。并非所有页面都兼容。" },
				{ question: "Firefox 摘要支持哪些语言？", answer: "Mozilla 当前页面存在不一致：功能说明列出七种语言，常见问题却写着仅支持英文。应检查当前应用行为，不要假定支持范围更广。" }
			]
		}
	},
	"genspark-chrome-extension-page-task-boundary": {
		en: {
			title: "Genspark Chrome Extension or Browser: Choose by the Current Page Task",
			description: "Compare the extension's current-page context and browser automation with a separate Genspark Browser workflow, including credit use and the limits of vendor privacy claims.",
			category: "AI browser guides",
			content: "Genspark's Chrome extension works inside Chrome and can use the current page for analysis and browser automation. Installing it is free, but using the extension consumes credits subject to the allowance on your current account. Genspark's help page says the extension reads the active page when used and does not transmit browsing data in the background. The standalone Genspark Browser is a separate browser environment. Choose based on whether the task needs the current Chrome page and session, or a separate browser workspace; do not assume their controls and history are identical.",
			sections: [
				{ heading: "Use the extension when the current Chrome page matters", body: `The extension is the relevant option when you want help with a page already open in Chrome. Genspark documents page analysis and browser automation, including interacting with page elements. The extension guide describes a sidebar that uses the current page when actively invoked. This can keep the task close to the tab and Chrome session you are already using. It does not make every site compatible, and the guide does not guarantee that every action can be performed without a confirmation or a site-specific limitation.

Use the extension in a dedicated Chrome profile if you want to keep its access separate. Start with the setup shown in Genspark's help:

- Install the official extension from Genspark Help's Chrome Web Store installation instructions.
- Select its toolbar icon and open the sidebar.
- Confirm the sidebar identifies the page you intended to use.
- Ask one read-only question and compare the answer with the page.
- Review the permission prompt before connecting a work account.

Verify the title and a small detail before asking for a click or form action. For any consequential change, inspect the target and final values yourself.` },
				{ heading: "Choose the standalone browser for a separate workspace", body: `Genspark Browser is a distinct browser product, not simply another name for the Chrome extension. It may be the better fit when you want a dedicated browsing environment for research or agent work rather than using an existing Chrome tab. Separate browser state can also mean separate sign-ins, history, and site permissions. Do not assume it imports Chrome cookies, extensions, bookmarks, or open tabs unless current Genspark documentation explicitly confirms the exact item.

For a quick decision: use the extension if the task begins from a specific open Chrome page and the current Chrome profile is appropriate. Consider the standalone browser if you want a separate workspace and are prepared to sign in and configure it separately. If the task requires an existing authenticated session, verify which browser owns that session before starting. Neither product choice is a reason to copy passwords or browser profile files into a prompt.` },
				{ heading: "Know what the extension help says about page data", body: `Genspark's extension help says it only accesses the current page when actively used and does not transmit browsing data in the background. Treat this as a statement from Genspark about its extension, not an independently verified guarantee. It is scoped to the extension's description; do not apply it automatically to the standalone browser, other Genspark features, or every provider involved in processing a prompt. Read the current privacy policy and Chrome permission prompt for the product and account you plan to use.

The extension's sidebar history is retained during the session according to the help page. Longer-term retention is referred to the Genspark Privacy Policy. A session list is not the same as Chrome browsing history, and it is not evidence that page content is never processed. If the data boundary matters, avoid submitting sensitive pages until the current policy covers that exact feature. For local versus hosted processing boundaries in other products, see the [Brave model guide](/en/guides/brave-leo-byom-local-vs-hosted/). The [browser-agent takeover guide](/en/guides/browser-agent-human-takeover/) covers human handoff and pause-resume patterns.` },
				{ heading: "Budget credits before starting a multi-step task", body: `Genspark says extension installation is free, while extension use consumes credits under the current account allowance. Before a task with repeated page reads or browser automation, click Credits at the bottom left to open /credit-usage and check the balance and usage history. Billing settings cover the plan and payment method, not the usage log. Genspark says usage records may take hours to appear, so a delayed entry does not immediately establish that no credits were used. The extension consumes credits under the allowance on your current account; do not estimate a fixed cost per page.

Start with one bounded page check, confirm the output and account usage, then decide whether to continue. If the extension repeats work or the balance is unclear, stop and review the usage page before asking it to continue.` },
				{ heading: "Compare the two paths", body: `| Task need | Chrome extension | Genspark Browser |
| --- | --- | --- |
| Start from a page already open in Chrome | Designed for current-page use | May require opening the page in the separate browser |
| Use Chrome's existing profile | Runs as a Chrome extension; check profile and permissions | Do not assume Chrome sign-ins transfer |
| Analyze a page or automate controls | Genspark documents both for the extension | Check current Browser help for the feature you need |
| Keep browsing activity separate | Shares the selected Chrome context and permissions | Provides a separate browser environment |
| Track usage | Genspark says extension use consumes credits | Check the current plan and account balance |

This is a product-surface comparison based on current help pages, not a feature parity claim. The extension help broadly compares capabilities with Genspark Browser but does not prove every feature, plan, website, or operating system behaves identically. Verify a specific requirement such as downloads, persistent logins, or automation before relying on it.` },
				{ heading: "Use a safe first task and recover carefully", body: `Choose a public page with no personal information. In Chrome, open the intended profile, activate the official Genspark extension, and check which current page the sidebar identifies. Ask for a short read-only answer and compare it with the source. Only then try a low-impact browser action, if needed, and verify the result before continuing. BrowserHub did not install the extension, run a task, or inspect network traffic, so this procedure is a suggested check rather than a claim of firsthand product testing.

If the extension cannot see the page, check that you are in the Chrome profile where it is installed, that Chrome granted the displayed site access, and that the current tab is supported. If the sidebar shows no history after a session ends, consult Genspark's privacy and retention details rather than treating session history as a permanent log. If an action may have completed before an error, inspect the destination page before retrying. Do not repeat a purchase, submission, or destructive action until its result is clear.` },
				{ heading: "Sources and scope", body: `Genspark's [Chrome extension help](https://www.genspark.ai/helpcenter/chrome-extension), [credits guide](https://www.genspark.ai/helpcenter/credits-guide), and [Privacy Policy](https://www.genspark.ai/privacy) were checked November 11, 2026. The help page's data-access description is a Genspark statement, not an independent audit. BrowserHub did not connect an account or test the extension.` }
			],
			faq: [
				{ question: "Is Genspark's Chrome extension free?", answer: "Genspark says installation is free, while extension use consumes credits under the current account allowance. Check your balance before a longer task." },
				{ question: "Can the extension automate browser actions?", answer: "Yes. Genspark's extension help documents browser automation as well as current-page analysis. Check the prompt and verify consequential actions yourself." },
				{ question: "Does the extension read every Chrome page in the background?", answer: "Genspark says the extension reads the current page when actively used and does not transmit browsing data in the background. This is a vendor statement, not an independent audit." },
				{ question: "Does Genspark Browser share my Chrome login?", answer: "Do not assume so. It is a separate browser environment; verify sign-ins and site permissions there before starting a task." },
				{ question: "Does the extension keep a permanent history?", answer: "Genspark says sidebar history is kept during the session and refers longer-term retention to its Privacy Policy. Check the current policy for details." }
			]
		},
		"zh-cn": {
			title: "Genspark Chrome 扩展还是独立浏览器：按当前页面任务选择",
			description: "比较扩展的当前网页上下文和浏览器自动化与独立 Genspark Browser，并核对积分消耗和厂商隐私说明的边界。",
			category: "AI 浏览器指南",
			content: "Genspark Chrome 扩展运行在 Chrome 中，可以分析当前网页并执行浏览器自动化。安装免费，但使用扩展会按当前账号的额度消耗积分。Genspark 帮助页称，扩展仅在用户主动使用时读取当前网页，不会在后台传输浏览数据。独立 Genspark Browser 是另一个浏览器环境。选择时看任务是否需要当前 Chrome 网页和会话，还是独立工作区；不要认为两者的控制项和历史完全相同。",
			sections: [
				{ heading: "需要当前 Chrome 页面时使用扩展", body: `如果希望基于 Chrome 中已经打开的网页获得帮助，扩展是相关选项。Genspark 文档介绍了页面分析和浏览器自动化，包括与网页元素交互。扩展帮助页说明侧边栏会在主动使用时读取当前页面。任务可以从你当前所在的标签开始，但不代表所有网站都兼容，也不保证每项操作都无需确认或不受网站限制。

若想隔离扩展访问，可使用单独的 Chrome 配置文件。按 Genspark 帮助页开始：

- 按 Genspark 帮助页的 Chrome Web Store 安装说明安装官方扩展。
- 选择工具栏扩展图标并打开侧边栏。
- 确认侧边栏识别的是目标页面。
- 提出一个只读问题，并把回答与网页核对。
- 连接工作账号前，检查权限提示。

核对标题和一条细节后，再考虑点击或填写表单。任何重要变更都应自行检查目标和最终值。` },
				{ heading: "需要独立工作区时考虑 Genspark Browser", body: `Genspark Browser 是单独的浏览器产品，不是 Chrome 扩展的另一个名字。如果研究或 Agent 任务需要专用浏览环境，而不是已有 Chrome 标签，可以考虑它。独立浏览器也可能意味着独立登录、历史和网站权限。除非 Genspark 当前文档明确确认具体项目，不要假设它会导入 Chrome Cookie、扩展、书签或打开的标签。

快速判断：任务从一个已打开的 Chrome 页面开始，且当前配置文件合适时，可检查扩展；想要隔离的工作区且能接受单独登录和设置时，可考虑独立浏览器。如果任务依赖已有登录会话，先确认该会话属于哪个浏览器。无论选择哪个产品，都不要把密码或浏览器配置文件复制到提示中。` },
				{ heading: "理解扩展帮助页对页面数据的描述", body: `Genspark 扩展帮助页称，扩展只在主动使用时访问当前页面，不会在后台传输浏览数据。应将其标记为 Genspark 对扩展的说明，而不是独立验证的保证。它的适用范围是扩展描述；不要自动推广到独立浏览器、其他 Genspark 功能或提示处理中的所有服务商。查看准备使用的具体产品、账号对应的当前隐私政策和 Chrome 权限提示。

帮助页称扩展侧边栏历史会在本次会话期间保留。更长期的数据保留则指向 Genspark 隐私政策。会话内的侧边栏记录不等于 Chrome 浏览历史，也不能证明页面内容从未经过处理。如果数据边界很重要，在当前政策没有说明对应功能之前，不要提交敏感页面。其他产品的本地与托管处理边界见 [Brave 模型指南](/zh-cn/guides/brave-leo-byom-local-vs-hosted/)。[浏览器智能体接管指南](/zh-cn/guides/browser-agent-human-takeover/)介绍人工接管及暂停后恢复的设计。` },
				{ heading: "开始多步骤任务前核对积分", body: `Genspark 表示扩展免费安装，扩展使用会按当前账号额度消耗积分。对于反复读取网页或自动操作的任务，先点击左下角的 Credits 打开 /credit-usage，查看余额和使用记录。Billing 设置用于套餐和支付方式，不是用量日志。Genspark 称记录可能延迟数小时；页面暂时没有新记录，不代表没有消耗积分。可用额度取决于当前账号，不要估算固定的单页成本。

先做一个范围小的页面检查，核对结果和账号用量，再决定是否继续。扩展重复工作或余额不清楚时，先暂停并查看用量页。` },
				{ heading: "对比两条产品路径", body: `| 任务需求 | Chrome 扩展 | Genspark Browser |
| --- | --- | --- |
| 从 Chrome 已打开的网页开始 | 面向当前页面使用 | 可能需在独立浏览器中重新打开网页 |
| 使用 Chrome 当前配置文件 | 作为扩展运行，需检查配置文件和权限 | 不要假设 Chrome 登录状态会转移 |
| 分析页面或自动操作 | Genspark 文档说明两项能力 | 应检查当前 Browser 文档是否支持所需功能 |
| 与日常浏览隔离 | 使用所选 Chrome 上下文和权限 | 提供单独浏览器环境 |
| 查看用量 | Genspark 表示扩展使用消耗积分 | 核对当前套餐和账号余额 |

这是依据当前帮助页对产品入口的比较，不是功能完全相同的承诺。扩展帮助页概括比较两款产品，但不能证明每项功能、套餐、网站和操作系统行为完全一致。依赖下载、持久登录或自动化等具体能力前，应逐项核实。` },
				{ heading: "安全地开始并谨慎恢复", body: `选一篇不含个人信息的公开网页。在 Chrome 的目标配置文件中打开官方 Genspark 扩展，确认侧边栏识别的是当前页面。先提出简短只读请求并对照来源，再尝试低影响的浏览器操作；每一步都先核对结果。BrowserHub 没有安装扩展、运行任务或检查网络流量，以上是建议的自查步骤，并非亲自测试结论。

如果扩展看不到页面，检查扩展是否安装在当前 Chrome 配置文件、Chrome 是否授予当前网站显示的访问权限，以及标签页是否受支持。如果会话结束后侧边栏不再显示历史，应查看 Genspark 隐私和保留说明，不要把会话历史误当作永久日志。错误发生前若某项操作可能已完成，先检查目标网页再重试。结果未明时，不要重复购买、提交或执行破坏性操作。` },
				{ heading: "来源与范围", body: `Genspark 的[Chrome 扩展帮助](https://www.genspark.ai/helpcenter/chrome-extension)、[积分指南](https://www.genspark.ai/helpcenter/credits-guide)和[隐私政策](https://www.genspark.ai/privacy)于 2026 年 11 月 11 日核查。帮助页的数据访问说明是 Genspark 的表述，不是独立审计。BrowserHub 未连接账号或测试该扩展。` }
			],
			faq: [
				{ question: "Genspark Chrome 扩展免费吗？", answer: "Genspark 表示扩展免费安装，使用扩展会按当前账号额度消耗积分。较长任务前应检查余额。" },
				{ question: "扩展能执行浏览器操作吗？", answer: "可以。Genspark 扩展帮助页介绍了浏览器自动化和当前页面分析。重要操作仍应由人检查确认。" },
				{ question: "扩展会在后台读取每个 Chrome 网页吗？", answer: "Genspark 称扩展只在主动使用时读取当前页面，不会在后台传输浏览数据。这是厂商说明，不是独立审计。" },
				{ question: "Genspark Browser 会沿用我的 Chrome 登录吗？", answer: "不要假设会。它是独立浏览器环境，应在开始任务前核对其中的登录状态和网站权限。" },
				{ question: "扩展会永久保留历史吗？", answer: "Genspark 称侧边栏历史会在本次会话期间保留，长期保留问题指向隐私政策。应查看当前政策。" }
			]
		}
	},
	"safari-iphone-webpage-summary": {
		en: {
			title: "Summarize the Safari Page Open on Your iPhone",
			description: "Use Safari's current Page Menu action, then check website support, iPhone and iOS eligibility, language, region, and usage limits if Summarize is missing.",
			category: "AI browser guides",
			content: "On a supported iPhone, Safari can summarize the webpage that is open: tap the Page Menu, then tap Summarize. Apple says the control appears only when the website supports it. If it is absent, check the current page, device, iOS version, language, and region before troubleshooting. A Siri request for a URL follows a separate workflow.",
			sections: [
				{ heading: "Summarize the page currently open in Safari", body: `Open the article or other webpage in Safari, tap the Page Menu in the address field, and choose Summarize. Apple's current iPhone guide says this option is shown only for websites that support summarization. It summarizes the webpage being viewed; it is not a general command to summarize any link pasted into Siri or a chat. If you want a different page summarized, open that page in Safari first and then use its Page Menu.

Apple also documents summarization in Writing Tools, which is a separate surface for selected text and supported text fields. Use Safari's Page Menu when the request is to summarize the open webpage. Use Writing Tools only when the text is available in a supported text editing context. If you cannot find Page Menu, open Apple's guide for your installed iOS version and follow the matching interface instructions.` },
				{ heading: "Check eligibility before troubleshooting a missing option", body: `Apple's current iOS 27 guide lists Apple Intelligence availability on iPhone 15 Pro and iPhone 15 Pro Max, and iPhone 16 models or later. It says language and region must be supported and usage limits may apply. The Safari menu item also appears only if the website supports it. These are separate gates: an eligible iPhone cannot force an unsupported page to provide a summary, and a compatible page does not make an ineligible device eligible.

Check the model and iOS version in Settings > General > About. Then verify the Apple Intelligence language and region requirements in [Apple's current availability guide](https://support.apple.com/en-us/121115). The device and Siri language must match a supported language; when you change Siri language, wait for its download to finish. Apple says Apple Intelligence is automatically available on eligible updated devices. Do not infer Siri AI beta eligibility from Safari summary support.` },
				{ heading: "Use a supported article as a page check", body: `If Summarize is missing, confirm the exact iPhone model and iOS version first. Apple's current iPhone guide documents Page Menu > Summarize; use the version selector for the iOS installed on your device, since earlier versions can have different instructions. The menu item only appears when the site supports summarization. If an ordinary article supports the action but another page does not, use the supported page for a basic check. If it is absent across sites, verify the Apple Intelligence device and language requirements before contacting Apple Support.` },
				{ heading: "Keep the URL request separate from Safari summarization", body: `A request such as asking Siri to summarize a URL follows a different route from tapping Summarize on the page open in Safari. Apple's page-summarization instructions describe the current webpage and Page Menu. If you want a summary of a linked article, open the link in Safari, confirm the destination, and use its Page Menu. For Siri behavior, consult Siri's separate current instructions. For another reading task, see the [webpage translation guide](/en/guides/ai-browser-webpage-translation/). Compare the result with the original before relying on details.` },
				{ heading: "A quick decision table", body: `| What you see or want | Next check | Meaning |
| --- | --- | --- |
| Summarize appears in Page Menu | Tap it on the open page | Safari is offering its webpage-summary action there |
| Summarize is missing on one site | Try a normal article and confirm Page Menu | Apple says the website must support summarization |
| Missing across sites | Confirm iPhone model, iOS, language, and region | Device and Apple Intelligence eligibility may block the feature |
| Want Writing Tools to summarize selected text | Select text in a supported editing surface | Writing Tools is separate from Safari's webpage command |
| Want Siri to summarize a typed URL | Check Siri's current support separately | A Siri URL request is not the Safari Page Menu workflow |

Change one variable at a time. For example, compare two public articles on the same eligible phone before changing account or system settings. Do not reset the device or change several language and region settings because one website lacks the menu option.` },
				{ heading: "What to record if the action remains unavailable", body: `If the option is missing on ordinary articles after checking the listed eligibility, note the iPhone model, iOS version, Apple Intelligence language and region, the website, and whether the Page Menu appears for another site. Do not include private page content in a public support request. These details help distinguish an unsupported website from a device, setup, rollout, or account issue. BrowserHub checked Apple's public guide on November 11, 2026; we did not test an iPhone or Apple account.

Use Apple's guide for the current Page Menu path and eligibility. If labels or requirements change, open the guide for your installed iOS version.` },
				{ heading: "Sources and scope", body: `Apple's [current iPhone guide](https://support.apple.com/guide/iphone/browse-the-web-iph1fbef4daa/ios) documents Page Menu > Summarize and the site, device, language, region, and usage conditions. Apple's [availability guide](https://support.apple.com/en-us/121115) covers device and language eligibility. The [iOS 27 Writing Tools guide](https://support.apple.com/guide/iphone/writing-tools-write-improve-summarize-iph6f08da1d2/27/ios/27) describes the separate Writing Tools surface. Checked November 11, 2026; no iPhone was tested.` }
			],
			faq: [
				{ question: "How do I summarize the webpage open in Safari on iPhone?", answer: "Tap the Page Menu in Safari, then tap Summarize. Apple says it appears only when the website supports the action." },
				{ question: "Why is Summarize missing from Safari?", answer: "Check that the website supports it, then verify your iPhone model, iOS version, Apple Intelligence language, and region against Apple's current requirements." },
				{ question: "Can Siri summarize any URL I say aloud?", answer: "That is a separate Siri request. Apple's Safari instructions apply to the webpage currently open in Safari and its Page Menu." },
				{ question: "Is Safari Summarize the same as Writing Tools?", answer: "No. Apple documents Writing Tools as a separate text surface. Use Page Menu > Summarize for the open webpage." },
				{ question: "Does every eligible iPhone show Summarize on every site?", answer: "No. Apple says device and language eligibility apply, and the menu item appears only if the website supports summarization." }
			]
		},
		"zh-cn": {
			title: "在 iPhone Safari 中总结当前打开的网页",
			description: "使用 Safari 当前的 Page Menu 操作；若 Summarize 缺失，检查网站支持、iPhone 和 iOS 资格、语言、地区及使用限制。",
			category: "AI 浏览器指南",
			content: "在受支持的 iPhone 上，Safari 可以总结当前打开的网页：轻点 Page Menu，再轻点 Summarize。Apple 表示，只有网站支持时才会出现该选项。若看不到，先检查当前页面、设备、iOS 版本、语言和地区，再继续排查。本文依据 Apple 当前说明介绍 Safari 当前网页的摘要操作。",
			sections: [
				{ heading: "总结 Safari 当前打开的页面", body: `在 Safari 打开文章或其他网页，轻点地址栏中的 Page Menu，再选择 Summarize。Apple 当前 iPhone 指南称，只有网站支持总结时才会显示此项。它总结的是 Safari 当前显示的网页。如果要总结另一页，先在 Safari 打开那一页，再使用该页的 Page Menu。

Apple 还说明 Writing Tools 可总结支持的文本，这是另一个入口。总结打开的网页应使用 Safari Page Menu；在支持的编辑区域总结所选文字时才使用 Writing Tools。若找不到 Page Menu，应打开与已安装 iOS 版本对应的 Apple 指南，并按当前界面步骤操作。` },
				{ heading: "看不到选项时先核对设备资格", body: `Apple 当前 iOS 27 指南列出 iPhone 15 Pro、iPhone 15 Pro Max 和 iPhone 16 系列或更新机型可使用 Apple Intelligence。它还要求语言和地区受支持，并说明可能存在使用限制。Safari 菜单项另要求网站支持。这些条件分别生效：符合资格的手机无法强迫不支持的网站提供摘要；兼容网页也不会让不符合资格的设备获得功能。

在 Settings > General > About 检查机型和 iOS 版本，再查看 [Apple 当前可用性指南](https://support.apple.com/en-us/121115)。设备与 Siri 语言必须匹配受支持语言；更改 Siri 语言后，应等待下载完成。Apple 称，符合条件且已更新的设备会自动获得 Apple Intelligence。不要根据 Siri AI beta 的资格推断 Safari 摘要支持。` },
				{ heading: "用受支持的文章检查页面", body: `Summarize 缺失时，先确认 iPhone 机型和 iOS 版本。Apple 当前 iPhone 指南介绍 Page Menu > Summarize；使用版本选择器选择设备上安装的 iOS，因为较早版本的操作说明可能不同。只有网站支持时才显示菜单项。若普通文章支持而另一页面不支持，可用支持的页面做基本检查。如果所有网页都没有选项，再核对 Apple Intelligence 设备和语言条件，然后联系 Apple 支持。` },
				{ heading: "把 URL 请求与 Safari 摘要分开", body: `Safari 指南针对 Safari 当前打开的网页，不是让 Siri 总结 URL 的指令。要总结链接指向的文章，在 Safari 打开链接并确认目标网页，再使用 Page Menu。Siri 行为应按 Siri 自己的当前说明核对。Safari 只能总结它显示且网站支持的页面；依赖摘要细节前，应与原文核对。相关网页阅读任务见[网页翻译指南](/zh-cn/guides/ai-browser-webpage-translation/)。` },
				{ heading: "快速对照表", body: `| 看到的情况或目标 | 下一步检查 | 含义 |
| --- | --- | --- |
| Page Menu 中有 Summarize | 在当前页面轻点它 | Safari 正在为该页提供网页摘要操作 |
| 某网站没有 Summarize | 试一篇普通文章并确认 Page Menu | Apple 表示网站必须支持该操作 |
| 所有网站都没有选项 | 核对 iPhone、iOS、语言和地区 | 设备或 Apple Intelligence 资格可能限制功能 |
| 想用 Writing Tools 总结选中文字 | 在支持的编辑区域选择文字 | Writing Tools 与 Safari 网页命令不同 |
| 想让 Siri 总结口述的 URL | 单独核对 Siri 当前支持情况 | Siri URL 请求不是 Safari Page Menu 流程 |

一次只调整一个条件。例如先在同一台符合资格的手机上比较两篇公开文章，再改账号或系统设置。不要因为一个网站没有菜单项就重置设备，或同时改动多项语言和地区设置。` },
				{ heading: "仍不可用时记录什么", body: `如果检查资格后，普通文章仍没有该选项，记录 iPhone 机型、iOS 版本、Apple Intelligence 语言和地区、网站，以及 Page Menu 是否在其他网站出现。不要在公开支持请求中加入私密页面内容。这些信息有助区分网站不支持、设备、设置、灰度或账号问题。BrowserHub 于 2026 年 11 月 11 日核对 Apple 公开指南，没有测试 iPhone 或 Apple 账号。

Apple 指南是 Page Menu 路径和使用条件的当前依据。菜单文字或资格变化时，请打开与设备 iOS 版本对应的 Apple 指南。` },
				{ heading: "来源与范围", body: `Apple 的[当前 iPhone 指南](https://support.apple.com/guide/iphone/browse-the-web-iph1fbef4daa/ios)说明 Page Menu > Summarize 及网站、设备、语言、地区和使用条件。[Apple 可用性指南](https://support.apple.com/en-us/121115)涵盖设备和语言资格。[iOS 27 Writing Tools 指南](https://support.apple.com/guide/iphone/writing-tools-write-improve-summarize-iph6f08da1d2/27/ios/27)介绍另一种 Writing Tools 入口。核查日期为 2026 年 11 月 11 日；未测试 iPhone。` }
			],
			faq: [
				{ question: "如何在 iPhone Safari 总结当前网页？", answer: "轻点 Safari 中的 Page Menu，再轻点 Summarize。Apple 表示，只有网站支持该操作时才会出现。" },
				{ question: "为什么 Safari 没有 Summarize？", answer: "先检查网站是否支持，再根据 Apple 当前要求核对 iPhone 机型、iOS 版本、Apple Intelligence 语言和地区。" },
				{ question: "Siri 能总结我口述的任意 URL 吗？", answer: "这是单独的 Siri 请求。Apple 的 Safari 说明针对 Safari 当前打开的网页及其 Page Menu。" },
				{ question: "Safari Summarize 和 Writing Tools 相同吗？", answer: "不同。Apple 将 Writing Tools 说明为单独的文本入口。总结当前网页应使用 Page Menu > Summarize。" },
				{ question: "符合资格的 iPhone 会在所有网站看到 Summarize 吗？", answer: "不会。Apple 还要求设备和语言符合条件，并且只有网站支持总结时才会显示菜单项。" }
			]
		}
	}
};

export const aiCycleTranslations11: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides11: EditorialGuide[] = Object.keys(copies).map((slug) => ({
	...copies[slug]["zh-cn"], slug, date: "2026-11-11", sourcePath: `src/data/ai-cycle-2026-11-11.ts#${slug}`,
	availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
