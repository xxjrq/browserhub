import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
	"ai-browser-task-platform-chooser": [
		{ title: "Individual AI browser selection question", url: "https://www.reddit.com/r/browsers/comments/1nzs7mh/which_browser_do_you_think_has_the_best_ai/" },
		{ title: "Google Chrome Help: Gemini in Chrome and Auto Browse", url: "https://support.google.com/chrome/a/answer/17031592?hl=en" },
		{ title: "Google Chrome Help: Auto Browse eligibility", url: "https://support.google.com/chrome/answer/16821166?hl=en-GB" },
		{ title: "Perplexity: Comet browser overview and current platforms", url: "https://www.perplexity.ai/comet" },
		{ title: "Perplexity: The New Comet Assistant, November 2025", url: "https://www.perplexity.ai/en-GB/hub/blog/the-new-comet-assistant" },
		{ title: "Google Chrome Help: Gemini in Chrome availability", url: "https://support.google.com/chrome/answer/17140089?hl=en" },
		{ title: "Dia: Security and data controls", url: "https://www.diabrowser.com/security" },
		{ title: "Dia: Official browser overview", url: "https://www.diabrowser.com/" },
		{ title: "Opera Neon: Official browser overview", url: "https://www.operaneon.com/" },
		{ title: "Opera: Connect AI agents to Opera Neon for free", url: "https://blogs.opera.com/news/2026/08/your-ai-agents-can-use-opera-neon-free-of-charge/" },
	],
	"arc-sunset-migration-data-checklist": [
		{ title: "Individual Arc sunset question", url: "https://www.reddit.com/r/ArcBrowser/comments/1xcubyl/does-sunset-mean-it-wont-work-anymore/" },
		{ title: "Arc Help: Sunset dates and what to expect", url: "https://resources.arc.net/hc/en-us/articles/44412972248471-Arc-Sunset-Key-Dates-and-What-to-Expect" },
		{ title: "Arc Help: Sunset FAQ", url: "https://resources.arc.net/hc/en-us/articles/44413577819159-Arc-Sunset-Frequently-Asked-Questions" },
		{ title: "Arc Help: Move from Arc to Dia", url: "https://resources.arc.net/hc/en-us/articles/44413129117591-Move-from-Arc-to-Dia" },
		{ title: "Arc Help: Export data", url: "https://resources.arc.net/hc/en-us/articles/25583851606039-How-Do-I-Export-My-Data-from-Arc" }
	],
	"tabbit-chat-agent-context-workflow": [
		{ title: "CSDN: AI Browser Tabbit Agent mode and model integration", url: "https://blog.csdn.net/longerxin2020/article/details/162234121" },
		{ title: "Tabbit: Quick Start Guide", url: "https://www.tabbit.ai/guide/usage" },
		{ title: "Tabbit: September 11 release notes", url: "https://www.tabbit.ai/blog/2026-09-11-v1-13-tabbit-cli" },
		{ title: "Tabbit Chinese product site linking to international site", url: "https://www.tabbit.com/" }
	],
	"opera-neon-mcp-server-setup": [
		{ title: "Individual Opera Neon MCP setup question", url: "https://www.reddit.com/r/OperaNeon/comments/1s9c7bt/anyone_got_the_mcp_connector_going_thoughts_i_see/" },
		{ title: "Opera Blog: Neon MCP Connector setup", url: "https://blogs.opera.com/news/2026/03/opera-neon-adds-mcp-connector-to-the-browser/" },
		{ title: "Opera Newsroom: Neon MCP Connector", url: "https://press.opera.com/2026/03/31/opera-neon-adds-mcp-connector/" },
		{ title: "Opera Neon: Connect Neon to remote MCP servers", url: "https://www.operaneon.com/news/connect-opera-neon-to-mcp-servers" },
		{ title: "Opera: Free MCP and CLI access for external agents", url: "https://blogs.opera.com/news/2026/08/your-ai-agents-can-use-opera-neon-free-of-charge/" }
	],
	"chrome-ai-history-find-visited-page": [
		{ title: "Individual question about browser memory and filled forms", url: "https://www.reddit.com/r/browsers/comments/1wzwmu8/is_there_a_browser_where_the_ai_agent_actually/" },
		{ title: "Google Chrome Help: Search history with Gemini in Chrome", url: "https://support.google.com/chrome/answer/16716225?hl=en" },
		{ title: "Google Chrome Help: History search powered by AI", url: "https://support.google.com/chrome/answer/15305774?hl=en" },
		{ title: "Google Chrome Help: Check or delete browsing history", url: "https://support.google.com/chrome/answer/95589?hl=en" }
	]
};

const related: Record<string, string[]> = {
	"ai-browser-task-platform-chooser": ["ai-browser-vs-browser-agent", "comet-vs-dia", "opera-neon-choose-ai-agent"],
	"arc-sunset-migration-data-checklist": ["chatgpt-atlas-retirement-data-transition", "comet-import-export-vs-sync", "ai-browser-task-platform-chooser"],
	"tabbit-chat-agent-context-workflow": ["ai-browser-vs-browser-agent", "ai-browser-compare-products-across-sites", "ai-browser-organize-tabs-by-task"],
	"opera-neon-mcp-server-setup": ["opera-neon-choose-ai-agent", "opera-browser-connector-chatgpt-permissions", "playwright-mcp-existing-browser"],
	"chrome-ai-history-find-visited-page": ["chrome-on-device-ai-storage-controls", "comet-assistant-history-data-controls", "edge-copilot-journeys-controls"]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"ai-browser-task-platform-chooser": {
		en: {
			title: "Choose an AI browser by task: page help, research, or actions",
			description: "Compare current AI browser surfaces by task, platform and account checks, permitted actions, and the page or account data they can use.",
			category: "AI browser guides",
			content: "There is no single AI browser that fits every job. For a question about one open page, start with a page assistant. For research across tabs, check which product can use those tabs as context. Use an agent only when the task needs navigation or form entry, and keep the final sensitive action under your control. Compare the exact feature, account and device you can use, not a product label or vendor score.",
			sections: [
				{ heading: "Start with the work you want done", body: `For a one-page explanation, compare Gemini in Chrome with Dia. For multi-tab research, check Comet's task-level browser access or Gemini's tab context. For browser actions, compare Chrome Auto Browse with an external agent connected to Opera Neon. Begin with the output you need.

| Your task | Surface to check first | What to verify before relying on it |
| --- | --- | --- |
| Explain or summarize one page | Browser side panel or page assistant | Which page content is attached, and how to verify its answer |
| Compare several open tabs | Assistant with tab context | Which tabs are included and whether sources are identified |
| Gather details across websites | Browser agent or research feature | Allowed sites, fields collected, account eligibility, and output destination |
| Fill or submit a form | Agent with a visible review step | What it can enter, whether it pauses before submission, and how to verify the saved result |
| Connect a coding agent to a browser | Documented MCP or CLI route | Whether the product is the server or client, and which account or permissions it needs |

If a normal browser can finish the task, an AI feature may add little. Choose the smallest capability that covers the job.` },
				{ heading: "Compare what the current product documentation says", body: `Use vendor descriptions as a capability map, not a performance ranking.

| Task and product | Platform | Account and region checks | Actions described by the vendor | Data and context to check |
| --- | --- | --- | --- | --- |
| Explain a page or automate browser steps with Gemini in Chrome | Chromebook Plus, Mac, Windows | Gemini requires latest signed-in Chrome, supported region/language and rollout; work/school may require admin enablement. Auto Browse has separate age, US/English and eligible-plan gates; check its [current help](https://support.google.com/chrome/answer/16821166?hl=en-GB) | Side panel uses open tabs; Auto Browse can navigate, click and fill forms | Check which tabs are attached and review current confirmation controls |
| Research across pages with Comet | Mac, Windows, iOS, Android | Confirm current account and regional access in the app | Perplexity's November 2025 announcement describes multi-tab work and a task-level choice before browser interaction; confirm current behavior | Check active account, tabs and privacy settings |
| Use connected apps and tab context in Dia | macOS, Windows | Confirm current account and feature access | Dia describes connected-app synthesis, Morning Brief and Profiles | Review the Security page for provider routing, content sharing and Sync boundaries |
| Connect an external agent to Opera Neon | Windows and macOS; confirm current app support | External MCP/CLI on Free; MCP needs Opera account, CLI does not | Neon can expose browser context and requested actions through MCP; Neon-owned AI features have a separate Standard requirement | A live session can include signed-in tabs; approve only the current task scopes |

These are examples, not a complete market list. A help page can document a feature without proving it is enabled for your device or account.` },
				{ heading: "Check the context and data before connecting", body: `Write down which information the task needs: the current page, named tabs, a signed-in site, connected apps, or local files. Then check the vendor's current privacy and permissions page for that exact surface. A product's general privacy statement may not describe every assistant, connector or model route.

Before an agent uses a signed-in session, check whether the session belongs to the right account and whether the task needs access to anything else in that profile. Prefer a separate work profile when available. Do not include passwords, payment details, health information, or private messages in a prompt unless the product and task have been approved for that data.` },
				{ heading: "Give agents a narrow task and a stop point", body: `A useful task request names the allowed pages, facts to collect, output location and action that must wait for review. For example: “Compare the public return policies on these three pages. Record the return period and exclusions with one source link per row. Save a draft table and stop before contacting a seller or placing an order.”

For a signed-in workflow, define any action that needs approval, such as sending a message, changing account settings, deleting a record or paying. Do not assume that an agent will pause just because the task sounds important. Use the confirmation behavior documented in the product and review the page before approving.` },
				{ heading: "Test one low-risk task before moving regular work", body: `Try a public page first. Ask the assistant to name the page it used and quote or point to a detail you can check. For tab research, ask for the title and source of each tab. For an agent, use a reversible task and set a clear stop before any submission.

Record the browser version, feature name, account type, region, platform, tabs or files you supplied, and whether the task stopped at the requested point. This is a local acceptance check for your setup, not a benchmark. If the product or model changes, check the permissions and result again.` },
				{ heading: "When an AI browser is the wrong fit", body: `A browser assistant is a poor fit when the task needs a repeatable, auditable sequence with strict field rules. Use a script or an approved API for stable, repeated work; use a browser agent only for the steps that need page interpretation. A browsing agent also cannot verify an external record just by producing a confident summary.

If you need current source research, see [how to verify AI browser research before citing it](/en/guides/ai-browser-research-source-verification/). For the difference between an AI browser and a developer agent, see [AI browser vs browser agent](/en/guides/ai-browser-vs-browser-agent/). Product capabilities and availability can change; check the linked vendor help pages and your current settings before choosing.` },
				{ heading: "Sources and limits", body: `Question context: [reader discussion](https://www.reddit.com/r/browsers/comments/1nzs7mh/which_browser_do_you_think_has_the_best_ai/). Product details: [Chrome availability](https://support.google.com/chrome/answer/17140089?hl=en) and [separate Auto Browse eligibility](https://support.google.com/chrome/answer/16821166?hl=en-GB), [Comet's November 2025 feature description](https://www.perplexity.ai/en-GB/hub/blog/the-new-comet-assistant) and [current platform list](https://www.perplexity.ai/comet), [Dia security](https://www.diabrowser.com/security), [Opera Neon](https://www.operaneon.com/) and [Opera's August 2026 plan update](https://blogs.opera.com/news/2026/08/your-ai-agents-can-use-opera-neon-free-of-charge/). BrowserHub did not test these products; confirm current account, region and rollout in each app.` }
			],
			faq: [
				{ question: "Which AI browser is best?", answer: "Choose by task. A page assistant may be enough for one article; multi-tab research or website actions need separate context and permission checks. The sources reviewed here do not establish a universal winner." },
				{ question: "Can an AI browser compare several open tabs?", answer: "Some vendors document tab context, but verify which tabs the feature can use and ask it to identify its sources before relying on the comparison." },
				{ question: "Should I let an AI browser submit a form?", answer: "Only when the task and account are approved for it. Review the destination and values, and keep a person in control of the final submission when the action matters." },
				{ question: "Can I use Opera Neon with an external agent for free?", answer: "Opera's August 2026 post says external MCP and CLI connections are available on Free. MCP needs an Opera account; CLI does not. Neon-owned AI services have a separate Standard-plan requirement." },
				{ question: "Does a vendor feature page prove the feature is available to me?", answer: "No. Check your current platform, account, region, administrator policy and rollout state in the product's current help or settings." }
			]
		},
		"zh-cn": {
			title: "按任务选择 AI 浏览器：看网页、做研究还是执行操作",
			description: "按任务、平台与账号条件、允许的操作和数据上下文比较当前 AI 浏览器功能。",
			category: "AI 浏览器指南",
			content: "没有一款 AI 浏览器适合所有工作。只想询问当前网页时，先看页面助手；需要比较多个标签时，确认产品能否读取这些标签；任务必须导航或填写表单时，才考虑智能体，并让重要提交由你把关。比较你能用到的具体功能、账号和设备条件，不看产品标签或厂商打分。",
			sections: [
				{ heading: "先说清要完成什么工作", body: `只解释一个网页，可比较 Chrome 中的 Gemini 与 Dia；需要跨标签研究时，核对 Comet 的浏览器访问选择或 Gemini 的标签上下文；需要执行网页操作时，可比较 Chrome Auto Browse 与连接 Opera Neon 的外部智能体。先明确你要的结果。

| 任务 | 先检查的功能入口 | 使用前核对 |
| --- | --- | --- |
| 解释或总结单个网页 | 浏览器侧栏或页面助手 | 附加了哪个页面，以及如何核对答案 |
| 比较多个打开的标签 | 能读取标签上下文的助手 | 包含哪些标签，是否会列出来源 |
| 跨网站收集信息 | 浏览器智能体或研究功能 | 可访问的网站、采集字段、账号资格和结果保存位置 |
| 填写或提交表单 | 提供人工预览节点的智能体 | 能填写什么、提交前是否暂停、如何核对保存结果 |
| 让编程智能体连接浏览器 | 有文档说明的 MCP 或 CLI | 产品是服务端还是客户端，以及所需账号和权限 |

如果普通浏览器就能完成任务，AI 功能未必有帮助。选择足以完成工作的最小能力。` },
				{ heading: "核对当前产品文档写了什么", body: `把厂商描述当作功能边界参考，不当作性能排名。

| 任务与产品 | 平台 | 账号与地区条件 | 厂商说明的操作 | 需要核对的数据与上下文 |
| --- | --- | --- | --- | --- |
| 用 Chrome 中的 Gemini 解释网页或自动浏览 | Chromebook Plus、Mac、Windows | Gemini 需最新版已登录 Chrome、受支持的地区/语言并已开放；工作或学校账号可能需管理员启用。Auto Browse 另有年龄、美国/英文和合资格方案条件，见[当前帮助](https://support.google.com/chrome/answer/16821166?hl=en-GB) | 侧栏可使用打开的标签；Auto Browse 可导航、点击和填写表单 | 分享前确认附加了哪些标签，并检查当前确认控件 |
| 用 Comet 跨网页研究 | Mac、Windows、iOS、Android | 在应用中确认当前账号和地区开放情况 | Perplexity 于 2025 年 11 月的公告介绍多标签任务及操作浏览器前的任务级选择；当前行为以安装版为准 | 检查活动账号、标签和隐私设置 |
| 在 Dia 中使用连接应用和标签上下文 | macOS、Windows | 确认当前账号和功能权限 | Dia 介绍了连接应用综合、Morning Brief 和 Profiles | 查看 Security 页关于服务商路由、内容分享和 Sync 的说明 |
| 将外部智能体连接到 Opera Neon | Windows、macOS；核对当前应用支持 | 外部 MCP/CLI 可使用 Free；MCP 需要 Opera 账号，CLI 不需要 | Neon 可通过 MCP 暴露浏览器上下文和获准操作；Neon 自带 AI 功能另需 Standard | 活动会话可能包含已登录标签；只批准当前任务所需权限 |

这些只是例子，不是完整市场名单。帮助页写有某项功能，不等于你的设备或账号已经开放。` },
				{ heading: "连接前先核对上下文和数据", body: `列出任务需要哪些信息：当前页面、指定标签、已登录网站、连接的应用，还是本地文件。然后查该功能入口对应的隐私和权限说明。产品的通用隐私声明不一定覆盖每个助手、连接器或模型路径。

让智能体使用已登录会话前，确认这是正确账号，并判断配置文件里是否还有无关数据可被访问。条件允许时使用单独的工作配置文件。除非产品和任务明确允许，否则不要在提示中提供密码、支付信息、健康资料或私信。` },
				{ heading: "给智能体设定范围和停止位置", body: `任务要求应写明可访问的网页、要收集的事实、输出位置，以及哪一步必须等你检查。例如：“比较这三个公开退货政策页。记录退货期限和例外，每行附一个来源链接。保存草稿表格，不要联系卖家或下单。”

对于已登录任务，还要列出需要人工批准的操作，例如发消息、改账号设置、删除记录或付款。不要因为任务听起来重要就假设智能体一定会暂停。按产品文档确认它的确认流程，并在批准前检查页面。` },
				{ heading: "先用一个低风险任务检查当前版本", body: `先试公开网页。让助手说出它使用的页面，并指出一项你能核对的内容。比较标签时，让它列出每个标签的标题和来源。使用智能体时选可撤销的任务，并明确要求它在提交前停止。

记录浏览器版本、功能名称、账号类型、地区、平台、提供的标签或文件，以及任务是否按要求停下。这只是对当前配置的检查，不是产品基准测试。产品或模型更新后，应重新核对权限和结果。` },
				{ heading: "哪些工作不适合交给 AI 浏览器", body: `如果任务需要可重复、可审计、字段规则严格的流程，浏览器助手未必适合。稳定且重复的工作可使用脚本或获批 API；只有需要理解页面变化的步骤才考虑浏览器智能体。智能体输出一段肯定的总结，也不能证明外部记录已经更新。

需要核实来源时，可看[如何在引用 AI 浏览器研究前核对来源](/zh-cn/guides/ai-browser-research-source-verification/)。想了解 AI 浏览器与开发者智能体的区别，可看[AI 浏览器与浏览器智能体](/zh-cn/guides/ai-browser-vs-browser-agent/)。产品功能和开放范围可能变化；选用前请查看所链接的厂商帮助页和当前设置。` },
				{ heading: "来源与限制", body: `问题背景见[读者讨论](https://www.reddit.com/r/browsers/comments/1nzs7mh/which_browser_do_you_think_has_the_best_ai/)。产品资料：[Chrome 开放条件](https://support.google.com/chrome/answer/17140089?hl=en)和[Auto Browse 单独资格条件](https://support.google.com/chrome/answer/16821166?hl=en-GB)、[Comet 2025 年 11 月功能说明](https://www.perplexity.ai/en-GB/hub/blog/the-new-comet-assistant)与[当前平台列表](https://www.perplexity.ai/comet)、[Dia 安全说明](https://www.diabrowser.com/security)、[Opera Neon](https://www.operaneon.com/)及 [Opera 2026 年 8 月方案更新](https://blogs.opera.com/news/2026/08/your-ai-agents-can-use-opera-neon-free-of-charge/)。BrowserHub 未实测这些产品；请在各应用中确认当前账号、地区和开放状态。` }
			],
			faq: [
				{ question: "哪款 AI 浏览器最好？", answer: "按任务选择。只看一篇文章时页面助手可能足够；跨标签研究或网站操作需要单独核对上下文和权限。所查来源不能证明存在适合所有人的赢家。" },
				{ question: "AI 浏览器能比较多个打开的标签吗？", answer: "部分厂商文档介绍了标签上下文。使用前应确认具体功能读取哪些标签，并要求它指出来源后再检查比较结果。" },
				{ question: "应该让 AI 浏览器提交表单吗？", answer: "只有任务和账号都允许时才考虑。先检查目标页面和填写内容；重要提交应由人掌握最后确认。" },
				{ question: "能免费用外部智能体连接 Opera Neon 吗？", answer: "Opera 的 2026 年 8 月说明称，外部 MCP 和 CLI 连接可使用 Free。MCP 需要 Opera 账号，CLI 不需要。Neon 自带 AI 服务另有 Standard 方案要求。" },
				{ question: "厂商功能页能证明我已经可以使用该功能吗？", answer: "不能。应在产品当前帮助或设置中核对平台、账号、地区、管理员策略和分批开放状态。" }
			]
		}
	},
	"arc-sunset-migration-data-checklist": {
		en: {
			title: "Arc sunset: what stops working and how to move your data",
			description: "Track Arc's desktop and mobile sunset dates, decide what to export or import, and check what Dia does and does not carry over.",
			category: "AI browser guides",
			content: "Arc for macOS and Windows is scheduled to stop working on December 22, 2026. Arc Search's AI features, sign-in and sync stop earlier on November 23; iOS remains a browser, while Android is removed on December 22. If you want your desktop Spaces, tabs and browsing data, import them into Dia before the desktop deadline or export a list of links. Dia import is a one-time copy, and some data such as saved payment methods and autofill does not move.",
			sections: [
				{ heading: "Use the deadline for the Arc version you have", body: `The word “sunset” does not mean every Arc app stops on the same day.

| Arc product | November 23, 2026 | December 22, 2026 |
| --- | --- | --- |
| Arc for macOS and Windows | Reminders begin; basic updates continue until the final date | Browser stops working; sign-in and Arc services stop |
| Arc Search for iOS | AI features turn off; sign-in and sync stop | Continues working as a mobile browser |
| Arc Search for Android | AI features turn off; sign-in and sync stop | App is removed from the Play Store and installed devices |

Arc account-data copy requests are due December 15. That account record does not include browsing data stored on your device, such as history or passwords. Check the [Key Dates page](https://resources.arc.net/hc/en-us/articles/44412972248471-Arc-Sunset-Key-Dates-and-What-to-Expect) for current wording before acting.` },
				{ heading: "Choose whether to move to Dia or keep a link list", body: `For Arc on macOS or Windows, Dia is available for both platforms. During setup, choose Arc when Dia asks which browser to import. If Dia is already installed, use its Import from Another Browser menu before December 22. Arc's help says importing copies data into Dia without changing or deleting it in Arc.

If you do not want to use Dia, export a link list from Arc: on macOS open Arc > Settings > Advanced > Export Data; on Windows open Settings (Ctrl+,) > Advanced > Export Spaces and tabs > Export Data. The resulting Arc Data Export.md is a list of links, not a bookmarks file or full profile backup. Open it in a text editor and bookmark the URLs you need. It does not preserve passwords, cookies, extensions, history or browser settings. See [the Arc export instructions](https://resources.arc.net/hc/en-us/articles/25583851606039-How-Do-I-Export-My-Data-from-Arc).` },
				{ heading: "Know what the Dia import includes", body: `Arc's current migration guide says Dia can import the following on macOS and Windows:

- Spaces as Dia Profiles, with their tabs and layout information.
- Favorites, pinned tabs, folders, bookmarks and browsing history.
- Passwords, cookies that keep sites signed in, and selected extensions.
- GitHub Live Folders as Dia Live Groups.

Saved payment methods and browser autofill data do not import. Arc-only features such as Easels and Boosts do not come over. The documented import includes passwords and cookies; if you do not want to move that signed-in data, use the link export instead. Check the current import screen for the options actually offered.` },
				{ heading: "Treat import as a one-time copy, not ongoing sync", body: `Arc and Dia use separate accounts. For a broader task-based comparison after migration, see [the AI browser chooser](/en/guides/ai-browser-task-platform-chooser/). You can use the same email, but Arc account identity does not carry over. The import copies selected local browser data into Dia; changes you make in Arc afterward do not appear in Dia.

Each Arc Space becomes a Dia Profile. Spaces from the same Arc profile can share logins, history, bookmarks and extensions as configured; Spaces from different Arc profiles remain separate. Review those profile boundaries before using the imported session for work or personal accounts. If you import Arc into an existing Dia setup, the vendor says each Arc Space creates a new Dia Profile.` },
				{ heading: "Fix the Windows cookie-file lock before retrying", body: `On Windows, quit Arc before starting the Dia import. If Dia reports that the Cookies file is locked, choose Close so Dia can close Arc and continue. Dia also says it reads Arc data through the Arc app, so keep Arc installed until the import finishes.

After the transfer, open Dia and check a few items: the expected Profiles, a pinned tab, a bookmark, an extension you selected, and a site you expected to remain signed in. Do not infer that every item imported because the first window opened. Keep Arc installed until you have checked the data you need.` },
				{ heading: "Make a short checklist before the cutoff", body: `Before moving, list the Arc profile or profiles and the data you need from each. The documented Dia import includes passwords and cookies, so use the import only if you are comfortable copying signed-in data; otherwise export a link list. Arc folders nested inside other folders flatten into non-nested pinned Tab Groups in Dia. Check that structure after importing. For export steps, see [Arc's data export guide](https://resources.arc.net/hc/en-us/articles/25583851606039-How-Do-I-Export-My-Data-from-Arc).

- On desktop, finish Dia import or export link lists before December 22, 2026.
- For Arc Search on either mobile platform, export open tabs before November 23 if sign-in or sync matters.
- If you need an Arc account-data copy, submit the request by December 15.
- After import, check Profiles and sign-ins before relying on Dia as the only copy.

Arc announced this schedule on October 22, 2026; BrowserHub checked the official date page on November 12. Recheck it if the schedule changes.` },
				{ heading: "Sources and limits", body: `Question context: [Arc sunset discussion](https://www.reddit.com/r/ArcBrowser/comments/1xcubyl/does-sunset-mean-it-wont-work-anymore/). Product instructions: Arc [Key Dates](https://resources.arc.net/hc/en-us/articles/44412972248471-Arc-Sunset-Key-Dates-and-What-to-Expect), [Sunset FAQ](https://resources.arc.net/hc/en-us/articles/44413577819159-Arc-Sunset-Frequently-Asked-Questions), [Move to Dia](https://resources.arc.net/hc/en-us/articles/44413129117591-Move-from-Arc-to-Dia) and [data export](https://resources.arc.net/hc/en-us/articles/25583851606039-How-Do-I-Export-My-Data-from-Arc). BrowserHub did not run a migration; check the import options in your installation.` }
			],
			faq: [
				{ question: "Will Arc stop working on December 22?", answer: "Arc for macOS and Windows stops working on December 22, 2026. Arc Search mobile changes earlier: its AI, sign-in and sync stop November 23." },
				{ question: "Will Dia import my passwords and keep sites signed in?", answer: "Arc's migration guide says passwords and cookies are imported. Saved payment methods and autofill are not. Review the import choice before moving signed-in data." },
				{ question: "Does Dia stay synced with Arc after import?", answer: "No. Arc's FAQ describes a one-time copy. Later changes in Arc do not appear in Dia." },
				{ question: "What should I do if Dia says the Windows Cookies file is locked?", answer: "Quit Arc first. The Dia import guide says you can choose Close in the prompt so Dia closes Arc and continues; keep Arc installed until the import finishes." },
				{ question: "Can I request a copy of my Arc data after December 15?", answer: "Arc says requests for account data must be submitted by December 15, 2026. That account record does not include local browsing data such as history or passwords." }
			]
		},
		"zh-cn": {
			title: "Arc 停止服务后会怎样？按日期迁移浏览数据",
			description: "区分 Arc 桌面版与手机版的停止日期，决定导出或导入什么，并核对哪些内容不会迁入 Dia。",
			category: "AI 浏览器指南",
			content: "Arc 的 macOS 和 Windows 版计划于 2026 年 12 月 22 日停止工作。Arc Search 的 AI、登录和同步会在 11 月 23 日提前关闭；iOS 版仍可作为浏览器使用，Android 版则在 12 月 22 日移除。如果要保留桌面版 Spaces、标签和浏览数据，应在桌面截止日期前导入 Dia，或先导出链接清单。Dia 的导入是一次性复制，不会迁移保存的支付方式和自动填充数据。",
			sections: [
				{ heading: "先确认自己使用的 Arc 版本和截止日期", body: `“停止服务”不代表所有 Arc 应用都在同一天停止。

| Arc 产品 | 2026 年 11 月 23 日 | 2026 年 12 月 22 日 |
| --- | --- | --- |
| macOS 和 Windows Arc | 开始显示提醒；基本更新继续到最终日期 | 浏览器停止工作；登录和 Arc 服务关闭 |
| iOS Arc Search | AI 功能关闭；登录和同步停止 | 仍可作为手机浏览器使用 |
| Android Arc Search | AI 功能关闭；登录和同步停止 | 从 Play 商店和已安装设备中移除 |

申请 Arc 账号数据副本的截止日是 12 月 15 日。这份账号记录不包含保存在设备上的浏览数据，例如历史记录或密码。行动前可查看[官方日期说明](https://resources.arc.net/hc/en-us/articles/44412972248471-Arc-Sunset-Key-Dates-and-What-to-Expect)，确认最新措辞。` },
				{ heading: "选择迁入 Dia，还是只保留链接清单", body: `macOS 和 Windows 上都可使用 Dia。首次设置时，Dia 询问导入来源后选择 Arc；如果已经安装 Dia，可在 12 月 22 日前从“从其他浏览器导入”菜单操作。Arc 帮助说明，导入会复制数据到 Dia，不会更改或删除 Arc 中的数据。

如果不想使用 Dia，可从 Arc 导出链接清单：macOS 打开 Arc > Settings > Advanced > Export Data；Windows 打开 Settings（Ctrl+,）> Advanced > Export Spaces and tabs > Export Data。生成的 Arc Data Export.md 是链接列表，不是书签文件或完整配置备份。用文本编辑器打开后，把需要的网址另存为书签。它不会保留密码、Cookie、扩展、历史记录或浏览器设置。详见 [Arc 数据导出说明](https://resources.arc.net/hc/en-us/articles/25583851606039-How-Do-I-Export-My-Data-from-Arc)。` },
				{ heading: "核对 Dia 导入了哪些内容", body: `Arc 当前迁移指南说明，macOS 和 Windows 上可将以下内容导入 Dia：

- Spaces 会变成 Dia Profiles，包含标签及布局信息。
- 收藏、固定标签、文件夹、书签和浏览历史。
- 密码、使网站保持登录状态的 Cookie，以及所选扩展。
- GitHub Live Folders 会变成 Dia Live Groups。

保存的支付方式和浏览器自动填充数据不会迁移。Easels、Boosts 等 Arc 专属功能也不会导入。官方列出的导入内容包括密码和 Cookie；如果不想迁移登录数据，可改用链接导出。以当前导入界面实际提供的选项为准。` },
				{ heading: "导入是一次性复制，不是持续同步", body: `Arc 和 Dia 使用不同账号。迁移后若要按任务比较浏览器功能，可看[AI 浏览器选择指南](/zh-cn/guides/ai-browser-task-platform-chooser/)。两者可以使用同一个邮箱，但 Arc 账号身份不会自动转成 Dia 账号。导入会把所选的本地浏览数据复制到 Dia；之后在 Arc 中做的修改不会同步到 Dia。

每个 Arc Space 会成为一个 Dia Profile。同一 Arc 配置文件中的 Spaces 可按设置共享登录信息、历史、书签和扩展；不同 Arc 配置文件中的 Spaces 仍彼此分开。用于工作或个人账号前，先核对这些 Profile 边界。若把 Arc 导入已安装的 Dia，官方说每个 Arc Space 会新建一个 Dia Profile。` },
				{ heading: "Windows 提示 Cookie 文件被占用时先关闭 Arc", body: `在 Windows 上，开始导入 Dia 前先退出 Arc。若 Dia 提示 Cookies 文件被锁定，选择 Close，让 Dia 关闭 Arc 并继续导入。Dia 还说明它通过 Arc 应用读取数据，所以导入完成前要保留 Arc 安装。

迁移后打开 Dia 检查几项内容：预期的 Profiles、固定标签、书签、所选扩展，以及应该保持登录的网站。看到第一个窗口打开，不代表所有项目都已迁移。确认需要的数据前先保留 Arc。` },
				{ heading: "在截止日前完成这份清单", body: `迁移前写下每个 Arc 配置文件及需要的数据。官方列出的 Dia 导入包含密码和 Cookie；若不想复制登录数据，可选择导出链接清单。Arc 中嵌套文件夹会在 Dia 中摊平为非嵌套的固定 Tab Groups，导入后应检查结构。导出步骤见 [Arc 数据导出指南](https://resources.arc.net/hc/en-us/articles/25583851606039-How-Do-I-Export-My-Data-from-Arc)。

- 桌面版应在 2026 年 12 月 22 日前完成 Dia 导入或导出链接清单。
- 如果使用 Arc Search 手机版，且登录或同步对你重要，应在 11 月 23 日前导出打开的标签。
- 如果需要 Arc 账号数据副本，应在 12 月 15 日前提交申请。
- 导入后检查 Profiles 和登录状态，再决定是否只保留 Dia 这一份数据。

Arc 于 2026 年 10 月 22 日宣布该安排；BrowserHub 于 11 月 12 日核对官方日期页。若时间表变化，请重新查看官方页面。` },
				{ heading: "来源与限制", body: `问题背景见 [Arc 停止服务讨论](https://www.reddit.com/r/ArcBrowser/comments/1xcubyl/does-sunset-mean-it-wont-work-anymore/)。操作说明见 Arc 的[截止日期](https://resources.arc.net/hc/en-us/articles/44412972248471-Arc-Sunset-Key-Dates-and-What-to-Expect)、[停止服务 FAQ](https://resources.arc.net/hc/en-us/articles/44413577819159-Arc-Sunset-Frequently-Asked-Questions)、[迁入 Dia](https://resources.arc.net/hc/en-us/articles/44413129117591-Move-from-Arc-to-Dia)和[数据导出](https://resources.arc.net/hc/en-us/articles/25583851606039-How-Do-I-Export-My-Data-from-Arc)。BrowserHub 未执行迁移；请以当前安装界面提供的选项为准。` }
			],
			faq: [
				{ question: "Arc 会在 12 月 22 日停止工作吗？", answer: "macOS 和 Windows 版 Arc 会在 2026 年 12 月 22 日停止工作。Arc Search 手机版更早变化：AI、登录和同步于 11 月 23 日停止。" },
				{ question: "Dia 会导入密码并让网站保持登录吗？", answer: "Arc 迁移指南说会导入密码和 Cookie；保存的支付方式与自动填充不会迁移。移动登录数据前先检查导入选项。" },
				{ question: "导入后 Dia 会和 Arc 保持同步吗？", answer: "不会。Arc FAQ 将导入描述为一次性复制；之后在 Arc 中的修改不会出现在 Dia。" },
				{ question: "Dia 提示 Windows Cookie 文件被占用怎么办？", answer: "先退出 Arc。Dia 导入指南说可在提示中选择 Close，让 Dia 关闭 Arc 并继续；导入结束前不要卸载 Arc。" },
				{ question: "12 月 15 日之后还能申请 Arc 数据副本吗？", answer: "Arc 表示账号数据副本的申请需在 2026 年 12 月 15 日前提交。这份账号记录不包括设备本地的历史记录或密码。" }
			]
		}
	},
	"tabbit-chat-agent-context-workflow": {
		en: {
			title: "Tabbit Chat vs Agent: choose context, tasks, and Skills",
			description: "Use Tabbit Chat for questions and supplied context, Agent for multi-step browser tasks, and Skills for reusable instructions, with checks before sharing results.",
			category: "AI browser guides",
			content: "Tabbit puts Chat and Agent in the same browser, but the modes serve different jobs. For a broader distinction, see [AI browser vs browser agent](/en/guides/ai-browser-vs-browser-agent/). Use Chat to ask about a page or context you attach with @. Choose Agent when the task needs several browser steps. Use a Skill when you want to reuse an instruction. Start with a public, read-only task so you can check which pages and files the answer used. Tabbit's separate /tabbit CLI is for a coding agent controlling the browser; it is not the in-browser Agent mode.",
			sections: [
				{ heading: "Pick the mode by the next action", body: `The current Tabbit guide puts browsing, search, chat, Agent and Skills in one search box. The choice depends on whether you want an answer, a reusable procedure, or browser actions.

| Need | Tabbit path | What it does not establish |
| --- | --- | --- |
| Ask about the current page | Chat in the sidebar or new tab | That other tabs or local files are included automatically |
| Supply specific context | Type @ and choose tabs, groups, favorites or local files | That the model used every supplied item correctly |
| Delegate several browser steps | Select Agent in More Modes and describe the task | That every site or action is supported or safe |
| Reuse a prompt or workflow | Type / and choose a Skill | That a saved Skill is correct for a new site |
| Let a coding agent use Tabbit | Use the separate CLI's /tabbit route in a supported agent | That this is the same interface or permissions as browser Agent |

The vendor guide describes these entry points; BrowserHub did not test them in an installed copy.` },
				{ heading: "Attach only the context the question needs", body: `Tabbit's quick start says @ can add tabs, tab groups, favorites or local files as context. Choose the smallest relevant set. If the answer should compare two documents, attach those two items and name the comparison fields. If a source is important, ask Tabbit to identify which attached page supports each result.

Attaching context is a user action. Do not assume every open tab, saved page or local file is shared automatically. Before using a private document, check that the selected context and the account are appropriate for the task.` },
				{ heading: "Use Chat for an answer and Agent for a task", body: `A Chat request can ask for a summary, explanation or comparison of supplied context. An Agent request is better suited to a goal that requires navigation or several page interactions. Describe the start point, allowed websites, information to collect and the point where Tabbit should stop.

For example: “Open these two public product pages, compare supported file formats and quote the relevant source line. Save a draft table. Do not sign in, contact the vendors or submit a form.” This keeps the task inspectable and limits actions to what you requested.` },
				{ heading: "Make a Skill specific enough to reuse", body: `The quick start says / opens the Skills menu. A Skill can package instructions you use again, such as the fields in a recurring public-page comparison. Keep the reusable part stable and pass current URLs and constraints with each task.

After choosing a Skill, check that its instructions still fit the current site and task. A remembered workflow can be stale when the page layout, eligibility rules or destination changes. Do not save credentials or private customer data in a reusable instruction.` },
				{ heading: "Keep the CLI boundary clear", body: `Tabbit's guide documents a separate CLI: a supported coding agent can use /tabbit to perform browser work in Tabbit, including work with sites where you are already signed in. That is different from selecting Agent in the browser's More Modes menu. The release note describes the CLI but does not establish that every coding-agent version, operating system or account supports it.

If your goal is to ask Tabbit to work through a browser task, use the in-product Agent mode. If your goal is for a coding agent to control Tabbit, follow the current CLI documentation and check the supported agent list there. BrowserHub did not install or connect the CLI.` },
				{ heading: "Check the output before you reuse or share it", body: `Start with a public page or a copy of a file. Check that the result cites the right page, preserves the requested fields and marks missing details as unknown. If Agent changed a page, reopen it and inspect the result. A completed response does not prove that a site saved a form or that a generated file contains the expected data.

For repeatable work, keep a short record of the prompt, supplied context, date and output location. If the answer is wrong, note whether the source page, context selection or task instruction was wrong before retrying.` },
				{ heading: "Sources and limits", body: `Question context: [June 30 CSDN article](https://blog.csdn.net/longerxin2020/article/details/162234121). Current instructions: Tabbit [Quick Start](https://www.tabbit.ai/guide/usage) and [September 11 CLI release notes](https://www.tabbit.ai/blog/2026-09-11-v1-13-tabbit-cli). The article contains a promotion; its task claims are not BrowserHub test results. Verify current labels and account access in Tabbit.` }
			],
			faq: [
				{ question: "How do I turn on Tabbit Agent mode?", answer: "The current Quick Start says to select Agent under More Modes, then describe the task. Check your installed version if the label or location differs." },
				{ question: "What can I attach with @?", answer: "Tabbit's guide lists tabs, tab groups, favorites and local files. Select only the items the task needs." },
				{ question: "Are Skills the same as Agent mode?", answer: "No. The guide describes Skills as reusable instructions opened with /. Agent is the mode for delegating browser tasks." },
				{ question: "Does /tabbit mean I am using the browser's Agent mode?", answer: "No. The guide describes /tabbit as a CLI route for a supported coding agent to control Tabbit. Browser Agent is selected inside Tabbit under More Modes." },
				{ question: "Can I assume Tabbit Agent completed a form?", answer: "No. Reopen the destination and check its saved state. A finished chat response is not proof of a form submission." }
			]
		},
		"zh-cn": {
			title: "Tabbit 的 Chat 和 Agent 怎么选：上下文与妙招用法",
			description: "用 Chat 询问问题和指定上下文，用 Agent 执行多步浏览任务，用妙招复用指令，并在分享结果前检查输出。",
			category: "AI 浏览器指南",
			content: "Tabbit 在同一款浏览器中提供 Chat 和 Agent，但两种模式承担不同任务。可先看[AI 浏览器与浏览器智能体的区别](/zh-cn/guides/ai-browser-vs-browser-agent/)。询问网页或用 @ 附加上下文时可用 Chat；任务需要连续浏览多个页面时可选 Agent；想复用一组指令时可用妙招。先用公开网页做只读任务，检查回答引用了哪些页面和文件。Tabbit 的 /tabbit CLI 是供编程智能体控制浏览器的另一条路径，不等于浏览器内的 Agent 模式。",
			sections: [
				{ heading: "按下一步要做什么选择入口", body: `Tabbit 当前入门指南把浏览、搜索、Chat、Agent 和妙招放在同一个搜索框中。应根据你需要的是回答、可复用流程还是浏览器操作来选择。

| 需要完成的事 | Tabbit 入口 | 这不能证明什么 |
| --- | --- | --- |
| 询问当前页面 | 侧边栏或新标签中的 Chat | 不代表自动读取其他标签或本地文件 |
| 指定资料上下文 | 输入 @ 并选择标签、分组、收藏或本地文件 | 不代表模型正确使用了每项资料 |
| 委托多步网页操作 | 在 More Modes 中选择 Agent 并描述任务 | 不代表所有网站或动作都受支持或安全 |
| 复用提示或流程 | 输入 / 并选择妙招 | 不代表保存的妙招适合新网站 |
| 让编程智能体操作 Tabbit | 在受支持的智能体中使用独立 CLI 的 /tabbit | 不代表它与浏览器 Agent 的界面和权限相同 |

厂商指南说明了这些入口；BrowserHub 没有在安装版中测试。` },
				{ heading: "只附加当前问题需要的资料", body: `Tabbit 入门指南说，输入 @ 可把标签页、标签分组、收藏或本地文件加为上下文。选择相关资料即可。如果要比较两份文档，就附加这两份并说明比较字段；若某条结论必须有出处，让 Tabbit 指出是哪一项资料支持它。

附加上下文是用户主动操作。不要假定所有打开的标签、收藏网页或本地文件都会自动共享。使用私密文档前，检查选中的上下文和当前账号是否适合处理这项任务。` },
				{ heading: "用 Chat 获取回答，用 Agent 执行任务", body: `Chat 可以总结、解释或比较你提供的上下文。需要导航或连续操作多个网页时，可考虑 Agent。描述起点、允许访问的网站、要收集的信息，以及希望 Tabbit 停在哪一步。

例如：“打开这两个公开产品页，比较支持的文件格式，并引用相关说明。保存一份草稿表格。不要登录、联系厂商或提交表单。”这样结果便于检查，也能把操作限制在要求范围内。` },
				{ heading: "把妙招写得足够具体，方便重复使用", body: `入门指南说，输入 / 可以打开妙招菜单。妙招可以保存常用指令，例如定期比较公开网页时要记录的字段。把稳定的步骤存起来，每次执行时再提供当前网址和限制条件。

选中妙招后，检查指令是否仍适用于当前网站和任务。页面布局、资格规则或保存位置变化后，旧流程可能不再合适。不要在可复用指令中保存凭据或客户隐私数据。` },
				{ heading: "分清浏览器 Agent 和 CLI", body: `Tabbit 指南另行介绍 CLI：受支持的编程智能体可使用 /tabbit 在 Tabbit 中执行浏览器任务，包括访问你已经登录的网站。这与在浏览器 More Modes 菜单中选择 Agent 不同。发行说明介绍了 CLI，但没有证明所有编程智能体版本、系统或账号都支持它。

如果想让 Tabbit 完成浏览器任务，在产品内选 Agent。如果想让编程智能体控制 Tabbit，应按当前 CLI 文档操作，并核对受支持的智能体。BrowserHub 没有安装或连接该 CLI。` },
				{ heading: "复用或分享结果前先检查", body: `先用公开网页或文件副本。检查结果是否引用正确页面、保留要求的字段，并把缺少的信息标为未知。若 Agent 修改了网页，重新打开目标页面检查状态。聊天显示完成，不等于网站已保存表单，也不等于生成文件包含了预期数据。

对重复任务，可简单记录提示内容、附加的上下文、日期和结果位置。如果结果不对，先判断是来源页面、上下文选择还是任务说明出了问题，再重试。` },
				{ heading: "来源与限制", body: `问题背景见 [6 月 30 日 CSDN 文章](https://blog.csdn.net/longerxin2020/article/details/162234121)。当前操作说明见 Tabbit [入门指南](https://www.tabbit.ai/guide/usage)和[9 月 11 日 CLI 更新](https://www.tabbit.ai/blog/2026-09-11-v1-13-tabbit-cli)。文章含推广内容，其任务描述不是 BrowserHub 实测结果。界面和账号权限以 Tabbit 当前版本为准。` }
			],
			faq: [
				{ question: "怎么打开 Tabbit Agent 模式？", answer: "当前入门指南说，在 More Modes 中选择 Agent，再描述任务。若界面文字或位置不同，请以安装版本为准。" },
				{ question: "输入 @ 可以附加什么？", answer: "Tabbit 指南列出标签页、标签分组、收藏和本地文件。只选择任务需要的内容。" },
				{ question: "妙招和 Agent 模式相同吗？", answer: "不同。指南将妙招描述为通过 / 打开的可复用指令；Agent 是委托浏览器任务的模式。" },
				{ question: "/tabbit 就是在用浏览器里的 Agent 吗？", answer: "不是。指南把 /tabbit 说明为供受支持的编程智能体控制 Tabbit 的 CLI 入口。浏览器内的 Agent 则从 More Modes 选择。" },
				{ question: "能否假定 Tabbit Agent 已经提交表单？", answer: "不能。应重新打开目标页面检查保存状态。对话完成不等于表单已提交。" }
			]
		}
	},
	"opera-neon-mcp-server-setup": {
		en: {
			title: "Connect an AI client to Opera Neon as an MCP server",
			description: "Set up the external-client-to-Neon MCP direction, check account and OAuth prompts, and keep read access separate from browser actions.",
			category: "AI browser guides",
			content: "Opera Neon can expose its browser session as an MCP server for an external AI client. That is different from using Neon Do as an MCP client for a remote service. Start by checking which direction your client needs, then follow Neon's current connector screen and approve only the access required for the task. Opera's August 2026 update says external MCP access is available on the Free plan, with an Opera account required for MCP; Neon-owned AI services have a separate Standard-plan requirement.",
			sections: [
				{ heading: "First identify which side of MCP Neon is on", body: `MCP setup instructions can point in opposite directions.

| Connection | What Neon does | Typical purpose |
| --- | --- | --- |
| External AI client → Neon MCP server | Neon exposes the active browser session to another client | Let an external agent read selected browser context or perform allowed actions |
| Neon Do → remote MCP server | Neon connects outward to a service that provides tools | Let Neon Do use a remote app or service through OAuth |

This guide covers the first route. Opera's June 5 guide covers the second route and says remote-server use is in Neon Do with OAuth. Do not paste an external service URL into a client's Neon-server field, or treat a remote service as the browser endpoint.` },
				{ heading: "Check the plan and account boundary", body: `Opera's August 14, 2026 post says an external agent can connect to Neon through MCP or CLI on the Free plan. It says an Opera account is required for MCP, while CLI does not require one. A Neon Standard subscription is described as necessary for Neon’s own AI services such as autonomous browsing, deep research, Skills, automation and generative agents.

Older Neon pages may still show a subscription prompt for its built-in agents. Keep that separate from external-agent MCP access and verify the plan wording in the current product before proceeding. A no-subscription MCP route does not mean the external AI client or its model is free.` },
				{ heading: "Start from Neon's MCP connector settings", body: `Opera's March connector announcement describes connecting supported external clients to Neon and approving the requested access in Neon. In the March 2026 instructions, click the MCP icon, choose “Allow AI connection,” then Continue. Choose a preset client or Custom; for Custom, copy the server URL shown by Neon into the external client. If it asks for an authorization type, choose OAuth2. Complete authorization inside Neon and confirm the account before granting access. The current UI may use different labels or URLs, so follow the values shown in your installed version rather than copying an endpoint from an old post. If the external client cannot complete OAuth or does not list the new connection, close the stale prompt and repeat only after checking that both tools support the same MCP transport.` },
				{ heading: "Grant only the access the task needs", body: `The March 2026 setup starts with three read tools enabled: Read tabs, Read page content and Screenshot page. History access and write/action tools are off by default. Check each current permission before authorizing; leave history and write tools off unless the task needs them. If your Neon version offers profiles, use one without unrelated personal or business sessions; otherwise close unrelated tabs. Inspect every requested scope before approval; an MCP connection can expose more than the single page in your current view.` },
				{ heading: "Test the connection with a public page", body: `Before opening a signed-in site, use a public page with no personal information. Ask the client to report the active tab title and one visible detail. Check whether it can see only the selected page or other open tabs too. If the task needs an action, test a reversible action such as opening a new public tab and verify the change yourself.

Do not infer that an authorized connection is limited to read-only access. The scope shown during authorization and the tools exposed by the client determine what it can do. Recheck the browser after the client says an action completed.` },
				{ heading: "Troubleshoot an MCP connection that does not appear", body: `If the client cannot find Neon, check the following in order:

- Confirm you are configuring an MCP client that connects to Neon as a server, not Neon Do's remote-server client.
- Make sure Neon is open and the current account is the one intended for the task.
- Check whether MCP authorization completed in Neon and whether the connection remains listed in both products.
- Review the requested scopes and current transport instructions in the client and Neon UI.
- Restart the client only after noting the exact error and whether authorization succeeded.

Opera says the connector can remain connected while Neon is closed, but the client receives a “browser not available” response until the browser is open. Reopen Neon, then retry a read-only check.` },
				{ heading: "Report failures without sharing browser secrets", body: `For a support report, record Neon and client versions, operating system, the connection direction, plan, whether OAuth completed, the exact error, and which permission scopes were requested. A screenshot should show the MCP status without exposing tabs, account names, tokens or page contents.

Neon exposes a real browser session. If your version offers profiles, use one without unrelated sessions; otherwise close unrelated tabs and sign out of accounts the task does not need. The [Opera Browser Connector guide](/en/guides/opera-browser-connector-chatgpt-permissions/) describes a separate Opera One/GX connection, while [the Neon agent chooser](/en/guides/opera-neon-choose-ai-agent/) covers Neon’s in-browser agent modes. BrowserHub did not install an MCP server, connect an account, or test a client.` },
				{ heading: "Sources and limits", body: `Question context: [Neon MCP setup discussion](https://www.reddit.com/r/OperaNeon/comments/1s9c7bt/anyone_got_the_mcp_connector_going_thoughts_i_see/). Setup and permissions: Opera's [March connector guide](https://blogs.opera.com/news/2026/03/opera-neon-adds-mcp-connector-to-the-browser/) and [March 31 announcement](https://press.opera.com/2026/03/31/opera-neon-adds-mcp-connector/). The [June remote-server guide](https://www.operaneon.com/news/connect-opera-neon-to-mcp-servers) covers Neon as client; the [August plan update](https://blogs.opera.com/news/2026/08/your-ai-agents-can-use-opera-neon-free-of-charge/) covers external MCP/CLI access. Check current scopes; BrowserHub did not test a live connection.` }
			],
			faq: [
				{ question: "Is Opera Neon an MCP server or an MCP client?", answer: "It can be either. This guide covers an external AI client connecting to Neon as the MCP server. Neon Do connecting outward to a remote MCP server is a separate direction." },
				{ question: "Do I need a paid Neon subscription for external MCP?", answer: "Opera's August 2026 update says external MCP and CLI access is available on Free. MCP requires an Opera account; CLI does not. Neon Standard is for Neon-owned AI services." },
				{ question: "Does MCP only let an agent read the current tab?", answer: "Not necessarily. Opera lists tabs, page content, screenshots and browser actions. Check the exact scopes and tools shown by your current client before authorizing." },
				{ question: "Why is Neon missing from my client's server list?", answer: "Confirm the direction, that Neon is open, the correct account is active, the client and browser use the documented MCP setup, and authorization completed." },
				{ question: "What happens if Neon is closed while the MCP client is connected?", answer: "Opera says the connection can remain established, but browser tools return “browser not available” until Neon is reopened." }
			]
		},
		"zh-cn": {
			title: "把外部 AI 客户端连接到 Opera Neon MCP 服务端",
			description: "设置“外部客户端连接 Neon”这一路径，核对账号和 OAuth 提示，并区分只读访问与浏览器操作。",
			category: "AI 浏览器指南",
			content: "Opera Neon 可以将浏览器会话作为 MCP 服务端，供外部 AI 客户端连接。这与用 Neon Do 连接远程服务的 MCP 客户端模式不同。先确认客户端需要哪一个方向，再按 Neon 当前连接界面操作，只批准任务所需权限。Opera 在 2026 年 8 月说明，外部 MCP 可使用 Free 方案，MCP 需要 Opera 账号；Neon 自带 AI 服务另有 Standard 方案要求。",
			sections: [
				{ heading: "先确认 Neon 在 MCP 连接中的角色", body: `MCP 设置可能指向相反的连接方向。

| 连接方向 | Neon 的角色 | 常见用途 |
| --- | --- | --- |
| 外部 AI 客户端 → Neon MCP 服务端 | Neon 暴露当前浏览器会话 | 让外部智能体读取获准的浏览器上下文或执行允许的动作 |
| Neon Do → 远程 MCP 服务端 | Neon 向外连接提供工具的服务 | 让 Neon Do 通过 OAuth 使用远程应用或服务 |

本文介绍第一种。Opera 6 月 5 日的指南介绍第二种，并说明远程服务器功能位于 Neon Do 且使用 OAuth。不要把远程应用网址填入客户端的 Neon 服务端配置，也不要把远程服务当成浏览器端点。` },
				{ heading: "确认套餐与账号条件", body: `Opera 在 2026 年 8 月 14 日说明，外部智能体可通过 MCP 或 CLI 连接 Neon Free。MCP 需要 Opera 账号，CLI 不需要。Neon Standard 则用于 Neon 自带 AI 服务，例如自主浏览、深度研究、Skills、自动化和生成式智能体。

较早的 Neon 页面可能仍显示订阅自带智能体的提示。要把这个要求与外部智能体连接分开，并在操作前查看当前产品措辞。MCP 无需 Neon 订阅，不代表外部 AI 客户端或其模型也免费。` },
				{ heading: "从 Neon 的 MCP 连接设置开始", body: `Opera 2026 年 3 月的说明写明：点击 MCP 图标，选择 “Allow AI connection”，再点 Continue。选择预设客户端或 Custom；选 Custom 时，把 Neon 当前显示的服务端网址复制到外部客户端。若客户端询问授权类型，选择 OAuth2。在 Opera Neon 窗口内完成授权并确认账号。当前界面文字或网址可能变化，以安装版本显示的信息为准，不要照抄旧帖端点。` },
				{ heading: "只批准任务需要的权限", body: `2026 年 3 月的设置说明中，默认启用三项读取工具：Read tabs、Read page content 和 Screenshot page。历史读取及写入/操作工具默认关闭。授权前逐项核对当前权限；任务不需要时，保持历史读取和写入工具关闭。如果当前 Neon 版本提供配置文件，可使用不含其他个人或业务会话的配置文件；否则先关闭无关标签。` },
				{ heading: "先用公开网页验证连接", body: `在打开已登录网站前，找一个不含个人信息的公开页面。让客户端报出活动标签标题和一条可见信息，再核对它能否看到其他打开的标签。如果任务需要操作，可先让它打开一个新的公开标签等可撤销操作，并由你检查变化。

通过授权不代表连接只能读取。实际能力取决于授权界面显示的范围和客户端提供的工具。客户端称操作已完成后，应重新检查浏览器。` },
				{ heading: "客户端中看不到 MCP 连接时的排查顺序", body: `如果客户端没有找到 Neon，按顺序检查：

- 确认正在配置外部客户端连接 Neon 服务端，而不是 Neon Do 连接远程服务器。
- 确认 Neon 已打开，当前账号是执行任务所需的账号。
- 检查是否已在 Neon 完成 MCP 授权，以及两个产品是否都显示连接状态。
- 按客户端和 Neon 当前界面核对权限范围和传输要求。
- 记下准确报错及授权状态后，再重启客户端。

Opera 说明 Neon 关闭时连接可以保持，但客户端会收到 “browser not available” 提示，直到浏览器重新打开。重新打开 Neon 后再做只读检查。` },
				{ heading: "提交问题时不要暴露浏览器凭据", body: `向支持团队报告问题时，记录 Neon 和客户端版本、操作系统、连接方向、套餐、OAuth 是否完成、准确报错和申请的权限。截图应显示 MCP 状态，但不要暴露标签页、账号名称、令牌或页面内容。

Neon 暴露的是实际浏览器会话。如果当前版本提供配置文件，可使用不含无关会话的配置文件；否则先关闭无关标签，并退出任务不需要的账号。[Opera Browser Connector 指南](/zh-cn/guides/opera-browser-connector-chatgpt-permissions/)讨论另一种 Opera One/GX 连接；[Neon Agent 选择指南](/zh-cn/guides/opera-neon-choose-ai-agent/)介绍 Neon 内置智能体模式。BrowserHub 没有安装 MCP 服务、连接账号或测试客户端。` },
				{ heading: "来源与限制", body: `问题背景见 [Neon MCP 连接讨论](https://www.reddit.com/r/OperaNeon/comments/1s9c7bt/anyone_got_the_mcp_connector_going_thoughts_i_see/)。设置及权限见 Opera [3 月连接指南](https://blogs.opera.com/news/2026/03/opera-neon-adds-mcp-connector-to-the-browser/)和[3 月 31 日公告](https://press.opera.com/2026/03/31/opera-neon-adds-mcp-connector/)；[6 月远程服务器指南](https://www.operaneon.com/news/connect-opera-neon-to-mcp-servers)介绍 Neon 作为客户端；[8 月方案更新](https://blogs.opera.com/news/2026/08/your-ai-agents-can-use-opera-neon-free-of-charge/)说明外部 MCP/CLI 权限。请核对当前权限；BrowserHub 未实测连接。` }
			],
			faq: [
				{ question: "Opera Neon 是 MCP 服务端还是客户端？", answer: "两种角色都可以。本文介绍外部 AI 客户端连接 Neon 服务端；Neon Do 向外连接远程 MCP 服务是另一条路径。" },
				{ question: "外部 MCP 需要付费 Neon 订阅吗？", answer: "Opera 的 2026 年 8 月更新称外部 MCP 和 CLI 可使用 Free。MCP 需要 Opera 账号，CLI 不需要。Neon Standard 对应 Neon 自带 AI 服务。" },
				{ question: "MCP 只允许智能体读取当前标签吗？", answer: "不一定。Opera 列出标签、页面内容、截图和浏览器操作。授权前应查看当前客户端申请的具体范围和工具。" },
				{ question: "为什么我的客户端列表里没有 Neon？", answer: "确认连接方向，Neon 是否打开、账号是否正确、客户端与浏览器是否使用兼容的 MCP 设置，以及授权是否完成。" },
				{ question: "MCP 客户端已连接时关闭 Neon 会怎样？", answer: "Opera 说明连接可以保持，但 Neon 关闭时浏览器工具会返回 “browser not available”；重新打开 Neon 后即可再检查。" }
			]
		}
	},
	"chrome-ai-history-find-visited-page": {
		en: {
			title: "Find a page you visited with Chrome's AI history search",
			description: "Use Gemini in Chrome or History search powered by AI to locate a visited page, and check account, sync, region, and local-storage limits.",
			category: "AI browser guides",
			content: "Chrome now documents two AI-assisted ways to find a page you visited. For storage controls on local model files, see [the on-device AI guide](/en/guides/chrome-on-device-ai-storage-controls/). Gemini in Chrome searches synced history for eligible personal accounts. A separate History search powered by AI indexes page content locally only after you enable it, and Google currently limits that feature to the US and English Chrome. Neither path proves what you entered into a form or whether a site accepted it. Use the page result to reopen the original record and check its status.",
			sections: [
				{ heading: "Choose the Chrome history feature available to you", body: `Chrome can help locate a previously visited page through two different AI routes. Its current help pages describe page retrieval, not a record of form fields or agent actions.

| Route | What it searches | Main conditions |
| --- | --- | --- |
| Ask Gemini in Chrome | Chrome history synced to the Google Account | Opt in, latest Chrome, personal account, history sync; not Incognito, work/school accounts or Live chats |
| History search, powered by AI | Page content saved on the device after enabling the setting | US location and English Chrome; only pages visited after enabling; may be unavailable on managed profiles |
| Regular Chrome History | Page entries retained in Chrome history | History covers up to 90 days; Incognito and deleted entries are excluded |

The routes have different eligibility and data coverage. Check which one your installed version offers.` },
				{ heading: "Find an old page with Gemini in Chrome", body: `Google says Gemini in Chrome can search history in everyday language. Open Chrome, choose Ask Gemini, and describe the page you want to rediscover. For example, ask for “the government form I looked at last month about changing an address.” The feature does not require the tab to remain open.

Google lists these conditions: opt in to Gemini in Chrome, use the latest Chrome, sign in with a personal Google Account, and sync Chrome history. It is unavailable in Incognito, on work or school Google Accounts, and in Gemini Live chats. If no result appears, check that Chrome and Gemini use the same account that visited the page and that history sync is enabled.` },
				{ heading: "Use the separate local AI History search", body: `Google also documents History search, powered by AI, in Chrome Settings > AI Innovations. The current help page says it is limited to people in the US using Chrome in English. A managed profile may have it disabled by an organization.

When enabled, Chrome stores page content locally in encrypted form in addition to titles and URLs. It can affect performance. Only pages visited after you turn on the feature can be used by AI-powered history search. To look something up, open History and enter a detailed query with at least two words; Google says the best-match section can show up to three results. Short text may match only a title or URL without AI results.

The page content is captured at visit time, so a later change to the website does not change what that local search uses. Do not assume enabling the feature now will recover older or deleted visits.` },
				{ heading: "Reopen the page and check the actual form record", body: `A history match identifies a page you visited. The Chrome help pages reviewed here do not document the values entered into a form or provide an agent action log, and a visit alone does not confirm that a site accepted a submission. Open the result and look for a confirmation page, a receipt, a submission number, or a record in the site's account area.

If the page was a government service, use its official account or contact route to confirm the status. Do not repeat a submission just because the browser history shows the form page. A visited-page entry is not a submission receipt.` },
				{ heading: "Troubleshoot missing history results", body: `If Gemini in Chrome cannot find a page, check the account used when visiting it and whether history sync was on. Check that you are not in Incognito and that the account is personal rather than work or school. The feature is not available in Gemini Live chats.

If History search powered by AI is missing, check US location, Chrome's English language, the AI Innovations setting and whether a work policy manages the profile. It only searches content from visits after it was enabled. For ordinary History, Google says Chrome retains visited pages for up to 90 days and excludes deleted and Incognito pages. Search results cannot restore a removed record.` },
				{ heading: "Review what Chrome saves and how to turn off history search", body: `The local AI history setting stores page content on the device in encrypted form after you enable it; Google warns this may affect Chrome performance. If you do not want that feature, return to Settings > AI Innovations and turn off History search, powered by AI. Review the current setting description before changing it.

Gemini in Chrome uses a different route based on synced browsing history. Turning off the local AI search setting does not establish that history sync or Gemini history retrieval is disabled. Review their controls separately. For Chrome's local model-file switch, see [the on-device AI storage guide](/en/guides/chrome-on-device-ai-storage-controls/); that switch manages model files, not history search.` },
				{ heading: "Sources and limits", body: `Question context: [reader discussion about finding a visited page](https://www.reddit.com/r/browsers/comments/1wzwmu8/is_there_a_browser_where_the_ai_agent_actually/). Google documents [Gemini history retrieval](https://support.google.com/chrome/answer/16716225?hl=en), a separate [local AI History search](https://support.google.com/chrome/answer/15305774?hl=en), and [regular History limits](https://support.google.com/chrome/answer/95589?hl=en). These pages cover visited-page retrieval, not form-field recovery or submission proof; BrowserHub did not inspect a Chrome profile.` }
			],
			faq: [
				{ question: "Can Chrome AI show what I entered into a form?", answer: "The reviewed Chrome help pages document visited-page retrieval, not a way to retrieve form values or an agent action log." },
				{ question: "Why can't Gemini in Chrome find the page?", answer: "Check that you use the same personal Google Account as when you visited the page and that Chrome history sync is on. The feature is unavailable in Incognito, work or school accounts, and Live chats." },
				{ question: "Does History search powered by AI include pages I visited before enabling it?", answer: "No. Google says only pages visited after enabling the feature can be used by that local AI search." },
				{ question: "Where is Chrome's local AI History search available?", answer: "Google currently lists the US and English Chrome. Managed profiles may have the setting disabled by an organization." },
				{ question: "Does a history result prove I submitted a form?", answer: "No. Reopen the page and check the site's confirmation, receipt, submission number or account record." }
			]
		},
		"zh-cn": {
			title: "用 Chrome AI 历史搜索找回访问过的网页",
			description: "用 Chrome 中的 Gemini 或本地 AI 历史搜索定位旧网页，并核对账号、同步、地区和本地存储条件。",
			category: "AI 浏览器指南",
			content: "Chrome 目前说明了两种借助 AI 找回访问过网页的方式。设备端模型文件的管理可参考[本地 AI 存储指南](/zh-cn/guides/chrome-on-device-ai-storage-controls/)。Gemini in Chrome 会搜索符合条件的个人账号同步历史；另一项 History search, powered by AI 只有在你开启后才会把网页内容保存在本机，目前限美国地区和英文版 Chrome。两种功能都不能证明你在表单里填了什么，或网站是否接收了提交。找到页面后，应重新打开原记录检查状态。",
			sections: [
				{ heading: "先选自己当前可用的 Chrome 历史功能", body: `Chrome 目前有两种 AI 路径可以找回访问过的网页。帮助文档说明的是网页查找，不是表单字段记录或智能体操作日志。

| 路径 | 搜索什么 | 主要条件 |
| --- | --- | --- |
| 在 Chrome 中询问 Gemini | 同步到 Google 账号的 Chrome 历史 | 选择加入、最新版 Chrome、个人账号、开启历史同步；无痕模式、工作或学校账号、Live 对话不可用 |
| History search, powered by AI | 开启后保存在设备上的网页内容 | 美国地区和英文版 Chrome；只查开启后访问的网页；托管配置文件可能被组织禁用 |
| Chrome 普通历史记录 | Chrome 历史中保留的网页记录 | 最长覆盖 90 天；无痕和已删除记录不在其中 |

这些路径的资格条件和数据覆盖范围不同。先确认自己安装的版本提供哪一项。` },
				{ heading: "用 Gemini in Chrome 找以前打开的网页", body: `Google 说，Gemini in Chrome 可以用日常语言搜索浏览历史。打开 Chrome，选择 Ask Gemini，用自然语言描述想找的网页。例如：“上个月看过的那个更改地址的政府表格在哪？”不需要一直保留标签页。

Google 列出的条件包括：选择使用 Gemini in Chrome、更新到最新版 Chrome、登录个人 Google 账号并同步 Chrome 历史。无痕模式、工作或学校 Google 账号以及 Gemini Live 对话中无法使用。如果没有结果，核对 Chrome 和 Gemini 是否使用你访问网页时的同一账号，以及历史同步是否开启。` },
				{ heading: "另一项本地 AI 历史搜索怎么工作", body: `Google 还在 Chrome 设置 > AI Innovations 中提供 History search, powered by AI。当前帮助页说明，此功能限美国地区的英文版 Chrome。组织管理的配置文件可能看不到开关。

开启后，Chrome 会在标题和网址之外，以加密形式将网页内容保存在本机。Google 提醒这可能影响浏览器性能。只有开启后访问的网页才能被 AI 历史搜索使用。查找时打开 History 并输入至少两个词组成的详细问题；Google 表示 Best matches 最多显示三条结果。短词可能只匹配标题或网址，不触发 AI 搜索。

搜索使用访问当时的网页内容。如果网站之后修改，保存在本机的搜索内容不会随之变化。不要假设现在开启就能找回更早或已经删除的访问记录。` },
				{ heading: "重新打开网页，核对表单实际状态", body: `历史匹配结果能帮你找到访问过的网页。所查 Chrome 帮助页没有说明如何查看表单字段或智能体操作日志；仅有访问记录也不能确认网站已接收提交。打开结果后，查看确认页、回执、提交编号，或网站账号中的相关记录。

如果是政府服务页面，应通过其官方账号或联系渠道核实状态。仅仅因为历史中有表单页面，不要重复提交。访问记录不是提交回执。` },
				{ heading: "历史搜索结果缺失时检查什么", body: `如果 Gemini in Chrome 找不到页面，检查访问网页时使用的账号以及当时是否开启历史同步。确认当前不在无痕模式，也不是工作或学校账号。该功能不能在 Gemini Live 对话中使用。

如果看不到 History search powered by AI，核对所在地区、Chrome 是否为英文、AI Innovations 设置和组织管理策略。该功能只搜索开启后访问的网页内容。Google 说普通 Chrome 历史最多保留 90 天，并排除已删除和无痕访问记录。搜索不能恢复已删除记录。` },
				{ heading: "查看 Chrome 保存什么，以及如何关闭本地搜索", body: `开启本地 AI 历史搜索后，Chrome 会把访问时的网页内容以加密形式保存在设备上；Google 提醒这可能影响性能。如果不想使用该功能，可回到 Settings > AI Innovations 关闭 History search, powered by AI。更改前先阅读当前设置说明。

Gemini in Chrome 使用另一条同步历史路径。关闭本地 AI 搜索设置，不代表历史同步或 Gemini 历史查找也已关闭。应分别核对各自的控制项。若要管理 Chrome 本地模型文件，可看[设备端 AI 存储指南](/zh-cn/guides/chrome-on-device-ai-storage-controls/)；该设置管理模型文件，不管理历史搜索。` },
				{ heading: "来源与限制", body: `问题背景见[读者关于找回访问网页的讨论](https://www.reddit.com/r/browsers/comments/1wzwmu8/is_there_a_browser_where_the_ai_agent_actually/)。Google 说明了 [Gemini 历史查找](https://support.google.com/chrome/answer/16716225?hl=en)、[本地 AI 历史搜索](https://support.google.com/chrome/answer/15305774?hl=en)和[普通历史记录范围](https://support.google.com/chrome/answer/95589?hl=en)。这些页面介绍找回访问网页，不涉及表单字段或提交证明；BrowserHub 未检查 Chrome 配置文件。` }
			],
			faq: [
				{ question: "Chrome AI 能显示我在表单里填过什么吗？", answer: "所查 Chrome 帮助页说明了如何找回访问过的网页，没有说明如何查看已填字段或智能体操作日志。" },
				{ question: "为什么 Gemini in Chrome 找不到网页？", answer: "确认当前使用的是访问网页时的同一个个人 Google 账号，并已开启 Chrome 历史同步。无痕模式、工作或学校账号以及 Live 对话不可用。" },
				{ question: "History search powered by AI 会查开启前访问的网页吗？", answer: "不会。Google 说明，该本地 AI 搜索只使用开启后访问的网页。" },
				{ question: "Chrome 本地 AI 历史搜索在哪些地区可用？", answer: "Google 当前列出美国地区和英文版 Chrome。组织管理的配置文件也可能被禁用该设置。" },
				{ question: "历史结果能证明表单已提交吗？", answer: "不能。重新打开页面，检查网站确认页、回执、提交编号或账号记录。" }
			]
		}
	}
};

export const aiCycleTranslations12: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides12: EditorialGuide[] = Object.keys(copies).map((slug) => ({
	...copies[slug]["zh-cn"], slug, date: "2026-11-12", sourcePath: `src/data/ai-cycle-2026-11-12.ts#${slug}`,
	availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
