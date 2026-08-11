import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, X, ExternalLink, Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { browserBySlug, browsers } from "@/data/resources";

export function generateStaticParams() {
	return browsers.map(browser => ({ slug: browser.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const browser = browserBySlug(slug);
	return browser ? { title: browser.name, description: browser.description, alternates: { canonical: `/browsers/${browser.slug}/` } } : {};
}

export default async function BrowserDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const browser = browserBySlug(slug);

	if (!browser) {
		notFound();
	}

	return (
		<div className="container py-12">
			<Link href="/browsers/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回浏览器列表</Link>

			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="mb-6 flex items-center gap-4">
						<h1 className="text-4xl font-bold tracking-tight">{browser.name}</h1>
						{browser.featured && <Badge>Featured</Badge>}
					</div>
					<p className="mb-6 text-lg text-muted-foreground">{browser.longDescription}</p>

					<Separator className="my-8" />

					<h2 className="mb-4 text-2xl font-bold">功能</h2>
					<ul className="mb-8 grid gap-2 md:grid-cols-2">
						{browser.features.map(feature => (
							<li key={feature} className="flex items-center gap-2">
								<Check className="h-4 w-4 text-green-600" />
								<span>{feature}</span>
							</li>
						))}
					</ul>

					<Separator className="my-8" />

					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle className="text-green-600">优势</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{browser.pros.map(pro => (
										<li key={pro} className="flex items-center gap-2">
											<Check className="h-4 w-4 text-green-600" />
											<span>{pro}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-red-600">限制</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{browser.cons.map(con => (
										<li key={con} className="flex items-center gap-2">
											<X className="h-4 w-4 text-red-600" />
											<span>{con}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="lg:col-span-1">
					<Card className="sticky top-20">
						<CardHeader>
							<CardTitle>价格与规格</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-between">
								<span className="text-muted-foreground">免费额度</span>
								<span className="font-medium">{browser.free}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">起步价格</span>
								<span className="font-medium">{browser.price}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">环境数量</span>
								<span className="font-medium">{browser.profiles}</span>
							</div>
							<Separator />
							<div className="flex justify-between">
								<span className="text-muted-foreground">API</span>
								{browser.api ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">自动化</span>
								{browser.automation ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">代理</span>
								{browser.proxy ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-600" />}
							</div>
							<Separator />
							<div className="flex justify-between">
								<span className="text-muted-foreground">平台</span>
								<span className="font-medium">{browser.platforms.join(", ")}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">编辑评分</span>
								<span className="font-medium" aria-label={`${browser.rating} out of 5`}>{"★".repeat(browser.rating)}{"☆".repeat(5 - browser.rating)}</span>
							</div>
							<Separator />
							<div className="space-y-2">
								<a href={browser.website} target="_blank" rel="noopener noreferrer" className={buttonVariants() + " w-full"}>
									<ExternalLink className="mr-2 h-4 w-4" /> 访问官网
								</a>
								{browser.download && (
							<a href={browser.download} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" }) + " w-full"}>
									<Download className="mr-2 h-4 w-4" /> 下载
								</a>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
