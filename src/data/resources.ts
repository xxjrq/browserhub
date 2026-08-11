export type BrowserResource = {
	name: string;
	slug: string;
	description: string;
	longDescription: string;
	free: string;
	price: string;
	profiles: string;
	api: boolean;
	automation: boolean;
	proxy: boolean;
	platforms: string[];
	rating: number;
	featured?: boolean;
	sponsored?: boolean;
	website: string;
	download?: string;
	features: string[];
	pros: string[];
	cons: string[];
};

export type ToolResource = {
	name: string;
	slug: string;
	description: string;
	longDescription: string;
	category: string;
	pricing: string;
	platforms: string[];
	website: string;
	features: string[];
};

export type TechnologyResource = {
	name: string;
	slug: string;
	description: string;
	category: string;
};

export type GuideResource = {
	title: string;
	slug: string;
	description: string;
	date: string;
	category: string;
};

export const browsers: BrowserResource[] = [
	{
		name: "EasyBR",
		slug: "easybr",
		description: "Local-first fingerprint browser for multi-account workflows",
		longDescription:
			"EasyBR is a Chromium-based fingerprint browser for managing separate browser environments. It keeps profile data local-first and supports HTTP, HTTPS, and SOCKS5 proxy configurations.",
		free: "5 profiles forever",
		price: "$3+/month",
		profiles: "Not published",
		api: true,
		automation: true,
		proxy: true,
		platforms: ["Windows", "macOS"],
		rating: 4,
		featured: true,
		sponsored: true,
		website: "https://www.ebrower.com/",
		download: "https://www.ebrower.com/down.html",
		features: [
			"Local-first storage",
			"5 profiles free forever",
			"HTTP/HTTPS/SOCKS5 proxy support",
			"Multi-profile isolation",
			"Automation and API support"
		],
		pros: ["Local storage", "Free tier available", "Windows and macOS support"],
		cons: ["Limited platforms", "Confirm current plans on the official website"]
	},
	{
		name: "GoLogin",
		slug: "gologin",
		description: "Cloud-based anti-detect browser with API",
		longDescription:
			"GoLogin is a cloud-based anti-detect browser for creating and managing multiple browser profiles across desktop and cloud environments.",
		free: "3 profiles",
		price: "$24+/month",
		profiles: "100+",
		api: true,
		automation: true,
		proxy: true,
		platforms: ["Windows", "macOS", "Linux", "Cloud"],
		rating: 4,
		website: "https://gologin.com/",
		features: ["Cloud-based", "API access", "Multiple platforms", "Team sharing"],
		pros: ["Cloud storage", "API access", "Multiple platforms"],
		cons: ["Paid plans", "Requires internet for cloud workflows"]
	},
	{
		name: "AdsPower",
		slug: "adspower",
		description: "Automation-focused browser for e-commerce",
		longDescription:
			"AdsPower is an anti-detect browser focused on e-commerce workflows, profile management, and automation integrations.",
		free: "2 profiles",
		price: "$5.4+/month",
		profiles: "10+",
		api: true,
		automation: true,
		proxy: true,
		platforms: ["Windows", "macOS", "Linux"],
		rating: 4,
		website: "https://www.adspower.com/",
		features: ["RPA automation", "Local API", "Multiple engines", "Fingerprint controls"],
		pros: ["Automation workflows", "Multiple platforms", "Free tier available"],
		cons: ["Feature-heavy interface", "Learning curve"]
	},
	{
		name: "Multilogin",
		slug: "multilogin",
		description: "Enterprise-grade fingerprint browser",
		longDescription:
			"Multilogin is an enterprise-oriented fingerprint browser with profile isolation, team workflows, and browser automation integrations.",
		free: "Trial only",
		price: "€74+/month",
		profiles: "100",
		api: true,
		automation: true,
		proxy: true,
		platforms: ["Windows", "macOS", "Linux"],
		rating: 4,
		website: "https://multilogin.com/",
		features: ["Profile isolation", "Team workflows", "Automation integrations", "Enterprise support"],
		pros: ["Enterprise workflows", "Team support", "Multiple platforms"],
		cons: ["Higher price point", "No permanent free tier"]
	},
	{
		name: "Dolphin Anty",
		slug: "dolphin-anty",
		description: "Team profile workflows",
		longDescription: "Dolphin Anty provides browser profile management for multi-account workflows.",
		free: "Limited",
		price: "Official site",
		profiles: "Not published",
		api: true,
		automation: true,
		proxy: true,
		platforms: ["Windows", "macOS", "Linux"],
		rating: 3,
		website: "https://dolphin-anty.com/",
		features: ["Profile management", "Team workflows", "Proxy configuration"],
		pros: ["Multi-account workflows"],
		cons: ["Check current plan details on the official website"]
	},
	{
		name: "Incogniton",
		slug: "incogniton",
		description: "Local and cloud profile management",
		longDescription: "Incogniton provides isolated browser profiles for multi-account workflows.",
		free: "Limited",
		price: "Official site",
		profiles: "Not published",
		api: true,
		automation: true,
		proxy: true,
		platforms: ["Windows", "macOS"],
		rating: 3,
		website: "https://incogniton.com/",
		features: ["Profile isolation", "Proxy support", "Team workflows"],
		pros: ["Profile management"],
		cons: ["Check current plan details on the official website"]
	},
	{
		name: "MoreLogin",
		slug: "morelogin",
		description: "Profiles and team workflows",
		longDescription: "MoreLogin provides isolated profiles and account management workflows.",
		free: "Limited",
		price: "Official site",
		profiles: "Not published",
		api: true,
		automation: true,
		proxy: true,
		platforms: ["Windows", "macOS"],
		rating: 3,
		website: "https://morelogin.com/",
		features: ["Profile management", "Team workflows", "Proxy support"],
		pros: ["Multi-account workflows"],
		cons: ["Check current plan details on the official website"]
	}
];

export const tools: ToolResource[] = [
	{
		name: "BrowserLeaks",
		slug: "browserleaks",
		description: "Canvas, WebGL, WebRTC, DNS and browser signal tests",
		longDescription: "BrowserLeaks provides public tests for browser fingerprinting signals, privacy leaks, and network exposure.",
		category: "Detection",
		pricing: "Free",
		platforms: ["Web"],
		website: "https://browserleaks.com/",
		features: ["Canvas tests", "WebGL tests", "WebRTC leak detection", "DNS leak test", "Font fingerprinting", "AudioContext tests"]
	},
	{
		name: "CreepJS",
		slug: "creepjs",
		description: "Detailed browser fingerprint research",
		longDescription: "CreepJS is a research-oriented tool that analyzes browser fingerprint signals and privacy characteristics.",
		category: "Detection",
		pricing: "Free",
		platforms: ["Web"],
		website: "https://abrahamjuliot.github.io/creepjs/",
		features: ["Fingerprint analysis", "Trust signals", "Bot-related signals", "Privacy metrics"]
	},
	{
		name: "Pixelscan",
		slug: "pixelscan",
		description: "Browser environment and bot-signal checks",
		longDescription: "Pixelscan checks browser environment signals and helps users understand how an environment may appear to websites.",
		category: "Detection",
		pricing: "Free",
		platforms: ["Web"],
		website: "https://pixelscan.net/",
		features: ["Bot signals", "Environment checks", "Fingerprint analysis"]
	},
	{
		name: "AmIUnique",
		slug: "amiunique",
		description: "Browser uniqueness and fingerprint observations",
		longDescription: "AmIUnique is a public research service for observing browser fingerprint uniqueness.",
		category: "Detection",
		pricing: "Free",
		platforms: ["Web"],
		website: "https://amiunique.org/fingerprint",
		features: ["Fingerprint observation", "Uniqueness research", "Browser signal analysis"]
	},
	{
		name: "Playwright",
		slug: "playwright",
		description: "Cross-browser automation and testing",
		longDescription: "Playwright is a browser automation framework supporting Chromium, Firefox, and WebKit.",
		category: "Automation",
		pricing: "Free",
		platforms: ["Node.js", "Python", "Java", ".NET"],
		website: "https://playwright.dev/",
		features: ["Cross-browser support", "Auto-wait", "Network interception", "Mobile emulation", "Parallel testing"]
	},
	{
		name: "Puppeteer",
		slug: "puppeteer",
		description: "Chrome and Chromium automation",
		longDescription: "Puppeteer provides a high-level Node.js API for controlling Chrome and Chromium.",
		category: "Automation",
		pricing: "Free",
		platforms: ["Node.js"],
		website: "https://pptr.dev/",
		features: ["Chrome DevTools Protocol", "Screenshots", "PDF generation", "Form automation", "UI testing"]
	},
	{
		name: "Selenium",
		slug: "selenium",
		description: "WebDriver automation ecosystem",
		longDescription: "Selenium is a WebDriver automation ecosystem supporting multiple browsers and programming languages.",
		category: "Automation",
		pricing: "Free",
		platforms: ["Multiple"],
		website: "https://www.selenium.dev/",
		features: ["WebDriver standard", "Multiple languages", "Grid support", "Large ecosystem"]
	}
];

export const technologies: TechnologyResource[] = [
	{ name: "Canvas Fingerprinting", slug: "canvas", description: "How canvas rendering can create browser signals", category: "Rendering" },
	{ name: "WebGL Fingerprinting", slug: "webgl", description: "GPU and graphics-based fingerprinting signals", category: "Rendering" },
	{ name: "AudioContext Fingerprinting", slug: "audiocontext", description: "Audio processing-based browser identification", category: "Hardware" },
	{ name: "Font Fingerprinting", slug: "font", description: "Installed-font detection as a browser signal", category: "Software" },
	{ name: "TLS Fingerprinting", slug: "tls", description: "Network-level identification through TLS behavior", category: "Network" },
	{ name: "WebRTC Leaks", slug: "webrtc", description: "IP exposure through WebRTC connections", category: "Network" }
];

export const guides: GuideResource[] = [
	{ title: "How to Choose an Anti-Detect Browser", slug: "how-to-choose-antidetect-browser", description: "A framework for comparing browser profile tools", date: "2026-08-01", category: "Guide" },
	{ title: "Browser Fingerprinting Explained", slug: "browser-fingerprinting-explained", description: "How websites observe browser and device signals", date: "2026-07-28", category: "Tutorial" },
	{ title: "Setting Up Proxies in EasyBR", slug: "setting-up-proxies-easybr", description: "A guide to proxy configuration concepts in EasyBR", date: "2026-07-25", category: "Tutorial" },
	{ title: "Multi-Account Management Best Practices", slug: "multi-account-best-practices", description: "Operational considerations for separated browser environments", date: "2026-07-20", category: "Guide" }
];

export const comparisons = [
	{ title: "EasyBR vs AdsPower", slug: "easybr-vs-adspower", description: "Compare workflows, platforms, and published plan information", browsers: ["EasyBR", "AdsPower"] },
	{ title: "EasyBR vs GoLogin", slug: "easybr-vs-gologin", description: "Compare local-first and cloud-oriented workflows", browsers: ["EasyBR", "GoLogin"] },
	{ title: "EasyBR vs Multilogin", slug: "easybr-vs-multilogin", description: "Compare local-first and enterprise-oriented workflows", browsers: ["EasyBR", "Multilogin"] }
];

export const browserBySlug = (slug: string) => browsers.find(browser => browser.slug === slug);
export const toolBySlug = (slug: string) => tools.find(tool => tool.slug === slug);
export const technologyBySlug = (slug: string) => technologies.find(technology => technology.slug === slug);
export const guideBySlug = (slug: string) => guides.find(guide => guide.slug === slug);
