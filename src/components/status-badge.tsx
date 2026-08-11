import { cn } from "@/lib/utils";
import type { ResourceStatus } from "@/data/resources";

const statusMeta: Record<ResourceStatus, { label: string; dot: string }> = {
	recommended: { label: "推荐", dot: "bg-primary" },
	active: { label: "活跃", dot: "bg-success" },
	"open-source": { label: "开源", dot: "bg-foreground" },
	experimental: { label: "实验", dot: "bg-warning" },
	"pending-review": { label: "待核验", dot: "bg-muted-foreground/40" },
	inactive: { label: "停更", dot: "bg-destructive" }
};

export function StatusBadge({ status, className }: { status: ResourceStatus; className?: string }) {
	const meta = statusMeta[status] ?? statusMeta["pending-review"];
	return (
		<span className={cn("inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border bg-card px-2 py-0.5 text-xs whitespace-nowrap text-muted-foreground", className)}>
			<span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} aria-hidden="true" />
			{meta.label}
		</span>
	);
}
