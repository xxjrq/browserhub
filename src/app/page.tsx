import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ExternalLink, Fingerprint, Search, Shield, Wrench, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { browsers, comparisons, guides, technologies, tools, useCases } from "@/data/resources";
import { BrowserCard } from "@/components/browser-card";
import { ResourceIcon } from "@/components/resource-icon";
import { SectionHeader } from "@/components/section-header";
import { StatusBadge } from "@/components/status-badge";
import { Rating } from "@/components/rating";
import { cn } from "@/lib/utils";

const categories = [
	{ name: "指纹浏览器", icon: Shield, count: browsers.length, href: "/browsers/", description: "按平台、状态、内核和自动化能力筛选" },
	{ name: "指纹检测工具", icon: Fingerprint, count: tools.filter(tool => tool.categorySlug.includes("detection") || tool.categorySlug.includes("fingerprint")).length, href: "/tools/?category=fingerprint-detection", description: "Canvas、WebGL、WebRTC、网络与机器人检测" },
	{ name: "自动化工具", icon: Zap, count: tools.filter(tool => tool.categorySlug.includes("automation") || tool.categorySlug === "testing").length, href: "/tools/?category=automation", description: "Playwright、Puppeteer、Selenium 和更多框架" },
	{ name: "指纹技术", icon: Wrench, count: technologies.length, href: "/fingerprint/", description: "渲染、设备、网络、语言与存储信号" }
];

export default function Home() {
	const featured = browsers.find(browser => browser.featured) ?? browsers[0];
	const featuredRest = browsers.filter(browser => browser.slug !== featured.slug && ["gologin", "adspower", "multilogin"].includes(browser.slug)).slice(0, 3);
	const stats = [
		{ value: `${browsers.length}+`, label: "指纹浏览器" },
		{ value: `${tools.length}+`, label: "检测与自动化工具" },
		{ value: `${technologies.length}+`, label: "指纹技术" },
		{ value: `${comparisons.length}+`, label: "浏览器对比" }
	];

	return (
		<div className="flex flex-col">
			{/* HERO */}
			<section className="relative overflow-hidden border-b">
				<div className="bg-grid mask-fade pointer-events-none absolute inset-0" aria-hidden="true" />
				<div className="container relative flex flex-col items-center py-20 text-center md:py-28">
					<p className="eyebrow inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5">
						<span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
						Anti-Detect Browser Resource Database
					</p>
					<h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
						找到适合你的<span className="text-primary">指纹浏览器</span>
					</h1>
					<p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
						中立收录指纹浏览器、检测工具、自动化框架和隐私技术资源，用统一字段比较功能、价格、平台和适用场景。
					</p>
					<form action="/browsers/" method="get" className="mt-10 flex w-full max-w-xl items-center gap-2">
						<div className="relative flex-1">
							<Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
							<input
								name="q"
								type="search"
								placeholder="搜索浏览器、工具、技术…"
								aria-label="搜索资源"
								className="h-12 w-full rounded-xl border bg-card pr-3 pl-11 text-sm shadow-[0_2px_10px_-4px_rgb(0_0_0/0.08)] transition-shadow outline-none placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-primary/10 dark:shadow-none"
							/>
						</div>
						<button type="submit" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-xl px-5")}>搜索</button>
					</form>
					<div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
						<span className="font-mono text-[11px] tracking-widest uppercase">热门对比</span>
						{comparisons.slice(0, 3).map(item => (
							<Link key={item.slug} href={`/compare/${item.slug}/`} className="underline-offset-4 transition-colors hover:text-primary hover:underline">{item.title}</Link>
						))}
					</div>
					<dl className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-y-8 border-t pt-10 sm:grid-cols-4 sm:divide-x sm:divide-border">
						{stats.map(stat => (
							<div key={stat.label} className="px-4">
								<dd className="font-mono text-3xl font-medium tracking-tight md:text-4xl">{stat.value}</dd>
								<dt className="mt-2 text-xs tracking-wide text-muted-foreground">{stat.label}</dt>
							</div>
						))}
					</dl>
				</div>
			</section>

			{/* FEATURED */}
			<section className="py-16 md:py-20">
				<div className="container">
					<SectionHeader eyebrow="Featured" title="特色推荐" description="Featured 资源与常用产品并列展示，信息以官方页面为准。" href="/browsers/" action="全部浏览器" />
					<Link
						href={`/browsers/${featured.slug}/`}
						className="group mb-5 grid gap-6 rounded-xl border border-primary/30 bg-card p-6 ring-1 ring-primary/10 transition-all duration-200 hover:border-primary/50 hover:shadow-[0_12px_36px_-16px_rgb(37_99_235/0.35)] sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center"
					>
						<ResourceIcon name={featured.name} src={featured.icon} website={featured.website} size={64} className="max-md:mx-auto" />
						<div className="min-w-0 max-md:text-center">
							<div className="flex flex-wrap items-center gap-3 max-md:justify-center">
								<h3 className="text-2xl font-semibold tracking-tight">{featured.name}</h3>
								<StatusBadge status={featured.status} />
								<span className="font-mono text-[11px] tracking-widest text-primary uppercase">Featured</span>
							</div>
							<p className="mt-2 leading-7 text-muted-foreground">{featured.longDescription}</p>
							<div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 max-md:justify-center">
								{featured.features.slice(0, 4).map(feature => (
									<span key={feature} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
										<Check className="h-3.5 w-3.5 text-success" aria-hidden="true" />
										{feature}
									</span>
								))}
							</div>
						</div>
						<div className="flex shrink-0 flex-col items-end gap-3 max-md:items-center">
							<div className="text-right max-md:text-center">
								<p className="font-mono text-lg font-medium">{featured.price}</p>
								<p className="mt-1 text-xs text-muted-foreground">{featured.free}</p>
							</div>
							<span className={cn(buttonVariants(), "pointer-events-none")}>
								查看详情
								<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
							</span>
						</div>
					</Link>
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{featuredRest.map(browser => <BrowserCard key={browser.slug} browser={browser} />)}
					</div>
				</div>
			</section>

			{/* DIRECTORY INDEX */}
			<section className="border-y bg-muted/40 py-16 md:py-20">
				<div className="container">
					<SectionHeader eyebrow="Index" title="浏览器索引" description="按收录顺序快速扫描，完整筛选、排序请进入数据库页面。" href="/browsers/" action={`全部 ${browsers.length} 个`} />
					<div className="overflow-hidden rounded-xl border bg-card">
						{browsers.slice(0, 8).map((browser, index) => (
							<Link key={browser.slug} href={`/browsers/${browser.slug}/`} className="group flex items-center gap-3 border-b px-4 py-3 transition-colors last:border-0 hover:bg-muted/50 sm:gap-4 sm:px-5">
								<span className="w-6 shrink-0 font-mono text-xs text-muted-foreground/60">{String(index + 1).padStart(2, "0")}</span>
								<ResourceIcon name={browser.name} src={browser.icon} website={browser.website} size={32} />
								<span className="min-w-0 flex-1 truncate text-sm font-medium">{browser.name}</span>
								<StatusBadge status={browser.status} className="hidden sm:inline-flex" />
								<span className="hidden w-24 shrink-0 text-right font-mono text-xs text-muted-foreground md:block">{browser.price}</span>
								<span className="hidden w-40 shrink-0 truncate text-right text-xs text-muted-foreground lg:block">{browser.platforms.join(" · ")}</span>
								<Rating value={browser.rating} className="hidden w-16 shrink-0 justify-end xl:inline-flex" />
								<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* CATEGORIES */}
			<section className="py-16 md:py-20">
				<div className="container">
					<SectionHeader eyebrow="Categories" title="按分类浏览" description="从资源列表开始，再进入详情、对比和指南。" />
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{categories.map(category => (
							<Link key={category.name} href={category.href} className="group rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.18)] dark:hover:shadow-none">
								<div className="flex items-center justify-between">
									<category.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
									<span className="font-mono text-2xl font-medium tracking-tight">{category.count}</span>
								</div>
								<h3 className="mt-4 font-semibold tracking-tight">{category.name}</h3>
								<p className="mt-1.5 text-sm leading-6 text-muted-foreground">{category.description}</p>
								<p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
									浏览
									<ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
								</p>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* COMPARISONS */}
			<section className="border-y bg-muted/40 py-16 md:py-20">
				<div className="container">
					<SectionHeader eyebrow="Compare" title="浏览器对比" description="同一组字段展示差异，价格和功能以官方页面为准。" href="/compare/" action="全部对比" />
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{comparisons.slice(0, 6).map(comparison => {
							const [slugA, slugB] = comparison.browsers;
							const browserA = browsers.find(browser => browser.slug === slugA);
							const browserB = browsers.find(browser => browser.slug === slugB);
							return (
								<Link key={comparison.slug} href={`/compare/${comparison.slug}/`} className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all duration-200 hover:border-foreground/25 hover:shadow-[0_8px_24px_-12px_rgb(0_0_0/0.15)] dark:hover:shadow-none">
									<span className="flex shrink-0 -space-x-2">
										{browserA && <ResourceIcon name={browserA.name} src={browserA.icon} website={browserA.website} size={32} className="ring-2 ring-card" />}
										{browserB && <ResourceIcon name={browserB.name} src={browserB.icon} website={browserB.website} size={32} className="ring-2 ring-card" />}
									</span>
									<span className="min-w-0 flex-1">
										<span className="block truncate text-sm font-medium">{comparison.title}</span>
										<span className="mt-0.5 block truncate text-xs text-muted-foreground">{comparison.description}</span>
									</span>
									<ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
								</Link>
							);
						})}
					</div>
				</div>
			</section>

			{/* FINGERPRINT TECHNOLOGIES */}
			<section className="py-16 md:py-20">
				<div className="container">
					<SectionHeader eyebrow="Technology" title="指纹技术信号" description="渲染、设备、网络、语言与存储——网站识别浏览器环境的主要维度。" href="/fingerprint/" action="全部技术" />
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
						{technologies.map(technology => (
							<Link key={technology.slug} href={`/fingerprint/${technology.slug}/`} className="group rounded-lg border bg-card p-3.5 transition-colors duration-150 hover:border-foreground/25">
								<p className="truncate font-mono text-sm font-medium">{technology.name}</p>
								<p className="mt-1 truncate text-[11px] text-muted-foreground">{technology.category}</p>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* GUIDES + USE CASES */}
			<section className="border-t py-16 md:py-20">
				<div className="container grid gap-12 lg:grid-cols-[1.6fr_1fr]">
					<div>
						<SectionHeader eyebrow="Guides" title="最新指南" description="选型、排查和合规使用的可执行知识。" href="/guides/" action="全部指南" />
						<div className="border-t">
							{guides.slice(0, 4).map(guide => (
								<Link key={guide.slug} href={`/guides/${guide.slug}/`} className="group flex items-center gap-4 border-b py-4 transition-colors hover:bg-muted/40 sm:gap-6">
									<span className="hidden w-24 shrink-0 font-mono text-xs text-muted-foreground sm:block">{guide.date}</span>
									<span className="min-w-0 flex-1">
										<span className="block truncate text-sm font-medium transition-colors group-hover:text-primary">{guide.title}</span>
										<span className="mt-1 block truncate text-xs text-muted-foreground">{guide.description}</span>
									</span>
									<Badge variant="secondary" className="hidden shrink-0 md:inline-flex">{guide.category}</Badge>
									<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
								</Link>
							))}
						</div>
					</div>
					<div>
						<SectionHeader eyebrow="Use Cases" title="按使用场景探索" description="跨境电商、社媒营销、网站测试、AI Agent 等入口。" />
						<div className="flex flex-wrap gap-2">
							{useCases.map(item => (
								<Link key={item.slug} href={`/browsers/?useCase=${item.slug}`} className="rounded-full border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground">
									{item.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* COMMUNITY */}
			<section className="pb-20">
				<div className="container">
					<div className="rounded-2xl border bg-card px-6 py-14 text-center">
						<p className="eyebrow text-primary">Community</p>
						<h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">提交资源与修正</h2>
						<p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">在 GitHub、Gitee、Telegram 和 QQ 群提交资源修正与使用建议，让数据库保持准确。</p>
						<div className="mt-8 flex flex-wrap justify-center gap-3">
							<Link href="/contact/" className={buttonVariants({ size: "lg" })}>联系与贡献</Link>
							<a href="https://www.ebrower.com/?utm_source=browserhub&utm_medium=referral&utm_campaign=resource_hub" target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", variant: "outline" })}>
								了解 EasyBR
								<ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
