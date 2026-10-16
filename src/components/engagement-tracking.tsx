"use client";

import { useEffect } from "react";

declare global {
	interface Window { _hmt?: { push: (event: [string, string, string, string]) => unknown }; }
}

// Reuses the existing Baidu installation. Only catalogue slugs are sent, never
// arbitrary URLs, query strings, form values or profile data.
export function EngagementTracking() {
	useEffect(() => {
		if (process.env.NODE_ENV !== "production") return;
		const onClick = (event: MouseEvent) => {
			const anchor = event.target instanceof Element ? event.target.closest("a") : null;
			if (!anchor || !window._hmt) return;
			const from = window.location.pathname.split("/").filter(Boolean);
			const knownLanguages = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"];
			const language = knownLanguages.includes(from[0]) ? from.shift()! : "zh-cn";
			const target = new URL(anchor.href, window.location.href);
			const segments = target.pathname.split("/").filter(Boolean);
			if (knownLanguages.includes(segments[0])) segments.shift();
			let action: string | undefined;
			if (target.origin === window.location.origin && from[0] === "guides" && segments[0] === "compare") action = "guide_to_comparison";
			else if (target.origin === window.location.origin && from[0] === "compare" && segments[0] === "browsers") action = "comparison_to_product";
			else if (target.origin !== window.location.origin && from[0] === "browsers" && anchor.dataset.officialLink === "true") action = "outbound_official";
			if (!action) return;
			const safe = (value: string) => /^[a-z0-9-]{1,90}$/.test(value) ? value : "index";
			window._hmt.push(["_trackEvent", "browserhub_funnel", action, `${language}:${safe(from[1] ?? "index")}:${safe(segments[1] ?? "official")}`]);
		};
		document.addEventListener("click", onClick, { capture: true });
		return () => document.removeEventListener("click", onClick, { capture: true });
	}, []);
	return null;
}
