import { MetadataRoute } from "next";
import { browsers, comparisons, guides, technologies, tools } from "@/data/resources";
import { contentLocales, hreflangFor, localePath, locales } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://browserhub.co";
	const paths = locales.flatMap(locale => [
		"", "browsers", "tools", "fingerprint", "guides", "compare", "about", "contact", "privacy",
		...browsers.map(item => `browsers/${item.slug}`), ...tools.map(item => `tools/${item.slug}`),
		...technologies.map(item => `fingerprint/${item.slug}`),
		...guides.map(item => `guides/${item.slug}`).filter(path => contentLocales(path).includes(locale)),
		...comparisons.map(item => `compare/${item.slug}`)
	].map(path => ({ locale, path })));
	return paths.map(({ locale, path }) => ({
		url: `${baseUrl}${localePath(locale, path)}`,
		// Only content with its own review date gets a lastmod. A build is not a content update.
		...(path.startsWith("guides/") ? { lastModified: guides.find(guide => path === `guides/${guide.slug}`)?.date } : {}),
		alternates: { languages: hreflangFor(path) }
	}));
}
