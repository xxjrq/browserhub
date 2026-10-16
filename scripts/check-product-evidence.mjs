/** Validate provenance and catch stale prices across the generated public pages. */
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(fs.readFileSync("src/data/verified-products.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const exports = {};
vm.runInNewContext(compiled, { exports }, { timeout: 1000 });
const products = exports.verifiedProducts;
const catalog = JSON.parse(fs.readFileSync("src/data/catalog/readme-browsers.json", "utf8")).browsers;
const evidence = JSON.parse(fs.readFileSync("docs/seo/product-evidence-2026-10-16.json", "utf8")).products;
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const decode = value => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (_, hex, number) => String.fromCodePoint(parseInt(hex ?? number, hex ? 16 : 10)));
let datedPrices = 0;
for (const item of catalog) {
	const p = products[item.id];
	assert(Boolean(p), `${item.id}: missing review record`);
	if (!p) continue;
	assert(Boolean(evidence[item.id]), `${item.id}: missing research evidence`);
	assert(evidence[item.id]?.currentPrice === p.en.price, `${item.id}: evidence price differs from displayed record`);
	assert(evidence[item.id]?.pricingStatus === p.pricingStatus, `${item.id}: evidence price status mismatch`);
	for (const [field, check] of Object.entries(p.checks)) {
		assert(["verified", "unknown", "contradicted"].includes(check.status), `${item.id}/${field}: invalid verification state`);
		if (check.status === "verified") assert(check.sourceUrls.length > 0, `${item.id}/${field}: confirmed field without source`);
		for (const url of check.sourceUrls) assert(p.sources.some(source => source.url === url && source.fields.includes(field)), `${item.id}/${field}: evidence missing from source register`);
	}
	for (const flag of ["api", "automation", "proxy"]) if (p.zh[flag] || p.en[flag]) assert(p.checks[flag]?.status === "verified", `${item.id}/${flag}: capability asserted without confirmation`);
	if (p.pricingStatus === "verified") {
		datedPrices++;
		assert(p.checks.price?.status === "verified", `${item.id}: confirmed price has no verified check`);
		assert(p.zh.pricingCheckedAt === p.verifiedAt && p.en.pricingCheckedAt === p.verifiedAt, `${item.id}: confirmed price date differs from review date`);
	}
	for (const locale of ["en", "zh-cn"]) {
		const file = `out/${locale}/browsers/${item.id}/index.html`;
		assert(fs.existsSync(file), `${item.id}/${locale}: missing exported page`);
		if (!fs.existsSync(file)) continue;
		const html = fs.readFileSync(file, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
		const text = decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ");
		const edition = p[locale === "en" ? "en" : "zh"];
		for (const field of ["free", "price"]) assert(edition[field] && text.includes(edition[field]), `${item.id}/${locale}: reviewed ${field} missing from visible HTML`);
		for (const source of p.sources) assert(decode(html).includes(`href="${source.url}"`), `${item.id}/${locale}: official source missing from visible HTML`);
	}
}
assert(Object.keys(products).length === catalog.length, "review coverage differs from catalogue");
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Product evidence PASS: ${catalog.length} entries, ${datedPrices} confirmed price/licence records, ${catalog.length - datedPrices} prices explicitly unverified; English/Chinese HTML agrees with reviewed facts.`);
