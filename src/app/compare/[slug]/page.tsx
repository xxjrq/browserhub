import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { browserBySlug, browsers, comparisons } from "@/data/resources";

export function generateStaticParams() { return comparisons.map(comparison => ({ slug: comparison.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const comparison = comparisons.find(item => item.slug === slug);
	if (!comparison) return {};
	const description = `${comparison.description} 统一比较免费额度、价格、环境数量、平台、内核、API、自动化、代理和存储方式。`;
	return { title: `${comparison.title}：功能与价格对比`, description, alternates: { canonical: `/compare/${comparison.slug}/` }, openGraph: { title: comparison.title, description, url: `/compare/${comparison.slug}/` } };
}

export default async function CompareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const comparison = comparisons.find(item => item.slug === slug);
	if (!comparison) notFound();
	const browserA = browserBySlug(comparison.browsers[0]) ?? browsers[0];
	const browserB = browserBySlug(comparison.browsers[1]) ?? browsers[1];
	const rows = [
		["免费额度", browserA.free, browserB.free], ["价格", browserA.price, browserB.price], ["环境数量", browserA.profiles, browserB.profiles], ["平台", browserA.platforms.join(", "), browserB.platforms.join(", ")], ["浏览器内核", browserA.engine, browserB.engine], ["存储方式", browserA.storage, browserB.storage], ["API", browserA.api, browserB.api], ["自动化", browserA.automation, browserB.automation], ["代理", browserA.proxy, browserB.proxy], ["协议", browserA.proxyProtocols.join(", ") || "以官网为准", browserB.proxyProtocols.join(", ") || "以官网为准"], ["编辑评分", `${"★".repeat(browserA.rating)}${"☆".repeat(5 - browserA.rating)}`, `${"★".repeat(browserB.rating)}${"☆".repeat(5 - browserB.rating)}`]
	] as Array<[string, string | boolean, string | boolean]>;
	const related = comparisons.filter(item => item.slug !== comparison.slug && item.browsers.some(itemSlug => comparison.browsers.includes(itemSlug))).slice(0, 4);
	const jsonLd = [
		{ "@context": "https://schema.org", "@type": "Article", headline: comparison.title, description: comparison.description, dateModified: "2026-08-11", author: { "@type": "Person", name: "xxjrq" }, mainEntityOfPage: `https://browserhub.co/compare/${comparison.slug}/` },
		{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首页", item: "https://browserhub.co/" }, { "@type": "ListItem", position: 2, name: "浏览器对比", item: "https://browserhub.co/compare/" }, { "@type": "ListItem", position: 3, name: comparison.title, item: `https://browserhub.co/compare/${comparison.slug}/` }] }
	];
	return <div className="container py-12"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><nav className="mb-6 text-sm text-muted-foreground" aria-label="面包屑"><Link href="/">首页</Link><span className="mx-2">/</span><Link href="/compare/">浏览器对比</Link><span className="mx-2">/</span><span>{comparison.title}</span></nav><Link href="/compare/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回对比列表</Link><article><div className="mb-8"><h1 className="text-4xl font-bold tracking-tight">{comparison.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{comparison.description} 本页使用同一组字段展示差异，价格和功能以官方页面为准。</p></div><Card><CardHeader><CardTitle>统一字段对比</CardTitle></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>比较项目</TableHead><TableHead>{browserA.name}</TableHead><TableHead>{browserB.name}</TableHead></TableRow></TableHeader><TableBody>{rows.map(([label, valueA, valueB]) => <TableRow key={label}><TableCell className="font-medium">{label}</TableCell><TableCell>{typeof valueA === "boolean" ? valueA ? <Check aria-label="支持" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持" className="h-4 w-4 text-red-600" /> : valueA}</TableCell><TableCell>{typeof valueB === "boolean" ? valueB ? <Check aria-label="支持" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持" className="h-4 w-4 text-red-600" /> : valueB}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card><div className="mt-8 grid gap-6 md:grid-cols-2"><Card><CardHeader><CardTitle>{browserA.name} 更适合</CardTitle></CardHeader><CardContent><ul className="space-y-2">{browserA.bestFor.slice(0, 4).map(item => <li key={item}>• {item}</li>)}</ul></CardContent></Card><Card><CardHeader><CardTitle>{browserB.name} 更适合</CardTitle></CardHeader><CardContent><ul className="space-y-2">{browserB.bestFor.slice(0, 4).map(item => <li key={item}>• {item}</li>)}</ul></CardContent></Card></div><p className="mt-8 rounded-lg border bg-muted/20 p-4 text-sm leading-7 text-muted-foreground">选型建议：先按环境数量、平台和存储方式缩小范围，再验证 API、自动化、代理和团队协作能力。评分是编辑整理指标，不代表官方承诺。</p><section className="mt-10"><h2 className="mb-4 text-2xl font-bold">相关对比</h2><div className="grid gap-3 md:grid-cols-2">{related.map(item => <Link key={item.slug} href={`/compare/${item.slug}/`} className="flex items-center justify-between rounded-lg border p-4 hover:border-primary"><span>{item.title}</span><ArrowRight className="h-4 w-4" /></Link>)}</div></section></article></div>;
}
