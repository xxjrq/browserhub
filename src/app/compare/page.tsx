import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { comparisons } from "@/data/resources";

export const metadata = { title: "浏览器对比", description: "用统一字段比较指纹浏览器的功能、价格、平台和适用场景。", alternates: { canonical: "/compare/" } };

export default function ComparePage() {
	return <div className="container py-12"><div className="mb-12"><h1 className="text-4xl font-bold tracking-tight">浏览器对比</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">用统一字段比较不同指纹浏览器的功能、价格和适用场景。</p></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{comparisons.map(comparison => <Card key={comparison.slug}><CardHeader><CardTitle className="text-xl">{comparison.title}</CardTitle><CardDescription>{comparison.description}</CardDescription></CardHeader><CardContent><Link href={`/compare/${comparison.slug}/`} className={buttonVariants({ variant: "outline" }) + " w-full"}>查看对比 <ArrowRight className="ml-2 h-4 w-4" /></Link></CardContent></Card>)}</div></div>;
}
