import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { browsers } from "@/data/resources";

export default function BrowsersPage() {
	return (
		<div className="container py-12">
			<div className="mb-12">
				<h1 className="text-4xl font-bold tracking-tight">Anti-Detect Browsers</h1>
				<p className="mt-4 max-w-3xl text-lg text-muted-foreground">Compare fingerprint browsers for multi-account management, automation, and privacy workflows.</p>
			</div>

			<Card className="mb-12">
				<CardHeader><CardTitle>Comparison Table</CardTitle><CardDescription>Published plan information and editorial comparison fields.</CardDescription></CardHeader>
				<CardContent className="overflow-x-auto">
					<Table>
						<TableHeader><TableRow><TableHead>Browser</TableHead><TableHead>Free</TableHead><TableHead>Price</TableHead><TableHead>Profiles</TableHead><TableHead>API</TableHead><TableHead>Automation</TableHead><TableHead>Proxy</TableHead><TableHead>Platform</TableHead><TableHead>Rating</TableHead></TableRow></TableHeader>
						<TableBody>{browsers.map(browser => <TableRow key={browser.slug}>
							<TableCell className="whitespace-nowrap font-medium"><Link href={`/browsers/${browser.slug}`} className="hover:underline">{browser.name}</Link>{browser.featured && <Badge className="ml-2">Featured</Badge>}</TableCell>
							<TableCell>{browser.free}</TableCell><TableCell>{browser.price}</TableCell><TableCell>{browser.profiles}</TableCell>
							<TableCell>{browser.api ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell>
							<TableCell>{browser.automation ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell>
							<TableCell>{browser.proxy ? <Check aria-label="Yes" className="h-4 w-4 text-green-600" /> : <X aria-label="No" className="h-4 w-4 text-red-600" />}</TableCell>
							<TableCell className="whitespace-nowrap">{browser.platforms.join(", ")}</TableCell><TableCell className="whitespace-nowrap" aria-label={`${browser.rating} out of 5`}>{"★".repeat(browser.rating)}{"☆".repeat(5 - browser.rating)}</TableCell>
						</TableRow>)}</TableBody>
					</Table>
				</CardContent>
			</Card>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{browsers.map(browser => <Card key={browser.slug} className={browser.featured ? "border-primary" : ""}>
					<CardHeader><div className="flex items-center justify-between gap-3"><CardTitle>{browser.name}</CardTitle>{browser.featured && <Badge>Featured</Badge>}</div><CardDescription>{browser.description}</CardDescription></CardHeader>
					<CardContent><dl className="space-y-2 text-sm"><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Free</dt><dd className="text-right font-medium">{browser.free}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Price</dt><dd className="text-right font-medium">{browser.price}</dd></div><div className="flex justify-between gap-4"><dt className="text-muted-foreground">Platform</dt><dd className="text-right font-medium">{browser.platforms.join(", ")}</dd></div></dl><Link href={`/browsers/${browser.slug}`} className="mt-4 block"><Button className="w-full" variant={browser.featured ? "default" : "outline"}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></CardContent>
				</Card>)}
			</div>
		</div>
	);
}
