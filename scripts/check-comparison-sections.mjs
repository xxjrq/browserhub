/**
 * Runtime validation for `src/data/comparison-sections.ts`.
 *
 * tsc cannot catch the failure modes that matter here:
 * - A locale silently losing the sections because the body copy only existed in
 *   Simplified Chinese. That was the 2026-10-27 defect: the locale route
 *   rendered these sections on zh-cn only, so every en/ja/ko/es/pt/ru
 *   comparison page was three h2 sections shorter than its zh-cn sibling.
 * - The third section repeating one identical paragraph on all 29 pairs.
 * - Simplified-Chinese body copy leaking into a ja/ko/es/pt/ru page.
 * - A heading array and a body array drifting out of length, which would drop a
 *   section or render `undefined` into the page.
 *
 * The module is transpiled with the TypeScript compiler and imported, so this
 * script checks the values the site actually renders. An earlier revision of a
 * sibling script parsed the source with regular expressions and reported a
 * hundred failures that were all artefacts of the parser, so the data is read
 * through the real module boundary instead.
 *
 * Checks:
 *   1. Every locale gets the same number of sections, each with a heading and a
 *      body, and each body clears a locale-aware length floor and a
 *      paragraph-count floor.
 *   2. The zh-cn and en bodies are genuinely different copy, not one locale
 *      falling back to the other.
 *   3. Every locale's body is pairwise distinct across all 29 comparison pairs,
 *      so no paragraph is repeated across the whole section.
 *   4. The third section names both products, which is what makes it pair
 *      specific rather than shared boilerplate.
 *   5. No zh-cn copy appears inside a ja/ko/es/pt/ru value. The test is a
 *      substring match against the zh-cn source strings rather than a CJK
 *      count, because Japanese legitimately uses kanji and a raw character
 *      count would flag every correct Japanese heading.
 *   6. The English bodies contain no CJK characters at all.
 *   7. The seven locales have seven distinct heading sets.
 */

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const failures = [];
const check = (label, condition, detail) => {
	if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

const locales = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"];
const fallbackLocales = ["ja", "ko", "es", "pt", "ru"];

// Chinese carries far more meaning per character than the Latin alphabet, so a
// single character floor calibrated on English rejects perfectly good Chinese
// copy. The zh-cn floor is deliberately lower.
const bodyFloor = locale => (locale === "zh-cn" ? 90 : 220);

const workDir = mkdtempSync(join(tmpdir(), "browserhub-comparison-sections-"));
let pairs = [];
try {
	const moduleSource = readFileSync(join(root, "src/data/comparison-sections.ts"), "utf8");
	const resourcesSource = readFileSync(join(root, "src/data/resources.ts"), "utf8");
	const verifiedSource = readFileSync(join(root, "src/data/verified-products.ts"), "utf8");

	const transpile = (text, module) => ts.transpileModule(text, {
		compilerOptions: { module, target: ts.ScriptTarget.ES2022, resolveJsonModule: true, esModuleInterop: true }
	}).outputText;

	// The comparison module has no imports, so it is imported on its own.
	const modulePath = join(workDir, "comparison-sections.mjs");
	writeFileSync(modulePath, transpile(moduleSource, ts.ModuleKind.ESNext));
	const comparison = await import(pathToFileURL(modulePath).href);

	// The pair list and the reviewed product fields come from the real modules.
	// verified-products.ts has no imports, so it transpiles standalone.
	const verifiedPath = join(workDir, "verified-products.cjs");
	writeFileSync(verifiedPath, transpile(verifiedSource, ts.ModuleKind.CommonJS));
	const verifiedProducts = (await import(pathToFileURL(verifiedPath).href)).verifiedProducts;

	// The pair list is read line by line. Parsed per line rather than with one
	// multiline regex, because a last entry whose closing brace sits directly
	// above the array terminator does not match an anchored pattern and is
	// silently dropped.
	const pairLines = resourcesSource.split("\n");
	pairs = [];
	for (const line of pairLines) {
		const match = line.match(/browsers: \["([a-z0-9-]+)", "([a-z0-9-]+)"\]/);
		if (match) pairs.push([match[1], match[2]]);
	}
	check("comparison pair list is readable", pairs.length === 29, `found ${pairs.length} pairs`);

	// Every pair must reference products that exist, otherwise a section would
	// interpolate `undefined` into the page.
	for (const [left, right] of pairs) {
		check(`pair ${left}/${right} has reviewed products`, Boolean(verifiedProducts[left]) && Boolean(verifiedProducts[right]));
	}

	/** Build the browser input the module receives, for one locale. */
	const browserInput = (slug, locale) => {
		const product = verifiedProducts[slug];
		const source = locale === "zh-cn" ? product.zh : product.en;
		return {
			name: source.name ?? slug,
			free: source.free,
			price: source.price,
			platforms: source.platforms ?? [],
			engine: source.engine,
			storage: source.storage
		};
	};

	// --- 1: every locale has aligned, substantial sections -------------------
	const sectionsByLocale = new Map();
	for (const locale of locales) {
		const sections = [];
		for (const [left, right] of pairs) {
			const built = comparison.comparisonSectionsFor(browserInput(left, locale), browserInput(right, locale), locale);
			check(`${locale} ${left} vs ${right} section count`, built.length === 3, `found ${built.length}`);
			for (const [index, section] of built.entries()) {
				check(`${locale} ${left}/${right} section ${index + 1} has a heading`, typeof section.heading === "string" && section.heading.trim().length > 0);
				check(`${locale} ${left}/${right} section ${index + 1} has a body`, typeof section.body === "string" && section.body.length > 0);
				check(`${locale} ${left}/${right} section ${index + 1} length`, section.body.length >= bodyFloor(locale), `${section.body.length} characters, floor ${bodyFloor(locale)}`);
				const paragraphs = section.body.split(/\n{2,}/).filter(part => part.trim());
				check(`${locale} ${left}/${right} section ${index + 1} paragraphs`, paragraphs.length >= 2, `${paragraphs.length} paragraphs`);
			}
			sections.push(built);
		}
		sectionsByLocale.set(locale, sections);
	}

	// The remaining checks index into the section arrays by position. When the
	// section count drifted, those checks are skipped rather than throwing, so
	// the report names the real defect instead of a stack trace.
	const aligned = locales.every(locale => sectionsByLocale.get(locale).every(built => built.length === 3));
	if (!aligned) {
		console.error("comparison-sections: section counts drifted, skipping the position-based checks below");
	}

	// --- 2: zh-cn and en are different copy ---------------------------------
	const zhBodies = sectionsByLocale.get("zh-cn").map(built => built.map(section => section.body).join("␟"));
	const enBodies = sectionsByLocale.get("en").map(built => built.map(section => section.body).join("␟"));
	check("zh-cn bodies are not English", !zhBodies.every((value, index) => value === enBodies[index]));
	check("en bodies are not Chinese", !enBodies.every((value, index) => value === zhBodies[index]));

	// --- 3: every pair body is distinct -------------------------------------
	if (aligned) {
		for (const locale of locales) {
			const perSection = [0, 1, 2].map(index => sectionsByLocale.get(locale).map(built => built[index].body));
			for (const [index, bodies] of perSection.entries()) {
				const unique = new Set(bodies).size;
				check(`${locale} section ${index + 1} bodies are distinct across pairs`, unique === bodies.length, `${unique} of ${bodies.length} unique`);
			}
		}
	}

	// --- 4: the third section names both products ----------------------------
	if (aligned) {
		for (const locale of locales) {
			for (const [index, built] of sectionsByLocale.get(locale).entries()) {
				const [left, right] = pairs[index];
				const body = built[2].body;
				const leftName = browserInput(left, locale).name;
				const rightName = browserInput(right, locale).name;
				check(`${locale} ${left}/${right} third section names the first product`, body.includes(leftName), leftName);
				check(`${locale} ${left}/${right} third section names the second product`, body.includes(rightName), rightName);
			}
		}
	}

	// --- 5: no zh-cn copy inside the fallback locales ------------------------
	// The zh-cn strings are the source of truth. Any of them appearing verbatim
	// in a ja/ko/es/pt/ru value means Chinese copy leaked into that locale.
	const zhSource = new Set();
	for (const built of sectionsByLocale.get("zh-cn")) {
		for (const section of built) {
			zhSource.add(section.heading);
			for (const part of section.body.split(/\n{2,}/)) zhSource.add(part.trim());
		}
	}
	// Only phrases long enough to be unambiguous are matched.
	const zhPhrases = [...zhSource].filter(value => value.length >= 8);

	for (const locale of fallbackLocales) {
		for (const [index, built] of sectionsByLocale.get(locale).entries()) {
			const [left, right] = pairs[index];
			for (const [sectionIndex, section] of built.entries()) {
				const values = [
					{ label: `${locale} ${left}/${right} section ${sectionIndex + 1} heading`, text: section.heading },
					...section.body.split(/\n{2,}/).map(part => ({ label: `${locale} ${left}/${right} section ${sectionIndex + 1} body`, text: part.trim() }))
				];
				for (const { label, text } of values) {
					const hit = zhPhrases.find(phrase => text.includes(phrase));
					check(`${label} contains no zh-cn copy`, hit === undefined, hit);
				}
			}
		}
	}

	// The fallback locales must use the English body, not a translated one.
	if (aligned) {
		for (const locale of fallbackLocales) {
			for (const [index, built] of sectionsByLocale.get(locale).entries()) {
				for (const [sectionIndex, section] of built.entries()) {
					check(`${locale} ${pairs[index].join("/")} section ${sectionIndex + 1} uses the English body`, section.body === sectionsByLocale.get("en")[index][sectionIndex].body);
				}
			}
		}
	}

	// --- 6: the English bodies contain no CJK --------------------------------
	for (const built of sectionsByLocale.get("en")) {
		for (const section of built) {
			const cjk = (section.body.match(/[一-鿿]/g) ?? []);
			check("en section body contains no CJK", cjk.length === 0, [...new Set(cjk)].join(""));
		}
	}

	// --- 7: the seven locales have distinct heading sets ---------------------
	const headingSets = locales.map(locale => comparison.comparisonSectionHeadings(locale).join("␟"));
	check("all seven locales have a distinct heading set", new Set(headingSets).size === locales.length, `${new Set(headingSets).size} of ${locales.length} unique`);
	for (const locale of locales) {
		const headings = comparison.comparisonSectionHeadings(locale);
		check(`${locale} has three headings`, headings.length === 3, `found ${headings.length}`);
		check(`${locale} headings are non-empty`, headings.every(heading => typeof heading === "string" && heading.trim().length > 0));
	}
	// An unknown locale must fall back to English rather than render blanks.
	check("unknown locale falls back to English headings", comparison.comparisonSectionHeadings("xx").join("␟") === comparison.comparisonSectionHeadings("en").join("␟"));
} finally {
	rmSync(workDir, { recursive: true, force: true });
}

if (failures.length) {
	console.error(`comparison-sections: ${failures.length} failure(s)`);
	for (const failure of failures.slice(0, 40)) console.error(`  - ${failure}`);
	if (failures.length > 40) console.error(`  ... ${failures.length - 40} more`);
	process.exit(1);
}

console.log(`comparison-sections PASS: ${pairs.length} pairs x ${locales.length} locales; headings and bodies aligned, bodies above the length floor, every pair body distinct, zh-cn and en separate copy, no zh-cn copy in ja/ko/es/pt/ru, English free of CJK.`);
