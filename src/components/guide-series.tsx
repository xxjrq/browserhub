import Link from "next/link";
import { guideSeries, guideSeriesFor } from "@/data/guide-series";
import { localizedGuideCopy } from "@/data/guide-translations";
import { localePath, type Locale } from "@/lib/locale-ui";

const editionFor = (locale: Locale) => locale === "zh-cn" ? "zh-cn" : "en";
const titleFor = (locale: Locale, slug: string) => localizedGuideCopy(locale, slug, { title: slug.replaceAll("-", " "), description: "" }).title;

export function GuideSeriesIndex({ locale }: { locale: Locale }) {
	const edition = editionFor(locale);
	const en = edition === "en";
	return <section className="mb-10" aria-labelledby="guide-series-heading" lang={en ? "en" : "zh-CN"}>
		<h2 id="guide-series-heading" className="text-xl font-semibold">{en ? "Follow a learning path" : "按系列阅读"}</h2>
		<div className="mt-5 grid gap-4 lg:grid-cols-3">{guideSeries.map(series => <section key={series.id} id={series.id} className="scroll-mt-24 rounded-xl border bg-muted/20 p-5">
			<h3 className="font-semibold">{series.copy[edition].title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{series.copy[edition].description}</p>
			<ol className="mt-4 list-decimal space-y-3 pl-5 text-sm">{series.slugs.slice(0, 4).map(slug => <li key={slug}><Link href={localePath(edition, `guides/${slug}`)} className="text-primary underline-offset-4 hover:underline">{titleFor(locale, slug)}</Link></li>)}</ol>
			<p className="mt-4 text-xs text-muted-foreground">{en ? `${series.slugs.length} connected guides. Each article links to the next step.` : `${series.slugs.length} 篇相互衔接的指南，文章中可继续阅读前后章节。`}</p>
		</section>)}</div>
		<p className="mt-5 text-sm leading-7"><a href="/templates/browser-environment-checklist.csv" download className="text-primary underline underline-offset-4">{en ? "Download the blank environment test record (CSV)" : "下载环境检测空白记录表（CSV）"}</a><span className="ml-2 text-muted-foreground">{en ? "Fill it with your own observations; no benchmark results are prefilled." : "填写自己的观察结果，模板未预填任何实测结论。"}</span></p>
	</section>;
}

export function GuideSeriesTrail({ locale, slug }: { locale: Locale; slug: string }) {
	const series = guideSeriesFor(slug);
	if (!series) return null;
	const edition = editionFor(locale);
	const en = edition === "en";
	const index = series.slugs.indexOf(slug);
	const neighbours = [series.slugs[index - 1], series.slugs[index + 1]].filter(Boolean);
	return <nav aria-label={en ? "Guide series" : "系列阅读"} data-guide-series={series.id} className="mt-10 rounded-xl border p-5">
		<p className="text-xs text-muted-foreground">{series.copy[edition].title} · {index + 1} / {series.slugs.length}</p>
		<ul className="mt-3 space-y-3 text-sm">{neighbours.map(target => <li key={target}><Link href={localePath(edition, `guides/${target}`)} className="text-primary underline-offset-4 hover:underline">{series.slugs.indexOf(target) < index ? (en ? "Previous: " : "上一篇：") : (en ? "Next: " : "下一篇：")}{titleFor(locale, target)}</Link></li>)}</ul>
		{series.id === "environment-detection" && <p className="mt-4 text-xs leading-6"><a href="/templates/browser-environment-checklist.csv" download className="text-primary underline underline-offset-4">{en ? "Download the blank test record" : "下载空白检测记录表"}</a> · {en ? "Use the same conditions across checks and enter your own observations." : "各项检测使用同一组条件，填写自己的观察结果。"}</p>}
		<Link href={`${localePath(edition, "guides")}#${series.id}`} className="mt-4 inline-block text-xs underline underline-offset-4">{en ? "All learning paths" : "查看全部系列"}</Link>
	</nav>;
}
