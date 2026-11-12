import { evidenceCopy } from "@/lib/evidence-copy";
import { llmsLocaleCopy } from "@/data/llms-locale-copy";
import { infoDescription, infoFaq } from "@/data/info-sections";
import { localizedGuideCopy } from "@/data/guide-translations";
import { browsers, comparisons, guides, technologies, tools } from "@/data/resources";
import { verifiedProducts } from "@/data/verified-products";
import { comparisonCopy, localizedResourceDescription } from "@/lib/i18n";
import { contentLocales, isLocale, localeMeta, localePath, locales, t, type Locale } from "@/lib/locale-ui";

export const dynamic = "force-static";
export const dynamicParams = false;

/**
 * `/{locale}/llms.txt` — the knowledge file for one language of the site.
 *
 * Why this file exists
 * --------------------
 * The root `/llms.txt` covers the English and Chinese catalogue. An audit on
 * 2026-11-06 compared every URL in `out/sitemap.xml` against every URL linked
 * from that root file: 464 of 1,096 sitemap URLs were reachable, and all 632
 * missing URLs belonged to the five secondary locales. An answer engine that
 * resolved a Japanese comparison page could not learn that the page existed,
 * what it covered, or which official sources back it.
 *
 * The `llms.txt` specification states that a file "can be placed at the site
 * root, or at any path within it, covering the pages under that path", and
 * that "where more than one file applies, agents should use the most specific
 * one". A per-language subtree file is therefore the spec's own answer for a
 * multilingual site.
 *
 * Editorial rules for this file (red lines, not style preferences):
 * - Every URL comes from the same catalogue data that renders the page, and
 *   every description is the description that page itself renders
 *   (`localizedResourceDescription` / `comparisonCopy` / `localizedGuideCopy`,
 *   the same helpers `pageMeta` uses). A link and its page cannot drift apart.
 * - Every product fact comes from `verified-products.ts`, which records the
 *   official page each value was read from and the date it was read. A price
 *   is a dated snapshot, and the review date is printed inline.
 * - An unverified field is labelled unverified. It is never written as "not
 *   supported"; a check status of `unknown` means the review did not confirm
 *   the value, which is different from the value being false.
 * - No rating, review count, benchmark score, detection verdict or vendor
 *   capability claim appears here. BrowserHub is not a laboratory.
 * - Only URLs that exist for this language are listed. The guide articles are
 *   published in Chinese and English only, so the five secondary languages
 *   list the guide index and not articles that would resolve to another
 *   language's canonical URL.
 */
export function generateStaticParams() {
	return locales.map(locale => ({ locale }));
}

const SITE = "https://browserhub.co";

const link = (locale: Locale, path: string) => `${SITE}${localePath(locale, path)}`;

/**
 * One browser entry. The description is the page's own description; the
 * review line prints the date the public documentation was read and states
 * whether the price was confirmed, so a price never appears undated.
 */
function browserEntry(locale: Locale, browser: (typeof browsers)[number]) {
	const evidence = verifiedProducts[browser.slug];
	const text = evidenceCopy[locale];
	const description = localizedResourceDescription(locale, "browsers", browser);
	const url = link(locale, `browsers/${browser.slug}`);
	if (!evidence) return `- [${browser.name}](${url}) — ${description}`;
	const pricing = evidence.pricingStatus === "verified" ? text.priceConfirmed : text.priceUnverified;
	const sources = evidence.sources.map(source => source.url).join(" ");
	return `- [${browser.name}](${url}) — ${description} ${text.reviewed} ${evidence.verifiedAt} · ${pricing}${sources ? ` ${text.evidence}: ${sources}` : ""}`;
}

function toolEntry(locale: Locale, tool: (typeof tools)[number]) {
	return `- [${tool.name}](${link(locale, `tools/${tool.slug}`)}) — ${localizedResourceDescription(locale, "tools", tool)}`;
}

function technologyEntry(locale: Locale, technology: (typeof technologies)[number]) {
	return `- [${technology.name}](${link(locale, `fingerprint/${technology.slug}`)}) — ${localizedResourceDescription(locale, "fingerprint", technology)}`;
}

function comparisonEntry(locale: Locale, comparison: (typeof comparisons)[number]) {
	const a = browsers.find(browser => browser.slug === comparison.browsers[0]) ?? browsers[0];
	const b = browsers.find(browser => browser.slug === comparison.browsers[1]) ?? browsers[1];
	return `- [${comparison.title}](${link(locale, `compare/${comparison.slug}`)}) — ${comparisonCopy(locale, a, b).overview}`;
}

function guideEntry(locale: Locale, guide: (typeof guides)[number]) {
	const copy = localizedGuideCopy(locale, guide.slug, { title: guide.title, description: guide.description });
	return `- [${copy.title}](${link(locale, `guides/${guide.slug}`)}) — ${copy.description}`;
}

/**
 * The section index pages and the three information pages. Their descriptions
 * are the same strings `pageMeta` puts in their meta description, so the
 * knowledge file and the page say the same thing.
 */
function sitePageEntries(locale: Locale) {
	const labels = t(locale);
	const rows: Array<[string, string, string]> = [
		[labels.home, "", labels.homeDescription],
		[labels.browsers, "browsers", labels.browserIntro],
		[labels.tools, "tools", labels.toolIntro],
		[labels.fingerprint, "fingerprint", labels.fingerprintIntro],
		[labels.guides, "guides", labels.guideIntro],
		[labels.compare, "compare", labels.compareIntro],
		[labels.about, "about", infoDescription("about", locale)],
		[labels.contact, "contact", infoDescription("contact", locale)],
		[labels.privacy, "privacy", infoDescription("privacy", locale)]
	];
	return rows.map(([label, path, description]) => `- [${label}](${link(locale, path)}) — ${description}`);
}

export async function GET(_request: Request, context: { params: Promise<{ locale: string }> }) {
	const { locale: rawLocale } = await context.params;
	if (!isLocale(rawLocale)) return new Response("Not found", { status: 404 });
	const locale = rawLocale;
	const labels = t(locale);
	const copy = llmsLocaleCopy[locale];

	const guideEntries = guides
		.filter(guide => contentLocales(`guides/${guide.slug}`).includes(locale))
		.map(guide => guideEntry(locale, guide));

	const faq = infoFaq("about", locale);

	// The sibling language files, not the sibling home pages. A knowledge file
	// that wants to send an agent to another language should send it to that
	// language's own knowledge file, which is the more specific file the
	// specification tells an agent to prefer.
	const languageVersions = locales
		.filter(item => item !== locale)
		.map(item => `- [${localeMeta[item].label}](${SITE}/${item}/llms.txt)`);

	const body = `# BrowserHub — ${labels.homeTitle}

> ${labels.homeDescription}

${copy.scope}

## ${copy.aboutHeading}

${copy.aboutBody}

## ${copy.disclosureHeading}

${copy.disclosureBody}

## ${labels.browsers}

${browsers.map(browser => browserEntry(locale, browser)).join("\n")}

## ${labels.tools}

${tools.map(tool => toolEntry(locale, tool)).join("\n")}

## ${labels.fingerprint}

${technologies.map(technology => technologyEntry(locale, technology)).join("\n")}

## ${labels.compare}

${comparisons.map(comparison => comparisonEntry(locale, comparison)).join("\n")}
${guideEntries.length ? `
## ${labels.guides}

${guideEntries.join("\n")}
` : ""}
## ${copy.sitePagesHeading}

${sitePageEntries(locale).join("\n")}

## ${labels.faq}

${faq.map(row => `Q: ${row.question}\nA: ${row.answer}`).join("\n\n")}

## ${copy.languagesHeading}

${languageVersions.join("\n")}

## ${copy.linksHeading}

- [BrowserHub](${SITE}/llms.txt) — the site-wide knowledge file covering every language.
- Site: ${SITE}/
- GitHub: https://github.com/xxjrq/antidetect-browser-hub
- Gitee: https://gitee.com/xxjrq/antidetect-browser-hub
- EasyBR (related product): https://www.ebrower.com/
`;

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
}
