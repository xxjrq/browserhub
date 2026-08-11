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
	return guide ? { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}/` } } : {};
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const guide = guideBySlug(slug);
	if (!guide) notFound();
	return <div className="container py-12"><Link href="/guides/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回指南</Link><article className="mx-auto max-w-3xl"><div className="mb-4 text-sm text-muted-foreground">{guide.category} · {guide.date}</div><h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1><p className="mt-6 text-xl text-muted-foreground">{guide.description}。</p><Card className="mt-10"><CardHeader><CardTitle>内容说明</CardTitle></CardHeader><CardContent><p className="leading-8">本文页面已建立静态内容结构，后续将补充经过整理的正文、来源、更新时间、FAQ和相关资源。当前不把未经核验的产品价格或功能当作事实发布。</p></CardContent></Card></article></div>;
}
