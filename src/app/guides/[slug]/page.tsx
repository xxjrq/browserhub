import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { guideBySlug, guides } from "@/data/resources";

export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	return guide ? { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}/` }, openGraph: { title: guide.title, description: guide.description, url: `/guides/${guide.slug}/` } } : {};
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	if (!guide) notFound();
	return <div className="container py-12"><Link href="/guides/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回指南</Link><article className="mx-auto max-w-3xl"><div className="mb-4 text-sm text-muted-foreground">{guide.category} · 更新于 {guide.date}</div><h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1><p className="mt-6 text-xl text-muted-foreground">{guide.description}</p><Card className="mt-10"><CardHeader><CardTitle>核心内容</CardTitle></CardHeader><CardContent><p className="leading-8">{guide.content}</p></CardContent></Card><p className="mt-6 text-sm text-muted-foreground">资料来源：{guide.sourcePath}。产品价格、套餐与功能请以对应官方网站当前信息为准。</p></article></div>;
}
