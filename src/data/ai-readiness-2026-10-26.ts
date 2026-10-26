import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sourcesBySlug: Record<string, { title: string; url: string }[]> = {
  "browser-agent-wait-for-page-ready": [
    { title: "Playwright: Page API", url: "https://playwright.dev/docs/api/class-page" },
    { title: "Playwright: Auto-waiting", url: "https://playwright.dev/docs/actionability" },
    { title: "Playwright: Assertions", url: "https://playwright.dev/docs/test-assertions" },
    { title: "Stack Overflow: Angular lazy-loaded chunks and readiness waits", url: "https://stackoverflow.com/questions/79714284/how-to-wait-for-angular-lazy-loaded-chunks-before-interacting-with-elements-in-p" },
    { title: "Stack Overflow: waiting for a spinner or loaded content", url: "https://stackoverflow.com/questions/76756959/check-for-loading-spinner-or-content-in-python-playwright" },
    { title: "Stack Overflow: increasing the network-idle wait", url: "https://stackoverflow.com/questions/74903580/how-to-increase-the-waiting-time-on-networkidle-in-playwright" },
    { title: "Playwright issue: network idle and a WebSocket page", url: "https://github.com/microsoft/playwright/issues/37226" }
  ],
  "browser-agent-accessibility-snapshot-vs-screenshot": [
    { title: "Playwright MCP: Snapshots", url: "https://playwright.dev/mcp/snapshots" },
    { title: "Playwright: Locator API and ariaSnapshot", url: "https://playwright.dev/docs/api/class-locator" },
    { title: "Playwright: Page screenshot API", url: "https://playwright.dev/docs/api/class-page#page-screenshot" },
    { title: "Playwright issue: accessibility snapshot includes offscreen elements", url: "https://github.com/microsoft/playwright/issues/39955" },
    { title: "Playwright MCP issue: prompt-injection risk report", url: "https://github.com/microsoft/playwright-mcp/issues/1479" },
    { title: "Playwright MCP screenshot implementation", url: "https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/tools/backend/screenshot.ts" }
  ]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "browser-agent-wait-for-page-ready": {
    en: {
      title: "How Browser Agents Should Wait for a Page to Be Ready",
      description: "Replace fixed sleeps and generic network-idle waits with bounded conditions tied to the next browser action and the page state it needs.",
      category: "AI browser guides",
      content: "A page can finish navigation before the control you need is usable. It can also keep network requests open after the target is ready. In Playwright, navigation events and actionability waits answer different questions: the first describes document lifecycle; the second checks whether a specific action can run. Choose a visible, enabled, stable, or changed-state condition that matches the next task. This guide uses Playwright APIs and a small local fixture; it does not claim to measure an AI agent. For later investigation of a failed run, see [browser agent debugging traces](/en/guides/browser-agent-debugging-traces/).",
      sections: [
        { heading: "Define ready in terms of the next action", body: "Before adding a wait, write down what the agent will do next. Clicking a button may require it to be visible, enabled, unique and unobstructed. Reading a result may require a non-empty status region or a known row count. Waiting for a dialog requires the dialog to appear, not every network request to finish.\n\n| Next task | Observable readiness condition | What it establishes |\n| --- | --- | --- |\n| Click a control | Locator actionability and a unique matching locator | Playwright can perform that action now |\n| Read a result | Expected text or non-empty result container | That particular content is present |\n| Submit and inspect a state change | Expected status, URL or confirmation | The observed transition occurred |\n| Start a new navigation | A known URL or document event | The selected navigation milestone occurred |\n\nA wait condition proves only the condition it observes. A visible button can still be the wrong button; a success label can be stale unless the action or page transition ties it to the current task." },
        { heading: "Use lifecycle events only for lifecycle questions", body: "Playwright’s Page API supports navigation milestones such as commit, domcontentloaded and load. They describe document progress, not whether a client-rendered page has finished hydrating or populated the next result. Use a relevant locator or web-first assertion after navigation when the next operation depends on application content.\n\nThe same API marks networkidle as discouraged for testing and discourages page.waitForTimeout in production. A quiet network can occur before app state is ready, while analytics scripts or polling can keep activity going after the control is usable. A fixed delay can be a short diagnostic aid while investigating; it should not become the success condition." },
        { heading: "Wait for a state change after an action", body: "For an interaction that updates the same document, capture the old state, perform one action, then wait for the intended new state. For example: read the status text, click one button, and wait for the status to become the expected value. If the action navigates, register the URL or response wait before clicking, then confirm the destination after the action.\n\nThis prevents a pre-existing spinner disappearance or an old success message from being mistaken for progress. If the expected condition times out, inspect the current state once: did the action happen, did an error appear, or is the selector wrong? Don’t blindly repeat a submission or purchase click. Use a timeout that caps the observation period and report “expected state not observed,” not “the page is broken,” unless other evidence supports that conclusion." },
        { heading: "Runnable example on a local fixture", body: "The downloadable example contains its synthetic HTML fixture and writes it into a temporary folder it creates. It waits for a status message to change from “Loading report” to “Ready: report is available,” then checks the button is enabled. It captures a screenshot in a temporary folder, reads the accessible snapshot, then removes the temporary output during cleanup. No account, real website or user browser is opened.\n\nDownload [the self-contained readiness example](/templates/agent-readiness-fixture.mjs) into a Node.js project. Install Playwright and its Chromium browser in that project, then run node agent-readiness-fixture.mjs from the project root. Expected output includes result synthetic_fixture_passed, the initial and ready text, actionEnabled true, and accessibilitySnapshotContainsReadyStatus true. The base locator.ariaSnapshot method is available from Playwright v1.49. This example does not use the AI mode added in v1.59 or the boxes option added in v1.60. Run the downloaded script in your own project to observe the fixture’s status change, enabled button, accessible snapshot and screenshot. A local fixture does not evaluate an AI model or predict behavior on other pages. The script uses a fresh isolated browser context, finite 3-second timeouts, mock-keychain flags, and removes only the temporary output folder it created. The screenshot is evidence from the synthetic page, not a visual quality or AI benchmark." },
        { heading: "Diagnose timeouts without stretching them indefinitely", body: "When the wait expires, record the intended condition and the last observed value. Check that the locator identifies one element, that the action is enabled, and that the application’s documented loading or error state changed. A Playwright locator’s own actionability timeout often gives a more useful failure than adding a generic page-wide delay.\n\nIf the site has an explicit loading flag or status region, wait for that state to settle and then assert the actual result. If it exposes a matching response, set the response wait before the triggering action and verify its URL or status. If there is no observable completion signal, ask the application owner for one or define a bounded timeout and mark the result unknown. Do not call networkidle a page-wide “fully loaded” guarantee." }
      ],
      faq: [
        { question: "Is networkidle always wrong?", answer: "No. It is a documented lifecycle state, but Playwright discourages using it as a general test readiness condition. Use it only when that network milestone is specifically relevant; then still check the application state needed by the next action." },
        { question: "How long should an agent sleep after a click?", answer: "Prefer a condition tied to the expected result, with a finite timeout. A fixed sleep can help diagnose timing but does not prove that the page reached the needed state." },
        { question: "Does a locator click mean the application finished processing?", answer: "No. Playwright’s actionability checks show that the click can be performed. Afterward, assert the page state or response that confirms the intended effect." }
      ]
    },
    "zh-cn": {
      title: "浏览器智能体怎样等待页面就绪",
      description: "用与下一步动作和页面状态相关的有界条件，替代固定睡眠和泛化的 network-idle 等待。",
      category: "AI 浏览器指南",
      content: "导航完成时，你要操作的控件可能还不能用；反过来，目标控件已准备好时，网络请求也可能仍未结束。在 Playwright 中，导航事件和动作可执行性等待回答的是不同问题：前者描述文档生命周期，后者检查特定操作能否执行。应根据下一项任务，选择可见、启用、稳定或状态已变化等条件。本文使用 Playwright API 和一个本地小型页面，不宣称评测 AI 智能体。若后续需要定位失败原因，请看[浏览器智能体调试追踪](/zh-cn/guides/browser-agent-debugging-traces/)。",
      sections: [
        { heading: "按下一步动作定义就绪状态", body: "添加等待前，先写清楚智能体接下来要做什么。点击按钮可能要求按钮可见、启用、定位唯一且没有遮挡。读取结果时，可能需要非空状态区域或预期行数。等待对话框时，只需对话框出现，不必等所有网络请求结束。\n\n| 下一步任务 | 可观察的就绪条件 | 能说明什么 |\n| --- | --- | --- |\n| 点击控件 | 定位唯一匹配元素，并满足动作可执行性检查 | Playwright 此刻可以执行该操作 |\n| 读取结果 | 出现预期文本或非空结果容器 | 指定内容已经出现 |\n| 提交后核对状态 | 预期状态文字、URL 或确认提示 | 观察到相应状态变化 |\n| 开始新导航 | 已知 URL 或文档事件 | 达到了选定的导航里程碑 |\n\n等待条件只能证明它实际观察到的情况。按钮可见不代表它就是正确按钮；若成功提示是旧的，也不能说明当前动作已完成。" },
        { heading: "只有生命周期问题才使用生命周期事件", body: "Playwright Page API 支持 commit、domcontentloaded 和 load 等导航里程碑。它们说明文档加载进展，不能说明客户端渲染已经完成水合或填好了下一项结果。若后续操作依赖应用内容，应在导航后检查对应定位器或使用网页优先断言。\n\n同一 API 将 networkidle 标记为不建议用于测试，也不建议在生产代码中用 page.waitForTimeout。网络安静时，应用状态可能还没准备好；反过来，分析脚本或轮询可能在控件可操作后继续活动。排查时可以短暂等待以观察时间问题，但不能把固定延时当成成功条件。" },
        { heading: "动作之后等待状态变化", body: "同一文档里的交互更新页面时，先记录旧状态，执行一次动作，然后等待预期的新状态。例如，读取旧状态文字，点击一个按钮，再等待状态变成指定值。如果动作会导航，则在点击前注册 URL 或响应等待，点击后再核实目标页面。\n\n这样可以避免把点击前已有的旋转图标消失或旧成功提示误判成进度。如果条件超时，只检查一次当前状态：动作有没有执行、是否出现错误、选择器是否正确？不要盲目重做表单提交或付款点击。为观察过程设置上限，并报告“没有观察到预期状态”；除非有其他证据，不要直接断言页面坏了。" },
        { heading: "在本地页面运行示例", body: "下载的单文件示例内含合成 HTML 夹具，会将页面写入自己创建的临时目录。脚本等待状态文字从“Loading report”变成“Ready: report is available”，再确认按钮已启用，同时保存截图并读取可访问性快照。它不会打开账号、真实网站或用户浏览器。\n\n下载[自包含的页面就绪示例](/templates/agent-readiness-fixture.mjs)到你管理的 Node.js 项目，在项目中安装 Playwright 及其 Chromium 浏览器，然后从项目根目录运行 node agent-readiness-fixture.mjs。locator.ariaSnapshot 基础方法从 Playwright v1.49 起提供。本示例不依赖 v1.59 加入的 AI 模式，也不依赖 v1.60 加入的 boxes 边界框参数。在你自己的项目运行脚本，可以观察状态变化、按钮启用、可访问性快照和截图。这个本地夹具不会评估 AI 模型，也不能预测其他网页的表现。脚本使用隔离浏览器上下文、3 秒超时和 mock-keychain 参数；清理范围仅限它创建的临时输出目录。截图只记录合成页面，不是视觉质量基准。" },
        { heading: "超时后诊断，不要无限拉长等待", body: "等待超时后，记录预期条件和最后观察到的值。确认定位器只匹配一个元素、动作处于启用状态，并检查应用文档所述的加载或错误状态有没有变化。Playwright 定位器自己的动作可执行性超时，往往比增加整页固定延时更容易定位问题。\n\n如果网站提供明确的加载标志或状态区域，等待该状态结束后再断言实际结果。若能匹配目标响应，则应在触发动作前设置响应等待，随后核对 URL 或状态码。没有可观察的完成信号时，向应用维护方确认是否能提供信号，或者设置有界等待并把结果标记为未知。不要把 networkidle 当作页面“完全加载”的保证。" }
      ],
      faq: [
        { question: "networkidle 一定不能用吗？", answer: "并非如此。它是有文档定义的生命周期状态，但 Playwright 不建议把它作为通用测试就绪条件。只有当这个网络里程碑本身与任务相关时才使用；之后仍要检查下一步操作所需的应用状态。" },
        { question: "点击后要让智能体睡多久？", answer: "优先等待与预期结果相关的状态，并设置有限超时。固定睡眠可用于排查时序问题，但不能证明页面已达到操作所需状态。" },
        { question: "定位器点击成功代表应用处理完成了吗？", answer: "不代表。Playwright 的动作可执行性检查说明此时可以点击。点击后还要断言页面状态或响应，确认预期效果。" }
      ]
    }
  },
  "browser-agent-accessibility-snapshot-vs-screenshot": {
    en: {
      title: "Accessibility Snapshot or Screenshot? Choose the Right Browser Input",
      description: "Use a semantic snapshot to locate named controls and read structure; add a screenshot when visual layout, canvas content, or spatial relationships matter.",
      category: "AI browser guides",
      content: "A structured accessibility snapshot and a screenshot expose different evidence. A snapshot gives roles, names, text and some state; a screenshot shows pixels, spatial arrangement and visual content that may not have useful labels. Use the snapshot first for ordinary controls, and capture a screenshot when layout or image-heavy context changes the decision. Neither proves that an agent understood the page. For tool-specific MCP setup, see [Playwright MCP vs Chrome DevTools MCP](/en/guides/playwright-mcp-vs-chrome-devtools-mcp/).",
      sections: [
        { heading: "Choose based on the question you need to answer", body: "If the question is “Which button is named Save?” a semantic snapshot can expose a button role and accessible name. If the question is “Does the chart line cross the shaded threshold?” a screenshot may show the relation that the accessibility tree does not describe. For mixed pages, use both as complementary inputs and connect them by checking the same page region or element.\n\n| Need | Start with | Add the other representation when |\n| --- | --- | --- |\n| Find a named button, link, heading or text field | Accessibility snapshot | The control’s position or visual grouping is ambiguous |\n| Read a meaningful state such as checked or disabled | Accessibility snapshot | The UI communicates state only through color or shape |\n| Interpret a chart, canvas, image, map or visual editor | Screenshot | The graphic has a useful accessible description or text alternative |\n| Understand spacing, overlap, clipping or visual hierarchy | Screenshot | A semantic tree is needed to identify the exact control |\n\nThe accessibility tree is not a perfect inventory of every visible pixel, and a screenshot is not a reliable source of control names or hidden state." },
        { heading: "What a snapshot includes and what it leaves out", body: "Playwright’s ariaSnapshot API serializes an element’s accessible structure. Playwright added locator.ariaSnapshot in v1.49. AI mode and depth arrived in v1.59; the boxes option arrived in v1.60. AI mode can include interaction references, and depth or boxes can be set where supported. Those references are tied to the snapshot; after page changes, take a new snapshot rather than assuming old references remain valid.\n\nA snapshot reflects what the accessibility model exposes, not every node in the visual page. Poor or missing accessible names can make controls hard to distinguish. Dynamic content may change between capture and action. A GitHub issue reports off-screen elements in a Playwright MCP snapshot; it is a project issue report, not a universal guarantee about all versions. Verify the current page and target before acting." },
        { heading: "When a screenshot adds necessary context", body: "Take a screenshot when a task depends on coordinates, relative placement, cropped content, color-only cues, a chart, canvas or an image. Playwright supports full-page and element screenshots; choose the smallest region that contains the evidence you need. Pairing a screenshot with a snapshot can let the agent locate a named element and judge whether it appears in the expected place.\n\nScreenshots do not establish hidden DOM state, whether a control is enabled, or whether text outside the captured frame exists. They can expose private information, so crop or mask sensitive regions before sharing. The screenshot tool documentation for an agent should define whether the image is only for visual grounding or also supports coordinate actions." },
        { heading: "Refresh evidence after every meaningful page change", body: "After navigation, a dialog, scrolling, resizing or a state-changing action, determine whether the earlier evidence is stale. Refresh the snapshot for current names and states; recapture the screenshot if positions or visual content changed. A stale snapshot reference can point nowhere or to a different target, and an old screenshot can describe an earlier layout.\n\nWhen the semantic and visual inputs disagree, pause and inspect the live page state. Do not let a model choose based only on a screenshot if the action could affect a real account. Confirm the target label, account and consequences, and require approval for consequential actions under the caller’s policy." },
        { heading: "Treat page content as untrusted in either format", body: "Text in a snapshot and text visible in an image both come from page content. Neither format makes instructions on a website trustworthy. A page can contain misleading directions, and an image can show fake status labels. Keep the task instruction separate from observed page content, verify important claims against the intended source, and ask before actions outside the user’s authorization.\n\nUse the semantic-versus-visual choice to improve evidence, not to bypass access controls or infer that every element has been inspected. A short record can state which input was used, what it showed and what remains unverified." }
      ],
      faq: [
        { question: "Is an accessibility snapshot always more accurate than a screenshot?", answer: "No. It provides semantic roles and names when the page exposes them, but may omit or misrepresent important visual layout. A screenshot adds pixels and spatial cues but cannot establish hidden or enabled state." },
        { question: "Should I use both inputs?", answer: "Use both when the task needs semantics and visual placement, such as matching a named control to its location or interpreting a chart with a labeled legend." },
        { question: "Can snapshot references be reused after clicking or navigating?", answer: "Treat them as short-lived. Page changes can invalidate references; capture a fresh snapshot and verify the target before continuing." }
      ]
    },
    "zh-cn": {
      title: "可访问性快照还是截图？怎样选网页输入",
      description: "查找有名称的控件和阅读结构时先用语义快照；遇到视觉布局、画布或空间关系时再补截图。",
      category: "AI 浏览器指南",
      content: "可访问性快照和截图提供的证据不同。快照呈现角色、名称、文字和部分状态；截图展示像素、空间布局，以及可能没有可读标签的视觉内容。普通控件先看快照；如果布局或图像内容会影响判断，再截取画面。两者都不能证明智能体理解了页面。要了解 MCP 工具的具体选择，请看[Playwright MCP 与 Chrome DevTools MCP 对比](/zh-cn/guides/playwright-mcp-vs-chrome-devtools-mcp/)。",
      sections: [
        { heading: "先看你要回答哪类问题", body: "如果问题是“哪个按钮叫保存”，语义快照可能提供按钮角色和可访问名称；如果问题是“图表线有没有越过阴影阈值”，截图可能显示可访问性树没有描述的关系。混合页面可以同时用两种输入，并核对它们指向同一页面区域或元素。\n\n| 需求 | 优先查看 | 何时补充另一种输入 |\n| --- | --- | --- |\n| 查找有名称的按钮、链接、标题或文本框 | 可访问性快照 | 控件位置或视觉分组不清楚时 |\n| 读取已选中或禁用等状态 | 可访问性快照 | 状态只用颜色或形状表达时 |\n| 理解图表、画布、图片、地图或视觉编辑器 | 截图 | 图形有可用的无障碍描述或文本替代时 |\n| 判断间距、遮挡、裁切或视觉层级 | 截图 | 需要语义树确认具体控件时 |\n\n可访问性树不是所有可见像素的完整目录，截图也不能可靠提供控件名称或隐藏状态。" },
        { heading: "快照会包含什么，缺少什么", body: "Playwright 在 v1.49 加入 locator.ariaSnapshot。AI 模式和深度选项于 v1.59 加入，boxes 边界框选项于 v1.60 加入。AI 模式可以附带交互引用；支持时可设置深度或加入边界框。这些引用对应当前快照，页面变化后应重新获取快照，不能假定旧引用仍然有效。\n\n快照反映可访问性模型提供的信息，不是页面所有视觉节点。可访问名称缺失或不准确时，控件可能难以区分；动态页面也可能在快照与动作之间发生变化。一个 GitHub issue 报告 Playwright MCP 快照会列出视口外元素；这是项目问题报告，不能视为所有版本都必然如此的结论。操作前应核实当前页面和目标。" },
        { heading: "什么时候截图能补上必要信息", body: "任务依赖坐标、相对位置、裁切区域、仅颜色提示、图表、画布或图片时，截图更有用。Playwright 支持全页和元素截图；只截取包含所需证据的最小区域。把截图与快照配合起来，可以先定位有名称的控件，再判断它是否出现在预期位置。\n\n截图不能证明隐藏 DOM 状态、控件是否启用，也不能证明画面之外没有文字。截图还可能暴露私人信息，分享前应裁掉或遮住敏感区域。智能体所用的截图工具文档应明确图片只用于视觉定位，还是也支持按坐标操作。" },
        { heading: "每次页面实质变化后更新证据", body: "导航、弹窗、滚动、缩放或状态变更操作之后，应判断先前证据是否失效。更新快照以获取当前名称和状态；布局或视觉内容变化时重新截图。旧快照引用可能已经不存在或指向其他目标；旧截图也可能记录的是过去的布局。\n\n如果语义输入和视觉输入互相矛盾，应暂停并检查实时页面。操作真实账号时，不能只凭截图让模型决定。核对目标标签、账号和操作后果，并按调用方策略对重大动作取得批准。" },
        { heading: "两种格式里的网页内容都要视为不可信", body: "快照中的文字和图片里的文字都来自网页内容。换一种格式不会让网页指令自动可信。页面可能包含误导性步骤，图片里也可能出现伪造的状态标志。应把任务指令与页面观察分开，对重要结论回到预期来源核对；超出用户授权的操作要先询问。\n\n语义与视觉输入的选择能改善证据质量，但不能绕过访问控制，也不能证明每个页面元素都已检查。简短记录可注明使用了哪类输入、观察到什么，以及哪些事项还没核验。" }
      ],
      faq: [
        { question: "可访问性快照一定比截图准确吗？", answer: "不一定。网页提供相应信息时，快照能显示语义角色和名称，但可能缺少重要的视觉布局；截图可以补充像素和空间信息，却不能证明隐藏状态或控件是否启用。" },
        { question: "什么时候两种输入都要用？", answer: "任务同时依赖语义和位置时可同时使用，例如把一个有名称的控件对应到画面位置，或结合图例解释图表。" },
        { question: "点击或导航后还能复用快照引用吗？", answer: "应把引用视为短期有效。页面变化可能使引用失效；继续操作前应重新生成快照并核实目标。" }
      ]
    }
  }
};

const slugs = ["browser-agent-wait-for-page-ready", "browser-agent-accessibility-snapshot-vs-screenshot"];
export const aiReadinessGuides26: EditorialGuide[] = slugs.map((slug) => ({
  ...copies[slug]["zh-cn"], slug, date: "2026-10-26", sourcePath: `src/data/ai-readiness-2026-10-26.ts#${slug}`,
  availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sourcesBySlug[slug],
  relatedGuides: slug === "browser-agent-wait-for-page-ready" ? ["browser-agent-debugging-traces", "browser-agent-scroll-pagination"] : ["playwright-mcp-vs-chrome-devtools-mcp", "browser-agent-prompt-injection"]
}));

export const aiReadinessTranslations26: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
