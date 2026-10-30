import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ratingLabel, type Locale } from "@/lib/i18n";

/**
 * Editorial rating display.
 *
 * The `aria-label` used to be a hard-coded Chinese string ("编辑评分 x / 5") on
 * every locale route, so the 36 browser detail pages shipped Chinese screen
 * reader text inside an otherwise English, Japanese, Korean, Spanish, Portuguese
 * or Russian page. The label is now built from `ratingLabel` in `i18n.ts`,
 * which carries all seven locales.
 *
 * `locale` is optional so the legacy Simplified-Chinese routes keep working
 * without touching every call site; it defaults to `zh-cn`.
 */
export function Rating({ value, locale = "zh-cn", className }: { value: number; locale?: Locale; className?: string }) {
	return (
		<span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={ratingLabel(locale, value)}>
			{Array.from({ length: 5 }, (_, index) => (
				<Star key={index} aria-hidden="true" className={cn("h-3 w-3", index < value ? "fill-foreground text-foreground" : "fill-transparent text-border")} />
			))}
		</span>
	);
}
