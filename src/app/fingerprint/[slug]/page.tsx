import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { technologyBySlug, technologies } from "@/data/resources";

export function generateStaticParams() { return technologies.map(technology => ({ slug: technology.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const technology = technologyBySlug(slug);
	return technology ? { title: technology.name, description: technology.description, alternates: { canonical: `/fingerprint/${technology.slug}/` } } : {};
}

export default async function FingerprintDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const technology = technologyBySlug(slug);
	if (!technology) notFound();
	return <div className="container py-12"><Link href="/fingerprint/" className={buttonVariants({ variant: "ghost" }) + " mb-6"}><ArrowLeft className="mr-2 h-4 w-4" /> 返回指纹技术</Link><article className="mx-auto max-w-3xl"><p className="mb-3 text-sm text-muted-foreground">{technology.category}</p><h1 className="text-4xl font-bold tracking-tight">{technology.name}</h1><p className="mt-6 text-xl text-muted-foreground">{technology.description}。</p><Card className="mt-10"><CardHeader><CardTitle>这项技术为什么重要</CardTitle></CardHeader><CardContent><p className="leading-8">{technology.name} 是浏览器环境识别中的一个信号维度。实际判断通常会结合多个信号、网络环境和账号行为，单一指标不能代表完整结论。后续内容会补充检测方法、常见误区和合规使用建议。</p></CardContent></Card></article></div>;
}
