/** Reader journeys, not one page for every keyword variation. */
export const guideSeries = [
	{
		id: "ai-browser-development",
		copy: {
			en: { title: "AI browsers and browser agents", description: "Plan and verify real browser tasks, keep evidence for finance and application workflows, and solve interaction and network-mocking failures." },
			"zh-cn": { title: "AI 浏览器与智能体开发系列", description: "规划并核实真实浏览器任务，保留报销与求职记录证据，并排查交互和网络模拟问题。" }
		},
		slugs: ["ai-browser-meeting-prep-brief", "ai-browser-calendar-timezone-proposal", "ai-browser-tab-access-permissions", "browser-agent-session-expiry-recovery", "browser-agent-network-interruption-recovery", "ai-browser-trip-planning", "ai-browser-expense-report-reconciliation", "ai-browser-job-application-status", "browser-agent-drag-and-drop", "browser-agent-request-mocking-har", "browser-agent-clipboard-read-write", "playwright-geolocation-permission-tests", "playwright-javascript-dialog-hangs", "browser-agent-cookie-consent-choice", "browser-agent-shopping-cart-verification", "chatgpt-atlas-retirement-data-transition", "chatgpt-desktop-browser-vs-comet", "ai-browser-webpage-translation", "browser-agent-wait-for-page-ready", "browser-agent-accessibility-snapshot-vs-screenshot", "gemini-in-chrome-vs-copilot-in-edge", "ai-browser-youtube-summary", "browser-agent-shadow-dom", "browser-agent-date-picker", "browser-agent-scroll-pagination", "comet-vs-dia", "ai-browser-pdf-summary", "browser-agent-human-takeover", "browser-agent-iframes", "browser-agent-tabs-popups", "ai-browser-research-source-verification", "playwright-cli-vs-mcp", "browser-agent-upload-files", "browser-agent-form-submission", "browser-agent-debugging-traces", "browser-use-vs-playwright", "comet-vs-gemini-in-chrome", "browser-agent-prompt-injection", "browser-agent-download-files", "browser-agent-structured-data-extraction", "ai-browser-vs-browser-agent", "playwright-mcp-vs-chrome-devtools-mcp", "playwright-mcp-existing-browser", "chrome-devtools-mcp-existing-browser", "browser-use-existing-browser-session"]
	},
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
