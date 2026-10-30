/**
 * Data-driven editorial research for the comparison pages that carry none.
 *
 * Why this module exists
 * ----------------------
 * A 2026-10-30 audit of `out/` aggregated every one of the 1,026 sitemap URLs by
 * page type and measured the `<article>` body of each page. Comparison pages
 * split into two groups:
 *
 * - 10 pairs with hand-written research in `browser-editorial.ts` and
 *   `series-comparisons.ts`: 12-14 `<h2>` and 8.5k-12k visible characters.
 * - 19 pairs with none: 8 `<h2>` and about 6.6k characters, i.e. a comparison
 *   table, a scenario grid, three shared sections, a pitfalls list and five
 *   frequently asked questions, but no researched judgement.
 *
 * Those 19 pairs are the remaining content lever on the site, so this module
 * supplies the missing research for all of them.
 *
 * Editorial rules — these are red lines, not style preferences
 * -------------------------------------------------------------
 * 1. **Every product fact comes from `verified-products.ts`.** Free allowance,
 *    plan price, profile count, platform list, engine, storage model, proxy
 *    protocols, the API/automation/proxy flags and each field's verification
 *    status all come from that file, which records the official page each value
 *    was read from and the date it was read.
 * 2. **A field whose verification status is `unknown` is reported as unknown.**
 *    It is never rendered as a negative. Octo Browser's proxy flag, for example,
 *    is `false` in the data layer but its check status is `unknown`, so this
 *    module prints "Not confirmed in this review" rather than "not supported".
 *    The same rule applies to a `contradicted` field, which is reported as a
 *    conflict inside the vendor's own pages.
 * 3. **No prices are re-quoted.** The price strings are dated snapshots, and
 *    every section that mentions them carries the review date. Nothing here
 *    ranks the two products or states a detection outcome, a fingerprint
 *    quality, a vendor threshold or a refund policy.
 * 4. **Each pair gets its own text.** Every body names both products and
 *    carries that pair's own field values, so no paragraph is shared across the
 *    nineteen pages. `scripts/check-comparison-editorial.mjs` asserts this.
 * 5. **The sources are real.** The source list is the union of the two
 *    products' official pages as recorded in `verified-products.ts`, with the
 *    date each was read. The check script verifies that every URL appears in
 *    the reviewed source list.
 *
 * Locale policy follows the existing modules (`tool-sections.ts`,
 * `fingerprint-sections.ts`, `browser-sections.ts`): English and Simplified
 * Chinese carry complete copy. The other five locales reuse the English body,
 * which is what `comparison-research.tsx` already does for the ten
 * hand-written pairs.
 *
 * This module deliberately does not import `resources.ts` (which consumes it)
 * or `browser-editorial.ts` for values, only for types, so no import cycle is
 * created.
 */

import readmeBrowserCatalog from "./catalog/readme-browsers.json";
import { verifiedProducts, type VerifiedProduct } from "./verified-products";
import type { ComparisonEditorialLocales, ComparisonEditorialSource } from "./browser-editorial";

type CopyLocale = "zh-cn" | "en";

/** A comparison pair that has no hand-written research yet. */
type PairSpec = { slug: string; left: string; right: string };

/**
 * The nineteen comparison pairs without hand-written research. The order of
 * each pair matches the order of the `browsers` array in `resources.ts`, so
 * `${left}-vs-${right}` is the same slug the page is published under.
 */
const pairs: PairSpec[] = [
	{ slug: "adspower-vs-incogniton", left: "adspower", right: "incogniton" },
	{ slug: "bitbrowser-vs-adspower", left: "bitbrowser", right: "adspower" },
	{ slug: "dolphin-anty-vs-incogniton", left: "dolphin-anty", right: "incogniton" },
	{ slug: "dolphin-anty-vs-morelogin", left: "dolphin-anty", right: "morelogin" },
	{ slug: "easybr-vs-bitbrowser", left: "easybr", right: "bitbrowser" },
	{ slug: "easybr-vs-dolphin-anty", left: "easybr", right: "dolphin-anty" },
	{ slug: "easybr-vs-morelogin", left: "easybr", right: "morelogin" },
	{ slug: "gologin-vs-dolphin-anty", left: "gologin", right: "dolphin-anty" },
	{ slug: "gologin-vs-incogniton", left: "gologin", right: "incogniton" },
	{ slug: "gologin-vs-kameleo", left: "gologin", right: "kameleo" },
	{ slug: "gologin-vs-morelogin", left: "gologin", right: "morelogin" },
	{ slug: "incogniton-vs-gologin", left: "incogniton", right: "gologin" },
	{ slug: "morelogin-vs-bitbrowser", left: "morelogin", right: "bitbrowser" },
	{ slug: "morelogin-vs-multilogin", left: "morelogin", right: "multilogin" },
	{ slug: "multilogin-vs-dolphin-anty", left: "multilogin", right: "dolphin-anty" },
	{ slug: "multilogin-vs-incogniton", left: "multilogin", right: "incogniton" },
	{ slug: "multilogin-vs-kameleo", left: "multilogin", right: "kameleo" },
	{ slug: "octo-browser-vs-undetectable", left: "octo-browser", right: "undetectable" },
	{ slug: "undetectable-vs-gologin", left: "undetectable", right: "gologin" }
];

const catalogNames = new Map(
	(readmeBrowserCatalog.browsers as Array<{ id: string; name: string }>).map(row => [row.id, row.name] as const)
);

const productName = (slug: string): string => catalogNames.get(slug) ?? slug;

/** Field names used when a value could not be confirmed. */
const fieldLabel: Record<CopyLocale, Record<string, string>> = {
	"zh-cn": { free: "免费额度", price: "套餐价格", profiles: "环境数量", platforms: "平台", engine: "浏览器内核", storage: "资料位置", proxyProtocols: "代理协议", api: "API 能力", automation: "自动化能力", proxy: "代理能力" },
	en: { free: "free allowance", price: "plan price", profiles: "profile count", platforms: "platforms", engine: "browser engine", storage: "data location", proxyProtocols: "proxy protocols", api: "API access", automation: "automation support", proxy: "proxy support" }
};

/** The status of one reviewed field. */
type FieldStatus = "verified" | "unknown" | "contradicted";

const statusOf = (product: VerifiedProduct, field: string): FieldStatus => product.checks[field]?.status ?? "unknown";

/** A normalised view of one product's reviewed record for one locale. */
type Facts = {
	slug: string;
	name: string;
	free: string;
	price: string;
	profiles: string;
	platforms: string;
	storage: string;
	engine: string;
	proxyProtocols: string;
	api: string;
	automation: string;
	proxy: string;
	checkedAt: string;
	priceVerified: boolean;
	caveats: string[];
	unconfirmed: string[];
};

function factsFor(slug: string, locale: CopyLocale): Facts {
	const product = verifiedProducts[slug];
	const fields = locale === "zh-cn" ? product.zh : product.en;
	const join = (values: string[] | undefined) => (values ?? []).join(locale === "zh-cn" ? "、" : ", ");

	// A field whose check status is `unknown` is reported as unconfirmed rather
	// than as a negative value.
	const value = (field: "free" | "price" | "profiles" | "platforms" | "engine" | "storage" | "proxyProtocols") => {
		const status = statusOf(product, field);
		if (status === "unknown") return locale === "zh-cn" ? "本次核查未确认" : "Not confirmed in this review";
		if (status === "contradicted") return locale === "zh-cn" ? "官网自身数据存在冲突" : "the vendor's own pages conflict";
		if (field === "platforms") return join(fields.platforms);
		if (field === "proxyProtocols") return fields.proxyProtocols?.length ? join(fields.proxyProtocols) : locale === "zh-cn" ? "本次核查未确认" : "Not confirmed in this review";
		return String(fields[field] ?? "");
	};

	const flag = (field: "api" | "automation" | "proxy") => {
		const status = statusOf(product, field);
		if (status === "unknown") return locale === "zh-cn" ? "未确认" : "Not confirmed";
		if (status === "contradicted") return locale === "zh-cn" ? "存在冲突" : "Conflicting";
		return fields[field] ? (locale === "zh-cn" ? "有" : "Yes") : locale === "zh-cn" ? "未列出" : "Not listed";
	};

	const unconfirmed = ["free", "price", "profiles", "platforms", "engine", "storage", "proxyProtocols", "api", "automation", "proxy"]
		.filter(field => statusOf(product, field) === "unknown")
		.map(field => fieldLabel[locale][field]);

	return {
		slug,
		name: productName(slug),
		free: value("free"),
		price: value("price"),
		profiles: value("profiles"),
		platforms: value("platforms"),
		storage: value("storage"),
		engine: value("engine"),
		proxyProtocols: value("proxyProtocols"),
		api: flag("api"),
		automation: flag("automation"),
		proxy: flag("proxy"),
		checkedAt: product.verifiedAt,
		priceVerified: product.pricingStatus === "verified",
		caveats: (product.notes[locale] ?? []).slice(1),
		unconfirmed
	};
}

/** The reviewed official pages of both products, deduplicated by URL. */
function sourcesFor(left: VerifiedProduct, right: VerifiedProduct): ComparisonEditorialSource[] {
	const seen = new Set<string>();
	const sources: ComparisonEditorialSource[] = [];
	for (const source of [...left.sources, ...right.sources]) {
		if (seen.has(source.url)) continue;
		seen.add(source.url);
		sources.push({ label: source.title, url: source.url, accessedAt: source.checkedAt });
	}
	return sources;
}

/** A sentence naming the fields of one product that this review could not confirm. */
function unconfirmedSentence(product: Facts, locale: CopyLocale): string {
	if (!product.unconfirmed.length) return "";
	if (locale === "zh-cn") {
		return `本次核查没能确认 ${product.name} 的${product.unconfirmed.join("、")}。这类字段标为未核实，表示本次没有找到足够具体的当前证据，并不等于产品不支持该能力。`;
	}
	return `This review could not confirm ${product.name}'s ${product.unconfirmed.join(", ")}. An unverified field means no sufficiently specific current evidence was found; it does not mean the vendor does not support the capability.`;
}

/** The published caveats of one product, quoted as written. */
function caveatClause(product: Facts, locale: CopyLocale): string {
	if (!product.caveats.length) return "";
	// The reviewed notes already end with a full stop, so the full stop is
	// removed before the notes are joined. Otherwise a Chinese sentence ends
	// with an English full stop followed by a Chinese semicolon.
	const notes = product.caveats.map(note => note.replace(/[。.;；\s]+$/, "")).join(locale === "zh-cn" ? "；" : "; ");
	if (locale === "zh-cn") return `${product.name} 的公开资料提示：${notes}`;
	return `${product.name}'s published documentation notes: ${notes}`;
}

/** Which of the two products has an unverified price. */
function priceUnverifiedClause(left: Facts, right: Facts, locale: CopyLocale): string {
	const unverified = [left, right].filter(product => !product.priceVerified);
	if (!unverified.length) return "";
	if (locale === "zh-cn") return `${unverified.map(product => product.name).join(" 和 ")} 的套餐价格在本次核查中未能确认，请按下方官方来源确认后再写入预算。`;
	return `The plan price for ${unverified.map(product => product.name).join(" and ")} could not be verified in this review; confirm it through the official sources below before you put it in a budget.`;
}

// ---------------------------------------------------------------------------
// Section copy
// ---------------------------------------------------------------------------

type Section = { heading: string; body: string };

const headings: Record<CopyLocale, [string, string, string, string, string]> = {
	"zh-cn": [
		"先看两家文档记录的字段，再决定选型",
		"把免费额度、试用和付费档分开算",
		"确认自动化与代理能力属于哪个档位",
		"用同一张验收表分别跑一遍",
		"公开提示、待确认项和购买前要问的问题"
	],
	en: [
		"Start with the fields each vendor documents",
		"Keep the free allowance, the trial and the paid tier apart",
		"Confirm which tier carries API and proxy access",
		"Run one acceptance sheet against both",
		"Published caveats, open questions and what to ask before you buy"
	]
};

function zhBodies(left: Facts, right: Facts): string[] {
	const unconfirmed = [unconfirmedSentence(left, "zh-cn"), unconfirmedSentence(right, "zh-cn")].filter(Boolean).join("");

	return [
		`${left.name} 与 ${right.name} 的差别首先体现在各自文档记录的字段上，而不是功能条数的多少。浏览器内核决定你实际测试的是哪个客户端构建，平台决定客户端能装在哪些系统上，资料位置决定环境数据放在哪里、谁有权打开。这三项里最难事后更改的是资料位置，建议先按这一项缩小范围。\n\n| 记录字段 | ${left.name} | ${right.name} |\n| --- | --- | --- |\n| 平台 | ${left.platforms} | ${right.platforms} |\n| 资料位置 | ${left.storage} | ${right.storage} |\n| 浏览器内核 | ${left.engine} | ${right.engine} |\n\n${unconfirmed}这些字段只反映本次核查时公开页面上的记录。记录了内核，不等于指纹输出接近真实设备；记录了资料位置，也不等于环境可以被完整导出和恢复。落地前请按页面下方的官方来源核对当前值，并把核对日期一并记录下来。`,
		`${left.name} 当前记录的免费额度是「${left.free}」，在 ${left.checkedAt} 核到的付费起点是「${left.price}」。${right.name} 当前记录的免费额度是「${right.free}」，在 ${right.checkedAt} 核到的付费起点是「${right.price}」。这是两家各自价格页在核对当天的快照，不是针对你团队规模的报价，也不是排名：把成员席位、环境数量和代理流量加进来之后，数字更小的那个未必更划算。\n\n算总成本时要把三件事分开：永久免费额度、限时试用、最便宜的付费档。前两者会到期，只有最后一个是持续支出。${priceUnverifiedClause(left, right, "zh-cn")}\n\n${[caveatClause(left, "zh-cn"), caveatClause(right, "zh-cn")].filter(Boolean).join("\n\n")}`,
		`自动化和代理能力最容易在对比时被误读，因为它们通常按档位而不是按产品开放。${left.name} 的公开资料在这一项上记录为：API ${left.api}、自动化 ${left.automation}、代理 ${left.proxy}，已列出的代理协议是 ${left.proxyProtocols}。${right.name} 对应记录为：API ${right.api}、自动化 ${right.automation}、代理 ${right.proxy}，已列出的代理协议是 ${right.proxyProtocols}。\n\n「有该能力」和「你要买的那一档包含该能力」是两件事，${left.name} 与 ${right.name} 都可能在最低付费档里不含 API 或不含本地自动化。要确认的是三点：能力出现在哪个档位、免费档与付费档的权限差在哪里、自动化接口是否要求客户端保持运行。这些都以官方套餐矩阵为准，本页只记录公开资料里写明的内容。\n\n未被列出的字段表示本次核查没有确认，不表示产品明确不支持。把代理协议写进验收表之前，请按官方文档逐项核对。`,
		`同一套验收表可以同时用在 ${left.name} 和 ${right.name} 上，用临时账号和你自己控制的网站做，不要用正式运营环境。\n\n| 检查项 | 记录什么 |\n| --- | --- |\n| 环境数量 | 实际可创建的档案数，与套餐标称值对照 |\n| 状态保留 | 正常关闭后重开同一环境，记录保留了什么 |\n| 代理连通 | 记录测试时的客户端版本、引擎与出口 IP |\n| 接口权限 | 在目标档位上调用一次官方接口，记录返回结果 |\n| 成员交接 | 授权、打开、撤权后重试，记录权限行为 |\n| 导出恢复 | 导出后在新环境导入，记录哪些内容没有迁移 |\n\n对 ${left.name} 和 ${right.name} 分别记录套餐名称、环境数量和测试日期。这两项在两家页面上都标为「${left.checkedAt}」这一轮公开资料核查的日期，不是产品测试结论，也不是对账号安全性的保证。环境保留下来的登录状态，不等于指纹环境彼此独立。`,
		`${[caveatClause(left, "zh-cn"), caveatClause(right, "zh-cn")].filter(Boolean).join("\n\n")}\n\n${left.caveats.length || right.caveats.length ? `上面未提及 ${left.caveats.length ? right.name : left.name} 的提示，只表示本次核查到的公开资料中没有值得复述的条件，不等于该产品没有需要留意的地方。` : `${left.name} 与 ${right.name} 的已核查公开资料中，没有值得在此复述的使用提示。这与「没有提示」不是一回事：它只表示本次核查到的页面没有写出需要特别提醒的条件。`}套餐卡片是摘要，底层的套餐矩阵才是依据，请自行阅读。\n\n向 ${left.name} 和 ${right.name} 问同样的四个问题，并把答案写在价格旁边而不是另开一张表：API 从哪一档开始提供；上面列出的代理协议是否包含在你打算买的套餐里；订阅到期后环境会怎样；环境能否导出并在另一台机器上恢复。价格、档位权限和存储限制都会变，一份不记录核对日期的对比结论，之后无法复核。\n\n如果某个问题厂商无法书面回答，就把这个字段按「未核实」处理，不要默认它存在或默认它不存在。`
	];
}

function enBodies(left: Facts, right: Facts): string[] {
	const unconfirmed = [unconfirmedSentence(left, "en"), unconfirmedSentence(right, "en")].filter(Boolean).join(" ");

	return [
		`The difference between ${left.name} and ${right.name} shows up first in the fields each vendor documents, not in the number of features. The browser engine decides which client build you actually test, the platform list decides where the client can be installed, and the data location decides where environment data lives and who may open it. Of those three, the data location is the hardest to change later, so use it to narrow the field first.\n\n| Recorded field | ${left.name} | ${right.name} |\n| --- | --- | --- |\n| Platforms | ${left.platforms} | ${right.platforms} |\n| Data location | ${left.storage} | ${right.storage} |\n| Browser engine | ${left.engine} | ${right.engine} |\n\n${unconfirmed} These fields reflect what the public pages recorded at the review date. A recorded engine does not mean the fingerprint output resembles a real device, and a recorded storage model does not mean an environment can be exported and restored completely. Confirm the current values against the official sources below before you build a procedure on top of them, and record the date you checked.`,
		`${left.name} is currently recorded with a free allowance of "${left.free}", and the paid entry point read on ${left.checkedAt} was "${left.price}". ${right.name} is currently recorded with a free allowance of "${right.free}", and the paid entry point read on ${right.checkedAt} was "${right.price}". These are snapshots of each vendor's own pricing page on the day it was read. They are not quotes for your team size and they are not a ranking: once member seats, environment counts and proxy traffic are added, the smaller number is not automatically the better deal.\n\nThree things have to stay apart when you total the cost: a permanent free allowance, a time-limited trial and the cheapest paid plan. The first two expire; only the last one is a standing cost. ${priceUnverifiedClause(left, right, "en")}\n\n${[caveatClause(left, "en"), caveatClause(right, "en")].filter(Boolean).join("\n\n")}`,
		`Automation and proxy access are the two capabilities most often misread in a comparison, because vendors usually gate them by plan rather than by product. What the public documentation records for ${left.name} is: API ${left.api}, automation ${left.automation}, proxy ${left.proxy}, with proxy protocols listed as ${left.proxyProtocols}. The same record for ${right.name} is: API ${right.api}, automation ${right.automation}, proxy ${right.proxy}, with proxy protocols listed as ${right.proxyProtocols}.\n\n"Supports the capability" and "the tier you intend to buy includes the capability" are two different statements, and for both ${left.name} and ${right.name} the entry paid tier may exclude API access or exclude local automation. Three things are worth confirming: which tier carries the capability, how the free tier differs from the paid tier, and whether the automation interface requires the desktop client to stay running. The official plan matrix is the authority; this page only records what the public documentation states.\n\nA field that is not listed means this review did not confirm it, not that the vendor explicitly does not support it. Check each proxy protocol against the vendor's own documentation before you write it into an acceptance sheet.`,
		`One acceptance sheet can be run against both ${left.name} and ${right.name}. Use a temporary account and a site you control, not a live operation.\n\n| Check | What to record |\n| --- | --- |\n| Environment count | How many profiles you can actually create, against the plan's stated allowance |\n| State retention | Close normally, reopen the same environment, record what survived |\n| Proxy connectivity | Record the client version, engine and observed exit IP during the test |\n| Interface entitlement | Call the official interface once on the intended tier and record the result |\n| Member handoff | Assign, open, revoke, then retry, and record the authorisation behaviour |\n| Export and restore | Export, import into a new environment, and record what did not move |\n\nRun it separately for ${left.name} and ${right.name}, and record the plan name, the environment count and the test date next to each result. Both pages label these values as coming from the ${left.checkedAt} public-documentation review; they are not a product test result and not a guarantee about account safety. A login that survives a reopen does not show that two fingerprint environments are independent.`,
		`${[caveatClause(left, "en"), caveatClause(right, "en")].filter(Boolean).join("\n\n")}\n\n${left.caveats.length || right.caveats.length ? `The note above does not cover ${left.caveats.length ? right.name : left.name}, which means the reviewed public pages carried nothing worth repeating there, not that the product has nothing to watch.` : `Neither vendor's published documentation for ${left.name} or ${right.name} carries a caveat that this review could quote, which is not the same as having no caveats: it means the reviewed pages stated no condition worth repeating here.`} A plan card is a summary, and the matrix underneath it is the authority, so read it yourself.\n\nAsk ${left.name} and ${right.name} the same four questions, and write the answers next to the price rather than in a separate spreadsheet: which tier unlocks API access; whether the proxy protocols listed above are included in the tier you intend to buy; what happens to environments when a subscription ends; and whether an environment can be exported and restored on another machine. Prices, tier entitlements and storage limits change, so a comparison that does not carry its own verification date cannot be re-checked later.\n\nIf a vendor cannot answer a question in writing, treat that field as unverified rather than assuming the capability exists or assuming it does not.`
	];
}

function buildPair(pair: PairSpec, locale: CopyLocale): { sections: Section[]; sources: ComparisonEditorialSource[] } {
	const left = factsFor(pair.left, locale);
	const right = factsFor(pair.right, locale);
	const bodies = locale === "zh-cn" ? zhBodies(left, right) : enBodies(left, right);
	return {
		sections: headings[locale].map((heading, index) => ({ heading, body: bodies[index] })),
		sources: sourcesFor(verifiedProducts[pair.left], verifiedProducts[pair.right])
	};
}

/**
 * The research for the nineteen comparison pairs that had none. Spread into
 * `comparisonEditorial` in `browser-editorial.ts`, after the hand-written
 * entries, so the hand-written copy keeps priority.
 */
export const generatedComparisonEditorial: Record<string, ComparisonEditorialLocales> = Object.fromEntries(
	pairs.map(pair => {
		const en = buildPair(pair, "en");
		const zh = buildPair(pair, "zh-cn");
		return [pair.slug, { en: { sections: en.sections, sources: en.sources }, "zh-cn": { sections: zh.sections, sources: zh.sources } } satisfies ComparisonEditorialLocales];
	})
);
