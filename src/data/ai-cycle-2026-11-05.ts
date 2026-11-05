import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, { title: string; url: string }[]> = {
	"ai-browser-vs-ai-search-engine": [
		{ title: "Google Chrome Help: Change your default search engine", url: "https://support.google.com/chrome/answer/95426?hl=en" },
		{ title: "Google Search Help: AI Overviews and more", url: "https://support.google.com/websearch/answer/14901683?hl=en" },
		{ title: "Google Search Labs Help: AI Mode", url: "https://support.google.com/websearch/answer/16296315?co=GENIE.Platform%3DDesktop&hl=en" },
		{ title: "AI Multiple: AI Web Browsers Selection Guide", url: "https://aimultiple.com/ai-web-browser" },
		{ title: "Norton: Browser vs. search engine", url: "https://us.norton.com/blog/digital-life/browser-vs-search-engine" },
		{ title: "Reddit browsers: looking for a browser without AI every search", url: "https://www.reddit.com/r/browsers/comments/1up7tde/is_there_any_good_browser_that_doesnt_ask_ai/" }
	],
	"comet-query-shortcuts": [
		{ title: "Perplexity Help: Comet Query Shortcuts", url: "https://www.perplexity.ai/help-center/comet/en/articles/11906981-comet-query-shortcuts" },
		{ title: "Cosmo Edge: Perplexity Comet browser tips", url: "https://cosmo-edge.com/comet-ai-browser-tips-guide/" },
		{ title: "Reddit: How can I create custom shortcuts in Perplexity Comet?", url: "https://www.reddit.com/r/PerplexityComet/comments/1nkvd68/how_can_create_custom_shortcuts_in_perplexity/" },
		{ title: "Reddit: Share your cool /Shortcuts on Comet", url: "https://www.reddit.com/r/PerplexityComet/comments/1mhdrnj/share_your_cool_shortcuts_on_comet/" }
	],
	"comet-extension-compatibility": [
		{ title: "Perplexity Help: Extensions in Comet", url: "https://www.perplexity.ai/help-center/comet/en/articles/11734716-extensions" },
		{ title: "AIA Alleyway: Comet browser review", url: "https://aialleyway.com/comet-browser-review/" },
		{ title: "LastPass Community: Comet browser extension support", url: "https://community.lastpass.com/discussion/2678/does-anyone-know-of-a-lastpass-extension-for-comet-browser-its-a-chrome-based-agentic-browser" },
		{ title: "Zenity Labs: Comet browser security analysis", url: "https://labs.zenity.io/post/perplexity-comet-a-reversing-story" },
		{ title: "Reddit: Extension not working on Perplexity pages in Comet", url: "https://www.reddit.com/r/perplexity_ai/comments/1mgnxok/extension_not_working_on_perplexity_pages_on_comet/" }
	],
	"comet-import-export-vs-sync": [
		{ title: "Perplexity Help: Getting Started with Comet: Set Up", url: "https://www.perplexity.ai/help-center/comet/en/articles/11583745-getting-started-with-comet-set-up" },
		{ title: "Perplexity Help: Sync Between Devices", url: "https://www.perplexity.ai/help-center/comet/en/articles/12569908-sync-between-devices" },
		{ title: "Perplexity Help: Local Data & Device Storage", url: "https://www.perplexity.ai/help-center/comet/en/articles/11740986-local-data-device-storage" },
		{ title: "Perplexity: Self-Serve Data Options", url: "https://www.perplexity.ai/en-GB/hub/legal/self-serve-data-options" },
		{ title: "Tom's Guide: How to use Perplexity Comet", url: "https://www.tomsguide.com/ai/perplexity/how-to-use-perplexity-comet" },
		{ title: "Digital Trends: Perplexity Comet Android review", url: "https://www.digitaltrends.com/computing/i-tried-comet-browser-on-my-phone-and-its-a-wake-up-call-for-chrome-and-safari/" },
		{ title: "Reddit: Chrome to Comet data import question", url: "https://www.reddit.com/r/PerplexityComet/comments/1ms3ep6/how_to_import_all_password_bookmarks_form_fills/" }
	],
	"gemini-auto-browse-local-vs-remote": [
		{ title: "Google Gemini Apps Help: Auto browse in Chrome", url: "https://support.google.com/gemini/answer/16821166?hl=en" },
		{ title: "TechRadar: I tried Gemini Spark in Chrome", url: "https://www.techradar.com/ai-platforms-assistants/i-tried-gemini-spark-in-chrome-and-its-the-perfect-ai-for-handling-all-the-boring-bits-online" },
		{ title: "9to5Google: Gemini Spark can now use Chrome to auto browse", url: "https://9to5google.com/2026/07/30/gemini-spark-chrome-auto-browse/" },
		{ title: "Android Central: Gemini Auto Browse arrives in Chrome on Android", url: "https://www.androidcentral.com/apps-software/ai/geminis-auto-browse-in-chrome-is-finally-here-for-android-to-make-the-mundane-a-breeze" }
	]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"ai-browser-vs-ai-search-engine": {
		en: {
			title: "AI browser vs AI search engine: which do you need?",
			description: "Separate the browser, default search engine, AI answer layer and page-aware assistant so you can choose what changes your results and what can act on a tab.",
			category: "AI browser guides",
			content: "An AI answer appearing after you type in Chrome does not automatically mean Chrome itself is an AI browser. The browser opens and manages pages; its default search engine receives address-bar searches; a search service may add generated answers to results; and a browser assistant may read the current page or perform actions. Choose the layer that solves the problem you actually have. If you want sourced discovery across the web, check the search service; it may also offer connected apps or agentic actions. If you want help using the page already open, check a page-aware assistant. If you want ordinary browsing without a particular AI search experience, change the default search provider and check which browser features remain available. This guide narrows the distinction beyond our [AI browser vs browser agent overview](/en/guides/ai-browser-vs-browser-agent/): it focuses on discovery in search results versus work inside a live tab.",
			sections: [
				{ heading: "Identify the layer before changing settings", body: `A useful diagnosis begins with the exact place where the AI appears. If a new tab opens a search page with summaries, the search provider or its results page is involved. If text in the address bar is sent to a provider, the browser's default search-engine setting is involved. If a side panel summarizes the page you are viewing, that is a browser-integrated assistant. If an agent clicks links, fills fields or moves between websites, you are asking for task execution. These can coexist, and changing one setting may leave the others untouched.

Try describing the behavior without the product label: “When I type a question in the address bar, I see an AI summary above links.” That points to search results. “I am on a long article and want an explanation of this section” points to page context. “Compare the three open product pages and prepare a shortlist” asks for cross-page synthesis. “Put a product in my cart” asks an agent to act. This plain-language description makes it easier to find the correct setting and to avoid disabling a feature you meant to keep.

The distinction matters because the same browser can use a conventional search engine, while an AI search engine can run in a normal browser. An AI browser may bundle a search provider and assistant, but the words “AI browser” do not tell you which parts are optional, which data are shared, or which actions require confirmation. Check each product's current help page before assuming that a switch controls the whole experience.` },
				{ heading: "Choose the experience by the job", body: `| Your job | Start with | What to verify |
| --- | --- | --- |
| Find web pages and compare sources | Search engine or search page | Whether answers cite sources, how results are filtered, and whether generated summaries can be hidden |
| Ask about one page already open | Browser sidebar or page assistant | What page content is sent, whether it reads only the active tab, and how to clear history |
| Continue a task across several sites | Browser agent | Which browser session it uses, which steps need your approval, and how to stop or take over |
| Remove an AI layer from address-bar results | Default search engine settings | Which provider receives queries and whether the browser itself still has separate AI tools |

This table is a selection framework, not a claim that every product offers each control. Search engines and browser assistants change frequently. Use the current product documentation to confirm the exact switches, eligibility and data settings for your account and region.` },
				{ heading: "Change the default search engine without confusing it with AI controls", body: `In Chrome, Google documents the address-bar provider under Settings → Search engine → Change in its [Chrome search-engine instructions](https://support.google.com/chrome/answer/95426?hl=en). That setting determines which search engine handles searches from the address bar; it does not necessarily remove an AI assistant button or generated features on every website. After selecting another provider, open a new tab and enter a neutral query. Check the destination domain, the result page, and whether the summary appears there. Then open a page and check whether a separate browser assistant remains available.

Keep a record of the prior provider and how to restore it. If Chrome does not list the engine you expect, visit its website and follow the browser's current instructions for adding or selecting it; do not install a lookalike extension just to change search behavior. Some search features may not work when the selected provider does not support them. A search setting is reversible, but extensions and system policies can also influence the address bar, so check the browser's managed status if a choice is locked or changes back.

This process changes where a query is sent. It does not guarantee that every AI feature across the browser, operating system, website or search provider is disabled. Avoid broad “turn off AI everywhere” claims: the available controls differ by product and may be split across search settings, experimental-feature settings, account activity and page-level tools.` },
				{ heading: "Understand AI summaries in search results", body: `Google says AI Overviews are a core Google Search feature that cannot be turned off. After you run a search, the Web filter can show text-based links without features such as AI Overviews. Turning off “AI in Search” in Labs opts out of Labs experiments only; it is not a universal switch for core AI Overviews. See the [current Google Search help page](https://support.google.com/websearch/answer/14901683?hl=en) before changing settings; Google says Search-service settings are being updated, so screenshots may not match your current experience.

When a generated answer appears, treat it as a starting summary. Open the cited sources, compare the claims with the original pages, and note when a cited page does not support a sentence. A citation can be relevant without proving every clause in a generated paragraph. Search summaries can make mistakes, omit context or reflect a query interpretation you did not intend. For high-impact decisions, use primary sources and a qualified professional where appropriate.

If your goal is to see conventional links first, test the provider's available filters and settings with the same query. Record what changed, including whether the AI block disappears, moves lower, or remains accessible in another tab. Avoid concluding that the browser has changed when the result page is simply using a different presentation.` },
				{ heading: "When you need a page assistant or agent", body: `A search engine starts with discovery by retrieving and organizing pages, but the product may also offer agentic search features, connected apps or actions. Google Search Labs, for example, [documents](https://support.google.com/websearch/answer/16296315?co=GENIE.Platform%3DDesktop&hl=en) AI Mode experiments that can help eligible users find reservations or appointments. A page assistant has a different starting point: the page currently open, whose text or other context it may receive. An agent can interact with sites, but the exact capability depends on the named product, account and task. Before enabling either, read the provider's explanation of page access, activity retention and account connections. If you use a logged-in page, consider whether the agent can see private information or submit a form. Keep payment, account recovery, medical, legal and other sensitive steps under your direct control.

Ask for a bounded task such as “summarize this public page and link each claim to the paragraph that supports it.” Avoid granting a broad instruction to complete an entire purchase or account change without checkpoints. Review the plan before execution, inspect the destination site, and take over before a sensitive or irreversible action. If the result looks wrong, stop the task and verify the source rather than asking the same system to certify itself.

For a research workflow that compares more than one site, use the separate [source verification guide](/en/guides/ai-browser-research-source-verification/). For task execution and controls, read [AI browser vs browser agent](/en/guides/ai-browser-vs-browser-agent/) and the [human takeover guide](/en/guides/browser-agent-human-takeover/). These pages cover broader agent boundaries; this article is specifically about deciding whether AI belongs in search discovery or in the current browsing session.` },
				{ heading: "Troubleshoot the common mismatch", body: `If you changed the default search engine but still see AI, first check the destination URL after submitting a query. The provider's result page may include AI even though Chrome's setting worked. If the destination is unexpected, inspect browser extensions, managed-device policies and any search shortcut or keyword setting. Change one setting at a time so you know which control affected the result.

If a page assistant cannot answer about the active tab, check that the feature is enabled, that the page is accessible to it, and that the site does not block reading. Do not paste restricted or private page contents into a different service just to bypass a limitation. If an agent says it finished but you do not see the expected state, inspect the site yourself; a generated completion message is not evidence that a booking, upload or account update succeeded.

Keep the terms precise in your notes: “search provider changed,” “AI summary hidden by a filter,” “assistant disabled on this device,” or “agent stopped before submission.” Those statements describe an observed control. “AI is off” is broader and may be false when other layers remain active.` }
			],
			faq: [
				{ question: "Is an AI browser the same thing as an AI search engine?", answer: "No. A browser manages web pages; a search engine finds and ranks pages and may add generated answers. A browser can integrate an AI search provider or a separate page assistant, so identify which layer you are using." },
				{ question: "If I change Chrome's default search engine, does that turn off AI in Chrome?", answer: "It changes the provider used for address-bar searches. It does not necessarily disable separate browser assistants, AI features on other pages, or every feature offered by the selected search provider." },
				{ question: "Can I remove all AI Overviews from Google Search?", answer: "No universal off switch is documented for core AI Overviews. Google says they cannot be turned off; after a search, the Web filter displays text links without them. Turning off AI in Search Labs affects Labs experiments only. Check Google's current settings because the page says Search settings are being updated." },
				{ question: "What should I use to summarize the tab I already opened?", answer: "A page-aware assistant is designed for that task. Check what content it can access and how it handles history, then verify important statements against the original page." }
			]
		},
		"zh-cn": {
			title: "AI 浏览器和 AI 搜索引擎：区别与选择",
			description: "区分浏览器、默认搜索引擎、搜索结果 AI 和页面助手，判断该改哪个设置、哪些功能仍会保留。",
			category: "AI 浏览器指南",
			content: "在 Chrome 输入问题后出现 AI 答案，不等于 Chrome 本身就是 AI 浏览器。浏览器负责打开和管理网页；默认搜索引擎接收地址栏查询；搜索服务可能在结果页加入生成式答案；浏览器助手则可能读取当前页面或执行操作。先确认你遇到的是哪一层，再选择工具或设置。如果你要跨网页查找并比较来源，可查看搜索服务提供的能力；部分服务也有连接应用或智能体操作。如果要理解已打开的页面，可查看页面助手；如果不想用某个 AI 搜索结果，可更换默认搜索服务并检查仍保留哪些独立 AI 功能。本指南进一步细分了[AI 浏览器与浏览器智能体的区别](/zh-cn/guides/ai-browser-vs-browser-agent/)，聚焦搜索发现与当前标签页操作的差异。",
			sections: [
				{ heading: "先找出 AI 所在的功能层", body: `先观察 AI 出现的位置。如果新标签页打开搜索结果并附带摘要，涉及的是搜索服务或结果页。如果地址栏里的文字被发送给某个服务，涉及浏览器的默认搜索引擎。如果侧栏总结当前网页，属于浏览器集成的页面助手。如果智能体会点击链接、填写表单或在网站间切换，你要求的是任务执行。这些功能可能同时存在，改一个设置不一定会影响其余功能。

试着不用产品名称描述实际现象：“我在地址栏输入问题后，结果页在链接上方显示 AI 摘要。”这通常指向搜索结果。“我正在看一篇长文，想解释其中一段。”这指向页面上下文。“比较三个已打开的商品页面，整理候选清单”要求跨页综合。“把商品加入购物车”要求智能体执行操作。用普通语言描述能帮你找到正确设置，也能避免关闭自己本来想保留的功能。

同一个浏览器可以使用传统搜索引擎，AI 搜索引擎也可以在普通浏览器中打开。“AI 浏览器”这个名称本身无法说明哪些部件可选、共享哪些数据或哪些操作需确认。即使产品把搜索服务和助手放在一起，也要分别查看当前帮助文档。` },
				{ heading: "根据任务选择入口", body: `| 任务 | 优先查看 | 需要核实 |
| --- | --- | --- |
| 查找网页并比较来源 | 搜索引擎或搜索页 | 是否引用来源、如何筛选结果、生成摘要能否隐藏 |
| 询问当前打开的页面 | 浏览器侧栏或页面助手 | 发送哪些页面内容、是否仅读当前标签、如何清除历史 |
| 在多个网站间继续做任务 | 浏览器智能体 | 使用哪个会话、哪些步骤需批准、如何停止或接管 |
| 不希望地址栏搜索出现某类 AI 结果 | 默认搜索引擎设置 | 哪个服务收到查询，浏览器本身是否还有其他 AI 功能 |

这是一套选择思路，并不表示每个产品都提供表格里的所有控制。搜索服务和浏览器助手更新较快，请按当前产品文档确认设置、资格与数据选项。` },
				{ heading: "更改默认搜索引擎时别混淆 AI 开关", body: `Google 的[Chrome 搜索引擎说明](https://support.google.com/chrome/answer/95426?hl=en)指导你在“设置→搜索引擎→更改”里选择地址栏的搜索服务。这个设置决定地址栏查询交给哪个引擎，不一定会移除助手按钮，也不一定控制每个网站上的生成式功能。更改后打开新标签页，输入普通查询，检查网址、结果页和摘要是否出现；再打开一篇网页，确认独立的浏览器助手是否仍可用。

记下之前使用的服务和恢复方法。如果 Chrome 列表中没有预期的引擎，可访问其网站并按当前说明添加或选择；不要为了改变搜索行为安装名称相似的扩展。所选服务不支持某些搜索功能时，部分体验可能无法使用。设置通常可以改回；如果选择被锁定或自动恢复，还应检查浏览器扩展和设备管理策略。

这个流程改变的是查询发送到哪里，不代表浏览器、操作系统、网站和搜索服务中的所有 AI 都已关闭。避免笼统宣称“彻底关闭 AI”：不同产品的开关可能分散在搜索设置、实验功能、账户活动和页面工具中。` },
				{ heading: "理解搜索结果中的 AI 摘要", body: `Google 明确说 AI Overviews 是 Google 搜索的核心功能，无法关闭。完成搜索后，可选择 Web 筛选器，只显示不含 AI Overviews 等功能的文本链接。关闭 Labs 中的“AI in Search”只退出实验，并不是关闭核心 AI Overviews 的通用开关。更改前请阅读[Google 当前搜索帮助页](https://support.google.com/websearch/answer/14901683?hl=en)：Google 提醒搜索服务设置正在更新，因此页面截图可能与你的界面不同。

看到生成式答案时，把它当作摘要线索。打开引用来源，逐项对照原文，检查该页面是否支持答案中的每个说法。引用相关网页不等于网页证明了整段答案。搜索摘要可能出错、漏掉上下文，或误解你的查询。重要决策应以一手来源为准，必要时咨询合格专业人士。

如果你想先看传统链接，可以对同一个查询测试服务提供的筛选和设置。记录 AI 区块是否消失、移到下方，或仍能在另一个标签页访问。不要把结果页展示变化误认为浏览器自身已经改变。` },
				{ heading: "何时需要页面助手或智能体", body: `搜索引擎首先通过检索和整理网页帮助发现信息，但产品也可能提供智能体搜索、连接应用或操作功能。例如，Google Search Labs 的[AI Mode 帮助页](https://support.google.com/websearch/answer/16296315?co=GENIE.Platform%3DDesktop&hl=en)说明，实验功能可帮助符合条件的用户寻找预约或餐厅。页面助手的起点不同：它关注当前打开的页面，可能会收到页面文字或其他上下文。智能体还可能与网站交互，但具体能力取决于产品、账户和任务。启用前请查看服务对页面访问、活动保留和账户连接的说明。若网页已登录，想清楚智能体能否看到私人内容或提交表单。付款、账户恢复、医疗、法律和其他敏感步骤应由你亲自控制。

可以先给出范围明确的任务，例如“总结此公开页面，并把每个结论链接到支持它的段落”。不要在没有检查点时授权它完成整笔购买或账户修改。执行前检查计划和目标网站；到敏感或不可逆步骤时先接管。如果结果看起来不对，应核对来源，而不是让同一系统为自己的答案背书。

跨网站研究可读[来源核验指南](/zh-cn/guides/ai-browser-research-source-verification/)；任务执行与控制可读[AI 浏览器与浏览器智能体](/zh-cn/guides/ai-browser-vs-browser-agent/)和[人工接管指南](/zh-cn/guides/browser-agent-human-takeover/)。那些页面覆盖更广的智能体边界；本文专门帮助你判断 AI 应参与搜索发现还是当前会话。` },
				{ heading: "常见设置不匹配的排查方法", body: `如果更换默认搜索引擎后仍看见 AI，先看提交查询后的目标网址。可能是新服务的结果页本身就带 AI。如果目标服务不对，检查扩展、受管理设备策略以及搜索快捷词设置。一次只改一项，才能知道哪个控制影响了结果。

如果页面助手无法回答当前标签的问题，检查该功能是否启用、页面是否可访问，以及网站是否限制读取。不要为了绕过限制，把受限或私密页面内容复制到另一个服务。如果智能体说已完成，但页面状态没有变化，亲自打开网站检查；生成式“完成”消息不能证明预约、上传或账户修改成功。

在记录中使用准确说法：“已更改搜索服务”“用筛选器隐藏摘要”“本设备助手已关闭”或“提交前已停止智能体”。这些描述的是实际观察到的控制。“AI 已关闭”范围更大，其他层可能仍然运行。` }
			],
			faq: [
				{ question: "AI 浏览器和 AI 搜索引擎是一回事吗？", answer: "不是。浏览器管理网页；搜索引擎查找和排序网页，也可能加入生成式答案。浏览器还能集成搜索服务或独立页面助手，因此要确认当前使用的是哪一层。" },
				{ question: "更改 Chrome 默认搜索引擎会关闭 Chrome 中的 AI 吗？", answer: "它会更改地址栏查询所使用的服务，但不一定会关闭独立的浏览器助手、其他网站上的 AI 功能，或新搜索服务提供的全部功能。" },
				{ question: "能完全移除 Google 搜索里的 AI Overviews 吗？", answer: "Google 说明核心 AI Overviews 无法关闭。搜索后使用 Web 筛选器可只显示不带摘要功能的文本链接；关闭 Labs 中的 AI in Search 只影响实验。设置页面正在更新，请查看 Google 当前说明。" },
				{ question: "想总结当前打开的标签页，该用什么？", answer: "页面助手适用于这类任务。启用前检查它能访问哪些内容和如何处理历史，并用原网页核实重要结论。" }
			]
		}
	},
	"comet-query-shortcuts": { en: { title: "How to Create and Use Query Shortcuts in Perplexity Comet", description: "Set up reusable Comet prompts, choose their search mode, model and sources, and understand why a shortcut still needs you to submit it.", category: "AI browser guides", content: "Comet Query Shortcuts are reusable prompt setups, not background tasks that silently run on their own. Perplexity’s current instructions describe a saved prompt with Search Mode, Model and Source, invoked from the search bar or sidecar. This guide follows the workflow checked November 5, 2026; BrowserHub did not run a Comet account test. Keyboard shortcuts are a separate browser control.", sections: [
		{ heading: "What a query shortcut saves", body: `A shortcut packages a repeatable instruction with search options so you do not have to rebuild the same query each time. It is useful for a stable research pattern such as “compare official release notes and list changed settings” or “summarize this page and include supporting links.” It does not make an unreliable prompt reliable, grant access to a source, or guarantee that an answer will follow every preference.

Perplexity's current [Query Shortcuts help page](https://www.perplexity.ai/help-center/comet/en/articles/11906981-comet-query-shortcuts) says shortcuts can be called from the search bar or sidecar and do not auto-run. The saved prompt can be reviewed in Settings → Shortcuts; after calling it, add any one-off context. It expands into the full prompt when you click Submit.

Keep keyboard commands distinct. A browser hotkey opens a control or runs a local command; a query shortcut inserts a prepared research instruction. If you mean a key combination, consult Comet's keyboard shortcut section in Settings rather than creating a query recipe.` },
		{ heading: "Create a shortcut around one clear task", body: `Create one shortcut for one repeated question. In the search bar or sidecar, type / and choose Create a shortcut. In the editor, enter the prompt, choose Search Mode, Model and Source, give the shortcut a clear name, then save. A practical low-risk example is a public release-note review: “Compare these public release notes. Return a table with version, date, changed behavior, official URL, and any detail the source does not specify.” Set the source preference to official documentation when that is available; still open the returned pages yourself.

The current help page does not promise template variables, so do not design a workflow that depends on bracket substitution. Keep the saved prompt stable, and add one-off context after calling it. Before saving, remove account identifiers, personal details, private URLs and confidential text. A shared shortcut can circulate beyond the original creator; a prompt is reusable content, not a secure container for secrets.` },
		{ heading: "Invoke it and inspect before submitting", body: `Type / in the search bar or sidecar, select the intended shortcut, and add any extra context after it. The saved shortcut itself can be edited from Settings → Shortcuts; review that prompt there before relying on it. Perplexity says entering a shortcut does not auto-run it. Click Submit when ready; at submission, the shortcut expands into its full prompt.

This sequence catches common problems: selecting a similarly named shortcut, adding the wrong page context, leaving a stale date or product version in your saved prompt, or sending an instruction that no longer fits. If comparing two sources, name both source types and ask for a separate row per claim. If the answer returns citations, open the important pages and verify that they support the claims.

For a sensitive site or a signed-in account, stop before submitting if the prompt includes private data. The official shortcut feature description does not replace the site's own access policy or your account's data controls. A saved query prompt should not contain passwords, recovery codes, customer lists or payment information.` },
		{ heading: "Edit, organize and share carefully", body: `Open Comet's shortcut manager in Settings to review or edit saved entries; follow the current UI because menus may move. Retire duplicates and update prompts when a product, policy or page layout changes. A shortcut that says “use the latest rules” still needs a source date and a check against current official guidance.

Perplexity's help page describes sharing shortcuts through a link and displaying them as a new-tab widget. Before sharing, inspect the prompt and its configured choices for confidential information or unsupported claims. A recipient should review the shared shortcut after opening it, confirm it still fits their account and region, and then decide whether to save it. Do not claim that a shortcut link transfers an account, browsing session or private source access.

If the shortcut is missing, check the account/profile and Settings manager, then confirm you are using the intended Comet interface. If it appears but behaves differently, compare the saved fields with the current UI, update stale wording and run a harmless query. Do not create many near-identical shortcuts to work around an unclear prompt; simplify the recipe first.` },
		{ heading: "A practical shortcut review checklist", body: `Before relying on a saved recipe, check: (1) its name describes one task; (2) the prompt requests a concrete output; (3) source and search settings match the job; (4) no secret or unnecessary personal data is embedded; (5) the date and product version are not stale; (6) review the saved prompt in Settings; (7) add only appropriate one-off context; and (8) open citations for consequential claims after submitting.

For recurring comparison work, ask for a compact table with source, date, claim and confidence/unknown fields. For a single page, ask for a summary with section references. For a task involving action, use an explicit stop point before sending, purchasing, changing an account or sharing content. Query shortcuts help standardize the question; they cannot guarantee factual accuracy or safe execution.

If you are organizing broader browser work, see [how to organize tabs by task](/en/guides/ai-browser-organize-tabs-by-task/) and [how to verify research sources](/en/guides/ai-browser-research-source-verification/). Those guides address the surrounding workflow rather than shortcut creation itself.` }
	], faq: [ { question: "Do Comet shortcuts run automatically?", answer: "Perplexity's current help page says a shortcut will not run when selected. Type /, select it, add any extra context, then click Submit; the shortcut expands into its full prompt at submission. Edit and review the saved prompt in Settings → Shortcuts." }, { question: "Which fields can I configure?", answer: "The current guide describes a prompt plus Search Mode, Model and Source. Check Comet's live editor because interface labels and options can change." }, { question: "Are query shortcuts the same as keyboard shortcuts?", answer: "No. Query Shortcuts are saved prompt setups. Keyboard shortcuts are key combinations documented separately in Comet settings." }, { question: "Can I share one with a coworker?", answer: "Perplexity documents link sharing and a new-tab widget. Review the prompt for private details and have the recipient inspect its settings before use." } ] },
		"zh-cn": { title: "如何创建和使用 Perplexity Comet 查询快捷方式", description: "配置可复用的 Comet 提示词、搜索模式、模型和来源，并了解为什么快捷方式仍需你检查后提交。", category: "AI 浏览器指南", content: "Comet 查询快捷方式是可复用的提示词设置，不是会在后台静默运行的任务。Perplexity 当前说明支持设置提示词、搜索模式、模型和来源，再从搜索栏或助手侧栏调用。它可以减少重复配置，但仍需你检查提示并提交查询。本文按 2026 年 11 月 5 日的 Perplexity 文档整理步骤；BrowserHub 未登录 Comet 实测。键盘快捷键是另一种浏览器控制。", sections: [
		{ heading: "查询快捷方式能保存什么", body: `快捷方式把重复使用的指令与搜索选项打包，省去每次重新设置。例如“比较官方版本说明并列出设置变化”，或“总结当前页面并附上支持结论的链接”。它能减少重复输入，却不能让模糊提示自动变准确，也不能保证答案遵守每一项偏好或访问某个来源。

Perplexity 当前的[查询快捷方式帮助页](https://www.perplexity.ai/help-center/comet/en/articles/11906981-comet-query-shortcuts)说明，可从搜索栏或侧栏调用配方；选中后不会自动运行。可先在设置→快捷方式中查看已保存的提示词。调用时可补充临时上下文；点击提交后，快捷方式才会展开成完整提示词。

键盘命令不要混为一谈。浏览器热键用于打开控制或运行本地命令；查询快捷方式则插入已准备好的研究指令。如果你想找组合键，请查看设置里的 Comet 键盘快捷键说明。` },
		{ heading: "围绕一个明确任务创建快捷方式", body: `创建步骤：在搜索栏或侧栏输入 /，选择“创建快捷方式”；在编辑器里输入提示词，选择搜索模式、模型和来源；填写清楚的名称，然后保存。可以从公开版本说明做一个低风险示例：“对比这些公开更新说明，输出版本、日期、行为变化、官方链接，以及来源没有说明的细节。”来源选项可用时优先选择官方文档，答案返回后仍要打开链接核实。

当前帮助页没有承诺模板变量，因此不要设计依赖方括号替换的流程。保存前删除账号标识、个人信息、私有网址和机密文字。共享快捷方式可能传播给其他人；提示词可转发，不能用来存秘密。` },
		{ heading: "调用后先检查再提交", body: `在搜索栏或侧栏输入 /，选择想用的快捷方式，再在后面补充临时上下文。可在设置→快捷方式中先检查已保存提示词。Perplexity 说明，选中后不会自动运行；准备好后点击提交，完整提示词会在提交时展开。

这样能发现误选同名配方、上下文错误、提示中残留过期日期或版本等问题。若比较两个来源，请写清来源类别，并要求每条结论单独列出。答案返回引用后，打开关键页面核实是否支持相关说法。

登录网站或敏感账户的提示若包含私人资料，应先停止并删除。官方快捷方式说明不能代替网站规则或账户数据控制。不要把密码、恢复码、客户名单或付款信息存入提示词。` },
		{ heading: "编辑、整理和分享时的注意事项", body: `可在 Comet 设置里的快捷方式管理页面查看或编辑条目；具体菜单以当前界面为准。清理重复项，并在产品、政策或页面布局变化后更新提示。即使提示写着“使用最新规则”，仍应标注来源日期并核对当前官方说明。

Perplexity 帮助页说明可通过链接分享快捷方式，也可放在新标签页组件里。分享前检查提示词和配置是否包含机密或未经证实的说法。接收者打开后应检查配方是否适用于自己的账户和地区，再决定是否保存。不要把快捷方式链接说成能转移账户、浏览会话或私人来源权限。

如果快捷方式不见了，检查账户或配置文件，再到设置管理页确认；同时确认自己使用的是预期的 Comet 界面。如果它存在但行为不同，对比已保存字段与当前编辑器，更新过期文字后用无风险查询试一次。不要用大量近似快捷方式掩盖提示本身不清楚的问题。` },
		{ heading: "依赖快捷方式前的检查清单", body: `使用前检查：一，名称只描述一项任务；二，提示要求具体输出；三，来源和模式符合任务；四，没有嵌入秘密或不必要个人信息；五，日期和版本没有过时；六，在设置里检查已保存提示词；七，只补充合适的一次性上下文；八，提交后打开重要引用核实。

做定期比较时，可要求输出来源、日期、原文结论及未知字段。总结单个页面时，可要求标出章节。涉及实际操作时，应在发送、购买、修改账户或分享内容前设置明确暂停点。快捷方式帮助规范问题，不会保证事实准确，也不负责安全执行。

如需整理更完整的浏览流程，可继续阅读[按任务整理标签页](/zh-cn/guides/ai-browser-organize-tabs-by-task/)和[研究来源核验指南](/zh-cn/guides/ai-browser-research-source-verification/)。它们讲的是周边工作流，不是快捷方式创建步骤。` }
	], faq: [ { question: "Comet 查询快捷方式会自动运行吗？", answer: "Perplexity 当前帮助页说明选中后不会自动运行。输入 / 并选择快捷方式，可补充上下文，再点击提交；完整提示词会在提交时展开。可先在设置→快捷方式中编辑并检查已保存提示。" }, { question: "可以配置哪些字段？", answer: "当前帮助页列出提示词、搜索模式、模型和来源。界面选项可能变化，请以 Comet 编辑器为准。" }, { question: "查询快捷方式等于键盘快捷键吗？", answer: "不等于。查询快捷方式是保存的提示词设置；键盘快捷键是另行记录的组合键。" }, { question: "可以分享给同事吗？", answer: "Perplexity 说明支持链接分享和新标签页组件。分享前检查是否含私人信息，并让接收者先检查配置。" } ] }
	},
	"comet-extension-compatibility": { en: { title: "Do Chrome Extensions Work in Perplexity Comet? A Compatibility Checklist", description: "Check extension installation, site behavior, permissions and vendor support separately. Comet supports many Chrome extensions, but not every extension is guaranteed to work.", category: "AI browser guides", content: "Comet's Chromium base does not mean every Chrome extension will behave identically. Perplexity says most Chrome Web Store extensions work, while noting limitations for Chrome-specific integrations and extensions that try to change the default start page. Separate four questions: can it install, does it run on the pages you need, do its permissions fit your use, and does the extension vendor support Comet? This guide offers a documentation-based checklist, not a claim that BrowserHub tested any extension.", sections: [
		{ heading: "Compatibility has more than one meaning", body: `People often use “supported” to mean several different things. A store listing may install; the extension may load but fail on a specific website; it may work in one profile but not another; or the vendor may refuse to troubleshoot a browser it has not certified. Keep those outcomes separate.

Perplexity's [current Comet extensions page](https://www.perplexity.ai/help-center/comet/en/articles/11734716-extensions) says most Chrome Web Store extensions work, but not all. It calls out limitations particularly for Chrome-specific integrations or extensions that attempt to change the default start page. The page provides installation and management instructions, not an exhaustive list of supported extensions. Chromium compatibility is a starting clue, not a guarantee of identical behavior.

Community reports can identify questions to investigate, such as a password manager that installs but is not in its vendor's support list. A report from one user's setup does not establish universal incompatibility or support. Check the extension vendor's current requirements and test only in a low-risk profile before depending on it.` },
		{ heading: "Use this pre-install checklist", body: `- Find the source: prefer the Chrome Web Store listing linked from the developer’s official website. Check the publisher, update date and permissions; a similar name may belong to another extension.
- Read the developer’s browser-version, API and managed-policy requirements. Separately, Perplexity calls out Chrome-specific integrations and extensions that try to change the default start page.
- Confirm the use case: name the sites and profile where you need it. “Works in browser” does not prove it works in an internal dashboard, payment flow or protected page.
- Ask the vendor whether Comet is supported if the extension handles credentials, finance, security or business operations.
- Install only what you need. Review site scope and background permissions; do not grant broad access just to see whether an icon appears.

This checklist helps you reduce uncertainty; it does not certify an extension or product. If the extension's owner does not document Comet support, record that as unknown rather than inventing a yes/no result.` },
		{ heading: "Install and manage through Comet's documented controls", body: `The current Perplexity guide describes adding extensions from the Chrome Web Store using the store's Add to Comet control. It says you can manage extensions through Comet Settings or by opening chrome://extensions. Follow the live instructions because store labels can change. Avoid sideloading an unpacked extension or enabling developer mode as a generic fix; those steps change the trust boundary and are not the documented compatibility path in the cited Comet guide.

After installing, inspect the extension's details and permissions. Enable it only for the profile and sites needed. If it asks to “read and change all your data on all websites,” determine whether that access is necessary and whether the vendor explains its handling. For a password manager, check the vendor's supported browser list and sign-in guidance; an install button alone does not establish that the vendor will support recovery or autofill failures.

Do not enter production credentials just to see whether a toolbar icon responds. Start with a public page or a test account authorized for this purpose. A clean test can establish what you observed in that version and profile; it cannot prove the extension will remain compatible after an update.` },
		{ heading: "Test the exact behavior you need", body: `A small, safe review can help you decide whether to rely on an extension. Record Comet version, extension version, profile and date. Then check: does the extension install without an error; does its icon or menu open; does it operate on the specific site; are its expected permissions visible; and does the vendor list Comet as supported? Stop before changing an account, sharing content or authorizing a transaction.

If a feature fails on one site, try a second harmless public page to distinguish a site-specific limitation from a general load problem. Do not infer compatibility across every website from one successful page. If the extension is a browser-wide default search or new-tab replacement, check the Comet help center's explicit warning about default start-page changes and whether another setting is taking precedence.

Keep outcomes precise: “installed; toolbar opened; did not run on site X” is more useful than “compatible.” If a vendor says Comet is unsupported while a local test succeeds, record both facts. A successful local observation is not the same as vendor support or a guarantee against future breakage.` },
		{ heading: "Diagnose failure without weakening safeguards", body: `If installation is blocked, confirm the listing is from the correct publisher and read the current Comet help steps. Check the extension manager for a disabled state, update notice or permission prompt. If Comet reports that a required Chrome feature is unavailable, contact the extension vendor or choose an officially supported alternative; do not download a random build from a forum.

If the extension installs but fails on a site, check whether the site blocks extensions, whether the extension requires access to that domain, whether another extension conflicts, and whether the vendor documents that page. Remove or disable one extension at a time in a test profile. Avoid turning off browser security, bypassing site controls or copying private cookies as a workaround.

For account-critical tools, preserve a manual recovery route before experimenting. If the issue concerns password autofill or authentication, use the vendor's official support process and confirm the right browser support status. Do not export or expose credentials to demonstrate a bug.` },
		{ heading: "Decide whether to keep it", body: `Keep an extension only when it solves a named problem, its permissions are proportionate, and you can recover if it stops working. Remove unused entries and revisit permission choices when the developer changes access requirements. If the extension cannot be supported in Comet, a separate supported browser profile may be safer than repeatedly forcing it into a different environment.

Comet's compatibility statement is deliberately limited: “most” does not mean all, and the official page highlights some common limits without publishing a complete test matrix. Third-party reviews and community posts may describe one release or setup; use them as leads, then confirm with current product documentation and the extension publisher. BrowserHub has not installed or tested the listed extensions.

For broader product selection, read [Comet vs Gemini in Chrome](/en/guides/comet-vs-gemini-in-chrome/). For cross-device continuity, see [Comet import, export and sync](/en/guides/comet-import-export-vs-sync/); this article only covers extension compatibility.` }
	], faq: [ { question: "Do all Chrome extensions work in Comet?", answer: "No. Perplexity says most Chrome Web Store extensions work, but not all; it notes limits for Chrome-specific integrations and extensions that change the default start page." }, { question: "Where do I install or manage extensions?", answer: "Perplexity's current guide describes the Chrome Web Store Add to Comet flow and management through Settings or chrome://extensions. Confirm the live steps before relying on them." }, { question: "If the extension installs, is it supported by its developer?", answer: "Not necessarily. Installability and vendor support are separate. Check the extension publisher's current browser requirements, especially for security or account-critical tools." }, { question: "Can I use developer mode to make an extension work?", answer: "Do not treat sideloading as a general compatibility fix. The cited Comet guide documents the Web Store path; an unpacked extension changes the trust boundary and requires a separate, informed decision." } ] },
		"zh-cn": { title: "Perplexity Comet 能用 Chrome 扩展吗？兼容性检查清单", description: "分别检查能否安装、网站运行、权限范围和厂商支持。Comet 支持多数 Chrome 扩展，但不保证全部可用。", category: "AI 浏览器指南", content: "Comet 基于 Chromium，不代表所有 Chrome 扩展都会完全相同地运行。Perplexity 表示多数 Chrome 网上应用店扩展可用，但特别提到 Chrome 专用集成和试图更改默认起始页的扩展存在限制。请把问题分成四项：能否安装、能否在目标页面工作、权限是否合适、扩展厂商是否支持 Comet。本文依据文档整理检查清单；BrowserHub 没有安装或测试扩展。", sections: [
		{ heading: "兼容可能指不同结果", body: `“支持”常被用来描述不同状态。扩展可能能从商店安装；可能安装成功但在某个网站失效；可能只在某个配置文件里工作；也可能扩展厂商不为未认证的浏览器提供排障。请分别记录这些结果。

Perplexity 当前的[Comet 扩展帮助页](https://www.perplexity.ai/help-center/comet/en/articles/11734716-extensions)说多数 Chrome 网上应用店扩展可用，但并非全部。页面特别指出，Chrome 专用集成或试图修改默认起始页的扩展可能受限。该页说明安装和管理方法，却没有给出完整支持列表。Chromium 只是兼容线索，不是行为完全一致的保证。

社区帖子可提示需要调查的问题，例如密码管理器能安装，但厂商支持列表没有 Comet。某位用户的情况不能证明所有人都不兼容，也不能证明官方支持。依赖扩展前，先看厂商当前要求，并在低风险配置文件中检查。` },
		{ heading: "安装前使用这份检查清单", body: `- 确认来源：优先从开发者官网打开 Chrome 网上应用店条目，核对发布者、更新时间和权限；相似名称可能属于不同扩展。
- 阅读开发者声明的浏览器版本、接口和管理策略要求。另请留意 Perplexity 对 Chrome 专用集成和试图更改默认起始页扩展的限制说明。
- 明确目标场景：写下要用的网站和配置文件。“能在浏览器运行”不代表适用于内部控制台、付款流程或受保护页面。
- 对凭据、财务、安全或业务扩展，先询问厂商是否支持 Comet，以及如何提供支持。
- 只安装必需项。检查网站范围和后台权限；不要仅为观察图标就授予宽泛访问。

这份清单用于减少不确定性，不能认证扩展或产品。如果扩展所有者没有说明 Comet 支持情况，应记录“未知”，不要凭空给出是或否。` },
		{ heading: "按 Comet 文档安装和管理", body: `Perplexity 当前指南说明，可从 Chrome 网上应用店通过 Add to Comet 按钮添加扩展，并可通过 Comet 设置或 chrome://extensions 管理。请以实时页面为准，因为商店按钮名称可能变化。不要把开发者模式或安装未打包扩展当成通用修复办法；这会改变信任边界，也不是所引 Comet 帮助页描述的官方兼容路径。

安装后打开扩展详情并检查权限。只在需要的配置文件和网站启用。如果它要求“读取和更改所有网站上的全部数据”，先判断是否必要，并确认开发者如何处理数据。对于密码管理器，要核对厂商支持列表和登录说明；能安装并不代表厂商会协助排查恢复或自动填充故障。

不要仅为查看工具栏图标是否响应而输入生产凭据。可先用公开页面或经授权的测试账户。一次简单检查只能说明特定版本和配置文件中的观察结果，不能保证升级后仍兼容。` },
		{ heading: "检查你真正需要的行为", body: `若要决定能否依赖某个扩展，可进行小范围、低风险核对，并记录 Comet 版本、扩展版本、配置文件和日期。检查能否无错误安装、图标或菜单能否打开、目标网站上能否运行、权限是否符合预期，以及厂商是否列出 Comet。涉及账户变更、分享内容或授权交易前必须停止。

如果扩展只在一个网站失效，可在另一个无风险公开网页上检查，区分网站限制和普遍加载问题。不能用一个页面上的成功证明所有网站都兼容。如果扩展会替换全局搜索或新标签页，应查看 Comet 帮助页对默认起始页的明确提醒，并检查是否有其他设置优先控制。

精确描述结果：“已安装、工具栏可打开、在网站 X 无法运行”比“兼容”更有用。如果厂商说不支持 Comet，但本地某次检查成功，请同时保留两项事实。一次本地成功不等于厂商支持，也不保证以后不会失效。` },
		{ heading: "排查故障时不要削弱保护", body: `如果无法安装，先确认商店条目来自正确发布者，再按 Comet 当前帮助步骤操作。在扩展管理页检查停用状态、更新提示和权限询问。如果 Comet 提示缺少某项 Chrome 功能，请联系扩展厂商或选择官方支持的替代方案；不要从论坛下载不明版本。

如果已安装但网站上失效，检查网站是否阻止扩展、扩展是否有该域名权限、其他扩展是否冲突，以及厂商是否记录了该页面问题。在测试配置文件中一次停用一个扩展。不要关闭浏览器安全功能、绕过网站控制或复制私有 Cookie 来当作修复方法。

处理关键账户工具时，实验前先留好人工恢复方式。若问题涉及密码自动填充或认证，通过厂商官方支持确认浏览器支持情况。不要为演示问题而导出或暴露凭据。` },
		{ heading: "决定是否继续使用", body: `只有在扩展解决了明确问题、权限合适、故障时有恢复路径的情况下才保留它。删除未使用条目；开发者改变访问权限时重新检查。若厂商不支持 Comet，与其反复强行安装，不如考虑在另一个有官方支持的浏览器配置文件中使用。

Comet 的兼容声明范围有限：“多数”不等于全部；官方帮助指出了一些常见限制，但没有公布完整测试矩阵。第三方评测或社区帖可能描述特定版本和环境，可作为排查线索，随后仍要核对产品文档和扩展厂商。BrowserHub 没有安装或实测本文提到的扩展。

产品选型可继续看[Comet 与 Chrome 中 Gemini 对比](/zh-cn/guides/comet-vs-gemini-in-chrome/)；跨设备延续可看[Comet 导入、导出与同步](/zh-cn/guides/comet-import-export-vs-sync/)。本文只讨论扩展兼容性。` }
	], faq: [ { question: "所有 Chrome 扩展都能在 Comet 运行吗？", answer: "不能。Perplexity 表示多数 Chrome 网上应用店扩展可用，但并非全部；Chrome 专用集成和更改默认起始页的扩展可能受限。" }, { question: "在哪里安装或管理扩展？", answer: "Perplexity 当前指南说明可从 Chrome 网上应用店使用 Add to Comet，并通过设置或 chrome://extensions 管理。实际操作前请核对最新步骤。" }, { question: "安装成功就代表扩展厂商支持 Comet 吗？", answer: "不一定。能安装和厂商支持是两回事。安全或关键账户工具应核对开发者当前的浏览器要求。" }, { question: "能用开发者模式让扩展正常工作吗？", answer: "不要把侧载当作通用兼容修复。引用的 Comet 指南记录的是网上应用店路径；未打包扩展会改变信任边界，需要另行评估。" } ] }
	},
	"comet-import-export-vs-sync": { en: { title: "Comet Import, Export and Sync: What Moves Between Browsers and Devices?", description: "Separate one-time browser import, encrypted Comet sync, local data and Perplexity account export. Know what is documented and what remains unknown before switching.", category: "AI browser guides", content: "Moving browser data can mean several different things: importing selected items once from another browser, syncing chosen data between Comet devices, clearing local history, or requesting an export of Perplexity account data. These are not interchangeable backups. The current official docs define the import, sync, local-data and account-export boundaries, but leave some browser-level export details unspecified. This guide maps what they document and what remains unknown.", sections: [
		{ heading: "Choose the operation before you move anything", body: `Use import when you want to bring selected data from a previous browser into Comet once. Use sync when you want supported data types kept consistent across multiple Comet devices. Use local data deletion to clear selected browsing information on one device. Use account export when you want the downloadable data Perplexity offers through its website account settings. An export is not automatically an import file or a complete browser-profile backup.

The documented import path appears below. The current setup guide names example items but does not guarantee that extensions, cookies, sessions or every setting move. Check the selection list in your version before proceeding.

Make a short inventory first: which devices and browsers are involved, which items you want, what must remain local, and whether you are moving or copying the data. If you are unsure, begin with bookmarks only or another non-sensitive item and inspect the result before choosing more. Do not delete the source profile until you have checked the destination and retained a separate recovery route.` },
		{ heading: "One-time import: use the visible item list", body: `Use the documented Comet path in [current setup instructions](https://www.perplexity.ai/help-center/comet/en/articles/11583745-getting-started-with-comet-set-up):

- Open the three-dot menu and choose Settings.
- Select “Import bookmarks and settings.”
- Choose the previous browser from the dropdown.
- Review the items Comet actually offers and select only what you want.
- Click Import, then check the destination before changing or deleting the source.

The official article does not promise the same full list for every source browser or operating system. Treat the visible choices as the scope. If something you need is absent, record it as unsupported or unknown; do not infer a migration path from another Chromium browser.

Before importing passwords, consider whether you want those credentials in the destination profile and review the device's password-storage controls. Comet's local storage documentation says saved passwords use the operating system's secure vault. Avoid exporting passwords into a plain-text file or moving an entire profile folder as an improvised method. If you need to transfer credentials, use a password manager's current official export/import guidance and protect any temporary file according to its instructions. This guide does not provide a credential-dump procedure.` },
		{ heading: "Sync: a continuing connection between Comet devices", body: `Perplexity's [Sync Between Devices guide](https://www.perplexity.ai/help-center/comet/en/articles/12569908-sync-between-devices) lists bookmarks, passwords, autofill, themes, history, extensions and open tabs as data types Comet can sync. The documented flow requires signing in to a Perplexity account, opening Settings → Sync or Profile → Sync, and choosing Create Sync or Join Sync. The account provides login, while the guide says a private four-word passphrase is needed to decrypt the sync chain. It describes one chain per account and allows multiple connected devices.

Keep that passphrase safe using a method appropriate for account recovery. Perplexity says it cannot restore access if you sign out without the passphrase. Turning off an individual data type stops new updates from syncing but leaves local data on the device. That toggle is not the same as deleting the local copy. If you need to remove a device or leave a sync chain, use the Sync management controls and read the current confirmation text before acting.

Sync is ongoing, not a one-time export. Before enabling it, review each category and decide whether it belongs on every connected device. A browser history or open tabs may reveal sensitive work. Check the device list and last active times periodically, especially after replacing or sharing a computer. The guide describes sync across Comet devices; do not assume it makes an arbitrary browser profile portable.` },
		{ heading: "Local storage and account export are different", body: `Comet's [Local Data & Device Storage page](https://www.perplexity.ai/help-center/comet/en/articles/11740986-local-data-device-storage) says local browsing data includes browsing and search history, cookies and site data (including signed-in sessions), cache, autofill form data and a download list. Downloaded files remain on disk. Saved passwords are kept in the operating system vault. It also says clearing browsing data clears local data and does not affect the Perplexity account or synced settings.

Perplexity's [Self-Serve Data Options](https://www.perplexity.ai/en-GB/hub/legal/self-serve-data-options) describes signing in on the website, opening account details, selecting Export my data, then receiving an email download link. That is an account-level export process. The cited page does not list the archive's contents or format and does not say it can restore a Comet browser profile. Do not label it a full Comet backup.

The current local-storage page says passwords can be exported or synced manually, but does not give a specific password export format or path. BrowserHub has not inferred one. If you need browser-level export beyond the documented import and sync controls, consult current official Comet support and record the answer as unknown until they identify a supported method. Avoid treating a generic browser folder copy, a user forum answer or an account data archive as an official profile export.` },
		{ heading: "Plan a switch with a reversible sequence", body: `- Update both source and destination browsers, then check the current official import or sync instructions.
- Inventory the data you need: bookmarks, history, passwords, open tabs, extensions, autofill and settings. Mark each as import, sync, local-only or not needed.
- Preserve the source browser until the destination has been checked. Start with a limited import and compare a few known bookmarks or history entries.
- If configuring Sync, confirm you are connecting the intended Comet account and devices. Store the passphrase before signing out of any device.
- Check password and extension behavior through their providers’ official guidance. An item appearing in the destination does not guarantee that an extension or sign-in will behave as before.
- Only after you verify the intended data should you decide whether to clear the old browser. Use its own supported controls and understand whether deletion affects local copies or synced copies.

This sequence is a planning checklist, not a claim that BrowserHub migrated a profile. If the import screen does not show an item, do not substitute a risky manual copy. If a sync chain rejects a passphrase or device, stop and recover through the current official instructions rather than creating duplicate chains without knowing the effect.` },
		{ heading: "Troubleshoot and protect what you move", body: `If bookmarks are missing, check whether the source browser and profile were selected correctly and whether the import completed. If history or passwords are absent, inspect the offered item list and the source browser's current profile; do not assume that “import settings” means every dataset was included. If sync is empty, confirm the devices joined the same chain and that the item toggle is on. Allow the official process to finish before repeating it, to reduce duplicate or conflicting records.

If passwords do not autofill, check the operating-system vault, local verification prompts and the password manager's support information. Never send an unencrypted password file to support or place it in a shared folder. If a tab or extension does not appear on another device, check whether that item type is enabled and whether the extension supports the receiving platform. The sync list is a feature scope, not a promise that each extension works identically everywhere.

For deletion, be explicit about the target. Clearing local browsing data is different from switching off future sync, removing a device, deleting a sync chain or deleting a Perplexity account. Read the confirmation screen, note whether the data remain on other devices, and use the relevant official process. For Atlas retirement transitions, see the separate [Atlas data transition guide](/en/guides/chatgpt-atlas-retirement-data-transition/); its migration context should not be treated as Comet's export instructions.` }
	], faq: [ { question: "Does Comet import bookmarks, history and passwords?", answer: "Perplexity's current setup guide lists these as examples of selectable import items. Check the choices offered for your source browser; the guide does not guarantee every item for every browser." }, { question: "Is Perplexity account export a Comet profile backup?", answer: "The self-serve page describes an account-data download link but does not specify a restorable Comet profile archive. Do not treat it as a complete browser backup." }, { question: "What does Comet Sync include?", answer: "The current guide lists bookmarks, passwords, autofill, themes, history, extensions and open tabs. It uses a separate sync chain with a private passphrase; review the live settings before enabling each category." }, { question: "Can I export Comet passwords to a particular file?", answer: "The current local-storage help page says passwords can be exported or synced manually but does not specify a file format or path. Check official support; do not infer a procedure or expose credentials." }, { question: "If I switch off a sync category, are local items deleted?", answer: "Perplexity says the toggle stops new updates from syncing and keeps local data. Local deletion is a separate operation." } ] },
		"zh-cn": { title: "Comet 导入、导出与同步：哪些数据会跨浏览器或设备移动？", description: "区分一次性浏览器导入、Comet 加密同步、本地数据和 Perplexity 账户导出。切换前先看清边界与未知项。", category: "AI 浏览器指南", content: "迁移浏览器数据可能指几种不同操作：从旧浏览器一次性导入所选项目、在多台 Comet 设备间同步、清除本地历史，或从 Perplexity 网站请求账户数据导出。这些不是可互换的备份。当前官方资料分别说明导入、同步、本地数据和账户导出的边界，但没有写明所有浏览器级导出细节。本文梳理已记录的方法和仍未知的部分。", sections: [
		{ heading: "先选对操作，再移动数据", body: `当你要从旧浏览器一次性带入所选资料时，使用导入；想让多台 Comet 设备持续保持部分资料一致时，使用同步；想清除一台设备上的所选浏览信息时，使用本地数据删除；需要获取 Perplexity 网站账户提供的数据包时，使用账户导出。账户导出不会自动变成 Comet 可导入文件，也不等于完整浏览器配置文件备份。

文档所列导入路径见下文。当前设置指南只列举部分项目，并未保证扩展、Cookie、会话或每项设置都会迁入。请按自己版本实际显示的选项操作。

先做简短清单：涉及哪些设备和浏览器，需要哪些项目，哪些资料必须留在本地，以及你是搬迁还是复制。如果不确定，可先只导入书签等非敏感项目，检查结果后再选择其他内容。检查目标浏览器并保留单独恢复方式之前，不要删除源配置文件。` },
		{ heading: "一次性导入：以界面列出的项目为准", body: `按[Comet 当前设置说明](https://www.perplexity.ai/help-center/comet/en/articles/11583745-getting-started-with-comet-set-up)操作：

- 打开三点菜单，进入设置。
- 选择“导入书签和设置”。
- 从下拉菜单选择旧浏览器。
- 查看 Comet 实际提供的项目，只勾选需要的内容。
- 点击导入，核对目标资料后再处理源浏览器。

不同源浏览器和系统可能显示不同项目。请以界面选项为准；缺少所需项目时记为“不支持”或“未知”，不要从其他 Chromium 浏览器推演迁移方法。

导入密码前，先确认是否确实要把凭据放进目标配置文件，并检查设备密码存储控制。Comet 本地数据说明称，已保存密码使用操作系统安全保险库。不要把密码导出到明文文件，也不要把整个配置文件夹当作临时方案。如果必须迁移凭据，请按密码管理器当前官方导入/导出说明操作，并妥善保护临时文件。本文不提供批量导出凭据的步骤。` },
		{ heading: "同步：Comet 设备间的持续连接", body: `Perplexity 的[跨设备同步说明](https://www.perplexity.ai/help-center/comet/en/articles/12569908-sync-between-devices)列出可同步项目：书签、密码、自动填充、主题、历史、扩展和已打开标签页。文档流程要求先登录 Perplexity 账户，再进入设置→同步或个人资料菜单→同步，选择创建同步或加入同步。账户负责登录，文档称私密四词口令用于解密同步链；每个账户一个同步链，可连接多台设备。

请用适当的账户恢复方式保管口令。Perplexity 表示，如果退出登录时没有口令，就无法恢复访问。单独关闭某个项目只会停止它继续同步更新，本地数据仍保留。这与删除本地副本不是一回事。如要移除设备或退出同步链，请使用同步管理控制，并在确认操作前阅读当前提示。

同步是持续过程，不是一次性导出。启用前逐项判断哪些数据应出现在所有连接设备上。浏览历史和打开的标签页可能暴露敏感工作。更换或共享电脑后，查看设备列表和最近活动时间。该帮助页讲的是 Comet 设备同步，不代表任意浏览器配置文件都可携带。` },
		{ heading: "本地存储和账户导出各有边界", body: `Comet 的[本地数据与设备存储说明](https://www.perplexity.ai/help-center/comet/en/articles/11740986-local-data-device-storage)称，本地浏览数据包括浏览历史、搜索历史、Cookie 和站点数据（包含登录会话）、缓存、自动填充表单数据和下载列表。已下载文件仍留在磁盘；密码保存在操作系统保险库。页面还说明，清除浏览数据只清除本地资料，不影响 Perplexity 账户或已同步设置。

Perplexity 的[自助数据选项](https://www.perplexity.ai/en-GB/hub/legal/self-serve-data-options)说明：登录网站，进入账户详情，选择“导出我的数据”，之后会收到邮件下载链接。这属于账户级数据导出。所引页面没有列出归档内容或格式，也没有说它能恢复 Comet 浏览器配置文件，不能把它称为完整 Comet 备份。

当前本地存储帮助页提到密码可以手动导出或同步，但没有给出特定文件格式或路径。BrowserHub 不会从其他浏览器推演。若需要超出官方导入和同步控制的浏览器级导出，请向 Comet 官方支持核实；在确认受支持方法前，把它记录为未知。不要把通用配置文件夹复制、论坛用户答复或账户数据包当作官方配置文件导出。` },
		{ heading: "按可逆顺序规划切换", body: `- 更新源和目标浏览器，并核对当前官方导入/同步说明。
- 列出需要的书签、历史、密码、标签页、扩展、自动填充和设置，分别标成导入、同步、本地保留或不需要。
- 在目标资料核对前保留源浏览器；先小范围导入，再对照几条已知书签或历史记录。
- 配置同步时确认是预期账户和设备，并在任何设备退出登录前保存口令。
- 通过供应方官方说明检查密码和扩展行为；资料显示出来不保证扩展或登录行为完全相同。
- 确认目标内容后，再决定是否清理旧浏览器，并弄清删除的是本地副本还是同步副本。

这是一份规划清单，不代表 BrowserHub 已迁移过真实配置文件。如果导入页面没有列出某项，不要用高风险手工复制替代。如果同步链拒绝口令或设备，应依当前官方说明恢复，不要在不清楚后果时创建重复同步链。` },
		{ heading: "排错并保护迁移资料", body: `书签缺失时，确认选择了正确的源浏览器和配置文件，以及导入是否完成。历史或密码缺少时，查看源浏览器配置和当前界面项目列表，不要假设“导入设置”涵盖每种数据。如果同步内容为空，确认设备加入同一同步链且项目开关已打开。让官方流程先完成再重复操作，减少重复或冲突记录。

密码没有自动填入时，检查操作系统保险库、本地验证提示和密码管理器官方说明。不要把未加密密码文件发给客服或放进共享目录。另一台设备看不到标签页或扩展时，确认该项目已启用，并检查扩展是否支持目标平台。同步项目列表说明功能范围，不保证每个扩展在各设备上行为相同。

删除前明确目标：清除本地浏览数据、停止继续同步、移除设备、删除同步链和删除 Perplexity 账户是不同操作。阅读确认页面，记下其他设备上的资料是否保留，并选择对应官方流程。Atlas 退役迁移请读独立的[Atlas 数据迁移指南](/zh-cn/guides/chatgpt-atlas-retirement-data-transition/)；不要把 Atlas 场景当成 Comet 导出说明。` }
	], faq: [ { question: "Comet 会导入书签、历史和密码吗？", answer: "Perplexity 当前设置指南把这些列为可选导入项目示例。实际支持内容取决于源浏览器，请查看界面显示的选项。" }, { question: "Perplexity 账户导出是 Comet 配置文件备份吗？", answer: "自助数据页面说明可以下载账户数据，但没有说明它是可恢复的 Comet 配置文件归档，不应视为完整浏览器备份。" }, { question: "Comet 同步包含什么？", answer: "当前指南列出书签、密码、自动填充、主题、历史、扩展和打开的标签页。它使用独立同步链和私密口令；启用前请检查实时设置。" }, { question: "能把 Comet 密码导出成某种文件吗？", answer: "当前本地数据帮助页提到可以手动导出或同步，但未说明文件格式或路径。请查官方支持，不要自行推演或暴露凭据。" }, { question: "关闭一个同步项目会删除本地数据吗？", answer: "Perplexity 说明关闭后会停止新更新同步，但保留本地数据。删除本地资料是独立操作。" } ] }
	},
	"gemini-auto-browse-local-vs-remote": { en: { title: "Gemini Auto Browse: What Happens When You Close Chrome or Your Laptop?", description: "Understand the documented local-versus-remote browser paths, when a task may continue, and where sign-in or takeover can pause it.", category: "AI browser guides", content: "Gemini in Chrome can interact with websites through the local Chrome browser on your desktop or a separate remote browser in the cloud. These paths have different session context and continuation behavior. Google says the local path needs the device and Chrome awake and running; if the device closes or becomes unavailable, Gemini might use a remote browser, but that switch is not guaranteed. A remote task can continue after you close the device, while some steps such as website sign-in pause until you take over. This article explains the lifecycle boundary from current Google documentation; it does not claim a signed-account hands-on test or that every Gemini feature uses Auto Browse.", sections: [
		{ heading: "Two browser paths, two different dependencies", body: `Google's current [Auto Browse help page](https://support.google.com/gemini/answer/16821166?hl=en) says Gemini can use the local Chrome browser on a desktop or a separate remote browser in the cloud. Auto Browse in Chrome is currently a desktop feature. The local path uses the Chrome browser on your device and may access sites where you are already signed in. Google says your device and Chrome must stay awake and running while the local task is being completed.

The remote path is a separate browser environment. Google's help page says Gemini can continue a task in that remote browser even if you close your device. It also says only the remote browser is used on mobile devices. This wording does not mean the Chrome Auto Browse feature itself is available in Chrome on phones; Google separately says Auto Browse is not available in Gemini in Chrome on iPhone or iPad, and its current task explanation says Chrome Auto Browse is desktop-only.

Do not assume a task is permanently “local” or “cloud.” The current documentation says that if you close or turn off the device before a local task finishes, or if the device is unavailable, Gemini might use a remote browser. “Might” is conditional: Google does not promise every task will switch or finish. Plan around the possibility of a pause or failed continuation.` },
		{ heading: "What closing the laptop does and does not tell you", body: `If Gemini is using the local Chrome session, closing the lid, shutting down, losing network access or letting the device sleep can interrupt the conditions Google lists for that path. Keep both the device and Chrome awake and running when you need a local task to continue. The exact behavior of sleep settings depends on your device, so the safe expectation is based on Google's requirement, not on an assumption that closing the lid leaves the browser active.

If the task is using the remote browser, Google's help says it can continue even when your device is closed. That still does not guarantee that a particular website step will complete: Google says tasks pause for some steps, including signing in, until you take over and finish that step. A task can also require a sensitive confirmation, encounter a page issue or stop for another reason.

When you return, open the Gemini task thread and inspect its state. The help page describes task notifications, a task tab, Switch tabs, Take over task and Resume/Give back task controls. Use the visible status to determine whether the task is waiting for you, still browsing or finished. Do not infer completion solely from the fact that the laptop was closed or a background status appeared.` },
		{ heading: "A practical decision rule before you start", body: `Use the local path when the task depends on your current desktop Chrome session or a site where you are already signed in, and you can keep the computer and browser awake. Before starting, check the page context and account, read Gemini's proposed plan, and decide which personal information it may share with sites. Google warns that Gemini chooses which sites to use and may share personal information needed for the task.

Use a remote continuation expectation only when the task is eligible to run remotely and you accept that it may still pause. Do not use a remote task as a way to avoid a required login, sensitive approval or identity check. If a step needs your intervention, take over in the browser and complete it yourself. A remote browser can have its own cookies and state; it should not be treated as a copy of every local Chrome profile or extension.

For a task that must finish while you are away, avoid deadlines or irreversible actions. Ask Gemini to research, compare or prepare a draft and stop at a review point. For a purchase, booking, account change or form submission, inspect the page and details yourself before confirming. Keep a manual fallback for time-sensitive work.` },
		{ heading: "Check eligibility and scope without overgeneralizing", body: `Google's current page lists eligibility requirements including location, age, language, latest Chrome, a personal Google account, sign-in and an eligible Google AI plan; it currently names AI Ultra, AI Pro and AI Plus. Rollout is gradual, so the feature may not appear for every eligible user. Incognito is unavailable, and school accounts have restrictions. Work or school accounts may require administrator enablement. These requirements can change; consult the live page rather than relying on older launch coverage.

Keep the feature name precise. Gemini in Chrome may have several experiences; Auto Browse is the multi-step task feature described by this help page. Gemini Spark, Gemini app tasks, Search AI Overviews and the browser sidebar are related product experiences but should not be assumed to share the same host, eligibility or continuation behavior. The [Gemini in Chrome vs Copilot in Edge comparison](/en/guides/gemini-in-chrome-vs-copilot-in-edge/) covers broader product positioning; this guide is limited to local versus remote task lifecycle.

Before starting, confirm that the Ask Gemini control is present, you are in desktop Chrome, and the task thread shows the browsing mode when it begins. If the option is missing, check rollout and account requirements; do not treat an absent button as proof of a broken browser or bypass regional/account controls.` },
		{ heading: "Stop, take over and verify the outcome", body: `Google's current instructions describe reviewing the plan before starting, taking over when needed, resuming or giving back the task, and stopping it from the Gemini panel. A side-panel Stop stops browsing and lets Gemini choose what to do next: it may use the remote browser, activate another tool or abandon the task. To completely cancel the task yourself, Google says to click Stop in the Gemini text box. Use the right control for the outcome you want, then check the task state.

If a task involves website sign-in, Google says it pauses until you take over and complete the sign-in step. Complete that step only on the legitimate site and inspect the requested page. When finished, verify the resulting booking, cart, form or account state directly on the site. If you do not see a confirmation or saved state, report the result as incomplete or unknown rather than relying on the agent's summary.

Google's page says Gemini can use a broad range of sites and may share personal information needed to complete tasks, including information that may be sensitive. Keep the prompt limited to the task, inspect the plan, and stop before sending payment details or other sensitive information unless you deliberately approve that step. For a wider discussion of task boundaries, see [browser-agent human takeover](/en/guides/browser-agent-human-takeover/) and [tab access permissions](/en/guides/ai-browser-tab-access-permissions/).` },
		{ heading: "Before stepping away", body: `Before leaving the device, check which browser path the task is using and whether it is waiting for your confirmation. If it depends on local Chrome, keep the device and Chrome awake. A side-panel Stop stops browsing but may let Gemini choose a remote browser or another tool. To cancel the entire task, click Stop in the Gemini text box. When you return, inspect the task thread and verify the result on the website.

This procedure summarizes Google documentation checked November 5, 2026; BrowserHub did not run a signed-account task or observe a sleep transition.` }
	], faq: [ { question: "Does Gemini Auto Browse keep running when I close my laptop?", answer: "If the task is using the remote browser, Google says it can continue even when the device is closed. Local Chrome requires the device and Chrome awake and running. If the local device is unavailable, Gemini might switch to remote browsing, but Google does not guarantee that every task will." }, { question: "Will a remote task finish a website login for me?", answer: "Google says some steps, including signing in, pause until you take over and complete them. Remote continuation does not bypass authentication or site confirmation." }, { question: "Is Auto Browse available in Chrome on a phone?", answer: "Google currently describes Chrome Auto Browse as desktop-only. Remote browser use on mobile is a separate path and should not be read as mobile Chrome Auto Browse availability." }, { question: "Does closing the task tab stop Gemini?", answer: "Google's help page lists closing the task tab as a way to stop a task, but inspect the current task status and interface. Side-panel Stop may let Gemini choose another continuation step, including remote browsing or another tool." }, { question: "Are all Gemini features using the remote browser?", answer: "No such general claim is documented. This guide covers the Auto Browse task paths described by Google's Gemini in Chrome help page." } ] },
		"zh-cn": { title: "Gemini Auto Browse：关闭 Chrome 或笔记本后会怎样？", description: "了解 Google 文档所述的本地与远程浏览路径、任务可能继续的条件，以及登录或接管为何会让任务暂停。", category: "AI 浏览器指南", content: "Gemini in Chrome 可通过桌面上的本地 Chrome 浏览器或云端独立远程浏览器与网站交互。这两种路径依赖的会话上下文和继续条件不同。Google 说明，本地路径要求设备和 Chrome 保持唤醒、运行；若设备关闭或不可用，Gemini 可能改用远程浏览器，但不保证一定切换。远程任务可以在设备关闭后继续，不过网站登录等步骤可能暂停，直到你接管完成。本文依据 Google 当前文档解释生命周期边界，不声称已用登录账户实测，也不把所有 Gemini 功能都说成 Auto Browse。", sections: [
		{ heading: "两种浏览路径，各自依赖不同", body: `Google 当前的[Auto Browse 帮助页](https://support.google.com/gemini/answer/16821166?hl=en)说明，Gemini 可使用桌面本地 Chrome，也可使用云端独立远程浏览器。Chrome 中的 Auto Browse 目前是桌面功能。本地路径使用设备上的 Chrome，并可能访问你已登录的网站。Google 要求任务执行期间设备和 Chrome 保持唤醒、运行。

远程路径运行在独立浏览器环境中。Google 帮助页称，即使关闭设备，Gemini 仍可在远程浏览器里继续任务；移动设备上只使用远程浏览器。这不等于手机 Chrome 已提供 Auto Browse。Google 还单独说明，iPhone 和 iPad 上的 Gemini in Chrome 暂不可用 Auto Browse，当前任务说明也把 Chrome Auto Browse 限定在桌面端。

不要假设任务会一直固定使用“本地”或“云端”。当前文档说，如果本地任务结束前你关闭设备、关机或设备不可用，Gemini 可能会使用远程浏览器。“可能”是条件描述，Google 没有承诺每项任务都会切换或完成。计划时应考虑暂停或无法继续的情况。` },
		{ heading: "关闭笔记本能说明什么，不能说明什么", body: `如果 Gemini 正使用本地 Chrome 会话，合上笔记本、关机、断网或让设备休眠，都可能中断 Google 对本地路径列出的条件。需要本地任务继续时，应让设备和 Chrome 保持唤醒、运行。具体休眠行为取决于设备，因此应依据 Google 的要求规划，不要假设合盖后浏览器仍在活动。

若任务正在使用远程浏览器，Google 说明设备关闭后它仍可继续。这仍不保证网站的每一步都会完成：Google 指出，网站登录等某些步骤会暂停，直到你接管并完成。任务也可能遇到敏感操作确认、网页故障或其他停止条件。

回来后打开 Gemini 任务对话查看状态。帮助页提到任务通知、任务标签、切换标签、接管任务、恢复或交回任务等控制。根据实际显示判断任务是在等待你、继续浏览还是已经结束。不能因为笔记本合上或出现后台状态，就推断任务已成功完成。` },
		{ heading: "开始前的实用判断规则", body: `如果任务依赖当前桌面 Chrome 会话或已登录网站，并且你能让电脑和浏览器保持唤醒，可使用本地路径。开始前检查页面和账户，阅读 Gemini 的计划，并判断它可能向网站分享哪些个人信息。Google 提醒，Gemini 会选择任务所需网站，并可能分享完成任务所需的个人信息。

只有在任务符合远程运行条件且你能接受中途暂停时，才把远程继续作为预期。不要用远程任务绕开登录、敏感操作确认或身份核验。需要你介入时，应接管浏览器并亲自完成。远程浏览器可能有自己的 Cookie 和状态，不能当作本地 Chrome 配置文件及全部扩展的副本。

如果任务必须在你离开时完成，不要安排紧迫期限或不可逆操作。可以让 Gemini 调研、比较或准备草稿，并停在待审核阶段。购买、预约、账户修改或提交表单前，亲自检查页面和详情再确认。时间敏感的工作应留有人工作为后备方案。` },
		{ heading: "核对资格和范围，避免泛化", body: `Google 当前页面列出年龄、地区、语言、最新版 Chrome、个人 Google 账户、登录状态和可用 AI 方案等要求，目前包括 Google AI Ultra、Pro 和 Plus。功能逐步开放，满足条件也不代表每个账户都已看到入口。无痕模式不可用；学校账户受限制，工作或学校账户可能需要管理员启用。资格和推出地区会变化，请查实时页面，不要沿用旧版上线报道。

准确使用功能名称。Gemini in Chrome 可能包含多个体验；Auto Browse 是该帮助页描述的多步骤任务功能。Gemini Spark、Gemini 应用任务、搜索 AI Overviews 和浏览器侧栏属于相关产品体验，但不能假设它们使用相同执行端、资格条件或继续机制。[Chrome 中 Gemini 与 Edge Copilot 对比](/zh-cn/guides/gemini-in-chrome-vs-copilot-in-edge/)讨论更广泛的产品定位；本文只讲本地和远程任务生命周期。

开始前确认 Ask Gemini 控件存在、正在使用桌面 Chrome，并在任务开始时查看对话显示的浏览方式。如果入口缺失，先检查推出范围和账户条件；不要把按钮没出现当作浏览器损坏，也不要绕过地区或账户限制。` },
		{ heading: "停止、接管并核对结果", body: `Google 当前说明要求先检查执行计划，并支持需要时接管、恢复或交回任务，也可从 Gemini 面板停止浏览。点击侧栏 Stop 会停止浏览，但 Gemini 会决定下一步：可能改用远程浏览器、调用其他工具，也可能放弃任务。若要彻底取消任务，Google 说明应点击 Gemini 文本框里的 Stop。根据你希望停止浏览还是取消整项任务选择控制，再检查状态。

如果任务涉及网站登录，Google 表示它会暂停，直到你接管并完成登录。只在真实网站完成该步骤，并检查打开的页面。任务结束后，直接在网站确认预约、购物车、表单或账户状态。如果没有看到确认信息或保存状态，应记录为未完成或未知，不要只相信智能体总结。

Google 页面提醒，Gemini 可使用广泛网站，并可能分享完成任务所需、甚至敏感的个人信息。提示词应仅包含必要内容，执行前检查计划；在你明确同意前，应停在付款资料或其他敏感信息提交之前。更广泛的任务边界可参阅[浏览器智能体人工接管](/zh-cn/guides/browser-agent-human-takeover/)和[标签访问权限](/zh-cn/guides/ai-browser-tab-access-permissions/)。` },
		{ heading: "离开设备前的检查", body: `离开前，查看任务使用本地还是远程浏览器，以及是否在等待你确认。本地 Chrome 任务需要设备和 Chrome 保持唤醒。侧栏 Stop 会停止浏览，但 Gemini 可能改用远程浏览器或其他工具；若要彻底取消整项任务，请点击 Gemini 文本框中的 Stop。回来后检查任务对话，并在目标网站核对结果。

本文总结截至 2026 年 11 月 5 日的 Google 文档；BrowserHub 没有用登录账户执行任务，也未观察设备休眠后的切换。` }
	], faq: [ { question: "合上笔记本后 Gemini Auto Browse 会继续吗？", answer: "如果任务使用远程浏览器，Google 说即使设备关闭也可以继续。本地 Chrome 则要求设备和浏览器保持唤醒、运行。设备不可用时 Gemini 可能切换到远程路径，但不保证每项任务都会切换。" }, { question: "远程任务会替我完成网站登录吗？", answer: "Google 说明登录等步骤可能暂停，直到你接管并完成。远程继续不会绕过身份验证或网站确认。" }, { question: "手机 Chrome 有 Auto Browse 吗？", answer: "Google 当前把 Chrome Auto Browse 描述为桌面功能。移动设备上的远程浏览是另一条路径，不能据此说手机 Chrome 已提供 Auto Browse。" }, { question: "关闭任务标签会停止 Gemini 吗？", answer: "Google 帮助页列出关闭任务标签作为停止方式，但应查看当前任务状态。侧栏 Stop 可能让 Gemini 选择其他继续方式，包括远程浏览或其他工具。" }, { question: "所有 Gemini 功能都会使用远程浏览器吗？", answer: "没有这样的通用说明。本文只讨论 Google Gemini in Chrome Auto Browse 帮助页描述的任务路径。" } ] }
	}
};

const related: Record<string, string[]> = {
	"ai-browser-vs-ai-search-engine": ["ai-browser-vs-browser-agent", "ai-browser-research-source-verification"],
	"comet-query-shortcuts": ["comet-vs-gemini-in-chrome", "ai-browser-research-source-verification"],
	"comet-extension-compatibility": ["comet-vs-gemini-in-chrome", "comet-import-export-vs-sync"],
	"comet-import-export-vs-sync": ["chatgpt-atlas-retirement-data-transition", "local-vs-cloud-browser-storage"],
	"gemini-auto-browse-local-vs-remote": ["gemini-in-chrome-vs-copilot-in-edge", "browser-agent-human-takeover", "ai-browser-tab-access-permissions"]
};

export const aiCycleTranslations05: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides05: EditorialGuide[] = Object.entries(copies).map(([slug, copy]) => ({
	...copy.en,
	slug,
	date: "2026-11-05",
	sourcePath: `src/data/ai-cycle-2026-11-05.ts#${slug}`,
	availableLocales: ["en", "zh-cn"],
	relatedBrowsers: [],
	relatedTools: [],
	sources: sources[slug],
	relatedGuides: related[slug]
}));
