import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, Download, ExternalLink, Minus, Star, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { browserBySlug, browsers, comparisons, guides } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { StatusBadge } from "@/components/status-badge";
import { Rating } from "@/components/rating";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
	return browsers.map(browser => ({ slug: browser.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const browser = browserBySlug(slug);
	if (!browser) return {};
	const title = `${browser.name}：价格、功能与平台信息`;
	const description = `${browser.name} 指纹浏览器资料：免费额度、价格、环境数量、平台、内核、API、自动化、代理、优势与限制。`;
	return { title, description, alternates: { canonical: `/browsers/${browser.slug}/` }, openGraph: { title, description, url: `/browsers/${browser.slug}/` } };
}

function SpecRow({ label, value }: { label: string; value: React.ReactNode }) {
	return (
		<div className="flex items-start justify-between gap-4">
			<span className="shrink-0 text-sm text-muted-foreground">{label}</span>
			<span className="text-right text-sm font-medium">{value}</span>
		</div>
	);
}

function CapabilityRow({ label, ok }: { label: string; ok: boolean }) {
	return (
		<div className="flex items-center justify-between gap-4">
			<span className="text-sm text-muted-foreground">{label}</span>
			{ok
				? <span className="inline-flex items-center gap-1.5 text-sm font-medium"><Check className="h-4 w-4 text-success" aria-hidden="true" />支持</span>
				: <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Minus className="h-4 w-4" aria-hidden="true" />未标注</span>}
		</div>
	);
}

export default async function BrowserDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const browser = browserBySlug(slug);
	if (!browser) notFound();

	const relatedBrowsers = browsers.filter(item => item.slug !== browser.slug && item.type === browser.type).slice(0, 3);
	const relatedComparisons = comparisons.filter(item => item.browsers.includes(browser.slug)).slice(0, 6);
	const relatedGuides = guides.filter(guide => guide.relatedBrowsers?.includes(browser.slug)).slice(0, 3);
	const faq = [
		{ question: `${browser.name} 适合什么用户？`, answer: `${browser.name} 的公开资料显示，它主要面向${browser.bestFor.slice(0, 2).join("和")}等浏览器环境管理场景。具体适用范围应结合平台、账号数量和自动化需求判断。` },
		{ question: `${browser.name} 的价格是多少？`, answer: `当前页面记录的起步信息为“${browser.price}”，免费额度为“${browser.free}”。价格、套餐和免费额度可能调整，请以官方页面为准。` },
		{ question: `${browser.name} 支持哪些能力？`, answer: `当前整理结果显示：API${browser.api ? "支持" : "未标注支持"}、自动化${browser.automation ? "支持" : "未标注支持"}、代理${browser.proxy ? "支持" : "未标注支持"}。实际接口和版本以官方文档为准。` }
	];
	const jsonLd = [
		{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: browser.name, description: browser.description, applicationCategory: "WebApplication", operatingSystem: browser.platforms.join(", "), url: browser.website },
		{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首页", item: "https://browserhub.co/" }, { "@type": "ListItem", position: 2, name: "指纹浏览器", item: "https://browserhub.co/browsers/" }, { "@type": "ListItem", position: 3, name: browser.name, item: `https://browserhub.co/browsers/${browser.slug}/` }] },
		{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
	];

	return (
		<div className="container py-10 md:py-14">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<nav className="mb-6 flex items-center font-mono text-xs tracking-wide text-muted-foreground" aria-label="面包屑">
				<Link href="/" className="transition-colors hover:text-foreground">首页</Link>
				<span className="mx-2 text-border">/</span>
				<Link href="/browsers/" className="transition-colors hover:text-foreground">指纹浏览器</Link>
				<span className="mx-2 text-border">/</span>
				<span className="text-foreground">{browser.name}</span>
			</nav>
			<Link href="/browsers/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2 text-muted-foreground")}><ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />返回浏览器列表</Link>

			<div className="grid gap-10 lg:grid-cols-3">
				<div className="min-w-0 lg:col-span-2">
					<header className="mb-8">
						<div className="flex flex-wrap items-center gap-4">
							<ResourceIcon name={browser.name} src={browser.icon} website={browser.website} size={64} />
							<div className="min-w-0">
								<div className="flex flex-wrap items-center gap-3">
									<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{browser.name}</h1>
									{browser.featured && <Star aria-label="Featured" className="h-5 w-5 fill-primary text-primary" />}
								</div>
								<div className="mt-2 flex flex-wrap items-center gap-2.5">
									<StatusBadge status={browser.status} />
									<span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">{browser.type} · {browser.engine}</span>
								</div>
							</div>
						</div>
					</header>

					{browser.sponsored && (
						<p className="mb-6 border-l-2 border-primary bg-primary/[0.04] px-4 py-3 text-sm leading-6 text-muted-foreground">
							说明：{browser.name} 是 BrowserHub 的关联产品，页面仍按统一字段列出优势、限制和来源，价格及功能以官网为准。
						</p>
					)}

					<p className="mb-6 text-lg leading-8 text-muted-foreground">{browser.longDescription}</p>
					<div className="mb-4 flex flex-wrap gap-2">
						{browser.bestFor.slice(0, 4).map(item => (
							<span key={item} className="rounded-full border bg-card px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground">{item}</span>
						))}
					</div>

					<Separator className="my-10" />

					<h2 className="mb-1 text-xl font-semibold tracking-tight">核心功能</h2>
					<p className="eyebrow mb-5">Features</p>
					<ul className="grid gap-3 sm:grid-cols-2">
						{browser.features.map(feature => (
							<li key={feature} className="flex items-start gap-2.5 rounded-lg border bg-card px-3.5 py-3 text-sm">
								<Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
								{feature}
							</li>
						))}
					</ul>

					<div className="mt-10 grid gap-5 md:grid-cols-2">
						<Card>
							<CardHeader><CardTitle className="flex items-center gap-2 text-base"><Check className="h-4 w-4 text-success" aria-hidden="true" />优势</CardTitle></CardHeader>
							<CardContent><ul className="space-y-3">{browser.pros.map(item => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />{item}</li>)}</ul></CardContent>
						</Card>
						<Card>
							<CardHeader><CardTitle className="flex items-center gap-2 text-base"><X className="h-4 w-4 text-destructive" aria-hidden="true" />限制与注意事项</CardTitle></CardHeader>
							<CardContent><ul className="space-y-3">{browser.cons.map(item => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><X className="mt-1 h-3.5 w-3.5 shrink-0 text-destructive" aria-hidden="true" />{item}</li>)}</ul></CardContent>
						</Card>
					</div>

					<Separator className="my-10" />

					<h2 className="mb-1 text-xl font-semibold tracking-tight">适用场景</h2>
					<p className="eyebrow mb-5">Use Cases</p>
					<div className="grid gap-3 sm:grid-cols-2">
						{browser.bestFor.map(item => <div key={item} className="rounded-lg border bg-card px-4 py-3.5 text-sm">{item}</div>)}
					</div>

					<Separator className="my-10" />

					<h2 className="mb-1 text-xl font-semibold tracking-tight">常见问题</h2>
					<p className="eyebrow mb-5">FAQ</p>
					<div className="space-y-4">
						{faq.map(item => (
							<Card key={item.question}>
								<CardHeader><CardTitle className="text-base">{item.question}</CardTitle></CardHeader>
								<CardContent><p className="text-sm leading-7 text-muted-foreground">{item.answer}</p></CardContent>
							</Card>
						))}
					</div>
				</div>

				<aside className="lg:col-span-1">
					<Card className="sticky top-20">
						<CardHeader>
							<p className="eyebrow">Specifications</p>
							<CardTitle className="text-lg">价格与规格</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<SpecRow label="免费额度" value={browser.free} />
							<SpecRow label="起步价格" value={<span className="font-mono">{browser.price}</span>} />
							<SpecRow label="官方价格页" value={<a href={browser.pricingUrl ?? browser.website} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">查看</a>} />
							<SpecRow label="环境数量" value={browser.profiles} />
							<Separator />
							<CapabilityRow label="API" ok={browser.api} />
							<CapabilityRow label="自动化" ok={browser.automation} />
							<CapabilityRow label="代理" ok={browser.proxy} />
							<Separator />
							<SpecRow label="平台" value={browser.platforms.join(", ")} />
							<SpecRow label="内核" value={browser.engine} />
							<SpecRow label="存储" value={browser.storage} />
							{browser.pricingCheckedAt && <p className="border-t pt-3 text-xs leading-5 text-muted-foreground">价格核对：{browser.pricingCheckedAt} · 价格可能随官网套餐调整</p>}
							<div className="flex items-center justify-between gap-4">
								<span className="text-sm text-muted-foreground">编辑评分</span>
								<Rating value={browser.rating} />
							</div>
							<Separator />
							<div className="space-y-2 pt-1">
								<a href={browser.sponsored ? `${browser.website}?utm_source=browserhub&utm_medium=referral&utm_campaign=resource_hub` : browser.website} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "w-full")}>
									<ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />访问官网
								</a>
								{browser.download && (
									<a href={browser.download} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
										<Download className="mr-2 h-4 w-4" aria-hidden="true" />下载
									</a>
								)}
							</div>
						</CardContent>
					</Card>
				</aside>
			</div>

			<div className="mt-14 grid gap-10 lg:grid-cols-3">
				<section>
					<h2 className="mb-1 text-lg font-semibold tracking-tight">相关浏览器</h2>
					<p className="eyebrow mb-4">Related</p>
					<div className="space-y-2.5">
						{relatedBrowsers.map(item => (
							<Link key={item.slug} href={`/browsers/${item.slug}/`} className="group flex items-center gap-3 rounded-lg border bg-card p-3.5 transition-colors hover:border-foreground/25">
								<ResourceIcon name={item.name} src={item.icon} website={item.website} size={28} />
								<span className="min-w-0 flex-1 truncate text-sm font-medium">{item.name}</span>
								<ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
							</Link>
						))}
					</div>
				</section>
				<section>
					<h2 className="mb-1 text-lg font-semibold tracking-tight">相关对比</h2>
					<p className="eyebrow mb-4">Compare</p>
					<div className="space-y-2.5">
						{relatedComparisons.map(item => (
							<Link key={item.slug} href={`/compare/${item.slug}/`} className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-3.5 transition-colors hover:border-foreground/25">
								<span className="min-w-0 truncate text-sm font-medium">{item.title}</span>
								<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
							</Link>
						))}
					</div>
				</section>
				<section>
					<h2 className="mb-1 text-lg font-semibold tracking-tight">相关指南</h2>
					<p className="eyebrow mb-4">Guides</p>
					<div className="space-y-2.5">
						{relatedGuides.map(item => (
							<Link key={item.slug} href={`/guides/${item.slug}/`} className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-3.5 transition-colors hover:border-foreground/25">
								<span className="min-w-0 truncate text-sm font-medium">{item.title}</span>
								<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
							</Link>
						))}
					</div>
				</section>
			</div>

			<p className="mt-12 border-t pt-6 font-mono text-xs leading-6 text-muted-foreground">
				资料来源：<a className="underline underline-offset-4 transition-colors hover:text-foreground" href={browser.sourceUrl} target="_blank" rel="noopener noreferrer">公开资源整理</a> · 更新于 {browser.updatedAt} · 价格、套餐和功能请以官方页面为准。
			</p>
		</div>
	);
}
