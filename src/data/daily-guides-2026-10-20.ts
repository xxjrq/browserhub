import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const slug = "browser-fingerprint-changes-after-update";

const sources = [
	{ title: "MDN: Fingerprinting", url: "https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting" },
	{ title: "MDN: HTMLCanvasElement.toDataURL()", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL" },
	{ title: "MDN: WebGLRenderingContext.getParameter()", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter" },
	{ title: "MDN: NavigatorUAData.getHighEntropyValues()", url: "https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues" },
	{ title: "Chromium: User-Agent Reduction", url: "https://www.chromium.org/updates/ua-reduction/" },
	{ title: "Chrome for Developers: Chrome 152 release notes", url: "https://developer.chrome.com/release-notes/152" },
	{ title: "W3C: Mitigating Browser Fingerprinting in Web Specifications", url: "https://www.w3.org/TR/fingerprinting-guidance/" },
];

const copy: Record<"en" | "zh-cn", EditorialGuideCopy> = {
	en: {
		title: "Browser Fingerprint Changes After an Update: A Regression Checklist",
		description: "Diagnose fingerprint changes after browser, operating-system, font, GPU-driver or privacy updates. Build a comparable baseline and decide what needs investigation.",
		category: "Environment diagnostics",
		content: "A browser or operating-system update can change what a site observes, but a changed fingerprint does not by itself prove a broken profile or an identity problem. Build a dated before-and-after record, keep the test page and conditions constant, then connect each changed signal to a plausible release, system or policy change. This guide explains a repeatable regression check across several signal families; it is based on public documentation, not a BrowserHub device test.",
		sections: [
			{ heading: "1. Decide what changed and preserve the old baseline", body: "Start with the event: browser or OS update, font installation/removal, GPU driver, privacy setting, extension, or test-site change. Record the last known-good date and first date the difference appeared. A fingerprint combines browser and OS characteristics such as version, fonts, settings, display and language. [MDN's overview](https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting) describes these combined signals.\n\nUse the same authorized, non-sensitive page and profile. Record browser and OS builds, device, profile label, privacy settings, extensions, display scale, network route, URL and timestamp. Save raw values where practical, not just a checker label. Never include credentials, cookies or exported sessions. If no old values exist, call the first run a new baseline rather than reconstructing the past from memory." },
			{ heading: "2. Make the comparison reproducible", body: "Capture once, reload the page, close and reopen the browser, then repeat under unchanged conditions. If identical runs differ, investigate timing, blocked APIs, test-page changes or extensions first. A stable difference after an update suggests the environment changed, but does not identify the cause.\n\nKeep the same origin for site behavior and network path for IP or DNS observations. A checker that changed its script or collection policy cannot provide a controlled comparison; record its name, URL and date. The [fingerprint testing checklist](/en/guides/browser-fingerprint-testing-checklist/) covers broad collection; this page interprets update regressions." },
			{ heading: "3. Classify the change before trying to fix it", body: "Separate version or policy changes from rendering, system and measurement changes. Chromium documents User-Agent reduction, while high-entropy Client Hints use a separate API with browser and policy conditions. A shorter or gated UA result may reflect the browser's exposure model, not a damaged profile. See [Chromium's UA reduction history](https://www.chromium.org/updates/ua-reduction/) and [MDN's high-entropy reference](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues).\n\n| Changed observation | Plausible area | Evidence to record |\n| --- | --- | --- |\n| UA or Client Hints | Version, request context, policy | Build; headers; API result/error |\n| Canvas pixels or text | Rendering, fonts, OS text, GPU | Same drawing; output; font/acceleration state |\n| WebGL renderer/capabilities | Backend, driver, GPU selection | Parameters; GPU diagnostics; driver |\n| Fonts or text metrics | Install/removal, fallback, OS | Font availability; fixed text measurement |\n| Timezone/language/headers | OS preference, browser, request | Intl; locale list; actual headers |\n\nTreat these as hypotheses, not fixed mappings. A release can affect several rows, and the checker itself may have changed." },
			{ heading: "4. Check browser-version and privacy-policy changes", body: "Read release notes for the exact browser milestone and platform. Features roll out in stages and settings or enterprise policies can affect availability. Chrome 152's notes cover multiple platforms; use them as a change log, not proof that a device's fingerprint changed. See [Chrome's release notes](https://developer.chrome.com/release-notes/152).\n\nCompare the legacy User-Agent, low-entropy hints and requested high-entropy values separately. Record request context, policy or permission, privacy settings and extensions. Do not force a guessed value or disable privacy protection without a compatibility reason; reduced exposure can be intentional. [W3C guidance](https://www.w3.org/TR/fingerprinting-guidance/) explains why specifications may limit identifying information." },
			{ heading: "5. Trace rendering and system changes", body: "Canvas `toDataURL()` returns image data for the canvas. Different drawing inputs, fonts, color settings or rendering paths can change the bytes. Repeat the same page and drawing case, confirm dimensions and text, and compare bytes or image when available. See [MDN's Canvas reference](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL).\n\nFor WebGL, record the context and queried parameters, then check browser GPU diagnostics and driver version. [MDN's `getParameter()` reference](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter) documents parameter queries; it does not promise the same vendor string in every context. OS or driver updates may affect fonts, GPU selection, backend or capabilities. These are hypotheses. If Canvas and WebGL both change, restart and repeat with the same display and profile before assigning a cause." },
			{ heading: "6. Use a regression record to decide whether to act", body: "Keep one row per run and one column per signal. The [browser environment checklist CSV](/templates/browser-environment-checklist.csv) includes versions, Canvas, WebGL, UA/Client Hints, timezone, language, network and storage. Add the update event, driver/font change, test-page version and interpretation. Mark unavailable fields as unavailable, not guessed.\n\nUse three outcomes: expected change (documentation or a deliberate setting explains it and the application works); investigate (identical runs differ or no cause is known); compatibility regression (a required, authorized workflow now fails reproducibly). A uniqueness score alone is not a regression. Reduce application failures to one changed layer, save a sanitized report and retest after an approved fix." },
			{ heading: "7. Set a new baseline only after the workflow passes", body: "Set a new baseline when the approved application flow works, repeat runs are sufficiently stable, and material differences have an explanation or owner. Keep the old versioned record: a baseline is a dated reference, not a promise that values never change. Teams should record who approved the transition and which cases they reran.\n\nFor single-signal details, see the [Canvas fingerprint test](/en/guides/canvas-fingerprint-test/) or [WebGL fingerprint test](/en/guides/webgl-fingerprint-test/); definitions are in [browser fingerprint signals](/en/guides/browser-fingerprint-signals/). BrowserHub has not run a device-wide update experiment or established universal hashes. This method cannot establish anonymity, reveal every server-side rule or guarantee an account outcome." }
		],
		faq: [
			{ question: "Does a changed fingerprint after an update mean my profile is broken?", answer: "No. A browser, OS, font, graphics or privacy change can alter observed fields. First compare repeat runs and inspect the changed layer; a changed hash alone is not a diagnosis." },
			{ question: "Should I restore the old fingerprint values?", answer: "Only change a setting when a documented compatibility requirement or authorized workflow calls for it. Guessing values or changing several settings together can introduce new inconsistencies and obscure the cause." },
			{ question: "Why did User-Agent data change while the browser still works?", answer: "Browsers can reduce or gate exposed UA information for privacy, and Client Hints have separate request and policy conditions. Compare the browser build, request context and returned fields against current documentation." },
			{ question: "Is this guide based on hands-on testing?", answer: "No. It synthesizes public MDN, Chromium, Chrome and W3C documentation checked on October 20, 2026. The checklist describes a reproducible method for readers; BrowserHub did not run the device update tests described here." }
		]
	},
	"zh-cn": {
		title: "浏览器升级后指纹变了：如何建立基线并排查回归",
		description: "浏览器、操作系统、字体、显卡驱动或隐私设置更新后，按可复现基线区分预期变化与兼容性回归。",
		category: "环境检测",
		content: "浏览器或操作系统升级后，网站观察到的指纹可能变化；这本身不能证明配置损坏或身份出现问题。应保存有日期的升级前后记录，在相同页面和条件下复测，再把变化逐项对应到浏览器版本、系统、字体、图形驱动或隐私策略。本指南提供跨信号的回归检查方法，依据公开文档整理，BrowserHub 没有在设备上执行本文所述的升级实验。",
		sections: [
			{ heading: "1. 先定义变化事件，保留旧基线", body: "先写清楚发生了什么：浏览器升级、操作系统升级、安装或移除字体、显卡驱动变化、隐私设置变化、扩展更新，还是检测网页自身改版。记录最后一次已知正常的日期，以及首次发现差异的日期。指纹可能组合浏览器与操作系统版本、字体、设置、显示和语言等特征；一个总分会掩盖具体是哪项输入变化。[MDN 指纹说明](https://developer.mozilla.org/en-US/docs/Glossary/Fingerprinting)列举了这些可用于组合识别的信号。\n\n使用同一个获授权、无敏感信息的测试页面与浏览器环境。记录准确浏览器构建号、系统版本、设备、配置标签、隐私设置、扩展、屏幕缩放、网络路径、测试网址和时间。能保存原始观察值时，不要只抄检测器红绿标签。不要把账号凭据、Cookie 或登录环境导出包放进记录。如果升级前没有数据，应把本次第一次运行标成新基线；不要凭记忆补造旧值。" },
			{ heading: "2. 固定条件，让前后比较可复现", body: "做一组小型复测：先采集一次，在同一页面刷新，再关闭并重新打开浏览器，然后在条件不变时再次采集。如果相同会话里连续运行就变化，先检查异步时机、随机行为、接口受限、检测页变化或扩展干扰。若差异稳定且出现在升级之后，说明环境可能改变，但仍不能仅凭时间顺序锁定原因。\n\n比较存储或站点行为时保持同源页面；记录 IP、DNS 时固定网络路径。如果检测器更新了脚本、结果格式或采集政策，它就不再是受控的升级前后比较。记录工具名称、网址和日期，并只比较工具确实公开的字段。已有[浏览器指纹检测清单](/zh-cn/guides/browser-fingerprint-testing-checklist/)负责首次全面采集；本篇聚焦升级后如何解释回归。" },
			{ heading: "3. 先给变化分类，再决定是否修复", body: "把版本或隐私策略引起的预期变化，与渲染、操作系统和测量变化区分开。Chromium 已记录 User-Agent 缩减这一隐私措施；高熵 User-Agent Client Hints 则通过独立 API 获取，并受浏览器和策略条件影响。因此 UA 信息变短、缺失或需要额外请求，可能是浏览器当前的暴露策略，不一定是配置损坏。可查阅 [Chromium UA 缩减记录](https://www.chromium.org/updates/ua-reduction/)和 [MDN 高熵值接口说明](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues)。\n\n| 变化的观察项 | 优先检查的范围 | 有用的回归证据 |\n| --- | --- | --- |\n| UA 或 Client Hints | 浏览器版本、请求上下文、权限策略 | 浏览器构建号、请求头、API 结果及错误/缺失状态 |\n| Canvas 像素或文字 | 浏览器渲染、字体、系统文字栅格、GPU 路径 | 相同绘制输入、输出字节/哈希、字体及加速状态 |\n| WebGL 厂商、渲染器或能力 | 浏览器图形后端、驱动、GPU 选择或屏蔽列表 | WebGL 参数、浏览器 GPU 诊断、驱动版本 |\n| 字体检测或文字度量 | 字体安装/移除、回退字体、系统升级 | 字体可用性和固定文字测量 |\n| 时区、语言或请求头 | 系统偏好、浏览器设置、请求策略 | Intl 结果、语言列表与实际请求头 |\n\n这些关联是调查方向，不是确定性因果。一个版本可能影响多项信号；也可能只是检测器变了。" },
			{ heading: "4. 核对浏览器版本与隐私策略", body: "根据浏览器的准确大版本和系统平台阅读对应发布说明。只有主版本号还不够：功能可能分阶段开放，也可能受设置、源试验或企业策略影响。例如 Chrome 152 发布说明跨越多个平台和功能领域，应当把它当作变更记录，而不是证明某台设备某个指纹字段已经改变。[Chrome 发布说明](https://developer.chrome.com/release-notes/152)可作为排查起点。\n\nUA 信息应分开比较传统 User-Agent 字符串、低熵提示和主动请求的高熵值，并记录请求是否处于受支持的安全上下文、是否受策略或权限控制。隐私保护也要记下准确的浏览器设置和扩展状态。没有明确兼容性理由，不要通过硬编码猜测值或关闭隐私功能来“修复”缺失信息。减少可识别信息可能正是预期行为。[W3C 指纹缓解指南](https://www.w3.org/TR/fingerprinting-guidance/)说明规范和浏览器设计为何可能限制可识别信息的收集。" },
			{ heading: "5. 追查渲染和系统层变化", body: "Canvas 输出来自绘制与序列化路径。MDN 将 `toDataURL()` 说明为返回 Canvas 图像数据 URL 的方法；输入、字体、色彩设置、渲染路径或浏览器行为不同，都可能让输出字节变化。复测时确认页面、绘制输入与画布尺寸相同；若工具允许，比较图像或字节。哈希只是摘要，应同时保存测试名称和日期。[MDN Canvas 序列化文档](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)介绍该接口。\n\nWebGL 应记录上下文、查询参数和可取得的渲染器信息，然后检查浏览器自身 GPU 诊断及已安装驱动。[MDN getParameter 文档](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter)说明参数查询行为，但不保证所有上下文都会暴露相同厂商字符串。系统升级可能改变字体可用性或图形设备选择；驱动升级也可能改变渲染后端或能力。这些只是合理假设，不是每台机器都适用的规则。如果驱动升级后 WebGL 与 Canvas 同时变化，先在相同显示器和配置下重启复测，再判断原因。" },
			{ heading: "6. 用回归记录决定是否需要处理", body: "每次运行占一行，每种信号单独记录。项目的[浏览器环境清单 CSV](/templates/browser-environment-checklist.csv)已有浏览器和系统版本、Canvas、WebGL、UA/Client Hints、时区、语言、网络和存储等字段。再补充升级事件、驱动或字体变化、检测页版本和解释。把不可用的字段标成“不可用”，不要填猜测值。\n\n可将结论分为三类：预期变化（发布说明或主动设置能解释，应用仍正常）；需要调查（相同条件下结果不稳定，或尚无合理解释）；兼容性回归（获授权的必要流程现在失败，而且能复现）。仅仅唯一性评分变化，不足以认定兼容性回归。应用故障应尽量缩小到单一变化层，保存去敏报告，按批准的修复方案重新测试。不要同时更改多个设置，否则难以找到原因。" },
			{ heading: "7. 工作流通过后再建立新基线", body: "浏览器或系统升级后，只有在获授权的应用流程通过、重复运行对当前用途足够稳定，并且重要差异已有解释或负责人接受后，才建立新基线。保留旧记录及其版本和日期；基线是带日期的参照，不代表数值永远不变。团队配置还应记录谁批准切换，以及重新执行了哪些用例。\n\n单项问题可继续看 [Canvas 指纹测试](/zh-cn/guides/canvas-fingerprint-test/)或 [WebGL 指纹测试](/zh-cn/guides/webgl-fingerprint-test/)；信号定义见[浏览器指纹信号说明](/zh-cn/guides/browser-fingerprint-signals/)。这些页面帮助解释观察结果，但 BrowserHub 没有做设备级升级实验，也没有建立通用的正确哈希。回归记录可以解释受控流程中发生了什么；它不能证明匿名，也不能识别所有服务端规则或保证账号结果。" }
		],
		faq: [
			{ question: "升级后指纹变化，是否说明环境损坏？", answer: "不能仅凭变化下结论。浏览器、系统、字体、图形或隐私设置都可能改变观察值。先比较重复运行并定位变化层；单个哈希变化不是故障诊断。" },
			{ question: "要不要把旧指纹值恢复回来？", answer: "只有在有明确兼容性要求且工作流获授权时才调整设置。猜测数值或同时改多个设置会引入新差异，也会掩盖原因。" },
			{ question: "为什么 User-Agent 变了但浏览器还正常？", answer: "浏览器可能出于隐私减少或限制 UA 信息；Client Hints 也受请求上下文和策略条件影响。应结合构建版本、请求情况和当前文档核对字段。" },
			{ question: "本指南做过真机升级测试吗？", answer: "没有。本指南依据 2026 年 10 月 20 日查阅的 MDN、Chromium、Chrome 与 W3C 公开文档整理，提供的是读者可复现的方法，并非 BrowserHub 已完成的设备测试。" }
		]
	}
};

export const dailyGuides: EditorialGuide[] = [
	{
		...copy["zh-cn"],
		slug,
		date: "2026-10-20",
		sourcePath: "src/data/daily-guides-2026-10-20.ts#browser-fingerprint-changes-after-update",
		availableLocales: ["en", "zh-cn"],
		relatedBrowsers: [],
		relatedTools: ["browserleaks", "creepjs"],
		sources,
		relatedGuides: ["browser-fingerprint-testing-checklist", "browser-fingerprint-signals", "canvas-fingerprint-test", "webgl-fingerprint-test", "user-agent-client-hints-check"]
	}
];

export const dailyGuideTranslations: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	[slug]: copy
};
