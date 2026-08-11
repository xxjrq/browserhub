import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { technologies } from "@/data/resources";

export const metadata = { title: "浏览器指纹技术", description: "理解 Canvas、WebGL、设备、语言、网络和存储等浏览器指纹信号。", alternates: { canonical: "/fingerprint/" } };

export default function FingerprintPage() {
	return (
		<div className="container py-12 md:py-16">
			<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
				<div className="max-w-2xl">
					<p className="eyebrow text-primary">Technology</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">浏览器指纹技术</h1>
					<p className="mt-4 leading-7 text-muted-foreground">理解网站如何通过渲染、硬件、软件、语言和网络信号识别浏览器环境。</p>
				</div>
				<p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{technologies.length} Signals</p>
			</div>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{technologies.map(technology => (
					<Link key={technology.slug} href={`/fingerprint/${technology.slug}/`} className="group flex flex-col rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.18)] dark:hover:shadow-none">
						<div className="flex items-center justify-between gap-3">
							<h2 className="truncate font-mono text-base font-medium tracking-tight">{technology.name}</h2>
							<span className="shrink-0 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">{technology.category}</span>
						</div>
						<p className="mt-3 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">{technology.description}</p>
						<p className="mt-4 inline-flex items-center gap-1 border-t pt-3 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
							查看说明
							<ArrowUpRight className="h-3.5 w-3.5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
						</p>
					</Link>
				))}
			</div>
		</div>
	);
}
