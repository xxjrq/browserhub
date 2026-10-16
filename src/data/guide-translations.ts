import type { Locale } from "@/lib/i18n";
import { guideEditions } from "./guide-editions";

export type GuideCopy = { title: string; description: string };
export type GuideSection = { heading: string; body: string };

export function localizedGuideCopy(locale: Locale, slug: string, fallback: GuideCopy): GuideCopy {
	return guideEditions[slug]?.[locale === "zh-cn" ? "zh-cn" : "en"] ?? fallback;
}

export function localizedGuideSections(locale: Locale, slug: string): GuideSection[] | undefined {
	return guideEditions[slug]?.[locale === "zh-cn" ? "zh-cn" : "en"].sections;
}
