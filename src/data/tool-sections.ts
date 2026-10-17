/**
 * Long-form sections for the tool detail pages.
 *
 * Why this module exists: the 35 tool pages were the thinnest page class on the
 * site — a heading, a one-line description, two feature chips and a three-step
 * generic how-to, roughly 200 characters of body text. Guides and comparison
 * pages were already 3,000+ characters, so tools were the remaining bottleneck.
 *
 * Editorial rules for this file:
 * - Every tool already exists in `catalog/tools.json` with a real name, category
 *   and official URL. This module adds *explanatory* copy about what that class
 *   of tool measures and how to read its output. It never invents a feature,
 *   a price, a benchmark or a detection result.
 * - The per-tool `role` line is documentation-based: it describes what the
 *   project's own public page or documentation says the tool is for.
 * - `categoryCopy` explains the measurement category, which is verifiable from
 *   the underlying web platform APIs (MDN, W3C Fingerprinting Guidance, RFCs).
 * - The `verifiedOn` date records when the official pages were last reviewed.
 *
 * Locale policy follows `.agents/product-marketing.md`: English and Simplified
 * Chinese carry complete article copy. The other locales reuse the English body
 * with localised headings, matching the existing fallback behaviour used by
 * `guideCategoryLabel` and `localizedGuideCopy`.
 *
 * This module deliberately does not import resources.ts (which consumes it).
 */

export type ToolCopyLocale = "zh-cn" | "en";

export type ToolSection = { heading: string; body: string };

/** Locale coverage for section bodies. Other locales fall back to English. */
const FULL_COPY_LOCALES: ToolCopyLocale[] = ["zh-cn", "en"];

/** Official tool pages reviewed on this date. Recorded per project convention. */
export const toolSectionsReviewedOn = "2026-10-17";

/**
 * Localised section headings. All seven locales are covered here because the
 * headings are short structural labels, not article prose.
 */
const headings: Record<string, [string, string, string, string]> = {
	"zh-cn": ["这个分类测量什么", "如何解读检测结果", "常见误区", "把结果用于决策前"],
	en: ["What this category measures", "How to read the results", "Common mistakes", "Before you act on a result"],
	ja: ["このカテゴリが計測するもの", "結果の読み方", "よくある誤解", "結果 활용の前に"],
	ko: ["이 카테고리가 측정하는 것", "결과 읽는 방법", "흔한 오해", "결과를 활용하기 전에"],
	es: ["Qué mide esta categoría", "Cómo interpretar los resultados", "Errores frecuentes", "Antes de usar un resultado"],
	pt: ["O que esta categoria mede", "Como interpretar os resultados", "Erros comuns", "Antes de usar um resultado"],
	ru: ["Что измеряет эта категория", "Как читать результаты", "Частые ошибки", "Перед использованием результата"]
};

export function toolSectionHeadings(locale: string): [string, string, string, string] {
	const entry = headings[locale] ?? headings.en;
	return entry;
}

/**
 * What each tool's own project page or documentation says it is for.
 * Used as the opening sentence so that every tool page reads differently
 * instead of repeating one template.
 */
const role: Record<string, Record<ToolCopyLocale, string>> = {
	creepjs: {
		"zh-cn": "CreepJS 是一个公开的浏览器指纹检测页面，除常规信号外还会标注浏览器的「说谎 API」——即读取结果与真实环境不符的接口。",
		en: "CreepJS is a public browser fingerprint page that also flags browser \"lying APIs\", where a read result does not match the real environment."
	},
	browserleaks: {
		"zh-cn": "BrowserLeaks 汇集了多组独立的 Web API 检测页面，按信号类型拆分，便于逐项核对而不是只看一个总分。",
		en: "BrowserLeaks collects separate Web API test pages grouped by signal type, so individual signals can be checked one by one instead of relying on a single score."
	},
	pixelscan: {
		"zh-cn": "Pixelscan 是面向风控场景的浏览器环境检查页面，除指纹外还关注代理与地区等环境一致性。",
		en: "Pixelscan is a browser environment check aimed at risk controls; alongside fingerprint signals it looks at consistency across proxy and location settings."
	},
	"fingerprint-playground": {
		"zh-cn": "Fingerprint Playground 是 Fingerprint.com 提供的公开演示环境，用于观察不同配置下浏览器信号如何变化。",
		en: "Fingerprint Playground is a public demo environment from Fingerprint.com for observing how browser signals change under different configurations."
	},
	amiunique: {
		"zh-cn": "AmIUnique 用公开数据统计浏览器指纹的独特程度，关注的是「有多少人和你相同」而不是某一个哈希值。",
		en: "AmIUnique compares a browser fingerprint against public datasets to show how distinctive it is, rather than reporting a single hash value."
	},
	"cover-your-tracks": {
		"zh-cn": "Cover Your Tracks 由 EFF 维护，测试的是浏览器对追踪器的拦截效果，而不是浏览器指纹本身。",
		en: "Cover Your Tracks is maintained by the EFF and tests how well a browser blocks trackers, rather than measuring the browser fingerprint itself."
	},
	sannysoft: {
		"zh-cn": "Sannysoft 是一组用于自查的检测页面，逐项展示自动化环境常见的不一致之处。",
		en: "Sannysoft is a set of self-check pages that itemise the inconsistencies commonly found in automated browser environments."
	},
	browserscan: {
		"zh-cn": "BrowserScan 用问卷形式收集浏览器与系统信息，并展示这些信息在公开指纹数据库中的出现频率。",
		en: "BrowserScan collects browser and system information through a questionnaire and shows how often those values appear in public fingerprint datasets."
	},
	"rebrowser-detector": {
		"zh-cn": "Rebrowser Bot Detector 在页面加载时检查常见的自动化痕迹，并说明每项痕迹的判定依据。",
		en: "Rebrowser Bot Detector inspects common automation artefacts as the page loads and explains the basis for each check."
	},
	brotector: {
		"zh-cn": "Brotector 是一个开源检测页，用浏览器自身可观测的属性判断运行环境是否被自动化控制。",
		en: "Brotector is an open-source detection page that uses browser-observable properties to judge whether the environment is under automation control."
	},
	"incolumitas-bot": {
		"zh-cn": "Behavioral Bot Classification 结合多项浏览器属性做综合判断，用于研究自动化环境的可识别特征。",
		en: "Behavioral Bot Classification combines several browser properties into an overall judgement, used to study which traits make an automated environment identifiable."
	},
	"tls-peet": {
		"zh-cn": "TLS Peet 展示 TLS 握手与 HTTP/2 层的连接特征，可用于核对网络层指纹是否与目标浏览器一致。",
		en: "TLS Peet exposes connection traits at the TLS handshake and HTTP/2 layers, which can be used to check whether network-layer fingerprints match the intended browser."
	},
	proxydetect: {
		"zh-cn": "ProxyDetect 检查出口 IP 是否被公开数据库标记为代理或 VPN，用于核对网络链路是否符合预期。",
		en: "ProxyDetect checks whether the exit IP is flagged as a proxy or VPN in public databases, which helps verify that the network path matches expectations."
	},
	ipqualityscore: {
		"zh-cn": "IPQualityScore 提供 IP 信誉与代理判定的公开查询入口，评分口径以其自身文档为准。",
		en: "IPQualityScore offers a public lookup for IP reputation and proxy detection; its scoring definitions follow the vendor's own documentation."
	},
	"dnsleaktest": {
		"zh-cn": "DNS Leak Test 用来确认 DNS 查询是否经过了预期的解析路径，常与代理或 VPN 配置一起核对。",
		en: "DNS Leak Test confirms whether DNS queries travel through the expected resolver path, which is commonly checked alongside proxy or VPN configuration."
	},
	fingerbank: {
		"zh-cn": "FingerBank 收集并公开 TLS 客户端指纹（JA3/JA4 等）的样本，用于研究网络层识别。",
		en: "FingerBank collects and publishes samples of TLS client fingerprints such as JA3 and JA4 for network-layer identification research."
	},
	playwright: {
		"zh-cn": "Playwright 是跨浏览器自动化框架，同时提供测试、截图与网络拦截等能力。",
		en: "Playwright is a cross-browser automation framework that also provides testing, screenshot capture and network interception."
	},
	puppeteer: {
		"zh-cn": "Puppeteer 通过 Chrome DevTools Protocol 驱动 Chromium 系浏览器，主要面向 JavaScript 生态。",
		en: "Puppeteer drives Chromium-based browsers through the Chrome DevTools Protocol and is aimed primarily at the JavaScript ecosystem."
	},
	selenium: {
		"zh-cn": "Selenium 是基于 WebDriver 标准的自动化项目，语言覆盖广，并有 Selenium Grid 用于集中调度。",
		en: "Selenium is a WebDriver-standard automation project with broad language coverage, plus Selenium Grid for centralised orchestration."
	},
	webdriverio: {
		"zh-cn": "WebdriverIO 是运行在 Node.js 之上的 WebDriver 客户端，与浏览器自动化测试流程集成较紧。",
		en: "WebdriverIO is a WebDriver client that runs on Node.js and integrates closely with browser automation testing workflows."
	},
	cypress: {
		"zh-cn": "Cypress 是面向前端测试的端到端框架，在真实浏览器中执行并提供时间旅行式调试。",
		en: "Cypress is an end-to-end framework for front-end testing that runs inside a real browser and offers time-travel debugging."
	},
	cdp: {
		"zh-cn": "Chrome DevTools Protocol 是 Chromium 的调试协议文档，自动化与指纹研究都会引用它的字段定义。",
		en: "The Chrome DevTools Protocol is Chromium's debugging protocol documentation; its field definitions are widely cited in automation and fingerprint research."
	},
	nodriver: {
		"zh-cn": "nodriver 是一个用 CDP 直接驱动 Chromium 的无 WebDriver 依赖方案，项目自述为实验性质。",
		en: "nodriver drives Chromium directly over CDP without a WebDriver dependency, and the project describes itself as experimental."
	},
	"selenium-driverless": {
		"zh-cn": "Selenium Driverless 通过远程浏览器服务运行 Selenium，用独立机器承载浏览器会话。",
		en: "Selenium Driverless runs Selenium against remote browser services, hosting the browser session on a separate machine."
	},
	"ghost-cursor": {
		"zh-cn": "Ghost Cursor 为自动化脚本提供更接近真人的指针移动轨迹，关注交互层面的行为特征。",
		en: "Ghost Cursor provides automation scripts with pointer movement closer to human input, focusing on interaction-level behaviour."
	},
	"human-cursor": {
		"zh-cn": "HumanCursor 同样是交互层的自动化辅助项目，通过指针轨迹影响以行为为线索的检测。",
		en: "HumanCursor is a similar interaction-level automation aid that influences behaviour-based detection through pointer trajectories."
	},
	nutjs: {
		"zh-cn": "nut.js 是 Node.js 的桌面自动化库，可控制键盘、鼠标与屏幕，属于系统级而非浏览器内自动化。",
		en: "nut.js is a Node.js desktop automation library for keyboard, mouse and screen control — system-level rather than in-browser automation."
	},
	pyautogui: {
		"zh-cn": "PyAutoGUI 是 Python 的桌面控制库，通过操作系统的输入接口模拟键鼠，与浏览器指纹无直接关系。",
		en: "PyAutoGUI is a Python desktop control library that simulates keyboard and mouse input through OS interfaces and has no direct relation to browser fingerprints."
	},
	"curl-impersonate": {
		"zh-cn": "curl-impersonate 让 curl 复现主流浏览器的 TLS 与 HTTP/2 握手特征，主要面向 HTTP 客户端研究。",
		en: "curl-impersonate makes curl reproduce the TLS and HTTP/2 handshake traits of mainstream browsers, mainly for HTTP client research."
	},
	"curl-cffi": {
		"zh-cn": "curl_cffi 是 Python 库，在绑定层面模拟浏览器指纹，同样属于 HTTP 客户端层的能力。",
		en: "curl_cffi is a Python library that impersonates browser fingerprints at the binding layer, also operating at the HTTP client level."
	},
	cycletls: {
		"zh-cn": "CycleTLS 是用于 Node.js 与 Go 的 TLS 客户端库，可指定 JA3 等握手参数以测试服务端响应。",
		en: "CycleTLS is a TLS client library for Node.js and Go that can specify handshake parameters such as JA3 to test how servers respond."
	},
	"got-scraping": {
		"zh-cn": "Got Scraping 是面向抓取的 HTTP 客户端，目标是让请求头与 Cookie 组合看起来更接近常规浏览器会话。",
		en: "Got Scraping is an HTTP client for scraping that aims to make header and cookie combinations look closer to an ordinary browser session."
	},
	"ublock-origin": {
		"zh-cn": "uBlock Origin 是内容拦截扩展，减少第三方请求本身就是降低可关联信号的一种手段。",
		en: "uBlock Origin is a content-blocking extension; reducing third-party requests is itself a way to lower linkable signals."
	},
	"privacy-badger": {
		"zh-cn": "Privacy Badger 由 EFF 开发，自动学习哪些第三方站点在跨站跟踪并据此拦截。",
		en: "Privacy Badger is developed by the EFF and automatically learns which third-party sites track across sites, then blocks them."
	},
	"tor-browser": {
		"zh-cn": "Tor Browser 基于 Firefox 并做抗指纹化调整，目标是让不同用户的浏览器特征更难被区分。",
		en: "Tor Browser is based on Firefox with anti-fingerprinting adjustments, aiming to make users harder to tell apart from one another."
	}
};

/**
 * Category-level explanation. These describe how the measurement works, which is
 * verifiable from the underlying platform specifications, not vendor claims.
 */
const categoryCopy: Record<string, Record<ToolCopyLocale, ToolSection[]>> = {
	"fingerprint-detection": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "指纹检测页面在你自己的浏览器里运行脚本，读取浏览器暴露给网页的一组属性并展示结果，常见信号包括 Canvas 与 WebGL 的渲染输出、AudioContext 处理结果、可用字体集合、屏幕与硬件参数、时区与语言设置，以及 WebRTC 暴露的网络信息。\n\n这些信号之所以可读，是因为网页在渲染完成后仍能通过标准 API 取得上述信息。W3C 的指纹缓解指南把减少这类跨站可关联信息列为目标，因此主流浏览器普遍对其中一部分做了限制或随机化——检测页面显示的结果，反映的是当前浏览器与当前配置的实际行为。" },
			{ heading: "如何解读检测结果", body: "先确认测试条件：同一个浏览器、同一台机器、同一网络下重复运行，结果应当基本稳定；如果每次都不同，先排查扩展、无痕窗口或字体加载未完成等干扰因素，再看结论。\n\n其次区分「信号值」与「信号数」。哈希值或字符串只是该维度计算出的标识，不同维度之间不可直接相加。判断环境是否一致时，应关注同一维度在不同条件下的差异，例如同一浏览器换网络后 WebRTC 相关项是否变化，而不是追求所有项目同时相同。\n\n最后用第二个独立来源交叉验证。任何单一页面都可能因为自身脚本、浏览器版本或网络状况给出偏差结论。" },
			{ heading: "常见误区", body: "- 把稳定不变的哈希当成唯一身份标识。它只是某一维度计算出的值，通常由大量用户共享。\n- 只在一台机器、一个浏览器上测试，然后推断所有环境的结果。字体、驱动与扩展都会改变结果。\n- 把某一项显示异常直接等同于「已被识别」。不少差异来自浏览器自身的防护策略，而非配置错误。\n- 认为所有项目通过就代表无法被识别。检测页覆盖的维度有限，未覆盖的维度仍可能暴露差异。" },
			{ heading: "把结果用于决策前", body: "检测页面属于第三方服务，会在你访问时读取当前环境信息。请先阅读其说明，确认数据用途，再决定是否在敏感环境中运行。\n\n检测结果反映的是测试当时的环境，无法预测目标网站的判定口径，也不构成任何账号安全保证。涉及具体业务时，请以目标平台的公开条款与官方文档为准；` + toolSectionsReviewedOn + ` 为本站复核官方页面的日期。" }
		],
		en: [
			{ heading: "What this category measures", body: "Fingerprint detection pages run a script inside your own browser, read the set of properties the browser exposes to web pages, and show the outcome. Common signals include Canvas and WebGL rendering output, AudioContext results, the available font set, screen and hardware parameters, timezone and language settings, and network information exposed through WebRTC.\n\nThese signals are readable because a web page can still obtain the above through standard APIs after rendering. The W3C fingerprinting guidance lists reducing this cross-site linkable information as a goal, so mainstream browsers limit or randomise part of it — what a detection page shows reflects the real behaviour of the current browser and configuration." },
			{ heading: "How to read the results", body: "Establish the test conditions first: repeat the run in the same browser, on the same machine and network, and the result should be broadly stable. If it changes every time, rule out interference such as extensions, private windows or fonts that have not finished loading before drawing conclusions.\n\nSecond, separate the signal value from the signal count. A hash or string is only an identifier computed for that dimension, and values from different dimensions cannot simply be added together. To judge whether an environment is consistent, look at how one dimension differs across conditions — for example whether WebRTC-related entries change after switching networks in the same browser — rather than trying to make every entry identical at once.\n\nFinally, cross-check with a second independent source. Any single page can produce a skewed conclusion because of its own script, browser version or network conditions." },
			{ heading: "Common mistakes", body: "- Treating a stable hash as a unique identity. It is a value computed for one dimension and is usually shared by many users.\n- Testing on a single machine and browser, then generalising the result. Fonts, drivers and extensions all change the outcome.\n- Reading one abnormal entry as proof of detection. Many differences come from the browser's own protection strategies rather than misconfiguration.\n- Assuming every entry passing means the environment cannot be identified. A detection page covers only some dimensions; uncovered ones may still expose differences." },
			{ heading: "Before you act on a result", body: "A detection page is a third-party service that reads information about your current environment when you visit it. Read its documentation and confirm how data is handled before running it in a sensitive environment.\n\nResults describe the environment at the moment of testing. They cannot predict a target site's decision logic and are not a guarantee about any account. For specific business decisions, follow the target platform's published terms and official documentation. " + toolSectionsReviewedOn + " is the date BrowserHub last reviewed the official pages." }
		]
	},
	"bot-detection": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "机器人检测面向的是「这个访问是否由自动化程序发起」，而不是设备指纹。它通常综合两类证据：一是浏览器自动化接口留下的痕迹，例如 WebDriver 标志、CDP 运行时特征或通知函数行为异常；二是行为与环境的一致性，例如鼠标轨迹、时区与语言、代理位置之间是否互相矛盾。\n\n与指纹检测一样，这类页面在你的浏览器中现场运行脚本，因此结果只对当次访问有效。" },
			{ heading: "如何解读检测结果", body: "先确认运行环境：如果是在你自己的常规浏览器中打开，自动化痕迹类项目通常应当保持默认状态。出现异常时，先排除浏览器扩展、隐私模式与第三方安全软件的影响，再判断是否与被测环境有关。\n\n其次注意一致性类项目的解释边界。地区、时区与语言不匹配在正常用户中也会大量出现，它反映的是配置组合是否合理，而不是直接等同于自动化。\n\n综合评分只对该页面的判定口径有效，不同服务的权重与阈值并不相同。" },
			{ heading: "常见误区", body: "- 把风控页面的综合评分当作被某个具体平台拦截的预测值。\n- 在装有大量扩展的日常浏览器上测试，扩展注入的脚本会改变结果。\n- 看到语言与地区不一致就断定是自动化，正常的旅行或跨区办公也会这样。\n- 只测一次。风控策略会调整，单次结果无法代表长期表现。" },
			{ heading: "把结果用于决策前", body: "此类页面由第三方运营，结果取决于其当前规则与阈值。请把它当作了解环境现状的参考，而不是通过或未通过的认证。\n\n任何试图规避检测的做法都可能违反目标网站的服务条款，并可能触及当地法律。合规的使用方式是了解自己的环境暴露了什么，再据此调整配置。本站不提供绕过检测的方法。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Bot detection targets whether an access is automated, not device identity. It usually combines two kinds of evidence: traces left by browser automation interfaces, such as the WebDriver flag, CDP runtime characteristics or abnormal notification-function behaviour; and consistency between behaviour and environment, such as whether mouse trajectories, timezone, language and proxy location contradict each other.\n\nAs with fingerprint detection, these pages run a script live in your browser, so results apply only to that visit." },
			{ heading: "How to read the results", body: "Confirm the runtime first: when you open the page in your own ordinary browser, automation-trace entries should normally stay at their defaults. If something looks abnormal, rule out extensions, private mode and third-party security software before attributing it to the environment under test.\n\nSecond, note how far consistency entries can be interpreted. Language and region mismatches are also common among ordinary users; they indicate whether a configuration combination is reasonable, not proof of automation.\n\nAn overall score only reflects that page's own decision logic — weights and thresholds differ between services." },
			{ heading: "Common mistakes", body: "- Treating a risk page's overall score as a prediction of being blocked by a specific platform.\n- Testing in a daily-use browser full of extensions, whose injected scripts change the outcome.\n- Reading a language/region mismatch as proof of automation; travel and cross-region work produce the same pattern.\n- Testing once. Risk rules change, and a single run does not represent long-term behaviour." },
			{ heading: "Before you act on a result", body: "These pages are operated by third parties, and results depend on their current rules and thresholds. Treat them as a way to learn the current state of your environment, not as a pass/fail certification.\n\nAny attempt to evade detection may violate a target site's terms of service and may fall under local law. The compliant approach is to understand what your environment exposes and adjust configuration accordingly. BrowserHub does not provide detection-bypass methods. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"automation-detection": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "自动化检测比一般机器人检测更具体：它检查的是「这个浏览器是否正被程序控制」的证据，例如 WebDriver 相关属性、插件与权限的异常状态、通知与函数源码泄露、Chrome 运行时对象是否可枚举等。\n\n这类页面通常由自动化或安全研究者维护，目的在于帮助防守方了解可被观测的痕迹，同时也被使用者用来自查自己的环境。" },
			{ heading: "如何解读检测结果", body: "先区分「默认状态」与「被修改状态」。正常浏览器在未启用自动化时，相关项目应处于默认取值；如果在纯净环境中也出现异常，先检查浏览器版本、扩展与安全软件，再看结论。\n\n其次注意检测项会随浏览器版本变化。开发者工具协议与自动化接口的字段会调整，因此历史结论不一定适用于当前版本。\n\n这类页面展示的是可观测痕迹的存在与否，不评估你使用自动化的正当性，也不代表任何平台的实际拦截策略。" },
			{ heading: "常见误区", body: "- 把检测页列出的痕迹清单当作完整清单。防守方通常还有未公开的判断逻辑。\n- 看到有痕迹就认为一定会被拦截，忽略具体服务的策略差异。\n- 在非默认配置下测试后，把结论套用到默认环境。\n- 长期沿用旧版本的结论，浏览器升级后字段与默认值都可能变化。" },
			{ heading: "把结果用于决策前", body: "自动化本身在测试、数据研究与合法业务中有正当用途，检测页面则是了解环境暴露面的工具。是否使用、以及在什么范围内使用，应由你自己依据目标网站条款与当地法律判断。\n\n本站收录这些页面是为了记录可观测的痕迹来源，不提供规避风控的操作指引。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Automation detection is more specific than general bot detection: it checks evidence that a browser is currently under program control, such as WebDriver-related properties, unusual plugin and permission states, notifications and function source leaks, and whether Chrome runtime objects are enumerable.\n\nThese pages are usually maintained by automation or security researchers, both to help defenders understand observable traces and to let users check their own environment." },
			{ heading: "How to read the results", body: "Separate default state from modified state. In a normal browser without automation enabled, related entries should hold their default values; if anomalies appear even in a clean environment, check the browser version, extensions and security software before drawing conclusions.\n\nSecond, note that detection entries change with browser versions. DevTools protocol and automation interface fields do shift, so an old conclusion may not apply to the current release.\n\nThese pages show whether observable traces exist. They do not assess whether your use of automation is legitimate, and they do not represent any platform's real blocking policy." },
			{ heading: "Common mistakes", body: "- Treating the list on a detection page as a complete list. Defenders usually hold unpublished logic as well.\n- Seeing traces and concluding interception is certain, ignoring differences in each service's policy.\n- Testing under a non-default configuration, then applying the conclusion to a default environment.\n- Reusing an old conclusion over time; both fields and defaults can change after a browser upgrade." },
			{ heading: "Before you act on a result", body: "Automation has legitimate uses in testing, data research and lawful business work; detection pages are tools for understanding what your environment exposes. Whether to use it, and within what scope, is for you to judge against the target site's terms and local law.\n\nBrowserHub lists these pages to record where observable traces come from, and does not provide guidance on evading risk controls. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"network-fingerprint": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "网络指纹关注的是浏览器与网络连接协商出来的参数，而不是页面内的 JavaScript 环境。典型内容包括 TLS 握手中的密码套件顺序、扩展列表与曲线格式（可用 JA3 一类的哈希概括），以及 HTTP/2 的 SETTINGS 帧、窗口更新策略与首部顺序。\n\n不同浏览器与不同 HTTP 客户端在这些参数上存在系统性差异，因此它们可以作为区分「这次请求来自哪种客户端」的线索。" },
			{ heading: "如何解读检测结果", body: "先确认测的是谁。当前浏览器发起的请求，与脚本、curl 或自动化库发起的请求，握手参数通常不同——看到差异时应先确认测试通道，而不是立即判断环境异常。\n\n其次注意一致性：同一浏览器经由不同网络出口时，TLS 与 HTTP/2 参数一般保持稳定；如果同一客户端连续两次结果不同，先排查中间代理或网关是否改写了握手。\n\n哈希值只适合做同一维度下的前后对比，不宜跨工具直接比较，因为不同项目采用的计算字段并不一致。" },
			{ heading: "常见误区", body: "- 把浏览器请求与脚本请求的差异当成浏览器环境异常，两者本来就应不同。\n- 假设某一组参数是「正确答案」，实际上它们随浏览器与服务端配置变化。\n- 直接比较两个不同工具给出的哈希值，它们的计算字段并不相同。\n- 忽略中间代理可能改写握手，导致把链路问题误判为客户端问题。" },
			{ heading: "把结果用于决策前", body: "网络层参数会随浏览器与服务端配置变化，不存在长期固定的标准值。任何以某一组参数为「正确答案」的判断都应谨慎。\n\n这类信息主要用于研究客户端识别方式与排查连接问题。请遵守目标站点的服务条款，不要把测试结果用于规避访问控制。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Network fingerprints concern parameters negotiated between the browser and the connection, rather than the in-page JavaScript environment. Typical content includes cipher suite order, extension lists and curve formats in the TLS handshake (summarised by hashes such as JA3), plus HTTP/2 SETTINGS frames, window update policy and header ordering.\n\nDifferent browsers and different HTTP clients differ systematically in these parameters, which makes them a clue to \"which kind of client made this request\"." },
			{ heading: "How to read the results", body: "First establish who is being measured. A request from the current browser normally has different handshake parameters from one made by a script, curl or an automation library — when you see a difference, confirm the test channel before treating the environment as anomalous.\n\nSecond, look at consistency: TLS and HTTP/2 parameters are generally stable for the same browser across different network exits. If two consecutive runs from the same client differ, first check whether an intermediate proxy or gateway rewrote the handshake.\n\nHash values are only useful for before/after comparison within one dimension. Comparing them across different tools is not meaningful, because projects hash different field sets." },
			{ heading: "Common mistakes", body: "- Comparing a browser request against a script request and concluding the browser is anomalous.\n- Assuming a fixed set of parameters is the correct answer; these values change with browser and server configuration.\n- Comparing hashes produced by two different tools as if they measured the same thing.\n- Forgetting that an intermediate proxy can alter the observed handshake." },
			{ heading: "Before you act on a result", body: "Network-layer parameters change with browser and server configuration; there is no long-term fixed baseline. Any judgement that treats one set of values as the correct answer deserves scepticism.\n\nThis information is mainly useful for researching client identification methods and troubleshooting connectivity. Respect the target site's terms of service and do not use test results to bypass access controls. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"privacy-testing": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "隐私测试关注的是浏览器对追踪器的防护效果，而不是暴露了哪些指纹信号。它通过加载已知的追踪资源，观察这些请求是否发出、是否被拦截，从而评估内容拦截器与追踪防护的实际表现。\n\n这与指纹检测是两类不同的问题：前者问「有没有请求发出去」，后者问「网页能读到什么信息」。" },
			{ heading: "如何解读检测结果", body: "先确认防护组件处于启用状态，并注意测试结果反映的是当前配置，不是浏览器的固有能力。同一浏览器在不同扩展组合下结果会明显不同。\n\n其次注意页面加载方式。追踪测试通常需要真实加载第三方资源，若被其他扩展、网络策略或隐私模式干扰，结论会失真。\n\n拦截数量不是越多越好。过度拦截会破坏正常站点功能，应以实际业务能否正常使用为判断标准。" },
			{ heading: "常见误区", body: "- 把追踪拦截结果当作浏览器指纹的暴露程度，两者衡量的是不同维度。\n- 忽略扩展之间的冲突：多个拦截器同时工作可能互相影响。\n- 认为拦截率百分之百就等于完全隐私，浏览行为本身仍会留下服务端记录。\n- 在无痕模式下测试，得出与日常使用不同的结论。" },
			{ heading: "把结果用于决策前", body: "此类页面由非营利组织或第三方维护，检测逻辑与数据处理方式各异。请先阅读其说明。\n\n隐私防护是配置与软件版本共同决定的结果，测试页面只能反映测试当时的状态。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Privacy testing looks at how well a browser blocks trackers, not at which fingerprint signals it exposes. It loads known tracking resources, observes whether those requests are sent or blocked, and thereby assesses the real behaviour of content blockers and tracking protection.\n\nThis is a different question from fingerprint detection: the former asks \"did a request go out\", the latter asks \"what can the page read\"." },
			{ heading: "How to read the results", body: "First confirm that protection components are enabled, and remember the result reflects the current configuration rather than an inherent browser capability. The same browser behaves very differently under different extension combinations.\n\nSecond, note how the page loads. Tracker tests usually need to load real third-party resources, so conclusions are unreliable if other extensions, network policy or private mode interfere.\n\nA higher block count is not automatically better. Over-blocking breaks legitimate sites, so judge against whether the sites you actually need still work." },
			{ heading: "Common mistakes", body: "- Reading a tracker-blocking result as the degree of fingerprint exposure; they measure different things.\n- Ignoring conflicts between extensions: several blockers running together can interfere.\n- Assuming a 100% block rate equals full privacy — your browsing still leaves server-side records.\n- Testing in private mode and drawing conclusions that do not apply to daily use." },
			{ heading: "Before you act on a result", body: "These pages are maintained by non-profits or third parties with differing detection logic and data handling. Read their documentation first.\n\nPrivacy protection is the result of configuration and software version together; a test page can only reflect the state at test time. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"network-testing": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "网络测试关注流量实际经过的路径。DNS 泄漏测试会触发一次域名解析，并检查解析请求是否出现在预期之外的服务商处，从而判断 DNS 查询是否绕过了你配置的代理或 VPN。\n\n这类结果与网页内容无关，考察的是本机与网络侧的出口配置。" },
			{ heading: "如何解读检测结果", body: "先确认测试时机。DNS 缓存会让第二次测试看不到真实解析过程，因此重复测试的结果可能与首次不同，必要时先清理缓存。\n\n其次区分「泄漏」与「不使用代理」。如果根本没有配置代理，解析请求走本地或运营商 DNS 属于正常情况，并不构成泄漏；只有在你期望流量经过代理、而解析却出现在第三方时才需要处理。\n\n此外要注意分流规则：部分客户端只代理部分流量，浏览器内测试与命令行测试的解析路径可能不同。" },
			{ heading: "常见误区", body: "- 把未配置代理时的正常解析当作泄漏。\n- 反复测试得到不同结果就断定有问题，实际原因可能是 DNS 缓存。\n- 只在浏览器中测试，忽略命令行或其他应用的解析路径。\n- 认为一次通过就可以确认长期安全，配置变更后需要重新验证。" },
			{ heading: "把结果用于决策前", body: "这类检测由第三方服务执行，会把你的域名解析发往其服务器。测试本身会暴露你的网络环境特征，请在了解其隐私说明后使用。\n\n结果只反映测试当时本机的配置。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Network testing looks at the path traffic actually takes. A DNS leak test triggers a domain resolution and checks whether the query appears at providers other than the expected one, indicating that DNS lookups bypassed your configured proxy or VPN.\n\nThe result is unrelated to page content; it examines local and network-side egress configuration." },
			{ heading: "How to read the results", body: "Check the timing first. DNS caching means a second test may not observe a real resolution, so repeated runs can differ from the first; clear the cache when needed.\n\nSecond, distinguish a leak from simply not using a proxy. With no proxy configured, lookups going to a local or ISP resolver is normal, not a leak. It only matters when you expect traffic through a proxy yet resolution shows up at a third party.\n\nAlso note split tunnelling: some clients proxy only part of traffic, so in-browser tests and command-line tests may resolve differently." },
			{ heading: "Common mistakes", body: "- Treating normal resolution with no proxy configured as a leak.\n- Concluding something is wrong from differing repeated runs when DNS caching explains it.\n- Testing only in a browser and ignoring command-line or other application paths.\n- Assuming one pass confirms long-term safety; re-verify after configuration changes." },
			{ heading: "Before you act on a result", body: "These checks run on third-party infrastructure and send your domain resolutions to their servers. The test itself exposes traits of your network environment, so read the privacy documentation first.\n\nResults reflect your machine's configuration at test time only. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"proxy-detection": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "代理检测的依据是 IP 地址在公开数据库中的标记。运营方会记录已知代理、VPN 出口或机房网段，并对外提供查询，因此可以判断某个出口 IP 是否被归类为代理服务。\n\n这类判定来自数据库而非实时网络探测，准确性取决于数据库的更新频率与覆盖范围。" },
			{ heading: "如何解读检测结果", body: "先区分「被标记为代理」与「不适合目标业务」。住宅代理被正确识别为代理是预期行为；问题只在于某些业务场景不接受代理出口。\n\n其次注意数据库滞后。新出现的代理 IP 可能尚未收录，已停用的 IP 也可能仍在库中，因此单次查询结果不代表长期状态。\n\n最后区分查询入口。不同服务商的数据库覆盖范围不同，同一 IP 在不同页面可能得到不同结论。" },
			{ heading: "常见误区", body: "- 把被识别为代理直接等同于不安全，两者衡量的是不同维度。\n- 只查一次就作为长期结论，代理 IP 的库状态会变化。\n- 混用不同服务商的查询结果，数据库覆盖范围并不相同。\n- 忽略被标记的具体原因：机房网段、共享出口与商业代理的含义并不一样。" },
			{ heading: "把结果用于决策前", body: "IP 相关信息本身具有敏感性。请只在你有权测试的环境中查询，不要用于识别他人。\n\n任何代理使用都应遵守目标网站条款与当地法律。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Proxy detection relies on how an IP address is labelled in public databases. Operators record known proxies, VPN exits and datacenter ranges and expose lookups, so it is possible to tell whether an exit IP is classified as a proxy service.\n\nThe classification comes from a database rather than live network probing, so accuracy depends on how often that database is updated and how much it covers." },
			{ heading: "How to read the results", body: "First distinguish \"flagged as a proxy\" from \"unsuitable for the target use case\". A residential proxy being correctly identified is expected; the problem only arises when a scenario does not accept proxy egress.\n\nSecond, note database lag. A newly issued proxy IP may not be listed yet, and a retired one may still be present, so a single lookup does not represent long-term status.\n\nFinally, distinguish query entry points. Coverage differs between vendors, so the same IP can get different verdicts on different pages." },
			{ heading: "Common mistakes", body: "- Reading \"flagged as a proxy\" as \"unsafe\"; these measure different things.\n- Treating one lookup as a long-term conclusion, when database status changes.\n- Mixing results from different vendors, whose coverage differs.\n- Ignoring why it was flagged: datacenter ranges, shared exits and commercial proxies mean different things." },
			{ heading: "Before you act on a result", body: "IP information is sensitive. Only query it in environments you are authorised to test, and do not use it to identify others.\n\nAny proxy use must follow the target site's terms and local law. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"ip-reputation": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "IP 信誉查询把出口 IP 与多个公开数据源比对，输出关于滥用历史、代理属性与风险类别的判断，并通常给出一个综合分数。\n\n分数属于该服务商自定的口径，不同平台的评分不可直接比较，也不能推断你在某个具体站点上的表现。" },
			{ heading: "如何解读检测结果", body: "先看分数对应的说明文档。每个服务商会公布其数据来源与权重，脱离口径单看数字没有意义。\n\n其次关注变化趋势而不是绝对值。同一个出口 IP 在一段时间内分数上升，通常意味着数据源记录到了新的滥用行为，这比某一次的高分更有参考价值。\n\n此外区分 IP 信誉与设备指纹。两者是独立维度，干净的 IP 不会弥补环境信号的问题，反之亦然。" },
			{ heading: "常见误区", body: "- 把综合分数当成某个平台的拦截概率。\n- 跨服务商比较分数高低，不同评分体系不可换算。\n- 认为分数只由历史行为决定，实际还会包含数据源缺失等结构性因素。\n- 只看总分，忽略具体被标记的类别。" },
			{ heading: "把结果用于决策前", body: "查询 IP 属于对第三方的信息披露，请在你有权测试的环境中使用。\n\n信誉判断具有时效性且依赖外部数据库，仅供参考。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "IP reputation lookups compare an exit IP against multiple public data sources and return judgements about abuse history, proxy status and risk category, usually with an overall score.\n\nThe score follows that vendor's own definition. Scores are not comparable across platforms and cannot predict your experience on any particular site." },
			{ heading: "How to read the results", body: "Read the score's documentation first. Each vendor publishes its sources and weights; the number alone is meaningless without that context.\n\nSecond, watch the trend rather than the absolute value. A rising score for the same exit IP over time usually means data sources recorded new abuse, which is more informative than one high reading.\n\nAlso separate IP reputation from device fingerprint. They are independent dimensions: a clean IP does not compensate for environment signals, and vice versa." },
			{ heading: "Common mistakes", body: "- Treating an overall score as the probability of being blocked by a specific platform.\n- Comparing scores across vendors whose systems are not convertible.\n- Assuming scores are determined only by behaviour history; structural factors such as missing data sources also count.\n- Looking only at the total and ignoring which categories were flagged." },
			{ heading: "Before you act on a result", body: "Querying an IP is a disclosure to a third party. Only do it in environments you are authorised to test.\n\nReputation judgements are time-sensitive and depend on external databases, so treat them as guidance only. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	automation: {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "这类项目是浏览器自动化框架而非检测工具。它们提供控制浏览器的接口：启动指定浏览器与版本、执行脚本、处理等待条件、拦截网络请求、保存截图或生成文件，并在需要时把控制权交给外部程序。\n\n它们既是测试基础设施，也是研究浏览器环境如何响应程序控制的研究对象。" },
			{ heading: "如何解读检测结果", body: "评估这类框架时，重点不是「哪个更强」，而是它与你的任务是否匹配：需要跨哪些浏览器与版本、是否需要真实的用户交互、是否需要网络层拦截、并行与持久化会话如何管理。\n\n其次注意版本与内核的对应关系。框架支持的浏览器矩阵会变化，本地缓存的浏览器版本可能与框架预期不一致，导致行为异常。\n\n最后区分自动化能力与指纹一致性。这两件事互相独立：框架能稳定控制浏览器，并不意味着产生的环境信号彼此一致。" },
			{ heading: "常见误区", body: "- 只按流行度选择，忽略浏览器矩阵、语言生态与团队既有流程。\n- 在默认浏览器配置上直接做自动化，官方文档通常明确不建议这样做。\n- 认为使用框架就自动获得一致的环境指纹，环境一致性需要单独设计与验证。\n- 升级框架或浏览器后不复查行为，接口与默认值都可能变化。" },
			{ heading: "把结果用于决策前", body: "自动化框架有正当的测试与业务用途。使用时应遵守目标网站的服务条款、robots 协议与当地法律，不得用于绕过访问控制或干扰他人服务。\n\n以各项目官方文档为准。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "These are browser automation frameworks, not detection tools. They expose an interface for controlling a browser: launching a specific browser and version, executing scripts, handling wait conditions, intercepting network requests, saving screenshots or generating files, and handing control to an external program where needed.\n\nThey are both testing infrastructure and objects of research into how browsers respond to programmatic control." },
			{ heading: "How to read the results", body: "When evaluating such a framework, the question is not \"which is strongest\" but whether it fits your task: which browsers and versions you need, whether realistic user interaction is required, whether you need network interception, and how parallelism and persistent sessions are managed.\n\nSecond, note the relationship between framework and browser versions. The supported browser matrix changes, and a locally cached browser build may not match what the framework expects, producing odd behaviour.\n\nFinally separate automation capability from fingerprint consistency. They are independent: a framework's ability to drive a browser reliably does not mean the environment signals it produces are mutually consistent." },
			{ heading: "Common mistakes", body: "- Choosing purely on popularity, ignoring browser matrix, language ecosystem and existing team workflow.\n- Automating a default browser profile, which official documentation generally advises against.\n- Assuming a framework gives you a consistent fingerprint automatically; consistency must be designed and verified separately.\n- Not rechecking behaviour after a framework or browser upgrade, when interfaces and defaults change." },
			{ heading: "Before you act on a result", body: "Automation frameworks have legitimate testing and business uses. Follow the target site's terms of service, robots directives and local law; do not use them to bypass access controls or interfere with others' services.\n\nEach project's official documentation is authoritative. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	testing: {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "端到端测试框架关注的是在真实浏览器中执行用例并验证页面行为，它会在测试运行期间启动浏览器、注入脚本、等待断言条件，并把失败时的上下文保留下来供排查。\n\n它与自动化框架的差别主要在设计目标：测试框架围绕断言、报告与调试体验构建。" },
			{ heading: "如何解读检测结果", body: "评估这类工具时，应关注它与你的测试组织方式是否匹配：断言风格、并行策略、失败重试与报告集成，以及对目标浏览器与版本的覆盖范围。\n\n其次注意运行环境差异。部分测试框架在浏览器内执行，这会影响对页面性能与定时行为的观察结果；另一些通过独立驱动通信，语义更接近真实用户但调试链路更长。\n\n版本支持同样是变数，确认目标浏览器是否在官方支持矩阵内。" },
			{ heading: "常见误区", body: "- 以运行速度作为唯一选择依据，忽略了失败可诊断性。\n- 忽略浏览器内核差异，同一个用例在不同内核上行为可能不同。\n- 在测试中依赖固定等待时间，导致用例不稳定。\n- 假设测试通过等于生产环境行为一致，两者的数据与依赖往往不同。" },
			{ heading: "把结果用于决策前", body: "测试框架的选择应结合团队现有流程，而非只看功能列表。以官方文档所列的支持矩阵与限制为准。\n\n请遵守目标站点的服务条款与当地法律。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "End-to-end testing frameworks run cases inside a real browser and verify page behaviour: they launch a browser, inject scripts during the run, wait for assertion conditions, and retain context when a test fails for diagnosis.\n\nThe difference from general automation frameworks is mainly the design goal: testing frameworks are built around assertions, reporting and debugging experience." },
			{ heading: "How to read the results", body: "Evaluate whether the tool fits how your team organises tests: assertion style, parallelism strategy, failure retries and reporting integration, plus coverage of target browsers and versions.\n\nSecond, note runtime differences. Some frameworks execute inside the browser, which affects what you can observe about page performance and timing; others communicate through a separate driver, which is semantically closer to a real user but gives a longer debugging chain.\n\nVersion support is also a variable — confirm the target browser is in the officially supported matrix." },
			{ heading: "Common mistakes", body: "- Choosing on speed alone and ignoring diagnosability of failures.\n- Ignoring engine differences, where the same case can behave differently across browsers.\n- Depending on fixed waits in tests, which makes cases flaky.\n- Assuming a passing test equals production behaviour; data and dependencies usually differ." },
			{ heading: "Before you act on a result", body: "Choose a testing framework against your team's existing workflow rather than a feature list alone. Treat the officially documented support matrix and limitations as authoritative.\n\nFollow the target site's terms of service and local law. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	interaction: {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "交互自动化项目关注指针与键盘事件的真实感。它们生成带有缓动、抖动与停顿的移动轨迹，或在点击前加入短暂延迟，试图让事件序列更接近人类操作。\n\n这类项目作用于行为层面，与设备指纹属于不同的信号维度。" },
			{ heading: "如何解读检测结果", body: "先明确评估对象。行为特征是否被采纳，取决于具体服务端的判断逻辑，任何本地测试都无法给出确定结论。\n\n其次注意可复现性。轨迹生成通常包含随机成分，因此单次运行不足以判断效果，应固定条件多次观察差异。\n\n同时确认事件是否真的经过合成路径：在浏览器环境中直接派发事件与操作系统层面的输入，在事件对象属性上可能存在差别，服务端有可能据此区分。" },
			{ heading: "常见误区", body: "- 认为轨迹更平滑就一定更难被识别，异常完美的曲线本身也是一种特征。\n- 只测试一次，随机成分会让单次结果没有代表性。\n- 忽略事件来源差异，合成事件与真实输入的属性可能不同。\n- 把行为层的改动当作能同时改善指纹层的问题，两者相互独立。" },
			{ heading: "把结果用于决策前", body: "以「让自动化难以被检测」为目的的使用，可能违反目标网站条款或当地法律。本站收录这些项目是因为它们是研究浏览器事件模型的公开资料。\n\n合规做法是理解事件机制本身，并仅在获授权的测试环境中实验。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Interaction automation projects focus on how realistic pointer and keyboard events look. They generate movement paths with easing, jitter and pauses, or add a short delay before clicking, trying to make the event sequence resemble human operation.\n\nThese operate at the behaviour layer, which is a different signal dimension from device fingerprinting." },
			{ heading: "How to read the results", body: "First be clear about what is being evaluated. Whether behavioural signals are used depends on a specific server's decision logic, and no local test can give a definitive answer.\n\nSecond, note reproducibility. Path generation usually includes randomness, so a single run is not enough to judge effect; fix conditions and observe across several runs.\n\nAlso confirm whether events really travel a synthesised path: events dispatched inside a browser and input from the operating system can differ in event object properties, and a server may distinguish them." },
			{ heading: "Common mistakes", body: "- Assuming a smoother path is harder to detect; an unnaturally perfect curve is itself a trait.\n- Testing once, when randomness makes a single run unrepresentative.\n- Ignoring event provenance, where synthesised and real input can differ in properties.\n- Assuming behaviour-layer changes also improve the fingerprint layer; the two are independent." },
			{ heading: "Before you act on a result", body: "Using such projects with the goal of making automation hard to detect may violate a target site's terms or local law. BrowserHub lists them because they are public material for studying browser event models.\n\nThe compliant approach is to understand the event mechanism itself and experiment only in authorised test environments. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"desktop-automation": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "桌面自动化库工作在操作系统层面，通过模拟键盘、鼠标与屏幕操作控制应用，浏览器只是被操作的对象之一。\n\n它们与浏览器环境指纹没有直接关系：网页无法直接读取操作系统的输入来源，因此这类工具不会改变页面内可见的指纹信号，但会改变交互的时序特征。" },
			{ heading: "如何解读检测结果", body: "评估这类工具时，重点是运行环境要求：操作系统支持、权限需求（部分库需要辅助功能或输入监控授权）以及坐标定位的稳定性。\n\n其次注意与浏览器自动化方案的分工。桌面自动化适合需要跨应用或真实窗口的场景，但它无法直接读取页面内部状态，与浏览器内自动化往往是互补关系。\n\n最后确认缩放与多显示器设置对坐标的影响，这通常是实际使用中最先遇到的障碍。" },
			{ heading: "常见误区", body: "- 认为使用桌面自动化就能改变网页指纹结果，两者作用层级不同。\n- 在未授予必要权限时反复重试，脚本会静默失败。\n- 忽略屏幕缩放比例，导致坐标偏移。\n- 期望它与浏览器自动化框架功能重叠，二者能力集不同。" },
			{ heading: "把结果用于决策前", body: "桌面自动化需要较高系统权限，请仅在自有或已获授权的设备上使用。\n\n以各项目官方文档所列的平台支持与权限要求为准。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Desktop automation libraries operate at the operating-system level, controlling applications by simulating keyboard, mouse and screen actions, with the browser as just one target among others.\n\nThey have no direct relationship to browser fingerprinting: a web page cannot read the source of operating-system input, so these tools do not change fingerprint signals visible to the page. They do change interaction timing patterns." },
			{ heading: "How to read the results", body: "When evaluating such tools, focus on runtime requirements: operating system support, permission needs (some libraries require accessibility or input-monitoring authorisation) and the stability of coordinate-based targeting.\n\nSecond, note how this divides from browser automation. Desktop automation suits scenarios spanning applications or real windows, but it cannot read in-page state directly, so the two are usually complementary rather than overlapping.\n\nFinally, confirm how display scaling and multi-monitor setups affect coordinates — usually the first obstacle encountered in practice." },
			{ heading: "Common mistakes", body: "- Believing desktop automation changes a web page's fingerprint results; it operates at a different layer.\n- Retrying repeatedly when required permissions are missing, which fails silently.\n- Ignoring display scaling, which shifts coordinates.\n- Expecting feature overlap with browser automation frameworks; their capability sets differ." },
			{ heading: "Before you act on a result", body: "Desktop automation requires substantial system privileges. Use it only on devices you own or are authorised to control.\n\nEach project's official documentation is authoritative for platform support and permission requirements. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	"http-tls": {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "HTTP/TLS 类项目工作在客户端库层面，通过调整连接协商参数，使程序发出的请求在握手特征上接近某种浏览器。常见做法包括固定密码套件顺序、扩展列表与曲线格式，或直接复用浏览器指纹模板。\n\n它们影响的是网络层可观测特征，不改变页面内的 JavaScript 环境。" },
			{ heading: "如何解读检测结果", body: "先明确比较对象。同一客户端在不同网站上的结果可能不同，因为服务端可能使用不同的判定逻辑；用单一网站的结论推断全部情况并不可靠。\n\n其次注意参数会过期。浏览器升级会改变握手参数，模板库需要相应更新才能保持一致，因此应核对库所声明的浏览器版本与实际使用版本。\n\n最后区分「与浏览器一致」与「适合业务」：网络层一致并不保证请求会被接受，还取决于 Cookie、会话与行为等其他维度。" },
			{ heading: "常见误区", body: "- 把客户端层模拟当作浏览器环境模拟，前者不改变页面内可见信号。\n- 长期使用未更新的指纹模板，与目标浏览器版本脱节。\n- 只测试一个网站，结论无法推广。\n- 认为网络层一致即可通过所有风控，其他维度仍然独立存在。" },
			{ heading: "把结果用于决策前", body: "以规避服务端识别为目的的使用可能违反目标网站条款或当地法律。本站收录这些项目是因为它们是研究 TLS 与 HTTP/2 客户端行为的公开资料。\n\n合规用途包括自有系统的兼容性测试与网络问题排查。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "HTTP/TLS projects work at the client-library layer, adjusting connection negotiation so that a program's request resembles a given browser at the handshake level. Common approaches include pinning cipher suite order, extension lists and curve formats, or reusing browser fingerprint templates directly.\n\nThey affect network-layer observable traits and do not change the in-page JavaScript environment." },
			{ heading: "How to read the results", body: "First be clear about what you are comparing against. The same client can produce different results on different sites because servers may apply different logic, so a conclusion from one site does not generalise.\n\nSecond, note that parameters expire. Browser upgrades change handshake parameters, and template libraries need matching updates to stay consistent — check which browser version a library claims to match against the version you actually use.\n\nFinally distinguish \"matches a browser\" from \"works for your task\": network-layer consistency does not guarantee acceptance, which also depends on cookies, session state and behaviour." },
			{ heading: "Common mistakes", body: "- Treating client-layer impersonation as browser environment simulation; it does not change signals visible to the page.\n- Using stale fingerprint templates that no longer match the target browser version.\n- Testing on a single site and generalising the conclusion.\n- Assuming network-layer consistency passes all risk controls; other dimensions remain independent." },
			{ heading: "Before you act on a result", body: "Using these with the goal of evading server-side identification may violate a target site's terms or local law. BrowserHub lists them as public material for studying TLS and HTTP/2 client behaviour.\n\nLegitimate uses include compatibility testing of systems you operate and network troubleshooting. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	},
	privacy: {
		"zh-cn": [
			{ heading: "这个分类测量什么", body: "隐私工具改变的是浏览器的请求行为而非环境信号。内容拦截扩展阻止已知追踪请求，追踪防护工具自动学习跨站追踪关系并施加限制，匿名浏览浏览器则通过配置调整让不同用户更难被区分。\n\n它们减少的是可关联信息，方向与伪装相反。" },
			{ heading: "如何解读检测结果", body: "先确认防护组件的启用状态与版本，测试结果反映的是当前配置组合而不是软件的固有能力。\n\n其次区分「拦截」与「匿名」。拦截减少请求数量，匿名浏览调整环境一致性，两者解决的问题不同，不能相互替代。\n\n同时评估副作用：拦截规则可能误伤正常站点功能，匿名浏览的严格配置也可能影响日常使用，应以实际需求取舍。" },
			{ heading: "常见误区", body: "- 把隐私工具当作指纹伪装工具，方向恰好相反。\n- 认为拦截越多越好，过度拦截会破坏正常使用。\n- 只测一次，扩展版本与规则库会持续更新。\n- 以为使用隐私工具就不需要注意服务端记录，它影响的是客户端行为。" },
			{ heading: "把结果用于决策前", body: "各项目的隐私政策与数据处理方式不同，请阅读官方说明后使用。\n\n工具效果随版本与规则库变化，以官方文档为准。复核日期：" + toolSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "What this category measures", body: "Privacy tools change browsing request behaviour rather than environment signals. Content blockers stop known tracking requests, tracking-protection tools learn cross-site tracking relationships and restrict them, and anonymity browsers adjust configuration so users are harder to tell apart.\n\nThey reduce linkable information, which is the opposite direction from impersonation." },
			{ heading: "How to read the results", body: "Confirm which protection components are enabled and at which version — results reflect the current configuration combination, not an inherent capability.\n\nSecond, distinguish blocking from anonymity. Blocking reduces request count; anonymity browsing adjusts environment consistency. They solve different problems and are not substitutes.\n\nAlso weigh side effects: blocklists can break legitimate site features, and strict anonymity settings can interfere with daily use. Choose against your actual needs." },
			{ heading: "Common mistakes", body: "- Treating privacy tools as fingerprint-spoofing tools; the direction is the opposite.\n- Assuming more blocking is better; over-blocking breaks normal use.\n- Testing once, while extension versions and filter lists keep updating.\n- Believing a privacy tool makes server-side logs irrelevant; it affects client-side behaviour." },
			{ heading: "Before you act on a result", body: "Privacy policies and data handling differ between projects. Read the official documentation first.\n\nTool effectiveness changes with versions and filter lists; official documentation is authoritative. Reviewed: " + toolSectionsReviewedOn + "." }
		]
	}
};

export type ToolSectionInput = {
	name: string;
	slug: string;
	categorySlug: string;
	website: string;
};

/**
 * Build the four sections for one tool page.
 *
 * The opening line names the specific tool; the remaining copy explains the
 * measurement category it belongs to. Nothing here asserts a product feature,
 * price or test result that is not derivable from the tool's public
 * documentation or from how the underlying web platform APIs behave.
 */
export function toolSectionsFor(tool: ToolSectionInput, locale: string): ToolSection[] {
	const copyLocale: ToolCopyLocale = FULL_COPY_LOCALES.includes(locale as ToolCopyLocale) ? (locale as ToolCopyLocale) : "en";
	const headingsForLocale = toolSectionHeadings(locale);
	const template = categoryCopy[tool.categorySlug];
	if (!template) return [];
	const sections = template[copyLocale];
	return sections.map((section, index) => {
		const body = index === 0 ? `${role[tool.slug]?.[copyLocale] ?? ""}${tool.slug in role ? "\n\n" : ""}${section.body}` : section.body;
		return { heading: headingsForLocale[index], body };
	});
}