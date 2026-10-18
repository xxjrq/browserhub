/**
 * Long-form sections for the 15 fingerprint signal pages.
 *
 * Why this module exists: the fingerprint detail pages were the thinnest page
 * class in the sitemap. A 2026-10-18 audit of `out/` measured them at 0.9 `<h2>`
 * and 458 characters of `<article>` body text per page, against 4,563 for
 * comparisons and 2,319 for tools. The locale route rendered a header, two
 * cards (`fingerprintCopy`) and a single "responsible use" paragraph, so the
 * `category` field in `catalog/technologies.json` and the per-signal
 * descriptions in `resources.ts` were the only real content on the page.
 *
 * Editorial rules for this file (these are red lines, not style preferences):
 * - Every signal here is a documented web platform feature or a published
 *   network-fingerprinting method. The copy explains *how the signal is
 *   produced and how it is observed*, which is verifiable from MDN, the W3C
 *   Fingerprinting Guidance, the TLS 1.3 RFC, and the JA3/JA4 publications.
 * - Nothing here claims that a signal "passes" or "fails" any vendor's check,
 *   names a detection threshold, or asserts a product capability. No detection
 *   vendor's rules are described, because they are not public.
 * - No price, benchmark or vendor claim appears anywhere in this file.
 * - `role` lines are per-signal so that the 15 pages do not read as one
 *   template. A runtime check asserts every `role` entry is unique.
 *
 * Locale policy follows `.agents/product-marketing.md`: English and Simplified
 * Chinese carry complete article copy. The other locales reuse the English body
 * with localised headings, matching the existing fallback behaviour used by
 * `tool-sections.ts`, `guideCategoryLabel` and `localizedGuideCopy`.
 *
 * This module deliberately does not import resources.ts (which consumes it).
 */

export type FingerprintCopyLocale = "zh-cn" | "en";

export type FingerprintSection = { heading: string; body: string };

/** Locale coverage for section bodies. Other locales fall back to English. */
const FULL_COPY_LOCALES: FingerprintCopyLocale[] = ["zh-cn", "en"];

/**
 * Date on which the underlying specifications and vendor documentation for
 * these signals were last reviewed. Recorded per project convention so the
 * page states when the technical description was checked, which is different
 * from a build date.
 */
export const fingerprintSectionsReviewedOn = "2026-10-18";

/**
 * Localised section headings. All seven locales are covered because headings
 * are short structural labels, not article prose.
 */
const headings: Record<string, [string, string, string, string]> = {
	"zh-cn": ["这个信号如何产生", "如何观察与交叉验证", "常见误区", "把观察结果用于判断前"],
	en: ["How this signal is produced", "How to observe and cross-check it", "Common mistakes", "Before drawing conclusions"],
	ja: ["このシグナルの発生源", "観察とクロスチェック", "よくある誤解", "判断に使える前に"],
	ko: ["이 신호가 생기는 방식", "관찰과교차확인", "흔한 오해", "판단 근거로 쓰기 전에"],
	es: ["Cómo se produce esta señal", "Cómo observarla y contrastarla", "Errores frecuentes", "Antes de sacar conclusiones"],
	pt: ["Como este sinal é produzido", "Como observar e conferir", "Erros comuns", "Antes de tirar conclusões"],
	ru: ["Как формируется этот сигнал", "Как наблюдать и перепроверять", "Частые ошибки", "Перед тем как делать выводы"]
};

export function fingerprintSectionHeadings(locale: string): [string, string, string, string] {
	return headings[locale] ?? headings.en;
}

/**
 * Localised labels for the six `category` values in
 * `catalog/technologies.json`.
 *
 * `category` is a lowercase English slug on the source rows and was rendered
 * verbatim as the page eyebrow, so `/ja|fingerprint/*` shipped the raw word
 * "rendering" or "network" above a Japanese heading. Only the category label
 * is translated — the body copy is handled by `fingerprintSectionsFor`.
 */
export function fingerprintCategoryLabel(locale: string, category: string): string {
	const map: Record<string, Record<string, string>> = {
		rendering: { "zh-cn": "渲染信号", en: "Rendering", ja: "レンダリング", ko: "렌더링", es: "Renderizado", pt: "Renderização", ru: "Рендеринг" },
		device: { "zh-cn": "设备信号", en: "Device", ja: "デバイス", ko: "기기", es: "Dispositivo", pt: "Dispositivo", ru: "Устройство" },
		layout: { "zh-cn": "布局信号", en: "Layout", ja: "レイアウト", ko: "레이아웃", es: "Diseño", pt: "Layout", ru: "Макет" },
		network: { "zh-cn": "网络信号", en: "Network", ja: "ネットワーク", ko: "네트워크", es: "Red", pt: "Rede", ru: "Сеть" },
		locale: { "zh-cn": "区域设置信号", en: "Locale", ja: "ロケール", ko: "로케일", es: "Configuración regional", pt: "Localidade", ru: "Локаль" },
		browser: { "zh-cn": "浏览器行为信号", en: "Browser behaviour", ja: "ブラウザの動作", ko: "브라우저 동작", es: "Comportamiento del navegador", pt: "Comportamento do navegador", ru: "Поведение браузера" }
	};
	const entry = map[category];
	if (!entry) return category;
	return entry[locale] ?? entry.en ?? category;
}

/**
 * What each signal actually is, per its specification.
 *
 * These lines are the per-page differentiator: they name the specific API or
 * packet field, so the 15 pages open with 15 different sentences rather than a
 * shared template. Every claim is drawn from the platform documentation or the
 * cited publication — see the module header.
 */
const role: Record<string, Record<FingerprintCopyLocale, string>> = {
	canvas: {
		"zh-cn": "Canvas fingerprinting 依赖 HTMLCanvasElement：脚本把文字或图形绘制到画布，再读取 getImageData() 返回的像素值，同一段绘制代码在不同显卡驱动、光栅化实现和系统字体下会得到略有差异的像素。",
		en: "Canvas fingerprinting relies on HTMLCanvasElement: a script draws text or shapes onto a canvas and reads back the pixels returned by getImageData(). The same drawing code yields slightly different pixels across graphics drivers, rasterisation implementations and system fonts."
	},
	webgl: {
		"zh-cn": "WebGL fingerprinting 读取 WebGL 上下文返回的参数，例如通过 WEBGL_debug_renderer_info 扩展取得的 UNMASKED_RENDERER_WEBGL，以及着色器精度和渲染输出的哈希值。",
		en: "WebGL fingerprinting reads parameters returned by a WebGL context, such as UNMASKED_RENDERER_WEBGL obtained through the WEBGL_debug_renderer_info extension, plus shader precision values and hashes of rendered output."
	},
	"audio-context": {
		"zh-cn": "AudioContext fingerprinting 用 OfflineAudioContext 渲染一段固定音频图，再读取分析节点的浮点输出；不同系统的音频实现与驱动在精度和舍入上的差异会体现在这些数值里。",
		en: "AudioContext fingerprinting renders a fixed audio graph in an OfflineAudioContext and reads floating-point output from an analysis node. Differences in precision and rounding between audio implementations and drivers show up in those values."
	},
	fonts: {
		"zh-cn": "Font fingerprinting 通过比较文字在不同字体下的渲染宽度来推断系统安装了哪些字体，常见做法是用 canvas measureText 或元素尺寸配合字体回退列表逐个试探。",
		en: "Font fingerprinting infers which fonts are installed by comparing how text measures under different typefaces. The usual approach is canvas measureText or element dimensions probed against a list of fallback fonts."
	},
	"client-rects": {
		"zh-cn": "ClientRects 利用 Element.getClientRects() 返回的边界矩形，这些矩形带有亚像素精度，其取值受到文本抗锯齿、缩放比例、字体和字距设置的影响。",
		en: "ClientRects uses the bounding rectangles returned by Element.getClientRects(). They carry sub-pixel precision, and their values are shaped by text anti-aliasing, zoom level, fonts and letter-spacing settings."
	},
	webrtc: {
		"zh-cn": "WebRTC exposure 指 RTCPeerConnection 在收集 ICE candidate 时可能暴露本机网络地址；现代浏览器默认使用 mDNS 形式的候选地址来减少直接暴露。",
		en: "WebRTC exposure refers to RTCPeerConnection potentially revealing local network addresses while gathering ICE candidates. Modern browsers default to mDNS-form candidates to reduce direct exposure."
	},
	dns: {
		"zh-cn": "DNS exposure 指浏览器发起的解析请求可能绕过系统预期的解析路径，例如预解析行为，或 WebRTC 与页面脚本触发的额外解析，使实际使用的解析器与系统配置不一致。",
		en: "DNS exposure means resolution requests may bypass the resolver path the system is configured to use — for example pre-resolution behaviour, or extra lookups triggered by WebRTC and page scripts — so the resolver actually in use differs from the configured one."
	},
	tls: {
		"zh-cn": "TLS fingerprinting 在握手阶段读取 ClientHello 中明文传输的字段，包括协议版本、密码套件列表、扩展列表、支持的曲线与点格式，服务端无需解密任何应用数据即可完成。",
		en: "TLS fingerprinting reads the fields sent in clear text in the ClientHello during the handshake, including protocol version, cipher suite list, extension list, supported groups and point formats. The server needs no application data decryption to do it."
	},
	"ja3-ja4": {
		"zh-cn": "JA3 与 JA4 是把 ClientHello 的部分字段拼接后取哈希得到的客户端标签：JA3 由 Salesforce 在 2017 年发布并使用 MD5；JA4 由 FoxIO 在 2023 年发布，先排序再哈希以抵抗扩展顺序随机化，并附带可读的元数据段。",
		en: "JA3 and JA4 are client labels produced by concatenating and hashing selected ClientHello fields. JA3 was published by Salesforce in 2017 and uses MD5; JA4 was published by FoxIO in 2023, sorts before hashing so extension-order randomisation does not change the result, and prepends a readable metadata section."
	},
	timezone: {
		"zh-cn": "Timezone consistency 通过 Intl.DateTimeFormat().resolvedOptions().timeZone 读取时区标识，该值由浏览器推导，可能与操作系统设置、IP 归属地或账号常用时区并不一致。",
		en: "Timezone consistency reads the zone identifier through Intl.DateTimeFormat().resolvedOptions().timeZone. The browser derives that value, and it can disagree with the operating system setting, the IP geolocation or the timezone an account normally uses."
	},
	language: {
		"zh-cn": "Language consistency 涉及 navigator.languages、Intl 协商结果与 HTTP Accept-Language 请求头，这些值分别来自浏览器界面设置、页面脚本指定和请求头，可能互相矛盾。",
		en: "Language consistency covers navigator.languages, the Intl resolution result and the HTTP Accept-Language header. They come from browser UI settings, page-script directives and request headers respectively, and can contradict each other."
	},
	hardware: {
		"zh-cn": "Hardware concurrency and memory 读取 navigator.hardwareConcurrency 与 navigator.deviceMemory，前者是逻辑处理器数量，后者是按档位量化的近似值，都属于粗粒度而非唯一标识。",
		en: "Hardware concurrency and memory read navigator.hardwareConcurrency and navigator.deviceMemory. The first is a logical processor count, the second a bucketed approximation of RAM — both are coarse values, not unique identifiers."
	},
	workers: {
		"zh-cn": "Worker-exposed signals 指在 Web Worker 或 SharedWorker 环境中同样可以读取的运行时属性，包括部分 navigator 对象与定时器精度，因此隔离执行并不等于隔离可观测信号。",
		en: "Worker-exposed signals are runtime properties that remain readable inside a Web Worker or SharedWorker, including parts of the navigator object and timer precision. Isolated execution therefore does not mean isolated observable signals."
	},
	storage: {
		"zh-cn": "Cookie and storage isolation 关注同一浏览器配置下不同站点的 Cookie、LocalStorage、IndexedDB 与缓存是否按源隔离，这决定多个身份在同一浏览器里会不会互相可见。",
		en: "Cookie and storage isolation concerns whether cookies, localStorage, IndexedDB and caches are separated per origin within one browser profile — which decides whether two identities in the same browser can see each other."
	},
	extensions: {
		"zh-cn": "Extension exposure 指浏览器扩展向页面注入的对象或修改过的行为，这些痕迹可能改变页面可读取的属性集合，因此在同一浏览器版本上安装了不同扩展会得到不同结果。",
		en: "Extension exposure refers to objects extensions inject into the page or behaviour they modify. These traces can change the set of properties a page can read, so installing different extensions on the same browser build yields different results."
	}
};

/**
 * Category-level explanatory copy. Each category in
 * `catalog/technologies.json` gets the same four-section structure so the page
 * reads consistently, while `role` above keeps the opening line specific.
 */
const categoryCopy: Record<string, Record<FingerprintCopyLocale, FingerprintSection[]>> = {
	rendering: {
		"zh-cn": [
			{ heading: "这个信号如何产生", body: "渲染类信号依赖浏览器把代码变成像素或采样值的过程。同样的绘制指令，在不同的显卡驱动、GPU、光栅化实现、系统字体与抗锯齿设置下会得到不完全相同的结果，于是这些结果可以被拼接成一个用于比较的标识。\n\n这类信号的特点是「间接」：它不直接报告硬件型号，而是报告当前渲染管线输出的可重复特征。因此它的稳定性取决于整条链路是否稳定，任何一环变化都会改变最终结果。" },
			{ heading: "如何观察与交叉验证", body: "在同一个浏览器配置内重复执行同一段代码，确认结果是否稳定——不稳定的结果说明环境在变化，而不是说明设备不同。\n\n然后更换一个维度交叉观察：渲染结果的变化如果和 WebGL 报告的渲染器信息对不上，通常意味着其中一层被改写过。\n\n记录测试时的浏览器版本、操作系统、显卡驱动和缩放设置。这些条件不记录，后续就无法复现。公开检测页面只是采样工具，各家采样实现不同，读数不必完全一致。" },
			{ heading: "常见误区", body: "- 把渲染哈希值当作唯一标识。它是多项特征之一，单项相同不说明环境相同。\n- 认为哈希值每次都变就等于被识别，变化也可能只是驱动或缩放设置不同。\n- 只在干净浏览器里测试，没有记录对照环境。\n- 把某个公开检测页面的读数当作通用结论，不同页面采样的 API 组合并不相同。\n- 忽略缩放与字体渲染设置，这两项在高分屏上对结果影响明显。" },
			{ heading: "把观察结果用于判断前", body: "单一信号只能说明「这一层输出是什么样」，不能直接得出环境是否真实或是否被识别的结论。多个信号互相矛盾时才有分析价值。\n\n以你自己运营或有权测试的系统为范围，合规使用这些信号，不要用于绕过第三方网站的访问控制。\n\n浏览器实现会随版本变化，本页描述基于编写时可查的公开文档。复核日期：" + fingerprintSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "How this signal is produced", body: "Rendering signals depend on the process that turns code into pixels or sample values. The same drawing instructions produce slightly different results across graphics drivers, GPUs, rasterisation implementations, system fonts and anti-aliasing settings, so those results can be combined into a value used for comparison.\n\nThese signals are indirect: they do not report a hardware model, they report a repeatable characteristic of the current rendering pipeline. Stability therefore depends on the whole chain being stable — a change anywhere in it changes the result." },
			{ heading: "How to observe and cross-check it", body: "Run the same code repeatedly inside one browser profile and check whether the result is stable. An unstable result means the environment is changing, not that the device differs.\n\nThen cross-check against another dimension. If a rendering result disagrees with the renderer information reported by WebGL, it usually means one of the two layers has been altered.\n\nRecord the browser version, operating system, graphics driver and display scaling used for the test. Without those conditions a later run cannot be reproduced. Public detection pages are sampling tools — implementations differ, so readings need not match exactly." },
			{ heading: "Common mistakes", body: "- Treating a rendering hash as a unique identifier. It is one feature among several; matching values do not prove the environments match.\n- Assuming a hash that changes every run means the client was detected; it may just be a different driver or scaling setting.\n- Testing only in a clean browser with no reference environment recorded.\n- Taking one public detection page's reading as a general conclusion; different pages sample different API combinations.\n- Ignoring display scaling and font rendering settings, which matter noticeably on high-DPI screens." },
			{ heading: "Before drawing conclusions", body: "A single signal only tells you what one layer outputs. Analytical value comes from disagreement between signals, not from any one of them alone.\n\nUse these signals within systems you operate or are authorised to test, and not to bypass access controls on third-party sites.\n\nBrowser implementations change between versions; this page is based on public documentation available when written. Reviewed: " + fingerprintSectionsReviewedOn + "." }
		]
	},
	device: {
		"zh-cn": [
			{ heading: "这个信号如何产生", body: "设备类信号来自两类来源：一类是操作系统或浏览器主动报告的属性值，另一类是页面通过测量间接推断出的结果——例如某种字体的实际渲染宽度、某段文本的行高与换行位置。\n\n前者的定义写在接口规范里，后者的结果取决于渲染实现。两者都不指向某台具体设备，而是描述「这类环境通常长什么样」，因此在同型号设备上会大量重复。" },
			{ heading: "如何观察与交叉验证", body: "先确认属性是直接读取还是测量推断——两者的稳定性差别很大。接口规范定义的属性通常稳定，而测量结果会随缩放、字体和主题设置变化。\n\n其次注意取值粒度。像 navigator.deviceMemory 这类字段返回的是按档位量化的近似值，不是精确内存，读到 8 不代表就是 8GB。\n\n最后做减法测试：在同一台机器上逐项关闭或改变相关设置，观察哪些信号随之变化，可以判断哪些是设置驱动、哪些是硬件驱动。相关检测工具页面可以帮助定位具体是哪一项发生变化。" },
			{ heading: "常见误区", body: "- 把粗粒度字段当作精确读数，例如把 deviceMemory 的档位值当成实际内存。\n- 认为同一型号设备上的相同取值就代表是同一台机器，这类字段在同型号设备上大量重复。\n- 在缩放或主题设置不同的两台机器上直接比较测量类结果。\n- 只测一次，浏览器更新会改变属性集合与可用接口。\n- 把「读取成功」理解为「值可信」，两者是不同的判断。" },
			{ heading: "把观察结果用于判断前", body: "设备类信号几乎总是需要和其他维度一起看，单独出现的含义很有限。\n\n如果你在对比多个环境，把「哪些设置被改动过」记录下来，比记录「读数是多少」更有解释力。\n\n本页只描述公开接口的行为，不涉及任何具体产品的指纹库实现。请在你有权测试的范围内使用。复核日期：" + fingerprintSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "How this signal is produced", body: "Device signals come from two kinds of source. One is an attribute the operating system or browser reports directly. The other is something the page infers by measuring — the rendered width of a font, the line height and wrap positions of a block of text.\n\nThe first kind is defined in interface specifications; the second depends on the rendering implementation. Neither points at a specific machine. Both describe what an environment of this kind usually looks like, which is why values repeat heavily across devices of the same model." },
			{ heading: "How to observe and cross-check it", body: "First establish whether a value is read directly or inferred by measurement — their stability differs sharply. Specification-defined attributes are usually stable, while measurements shift with scaling, fonts and theme settings.\n\nNext, notice the granularity. Fields such as navigator.deviceMemory return a bucketed approximation, not an exact figure; reading 8 does not mean 8 GB.\n\nFinally run a subtraction test: on one machine, change or disable the relevant settings one at a time and watch which signals move. That separates setting-driven values from hardware-driven ones. The related detection tool pages help identify which specific item changed." },
			{ heading: "Common mistakes", body: "- Treating a coarse field as an exact reading, for example reading a deviceMemory bucket as real RAM.\n- Assuming the same value on two devices of the same model means it is the same machine; these fields repeat heavily.\n- Comparing measured results across machines with different display scaling or theme settings.\n- Testing once, while browser updates change both the attribute set and the available interfaces.\n- Reading \"the value was returned\" as \"the value is trustworthy\" — those are different claims." },
			{ heading: "Before drawing conclusions", body: "Device signals almost always need to be read alongside other dimensions; on their own they carry limited meaning.\n\nWhen comparing environments, recording which settings were changed is more explanatory than recording the readings themselves.\n\nThis page describes the behaviour of public interfaces only, and does not describe any vendor's fingerprint database. Use it within environments you are authorised to test. Reviewed: " + fingerprintSectionsReviewedOn + "." }
		]
	},
	layout: {
		"zh-cn": [
			{ heading: "这个信号如何产生", body: "布局类信号测量的是文字与元素在页面上的几何位置，而不是任何一项声明的属性。相关接口返回的矩形带亚像素精度，其结果由字体度量、抗锯齿方式、缩放比例和字距设置共同决定。\n\n因此这类信号无法单独归因：任何一项设置变化都会改变结果，而结果本身不指明是哪一项变了。" },
			{ heading: "如何观察与交叉验证", body: "在同一浏览器配置内重复测量，确认稳定性。如果读数随时间或页面状态变化，说明测量环境本身不稳定。\n\n改变一项设置再测一次——例如调整缩放比例或字体大小——观察读数变化的方向和幅度是否符合预期。不符合预期时，通常意味着还有别的因素在起作用。\n\n测量时要注意元素必须实际完成布局，未完成布局时接口可能返回空矩形。相关工具页面可以帮助确认被测元素处于已布局状态。" },
			{ heading: "常见误区", body: "- 期待这类信号能对应到某台具体设备，它只反映当前渲染管线的度量结果。\n- 在页面尚未完成布局时测量，得到空值就认为信号不存在。\n- 在不同缩放比例的两台机器上直接比较读数。\n- 把亚像素精度读数当作稳定值，实际上它对字体与缩放极其敏感。\n- 忽略系统字体回退顺序，同一段文字在不同机器上可能由不同字体绘制。" },
			{ heading: "把观察结果用于判断前", body: "布局类信号通常作为交叉验证材料使用，而不是独立判断依据。\n\n记录测试条件时，把字体、缩放比例和窗口尺寸一并记下，缺一项就无法复现。\n\n本页描述的是浏览器通用接口行为，不针对任何具体检测服务。请在你有权测试的环境中合规使用。复核日期：" + fingerprintSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "How this signal is produced", body: "Layout signals measure the geometry of text and elements on the page rather than any declared attribute. The relevant interfaces return rectangles with sub-pixel precision, and the result is jointly determined by font metrics, anti-aliasing, display scaling and letter-spacing.\n\nBecause of that, these signals cannot be attributed on their own: any single setting change moves the result, and the result does not indicate which setting changed." },
			{ heading: "How to observe and cross-check it", body: "Repeat the measurement inside one browser profile and confirm stability. If readings change over time or with page state, the measurement environment itself is unstable.\n\nChange one setting and measure again — adjust scaling or font size — and check whether the direction and magnitude match expectations. When they do not, another factor is usually involved.\n\nBe careful that the element has actually been laid out; interfaces can return empty rectangles before layout completes. The related tool pages can help confirm the element is in a laid-out state." },
			{ heading: "Common mistakes", body: "- Expecting these signals to map to a specific device; they reflect the current rendering pipeline's metrics only.\n- Measuring before layout completes and concluding from the empty value that the signal is absent.\n- Comparing readings across machines with different display scaling.\n- Treating sub-pixel readings as stable values, when they are highly sensitive to fonts and scaling.\n- Overlooking system font fallback order, since the same text may be painted by different fonts on different machines." },
			{ heading: "Before drawing conclusions", body: "Layout signals are cross-check material rather than a basis for judgement on their own.\n\nWhen recording test conditions, note fonts, scaling and window size as well — omitting any one of them prevents reproduction.\n\nThis page describes general browser interface behaviour and targets no specific detection service. Use it responsibly in environments you are authorised to test. Reviewed: " + fingerprintSectionsReviewedOn + "." }
		]
	},
	network: {
		"zh-cn": [
			{ heading: "这个信号如何产生", body: "网络类信号分为两种。一种是浏览器主动发起的网络行为，例如 WebRTC 收集候选地址、页面触发 DNS 预解析；另一种是协议握手本身携带的字段，例如 TLS ClientHello 和 HTTP/2 的 SETTINGS 帧，这些在应用数据加密之前就以明文出现在链路上。\n\n第二种尤其值得注意：它在 JavaScript 执行之前就已经产生，因此调整页面内的浏览器属性不会改变它。" },
			{ heading: "如何观察与交叉验证", body: "握手类信号可以在服务端或链路上的观测点采集，不需要解密内容；浏览器端能看到的通常只是协商结果，而不是完整的 ClientHello 字段列表。\n\n关键在于分层交叉验证。把 TLS 层报告的客户端类型与 HTTP/2 层的 SETTINGS 参数、TCP 层的栈特征放在一起看：如果某一层显示的是浏览器而另一层显示的是脚本库，那么这几层描述的并不是同一个客户端。\n\n注意 JA3 与 JA4 的关系。JA3 由 Salesforce 在 2017 年发布，使用 MD5 并保留扩展原始顺序；自 2023 年起 Chrome 等浏览器会在每次连接时打乱扩展顺序，JA4 由 FoxIO 在 2023 年发布，改为先排序再哈希并附加可读元数据，因而对顺序随机化保持稳定。测试时先确认工具输出的是哪一种。代理接入点还可能由代理软件而非浏览器完成 TLS 握手，这会改变该层看到的结果。" },
			{ heading: "常见误区", body: "- 以为调整 User-Agent 或页面内属性就能改变握手层结果，握手在页面脚本运行前已经完成。\n- 用 JA3 判断现代浏览器。扩展顺序随机化之后 JA3 已不适合作为稳定标签，应看排序稳定的 JA4 及配套分层信号。\n- 只看单一层的指纹就下结论，跨层矛盾才是有价值的观察。\n- 忽略代理的影响，握手可能由代理软件发起而不是浏览器。\n- 认为采集握手字段需要解密内容，它在加密开始前就是明文。" },
			{ heading: "把观察结果用于判断前", body: "网络层指纹只能说明「发起连接的客户端软件呈现了什么特征」，不能单独得出任何结论。合法的冷门客户端也会呈现不常见的标签。\n\n分层判断的价值在于交叉验证，而不是逐层匹配已知清单。请在你有权运营或测试的系统范围内使用，不要用于规避第三方网站的访问控制。\n\n本页引用的规范与发布时间点为编写时可查的公开资料。复核日期：" + fingerprintSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "How this signal is produced", body: "Network signals come in two kinds. One is network behaviour the browser initiates, such as WebRTC gathering candidates or a page triggering DNS pre-resolution. The other is the fields the protocol handshake itself carries, such as the TLS ClientHello and the HTTP/2 SETTINGS frame — these appear in clear text on the wire before any application data is encrypted.\n\nThe second kind matters most here: it is produced before JavaScript runs, so changing browser attributes inside the page does not affect it." },
			{ heading: "How to observe and cross-check it", body: "Handshake signals can be collected server-side or at a point on the link, with no decryption required. What the browser can usually see is the negotiation outcome, not the full ClientHello field list.\n\nLayered cross-checking is what matters. Compare the client type reported at the TLS layer with the HTTP/2 SETTINGS parameters and the TCP stack characteristics: if one layer shows a browser while another shows a scripting library, those layers are not describing the same client.\n\nNote how JA3 and JA4 relate. JA3 was published by Salesforce in 2017, uses MD5 and preserves the original extension order. From 2023, browsers such as Chrome began shuffling extension order on each connection; JA4 was published by FoxIO in 2023, sorts before hashing and prepends readable metadata, so it stays stable under order randomisation. Check which one a tool actually outputs before comparing results. A proxy hop may also complete the TLS handshake using proxy software rather than the browser, which changes what that layer observes." },
			{ heading: "Common mistakes", body: "- Assuming a User-Agent change or in-page attribute alters the handshake layer; the handshake completes before page scripts run.\n- Using JA3 to judge modern browsers. After extension-order randomisation, JA3 is no longer a stable label — look at the sort-stable JA4 and the accompanying layered signals.\n- Drawing conclusions from one layer's fingerprint alone; disagreement across layers is the useful observation.\n- Ignoring the proxy, when the handshake may originate from proxy software rather than the browser.\n- Believing collecting handshake fields requires decryption; they are clear text before encryption starts." },
			{ heading: "Before drawing conclusions", body: "A network-layer fingerprint only describes what the connecting client software looks like; it supports no conclusion on its own. Legitimate uncommon clients also present unusual labels.\n\nThe value of a layered approach is cross-verification, not matching each layer against a known list. Use it within systems you operate or are authorised to test, and not to circumvent access controls on third-party sites.\n\nThe specifications and publication dates cited here are publicly documented as of writing. Reviewed: " + fingerprintSectionsReviewedOn + "." }
		]
	},
	locale: {
		"zh-cn": [
			{ heading: "这个信号如何产生", body: "区域设置类信号来自三个相互独立的位置：浏览器界面设置（影响 navigator.languages）、操作系统与运行时环境（影响时区推导），以及请求头（Accept-Language 由页面或浏览器生成）。\n\n三者的配置入口不同，更新时机也不同，因此出现不一致是常态而不是例外。关键不在于某一个值本身，而在于它们之间是否吻合。" },
			{ heading: "如何观察与交叉验证", body: "把三个位置的值分别取出来并列比较，而不是单独看任何一个。语言列表、时区标识和请求头三者指向同一地区，通常说明配置是一致的。\n\n时区值由浏览器推导，可能与操作系统设置不同，也可能因系统设置未同步而与实际使用习惯不同。语言列表与请求头也可能不一致，因为页面可以通过 Intl 指定语言。\n\n改变一项设置后重新读取全部三个值，可以判断是哪一处在起作用。这比只改一项然后只看一个结果更能定位问题。相关检测工具页面可作为取值的参考，但不同页面采集的项目不同，读数不必完全一致。" },
			{ heading: "常见误区", body: "- 把某一个值正确当作整体一致，时区正确不代表语言和请求头也一致。\n- 只改一项设置就下结论，单点改动无法说明整组配置的关系。\n- 认为 IP 归属地就等于浏览器时区，两者是不同来源且可能不同步。\n- 忽略页面脚本可以通过 Intl 指定语言这件事，脚本能改变协商结果。\n- 用不同检测页面的读数直接比较，它们采集的项目并不相同。" },
			{ heading: "把观察结果用于判断前", body: "区域设置信号的价值在于交叉比对，单项几乎没有解释力。\n\n记录时请写清每个值的来源（设置项、请求头还是推导结果），否则后续无法判断它变化的原因。\n\n本页描述的是浏览器与 HTTP 规范定义的行为。请在你有权测试的环境中合规使用，不要用于规避第三方网站的地域限制。复核日期：" + fingerprintSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "How this signal is produced", body: "Locale signals come from three independent places: browser UI settings (which affect navigator.languages), the operating system and runtime environment (which affect timezone derivation), and request headers (Accept-Language, generated by the page or the browser).\n\nEach has its own configuration surface and its own update timing, so inconsistency is normal rather than exceptional. What matters is not any single value but whether they agree with each other." },
			{ heading: "How to observe and cross-check it", body: "Pull all three values out and compare them side by side rather than examining any one alone. When the language list, timezone identifier and request headers all point at the same region, the configuration is coherent.\n\nThe timezone value is derived by the browser and can differ from the OS setting, or lag behind actual usage habits if the OS setting was never synchronised. The language list and the request header can also disagree, because a page can specify a language through Intl.\n\nChange one setting and re-read all three values to see which location is actually driving it. That locates problems better than changing one thing and reading one result. The related detection tool pages are a reasonable reference for values, but they collect different items, so readings need not match exactly." },
			{ heading: "Common mistakes", body: "- Treating one correct value as overall coherence; a correct timezone says nothing about language or headers.\n- Changing a single setting and drawing conclusions; a one-point change cannot explain how the whole group relates.\n- Assuming IP geolocation equals browser timezone — different sources, possibly out of sync.\n- Overlooking that page scripts can specify a language through Intl and change the negotiated result.\n- Comparing readings from different detection pages directly, since they collect different items." },
			{ heading: "Before drawing conclusions", body: "Locale signals earn their value through cross-comparison; individually they explain almost nothing.\n\nWhen recording, note where each value came from — a settings panel, a request header or a derived result — otherwise a later change cannot be explained.\n\nThis page describes behaviour defined by browser and HTTP specifications. Use it within environments you are authorised to test, and not to work around third-party geographic restrictions. Reviewed: " + fingerprintSectionsReviewedOn + "." }
		]
	},
	browser: {
		"zh-cn": [
			{ heading: "这个信号如何产生", body: "浏览器行为类信号的共同点是：它们不来自某一个专门接口，而是来自多个来源叠加后的整体状态。比如扩展会向页面注入对象、Worker 环境能读到部分与主线程相同的属性、存储隔离则取决于浏览器的分区实现。\n\n因此这类信号通常不能单独归因，含义来自组合方式。" },
			{ heading: "如何观察与交叉验证", body: "先建立基线。在一个已知干净的环境里记录全部可读属性，然后用同一浏览器版本逐一改变扩展、配置和存储状态，看哪些属性跟着变化。能跟着变化的部分就是被这些因素影响的。\n\nWorker 环境要单独测。隔离执行不等于隔离信号，部分属性在 Worker 中同样可读，其取值也参与判断。\n\n存储隔离要在同一浏览器配置内跨两个站点测试，共享与隔离的差别只有这样才能观察到。相关检测工具页面可以帮助列出可枚举的属性项，但各页面枚举范围不同。" },
			{ heading: "常见误区", body: "- 认为在 Worker 中运行就隔离了可观测信号，部分属性仍然可读。\n- 在同一浏览器里只测一个站点，观察不到存储是否按源隔离。\n- 假设同一浏览器版本结果一定相同，安装扩展与设置变化都会改变结果。\n- 把「读取不到某属性」直接当作环境异常，空结果也可能是正常的权限限制。\n- 长期沿用一次性测试结果，浏览器版本的属性集合会变。" },
			{ heading: "把观察结果用于判断前", body: "浏览器行为类信号反映的是配置与使用痕迹的组合，无法单独指向某个具体结论。\n\n做记录时把「改了什么」和「结果如何变化」成对保存，这比保存单个读数更有复用价值。\n\n本页描述的是浏览器通用行为，不涉及任何厂商实现细节。请在你有权测试的环境中合规使用。复核日期：" + fingerprintSectionsReviewedOn + "。" }
		],
		en: [
			{ heading: "How this signal is produced", body: "What browser-behaviour signals share is that none comes from a single dedicated interface. Each emerges from several sources combined: extensions inject objects into the page, a Worker context can read some of the same attributes as the main thread, and storage isolation depends on how the browser partitions data.\n\nFor that reason these signals cannot be attributed on their own — their meaning comes from how they combine." },
			{ heading: "How to observe and cross-check it", body: "Establish a baseline first. In a known-clean environment, record every readable property, then on the same browser version change extensions, settings and storage state one at a time and note which properties move with them. Whatever moves is what those factors influence.\n\nTest the Worker context separately. Isolated execution is not isolated observability — some properties remain readable inside a Worker, and their values count too.\n\nStorage isolation must be tested across two sites inside one browser profile; the difference between shared and partitioned is only observable that way. The related detection tool pages can help enumerate readable properties, but their enumeration scope differs between pages." },
			{ heading: "Common mistakes", body: "- Assuming that running inside a Worker isolates observable signals; some properties remain readable.\n- Testing a single site in one browser, which cannot reveal whether storage is partitioned per origin.\n- Assuming results are identical on the same browser version; installed extensions and settings both change them.\n- Treating a property that cannot be read as an environment anomaly straight away; an empty result can be a normal permission limit.\n- Reusing a one-off test result indefinitely, while the attribute set changes between browser versions." },
			{ heading: "Before drawing conclusions", body: "Browser-behaviour signals reflect a combination of configuration and usage traces, and point at no specific conclusion on their own.\n\nWhen recording, save what you changed together with how the result moved. That pairing is far more reusable than a single reading.\n\nThis page describes general browser behaviour and no vendor implementation detail. Use it responsibly in environments you are authorised to test. Reviewed: " + fingerprintSectionsReviewedOn + "." }
		]
	}
};

export type FingerprintSectionInput = {
	name: string;
	slug: string;
	category: string;
};

/**
 * First sentence of the signal's own `role` line, used to build the meta
 * description.
 *
 * Previously every fingerprint page shipped the same template with only the
 * signal name swapped in ("X is a browser fingerprint signal used to study
 * rendering, device, language, network or storage consistency"), so 15 pages
 * in 7 locales differed by a few characters. Leading with the sentence that
 * names the actual API or packet field makes each description describe its own
 * signal, which is the part a search result is actually judged on.
 *
 * The sentence is truncated on a sentence boundary, never mid-word.
 */
export function fingerprintSignalSummary(slug: string, locale: string): string {
	const copyLocale: FingerprintCopyLocale = FULL_COPY_LOCALES.includes(locale as FingerprintCopyLocale) ? (locale as FingerprintCopyLocale) : "en";
	const line = role[slug]?.[copyLocale] ?? "";
	const sentence = line.split(/(?<=。)|(?<=\.)\s/)[0]?.trim() ?? "";
	return sentence;
}

/**
 * Build the four sections for one fingerprint signal page.
 *
 * The opening line names the specific signal and its API or packet field; the
 * remaining copy explains the category it belongs to. Nothing here asserts a
 * detection result, a vendor threshold or a product capability — only how the
 * signal is produced and how it can be observed.
 */
export function fingerprintSectionsFor(item: FingerprintSectionInput, locale: string): FingerprintSection[] {
	const copyLocale: FingerprintCopyLocale = FULL_COPY_LOCALES.includes(locale as FingerprintCopyLocale) ? (locale as FingerprintCopyLocale) : "en";
	const headingsForLocale = fingerprintSectionHeadings(locale);
	const template = categoryCopy[item.category];
	if (!template) return [];
	const sections = template[copyLocale];
	return sections.map((section, index) => {
		const opening = role[item.slug]?.[copyLocale];
		const body = index === 0 && opening ? `${opening}\n\n${section.body}` : section.body;
		return { heading: headingsForLocale[index], body };
	});
}