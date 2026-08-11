import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { technologyBySlug, technologies, tools } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { cn } from "@/lib/utils";

export function generateStaticParams() { return technologies.map(technology => ({ slug: technology.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const technology = technologyBySlug(slug);
	if (!technology) return {};
	const title = `${technology.name} 浏览器指纹：原理、检测与隐私影响`;
	const description = `${technology.name} 浏览器指纹技术说明：工作原理、常见检测方式、隐私影响、排查工具和合规防护思路。`;
	return { title, description, alternates: { canonical: `/fingerprint/${technology.slug}/` }, openGraph: { title, description, url: `/fingerprint/${technology.slug}/` } };
}

export default async function FingerprintDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const technology = technologyBySlug(slug);
	if (!technology) notFound();
	const relatedTools = tools.filter(tool => tool.slug !== "playwright" && tool.slug !== "puppeteer").slice(0, 4);
	const jsonLd = [
		{ "@context": "https://schema.org", "@type": "TechArticle", headline: `${technology.name} 浏览器指纹：原理、检测与隐私影响`, description: technology.description, dateModified: "2026-08-11", author: { "@type": "Person", name: "xxjrq" }, mainEntityOfPage: `https://browserhub.co/fingerprint/${technology.slug}/` },
		{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首页", item: "https://browserhub.co/" }, { "@type": "ListItem", position: 2, name: "浏览器指纹技术", item: "https://browserhub.co/fingerprint/" }, { "@type": "ListItem", position: 3, name: technology.name, item: `https://browserhub.co/fingerprint/${technology.slug}/` }] }
	];
	return (
		<div className="container py-10 md:py-14">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<nav className="mb-6 flex items-center font-mono text-xs tracking-wide text-muted-foreground" aria-label="面包屑">
				<Link href="/" className="transition-colors hover:text-foreground">首页</Link>
				<span className="mx-2 text-border">/</span>
				<Link href="/fingerprint/" className="transition-colors hover:text-foreground">指纹技术</Link>
				<span className="mx-2 text-border">/</span>
				<span className="text-foreground">{technology.name}</span>
			</nav>
			<Link href="/fingerprint/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-8 -ml-2 text-muted-foreground")}><ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />返回指纹技术</Link>

			<article className="mx-auto max-w-4xl">
				<header className="mb-10">
					<p className="eyebrow text-primary">{technology.category}</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"><span className="font-mono">{technology.name}</span> 浏览器指纹</h1>
					<p className="mt-5 text-lg leading-8 text-muted-foreground">{technology.description}</p>
				</header>

				<div className="grid gap-5 md:grid-cols-2">
					<Card>
						<CardHeader>
							<p className="eyebrow">What</p>
							<CardTitle className="text-lg">它是什么</CardTitle>
						</CardHeader>
						<CardContent><p className="text-sm leading-7 text-muted-foreground">{technology.description} 它通常不是孤立使用的字段，而是与设备、浏览器、网络和账号行为等信号一起观察。</p></CardContent>
					</Card>
					<Card>
						<CardHeader>
							<p className="eyebrow">Why</p>
							<CardTitle className="text-lg">为什么重要</CardTitle>
						</CardHeader>
						<CardContent><p className="text-sm leading-7 text-muted-foreground">当同一环境的多个信号互相矛盾时，网站可能要求额外验证。单项结果不能代表完整风险，应结合公开检测工具和实际网络环境分析。</p></CardContent>
					</Card>
				</div>

				<h2 className="mt-12 mb-1 text-xl font-semibold tracking-tight">常见检测方式</h2>
				<p className="eyebrow mb-5">Detection</p>
				<ol className="list-decimal space-y-3 pl-6 leading-7 text-muted-foreground">
					<li>在目标浏览器环境中打开公开检测工具，记录测试时间和网络条件。</li>
					<li>比较正常浏览器与目标环境的差异，区分系统差异和代理差异。</li>
					<li>结合 Canvas、WebGL、WebRTC、DNS、语言和时区等其他维度交叉观察。</li>
				</ol>

				<h2 className="mt-12 mb-1 text-xl font-semibold tracking-tight">合规防护思路</h2>
				<p className="eyebrow mb-5">Mitigation</p>
				<p className="leading-8 text-muted-foreground">优先保持浏览器、设备、语言、时区和网络设置的一致性，减少不必要的权限和扩展暴露，并遵守目标网站条款。不要把“通过某个检测”当作安全或隐私的唯一标准。</p>

				<h2 className="mt-12 mb-1 text-xl font-semibold tracking-tight">相关检测工具</h2>
				<p className="eyebrow mb-5">Tools</p>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{relatedTools.map(tool => (
						<Link key={tool.slug} href={`/tools/${tool.slug}/`} className="group flex items-center gap-3 rounded-lg border bg-card p-3.5 transition-colors hover:border-foreground/25">
							<ResourceIcon name={tool.name} src={tool.icon} website={tool.website} size={28} />
							<span className="min-w-0 flex-1 truncate text-sm font-medium">{tool.name}</span>
							<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
						</Link>
					))}
				</div>

				<p className="mt-12 border-t pt-6 font-mono text-xs leading-6 text-muted-foreground">
					参考资料：<a className="inline-flex items-center gap-1 underline underline-offset-4 transition-colors hover:text-foreground" href={technology.doc} target="_blank" rel="noopener noreferrer">查看公开文档<ExternalLink className="h-3 w-3" aria-hidden="true" /></a>
				</p>
			</article>
		</div>
	);
}
