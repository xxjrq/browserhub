import { comparisonEditorial } from "@/data/browser-editorial";
import { SectionBody } from "@/components/section-body";

export function ComparisonResearch({ slug, locale }: { slug: string; locale: string }) {
	const en = locale !== "zh-cn";
	const editorial = comparisonEditorial[slug]?.[en ? "en" : "zh-cn"];
	if (!editorial) return null;
	return <section data-comparison-research={slug} className="mt-10 space-y-8" lang={en ? "en" : "zh-CN"}>
		{editorial.sections.map(section => <section key={section.heading}><h2 className="mb-3 text-xl font-semibold">{section.heading}</h2><SectionBody body={section.body} /></section>)}
		<div className="rounded-lg border p-5"><h2 className="font-semibold">{en ? "Official sources and review dates" : "官方资料与核查日期"}</h2><ul className="mt-3 space-y-2 text-sm">{editorial.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.label}</a> · {source.accessedAt}</li>)}</ul></div>
	</section>;
}
