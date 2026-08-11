import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "BrowserHub 指纹浏览器资源大全",
		short_name: "BrowserHub",
		description: "指纹浏览器、检测工具、自动化与隐私资源导航。",
		start_url: "/",
		display: "standalone",
		background_color: "#0B1020",
		theme_color: "#2563EB",
		icons: [
			{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
		]
	};
}
