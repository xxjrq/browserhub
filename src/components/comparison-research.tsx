import { comparisonEditorial } from "@/data/browser-editorial";
import { comparisonEditorialHeading } from "@/data/comparison-editorial-headings";
import type { Locale } from "@/lib/locale-ui";
import { SectionBody } from "@/components/section-body";

/**
 * The research sections of a comparison page.
 *
 * The bodies are authored in zh-cn and en; the other locales reuse the English
 * body, as the rest of the site does. The headings are localised in every
 * locale through `comparison-editorial-headings.ts`, so a ja/ko/es/pt/ru page
 * keeps a document outline in its own language.
 *
 * The sources heading is localised here rather than in the editorial data
 * because it belongs to this component, not to any single pair.
 */

const sourcesHeading = {
	"zh-cn": "官方资料与核查日期",
	en: "Official sources and review dates",
	ja: "公式情報源と確認日",
	ko: "공식 출처와 확인일",
	es: "Fuentes oficiales y fechas de revisión",
	pt: "Fontes oficiais e datas de revisão",
	ru: "Официальные источники и даты проверки"
};

export function ComparisonResearch({ slug, locale }: { slug: string; locale: Locale }) {
	const en = locale !== "zh-cn";
	const editorial = comparisonEditorial[slug]?.[en ? "en" : "zh-cn"];
	if (!editorial) return null;
	// The heading is localised, but the research body is only authored in zh-cn
	// and en, so the other locales render the English text and mark it as such.
	const bodyLang = en ? "en" : "zh-CN";
	return <section data-comparison-research={slug} className="mt-10 space-y-8">
		{editorial.sections.map(section => <section key={section.heading}><h2 className="mb-3 text-xl font-semibold">{comparisonEditorialHeading(section.heading, locale)}</h2><SectionBody body={section.body} lang={bodyLang} /></section>)}
		<div className="rounded-lg border p-5"><h2 className="font-semibold">{sourcesHeading[locale] ?? sourcesHeading.en}</h2><ul className="mt-3 space-y-2 text-sm" lang={bodyLang}>{editorial.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.label}</a> · {source.accessedAt}</li>)}</ul></div>
	</section>;
}
