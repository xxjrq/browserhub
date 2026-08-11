import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Minus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { browserBySlug, browsers, comparisons } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { Rating } from "@/components/rating";
import { cn } from "@/lib/utils";

export function generateStaticParams() { return comparisons.map(comparison => ({ slug: comparison.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const comparison = comparisons.find(item => item.slug === slug);
	if (!comparison) return {};
	const description = `${comparison.description} 统一比较免费额度、价格、环境数量、平台、内核、API、自动化、代理和存储方式。`;
	return { title: `${comparison.title}：功能与价格对比`, description, alternates: { canonical: `/compare/${comparison.slug}/` }, openGraph: { title: comparison.title, description, url: `/compare/${comparison.slug}/` } };
}

function CellValue({ value }: { value: string | boolean }) {
	if (typeof value === "boolean") {
		return value
			? <Check aria-label="支持" className="h-4 w-4 text-success" />
			: <Minus aria-label="未标注" className="h-4 w-4 text-muted-foreground/40" />;
	}
	return <>{value}</>;
}

export default async function CompareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const comparison = comparisons.find(item => item.slug === slug);
	if (!comparison) notFound();
	const browserA = browserBySlug(comparison.browsers[0]) ?? browsers[0];
	const browserB = browserBySlug(comparison.browsers[1]) ?? browsers[1];
	const rows = [
		["免费额度", browserA.free, browserB.free],
		["价格", browserA.price, browserB.price],
		["环境数量", browserA.profiles, browserB.profiles],
		["平台", browserA.platforms.join(", "), browserB.platforms.join(", ")],
		["浏览器内核", browserA.engine, browserB.engine],
		["存储方式", browserA.storage, browserB.storage],
		["API", browserA.api, browserB.api],
		["自动化", browserA.automation, browserB.automation],
		["代理", browserA.proxy, browserB.proxy],
		["协议", browserA.proxyProtocols.join(", ") || "以官网为准", browserB.proxyProtocols.join(", ") || "以官网为准"]
	] as Array<[string, string | boolean, string | boolean]>;
	const related = comparisons.filter(item => item.slug !== comparison.slug && item.browsers.some(itemSlug => comparison.browsers.includes(itemSlug))).slice(0, 4);
	const jsonLd = [
		{ "@context": "https://schema.org", "@type": "Article", headline: comparison.title, description: comparison.description, dateModified: "2026-08-11", author: { "@type": "Person", name: "xxjrq" }, mainEntityOfPage: `https://browserhub.co/compare/${comparison.slug}/` },
		{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首页", item: "https://browserhub.co/" }, { "@type": "ListItem", position: 2, name: "浏览器对比", item: "https://browserhub.co/compare/" }, { "@type": "ListItem", position: 3, name: comparison.title, item: `https://browserhub.co/compare/${comparison.slug}/` }] }
	];

	return (
		<div className="container py-10 md:py-14">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<nav className="mb-6 flex items-center font-mono text-xs tracking-wide text-muted-foreground" aria-label="面包屑">
				<Link href="/" className="transition-colors hover:text-foreground">首页</Link>
				<span className="mx-2 text-border">/</span>
				<Link href="/compare/" className="transition-colors hover:text-foreground">浏览器对比</Link>
				<span className="mx-2 text-border">/</span>
				<span className="text-foreground">{comparison.title}</span>
			</nav>
			<Link href="/compare/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2 text-muted-foreground")}><ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />返回对比列表</Link>

			<article>
				<header className="mb-10">
					<h1 className="flex flex-wrap items-center gap-4 sm:gap-6">
						<Link href={`/browsers/${browserA.slug}/`} className="flex items-center gap-3 transition-opacity hover:opacity-80">
							<ResourceIcon name={browserA.name} src={browserA.icon} website={browserA.website} size={52} />
							<span className="text-xl font-semibold tracking-tight sm:text-2xl">{browserA.name}</span>
						</Link>
						<span className="rounded-full border bg-card px-3 py-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">vs</span>
						<Link href={`/browsers/${browserB.slug}/`} className="flex items-center gap-3 transition-opacity hover:opacity-80">
							<ResourceIcon name={browserB.name} src={browserB.icon} website={browserB.website} size={52} />
							<span className="text-xl font-semibold tracking-tight sm:text-2xl">{browserB.name}</span>
						</Link>
					</h1>
					<p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{comparison.description} 本页使用同一组字段展示差异，价格和功能以官方页面为准。</p>
				</header>

				<Card>
					<CardHeader>
						<p className="eyebrow">Comparison Table</p>
						<CardTitle className="text-lg">统一字段对比</CardTitle>
					</CardHeader>
					<CardContent className="overflow-x-auto p-0">
						<table className="w-full min-w-[560px] text-sm">
							<thead>
								<tr className="border-y bg-muted/50 text-left">
									<th className="p-4 pl-(--card-spacing) font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase">比较项目</th>
									<th className="p-4 font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase">{browserA.name}</th>
									<th className="p-4 pr-(--card-spacing) font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase">{browserB.name}</th>
								</tr>
							</thead>
							<tbody>
								{rows.map(([label, valueA, valueB]) => (
									<tr key={label} className="border-b transition-colors last:border-0 hover:bg-muted/30">
										<td className="p-4 pl-(--card-spacing) font-medium whitespace-nowrap text-muted-foreground">{label}</td>
										<td className="p-4"><CellValue value={valueA} /></td>
										<td className="p-4 pr-(--card-spacing)"><CellValue value={valueB} /></td>
									</tr>
								))}
								<tr className="hover:bg-muted/30">
									<td className="p-4 pl-(--card-spacing) font-medium whitespace-nowrap text-muted-foreground">编辑评分</td>
									<td className="p-4"><Rating value={browserA.rating} /></td>
									<td className="p-4 pr-(--card-spacing)"><Rating value={browserB.rating} /></td>
								</tr>
							</tbody>
						</table>
					</CardContent>
				</Card>

				<div className="mt-6 grid gap-5 md:grid-cols-2">
					<Card>
						<CardHeader>
							<p className="eyebrow">Best For</p>
							<CardTitle className="flex items-center gap-2.5 text-base"><ResourceIcon name={browserA.name} src={browserA.icon} website={browserA.website} size={24} />{browserA.name} 更适合</CardTitle>
						</CardHeader>
						<CardContent><ul className="space-y-2.5">{browserA.bestFor.slice(0, 4).map(item => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />{item}</li>)}</ul></CardContent>
					</Card>
					<Card>
						<CardHeader>
							<p className="eyebrow">Best For</p>
							<CardTitle className="flex items-center gap-2.5 text-base"><ResourceIcon name={browserB.name} src={browserB.icon} website={browserB.website} size={24} />{browserB.name} 更适合</CardTitle>
						</CardHeader>
						<CardContent><ul className="space-y-2.5">{browserB.bestFor.slice(0, 4).map(item => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />{item}</li>)}</ul></CardContent>
					</Card>
				</div>

				<p className="mt-6 border-l-2 border-primary bg-primary/[0.04] px-4 py-3 text-sm leading-7 text-muted-foreground">
					选型建议：先按环境数量、平台和存储方式缩小范围，再验证 API、自动化、代理和团队协作能力。评分是编辑整理指标，不代表官方承诺。
				</p>

				<section className="mt-12">
					<h2 className="mb-1 text-lg font-semibold tracking-tight">相关对比</h2>
					<p className="eyebrow mb-4">Related</p>
					<div className="grid gap-3 md:grid-cols-2">
						{related.map(item => (
							<Link key={item.slug} href={`/compare/${item.slug}/`} className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-foreground/25">
								<span className="min-w-0 truncate text-sm font-medium">{item.title}</span>
								<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
							</Link>
						))}
					</div>
				</section>
			</article>
		</div>
	);
}
