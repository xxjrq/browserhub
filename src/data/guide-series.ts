/** Reader journeys, not one page for every keyword variation. */
export const guideSeries = [
	{
		id: "browser-selection",
		copy: {
			en: { title: "Choose a fingerprint browser", description: "Define the job, compare product types, and decide which browser is worth a trial." },
			"zh-cn": { title: "指纹浏览器选型系列", description: "从实际任务出发，了解产品类别、免费与开源边界，再决定试用哪款浏览器。" }
		},
		slugs: ["how-to-choose-antidetect-browser", "best-antidetect-browsers-2026", "free-antidetect-browser", "open-source-antidetect-browsers", "antidetect-browser-macos", "chrome-profiles-vs-antidetect-browser"]
	},
	{
		id: "environment-detection",
		copy: {
			en: { title: "Browser environment detection series", description: "Understand the signals, choose a test, and interpret the report using repeatable observations." },
			"zh-cn": { title: "浏览器环境检测系列", description: "从指纹原理到逐项检测，学会选择工具、解释结果，并留下可复测记录。" }
		},
		slugs: ["browser-fingerprinting-explained", "browser-fingerprint-testing-checklist", "browser-fingerprint-changes-after-update", "browserleaks-vs-creepjs", "canvas-fingerprint-test", "webgl-fingerprint-test", "user-agent-client-hints-check", "browser-timezone-language-check", "dns-leak-test-browser-proxy", "webrtc-leak-check", "browser-profile-storage-isolation-test", "read-creepjs-results", "browser-fingerprint-signals"]
	},
	{
		id: "profiles-proxies-and-teams",
		copy: {
			en: { title: "Profiles, proxies and team workflows", description: "Configure the network route, preserve the right state, and make handovers and recovery testable." },
			"zh-cn": { title: "环境、代理与团队实践系列", description: "配置网络路径，明确资料边界，用交接、权限和恢复流程验证日常工作。" }
		},
		slugs: ["proxy-vs-vpn-vs-antidetect-browser", "residential-vs-datacenter-proxies", "configure-http-proxy", "configure-socks5-proxy", "setting-up-proxies-easybr", "local-vs-cloud-browser-storage", "browser-automation-profile-persistence", "multi-account-best-practices", "browser-profile-permissions", "team-browser-evaluation-checklist"]
	}
];

export const guideSeriesFor = (slug: string) => guideSeries.find(series => series.slugs.includes(slug));
