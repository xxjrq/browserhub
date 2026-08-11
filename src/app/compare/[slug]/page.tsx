import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { browserBySlug, browsers, comparisons } from "@/data/resources";

export function generateStaticParams() {
	return comparisons.map(comparison => ({ slug: comparison.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const comparison = comparisons.find(item => item.slug === slug);
	return comparison ? { title: comparison.title, description: comparison.description, alternates: { canonical: `/compare/${comparison.slug}/` }, openGraph: { title: comparison.title, description: comparison.description, url: `/compare/${comparison.slug}/` } } : {};
}

export default async function CompareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const comparison = comparisons.find(item => item.slug === slug);
	if (!comparison) notFound();

	const browserA = browserBySlug(comparison.browsers[0]) ?? browsers[0];
	const browserB = browserBySlug(comparison.browsers[1]) ?? browsers[1];

	return (
		<div className="container py-12">
			<Link href="/compare/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回对比列表</Link>

			<div className="mb-8">
				<h1 className="text-4xl font-bold tracking-tight">{comparison.title}</h1>
				<p className="mt-4 text-lg text-muted-foreground">{comparison.description}</p>
			</div>

			<Card>
				<CardHeader><CardTitle>并列对比</CardTitle></CardHeader>
				<CardContent className="overflow-x-auto">
					<Table>
						<TableHeader><TableRow><TableHead>Feature</TableHead><TableHead>{browserA.name}</TableHead><TableHead>{browserB.name}</TableHead></TableRow></TableHeader>
						<TableBody>
							<TableRow><TableCell className="font-medium">免费额度</TableCell><TableCell>{browserA.free}</TableCell><TableCell>{browserB.free}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">价格</TableCell><TableCell>{browserA.price}</TableCell><TableCell>{browserB.price}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">环境数量</TableCell><TableCell>{browserA.profiles}</TableCell><TableCell>{browserB.profiles}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">API</TableCell><TableCell>{browserA.api ? <Check aria-label="支持 API" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持 API" className="h-4 w-4 text-red-600" />}</TableCell><TableCell>{browserB.api ? <Check aria-label="支持 API" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持 API" className="h-4 w-4 text-red-600" />}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">自动化</TableCell><TableCell>{browserA.automation ? <Check aria-label="支持自动化" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持自动化" className="h-4 w-4 text-red-600" />}</TableCell><TableCell>{browserB.automation ? <Check aria-label="支持自动化" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持自动化" className="h-4 w-4 text-red-600" />}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">代理</TableCell><TableCell>{browserA.proxy ? <Check aria-label="支持代理" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持代理" className="h-4 w-4 text-red-600" />}</TableCell><TableCell>{browserB.proxy ? <Check aria-label="支持代理" className="h-4 w-4 text-green-600" /> : <X aria-label="不支持代理" className="h-4 w-4 text-red-600" />}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">平台</TableCell><TableCell>{browserA.platforms.join(", ")}</TableCell><TableCell>{browserB.platforms.join(", ")}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">编辑评分</TableCell><TableCell aria-label={`${browserA.rating} 星`}>{"★".repeat(browserA.rating)}{"☆".repeat(5 - browserA.rating)}</TableCell><TableCell aria-label={`${browserB.rating} 星`}>{"★".repeat(browserB.rating)}{"☆".repeat(5 - browserB.rating)}</TableCell></TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
