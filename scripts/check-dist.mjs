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
for (const file of htmlFiles) {
	const html = fs.readFileSync(file, "utf8");
	if (!file.includes("/404") && !file.includes("/_not-found")) {
		if ((html.match(/<h1\b/gi) ?? []).length !== 1) errors.push(`${file}: expected one h1`);
		if (!/<link[^>]+rel=["']canonical["']/i.test(html)) errors.push(`${file}: missing canonical`);
	}
	if (/<a\b[^>]*>\s*<button\b/i.test(html)) errors.push(`${file}: nested anchor/button`);
	if (/后续将补充|内容建设中|Coming soon|lorem ipsum/i.test(html)) errors.push(`${file}: placeholder content`);
}
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
if (urls.some(url => !url.startsWith("https://browserhub.co/"))) errors.push("sitemap contains a non-production domain");
if ((sitemap.match(/\/browsers\/[^<]+/g) ?? []).length < 36) errors.push("browser count below 36");
if ((sitemap.match(/\/tools\/[^<]+/g) ?? []).length < 35) errors.push("tool count below 35");
if ((sitemap.match(/\/fingerprint\/[^<]+/g) ?? []).length < 15) errors.push("technology count below 15");
if (!fs.existsSync(path.join(root, "brand/browserhub-og.png"))) errors.push("missing OG image");
if (!fs.existsSync(path.join(root, "manifest.webmanifest"))) errors.push("missing manifest");
if (errors.length) {
	console.error(errors.join("\n"));
	process.exit(1);
}
console.log(`check-dist passed: ${htmlFiles.length} HTML files, ${urls.length} sitemap URLs`);
