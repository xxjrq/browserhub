import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
	"firefox-smart-window-availability": [
		{ title: "Firefox Help: Get started with Smart Window", url: "https://support.mozilla.org/en-US/kb/smart-window" },
		{ title: "Mozilla Smart Window waitlist and product page", url: "https://www.firefox.com/en-US/smart-window/" },
		{ title: "Firefox Support: Smart Window not available despite beta access", url: "https://support.mozilla.org/en-US/questions/1584560" },
		{ title: "Reader discussion: Firefox 154.0 Smart Window", url: "https://www.reddit.com/r/firefox/comments/1vs8td2/firefox_1540_smart_window/" },
		{ title: "Reader discussion: Smart Window beta", url: "https://www.reddit.com/r/firefox/comments/1xpq5ye/might_be_the_only_one_but_i_actually_quite_like/" }
	],
	"firefox-smart-window-watch-tasks": [
		{ title: "Firefox Help: Create tasks in Smart Window", url: "https://support.mozilla.org/en-US/kb/create-tasks-smart-window" },
		{ title: "Firefox Help: Get started with Smart Window", url: "https://support.mozilla.org/en-US/kb/smart-window" },
		{ title: "Mozilla Blog: Skip the busywork with Smart Window", url: "https://blog.mozilla.org/en/firefox/skip-the-busywork-with-smart-window/" },
		{ title: "Firefox 159 desktop release notes", url: "https://www.firefox.com/en-US/firefox/159.0/releasenotes/" },
		{ title: "Reader question: Why can't I create a task?", url: "https://www.reddit.com/r/firefox/comments/1xjzcks/why_cant_i_create_a_task/" },
		{ title: "Independent explainer: Firefox Smart Window page watching", url: "https://www.parasmadan.in/blog/firefox-smart-window-form-fill-page-watching" },
		{ title: "Independent explainer: Firefox Smart Window tasks", url: "https://explainx.ai/blog/firefox-smart-window-fill-from-sources-watch-tasks-gemini-flash-lite-privacy-2026" }
	],
	"firefox-smart-window-model-choice": [
		{ title: "Firefox Help: Model choices in Smart Window", url: "https://support.mozilla.org/en-US/kb/smart-window-models" },
		{ title: "Firefox Help: Smart Window privacy and data", url: "https://www.mozilla.org/en-US/privacy/smart-window/" },
		{ title: "Mozilla Connect: Different model profiles for Smart Window", url: "https://connect.mozilla.org/t5/discussions/different-model-profiles-for-smart-window/m-p/125039" }
	],
	"firefox-smart-window-memories-privacy": [
		{ title: "Firefox Help: Memories in Smart Window", url: "https://support.mozilla.org/en-US/kb/smart-window-memories" },
		{ title: "Mozilla Smart Window Privacy Notice", url: "https://www.mozilla.org/en-US/privacy/smart-window/" },
		{ title: "Firefox Help: Use your own model in Smart Window", url: "https://support.mozilla.org/en-US/kb/smart-window-byom" },
		{ title: "Firefox Smart Window product page", url: "https://www.firefox.com/en-US/smart-window/" },
		{ title: "Reader discussion: Mozilla and Mistral in Firefox", url: "https://www.reddit.com/r/firefox/comments/1whvljq/mistral_and_mozilla_are_bringing_open_private_and/" },
		{ title: "Reader discussion: Firefox AI controls and privacy claims", url: "https://www.reddit.com/r/firefox/comments/1wiu2yd/if_youre_new_here_because_of_a_video_you_saw_this/" }
	],
	"claude-chrome-tab-group-cleanup": [
		{ title: "Anthropic Help: Get started with Claude in Chrome", url: "https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome" },
		{ title: "Anthropic Help: Claude in Chrome permissions", url: "https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide" },
		{ title: "Google Chrome Help: Group tabs", url: "https://support.google.com/chrome/answer/2391819" },
		{ title: "Claude Code Docs: Use Claude Code with Chrome", url: "https://code.claude.com/docs/en/chrome" },
		{ title: "Claude Code Docs: Sessions", url: "https://code.claude.com/docs/en/sessions" },
		{ title: "Reader question: Claude in Chrome tab group behavior", url: "https://www.reddit.com/r/ClaudeAI/comments/1wp5dn3/claude_in_chrome_extension_tab_group_behavior_is/" },
		{ title: "Reader question: Why doesn't Claude in Chrome clean up after itself?", url: "https://www.reddit.com/r/claude/comments/1upz6te/why_doesnt_claude_in_chrome_clean_up_after_itself/" },
		{ title: "Anthropic Claude Code issue: Auto-cleanup Chrome tab groups", url: "https://github.com/anthropics/claude-code/issues/15436" },
		{ title: "Independent guide: Claude Chrome tab groups", url: "https://rzailabs.com/blog/agent-browser-for-claude-code" }
	]
};

const related: Record<string, string[]> = {
	"firefox-smart-window-availability": ["firefox-ai-controls-chatbot-provider-boundary", "firefox-smart-window-watch-tasks", "firefox-smart-window-model-choice"],
	"firefox-smart-window-watch-tasks": ["browser-agent-monitor-page-changes-meaningfully", "firefox-smart-window-availability", "firefox-smart-window-memories-privacy"],
	"firefox-smart-window-model-choice": ["firefox-ai-controls-chatbot-provider-boundary", "firefox-smart-window-memories-privacy", "firefox-smart-window-watch-tasks"],
	"firefox-smart-window-memories-privacy": ["firefox-ai-controls-chatbot-provider-boundary", "firefox-smart-window-model-choice", "firefox-smart-window-availability"],
	"claude-chrome-tab-group-cleanup": ["ai-browser-organize-tabs-by-task", "claude-chrome-shortcuts-schedule", "claude-chrome-connection-permissions"]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"firefox-smart-window-availability": {
		en: {
			title: "Firefox Smart Window is missing: Check rollout and eligibility",
			description: "Check Firefox version, supported locale, desktop availability, Mozilla account and beta rollout before troubleshooting a missing Smart Window entry point.",
			category: "AI browser guides",
			content: "Firefox Smart Window is an optional desktop beta with a staged rollout. Mozilla says it starts in the US and Canada with Firefox 150, then France with Firefox 155, and currently lists en-US, en-CA and French users. It also requires a Mozilla account. If Settings or the window switch does not show Smart Window, check those conditions and your rollout status before changing hidden preferences.",
			sections: [
				{ heading: "Check the supported version and locale", body: `Mozilla's current [Smart Window help page](https://support.mozilla.org/en-US/kb/smart-window) describes an early beta rolling out gradually. It says availability begins for users in the United States and Canada with Firefox 150, and for users in France starting with Firefox 155. The same page currently lists the supported locales as en-US, en-CA and French.

Check Help > About Firefox for the installed version, then confirm the browser's language and the account you use. Firefox for mobile is outside the desktop feature described by the guide. A recent version number alone does not prove your account or installation has received the staged rollout.` },
				{ heading: "Confirm account and rollout access", body: `Smart Window is an optional window type and requires sign-in to a Mozilla account. Mozilla's [product page](https://www.firefox.com/en-US/smart-window/) offers a waitlist for early access. A May 29, 2026 Firefox Support thread describes a user who had signed up but still could not use the Try Smart Window link; another discussion about Firefox 154.0 describes a selective rollout. These are individual reports, not a current eligibility list or a promise that waitlist signup enables access immediately.

Sign in to the account you used to request access, update Firefox through its normal updater, and restart it once. Then check Settings > AI Controls for Smart Window. If it is absent or disabled, record the Firefox version, platform, locale and whether the account shows access before contacting Mozilla Support.` },
				{ heading: "Why Smart Window may not appear as the default", body: `Firefox documents a separate preference for opening Smart Window by default, available starting with Firefox 151.0.2. It is available only after Smart Window itself is enabled and onboarding is complete; Mozilla says the default-window setting is hidden or disabled when Smart Window is unavailable. A Classic window remains available, and Firefox says it falls back to Classic when Smart Window is disabled or unavailable.

Do not use an old about:config tip as proof of eligibility. The official help describes a staged, account-linked beta and does not document a hidden preference as a supported way to bypass it. For the AI feature block and its individual exceptions, see [Firefox AI Controls: keep the chatbot while blocking other AI](/en/guides/firefox-ai-controls-chatbot-provider-boundary/).` },
				{ heading: "Separate a missing feature from a broken task", body: `If Smart Window opens but a particular action is missing, check that action's own requirements. Page-watching tasks currently have a narrower locale statement than Smart Window itself. The [task setup guide](/en/guides/firefox-smart-window-watch-tasks/) covers the Watch-a-page flow and why a missing task control does not necessarily mean the whole window is unavailable.

The eligibility and rollout details above were checked against Mozilla Help on November 25, 2026. BrowserHub did not enroll an account or test a Firefox build. The support and Reddit reports establish that people asked about access; they do not establish how many users are affected or whether a specific account should have been included.` }
			],
			faq: [
				{ question: "Does Firefox 154 include Smart Window for everyone?", answer: "No. Mozilla describes a gradual rollout and currently lists Firefox 150 for the US and Canada and Firefox 155 for France. A version number alone does not confirm access. The separate default-window control requires Firefox 151.0.2 or later, Smart Window enabled, and onboarding complete." },
				{ question: "Can I use Smart Window without a Mozilla account?", answer: "Mozilla's current help says Smart Window requires a Mozilla account sign-in." },
				{ question: "I signed up for the waitlist. Why is it still missing?", answer: "Waitlist signup is not documented as an immediate activation guarantee. Check account, version, locale and rollout status, then contact Mozilla Support with those details." },
				{ question: "Is Smart Window available on mobile Firefox?", answer: "The current Smart Window help describes Firefox desktop. Do not assume the feature is available in the mobile app." }
			]
		},
		"zh-cn": {
			title: "Firefox Smart Window 不显示：核对开放范围与使用条件",
			description: "Smart Window 不在设置或窗口切换菜单中时，先核对 Firefox 版本、支持语言、桌面平台、Mozilla 账号和分批开放状态。",
			category: "AI 浏览器指南",
			content: "Firefox Smart Window 是分阶段开放的桌面测试功能。Mozilla 目前说明，美国和加拿大从 Firefox 150 开始开放，法国从 Firefox 155 开始，支持语言列为 en-US、en-CA 和法语；使用还需要登录 Mozilla 账号。如果设置里没有 Smart Window，先核对这些条件和账号是否已获开放，再考虑其他排查。",
			sections: [
				{ heading: "核对版本与支持语言", body: `Mozilla 当前的 [Smart Window 帮助页](https://support.mozilla.org/en-US/kb/smart-window)把它描述为逐步开放的早期测试功能。页面称美国和加拿大从 Firefox 150 开始开放，法国从 Firefox 155 开始；目前列出的语言是 en-US、en-CA 和法语。

打开“帮助 > 关于 Firefox”查看版本，再确认浏览器语言和所用账号。帮助页描述的是桌面版，不能因为手机上也有 Firefox 就推断移动端可用。版本号符合要求，也不能单独证明账号已经进入分批开放范围。` },
				{ heading: "确认账号和开放状态", body: `Smart Window 是可选窗口类型，需要登录 Mozilla 账号。Mozilla 的[产品页](https://www.firefox.com/en-US/smart-window/)提供早期体验候补名单。2026 年 5 月 29 日的一条 Firefox 支持帖记录了已报名用户仍打不开“Try Smart Window”；另一条关于 Firefox 154.0 的讨论提到功能只向部分用户开放。这些是个别用户报告，不是当前完整资格表，也不代表报名后会立即启用。

先登录报名时使用的账号，通过 Firefox 内置更新程序更新一次并重启。之后到“设置 > AI Controls”查看 Smart Window。若仍缺失，记录 Firefox 版本、平台、语言和账号是否显示开放，再联系 Mozilla 支持。` },
				{ heading: "默认打开选项为什么也可能没有", body: `Firefox 文档把“默认打开 Smart Window”列为单独设置，最低要求为 Firefox 151.0.2。必须先启用 Smart Window 并完成初始设置，才能配置默认窗口；功能不可用时，这项设置会隐藏或不可选。Firefox 仍可使用 Classic 窗口，并说明 Smart Window 不可用或被关闭时会退回 Classic。

不要把旧版 about:config 教程当成受支持的开放方式。官方帮助描述的是与账号和分批开放有关的测试功能，并未把隐藏偏好设置列为绕过资格限制的方法。若你想控制内置 AI 功能，请看[Firefox AI Controls：保留聊天并关闭其他 AI 功能](/zh-cn/guides/firefox-ai-controls-chatbot-provider-boundary/)。` },
				{ heading: "区分窗口未开放与单项任务缺失", body: `Smart Window 能打开，但某个操作不见了，应单独核对该操作的开放条件。网页监测任务的语言和地区范围比 Smart Window 窗口本身更窄。[网页监测任务指南](/zh-cn/guides/firefox-smart-window-watch-tasks/)介绍 Watch-a-page 的创建路径，也解释了任务入口缺失不一定表示整个 Smart Window 不可用。

本文的开放范围依据 Mozilla 于 2026 年 11 月 25 日可见的帮助文档。BrowserHub 没有登录候补名单账号，也没有测试 Firefox 构建版本。论坛和 Reddit 贴说明有人遇到或询问开放问题，不能说明影响用户的数量，也无法判定特定账号理应已获开放。` }
			],
			faq: [
				{ question: "Firefox 154 会向所有人开放 Smart Window 吗？", answer: "不会。Mozilla 说明这是分批开放的功能，目前页面列出美国和加拿大 Firefox 150、法国 Firefox 155。版本号本身不能确认账号已获得功能。默认窗口设置另要求 Firefox 151.0.2 或更高版本、启用 Smart Window 并完成初始设置。" },
				{ question: "不登录 Mozilla 账号能用 Smart Window 吗？", answer: "Mozilla 当前帮助页要求登录 Mozilla 账号。" },
				{ question: "我已报名候补名单，为什么还看不到？", answer: "官方没有承诺报名后立即启用。核对账号、版本、语言和开放状态，并把这些信息提供给 Mozilla 支持。" },
				{ question: "Firefox 手机版能用 Smart Window 吗？", answer: "当前帮助页描述的是 Firefox 桌面版，不要据此推断移动版也提供该功能。" }
			]
		}
	},
	"firefox-smart-window-watch-tasks": {
		en: {
			title: "Firefox Smart Window Watch a page: Create and manage change alerts",
			description: "Find the /watch and Create new task entry points, check the narrower rollout, and manage Firefox page-watch tasks and notifications.",
			category: "AI browser guides",
			content: "Firefox Smart Window's Watch a page task can check selected websites for a described change and notify you. Mozilla's current help lists English locales in the US and Canada, up to 15 active tasks, and no more than five pages in one task. If the task entry point is missing, check availability first; if it exists, create the task with a specific condition, schedule, and notification check.",
			sections: [
				{ heading: "Check task availability before looking for the button", body: `Mozilla's [task guide](https://support.mozilla.org/en-US/kb/create-tasks-smart-window) currently says Watch-a-page tasks are available only in English locales in the US and Canada. It says Firefox may show a Smart Window message inviting you to create a task after an update; the document does not promise that every eligible account will show the same prompt immediately.

Open the Smart Window Tasks icon if present. If the Create new task option is missing, confirm Smart Window is available and check the task-specific locale note. Firefox 159 release notes list /watch and say some features roll out gradually. This confirms that page watching is part of that release, but does not guarantee it is enabled for every Firefox 159 account. Smart Window itself has broader availability conditions; meeting those alone does not confirm task access. The public question [“Why can't I create a task?”](https://www.reddit.com/r/firefox/comments/1xjzcks/why_cant_i_create_a_task/) describes a user who saw the Watch a page example but could not find a creation route. That post is one report, not proof of a product-wide defect.` },
				{ heading: "Create a task with a checkable condition", body: `Use either route Mozilla documents:

- Select Create new task, name it, describe the change, add up to five webpages, choose how often and when Firefox should check, then select Create task.
- In Smart Window chat, type /watch, describe what should change, add the pages and review the task before creating it.

Write a condition that can be checked on the page, such as a specified price appearing below a threshold or a named listing becoming available. Keep the page list small and use public pages where possible. Mozilla's help lists a maximum of 15 active tasks and five watched pages per task.` },
				{ heading: "Know which model and lifecycle rules apply", body: `Mozilla says Watch-a-page tasks use Qwen even when your Smart Window assistant setting selects a different model. That is a task-specific rule; it does not mean the chat model picker changed. For the difference between a default model and the current chat, see [Smart Window model choices](/en/guides/firefox-smart-window-model-choice/).

The Tasks area opens about:smartwindowtasks, where Mozilla documents editing, deleting, pausing and resuming a task. Mozilla says checks run only while Firefox is open. Its October 27 announcement says tasks pause after 60 days without a match and stop checking after 90 days without a match; the Help page says all tasks pause 90 days after creation. Because the 90-day descriptions differ, use the Help page’s creation-date limit as the conservative review point. Check task status rather than treating a notification as continuous monitoring.` },
				{ heading: "Check how you will receive a match", body: `Firefox can show a desktop notification and a green dot on the Tasks button when a match is found. On macOS, desktop notifications are off by default; enable Firefox under System Settings > Notifications if you rely on that alert. You can also open the Tasks panel to review matches.` },
				{ heading: "Sources and limits", body: `Read Mozilla's [task creation and management instructions](https://support.mozilla.org/en-US/kb/create-tasks-smart-window) alongside its [Smart Window availability page](https://support.mozilla.org/en-US/kb/smart-window). Independent explainers from [Paras Madan](https://www.parasmadan.in/blog/firefox-smart-window-form-fill-page-watching) and [ExplainX](https://explainx.ai/blog/firefox-smart-window-fill-from-sources-watch-tasks-gemini-flash-lite-privacy-2026) summarize the feature, but add operational claims that should be checked against Firefox's own instructions. BrowserHub did not create or run a scheduled task; this is a documentation-based setup path checked November 25, 2026.` }
			],
			faq: [
				{ question: "Where do I create a Firefox Smart Window task?", answer: "Use Create new task in the Tasks area, or type /watch in Smart Window chat and fill in the task details." },
				{ question: "Why is Watch a page missing?", answer: "Mozilla currently lists English locales in the US and Canada for this task feature. A rollout prompt may not appear in every eligible account at once." },
				{ question: "How many pages can one task watch?", answer: "Mozilla's current task help says up to five webpages per task and up to 15 active tasks." },
				{ question: "Does Watch a page use my selected Smart Window model?", answer: "Mozilla says tasks use Qwen even when a different assistant model is selected in Smart Window settings." },
				{ question: "Does the scheduled check run while Firefox is closed?", answer: "Mozilla says checks run only while Firefox is open. Its October 27 announcement says daily or weekly checks are available; the Help page says to choose how often and when, so use the options shown in your task form." }
			]
		},
		"zh-cn": {
			title: "Firefox Smart Window 网页监测：创建任务和管理提醒",
			description: "查看 /watch 和 Create new task 入口，核对更窄的开放范围，并管理网页监测任务和通知。",
			category: "AI 浏览器指南",
			content: "Firefox Smart Window 的 Watch a page 任务可以监测指定网页是否出现描述的变化，并在匹配时通知你。Mozilla 当前帮助页称此功能只面向美国和加拿大的英文语言环境，每个任务最多监测 5 个网页，同时最多有 15 个活动任务。若找不到入口，先核对功能范围；入口可用时，再设置清楚的变化条件、检查时间和通知方式。",
			sections: [
				{ heading: "先确认任务是否对当前环境开放", body: `Mozilla 的[任务指南](https://support.mozilla.org/en-US/kb/create-tasks-smart-window)目前写明，Watch-a-page 任务只在美国和加拿大的英文语言环境开放。帮助页称 Firefox 更新后可能在 Smart Window 中显示创建任务的提示，并没有保证每个符合条件的账号都会立即看到同一提示。

若任务入口存在，打开 Smart Window 的 Tasks 图标查看。若没有 Create new task，先确认 Smart Window 本身可用，并检查任务单独的语言地区限制。Firefox 159 桌面版[发布说明](https://www.firefox.com/en-US/firefox/159.0/releasenotes/)列出 /watch，并说明部分功能会逐步开放。这只能说明该版本发布内容包含网页监测，不能保证每个 Firefox 159 账号都已启用。Smart Window 窗口本身的开放范围更广；符合窗口条件不等于任务功能也已开放。Reddit 上的[“Why can't I create a task?”](https://www.reddit.com/r/firefox/comments/1xjzcks/why_cant_i_create_a_task/)记录了一位用户看见 Watch a page 示例却找不到创建路径。这是单个报告，不能证明所有用户都遇到产品故障。` },
				{ heading: "用可核对的变化条件创建任务", body: `Mozilla 文档提供两种入口：

- 选择 Create new task，填写名称和变化条件，添加最多 5 个网页，设置检查频率与时间，然后选择 Create task。
- 在 Smart Window 聊天中输入 /watch，说明要等什么变化，加入网页并在创建前检查任务内容。

变化条件要能在页面上核对，例如价格是否低于某个数字，或某个职位是否已发布。网页范围尽量小，优先选无需登录的页面。Mozilla 帮助页列出的上限是最多 15 个活动任务、每项最多 5 个网页。` },
				{ heading: "留意任务模型与暂停规则", body: `Mozilla 表示，网页监测任务始终使用 Qwen，即使 Smart Window 助手设置里选了其他模型。这是任务专属规则，并不代表聊天模型选择也被改动。默认模型与单次聊天模型的区别见[Smart Window 模型选择指南](/zh-cn/guides/firefox-smart-window-model-choice/)。

Tasks 页面会打开 about:smartwindowtasks，Mozilla 文档说明可在那里编辑、删除、暂停或恢复任务。只有 Firefox 打开时才会执行检查。Mozilla 10 月 27 日的公告称，无匹配 60 天后任务暂停，无匹配 90 天后停止检查；帮助页则称所有任务都会在创建 90 天后暂停。由于两处对 90 天的描述不同，请以帮助页的创建日期为保守复核时间，并查看任务状态，不要把提醒当成持续监测保证。` },
				{ heading: "确认匹配后怎样收到提醒", body: `匹配时 Firefox 可以显示桌面通知，并在工具栏的 Tasks 按钮上显示绿点。macOS 默认关闭桌面通知；依赖系统提醒时，请在“系统设置 > 通知 > Firefox”中启用。也可以打开 Tasks 面板查看匹配。` },
				{ heading: "资料来源与验证范围", body: `请同时阅读 Mozilla 的[任务创建与管理说明](https://support.mozilla.org/en-US/kb/create-tasks-smart-window)和[Smart Window 开放范围](https://support.mozilla.org/en-US/kb/smart-window)。[Paras Madan](https://www.parasmadan.in/blog/firefox-smart-window-form-fill-page-watching)与 [ExplainX](https://explainx.ai/blog/firefox-smart-window-fill-from-sources-watch-tasks-gemini-flash-lite-privacy-2026)的独立文章概述了新功能，但其中某些运行条件需要回到 Firefox 文档核对。BrowserHub 没有创建或运行定时任务；本文是 2026 年 11 月 25 日查阅公开资料后的操作路径。` }
			],
			faq: [
				{ question: "Firefox Smart Window 在哪里创建监测任务？", answer: "从 Tasks 区域选择 Create new task，或在 Smart Window 聊天中输入 /watch 并填写任务信息。" },
				{ question: "为什么看不到 Watch a page？", answer: "Mozilla 当前把任务功能限定在美国和加拿大的英文语言环境。即使符合条件，提示也可能不会同时出现在每个账号里。" },
				{ question: "一个任务最多监测多少网页？", answer: "Mozilla 当前帮助页写明每项最多 5 个网页，同时最多有 15 个活动任务。" },
				{ question: "监测任务使用我选的 Smart Window 模型吗？", answer: "Mozilla 称任务使用 Qwen，即使 Smart Window 设置中选了其他助手模型。" },
				{ question: "Firefox 关闭时会继续检查吗？", answer: "不会。Mozilla 10 月 27 日的公告称，只有 Firefox 打开时才会检查。公告称可按日或按周检查，具体选项以任务表单为准。" }
			]
		}
	},
	"firefox-smart-window-model-choice": {
		en: {
			title: "Firefox Smart Window models: Change the default or one chat",
			description: "Change Smart Window's default assistant model in Settings or use the in-chat picker for the current conversation without changing the default.",
			category: "AI browser guides",
			content: "Firefox Smart Window has two model controls: the default assistant model in Settings and an in-chat picker for the current conversation. Changing the model inside a chat affects that conversation only. To change what future chats start with, use Settings > AI Controls > Smart Window settings. The available model list can change, so use the options shown in your own Firefox build.",
			sections: [
				{ heading: "Use Settings for the default assistant model", body: `Mozilla's [model guide](https://support.mozilla.org/en-US/kb/smart-window-models) says you can change the default at any time. Open Firefox Settings, choose AI Controls, open Smart Window settings, and choose a model in Assistant model. This setting applies as the default for future Smart Window chats.

The available model choices can change. Check the names and descriptions shown in your installed build rather than copying a model list from an older article.` },
				{ heading: "Use the chat picker for one conversation", body: `To try another model without replacing your default, open Smart Window, start or open a chat, select the model button in the chat interface, and choose an option from the list. Mozilla says the inline selection applies to the current conversation only. Its FAQ explicitly says changing a model in chat does not change the default model.

Before sending sensitive page content, remember that model choice and data handling are separate questions. Mozilla's privacy notice describes when Smart Window sends prompts and context to Mozilla and a model provider. For memory processing and deletion controls, see [Firefox Smart Window Memories](/en/guides/firefox-smart-window-memories-privacy/).` },
				{ heading: "Do not assume every assistant feature follows the chat choice", body: `Some Smart Window functions can have their own model rule. Mozilla's [Watch-a-page help](https://support.mozilla.org/en-US/kb/create-tasks-smart-window) says monitoring tasks use Qwen even when another assistant model is selected in Settings. That documented task behavior is separate from the model shown in a chat.

For a specific request, check the model label in that chat before sending. If the model list or controls differ, record the Firefox version and account type; the help page describes a staged beta and model lineup that may change.` },
				{ heading: "Check a new chat without sending a prompt", body: `To check which model a new chat starts with, read the Assistant model value in Settings > AI Controls > Smart Window settings, then open a new Smart Window chat and look at its model label before typing or sending anything. Compare the label with the saved setting. In an existing chat, inspect that chat's own picker too; an in-chat choice applies only to that conversation. This read-only check sends no page content or prompt and does not change the default. If the labels differ, note the Firefox version and account rollout rather than assuming one control changed the other.` },
				{ heading: "Allow for hosted model fallback", body: `Mozilla says Smart Window may use another model if a hosted model does not respond. It says fallback hosts provide Zero Data Retention and prefer the same model family and host when feasible. So the label you select identifies your chosen model, but a temporary service fallback may handle a request. This availability behavior is separate from changing the default or the current chat selection.` },
				{ heading: "Sources and limits", body: `Mozilla's [Model choices in Smart Window](https://support.mozilla.org/en-US/kb/smart-window-models) provides the Settings and current-chat steps and says the in-chat choice does not change the default. A [Mozilla Connect request for separate model profiles](https://connect.mozilla.org/t5/discussions/different-model-profiles-for-smart-window/m-p/125039) shows interest in more persistent model options; it is a feature request, not a promised roadmap item. BrowserHub did not switch models in a Firefox account; the steps were checked against Mozilla documentation on November 25, 2026.` }
			],
			faq: [
				{ question: "Does changing a model in one Smart Window chat change my default?", answer: "No. Mozilla says the in-chat picker changes only the current conversation. Use Settings > AI Controls > Smart Window settings to change the default." },
				{ question: "Where do I change the default Smart Window model?", answer: "Open Firefox Settings > AI Controls > Smart Window settings and select an option under Assistant model." },
				{ question: "Can Smart Window's model names change?", answer: "Yes. Mozilla says it may add or remove choices. Check the list shown in your installed build." },
				{ question: "Do Watch-a-page tasks use my selected chat model?", answer: "Mozilla's task help says these tasks use Qwen even when you select a different assistant model." }
			]
		},
		"zh-cn": {
			title: "Firefox Smart Window 模型：切换默认值或单次聊天",
			description: "在设置中更改 Smart Window 默认助手模型，或用聊天内选择器仅切换当前会话。",
			category: "AI 浏览器指南",
			content: "Firefox Smart Window 有两处模型控制：设置中的默认助手模型，以及只作用于当前聊天的模型选择器。在聊天里切换不会改动默认值。若要更改之后新聊天使用的默认模型，请到“设置 > AI Controls > Smart Window settings”。可选模型会变化，应以安装版本显示的选项为准。",
			sections: [
				{ heading: "在设置中选择默认助手模型", body: `Mozilla 的[模型说明](https://support.mozilla.org/en-US/kb/smart-window-models)称默认值可以随时更改。打开 Firefox 设置，选择 AI Controls，进入 Smart Window settings，再在 Assistant model 中选择模型。这是之后 Smart Window 聊天使用的默认选项。

可选模型会变化。不要照搬旧文章中的型号；请看你所用 Firefox 版本实际显示的名称和说明。` },
				{ heading: "用聊天选择器只切换当前会话", body: `想试用其他模型，但保留原来的默认值时，打开 Smart Window 并进入聊天，点击界面上的模型按钮，再从列表中选择。Mozilla 说明，这个行内选择只影响当前会话；FAQ 也明确说，在聊天中换模型不会改变默认模型。

发送页面内容前，记住模型选择和数据处理是两件事。Mozilla 的隐私说明介绍了 Smart Window 何时会把提示词和上下文发送至 Mozilla 及模型提供方。有关记忆处理和删除方式，请看[Firefox Smart Window Memories 指南](/zh-cn/guides/firefox-smart-window-memories-privacy/)。` },
				{ heading: "不要假设助手的每项功能都跟随聊天模型", body: `Smart Window 的部分功能可能有单独的模型规则。Mozilla 的[网页监测任务帮助页](https://support.mozilla.org/en-US/kb/create-tasks-smart-window)称，监测任务使用 Qwen，即使设置里选择了其他助手模型。这条规则针对任务，不代表聊天中的选择器也使用同一模型。

发送请求前，查看当前聊天显示的模型。若界面或列表不同，记录 Firefox 版本和账号类型；帮助页说明这是分批开放的测试版，模型清单也可能调整。` },
				{ heading: "不发送提示词，核对新聊天的默认模型", body: `先打开“设置 > AI Controls > Smart Window settings”，记下 Assistant model 当前显示的值；然后新建一条 Smart Window 聊天，只看模型标签，不输入或发送内容。将标签与设置中的值对照。在已有聊天中，也可查看该聊天自己的模型选择器，因为聊天内的选择只作用于当前会话。这种只读核对不会发送网页内容或提示词，也不会更改默认值。如果两个位置显示不同，先记录 Firefox 版本和账号开放状态，不要据此认定其中一个设置失效。` },
				{ heading: "留意托管模型临时回退", body: `Mozilla 说明，托管模型无响应时，Smart Window 可能临时改用另一个模型。回退服务会采用零数据保留；系统会尽可能选择同一模型系列，并在条件允许时优先使用同一托管方。因此，聊天中显示的是你选择的模型，但遇到服务无响应时，某次请求仍可能由临时回退模型处理。这是服务可用性措施，与修改默认值或当前聊天选择是两回事。` },
				{ heading: "资料来源与限制", body: `Mozilla 的[Smart Window 模型选择指南](https://support.mozilla.org/en-US/kb/smart-window-models)分别列出设置默认值和在聊天中切换的步骤，并说明后者不会改变默认模型。[Mozilla Connect 上关于多组模型配置的建议](https://connect.mozilla.org/t5/discussions/different-model-profiles-for-smart-window/m-p/125039)显示用户希望增加持久化模型选项，但它只是功能建议，不代表已确认的产品计划。BrowserHub 没有登录 Firefox 账号切换模型；步骤依据 2026 年 11 月 25 日查阅的 Mozilla 文档。` }
			],
			faq: [
				{ question: "在一条 Smart Window 聊天里换模型会改默认值吗？", answer: "不会。Mozilla 称聊天内选择只影响当前会话。要改默认值，请打开“设置 > AI Controls > Smart Window settings”。" },
				{ question: "在哪里更改 Smart Window 默认模型？", answer: "打开 Firefox 设置 > AI Controls > Smart Window settings，在 Assistant model 下选择选项。" },
				{ question: "Smart Window 模型名称会改变吗？", answer: "会。Mozilla 表示可能增加或移除模型，应该查看安装版本当前显示的列表。" },
				{ question: "网页监测任务会使用我选的聊天模型吗？", answer: "Mozilla 的任务帮助页称，即使选择其他助手模型，监测任务仍使用 Qwen。" }
			]
		}
	},
	"firefox-smart-window-memories-privacy": {
		en: {
			title: "Firefox Smart Window Memories: Where data goes and how to clear it",
			description: "Separate local memory storage from server-side processing, stop new learning, block memory use in one chat, and delete saved memories.",
			category: "AI browser guides",
			content: "Firefox Smart Window Memories are stored locally on your device, but Mozilla's privacy notice says activity can be processed on a Mozilla server to infer those memories. Turning off learning stops new memories; it does not stop existing memories from being used. Use the in-chat control to exclude memories from one answer, or delete saved memories in Settings when you want them removed.",
			sections: [
				{ heading: "Separate memory storage from memory creation", body: `Mozilla's [Smart Window Help page](https://support.mozilla.org/en-US/kb/smart-window-memories) says saved Memories are stored locally and are separate from chat and browsing history. The [Smart Window Privacy Notice](https://www.mozilla.org/en-US/privacy/smart-window/) adds a different part of the data flow: by default, Mozilla processes browsing and assistant activity on its server to infer interests, then says it does not retain that information after processing. The resulting Memories are stored on the device.

“Stored locally” describes the saved Memory. It does not mean every signal used to create it stays on the device. Mozilla says Private Window activity is excluded from Memory creation.` },
				{ heading: "Stop Smart Window from learning new memories", body: `In Firefox Settings, open AI Controls > Smart Window > Smart Window settings. Under Memories, turn off both Learn from chats in Smart Window and Learn from browsing in Classic and Smart Windows. These controls affect future memory creation.

Mozilla's help says existing Memories can still personalize answers after learning is disabled. If you do not want saved memories used in any reply, delete them too. Clearing browser history or chat history does not remove the separate Memory store.` },
				{ heading: "Exclude or delete a memory", body: `To see saved items, use Settings > AI Controls > Smart Window > Smart Window settings > Manage memories. Firefox lets you delete one Memory with its trash icon or remove all with Delete all.

For one answer, choose Retry without memories. To stop using memories throughout one chat, turn off the Memories control in that chat’s input box; Mozilla says new memories may still be created from the conversation. You can also remove a specific Memory from the chat and rerun the query. The chat-wide control, future-learning settings and saved-memory deletion are separate actions.` },
				{ heading: "Check syncing and provider boundaries", body: `Mozilla's current Memories Help page says Memories do not sync across devices. A Smart Window assistant request may use the prompt, relevant page context and selected Memories; the privacy notice says those are sent to a Mozilla server and forwarded to a third-party model provider to generate an answer. Mozilla says it does not retain chat logs without your permission. This route describes the Mozilla-provided model choices; if you configure a custom model endpoint that is not offered in Smart Window, Mozilla says requests bypass its servers and the endpoint operator’s terms and privacy notice apply. See Mozilla’s [custom endpoint instructions](https://support.mozilla.org/en-US/kb/smart-window-byom).

The Smart Window marketing page emphasizes local Memory storage. For a privacy decision, read it with the more detailed [Privacy Notice](https://www.mozilla.org/en-US/privacy/smart-window/) so local storage is not mistaken for local-only inference. A Reddit discussion about Mozilla's Firefox AI announcement shows public interest in this distinction, but comments are not an independent data-flow audit.` },
				{ heading: "Sources and limits", body: `The steps above follow Mozilla's [Memories instructions](https://support.mozilla.org/en-US/kb/smart-window-memories) and [Smart Window Privacy Notice](https://www.mozilla.org/en-US/privacy/smart-window/), checked November 25, 2026. The [product page](https://www.firefox.com/en-US/smart-window/) gives a shorter privacy summary. BrowserHub did not inspect a Firefox profile, capture network traffic or test deletion; this guide describes Mozilla's published policy and UI instructions, not an independent privacy audit.` }
			],
			faq: [
				{ question: "Are Firefox Smart Window Memories kept on my device?", answer: "Mozilla says the saved Memories are stored locally. Its privacy notice separately says browsing and assistant activity can be processed on Mozilla servers to infer them." },
				{ question: "Does turning off Memory learning erase saved memories?", answer: "No. Mozilla says turning off learning stops new Memories from being created. Delete existing Memories separately if you do not want them used." },
				{ question: "How do I remove one Smart Window Memory?", answer: "Open Settings > AI Controls > Smart Window > Smart Window settings > Manage memories, then use the trash icon for that item." },
				{ question: "Do Smart Window Memories sync to another device?", answer: "Mozilla's current Memories Help page says they do not sync across devices." }
			]
		},
		"zh-cn": {
			title: "Firefox Smart Window 记忆：数据流向与清除方法",
			description: "区分本地记忆保存与服务器端推断；关闭新记忆、在单次聊天中屏蔽记忆，或删除已保存项目。",
			category: "AI 浏览器指南",
			content: "Firefox Smart Window 的 Memories 保存在本机，但 Mozilla 的隐私说明称，浏览和助手活动可能先在 Mozilla 服务器上处理，用来推断记忆。关闭学习只会阻止生成新记忆，已有记忆仍可能被使用。你可以在单次聊天中屏蔽记忆，也可以到设置里删除已保存的记忆。",
			sections: [
				{ heading: "区分记忆存储和记忆生成", body: `Mozilla 的 [Smart Window Memories 帮助页](https://support.mozilla.org/en-US/kb/smart-window-memories)称，已保存的记忆保存在本机，并独立于聊天记录和浏览历史。[Smart Window 隐私说明](https://www.mozilla.org/en-US/privacy/smart-window/)补充了另一段数据流程：默认情况下，Mozilla 会在服务器上处理浏览和助手活动以推断用户兴趣，并称处理后不会保留这些信息；生成的 Memories 保存在设备上。

“记忆保存在本机”描述的是结果的保存位置，不代表用于推断的所有信号都只在本机处理。Mozilla 称不会用 Private Window 活动创建记忆。` },
				{ heading: "阻止创建新的 Smart Window 记忆", body: `在 Firefox 设置中打开 AI Controls > Smart Window > Smart Window settings。在 Memories 下分别关闭 Learn from chats in Smart Window 和 Learn from browsing in Classic and Smart Windows。这两项控制未来是否继续创建记忆。

Mozilla 帮助页说明，关闭学习后，已有记忆仍可能用于个性化回答。若你不希望任何回复继续使用已保存内容，还要删除现有记忆。清除浏览历史或聊天记录不会自动删除独立保存的 Memory。` },
				{ heading: "屏蔽或删除记忆", body: `要查看已保存项目，打开 设置 > AI Controls > Smart Window > Smart Window settings > Manage memories。点击单项旁的垃圾桶可以删除一条记忆，选择 Delete all 则可全部删除。

只想让某个回答不使用记忆时，选择 Retry without memories。若要在整条聊天中停止使用记忆，可关闭聊天输入框中的 Memories 开关；Mozilla 称这段对话仍可能生成新记忆。也可以移除聊天中的某条记忆后重新提问。聊天级开关、停止未来学习和删除已保存记忆是不同操作。` },
				{ heading: "核对同步与模型服务边界", body: `Mozilla 当前 Memories 帮助页称记忆不会跨设备同步。Smart Window 助手可能结合提示词、相关网页上下文和选中的 Memories 生成回答；隐私说明称这些内容会发送至 Mozilla 服务器，再转发给第三方模型提供方。Mozilla 表示未经许可不会保留聊天记录。上述流程适用于 Smart Window 界面提供的模型；若你配置界面未提供的自定义模型端点，Mozilla 称请求不会经过其服务器，而应查看该端点运营方的服务条款和隐私说明。具体设置见 Mozilla 的[自带模型说明](https://support.mozilla.org/en-US/kb/smart-window-byom)。

Smart Window 产品页主要强调记忆保存在本机。做隐私判断时，也要读更详细的[隐私说明](https://www.mozilla.org/en-US/privacy/smart-window/)，避免把本地存储理解成推理过程完全在设备内完成。Firefox 上关于 Mozilla AI 公告的 Reddit 讨论显示了公众对这一差别的兴趣，但评论不能替代独立的数据流审计。` },
				{ heading: "资料来源与限制", body: `以上步骤依据 Mozilla 的[记忆说明](https://support.mozilla.org/en-US/kb/smart-window-memories)和 [Smart Window 隐私说明](https://www.mozilla.org/en-US/privacy/smart-window/)，于 2026 年 11 月 25 日查阅。较短的[产品页](https://www.firefox.com/en-US/smart-window/)提供概括性说明。BrowserHub 没有检查 Firefox 配置文件、抓取网络流量或测试删除操作；本文转述公开政策与界面步骤，不是独立隐私审计。` }
			],
			faq: [
				{ question: "Firefox Smart Window Memories 保存在本机吗？", answer: "Mozilla 称已保存的记忆在本机；隐私说明另称，推断记忆时可能会在 Mozilla 服务器处理浏览和助手活动。" },
				{ question: "关闭记忆学习会删除已保存内容吗？", answer: "不会。Mozilla 称关闭后不再创建新记忆；如果不希望已有内容被使用，需要另外删除。" },
				{ question: "怎样删除一条 Smart Window 记忆？", answer: "打开设置 > AI Controls > Smart Window > Smart Window settings > Manage memories，再点击该项目旁的垃圾桶。" },
				{ question: "Smart Window Memories 会同步到其他设备吗？", answer: "Mozilla 当前的 Memories 帮助页称记忆不会跨设备同步。" }
			]
		}
	},
	"claude-chrome-tab-group-cleanup": {
		en: {
			title: "Claude in Chrome leaves tab groups open: Review and clean up safely",
			description: "Keep Claude-created tabs separate, check what Chrome's Close group actually does, and avoid closing unrelated or unfinished pages.",
			category: "AI browser guides",
			content: "Claude in Chrome can use Chrome's tab and tab-group permissions to open, organize, switch and close pages. Anthropic's setup guide describes groups as a way to distinguish Claude's tabs, but does not promise that a group closes when a task ends. Take a snapshot before a task, ask for a review list when it finishes, and close only pages you can identify as belonging to that task.",
			sections: [
				{ heading: "Identify the Claude surface and what it can do", body: `Anthropic's [Claude in Chrome setup guide](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome) says the extension can open, close and switch tabs. It also says the tabGroups permission lets Claude organize tabs it opens into a separate group so users can see which pages Claude is using. That documents tab management, not automatic cleanup at the end of every task.

For the separate Claude Code local Chrome integration, current [Claude Code documentation](https://code.claude.com/docs/en/chrome) describes session cleanup: /clear closes its tab group, including pages, unless work surviving the clear is still running. On /resume, exit, or /clear with surviving work, Claude Code closes the group only when it contains empty new tabs; nonempty pages remain open. These rules apply to that local Claude Code session flow, not automatically to the consumer extension or Cowork. The reader reports are specific: [one Claude in Chrome user](https://www.reddit.com/r/ClaudeAI/comments/1wp5dn3/claude_in_chrome_extension_tab_group_behavior_is/) describes tabs being placed in a group named “Claude”; [another asks why the extension does not clean up afterward](https://www.reddit.com/r/claude/comments/1upz6te/why_doesnt_claude_in_chrome_clean_up_after_itself/). These posts show individual experiences. An Anthropic GitHub [feature request](https://github.com/anthropics/claude-code/issues/15436) concerns Claude Code sessions using Claude in Chrome; that is related but not proof of identical behavior in Cowork or the extension side panel.` },
				{ heading: "Record the pages you want to keep before starting", body: `Before delegating browser work, note the existing tab titles and any open forms or drafts. Tell Claude which site and task are in scope, and ask it to leave unrelated tabs alone. A separate Claude group can help visually, but a group name alone does not prove every tab in it was opened for the current task.

At the end, ask Claude to list the group and tabs it plans to close, with page titles or URLs. Review that list against your starting snapshot. If a tab's ownership is unclear or a form may contain unsaved work, leave it open and inspect it yourself. This review step is a suggested procedure; BrowserHub did not run it in a live Claude session.` },
				{ heading: "Close a group without deleting its saved group", body: `Chrome Help distinguishes Close group from Delete group. To remove a reviewed group from the current tab strip, right-click its label and choose Close group. Chrome says a closed group is saved and can be reopened. Delete group removes the group from the device and other devices using the same Google Account when groups are synced.

Before closing, make sure the group contains only pages you are willing to close. Closing tabs can discard unsaved form or editor state, and synced groups can change on other devices. To keep a page open but detach it, right-click that individual tab and choose Remove from group. Read Google's [tab group instructions](https://support.google.com/chrome/answer/2391819) for the current desktop controls.` },
				{ heading: "Use a narrow end-of-task instruction", body: `You can add a boundary such as: “At the end, list the tabs you opened during this task. Do not close, move, or delete any tab until I review the list. Leave all pages that were open before the task untouched. If you cannot identify which tabs you opened, stop and ask.”

This wording asks for a visible review; it does not guarantee Claude can reliably distinguish a pre-existing tab from one created later. Anthropic's documentation says the extension can close tabs when completing tasks, so review the proposed list before allowing a closing action. For a persistent scheduled shortcut, see [Claude in Chrome shortcuts and scheduling](/en/guides/claude-chrome-shortcuts-schedule/); that page answers saved-task behavior, not tab cleanup.` },
				{ heading: "Sources and limits", body: `Anthropic documents extension permissions and grouped tabs in [Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome). Google documents how to close or delete a group in [Chrome Help](https://support.google.com/chrome/answer/2391819). Claude Code separately documents local session cleanup in [Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome); these CLI rules do not establish behavior for Cowork or the consumer extension. The independent [RZ AI Labs guide](https://rzailabs.com/blog/agent-browser-for-claude-code) recommends using a separate browser tool for Claude Code; it does not solve cleanup for every Claude in Chrome consumer workflow. BrowserHub did not test Cowork, Claude Code, or extension behavior, and does not claim there is a universal automatic cleanup setting.` }
			],
			faq: [
				{ question: "Does Claude in Chrome automatically close its tab group when a task ends?", answer: "The consumer extension guide documents tab groups and controls but does not promise cleanup after each task. Claude Code local Chrome sessions have separate documented /clear, /resume and exit behavior; it should not be generalized to the extension side panel or Cowork." },
				{ question: "How do I close a Claude group but keep it available?", answer: "In Chrome, right-click the reviewed group and select Close group. Chrome says closed groups are saved and can be reopened." },
				{ question: "What is the difference between Close group and Delete group?", answer: "Close group removes it from the tab strip while keeping it saved. Delete group removes it from synced devices too." },
				{ question: "Can I ask Claude to close only tabs from its current task?", answer: "You can ask it to list those tabs first, but verify the list against the pages that were open before the task. The prompt does not guarantee accurate ownership detection." }
			]
		},
		"zh-cn": {
			title: "Claude in Chrome 留下标签组：先核对，再安全清理",
			description: "将 Claude 打开的页面与个人标签分开，了解 Chrome 的“关闭群组”与“删除群组”区别，避免误关未完成页面。",
			category: "AI 浏览器指南",
			content: "Claude in Chrome 获得权限后可以打开、整理、切换和关闭 Chrome 标签页。Anthropic 的入门指南把标签组作为区分 Claude 页面的方法，但没有承诺任务结束时自动关闭标签组。开始前记录需要保留的页面；任务结束后先要求列出待清理标签，只关闭能确认属于该任务的页面。",
			sections: [
				{ heading: "确认 Claude 使用哪个界面及其权限", body: `Anthropic 的 [Claude in Chrome 入门指南](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)称，扩展可以打开、关闭和切换标签页。tabGroups 权限可让 Claude 把它打开的标签放进单独群组，方便识别它正在使用的页面。这说明了标签管理能力，并不等于每项任务结束后都会自动清理。

另一个单独场景是 Claude Code 本地 Chrome 集成。当前 [Claude Code 文档](https://code.claude.com/docs/en/chrome)说明会按会话清理：执行 /clear 时会关闭该标签组及其中页面，除非 /clear 后仍有运行中的工作。执行 /resume、退出 Claude Code，或在仍有工作时执行 /clear，只有标签组里全是新建的空白标签时才会关闭；有内容的页面会保留。这些规则只适用于本地 Claude Code 会话流程，不能自动套用到普通扩展侧栏或 Cowork。读者报告描述的是具体经历：[一位 Claude in Chrome 用户](https://www.reddit.com/r/ClaudeAI/comments/1wp5dn3/claude_in_chrome_extension_tab_group_behavior_is/)称标签会进入名为“Claude”的群组；[另一位用户询问为什么扩展结束后没有清理](https://www.reddit.com/r/claude/comments/1upz6te/why_doesnt_claude_in_chrome_clean_up_after_itself/)。这是个别体验。Anthropic GitHub 上的[功能建议](https://github.com/anthropics/claude-code/issues/15436)讨论 Claude Code 通过 Claude in Chrome 工作时的标签组清理，涉及的开发界面与 Cowork 或普通扩展侧栏并不完全相同。` },
				{ heading: "开始任务前记下要保留的页面", body: `委托网页任务前，记下当前标签标题和未提交的表单或草稿。告诉 Claude 哪些网站和页面属于本次任务，请它不要碰其他标签。专属 Claude 群组有助于观察，但群组名称本身不能证明每一页都是本次任务新开的。

任务结束时，请 Claude 先列出群组和准备关闭的标签，并提供标题或网址。把清单和开始前记录对照。页面归属不清，或表单可能有未保存内容时，先保留并自行检查。这个复核流程是建议做法，BrowserHub 没有在 Claude 实际会话中运行测试。` },
				{ heading: "关闭群组不等于删除已保存群组", body: `Chrome 帮助把 Close group 和 Delete group 分成两项。检查过群组后，可右键群组标签并选择 Close group，将其从当前标签栏收起。Chrome 称关闭后的群组会保存，可以再次打开。Delete group 则会从设备和使用同一 Google 账号同步群组的其他设备中移除该群组。

关闭前确认群组里只包含愿意关闭的页面。标签可能包含未保存的表单或编辑状态；已同步的群组也会影响其他设备。要让某个页面继续打开但脱离群组，可右键该标签并选择 Remove from group。当前桌面操作步骤见 Google 的[标签组帮助](https://support.google.com/chrome/answer/2391819)。` },
				{ heading: "给任务添加明确的收尾要求", body: `可以补充一条边界指令：“任务结束时，先列出本次任务中新开的标签。未经我检查清单，不要关闭、移动或删除任何标签。任务开始前已打开的页面一律保留。若不能判断哪些标签是本次新开的，请停止并询问。”

这条指令要求提供清单供人工检查，并不能保证 Claude 总能区分旧标签和新标签。Anthropic 说明扩展可以在任务中关闭标签，所以在允许关闭前应先看清具体清单。若你关心的是已保存的定时快捷方式，请看[Claude in Chrome 快捷方式与日程指南](/zh-cn/guides/claude-chrome-shortcuts-schedule/)；那篇讨论任务保存，不是标签清理。` },
				{ heading: "资料来源与限制", body: `Anthropic 在[Claude in Chrome 入门指南](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)中说明扩展权限和标签组。Google 在[Chrome 帮助](https://support.google.com/chrome/answer/2391819)中说明关闭或删除群组的区别。Claude Code 的[Chrome 集成文档](https://code.claude.com/docs/en/chrome)另行说明本地会话结束时如何清理标签；这些 CLI 规则不能证明 Cowork 或普通扩展有相同行为。[RZ AI Labs 的独立文章](https://rzailabs.com/blog/agent-browser-for-claude-code)建议 Claude Code 使用隔离浏览器工具，但没有解决所有 Claude in Chrome 用户的清理需求。BrowserHub 未测试 Cowork、Claude Code 或扩展实际行为，也不声称存在通用的自动清理开关。` }
			],
			faq: [
				{ question: "Claude in Chrome 会在任务结束时自动关闭标签组吗？", answer: "普通扩展的入门指南说明标签组和控制能力，但没有承诺每项任务结束后自动清理。Claude Code 本地 Chrome 会话另有 /clear、/resume 和退出规则，不能推广到扩展侧栏或 Cowork。" },
				{ question: "怎样关闭 Claude 群组但保留以后再打开的可能？", answer: "在 Chrome 中右键检查过的群组，选择 Close group。Chrome 称关闭后的群组会保存并可重新打开。" },
				{ question: "Close group 和 Delete group 有什么区别？", answer: "Close group 会从当前标签栏移除并保留已保存的群组；Delete group 会把群组从已同步的设备中也删除。" },
				{ question: "能要求 Claude 只关本次任务新开的标签吗？", answer: "可以要求先列清单，但要与任务开始前的页面记录核对。提示词不能保证它准确判断每个标签的归属。" }
			]
		}
	}
};

export const aiCycleTranslations25: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides25: EditorialGuide[] = Object.keys(copies).map((slug) => ({
	...copies[slug]["zh-cn"], slug, date: "2026-11-25", sourcePath: `src/data/ai-cycle-2026-11-25.ts#${slug}`,
	availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
