import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
  "gemini-chrome-select-screen-region": [
    { title: "Google Gemini Apps Help: Share specific screen parts", url: "https://support.google.com/gemini/answer/17077507?hl=en-en" },
    { title: "Google Chrome Help: Use Gemini in Chrome", url: "https://support.google.com/chrome/answer/16283624?hl=en" },
    { title: "Reader workflow: select one webpage region for AI", url: "https://www.reddit.com/r/LazyWorkflow/comments/1xzbxg2/do_you_still_screenshot_a_webpage_just_to_ask_ai/" },
    { title: "Scalevise: Gemini Select From Screen", url: "https://scalevise.com/resources/gemini-chrome-select-from-screen-2/" },
    { title: "Rottenwifi: Capture part of a webpage", url: "https://www.rottenwifi.com/how-to-capture-part-of-a-webpage-in-chrome/" }
  ],
  "samsung-browser-windows-galaxy-continue-browsing": [
    { title: "Samsung Mobile Press: Windows PC-mobile continuity", url: "https://api.samsungmobilepress.com/press-releases/samsung-browser-windows-expands-mobile-connected-experience/" },
    { title: "Samsung Browser for Windows", url: "https://browser.samsung.com/" },
    { title: "Samsung US: Samsung Browser features", url: "https://www.samsung.com/us/apps/samsung-browser/" },
    { title: "Reader question: Samsung Browser cannot sync on Windows", url: "https://www.reddit.com/r/samsunggalaxy/comments/1pxqqik/samsung_internet_browser_cant_sync_on_windows/" },
    { title: "Windows Central: Samsung Browser arrives on Windows", url: "https://www.windowscentral.com/software-apps/samsung-browser-finally-launches-on-windows-a-dark-horse-pick-for-your-next-browser" }
  ],
  "edge-copilot-selected-pdf-text": [
    { title: "Microsoft Q&A: Ask Copilot not working with selected PDF text", url: "https://learn.microsoft.com/en-us/answers/questions/5584561/ask-copilot-not-working-with-selected-pdf-text-in" },
    { title: "Microsoft Support: Review PDFs with Copilot context menu", url: "https://support.microsoft.com/en-us/onedrive/review-pdfs-using-copilot-context-menu-and-ai-actions" },
    { title: "Microsoft Support: Copilot in Edge", url: "https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge" },
    { title: "Windows Central: Edge PDF Copilot actions", url: "https://www.windowscentral.com/software-apps/microsoft-edge-just-got-two-new-ai-features-and-theyre-actually-useful" },
    { title: "Microsoft 365 PDF walkthrough", url: "https://www.youtube.com/watch?v=ORHAkqNr0U4" }
  ],
  "gemini-chrome-pop-out-chat-history": [
    { title: "Google Chrome Help: Use Gemini in Chrome", url: "https://support.google.com/chrome/answer/16283624?hl=en" },
    { title: "Google Support Community: Gemini in Chrome is hard to use in side panel", url: "https://support.google.com/gemini/thread/438913125/gemini-in-chrome-is-unusable-with-pro-account?hl=en" },
    { title: "Google Chrome Help: Customize Gemini in Chrome", url: "https://support.google.com/chrome/answer/16988996?hl=en-PS" },
    { title: "Googlebook reader question: expand the Gemini side panel", url: "https://www.reddit.com/r/Googlebook/comments/1x47n4f/is_there_a_way_to_expand_this_gemini_bar_in/" },
    { title: "T3: Gemini in Chrome side panel and recent chats", url: "https://www.t3.com/tech/laptops/uk-users-just-got-google-gemini-in-chrome-adding-these-5-key-upgrades" }
  ],
  "gemini-tasks-schedules-pause-resume": [
    { title: "Google Gemini Apps Help: Create and manage task schedules", url: "https://support.google.com/gemini/answer/17094710?hl=en" },
    { title: "Google Gemini Apps Help: Manage tasks and workflows", url: "https://support.google.com/gemini/answer/17094507?co=GENIE.Platform%3DDesktop&hl=en" },
    { title: "Reader report: Gemini scheduled tasks and connector reauthorization", url: "https://www.reddit.com/r/GeminiAI/comments/1y3jh4w/gemini_ios_web_issues_github_mcp_disconnects_no/" },
    { title: "TechRadar: Everyday tasks with Gemini Tasks", url: "https://www.techradar.com/ai-platforms-assistants/google-just-made-its-ai-agent-free-here-are-5-everyday-jobs-you-can-now-ask-gemini-tasks-to-do-for-you" },
    { title: "TechRadar: Gemini Tasks and task lifecycle", url: "https://www.techradar.com/ai-platforms-assistants/google-gemini-can-now-take-control-of-your-mac-but-you-might-not-want-to-give-it-full-access-to-everything" }
  ]
};

const related: Record<string, string[]> = {
  "gemini-chrome-select-screen-region": ["gemini-chrome-shared-tabs", "gemini-chrome-skills-create-manage", "ai-browser-compare-products-across-sites"],
  "samsung-browser-windows-galaxy-continue-browsing": ["dia-sync-between-devices-checklist", "gemini-in-chrome-vs-copilot-in-edge", "ai-browser-task-platform-chooser"],
  "edge-copilot-selected-pdf-text": ["ai-browser-pdf-summary", "edge-copilot-page-context-enterprise-dlp", "browser-agent-accessibility-snapshot-vs-screenshot"],
  "gemini-chrome-pop-out-chat-history": ["gemini-chrome-shared-tabs", "gemini-in-chrome-mobile-surfaces", "gemini-chrome-select-screen-region"],
  "gemini-tasks-schedules-pause-resume": ["gemini-auto-browse-local-vs-remote", "gemini-chrome-auto-browse-no-action", "claude-chrome-shortcuts-schedule"]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "gemini-chrome-select-screen-region": {
    en: {
      title: "Select one part of a webpage for Gemini in Chrome",
      description: "Use Select from screen for a chart, product comparison, or page fragment; review or remove captures and check which Chrome devices support it.",
      category: "AI browser guides",
      content: "When your question is about one chart, paragraph, or product row, a full-page summary can bring in more context than you need. Gemini in Chrome has a Select from screen control that attaches chosen page regions to a prompt. Google documents it for Chromebook Plus, Mac, and Windows desktops in supported countries. This guide explains how to select, correct, and review the capture before sending it.",
      sections: [
        { heading: "Check that the control is available", body: `Google's [Gemini Help page](https://support.google.com/gemini/answer/17077507?hl=en-en) lists access to Gemini in Chrome on desktop, supported countries, and a Chromebook Plus, Mac, or Windows computer as requirements. The broader [Chrome Help page](https://support.google.com/chrome/answer/16283624?hl=en) says Gemini in Chrome is still rolling out, requires a signed-in profile, and is unavailable in Incognito. Installing a recent Chrome release does not prove the feature has reached every account.

Open a regular Chrome window and look for Ask Gemini near the toolbar. If it is missing, check region, device, profile sign-in, updates, and whether an administrator controls your work or school account. Do not use a hidden flag as a workaround for a rollout condition. A reader's [workflow showcase](https://www.reddit.com/r/LazyWorkflow/comments/1xzbxg2/do_you_still_screenshot_a_webpage_just_to_ask_ai/) describes replacing the save-and-upload screenshot loop with screen selection; it is an example of use, not a report that the feature is broken or available to everyone.` },
        { heading: "Capture the details your question depends on", body: `Open the page and Gemini side panel, choose Add, then Select from screen. Drag a box around the chart, text, image, or product details you want to discuss. You can draw more than one box when two separate regions belong in the same question. Google says overlapping selections capture both areas, so an overlap can include material you did not mean to select. Press Escape to leave selection mode.

Ask for a specific operation on the captured material. For a product table, request a comparison of the visible rows and ask Gemini to identify missing fields. For a chart, ask it to list the labels and values before describing the trend. For a paragraph, request a plain-language explanation of a named sentence and ask it to point back to the wording. The [Scalevise feature walkthrough](https://scalevise.com/resources/gemini-chrome-select-from-screen-2/) covers the same entry point; this guide adds a review step and explains what a crop can establish.` },
        { heading: "Resize, move, or remove selections before sending", body: `Google's help says you can drag a selection's edges to resize it or move the whole box. Use multiple boxes for separated areas; if they overlap, the overlap is included. Hover over an unwanted capture and click Close Image to remove it. Close the Gemini side panel to clear all selections from the prompt. If a capture is too small to read, select it again rather than asking Gemini to infer unseen text from a nearby heading.

Before sending, inspect every attachment and compare it with the visible page. Include a chart's legend and units, a table's headers, and relevant footnotes. For product comparisons, retain the model, seller, currency, and date. If a row is clipped or a tooltip contains an important value, open that source and inspect it directly. A screen selection is model input, not a verified transcription. Keep the original page URL if you will rely on the answer later.` },
        { heading: "Treat the crop as selected content, not a privacy guarantee", body: `Google describes the feature as attaching selected page content to a prompt. A crop can narrow what you deliberately include, but do not assume it overrides Chrome's other context settings or changes the service's data handling. Google's [Chrome controls](https://support.google.com/chrome/answer/16283624?hl=en) separately describe current-tab sharing and tab selection. When the page is sensitive, inspect those controls as well as the capture preview before sending.

A selected image or paragraph can still contain personal details, account identifiers, or text written by the page for an AI to follow. Ask Gemini to analyze what is visible; do not ask it to obey instructions embedded in the page. For a chart, include its axis labels and source note. For a product choice, include the conditions that define a useful comparison. An isolated price or cropped label can produce a confident answer with too little evidence.` },
        { heading: "Choose another input method when the task is broader", body: `Select from screen suits a small visible portion of a webpage. If you need to compare multiple sites, use Chrome's shared-tab controls and check the tab list. If you need a summary of a long article, ask about the current page instead of collecting fragments. A PDF, image-only page, or content that is not readable in the browser may require a source file or screenshot, subject to the relevant account and privacy controls.

BrowserHub did not test a signed-in Chrome account or measure answer accuracy. Steps and availability were checked against Google Help on November 26, 2026. The [Scalevise feature overview](https://scalevise.com/resources/gemini-chrome-select-from-screen-2/) and [Rottenwifi capture guide](https://www.rottenwifi.com/how-to-capture-part-of-a-webpage-in-chrome/) are secondary explanations; Google's page is the authority for supported devices and selection behavior. For a multi-page comparison, see [Gemini in Chrome shared tabs](/en/guides/gemini-chrome-shared-tabs/).` }
      ],
      faq: [
        { question: "Can I select more than one part of a page?", answer: "Yes. Google says you can draw boxes around multiple regions. If they overlap, the overlap is captured too." },
        { question: "How do I remove a selection I do not want to send?", answer: "Hover over that selection and click Close Image. Closing the Gemini side panel clears all selections from the prompt." },
        { question: "Does a crop guarantee Gemini sees only that region?", answer: "The tool attaches the selected page content. Check Chrome's separate shared-tab controls and do not treat the crop as a guarantee about other context or data handling." },
        { question: "Why is Select from screen missing?", answer: "Google lists desktop Gemini access, supported countries, and Chromebook Plus, Mac, or Windows. Gemini in Chrome is still rolling out and has sign-in and account requirements." }
      ]
    },
    "zh-cn": {
      title: "在 Chrome 中只选取网页的一部分交给 Gemini",
      description: "用“从屏幕选择”询问图表、商品行或段落；发送前调整或移除选区，并核对设备与开放条件。",
      category: "AI 浏览器指南",
      content: "如果问题只涉及一个图表、段落或商品行，让 Gemini 总结整页可能带入过多信息。Gemini in Chrome 提供“从屏幕选择”，可把指定网页区域附加到提示词。Google 列出的支持设备包括 Chromebook Plus、Mac 和 Windows 桌面电脑，且需要所在国家或地区受支持。下面说明如何选择、修正和检查截图区域。",
      sections: [
        { heading: "先确认入口已向你的环境开放", body: `Google 的[功能帮助页](https://support.google.com/gemini/answer/17077507?hl=en-en)要求能够在桌面使用 Gemini in Chrome，所在国家或地区受支持，设备为 Chromebook Plus、Mac 或 Windows。[Chrome 帮助](https://support.google.com/chrome/answer/16283624?hl=en)还说明功能仍在逐步开放，需要登录 Chrome 账号，且无痕模式不可用。更新到最新版并不代表账号一定已有入口。

打开普通 Chrome 窗口，查看工具栏附近是否出现 Ask Gemini。如果没有，核对地区、设备、账号登录、更新状态；工作或学校账号还可能由管理员控制。不要用隐藏 flag 绕过开放条件。一条[读者工作流展示](https://www.reddit.com/r/LazyWorkflow/comments/1xzbxg2/do_you_still_screenshot_a_webpage_just_to_ask_ai/)介绍了用选屏代替保存截图再上传，但它是使用示例，不是功能故障报告，也不代表所有人都已获得入口。` },
        { heading: "框选问题所需的信息", body: `打开网页和 Gemini 侧栏，选择 Add，再点 Select from screen。拖动鼠标框住要讨论的图表、文字、图片或商品信息。若问题需要比较页面上分开的两处内容，可以画多个框。Google 说明，选区重叠时交叠区域也会被捕获。按 Escape 可退出选择模式。

提示词要明确要分析什么。看商品表格时，可以要求比较可见行并指出缺少的字段；看图表时，先列出标签和值，再解释趋势；读段落时，要求用白话解释指定句子，并指出对应原文。[Scalevise 功能介绍](https://scalevise.com/resources/gemini-chrome-select-from-screen-2/)也展示了入口；本文另外加入发送前检查和截图能证明什么的说明。` },
        { heading: "发送前移动、缩放或删除选区", body: `Google 帮助说明，可以拖动选框边缘调整大小，也能移动整个框。要覆盖不连续区域，可画多个框；如果框重叠，交叠内容也会被选中。悬停到误选图片上，点击 Close Image 可移除单项。关闭 Gemini 侧栏可一次清除提示词里的全部选区。如果截图太小导致文字难辨，应重新框选，不要根据附近标题推断未显示的内容。

发送前逐个查看附件，并和网页对照。依赖图表时，包含图例、单位和来源说明；比较商品时保留表头、型号、商家、币种和日期。如果表格行被截断，或数据藏在悬浮提示中，应回网页核实。截图是模型输入，不是经核验的文字抄录。之后要引用答案时，保留原网页链接。` },
        { heading: "框选不等于隐私保证", body: `Google 把此功能描述为将选中网页内容附加到提示词。框选可以缩小你主动提供的信息，但不应假定它会覆盖 Chrome 的其他上下文设置，也不能据此判断服务如何处理请求。Google 的[Chrome 功能说明](https://support.google.com/chrome/answer/16283624?hl=en)另有当前标签共享和标签选择控制。页面敏感时，发送前也要检查这些设置和附件预览。

截图中仍可能包含个人资料、账号标识或网页写给 AI 的指令。应要求 Gemini 分析可见内容，不要照着页面文字执行操作。解释图表时保留坐标轴和来源注释；比较商品时保留有用的筛选条件。只截价格或名称，可能缺少决定答案的依据。` },
        { heading: "任务范围更大时换一种输入方式", body: `“从屏幕选择”适合截取网页上一小块可见内容。要比较多个网站，使用 Chrome 的共享标签控件并核对列表；要总结长文章，直接询问当前页面，不必拼接多张小图。PDF、纯图片网页或浏览器无法读取的内容，可能需要源文件或截图，但仍要核对账号和隐私控制。

BrowserHub 没有登录 Chrome 账号实测，也没有测量答案准确率。步骤和开放条件根据 Google 帮助页于 2026 年 11 月 26 日核对。[Scalevise 介绍](https://scalevise.com/resources/gemini-chrome-select-from-screen-2/)与 [Rottenwifi 截取说明](https://www.rottenwifi.com/how-to-capture-part-of-a-webpage-in-chrome/)是补充资料；设备支持和选区行为以 Google 文档为准。多网页比较请看[Gemini in Chrome 共享标签指南](/zh-cn/guides/gemini-chrome-shared-tabs/)。` }
      ],
      faq: [
        { question: "可以选取网页上多个区域吗？", answer: "可以。Google 说明可以画多个选框；如果选区重叠，交叠内容也会被捕获。" },
        { question: "怎样删除误选区域？", answer: "悬停到选区并点 Close Image。关闭 Gemini 侧栏可清除提示词里的全部选区。" },
        { question: "框选能保证 Gemini 只看到这一块吗？", answer: "此功能会把选中内容附加到提示词。仍需检查 Chrome 单独的标签共享控制，不能把裁剪当成上下文或数据处理保证。" },
        { question: "为什么找不到“从屏幕选择”？", answer: "Google 要求支持地区、桌面版 Gemini 和 Chromebook Plus、Mac 或 Windows。功能仍在分批开放，并有账号和登录条件。" }
      ]
    }
  },
  "samsung-browser-windows-galaxy-continue-browsing": {
    en: {
      title: "Continue a Samsung Browser page between Galaxy and Windows",
      description: "Set up Samsung Browser and Galaxy Connect, distinguish page handoff from cloud Sync, and troubleshoot a missing phone or PC handoff.",
      category: "AI browser guides",
      content: "Samsung Browser for Windows links browsing with Galaxy phones and tablets, but Sync and Continue on other devices solve different problems. Sync keeps selected browser data available across devices; Continue hands off the page currently open. This guide covers accounts and services, both directions of handoff, and what to check when a phone or PC does not appear. It also separates page continuity from Galaxy AI tools such as summarizing or asking about a webpage.",
      sections: [
        { heading: "Choose between syncing browser data and continuing one page", body: `Samsung has more than one cross-device control. Browser Sync carries selected items such as bookmarks and open tabs through a Samsung Account. Continue on other devices hands off the page currently open: Samsung's Windows release note describes continuing the same browsing session between PC and mobile. A browser can sync bookmarks even when the page-handoff prompt is unavailable, or offer a handoff without mirroring every tab change.

Samsung's [browser page](https://www.samsung.com/us/apps/samsung-browser/) promotes cross-device browsing alongside Galaxy AI tools such as asking about webpage content, summarizing, translating, and reading highlights aloud. These serve different tasks. First decide whether you want a copied page, synced browser data, or AI help with what is on screen; each can have separate prerequisites.` },
        { heading: "Install the Windows browser and use the same account", body: `Download Samsung Browser from [Samsung's Windows site](https://browser.samsung.com/) and sign in with the Samsung Account used on your Galaxy device. Keep the browser current. Samsung's August 26, 2026 [release note](https://api.samsungmobilepress.com/press-releases/samsung-browser-windows-expands-mobile-connected-experience/) says version 30.0.4 includes Galaxy Connect in the Windows installer and installs it in the background. Older setup guides that tell every user to download and launch Galaxy Connect separately may describe an earlier version.

On the phone or tablet, open Samsung Browser settings and enable Sync with Samsung Cloud and Continue on other devices if those controls appear. Confirm both devices use the intended account and that Windows allows the connectivity service. Samsung's [official cross-device video](https://www.youtube.com/watch?v=3clFkDXAZtg) shows device linking, though interface labels can differ by release.` },
        { heading: "Send a page in the direction you need", body: `To move a page from phone to PC, leave it open in Samsung Browser on the phone, then check the linked-device or recent-pages area in the Windows browser. For PC to phone, open the PC page and use Continue on mobile or its linked-device action when available, then choose the phone. Samsung describes continuing the same browsing session; it does not promise to transfer an entire browser profile or every unsaved web-app state.

If the target device is missing, verify account identity, Sync and Continue settings, network access, browser version, and Galaxy Connect status. Unlock the phone and accept any linking prompt. Check recent tabs on the target before repeatedly pressing the handoff control. Some websites may ask you to sign in again, and a handoff prompt does not prove credentials or unsaved form data moved.` },
        { heading: "Troubleshoot sync without weakening account protection", body: `Readers have asked why Samsung Internet will not sync on Windows, including on a non-Galaxy laptop. One [Reddit discussion](https://www.reddit.com/r/samsunggalaxy/comments/1pxqqik/samsung_internet_browser_cant_sync_on_windows/) mentions Samsung Cloud encryption settings; a [Galaxy Book question](https://www.reddit.com/r/GalaxyBook/comments/1rsyaes/i_am_not_getting_a_pop_up_when_i_am_using_samsung/) asks why the phone handoff prompt is absent. These are individual reports, not a confirmed universal cause.

Check the Windows browser version and account first. Confirm Samsung Cloud sync is enabled for the data you want and that Continue is enabled, then restart the browser normally and check device status. If an encryption or account error appears, use Samsung's current support guidance. Do not disable encryption or weaken account protections because a forum reply says it worked for one person. Give Samsung support the error text and device/browser versions if you remain blocked.` },
        { heading: "Check compatibility and the AI feature boundary", body: `Samsung's Windows site and continuity announcements describe Galaxy connections, but availability can vary by Windows build, Galaxy device, account region, and service version. Samsung Browser also provides Galaxy AI tools on supported Android devices; do not assume every phone-side AI control exists in the Windows version. A summary generated on the phone and a page opened on the PC are separate operations, even if the same Samsung Account is signed in.

Use handoff to continue reading, Sync for selected browser data, and Galaxy AI for supported page questions or summaries. If AI is the main reason for choosing a Windows browser, compare your specific task and device support rather than relying on “seamless” as a compatibility promise. [Windows Central's launch coverage](https://www.windowscentral.com/software-apps/samsung-browser-finally-launches-on-windows-a-dark-horse-pick-for-your-next-browser) provides product context; Samsung's current pages establish setup details. BrowserHub did not pair devices or test account sync.` }
      ],
      faq: [
        { question: "Does Samsung Browser Sync do the same thing as Continue on other devices?", answer: "No. Sync covers selected browser data such as bookmarks or tabs; Continue hands off the page you are viewing. Check each control separately." },
        { question: "Do I still need to install Galaxy Connect separately?", answer: "Samsung says Windows Browser version 30.0.4 includes Galaxy Connect in its installer. Older directions may describe the previous setup." },
        { question: "Why is my Galaxy phone missing from the handoff list?", answer: "Check both devices use the same Samsung Account, update the browser, enable Sync and Continue, and check Galaxy Connect status. Availability can vary by device and build." },
        { question: "Should I turn off Samsung Cloud encryption to make sync work?", answer: "Do not change encryption based on an isolated forum suggestion. Check Samsung's current account guidance and contact support with the exact error." }
      ]
    },
    "zh-cn": {
      title: "在 Galaxy 设备与 Windows 电脑间继续使用 Samsung Browser",
      description: "连接 Samsung Browser 与 Galaxy Connect，区分网页接续和云端同步，并排查设备没有出现在交接列表的情况。",
      category: "AI 浏览器指南",
      content: "Samsung Browser for Windows 可以连接 Galaxy 手机和平板，但 Sync 与“在其他设备上继续”解决的不是同一问题。同步会把选定浏览器数据带到其他设备；Continue 则把当前页面交给已连接设备。本文介绍账号和服务、两个方向的页面交接，以及手机或电脑没有出现时的检查步骤，并区分页面接续与 Galaxy AI 网页总结功能。",
      sections: [
        { heading: "先分清同步浏览器数据与接续单个网页", body: `Samsung 提供不止一种跨设备控制。浏览器 Sync 可通过 Samsung Account 同步书签、打开标签等选定项目；Continue on other devices 用于交接当前页面。Samsung 的 Windows 版本说明称，用户可在 PC 与手机间继续同一浏览会话。因此，书签能同步，不代表页面交接入口一定可用；反过来也一样。

Samsung 的[浏览器产品页](https://www.samsung.com/us/apps/samsung-browser/)同时介绍跨设备浏览和 Galaxy AI 功能，例如询问网页、总结、翻译及朗读重点。两者用途不同。先决定你是要传递当前页面、同步浏览器数据，还是请 AI 处理网页内容；不同操作可能有不同前提。` },
        { heading: "安装 Windows 版并使用同一账号", body: `从 [Samsung Windows 浏览器页面](https://browser.samsung.com/)下载程序，并登录 Galaxy 设备正在使用的 Samsung Account。保持浏览器更新。Samsung 于 2026 年 8 月 26 日发布的[版本说明](https://api.samsungmobilepress.com/press-releases/samsung-browser-windows-expands-mobile-connected-experience/)称，Windows Browser 30.0.4 已把 Galaxy Connect 包含在安装程序中，并会在后台安装。要求所有人单独下载并启动 Galaxy Connect 的旧教程可能对应此前版本。

在手机或平板上打开 Samsung Browser 设置；如果当前版本显示 Sync with Samsung Cloud 和 Continue on other devices，就启用对应功能。确认两台设备登录了正确账号，也允许 Windows 上的连接服务运行。Samsung 的[官方跨设备视频](https://www.youtube.com/watch?v=3clFkDXAZtg)演示了设备连接，但界面文字可能随版本变化。` },
        { heading: "按需要的方向交接网页", body: `从手机切换到电脑时，让网页保持在手机 Samsung Browser 中打开，再到 Windows 浏览器查看已连接设备或最近页面。从电脑切换到手机时，在 PC 页面选择 Continue on mobile 或相应设备入口，再选择手机。Samsung 把它描述为继续同一浏览会话，并未承诺转移完整浏览器配置文件或所有网页应用的未保存状态。

目标设备未出现时，核对账号、Sync 与 Continue 设置、网络、浏览器版本和 Galaxy Connect 状态。解锁手机并接受可能出现的连接提示。随后检查目标设备的最近标签页，再决定是否重试。某些网站仍会要求重新登录；看到交接提示并不能证明凭据或未保存表单已经转移。` },
        { heading: "排查同步时不要降低账号保护", body: `有读者问 Samsung Internet 为什么无法在 Windows 同步，包括在非 Galaxy 品牌电脑上的情况。[一条 Reddit 讨论](https://www.reddit.com/r/samsunggalaxy/comments/1pxqqik/samsung_internet_browser_cant_sync_on_windows/)提到 Samsung Cloud 加密设置；一条 [Galaxy Book 提问](https://www.reddit.com/r/GalaxyBook/comments/1rsyaes/i_am_not_getting_a_pop_up_when_i_am_using_samsung/)则询问手机接续提示为何没有出现。这些是个人报告，不能证明普遍原因。

先核对 Windows 浏览器版本和账号，再确认 Samsung Cloud 为所需数据开启同步、Continue 已启用。正常重启浏览器并查看设备状态。若出现加密或账号错误，查 Samsung 当前帮助说明；不要仅凭论坛回复关闭加密或降低账号保护。问题仍存在时，把错误文字和设备、浏览器版本提供给 Samsung 支持。` },
        { heading: "核对设备兼容与 AI 功能边界", body: `Samsung 的 Windows 页面和跨设备公告介绍了 Galaxy 连接功能，但可用性可能受 Windows 构建版本、Galaxy 设备、账号地区和服务版本影响。Samsung Browser 也在受支持的 Android 设备上提供 Galaxy AI 工具；不要假定手机端每项 AI 功能都已出现在 Windows 版中。手机生成网页摘要，与电脑打开同一网页，是两种不同操作，即使两边登录同一账号也一样。

阅读接续用网页交接，浏览器数据用 Sync，网页提问或总结用受支持的 Galaxy AI。[Windows Central 发布介绍](https://www.windowscentral.com/software-apps/samsung-browser-finally-launches-on-windows-a-dark-horse-pick-for-your-next-browser)可了解 Windows 版背景；当前设置以 Samsung 最新页面为准。BrowserHub 没有实际配对设备或测试账号同步。` }
      ],
      faq: [
        { question: "Samsung Browser 的 Sync 和“在其他设备上继续”一样吗？", answer: "不一样。Sync 针对书签、标签等选定浏览器数据；Continue 用于交接当前网页。应分别检查。" },
        { question: "还要单独安装 Galaxy Connect 吗？", answer: "Samsung 称 Windows Browser 30.0.4 安装程序已包含 Galaxy Connect。较早说明可能对应旧版安装方式。" },
        { question: "为什么 Galaxy 手机没有出现在接续列表？", answer: "核对两台设备是否登录同一账号，浏览器是否已更新，Sync 和 Continue 是否开启，以及 Galaxy Connect 状态。设备和版本也会影响可用性。" },
        { question: "为同步关闭 Samsung Cloud 加密可以吗？", answer: "不要只凭单条论坛建议修改加密。先查看 Samsung 当前账号说明，并向官方支持提供具体错误。" }
      ]
    }
  },
  "edge-copilot-selected-pdf-text": {
    en: {
      title: "Explain selected PDF text with Copilot in Edge",
      description: "Check why Ask Copilot may not send a PDF selection, what Edge currently documents, and when OneDrive's selected-text action is a separate option.",
      category: "AI browser guides",
      content: "Selecting a sentence in Edge's PDF viewer and choosing Ask Copilot can clarify a clause or technical paragraph. A Microsoft Q&A post describes the menu doing nothing even though the Copilot sidebar works. Current documentation also describes a separate PDF workflow in OneDrive, so identify where the file is open before troubleshooting. This guide separates documented steps from old community workarounds that have not been confirmed as fixes.",
      sections: [
        { heading: "Identify the PDF and Copilot surface", body: `Edge can open a local PDF in its built-in viewer. Copilot can answer questions about a webpage or PDF when the relevant context is available. Microsoft's [Edge guide](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge) says to open the PDF, open Copilot, and ask about the page or use a suggested action. A separate OneDrive feature explains selected text through Copilot's context menu. These workflows have different account and file-location requirements.

Record where the PDF is open: a local file in Edge, a file stored in OneDrive, or a OneDrive for Business page using a work account. Note the Edge version and whether the problem is that the menu is missing, the prompt is not sent, or the answer ignores the selection. A working sidebar does not prove every PDF selection action is enabled.` },
        { heading: "Use the currently documented Edge PDF route", body: `For a PDF open in Edge, select the Copilot icon and ask a focused question about the document. Microsoft's current [Edge setup page](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge) lists summaries, suggested prompts, and typed questions about open pages, videos, or PDFs. Depending on the prompt and settings, Copilot may use the current page, recent conversation, open tabs, and browsing history. Check the context before sending a sensitive document.

If your build shows Ask Copilot on selected PDF text and the click works, inspect the highlighted passage in the prompt before submission. Ask for an explanation of that excerpt, then verify the answer against nearby definitions, footnotes, and the full PDF. A selection may omit a table heading or qualification. If the action is missing, use Microsoft's general PDF question workflow or report the issue with the build and file details; do not assume the menu should exist in every configuration.` },
        { heading: "Use OneDrive's selected-text action only with the matching setup", body: `Microsoft documents another route for PDFs at onedrive.com. Its [OneDrive PDF guide](https://support.microsoft.com/en-us/onedrive/review-pdfs-using-copilot-context-menu-and-ai-actions) says to sign in with a work account, open the PDF, select text, and choose Explain this. You can enter a custom prompt there too. The feature is documented for OneDrive work or school contexts; that does not mean a locally opened Edge PDF will show the same menu.

If the PDF is in personal OneDrive or your Downloads folder, do not expect the work-account steps to produce the same interface. If your organization blocks Copilot or the feature is unavailable to your account, ask an administrator which enabled route applies. Keep file permissions intact; do not upload a restricted PDF to an unrelated chat service as a diagnostic shortcut.` },
        { heading: "Troubleshoot a menu that does nothing without risky fixes", body: `A [Microsoft Q&A thread](https://learn.microsoft.com/en-us/answers/questions/5584561/ask-copilot-not-working-with-selected-pdf-text-in) records a user whose Ask Copilot action did not send selected PDF text. The proposed causes and fixes are community replies, not official diagnosis. The question author later said disabling the new viewer, clearing cache, and disabling extensions did not resolve their case. Treat the thread as evidence of a reported problem, not as a universal fix.

Update Edge through Settings > About Microsoft Edge, reopen the file, and try a second non-sensitive PDF with selectable text. If Copilot summarizes the PDF but the selected-text menu fails, report that difference with the Edge version and file source. Check whether an organization policy or account restriction applies. Avoid changing experimental PDF flags based on an old forum answer: current Microsoft documentation does not prescribe this, and the Q&A author reported it did not solve the issue.` },
        { heading: "Check the answer against the PDF before relying on it", body: `Compare the response with the selected text and the surrounding page. A summary may miss a defined term, footnote, exception, or neighboring table row. Ask Copilot to identify the exact passage it used, then read the original before acting on legal, medical, financial, or compliance material. If the PDF is a scan rather than selectable text, a selection menu cannot operate on the page until OCR or another readable input is available.

A Windows Central [feature report](https://www.windowscentral.com/software-apps/microsoft-edge-just-got-two-new-ai-features-and-theyre-actually-useful) and a [Microsoft 365 walkthrough](https://www.youtube.com/watch?v=ORHAkqNr0U4) cover PDF Copilot actions in OneDrive or SharePoint contexts; they do not establish identical behavior for a local Edge file. BrowserHub reviewed public documentation and reader reports on November 26, 2026. It did not reproduce the issue or test a private account. For general PDF summaries, see [AI browser PDF summary](/en/guides/ai-browser-pdf-summary/).` }
      ],
      faq: [
        { question: "Does Ask Copilot on selected PDF text work for every Edge PDF?", answer: "Microsoft documents Copilot questions about PDFs, but the selected-text menu depends on the exact PDF surface and account. Check the controls in your build." },
        { question: "Can I use OneDrive's Explain this action for a local PDF?", answer: "Microsoft's selected-text action is documented for a PDF at onedrive.com signed in with a work account. That is separate from a local Edge PDF." },
        { question: "Should I disable an Edge PDF flag to fix Ask Copilot?", answer: "Current Microsoft documentation does not recommend that as a supported fix. A Q&A author said disabling the new viewer did not resolve their case." },
        { question: "Why can Copilot summarize a PDF but ignore my selection?", answer: "The full-document question and selected-text menu are separate entry points. Record which one failed, the file location, account type, and Edge version." }
      ]
    },
    "zh-cn": {
      title: "在 Edge 中用 Copilot 解释 PDF 选中文字",
      description: "排查 Ask Copilot 没有发送 PDF 选区的情况，区分 Edge 当前说明与 OneDrive 的独立选中文字功能。",
      category: "AI 浏览器指南",
      content: "在 Edge PDF 查看器里选中一句话，再点 Ask Copilot，可以用来解释条款或技术段落。一条 Microsoft Q&A 提问描述了菜单点击后没有动作，但 Copilot 侧栏本身正常。当前文档还说明了 OneDrive 中另一种 PDF 操作，因此排查前先确认文件是在 Edge 本地打开，还是在 OneDrive 中查看。本文区分官方步骤和未经证实的旧版社区建议。",
      sections: [
        { heading: "确认 PDF 所在位置和 Copilot 入口", body: `Edge 可在内置查看器里打开本地 PDF；上下文可用时，Copilot 也能回答网页或 PDF 问题。Microsoft 的 [Edge 指南](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge)建议打开 PDF、启动 Copilot，再询问页面内容或使用建议操作。OneDrive 另有通过 Copilot 菜单解释 PDF 选中文字的功能。两种方式的账号和文件位置要求不同。

记录 PDF 是本地文件、OneDrive 文件，还是通过工作账号查看的 OneDrive for Business 文件；再记下 Edge 版本和故障表现：菜单不显示、点击后不发送，还是答案忽略选区。侧栏能正常回答，并不能证明所有 PDF 选中文字功能都已启用。` },
        { heading: "先按 Edge 当前文档询问 PDF", body: `PDF 在 Edge 打开时，点击 Copilot 图标并提出具体问题。Microsoft 当前的 [Edge 入门页](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge)列出摘要、推荐问题，以及针对网页、视频和 PDF 的文字提问。根据提示词和设置，Copilot 可能使用当前页面、近期对话、打开的标签和浏览历史。发送敏感文件前先检查上下文。

如果当前版本确实显示 Ask Copilot，且选中文字后点击有效，发送前检查高亮段落和提示内容是否一致。让 Copilot 解释选段后，再对照附近定义、脚注和 PDF 全文核实。选区可能缺少表头或限定条件。若菜单不显示，可先使用 Microsoft 文档列出的 PDF 提问方式，或反馈版本和文件信息；不要假设每种配置都有同一菜单。` },
        { heading: "只有满足账号条件时才用 OneDrive 选中文字", body: `Microsoft 还为 onedrive.com 上的 PDF 记录了另一条路径。[OneDrive PDF 帮助](https://support.microsoft.com/en-us/onedrive/review-pdfs-using-copilot-context-menu-and-ai-actions)要求用工作账号登录、打开 PDF、选择文本，再点 Explain this；也可以输入自定义提示词。该功能说明针对 OneDrive 工作或学校环境，不代表在 Edge 本地打开的 PDF 也会显示同一菜单。

文件若在个人 OneDrive 或下载目录中，不要照工作账号步骤操作并期待界面完全相同。组织可能限制 Copilot；遇到这种情况，询问管理员适用于当前账号的已启用方式。保留文件权限，不要把受限 PDF 上传到无关聊天服务来排查问题。` },
        { heading: "菜单无反应时避免冒险修改", body: `一条 [Microsoft Q&A 讨论](https://learn.microsoft.com/en-us/answers/questions/5584561/ask-copilot-not-working-with-selected-pdf-text-in)记录了 Ask Copilot 没有发送 PDF 选中文字的情况。回复里的可能原因和修复方法属于社区答复，不是官方诊断。提问者后来表示，关闭新版查看器、清缓存和停用扩展都没有解决自己的问题。因此应把它视为用户问题报告，不能当成通用修复。

通过“设置 > 关于 Microsoft Edge”更新浏览器，重新打开文件，再用另一份可选中文字的非敏感 PDF 对照。如果 Copilot 能总结 PDF、但选中文字菜单失效，反馈时说明这两个入口的差异、Edge 版本和文件来源。也检查组织策略或账号限制。不要根据旧论坛答复修改实验性 PDF flag：当前 Microsoft 文档没有将其列为受支持修复，Q&A 提问者也说该方法无效。` },
        { heading: "根据 PDF 原文核对回答", body: `把回复与选中文字及其上下文对照。摘要可能漏掉定义、脚注、例外或相邻表格行。可以让 Copilot 指明采用了哪句话，再亲自阅读 PDF；涉及法律、医疗、财务或合规事项时，应以原文核实。如果 PDF 是扫描图像、文字不可选，菜单无法直接处理该页，除非先经 OCR 等方式转成可读输入。

Windows Central 的[功能报道](https://www.windowscentral.com/software-apps/microsoft-edge-just-got-two-new-ai-features-and-theyre-actually-useful)和 [Microsoft 365 演示](https://www.youtube.com/watch?v=ORHAkqNr0U4)介绍的是 OneDrive 或 SharePoint 中的 PDF Copilot 操作，不能证明 Edge 本地文件表现相同。BrowserHub 于 2026 年 11 月 26 日查阅公开文档和读者报告，没有复现故障或测试私人账号。一般 PDF 总结方式见[AI 浏览器 PDF 总结指南](/zh-cn/guides/ai-browser-pdf-summary/)。` }
      ],
      faq: [
        { question: "Edge 的 Ask Copilot 能处理每份 PDF 的选中文字吗？", answer: "Microsoft 说明 Copilot 可回答 PDF 问题，但选中文字菜单取决于具体查看界面和账号。请核对当前版本的入口。" },
        { question: "本地 PDF 能用 OneDrive 的 Explain this 吗？", answer: "Microsoft 文档针对的是登录工作账号后在 onedrive.com 打开的 PDF，不等同于 Edge 本地文件。" },
        { question: "要修复 Ask Copilot，我该关闭 Edge PDF flag 吗？", answer: "当前 Microsoft 文档未推荐这种做法。一位 Q&A 提问者也称关闭新版查看器没有解决问题。" },
        { question: "为什么 Copilot 能总结 PDF，却忽略选区？", answer: "整份文档提问和选中文字菜单是不同入口。记录失败入口、文件位置、账号类型和 Edge 版本。" }
      ]
    }
  },
  "gemini-chrome-pop-out-chat-history": {
    en: {
      title: "Move a Gemini in Chrome chat out of the side panel",
      description: "Use the documented pop-out and recent-chat controls when Gemini's panel feels cramped, and keep tab sharing separate from the chat window.",
      category: "AI browser guides",
      content: "Gemini in Chrome keeps a conversation beside the page, which is useful for short questions but can feel narrow during a long answer or when you compare notes. Google documents Pop-out chat, Dock to original tab, and a recent-chat list. Some users report seeing a Continue chat in new tab label; current help uses different wording, so this guide separates the documented control from labels that may vary by rollout.",
      sections: [
        { heading: "Use the documented Pop-out chat control", body: `Open Gemini in Chrome from Ask Gemini. At the top of the panel, select Pop-out chat to move the current conversation into a floating window. Select Dock to original tab to return it to the side panel. These controls are listed in Google's current [Chrome Help page](https://support.google.com/chrome/answer/16283624?hl=en). The floating view gives the chat more room while leaving the Chrome page available.

A [Google Support Community question](https://support.google.com/gemini/thread/438913125/gemini-in-chrome-is-unusable-with-pro-account?hl=en) describes the narrow panel as difficult to use with a paid account and showed 21 “same question” signals when checked. That is a page-level response count at one observation time, not proof of a wider account problem. A second user asks how to expand the panel on [Googlebook](https://www.reddit.com/r/Googlebook/comments/1x47n4f/is_there_a_way_to_expand_this_gemini_bar_in/); its reply mentions a “continue chat in new tab” label that may differ from today's documented wording.` },
        { heading: "Find the conversation again without starting over", body: `If the panel closes, reopen Gemini in Chrome and select More options. Google documents a list of recent Gemini chats there. Choose the conversation you want to continue, then pop it out if the side panel is too narrow. Start new chat is a separate control that creates another conversation. Pop-out chat moves the existing thread to another window; it does not mean “start over.”

If a recent conversation is not visible, check that you reopened the same Chrome profile and account. Do not use Start new chat as a recovery step unless you intend to begin a different thread. Keep a copy of source links or decisions that you need outside the chat history; the pop-out control changes window placement, not the retention policy for the conversation.` },
        { heading: "Keep page context separate from chat placement", body: `The chat window and its browser context are separate controls. Google's help says a new chat can share the current tab by default; Update tabs lets you select which tabs are shared. Moving a chat to a floating window does not document a change to that shared-tab list. Before asking about a page, inspect the tab indicator near the prompt and remove anything you do not want included.

For a question about one chart or paragraph, the [Select from screen guide](/en/guides/gemini-chrome-select-screen-region/) explains how to attach a region. To compare sources across pages, use the [shared tabs guide](/en/guides/gemini-chrome-shared-tabs/) and review the selected tabs. A larger window improves readability; it does not expand the evidence already provided to Gemini.` },
        { heading: "If the menu labels look different", body: `Google says Gemini in Chrome is rolling out and has account, region, device, language, and sign-in requirements. A control may sit under More options depending on the panel layout. Update Chrome through its normal updater, reopen the panel, and compare the buttons with current Help. For a work or school account, ask the administrator whether access is enabled before changing unrelated settings.

If your screen says Continue chat in new tab, note the exact label and Chrome version. Current Google Help lists Pop-out chat and Dock to original tab, not that exact phrase. Avoid instructions that depend on an experimental flag or change account data settings to force a window mode. Use the controls currently shown in your build and report a mismatch with a screenshot that does not expose private content.` },
        { heading: "Choose a window for the task", body: `Keep the side panel for a short page question while you read. Pop out the conversation when a long answer, table, or code block needs more width. Use More options to return to recent chats, and Start new chat only when you want a fresh thread. These choices help preserve the current conversation while you continue working in Chrome.

Google's [Chrome Help](https://support.google.com/chrome/answer/16283624?hl=en) is the source for current pop-out, docking, recent-chat, and shared-tab controls. T3's [feature overview](https://www.t3.com/tech/laptops/uk-users-just-got-google-gemini-in-chrome-adding-these-5-key-upgrades) also discusses the panel and recent history; its older rollout details are not current eligibility guidance. BrowserHub did not use a paid Chrome account or test the interface. Steps were checked on November 26, 2026.` }
      ],
      faq: [
        { question: "Does Pop-out chat start a new Gemini conversation?", answer: "Google describes it as moving the current chat into a floating window. Start new chat is a separate control." },
        { question: "How do I return the chat to Chrome's side panel?", answer: "Use Dock to original tab at the top of the floating chat." },
        { question: "Where can I find recent Gemini in Chrome chats?", answer: "Open More options at the top of Gemini in Chrome and choose a recent chat." },
        { question: "Does popping out remove the current tab from Gemini's context?", answer: "Google documents pop-out and tab sharing as separate controls. Check Update tabs and the shared-tab indicator." }
      ]
    },
    "zh-cn": {
      title: "把 Gemini in Chrome 对话移出侧栏",
      description: "侧栏太窄时使用官方记录的弹出与最近对话控件，并把聊天窗口位置和共享标签分开核对。",
      category: "AI 浏览器指南",
      content: "Gemini in Chrome 会把对话放在网页旁边，适合简短提问；长回答或需要对照资料时，侧栏可能显得窄。Google 当前文档列出了 Pop-out chat、Dock to original tab 和最近对话列表。有用户报告看到“在新标签页继续对话”的字样，但帮助页使用另一组名称。本文区分已记录的弹出控件和可能随开放版本变化的菜单文字。",
      sections: [
        { heading: "使用帮助页记录的 Pop-out chat", body: `点击 Ask Gemini 打开 Chrome 中的 Gemini。在面板顶部选择 Pop-out chat，可把当前对话移到浮动窗口；选择 Dock to original tab 可返回侧栏。Google 当前的 [Chrome 帮助页](https://support.google.com/chrome/answer/16283624?hl=en)列出了这两个控件。浮动窗口能给长对话更多空间，同时保留网页。

一条 [Google 支持社区问题](https://support.google.com/gemini/thread/438913125/gemini-in-chrome-is-unusable-with-pro-account?hl=en)称侧栏太窄，影响付费账号使用；查阅时显示 21 个“我也有此问题”反馈。这只是某一时间的页面互动数，不能证明其他账号也有同样问题。另一位用户在 [Googlebook 讨论](https://www.reddit.com/r/Googlebook/comments/1x47n4f/is_there_a_way_to_expand_this_gemini_bar_in/)询问如何扩展侧栏，回复提到“在新标签页继续对话”，但这个字样可能不同于当前帮助页。` },
        { heading: "回到原对话，不要误开新聊天", body: `如果面板关闭，重新打开 Gemini in Chrome，再点 More options。Google 帮助说明这里可以查看最近对话。选择要继续的会话；若侧栏太窄，再把它弹出。Start new chat 是独立控件，会建立另一条对话。Pop-out chat 移动的是现有线程，不是重新开始。

最近对话不显示时，先确认重新打开的是同一个 Chrome 配置文件和账号。不要把 Start new chat 当成恢复对话的步骤，除非确实要开新线程。需要在对话历史之外保留的来源链接或决定，应另存一份；弹出控件只改变窗口位置，不改变聊天的保存政策。` },
        { heading: "网页上下文与聊天窗口位置分开检查", body: `聊天窗口和浏览器上下文是不同控制。Google 帮助说明，新聊天默认可能共享当前标签；Update tabs 可以选择要共享的标签。把聊天弹出并没有文档说会改变共享列表。针对网页提问前，查看提示词旁的标签标记，并移除不想纳入的页面。

只需解释一张图或一段文字时，请看[从屏幕选择区域指南](/zh-cn/guides/gemini-chrome-select-screen-region/)；比较多个网页时，可看[共享标签指南](/zh-cn/guides/gemini-chrome-shared-tabs/)并核对实际选中的标签。扩大窗口改善阅读体验，但不会增加 Gemini 已收到的依据。` },
        { heading: "如果菜单文字与帮助页不同", body: `Google 说明 Gemini in Chrome 正在逐步开放，并有账号、地区、设备、语言和登录要求。根据面板布局，按钮可能收在 More options 下。通过 Chrome 内置更新程序更新后重新打开面板，再对照当前帮助页核对。工作或学校账号应先问管理员功能是否已启用，不要改无关设置。

如果你的界面写着 Continue chat in new tab，记下菜单全文和 Chrome 版本。当前 Google 帮助页列出 Pop-out chat 和 Dock to original tab，并没有使用这个确切说法。不要依赖实验性 flag 或改变账号数据设置来强制切换窗口。使用当前版本实际显示的控件；反馈界面差异时避免上传包含私人内容的截图。` },
        { heading: "按任务选聊天窗口", body: `边看网页边问简短问题时，保留侧栏即可。长回答、表格或代码块需要更宽空间时，再把对话弹出。要找旧聊天，从 More options 查看最近对话；确实需要新主题时才点 Start new chat。这样能在继续浏览时保留原会话。

当前弹出、停靠、最近对话和共享标签步骤以 Google 的 [Chrome 帮助](https://support.google.com/chrome/answer/16283624?hl=en)为准。T3 的[功能概览](https://www.t3.com/tech/laptops/uk-users-just-got-google-gemini-in-chrome-adding-these-5-key-upgrades)也介绍了侧栏和历史记录，但其中旧的开放地区说明不是当前资格指南。BrowserHub 未登录付费账号测试界面；步骤于 2026 年 11 月 26 日核对。` }
      ],
      faq: [
        { question: "Pop-out chat 会新建 Gemini 对话吗？", answer: "Google 将它描述为把当前对话移到浮动窗口。Start new chat 是单独的新建控件。" },
        { question: "如何把对话放回 Chrome 侧栏？", answer: "在浮动窗口顶部选择 Dock to original tab。" },
        { question: "在哪里查看 Gemini in Chrome 最近对话？", answer: "打开 Gemini 顶部的 More options，再选择最近聊天。" },
        { question: "弹出对话会取消当前标签共享吗？", answer: "Google 将窗口弹出与标签共享列为不同控制。请查看 Update tabs 和共享标签标记。" }
      ]
    }
  },
  "gemini-tasks-schedules-pause-resume": {
    en: {
      title: "Pause and resume scheduled Tasks in Gemini",
      description: "Find Gemini Apps task schedules, distinguish pausing future runs from stopping current work, and check schedule limits and task dependencies.",
      category: "AI browser guides",
      content: "Gemini Tasks can have schedules that run again later, leaving two separate things to manage: the current task and its next scheduled run. If a connector needs attention or the list is cluttered, pausing a schedule stops future runs while keeping the task available. This guide covers the schedule controls and distinguishes Gemini Apps Tasks from Chrome Auto Browse and scheduled actions in a regular Gemini chat.",
      sections: [
        { heading: "Confirm you are managing a Gemini Apps Task", body: `Google's [Gemini Apps schedule guide](https://support.google.com/gemini/answer/17094710?hl=en) describes schedules attached to Tasks. A separate [task and workflow help page](https://support.google.com/gemini/answer/17094507?co=GENIE.Platform%3DDesktop&hl=en) explains task threads, progress panels, and schedule controls. These are Gemini Apps features, separate from Gemini in Chrome Auto Browse and a scheduled action in an ordinary chat.

A [reader report](https://www.reddit.com/r/GeminiAI/comments/1y3jh4w/gemini_ios_web_issues_github_mcp_disconnects_no/) describes difficulty organizing scheduled tasks and a GitHub MCP connection that needs reauthorization. It records one user's experience, not a confirmed product-wide defect or a documented fix for that connector. Before changing anything, note which Gemini surface created the task, its thread name, connected service, and whether the schedule is active, paused, or completed.` },
        { heading: "Find a schedule and inspect its next run", body: `Open the task thread and select its scheduled-task chip to view details. Google's desktop help also describes managing schedules from the Scheduled page. Check the task name, next run, recurrence, instructions, and connected services before editing it. If several schedules have similar names, confirm the thread and service so you do not pause the wrong task.

Google says run times are approximate and may be delayed during high activity. A schedule can depend on access to a connected service. If an authentication message appears, treat it as a dependency to inspect; pausing and resuming is not documented as a way to repair a connector. Reauthorize only through the connected service's normal flow and review the permissions the task can use.` },
        { heading: "Pause future runs without assuming current work has stopped", body: `To pause a schedule, open the task thread, select its schedule chip, open More options, then choose Pause. To run it again later, return to the same schedule and select Resume. Google's desktop help also says schedules can be managed from the Scheduled page. Confirm the paused status in the interface and check that the next run is no longer active.

Pause controls a schedule's future runs. It does not, by itself, mean the task thread or a step already underway has been cancelled. To stop current work, use the task's own stop or cancel control if available, then verify the progress panel. Google documents a separate control for stopping browser activity during some tasks; stopping a browser action and pausing a schedule have different effects. Review tasks that could send messages, change records, or submit forms.` },
        { heading: "Resume only after checking access and run conditions", body: `Before resuming, reopen the task's work panel and inspect progress, permissions, and connected services. If the task depends on a connector, confirm its status first. Narrow the instructions to the sources it may read and actions it must leave unchanged. For a public page review, you might ask for the URL, visible date, and relevant text, then review the result before anyone acts on it. Do not grant broad access just to revive a stale schedule.

Google's schedule help says that after reaching the schedule limit, you must pause or delete an existing schedule before creating or resuming another. Run times are approximate. After Resume, verify that the intended recurrence is active and inspect the next-run time; do not expect an immediate run unless the interface says one is due. If a schedule is no longer useful, delete it deliberately and confirm the result.` },
        { heading: "Know what deleting the task thread removes", body: `A schedule is connected to its task thread. Google's task management help says deleting the thread also deletes its schedules. Pause is the reversible option when you may need the task later. Delete only after checking that neither the thread nor future runs are needed; there may not be a separate schedule left to resume afterward.

The word Task can refer to different Gemini features. Chrome Auto Browse controls browser work and its local or remote lifecycle, covered in [Gemini Auto Browse local vs remote](/en/guides/gemini-auto-browse-local-vs-remote/). Ordinary Gemini chat also supports scheduled actions, which Google distinguishes from task schedules. BrowserHub reviewed public Google help and reader reports on November 26, 2026; it did not create or run a schedule, connect GitHub, or verify account access. Do not rely on this guide as proof that a particular integration is available to your account.` }
      ],
      faq: [
        { question: "Does pausing a schedule stop a task that is already running?", answer: "Google documents Pause as a control for future schedule runs. Use the thread's own stop or cancel control for current work and verify its progress state." },
        { question: "How do I resume a Gemini task schedule?", answer: "Open the task's schedule chip, choose More options, then Resume. Google's desktop help also lists the Scheduled page." },
        { question: "Will deleting a task thread leave its schedule behind?", answer: "Google says deleting the task thread also deletes its associated schedules." },
        { question: "Are Gemini Tasks schedules the same as Auto Browse or scheduled actions?", answer: "No. Gemini Apps task schedules, Chrome Auto Browse, and scheduled actions in a regular chat are separate features with different controls." }
      ]
    },
    "zh-cn": {
      title: "暂停和恢复 Gemini Tasks 定时任务",
      description: "找到 Gemini Apps 任务日程，区分暂停后续运行与停止当前工作，并核对日程限制和连接依赖。",
      category: "AI 浏览器指南",
      content: "Gemini Tasks 可以按日程再次运行，因此需要管理两件事：当前任务和下一次计划运行。如果连接器需要重新授权，或列表很乱，暂停日程可以停止未来运行，同时保留之后恢复的可能。本文介绍日程控件，并区分 Gemini Apps Tasks、Chrome Auto Browse 和普通聊天里的定时操作。",
      sections: [
        { heading: "确认你管理的是 Gemini Apps Task", body: `Google 的 [Gemini Apps 日程帮助](https://support.google.com/gemini/answer/17094710?hl=en)介绍了附属于 Tasks 的日程。另一个[任务与工作流帮助页](https://support.google.com/gemini/answer/17094507?co=GENIE.Platform%3DDesktop&hl=en)说明了任务线程、进度面板和日程控制。这些属于 Gemini Apps，与 Gemini in Chrome 的 Auto Browse 和普通聊天中的计划操作不同。

一条[读者报告](https://www.reddit.com/r/GeminiAI/comments/1y3jh4w/gemini_ios_web_issues_github_mcp_disconnects_no/)提到定时任务不好整理，以及 GitHub MCP 连接需要重新授权。这是个人使用经历，不是已确认的普遍故障，也没有提供该连接器的官方修复方式。改动前记下任务来自哪个 Gemini 界面、线程名称、连接服务，以及当前显示运行中、暂停还是已完成。` },
        { heading: "找到日程并查看下一次运行", body: `打开任务线程，选择计划任务标记查看详情。Google 桌面帮助还说明可在 Scheduled 页面管理日程。编辑前核对任务名称、下次运行、重复规则、指令和连接服务。若有几个名字相似的任务，先确认线程和服务，避免暂停错对象。

Google 称运行时间是近似值，高峰时可能延迟。日程也可能依赖已连接服务的访问权限。若出现身份验证消息，应把它当成需要检查的依赖；官方没有说暂停再恢复可以修好连接器。重新授权时走连接服务自身的正常流程，并检查任务可使用的权限。` },
        { heading: "暂停未来运行不等于停止当前工作", body: `暂停日程时，打开任务线程，选择日程标记，点 More options，再选 Pause。以后要恢复时，回到同一个日程选择 Resume。Google 桌面帮助也说明可在 Scheduled 页面管理。确认界面显示为暂停，并核对下一次运行不再是活动状态。

Pause 控制日程的未来运行，本身不代表任务线程或当前执行步骤已取消。要停止正在进行的工作，使用任务界面提供的停止或取消控件，并核对进度面板。Google 对部分任务还单独提供停止浏览器操作的控件；停止网页动作和暂停日程效果不同。涉及发消息、改记录或提交表单的任务，应检查当前执行状态。` },
        { heading: "检查访问权限和运行条件后再恢复", body: `恢复前，重新打开任务工作面板，检查进度、所需权限和连接服务。任务依赖连接器时，先确认连接状态。把指令范围限定为允许读取的来源和必须保持不变的内容。例如查看公开网页，可要求返回网址、页面显示日期和相关文本，再由你审阅结果。不要只为恢复一个旧日程就扩大授权。

Google 日程帮助说明，达到日程数量上限后，需要先暂停或删除现有日程，才能创建或恢复另一个。运行时间只是近似值。点 Resume 后核对目标日程确实处于活动状态，并查看下次运行时间；除非界面说明到期，不要认为会立刻执行。如果某个日程已经无用，明确删除后再检查状态。` },
        { heading: "删除任务线程会同时移除关联日程", body: `日程关联着任务线程。Google 任务管理帮助说明，删除线程也会删除相关日程。若之后还想继续使用，Pause 是可恢复的选择。只有确认线程与后续运行都不再需要时再删除；删除后可能没有独立日程可供恢复。

Gemini 中的 Task 可能指不同功能。Chrome Auto Browse 控制浏览器任务及本地或远程生命周期，参见[Gemini Auto Browse 本地与远程指南](/zh-cn/guides/gemini-auto-browse-local-vs-remote/)。普通 Gemini 聊天也支持定时操作，Google 将其与任务日程分开说明。BrowserHub 于 2026 年 11 月 26 日查阅 Google 帮助和读者报告，没有创建或运行日程、连接 GitHub，也未核实账号权限。本文不能证明特定集成已对你的账号开放。` }
      ],
      faq: [
        { question: "暂停日程会停止正在运行的任务吗？", answer: "Google 把 Pause 记录为控制未来日程运行的选项。要停止当前工作，请使用线程自己的停止或取消控件，并核对进度。" },
        { question: "怎样恢复 Gemini 任务日程？", answer: "打开任务的日程标记，选择 More options，再点 Resume。Google 桌面帮助也提到 Scheduled 页面。" },
        { question: "删除任务线程后，日程还会保留吗？", answer: "Google 说明，删除任务线程也会删除关联日程。" },
        { question: "Gemini Tasks 日程和 Auto Browse 或聊天计划操作一样吗？", answer: "不一样。Gemini Apps 任务日程、Chrome Auto Browse 和普通聊天的计划操作是不同功能，控制方式也不同。" }
      ]
    }
  }
};

export const aiCycleTranslations26: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides26: EditorialGuide[] = Object.keys(copies).map((slug) => ({
  ...copies[slug]["zh-cn"], slug, date: "2026-11-26", sourcePath: `src/data/ai-cycle-2026-11-26.ts#${slug}`,
  availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
