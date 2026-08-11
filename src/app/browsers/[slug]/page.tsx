import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, X, ExternalLink, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { browserBySlug, browsers, comparisons, guides } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";

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
		<div className="container py-12">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<nav className="mb-6 text-sm text-muted-foreground" aria-label="面包屑"><Link href="/">首页</Link><span className="mx-2">/</span><Link href="/browsers/">指纹浏览器</Link><span className="mx-2">/</span><span>{browser.name}</span></nav>
			<Link href="/browsers/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回浏览器列表</Link>

			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="mb-6 flex flex-wrap items-center gap-4"><ResourceIcon name={browser.name} src={browser.icon} size={56} /><h1 className="text-4xl font-bold tracking-tight">{browser.name}</h1>{browser.featured && <Badge>Featured</Badge>}<Badge variant="secondary">{browser.status}</Badge></div>
					{browser.sponsored && <p className="mb-5 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">说明：{browser.name} 是 BrowserHub 的关联产品，页面仍按统一字段列出优势、限制和来源，价格及功能以官网为准。</p>}
					<p className="mb-6 text-lg leading-8 text-muted-foreground">{browser.longDescription}</p>
					<div className="mb-8 flex flex-wrap gap-2">{browser.bestFor.slice(0, 4).map(item => <Badge key={item} variant="outline">适合：{item}</Badge>)}</div>

					<Separator className="my-8" />
					<h2 className="mb-4 text-2xl font-bold">核心功能</h2>
					<ul className="mb-8 grid gap-3 md:grid-cols-2">{browser.features.map(feature => <li key={feature} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-green-600" /><span>{feature}</span></li>)}</ul>

					<div className="grid gap-6 md:grid-cols-2">
						<Card><CardHeader><CardTitle className="text-green-600">优势</CardTitle></CardHeader><CardContent><ul className="space-y-3">{browser.pros.map(item => <li key={item} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-green-600" /><span>{item}</span></li>)}</ul></CardContent></Card>
						<Card><CardHeader><CardTitle className="text-red-600">限制与注意事项</CardTitle></CardHeader><CardContent><ul className="space-y-3">{browser.cons.map(item => <li key={item} className="flex items-start gap-2"><X className="mt-1 h-4 w-4 shrink-0 text-red-600" /><span>{item}</span></li>)}</ul></CardContent></Card>
					</div>

					<Separator className="my-8" />
					<h2 className="mb-4 text-2xl font-bold">适用场景</h2>
					<div className="mb-8 grid gap-3 md:grid-cols-2">{browser.bestFor.map(item => <div key={item} className="rounded-lg border bg-muted/20 p-4">{item}</div>)}</div>

					<h2 className="mb-4 text-2xl font-bold">常见问题</h2>
					<div className="space-y-4">{faq.map(item => <Card key={item.question}><CardHeader><CardTitle className="text-base">{item.question}</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">{item.answer}</p></CardContent></Card>)}</div>
				</div>

				<div className="lg:col-span-1"><Card className="sticky top-20"><CardHeader><CardTitle>价格与规格</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex justify-between gap-4"><span className="text-muted-foreground">免费额度</span><span className="text-right font-medium">{browser.free}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">起步价格</span><span className="text-right font-medium">{browser.price}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">环境数量</span><span className="text-right font-medium">{browser.profiles}</span></div><Separator /><div className="flex justify-between"><span className="text-muted-foreground">API</span>{browser.api ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}</div><div className="flex justify-between"><span className="text-muted-foreground">自动化</span>{browser.automation ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}</div><div className="flex justify-between"><span className="text-muted-foreground">代理</span>{browser.proxy ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}</div><Separator /><div className="flex justify-between gap-4"><span className="text-muted-foreground">平台</span><span className="text-right font-medium">{browser.platforms.join(", ")}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">内核</span><span className="text-right font-medium">{browser.engine}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">存储</span><span className="text-right font-medium">{browser.storage}</span></div><div className="flex justify-between"><span className="text-muted-foreground">编辑评分</span><span className="font-medium" aria-label={`${browser.rating} out of 5`}>{"★".repeat(browser.rating)}{"☆".repeat(5 - browser.rating)}</span></div><Separator /><div className="space-y-2"><a href={browser.sponsored ? `${browser.website}?utm_source=browserhub&utm_medium=referral&utm_campaign=resource_hub` : browser.website} target="_blank" rel="noopener noreferrer" className={buttonVariants() + " w-full"}><ExternalLink className="mr-2 h-4 w-4" /> 访问官网</a>{browser.download && <a href={browser.download} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" }) + " w-full"}><Download className="mr-2 h-4 w-4" /> 下载</a>}</div></CardContent></Card></div>
			</div>

			<div className="mt-12 grid gap-8 lg:grid-cols-3"><section><h2 className="mb-4 text-xl font-bold">相关浏览器</h2><div className="space-y-3">{relatedBrowsers.map(item => <Link key={item.slug} href={`/browsers/${item.slug}/`} className="flex items-center justify-between rounded-lg border p-4 hover:border-primary"><span>{item.name}</span><ArrowRight className="h-4 w-4" /></Link>)}</div></section><section><h2 className="mb-4 text-xl font-bold">相关对比</h2><div className="space-y-3">{relatedComparisons.map(item => <Link key={item.slug} href={`/compare/${item.slug}/`} className="flex items-center justify-between rounded-lg border p-4 hover:border-primary"><span>{item.title}</span><ArrowRight className="h-4 w-4" /></Link>)}</div></section><section><h2 className="mb-4 text-xl font-bold">相关指南</h2><div className="space-y-3">{relatedGuides.map(item => <Link key={item.slug} href={`/guides/${item.slug}/`} className="flex items-center justify-between rounded-lg border p-4 hover:border-primary"><span>{item.title}</span><ArrowRight className="h-4 w-4" /></Link>)}</div></section></div>
			<p className="mt-10 text-sm text-muted-foreground">资料来源：<a className="underline" href={browser.sourceUrl} target="_blank" rel="noopener noreferrer">公开资源整理</a> · 更新于 {browser.updatedAt} · 价格、套餐和功能请以官方页面为准。</p>
		</div>
	);
}
