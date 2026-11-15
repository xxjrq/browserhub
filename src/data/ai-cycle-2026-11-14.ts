import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
	"brave-leo-chat-history-sync-and-cleanup": [
		{ title: "Brave Browser Privacy Policy", url: "https://brave.com/privacy/browser/" },
		{ title: "Brave Help: Chat History in Leo", url: "https://support.brave.app/hc/en-us/articles/32663367857549-How-do-I-use-Chat-History-in-Brave-Leo" },
		{ title: "Brave Help: Leo customization and memory", url: "https://support.brave.app/hc/en-us/articles/38441287509261-How-do-I-use-Leo-customization-and-memory-features" },
		{ title: "Brave Leo product page", url: "https://brave.com/leo/" },
		{ title: "Brave Sync FAQ", url: "https://support.brave.app/hc/en-us/articles/360047642371-Sync-FAQ" },
		{ title: "Brave issue: Leo conversations and Sync", url: "https://github.com/brave/brave-browser/issues/53978" },
		{ title: "Reader report: Leo instructions and lost local history", url: "https://community.brave.app/t/issue-with-instructions-from-leo-ai/658319" }
	],
	"brave-leo-multi-tab-context-and-sidebar": [
		{ title: "Brave Help: Multi Tab Context with Leo", url: "https://support.brave.app/hc/en-us/articles/38614934646029-How-to-Use-Multi-Tab-Context-with-Brave-Leo" },
		{ title: "Brave Desktop release notes", url: "https://github.com/brave/brave-browser/blob/master/CHANGELOG_DESKTOP.md" },
		{ title: "Brave Browser Privacy Policy", url: "https://brave.com/privacy/browser/" },
		{ title: "Brave Help: Leo customization and memory", url: "https://support.brave.app/hc/en-us/articles/38441287509261-How-do-I-use-Leo-customization-and-memory-features" },
		{ title: "Reader question: persistent Leo sidebar across tabs", url: "https://www.reddit.com/r/brave_browser/comments/1vdyy3d/leo_now_functioning_across_tabs_how_to_go_back_to/" },
		{ title: "Brave Community: Leo stalls with page context enabled", url: "https://community.brave.app/t/leo-ai-stuck-on-thinking-when-page-context-is-enabled-in-brave-stable-v1-97-56-works-perfectly-in-beta/659461" }
	],
	"comet-ios-assistant-current-tab-and-tabs": [
		{ title: "Comet on the App Store", url: "https://apps.apple.com/us/app/comet-ai-browser-assistant/id6748622471" },
		{ title: "Perplexity: Meet Comet for iOS", url: "https://www.perplexity.ai/en-GB/hub/blog/meet-comet-for-ios" },
		{ title: "Perplexity: Comet iOS launch", url: "https://www.perplexity.ai/changelog/what-we-shipped--march-27-2026" },
		{ title: "Perplexity: Comet Voice Mode improvements", url: "https://www.perplexity.ai/en-GB/changelog/comet-voice-mode-improvements" },
		{ title: "Reader discussion: Comet for iOS", url: "https://www.reddit.com/r/cometbrowser/comments/1trfbwi/is_anyone_satisfied_with_the_ios_version_of_comet/" }
	],
	"dia-site-search-shortcuts-troubleshooting": [
		{ title: "Dia product updates", url: "https://www.diabrowser.com/changelog" },
		{ title: "Dia Mac 1.41.0: Search engine labels", url: "https://www.diabrowser.com/changelog/mac/1-41-0" },
		{ title: "Dia Mac 1.14.0: Extension search shortcuts", url: "https://www.diabrowser.com/changelog/mac/1-14-0" },
		{ title: "Dia Mac 1.22.0: Chat and Search shortcuts", url: "https://www.diabrowser.com/release-notes/1-22-0-dont-think" },
		{ title: "Reader question: Dia search-engine shortcuts", url: "https://www.reddit.com/r/diabrowser/comments/1xnro2c/search_engine_shortcuts/" },
		{ title: "Community guide: Dia site search", url: "https://www.reddit.com/r/diabrowser/comments/1rq7f5u/guide_dia_does_have_site_search/" }
	],
	"brave-leo-web-search-vs-ask-brave": [
		{ title: "Brave Help: How Leo gets current information", url: "https://support.brave.app/hc/en-us/articles/27586048343309-How-does-Leo-get-current-information" },
		{ title: "Brave Help: Leo AI model differences", url: "https://support.brave.app/hc/en-us/articles/26727364100493-What-are-the-differences-between-Leo-s-AI-Models" },
		{ title: "Brave Help: Use Skills in Leo", url: "https://support.brave.app/hc/en-us/articles/41599880226317-How-do-I-use-Skills-in-Brave-Leo" },
		{ title: "Brave Search Help: AI in Search", url: "https://search.brave.com/help/ai" },
		{ title: "Brave: Introducing Ask Brave", url: "https://brave.com/whats-new/ask-brave/" },
		{ title: "Reader question: inconsistent Leo web search", url: "https://community.brave.app/t/leo-ai-premium-inconsistent-web-search-access/647408" }
	]
};

const related: Record<string, string[]> = {
	"brave-leo-chat-history-sync-and-cleanup": ["brave-leo-byom-local-vs-hosted", "comet-assistant-history-data-controls", "dia-ai-content-data-controls"],
	"brave-leo-multi-tab-context-and-sidebar": ["ai-browser-tab-access-permissions", "browser-agent-tabs-popups", "brave-leo-byom-local-vs-hosted"],
	"comet-ios-assistant-current-tab-and-tabs": ["comet-control-browser-missing", "comet-voice-mode-context-navigation", "comet-import-export-vs-sync"],
	"dia-site-search-shortcuts-troubleshooting": ["dia-link-rules-open-links-in-correct-profile", "dia-skills-create-edit-reuse", "comet-query-shortcuts"],
	"brave-leo-web-search-vs-ask-brave": ["ai-browser-vs-ai-search-engine", "brave-leo-byom-local-vs-hosted", "brave-leo-multi-tab-context-and-sidebar"]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"brave-leo-chat-history-sync-and-cleanup": {
		en: {
			title: "Brave Leo chat history: Find, preserve, and clear conversations",
			description: "Find Leo chats, understand the current conditional Sync statement, and check what a cleanup action removes before clearing Brave data.",
			category: "AI browser guides",
			content: "Brave Leo chat history has local storage and deletion controls, while Brave's current privacy policy says conversations are included in Sync if that option is enabled. Brave's older Help article still says chat history is local only, so check your installed browser before relying on cross-device sync. Before clearing browsing data, find any conversations you need and read the exact cleanup option. Brave does not document a recovery guarantee for deleted chats.",
			sections: [
				{ heading: "Find an earlier Leo conversation", body: `Brave documents two routes to chat history. Open brave://leo-ai to use the full-page view and browse the conversation list on the left. Or open Leo from the sidebar, choose the three-dot menu, then Conversation History. Select a conversation to review it or continue it.

This is Leo conversation history, not ordinary browser history. A page visit can disappear from your browsing history while a conversation remains, and a conversation can include page text that is affected by later data cleanup. Keep those records separate when deciding what to remove.` },
				{ heading: "Read Brave's current Sync statement carefully", body: `Brave's Browser Privacy Policy, updated September 23, 2026, says Leo conversations are stored locally and, if enabled, are securely included in Sync. It also says clearing browsing history removes associated webpage content from past conversations.

The Chat History Help article still says conversations are stored only on the device and not on Brave servers. That statement conflicts with the newer privacy policy. Brave's Sync FAQ explains encrypted Sync chains, but it does not specifically confirm Leo history availability in every current desktop or mobile build. A GitHub issue about the Leo Sync checkbox remained open without a milestone when checked for this guide.

Use the newer privacy policy for Brave's stated policy, then inspect the settings in the exact build and platform you use. This documentation review cannot confirm that a Sync control has reached every stable release or that it is enabled on your device.` },
				{ heading: "Check the installed controls before cleanup", body: `Open Settings > Leo and look for Store my conversation history, Clear Leo data, or any history Sync control shown in your installed build. The official Help article documents Store my conversation history and Clear Leo data. A separate Leo customization and memory article says Clear Leo data also removes customization and memories. If your screen differs, use settings search or the Help link for your version rather than assuming a control exists.

If a Leo answer matters, copy the useful response and original page URL into a record you control, then confirm the saved copy is readable before changing browser data. This is a manual reference copy, not a Leo archive or a way to restore the conversation inside Brave. The public sources reviewed here do not document a reliable export or restore path.` },
				{ heading: "Know what each clearing action can remove", body: `| Action | Documented effect | Check before using it |
| --- | --- | --- |
| Clear Leo data | Brave Help says this removes conversations; Leo customization Help also says it removes customization and memories | Keep or capture any needed reference first |
| Clear browsing history | Current policy says associated webpage content in past chats is removed | Review the selected time range and whether linked page context matters |
| Turn off Store my conversation history | Help says future conversations will not be saved to local history | Do not assume this deletes or preserves existing chats without checking the screen |
| Delete a single conversation | Current privacy policy describes deleting individual conversations | Confirm the conversation menu and selected item before deleting |

The September 15 community thread does not establish that clearing ordinary browsing data deleted every Leo conversation. Brave support said Leo history is stored separately, with its own checkbox in the clearing interface; support could not reproduce the reported loss and asked for details. The user later said the Leo option was unchecked. After first suggesting a laptop shutdown, the user clarified that neither device had been shut down and that chats disappeared after the browser was closed and reopened. The cause remained unresolved. Use the thread as a reason to check selected data categories, not as proof of general clearing behavior.` },
				{ heading: "Use a low-risk order when troubleshooting Leo", body: `If Leo has a problem, try these checks before a broad browser reset:

- Record your Brave version, platform, and the exact Leo symptom.
- Reopen the conversation list and confirm whether the chat is missing or only its page context is gone.
- Check the selected time range and data categories in Clear browsing data without confirming the action.
- Look at the installed Leo history and Sync controls. If Sync is shown, confirm the same chain and current state on the other device.
- Only clear the specific data that the troubleshooting step requires, after reading its effect.
- If history has already disappeared, check other devices that may retain a local copy before changing their data.

Leo history has its own data category in the documented clearing interface. Do not assume clearing another category will remove Leo conversations, and do not select Leo data if you want to keep those chats. Brave's policy separately says that clearing browsing history removes associated webpage content from past conversations. No source reviewed here guarantees that a missing conversation can be restored from another device, a copied link, or Brave's servers. Do not promise recovery based on Sync being enabled.` },
				{ heading: "Sources and limits", body: `Brave's [privacy policy](https://brave.com/privacy/browser/), last updated September 23, 2026, is the current source for the conditional Sync statement. The [Chat History Help article](https://support.brave.app/hc/en-us/articles/32663367857549-How-do-I-use-Chat-History-in-Brave-Leo) documents the history view and clearing controls, but its local-only privacy paragraph is older and conflicts with that policy. Brave's [Leo page](https://brave.com/leo/) describes history access, and the [Sync FAQ](https://support.brave.app/hc/en-us/articles/360047642371-Sync-FAQ) explains the encrypted chain. An [open issue about Leo Sync](https://github.com/brave/brave-browser/issues/53978) does not establish that a feature has shipped. In the [September 15 community report](https://community.brave.app/t/issue-with-instructions-from-leo-ai/658319), support said Leo has a separate data category and that it could not reproduce the described loss; the user later said the Leo option was unchecked. They first suggested a laptop shutdown, then clarified that neither device had been shut down and that chats disappeared after closing and reopening the browser. The cause remained unresolved. BrowserHub did not clear data, use Sync, or test recovery.` }
			],
			faq: [
				{ question: "Where can I find old Leo chats?", answer: "Open brave://leo-ai, or use the Leo sidebar menu and choose Conversation History." },
				{ question: "Does Brave Sync Leo chat history?", answer: "Brave's September 23, 2026 privacy policy says it is included if enabled. The older Help article says local only, and an open issue means the exact current build behavior is not established here. Check your installed settings." },
				{ question: "Does clearing browsing history delete Leo chats?", answer: "Brave's current policy says associated webpage content in past conversations is removed. Clear Leo data is the separate documented control for removing conversations." },
				{ question: "Can a deleted Leo chat be recovered?", answer: "The sources reviewed do not promise a recovery method. Check another device before making further changes, but do not assume it contains a restorable copy." },
				{ question: "Is Leo conversation history stored on Brave's servers?", answer: "The current policy says locally stored and, if enabled, included in Sync. The older Help article still says local-only, so use the current policy for the stated data policy and verify what your installed build offers." }
			]
		},
		"zh-cn": {
			title: "Brave Leo 对话历史：查找、保留与清理",
			description: "查找 Leo 对话，理解当前有条件的 Sync 说明，并在清理 Brave 数据前核对每项操作的影响。",
			category: "AI 浏览器指南",
			content: "Brave Leo 对话历史有本地保存和删除控制；Brave 当前隐私政策称，启用对应选项后，对话会安全地纳入 Sync。较早的帮助文章仍写着历史只保存在本地，因此跨设备使用前应检查当前安装版本。清理浏览数据前，先找出仍要保留的对话，并阅读实际清理选项。Brave 没有为已删除对话承诺恢复方式。",
			sections: [
				{ heading: "查找以前的 Leo 对话", body: `Brave 文档提供两种查看历史的入口。打开 brave://leo-ai，在全页视图左侧浏览对话列表；也可以从侧边栏打开 Leo，选择三点菜单，再进入 Conversation History。选中对话后可以查看或继续聊天。

Leo 对话历史与普通浏览历史是两种记录。网页访问记录被清除后，对话可能仍在；对话中包含的网页文字也可能受到后续数据清理影响。决定清理内容时要分开核对。` },
				{ heading: "谨慎理解 Brave 当前的 Sync 说明", body: `Brave 于 2026 年 9 月 23 日更新的 Browser Privacy Policy 称，Leo 对话保存在本地；如果启用对应功能，也会安全地纳入 Sync。该政策还说明，清除浏览历史会移除过去对话中关联的网页内容。

Chat History 帮助文章仍写着对话只保存在设备上，不会存到 Brave 服务器。这与更新较新的隐私政策冲突。Brave Sync FAQ 解释了加密 Sync 链，但没有具体确认所有当前桌面版或移动版都能同步 Leo 历史。本文核查时，关于 Leo Sync 复选框的 GitHub issue 仍处于开放状态，也没有指定里程碑。

了解 Brave 的正式政策时应优先看较新的隐私政策，然后检查实际使用的平台和版本中有哪些设置。本次文档核对不能证明 Sync 控件已进入所有稳定版本，也不能证明你的设备已启用它。` },
				{ heading: "清理前先检查当前安装版本的控制项", body: `打开 Settings > Leo，查看当前版本是否显示 Store my conversation history、Clear Leo data 或历史 Sync 控件。官方帮助文章记录了 Store my conversation history 和 Clear Leo data。如果你的界面不同，可用设置搜索或打开对应版本的帮助说明，不要假设某个选项一定存在。

若还要继续使用某个对话，清理前先手动复制有用回答和原网页网址，保存后再打开副本确认内容可读。这只是你自己保留的参考资料，不是 Leo 归档，也不能在 Brave 中恢复对话。本文核查的公开资料没有记录可靠的导出或恢复流程。` },
				{ heading: "了解不同清理操作可能移除什么", body: `| 操作 | 文档说明的影响 | 执行前核对 |
| --- | --- | --- |
| Clear Leo data | Brave 帮助称会移除 Leo 对话；个性化与记忆帮助页还说明会移除自定义设置和记忆 | 先保留仍需参考的内容 |
| 清除浏览历史 | 当前政策称会移除旧对话中关联的网页内容 | 检查时间范围以及网页上下文是否重要 |
| 关闭 Store my conversation history | 帮助页称之后的对话不会保存到本地历史 | 不要假设这会删除或保留已有对话，先看当前界面说明 |
| 删除单条对话 | 当前隐私政策说明可以删除单条对话 | 确认菜单和选中项目后再删除 |

9 月 15 日的社区帖子不能证明清理普通浏览数据会删除所有 Leo 对话。Brave 支持回复称 Leo 历史单独存放，并在清理界面中有独立选项；支持人员未能复现所称丢失，并要求用户补充信息。用户之后表示该 Leo 选项未勾选。用户最初提到笔记本关机，之后明确更正为两台设备都没有关机，聊天是在关闭并重新打开浏览器后消失。原因仍未查明。请把这个个案当作检查清理类别的提醒，不要把它当成普通清理必然删除 Leo 对话的证据。` },
				{ heading: "按低风险顺序排查 Leo", body: `Leo 出现问题时，可先做这些检查，再考虑重置整个浏览器：

- 记录 Brave 版本、平台和具体的 Leo 故障表现。
- 重新打开对话列表，确认是对话不见了，还是只有网页上下文缺失。
- 在 Clear browsing data 中查看选定时间范围和数据类别，但先不要确认。
- 查看当前版本显示的 Leo 历史和 Sync 控件。如果有 Sync，核对另一设备是否加入同一条链以及当前状态。
- 阅读清理影响后，只清除排障步骤确实需要移除的数据。
- 如果历史已经消失，先检查其他设备是否还有本地副本，再修改那些设备的数据。

Leo 历史在帮助页描述的清理界面中有单独的数据类别。不要假设清理其他类别会删除 Leo 对话；如果想保留聊天，也不要选择 Leo 数据。清除浏览历史时，政策中关于关联网页内容的说明仍然适用。本文核查的来源没有保证可以从另一台设备、复制链接或 Brave 服务器恢复丢失对话。即使启用了 Sync，也不要据此承诺能够恢复。` },
				{ heading: "来源与限制", body: `Brave 于 2026 年 9 月 23 日更新的[隐私政策](https://brave.com/privacy/browser/)是有条件 Sync 说明的当前来源。[Chat History 帮助文章](https://support.brave.app/hc/en-us/articles/32663367857549-How-do-I-use-Chat-History-in-Brave-Leo)介绍历史视图和清理控制，但其中“只保存在本地”的隐私说明较旧，与当前政策冲突。[Leo 产品页](https://brave.com/leo/)介绍历史入口，[Sync FAQ](https://support.brave.app/hc/en-us/articles/360047642371-Sync-FAQ)说明加密链。[Leo Sync 开放 issue](https://github.com/brave/brave-browser/issues/53978)不能证明功能已发布。[9 月 15 日社区报告](https://community.brave.app/t/issue-with-instructions-from-leo-ai/658319)是个别用户经历，不是普遍恢复结论。BrowserHub 未清理数据、使用 Sync 或测试恢复。` }
			],
			faq: [
				{ question: "在哪里找以前的 Leo 对话？", answer: "打开 brave://leo-ai，或从 Leo 侧边栏菜单进入 Conversation History。" },
				{ question: "Brave Sync 会同步 Leo 对话历史吗？", answer: "Brave 2026 年 9 月 23 日的隐私政策称启用后会纳入 Sync。较旧帮助文章仍说只在本地保存，且相关 issue 尚未关闭，因此本文不能确定每个当前版本的实际状态。请检查安装版本的设置。" },
				{ question: "清除浏览历史会删除 Leo 对话吗？", answer: "Brave 当前政策称会移除旧对话中关联的网页内容。Clear Leo data 是单独的删除对话控制项。" },
				{ question: "删除的 Leo 对话能恢复吗？", answer: "本文核查的资料没有承诺恢复方式。进一步修改前可以先检查其他设备，但不要假设其中一定有可恢复副本。" },
				{ question: "Leo 对话历史会存到 Brave 服务器吗？", answer: "当前政策称对话保存在本地，启用后也会纳入 Sync。旧帮助页仍写着仅本地保存，因此应按当前政策理解数据处理，并检查已安装版本提供的设置。" }
			]
		}
	},
	"brave-leo-multi-tab-context-and-sidebar": {
		en: {
			title: "Brave Leo across tabs: Check the sidebar and choose page context",
			description: "Understand why a Leo sidebar can persist between tabs and select which open pages to attach before asking a multi-page question.",
			category: "AI browser guides",
			content: "Brave Leo can keep its sidebar conversation open as you switch tabs, while its Multi Tab Context control lets you choose which pages to include in a request. Those are separate behaviors. Before comparing sources or discussing a signed-in page, open the paperclip context selector and review the selected tabs. A persistent sidebar alone does not prove that every open tab is attached to the conversation.",
			sections: [
				{ heading: "Separate sidebar persistence from page context", body: `Brave desktop release notes describe a persistent Leo sidebar between tab switches. That can make the same conversation visible as you move to another page. It does not establish that every tab is automatically included as context.

Brave's Multi Tab Context help says you can select or deselect the open tabs Leo should reference. Use the paperclip icon in the message input to inspect those choices. The visible sidebar is the conversation surface; the selected tab list is the context for a request.` },
				{ heading: "Choose tabs for a comparison", body: `Open the pages you want to compare, then open Leo and use the paperclip tab-context selector. Select only the relevant pages and remove unrelated tabs. Ask a question that names the comparison, such as which two pages list different return periods. Before sending, check the selected tab names and the question together.

If you do not see a tab selector, check the platform and browser version. Brave's help lists this feature for desktop and Android and requires Brave 1.81 or later. The amount of context available can also depend on the chosen model.` },
				{ heading: "Keep unrelated tasks and accounts apart", body: `A continuing sidebar conversation may be useful for follow-up questions on the same project. When you switch to unrelated work, start a separate conversation, then inspect the attachment list for that request. Removing a tab only affects later requests; it does not erase earlier messages from the conversation.

This check matters when pages belong to different accounts. Before asking Leo to compare two signed-in pages, verify that each selected tab is the intended site and account. If you only need an answer about the current page, remove other tabs from the context instead of assuming they are ignored.` },
				{ heading: "Distinguish tab context from other Leo modes", body: `The privacy policy describes separate modes. Tab management can send titles and URLs of open non-Private and non-Tor tabs. Tab-history mode can include titles, URLs, and text passages from matching history results. Ordinary chat context and paperclip-selected tabs are different controls. A conversation being visible in the sidebar does not tell you which of these modes is active, and removing an attached tab does not erase earlier messages from that conversation.

If you have enabled Leo memories or personalization, those settings are another source of context. They do not replace checking the page attachments for a particular message. For model and local processing boundaries, see [Brave Leo BYOM: local vs hosted model](/en/guides/brave-leo-byom-local-vs-hosted/).` },
				{ heading: "Check a missing or unexpected page", body: `When Leo answers from the wrong page or seems to miss a source, check the request in this order:

- Open the paperclip selector and list every selected tab.
- Remove unrelated or duplicate pages, then attach the intended page again.
- Confirm the tab still displays the site you meant to use, especially after redirects or account switching.
- Ask a narrow question that names the source pages so you can compare the answer with them.
- If page content fails to load, retry with one public page at a time and check whether the issue follows a specific page.
- Record the Brave version and model if the selector or response behaves differently from the help instructions.

An [October 2026 Brave Community report](https://community.brave.app/t/leo-ai-stuck-on-thinking-when-page-context-is-enabled-in-brave-stable-v1-97-56-works-perfectly-in-beta/659461) describes Leo stalling with page context enabled. It is a dated individual report, not proof of a current general bug. Do not use old feature-flag suggestions as a current fix unless Brave documents them for your installed version.` },
				{ heading: "Sources and limits", body: `Brave's [Multi Tab Context guide](https://support.brave.app/hc/en-us/articles/38614934646029-How-to-Use-Multi-Tab-Context-with-Brave-Leo) documents the paperclip selector, requirements, and platform availability. The [desktop release notes](https://github.com/brave/brave-browser/blob/master/CHANGELOG_DESKTOP.md) list the persistent sidebar change in version 1.93.129. Brave's [privacy policy](https://brave.com/privacy/browser/) describes tab-management and history modes separately. An [August 2026 Reddit question](https://www.reddit.com/r/brave_browser/comments/1vdyy3d/leo_now_functioning_across_tabs_how_to_go_back_to/) records one user's concern about sharing a sidebar between tasks. BrowserHub did not open a Brave account or test tab switching.` }
			],
			faq: [
				{ question: "Does the Leo sidebar follow me when I switch tabs?", answer: "Brave desktop release notes describe a persistent sidebar between tab switches. The exact behavior can vary by platform and version." },
				{ question: "Does Leo automatically read every open tab?", answer: "Brave documents a paperclip selector for choosing which open tabs to include in Multi Tab Context. Do not infer that every tab is attached because the sidebar remains open." },
				{ question: "How do I compare two pages with Leo?", answer: "Open both pages, select them in the paperclip context menu, remove unrelated tabs, and ask a question that names what you want compared." },
				{ question: "Can I use multi-tab context on mobile?", answer: "Brave's Help page lists desktop and Android, with a minimum browser version of 1.81. Check the current platform and build because availability can change." },
				{ question: "What should I do if Leo seems to use the wrong page?", answer: "Inspect the selected tab list, remove unrelated entries, attach the intended tab, and test with a narrow question before relying on the result." }
			]
		},
		"zh-cn": {
			title: "Brave Leo 跨标签页使用：检查侧边栏并选择页面上下文",
			description: "了解 Leo 侧边栏为何会随标签切换保持打开，并在多页提问前选择要附加的网页。",
			category: "AI 浏览器指南",
			content: "切换标签页时，Brave Leo 侧边栏可以继续显示同一段对话；Multi Tab Context 则允许你选择哪些网页要加入本次请求。这是两种不同的行为。比较多个来源或讨论已登录页面前，先打开回形针上下文选择器，检查当前选中的标签。侧边栏保持打开，不代表所有标签都已附加到对话。",
			sections: [
				{ heading: "区分侧边栏持续显示与页面上下文", body: `Brave 桌面版更新记录提到，Leo 侧边栏会在标签切换时保持显示。因此你可以切到另一个页面后继续看到同一段对话。这并不能证明所有标签都会自动加入上下文。

Brave 的 Multi Tab Context 帮助页称，用户可以选择或取消选择 Leo 要参考的已打开标签。在输入框中点击回形针图标，检查当前选择。侧边栏是对话界面，选中的标签列表才是本次请求可用的页面上下文。` },
				{ heading: "选择要比较的页面", body: `先打开要比较的页面，再打开 Leo 并点击回形针上下文选择器。只选择相关页面，移除无关标签。问题中说清楚比较什么，例如两页的退货期限是否不同。发送前一起核对选中的标签名称和问题内容。

如果看不到标签选择器，先核对平台和浏览器版本。Brave 帮助页列出的支持平台是桌面版和 Android，最低要求为 Brave 1.81。可用上下文的范围还可能受到所选模型影响。` },
				{ heading: "把不同任务和账号分开", body: `同一项目的后续问题可以继续使用当前侧边栏对话。切换到无关工作时，应新建对话，再检查本次附件列表。选中标签列表只显示附加页面；移除标签只影响后续请求，不能撤回此前已进入该对话的文字或回答。

如果页面属于不同账号，这项检查尤其重要。让 Leo 比较两个已登录网页前，确认选中的标签和账号都正确。只想询问当前页面时，应从上下文中移除其他标签，而不是假设 Leo 会忽略它们。` },
				{ heading: "区分标签上下文与 Leo 其他模式", body: `Brave 隐私政策分别描述了不同模式。标签管理模式可能发送非 Private、非 Tor 标签的标题和网址；历史记录模式可能包含匹配结果的标题、网址和文字段落。普通对话上下文与回形针选中的标签也是不同控制项。侧边栏中显示一段对话，无法说明当前使用了哪种模式；移除已附加标签也不会清除对话中更早的消息。

如果启用了 Leo 记忆或个性化，这些设置也可能提供上下文，但不能替代对单条消息网页附件的检查。模型和本地处理边界见 [Brave Leo BYOM：本地与托管模型](/zh-cn/guides/brave-leo-byom-local-vs-hosted/)。` },
				{ heading: "排查缺少或意外引用的页面", body: `Leo 使用了错误网页或似乎漏掉来源时，可以按顺序检查：

- 打开回形针选择器，列出所有已选标签。
- 移除无关或重复页面，再重新附加预期页面。
- 确认标签仍停留在预期网站，尤其是经过重定向或切换账号后。
- 提出范围较小的问题，并点明要比较的来源页面。
- 若页面内容无法读取，先每次附加一个公开网页，观察问题是否只发生在某个页面。
- 如果选择器或回复与帮助说明不同，记录 Brave 版本和当前模型。

一条[2026 年 10 月的 Brave 社区报告](https://community.brave.app/t/leo-ai-stuck-on-thinking-when-page-context-is-enabled-in-brave-stable-v1-97-56-works-perfectly-in-beta/659461)称启用页面上下文时 Leo 停留在思考状态。这是特定版本的个别报告，不能证明当前普遍故障。除非 Brave 为当前安装版本提供说明，不要把旧版 flags 建议当作当前修复方式。` },
				{ heading: "来源与限制", body: `Brave 的[多标签上下文指南](https://support.brave.app/hc/en-us/articles/38614934646029-How-to-Use-Multi-Tab-Context-with-Brave-Leo)说明回形针选择器、版本要求和平台范围。[桌面版更新记录](https://github.com/brave/brave-browser/blob/master/CHANGELOG_DESKTOP.md)在 1.93.129 版本中记录了侧边栏持续显示的改动。[隐私政策](https://brave.com/privacy/browser/)分别描述标签管理和历史记录模式。一条[2026 年 8 月的 Reddit 问题](https://www.reddit.com/r/brave_browser/comments/1vdyy3d/leo_now_functioning_across_tabs_how_to_go_back_to/)记录了一位用户对任务间共享侧边栏的担心。BrowserHub 未登录 Brave 账号或实测标签切换。` }
			],
			faq: [
				{ question: "切换标签时 Leo 侧边栏会跟着保留吗？", answer: "Brave 桌面版更新记录描述了标签切换时持续显示的侧边栏。具体行为可能因平台和版本而异。" },
				{ question: "Leo 会自动读取所有打开的标签吗？", answer: "Brave 文档说明 Multi Tab Context 使用回形针选择器来选择要加入的标签。侧边栏保持打开，不代表所有标签都已附加。" },
				{ question: "如何让 Leo 比较两个网页？", answer: "打开两页，在回形针上下文菜单中选择它们，移除无关标签，再提出具体的比较问题。" },
				{ question: "手机上可以使用多标签上下文吗？", answer: "Brave 帮助页列出的支持范围包括桌面版和 Android，浏览器版本至少为 1.81。请按当前平台和版本确认实际入口。" },
				{ question: "Leo 好像用错页面时怎么办？", answer: "检查选中的标签，移除无关页面，再附加正确网页，并先用范围较小的问题核对结果。" }
			]
		}
	},
	"comet-ios-assistant-current-tab-and-tabs": {
		en: {
			title: "Comet on iPhone and iPad: Choose page questions, search, and tab tasks",
			description: "Use current App Store guidance to decide when to ask Comet Assistant about a page, search normally, or work across open tabs on iOS.",
			category: "AI browser guides",
			content: "Comet for iOS offers a browser Assistant as well as ordinary search, and its current App Store listing places the Assistant beside the address bar on pages and the New Tab screen. Use the Assistant for a question about the page; use Voice Mode for the documented cross-tab voice workflow. Use the regular search route when you want conventional search results. Older launch-day complaints about button placement and search threads may no longer describe the current app, so check the installed version before diagnosing a missing control.",
			sections: [
				{ heading: "Pick a route based on what you need", body: `| Task | Start with | What to check |
| --- | --- | --- |
| Find pages for a place, product, or quick fact | Regular search from the address bar | Confirm the search engine and inspect the result list |
| Ask what a page says or means | Open Assistant from the current page | Confirm the active page is the one you want to discuss |
| Follow a spoken question across open pages | Voice Mode | Perplexity documents this voice workflow across open tabs; verify the pages and answer |
| Compare text from several open pages | Inspect current context controls, or ask about one page at a time | iOS sources do not say text Assistant automatically attaches every tab |
| Navigate or act on a website | Use the current Assistant control if available | Review the action and any confirmation before it proceeds |

The App Store listing checked on November 15, 2026 shows version 26.44.0 and requires iOS 18 or later; the listing did not provide a date for 26.44.0, so no release date is inferred here. Its history records 26.42.0 (October 30), 26.38 (October 2, browser computer task from Assistant), 26.27 (July 10, Assistant near the address bar), and 26.21 (May 30, per-tab sidebar state). These are publisher release notes, not a guarantee that every task is enabled for every account.` },
				{ heading: "Ask about the page you are viewing", body: `Open the page and use the Assistant entry shown beside the address bar. Ask a bounded question, such as what the page says about eligibility or which date it lists. If the response appears unrelated, return to the page and open Assistant from there rather than continuing in a thread whose context is unclear.

Perplexity's iOS launch article distinguishes regular search results for quick, local, and high-intent queries from the Assistant workflow. That launch article predates current App Store interface updates, so use the current app for exact button placement.` },
				{ heading: "Work across tabs without assuming every mobile task is identical", body: `Perplexity's iOS launch announcement explicitly says Voice Mode works across open tabs. That statement is about voice and does not establish that text Assistant automatically receives every open tab. For a text task, inspect the current iOS attachment or context controls, then verify each page used in the answer.

Do not infer that every desktop feature is available on iPhone or iPad because the product uses the Comet name on both platforms. For example, desktop browser-control and account connector instructions have their own surface and permission requirements. See [Comet Control Browser troubleshooting](/en/guides/comet-control-browser-missing/) for the desktop route and [Comet voice mode and tab navigation](/en/guides/comet-voice-mode-context-navigation/) for documented voice workflows.` },
				{ heading: "Separate Assistant from regular search", body: `Some older launch discussions report that ordinary searches and Assistant threads felt coupled. The live App Store listing contains later releases and fixes, including current Assistant placement and search interface updates. Treat those launch posts as historical questions, not proof of a current bug.

If you want standard web results, use the search action visible in the address bar rather than phrasing the query as a request to the Assistant. If you want a page explanation, open Assistant from the page. When a request creates an unexpected thread or result, capture the current app version and the exact route used before repeating it.` },
				{ heading: "Check an old mobile UI report against the current app", body: `A May 2026 Reddit post complained that the Assistant overlapped the New Tab button and required extra taps. Later App Store entries describe UI changes and fixes. To diagnose your own screen:

- Check the Comet version in Settings or the App Store listing.
- Compare the installed screen with the current listing, not a launch screenshot.
- Open a page and look for the current Assistant button near the address bar.
- Try a harmless page question and a separate normal search.
- If the issue occurs only on iPad or after switching tabs, record device model, app version, and the steps that preceded it.

These checks are a procedure for the reader. BrowserHub did not use an iOS account or reproduce the reported layout issue.` },
				{ heading: "Sources and limits", body: `The [Comet App Store listing](https://apps.apple.com/us/app/comet-ai-browser-assistant/id6748622471) records current iOS feature and interface updates, including the Assistant beside the address bar. Perplexity's [Comet for iOS announcement](https://www.perplexity.ai/en-GB/hub/blog/meet-comet-for-ios) distinguishes regular search from its mobile assistant experience, and its [March 2026 launch notes](https://www.perplexity.ai/changelog/what-we-shipped--march-27-2026), whose page displays March 26, establish the iOS platform release. The [Voice Mode update](https://www.perplexity.ai/en-GB/changelog/comet-voice-mode-improvements) is specific to voice behavior and should not be generalized to all iOS tasks. The listing checked on November 15, 2026 shows version 26.44.0 and requires iOS 18 or later; no release date is inferred for 26.44.0. Its version notes include 26.42.0 (October 30), 26.38 (October 2, browser computer task from Assistant), 26.27 (July 10, Assistant near the address bar), and 26.21 (May 30, per-tab sidebar state). A [May 2026 user discussion](https://www.reddit.com/r/cometbrowser/comments/1trfbwi/is_anyone-satisfied-with-the-ios-version-of-comet/) is dated context only. No current device test is claimed.` }
			],
			faq: [
				{ question: "Where is Comet Assistant on iPhone?", answer: "The current App Store listing says Assistant is beside the address bar on a page and on the New Tab screen. Verify the installed version because the interface changes over time." },
				{ question: "Can Comet summarize more than one tab on iOS?", answer: "Perplexity's iOS announcement specifically documents Voice Mode across open tabs. For text Assistant, inspect the current iOS context controls and verify which pages the response used; the source does not say every tab is automatically attached." },
				{ question: "How do I get normal search results instead of an AI chat?", answer: "Use the regular search route shown in the address bar. Open Assistant from the page when you want an explanation or a browser task." },
				{ question: "Is the old New Tab button overlap still present?", answer: "A May 2026 post reported it, but later App Store releases list UI updates and fixes. Check the current app before treating the old report as a live issue." },
				{ question: "Does Comet on iPhone have the same browser actions as desktop?", answer: "The sources reviewed do not establish full feature parity. Check the current mobile interface and use desktop-specific guides for desktop control or connector flows." }
			]
		},
		"zh-cn": {
			title: "iPhone 与 iPad 上的 Comet：选择页面提问、搜索和标签任务",
			description: "依据当前 App Store 说明，判断何时向 Comet Assistant 提问、普通搜索或处理多个已打开标签。",
			category: "AI 浏览器指南",
			content: "iOS 版 Comet 同时提供浏览器 Assistant 和普通搜索。当前 App Store 页面称，网页和新标签页中的 Assistant 都位于地址栏旁。想询问当前页面时用 Assistant；跨标签语音任务用 Voice Mode；需要常规搜索结果时走普通搜索。发布初期关于按钮位置和搜索线程的投诉可能已经过时，排查入口前先检查当前安装版本。",
			sections: [
				{ heading: "根据任务选择入口", body: `| 任务 | 从哪里开始 | 需要核对什么 |
| --- | --- | --- |
| 查找地点、商品或简单事实 | 从地址栏进行普通搜索 | 确认搜索引擎，并查看搜索结果列表 |
| 询问页面写了什么或如何理解 | 在当前页面打开 Assistant | 确认当前页面正是要讨论的网页 |
| 在多个页面间继续语音提问 | Voice Mode | Perplexity 明确记录语音模式可跨已打开标签；仍应核对页面和回答 |
| 比较多个页面的文字 | 检查当前上下文控件，或逐页提问 | iOS 来源没有说文字 Assistant 会自动附加所有标签 |
| 浏览或操作网站 | 使用当前 Assistant 提供的相关控件 | 操作前查看具体动作和确认提示 |

2026 年 11 月 15 日核查时，App Store 页面显示版本 26.44.0，要求 iOS 18 或更高版本；该页面没有给出 26.44.0 的发布日期，因此本文不推断日期。版本记录列出 26.42.0（10 月 30 日）、26.38（10 月 2 日，从 Assistant 发起浏览器电脑任务）、26.27（7 月 10 日，Assistant 移至地址栏附近）和 26.21（5 月 30 日，每标签页侧边栏状态）。这些是发布者记录，不保证每个账号都能使用所有任务。` },
				{ heading: "询问当前页面内容", body: `打开网页后，点击地址栏旁显示的 Assistant 入口。问题范围可以具体一些，例如页面对申请资格有什么说明，或列出了哪个日期。若回答似乎与页面无关，回到目标网页，从那里重新打开 Assistant，避免在上下文不清的对话里继续追问。

Perplexity 的 iOS 上线文章把快速、本地和高意图查询的普通搜索，与 Assistant 工作流分开介绍。该文发布早于当前 App Store 界面更新，因此精确按钮位置应以现行应用为准。` },
				{ heading: "跨标签工作前不要假设所有移动功能相同", body: `Perplexity 的 iOS 上线公告明确说 Voice Mode 可以跨已打开标签工作。这项说明针对语音，不能证明文字 Assistant 会自动读取所有打开标签。文字任务开始前，检查 iOS 当前的附件或上下文控件，再核对回答实际使用了哪些页面。产品名称相同，不代表桌面功能都能在 iPhone 或 iPad 上使用。桌面浏览器控制和账号连接器各有界面和权限要求。桌面路径见 [Comet Control Browser 排查](/zh-cn/guides/comet-control-browser-missing/)，语音工作流见 [Comet Voice Mode 与标签导航](/zh-cn/guides/comet-voice-mode-context-navigation/)。` },
				{ heading: "区分 Assistant 与普通搜索", body: `一些较早的上线讨论称，普通搜索和 Assistant 对话感觉彼此耦合。App Store 当前页面包含后续版本与修复记录，包括 Assistant 位置和搜索界面更新。因此这些发布初期的讨论只能说明当时有人遇到疑问，不能证明当前仍有同样故障。

想要常规网页结果时，使用地址栏中显示的搜索操作，不要把问题写成要求 Assistant 执行的任务。想解释页面内容时，从网页打开 Assistant。如果请求意外生成对话或结果，在重复操作前记录当前应用版本和使用的具体入口。` },
				{ heading: "用当前应用核对旧版界面报告", body: `2026 年 5 月的一条 Reddit 讨论抱怨 Assistant 挡住新标签页按钮，打开新页需要多点一次。App Store 后续版本记录提到界面调整与修复。排查自己设备时可以按顺序检查：

- 在设置或 App Store 页面查看 Comet 版本。
- 对照当前版本说明，不要照搬上线初期截图。
- 打开网页，查看地址栏旁是否有当前 Assistant 按钮。
- 分别试一次无害页面提问和一次普通搜索。
- 如果问题只在 iPad 或切换标签后出现，记录设备型号、应用版本和前序操作。

这些步骤供读者核对。BrowserHub 没有登录 iOS 账号，也没有复现该布局问题。` },
				{ heading: "来源与限制", body: `Comet 的[App Store 页面](https://apps.apple.com/us/app/comet-ai-browser-assistant/id6748622471)记录了当前 iOS 功能和界面更新，包括 Assistant 位于地址栏旁。[iOS 版 Comet 公告](https://www.perplexity.ai/en-GB/hub/blog/meet-comet-for-ios)区分普通搜索与移动 Assistant；[3 月更新说明](https://www.perplexity.ai/changelog/what-we-shipped--march-27-2026)的页面显示日期为 3 月 26 日，并确认 iOS 平台发布。[Voice Mode 更新](https://www.perplexity.ai/en-GB/changelog/comet-voice-mode-improvements)针对语音功能，不能推广为所有 iOS 任务的说明。2026 年 5 月的[iOS 用户讨论](https://www.reddit.com/r/cometbrowser/comments/1trfbwi/is_anyone_satisfied_with_the_ios_version_of_comet/)仅作为有日期的背景。本文没有声称完成当前设备实测。` }
			],
			faq: [
				{ question: "iPhone 上的 Comet Assistant 在哪里？", answer: "当前 App Store 页面称，网页和新标签页中的 Assistant 都在地址栏旁。界面会更新，请按当前安装版本核对。" },
				{ question: "iOS 版 Comet 能总结多个标签吗？", answer: "Perplexity 的 iOS 公告只明确说明 Voice Mode 可跨已打开标签工作。文字 Assistant 应检查当前 iOS 上下文控件并核实回答用了哪些页面；官方公告没有说所有标签会自动附加。" },
				{ question: "怎样获得普通搜索结果而不是 AI 对话？", answer: "使用地址栏中显示的普通搜索入口。需要解释网页或执行浏览器任务时，再从当前页面打开 Assistant。" },
				{ question: "上线时的新标签按钮遮挡问题还存在吗？", answer: "2026 年 5 月有人报告过这一问题，但 App Store 后续版本列出了界面调整和修复。请先检查当前版本。" },
				{ question: "iPhone 版 Comet 有桌面版的所有浏览器操作吗？", answer: "本文核查的资料没有确认功能完全一致。请检查当前移动界面；桌面控制或连接器流程应参考桌面版说明。" }
			]
		}
	},
	"dia-site-search-shortcuts-troubleshooting": {
		en: {
			title: "Dia site-search shortcuts: Diagnose a keyword that does not run",
			description: "Separate Dia's default search route from a custom site-search keyword, inspect the current engine label, and test the shortcut without assuming Tab feedback.",
			category: "AI browser guides",
			content: "A Dia search shortcut can look configured yet still route differently from what you expected. First separate the default search engine from a custom site-search keyword and from Dia Chat. Dia's changelog says current command-bar results can show the matched engine name, while older community posts disagree about whether Tab or Enter activates a keyword. Use those posts as troubleshooting clues, then test a harmless query in your installed version.",
			sections: [
				{ heading: "Separate the three address-bar routes", body: `A typed query can lead to different places: your default search engine, a custom site-search keyword, or Dia Chat. These routes are easy to confuse because they start from the same command bar.

Dia's Mac 1.41.0 notes say the command bar shows the actual matched search-engine name instead of always displaying Google. Direct keyboard shortcuts for Chat and Google Search are documented in Mac 1.22.0 release notes, not 1.41.0. The 1.41.0 notes cover matched engine labels. Neither note says that a custom keyword such as !y must show a Tab prompt.` },
				{ heading: "Inspect the custom search entry", body: `Open Dia settings and look for search engines or site search. A public community guide points to dia://settings/searchEngines for manually adding site-search entries, but this path and field labels are community guidance rather than a complete current official setup guide.

For the entry you expect to use, inspect the keyword and destination template. Confirm that the keyword is unique and that the template includes a place for the query. A community example you can adapt, if your current fields accept this template convention, is name “YouTube check”, keyword “yt-check”, URL template https://www.youtube.com/results?search_query=%s, and harmless query “piano lessons”. After submitting, check for youtube.com/results and the expected search_query value. This is a proposed, unverified example, not a tested Dia recipe or a claim that every Dia build accepts %s. Dia's official changelog says custom search shortcuts provided by extensions were fixed in a past update; if your shortcut comes from an extension, confirm the extension is enabled and the installed Dia version includes its fix.` },
				{ heading: "Test with a harmless query", body: `Do not start with a private or account-specific query. Try a harmless phrase such as a common topic on the target site's search page. Type the exact keyword shown in settings, add a space and the query, then submit using the key or visible action that your current screen indicates.

Dia's public changelog documents the matched search-engine label, which gives you something visible to inspect. A November 2026 user thread says Enter worked for some commenters while Tab did not show feedback. That report is not an official guarantee. If the current screen gives no feedback, inspect the final destination and result URL before deciding the shortcut failed.` },
				{ heading: "Trace an unexpected Chat or web-search result", body: `If Dia sends the query to Chat instead of the intended site, check the route before editing the template:

- Confirm the custom keyword matches the configured entry exactly.
- Look for the actual search-engine name in the command-bar result.
- Use a direct Chat or Google Search keyboard route only when that is the task you want.
- Check whether your selected default engine or Address Bar setting prefers Chat or a search engine.
- Compare a simple site-search query with a normal web query to see which route changes.

Community reports say Dia site-search shortcuts can conflict with AI search, but the conflict pattern is not documented as a universal product rule. If routing remains ambiguous, use the site's own search page as a temporary route and report the Dia version with a small reproducible example.` },
				{ heading: "Check platform and version boundaries", body: `Dia publishes Mac and Windows updates separately. The 1.22.0 direct Chat and Google Search keyboard shortcuts are documented in Mac release notes; do not copy those exact key combinations into Windows instructions. Mac 1.41.0 documents matched search-engine labels; Mac 1.14.0 covers an extension shortcut fix. Use the current platform changelog to verify which controls are available in your build.

Avoid treating !-bang syntax, Space behavior, or a Tab completion popup as guaranteed unless Dia documents or your current version visibly confirms it. A missing visual state does not alone establish that a request did not run; inspect the navigation result before changing a working template.` },
				{ heading: "Sources and limits", body: `Dia's [product changelog](https://www.diabrowser.com/changelog) records the matched search-engine label. The [Mac 1.41.0 notes](https://www.diabrowser.com/changelog/mac/1-41-0) and [Mac 1.14.0 notes](https://www.diabrowser.com/changelog/mac/1-14-0) describe search labels and extension shortcuts in dated releases. The [Mac 1.22.0 release notes](https://www.diabrowser.com/release-notes/1-22-0-dont-think) document direct Chat and Google Search routes. The [November 2026 thread](https://www.reddit.com/r/diabrowser/comments/1xnro2c/search_engine_shortcuts/) and [March community guide](https://www.reddit.com/r/diabrowser/comments/1rq7f5u/guide_dia_does_have_site_search/) are user reports, not official compatibility promises. BrowserHub did not test Dia settings, keywords, or keystrokes.` }
			],
			faq: [
				{ question: "Where do I configure site-search shortcuts in Dia?", answer: "A community guide points to dia://settings/searchEngines. Dia's official public changelog does not provide a complete current setup walkthrough, so confirm the route and field names in your installed build." },
				{ question: "Should I press Tab or Enter after a Dia keyword?", answer: "Public comments disagree: some report Enter works while Tab has no visible response. Dia's changelog does not guarantee either behavior for every custom keyword. Test a harmless query and inspect the destination." },
				{ question: "Why does the command bar say Google when I use another engine?", answer: "Dia 1.41.0 notes say the command bar now displays the actual matched search-engine name. Check your installed version and whether the entry came from an extension." },
				{ question: "Is Dia Chat's search engine the same as my custom site search?", answer: "No. The default search engine, a custom site-search keyword, and Dia Chat are separate routes. Check which one the command bar identifies before submitting." },
				{ question: "Are the Mac keyboard shortcuts the same on Windows?", answer: "The cited direct Chat and Google Search shortcuts are in Mac release notes. Check the Windows changelog and current shortcut settings before using a key combination on Windows." }
			]
		},
		"zh-cn": {
			title: "Dia 站内搜索快捷词：排查关键词没有执行",
			description: "区分 Dia 默认搜索入口、自定义站内搜索关键词和 Chat，检查当前引擎名称，并在不假设 Tab 提示的情况下测试快捷词。",
			category: "AI 浏览器指南",
			content: "Dia 搜索快捷词看起来已经配置好，实际却可能进入另一个入口。先区分默认搜索引擎、自定义站内搜索关键词和 Dia Chat。Dia 更新记录称，当前命令栏可以显示实际匹配的搜索引擎名称；旧社区讨论对 Tab 或 Enter 是否能触发关键词说法不一。把这些讨论当作排查线索，再用当前版本做无害查询测试。",
			sections: [
				{ heading: "先区分地址栏中的三种入口", body: `输入查询后可能进入默认搜索引擎、自定义站内搜索关键词或 Dia Chat。它们都从同一个命令栏开始，因此容易混淆。

Dia Mac 1.41.0 更新说明称，命令栏现在会显示实际匹配的搜索引擎名称，而不总是显示 Google。直接进入 Chat 和 Google Search 的键盘快捷方式记录在 Mac 1.22.0 发布说明中。这两项说明都没有保证自定义关键词如 !y 一定会出现 Tab 提示。` },
				{ heading: "检查自定义搜索条目", body: `打开 Dia 设置，查找搜索引擎或站内搜索选项。一篇公开社区指南给出的手动添加路径是 dia://settings/searchEngines，但这属于社区说明，不是完整的当前官方配置教程。

检查预期使用条目的关键词和目标网址模板。确认关键词没有重复，模板中也留有填写查询的位置。若当前字段接受这种模板约定，可以参考一个社区示例：名称 “YouTube check”，关键词 “yt-check”，网址模板 https://www.youtube.com/results?search_query=%s，无害查询 “piano lessons”。提交后检查目标是否为 youtube.com/results，且 search_query 中是预期文字。这只是尚未验证的建议示例，不是实测配方，也不表示每个 Dia 版本都接受 %s。Dia 官方更新记录称，某次更新修复了扩展提供的自定义搜索快捷方式。如果你的关键词来自扩展，检查扩展是否启用，以及当前 Dia 版本是否包含对应修复。` },
				{ heading: "用无害查询测试", body: `不要先输入私人信息或账号相关内容。可以用目标网站上的常见主题进行测试。输入设置中显示的准确关键词，空格后添加查询，再按当前界面提示的按键或可见操作提交。

Dia 公开更新记录说明命令栏会显示匹配的搜索引擎名称，可以据此检查路由。2026 年 11 月的一条用户讨论称有些评论者按 Enter 后可以执行，而 Tab 没有明显反馈。这不是官方保证。如果界面没有反馈，先检查最终跳转网址和结果，再判断快捷词是否失败。` },
				{ heading: "查询意外进入 Chat 或网页搜索时逐项追查", body: `如果 Dia 把查询发到 Chat，而不是预期站内搜索，先检查入口，不要急着改网址模板：

- 确认输入的自定义关键词与设置中的条目完全一致。
- 查看命令栏显示的实际搜索引擎名称。
- 只有确实想进入 Chat 或 Google Search 时才使用对应键盘快捷键。
- 检查当前默认引擎或 Address Bar 设置是否优先进入 Chat 或搜索引擎。
- 分别比较简单站内查询与普通网页查询，看具体从哪个入口开始不同。

社区报告称 Dia 的站内搜索快捷词可能与 AI 搜索冲突，但官方没有把这种情况记录为普遍规则。如果路由仍不明确，可以临时打开网站自带的搜索页，并用最小复现例子和 Dia 版本向支持渠道反馈。` },
				{ heading: "留意平台和版本差异", body: `Dia 分别发布 Mac 和 Windows 更新。1.22.0 中直接进入 Chat 与 Google Search 的快捷键记录在 Mac 发布说明里，不应把相同组合直接写成 Windows 操作。Mac 1.41.0 说明了匹配的搜索引擎标签；扩展快捷词修复记录在 Mac 1.14.0。请根据当前平台的更新记录核对安装版本。

除非 Dia 官方明确说明，或当前版本界面能够验证，不要把 !-bang 语法、空格行为或 Tab 补全提示说成必然支持。没有明显视觉状态不能单独证明请求没有执行；先检查最终跳转结果，再决定是否需要更改模板。` },
				{ heading: "来源与限制", body: `Dia 的[产品更新记录](https://www.diabrowser.com/changelog)提到匹配的搜索引擎名称。[Mac 1.41.0 说明](https://www.diabrowser.com/changelog/mac/1-41-0)和 [Mac 1.14.0 说明](https://www.diabrowser.com/changelog/mac/1-14-0)分别记录了搜索引擎标签和扩展快捷词的版本更新。[Mac 1.22.0 发布说明](https://www.diabrowser.com/release-notes/1-22-0-dont-think)介绍直接进入 Chat 和 Google Search 的路径。2026 年 11 月的[用户讨论](https://www.reddit.com/r/diabrowser/comments/1xnro2c/search_engine_shortcuts/)和 [3 月社区指南](https://www.reddit.com/r/diabrowser/comments/1rq7f5u/guide_dia_does_have_site_search/)是用户反馈，不是官方兼容承诺。BrowserHub 未实测 Dia 设置、关键词或按键。` }
			],
			faq: [
				{ question: "在哪里配置 Dia 站内搜索快捷词？", answer: "社区指南给出的入口是 dia://settings/searchEngines。Dia 官方公开更新记录没有提供完整的当前设置教程，请在安装版本中确认路径和字段。" },
				{ question: "Dia 的关键词后应该按 Tab 还是 Enter？", answer: "公开评论说法不一，有人称 Enter 可用、Tab 没有明显反馈。Dia 更新记录没有保证所有自定义关键词都支持相同操作。请用无害查询检查最终网址。" },
				{ question: "为什么用其他引擎时命令栏还显示 Google？", answer: "Dia 1.41.0 更新说明称命令栏现在显示实际匹配的引擎名称。请核对安装版本，以及该条目是否由扩展提供。" },
				{ question: "Dia Chat 的搜索引擎和自定义站内搜索是同一个入口吗？", answer: "不是。默认搜索引擎、自定义站内搜索关键词和 Dia Chat 是不同路径。提交前查看命令栏显示的入口。" },
				{ question: "Mac 键盘快捷键在 Windows 上也一样吗？", answer: "本文引用的直接进入 Chat 与 Google Search 的快捷方式来自 Mac 更新说明。Windows 应按对应更新记录和当前快捷键设置核对。" }
			]
		}
	},
	"brave-leo-web-search-vs-ask-brave": {
		en: {
			title: "Brave Leo web search: Choose a model, use Ask Brave, and check results",
			description: "Understand why Leo may search selectively, what a prompt Skill can and cannot do, and when to use the cited Ask Brave search surface.",
			category: "AI browser guides",
			content: "Brave Leo can use Brave Search to add current web information to a browser conversation, but the sources do not document a guaranteed always-search switch. A saved /web-search Skill can make your request clearer, yet a prompt is not proof that a search ran. In Brave Search, run a query and choose Ask; you can also open brave.ai. Use this surface when you want a web-grounded answer with citations; use Leo when the open page and an ongoing browser conversation are part of the task. Check visible search evidence before relying on a current claim.",
			sections: [
				{ heading: "Choose the surface that fits the task", body: `| Need | Better starting point | Why |
| --- | --- | --- |
| Ask about the page open in Brave | Leo sidebar or full-page chat | Leo can use browser page context in a conversation |
| Get a web-grounded answer with sources | Ask Brave in Brave Search | Brave describes Ask Brave as answers grounded in web results with follow-up chat and cited sources |
| Find a link or compare several result pages yourself | Regular Brave Search results | You can inspect the result list before asking for a synthesis |
| Repeat a prompt format in Leo | A saved Skill | Skills reuse instructions, but do not guarantee a specific tool call |

Ask Brave and Leo are separate interfaces. A question answered from model knowledge does not establish that Leo searched the web.` },
				{ heading: "Understand why Leo may or may not search", body: `Brave Help says Leo can use Brave Search to add current information to an answer. It does not promise that every prompt starts a search, nor does the official model guide document an always-search setting. Model options and functionality can vary by plan and selected model.

A Brave staff response in a December 2025 community thread said that the then-current system chose whether search was needed, and that prompt wording and model choice could affect results. The thread later describes changes to Leo's search tools in Nightly. That discussion is historical information, not a complete description of the current stable release. Treat a missing search as a question to diagnose, not proof that Premium is required or the feature has been removed.` },
				{ heading: "Use a Skill as an instruction, not a switch", body: `Brave Skills save and reuse prompts. You can create a short Skill that says to search Brave Search when the question needs recent or changing information, include dates, and report sources. Keep the request clear about what counts as current and ask the response to identify its sources.

A Skill remains a natural-language instruction. Brave's Skills documentation does not say that a Skill forces an always-on search tool. To choose a Leo model, use the chat header three-dot menu and Language Models; Automatic is also a choice. Advanced settings are at brave://settings/leo-ai. If the answer does not show evidence of a search, do not treat the saved Skill name as proof. Use Ask Brave or open a search-results page when you need a distinct source list.` },
				{ heading: "Check whether a search actually ran", body: `Before relying on a time-sensitive Leo answer, check the response for a search indicator, source links, and dates that match the question. Then open the cited pages and confirm they support the claim. If the answer contains no sources, ask Leo to identify what it searched; a confident statement about browsing is not verification.

If the result is still unclear, use the same diagnostic prompt in Leo: “What is the current [named fact] as of today? Search the web, give the date, and link the pages that support the answer.” Record a compact row with the claim, date, supporting source page, visible search indicator, selected model, and browser channel. Repeat only if the first response is ambiguous; this is a reader check, not a benchmark. Do not compare one answer from one model with another as a general performance result.` },
				{ heading: "Troubleshoot missing or unexpected search", body: `When Leo does not search, or searches despite your instruction to use only attached material, check the request in this order:

- Confirm whether you asked Leo in the sidebar or used Ask Brave on the search page.
- Check the selected model and whether the current plan or account offers the model you expected.
- State whether the question needs current information and explicitly ask for a search when it does.
- If you need an answer limited to supplied pages, ask Leo to identify any outside sources and reject unsupported additions.
- Use Ask Brave for a separate web-grounded answer with visible source references.
- Save the exact prompt, model, browser channel and response evidence before reporting a suspected bug.

Old community troubleshooting posts recommend Nightly for an earlier search issue. Do not install a preview build or clear Leo data based only on an old thread. Check current release notes and use the normal support route for a reproducible issue.` },
				{ heading: "Keep Website Tools separate", body: `Website Tools are a separate attached-page action and do not explain whether a general Brave Search lookup ran. This guide does not cover their setup; use the dedicated Website Tools documentation for that workflow.` },
				{ heading: "Sources and limits", body: `Brave's [How Leo gets current information](https://support.brave.app/hc/en-us/articles/27586048343309-How-does-Leo-get-current-information) article describes Brave Search enrichment. The [model guide](https://support.brave.app/hc/en-us/articles/26727364100493-What-are-the-differences-between-Leo-s-AI-Models) documents model choices and plans, and the [Skills guide](https://support.brave.app/hc/en-us/articles/41599880226317-How-do-I-use-Skills-in-Brave-Leo) explains reusable prompt instructions. Brave Search's [AI feature guide](https://search.brave.com/help/ai) and [Ask Brave announcement](https://brave.com/whats-new/ask-brave/) describe its separate grounded-answer interface; the announcement documents choosing Ask after entering a Brave Search query and the brave.ai entry point. The [community discussion](https://community.brave.app/t/leo-ai-premium-inconsistent-web-search-access/647408) began in December 2025 and includes later staff replies and Nightly updates; it is not a current feature guarantee. Brave's newer [Website Tools documentation](https://support.brave.app/hc/en-us/articles/50132604817165-How-do-I-use-Website-Tools-in-Brave-Leo) covers a separate page-tool workflow. BrowserHub did not test a model, account, or search.` }
			],
			faq: [
				{ question: "Does Leo always search the web?", answer: "Brave says Leo can add Brave Search results when it uses search, but its current documentation reviewed here does not promise an always-search switch." },
				{ question: "Will a /web-search Skill force Leo to search?", answer: "No guarantee is documented. A Skill reuses an instruction and may guide the request, but its name does not prove that a search ran." },
				{ question: "When should I use Ask Brave instead of Leo?", answer: "Use Ask Brave when you want a web-grounded answer with visible sources in the Brave Search interface. Use Leo for a page-aware browser conversation." },
				{ question: "Does Leo Premium guarantee web search?", answer: "The official model page describes model and rate-limit differences, not a guaranteed search call for every request. Check the current plan and model, then verify visible search evidence." },
				{ question: "Are Brave Website Tools the same as web search?", answer: "No. Website Tools call actions provided by a specific attached site, such as searching an inbox. General web search and Ask Brave use different paths." }
			]
		},
		"zh-cn": {
			title: "Brave Leo 网页搜索：选择模型、使用 Ask Brave 并核对来源",
			description: "了解 Leo 为什么可能按需搜索、提示词 Skill 的能力边界，以及何时改用带引用的 Ask Brave 搜索入口。",
			category: "AI 浏览器指南",
			content: "Brave Leo 可以通过 Brave Search 获取当前网页信息并加入浏览器对话，但本文核查的资料没有承诺始终搜索开关。保存一个 /web-search Skill 可以让请求更清楚，却不能证明搜索已经执行。需要基于网页来源并查看引用时，可以在 Brave Search 中搜索后选择 Ask，或打开 brave.ai；如果任务需要结合当前页面和连续对话，就用 Leo。涉及当前信息时，先确认回复中有可核对的搜索证据。",
			sections: [
				{ heading: "根据任务选择入口", body: `| 需要完成的任务 | 更适合的入口 | 原因 |
| --- | --- | --- |
| 询问 Brave 当前打开的网页 | Leo 侧边栏或全页对话 | Leo 可以在对话中使用浏览器页面上下文 |
| 获取基于网页并附来源的回答 | Brave Search 中的 Ask Brave | Brave 称 Ask Brave 会基于网页结果回答并支持继续追问和来源引用 |
| 查找链接或自行比较多条结果 | Brave Search 普通结果页 | 可以先检查结果列表，再决定是否需要合成答案 |
| 在 Leo 中重复使用同一提示格式 | 保存一个 Skill | Skill 能复用指令，但不能保证一定调用特定工具 |

Ask Brave 和 Leo 是不同界面。模型根据已有知识回答，并不能证明 Leo 搜索过网页。` },
				{ heading: "理解 Leo 为什么有时会搜索", body: `Brave 帮助页称，Leo 可以调用 Brave Search，为回答补充当前信息。但它没有承诺每个提示都会启动搜索，官方模型说明也没有记载始终搜索的开关。可选模型和功能可能因套餐及所选模型而不同。

Brave 员工在 2025 年 12 月的一条社区讨论中称，当时的系统会判断是否需要搜索，提示词和模型选择可能影响结果。该讨论后续提到了 Nightly 中 Leo 搜索工具的改动。这是有日期的旧讨论，不能当作当前稳定版的完整机制说明。搜索没发生时，应先排查，不要认定必须升级 Premium 或功能已经下线。` },
				{ heading: "把 Skill 当作指令，不要当作开关", body: `Brave Skills 可以保存和复用提示词。你可以创建简短 Skill，要求问题涉及近期或会变化的信息时搜索 Brave Search、注明日期并列出来源。还可以写清楚“当前”指什么，并要求回复指出用了哪些来源。

Skill 本质上仍是自然语言指令。Brave Skills 文档没有说 Skill 能强制始终打开搜索工具。要选择 Leo 模型，可打开聊天标题栏的三点菜单，进入 Language Models，选择具体模型或 Automatic；高级设置也可在 brave://settings/leo-ai 查看。如果回答没有搜索证据，不要因为调用了同名 Skill 就认定已经搜索。确实需要独立来源列表时，改用 Ask Brave 或打开搜索结果页。` },
				{ heading: "确认搜索是否真的执行", body: `依赖 Leo 回答当前信息前，检查回复中是否显示搜索提示、来源链接以及与问题相关的日期。打开引用页面，确认它确实支持相关结论。如果没有来源，可以请 Leo 说明搜索了什么；仅仅自信地说“已浏览网页”不算验证。

仍不确定时，可用同一条小范围诊断提示：“截至今天，[具体事实] 的当前情况是什么？请搜索网页，给出日期，并链接支持回答的页面。”记录问题事实、日期、支持来源、可见搜索提示、所选模型、套餐（如已知）、浏览器版本或渠道和完整提示词。一次使用不同模型得到的两个答案不能说明普遍性能差异。` },
				{ heading: "排查没有搜索或意外搜索", body: `Leo 没有搜索，或者没有按“只用附件来源”执行时，可以按顺序检查：

- 确认你是在侧边栏使用 Leo，还是在搜索结果页使用 Ask Brave。
- 检查当前模型，以及当前套餐和账号是否提供预期模型。
- 说明问题是否需要当前信息；需要时明确要求搜索。
- 如果只想依据已提供页面，请让 Leo 指出任何外部来源，并排除没有依据的内容。
- 若需独立的网页来源回答，改用带可见引用的 Ask Brave。
- 报告疑似故障前，保存完整提示词、模型、浏览器渠道和回答证据。

旧社区排错帖曾建议为当时的搜索问题安装 Nightly。不要只凭旧帖子就安装预览版或清除 Leo 数据。先检查当前版本记录，再通过常规支持渠道提交可复现问题。` },
				{ heading: "不要把 Website Tools 当成网页搜索", body: `Brave Website Tools 和普通网页搜索不是一回事。它允许 Leo 在普通浏览器配置文件中，对已附加的安全网页调用该网站提供的工具，例如搜索已连接邮箱。它要求兼容模型，并且网站要支持相关工具。这条产品路径不同于让 Leo 搜索公开网页或使用 Ask Brave。

当前 Website Tools 指南称，Website Tools 是附加网页上的独立操作，并不能说明普通 Brave Search 查询是否执行。本文不讲它的设置流程；请使用专门的 Website Tools 文档。` },
				{ heading: "来源与限制", body: `Brave 的[Leo 如何获取当前信息](https://support.brave.app/hc/en-us/articles/27586048343309-How-does-Leo-get-current-information)介绍了通过 Brave Search 补充回答的方式。[模型说明](https://support.brave.app/hc/en-us/articles/26727364100493-What-are-the-differences-between-Leo-s-AI-Models)介绍模型和套餐，[Skills 指南](https://support.brave.app/hc/en-us/articles/41599880226317-How-do-I-use-Skills-in-Brave-Leo)介绍复用提示词。Brave Search 的[AI 功能说明](https://search.brave.com/help/ai)和 [Ask Brave 公告](https://brave.com/whats-new/ask-brave/)介绍了单独的网页检索回答界面。[社区讨论](https://community.brave.app/t/leo-ai-premium-inconsistent-web-search-access/647408)始于 2025 年 12 月，后续包含员工回复和 Nightly 版本信息，不能当作当前功能保证。Brave 更新的 [Website Tools 文档](https://support.brave.app/hc/en-us/articles/50132604817165-How-do-I-use-Website-Tools-in-Brave-Leo)讲的是另一类网页工具流程。BrowserHub 未测试模型、账号或搜索。` }
			],
			faq: [
				{ question: "Leo 每次都会搜索网页吗？", answer: "Brave 称 Leo 可以在搜索时补充 Brave Search 结果，但本文核查的当前文档没有承诺始终搜索开关。需要带网页引用的结果时，可在 Brave Search 输入查询后选择 Ask，或打开 brave.ai。" },
				{ question: "/web-search Skill 能强制 Leo 搜索吗？", answer: "没有这样的官方保证。Skill 会复用一段指令，可以引导请求，但它的名称不能证明搜索已经执行。" },
				{ question: "什么时候应该改用 Ask Brave？", answer: "需要在 Brave Search 界面获取基于网页且显示来源的回答时用 Ask Brave。需要讨论当前页面的浏览器对话时用 Leo。" },
				{ question: "Leo Premium 能保证网页搜索吗？", answer: "官方模型页说明了模型和使用限额差异，没有保证每个请求都会搜索。请核对当前套餐和模型，再查看是否有搜索证据。" },
				{ question: "Brave Website Tools 就是网页搜索吗？", answer: "不是。Website Tools 调用特定已附加网站提供的操作，例如搜索邮箱。普通网页搜索和 Ask Brave 是不同路径。" }
			]
		}
	}
};

export const aiCycleTranslations14: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides14: EditorialGuide[] = Object.keys(copies).map((slug) => ({
	...copies[slug]["zh-cn"], slug, date: "2026-11-14", sourcePath: `src/data/ai-cycle-2026-11-14.ts#${slug}`,
	availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
