import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toolBySlug, tools } from "@/data/resources";

export function generateStaticParams() {
	return tools.map(tool => ({ slug: tool.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const tool = toolBySlug(slug);
	return tool ? { title: tool.name, description: tool.description, alternates: { canonical: `/tools/${tool.slug}/` }, openGraph: { title: tool.name, description: tool.description, url: `/tools/${tool.slug}/` } } : {};
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const tool = toolBySlug(slug);

	if (!tool) notFound();

	return (
		<div className="container py-12">
			<Link href="/tools/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回工具列表</Link>

			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="mb-6 flex flex-wrap items-center gap-4">
						<h1 className="text-4xl font-bold tracking-tight">{tool.name}</h1>
						<Badge variant="secondary">{tool.category}</Badge>
					</div>
					<p className="mb-6 text-lg text-muted-foreground">{tool.longDescription}</p>

					<Separator className="my-8" />
					<h2 className="mb-4 text-2xl font-bold">主要能力</h2>
					<ul className="mb-8 grid gap-2 md:grid-cols-2">
						{tool.features.map(feature => (
							<li key={feature} className="flex items-center gap-2">
								<Check className="h-4 w-4 text-green-600" aria-hidden="true" />
								<span>{feature}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="lg:col-span-1">
					<Card className="lg:sticky lg:top-20">
						<CardHeader><CardTitle>资源详情</CardTitle></CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-between gap-4"><span className="text-muted-foreground">分类</span><span className="font-medium">{tool.category}</span></div>
							<div className="flex justify-between gap-4"><span className="text-muted-foreground">费用</span><span className="font-medium">{tool.pricing}</span></div>
							<div className="flex justify-between gap-4"><span className="text-muted-foreground">平台</span><span className="text-right font-medium">{tool.platforms.join(", ")}</span></div>
							<Separator />
							<a href={tool.website} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "default" }) + " w-full"}><ExternalLink className="mr-2 h-4 w-4" />访问官网</a>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
