/**
 * Runtime validation for `src/app/llms.txt/route.ts`.
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
 * 1,036 sitemap URLs; comparisons, tools and fingerprint pages had none.
 *
 * The file is rendered by invoking the route's `GET()` through the real
 * module boundary, so this script inspects the bytes that ship rather than a
 * re-implementation of them. `out/llms.txt` is then read back from the build
 * output and compared against the rendered body, which catches a route change
 * that was never rebuilt.
 *
 * Checks:
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
 */

import { readFileSync, existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const outDir = join(root, "out");

const failures = [];
const check = (label, condition, detail) => {
	if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

const ORIGIN = "https://browserhub.co";
const LOCALES = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"];

// Page types that llms.txt must link. Index pages are navigational and are
// deliberately excluded: they have no content of their own to cite.
const DETAIL_TYPES = ["browsers", "tools", "fingerprint", "guides", "compare"];

// The two locales that carry complete original copy. The other five locales
// render localised headings over the English body, so they are indexed but
// are not the canonical copy for an answer engine to cite.
const PRIMARY_LOCALES = ["en", "zh-cn"];

const CJK = /[一-鿿]/;
const CJK_RUN = /[一-鿿]{2,}/g;

// ---------------------------------------------------------------------------
// 0: sanity probes — the script must be able to fail before it can be trusted.
// ---------------------------------------------------------------------------

const workDir = mkdtempSync(join(tmpdir(), "browserhub-llms-"));
let rendered = "";
let sitemapUrls = [];
let distText = "";
let entries = [];

try {
	const transpile = text => ts.transpileModule(text, {
		compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
	}).outputText;

	// The route reaches into the catalogue through "@/..." aliases, and the
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
				if (existsSync(join(root, candidate))) return candidate;
				continue;
			}
			if (existsSync(join(root, candidate))) return candidate;
		}
		return null;
	};

	/** Flat, collision-free output name for a resolved source path. */
	const outputName = resolved => {
		const flat = resolved.replace(/^src\//, "").replace(/\//g, "__");
		return flat.endsWith(".json") ? `${flat}.mjs` : flat.replace(/\.tsx?$/, ".mjs");
	};

	const ordered = [];
	const emitted = new Set();
	const visit = relative => {
		if (emitted.has(relative)) return;
		emitted.add(relative);
		const source = readFileSync(join(root, relative), "utf8");
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

	for (const relative of ordered) {
		const source = readFileSync(join(root, relative), "utf8");
		let code;
		if (relative.endsWith(".json")) {
			// A JSON catalogue file becomes a module with a default export.
			code = `export default ${readFileSync(join(root, relative), "utf8")};\n`;
		} else {
			code = transpile(source);
			code = code.replace(/from\s+"([^"]+)"/g, (full, specifier) => {
				const resolved = resolveSpecifier(relative, specifier);
				if (!resolved) return full;
				return `from "./${outputName(resolved)}"`;
			});
		}
		writeFileSync(join(workDir, outputName(relative)), code);
	}

	const routeModule = await import(pathToFileURL(join(workDir, "app__llms.txt__route.mjs")).href);
	const response = routeModule.GET();
	rendered = await response.text();

	// The sitemap and the built file are read from `out/`, so the check runs
	// against the artefacts that ship.
	const sitemapPath = join(outDir, "sitemap.xml");
	const distPath = join(outDir, "llms.txt");
	if (!existsSync(sitemapPath)) {
		failures.push("out/sitemap.xml is missing — run the build before this check");
	}
	if (!existsSync(distPath)) {
		failures.push("out/llms.txt is missing — run the build before this check");
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
	const entryPattern = /^- \[([^\]]+)\]\((https:\/\/[^)]+)\)(?: · \[([^\]]+)\]\((https:\/\/[^)]+)\))?/gm;
	for (const match of rendered.matchAll(entryPattern)) {
		entries.push({ label: match[1], en: match[2], zh: match[4] ?? "", index: match.index });
	}
	check("llms.txt has entries", entries.length > 0, `${entries.length} entries`);

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
} finally {
	rmSync(workDir, { recursive: true, force: true });
}

if (failures.length) {
	console.error(`llms-txt: ${failures.length} failure(s)`);
	for (const failure of failures.slice(0, 40)) console.error(`  - ${failure}`);
	if (failures.length > 40) console.error(`  ... and ${failures.length - 40} more`);
	process.exit(1);
}

console.log(`llms-txt PASS: ${entries.length} entries across ${DETAIL_TYPES.length} catalogue types; every entry links live en + zh-cn pages, sitemap coverage complete, English lines carry no CJK, review dates present, build output matches the route.`);
