import browserCatalog from "./catalog/browsers.json";
import readmeBrowserCatalog from "./catalog/readme-browsers.json";
import toolCatalog from "./catalog/tools.json";
import technologyCatalog from "./catalog/technologies.json";
import useCaseCatalog from "./catalog/use-cases.json";
import { comparisonSectionsFor } from "./comparison-sections";
import { verifiedProducts } from "./verified-products";
import { refreshedGuidesA } from "./refreshed-guides-a";
import { refreshedGuidesB } from "./refreshed-guides-b";
import { editorialGuides } from "./editorial-guides";
import { dailyGuides } from "./daily-guides-2026-10-20";
import { environmentGuidesA } from "./environment-guides-a";
import { environmentGuidesB } from "./environment-guides-b";

export type ResourceStatus = "recommended" | "active" | "open-source" | "experimental" | "pending-review" | "inactive";

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
	status: ResourceStatus;
	type: string;
	engine: string;
	storage: string;
	bestFor: string[];
	proxyProtocols: string[];
	website: string;
	download?: string;
	features: string[];
	pros: string[];
	cons: string[];
	updatedAt: string;
	sourceUrl: string;
	pricingUrl?: string;
	pricingCheckedAt?: string;
	icon?: string;
};

export type ToolResource = {
	name: string;
	slug: string;
	description: string;
	longDescription: string;
	category: string;
	categorySlug: string;
	pricing: string;
	platforms: string[];
	website: string;
	features: string[];
	status: ResourceStatus;
	updatedAt: string;
	sourceUrl: string;
	icon?: string;
};

export type TechnologyResource = {
	name: string;
	slug: string;
	description: string;
	category: string;
	doc: string;
};

export type UseCaseResource = {
	name: string;
	slug: string;
	recommendedCategories: string[];
};

export type GuideResource = {
	title: string;
	slug: string;
	description: string;
	date: string;
	category: string;
	sourcePath: string;
	content: string;
	sections?: Array<{ heading: string; body: string }>;
	relatedBrowsers?: string[];
	relatedTools?: string[];
	sources?: Array<{ title: string; url: string }>;
	faq?: Array<{ question: string; answer: string }>;
	relatedGuides?: string[];
	availableLocales?: string[];
};

export type ComparisonResource = {
	title: string;
	slug: string;
	description: string;
	browsers: [string, string];
	verdict?: string;
	notes?: string[];
	sections?: Array<{ heading: string; body: string }>;
};

const updatedAt = "2026-10-16";
const pricingCheckedAt = "2026-08-12";
const officialSite = "https://www.ebrower.com/";

// Presentation labels only. Current factual fields live in verified-products.ts.
const detailedBrowsers: Record<string, Partial<BrowserResource>> = {
	easybr: { featured: true, sponsored: true, status: "recommended", website: officialSite, download: "https://www.ebrower.com/down.html", rating: 4 },
	gologin: { rating: 4 }, adspower: { rating: 4 }, multilogin: { rating: 4 }
};

const readmeRows = readmeBrowserCatalog.browsers as Array<{ id: string; name: string; url: string; status: ResourceStatus; rating: number; freePlan: string; price: string; platforms: string[] }>;
const catalogRows = browserCatalog.browsers as Array<{ id: string; name: string; url: string; status: ResourceStatus; type: string; freePlan: string; platforms: string[]; engine: string; automation: boolean; proxyProtocols: string[]; storage: string; bestFor: string[] }>;
const catalogById = new Map(catalogRows.map(item => [item.id, item]));

const normalizePlatform = (value: string) => {
	const labels: Record<string, string> = { windows: "Windows", macos: "macOS", linux: "Linux", cloud: "Cloud", android: "Android", desktop: "Desktop", server: "Server", "linux/server": "Linux/Server" };
	return labels[value.toLowerCase()] ?? value.replace("云端", "Cloud").replace("桌面端", "Desktop").replace("Server", "Linux/Server");
};
const normalizeStatus = (value: string): ResourceStatus => {
	if (["recommended", "active", "open-source", "experimental", "pending-review", "inactive"].includes(value)) return value as ResourceStatus;
	return "pending-review";
};
const normalizePrice = (value: string) => {
	if (value === "以官网为准") return "官网动态报价";
	if (value === "免费") return "$0（免费）";
	if (value === "试用") return "免费试用，详见官网价格页";
	return value;
};

export const browsers: BrowserResource[] = readmeRows.map(row => {
	const catalog = catalogById.get(row.id);
	const detail = detailedBrowsers[row.id] ?? {};
	const status = detail.status ?? normalizeStatus(row.status);
	const nameSlug = row.id;
	const bestFor = [...new Set(catalog?.bestFor ?? ["multi-account", "privacy research"])];
	if (bestFor.length < 2) bestFor.push("multi-account");
	const base: BrowserResource = {
		name: row.name,
		slug: nameSlug,
		description: detail.description ?? `${row.name} 的浏览器环境与多账号资源整理`,
		longDescription: detail.longDescription ?? `${row.name} 的公开资源信息，包括状态、平台、浏览器内核和适用场景。使用前请以官方页面为准。`,
		free: detail.free ?? "免费额度未核实，请查官网",
		price: normalizePrice(detail.price ?? "当前价格未核实，请查官网"),
		profiles: detail.profiles ?? "未公开",
		api: detail.api ?? false,
		automation: detail.automation ?? false,
		proxy: detail.proxy ?? false,
		platforms: (detail.platforms ?? catalog?.platforms ?? row.platforms).map(normalizePlatform),
		rating: detail.rating ?? row.rating ?? (status === "pending-review" ? 2 : 3),
		featured: detail.featured,
		sponsored: detail.sponsored,
		status,
		type: detail.type ?? catalog?.type ?? "commercial",
		engine: detail.engine ?? catalog?.engine ?? "以官网为准",
		storage: detail.storage ?? catalog?.storage ?? "以官网为准",
		bestFor,
		proxyProtocols: detail.proxyProtocols ?? catalog?.proxyProtocols ?? [],
		website: detail.website ?? row.url,
		download: detail.download,
		features: detail.features ?? ["浏览器环境管理", "多账号工作流", "代理配置"],
		pros: detail.pros ?? ["有公开产品资料"],
		cons: detail.cons ?? ["功能和套餐可能变化"],
		updatedAt,
		sourceUrl: `https://github.com/xxjrq/antidetect-browser-hub/blob/main/README.md#${nameSlug}`,
		pricingUrl: detail.pricingUrl ?? row.url,
		pricingCheckedAt,
		icon: detail.icon
	};
	return { ...base, ...verifiedProducts[row.id]?.zh };
});

const categoryLabels: Record<string, string> = {
	"fingerprint-detection": "指纹检测",
	"bot-detection": "机器人检测",
	"privacy-testing": "隐私测试",
	"automation-detection": "自动化检测",
	"network-fingerprint": "网络指纹",
	"proxy-detection": "代理检测",
	"ip-reputation": "IP 信誉",
	"network-testing": "网络测试",
	automation: "自动化",
	testing: "测试",
	interaction: "交互自动化",
	"desktop-automation": "桌面自动化",
	"http-tls": "HTTP/TLS",
	privacy: "隐私工具"
};

const detailedTools: Record<string, Partial<ToolResource>> = {
	browserleaks: { description: "Canvas、WebGL、WebRTC、DNS 和浏览器信号检测", features: ["Canvas", "WebGL", "WebRTC 泄漏", "DNS 泄漏", "字体指纹", "AudioContext"] },
	creepjs: { description: "深度浏览器指纹和环境研究", features: ["指纹分析", "信任信号", "自动化相关信号", "隐私指标"] },
	pixelscan: { description: "浏览器环境和机器人信号检查", features: ["机器人信号", "环境检查", "指纹分析"] },
	amiunique: { description: "浏览器唯一性与指纹观察", features: ["指纹观察", "唯一性研究", "浏览器信号分析"] },
	playwright: { description: "跨浏览器自动化与测试框架", features: ["Chromium、Firefox、WebKit", "自动等待", "网络拦截", "移动端模拟", "并行测试"] },
	puppeteer: { description: "Chrome 与 Chromium 自动化框架", features: ["Chrome DevTools Protocol", "截图", "PDF 生成", "表单自动化", "UI 测试"] },
	selenium: { description: "跨浏览器 WebDriver 自动化生态", features: ["WebDriver 标准", "多语言", "Grid", "成熟生态"] }
};

const rawTools = toolCatalog.tools as Array<{ id: string; name: string; url: string; category: string; status: ResourceStatus }>;
export const tools: ToolResource[] = rawTools.map(tool => {
	const detail = detailedTools[tool.id] ?? {};
	const categorySlug = detail.categorySlug ?? tool.category;
	const category = detail.category ?? categoryLabels[categorySlug] ?? categorySlug;
	return {
		name: tool.name,
		slug: tool.id,
		description: detail.description ?? `${category}资源：${tool.name}`,
		longDescription: detail.longDescription ?? `${tool.name} 是用于${category}的公开资源。请阅读官方说明并在合规范围内使用。`,
		category,
		categorySlug,
		pricing: detail.pricing ?? "免费或以官网为准",
		platforms: detail.platforms ?? ["Web"],
		website: tool.url,
		features: detail.features ?? ["公开检测或自动化能力", "官方文档与示例"],
		status: tool.status,
		updatedAt,
		sourceUrl: "https://github.com/xxjrq/antidetect-browser-hub/blob/main/data/tools.json"
	};
});

const technologyDescriptions: Record<string, string> = {
	canvas: "Canvas 渲染差异可能成为浏览器环境识别信号。",
	webgl: "WebGL 暴露的图形能力和渲染特征可参与环境识别。",
	"audio-context": "AudioContext 的处理差异可能形成设备与浏览器信号。",
	fonts: "可见字体集合可能被用于辅助识别软件环境。",
	"client-rects": "ClientRects 布局测量结果可反映渲染环境差异。",
	webrtc: "WebRTC 连接配置可能暴露网络或本地地址信息。",
	dns: "DNS 解析路径和泄漏情况会影响网络隐私判断。",
	timezone: "时区应与网络和地理位置保持合理一致。",
	language: "语言和区域设置是浏览器环境的重要一致性信号。",
	hardware: "硬件并发数和内存等参数可作为设备信号。",
	tls: "TLS 握手特征可用于网络层识别和风险分析。",
	"ja3-ja4": "JA3/JA4 用于描述 TLS 客户端指纹。",
	workers: "Worker 环境可能暴露额外的浏览器运行时信号。",
	storage: "Cookie、LocalStorage 等隔离关系影响账号环境分离。",
	extensions: "浏览器扩展可能暴露运行环境或功能特征。"
};

const technologyRows = technologyCatalog.technologies as Array<{ id: string; name: string; category: string; doc: string }>;
export const technologies: TechnologyResource[] = technologyRows.map(item => ({
	name: item.name,
	slug: item.id,
	description: technologyDescriptions[item.id] ?? "浏览器环境识别与隐私研究中的一个信号维度。",
	category: item.category,
	doc: item.doc.startsWith("docs/") ? `https://github.com/xxjrq/antidetect-browser-hub/blob/main/${item.doc}` : item.doc
}));

export const useCases: UseCaseResource[] = (useCaseCatalog.useCases as Array<{ id: string; name: string; recommendedCategories: string[] }>).map(item => ({ ...item, slug: item.id }));

export const guides: GuideResource[] = [...dailyGuides, ...environmentGuidesA, ...environmentGuidesB, ...editorialGuides, ...refreshedGuidesA, ...refreshedGuidesB];

const rawComparisons: ComparisonResource[] = [
	{ title: "EasyBR vs AdsPower", slug: "easybr-vs-adspower", description: "比较本地优先与电商自动化工作流。", browsers: ["easybr", "adspower"] },
	{ title: "EasyBR vs GoLogin", slug: "easybr-vs-gologin", description: "比较本地优先和云端环境管理。", browsers: ["easybr", "gologin"] },
	{ title: "EasyBR vs Multilogin", slug: "easybr-vs-multilogin", description: "比较本地优先与企业团队工作流。", browsers: ["easybr", "multilogin"] },
	{ title: "EasyBR vs Dolphin Anty", slug: "easybr-vs-dolphin-anty", description: "比较本地环境管理与团队多账号工作流。", browsers: ["easybr", "dolphin-anty"] },
	{ title: "EasyBR vs MoreLogin", slug: "easybr-vs-morelogin", description: "比较免费环境、平台和自动化能力。", browsers: ["easybr", "morelogin"] },
	{ title: "EasyBR vs BitBrowser", slug: "easybr-vs-bitbrowser", description: "比较本地优先浏览器与亚洲市场常见方案。", browsers: ["easybr", "bitbrowser"] },
	{ title: "AdsPower vs GoLogin", slug: "adspower-vs-gologin", description: "比较电商工作流和云端自动化能力。", browsers: ["adspower", "gologin"] },
	{ title: "AdsPower vs Multilogin", slug: "adspower-vs-multilogin", description: "比较团队协作、环境管理和价格模型。", browsers: ["adspower", "multilogin"] },
	{ title: "GoLogin vs Multilogin", slug: "gologin-vs-multilogin", description: "比较云端环境、自动化和团队使用方式。", browsers: ["gologin", "multilogin"] },
	{ title: "Dolphin Anty vs MoreLogin", slug: "dolphin-anty-vs-morelogin", description: "比较多账号管理和自动化支持。", browsers: ["dolphin-anty", "morelogin"] },
	{ title: "BitBrowser vs AdsPower", slug: "bitbrowser-vs-adspower", description: "比较环境数量、平台与工作流能力。", browsers: ["bitbrowser", "adspower"] },
	{ title: "Incogniton vs GoLogin", slug: "incogniton-vs-gologin", description: "比较轻量多账号管理和云端自动化。", browsers: ["incogniton", "gologin"] },
	{ title: "MoreLogin vs Multilogin", slug: "morelogin-vs-multilogin", description: "比较不同团队规模下的浏览器环境管理。", browsers: ["morelogin", "multilogin"] }
	,
	{ title: "AdsPower vs Dolphin Anty", slug: "adspower-vs-dolphin-anty", description: "比较电商工作流、团队协作和多账号环境能力。", browsers: ["adspower", "dolphin-anty"] },
	{ title: "AdsPower vs MoreLogin", slug: "adspower-vs-morelogin", description: "比较免费额度、自动化接口和常见运营场景。", browsers: ["adspower", "morelogin"] },
	{ title: "AdsPower vs Incogniton", slug: "adspower-vs-incogniton", description: "比较电商运营与轻量多账号管理。", browsers: ["adspower", "incogniton"] },
	{ title: "GoLogin vs Dolphin Anty", slug: "gologin-vs-dolphin-anty", description: "比较云端环境、团队协作和自动化能力。", browsers: ["gologin", "dolphin-anty"] },
	{ title: "GoLogin vs MoreLogin", slug: "gologin-vs-morelogin", description: "比较价格、环境数量、平台与自动化支持。", browsers: ["gologin", "morelogin"] },
	{ title: "GoLogin vs Incogniton", slug: "gologin-vs-incogniton", description: "比较轻量多账号管理和云端工作流。", browsers: ["gologin", "incogniton"] },
	{ title: "GoLogin vs Kameleo", slug: "gologin-vs-kameleo", description: "比较浏览器指纹管理、平台和自动化方式。", browsers: ["gologin", "kameleo"] },
	{ title: "GoLogin vs Octo Browser", slug: "gologin-vs-octo-browser", description: "比较多账号环境、团队功能与代理配置。", browsers: ["gologin", "octo-browser"] },
	{ title: "Multilogin vs Dolphin Anty", slug: "multilogin-vs-dolphin-anty", description: "比较企业团队管理与社媒运营场景。", browsers: ["multilogin", "dolphin-anty"] },
	{ title: "Multilogin vs Incogniton", slug: "multilogin-vs-incogniton", description: "比较企业级环境管理与轻量方案。", browsers: ["multilogin", "incogniton"] },
	{ title: "Multilogin vs Kameleo", slug: "multilogin-vs-kameleo", description: "比较浏览器内核、指纹能力与自动化支持。", browsers: ["multilogin", "kameleo"] },
	{ title: "Dolphin Anty vs Incogniton", slug: "dolphin-anty-vs-incogniton", description: "比较营销团队和个人多账号使用方式。", browsers: ["dolphin-anty", "incogniton"] },
	{ title: "MoreLogin vs BitBrowser", slug: "morelogin-vs-bitbrowser", description: "比较亚洲市场常见方案的环境与自动化能力。", browsers: ["morelogin", "bitbrowser"] },
	{ title: "Octo Browser vs Undetectable", slug: "octo-browser-vs-undetectable", description: "比较多账号环境、代理配置与自动化工作流。", browsers: ["octo-browser", "undetectable"] },
	{ title: "Kameleo vs Octo Browser", slug: "kameleo-vs-octo-browser", description: "比较指纹配置、平台和自动化工作流。", browsers: ["kameleo", "octo-browser"] },
	{ title: "Undetectable vs GoLogin", slug: "undetectable-vs-gologin", description: "比较多账号浏览器的价格、环境和自动化能力。", browsers: ["undetectable", "gologin"] }
];

// Derive prose and tables from the same reviewed resource fields.
// These are Chinese-only prose, so the locale routes render them on zh-cn only.
export const comparisons: ComparisonResource[] = rawComparisons.map(comparison => ({
	...comparison,
	sections: comparisonSectionsFor(
		browsers.find(browser => browser.slug === comparison.browsers[0])!,
		browsers.find(browser => browser.slug === comparison.browsers[1])!
	)
}));

export const browserBySlug = (slug: string) => browsers.find(browser => browser.slug === slug);
export const toolBySlug = (slug: string) => tools.find(tool => tool.slug === slug);
export const technologyBySlug = (slug: string) => technologies.find(technology => technology.slug === slug);
export const guideBySlug = (slug: string) => guides.find(guide => guide.slug === slug);
