/**
 * Runtime validation for the knowledge files.
 *
 *   src/app/llms.txt/route.ts          → /llms.txt
 *   src/app/[locale]/llms.txt/route.ts → /{locale}/llms.txt
 *
 * Why this check exists
 * ---------------------
 * `llms.txt` is the file AI answer engines read to decide what a site covers
 * and which pages to cite. Its failure mode is invisible to `tsc` and to the
 * SEO audit: if a catalogue type loses its section, or a section's links stop
 * being generated, the file still compiles, still returns 200, and still
 * passes every other gate. The site looks healthy while the answer engine can
 * no longer resolve a comparison, a tool or a fingerprint page.
 *
 * That is exactly what happened before 2026-10-31. The old file linked 205 of
 * 1,036 sitemap URLs; comparisons, tools and fingerprint pages had none. A
 * second audit on 2026-11-06 found the mirror-image defect: the root file
 * linked 464 of 1,096 sitemap URLs, and all 632 missing URLs belonged to the
 * five secondary locales. Each locale now has its own knowledge file, and
 * this script holds all seven of them to the same standard.
 *
 * The files are rendered by invoking the routes' `GET()` through the real
 * module boundary, so this script inspects the bytes that ship rather than a
 * re-implementation of them. The built per-language knowledge files are then
 * read back and compared against the rendered bodies, which catches a route
 * change that was never rebuilt.
 *
 * Checks on the root file:
 *   1. Every catalogue type has a section, and every section has entries.
 *   2. Every entry links both an English and a Chinese URL.
 *   3. Every link points at a page that exists in `out/` (no dead links) and
 *      is a real absolute URL on the production origin.
 *   4. Coverage: every sitemap URL for every detail page type is reachable
 *      from llms.txt. Index pages are excluded because they are navigational.
 *   5. The English line of an entry carries no CJK, and the Chinese line of a
 *      browser, tool or fingerprint entry carries Chinese. Both are checked
 *      as text ranges so a stray ideograph cannot hide.
 *   6. Every product line prints its review date, so a price is never present
 *      without the date it was checked.
 *   7. The build output matches the freshly rendered body.
 *
 * Checks on each per-locale file:
 *   8. The file exists in the build output and matches the rendered body.
 *   9. Every sitemap URL of that locale is linked, and no page of another
 *      locale is linked except the sibling home pages and the root file.
 *  10. Every description equals the meta description of the page it links to,
 *      read back from the built HTML. This is the invariant that keeps a
 *      knowledge file and the page it describes from drifting apart.
 *  11. No Chinese copy leaks into a non-Chinese file. The needles are the
 *      Chinese source strings themselves, not a character range: Japanese and
 *      Korean legitimately contain Han characters, so a "no CJK" rule would
 *      fail every correct translation.
 *  12. A browser line prints the review date and states the price status, and
 *      the status wording matches the reviewed record.
 *
 * Usage: node scripts/check-llms-txt.mjs [--src <dir>] [--out <dir>]
 *   --src lets the mutation test point the check at a copy of the source tree
 *   so a defect can be injected without touching the working directory.
 */

import { readFileSync, existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const args = process.argv.slice(2);
const option = (name, fallback) => {
	const index = args.indexOf(name);
	return index === -1 ? fallback : resolve(args[index + 1]);
};
const srcRoot = option("--src", root);
const outDir = option("--out", join(root, "out"));

const failures = [];
const check = (label, condition, detail) => {
	if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

const ORIGIN = "https://browserhub.co";
const LOCALES = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"];

// Page types that llms.txt must link. Index pages are navigational and are
// deliberately excluded from the root file's coverage rule; the per-locale
// files list them, because a knowledge file for a language subtree has to
// describe that subtree in full.
const DETAIL_TYPES = ["browsers", "tools", "fingerprint", "guides", "compare"];

// The two locales that carry complete original copy. The other five locales
// render localised headings over the English body, so they are indexed but
// are not the canonical copy for an answer engine to cite.
const PRIMARY_LOCALES = ["en", "zh-cn"];

const CJK = /[一-鿿]/;
const CJK_RUN = /[一-鿿]{2,}/g;

const decodeEntities = value => value
	.replace(/&lt;/g, "<")
	.replace(/&gt;/g, ">")
	.replace(/&quot;/g, '"')
	.replace(/&#x27;|&#39;|&apos;/g, "'")
	.replace(/&amp;/g, "&");

// ---------------------------------------------------------------------------
// 0: sanity probes — the script must be able to fail before it can be trusted.
// ---------------------------------------------------------------------------

const workDir = mkdtempSync(join(tmpdir(), "browserhub-llms-"));
let rendered = "";
let sitemapUrls = [];
let distText = "";
let entries = [];
const localeBodies = new Map();

try {
	const transpile = text => ts.transpileModule(text, {
		compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
	}).outputText;

	// The routes reach into the catalogue through "@/..." aliases, and the
	// catalogue modules import each other with relative specifiers and pull in
	// JSON. Every one of those has to be rewritten to a flat sibling file in
	// the temp directory, because ESM resolves an import specifier literally
	// and there is no bundler here.
	//
	// Modules are emitted in dependency order: an ES module import is
	// resolved when the importing file is evaluated, so a dependency has to
	// exist on disk before the module that imports it runs.
	const importPattern = /from\s+"([^"]+)"/g;

	/** Resolve an import specifier to a repository-relative source path. */
	const resolveSpecifier = (fromRelative, specifier) => {
		let base;
		if (specifier.startsWith("@/")) {
			base = `src/${specifier.slice(2)}`;
		} else if (specifier.startsWith("./") || specifier.startsWith("../")) {
			base = join(dirname(fromRelative), specifier).replace(/\\/g, "/");
		} else {
			return null;
		}
		const candidates = [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`];
		for (const candidate of candidates) {
			if (candidate.endsWith(".json")) {
				if (existsSync(join(srcRoot, candidate))) return candidate;
				continue;
			}
			if (existsSync(join(srcRoot, candidate))) return candidate;
		}
		return null;
	};

	/** Flat, collision-free output name for a resolved source path. */
	const outputName = resolved => {
		const flat = resolved.replace(/^src\//, "").replace(/\//g, "__").replace(/[[\]]/g, "_");
		return flat.endsWith(".json") ? `${flat}.mjs` : flat.replace(/\.tsx?$/, ".mjs");
	};

	const ordered = [];
	const emitted = new Set();
	const emittedAs = new Map();
	const visit = relative => {
		if (emitted.has(relative)) return;
		emitted.add(relative);
		const source = readFileSync(join(srcRoot, relative), "utf8");
		for (const match of source.matchAll(importPattern)) {
			const resolved = resolveSpecifier(relative, match[1]);
			if (!resolved) {
				failures.push(`route dependency could not be resolved — ${match[1]} (from ${relative})`);
				continue;
			}
			visit(resolved);
		}
		ordered.push(relative);
	};
	visit("src/app/llms.txt/route.ts");
	visit("src/app/[locale]/llms.txt/route.ts");

	for (const relative of ordered) {
		const source = readFileSync(join(srcRoot, relative), "utf8");
		let code;
		if (relative.endsWith(".json")) {
			// A JSON catalogue file becomes a module with a default export.
			code = `export default ${source};\n`;
		} else {
			code = transpile(source);
			code = code.replace(/from\s+"([^"]+)"/g, (full, specifier) => {
				const resolved = resolveSpecifier(relative, specifier);
				if (!resolved) return full;
				return `from "./${outputName(resolved)}"`;
			});
		}
		const name = outputName(relative);
		writeFileSync(join(workDir, name), code);
		emittedAs.set(relative, name);
	}

	const importModule = async relative => import(pathToFileURL(join(workDir, emittedAs.get(relative))).href);

	const routeModule = await importModule("src/app/llms.txt/route.ts");
	const localeRouteModule = await importModule("src/app/[locale]/llms.txt/route.ts");
	rendered = await routeModule.GET().text();

	// The data layer is imported through the same real modules the routes
	// use, so the expectations below cannot drift from the shipped data.
	const resources = await importModule("src/data/resources.ts");
	const verified = await importModule("src/data/verified-products.ts");
	const evidenceCopy = await importModule("src/lib/evidence-copy.ts");
	const llmsLocaleCopy = await importModule("src/data/llms-locale-copy.ts");
	const i18n = await importModule("src/lib/i18n.ts");
	const localeUi = await importModule("src/lib/locale-ui.ts");

	for (const locale of LOCALES) {
		const response = await localeRouteModule.GET(new Request(`${ORIGIN}/${locale}/llms.txt`), {
			params: Promise.resolve({ locale })
		});
		localeBodies.set(locale, await response.text());
	}

	// The sitemap and the built files are read from `out/`, so the check runs
	// against the artefacts that ship.
	const sitemapPath = join(outDir, "sitemap.xml");
	const distPath = join(outDir, "llms.txt");
	if (!existsSync(sitemapPath)) {
		failures.push("out/sitemap.xml is missing — run the build before this check");
	}
	if (!existsSync(distPath)) {
		failures.push("out/llms.txt is missing — run the build before this check");
	}
	for (const locale of LOCALES) {
		if (!existsSync(join(outDir, locale, "llms.txt"))) {
			failures.push(`out/${locale}/llms.txt is missing — run the build before this check`);
		}
	}
	if (failures.length) throw new Error("prereq");

	sitemapUrls = [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
	distText = readFileSync(distPath, "utf8");

	// --- probes -------------------------------------------------------------
	// The script must be able to fail. Each probe is a deliberately wrong
	// expectation that the checker would flag if it could not see the defect.
	const probeLink = `${ORIGIN}/en/browsers/easybr/`;
	check("probe: a real catalogue URL is present", rendered.includes(probeLink));
	check("probe: a fabricated URL is absent", !rendered.includes(`${ORIGIN}/en/browsers/not-a-real-product/`));
	check("probe: sitemap is non-empty", sitemapUrls.length > 0, `${sitemapUrls.length} urls`);
	check("probe: a per-locale file links a real catalogue URL", (localeBodies.get("ja") ?? "").includes(`${ORIGIN}/ja/browsers/easybr/`));
	check("probe: a per-locale file does not link a fabricated URL", !(localeBodies.get("ja") ?? "").includes(`${ORIGIN}/ja/browsers/not-a-real-product/`));

	// --- 1: sections exist and are populated -------------------------------
	const sections = [
		["Browsers tracked", "browsers"],
		["Detection and automation tools", "tools"],
		["Browser fingerprint signals", "fingerprint"],
		["Browser comparisons", "compare"],
		["Guides and tutorials", "guides"]
	];
	const sectionBodies = new Map();
	for (const [title, type] of sections) {
		const start = rendered.indexOf(`## ${title}`);
		check(`section "${title}" exists`, start !== -1);
		if (start === -1) continue;
		const next = rendered.indexOf("\n## ", start + 1);
		const body = rendered.slice(start, next === -1 ? rendered.length : next);
		sectionBodies.set(type, body);
		check(`section "${title}" is not empty`, body.trim().length > 200, `${body.trim().length} chars`);
		const entries = body.split("\n").filter(line => line.startsWith("- ["));
		check(`section "${title}" has entries`, entries.length > 0, `${entries.length} entries`);
	}

	// --- 2 & 3: every entry links two live URLs ----------------------------
	// The root file holds two kinds of link line. A catalogue entry pairs an
	// English and a Chinese URL for the same resource, and the checks below
	// assert that pair. A language-file line points at one locale's own
	// knowledge file and has no pair, so it is parsed separately and checked
	// against the built output instead.
	const entryPattern = /^- \[([^\]]+)\]\((https:\/\/[^)]+)\)(?: · \[([^\]]+)\]\((https:\/\/[^)]+)\))?/gm;
	for (const match of rendered.matchAll(entryPattern)) {
		if (/\/llms\.txt$/.test(match[2])) continue;
		entries.push({ label: match[1], en: match[2], zh: match[4] ?? "", index: match.index });
	}
	check("llms.txt has entries", entries.length > 0, `${entries.length} entries`);

	// The language-file section must name every locale exactly once, and each
	// named file must exist in the build. An answer engine that reads the
	// root file has to be able to reach all seven language files from it.
	const languageFilePattern = /^- \[([^\]]+)\]\((https:\/\/[^)]+\/llms\.txt)\)(?:\s*—\s*(.*))?$/gm;
	const languageFiles = [...rendered.matchAll(languageFilePattern)].map(match => ({
		label: match[1], url: match[2], description: match[3] ?? ""
	}));
	check("the root file links one knowledge file per locale", languageFiles.length === LOCALES.length,
		`${languageFiles.length} links for ${LOCALES.length} locales`);
	for (const locale of LOCALES) {
		const expected = `${ORIGIN}/${locale}/llms.txt`;
		const found = languageFiles.find(entry => entry.url === expected);
		check(`the root file links the ${locale} knowledge file`, Boolean(found), expected);
		if (!found) continue;
		check(`the ${locale} knowledge file exists in the build`, existsSync(join(outDir, locale, "llms.txt")), expected);
		check(`the ${locale} knowledge file link carries a description`, found.description.trim().length > 0,
			found.description.slice(0, 60));
	}

	const outFileFor = url => {
		const path = new URL(url).pathname.replace(/^\//, "").replace(/\/$/, "");
		return join(outDir, path, "index.html");
	};

	for (const entry of entries) {
		check(`entry "${entry.label}" has an English URL`, entry.en.startsWith(`${ORIGIN}/en/`), entry.en);
		check(`entry "${entry.label}" has a Chinese URL`, entry.zh.startsWith(`${ORIGIN}/zh-cn/`), entry.zh);
		for (const url of [entry.en, entry.zh]) {
			if (!url) continue;
			check(`entry "${entry.label}" URL is absolute on the production origin`, url.startsWith(`${ORIGIN}/`), url);
			check(`entry "${entry.label}" URL resolves to a built page`, existsSync(outFileFor(url)), url);
		}
	}

	// --- 4: coverage against the sitemap -----------------------------------
	// Coverage is asserted for the two languages that carry complete original
	// copy. The remaining five locales are indexed and present in the
	// sitemap, but they render localised headings over the English body, so
	// they are not the canonical copy an answer engine should cite. The
	// project's editorial policy names English and Simplified Chinese as the
	// substantive languages (`.agents/product-marketing.md`).
	const linkedPaths = new Set();
	for (const entry of entries) {
		for (const url of [entry.en, entry.zh]) {
			if (url) linkedPaths.add(new URL(url).pathname.replace(/\/$/, ""));
		}
	}
	const missingByType = {};
	for (const url of sitemapUrls) {
		const path = new URL(url).pathname.replace(/\/$/, "");
		const segments = path.split("/").filter(Boolean);
		if (segments.length < 3) continue; // index page, navigational only
		const [locale, type] = segments;
		if (!DETAIL_TYPES.includes(type)) continue;
		if (!PRIMARY_LOCALES.includes(locale)) continue;
		if (!linkedPaths.has(path)) {
			missingByType[type] = missingByType[type] || [];
			missingByType[type].push(path);
		}
	}
	for (const type of DETAIL_TYPES) {
		const missing = missingByType[type] ?? [];
		check(`every sitemap ${type} URL is linked from llms.txt`, missing.length === 0, missing.slice(0, 5).join(", "));
	}

	// Fingerprint pages exist in all seven locales but the two-locale rule
	// applies to them too, so the check is that the English and Chinese
	// fingerprint URL of every signal is linked.
	const fingerprintSlugs = [...new Set(
		sitemapUrls
			.map(url => new URL(url).pathname.replace(/\/$/, ""))
			.filter(path => /^\/[a-z-]+\/fingerprint\/[^/]+$/.test(path))
			.map(path => path.split("/")[3])
	)];
	check("fingerprint signals were found in the sitemap", fingerprintSlugs.length > 0, `${fingerprintSlugs.length} slugs`);
	for (const slug of fingerprintSlugs) {
		for (const locale of PRIMARY_LOCALES) {
			const path = `/${locale}/fingerprint/${slug}`;
			check(`fingerprint ${slug} is linked for ${locale}`, linkedPaths.has(path), path);
		}
	}

	// --- 5: language separation -------------------------------------------
	// Each catalogue entry is rendered as an English line followed by a
	// "中文" line. The English line carries an English link label and an
	// English description; the Chinese link label is allowed to contain
	// Chinese, because it is the label of the Chinese page. What must not
	// happen is Chinese prose inside the English description, so the check
	// runs on the description rather than on the whole line.
	const lineBlocks = rendered.split("\n");
	for (const [index, line] of lineBlocks.entries()) {
		if (!line.startsWith("- [")) continue;
		// The language-file lines describe each locale's own file in that
		// locale's language, so the Chinese scope sentence is correct there.
		// The separation rule applies to the catalogue entries, not to them.
		if (/\/llms\.txt\)/.test(line)) continue;
		const englishLabel = (line.match(/^- \[([^\]]+)\]/) ?? [])[1] ?? "";
		// The description is everything after the last ") — " on the line.
		const description = line.slice(line.lastIndexOf(") — ") + 4);
		check(`English line "${englishLabel}" description contains no CJK`, !CJK.test(description),
			(description.match(CJK_RUN) ?? []).join(""));

		const next = lineBlocks[index + 1] ?? "";
		if (next.trimStart().startsWith("- 中文：")) {
			check(`Chinese line after "${englishLabel}" contains Chinese`, CJK.test(next), next.slice(0, 60));
		}
	}

	// --- 6: review dates present ------------------------------------------
	// The filter matches the URL path, not the title text: a guide title can
	// legitimately contain the word "browsers" and must not be mistaken for a
	// product entry.
	const productLines = lineBlocks.filter(line => line.startsWith("- [") && /browserhub\.co\/en\/browsers\/[^)]+\)/.test(line));
	check("browser product lines were found", productLines.length > 0, `${productLines.length} lines`);
	for (const line of productLines) {
		check("browser line prints a review date", /reviewed \d{4}-\d{2}-\d{2}/.test(line), line.slice(0, 80));
		check("browser line prints a pricing status", /pricing status: (verified|unverified)/.test(line), line.slice(0, 80));
	}

	// --- 7: build output matches the rendered body ------------------------
	check("out/llms.txt matches the freshly rendered route", distText === rendered,
		`dist ${distText.length} chars vs rendered ${rendered.length} chars`);

	// =========================================================================
	// Per-locale knowledge files
	// =========================================================================

	const sitemapPathsByLocale = new Map(LOCALES.map(locale => [locale, new Set()]));
	for (const url of sitemapUrls) {
		const path = new URL(url).pathname.replace(/\/$/, "") || "/";
		const locale = path.split("/").filter(Boolean)[0];
		if (!sitemapPathsByLocale.has(locale)) continue;
		sitemapPathsByLocale.get(locale).add(path);
	}

	// The Chinese source strings, used as leak needles. Character ranges are
	// not usable here: Japanese and Korean legitimately contain Han
	// characters, so a "no CJK" rule would fail every correct translation.
	// The needles are the Chinese copy itself.
	//
	// A needle must contain a Han character to be evidence of a Chinese leak.
	// Some catalogue values are identical in both languages — "Chromium" is
	// the engine of a dozen products — and some guides carry an English base
	// title with the Chinese title held in the translation table. Those
	// strings are shared, not leaked, so they are not needles.
	const chineseNeedles = new Set();
	const addNeedle = value => {
		if (typeof value !== "string" || value.length < 8) return;
		if (!CJK.test(value)) return;
		chineseNeedles.add(value);
	};
	// `resources`, `verified`, `evidenceCopy`, `i18n` and `localeUi` are the
	// real modules imported above; they are used here rather than shadowed.
	for (const browser of resources.browsers) {
		const record = verified.verifiedProducts[browser.slug];
		if (!record) continue;
		for (const field of ["description", "longDescription", "free", "price", "profiles", "storage", "engine"]) {
			addNeedle(record.zh?.[field]);
		}
		for (const note of record.notes?.["zh-cn"] ?? []) addNeedle(note);
	}
	for (const kind of ["about", "contact", "privacy"]) {
		addNeedle(i18n.pageMeta("zh-cn", kind).description);
		addNeedle(i18n.pageMeta("zh-cn", kind).title);
	}
	for (const value of Object.values(localeUi.t("zh-cn"))) addNeedle(value);
	for (const guide of resources.guides) {
		addNeedle(guide.title);
		addNeedle(guide.description);
	}
	// The scope and disclosure sentences of the Chinese knowledge file are
	// Chinese copy too. They belong to the Chinese file only, so they are
	// needles like any other Chinese source string.
	for (const value of Object.values(llmsLocaleCopy.llmsLocaleCopy["zh-cn"])) addNeedle(value);
	check("Chinese leak needles were collected", chineseNeedles.size > 100, `${chineseNeedles.size} needles`);

	for (const locale of LOCALES) {
		const body = localeBodies.get(locale) ?? "";
		const dist = readFileSync(join(outDir, locale, "llms.txt"), "utf8");
		check(`${locale}: out/${locale}/llms.txt matches the freshly rendered route`, dist === body,
			`dist ${dist.length} chars vs rendered ${body.length} chars`);

		const lines = body.split("\n");
		const ownPaths = sitemapPathsByLocale.get(locale);
		const linked = new Map();
		const foreign = [];
		// A knowledge file may point at the root file and at the sibling
		// language files. Those are knowledge files, not pages of the site, so
		// they are not in the sitemap and they are not compared against a
		// page's meta description.
		const isKnowledgeFile = path => path === "/llms.txt" || /^\/[a-z-]+\/llms\.txt$/.test(path);

		for (const line of lines) {
			const match = line.match(/^- \[([^\]]*)\]\((https:\/\/[^)\s]+)\)(?:\s*—\s*(.*))?$/);
			if (!match) continue;
			const [, label, url, description = ""] = match;
			const path = new URL(url).pathname.replace(/\/$/, "") || "/";
			linked.set(path, { label, description, url });
			if (url.startsWith(`${ORIGIN}/`) && !isKnowledgeFile(path)) {
				const segments = path.split("/").filter(Boolean);
				const targetLocale = segments[0];
				const isSiblingHome = segments.length === 1 && targetLocale !== locale;
				if (targetLocale !== locale && !isSiblingHome) foreign.push(url);
			}
		}

		check(`${locale}: the file links no page of another locale`, foreign.length === 0, foreign.slice(0, 5).join(", "));

		const missing = [...ownPaths].filter(path => !linked.has(path));
		check(`${locale}: every sitemap URL of this locale is linked`, missing.length === 0, missing.slice(0, 5).join(", "));

		const extra = [...linked.keys()].filter(path => !ownPaths.has(path) && !isKnowledgeFile(path));
		check(`${locale}: the file links no URL outside the sitemap`, extra.length === 0, extra.slice(0, 5).join(", "));

		// The description of a linked page must be the description that page
		// renders. This is read back from the built HTML, not recomputed.
		//
		// A browser line is the one exception: it appends the review date and
		// the price status to the page's own description, because a price
		// must never appear in this file without the date it was read on. So
		// for a browser the page description must be a prefix of the line,
		// and for every other page the two must be equal.
		for (const [path, entry] of linked) {
			if (isKnowledgeFile(path)) continue;
			const file = path === "/" ? join(outDir, "index.html") : join(outDir, path, "index.html");
			if (!existsSync(file)) {
				check(`${locale}: linked page exists in the build — ${path}`, false, path);
				continue;
			}
			const html = readFileSync(file, "utf8");
			const meta = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1];
			if (meta === undefined) {
				check(`${locale}: linked page has a meta description — ${path}`, false, path);
				continue;
			}
			const expected = decodeEntities(meta).replace(/\s+/g, " ").trim();
			const actual = entry.description.replace(/\s+/g, " ").trim();
			const isBrowser = new RegExp(`^/${locale}/browsers/`).test(path);
			const matched = isBrowser ? actual.startsWith(expected) : actual === expected;
			check(`${locale}: description of ${path} matches the page's meta description`, matched,
				`page "${expected.slice(0, 70)}" vs file "${actual.slice(0, 70)}"`);
		}

		// Chinese copy must not leak into a non-Chinese file.
		if (locale !== "zh-cn") {
			for (const needle of chineseNeedles) {
				check(`${locale}: no Chinese copy leaked into the file`, !body.includes(needle), needle.slice(0, 60));
			}
		}

		// A browser line prints the review date and the correct price status.
		const text = evidenceCopy.evidenceCopy[locale];
		for (const browser of resources.browsers) {
			const path = `/${locale}/browsers/${browser.slug}`;
			const entry = linked.get(path);
			if (!entry) continue;
			const record = verified.verifiedProducts[browser.slug];
			if (!record) continue;
			check(`${locale}: browser line for ${browser.slug} prints the review date`,
				entry.description.includes(record.verifiedAt), entry.description.slice(0, 80));
			const expectedStatus = record.pricingStatus === "verified" ? text.priceConfirmed : text.priceUnverified;
			const otherStatus = record.pricingStatus === "verified" ? text.priceUnverified : text.priceConfirmed;
			check(`${locale}: browser line for ${browser.slug} states the reviewed price status`,
				entry.description.includes(expectedStatus), entry.description.slice(0, 90));
			check(`${locale}: browser line for ${browser.slug} does not state the opposite price status`,
				!entry.description.includes(otherStatus), entry.description.slice(0, 90));
		}
	}
} finally {
	rmSync(workDir, { recursive: true, force: true });
}

if (failures.length) {
	console.error(`llms-txt: ${failures.length} failure(s)`);
	for (const failure of failures.slice(0, 40)) console.error(`  - ${failure}`);
	if (failures.length > 40) console.error(`  ... and ${failures.length - 40} more`);
	process.exit(1);
}

console.log(`llms-txt PASS: root file with ${entries.length} entries across ${DETAIL_TYPES.length} catalogue types; ${LOCALES.length} per-locale knowledge files covering every sitemap URL of their language, descriptions equal to the pages' meta descriptions, no Chinese copy leaked into a non-Chinese file, review dates and price statuses present, build output matches every route.`);
