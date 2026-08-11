"use client";

import Link from "next/link";
import { Check, ListFilter, Minus, Search, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { browsers } from "@/data/resources";
import { BrowserCard } from "@/components/browser-card";
import { ResourceIcon } from "@/components/resource-icon";
import { StatusBadge } from "@/components/status-badge";
import { Rating } from "@/components/rating";
import { cn } from "@/lib/utils";

const statusOptions = [
	{ value: "all", label: "全部状态" },
	{ value: "recommended", label: "推荐" },
	{ value: "active", label: "活跃" },
	{ value: "open-source", label: "开源项目" },
	{ value: "experimental", label: "实验项目" },
	{ value: "pending-review", label: "待核验" }
];

const sortOptions = [
	{ value: "default", label: "默认排序" },
	{ value: "rating", label: "评分优先" },
	{ value: "name", label: "名称 A–Z" }
];

const selectClass = "h-10 rounded-lg border bg-background px-3 text-sm outline-none transition-colors focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10";

function CapabilityCell({ ok, label }: { ok: boolean; label: string }) {
	return ok
		? <Check aria-label={`支持${label}`} className="h-4 w-4 text-success" />
		: <Minus aria-label={`未标注${label}`} className="h-4 w-4 text-muted-foreground/40" />;
}

export default function BrowsersPage() {
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState("all");
	const [platform, setPlatform] = useState("all");
	const [sort, setSort] = useState("default");

	useEffect(() => {
		window.requestAnimationFrame(() => {
			const params = new URLSearchParams(window.location.search);
			setQuery(params.get("q") ?? "");
			setStatus(params.get("status") ?? "all");
			setPlatform(params.get("platform") ?? "all");
		});
	}, []);

	const platforms = useMemo(() => [...new Set(browsers.flatMap(browser => browser.platforms))].sort(), []);
	const filtered = browsers
		.filter(browser => {
			const haystack = [browser.name, browser.description, browser.type, ...browser.bestFor, ...browser.platforms].join(" ").toLowerCase();
			return (!query || haystack.includes(query.toLowerCase())) && (status === "all" || browser.status === status) && (platform === "all" || browser.platforms.includes(platform));
		})
		.sort((a, b) => {
			if (sort === "rating") return b.rating - a.rating || a.name.localeCompare(b.name);
			if (sort === "name") return a.name.localeCompare(b.name);
			return 0;
		});

	const hasFilters = query !== "" || status !== "all" || platform !== "all" || sort !== "default";
	const clearFilters = () => { setQuery(""); setStatus("all"); setPlatform("all"); setSort("default"); };

	return (
		<div className="container py-12 md:py-16">
			<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
				<div className="max-w-2xl">
					<p className="eyebrow text-primary">Database / Browsers</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">指纹浏览器</h1>
					<p className="mt-4 leading-7 text-muted-foreground">比较多账号管理、自动化和隐私工作流中的浏览器资源。状态和价格以官方页面为准。</p>
				</div>
				<p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{browsers.length} Entries · 持续更新</p>
			</div>

			<div className="mb-6 grid gap-3 rounded-xl border bg-card p-3 md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center">
				<label className="relative block">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
					<span className="sr-only">搜索浏览器</span>
					<input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索名称、场景或平台" className="h-10 w-full rounded-lg border bg-background pr-3 pl-10 text-sm outline-none transition-shadow focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10" />
				</label>
				<label className="sr-only" htmlFor="browser-status">状态</label>
				<select id="browser-status" value={status} onChange={event => setStatus(event.target.value)} className={selectClass}>
					{statusOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
				</select>
				<label className="sr-only" htmlFor="browser-platform">平台</label>
				<select id="browser-platform" value={platform} onChange={event => setPlatform(event.target.value)} className={selectClass}>
					<option value="all">全部平台</option>
					{platforms.map(item => <option key={item} value={item}>{item}</option>)}
				</select>
				<label className="sr-only" htmlFor="browser-sort">排序</label>
				<select id="browser-sort" value={sort} onChange={event => setSort(event.target.value)} className={selectClass}>
					{sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
				</select>
				<button type="button" onClick={clearFilters} disabled={!hasFilters} className={cn(buttonVariants({ variant: "ghost" }), "h-10 text-muted-foreground")}>清除筛选</button>
			</div>

			<p className="mb-4 flex items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground uppercase">
				<ListFilter className="h-3.5 w-3.5" aria-hidden="true" />
				显示 {filtered.length} / {browsers.length} 个资源
			</p>

			{/* Desktop: data table */}
			<div className="hidden overflow-hidden rounded-xl border bg-card md:block">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[980px] text-sm">
						<thead>
							<tr className="border-b bg-muted/50 text-left">
								{["浏览器", "状态", "免费", "价格", "API", "自动化", "代理", "平台", "评分"].map(head => (
									<th key={head} className="p-4 font-mono text-[11px] font-medium tracking-widest whitespace-nowrap text-muted-foreground uppercase">{head}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{filtered.map(browser => (
								<tr key={browser.slug} className="border-b transition-colors last:border-0 hover:bg-muted/40">
									<td className="p-4 whitespace-nowrap">
										<Link href={`/browsers/${browser.slug}/`} className="inline-flex items-center gap-2.5 font-medium transition-colors hover:text-primary">
											<ResourceIcon name={browser.name} src={browser.icon} website={browser.website} size={30} />
											{browser.name}
											{browser.featured && <Star aria-label="Featured" className="h-3.5 w-3.5 fill-primary text-primary" />}
										</Link>
									</td>
									<td className="p-4"><StatusBadge status={browser.status} /></td>
									<td className="p-4 whitespace-nowrap text-muted-foreground">{browser.free}</td>
									<td className="p-4 font-mono text-xs whitespace-nowrap">{browser.price}</td>
									<td className="p-4"><CapabilityCell ok={browser.api} label="API" /></td>
									<td className="p-4"><CapabilityCell ok={browser.automation} label="自动化" /></td>
									<td className="p-4"><CapabilityCell ok={browser.proxy} label="代理" /></td>
									<td className="p-4 text-xs whitespace-nowrap text-muted-foreground">{browser.platforms.join(" · ")}</td>
									<td className="p-4 whitespace-nowrap"><Rating value={browser.rating} /></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Mobile: cards */}
			<div className="grid gap-4 md:hidden">
				{filtered.map(browser => <BrowserCard key={browser.slug} browser={browser} />)}
			</div>

			{filtered.length === 0 && (
				<div className="mt-2 rounded-xl border border-dashed py-16 text-center">
					<p className="font-mono text-sm tracking-wide text-muted-foreground uppercase">No results</p>
					<p className="mt-2 text-sm text-muted-foreground">请尝试其他关键词或清除筛选。</p>
					<button type="button" onClick={clearFilters} className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
						<X className="mr-2 h-4 w-4" aria-hidden="true" />
						清除筛选
					</button>
				</div>
			)}
		</div>
	);
}
