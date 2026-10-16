import { GuideSeriesTrail } from "@/components/guide-series";
import Link from "next/link";
import type { GuideResource } from "@/data/resources";
import { guideEditions } from "@/data/guide-editions";
import { localizedGuideCopy, localizedGuideSections } from "@/data/guide-translations";
import { guideCategoryLabel, localePath, t, type Locale } from "@/lib/i18n";
import { SectionBody } from "@/components/section-body";
import { Badge } from "@/components/ui/badge";

export function guideFaq(guide: GuideResource, locale: Locale) {
	return guideEditions[guide.slug]?.[locale === "zh-cn" ? "zh-cn" : "en"].faq ?? guide.faq ?? [];
}

export function GuideArticle({ guide, locale }: { guide: GuideResource; locale: Locale }) {
	const en = locale !== "zh-cn";
	const copy = localizedGuideCopy(locale, guide.slug, guide);
	const sections = localizedGuideSections(locale, guide.slug) ?? guide.sections ?? [{ heading: en ? "Overview" : "概述", body: guide.content }];
	const questions = guideFaq(guide, locale);
	const edition = guideEditions[guide.slug]?.[en ? "en" : "zh-cn"];
	return <article className="mx-auto max-w-3xl" lang={en ? "en" : "zh-CN"}>
		<header className="mb-8">
			<Badge variant="secondary">{edition?.category ?? guideCategoryLabel(locale, guide.category)}</Badge>
			<h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{copy.title}</h1>
			<p className="mt-5 text-lg leading-8 text-muted-foreground">{copy.description}</p>
			<p className="mt-4 text-xs leading-6 text-muted-foreground">BrowserHub {en ? "editorial team · Updated" : "编辑团队 · 更新于"} <time dateTime={guide.date}>{guide.date}</time> · <Link href={localePath(en ? "en" : "zh-cn", "about")} className="underline underline-offset-4">{en ? "Sources & editorial policy" : "来源与编辑政策"}</Link></p>
		</header>
		<div className="mb-8"><SectionBody body={edition?.content ?? guide.content} /></div>
		{!["en", "zh-cn"].includes(locale) && <p className="mb-6 rounded-lg border p-4 text-sm">English edition. This guide has not yet been translated into {locale}.</p>}
		<nav aria-label={en ? "On this page" : "本文目录"} className="mb-10 rounded-xl border bg-muted/40 p-5">
			<p className="font-semibold">{en ? "On this page" : "本文目录"}</p>
			<ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">{sections.map((section, index) => <li key={index}><a href={`#section-${index + 1}`} className="hover:text-primary">{section.heading}</a></li>)}</ol>
		</nav>
		<div className="space-y-9">{sections.map((section, index) => <section key={index} id={`section-${index + 1}`} className="scroll-mt-24"><h2 className="mb-3 text-xl font-semibold tracking-tight">{section.heading}</h2><SectionBody body={section.body} /></section>)}</div>
		{questions.length > 0 && <section className="mt-10" id="faq"><h2 className="text-xl font-semibold">{en ? "Frequently asked questions (FAQ)" : "常见问题"}</h2><dl className="mt-4 divide-y">{questions.map(question => <div key={question.question} className="py-4"><dt className="font-semibold">{question.question}</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">{question.answer}</dd></div>)}</dl></section>}
		{guide.sources?.length ? <section className="mt-10 border-t pt-6" id="sources"><h2 className="text-xl font-semibold">{en ? "Sources" : "参考来源"}</h2><p className="mt-2 text-xs text-muted-foreground">{en ? "Public documentation reviewed on" : "公开资料核查于"} {guide.date}. {en ? "This is document-based research, not a hands-on benchmark." : "本文基于公开资料研究，不作为产品实测报告。"}</p><ul className="mt-4 space-y-3 text-sm">{guide.sources.map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.title}</a></li>)}</ul></section> : null}
		<GuideSeriesTrail locale={locale} slug={guide.slug} />
		<aside className="mt-10 rounded-lg border bg-muted/30 p-5 text-sm leading-7 text-muted-foreground">
			{en ? "Disclosure: EasyBR is affiliated with BrowserHub. Product placement and editorial selections are not independent lab rankings. Verify plans and capabilities with each vendor." : "关系披露：EasyBR 是 BrowserHub 的关联产品。特色展示和编辑选型不代表独立实验室排名，请向各供应商确认套餐与功能。"}
			<p className="mt-3"><Link href={localePath(en ? "en" : "zh-cn", "browsers/easybr")} className="text-primary underline underline-offset-4">{en ? "Evaluate EasyBR" : "查看 EasyBR 资料"}</Link> · <Link href={localePath(en ? "en" : "zh-cn", "compare")} className="text-primary underline underline-offset-4">{t(locale).compare}</Link></p>
		</aside>
	</article>;
}
