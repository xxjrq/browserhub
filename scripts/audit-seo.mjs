/** Offline checks against the real static HTML, without loading client-side code.
 * Usage: node scripts/audit-seo.mjs [--dir out] [--json] [--baseline]
 * --baseline reports defects without failing; normal runs fail on defects.
 * This checks crawlability and consistency, not indexing, traffic, rankings or rich-result eligibility.
 */
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const root = path.resolve(args.includes("--dir") ? args[args.indexOf("--dir") + 1] : "out");
const origin = "https://browserhub.co";
const languages = { "zh-cn": "zh-CN", en: "en", ja: "ja", ko: "ko", es: "es", pt: "pt", ru: "ru" };
const editorialSlugs = ["browser-fingerprint-changes-after-update", "canvas-fingerprint-test", "webgl-fingerprint-test", "user-agent-client-hints-check", "browser-timezone-language-check", "dns-leak-test-browser-proxy", "browserleaks-vs-creepjs", "open-source-antidetect-browsers", "browser-profile-storage-isolation-test", "how-to-choose-antidetect-browser", "free-antidetect-browser", "local-vs-cloud-browser-storage", "multi-account-best-practices", "browser-profile-permissions", "setting-up-proxies-easybr", "browser-fingerprinting-explained", "browser-fingerprint-signals", "webrtc-leak-check", "read-creepjs-results", "configure-http-proxy", "configure-socks5-proxy", "best-antidetect-browsers-2026", "proxy-vs-vpn-vs-antidetect-browser", "chrome-profiles-vs-antidetect-browser", "residential-vs-datacenter-proxies", "antidetect-browser-macos", "team-browser-evaluation-checklist", "browser-fingerprint-testing-checklist", "browser-automation-profile-persistence"];
const issues = [];
const warnings = [];
const pages = new Map();
const add = (route, problem) => issues.push({ route, problem });
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|nbsp);|&#(?:x[0-9a-f]+|\d+);/gi, entity => {
	const named = { "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">", "&nbsp;": " " };
	if (entity.toLowerCase() in named) return named[entity.toLowerCase()];
	const code = entity.startsWith("&#x") ? parseInt(entity.slice(3, -1), 16) : parseInt(entity.slice(2, -1), 10);
	return Number.isFinite(code) && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
});
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(match => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4])]));
const withoutScripts = html => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ");
const text = html => decode(withoutScripts(html).replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const url = (value, route = "/") => { try { return new URL(value, `${origin}${route}`); } catch { return undefined; } };
const normalize = pathname => {
	const decoded = decodeURIComponent(pathname);
	return decoded.endsWith("/index.html") ? decoded.slice(0, -10) : /\.[a-z\d]+$/i.test(decoded) ? decoded : decoded.endsWith("/") ? decoded : `${decoded}/`;
};
const walk = directory => {
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const file = path.join(directory, entry.name);
		if (entry.isDirectory()) walk(file);
		else if (entry.name.endsWith(".html")) {
			const relative = path.relative(root, file).split(path.sep).join("/");
			if (/^google[a-f0-9]+\.html$/.test(relative)) continue;
			if (/^(?:404(?:\/|\.html)|_not-found(?:\/|\.html))/.test(relative)) continue;
			const route = normalize(`/${relative}`.replace(/\/index\.html$/, "/"));
			const html = fs.readFileSync(file, "utf8");
			const dom = withoutScripts(html);
			const main = dom.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
			const article = main.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ?? main;
			const links = [...dom.matchAll(/<link\b[^>]*>/gi)].map(match => attrs(match[0]));
			const meta = [...dom.matchAll(/<meta\b[^>]*>/gi)].map(match => attrs(match[0]));
			const canonical = links.filter(link => link.rel === "canonical");
			const alternates = links.filter(link => link.rel === "alternate" && link.hreflang);
			const robots = meta.filter(item => /^(?:robots|googlebot)$/i.test(item.name ?? "")).map(item => item.content ?? "").join(",");
			const locale = route.split("/")[1];
			const schemas = [];
			for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
				if (attrs(match[1]).type !== "application/ld+json") continue;
				try {
					const data = JSON.parse(match[2]);
					const flatten = item => { if (Array.isArray(item)) item.forEach(flatten); else if (item && typeof item === "object") { schemas.push(item); if (item["@graph"]) flatten(item["@graph"]); } };
					flatten(data);
				} catch { add(route, "invalid JSON-LD JSON"); }
			}
			pages.set(route, { route, dom, main, article, text: text(main), articleText: text(article), canonical, alternates, robots, noindex: /\bnoindex\b/i.test(robots), lang: attrs(dom.match(/<html\b[^>]*>/i)?.[0] ?? "").lang, locale: locale in languages ? locale : undefined, schemas });
		}
	}
};

if (!fs.existsSync(root)) throw new Error(`Static export directory does not exist: ${root}. Run the production build first.`);
walk(root);
for (const slug of editorialSlugs) for (const locale of ["en", "zh-cn"]) {
	const route = `/${locale}/guides/${slug}/`;
	if (!pages.has(route)) add(route, "required editorial guide missing exported HTML");
}
const sitemapFile = path.join(root, "sitemap.xml");
if (!fs.existsSync(sitemapFile)) throw new Error(`Missing sitemap: ${sitemapFile}`);
const sitemap = fs.readFileSync(sitemapFile, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
const sitemapRoutes = new Set();
if (!sitemapUrls.length) add("sitemap.xml", "no sitemap URLs");
if (new Set(sitemapUrls).size !== sitemapUrls.length) add("sitemap.xml", "duplicate URLs");
for (const value of sitemapUrls) {
	const target = url(value);
	if (!target || target.origin !== origin || target.search || target.hash) { add("sitemap.xml", `invalid production URL: ${value}`); continue; }
	const route = normalize(target.pathname);
	sitemapRoutes.add(route);
	const page = pages.get(route);
	if (!page) { add(route, "sitemap URL has no exported HTML"); continue; }
	if (page.noindex) add(route, "noindex page in sitemap");
	if (page.canonical[0]?.href !== value) add(route, "sitemap includes a noncanonical URL");
}
const robotsFile = path.join(root, "robots.txt");
if (!fs.existsSync(robotsFile)) add("robots.txt", "missing robots.txt");
else {
	const robots = fs.readFileSync(robotsFile, "utf8");
	if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) add("robots.txt", "sitemap directive does not match production sitemap");
	if (/^Disallow:\s*\/\s*$/im.test(robots)) add("robots.txt", "sitewide crawl block");
}

let internalLinks = 0;
let alternateLinks = 0;
let fallbackPages = 0;
let editorialGuides = 0;
for (const page of pages.values()) {
	const { route, dom, main, locale } = page;
	if (page.canonical.length !== 1) add(route, `expected one canonical, found ${page.canonical.length}`);
	const canonical = url(page.canonical[0]?.href ?? "");
	if (!canonical || canonical.origin !== origin || canonical.search || canonical.hash) add(route, "canonical must use the production origin without query or fragment");
	else {
		const canonicalRoute = normalize(canonical.pathname);
		const target = pages.get(canonicalRoute);
		if (!target) add(route, `canonical target has no HTML: ${canonicalRoute}`);
		else if (target.noindex) add(route, "canonical points to noindex page");
		if (locale && !page.noindex && canonicalRoute !== route) add(route, `indexable locale page is not self-canonical: ${canonicalRoute}`);
		if (!locale && canonicalRoute !== route && canonicalRoute !== `/zh-cn${route}`) add(route, `unexpected legacy canonical target: ${canonicalRoute}`);
		if (page.noindex) {
			fallbackPages++;
			if (!/\bfollow\b/i.test(page.robots)) add(route, "fallback page should allow following links");
			if (sitemapRoutes.has(route)) add(route, "fallback page must not appear in sitemap");
		}
		if (!page.noindex && canonicalRoute === route && locale && !sitemapRoutes.has(route)) add(route, "canonical locale page absent from sitemap");
	}
	if (locale && page.lang !== languages[locale]) add(route, `html lang ${page.lang ?? "missing"} does not match ${languages[locale]}`);
	if (!page.lang) add(route, "missing html lang");
	if ((dom.match(/<h1\b/gi) ?? []).length !== 1) add(route, "expected one visible h1");
	if (!main || page.text.length < 60) add(route, "missing substantive server-rendered main text");
	if (/lorem ipsum|内容建设中|后续将补充/i.test(page.text)) add(route, "placeholder content");
	if (!/<title>[^<]+<\/title>/i.test(dom)) add(route, "missing title");
	if (![...dom.matchAll(/<meta\b[^>]*>/gi)].some(match => { const a = attrs(match[0]); return a.name === "description" && a.content?.trim(); })) add(route, "missing description");

	const alternateMap = new Map();
	for (const alternate of page.alternates) {
		alternateLinks++;
		const key = alternate.hreflang.toLowerCase();
		if (alternateMap.has(key)) add(route, `duplicate hreflang ${key}`);
		alternateMap.set(key, alternate.href);
		const destination = url(alternate.href, route);
		if (!destination || destination.origin !== origin) { add(route, `invalid alternate ${alternate.href}`); continue; }
		const target = pages.get(normalize(destination.pathname));
		if (!target) { add(route, `alternate target missing HTML: ${alternate.href}`); continue; }
		if (target.noindex) add(route, `alternate points to noindex: ${alternate.href}`);
		if (target.canonical[0]?.href !== alternate.href) add(route, `alternate target not self-canonical: ${alternate.href}`);
		if (key !== "x-default" && target.lang?.toLowerCase() !== key) add(route, `hreflang ${key} differs from target HTML language`);
		if (locale && !page.noindex) {
			const selfKey = page.lang?.toLowerCase();
			if (!target.alternates.some(entry => entry.hreflang.toLowerCase() === selfKey && entry.href === `${origin}${route}`)) add(route, `alternate lacks return link: ${alternate.href}`);
		}
	}
	if (locale && !page.noindex) {
		if (!alternateMap.size) add(route, "indexable localized page missing hreflang");
		if (alternateMap.get(page.lang?.toLowerCase()) !== `${origin}${route}`) add(route, "hreflang missing self reference");
	}
	if (page.noindex && alternateMap.size) add(route, "fallback page should not advertise hreflang");

	for (const match of dom.matchAll(/<a\b[^>]*>/gi)) {
		const href = attrs(match[0]).href;
		if (!href || /^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;
		const target = url(href, route);
		if (!target || target.origin !== origin) continue;
		internalLinks++;
		const targetRoute = normalize(target.pathname);
		if (!pages.has(targetRoute)) {
			const file = path.resolve(root, `.${decodeURIComponent(target.pathname)}`);
			if (!file.startsWith(`${root}${path.sep}`) || !fs.existsSync(file)) add(route, `broken internal link: ${href}`);
		}
	}
	const isGuide = /^\/(?:zh-cn|en)\/guides\/[^/]+\/$/.test(route) && !page.noindex;
	const detail = locale && /^\/(?:[^/]+)\/(?:guides|browsers|tools|fingerprint|compare)\/[^/]+\/$/.test(route);
	if (locale && /^\/[^/]+\/browsers\/[^/]+\/$/.test(route)) {
		const slug = route.split("/")[3];
		if (!page.article.includes(`data-product-evidence="${slug}"`)) add(route, "product missing visible official-source verification");
		if (!/Current price unverified|Listed price confirmed|当前价格未核实|所列价格已在该日期确认/.test(page.articleText)) add(route, "product missing explicit price verification status");
	}
	if (detail && !page.schemas.length) add(route, "detail page missing JSON-LD");
	for (const schema of page.schemas) {
		if (!schema["@type"] && !schema["@graph"]) add(route, "JSON-LD object missing @type or @graph");
		if (schema["@type"] === "FAQPage") {
			if (!Array.isArray(schema.mainEntity) || schema.mainEntity.length < 1) add(route, "FAQPage has no questions");
			for (const question of schema.mainEntity ?? []) {
				if (!question.name || !question.acceptedAnswer?.text) add(route, "FAQ question missing name or answer");
				else if (!page.articleText.includes(text(question.name)) || !page.articleText.includes(text(question.acceptedAnswer.text))) add(route, "FAQ structured data does not match visible article text");
			}
		}
	}
	if (isGuide) {
		const headings = (page.article.match(/<h2\b/gi) ?? []).length;
		if (page.articleText.length < 650 || headings < 3) add(route, "guide too thin: expected at least 650 visible characters and three h2 sections");
		const sourceHeading = /<h[23]\b[^>]*>[^<]*(?:Sources|References|来源|参考)/i.test(page.article);
		const requiredEditorial = editorialSlugs.includes(route.split("/")[3]);
		if (requiredEditorial && !sourceHeading) add(route, "editorial guide missing dedicated sources section");
		// All published English/Chinese guides must meet the same sourced editorial standard.
		if (sourceHeading || requiredEditorial) {
			editorialGuides++;
			const externalSources = [...page.article.matchAll(/<a\b[^>]*>/gi)].map(match => attrs(match[0]).href).filter(href => { const target = url(href ?? ""); return target && /^https?:$/.test(target.protocol) && target.origin !== origin; });
			if (new Set(externalSources).size < 3) add(route, "editorial guide needs at least three external source links");
			if (page.articleText.length < (locale === "en" ? 4500 : 2200) || headings < 6) add(route, "editorial guide needs richer visible text and at least six h2 sections");
			if (!page.schemas.some(schema => schema["@type"] === "FAQPage")) add(route, "editorial guide missing FAQPage JSON-LD");
			if (!/\bFAQ\b|常见问题/i.test(page.articleText)) add(route, "editorial guide missing visible FAQ");
			const cjkCharacters = (page.articleText.match(/[\u3400-\u9fff]/g) ?? []).length;
			if (locale === "en" && cjkCharacters > 30) add(route, "English editorial guide contains substantial untranslated Chinese text");
			if (locale === "zh-cn" && cjkCharacters < 700) add(route, "Chinese editorial guide lacks substantive Chinese text");
		} else warnings.push({ route, problem: "older guide lacks a dedicated linked sources section; improve during editorial refresh" });
	}
}

const uniqueIssues = [...new Map(issues.map(issue => [`${issue.route}\0${issue.problem}`, issue])).values()];
const summary = { generatedAt: new Date().toISOString(), root, htmlPages: pages.size, sitemapUrls: sitemapUrls.length, internalLinks, alternateLinks, fallbackPages, editorialGuides, errors: uniqueIssues.length, warnings: warnings.length };
if (args.includes("--json")) console.log(JSON.stringify({ summary, issues: uniqueIssues, warnings }, null, 2));
else {
	console.log(`SEO audit: ${pages.size} HTML pages, ${sitemapUrls.length} sitemap URLs, ${internalLinks} internal links, ${alternateLinks} hreflang links, ${fallbackPages} noindex fallbacks, ${editorialGuides} sourced editorial guides.`);
	for (const issue of uniqueIssues.slice(0, 80)) console.error(`ERROR ${issue.route}: ${issue.problem}`);
	if (uniqueIssues.length > 80) console.error(`... ${uniqueIssues.length - 80} additional errors; use --json for all findings.`);
	console.log(`${uniqueIssues.length ? "FAIL" : "PASS"}: ${uniqueIssues.length} errors; ${warnings.length} editorial refresh opportunities (see --json).`);
}
if (uniqueIssues.length && !args.includes("--baseline")) process.exitCode = 1;
