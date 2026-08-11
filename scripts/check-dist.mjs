import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const htmlFiles = [];
const walk = directory => {
	for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
		const file = path.join(directory, entry.name);
		if (entry.isDirectory()) walk(file);
		else if (entry.name.endsWith(".html")) htmlFiles.push(file);
	}
};
walk(root);
const errors = [];
const titles = new Map();
const descriptions = new Map();
const locales = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"];
const localeLang = { "zh-cn": "zh-CN", en: "en", ja: "ja", ko: "ko", es: "es", pt: "pt", ru: "ru" };
for (const file of htmlFiles) {
	const html = fs.readFileSync(file, "utf8");
	if (!file.includes("/404") && !file.includes("/_not-found")) {
		if ((html.match(/<h1\b/gi) ?? []).length !== 1) errors.push(`${file}: expected one h1`);
		if (!/<link[^>]+rel=["']canonical["']/i.test(html)) errors.push(`${file}: missing canonical`);
		const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim();
		const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim();
		const relativeForBucket = path.relative(root, file).replaceAll("\\", "/");
		const bucket = locales.find(item => relativeForBucket === `${item}/index.html` || relativeForBucket.startsWith(`${item}/`)) ?? "root";
		if (title) { const key = `${bucket}::${title}`; titles.set(key, [...(titles.get(key) ?? []), file]); }
		if (description) { const key = `${bucket}::${description}`; descriptions.set(key, [...(descriptions.get(key) ?? []), file]); }
		const relative = path.relative(root, file).replaceAll("\\", "/");
		const sectionRoot = new Set(["index.html", "about/index.html", "browsers/index.html", "compare/index.html", "contact/index.html", "en/index.html", "fingerprint/index.html", "guides/index.html", "privacy/index.html", "tools/index.html"]);
		if (!sectionRoot.has(relative) && !/<script[^>]+type=["']application\/ld\+json["']/i.test(html)) errors.push(`${file}: missing JSON-LD`);
		const locale = locales.find(item => relative === `${item}/index.html` || relative.startsWith(`${item}/`));
		if (locale) {
			const expectedLang = localeLang[locale];
			const actualLang = html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1];
			if (actualLang !== expectedLang) errors.push(`${file}: expected html lang=${expectedLang}, found ${actualLang ?? "missing"}`);
			const alternateCount = (html.match(/rel=["']alternate["'][^>]+hrefLang=/gi) ?? []).length;
			if (alternateCount < 8) errors.push(`${file}: expected 8 hreflang links, found ${alternateCount}`);
			if (!/<meta[^>]+property=["']og:title["']/i.test(html)) errors.push(`${file}: missing OpenGraph title`);
		}
	}
	if (/<a\b[^>]*>\s*<button\b/i.test(html)) errors.push(`${file}: nested anchor/button`);
	if (/后续将补充|内容建设中|Coming soon|lorem ipsum/i.test(html)) errors.push(`${file}: placeholder content`);
}
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
if (urls.some(url => !url.startsWith("https://browserhub.co/"))) errors.push("sitemap contains a non-production domain");
for (const locale of locales) {
	const localeHome = path.join(root, locale, "index.html");
	if (!fs.existsSync(localeHome)) errors.push(`missing locale homepage: ${locale}`);
	const localeUrls = urls.filter(url => url.includes(`browserhub.co/${locale}/`));
	if (localeUrls.length < 117) errors.push(`locale sitemap coverage below expected minimum: ${locale} (${localeUrls.length})`);
}
if (htmlFiles.some(file => /\?lang=/.test(fs.readFileSync(file, "utf8")))) errors.push("locale switching must not use ?lang=");
if (!/<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/browserhub\.co\/zh-cn\//i.test(fs.readFileSync(path.join(root, "index.html"), "utf8"))) errors.push("root canonical must point to /zh-cn/");
if ((sitemap.match(/\/browsers\/[^<]+/g) ?? []).length < 36) errors.push("browser count below 36");
if ((sitemap.match(/\/tools\/[^<]+/g) ?? []).length < 35) errors.push("tool count below 35");
if ((sitemap.match(/\/fingerprint\/[^<]+/g) ?? []).length < 15) errors.push("technology count below 15");
if ((sitemap.match(/\/guides\/[^<]+/g) ?? []).length < 12) errors.push("guide count below 12");
if ((sitemap.match(/\/compare\/[^<]+/g) ?? []).length < 12) errors.push("comparison count below 12");
for (const [value, files] of titles) if (files.length > 1) errors.push(`duplicate title: ${value.replace(/^[^:]+::/, "")} (${files.length} pages)`);
for (const [value, files] of descriptions) if (files.length > 1) errors.push(`duplicate description: ${value.replace(/^[^:]+::/, "")} (${files.length} pages)`);
if (/本站产品/.test(fs.readFileSync(path.join(root, "index.html"), "utf8"))) errors.push("homepage contains internal product label");
if (!fs.existsSync(path.join(root, "brand/browserhub-og.png"))) errors.push("missing OG image");
if (!fs.existsSync(path.join(root, "manifest.webmanifest"))) errors.push("missing manifest");
if (errors.length) {
	console.error(errors.join("\n"));
	process.exit(1);
}
console.log(`check-dist passed: ${htmlFiles.length} HTML files, ${urls.length} sitemap URLs`);
