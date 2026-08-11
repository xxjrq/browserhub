import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { guideBySlug, guides } from "@/data/resources";
import { cn } from "@/lib/utils";

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
	return (
		<div className="container py-10 md:py-14">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<nav className="mb-6 flex items-center font-mono text-xs tracking-wide text-muted-foreground" aria-label="面包屑">
				<Link href="/" className="transition-colors hover:text-foreground">首页</Link>
				<span className="mx-2 text-border">/</span>
				<Link href="/guides/" className="transition-colors hover:text-foreground">指南</Link>
				<span className="mx-2 text-border">/</span>
				<span className="text-foreground">{guide.title}</span>
			</nav>
			<Link href="/guides/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2 text-muted-foreground")}><ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />返回指南</Link>

			<article className="mx-auto max-w-3xl">
				<header className="mb-10">
					<div className="flex flex-wrap items-center gap-3">
						<Badge variant="secondary">{guide.category}</Badge>
						<span className="font-mono text-xs text-muted-foreground">更新于 {guide.date}</span>
					</div>
					<h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{guide.title}</h1>
					<p className="mt-5 text-lg leading-8 text-muted-foreground">{guide.description}</p>
				</header>

				<div className="space-y-5">
					{sections.map((section, index) => (
						<Card key={section.heading}>
							<CardHeader>
								<p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
								<CardTitle className="text-lg">{section.heading}</CardTitle>
							</CardHeader>
							<CardContent><p className="text-sm leading-7 text-muted-foreground">{section.body}</p></CardContent>
						</Card>
					))}
				</div>

				<p className="mt-8 border-l-2 border-primary bg-primary/[0.04] px-4 py-3 text-sm leading-7 text-muted-foreground">
					信息说明：产品价格、套餐、功能和平台可能变化，请以对应官方网站当前信息为准。本文仅用于资源整理、隐私研究和合规的浏览器环境管理。
				</p>

				<h2 className="mt-12 mb-1 text-xl font-semibold tracking-tight">相关指南</h2>
				<p className="eyebrow mb-4">Related</p>
				<div className="grid gap-3">
					{relatedGuides.map(item => (
						<Link key={item.slug} href={`/guides/${item.slug}/`} className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-foreground/25">
							<span className="min-w-0 truncate text-sm font-medium">{item.title}</span>
							<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
						</Link>
					))}
				</div>

				<p className="mt-12 border-t pt-6 font-mono text-xs leading-6 text-muted-foreground">资料来源：{guide.sourcePath}</p>
			</article>
		</div>
	);
}
