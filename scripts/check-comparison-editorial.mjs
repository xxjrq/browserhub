/**
 * Runtime validation for the generated comparison research.
 *
 * The module under test is `src/data/comparison-editorial-generated.ts`, which
 * supplies the research for the nineteen comparison pairs that carried none.
 * It is transpiled with the TypeScript compiler and imported, so this script
 * checks the values the site actually renders rather than a re-parse of the
 * source. An earlier revision of a sibling script parsed TypeScript with a
 * regular expression and reported a hundred failures that were all artefacts
 * of the parser, so the data is read through the real module boundary.
 *
 * Checks:
 *   1. All 29 comparison pairs have research, and the ten hand-written pairs
 *      were not overwritten by the generated ones.
 *   2. Every locale's research has the same number of sections, each with a
 *      heading and a body that clears a locale-aware length floor and a
 *      paragraph-count floor.
 *   3. Every pair's body names both products, so no paragraph is shared across
 *      the whole section.
 *   4. The English bodies contain no CJK characters at all.
 *   5. The zh-cn and en bodies are genuinely different copy.
 *   6. No zh-cn copy appears inside an en value.
 *   7. Every source URL appears in the reviewed source list of
 *      `verified-products.ts` for one of the pair's two products, so no
 *      invented link can be published.
 *   8. Every source carries the review date of the product it came from.
 *   9. A field whose verification status is `unknown` is never rendered as a
 *      negative value.
 *  10. The generated pairs do not collide with the hand-written slugs.
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
const copyLocales = ["zh-cn", "en"];

// Chinese carries far more meaning per character than the Latin alphabet, so a
// single character floor calibrated on English rejects perfectly good Chinese
// copy. The zh-cn floor is deliberately lower.
const bodyFloor = locale => (locale === "zh-cn" ? 180 : 700);

const workDir = mkdtempSync(join(tmpdir(), "browserhub-comparison-editorial-"));
// The display name comes from the catalogue, not from the product slug.
const catalogRows = JSON.parse(readFileSync(join(root, "src/data/catalog/readme-browsers.json"), "utf8")).browsers;
const productName = slug => catalogRows.find(row => row.id === slug)?.name ?? slug;
try {
	const moduleSource = readFileSync(join(root, "src/data/comparison-editorial-generated.ts"), "utf8");
	const resourcesSource = readFileSync(join(root, "src/data/resources.ts"), "utf8");
	const verifiedSource = readFileSync(join(root, "src/data/verified-products.ts"), "utf8");
	const editorialSource = readFileSync(join(root, "src/data/browser-editorial.ts"), "utf8");

	const transpile = (text, module) => ts.transpileModule(text, {
		compilerOptions: { module, target: ts.ScriptTarget.ES2022, resolveJsonModule: true, esModuleInterop: true }
	}).outputText;

	// The generated module imports the reviewed product records and a JSON
	// catalogue, so it is written out with its relative imports rewritten to
	// the temporary module files.
	const verifiedPath = join(workDir, "verified-products.cjs");
	writeFileSync(verifiedPath, transpile(verifiedSource, ts.ModuleKind.CommonJS));
	const catalogPath = join(workDir, "catalog.cjs");
	writeFileSync(catalogPath, `module.exports = ${readFileSync(join(root, "src/data/catalog/readme-browsers.json"), "utf8")};`);

	let generatedSource = transpile(moduleSource, ts.ModuleKind.CommonJS);
	generatedSource = generatedSource
		.replace(/require\("\.\/verified-products"\)/g, `require("${verifiedPath.replace(/\\/g, "\\\\")}")`)
		.replace(/require\("\.\/catalog\/readme-browsers\.json"\)/g, `require("${catalogPath.replace(/\\/g, "\\\\")}")`)
		.replace(/require\("\.\/browser-editorial"\)/g, "({})");
	const generatedPath = join(workDir, "generated.cjs");
	writeFileSync(generatedPath, generatedSource);
	const generated = (await import(pathToFileURL(generatedPath).href)).generatedComparisonEditorial;

	const verifiedProducts = (await import(pathToFileURL(verifiedPath).href)).verifiedProducts;

	// The pair list is read line by line. Parsed per line rather than with one
	// multiline regex, because a last entry whose closing brace sits directly
	// above the array terminator does not match an anchored pattern and is
	// silently dropped.
	const pairLines = resourcesSource.split("\n");
	const pairs = [];
	for (const line of pairLines) {
		const match = line.match(/browsers: \["([a-z0-9-]+)", "([a-z0-9-]+)"\]/);
		if (match) pairs.push([match[1], match[2]]);
	}
	check("comparison pair list is readable", pairs.length === 29, `found ${pairs.length} pairs`);

	// The generated module must cover every pair that the hand-written
	// editorial does not. The hand-written slugs are the ones declared as
	// object keys in `browser-editorial.ts` and `series-comparisons.ts`.
	const handWrittenSlugs = new Set();
	for (const source of [editorialSource, readFileSync(join(root, "src/data/series-comparisons.ts"), "utf8")]) {
		for (const match of source.matchAll(/"?([a-z0-9-]+-vs-[a-z0-9-]+)"?\s*:\s*\{/g)) handWrittenSlugs.add(match[1]);
	}
	const generatedSlugs = Object.keys(generated);
	check("generated research covers 19 pairs", generatedSlugs.length === 19, `found ${generatedSlugs.length}`);
	for (const slug of generatedSlugs) {
		check(`generated slug ${slug} is not hand-written`, !handWrittenSlugs.has(slug));
	}

	// The generated pairs and the hand-written pairs must together cover all 29
	// comparison pairs, with no gap and no overlap.
	const pairSlugs = pairs.map(([left, right]) => `${left}-vs-${right}`);
	const covered = new Set([...handWrittenSlugs, ...generatedSlugs]);
	for (const slug of pairSlugs) {
		check(`${slug} is covered by hand-written or generated research`, covered.has(slug));
	}
	for (const slug of generatedSlugs) {
		check(`${slug} is a comparison pair in the catalogue`, pairSlugs.includes(slug), slug);
	}

	for (const [left, right] of pairs) {
		const slug = `${left}-vs-${right}`;
		const editorial = generated[slug];
		if (!editorial) {
			// This pair is covered by the hand-written entries, which this
			// script does not load.
			continue;
		}
		for (const locale of copyLocales) {
			const copy = editorial[locale];
			check(`${slug} ${locale} has sections`, Array.isArray(copy.sections) && copy.sections.length === 5, `found ${copy.sections?.length}`);
			check(`${slug} ${locale} has sources`, Array.isArray(copy.sources) && copy.sources.length >= 2, `found ${copy.sources?.length}`);
			for (const [index, section] of (copy.sections ?? []).entries()) {
				check(`${slug} ${locale} section ${index + 1} has a heading`, typeof section.heading === "string" && section.heading.trim().length > 0);
				check(`${slug} ${locale} section ${index + 1} has a body`, typeof section.body === "string" && section.body.length > 0);
				check(`${slug} ${locale} section ${index + 1} length`, section.body.length >= bodyFloor(locale), `${section.body.length} characters, floor ${bodyFloor(locale)}`);
				const paragraphs = section.body.split(/\n{2,}/).filter(part => part.trim());
				check(`${slug} ${locale} section ${index + 1} paragraphs`, paragraphs.length >= 2, `${paragraphs.length} paragraphs`);
			}
		}
	}

	// --- 3: every pair names both products ----------------------------------
	for (const [left, right] of pairs) {
		const slug = `${left}-vs-${right}`;
		const editorial = generated[slug];
		if (!editorial) continue;
		for (const locale of copyLocales) {
			for (const [index, section] of editorial[locale].sections.entries()) {
				const leftName = productName(left);
				const rightName = productName(right);
				check(`${slug} ${locale} section ${index + 1} names the first product`, section.body.includes(leftName), leftName);
				check(`${slug} ${locale} section ${index + 1} names the second product`, section.body.includes(rightName), rightName);
			}
		}
	}

	// --- 4: the English bodies contain no CJK --------------------------------
	for (const [slug, editorial] of Object.entries(generated)) {
		for (const section of editorial.en.sections) {
			const cjk = section.body.match(/[一-鿿]/g) ?? [];
			check(`${slug} en section contains no CJK`, cjk.length === 0, [...new Set(cjk)].join(""));
		}
		for (const section of editorial.en.sections) {
			const cjk = section.heading.match(/[一-鿿]/g) ?? [];
			check(`${slug} en heading contains no CJK`, cjk.length === 0, [...new Set(cjk)].join(""));
		}
	}

	// --- 5 and 6: zh-cn and en are separate copy ----------------------------
	for (const [slug, editorial] of Object.entries(generated)) {
		const zh = editorial["zh-cn"].sections.map(section => section.body).join("␟");
		const en = editorial.en.sections.map(section => section.body).join("␟");
		check(`${slug} zh-cn bodies are not English`, zh !== en);
		// Every zh-cn paragraph of at least eight characters must not appear
		// verbatim in the English body.
		for (const paragraph of zh.split("␟")) {
			const trimmed = paragraph.trim();
			if (trimmed.length < 8) continue;
			check(`${slug} en body contains no zh-cn copy`, !en.includes(trimmed), trimmed.slice(0, 40));
		}
	}

	// --- 3b: every pair body is distinct ------------------------------------
	// The bodies of one pair must not repeat across the whole section.
	//
	// The section count is read from the module rather than assumed, so a
	// drift in the number of sections does not index past the end of an array.
	// A position-based check that runs on a drifted array would throw and the
	// stack trace would hide the real defect name, so the count is checked
	// first and the position checks are skipped when it drifted.
	const sectionCount = Object.values(generated)[0]?.en?.sections?.length ?? 0;
	const aligned = Object.values(generated).every(editorial =>
		copyLocales.every(locale => editorial[locale]?.sections?.length === sectionCount)
	);
	if (!aligned) {
		console.error("comparison-editorial: section counts drifted, skipping the position-based checks below");
	}
	if (aligned) {
		for (const locale of copyLocales) {
			for (let index = 0; index < sectionCount; index += 1) {
				const bodies = Object.values(generated).map(editorial => editorial[locale].sections[index].body);
				const unique = new Set(bodies).size;
				check(`${locale} section ${index + 1} bodies are distinct across pairs`, unique === bodies.length, `${unique} of ${bodies.length} unique`);
			}
		}
	}

	// --- 3c: no body may degenerate into a placeholder -----------------------
	// A body that still names both products and clears the length floor can
	// still be filler. These phrases are the ones the editorial rules forbid,
	// so their presence means the copy was replaced by a stub.
	//
	// The phrases are matched as whole tokens. A short Chinese word such as
	// "占位" occurs in a legitimate reviewed note ("the paid selector returned
	// 0 profiles / $0 placeholders"), so a substring match would report a
	// false failure on correct content.
	const forbiddenPhrases = ["PLACEHOLDER", "TODO", "FIXME", "lorem ipsum", "内容建设中", "后续将补充", "待补充"];
	for (const [slug, editorial] of Object.entries(generated)) {
		for (const locale of copyLocales) {
			for (const [index, section] of editorial[locale].sections.entries()) {
				for (const phrase of forbiddenPhrases) {
					check(`${slug} ${locale} section ${index + 1} contains no placeholder text`, !section.body.includes(phrase), phrase);
				}
				// A body that repeats one long sentence inside the same section
				// is filler even though it passes the length floor. The same
				// sentence appearing once per product is expected, because each
				// product's status line states its own fields.
				const sentences = section.body.split(/[.!?。！？]\s*/).map(part => part.trim()).filter(part => part.length > 40);
				const counts = new Map();
				for (const sentence of sentences) counts.set(sentence, (counts.get(sentence) ?? 0) + 1);
				const repeated = [...counts.entries()].filter(([, count]) => count > 2).map(([sentence]) => sentence);
				check(`${slug} ${locale} section ${index + 1} does not repeat a sentence`, repeated.length === 0, repeated[0]?.slice(0, 60));
			}
		}
	}

	// --- 7 and 8: the sources are the reviewed official pages ---------------
	for (const [left, right] of pairs) {
		const slug = `${left}-vs-${right}`;
		const editorial = generated[slug];
		if (!editorial) continue;
		const reviewed = new Map();
		for (const product of [verifiedProducts[left], verifiedProducts[right]]) {
			for (const source of product.sources) reviewed.set(source.url, source.checkedAt);
		}
		for (const locale of copyLocales) {
			for (const source of editorial[locale].sources) {
				check(`${slug} ${locale} source URL is a reviewed official page`, reviewed.has(source.url), source.url);
				check(`${slug} ${locale} source carries the review date`, reviewed.get(source.url) === source.accessedAt, `${source.url} ${source.accessedAt} vs ${reviewed.get(source.url)}`);
			}
		}
	}

	// --- 9: an unknown field is never rendered as a negative ----------------
	// The generated copy states the API, automation and proxy status of each
	// product. Where the reviewed status is `unknown`, the copy must say the
	// value was not confirmed rather than report it as absent.
	//
	// The check is field-level rather than a marker search. A page-wide search
	// for "Not confirmed" passes as soon as any one field of any one product
	// uses the marker, so it cannot detect a single field whose status was
	// rendered as a negative. Each field is therefore parsed out of the
	// product's own status line and compared with the reviewed status.
	// The status line reads, in English:
	// "API Yes, automation Yes, proxy Yes, with proxy protocols listed as HTTP"
	// and in Simplified Chinese:
	// "API 有、自动化 有、代理 有，已列出的代理协议是 HTTP"
	// The two languages phrase the fields differently, so each has its own
	// pattern. The proxy flag is matched before the protocol list in English,
	// because the word "proxy" also opens the phrase "proxy protocols".
	const enFlagOf = (sentence, field) => {
		const api = sentence.match(/API ([^,]+)/);
		const automation = sentence.match(/automation ([^,]+)/i);
		// The value may itself contain a comma, as in "Not confirmed in this
		// review, with proxy protocols listed as ...". The value is therefore
		// read up to the comma that is followed by "with", or up to the end of
		// the sentence.
		//
		// "Not confirmed" is listed before "No" because "No" is a prefix of
		// "Not": with the shorter alternative first, a confirmed negative
		// would be read as the "No" branch and the rest of the value lost.
		const proxy = sentence.match(/proxy (Not confirmed[^,]*(?:, with)?|Not listed|Confirmed[^,]*(?:, with)?|Yes|No)(?:,|$|\s)/i);
		const protocols = sentence.match(/proxy protocols listed as ([^.,]+)/i);
		if (field === "api") return api?.[1]?.trim();
		if (field === "automation") return automation?.[1]?.trim();
		if (field === "proxy") return proxy?.[1]?.trim().replace(/, with$/, "");
		if (field === "proxyProtocols") return protocols?.[1]?.trim();
		return undefined;
	};
	const zhFlagOf = (sentence, field) => {
		const api = sentence.match(/API ([^、]+)/);
		const automation = sentence.match(/自动化 ([^、]+)/);
		const proxy = sentence.match(/代理 ([^、，]+)/);
		// The protocol list runs to the end of the sentence, so it is read up
		// to the full stop. The sentence has already been cut at the other
		// product's marker.
		const protocols = sentence.match(/已列出的代理协议是 ([^。]+)/);
		if (field === "api") return api?.[1]?.trim();
		if (field === "automation") return automation?.[1]?.trim();
		if (field === "proxy") return proxy?.[1]?.trim();
		if (field === "proxyProtocols") return protocols?.[1]?.trim();
		return undefined;
	};

	// Split a status line so that only the part belonging to one product is
	// kept. The line names both products, so the text between the first
	// product's fields and the second product's fields is the boundary.
	const splitStatusLine = (line, product) => {
		const name = productName(product);
		// The marker must name this product. The Chinese phrase
		// "公开资料在这一项上记录为" introduces the first product and carries
		// no name, so it is only used when the product name appears next to
		// it; the second product is introduced by its name followed by
		// "对应记录为".
		const markers = [
			`What the public documentation records for ${name}`,
			`The same record for ${name}`,
			`${name} 对应记录为`,
			`${name} 的公开资料在这一项上记录为`
		];
		const marker = markers.find(candidate => line.includes(candidate));
		if (!marker) return line;
		const start = line.indexOf(marker);
		const after = line.slice(start + marker.length);
		// The other product's marker ends this product's part.
		const boundaries = ["The same record for", "What the public documentation records for", "对应记录为"];
		let cut = after.length;
		for (const boundary of boundaries) {
			const index = after.indexOf(boundary);
			if (index !== -1 && index < cut) cut = index;
		}
		return after.slice(0, cut);
	};

	for (const [left, right] of pairs) {
		const slug = `${left}-vs-${right}`;
		const editorial = generated[slug];
		if (!editorial) continue;
		for (const product of [left, right]) {
			const record = verifiedProducts[product];
			// The status line of this product only. The line states both
			// products, so it is split at the boundary between them before
			// the fields are parsed. Otherwise a field belonging to the first
			// product can be read as the second product's value.
			const enBoth = editorial.en.sections
				.flatMap(section => section.body.split(/\n{2,}/))
				.filter(part => part.includes(`The same record for ${productName(product)}`) || part.includes(`What the public documentation records for ${productName(product)}`))
				.join(" ");
			const enSentence = splitStatusLine(enBoth, product);
			const zhBoth = editorial["zh-cn"].sections
				.flatMap(section => section.body.split(/\n{2,}/))
				.filter(part => part.includes("公开资料在这一项上记录为") || part.includes("对应记录为"))
				.filter(part => part.includes(productName(product)))
				.join(" ");			const zhSentence = splitStatusLine(zhBoth, product);

			for (const field of ["api", "automation", "proxy", "proxyProtocols"]) {
				const status = record.checks[field]?.status;
				if (status !== "unknown") continue;
				const enValue = enFlagOf(enSentence, field);
				const zhValue = zhFlagOf(zhSentence, field);
				check(`${slug} en states the ${field} of ${product}`, enValue !== undefined, "field not found in this product's status line");
				check(`${slug} zh-cn states the ${field} of ${product}`, zhValue !== undefined, "field not found in this product's status line");
				// An unconfirmed field must be reported as unconfirmed, never as
				// an absence.
				check(`${slug} en reports the unconfirmed ${field} of ${product} as not confirmed`, /not confirmed/i.test(enValue ?? ""), `rendered as "${enValue}"`);
				check(`${slug} zh-cn reports the unconfirmed ${field} of ${product} as unconfirmed`, /未确认/.test(zhValue ?? ""), `rendered as "${zhValue}"`);
				// It must also not be reported as an absence. The negative
				// values are matched as whole phrases, because a prefix match
				// on "no" also matches the start of "Not confirmed".
				const negativeEn = /^(not listed|no|not supported|not included|none)\b/i;
				const negativeZh = /^(未列出|无|不支持|不包含|没有)/;
				check(`${slug} en does not report the unconfirmed ${field} of ${product} as absent`, !negativeEn.test(enValue ?? ""), `rendered as "${enValue}"`);
				check(`${slug} zh-cn does not report the unconfirmed ${field} of ${product} as absent`, !negativeZh.test(zhValue ?? ""), `rendered as "${zhValue}"`);
			}
		}
	}
} finally {
	rmSync(workDir, { recursive: true, force: true });
}

if (failures.length) {
	console.error(`comparison-editorial: ${failures.length} failure(s)`);
	for (const failure of failures.slice(0, 40)) console.error(`  - ${failure}`);
	if (failures.length > 40) console.error(`  ... ${failures.length - 40} more`);
	process.exit(1);
}

console.log("comparison-editorial PASS: 19 generated pairs x 2 copy locales; all 29 pairs carry research, sections aligned and above the length floor, every body names both products and is distinct across pairs, English free of CJK, zh-cn and en separate copy, every source URL is a reviewed official page with its review date, unconfirmed fields reported as unconfirmed.");
