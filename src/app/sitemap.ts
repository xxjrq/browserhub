import { MetadataRoute } from "next";
import { browsers, comparisons, guides, technologies, tools } from "@/data/resources";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://browsers.draxgr.cc";
	const updatedAt = "2026-08-11";
	const paths = [
		"/", "/en/", "/browsers/", "/tools/", "/fingerprint/", "/guides/", "/compare/", "/about/", "/contact/", "/privacy/",
		...browsers.map(item => `/browsers/${item.slug}/`),
		...tools.map(item => `/tools/${item.slug}/`),
		...technologies.map(item => `/fingerprint/${item.slug}/`),
		...guides.map(item => `/guides/${item.slug}/`),
		...comparisons.map(item => `/compare/${item.slug}/`)
	];
	return paths.map(path => ({ url: `${baseUrl}${path}`, lastModified: updatedAt, changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}
