import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/data/resources";

export const metadata = { title: "指南与教程", description: "指纹浏览器选型、浏览器指纹、代理配置与多账号环境管理指南。", alternates: { canonical: "/guides/" } };

export default function GuidesPage() {
	return (
		<div className="container py-12 md:py-16">
			<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
				<div className="max-w-2xl">
					<p className="eyebrow text-primary">Guides</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">指南与教程</h1>
					<p className="mt-4 leading-7 text-muted-foreground">从浏览器选择、指纹技术到代理配置，持续整理可执行的使用知识。</p>
				</div>
				<p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{guides.length} Articles</p>
			</div>
			<div className="border-t">
				{guides.map(guide => (
					<Link key={guide.slug} href={`/guides/${guide.slug}/`} className="group flex items-center gap-4 border-b py-5 transition-colors hover:bg-muted/40 sm:gap-8">
						<span className="hidden w-24 shrink-0 font-mono text-xs text-muted-foreground md:block">{guide.date}</span>
						<span className="min-w-0 flex-1">
							<span className="block text-[15px] font-medium transition-colors group-hover:text-primary">{guide.title}</span>
							<span className="mt-1.5 block truncate text-sm text-muted-foreground">{guide.description}</span>
						</span>
						<Badge variant="secondary" className="hidden shrink-0 sm:inline-flex">{guide.category}</Badge>
						<ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
					</Link>
				))}
			</div>
		</div>
	);
}
