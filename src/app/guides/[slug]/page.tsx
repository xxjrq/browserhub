import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { guideBySlug, guides } from "@/data/resources";

export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	if (!guide) return {};
	const title = `${guide.title}：实用指南`;
	const description = `${guide.description} BrowserHub 提供步骤、注意事项、相关工具和来源，方便快速查阅。`;
	return { title, description, alternates: { canonical: `/guides/${guide.slug}/` }, openGraph: { title, description, url: `/guides/${guide.slug}/` } };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	if (!guide) notFound();
	const sections = guide.sections ?? [{ heading: "核心内容", body: guide.content }];
	const relatedGuides = guides.filter(item => item.slug !== guide.slug && item.category === guide.category).slice(0, 3);
	const jsonLd = [
		{ "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: guide.date, author: { "@type": "Person", name: "xxjrq" }, publisher: { "@type": "Organization", name: "BrowserHub", url: "https://browserhub.co/" }, mainEntityOfPage: `https://browserhub.co/guides/${guide.slug}/` },
		{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首页", item: "https://browserhub.co/" }, { "@type": "ListItem", position: 2, name: "指南与教程", item: "https://browserhub.co/guides/" }, { "@type": "ListItem", position: 3, name: guide.title, item: `https://browserhub.co/guides/${guide.slug}/` }] }
	];
	return <div className="container py-12"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><nav className="mb-6 text-sm text-muted-foreground" aria-label="面包屑"><Link href="/">首页</Link><span className="mx-2">/</span><Link href="/guides/">指南</Link><span className="mx-2">/</span><span>{guide.title}</span></nav><Link href="/guides/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回指南</Link><article className="mx-auto max-w-3xl"><div className="mb-4 flex flex-wrap items-center gap-3"><Badge variant="secondary">{guide.category}</Badge><span className="text-sm text-muted-foreground">更新于 {guide.date}</span></div><h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">{guide.description}</p><div className="mt-10 space-y-6">{sections.map(section => <Card key={section.heading}><CardHeader><CardTitle>{section.heading}</CardTitle></CardHeader><CardContent><p className="leading-8 text-muted-foreground">{section.body}</p></CardContent></Card>)}</div><p className="mt-8 rounded-lg border bg-muted/20 p-4 text-sm leading-7 text-muted-foreground">信息说明：产品价格、套餐、功能和平台可能变化，请以对应官方网站当前信息为准。本文仅用于资源整理、隐私研究和合规的浏览器环境管理。</p><h2 className="mt-10 mb-4 text-2xl font-bold">相关指南</h2><div className="grid gap-3">{relatedGuides.map(item => <Link key={item.slug} href={`/guides/${item.slug}/`} className="flex items-center justify-between rounded-lg border p-4 hover:border-primary"><span>{item.title}</span><ArrowRight className="h-4 w-4" /></Link>)}</div><p className="mt-10 text-sm text-muted-foreground">资料来源：{guide.sourcePath}</p></article></div>;
}
