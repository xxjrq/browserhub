import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, className }: { value: number; className?: string }) {
	return (
		<span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`编辑评分 ${value} / 5`}>
			{Array.from({ length: 5 }, (_, index) => (
				<Star key={index} aria-hidden="true" className={cn("h-3 w-3", index < value ? "fill-foreground text-foreground" : "fill-transparent text-border")} />
			))}
		</span>
	);
}
