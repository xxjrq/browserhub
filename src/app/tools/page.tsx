"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, ListFilter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { tools } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { StatusBadge } from "@/components/status-badge";
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
	const hasFilters = query !== "" || category !== "all";

	return (
		<div className="container py-12 md:py-16">
			<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
				<div className="max-w-2xl">
					<p className="eyebrow text-primary">Database / Tools</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">指纹检测与自动化工具</h1>
					<p className="mt-4 leading-7 text-muted-foreground">整理浏览器指纹检测、自动化框架、网络测试和隐私工具，并区分用途与状态。</p>
				</div>
				<p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{tools.length} Entries</p>
			</div>

			<div className="mb-6 grid gap-3 rounded-xl border bg-card p-3 md:grid-cols-[1fr_auto_auto] md:items-center">
				<label className="relative block">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
					<span className="sr-only">搜索工具</span>
					<input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索工具名称或用途" className="h-10 w-full rounded-lg border bg-background pr-3 pl-10 text-sm outline-none transition-shadow focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10" />
				</label>
				<label className="sr-only" htmlFor="tool-category">工具分类</label>
				<select id="tool-category" value={category} onChange={event => setCategory(event.target.value)} className="h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10">
					<option value="all">全部分类</option>
					{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
				</select>
				<button type="button" onClick={() => { setQuery(""); setCategory("all"); }} disabled={!hasFilters} className={cn(buttonVariants({ variant: "ghost" }), "h-10 text-muted-foreground")}>清除筛选</button>
			</div>

			<p className="mb-4 flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
				<ListFilter className="h-3.5 w-3.5" aria-hidden="true" />
				显示 {filtered.length} / {tools.length} 个资源
			</p>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map(tool => (
					<div key={tool.slug} className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.18)] dark:hover:shadow-none">
						<div className="flex items-start gap-3">
							<ResourceIcon name={tool.name} src={tool.icon} website={tool.website} size={40} />
							<div className="min-w-0 flex-1">
								<h2 className="truncate font-semibold tracking-tight">{tool.name}</h2>
								<p className="mt-0.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{tool.category}</p>
							</div>
							<StatusBadge status={tool.status} />
						</div>
						<p className="mt-3 mb-4 line-clamp-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
						<div className="mt-auto flex items-center justify-between gap-3 border-t pt-3">
							<span className="truncate text-xs text-muted-foreground">{tool.platforms.join(" · ")}</span>
							<span className="flex shrink-0 items-center gap-1">
								<Link href={`/tools/${tool.slug}/`} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
									详情
									<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
								</Link>
								<a href={tool.website} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8 text-muted-foreground hover:text-foreground")} aria-label={`打开 ${tool.name} 官网`}>
									<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
								</a>
							</span>
						</div>
					</div>
				))}
			</div>

			{filtered.length === 0 && (
				<div className="mt-2 rounded-xl border border-dashed py-16 text-center">
					<p className="font-mono text-sm tracking-wide text-muted-foreground uppercase">No results</p>
					<p className="mt-2 text-sm text-muted-foreground">请尝试其他关键词或清除筛选。</p>
					<button type="button" onClick={() => { setQuery(""); setCategory("all"); }} className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
						<X className="mr-2 h-4 w-4" aria-hidden="true" />
						清除筛选
					</button>
				</div>
			)}
		</div>
	);
}
