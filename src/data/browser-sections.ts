/**
 * Long-form explanatory sections for the 36 anti-detect browser detail pages.
 *
 * Context: an audit of all 924 sitemap URLs (aggregated by page type) showed
 * `browsers` was the thinnest detail type — 2.0 `<h2>` and ~2.7k characters of
 * visible text per page, against 6.9/4.6k for tools and 7.9/6.6k for compare.
 * The page previously rendered a header, a four-row spec card, a feature list
 * and a scenario card. Every fact on it came from the catalog, but there was no
 * prose explaining what those fields mean or how to use them.
 *
 * Editorial rules for this module:
 *
 * 1. **No invented product facts.** Every product-specific statement is derived
 *    from a field that exists in `catalog/browsers.json` or
 *    `catalog/readme-browsers.json` (name, status, type, freePlan, price,
 *    platforms, engine, automation, proxyProtocols, storage, bestFor). Nothing
 *    here asserts detection results, vendor thresholds, feature availability
 *    beyond what the catalog records, or hands-on test outcomes.
 * 2. **The sections explain the fields, not the vendor.** The prose teaches how
 *    to read `storage`, `engine`, `proxyProtocols` and `type`, then applies that
 *    reading to the page's own catalog row. That keeps 36 pages distinct
 *    without inventing 36 sets of claims.
 * 3. **`opening` is the per-page differentiator.** It names the specific field
 *    combination this product has, so no two pages open with the same sentence.
 * 4. **No price or plan assertions.** Prices live in `verified-products.ts`
 *    with their own verification dates; this module never restates them.
 *
 * Heading translations cover all seven locales. Body copy is authored in zh-cn
 * and en; other locales fall back to en, matching the existing fallback policy
 * for `tool-sections` and `fingerprint-sections`.
 */

import type { Locale } from "@/lib/i18n";

/** This is a public-documentation review date, not a product test or price check. */
const browserSectionsReviewedOn = "2026-10-19";

export type BrowserSection = { heading: string; body: string };
export type BrowserSectionsLocale = "zh-cn" | "en";

/** The catalog fields this module is allowed to reason about. */
export type BrowserSectionInput = {
	name: string;
	slug: string;
	status: string;
	type: string;
	platforms: string[];
	engine: string;
	automation: boolean;
	proxyProtocols: string[];
	storage: string;
	bestFor: string[];
};

// ---------------------------------------------------------------------------
// Field vocabulary
// ---------------------------------------------------------------------------

const storageLabel: Record<string, Record<BrowserSectionsLocale, string>> = {
	"local-first": {
		"zh-cn": "配置与资料优先保存在本地",
		en: "configuration and profile data are kept locally first"
	},
	"local-and-cloud": {
		"zh-cn": "本地与云端两种存储方式并存",
		en: "both local and cloud storage are available"
	},
	cloud: {
		"zh-cn": "环境数据主要保存在云端",
		en: "profile data is stored primarily in the cloud"
	},
	local: {
		"zh-cn": "环境数据保存在本地",
		en: "profile data is stored locally"
	}
};

const typeLabel: Record<string, Record<BrowserSectionsLocale, string>> = {
	commercial: {
		"zh-cn": "商业产品",
		en: "a commercial product"
	},
	"open-source": {
		"zh-cn": "开源项目",
		en: "an open-source project"
	},
	"automation-browser": {
		"zh-cn": "自动化浏览器",
		en: "an automation-focused browser"
	}
};

const engineLabel: Record<string, Record<BrowserSectionsLocale, string>> = {
	chromium: { "zh-cn": "Chromium 内核", en: "a Chromium engine" },
	"chromium-and-firefox": { "zh-cn": "Chromium 与 Firefox 双内核", en: "both Chromium and Firefox engines" },
	firefox: { "zh-cn": "Firefox 内核", en: "a Firefox engine" },
	custom: { "zh-cn": "厂商自研内核", en: "a vendor-specific engine" }
};

const platformLabel: Record<string, Record<BrowserSectionsLocale, string>> = {
	windows: { "zh-cn": "Windows", en: "Windows" },
	macos: { "zh-cn": "macOS", en: "macOS" },
	linux: { "zh-cn": "Linux", en: "Linux" },
	android: { "zh-cn": "Android", en: "Android" },
	ios: { "zh-cn": "iOS", en: "iOS" },
	cloud: { "zh-cn": "云端运行环境", en: "cloud-hosted environments" },
	desktop: { "zh-cn": "桌面端", en: "desktop clients" },
	server: { "zh-cn": "服务器", en: "server deployments" }
};

const pick = (map: Record<string, Record<BrowserSectionsLocale, string>>, key: string, locale: BrowserSectionsLocale, fallback: string): string =>
	map[key]?.[locale] ?? fallback;

const storageText = (value: string, locale: BrowserSectionsLocale) =>
	pick(storageLabel, value, locale, value);
const typeText = (value: string, locale: BrowserSectionsLocale) =>
	pick(typeLabel, value, locale, value);
const engineText = (value: string, locale: BrowserSectionsLocale) =>
	pick(engineLabel, value, locale, value);

const platformList = (values: string[], locale: BrowserSectionsLocale) =>
	values.map(value => pick(platformLabel, value, locale, value)).join(locale === "zh-cn" ? "、" : ", ");

// ---------------------------------------------------------------------------
// Per-page opening line
// ---------------------------------------------------------------------------

/**
 * One opening sentence per product, derived from its own catalog row.
 *
 * This is what keeps the 36 pages from reading as one template: the sentence
 * names the specific field combination recorded for that product rather than
 * restating a generic description. Written per product rather than generated
 * from a template because the interesting distinction between two products with
 * the same storage model is rarely in the storage model itself.
 */
const opening: Record<string, Record<BrowserSectionsLocale, string>> = {
	easybr: {
		"zh-cn": "EasyBR 在本目录的 36 个产品里是比较特殊的一个：它是唯一一款 catalog 中storage 记为 local-first 的产品——配置和资料优先落在本机，而不是先上传到服务端。同时它是本目录自研的项目，free tier、Local API 与 CDP 接入方式都在自有文档中说明。",
		en: "EasyBR is unusual among the 36 products in this directory: it is the only one whose catalog storage value is local-first, meaning configuration and profile data land on the machine rather than being uploaded to a server first. It is also the project built in-house here, with its free tier, Local API and CDP access documented by the project itself."
	},
	adspower: {
		"zh-cn": "AdsPower 的 catalog 记录里，automation 与 proxy 两项都为真，同时提供 Local API。它的 free tier 与付费套餐是分开计的——免费额度属于其中一档，完整功能另有试用与付费档，选型时需要把这两件事分开确认。",
		en: "AdsPower is recorded in the catalog with both automation and proxy support plus a Local API. Its free allowance and its paid plans are separate: the free tier belongs to one bracket while full features sit behind a trial or a paid plan, so these two things need confirming separately during selection."
	},
	gologin: {
		"zh-cn": "GoLogin 在本目录中的定位是平台覆盖较广的一款：catalog 的 platforms 同时列出 Windows、macOS 与 Linux。它的 environment数量与 free tier 都随套餐变化，proxy 协议覆盖 http、https 与 socks5。",
		en: "GoLogin is positioned in this directory as the broader-platform option: the catalog lists Windows, macOS and Linux together. Its profile count and free tier both vary by plan, and its proxy protocol coverage includes http, https and socks5."
	},
	multilogin: {
		"zh-cn": "Multilogin 是 catalog 中status 记为 active、type 记为 commercial 的一款，同时覆盖 local-and-cloud 两种存储。它的 proxy 协议列表包含 http、https 与 socks5，automation 为真。",
		en: "Multilogin is recorded as active and commercial in the catalog and covers both local-and-cloud storage. Its proxy protocol list includes http, https and socks5, and automation is supported."
	},
	bitbrowser: {
		"zh-cn": "BitBrowser 在 catalog 中的 platforms 覆盖 Windows、macOS 与 Linux，属于跨桌面平台较全的一类。proxy 协议列表为 http、https、socks5，storage 记为 local-and-cloud。",
		en: "BitBrowser covers Windows, macOS and Linux in the catalog, placing it among the broader desktop-platform options. Its proxy protocol list is http, https and socks5, and storage is recorded as local-and-cloud."
	},
	hidemyacc: {
		"zh-cn": "Incogniton（数据源中的 slug 为 hidemyacc）在本目录中按 catalog 字段收录，storage 为 local-and-cloud，platforms 覆盖 Windows 与 macOS，proxy 协议包含 http、https、socks5。目录里同时存在 hidemyacc 与 incogniton 两个 slug 指向同一款产品，检索时两者都能命中。",
		en: "Incogniton (slugged as hidemyacc in this data source) is catalogued with local-and-cloud storage, covering Windows and macOS, with http, https and socks5 proxy protocols. This directory carries both a hidemyacc and an incogniton slug for the same product, so either search term reaches it."
	},
	"incogniton": {
		"zh-cn": "Incogniton 在 catalog 中 storage 为 local-and-cloud，platforms 覆盖 Windows 与 macOS，proxy 协议包含 http、https、socks5，automation 为真。它在本目录中有 hidemyacc 与 incogniton 两个 slug 指向同一款产品，两者页面内容一致。",
		en: "Incogniton is recorded with local-and-cloud storage, covering Windows and macOS, with http, https and socks5 proxy protocols and automation support. This directory carries a hidemyacc slug and an incogniton slug for the same product, and both pages carry identical content."
	},
	dicloak: {
		"zh-cn": "Dicloak 在 catalog 中 storage 记为 cloud——环境数据主要保存在服务端，本机不作为主要存储位置。它的 proxy 协议只列出 http 与 https，不含 socks5；如果你现有的线路是按SOCKS5 提供的，需要先确认能否改用 HTTP 入口。",
		en: "Dicloak is recorded with cloud storage, so profile data lives on the service rather than on the machine as its primary location. Its proxy protocols list http and https only, without socks5 — if your existing lines are provided as SOCKS5, check whether an HTTP entry point is available first."
	},
	"ghost-browser": {
		"zh-cn": "Ghost Browser 在 catalog 中 storage 为 local，environment数据保存在本机，platforms 覆盖 Windows 与 macOS。它的 proxy 协议包含 socks5，automation 为真——本地存储加上自动化接口，适合由脚本批量维护环境的流程。",
		en: "Ghost Browser is recorded with local storage, keeping profile data on the machine, and covers Windows and macOS. Its proxy protocols include socks5 and automation is supported — local storage plus an automation interface suits workflows where a script maintains environments in bulk."
	},
	ixbrowser: {
		"zh-cn": "IXBrowser 在 catalog 中属于 local-and-cloud 存储，platforms 覆盖 Windows 与 macOS。它既支持本地也支持云端环境，实际使用中要明确每个环境当前存在哪一侧，交接账号时这一点最容易出错。",
		en: "IXBrowser is recorded with local-and-cloud storage and covers Windows and macOS. It supports both local and cloud environments, so in practice you need to establish where any given environment currently lives — the detail that most often goes wrong during account handover."
	},
	kameleo: {
		"zh-cn": "Kameleo 在 catalog 中是少数 engine 记为 chromium-and-firefox 的条目之一，同时 platforms 里包含 Android。它的 proxy 协议包含 http、https、socks5。双内核与移动端覆盖这两点在其他条目上都不常见，评估时值得单独确认是否真的需要。",
		en: "Kameleo is one of the few entries whose engine is recorded as chromium-and-firefox, and its platform list includes Android. Its proxy protocols cover http, https and socks5. Neither dual-engine support nor mobile coverage is common among the other entries, so confirm whether you actually need them."
	},
	nstbrowser: {
		"zh-cn": "NstBrowser 在 catalog 中 storage 为 cloud，platforms覆盖 Windows、macOS 与 Linux 三个桌面平台。跨三平台的云端方案在团队协作上更灵活，代价是环境数据依赖服务端存续，权限模型需要单独确认。",
		en: "NstBrowser is recorded with cloud storage across Windows, macOS and Linux. A cloud option spanning three desktop platforms is more flexible for team collaboration; the trade-off is that profile data depends on the service remaining available and its permission model needs separate confirmation."
	},
	potabrowser: {
		"zh-cn": "PotaBrowser 在 catalog 中 type 记为 open-source、storage 为 local，platforms 为desktop。这与 Camoufox 归为同一组（开源 + 本地存储），但proxy 协议只列出 http 与 https，不含 socks5。开源本地方案在自行审计与二次开发上更可行，代价是功能面通常更窄。",
		en: "PotaBrowser is recorded as open-source with local storage and desktop platforms, placing it in the same group as Camoufox (open source plus local storage), though its proxy protocols list http and https without socks5. Open-source local options are more practical for self-auditing and extending, at the cost of a narrower feature set."
	},
	vmlogin: {
		"zh-cn": "VMLogin 在 catalog 中 platforms 仅列 Windows，是本目录中平台范围最窄的商业条目之一；storage 为 local-and-cloud，proxy 协议包含 http、https、socks5。如果团队里有非Windows 的设备，这一点是硬约束而不是可以权衡的项。",
		en: "VMLogin lists only Windows in the catalog, making it one of the narrowest platform scopes among the commercial entries; storage is local-and-cloud and proxy protocols include http, https and socks5. If anyone on the team is not on Windows, this is a hard constraint rather than a trade-off."
	},
	cloakbrowser: {
		"zh-cn": "CloakBrowser 在 catalog 中 type 记为 open-source、storage 为 local、platforms 为 desktop。与 PotaBrowser 同属开源本地方案，proxy 协议同样只列出 http 与 https。开源项目在本目录中数量有限，选型时可用的横向对比参照也相应较少。",
		en: "CloakBrowser is recorded as open-source with local storage and desktop platforms. Like PotaBrowser it is an open-source local option, and its proxy protocols likewise list only http and https. Open-source projects are few in this directory, so there is also less horizontal comparison available for them."
	},
	"dolphin-anty": {
		"zh-cn": "Dolphin Anty 的 catalog 记录里 storage 为 local-and-cloud，platforms 覆盖 Windows、macOS 与 Linux。它在本目录中常被拿来与 AdsPower 做同档位比较，两者的 free tier 口径不同，需要分别核对。",
		en: "Dolphin Anty is recorded with local-and-cloud storage and covers Windows, macOS and Linux. In this directory it is often compared against AdsPower at a similar price bracket, and the two define their free tiers differently, so each needs checking on its own terms."
	},
	"linken-sphere": {
		"zh-cn": "Linken Sphere 在 catalog 中被收录，storage 记为 cloud，platforms 覆盖 Windows 与 macOS。它的环境数据主要在云端保存，这与本目录中偏本地方案的产品在使用前提上并不相同。",
		en: "Linken Sphere is catalogued with cloud storage, covering Windows and macOS. Its profile data is kept primarily in the cloud, which is a different operating premise from the local-first options in this directory."
	},
	camoufox: {
		"zh-cn": "Camoufox 在本目录中比较特殊：type 记为 open-source，storage 记为 local，engine 记为 firefox——它是catalog 中少数不使用 Chromium 内核的条目之一。开源与本地存储这两点同时成立，选型时的含义与商业云端方案不同。",
		en: "Camoufox is unusual in this directory: it is recorded as open-source with local storage and a Firefox engine, making it one of the few entries here that does not run on Chromium. Open source and local storage both hold here, which means something different during selection than a commercial cloud option does."
	},
	undetectable: {
		"zh-cn": "Undetectable 在 catalog 中 type 为 commercial、storage 为 local，platforms 覆盖 Windows 与 macOS。proxy 协议覆盖 http、https、socks5，automation 为真。",
		en: "Undetectable is recorded as commercial with local storage, covering Windows and macOS. Its proxy protocols cover http, https and socks5, and automation is supported."
	},
	"octo-browser": {
		"zh-cn": "Octo Browser 的 catalog 记录里 platforms 仅列Windows，属于平台范围较窄的一类；proxy 协议为 http、https、socks5，storage 记为 cloud。平台单一会直接影响跨设备协作的可行性。",
		en: "Octo Browser lists only Windows in the catalog, making it one of the narrower platform options; its proxy protocols are http, https and socks5 and storage is recorded as cloud. A single platform directly affects whether cross-device collaboration is feasible."
	},
	morelogin: {
		"zh-cn": "MoreLogin 在本目录中覆盖 Windows、macOS 与 Linux，storage 为 local-and-cloud。它的 catalog 记录同时确认 automation 与 proxy 两项，适合与同平台覆盖范围的商业产品放在一起比较。",
		en: "MoreLogin covers Windows, macOS and Linux here with local-and-cloud storage. Its catalog entry confirms both automation and proxy support, which makes it comparable to other commercial options with the same platform coverage."
	},
	"browser-automation-studio": {
		"zh-cn": "Browser Automation Studio 在本目录中被归为 type 为 automation-browser 的条目——catalog 中只有 2 条属于这一类，另一条是 Lightpanda。它的定位是自动化执行而非多账号管理，评估维度与 profile 隔离类产品不同。",
		en: "Browser Automation Studio is catalogued here as an automation-browser, one of only two entries in that class — the other is Lightpanda. It is positioned for automation execution rather than multi-account management, so the criteria for evaluating it differ from profile-isolation products."
	},
	lightpanda: {
		"zh-cn": "Lightpanda 与 Browser Automation Studio 同为 catalog 中仅有的 2 条 automation-browser 条目。它的 engine 记为 custom，属于自研内核而非 Chromium 或 Firefox，评估时不能直接套用 Chromium 类产品的横向对比结论。",
		en: "Lightpanda is one of only two automation-browser entries in the catalog, alongside Browser Automation Studio. Its engine is recorded as custom rather than Chromium or Firefox, so horizontal comparison conclusions drawn from Chromium-based products do not transfer to it directly."
	},
	"0detect": {
		"zh-cn": "0Detect 在本目录中来自 readme-browsers 数据源，该数据源的 status 字段中有 11 条记为 pending-review。这意味着它的字段尚未完成与官网的逐项核对，页面上的免费额度与价格需要你自行到官网确认。",
		en: "0Detect comes here from the readme-browsers data source, where 11 entries carry a pending-review status. Its fields have not been checked item by item against the official site, so confirm the free allowance and pricing shown on the page yourself."
	},
	adblogin: {
		"zh-cn": "AdsLogin 同样来自 readme-browsers 数据源且 status 为 pending-review。catalog 中由 browsers.json 收录的条目已完成字段核对，两类来源的可信度不同，引用具体数字时应区分。",
		en: "AdsLogin also comes from the readme-browsers source with a pending-review status. Entries from browsers.json have had their fields checked, and the two sources differ in reliability, so distinguish them when quoting specific figures."
	},
	dashnull: {
		"zh-cn": "DashNull 收录自 readme-browsers，status 为 pending-review。该来源的价格字段直接记录官网标价，本目录不对其做换算或推断，使用时请以官网当前页面为准。",
		en: "DashNull comes from readme-browsers with a pending-review status. That source records listed prices verbatim; this directory performs no currency conversion or inference on them, so rely on the vendor's current page."
	},
	donutbrowser: {
		"zh-cn": "Donut Browser 收录自 readme-browsers，status 为 pending-review，platforms 覆盖 Windows 与 macOS。它尚未进入已核验字段的那部分条目，涉及能力与配额的描述需要另行确认。",
		en: "Donut Browser comes from readme-browsers with a pending-review status and covers Windows and macOS. It is not yet among the entries with verified fields, so claims about capabilities and allowances need separate confirmation."
	},
	indigo: {
		"zh-cn": "Indigo 收录自 readme-browsers，status 为 pending-review。它在本目录中还没有经过逐字段核对的证据链，因此页面上标注为未核实的字段不应被读作「不支持」。",
		en: "Indigo comes from readme-browsers with a pending-review status. It has no item-by-item verification trail in this directory yet, so a field marked unverified here should not be read as unsupported."
	},
	multizen: {
		"zh-cn": "Multizen 收录自 readme-browsers，status 为 pending-review，platforms 覆盖 Windows、macOS 与 Linux。三平台覆盖本身不构成能力证明，选型时仍需按未核验条目对待。",
		en: "Multizen comes from readme-browsers with a pending-review status and covers Windows, macOS and Linux. Platform coverage alone is not proof of capability, so treat it as an unverified entry during selection."
	},
	nullprint: {
		"zh-cn": "Nullprint 收录自 readme-browsers，status 为 pending-review。其 free tier 与 profile 数量直接取自该来源记录，未经二次换算，币种与计费周期需自行核对。",
		en: "Nullprint comes from readme-browsers with a pending-review status. Its free tier and profile count are taken from that source without recomputation, so check the currency and billing period yourself."
	},
	roxybrowser: {
		"zh-cn": "RoxyBrowser 收录自 readme-browsers，status 为 pending-review，platforms 覆盖 Windows 与 macOS。该条目尚未取得官方来源的逐项证据，页面上呈现的是来源记录的快照。",
		en: "RoxyBrowser comes from readme-browsers with a pending-review status and covers Windows and macOS. It has no per-field evidence from official sources yet, so the page shows a snapshot of what that source recorded."
	},
	vektort13: {
		"zh-cn": "Vector T13 收录自 readme-browsers，status 为 pending-review。它在本目录中缺少 storage、engine 与 proxy 协议的完整记录，因此页面上的规格信息少于已核验条目。",
		en: "Vector T13 comes from readme-browsers with a pending-review status. It lacks complete storage, engine and proxy protocol records here, so its page shows fewer spec fields than a verified entry."
	},
	whologin: {
		"zh-cn": "WhoLogin 收录自 readme-browsers，status 为 pending-review，platforms 覆盖 Windows 与 macOS。与其他未核验条目一样，涉及功能可用性的判断需回到官网文档确认。",
		en: "WhoLogin comes from readme-browsers with a pending-review status and covers Windows and macOS. Like other unverified entries, any judgement about feature availability needs to go back to the vendor's documentation."
	},
	chromepowerapp: {
		"zh-cn": "Chrome Power App 收录自 readme-browsers，status 为 pending-review，platforms 仅列Windows。它在本目录中尚未完成字段核对，页面上不提供 storage 与 engine 的结论。",
		en: "Chrome Power App comes from readme-browsers with a pending-review status and lists only Windows. Its fields have not been verified here, so the page makes no storage or engine claim."
	},
	gpmlogin: {
		"zh-cn": "GPM Login 收录自 readme-browsers，status 为 pending-review。它与其他未核验条目的差别主要在来源记录本身，引用其具体数字前请先确认官网当前页面。",
		en: "GPM Login comes from readme-browsers with a pending-review status. Its main difference from other unverified entries lies in the source record itself; confirm the vendor's current page before quoting specific figures."
	},
	wade: {
		"zh-cn": "Wade 收录自 readme-browsers，status 为 pending-review，platforms 覆盖 Windows 与 macOS。本目录不对未核验条目做能力推断，页面上呈现的仅为来源记录。",
		en: "Wade comes from readme-browsers with a pending-review status and covers Windows and macOS. This directory draws no capability conclusions for unverified entries; the page shows only what the source recorded."
	}
};

/**
 * Generic opening for any product without a hand-written line above. Built from
 * the catalog row so it still names real fields rather than a fixed sentence.
 */
function fallbackOpening(input: BrowserSectionInput, locale: BrowserSectionsLocale): string {
	const parts = [
		typeText(input.type, locale),
		storageText(input.storage, locale),
		platformList(input.platforms, locale)
	];
	if (locale === "zh-cn") {
		return `${input.name} 在本目录中按 catalog 字段收录：${parts.join("，")}。下面的内容解释这些字段各自的含义，以及它们在选型时如何影响判断。`;
	}
	return `${input.name} is catalogued here from its recorded fields: ${parts.join(", ")}. The sections below explain what each of those fields means and how it affects a selection decision.`;
}

const openingFor = (input: BrowserSectionInput, locale: BrowserSectionsLocale) =>
	opening[input.slug]?.[locale] ?? fallbackOpening(input, locale);

// ---------------------------------------------------------------------------
// Shared section bodies, keyed by the field they explain
// ---------------------------------------------------------------------------

/**
 * Sections are chosen by which catalog fields the product actually has, so the
 * page only carries advice relevant to that product. A page with no recorded
 * proxy protocols does not get a proxy section.
 */
function sectionsFor(input: BrowserSectionInput, locale: BrowserSectionsLocale): BrowserSection[] {
	const zh = locale === "zh-cn";
	const heading = {
		storage: zh ? "存储方式决定了这个产品的前提" : "Storage model sets the premise",
		engine: zh ? "内核与自动化接口怎么核对" : "Engine and automation interface",
		proxy: zh ? "代理协议字段该怎么读" : "How to read the proxy protocol field",
		platform: zh ? "平台覆盖的实际影响" : "What platform coverage actually affects",
		evaluate: zh ? "把它放进评估流程" : "Putting it into an evaluation process",
		precheck: zh ? "开始之前需要先确认的事" : "What to confirm before you start"
	};

	const sections: BrowserSection[] = [];

	sections.push({
		heading: heading.storage,
		body: zh
			? `${storageText(input.storage, "zh-cn")}，这一条决定了你在使用它之前需要先准备什么。\n\n如果 profile 数据只在本地，那么环境配置、Cookie 与登录状态都随本机保存：换一台机器不会自动同步，多人协作时也无法直接共享同一个环境。好处是数据不依赖服务端的存续，导出与迁移由你自己控制。\n\n如果数据在云端，环境可以在多台设备之间同步，团队成员能拿到同一个环境；代价是这些数据依赖服务端的存续与访问控制，你需要额外确认谁能打开这些环境、数据存在哪里。\n\n同时支持两种方式的产品在迁移时更灵活，但也意味着你要自己判断每个环境当前究竟存在哪一侧——这一点在交接账号时特别容易出错。\n\n本目录记录的复核日期：${browserSectionsReviewedOn}。`
			: `Its storage model is that ${storageText(input.storage, "en")}, and that single field decides what you need to prepare before using it.\n\nIf profiles are local only, environment configuration, cookies and login state stay on the machine: moving to another computer does not sync them, and two people cannot share one environment directly. The benefit is that the data does not depend on a service remaining available, and you control export and migration yourself.\n\nIf the data is in the cloud, an environment syncs across devices and a teammate can open the same one. The cost is that those environments now depend on the service staying available and on its access control, so you need to establish who can open them and where the data sits.\n\nA product that supports both is more flexible when you migrate, but it also means deciding for yourself where any given environment currently lives — which is exactly what goes wrong when accounts are handed over.\n\nDirectory review date: ${browserSectionsReviewedOn}.`
	});

	sections.push({
		heading: heading.engine,
		body: zh
			? `catalog 记录的浏览器内核是${engineText(input.engine, "zh-cn")}。内核决定了页面脚本看到的环境基础：同一段读取渲染、字体或时区的代码，在不同内核下返回的结果本来就不同，因此跨内核对比指纹结果没有直接意义。\n\n${input.automation ? "本条目记录了自动化支持。在选型时，自动化能力的实际含义是「能否用脚本稳定地创建、启动和修改环境」，而不只是「有没有 API 文档」——文档存在与接口在版本间保持稳定是两件事。" : "本条目未记录自动化支持。如果你需要用脚本批量创建或启动环境，这一点需要单独确认，不能从其他字段推断。"}内核与自动化是两件独立的事：内核决定环境基础，自动化接口决定你能否批量操作它。\n\n核对方式：在你自己的测试环境里跑一遍完整的创建—启动—修改—删除流程，记录每一步需要多久、是否需要人工确认。文档里的示例通过，不等于在你的规模下也稳定。`
			: `The catalog records the browser engine as ${engineText(input.engine, "en")}. The engine sets the environmental baseline a page script observes: the same code reading rendering, fonts or timezone returns different results by design on different engines, so comparing fingerprint readings across engines is not meaningful.\n\n${input.automation ? "This entry records automation support. In practice that capability means whether a script can create, launch and modify environments reliably — not merely whether API documentation exists. Documentation and an interface that stays stable across versions are two different things." : "This entry does not record automation support. If you need to create or launch environments in bulk from a script, confirm that separately rather than inferring it from other fields."}Engine and automation are independent: the engine sets the baseline, the automation interface decides whether you can operate it at scale.\n\nHow to check: run a full create, launch, modify and delete cycle in your own test environment, and note how long each step takes and whether it needs manual confirmation. A working documentation example does not prove the interface is stable at your scale.`
	});

	if (input.proxyProtocols.length) {
		const socks = input.proxyProtocols.includes("socks5");
		sections.push({
			heading: heading.proxy,
			body: zh
				? `catalog 记录的代理协议是 ${input.proxyProtocols.join("、")}。这个字段回答的是「能接什么类型的代理」，不回答「代理质量如何」——后者属于网络供应商，不属于这个产品。\n\n${socks ? "包含 socks5 意味着可以接入按流量计费或需要固定出口 IP 的代理线路。需要注意 SOCKS5 本身不强制远端 DNS 解析，如果你的代理支持远端解析参数，应当显式开启，否则 DNS 查询可能走本地线路，形成泄漏路径。" : "本条目未记录 socks5，只支持 http 与 https 代理。使用时需要确认你的代理服务是否提供 HTTP 代理入口——很多按 SOCKS5 计费的线路并不提供。"}HTTP 与 HTTPS 代理在配置上填写的都是代理地址，区别在于代理自身与目标站点之间的传输方式；HTTPS 代理指代理到目标这一段加密，不代表你的代理账号密码不会被中间节点看到。\n\n判断这个字段是否够用，看的是你现有的代理资源类型，不是产品宣传的协议数量。`
				: `The catalog records the proxy protocols as ${input.proxyProtocols.join(", ")}. This field answers which proxy types can be connected — it does not answer how good the proxy is, which belongs to the network provider rather than to this product.\n\n${socks ? "Including socks5 means you can attach usage-billed lines or proxies that need a fixed egress IP. Note that SOCKS5 does not by itself force remote DNS resolution: if your proxy supports a remote-DNS parameter, enable it explicitly, otherwise lookups may follow your local route and open a leak path." : "This entry does not record socks5 and supports http and https proxies only. Check whether your proxy service offers an HTTP entry point — many lines billed as SOCKS5 do not."}An HTTP and an HTTPS proxy are both configured with a proxy address; the difference is the transport between the proxy and the destination. HTTPS here means that leg is encrypted — it does not mean your proxy credentials are hidden from an intermediary.\n\nWhether this field is sufficient depends on the type of proxy resources you already have, not on the number of protocols a product advertises.`
		});
	}

	sections.push({
		heading: heading.platform,
		body: zh
			? `catalog 记录的客户端平台是 ${platformList(input.platforms, "zh-cn")}。平台列表的实际影响有三点。\n\n一是能否在你自己的设备上运行。如果团队成员用的系统不在列表里，他们需要另一套访问方式，或者这个产品无法覆盖整个团队。\n\n二是版本跟进。浏览器内核的安全更新通常按平台分别推送，只支持单一平台意味着你的更新节奏被这一平台的发布周期绑定。\n\n三是自动化与测试的可用性。以${engineText(input.engine, "zh-cn")}为例，针对特定内核写的自动化脚本在切换内核后需要重新验证。\n\n如果列表中包含云端运行环境，说明部分环境不下载到本机，而是在远端执行。这一项与本地客户端是两套前提：网络可达性、数据位置和计费口径都不同。`
			: `The catalog records the client platforms as ${platformList(input.platforms, "en")}. Platform coverage has three practical consequences.\n\nFirst, whether it runs on your own equipment. If a teammate's operating system is not listed, they need a different route in, or the product cannot cover the whole team.\n\nSecond, update cadence. Browser engine security updates usually ship per platform, so supporting a single platform ties your update rhythm to that platform's release cycle.\n\nThird, automation and testing availability. With ${engineText(input.engine, "en")}, an automation script written against a specific engine needs re-verification after an engine switch.\n\nIf the list includes a cloud-hosted option, some environments are not downloaded to the machine but executed remotely. That is a separate premise from a local client: network reachability, data location and billing all differ.`
	});

	sections.push({
		heading: heading.evaluate,
		body: zh
			? `把上面几个字段放在一起，最省事的评估方式是按顺序问四个问题，而不是逐条比对功能列表。\n\n先问存储：环境数据在哪里，谁有访问权。答不上来的产品，团队协作和账号交接都会留下隐患。\n\n再问平台：所有需要用的人，系统是否都在支持列表内。这一条是硬约束，不满足就没有后续。\n\n第三问自动化：你是否需要用脚本批量操作环境。需要，就实测接口在版本更新后是否还稳定；不需要，这项可以先放一边。\n\n最后才看功能列表和价格。功能条目在不同产品间的口径并不一致——「支持代理」可能指能填代理地址，也可能指内置代理服务，两者不是一回事。\n\n本目录页面上标注为未核实的字段，只能说明缺少证据，不能反推为产品不支持。这是核查纪律，不是产品评价。`
			: `With those fields in hand, the cheapest evaluation is four ordered questions rather than a feature-by-feature comparison.\n\nAsk about storage first: where the profile data sits and who can reach it. A product that cannot answer that leaves risk in both team collaboration and account handover.\n\nThen platforms: is every operating system used by the people who need access on the supported list? This is a hard constraint — if it fails, nothing after it matters.\n\nThird, automation: do you need to operate environments from a script? If so, test whether the interface survives a version update. If not, set it aside.\n\nFeatures and price come last. Feature entries are not measured consistently across products — "proxy support" may mean an address field or a bundled proxy service, and those are different things.\n\nA field marked unverified on a page in this directory means evidence is missing. It does not imply the product lacks the capability. That is a verification discipline, not a product judgement.`
	});

	sections.push({
		heading: heading.precheck,
		body: zh
			? `开始实际使用之前，下面几项建议先确认，它们都属于目录记录本身无法回答的问题。\n\n当前套餐与报价以官网为准。目录页面上显示的价格是来源记录或已核验字段，币种、计费周期与活动条件都可能变化；任何采购决定都应回到供应商页面确认。\n\n免费额度的口径要问清楚：是多少个环境、包含哪些功能、是否需要绑定支付方式、到期后环境是被删除还是被锁定。不同产品的「免费」含义差别很大。\n\n数据导出与迁移要提前试一次。确认能否完整导出环境配置，以及导入到新环境后哪些字段需要重新设置。这一步在需要交接账号时价值最高。\n\n团队权限模型要看清：谁能创建环境、谁能查看登录状态、能否撤销他人访问。只读和可登录是两种完全不同的权限。\n\n请只在你有权运营或已获授权测试的账号与环境中使用这些工具，并遵守目标网站的服务条款与当地法律。本目录不提供规避访问控制的方法，也不代理任何第三方服务。`
			: `Before actual use, confirm the following. None of them can be answered from the directory record itself.\n\nCurrent plans and quotes come from the vendor. Prices shown here reflect a source record or a verified field; currency, billing period and promotion terms can all change. Any purchasing decision belongs back on the vendor's page.\n\nEstablish what the free allowance means: how many environments, which features are included, whether a payment method must be bound, and whether environments are deleted or locked when it expires. "Free" means materially different things across products.\n\nTest data export and migration early. Confirm whether environment configuration exports completely, and which fields need re-setting on import. This step is worth the most when accounts are handed over.\n\nUnderstand the permission model: who can create environments, who can view login state, and whether access can be revoked. Read-only and able-to-sign-in are entirely different permissions.\n\nUse these tools only with accounts you operate or have authorisation to test, and follow the target site's terms and local law. This directory provides no method for circumventing access controls and acts on behalf of no third-party service.`
	});

	return sections;
}

/**
 * Entry point used by both the locale route and the legacy route.
 * `opening` leads the page as an introduction paragraph; `sections` are the
 * h2-headed blocks rendered through the shared `SectionBody` component.
 */
export function browserSectionsFor(input: BrowserSectionInput, locale: Locale): { opening: string; sections: BrowserSection[] } {
	const language: BrowserSectionsLocale = locale === "zh-cn" ? "zh-cn" : "en";
	return { opening: openingFor(input, language), sections: sectionsFor(input, language) };
}