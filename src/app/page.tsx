import Link from "next/link";
import { ArrowRight, Fingerprint, Globe, Search, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { browsers, comparisons, tools } from "@/data/resources";
import { cn } from "@/lib/utils";

const categories = [
	{ name: "指纹浏览器", icon: Shield, count: browsers.length, href: "/browsers/" },
	{ name: "指纹检测工具", icon: Fingerprint, count: tools.filter(tool => tool.category === "Detection").length, href: "/tools/" },
	{ name: "自动化工具", icon: Zap, count: tools.filter(tool => tool.category === "Automation").length, href: "/tools/" },
	{ name: "代理与隐私资源", icon: Globe, count: 0, href: "/tools/" }
];

export default function Home() {
	const featuredBrowsers = browsers.filter(browser => browser.featured || browser.slug === "gologin" || browser.slug === "adspower");

	return (
		<div className="flex flex-col">
			<section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
				<div className="container flex flex-col items-center text-center">
					<Badge variant="secondary" className="mb-4"><Fingerprint className="mr-1 h-3 w-3" /> 指纹浏览器资源库</Badge>
					<h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">找到适合你的<span className="text-primary"> 指纹浏览器</span></h1>
					<p className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">整理指纹浏览器、检测工具、自动化框架和隐私资源，帮助你快速比较功能、价格和适用场景。</p>
					<form action="/browsers/" method="get" className="mb-8 flex w-full max-w-md items-center gap-2">
						<div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><input name="q" type="search" placeholder="搜索浏览器、工具、指南" aria-label="搜索资源" className="h-9 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></div>
						<button type="submit" className={cn(buttonVariants(), "h-9")}>搜索</button>
					</form>
					<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"><span>热门对比：</span>{comparisons.map(item => <Link key={item.slug} href={`/compare/${item.slug}/`} className="hover:text-foreground">{item.title}</Link>)}</div>
				</div>
			</section>

			<section className="py-16 md:py-24"><div className="container"><div className="mb-12 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-bold tracking-tight">特色推荐</h2><p className="mt-2 text-muted-foreground">先看适合多账号管理和自动化的浏览器资源</p></div><Link href="/browsers/" className={buttonVariants({ variant: "outline" })}>查看全部 <ArrowRight className="ml-2 h-4 w-4" /></Link></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{featuredBrowsers.map(browser => <Card key={browser.slug} className={browser.featured ? "border-primary" : ""}><CardHeader><div className="flex items-center justify-between gap-3"><CardTitle className="text-xl">{browser.name}</CardTitle>{browser.featured && <Badge>特色推荐</Badge>}</div><CardDescription>{browser.description}</CardDescription></CardHeader><CardContent><dl className="space-y-2 text-sm"><div className="flex justify-between gap-3"><dt className="text-muted-foreground">免费额度</dt><dd className="text-right font-medium">{browser.free}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">起步价格</dt><dd className="text-right font-medium">{browser.price}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">编辑评分</dt><dd aria-label={`${browser.rating} out of 5`} className="font-medium">{"★".repeat(browser.rating)}{"☆".repeat(5 - browser.rating)}</dd></div></dl><Link href={`/browsers/${browser.slug}/`} className={cn(buttonVariants({ variant: browser.featured ? "default" : "outline" }), "mt-4 w-full")}>查看详情</Link></CardContent></Card>)}</div></div></section>

			<section className="border-t bg-muted/50 py-16 md:py-24"><div className="container"><h2 className="mb-12 text-3xl font-bold tracking-tight">按分类浏览</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{categories.map(category => <Link key={category.name} href={category.href}><Card className="h-full transition-colors hover:bg-accent"><CardHeader><category.icon className="mb-2 h-8 w-8 text-primary" aria-hidden="true" /><CardTitle className="text-lg">{category.name}</CardTitle><CardDescription>{category.count ? `${category.count} 个资源` : "持续整理中"}</CardDescription></CardHeader></Card></Link>)}</div></div></section>

			<section className="py-16 md:py-24"><div className="container"><Card className="border-primary bg-primary/5"><CardHeader className="text-center"><CardTitle className="text-2xl md:text-3xl">开始探索资源</CardTitle><CardDescription className="text-base">浏览器、检测工具和使用指南持续更新。</CardDescription></CardHeader><CardContent className="flex flex-wrap justify-center gap-4"><Link href="/browsers/" className={buttonVariants({ size: "lg" })}>浏览器列表</Link><Link href="/guides/" className={buttonVariants({ size: "lg", variant: "outline" })}>阅读指南</Link></CardContent></Card></div></section>
		</div>
	);
}
