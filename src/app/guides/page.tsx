import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/data/resources";

export default function GuidesPage() {
	return <div className="container py-12"><div className="mb-12"><h1 className="text-4xl font-bold tracking-tight">指南与教程</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">从浏览器选择、指纹技术到代理配置，持续整理可执行的使用知识。</p></div><div className="grid gap-6 md:grid-cols-2">{guides.map(guide => <Card key={guide.slug}><CardHeader><div className="flex items-center justify-between gap-4"><Badge variant="secondary">{guide.category}</Badge><div className="flex items-center text-sm text-muted-foreground"><Calendar className="mr-1 h-4 w-4" aria-hidden="true" />{guide.date}</div></div><CardTitle className="text-xl">{guide.title}</CardTitle><CardDescription>{guide.description}</CardDescription></CardHeader><CardContent><Link href={`/guides/${guide.slug}/`} className={buttonVariants({ variant: "outline" }) + " w-full"}>阅读指南 <ArrowRight className="ml-2 h-4 w-4" /></Link></CardContent></Card>)}</div></div>;
}
