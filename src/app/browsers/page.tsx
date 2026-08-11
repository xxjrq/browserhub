"use client";

import Link from "next/link";
import { ArrowRight, Check, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { browsers } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { cn } from "@/lib/utils";

export default function BrowsersPage() {
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState("all");
	const [platform, setPlatform] = useState("all");
	useEffect(() => {
		window.requestAnimationFrame(() => {
			const params = new URLSearchParams(window.location.search);
			setQuery(params.get("q") ?? "");
			setStatus(params.get("status") ?? "all");
			setPlatform(params.get("platform") ?? "all");
		});
	}, []);
	const platforms = useMemo(() => [...new Set(browsers.flatMap(browser => browser.platforms))].sort(), []);
	const filtered = browsers.filter(browser => {
		const haystack = [browser.name, browser.description, browser.type, ...browser.bestFor, ...browser.platforms].join(" ").toLowerCase();
		return (!query || haystack.includes(query.toLowerCase())) && (status === "all" || browser.status === status) && (platform === "all" || browser.platforms.includes(platform));
	});

	return <div className="container py-12">
		<div className="mb-10"><h1 className="text-4xl font-bold tracking-tight">指纹浏览器</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">比较多账号管理、自动化和隐私工作流中的浏览器资源。状态和价格以官方页面为准。</p></div>
		<div className="mb-8 grid gap-3 rounded-xl border bg-muted/30 p-4 md:grid-cols-[1fr_auto_auto_auto]">
			<label className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><span className="sr-only">搜索浏览器</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索名称、场景或平台" className="h-10 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
			<label className="sr-only" htmlFor="browser-status">状态</label><select id="browser-status" value={status} onChange={event => setStatus(event.target.value)} className="h-10 rounded-lg border bg-background px-3 text-sm"><option value="all">全部状态</option><option value="recommended">推荐</option><option value="active">可用</option><option value="open-source">开源项目</option><option value="experimental">实验项目</option><option value="pending-review">待核验</option></select>
			<label className="sr-only" htmlFor="browser-platform">平台</label><select id="browser-platform" value={platform} onChange={event => setPlatform(event.target.value)} className="h-10 rounded-lg border bg-background px-3 text-sm"><option value="all">全部平台</option>{platforms.map(item => <option key={item} value={item}>{item}</option>)}</select>
			<button type="button" onClick={() => { setQuery(""); setStatus("all"); setPlatform("all"); }} className={buttonVariants({ variant: "outline" })}>清除筛选</button>
		</div>
		<p className="mb-5 text-sm text-muted-foreground">显示 {filtered.length} / {browsers.length} 个资源</p>
		<div className="hidden overflow-hidden rounded-xl border md:block"><div className="overflow-x-auto"><table className="w-full min-w-[980px] text-sm"><thead className="bg-muted/50"><tr className="border-b text-left"><th className="p-4">浏览器</th><th className="p-4">状态</th><th className="p-4">免费</th><th className="p-4">价格</th><th className="p-4">API</th><th className="p-4">自动化</th><th className="p-4">代理</th><th className="p-4">平台</th><th className="p-4">评分</th></tr></thead><tbody>{filtered.map(browser => <tr key={browser.slug} className="border-b last:border-0"><td className="whitespace-nowrap p-4 font-medium"><Link href={`/browsers/${browser.slug}/`} className="inline-flex items-center gap-2 hover:text-primary"><ResourceIcon name={browser.name} src={browser.icon} size={32} />{browser.name}</Link>{browser.featured && <Badge className="ml-2">本站产品</Badge>}</td><td className="p-4"><Badge variant={browser.status === "recommended" ? "default" : "secondary"}>{browser.status}</Badge></td><td className="p-4 whitespace-nowrap">{browser.free}</td><td className="p-4 whitespace-nowrap">{browser.price}</td><td className="p-4">{browser.api ? <Check aria-label="支持 API" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持 API" className="h-4 w-4 text-red-600" />}</td><td className="p-4">{browser.automation ? <Check aria-label="支持自动化" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持自动化" className="h-4 w-4 text-red-600" />}</td><td className="p-4">{browser.proxy ? <Check aria-label="支持代理" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持代理" className="h-4 w-4 text-red-600" />}</td><td className="whitespace-nowrap p-4">{browser.platforms.join(", ")}</td><td className="whitespace-nowrap p-4" aria-label={`${browser.rating} 星`}>{"★".repeat(browser.rating)}{"☆".repeat(5 - browser.rating)}</td></tr>)}</tbody></table></div></div>
		<div className="grid gap-5 md:hidden">{filtered.map(browser => <Card key={browser.slug} className={browser.featured ? "border-primary" : ""}><CardHeader><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><ResourceIcon name={browser.name} src={browser.icon} /><CardTitle>{browser.name}</CardTitle></div><Badge variant={browser.status === "recommended" ? "default" : "secondary"}>{browser.featured ? "本站产品" : browser.status}</Badge></div><CardDescription>{browser.description}</CardDescription></CardHeader><CardContent><dl className="grid grid-cols-2 gap-3 text-sm"><div><dt className="text-muted-foreground">免费</dt><dd className="font-medium">{browser.free}</dd></div><div><dt className="text-muted-foreground">价格</dt><dd className="font-medium">{browser.price}</dd></div><div><dt className="text-muted-foreground">平台</dt><dd className="font-medium">{browser.platforms.join(", ")}</dd></div><div><dt className="text-muted-foreground">评分</dt><dd aria-label={`${browser.rating} 星`}>{"★".repeat(browser.rating)}{"☆".repeat(5 - browser.rating)}</dd></div></dl><Link href={`/browsers/${browser.slug}/`} className={cn(buttonVariants({ variant: browser.featured ? "default" : "outline" }), "mt-5 w-full")}>查看详情 <ArrowRight className="ml-2 h-4 w-4" /></Link></CardContent></Card>)}</div>
		{filtered.length === 0 && <Card className="p-10 text-center"><CardTitle>没有匹配资源</CardTitle><CardDescription className="mt-2">请尝试其他关键词或清除筛选。</CardDescription></Card>}
	</div>;
}
