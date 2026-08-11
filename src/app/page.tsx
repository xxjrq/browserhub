import Link from "next/link";
import { ArrowRight, BookOpen, Fingerprint, Globe, Search, Shield, Wrench, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { browsers, comparisons, guides, technologies, tools, useCases } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { cn } from "@/lib/utils";

const categories = [
	{ name: "指纹浏览器", icon: Shield, count: browsers.length, href: "/browsers/", description: "按平台、状态、内核和自动化能力筛选" },
	{ name: "指纹检测工具", icon: Fingerprint, count: tools.filter(tool => tool.categorySlug.includes("detection") || tool.categorySlug.includes("fingerprint")).length, href: "/tools/?category=fingerprint-detection", description: "Canvas、WebGL、WebRTC、网络与机器人检测" },
	{ name: "自动化工具", icon: Zap, count: tools.filter(tool => tool.categorySlug.includes("automation") || tool.categorySlug === "testing").length, href: "/tools/?category=automation", description: "Playwright、Puppeteer、Selenium 和更多框架" },
	{ name: "指纹技术", icon: Wrench, count: technologies.length, href: "/fingerprint/", description: "渲染、设备、网络、语言与存储信号" }
];

export default function Home() {
	const featuredBrowsers = browsers.filter(browser => browser.featured || ["gologin", "adspower", "multilogin"].includes(browser.slug)).slice(0, 4);
	return <div className="flex flex-col">
		<section className="border-b bg-gradient-to-b from-primary/5 to-background py-20 md:py-28">
			<div className="container flex flex-col items-center text-center">
				<Badge variant="secondary" className="mb-5"><Fingerprint className="mr-1 h-3 w-3" /> BrowserHub 资源导航</Badge>
				<h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">找到适合你的<span className="text-primary"> 指纹浏览器</span></h1>
				<p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">整理指纹浏览器、检测工具、自动化框架和隐私资源，帮助你快速比较功能、价格、状态和适用场景。</p>
				<form action="/browsers/" method="get" className="mb-8 flex w-full max-w-xl items-center gap-2">
					<div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><input name="q" type="search" placeholder="搜索浏览器、工具、技术" aria-label="搜索资源" className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
					<button type="submit" className={cn(buttonVariants({ size: "lg" }), "h-11")}>搜索</button>
				</form>
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"><span>热门对比：</span>{comparisons.map(item => <Link key={item.slug} href={`/compare/${item.slug}/`} className="hover:text-foreground">{item.title}</Link>)}</div>
				<div className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 text-left sm:grid-cols-4">
					{[[browsers.length, "浏览器"], [tools.length, "工具"], [technologies.length, "技术"], [7, "语言入口"]].map(([value, label]) => <div key={label} className="rounded-xl border bg-background/70 p-4"><p className="text-2xl font-bold">{value}+</p><p className="text-sm text-muted-foreground">{label}</p></div>)}
				</div>
			</div>
		</section>

		<section className="py-16 md:py-20"><div className="container"><div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-bold tracking-tight">特色推荐</h2><p className="mt-2 text-muted-foreground">本站产品与常用资源并列展示，信息以官方页面为准。</p></div><Link href="/browsers/" className={buttonVariants({ variant: "outline" })}>查看全部 <ArrowRight className="ml-2 h-4 w-4" /></Link></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{featuredBrowsers.map(browser => <Card key={browser.slug} className={browser.featured ? "border-primary shadow-md" : ""}><CardHeader><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><ResourceIcon name={browser.name} src={browser.icon} /><CardTitle className="text-xl">{browser.name}</CardTitle></div>{browser.featured && <Badge>本站产品</Badge>}</div><CardDescription className="pt-2">{browser.description}</CardDescription></CardHeader><CardContent><dl className="space-y-2 text-sm"><div className="flex justify-between gap-3"><dt className="text-muted-foreground">状态</dt><dd className="text-right font-medium">{browser.status}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">免费额度</dt><dd className="text-right font-medium">{browser.free}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">起步价格</dt><dd className="text-right font-medium">{browser.price}</dd></div></dl><Link href={`/browsers/${browser.slug}/`} className={cn(buttonVariants({ variant: browser.featured ? "default" : "outline" }), "mt-4 w-full")}>查看详情 <ArrowRight className="ml-2 h-4 w-4" /></Link></CardContent></Card>)}</div></div></section>

		<section className="border-y bg-muted/40 py-16 md:py-20"><div className="container"><div className="mb-10"><h2 className="text-3xl font-bold tracking-tight">按分类浏览</h2><p className="mt-2 text-muted-foreground">从资源列表开始，再进入详情、对比和指南。</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{categories.map(category => <Link key={category.name} href={category.href}><Card className="h-full transition-colors hover:border-primary hover:bg-accent"><CardHeader><category.icon className="mb-2 h-8 w-8 text-primary" aria-hidden="true" /><CardTitle className="text-lg">{category.name}</CardTitle><CardDescription>{category.count} 个资源 · {category.description}</CardDescription></CardHeader></Card></Link>)}</div></div></section>

		<section className="py-16 md:py-20"><div className="container"><div className="grid gap-6 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-primary" />按使用场景探索</CardTitle><CardDescription>跨境电商、社媒营销、网站测试、AI Agent 等场景的资源入口。</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-2">{useCases.slice(0, 9).map(item => <Link key={item.slug} href={`/browsers/?useCase=${item.slug}`} className={buttonVariants({ variant: "outline", size: "sm" })}>{item.name}</Link>)}</CardContent></Card><Card><CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" />最新指南</CardTitle></CardHeader><CardContent className="space-y-3">{guides.slice(0, 3).map(guide => <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="block text-sm font-medium hover:text-primary">{guide.title}<span className="mt-1 block text-xs text-muted-foreground">{guide.date}</span></Link>)}</CardContent></Card></div></div></section>

		<section className="pb-20"><div className="container"><Card className="border-primary bg-primary/5"><CardHeader className="text-center"><CardTitle className="text-2xl md:text-3xl">加入资源社区</CardTitle><CardDescription className="text-base">在 GitHub、Gitee、Telegram 和 QQ 群提交资源修正与使用建议。</CardDescription></CardHeader><CardContent className="flex flex-wrap justify-center gap-3"><Link href="/contact/" className={buttonVariants({ size: "lg" })}>联系与贡献</Link><a href="https://www.ebrower.com/?utm_source=browserhub&utm_medium=referral&utm_campaign=resource_hub" target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", variant: "outline" })}>了解 EasyBR</a></CardContent></Card></div></section>
	</div>;
}
