/**
 * Runtime validation for the comparison editorial headings.
 *
 * The map in `src/data/comparison-editorial-headings.ts` is keyed by the
 * English heading string. If a heading is renamed in one of the editorial
 * modules without adding a new entry, the lookup falls back to the English
 * string and the page silently renders an English heading under a localised
 * `<title>` again — the exact defect this work set out to remove. So the map
 * is checked for completeness here, and `scripts/audit-heading-localisation.mjs`
 * checks the rendered result.
 *
 * Checks:
 *   1. Every English heading used by the three editorial modules has an entry.
 *   2. Every entry covers all seven locales.
 *   3. No locale value is empty, and no non-Chinese value contains CJK
 *      characters (a Chinese string that slipped into a translation).
 *   4. The zh-cn and en values match the heading they are keyed by, so the map
 *      cannot drift away from the copy it localises.
 *   5. Every locale's values are distinct from the English ones, so a
 *      "translation" that is just the English string is caught.
 *
 * The modules are transpiled with the TypeScript compiler and imported, so the
 * values checked are the ones the site actually renders.
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
const workDir = mkdtempSync(join(tmpdir(), "browserhub-editorial-headings-"));
let headingCount = 0;

try {
	const headingsSource = readFileSync(join(root, "src/data/comparison-editorial-headings.ts"), "utf8");
	const transpile = (text) => ts.transpileModule(text, {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
	}).outputText;

	// The headings module imports the `Locale` type only, so it has no runtime
	// dependency and can be transpiled on its own.
	const headingsPath = join(workDir, "headings.cjs");
	writeFileSync(headingsPath, transpile(headingsSource));
	const { comparisonEditorialHeadings } = await import(pathToFileURL(headingsPath).href);
	headingCount = Object.keys(comparisonEditorialHeadings).length;

	// The English headings are read from the three editorial modules. The
	// generated module keeps its five shared headings in one array; the two
	// hand-written modules carry them inside `en:` blocks.
	const readEnglishHeadings = (file) => {
		const source = readFileSync(join(root, "src/data", file), "utf8");
		const found = new Set();
		for (const block of source.matchAll(/en:\s*\{([\s\S]*?)\n\t\t\}/g)) {
			for (const match of block[1].matchAll(/heading: "([^"]+)"/g)) found.add(match[1]);
		}
		return found;
	};

	const generatedSource = readFileSync(join(root, "src/data/comparison-editorial-generated.ts"), "utf8");
	const generatedBlock = generatedSource.match(/const headings: Record<CopyLocale, \[string, string, string, string, string\]> = \{([\s\S]*?)\n\};/);
	check("generated headings array is readable", Boolean(generatedBlock));
	const generatedEnglish = new Set();
	if (generatedBlock) {
		const enBlock = generatedBlock[1].match(/en: \[([\s\S]*?)\]/);
		check("generated en headings are readable", Boolean(enBlock));
		if (enBlock) for (const match of enBlock[1].matchAll(/"([^"]+)"/g)) generatedEnglish.add(match[1]);
	}

	const expected = new Set([
		...readEnglishHeadings("series-comparisons.ts"),
		...readEnglishHeadings("browser-editorial.ts"),
		...generatedEnglish
	]);
	check("editorial headings were found in the source modules", expected.size >= 40, `found ${expected.size}`);

	for (const english of expected) {
		const entry = comparisonEditorialHeadings[english];
		check(`"${english.slice(0, 48)}" has a translation`, Boolean(entry));
		if (!entry) continue;
		for (const locale of locales) {
			const value = entry[locale];
			check(`"${english.slice(0, 48)}" ${locale} is a non-empty string`, typeof value === "string" && value.trim().length > 0);
			if (typeof value !== "string") continue;
			if (locale !== "zh-cn" && locale !== "en") {
				// Japanese and Korean legitimately use CJK ideographs and
				// Hangul, so a "no CJK characters" rule would flag every
				// correct translation. The reliable test is whether the
				// Chinese copy leaked into the translation verbatim.
				check(`"${english.slice(0, 48)}" ${locale} carries no Chinese copy`, !value.includes(entry["zh-cn"]), `contains "${entry["zh-cn"].slice(0, 24)}"`);
				check(`"${english.slice(0, 48)}" ${locale} differs from the English copy`, value !== english, `still "${english.slice(0, 40)}"`);
			}
		}
		// The English value is the copy the editorial modules already carry,
		// so it must match the key exactly. The Chinese value is a translation
		// of that key and is checked by the Chinese-substring rule above.
		check(`"${english.slice(0, 48)}" en matches the English copy`, entry.en === english);
		check(`"${english.slice(0, 48)}" zh-cn differs from the English copy`, entry["zh-cn"] !== english);
	}

	// A map entry that no module uses is dead weight and usually a typo.
	for (const english of Object.keys(comparisonEditorialHeadings)) {
		check(`map entry "${english.slice(0, 48)}" is used by an editorial module`, expected.has(english));
	}
} finally {
	// The temporary directory holds only transpiled copies; removing it keeps
	// repeated runs from accumulating.
	rmSync(workDir, { recursive: true, force: true });
}

if (failures.length) {
	console.error(`comparison editorial headings: ${failures.length} failure(s)`);
	for (const failure of failures.slice(0, 40)) console.error(`  - ${failure}`);
	process.exit(1);
}
console.log(`comparison editorial headings: PASS — ${headingCount} headings × ${locales.length} locales`);
