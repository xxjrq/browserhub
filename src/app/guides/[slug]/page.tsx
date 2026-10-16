import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guideBySlug, guides } from "@/data/resources";
import { GuideArticle, guideFaq } from "@/components/guide-article";
import { hreflangFor } from "@/lib/i18n";

export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	if (!guide) return {};
	return { title: guide.title, description: guide.description, alternates: { canonical: `/zh-cn/guides/${slug}/`, languages: hreflangFor(`guides/${slug}`) }, openGraph: { title: guide.title, description: guide.description, url: `/zh-cn/guides/${slug}/` } };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	if (!guide) notFound();
	const url = `https://browserhub.co/zh-cn/guides/${slug}/`;
	const faq = guideFaq(guide, "zh-cn");
	const graph = [{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: guide.date, author: { "@type": "Organization", name: "BrowserHub", url: "https://browserhub.co/zh-cn/about/" }, publisher: { "@id": "https://browserhub.co/#organization" }, mainEntityOfPage: url, citation: guide.sources?.map(source => source.url) }, ...(faq.length ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(row => ({ "@type": "Question", name: row.question, acceptedAnswer: { "@type": "Answer", text: row.answer } })) }] : [])];
	return <div className="container py-10 md:py-14"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} /><nav className="mx-auto mb-8 max-w-3xl text-sm"><Link href="/zh-cn/guides/" className="text-primary">← 指南与教程</Link></nav><GuideArticle guide={guide} locale="zh-cn" /></div>;
}
