import { verifiedProducts } from "@/data/verified-products";
import { browsers, comparisons, guides, technologies, tools } from "@/data/resources";
import { localizedGuideCopy } from "@/data/guide-translations";
import { comparisonCopy, localizedResourceDescription } from "@/lib/i18n";

export const dynamic = "force-static";

/**
 * llms.txt — the machine-readable map of this site for AI answer engines.
 *
 * Why this file was rewritten (2026-10-31)
 * ---------------------------------------
 * An audit compared every URL in `out/sitemap.xml` against every URL mentioned
 * in the previous llms.txt. The old file linked 205 of 1,036 sitemap URLs:
 *
 *   browsers    36 of 259   (Chinese URLs only; no English URLs)
 *   guides     168 of 175
 *   compare      0 of 210   (a run-on sentence of "A vs B" titles with no URL)
 *   tools        0 of 252   (12 names listed, no URL)
 *   fingerprint  0 of 112
 *   about / contact / privacy  1 of 21
 *
 * An AI crawler could not resolve a comparison page, a tool page or a
 * fingerprint page at all, because those entries carried no link. Listing 29
 * comparison titles as one comma-separated sentence is the least useful form
 * this file can take: it gives an answer engine a title it cannot cite.
 *
 * Editorial rules for this file (red lines, not style preferences):
 * - Every URL is generated from the same catalogue data that renders the page,
 *   so a link and its page cannot drift apart.
 * - Every product fact comes from `verified-products.ts`, which records the
 *   official page each value was read from and the date it was read. A price is
 *   a dated snapshot, not a quote, and the review date is printed inline.
 * - An unverified field is labelled unverified. It is never written as "not
 *   supported"; a `checks` status of `unknown` means the review did not
 *   confirm the value, which is different from the value being false.
 * - No rating, review count, benchmark score, detection verdict or vendor
 *   capability claim appears here. BrowserHub is not a laboratory.
 * - English and Chinese lines carry the same reviewed facts. Descriptions are
 *   taken from the same helper the page itself renders, so the two cannot
 *   disagree. Where the data layer only holds Chinese copy, the Chinese line
 *   is labelled "中文" rather than filled with a guessed translation.
 */

const SITE = "https://browserhub.co";

// The catalogue stores a machine slug for the licence model. Both languages
// need their own wording: the Chinese label is a noun that follows
// "浏览器资源", and the English label is an adjective that precedes
// "anti-detect browser resource".
const browserTypeLabelZh: Record<string, string> = { commercial: "商业", "open-source": "开源", freemium: "免费增值", free: "免费" };
const browserTypeLabelEn: Record<string, string> = { commercial: "commercial", "open-source": "open-source", freemium: "freemium", free: "free" };

const join = (parts: (string | undefined | false)[]) => parts.filter(Boolean).join("、");
// The English half of the file uses Latin punctuation throughout. The Chinese
// enumeration comma reads as a typo in an English sentence, so the English
// list is joined with a comma and a space instead.
const joinEnglish = (parts: (string | undefined | false)[]) => parts.filter(Boolean).join(", ");
// A sentence from the data layer may or may not already end in a full stop.
const sentence = (value: string) => (/[.。]$/.test(value.trim()) ? value.trim() : `${value.trim()}.`);

/** One catalogue record, linked in both languages. */
function links(enPath: string, zhPath: string, label: string) {
	return `- [${label}](${SITE}${enPath}) · [${label}](${SITE}${zhPath})`;
}

function browserLine(b: (typeof browsers)[number]) {
	const typeZh = browserTypeLabelZh[b.type] ?? b.type;
	const typeEn = browserTypeLabelEn[b.type] ?? b.type;
	const evidence = verifiedProducts[b.slug];
	const en = evidence?.en;
	const zh = evidence?.zh;
	const platforms = en?.platforms?.length ? en.platforms : b.platforms;
	const zhPlatforms = zh?.platforms?.length ? zh.platforms : b.platforms;
	const capabilities = joinEnglish([
		en?.proxy ? "proxy supported" : "",
		en?.api ? "API confirmed" : "",
		en?.automation ? "automation confirmed" : "",
		en?.storage && en.storage !== "以官网为准" ? `${en.storage} storage` : ""
	]);
	const zhCapabilities = join([
		zh?.proxy ? "支持代理" : "",
		zh?.api ? "API 已确认" : "",
		zh?.automation ? "自动化已确认" : "",
		zh?.storage && zh.storage !== "以官网为准" ? `${zh.storage}存储` : ""
	]);
	const sources = evidence?.sources?.map(source => source.url).join(" ") ?? "";
	const review = evidence
		? ` Public documentation reviewed ${evidence.verifiedAt}; pricing status: ${evidence.pricingStatus}.${sources ? ` Sources: ${sources}` : ""}`
		: " Public documentation review not completed.";
	const zhReview = evidence
		? `公开资料核查：${evidence.verifiedAt}；价格状态：${evidence.pricingStatus}${sources ? `；来源：${sources}` : ""}`
		: "未完成官方资料核查。";
	return `${links(`/en/browsers/${b.slug}/`, `/zh-cn/browsers/${b.slug}/`, b.name)} — ${typeEn} anti-detect browser resource.${en?.description ? ` ${sentence(en.description)}` : ""}${en?.free ? ` ${en.free};` : ""}${en?.price ? ` ${en.price}.` : ""}${platforms.length ? ` Platforms: ${platforms.join(", ")}.` : ""}${capabilities ? ` ${capabilities}.` : ""}${review}
  - 中文：${typeZh}浏览器资源；${zh?.description ?? b.description}；${zh?.free ?? b.free}；${zh?.price ?? b.price}；平台：${zhPlatforms.join("、")}${zhCapabilities ? `；${zhCapabilities}` : ""}。${zhReview}`;
}

function toolLine(t: (typeof tools)[number]) {
	return `${links(`/en/tools/${t.slug}/`, `/zh-cn/tools/${t.slug}/`, t.name)} — ${localizedResourceDescription("en", "tools", t)}
  - 中文：${localizedResourceDescription("zh-cn", "tools", t)}`;
}

function technologyLine(item: (typeof technologies)[number]) {
	return `${links(`/en/fingerprint/${item.slug}/`, `/zh-cn/fingerprint/${item.slug}/`, item.name)} — ${localizedResourceDescription("en", "fingerprint", item)}
  - 中文：${localizedResourceDescription("zh-cn", "fingerprint", item)}`;
}

function comparisonLine(c: (typeof comparisons)[number]) {
	const a = browsers.find(browser => browser.slug === c.browsers[0]);
	const b = browsers.find(browser => browser.slug === c.browsers[1]);
	const aEn = a ? verifiedProducts[a.slug]?.en : undefined;
	const bEn = b ? verifiedProducts[b.slug]?.en : undefined;
	const aZh = a ? verifiedProducts[a.slug]?.zh : undefined;
	const bZh = b ? verifiedProducts[b.slug]?.zh : undefined;
	const enFacts = joinEnglish([
		aEn?.free && `${a!.name}: ${aEn.free}`,
		bEn?.free && `${b!.name}: ${bEn.free}`,
		aEn?.price && `${a!.name}: ${aEn.price}`,
		bEn?.price && `${b!.name}: ${bEn.price}`
	]);
	const zhFacts = join([
		aZh?.free && `${a!.name}：${aZh.free}`,
		bZh?.free && `${b!.name}：${bZh.free}`,
		aZh?.price && `${a!.name}：${aZh.price}`,
		bZh?.price && `${b!.name}：${bZh.price}`
	]);
	return `${links(`/en/compare/${c.slug}/`, `/zh-cn/compare/${c.slug}/`, c.title)} — ${comparisonCopy("en", a!, b!).overview}${enFacts ? ` ${enFacts}.` : ""} Each page lists the review date and the official sources for both products.
  - 中文：${comparisonCopy("zh-cn", a!, b!).overview}${zhFacts ? ` ${zhFacts}。` : ""} 价格与功能以各官网当前信息为准。`;
}

function guideLine(g: (typeof guides)[number]) {
	const en = localizedGuideCopy("en", g.slug, { title: g.title, description: g.description });
	const zh = localizedGuideCopy("zh-cn", g.slug, { title: g.title, description: g.description });
	return `- [${en.title}](${SITE}/en/guides/${g.slug}/) · [${zh.title}](${SITE}/zh-cn/guides/${g.slug}/) — ${en.description}
  - 中文：${zh.description}`;
}

export function GET() {
	const browserFacts = browsers.map(browserLine).join("\n");
	const toolFacts = tools.map(toolLine).join("\n");
	const technologyFacts = technologies.map(technologyLine).join("\n");
	const compareFacts = comparisons.map(comparisonLine).join("\n");
	const guideFacts = guides.map(guideLine).join("\n");

	const body = `# BrowserHub — Anti-detect browser resource directory / 指纹浏览器资源大全

BrowserHub is an open resource and research hub for anti-detect (fingerprint) browsers, detection & automation tools, proxy and privacy technologies. It compares public, verifiable product facts so individuals, growth teams and developers can evaluate multi-account and privacy tooling. Pricing and features change — always confirm on the official site.

## About BrowserHub / 关于 BrowserHub
BrowserHub（中文名「指纹浏览器资源大全」）是一个开源资料站（EasyBR 为关联产品），统一整理反检测浏览器、浏览器指纹检测、自动化框架、代理与隐私技术。所有数据以公开信息为准，帮助跨境电商、社媒运营、安全研究与开发者对比多账号浏览器的免费额度、价格、平台、存储、代理与自动化能力。

Every catalogue record below is linked in English and in Chinese. The two lines carry the same reviewed facts, and each product line prints the date its public documentation was last read. Where only Chinese copy exists in the data layer, the Chinese line is labelled 中文 rather than filled with a guessed translation.

## Coverage / 覆盖内容
- 反检测 / 指纹浏览器（多账号环境隔离）
- 指纹检测与机器人检测工具
- 自动化框架（Playwright、Puppeteer、Selenium）
- 浏览器指纹信号（Canvas、WebGL、WebRTC、TLS、时区、语言、存储）
- 实用指南（浏览器选型、代理配置、多账号最佳实践）
- 热门浏览器横向对比

## Editorial disclosure
EasyBR is affiliated with BrowserHub and receives featured placement. Articles use public documentation unless a reproducible test is explicitly described. Editorial policy: https://browserhub.co/en/about/
Product entries carry individual official-documentation review dates and field-level checks. A confirmed price is a dated snapshot in its original currency and billing period, not a live quote. Unverified prices are explicitly labelled; unknown API, automation or platform fields do not imply unsupported features. Vendor documentation is not a hands-on benchmark.

## Browsers tracked / 收录浏览器（关键事实）
${browserFacts}

## Detection and automation tools / 检测与自动化工具
${toolFacts}

## Browser fingerprint signals / 浏览器指纹信号
${technologyFacts}

## Browser comparisons / 浏览器横向对比
${compareFacts}

## Guides and tutorials / 指南与教程
${guideFacts}

## Site pages / 站点页面
- [About the catalogue](${SITE}/en/about/) · [About the catalogue](${SITE}/zh-cn/about/) — how the directory is structured, which fields every entry shares, and how each entry is checked.
- [Contact and contribute](${SITE}/en/contact/) · [Contact and contribute](${SITE}/zh-cn/contact/) — how to submit a price or feature correction, a new product or a new guide.
- [Privacy notice](${SITE}/en/privacy/) · [Privacy notice](${SITE}/zh-cn/privacy/) — what this site does not collect, what the analytics script and the server access log do record, and how to delete local data.

## Frequently asked questions / 常见问题
Q: What is an anti-detect browser?
A: A class of browser environment tools that isolate cookies, cache and fingerprint parameters (Canvas, WebGL, timezone, language, WebRTC and similar) to reduce the risk of accounts being linked. It is used for multi-account operations and privacy research.

Q: How do I choose between a free plan and a paid plan?
A: Start with a free allowance to validate the workflow. For commercial use, compare the number of free environments, whether profiles are stored locally, proxy and automation support, and the price after the trial. Always confirm the current terms on each vendor's own pricing page.

Q: Is the data on this site authoritative?
A: BrowserHub only organises publicly available information. Prices, plans and features change, so treat every entry as a dated snapshot and confirm the current terms on each product's official site.

Q: What does the review date on a product entry mean?
A: It is the date a reviewer read the vendor's own documentation for the listed fields. It is not a test date, not a performance measurement, and not a guarantee that a listed price is still available.

## Links / 项目与链接
- Site: ${SITE}/
- GitHub: https://github.com/xxjrq/antidetect-browser-hub
- Gitee: https://gitee.com/xxjrq/antidetect-browser-hub
- EasyBR (related product): https://www.ebrower.com/
`;

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
}
