/**
 * Runtime validation for `src/data/info-sections.ts`.
 *
 * tsc cannot catch the failure modes that matter here:
 * - A section body silently falling back to the wrong locale's copy.
 * - A heading array and a body array drifting out of length, which would drop
 *   a section or render `undefined` into the page.
 * - Simplified-Chinese body copy leaking into a ja/ko/es/pt/ru page, which is
 *   the exact bug this module was written to remove (those locales used to
 *   receive a pricing disclaimer as their contact/privacy body).
 * - An FAQ question and answer drifting apart between the visible block and
 *   the FAQPage structured data.
 *
 * The module is transpiled with the TypeScript compiler and imported, so this
 * script checks the values the site actually renders. An earlier revision of
 * this file parsed the source with regular expressions and reported a hundred
 * failures that were all artefacts of the parser, so the data is now read
 * through the real module boundary instead.
 *
 * Checks:
 *   1. Every locale gets a heading and a body for every section, and the two
 *      arrays stay aligned.
 *   2. Every body clears a locale-aware length floor and a paragraph-count
 *      floor, so a stub cannot pass as finished copy. The floor is lower for
 *      zh-cn because Chinese packs roughly twice the meaning per character.
 *   3. The en and zh-cn bodies are pairwise distinct per section.
 *   4. No zh-cn copy appears inside a ja/ko/es/pt/ru value. The test is a
 *      substring match against the zh-cn source strings rather than a CJK
 *      count, because Japanese legitimately uses kanji and a raw character
 *      count would flag every correct Japanese heading.
 *   5. Every channel that carries an href points at a real, absolute URL.
 *   6. The meta descriptions are distinct per kind.
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
const kinds = ["about", "contact", "privacy"];

// Chinese carries far more meaning per character than the Latin alphabet, so a
// single character floor calibrated on English rejects perfectly good Chinese
// copy. The zh-cn floor is deliberately lower.
const bodyFloor = locale => (locale === "zh-cn" ? 140 : 200);
const answerFloor = locale => (locale === "zh-cn" ? 25 : 60);

const workDir = mkdtempSync(join(tmpdir(), "browserhub-info-sections-"));
try {
	const moduleSource = readFileSync(join(root, "src/data/info-sections.ts"), "utf8");
	const localeSource = readFileSync(join(root, "src/lib/locale-ui.ts"), "utf8");

	const transpile = text => ts.transpileModule(text, {
		compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
	}).outputText;

	// The module imports "@/lib/locale-ui"; the alias is rewritten to the
	// transpiled sibling so the import resolves without a bundler.
	writeFileSync(join(workDir, "locale-ui.mjs"), transpile(localeSource));
	const modulePath = join(workDir, "info-sections.mjs");
	writeFileSync(modulePath, transpile(moduleSource).replace("@/lib/locale-ui", "./locale-ui.mjs"));

	const info = await import(pathToFileURL(modulePath).href);

	// --- 1 & 2: headings and bodies are aligned and substantial ------------
	for (const kind of kinds) {
		for (const locale of locales) {
			const sections = info.infoSections(kind, locale);
			check(`${kind}/${locale} section count`, sections.length >= 3, `found ${sections.length}`);
			for (const [index, section] of sections.entries()) {
				check(`${kind}/${locale} section ${index + 1} has a heading`, typeof section.heading === "string" && section.heading.trim().length > 0);
				check(`${kind}/${locale} section ${index + 1} has a body`, typeof section.body === "string" && section.body.length > 0);
				check(`${kind}/${locale} section ${index + 1} length`, section.body.length >= bodyFloor(locale), `${section.body.length} characters, floor ${bodyFloor(locale)}`);
				const paragraphs = section.body.split(/\n{2,}/).filter(part => part.trim());
				check(`${kind}/${locale} section ${index + 1} paragraphs`, paragraphs.length >= 2, `${paragraphs.length} paragraphs`);
			}
		}
	}

	// --- 3: zh-cn and en copy are distinct ----------------------------------
	for (const kind of kinds) {
		const zh = info.infoSections(kind, "zh-cn").map(section => section.body);
		const en = info.infoSections(kind, "en").map(section => section.body);
		check(`${kind} zh-cn and en body counts match`, zh.length === en.length, `${zh.length} vs ${en.length}`);
		check(`${kind} zh-cn bodies are not English`, !zh.every((value, index) => value === en[index]));
		check(`${kind} en bodies are not Chinese`, !en.every((value, index) => value === zh[index]));
		check(`${kind} zh-cn bodies are pairwise distinct`, new Set(zh).size === zh.length, `${new Set(zh).size} of ${zh.length} unique`);
	}

	// --- FAQ coverage -------------------------------------------------------
	for (const kind of kinds) {
		for (const locale of locales) {
			const faq = info.infoFaq(kind, locale);
			check(`${kind}/${locale} FAQ count`, faq.length >= 3, `found ${faq.length}`);
			for (const [index, entry] of faq.entries()) {
				check(`${kind}/${locale} FAQ ${index + 1} question`, typeof entry.question === "string" && entry.question.trim().length > 0);
				check(`${kind}/${locale} FAQ ${index + 1} answer`, typeof entry.answer === "string" && entry.answer.length >= answerFloor(locale), `${entry.answer.length} characters, floor ${answerFloor(locale)}`);
			}
			check(`${kind}/${locale} FAQ questions are distinct`, new Set(faq.map(entry => entry.question)).size === faq.length);
		}
	}

	// --- 4: no zh-cn copy inside the other locales -------------------------
	// The zh-cn strings are the source of truth. Any of them appearing verbatim
	// in a ja/ko/es/pt/ru value means Chinese copy leaked into that locale.
	// Japanese legitimately uses kanji, so counting characters would produce
	// false positives on correct Japanese copy.
	const zhSource = new Set();
	for (const kind of kinds) {
		for (const section of info.infoSections(kind, "zh-cn")) {
			zhSource.add(section.heading);
			for (const part of section.body.split(/\n{2,}/)) zhSource.add(part.trim());
		}
		for (const entry of info.infoFaq(kind, "zh-cn")) {
			zhSource.add(entry.question);
			zhSource.add(entry.answer);
		}
	}
	for (const channel of info.infoChannels("zh-cn")) {
		zhSource.add(channel.name);
		zhSource.add(channel.description);
	}
	// Only phrases long enough to be unambiguous are matched.
	const zhPhrases = [...zhSource].filter(value => value.length >= 8);

	for (const locale of ["ja", "ko", "es", "pt", "ru"]) {
		const values = [];
		for (const kind of kinds) {
			for (const section of info.infoSections(kind, locale)) {
				values.push({ label: `${kind}/${locale} section heading`, text: section.heading });
				for (const part of section.body.split(/\n{2,}/)) values.push({ label: `${kind}/${locale} section body`, text: part.trim() });
			}
			for (const entry of info.infoFaq(kind, locale)) {
				values.push({ label: `${kind}/${locale} FAQ question`, text: entry.question });
				values.push({ label: `${kind}/${locale} FAQ answer`, text: entry.answer });
			}
		}
		for (const channel of info.infoChannels(locale)) {
			values.push({ label: `channels/${locale} name`, text: channel.name });
			values.push({ label: `channels/${locale} description`, text: channel.description });
		}
		for (const { label, text } of values) {
			const hit = zhPhrases.find(phrase => text.includes(phrase));
			check(`${label} contains no zh-cn copy`, hit === undefined, hit);
		}
	}

	// The English pages must carry no CJK at all.
	for (const kind of kinds) {
		for (const section of info.infoSections(kind, "en")) {
			const cjk = (section.body.match(/[一-鿿]/g) ?? []);
			check(`${kind}/en section body contains no CJK`, cjk.length === 0, [...new Set(cjk)].join(""));
		}
	}

	// --- 5: channel hrefs are absolute URLs --------------------------------
	for (const locale of locales) {
		for (const [index, channel] of info.infoChannels(locale).entries()) {
			if (channel.href === undefined) continue;
			check(`channels/${locale} entry ${index + 1} href is an absolute https URL`, /^https:\/\//.test(channel.href), channel.href);
		}
	}

	// --- 6: meta descriptions are unique per kind --------------------------
	for (const locale of locales) {
		const descriptions = kinds.map(kind => info.infoDescription(kind, locale));
		check(`${locale} info descriptions are distinct`, new Set(descriptions).size === descriptions.length);
		check(`${locale} info descriptions are non-empty`, descriptions.every(value => value.length > 40));
	}
} finally {
	rmSync(workDir, { recursive: true, force: true });
}

if (failures.length) {
	console.error(`info-sections: ${failures.length} failure(s)`);
	for (const failure of failures) console.error(`  - ${failure}`);
	process.exit(1);
}

console.log("info-sections PASS: 3 page kinds x 7 locales; headings and bodies aligned, bodies above the length floor, zh-cn and en distinct, no zh-cn copy in ja/ko/es/pt/ru, channel URLs absolute, meta descriptions unique.");
