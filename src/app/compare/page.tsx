import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { browsers, comparisons } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";

export const metadata = { title: "浏览器对比", description: "用统一字段比较指纹浏览器的功能、价格、平台和适用场景。", alternates: { canonical: "/compare/" } };

export default function ComparePage() {
	return (
		<div className="container py-12 md:py-16">
			<div className="mb-10 flex flex-wrap items-end justify-between gap-6">
				<div className="max-w-2xl">
					<p className="eyebrow text-primary">Compare</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">浏览器对比</h1>
					<p className="mt-4 leading-7 text-muted-foreground">用统一字段比较不同指纹浏览器的功能、价格和适用场景。</p>
				</div>
				<p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{comparisons.length} Comparisons</p>
			</div>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{comparisons.map(comparison => {
					const browserA = browsers.find(browser => browser.slug === comparison.browsers[0]);
					const browserB = browsers.find(browser => browser.slug === comparison.browsers[1]);
					return (
						<Link key={comparison.slug} href={`/compare/${comparison.slug}/`} className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-all duration-200 hover:border-foreground/25 hover:shadow-[0_8px_24px_-12px_rgb(0_0_0/0.15)] dark:hover:shadow-none">
							<span className="flex shrink-0 -space-x-2">
								{browserA && <ResourceIcon name={browserA.name} src={browserA.icon} website={browserA.website} size={34} className="ring-2 ring-card" />}
								{browserB && <ResourceIcon name={browserB.name} src={browserB.icon} website={browserB.website} size={34} className="ring-2 ring-card" />}
							</span>
							<span className="min-w-0 flex-1">
								<span className="block truncate text-sm font-medium">{comparison.title}</span>
								<span className="mt-0.5 block truncate text-xs text-muted-foreground">{comparison.description}</span>
							</span>
							<ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
						</Link>
					);
				})}
			</div>
		</div>
	);
}
