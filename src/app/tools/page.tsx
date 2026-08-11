"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { cn } from "@/lib/utils";

export default function ToolsPage() {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("all");
	useEffect(() => {
		window.requestAnimationFrame(() => {
			const params = new URLSearchParams(window.location.search);
			setQuery(params.get("q") ?? "");
			setCategory(params.get("category") ?? "all");
		});
	}, []);
	const categories = [...new Map(tools.map(tool => [tool.categorySlug, tool.category])).entries()];
	const filtered = tools.filter(tool => (!query || `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase())) && (category === "all" || tool.categorySlug === category || tool.categorySlug.includes(category)));
	return <div className="container py-12"><div className="mb-10"><h1 className="text-4xl font-bold tracking-tight">指纹检测与自动化工具</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">整理浏览器指纹检测、自动化框架、网络测试和隐私工具，并区分用途与状态。</p></div><div className="mb-8 grid gap-3 rounded-xl border bg-muted/30 p-4 md:grid-cols-[1fr_auto_auto]"><label className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><span className="sr-only">搜索工具</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索工具名称或用途" className="h-10 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label><label className="sr-only" htmlFor="tool-category">工具分类</label><select id="tool-category" value={category} onChange={event => setCategory(event.target.value)} className="h-10 rounded-lg border bg-background px-3 text-sm"><option value="all">全部分类</option>{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button type="button" onClick={() => { setQuery(""); setCategory("all"); }} className={buttonVariants({ variant: "outline" })}>清除筛选</button></div><p className="mb-5 text-sm text-muted-foreground">显示 {filtered.length} / {tools.length} 个资源</p><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map(tool => <Card key={tool.slug}><CardHeader><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><ResourceIcon name={tool.name} src={tool.icon} /><CardTitle className="text-xl">{tool.name}</CardTitle></div><Badge variant="secondary">{tool.category}</Badge></div><CardDescription className="pt-2">{tool.description}</CardDescription></CardHeader><CardContent><dl className="space-y-2 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">状态</dt><dd className="font-medium">{tool.status}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">平台</dt><dd className="text-right font-medium">{tool.platforms.join(", ")}</dd></div></dl><div className="mt-4 flex gap-2"><Link href={`/tools/${tool.slug}/`} className={cn(buttonVariants({ variant: "outline" }), "flex-1")}>详情 <ArrowRight className="ml-2 h-4 w-4" /></Link><a href={tool.website} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`打开 ${tool.name} 官网`}><ExternalLink className="h-4 w-4" /></a></div></CardContent></Card>)}</div>{filtered.length === 0 && <Card className="mt-6 p-10 text-center"><CardTitle>没有匹配资源</CardTitle><CardDescription className="mt-2">请尝试其他关键词或清除筛选。</CardDescription></Card>}</div>;
}
