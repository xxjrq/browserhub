import Link from "next/link";
import { ArrowUpRight, Check, Minus } from "lucide-react";
import type { BrowserResource } from "@/data/resources";
import { ResourceIcon } from "@/components/resource-icon";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";

function Capability({ ok, label }: { ok: boolean; label: string }) {
	return (
		<span className={cn("inline-flex items-center gap-1 font-mono text-[11px] tracking-wide uppercase", ok ? "text-foreground" : "text-muted-foreground/50")}>
			{ok ? <Check className="h-3 w-3 text-success" aria-hidden="true" /> : <Minus className="h-3 w-3" aria-hidden="true" />}
			{label}
		</span>
	);
}

export function BrowserCard({ browser, className }: { browser: BrowserResource; className?: string }) {
	return (
		<Link
			href={`/browsers/${browser.slug}/`}
			className={cn(
				"group flex h-full flex-col rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.18)] dark:hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.7)]",
				className
			)}
		>
			<div className="flex items-start gap-3">
				<ResourceIcon name={browser.name} src={browser.icon} website={browser.website} size={40} />
				<div className="min-w-0 flex-1">
					<h3 className="truncate font-semibold tracking-tight">{browser.name}</h3>
					<p className="mt-0.5 truncate font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{browser.engine}</p>
				</div>
				<StatusBadge status={browser.status} />
			</div>
			<p className="mt-3 mb-4 line-clamp-2 text-sm leading-6 text-muted-foreground">{browser.description}</p>
			<div className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5">
				<Capability ok={browser.api} label="API" />
				<Capability ok={browser.automation} label="Automation" />
				<Capability ok={browser.proxy} label="Proxy" />
			</div>
			<div className="mt-auto flex items-center justify-between gap-3 border-t pt-3">
				<span className="truncate text-xs text-muted-foreground">{browser.platforms.join(" · ")}</span>
				<span className="flex shrink-0 items-center gap-2">
					<span className="font-mono text-xs font-medium">{browser.price}</span>
					<ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
				</span>
			</div>
		</Link>
	);
}
