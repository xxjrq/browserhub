#!/usr/bin/env node
/**
 * Heading-localisation audit.
 *
 * Why this exists: page thickness must not vary by language. An audit on
 * 2026-11-01 found the `browsers` detail type was the last page class whose
 * section headings were never translated — all seven `<h2>` headings were
 * English in ja/ko/es/pt/ru, while `tools`, `fingerprint` and `about` already
 * had localised headings. The same method also found a duplicated
 * "Official sources and verification" `<h2>` on every comparison page, because
 * the evidence block rendered one heading per product.
 *
 * Method: for each non-English sitemap URL, take the set of `<h2>` strings on
 * the matching English page and report any heading that appears verbatim in
 * both sets. A heading that is byte-identical to the English one is, by
 * definition, not translated. This needs no per-language script heuristics, so
 * it works identically for ja/ko (CJK) and es/pt/ru (Latin script).
 *
 * Two kinds of heading are excluded, because both are correct as they are:
 *
 *  - **Entry names.** A catalogue index lists its entries with the entry name
 *    as the `<h2>`, so `/ja/browsers/` uses "EasyBR" and `/ja/tools/` uses
 *    "CreepJS". Those are product and tool names, not editorial headings, and
 *    the same name appears on every locale. The set of entry names is read
 *    from the rendered index pages rather than hard-coded, so a new product
 *    is classified correctly without editing this script.
 *  - **Article titles.** The guides index lists article titles, and an
 *    article title is a proper name of that article.
 *
 * A duplicate `<h2>` on one page is always reported: two headings with the
 * same text at the same level are a structural defect regardless of language.
 *
 * Usage: `node scripts/audit-heading-localisation.mjs` (exit 1 on findings).
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../out/", import.meta.url).pathname;
const TARGETS = ["zh-cn", "ja", "ko", "es", "pt", "ru"];

function walk(dir) {
	const out = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) out.push(...walk(full));
		else if (entry === "index.html") out.push(full);
	}
	return out;
}

function articleHtml(file) {
	const html = readFileSync(file, "utf8");
	const match = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
	return match ? match[1] : html;
}

function headingsOf(file) {
	const body = articleHtml(file);
	const out = [];
	for (const match of body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)) {
		out.push(match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
	}
	return out;
}

function fileFor(pathname) {
	return join(ROOT, pathname.replace(/^\//, ""), "index.html");
}

function typeOf(pathname) {
	const segments = pathname.replace(/^\/(en|zh-cn|ja|ko|es|pt|ru)\//, "").split("/").filter(Boolean);
	const type = segments[0] || "home";
	return segments.length > 1 ? `${type}-detail` : `${type}-index`;
}

const sitemap = readFileSync(join(ROOT, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const english = new Map();
for (const url of urls) {
	const pathname = new URL(url).pathname;
	if (!pathname.startsWith("/en/")) continue;
	english.set(pathname.replace(/^\/en/, ""), headingsOf(fileFor(pathname)));
}

/**
 * Collect the entry names rendered on the English index pages.
 *
 * An index page is the only page type whose `<h2>` is the name of a listed
 * entry. Reading them from the built pages means the classification follows
 * the catalogue instead of a hard-coded list that drifts as products are
 * added.
 */
const entryNames = new Set();
for (const relative of english.keys()) {
	if (!relative.endsWith("/")) continue;
	const segments = relative.replace(/^\//, "").split("/").filter(Boolean);
	// The index of a section has one path segment; a detail page has two.
	if (segments.length !== 1) continue;
	const file = fileFor(`/en/${relative}`);
	if (!file.endsWith("index.html")) continue;
	for (const heading of headingsOf(file)) entryNames.add(heading);
}

const rows = [];
const duplicateHeadings = [];
for (const url of urls) {
	const pathname = new URL(url).pathname;
	const locale = pathname.split("/")[1];
	if (!TARGETS.includes(locale)) continue;
	const relativePath = pathname.replace(new RegExp(`^/${locale}`), "");
	const englishHeadings = english.get(relativePath);
	if (!englishHeadings) continue;
	const local = headingsOf(fileFor(pathname));
	const englishSet = new Set(englishHeadings);
	const untranslated = local.filter((heading) => englishSet.has(heading) && !entryNames.has(heading));
	if (untranslated.length) {
		rows.push({ locale, type: typeOf(pathname), path: pathname, count: untranslated.length, total: local.length, untranslated });
	}
	const seen = new Map();
	for (const heading of local) seen.set(heading, (seen.get(heading) ?? 0) + 1);
	for (const [heading, count] of seen) {
		if (count > 1) duplicateHeadings.push({ locale, type: typeOf(pathname), path: pathname, heading, count });
	}
}

console.log("=== Untranslated headings (identical to the English page) ===");
const byType = new Map();
for (const row of rows) {
	const key = `${row.locale}:${row.type}`;
	if (!byType.has(key)) byType.set(key, { pages: 0, headings: 0, sample: row.untranslated });
	const bucket = byType.get(key);
	bucket.pages += 1;
	bucket.headings += row.count;
}
if (!rows.length) console.log("none");
for (const key of [...byType.keys()].sort()) {
	const bucket = byType.get(key);
	console.log(
		`  ${key.padEnd(20)} pages=${String(bucket.pages).padStart(3)} headings=${String(bucket.headings).padStart(4)}  e.g. ${bucket.sample.slice(0, 2).join(" | ").slice(0, 90)}`
	);
}
console.log(`  total pages with untranslated headings: ${rows.length}`);

console.log("\n=== Duplicate <h2> within a single page ===");
if (!duplicateHeadings.length) console.log("none");
const dupByHeading = new Map();
for (const item of duplicateHeadings) {
	const key = `${item.heading} (${item.count}x)`;
	dupByHeading.set(key, (dupByHeading.get(key) ?? 0) + 1);
}
for (const [key, count] of [...dupByHeading.entries()].sort((a, b) => b[1] - a[1])) {
	console.log(`  ${String(count).padStart(4)} pages: ${key}`);
}
console.log(`  total pages with a duplicated heading: ${new Set(duplicateHeadings.map((item) => item.path)).size}`);

process.exit(rows.length || duplicateHeadings.length ? 1 : 0);
