import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
	return comparison ? { title: comparison.title, description: comparison.description, alternates: { canonical: `/compare/${comparison.slug}/` } } : {};
}

export default async function CompareDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const comparison = comparisons.find(item => item.slug === slug);
	if (!comparison) notFound();

	const browserA = browserBySlug(comparison.browsers[0].toLowerCase().replaceAll(" ", "")) ?? browsers[0];
	const browserB = browserBySlug(comparison.browsers[1].toLowerCase().replaceAll(" ", "")) ?? browsers[1];

	return (
		<div className="container py-12">
			<Link href="/compare" className="mb-6 inline-flex">
				<Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Comparisons</Button>
			</Link>

			<div className="mb-8">
				<h1 className="text-4xl font-bold tracking-tight">{comparison.title}</h1>
				<p className="mt-4 text-lg text-muted-foreground">{comparison.description}</p>
			</div>

			<Card>
				<CardHeader><CardTitle>Side-by-Side Comparison</CardTitle></CardHeader>
				<CardContent className="overflow-x-auto">
					<Table>
						<TableHeader><TableRow><TableHead>Feature</TableHead><TableHead>{browserA.name}</TableHead><TableHead>{browserB.name}</TableHead></TableRow></TableHeader>
						<TableBody>
							<TableRow><TableCell className="font-medium">Free Plan</TableCell><TableCell>{browserA.free}</TableCell><TableCell>{browserB.free}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">Price</TableCell><TableCell>{browserA.price}</TableCell><TableCell>{browserB.price}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">Profiles</TableCell><TableCell>{browserA.profiles}</TableCell><TableCell>{browserB.profiles}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">API</TableCell><TableCell>{browserA.api ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell><TableCell>{browserB.api ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">Automation</TableCell><TableCell>{browserA.automation ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell><TableCell>{browserB.automation ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">Proxy</TableCell><TableCell>{browserA.proxy ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell><TableCell>{browserB.proxy ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">Platforms</TableCell><TableCell>{browserA.platforms.join(", ")}</TableCell><TableCell>{browserB.platforms.join(", ")}</TableCell></TableRow>
							<TableRow><TableCell className="font-medium">Editorial rating</TableCell><TableCell>{"★".repeat(browserA.rating)}{"☆".repeat(5 - browserA.rating)}</TableCell><TableCell>{"★".repeat(browserB.rating)}{"☆".repeat(5 - browserB.rating)}</TableCell></TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
