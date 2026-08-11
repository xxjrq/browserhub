import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toolBySlug, tools } from "@/data/resources";

export function generateStaticParams() { return tools.map(tool => ({ slug: tool.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const tool = toolBySlug(slug);
	if (!tool) return {};
	const title = `${tool.name}：用途、功能与使用说明`;
	const description = `${tool.name} ${tool.category}工具介绍：适用场景、主要能力、使用方法、平台、费用和限制。`;
	return { title, description, alternates: { canonical: `/tools/${tool.slug}/` }, openGraph: { title, description, url: `/tools/${tool.slug}/` } };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const tool = toolBySlug(slug);
	if (!tool) notFound();
	const relatedTools = tools.filter(item => item.slug !== tool.slug && item.categorySlug === tool.categorySlug).slice(0, 4);
	const fallbackTools = relatedTools.length > 1 ? relatedTools : tools.filter(item => item.slug !== tool.slug).slice(0, 4);
	const faq = [
		{ question: `${tool.name} 主要用来做什么？`, answer: `${tool.name} 属于${tool.category}，适合用于${tool.features.slice(0, 2).join("、")}等公开测试或研究场景。` },
		{ question: `${tool.name} 使用时要注意什么？`, answer: "检测结果是特定时间、浏览器和网络环境下的观察，不应被理解为对用户身份或平台决策的绝对结论。请遵守网站条款和当地法律。" }
	];
	const jsonLd = [
		{ "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, description: tool.description, applicationCategory: tool.category, operatingSystem: tool.platforms.join(", "), url: tool.website },
		{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首页", item: "https://browserhub.co/" }, { "@type": "ListItem", position: 2, name: "检测与自动化工具", item: "https://browserhub.co/tools/" }, { "@type": "ListItem", position: 3, name: tool.name, item: `https://browserhub.co/tools/${tool.slug}/` }] },
		{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }
	];

	return <div className="container py-12"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><nav className="mb-6 text-sm text-muted-foreground" aria-label="面包屑"><Link href="/">首页</Link><span className="mx-2">/</span><Link href="/tools/">工具</Link><span className="mx-2">/</span><span>{tool.name}</span></nav><Link href="/tools/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回工具列表</Link><div className="grid gap-8 lg:grid-cols-3"><article className="lg:col-span-2"><div className="mb-6 flex flex-wrap items-center gap-4"><h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1><Badge variant="secondary">{tool.category}</Badge><Badge variant="outline">{tool.status}</Badge></div><p className="mb-8 text-lg leading-8 text-muted-foreground">{tool.longDescription}</p><h2 className="mb-4 text-2xl font-bold">主要能力</h2><ul className="mb-8 grid gap-3 md:grid-cols-2">{tool.features.map(feature => <li key={feature} className="flex items-start gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-green-600" /><span>{feature}</span></li>)}</ul><Separator className="my-8" /><h2 className="mb-4 text-2xl font-bold">使用方法</h2><ol className="mb-8 list-decimal space-y-3 pl-6 leading-7 text-muted-foreground"><li>打开官方工具页面，确认页面地址和隐私说明。</li><li>在待测浏览器环境中运行检测，记录原始结果和测试时间。</li><li>将结果与其他独立工具交叉观察，不把单一分数当作结论。</li></ol><h2 className="mb-4 text-2xl font-bold">常见问题</h2><div className="space-y-4">{faq.map(item => <Card key={item.question}><CardHeader><CardTitle className="text-base">{item.question}</CardTitle></CardHeader><CardContent><p className="leading-7 text-muted-foreground">{item.answer}</p></CardContent></Card>)}</div></article><aside><Card className="sticky top-20"><CardHeader><CardTitle>资源详情</CardTitle></CardHeader><CardContent className="space-y-4"><div className="flex justify-between gap-4"><span className="text-muted-foreground">分类</span><span className="font-medium">{tool.category}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">费用</span><span className="text-right font-medium">{tool.pricing}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">平台</span><span className="text-right font-medium">{tool.platforms.join(", ")}</span></div><Separator /><a href={tool.website} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "default" }) + " w-full"}><ExternalLink className="mr-2 h-4 w-4" />访问官网</a></CardContent></Card></aside></div><div className="mt-12"><h2 className="mb-4 text-2xl font-bold">相关工具</h2><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{fallbackTools.map(item => <Link key={item.slug} href={`/tools/${item.slug}/`} className="flex items-center justify-between rounded-lg border p-4 hover:border-primary"><span>{item.name}</span><ArrowRight className="h-4 w-4" /></Link>)}</div></div><p className="mt-10 text-sm text-muted-foreground">资料来源：<a className="underline" href={tool.sourceUrl} target="_blank" rel="noopener noreferrer">公开资源整理</a> · 更新于 {tool.updatedAt} · 使用前请阅读官方说明。</p></div>;
}
