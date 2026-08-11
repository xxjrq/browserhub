import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/data/resources";

const categories = ["All", "Detection", "Automation"];

export default function ToolsPage() {
	return (
		<div className="container py-12">
			<div className="mb-12"><h1 className="text-4xl font-bold tracking-tight">指纹检测与自动化工具</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">整理浏览器指纹检测、自动化框架和隐私测试资源。</p></div>
			<div className="mb-8 flex flex-wrap gap-2">{categories.map(category => <Link key={category} href={category === "All" ? "/tools/" : `/tools/?category=${category.toLowerCase()}`} className={buttonVariants({ variant: category === "All" ? "default" : "outline", size: "sm" })}>{category}</Link>)}</div>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{tools.map(tool => <Card key={tool.slug}><CardHeader><div className="flex items-center justify-between gap-3"><CardTitle className="text-xl">{tool.name}</CardTitle><Badge variant="secondary">{tool.category}</Badge></div><CardDescription>{tool.description}</CardDescription></CardHeader><CardContent><dl className="space-y-2 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Pricing</dt><dd className="font-medium">{tool.pricing}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Platforms</dt><dd className="text-right font-medium">{tool.platforms.join(", ")}</dd></div></dl><div className="mt-4 flex gap-2"><Link href={`/tools/${tool.slug}/`} className={buttonVariants({ variant: "outline" }) + " flex-1"}>详情 <ArrowRight className="ml-2 h-4 w-4" /></Link><a href={tool.website} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={`打开 ${tool.name} 官网`}><ExternalLink className="h-4 w-4" /></a></div></CardContent></Card>)}</div>
		</div>
	);
}
