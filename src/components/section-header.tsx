import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionHeaderProps = {
	eyebrow: string;
	title: string;
	description?: string;
	href?: string;
	action?: string;
};

export function SectionHeader({ eyebrow, title, description, href, action }: SectionHeaderProps) {
	return (
		<div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
			<div className="max-w-2xl">
				<p className="eyebrow text-primary">{eyebrow}</p>
				<h2 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
				{description ? <p className="mt-3 leading-7 text-muted-foreground">{description}</p> : null}
			</div>
			{href ? (
				<Link href={href} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
					{action ?? "查看全部"}
					<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
				</Link>
			) : null}
		</div>
	);
}
