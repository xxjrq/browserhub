import { verifiedProducts } from "@/data/verified-products";
import { evidenceCopy } from "@/lib/evidence-copy";

/**
 * Product evidence block.
 *
 * Two defects were fixed here on 2026-11-01, both found by an audit of the
 * built pages:
 *
 * 1. **A duplicated `<h2>`.** The comparison page renders this block once per
 *    product, and the compact variant rendered an `<h2>` of its own. Every one
 *    of the 145 comparison pages therefore carried two identical
 *    "Official sources and verification" headings at the same level. The
 *    compact variant now renders an `<h3>` — it is a sub-block of the
 *    comparison table, not a sibling section — and names the product it
 *    belongs to, so the two headings are distinguishable.
 * 2. **An English-only heading.** The heading and the field labels were a
 *    zh/en pair, so the ja/ko/es/pt/ru pages showed an English block under a
 *    localised page title. They are now localised in all seven locales.
 *
 * The body copy stays as it was: the product notes and the per-field check
 * notes exist only in Chinese and English in `verified-products.ts`, so the
 * other locales fall back to the English text and mark it with `lang="en"`.
 * That is the same fallback the rest of the site uses.
 */

type EvidenceCopy = {
	heading: string;
	reviewed: string;
	priceConfirmed: string;
	priceUnverified: string;
	fieldChecks: string;
	evidence: string;
	fields: Record<string, string>;
	status: { verified: string; contradicted: string; unverified: string };
};

// The wording table lives in `lib/evidence-copy.ts` so the `llms.txt`
// generator can print the same review-date and price-status lines the page
// prints. It is otherwise identical to the table this component used to own.
const copy: Record<string, EvidenceCopy> = evidenceCopy;

export function ProductEvidence({ slug, locale = "zh-cn", compact = false, name }: { slug: string; locale?: string; compact?: boolean; name?: string }) {
	const product = verifiedProducts[slug];
	if (!product) return null;
	const text = copy[locale] ?? copy.en;
	const edition = locale === "zh-cn" ? "zh-cn" : "en";
	// The notes exist only in Chinese and English in `verified-products.ts`, so
	// every other locale renders the English text and marks it as such.
	const noteLang = edition === "zh-cn" ? "zh-CN" : "en";
	const status = (value: string) => value === "verified" ? text.status.verified : value === "contradicted" ? text.status.contradicted : text.status.unverified;
	const heading = compact && name ? `${name} — ${text.heading}` : text.heading;
	return <section id={compact ? undefined : "product-evidence"} data-product-evidence={slug} className="mt-8 rounded-xl border bg-muted/20 p-5">
		{compact
			? <h3 className="text-base font-semibold">{heading}</h3>
			: <h2 className="text-base font-semibold">{heading}</h2>}
		<p className="mt-2 text-xs leading-6 text-muted-foreground" data-price-status={product.pricingStatus}>{text.reviewed} <time dateTime={product.verifiedAt}>{product.verifiedAt}</time> · {product.pricingStatus === "verified" ? text.priceConfirmed : text.priceUnverified}</p>
		<ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground" lang={noteLang}>{product.notes[edition].map(note => <li key={note}>{note}</li>)}</ul>
		{!compact && <details className="mt-4"><summary className="cursor-pointer text-sm font-medium">{text.fieldChecks}</summary><dl className="mt-3 divide-y">{Object.entries(product.checks).map(([field, check]) => <div key={field} className="py-3 text-sm"><dt className="font-medium">{text.fields[field] ?? field} · {status(check.status)}</dt><dd className="mt-1 text-muted-foreground"><span lang="en">{check.note}</span>{check.sourceUrls.length > 0 && <span className="ml-2">{check.sourceUrls.map((url, index) => <a key={url} href={url} rel="noopener noreferrer" className="mr-2 text-primary underline underline-offset-4">{text.evidence} {index + 1}</a>)}</span>}</dd></div>)}</dl></details>}
		<ul className="mt-4 space-y-2 text-sm">{(compact ? product.sources.slice(0, 2) : product.sources).map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.title}</a><span className="ml-2 text-xs text-muted-foreground">{source.checkedAt}</span></li>)}</ul>
	</section>;
}
