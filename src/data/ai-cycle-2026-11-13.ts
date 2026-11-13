import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
	"chatgpt-chrome-extension-site-permission-choices": [
		{ title: "ChatGPT Learn: Browser extension and website access", url: "https://learn.chatgpt.com/docs/chrome-extension" },
		{ title: "ChatGPT Learn: Browser context and controls", url: "https://learn.chatgpt.com/docs/browser" },
		{ title: "Reader discussion: ChatGPT using open Chrome tabs", url: "https://www.reddit.com/r/ChatGPT/comments/1x7e3jw/chatgpt_can_now_read_your_open_chrome_tabs_and/" },
		{ title: "MadRobot: ChatGPT extension access and Work mode", url: "https://madrobot.blog/2026/10/16/chatgpt-chrome-extension-read-control-open-tabs-work-mode/" }
	],
	"chatgpt-desktop-site-tools-webmcp": [
		{ title: "ChatGPT Learn: Site tools (WebMCP)", url: "https://learn.chatgpt.com/docs/webmcp" },
		{ title: "OpenAI Developer Community: How site tools work in ChatGPT Desktop", url: "https://community.openai.com/t/how-webmcp-site-tools-currently-work-in-chatgpt-desktop/1403403" },
		{ title: "WebMCP specification", url: "https://webmachinelearning.github.io/webmcp/" },
		{ title: "Chrome for Developers: WebMCP", url: "https://developer.chrome.com/docs/ai/webmcp" },
		{ title: "Promotional developer discussion: WebMCP setup", url: "https://www.reddit.com/r/mcp/comments/1wamhh7/webmcp_is_here_how_to_set_it_up_today/" }
	],
	"dia-sync-between-devices-checklist": [
		{ title: "Dia Sync launch notes", url: "https://www.diabrowser.com/release-notes/1-26-0-sync-is-here" },
		{ title: "Dia Help: Set up Sync", url: "https://browserinc.notion.site/How-to-set-up-Sync-33c612503676806c82bcfba8920ec7e8" },
		{ title: "Dia for Windows 1.3.0 changelog", url: "https://www.diabrowser.com/changelog/windows/1-3-0" },
		{ title: "Dia 1.56 release notes", url: "https://www.diabrowser.com/release-notes/1-56-make-yourself-at-home" },
		{ title: "Reader question: Dia Sync across two machines", url: "https://www.reddit.com/r/diabrowser/comments/1td36tq/dia_sync_not_syncing_at_all/" },
		{ title: "Reader question: tabs across Dia windows", url: "https://www.reddit.com/r/diabrowser/comments/1vhrm3p/tabs_sync_across_windows/" }
	],
	"dia-link-rules-open-links-in-correct-profile": [
		{ title: "Dia 1.56 release notes: link routing", url: "https://www.diabrowser.com/release-notes/1-56-make-yourself-at-home" },
		{ title: "Dia for Mac 1.56.0 changelog: incoming links", url: "https://www.diabrowser.com/changelog/mac/1-56-0" },
		{ title: "Dia for Windows 1.6.0 changelog: Link Rules editor", url: "https://www.diabrowser.com/changelog/windows/1-6-0" },
		{ title: "Dia for Mac 1.57.0 changelog: Link Rules editor", url: "https://www.diabrowser.com/changelog/mac/1-57-0" },
		{ title: "Reader question: Link Rules domain versus page", url: "https://www.reddit.com/r/diabrowser/comments/1xoqikb/dia_browser_for_macos_update_1560_90312/" },
		{ title: "Dia security and profile data", url: "https://www.diabrowser.com/security" }
	],
	"perplexity-comet-gmail-calendar-assistant-setup": [
		{ title: "Perplexity Help: Connect Gmail and Google Calendar", url: "https://www.perplexity.ai/help-center/en/articles/12168040-connecting-perplexity-with-gmail-and-google-calendar" },
		{ title: "Perplexity Help: Troubleshoot connectors", url: "https://www.perplexity.ai/help-center/en/articles/2026091802-troubleshooting-connectors" },
		{ title: "Perplexity Help: Getting started with Comet", url: "https://www.perplexity.ai/help-center/en/articles/11172798-getting-started-with-comet" },
		{ title: "Reader question: Comet and calendar or email access", url: "https://www.reddit.com/r/perplexity_ai/comments/1nhp0cr/" },
		{ title: "Reader question: Comet cannot access Gmail", url: "https://www.reddit.com/r/perplexity_ai/comments/1mue04i/" }
	]
};

const related: Record<string, string[]> = {
	"chatgpt-chrome-extension-site-permission-choices": ["chatgpt-chrome-extension-not-connecting", "ai-browser-tab-access-permissions", "browser-agent-prompt-injection"],
	"chatgpt-desktop-site-tools-webmcp": ["opera-neon-mcp-server-setup", "playwright-mcp-vs-chrome-devtools-mcp", "ai-browser-task-platform-chooser"],
	"dia-sync-between-devices-checklist": ["arc-sunset-migration-data-checklist", "dia-ai-content-data-controls", "comet-import-export-vs-sync"],
	"dia-link-rules-open-links-in-correct-profile": ["arc-sunset-migration-data-checklist", "browser-profile-permissions", "dia-ai-content-data-controls"],
	"perplexity-comet-gmail-calendar-assistant-setup": ["perplexity-comet-google-drive-connector", "ai-browser-meeting-prep-brief", "ai-browser-calendar-timezone-proposal"]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"chatgpt-chrome-extension-site-permission-choices": {
		en: {
			title: "ChatGPT Chrome extension permissions: Choose, review, and revoke access",
			description: "Understand ChatGPT's site prompts, allow and block lists, extension install permissions, and separate browser-history requests before connecting a signed-in profile.",
			category: "AI browser guides",
			content: "ChatGPT's Chrome extension asks for broad browser permissions at installation, then applies separate website and history checks during tasks. For a one-time use on a new site, Allow once avoids saving a host approval. Allow for this site saves a host-level choice. Allow for all sites removes the website prompt across sites and is marked Elevated Risk. These controls do not reduce the extension permissions shown by Chrome. Check which layer you are changing before approving it.",
			sections: [
				{ heading: "Separate the three permission layers", body: `There are three different decisions, and one does not replace the others.

| Layer | What it controls | Where the user sees it |
| --- | --- | --- |
| Browser extension installation | Whether the extension can use capabilities such as page data, tabs, history, bookmarks, downloads, or the debugger | Chrome's extension install prompt and extension details |
| ChatGPT website access | Whether ChatGPT may use a website host during a browser task | The ChatGPT permission prompt and its allowed or blocked website lists |
| Browser history access | Whether ChatGPT may use relevant history entries for a particular request | A separate history prompt in the task |

OpenAI's current extension guide says these browser permissions enable browser workflows, while ChatGPT still applies its own confirmations, settings, allowlist, and blocklist. Accepting the browser's install prompt does not silently approve every site for every task. A ChatGPT site approval does not narrow what Chrome granted to the installed extension.` },
				{ heading: "Pick the website option that matches the task", body: `When ChatGPT asks about a new website, the choice is based on the host, such as example.com. Use the smallest option that still lets you finish the work.

| Choice | Use it when | What changes |
| --- | --- | --- |
| Allow once | You need one read or action on a site you have not approved before | ChatGPT may use that host once; the guide does not promise when it will ask again |
| Allow for this site | You expect to return to this host for repeated work | The host is added to the allowed list so it can be used without asking again |
| Decline | The task does not need that site, or you do not trust the page or account context | The site is not used for the requested task |
| Allow for all sites | Only when you intentionally accept the higher risk for broad browsing | ChatGPT stops asking before using websites |

The site choice is not a one-tab allowlist. The official wording is host-based. Do not assume choosing one tab means every other page on that host is excluded, or that allowing one host exposes only one exact page.` },
				{ heading: "Review and undo saved website choices", body: `In the ChatGPT desktop app, open Settings > Computer Use and select Manage beside the browser. OpenAI documents an allowlist and blocklist for domains, shared across the supported browsers. Removing a host from the allowlist means ChatGPT asks again before using it. Removing a host from the blocklist means ChatGPT may ask again instead of treating it as blocked.

Before clearing a saved choice, check whether a task is still running. Then review the host spelling and make the change at the intended browser entry. The browser toggle in Computer Use controls whether that browser appears in the @-mention menu. Manage changes website permissions. They are separate controls. OpenAI's guide says browsing activity can become part of ChatGPT context and is handled under ChatGPT data controls. Removing a host changes future permission prompts; it does not establish that page text, screenshots, or tool calls already included in a chat are deleted. BrowserHub did not change an account or test the interface in a signed-in profile.` },
				{ heading: "Treat history as a separate, one-request decision", body: `Browser history can include internal URLs, searches, and signed-in activity. OpenAI says ChatGPT asks before using browser history, scopes that access to the request, and does not offer an always-allow history option. A website's allowlist entry does not approve a history lookup.

If the task does not need a past page, decline the history request and provide the page directly instead. If it does, check the requested scope before approving and remove unrelated signed-in tabs from the profile where practical. Page text and history results can become part of the task context, so avoid asking the assistant to copy sensitive material into another destination.` },
				{ heading: "Match the choice to an ordinary task", body: `For a one-time summary of a public article, Allow once is usually enough. For a recurring task on an approved work site, Allow for this site avoids repeating that host prompt. It does not authorize sending a message, changing a setting, or submitting a form. Review any separate confirmation for those actions.

If you want to compare two sites, approve each needed host as the task reaches it. If ChatGPT asks for a host unrelated to the request, decline and check the task instructions. Keep the decision close to the page and action you can see; a broad saved approval can outlast the task that first prompted it.` },
				{ heading: "Check whether the page and prompt match", body: `Before approving, read the host shown in the prompt and compare it with the address bar. Stop if the host is misspelled, uses a look-alike domain, or contains a login page you did not expect. Confirm the active Chrome profile is the one you meant to connect and avoid leaving unrelated mail, banking, or administration pages open.

The extension permission prompt may mention reading or changing data on websites and other browser capabilities. Read the actual prompt for your installed version. OpenAI's feature guide describes the workflow; it does not make a page trustworthy or promise that the assistant will select only a single visible tab. For the general troubleshooting path, see [why ChatGPT Work cannot see Chrome tabs](/en/guides/chatgpt-chrome-extension-not-connecting/).` },
				{ heading: "Sources and limits", body: `OpenAI's [extension guide](https://learn.chatgpt.com/docs/chrome-extension), checked November 13, 2026, documents the site prompts, host lists and history request. Its [browser guide](https://learn.chatgpt.com/docs/browser) describes browser context and setup. A [public discussion observed on November 13](https://www.reddit.com/r/ChatGPT/comments/1x7e3jw/chatgpt_can_now_read_your_open_chrome_tabs_and/) shows that users are still asking what the extension can access; it is not a measurement of product usage. A [competing explainer](https://madrobot.blog/2026/10/16/chatgpt-chrome-extension-read-control-open-tabs-work-mode/) also covers the broad permission announcement. The original publication date of the discussion was not independently confirmed. BrowserHub did not install the extension or inspect a user's browser profile.` }
			],
			faq: [
				{ question: "Does Allow for this site mean one tab only?", answer: "OpenAI describes the choice by website host, such as example.com. Do not treat it as a single-tab grant." },
				{ question: "Can I remove a site I previously allowed?", answer: "Yes. In Settings > Computer Use, select Manage beside the browser and remove the host from the allowed list. OpenAI says ChatGPT will ask again before using it." },
				{ question: "Does allowing a site also approve browser history?", answer: "No. OpenAI documents history as a separate request, scoped to the task, with no always-allow option." },
				{ question: "Does site approval make every browser action safe?", answer: "No. Website access and consequential action confirmations are separate. Check the exact action and destination before approving it." },
				{ question: "Should I choose Allow for all sites?", answer: "Only if you knowingly accept the broader risk. OpenAI marks it Elevated Risk because website prompts stop appearing." }
			]
		},
		"zh-cn": {
			title: "ChatGPT Chrome 扩展权限：如何选择、检查和撤销网站访问",
			description: "在连接已登录的浏览器配置文件前，区分 ChatGPT 网站提示、允许与屏蔽列表、扩展安装权限和单独的历史记录请求。",
			category: "AI 浏览器指南",
			content: "ChatGPT Chrome 扩展在安装时会申请较广的浏览器权限，开始任务后还会分别处理网站访问和历史记录请求。第一次在某个网站上做短任务时，“允许一次”只授予一次网站访问；“允许此网站”会保存按域名控制的选择；“允许所有网站”会取消网站访问提示，OpenAI 将其标为“提升风险”。这些网站选项不会缩小 Chrome 安装扩展时授予的权限。先确认自己要修改的是哪一层。",
			sections: [
				{ heading: "区分三层权限", body: `权限有三层，做出其中一项选择不会替代另外两层。

| 权限层 | 控制什么 | 在哪里看到 |
| --- | --- | --- |
| 浏览器安装扩展权限 | 扩展能否使用网页数据、标签、历史、书签、下载或调试器等能力 | Chrome 安装提示和扩展详情页 |
| ChatGPT 网站访问 | 浏览器任务期间是否允许 ChatGPT 使用某个网站域名 | ChatGPT 权限提示及允许/屏蔽网站列表 |
| 浏览器历史记录 | ChatGPT 是否能在某项请求中使用相关历史条目 | 任务中的单独历史记录提示 |

OpenAI 当前扩展指南说明，浏览器权限用于支持浏览器工作流；ChatGPT 仍会单独使用确认、设置、允许列表和屏蔽列表。接受 Chrome 的安装提示，不等于自动允许 ChatGPT 在每个任务里访问所有网站。ChatGPT 对某个网站的许可，也不会缩小 Chrome 给已安装扩展的权限。` },
				{ heading: "按任务选择网站访问选项", body: `ChatGPT 询问是否使用新网站时，提示按网站主机名判断，例如 example.com。选能完成任务的最小范围。

| 选项 | 适用情形 | 会发生什么 |
| --- | --- | --- |
| 允许一次 | 只需要在一个新网站读取或操作一次 | ChatGPT 可使用该主机一次；官方说明没有承诺何时再次询问 |
| 允许此网站 | 预计以后会在获准的网站反复工作 | 主机名会加入允许列表，之后无需每次询问 |
| 拒绝 | 任务不需要该站点，或你不信任当前页面和账号环境 | 当前任务不会使用该网站 |
| 允许所有网站 | 只有你明确接受广泛浏览带来的风险时 | ChatGPT 不再询问是否使用网站 |

网站选项不是“只允许这一个标签”的控制。官方按网站主机名描述授权。不要假设选择一个标签就会排除同一网站的其他页面，也不要认为授权后只会暴露某个具体网址。` },
				{ heading: "查看并撤销已保存的网站选择", body: `在 ChatGPT 桌面应用打开 Settings > Computer Use，选择浏览器旁的 Manage。OpenAI 说明这里可以管理域名允许列表和屏蔽列表，受支持的浏览器共享这些网站权限。把域名从允许列表移除后，ChatGPT 再使用时会重新询问；从屏蔽列表移除后，ChatGPT 可以重新询问，而不是继续按屏蔽处理。

清理已保存的选择前，先确认没有任务仍在运行。核对主机名，再在预期的浏览器入口操作。Computer Use 中的浏览器开关控制浏览器是否出现在 @ 提及菜单；Manage 修改网站权限。这是两项不同的控制。OpenAI 指南说明，浏览活动进入 ChatGPT 上下文后按 ChatGPT 数据控制处理。移除主机只改变后续网站权限提示，不能据此认定已进入对话的网页文字、截图或工具调用记录会被删除。BrowserHub 没有登录账号或在真实配置文件中更改设置。` },
				{ heading: "把浏览历史当作单独的一次性授权", body: `浏览历史可能包含内部网址、搜索词和已登录活动。OpenAI 说明，ChatGPT 在使用历史记录前会询问，并将访问限定在当前请求；历史记录没有“始终允许”选项。网站在允许列表里，不代表历史查找也已获准。

任务不需要旧页面时，拒绝历史请求，直接提供要看的网页。如果任务确实需要历史，先读清请求范围，并尽量从配置文件中关闭无关的已登录标签。网页内容和历史结果可能进入任务上下文，不要让助手把敏感信息复制到其他目的地。` },
				{ heading: "根据常见任务选择", body: `只需总结一篇公开文章时，“允许一次”通常就够了。若要反复处理一个已批准的工作网站，“允许此网站”可免去重复的域名提示，但不代表你已批准发送消息、改设置或提交表单。这些操作仍应单独检查确认信息。

比较两个网站时，等任务到达各站点后分别授权。如果 ChatGPT 询问了与任务无关的域名，先拒绝并检查任务要求。把许可限制在你看得到的页面和操作范围内；某次任务保存的宽泛授权，可能会一直保留到以后。` },
				{ heading: "核对提示里的域名和页面", body: `批准前读清提示里的主机名，并与地址栏对照。若域名拼写异常、像仿冒网址，或突然出现不预期的登录页，先停止。确认当前 Chrome 配置文件是你准备连接的那个，并尽量关闭无关邮箱、网银和管理后台。

扩展安装提示可能涉及读取或修改网站数据及其他浏览器能力。请以当前安装版本显示的提示为准。OpenAI 的功能指南介绍工作流，并不保证网页可信，也没有承诺助手只会选择单个可见标签。一般连接问题可看[ChatGPT Work 为什么看不到 Chrome 标签页](/zh-cn/guides/chatgpt-chrome-extension-not-connecting/)。` },
				{ heading: "来源与限制", body: `来源核对日期：2026 年 11 月 13 日。OpenAI 的[扩展指南](https://learn.chatgpt.com/docs/chrome-extension)说明网站提示、域名列表和历史记录请求；[浏览器指南](https://learn.chatgpt.com/docs/browser)介绍浏览器上下文和连接方式。11 月 13 日观察到的一条[公开讨论](https://www.reddit.com/r/ChatGPT/comments/1x7e3jw/chatgpt_can_now_read_your_open_chrome_tabs_and/)询问了打开标签页访问范围；该讨论不能测算产品使用情况。另一篇[竞品说明](https://madrobot.blog/2026/10/16/chatgpt-chrome-extension-read-control-open-tabs-work-mode/)也介绍扩展权限。该讨论的原始发布日期未能独立确认。BrowserHub 未安装扩展或检查用户浏览器配置文件。` }
			],
			faq: [
				{ question: "允许此网站是不是只允许一个标签页？", answer: "OpenAI 按网站主机名描述这项选择，例如 example.com。不要把它理解成单个标签授权。" },
				{ question: "可以撤销以前允许的网站吗？", answer: "可以。在 Settings > Computer Use 中选择浏览器旁的 Manage，再从允许列表移除该域名。OpenAI 说明之后使用时会重新询问。" },
				{ question: "允许网站后，ChatGPT 也能查浏览历史吗？", answer: "网站许可本身不授权历史记录；OpenAI 说明历史记录仍需单独批准，也没有始终允许选项。" },
				{ question: "允许网站就说明所有浏览器操作都安全吗？", answer: "不说明。网站访问和有后果的操作确认是两回事。批准前应核对具体操作与目标。" },
				{ question: "应该选允许所有网站吗？", answer: "只有明确接受更广风险时才考虑。OpenAI 将其标为提升风险，因为网站提示将不再出现。" }
			]
		}
	},
	"chatgpt-desktop-site-tools-webmcp": {
		en: {
			title: "ChatGPT Site tools (WebMCP): Why they appear or disappear",
			description: "Check the page, browser, model, and workspace requirements for ChatGPT site tools, inspect what a site exposes, and turn the feature off safely.",
			category: "AI browser guides",
			content: "ChatGPT site tools are website-provided actions that ChatGPT Work or Codex can discover in the ChatGPT desktop app's built-in browser. They are different from connecting a remote MCP server. If the address bar has no Site tools menu, first check the browser surface, supported model, account or workspace policy, and whether the open page actually provides tools. The page and its tools can change when you navigate away.",
			sections: [
				{ heading: "Know which browser surface can use site tools", body: `OpenAI's current guide says site tools run only in the built-in browser in the ChatGPT desktop app. ChatGPT Work and Codex can discover tools when a supported model is selected, the page provides them, and account or workspace browser policy allows access. A normal Chrome extension session, another browser, or a site that has not registered tools does not meet that documented path.

| What you have open | What the documentation supports |
| --- | --- |
| ChatGPT desktop app built-in browser | Site tools may be available when the model, page, account, and policy conditions are met |
| Existing Chrome or Edge profile connected by extension | Browser tasks can use the connected profile, but the Site tools feature is documented only for the built-in browser |
| Website with no registered WebMCP tools | There may be no site-specific tools to show; the agent may still have regular browser capabilities |

Do not infer that a tab mention or extension connection turns every website into a tool-enabled page.` },
				{ heading: "Inspect the tools before asking the agent to use them", body: `Open a site in the built-in browser and look for Site tools in the address bar. Choose Available site tools to inspect the individual actions the page exposes. The current guide describes read and write tools and says tools belong to the page that provides them. Closing that page or navigating away can make those tools unavailable.

Read the action names and descriptions before starting a task. A name such as “read-only” or a tool annotation is not proof that the implementation has no side effects. Check which site and session the tool belongs to, whether the action changes data, and how you will verify the result. If the page changes after the tool is registered, reopen the current list before continuing.` },
				{ heading: "Use a small task to confirm the page context", body: `Start with a low-risk request on the page you can see. Ask the agent to identify the page and list the available site actions without changing anything. If the task needs an edit, ask for a draft or preview first, then compare the proposed change with the page before approving a consequential step.

OpenAI describes a safety review before each tool invocation in the built-in browser. Normal website-access and confirmation rules still apply, including for sending, purchases, deletion, or permission changes. The browser ties each invocation to its originating page and tool registration. These checks reduce risk; they do not make the site's tool definitions or results trustworthy. A generic confirmation should not replace checking what will change.` },
				{ heading: "When no Site tools menu appears", body: `Check the likely causes in order:

- Confirm you are in the ChatGPT desktop app's built-in browser, not a regular Chrome tab or an extension-connected browser.
- Check that the active Work or Codex model supports the feature and that account or workspace policy allows browser use.
- Reload the page and inspect it again. Tools belong to a page and may disappear after navigation or closing the page.
- Check whether the website offers tools. WebMCP is a proposed web standard, not a feature every site already provides.
- If tools are available but a task cannot use them, inspect the current page, the listed action, and any normal site or action confirmation. When available, Recently used > Sources shows the tools and results used in recent tasks.

Do not install a remote MCP server to solve a missing Site tools menu unless the job actually requires a separate server integration. The two connection paths solve different problems.` },
				{ heading: "Turn site tools off or limit the task", body: `OpenAI documents a user control at Settings > Browser > Permissions. Turn off Enable site tools to disable the feature in the built-in browser. A page can still have normal browser content, but its WebMCP tools will not be available through this setting.

You can also narrow a task without changing account settings: use the visible page, ask for an explanation or draft, and stop before the agent changes or sends anything. Treat website-provided tool descriptions and results as untrusted content. If the action is important, inspect the resulting page and check the actual record in the service.` },
				{ heading: "Site tools and MCP solve different connection problems", body: `MCP usually connects an AI application to a local or remote server whose tools can work without an open page. WebMCP lets a website expose predefined actions while you and the agent use the same live page and signed-in session. A site can support both. Site tools do not mean ChatGPT is connected to every site API, and a remote MCP connection does not automatically expose tools from the current page.

For an MCP server setup, use the separate [Opera Neon MCP connection guide](/en/guides/opera-neon-mcp-server-setup/). This page covers the user-side ChatGPT desktop behavior and its controls; it is not a WebMCP implementation tutorial.` },
				{ heading: "Sources and limits", body: `OpenAI's [Site tools guide](https://learn.chatgpt.com/docs/webmcp), checked November 13, 2026, is the current source for the built-in browser, availability checks, safety review, and settings path. The [WebMCP specification](https://webmachinelearning.github.io/webmcp/) and [Chrome developer guide](https://developer.chrome.com/docs/ai/webmcp) describe the proposed web interface, not a promise that every website or browser supports it. An [OpenAI developer-community user question](https://community.openai.com/t/how-webmcp-site-tools-currently-work-in-chatgpt-desktop/1403403), read November 13, asks about current desktop behavior. A separate [developer promotional setup discussion](https://www.reddit.com/r/mcp/comments/1wamhh7/webmcp_is_here_how_to_set_it_up_today/) is recorded as context, not consumer demand or product evidence. BrowserHub did not install a WebMCP-enabled site or run a ChatGPT task.` }
			],
			faq: [
				{ question: "Can I use ChatGPT site tools in a normal Chrome tab?", answer: "OpenAI currently documents Site tools only in the ChatGPT desktop app's built-in browser." },
				{ question: "Why is Site tools missing from the address bar?", answer: "Check the built-in browser, supported model, account or workspace policy, and whether the page actually provides tools." },
				{ question: "Does a read-only tool annotation prove that nothing can change?", answer: "No. OpenAI says website-provided tool definitions are untrusted. Inspect the requested action and verify the result." },
				{ question: "How do I turn Site tools off?", answer: "Open Settings > Browser > Permissions and turn off Enable site tools." },
				{ question: "Is WebMCP the same as a remote MCP server?", answer: "No. WebMCP exposes website actions on the live page. A remote MCP server provides tools through a separate server connection." }
			]
		},
		"zh-cn": {
			title: "ChatGPT Site tools（WebMCP）为什么出现或消失？",
			description: "按页面、浏览器、模型和工作区条件排查 ChatGPT 网站工具，查看网页开放的操作并安全关闭该功能。",
			category: "AI 浏览器指南",
			content: "ChatGPT Site tools 是网站提供的操作入口，ChatGPT Work 或 Codex 可在 ChatGPT 桌面应用内置浏览器中发现这些工具。它与连接远程 MCP 服务器不同。如果地址栏里没有 Site tools，先核对浏览器入口、支持的模型、账号或工作区策略，以及当前页面是否真的提供工具。离开页面后，页面工具也可能随之失效。",
			sections: [
				{ heading: "先确认哪种浏览器入口支持 Site tools", body: `OpenAI 当前指南说明，Site tools 只在 ChatGPT 桌面应用的内置浏览器中运行。ChatGPT Work 和 Codex 在模型受支持、网页提供工具、账号或工作区策略允许浏览器访问时，才能发现网页工具。普通 Chrome 扩展会话、其他浏览器，以及未注册工具的网页，都不是文档描述的路径。

| 当前打开的页面 | 官方说明的情况 |
| --- | --- |
| ChatGPT 桌面应用内置浏览器 | 模型、网页、账号和策略条件满足时可能出现 Site tools |
| 连接了扩展的 Chrome 或 Edge 配置文件 | 可进行浏览器任务，但 Site tools 目前只记录为内置浏览器功能 |
| 没有注册 WebMCP 工具的网页 | 可能没有网页专属工具；智能体仍可能使用普通浏览器能力 |

不要推断提及一个标签页或连接扩展后，所有网站都会变成带工具的网页。` },
				{ heading: "先检查工具，再让智能体调用", body: `在内置浏览器打开网页后，查看地址栏是否有 Site tools。选择 Available site tools，可检查网页提供的具体操作。当前指南说明，工具属于提供它的页面；关闭页面或跳转离开后，工具可能无法继续使用。

开始前读清操作名称和说明。工具叫“只读”，或标记了只读注解，都不能证明实现不会产生副作用。核对工具所属的网站和会话、操作是否会改数据，以及如何确认结果。如果页面状态变了，继续前重新打开工具列表检查。` },
				{ heading: "用低风险任务确认页面上下文", body: `先在当前可见页面上提出低风险请求。让智能体说出页面名称，并列出可用的网站操作，暂时不要改内容。任务需要编辑时，先要草稿或预览，再对照页面检查具体变化，然后才考虑批准有后果的步骤。

OpenAI 说明，内置浏览器会在每次调用工具前执行安全检查。发送内容、购买、删除或更改权限时，普通的网站访问与操作确认仍然有效。浏览器会将每次调用关联到来源页面和工具注册状态。这些检查可以降低风险，不能让网站工具说明或返回结果自动可信。通用的“是否继续”提示也不能代替检查实际变化。` },
				{ heading: "地址栏没有 Site tools 时怎么排查", body: `按以下顺序检查：

- 确认你使用的是 ChatGPT 桌面应用的内置浏览器，不是普通 Chrome 页面或已连接扩展的浏览器。
- 检查 Work 或 Codex 当前模型是否支持，并确认账号或工作区允许浏览器功能。
- 重新加载页面并查看。工具属于具体页面，跳转或关闭后可能消失。
- 确认网站是否提供工具。WebMCP 是一个提议中的网页标准，并非每个网站都已支持。
- 工具可见但任务无法调用时，检查当前页面、已列出的操作和网站自身的确认步骤。若界面提供 Recently used > Sources，可查看近期任务调用的工具及结果。

不要仅为解决 Site tools 菜单缺失而安装远程 MCP 服务器，除非任务实际需要单独的服务器连接。两种连接路径解决的问题不同。` },
				{ heading: "关闭 Site tools 或收窄任务范围", body: `OpenAI 记录的用户设置位于 Settings > Browser > Permissions。关闭 Enable site tools，即可在内置浏览器停用该功能。网页内容仍可以正常浏览，但不能通过此设置使用它的 WebMCP 工具。

不改账号设置也可以把任务范围收窄：只用当前看见的页面，请求解释或草稿，并要求智能体在更改或发送前停止。把网站提供的工具说明和结果当作不可信内容。重要操作完成后，检查页面并在服务账号中核对实际记录。` },
				{ heading: "Site tools 与 MCP 连接解决不同问题", body: `MCP 通常让 AI 应用连接本地或远程服务器，服务器工具可以不依赖某个已打开网页。WebMCP 让网页在你和智能体共同打开的页面及登录状态下，提供预先定义的操作。一个网站可以同时支持两者。Site tools 不表示 ChatGPT 已连接到每个网站 API；远程 MCP 连接也不会自动暴露当前页面的网页工具。

远程 MCP 配置可看单独的 [Opera Neon MCP 连接指南](/zh-cn/guides/opera-neon-mcp-server-setup/)。本文只讲用户侧的 ChatGPT 桌面行为和设置，不是 WebMCP 开发教程。` },
				{ heading: "来源与限制", body: `来源核对日期：2026 年 11 月 13 日。OpenAI 的[Site tools 指南](https://learn.chatgpt.com/docs/webmcp)是内置浏览器、可用条件、安全检查和设置路径的当前来源。[WebMCP 规范](https://webmachinelearning.github.io/webmcp/)和[Chrome 开发者指南](https://developer.chrome.com/docs/ai/webmcp)介绍拟议中的网页接口，并不保证所有网站或浏览器都支持。[OpenAI 开发者社区的用户问题](https://community.openai.com/t/how-webmcp-site-tools-currently-work-in-chatgpt-desktop/1403403)询问桌面版的当前行为；另有一条[开发者宣传性设置讨论](https://www.reddit.com/r/mcp/comments/1wamhh7/webmcp_is_here_how_to_set_it_up_today/)，不作为消费者需求或产品事实依据。BrowserHub 未安装支持 WebMCP 的网页，也未登录 ChatGPT 执行任务。` }
			],
			faq: [
				{ question: "能在普通 Chrome 标签中使用 ChatGPT Site tools 吗？", answer: "OpenAI 当前只说明 ChatGPT 桌面应用内置浏览器支持 Site tools。" },
				{ question: "为什么地址栏没有 Site tools？", answer: "检查内置浏览器、支持的模型、账号或工作区策略，以及当前页面是否提供工具。" },
				{ question: "只读工具注解能证明网页不会变化吗？", answer: "不能。OpenAI 说明网站提供的工具定义不可信。应检查请求的操作并核对结果。" },
				{ question: "怎么关闭 Site tools？", answer: "打开 Settings > Browser > Permissions，关闭 Enable site tools。" },
				{ question: "WebMCP 和远程 MCP 服务器是同一种东西吗？", answer: "不是。WebMCP 暴露当前网页的操作；远程 MCP 服务器通过单独的服务器连接提供工具。" }
			]
		}
	},
	"dia-sync-between-devices-checklist": {
		en: {
			title: "Dia Sync across devices: Pair devices, check profiles, and protect recovery",
			description: "Set up Dia Sync on a second device, check what the official notes confirm, and separate missing tabs from profile or recovery-key problems.",
			category: "AI browser guides",
			content: "Dia Sync pairs profiles, bookmarks, pinned tabs, and tab groups across devices. Its setup uses a recovery kit and a separate device-connection code. Before treating a missing tab or bookmark as a sync failure, check that Sync is on at both ends, that the second device was paired, and that the expected profile exists. Dia says synced data is end-to-end encrypted and readable only by your devices or recovery-kit passphrase. Losing both a machine and the recovery kit leaves no recovery path.",
			sections: [
				{ heading: "Know which problem you are checking", body: `“Sync is not working” can mean that the second device is not paired, a profile is missing, a bookmark has not arrived, or a tab is open in another window. Those are different observations. Write down the source device, target device, profile name, and the exact item you expect to see before changing settings.

Dia says Sync connects browser state across machines and merged matching profiles in the Windows release. Its April launch notes describe setting it up on the first machine, creating a recovery kit, then pairing another machine with a six-character code. The notes do not promise that every browser detail is mirrored instantly or that a specific missing-tab report has one universal fix.` },
				{ heading: "Turn Sync on and save the recovery kit", body: `Use the same Dia account on both devices. On the first machine, open Settings > Sync and turn Sync on (some versions show Set Up Sync). If a privacy-policy prompt appears, review it and continue as appropriate, then create a recovery kit. Store that kit somewhere you can find later, using a location permitted by your own security policy. Do not put it in a public issue, shared chat, or a place that cannot be recovered if the device is lost.

Dia's April 9 release note says the vendor cannot restore data if both the machine and the recovery file are lost. Treat the recovery kit as necessary recovery material, not an optional setup screenshot. If the first device is still available, confirm the kit is safely stored before connecting another one.` },
				{ heading: "Pair the second device using a code from the first", body: `With the first device set up and its recovery kit saved, confirm both devices use the same Dia account. On the second machine, open Settings > Sync and start setup. On the first device, choose Connect Another Device to display a six-character code, then enter that code on the second device. The release note says profiles and bookmarks may take a moment to appear.

Dia's Windows 1.3.0 notes, dated October 22, say Sync connects Windows with Mac and merges matching profiles. That is a dated compatibility statement; check the current release notes for the versions you have installed. Pair the device through the documented interface rather than copying a browser profile folder from one computer to another.` },
				{ heading: "Check which data Sync covers", body: `Dia's Sync setup guide lists Profiles, Bookmarks, Pinned tabs, and Tab groups. It says the data is end-to-end encrypted and can be read only by your devices or by someone with the recovery-kit passphrase. Use the same Dia account on each device. This list describes the items named in the current setup guide; do not extend it to passwords, open sessions, downloads, or every browser preference unless Dia documents those separately.

After pairing, check whether the expected profile appears on both devices. Dia's notes say matching profiles merge in the Windows rollout. If a profile is missing or duplicated, compare the profile name and device version before moving bookmarks or changing account identity. The sources reviewed here do not define every matching rule, so do not rename or delete profiles to force a merge based on guesswork.

Then compare one harmless item, such as a test bookmark or a known pinned tab, and note whether it appears on the other device. A reader discussion about tabs across Dia windows asks about mirroring; that observation is not a product guarantee that open-tab state and cross-device Sync are identical. A tab that is simply open in another window may require a separate handoff rather than waiting for Sync.` },
				{ heading: "Separate cross-device Sync from Arc import", body: `Dia Sync is a connection between Dia devices. Arc import is a one-time copy of selected Arc data into Dia. Sync covers browser-state syncing; the [Dia AI data guide](/en/guides/dia-ai-content-data-controls/) covers separate AI-content controls. The [Arc sunset guide](/en/guides/arc-sunset-migration-data-checklist/) covers which Arc data moves and how to check the import. Importing Arc does not set up ongoing Sync, and pairing Dia devices does not redo the import.

If you migrated from Arc, check the destination Dia profile and the imported items first. Then configure Sync separately on each device. Do not delete Arc or the first Dia machine until the data you need is visible and the recovery kit is available.` },
				{ heading: "If a tab, profile, or bookmark is missing", body: `Use this narrow checklist before disconnecting or resetting anything:

- Confirm Sync is on in Settings > Sync on both devices.
- Confirm the second machine completed pairing with the six-character code.
- Check the profile name and installed Dia version on each device.
- Wait for the expected profile or bookmark to appear, then reload the view once.
- Record which item is absent and whether other items synced.
- Keep the recovery kit and both machines intact while you ask Dia Support about an unresolved gap.

If you see the same bookmark on both devices but one expected tab is missing, report that exact difference. Do not treat the old community reports as proof of a current outage or as a tested fix. Avoid repeatedly disconnecting and reconnecting before you know whether that action affects local state.` },
				{ heading: "Sources and limits", body: `Dia's [Sync setup guide](https://browserinc.notion.site/How-to-set-up-Sync-33c612503676806c82bcfba8920ec7e8), checked November 13, 2026, gives the current scope and encryption details. Its [launch note](https://www.diabrowser.com/release-notes/1-26-0-sync-is-here) documents recovery-kit creation and pairing. The [Windows 1.3.0 changelog](https://www.diabrowser.com/changelog/windows/1-3-0) confirms the dated Windows and Mac rollout and matching-profile merge. A [November 5 release note](https://www.diabrowser.com/release-notes/1-56-make-yourself-at-home) separately says link rules sync; that feature is about where URLs open, not browser-data recovery. Readers have asked about [Sync across machines](https://www.reddit.com/r/diabrowser/comments/1td36tq/dia_sync_not_syncing_at_all/) and [tabs across windows](https://www.reddit.com/r/diabrowser/comments/1vhrm3p/tabs_sync_across_windows/). These older questions are qualitative context, not evidence of a current defect. BrowserHub did not connect Dia devices or test recovery.` }
			],
			faq: [
				{ question: "How do I connect Dia on a second computer?", answer: "Open Settings > Sync on both devices. Dia's launch note says to create a recovery kit on the first device, then use Connect Another Device to generate a six-character code for the second." },
				{ question: "What if I lose the recovery kit?", answer: "Dia says it cannot recover the data if both the machine and recovery kit are lost. Keep the first device and kit available while pairing." },
				{ question: "What does Dia say Sync covers?", answer: "The current setup guide lists Profiles, Bookmarks, Pinned tabs, and Tab groups. It does not establish that every browser preference or sign-in session syncs." },
				{ question: "Does importing Arc turn on Dia Sync?", answer: "No. Arc import is described as a one-time copy. Set up Sync separately on each Dia device." },
				{ question: "Does Dia's Windows version sync with Mac?", answer: "The October 22 Windows 1.3.0 notes say Dia Sync for Windows connects with Mac and merges matching profiles. Check current release notes for your installed versions." }
			]
		},
		"zh-cn": {
			title: "Dia Sync 跨设备同步：配对、核对配置文件并保留恢复方式",
			description: "在第二台设备上设置 Dia Sync，核对官方说明已确认的范围，并区分标签缺失、配置文件问题和恢复材料丢失。",
			category: "AI 浏览器指南",
			content: "Dia 的 Sync 设置指南列出 Profiles、Bookmarks、Pinned tabs 和 Tab groups，并称数据端到端加密，只能由你的设备或持有恢复文件口令的人读取。两台设备须使用同一个 Dia 账号。发现项目缺失时，先核对数据是否属于已列范围、设备是否配对，再检查配置文件。",
			sections: [
				{ heading: "先说清正在检查哪种问题", body: `“同步不工作”可能指第二台设备尚未配对、配置文件未出现、书签未到达，或标签只开在另一扇窗口里。这些观察各不相同。改设置前先记下源设备、目标设备、配置文件名称和具体缺少的内容。

Dia 说 Sync 可以连接不同设备的浏览器状态，Windows 版本说明还提到合并匹配的配置文件。4 月的上线说明介绍：先在第一台设备开启 Sync 并建立恢复文件，再用六字符代码配对另一台。说明没有保证每种浏览器细节都会即时镜像，也没有说某个标签缺失问题有统一修复办法。` },
				{ heading: "开启 Sync 并保存恢复文件", body: `两台设备都要使用同一个 Dia 账号。在第一台设备打开 Settings > Sync 并开启 Sync（有些版本显示 Set Up Sync）。如果出现隐私政策提示，先阅读并按需继续，再创建恢复文件。按自己的安全策略将文件保存在以后能找到的位置。不要把它放进公开问题帖、共享聊天，或设备丢失后无法访问的地方。

Dia 4 月 9 日发布说明提醒，如果设备和恢复文件同时丢失，厂商无法恢复数据。应把恢复文件视作必要的恢复材料，而不是可随手跳过的截图。如果第一台设备还在，先确认恢复文件已安全保存，再连接其他设备。` },
				{ heading: "用第一台设备生成的代码配对第二台设备", body: `确认第一台设备已完成设置、恢复文件已保存，并且两台设备使用同一个 Dia 账号。在第二台设备打开 Settings > Sync 并开始设置；回到第一台设备选择 Connect Another Device，获取六字符代码，再到第二台输入。发布说明说，配置文件和书签可能需要一点时间才会出现。

Dia Windows 1.3.0 的 10 月 22 日说明称，Sync 可连接 Windows 与 Mac，并合并匹配的配置文件。这是当时给出的兼容说明；请根据已安装版本查看当前更新记录。按正式界面完成配对，不要用复制浏览器配置文件夹的方式替代。` },
				{ heading: "先确认同步范围与账号", body: `Dia 的 Sync 设置指南列出 Profiles、Bookmarks、Pinned tabs 和 Tab groups，并称数据端到端加密，只能由你的设备或持有恢复文件口令的人读取。每台设备都要登录同一个 Dia 账号。不要把这份清单扩展成密码、登录会话、下载内容或所有浏览器偏好的同步承诺，除非 Dia 另有说明。

再核对两台设备是否都有预期的配置文件。Dia 说明 Windows 推出版本会合并匹配配置文件。如果缺少或出现重复项，先比较配置文件名称和 Dia 版本，再决定是否移动书签或更改账号。现有来源没有说明所有匹配规则，不要凭猜测改名或删除配置文件来强行合并。

之后挑一项无害内容对照，例如测试书签或已知固定标签，记录它是否在另一台设备出现。读者曾询问不同 Dia 窗口之间是否镜像标签；这类问题不是产品保证，也不能说明窗口间标签和跨设备 Sync 是同一功能。某个标签只在另一窗口打开时，可能需要单独切换或发送，而不是等待 Sync。` },
				{ heading: "区分跨设备 Sync 与 Arc 导入", body: `Dia Sync 是连接不同 Dia 设备；Arc 导入则把选定的 Arc 数据一次性复制到 Dia。Sync 讨论浏览器状态同步；[Dia AI 数据指南](/zh-cn/guides/dia-ai-content-data-controls/)介绍 AI 内容的相关控制。[Arc 停用迁移指南](/zh-cn/guides/arc-sunset-migration-data-checklist/)说明哪些数据可以迁移，以及如何检查导入结果。导入 Arc 不会自动开启持续 Sync，配对 Dia 设备也不会重新执行 Arc 导入。

如果你从 Arc 迁移，先核对目标 Dia 配置文件和导入内容，再分别在各设备设置 Sync。需要的数据和恢复文件都确认可用前，不要删除 Arc 或第一台 Dia 设备。` },
				{ heading: "标签、配置文件或书签缺失时按清单检查", body: `断开或重置前，先逐项核对：

- 确认两台设备 Settings > Sync 中都已开启 Sync。
- 确认第二台已使用六字符代码完成配对。
- 比较两端配置文件名称和 Dia 版本。
- 等待预期配置文件或书签出现，再重新打开一次视图。
- 记录具体缺少的项目，以及其他项目是否已同步。
- 问 Dia 支持前保留恢复文件和两台设备。

如果两端都有某个书签，只有一条预期标签缺失，就按这个确切差异反馈。旧社区问题不能证明当前存在普遍故障，也不是已经测试过的修复方法。还没确认断开会不会影响本地状态前，不要反复断开重连。` },
				{ heading: "来源与限制", body: `来源核对日期：2026 年 11 月 13 日。Dia 的[Sync 设置指南](https://browserinc.notion.site/How-to-set-up-Sync-33c612503676806c82bcfba8920ec7e8)列出同步范围与加密说明；[Sync 上线说明](https://www.diabrowser.com/release-notes/1-26-0-sync-is-here)介绍恢复文件与配对流程。[Windows 1.3.0 更新记录](https://www.diabrowser.com/changelog/windows/1-3-0)确认当时 Windows 与 Mac 的同步发布以及匹配配置文件合并。另有一篇[11 月 5 日更新](https://www.diabrowser.com/release-notes/1-56-make-yourself-at-home)说明链接规则会同步；这是决定 URL 在哪里打开，不是浏览器数据恢复。读者曾询问[多设备 Sync](https://www.reddit.com/r/diabrowser/comments/1td36tq/dia_sync_not_syncing_at_all/)和[不同窗口的标签](https://www.reddit.com/r/diabrowser/comments/1vhrm3p/tabs_sync_across_windows/)。这些旧问题是定性背景，不代表当前故障。BrowserHub 未连接 Dia 设备或测试恢复过程。` }
			],
			faq: [
				{ question: "如何把 Dia 连接到第二台电脑？", answer: "在两台设备打开 Settings > Sync。Dia 上线说明要求先在第一台创建恢复文件，再从 Connect Another Device 获取六字符代码并在第二台输入。" },
				{ question: "恢复文件丢了怎么办？", answer: "Dia 说明设备和恢复文件同时丢失后无法恢复。配对前应保留第一台设备和恢复文件。" },
				{ question: "Dia Sync 会同步哪些数据？", answer: "当前设置指南列出 Profiles、Bookmarks、Pinned tabs 和 Tab groups；没有据此承诺密码、登录会话或所有浏览器偏好都会同步。" },
				{ question: "导入 Arc 会自动开启 Dia Sync 吗？", answer: "不会。Arc 导入被描述为一次性复制。需在每台 Dia 设备上另行设置 Sync。" },
				{ question: "Dia Windows 版能与 Mac 同步吗？", answer: "10 月 22 日的 Windows 1.3.0 说明称，Dia Sync for Windows 可连接 Mac 并合并匹配配置文件。请按当前安装版本核对更新记录。" }
			]
		}
	},
	"dia-link-rules-open-links-in-correct-profile": {
		en: {
			title: "Dia Link Rules: Open work links in the right profile",
			description: "Set up Dia's link-routing rules, check the profile selected for an opened URL, and understand what the current release notes do not specify.",
			category: "AI browser guides",
			content: "Dia Link Rules route incoming links from other apps to the intended profile. The current Windows release puts the editor in the Profiles pane; the November 5 macOS release notes described Settings > Advanced. Dia can suggest a rule after you move a tab between profiles. Public notes do not explain whether rules match a whole domain, a path, or page content. Test with harmless external links and inspect the selected profile before relying on the routing.",
			sections: [
				{ heading: "Use Link Rules for routing, not for Sync recovery", body: `A Link Rule answers a different question from cross-device Sync. Link Rules determine which profile should open a URL. Sync connects Dia data across devices and has its own recovery setup. A profile routing issue should be checked from the link's source and destination profile; a missing bookmark or profile on another device belongs to the Sync path.

Dia's November 5 release note says links open in the profile they are designed for. It also says Dia can learn from a tab move and suggest a rule. The public note does not define every matching condition. Keep the exact URL, current profile, destination profile, and rule you expected in your notes.` },
				{ heading: "Create or review a rule in the Profiles pane", body: `The current Windows 1.6.0 and Mac 1.57.0 changelogs say Link Rules are managed from the Profiles pane, with a simpler editor. Open that pane and review the incoming-link rules. The November 5 macOS release note used Settings > Advanced; if your installed version still shows that path, follow the labels on screen. Menu wording can vary by version.

If Dia suggests a rule after you move a tab, inspect the suggestion before accepting it. A rule can change where future links open. Do not assume the suggestion is limited to the current tab until you read the rule shown in the editor.` },
				{ heading: "Check the URL scope instead of guessing", body: `A reader asked whether Link Rules match only a domain or can be narrower. Dia's public November 5 note does not specify the matching syntax. It says rules route links to a profile and that rules sync across devices; it does not establish that they can target a path, a page title, or page content.

Open the rule editor and read the actual rule shown. If the interface does not expose enough detail to confirm its scope, do not build a security boundary around it. Test with harmless links that differ in the part you think matters, then inspect which profile opened each one. Treat that as a local check, not a guarantee for every URL or source application.` },
				{ heading: "Verify an incoming link with a low-risk URL", body: `Use a public page or a non-sensitive test account. From another application, open one link expected to route to a Dia profile. First confirm the operating system opens Dia for that link; if it launches another browser, check the system's default-link handler before troubleshooting Dia rules. Then check Dia's profile indicator and repeat with a link that should remain in the default profile. Record the source app, URL, browser, and observed profile. The Mac 1.56.0 and 1.57.0 changelogs describe incoming URLs from other apps and the current Profiles-pane editor; do not assume that clicking a link inside an already open webpage follows the same path.

If an enterprise portal, email client, or account site opens in the wrong profile, stop before entering credentials. Confirm the active profile and the rule shown in Settings. Dia's release note describes a feature and its settings path; it does not provide a universal repair for every authentication page. Recheck the actual account before retrying a sign-in.` },
				{ heading: "Know what carries over from Arc", body: `Dia says Link Rules sync across devices and that rules imported from Arc come over as they were. This is useful when moving an existing profile setup, but it does not mean every link preference or every account session was imported. Arc migration is a separate one-time data copy; use the [Arc sunset checklist](/en/guides/arc-sunset-migration-data-checklist/) for the migration inventory.

After import, open Dia's rule editor and inspect a few important rules. Confirm the destination profile exists and that its account is the one intended for that link. Keep Arc available until you have checked the profiles and routing you still need.` },
				{ heading: "If an external link opens in the wrong profile", body: `- Note the source app, exact URL, current Dia version, and profile that opened.
- Check whether Dia created or suggested a rule after moving the tab.
- Open the Profiles pane and inspect Link Rules; use the version-specific path shown in your installed build.
- Compare the rule with the intended destination profile. The public notes do not define domain versus path matching, so do not infer scope from the rule's label alone.
- Test a harmless URL before using the rule with a signed-in work or personal account.

If you cannot determine the rule's exact matching behavior from the current interface, ask Dia Support with a sanitized example URL. Do not include private account names, full query strings, or sensitive session information in a public post.` },
				{ heading: "Sources and limits", body: `Sources checked November 13, 2026. Dia's [November 5 release note](https://www.diabrowser.com/release-notes/1-56-make-yourself-at-home) documents link routing, suggestions after moving a tab, the dated Settings > Advanced path, cross-device rule sync, and Arc import. The [Mac 1.56.0 changelog](https://www.diabrowser.com/changelog/mac/1-56-0) specifies incoming links from other apps; the [Windows 1.6.0 changelog](https://www.diabrowser.com/changelog/windows/1-6-0) and [Mac 1.57.0 changelog](https://www.diabrowser.com/changelog/mac/1-57-0) put the editor in the Profiles pane. A [release-thread question](https://www.reddit.com/r/diabrowser/comments/1xoqikb/dia_browser_for_macos_update_1560_90312/) asks whether rules are domain-only or can be narrower. The public documentation reviewed here does not answer that granularity question. BrowserHub did not test Dia's rule editor or profile routing.` }
			],
			faq: [
				{ question: "Where do I set Dia Link Rules?", answer: "Dia's November 5 release note gives Settings > Advanced. The Windows 1.6.0 and Mac 1.57.0 updates describe managing rules in the Profiles pane; follow the current version's labels." },
				{ question: "Are Link Rules limited to a domain?", answer: "The public release notes reviewed here do not specify domain, path, or page-level matching. Inspect the rule editor and test harmless URLs before relying on a scope." },
				{ question: "Do Link Rules sync to another device?", answer: "Dia's November 5 release note says rules sync across devices. Check the current installed version and inspect the rule on the target device." },
				{ question: "Does importing Arc copy its Link Rules?", answer: "Dia says rules imported from Arc come over as they were. Review the imported rules and destination profiles after migration." },
				{ question: "Can a Link Rule fix a website login problem?", answer: "It can route a URL to a profile, but it does not validate credentials or guarantee an authentication flow. Confirm the profile before entering account details." }
			]
		},
		"zh-cn": {
			title: "Dia Link Rules 链接规则：让工作链接打开到正确配置文件",
			description: "设置 Dia 链接路由规则，检查 URL 打开的目标配置文件，并了解当前更新说明没有交代哪些细节。",
			category: "AI 浏览器指南",
			content: "Dia Link Rules 将其他应用传入的链接路由到预期配置文件。当前 Windows 与 Mac 版把编辑器放在 Profiles 面板；11 月 5 日 macOS 更新说明给出的路径是 Settings > Advanced。移动标签后 Dia 也会建议规则。公开说明没有写清规则按完整域名、路径还是页面内容匹配。用无害的外部链接测试，并在依赖路由前检查目标配置文件。",
			sections: [
				{ heading: "区分链接路由和 Sync 恢复", body: `Link Rules 与跨设备 Sync 解决不同问题。链接规则决定某个 URL 应在哪个配置文件打开；Sync 连接不同设备上的 Dia 数据，并有单独的恢复设置。链接打开错误时，检查来源应用和目标配置文件；另一台设备缺少书签或配置文件，则应按 Sync 路径排查。

Dia 11 月 5 日更新说明称，Link Rules 会把链接路由到预期配置文件；Mac 1.56.0 更新记录说明其他应用传入链接的路由。Dia 也会根据你移动标签的操作学习并建议规则。公开说明没有定义所有匹配条件。记录具体 URL、当前配置文件、预期目标以及现有规则。` },
				{ heading: "在 Profiles 面板中创建或检查规则", body: `当前 Windows 1.6.0 和 Mac 1.57.0 更新记录称，可在 Profiles 面板管理 Link Rules，并使用简化后的编辑器。打开该面板查看传入链接规则。11 月 5 日 macOS 更新说明曾使用 Settings > Advanced；如果当前安装版本仍显示该路径，请按界面实际文字操作。菜单入口可能随版本变化。

移动标签后 Dia 提出规则建议时，先看清规则内容再决定是否接受。规则可能影响以后打开的链接。没读清编辑器中的具体规则前，不要假定它只针对当前标签页。` },
				{ heading: "先核对 URL 范围，不要猜匹配规则", body: `读者曾问 Link Rules 是只按域名匹配，还是可以进一步细分。Dia 11 月 5 日公开说明没有写明匹配语法。它说明规则把链接路由到配置文件、规则会跨设备同步，但没有证实可按路径、页面标题或网页内容匹配。

打开编辑器查看实际规则。如果界面信息不足以确认范围，就不要把它当成安全边界。用几条无害链接测试你关心的差异，再核对每条链接实际打开的配置文件。这只是当前界面的本地检查，不代表所有 URL 或来源应用都会遵循相同方式。` },
				{ heading: "用低风险外部链接核对目标配置文件", body: `先选公开网页或不含敏感资料的测试账号。从另一个应用打开一条预期要路由到 Dia 配置文件的链接。先确认操作系统确实用 Dia 打开；如果启动了其他浏览器，应先检查系统默认链接处理程序，再排查 Dia 规则。然后查看 Dia 的配置文件标识，并再打开一条应留在默认配置文件的链接。记录来源应用、确切 URL、浏览器和实际配置文件。Mac 1.56.0 更新记录说明其他应用传入链接的路由，当前 Windows 1.6.0 与 Mac 1.57.0 更新记录则把编辑器放在 Profiles 面板；不要假定网页内部链接也走同一路径。

企业门户、邮件或账户网页跳到错误配置文件时，先停止，不要输入凭据。确认当前配置文件及 Settings 中显示的规则。Dia 更新说明介绍功能和设置入口，没有提供适用于所有登录页面的通用修复。再次登录前要核对实际账号。` },
				{ heading: "了解从 Arc 迁移哪些规则", body: `Dia 说 Link Rules 会在设备间同步，从 Arc 导入的规则也会原样带过来。这对迁移已有配置有用，但不代表每项链接偏好或账号会话都已导入。Arc 迁移是单独的一次性数据复制，可按[Arc 停用迁移清单](/zh-cn/guides/arc-sunset-migration-data-checklist/)核对项目。

导入后在 Dia 规则编辑器检查几条重要规则，确认目标配置文件存在，而且账号与该链接用途相符。核对完所需的配置文件和路由前，先保留 Arc。` },
				{ heading: "外部链接打开到错误配置文件时怎么查", body: `- 记录来源应用、确切 URL、Dia 版本和打开链接的配置文件。
- 查看移动标签后 Dia 是否创建或建议了规则。
- 打开 Profiles 面板检查 Link Rules；按当前安装版本的界面入口操作。
- 将现有规则与目标配置文件比较。公开说明没有定义按域名还是路径匹配，不要只看标签名称就推断范围。
- 把规则用于已登录工作或个人账号前，先用无害 URL 测试。

当前界面若无法说明确切匹配范围，可用脱敏 URL 向 Dia 支持询问。不要在公开帖子中附上私人账号名称、完整查询参数或会话信息。` },
				{ heading: "来源与限制", body: `来源核对日期：2026 年 11 月 13 日。Dia 的[Mac 1.57 更新记录](https://www.diabrowser.com/changelog/mac/1-57-0)与[11 月 5 日更新说明](https://www.diabrowser.com/release-notes/1-56-make-yourself-at-home)介绍链接路由、移动标签后的建议、当时的 Settings > Advanced 路径、跨设备规则同步和 Arc 导入。[Mac 1.56.0 更新记录](https://www.diabrowser.com/changelog/mac/1-56-0)说明其他应用传入链接的路由；[Windows 1.6.0 更新记录](https://www.diabrowser.com/changelog/windows/1-6-0)和[Mac 1.57.0 更新记录](https://www.diabrowser.com/changelog/mac/1-57-0)将编辑器放在 Profiles 面板。[更新讨论区](https://www.reddit.com/r/diabrowser/comments/1xoqikb/dia_browser_for_macos_update_1560_90312/)有读者询问规则是仅按域名还是可以进一步细分。本文核对的公开资料没有回答匹配范围。BrowserHub 未测试 Dia 规则编辑器或配置文件路由。` }
			],
			faq: [
				{ question: "在哪里设置 Dia Link Rules？", answer: "Windows 1.6.0 和 Mac 1.57.0 更新记录给出的路径是 Profiles 面板。11 月 5 日更新说明曾使用 Settings > Advanced；请按当前版本界面操作。" },
				{ question: "Link Rules 只能按域名匹配吗？", answer: "当前核对的公开更新说明没有写清域名、路径或页面级匹配方式。依赖前先查看编辑器并用无害 URL 测试。" },
				{ question: "Link Rules 会同步到另一台设备吗？", answer: "Dia 11 月 5 日更新说明称规则会跨设备同步。应检查目标设备上的当前版本和实际规则。" },
				{ question: "从 Arc 导入时会复制链接规则吗？", answer: "Dia 表示从 Arc 导入的规则会原样带过来。迁移后应检查规则及其目标配置文件。" },
				{ question: "链接规则能解决网站登录问题吗？", answer: "它可以把 URL 路由到配置文件，但不会验证凭据，也不保证登录流程正常。输入账号信息前先核对配置文件。" }
			]
		}
	},
	"perplexity-comet-gmail-calendar-assistant-setup": {
		en: {
			title: "Connect Gmail and Calendar to Comet: Scope, tasks, and checks",
			description: "Set up Perplexity's Gmail and Google Calendar connector for Comet, inspect its broad OAuth scopes, and separate queries from send or create actions.",
			category: "AI browser guides",
			content: "Perplexity's Gmail and Google Calendar connector can query email and calendar data, and Perplexity says Comet's Assistant can also send email or create events. The Google consent screen requests more than read-only access, including Gmail compose/send and calendar event editing. Connect it only if those scopes fit your task, then select the connector in the task where needed. The connector currently queries one primary calendar, even though its permissions are broader.",
			sections: [
				{ heading: "Decide whether the connector is needed", body: `A signed-in Gmail tab and a connected Perplexity connector are different routes. The connector lets Perplexity query account data from its own interface; opening Gmail in Comet does not connect the account. Use the connector when you need the assistant to search email or calendar information. Use the ordinary page when you need to inspect a specific message yourself.

Perplexity's current help page says the Gmail and Google Calendar connector can query email and calendar events. It currently supports queries against one primary calendar, not multiple or secondary calendars. For Comet, the same page says Assistant can create calendar events or send emails. Check the feature in your installed account before planning a task around it.` },
				{ heading: "Review the OAuth scopes before connecting", body: `The consent request is broader than read-only search. Perplexity lists access to contacts and the organization directory, calendar subscriptions and availability, viewing and editing events on all calendars, and reading, composing, and sending Gmail messages.

Read the actual Google consent screen and compare it with the task you intend to run. If you only want a meeting summary, consider whether the connector's full requested scope is acceptable for your account. Do not approve it on a shared or unapproved account merely because a task needs one calendar event. For a work or school account, check administrator policy first.` },
				{ heading: "Connect the account in Perplexity", body: `Perplexity's current instructions say to open Plugins in the sidebar, or Customize > Connectors if Plugins is not shown. Find Gmail and Google Calendar in Discover or search for the connector, open its page, and select Connect. Sign in to the intended Google account, review the scopes, and approve only if they fit the task. Return to Perplexity and check that the connector shows Connected.

The connection is account-level and can appear inside a plugin. Perplexity says connecting it in one place connects it for the account everywhere, subject to the organization's connector settings. That does not mean every chat or Comet task automatically uses the connector; check the task's source or connector picker.` },
				{ heading: "Select the connector for the task you are running", body: `A connected status confirms the account connection, not that the current task includes it. Perplexity's current troubleshooting guidance says some surfaces require selecting a connector in the composer or using an @ mention. In Computer, a connector can be selected from the plugin menu. A Web-only or other source filter can prevent connected apps from being used.

For Comet, start with a narrow read request such as finding one email by sender and date or listing events from the primary calendar. Ask the assistant to identify which source it used. Do not start by asking it to send a message or edit an event; verify that search works before considering a separate write action.` },
				{ heading: "Keep query access separate from sending or editing", body: `The connector grants Gmail compose and send permissions and calendar event-edit permissions. Perplexity says Comet Assistant can use the connector to send email and create events. Treat those as separate actions from reading search results.

Before a send, inspect the recipient, subject, full body, and attachments in the actual draft. Before creating an event, check the primary calendar, date, time zone, attendees, and recurrence. If an action returns an error or times out, open Gmail or Calendar to see whether it succeeded before asking the assistant to retry. A failed response does not prove that a write did not occur.` },
				{ heading: "Understand calendar and account limits", body: `The current connector page says it can query one primary calendar; it cannot query several or secondary calendars. Permissions to view or edit events across calendars should not be mistaken for query coverage. If the event you need is not on the primary calendar, use the approved account interface to inspect it or choose a documented alternative.

Perplexity says the connection is personal to the account, so another organization member cannot use it to query your inbox or calendar. If you ask in a shared session, however, people who can access that session can see the answers. The page's enterprise security statements apply to Enterprise organizations; do not apply those statements to every personal account. Follow the current account and workspace controls.` },
				{ heading: "If the connector is missing, disconnected, or ignored", body: `Check the following before repeating OAuth:

- Confirm the Perplexity account and Google account are the ones you meant to connect.
- Open Plugins > Installed or Customize > Connectors and check the connection state.
- If missing, confirm plan, surface, and administrator availability; then use the current Connect flow.
- If connected but ignored, select it in the task composer or source picker and check that the task is not filtered to Web-only.
- If the Google authorization window closes, allow required pop-ups and cookies or retry once from a clean authorization flow.
- After a send or create error, inspect the provider account before retrying the write.

Perplexity's general connector troubleshooting page covers OAuth, reauthorization, task selection, provider errors, and organization restrictions. It is not proof that every issue is fixed by reconnecting. For Google Drive-specific scope and picker failures, see the separate [Comet and Drive guide](/en/guides/perplexity-comet-google-drive-connector/).` },
				{ heading: "Sources and limits", body: `Perplexity's [Gmail and Calendar connector guide](https://www.perplexity.ai/help-center/en/articles/12168040-connecting-perplexity-with-gmail-and-google-calendar), last modified November 13, 2026, describes scope, setup, one-primary-calendar query coverage, and Comet actions. Its [connector troubleshooting guide](https://www.perplexity.ai/help-center/en/articles/2026091802-troubleshooting-connectors) explains account, task selection, and retry checks. The [Comet getting-started page](https://www.perplexity.ai/help-center/en/articles/11172798-getting-started-with-comet) identifies Comet's browser and assistant surfaces. Two older [reader questions](https://www.reddit.com/r/perplexity_ai/comments/1nhp0cr/) and [another access report](https://www.reddit.com/r/perplexity_ai/comments/1mue04i/) are evergreen context, not evidence of a current outage. BrowserHub did not connect an account or send email/create an event.` }
			],
			faq: [
				{ question: "Can Comet search my Gmail and calendar?", answer: "Perplexity's current connector guide says it can query Gmail and calendar events. It currently queries one primary calendar, not multiple or secondary calendars." },
				{ question: "Is the Gmail and Calendar connector read-only?", answer: "No. The documented OAuth scopes include Gmail compose/send and calendar event editing. Review the consent screen before connecting." },
				{ question: "Does Connected mean every Comet task uses my calendar?", answer: "No. Some Perplexity surfaces require selecting the connector in the composer, using an @ mention, or choosing it from a source menu." },
				{ question: "Can a shared session reveal my connector results?", answer: "Perplexity says the connection is personal to your account, but people who can access a shared session can see its responses." },
				{ question: "Should I retry if sending an email times out?", answer: "Check Sent and the draft in Gmail first. The connector's response error does not prove that the message was not sent." }
			]
		},
		"zh-cn": {
			title: "Comet 连接 Gmail 和 Google Calendar：权限、任务与核对步骤",
			description: "为 Comet 设置 Perplexity Gmail/Calendar 连接器，检查较广的 OAuth 权限，并区分查询与发送或创建操作。",
			category: "AI 浏览器指南",
			content: "Perplexity 的 Gmail 和 Google Calendar 连接器可以查询邮件与日历；Perplexity 还说明 Comet Assistant 能发送邮件或创建事件。Google 授权范围不只是只读，包括 Gmail 撰写/发送和日历事件编辑权限。只有这些范围适合当前任务时才连接，并在需要的任务中选择连接器。当前连接器只查询一个主日历，尽管授权范围更广。",
			sections: [
				{ heading: "先判断是否需要连接器", body: `在 Gmail 标签页登录，与通过 Perplexity 连接器访问账号数据是两条不同路径。连接器让 Perplexity 从自己的界面查询账号信息；在 Comet 打开 Gmail 网页不会自动连接账号。需要助手查找邮件或日历时用连接器；如果要亲自检查一封具体邮件，可以直接打开普通网页。

Perplexity 当前帮助页说明，Gmail 和 Google Calendar 连接器可以查询邮件与日历事件。它目前只支持查询一个主日历，不支持多个或次要日历。同一页面还说 Comet Assistant 可以创建日历事件或发送邮件。依赖该能力前，请在当前安装版本和账号中确认入口。` },
				{ heading: "连接前检查 OAuth 授权范围", body: `授权请求不只是只读搜索。Perplexity 列出的范围包括查看联系人和组织通讯录、管理日历订阅与空闲情况、查看并编辑所有日历事件，以及读取、撰写和发送 Gmail 邮件。

阅读实际 Google 授权页面，将权限与任务对照。如果你只想总结一次会议，先判断是否接受连接器要求的完整范围。不要只因为任务提到一个日历事件，就在共享或未经批准的账号上授权。工作或学校账号应先检查管理员策略。` },
				{ heading: "在 Perplexity 中连接账号", body: `Perplexity 当前说明：从侧栏打开 Plugins；若没有该项，则选择 Customize > Connectors。在 Discover 中查找 Gmail and Google Calendar，或直接搜索连接器名称，打开页面后选择 Connect。登录预期使用的 Google 账号，阅读权限范围，确认符合任务后再批准。回到 Perplexity，检查状态是否显示 Connected。

这个连接属于账号级设置，也可以出现在插件内。Perplexity 说明，在一个入口连接后，同一账号其他入口也会复用该连接，但仍受组织设置控制。这不代表每个聊天或 Comet 任务都会自动使用它；要检查任务的来源选择器或连接器菜单。` },
				{ heading: "在当前任务里选择连接器", body: `显示 Connected 只能证明账号连接状态，不代表当前任务包含日历。Perplexity 当前排错说明，有些界面需要在任务编辑器选择连接器或使用 @ 提及；Computer 中可以从插件菜单选择。若来源过滤器设为 Web-only 或其他限制，也可能屏蔽连接应用。

在 Comet 中先试一个范围小的只读问题，例如按发件人和日期找一封邮件，或列出主日历中的事件。请助手说明用了哪个来源。搜索能正常返回前，不要直接要求发送邮件或编辑事件；先确认读取路径，再考虑单独的写入操作。` },
				{ heading: "把查询与发送或编辑分开", body: `连接器会申请 Gmail 撰写/发送和日历事件编辑权限。Perplexity 说明 Comet Assistant 可以通过连接器发邮件或创建事件。这些是读取搜索结果之外的独立操作。

发送前，在实际草稿中检查收件人、主题、正文和附件。创建事件前核对主日历、日期、时区、参会者和重复规则。若操作报错或超时，先打开 Gmail 或 Calendar 检查是否已经成功，再决定是否重试。助手没有收到成功响应，并不证明写入没有发生。` },
				{ heading: "了解日历和账号范围", body: `当前连接器帮助页称，它只能查询一个主日历，不能查询多个或次要日历。即使 OAuth 授权可以查看或编辑多个日历，也不能据此认为查询覆盖范围相同。如果目标事件不在主日历，应使用已获准的账号界面检查，或选有文档说明的其他路径。

Perplexity 说连接按个人账号建立，同一组织其他成员不能借此查询你的收件箱或日历。但如果你在共享会话里提问，能访问该会话的人可以看到回答。页面中的企业安全承诺只适用于 Enterprise 组织，不能套用到所有个人账号。按当前账号和工作区控制操作。` },
				{ heading: "连接器缺失、断开或任务未使用时怎么查", body: `重复 OAuth 前先检查：

- 确认 Perplexity 和 Google 账号都是预期账号。
- 打开 Plugins > Installed 或 Customize > Connectors，检查连接状态。
- 连接器缺失时，核对套餐、界面入口和管理员可用性，再按当前 Connect 流程操作。
- 显示已连接但回答未使用时，在任务编辑器或来源选择器中选择连接器，并确认没有设为 Web-only。
- Google 授权窗口关闭时，检查弹窗和 Cookie 设置，必要时只重试一次全新授权流程。
- 发送或创建操作报错后，先检查服务端账号，再决定是否重试写入。

Perplexity 通用连接器排错页面介绍了账号、任务选择、OAuth 重新授权、服务商错误和组织限制。它并没有证明每个问题都能靠重新连接解决。Google Drive 的授权范围和文件选择器故障见单独的 [Comet 与 Drive 指南](/zh-cn/guides/perplexity-comet-google-drive-connector/)。` },
				{ heading: "来源与限制", body: `Perplexity 的[Gmail 和 Calendar 连接器说明](https://www.perplexity.ai/help-center/en/articles/12168040-connecting-perplexity-with-gmail-and-google-calendar)最后修改于 2026 年 11 月 13 日，介绍了授权范围、连接步骤、单个主日历查询限制和 Comet 操作。[连接器排错指南](https://www.perplexity.ai/help-center/en/articles/2026091802-troubleshooting-connectors)介绍账号、任务选择和重试检查；[Comet 入门页](https://www.perplexity.ai/help-center/en/articles/11172798-getting-started-with-comet)说明 Comet 浏览器与 Assistant 入口。两条[较早的读者问题](https://www.reddit.com/r/perplexity_ai/comments/1nhp0cr/)和[访问报告](https://www.reddit.com/r/perplexity_ai/comments/1mue04i/)只作长期问题背景，不代表当前故障。BrowserHub 未连接账号、发送邮件或创建事件。` }
			],
			faq: [
				{ question: "Comet 能搜索 Gmail 和日历吗？", answer: "Perplexity 当前连接器说明称可以查询 Gmail 与日历事件。目前只查询一个主日历，不支持多个或次要日历。" },
				{ question: "Gmail 和 Calendar 连接器是只读的吗？", answer: "不是。说明中的 OAuth 范围包括 Gmail 撰写/发送和日历事件编辑。连接前应阅读授权页面。" },
				{ question: "显示 Connected 就说明每个 Comet 任务都会使用日历吗？", answer: "不会。有些 Perplexity 界面需要在任务编辑器选择连接器、使用 @ 提及或从来源菜单选择。" },
				{ question: "共享会话会显示我的连接器结果吗？", answer: "Perplexity 说连接属于个人账号，但能访问共享会话的人可以看到该会话回答。" },
				{ question: "发送邮件超时后要不要马上重试？", answer: "先检查 Gmail 的已发送邮件和草稿。连接器报错不能证明邮件没有发出。" }
			]
		}
	}
};

export const aiCycleTranslations13: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides13: EditorialGuide[] = Object.keys(copies).map((slug) => ({
	...copies[slug]["zh-cn"], slug, date: "2026-11-13", sourcePath: `src/data/ai-cycle-2026-11-13.ts#${slug}`,
	availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
