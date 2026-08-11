import { MetadataRoute } from "next";
import { browsers, comparisons, guides, technologies, tools } from "@/data/resources";
import { localePath, locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://browserhub.co";
	const updatedAt = "2026-08-11";
	const paths = ["/", "/about/", "/contact/", "/privacy/", ...locales.flatMap(locale => [
		localePath(locale), localePath(locale, "browsers"), localePath(locale, "tools"), localePath(locale, "fingerprint"), localePath(locale, "guides"), localePath(locale, "compare"), localePath(locale, "about"), localePath(locale, "contact"), localePath(locale, "privacy"),
		...browsers.map(item => localePath(locale, `browsers/${item.slug}`)),
		...tools.map(item => localePath(locale, `tools/${item.slug}`)),
		...technologies.map(item => localePath(locale, `fingerprint/${item.slug}`)),
		...guides.map(item => localePath(locale, `guides/${item.slug}`)),
		...comparisons.map(item => localePath(locale, `compare/${item.slug}`))
	])];
	return paths.map(path => ({ url: `${baseUrl}${path}`, lastModified: updatedAt, changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}
