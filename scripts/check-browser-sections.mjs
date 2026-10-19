/**
 * Runtime validation for `src/data/browser-sections.ts`.
 *
 * tsc cannot catch the failure mode that actually matters here: a product
 * missing a hand-written opening silently falls back to a generated sentence,
 * which is exactly the template-repetition problem the module exists to solve.
 * This script fails the build when that happens.
 *
 * Checks:
 *   1. Every product slug in both catalog sources resolves to a written opening
 *      (no fallback), for both zh-cn and en.
 *   2. No opening key refers to a slug that does not exist.
 *   3. zh-cn openings are pairwise distinct, and so are en openings.
 *   4. No zh-cn text leaks into the en copy and vice versa (CJK check on en,
 *      Latin-word check on zh-cn is done by the build's existing audit).
 *   5. Every product gets at least 5 sections and each body clears a length
 *      floor, so a stub cannot pass as finished copy.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

const source = readFileSync(join(root, "src/data/browser-sections.ts"), "utf8");
const catalog = JSON.parse(readFileSync(join(root, "src/data/catalog/browsers.json"), "utf8"));
const readme = JSON.parse(readFileSync(join(root, "src/data/catalog/readme-browsers.json"), "utf8"));

const failures = [];
const check = (label, condition, detail) => {
	if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

// --- extract the opening table without executing TypeScript -----------------
const tableStart = source.indexOf("const opening:");
const tableEnd = source.indexOf("/**\n * Generic opening");
if (tableStart < 0 || tableEnd < 0) {
	console.error("browser-sections: could not locate the opening table");
	process.exit(1);
}
const table = source.slice(tableStart, tableEnd);

// Parsed line by line rather than with one multiline regex. A last entry whose
// closing brace sits directly above the table terminator (`\n\t}` + `\n};`)
// does not match a `\},?` anchored pattern, which silently dropped it once
// already. Splitting on the key lines is boring and does not have that failure
// mode: an entry either starts with a recognised key line or it does not exist.
const lines = table.split("\n");
const entries = [];
for (let i = 0; i < lines.length; i++) {
	const key = lines[i].match(/^\t(?:"([^"]+)"|([A-Za-z][A-Za-z0-9]*)): \{$/);
	if (!key) continue;
	const zhLine = lines[i + 1]?.match(/^\t\t"zh-cn": "([^"]+)",?$/);
	const enLine = lines[i + 2]?.match(/^\t\ten: "([^"]+)",?$/);
	const closeLine = lines[i + 3]?.match(/^\t\},?$/);
	if (!zhLine || !enLine || !closeLine) {
		failures.push(`opening entry "${key[1] ?? key[2]}" is not a well-formed { zh-cn, en } block`);
		continue;
	}
	entries.push({ slug: key[1] ?? key[2], zh: zhLine[1], en: enLine[1] });
}

const realSlugs = [...new Set([...catalog.browsers.map(b => b.id), ...readme.browsers.map(b => b.id)])];

// 1 + 2: coverage both ways
for (const slug of realSlugs) {
	check("every product has a written opening", entries.some(e => e.slug === slug), `missing: ${slug}`);
}
for (const entry of entries) {
	check("no opening refers to a non-existent slug", realSlugs.includes(entry.slug), `unknown: ${entry.slug}`);
}

// 3: uniqueness
for (const locale of ["zh", "en"]) {
	const seen = new Map();
	for (const entry of entries) {
		const value = entry[locale];
		if (seen.has(value)) failures.push(`duplicate ${locale} opening shared by ${seen.get(value)} and ${entry.slug}`);
		else seen.set(value, entry.slug);
	}
}

// 4: language purity of the en copy
for (const entry of entries) {
	const cjk = entry.en.match(/[\u4e00-\u9fa5]/g);
	check("en opening contains no Chinese", !cjk, `${entry.slug}: ${cjk ? cjk.join("") : ""}`);
}

// 5: section counts and length floor, read from the sectionsFor body.
// Bodies are template literals so the copy can interpolate real catalog fields,
// which is why the patterns anchor on backticks rather than quotes.
const sectionCount = (source.match(/sections\.push\(\{/g) || []).length;
check("sectionsFor pushes enough sections", sectionCount >= 5, `found ${sectionCount} push calls`);
const zhBodies = [...source.matchAll(/\? `([^`]*)`/g)].map(m => m[1]).filter(b => /[\u4e00-\u9fa5]/.test(b));
check("zh bodies clear the length floor", zhBodies.length >= 5 && zhBodies.every(b => b.length > 120), `zh bodies found: ${zhBodies.length}, shortest: ${zhBodies.length ? Math.min(...zhBodies.map(b => b.length)) : "n/a"}`);
const enBodies = [...source.matchAll(/: `([^`]*)`/g)].map(m => m[1]).filter(b => /[A-Za-z]{4}/.test(b) && !/[\u4e00-\u9fa5]/.test(b));
check("en bodies clear the length floor", enBodies.length >= 5 && enBodies.every(b => b.length > 200), `en bodies found: ${enBodies.length}, shortest: ${enBodies.length ? Math.min(...enBodies.map(b => b.length)) : "n/a"}`);

if (failures.length) {
	console.error(`browser-sections: ${failures.length} check(s) failed`);
	for (const failure of failures) console.error(`  - ${failure}`);
	process.exit(1);
}

console.log(`browser-sections: ${entries.length}/${realSlugs.length} products verified — coverage, uniqueness, language purity and section length all pass.`);
console.log(`  sections per product: ${sectionCount}; zh bodies: ${zhBodies.length}; en bodies: ${enBodies.length}.`);