import browserCatalog from "./catalog/browsers.json";
import readmeBrowserCatalog from "./catalog/readme-browsers.json";
import toolCatalog from "./catalog/tools.json";
import technologyCatalog from "./catalog/technologies.json";
import useCaseCatalog from "./catalog/use-cases.json";

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
};

const updatedAt = "2026-08-11";
const officialSite = "https://www.ebrower.com/";

const detailedBrowsers: Record<string, Partial<BrowserResource>> = {
	easybr: {
		description: "本地优先的多账号指纹浏览器",
		longDescription: "EasyBR 是基于 Chromium 的指纹浏览器，用于管理相互隔离的浏览器环境。配置和资料优先保存在本地，支持 HTTP、HTTPS 与 SOCKS5 代理。",
		free: "5 个环境终身免费",
		price: "$3+/month",
		profiles: "以官网当前套餐为准",
		features: ["本地优先存储", "5 个环境终身免费", "HTTP/HTTPS/SOCKS5 代理", "多环境隔离", "自动化与 API 支持"],
		pros: ["本地优先", "有免费额度", "支持 Windows 和 macOS"],
		cons: ["平台数量有限", "套餐和价格以官网当前信息为准"],
		featured: true,
		sponsored: true,
		status: "recommended",
		website: officialSite,
		download: "https://www.ebrower.com/down.html",
		rating: 4,
	},
	gologin: { description: "面向多账号和自动化的云端指纹浏览器", rating: 4 },
	adspower: { description: "面向电商运营和自动化流程的指纹浏览器", rating: 4 },
	multilogin: { description: "面向团队和企业流程的指纹浏览器", rating: 4 }
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

export const browsers: BrowserResource[] = readmeRows.map(row => {
	const catalog = catalogById.get(row.id);
	const detail = detailedBrowsers[row.id] ?? {};
	const status = detail.status ?? normalizeStatus(row.status);
	const nameSlug = row.id;
	const bestFor = catalog?.bestFor ?? ["multi-account"];
	return {
		name: row.name,
		slug: nameSlug,
		description: detail.description ?? `${row.name} 的浏览器环境与多账号资源整理`,
		longDescription: detail.longDescription ?? `${row.name} 的公开资源信息，包括状态、平台、浏览器内核和适用场景。使用前请以官方页面为准。`,
		free: detail.free ?? row.freePlan,
		price: detail.price ?? row.price,
		profiles: detail.profiles ?? "未公开",
		api: detail.api ?? (catalog?.automation ?? false),
		automation: detail.automation ?? (catalog?.automation ?? false),
		proxy: detail.proxy ?? Boolean(catalog?.proxyProtocols?.length),
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
		cons: detail.cons ?? [status === "pending-review" ? "尚未完成统一核验" : "功能和套餐可能变化"],
		updatedAt,
		sourceUrl: `https://github.com/xxjrq/antidetect-browser-hub/blob/main/README.md#${nameSlug}`,
		icon: detail.icon
	};
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
	doc: item.doc
}));

export const useCases: UseCaseResource[] = (useCaseCatalog.useCases as Array<{ id: string; name: string; recommendedCategories: string[] }>).map(item => ({ ...item, slug: item.id }));

export const guides: GuideResource[] = [
	{ title: "如何选择指纹浏览器", slug: "how-to-choose-antidetect-browser", description: "从环境隔离、平台、自动化和代理能力比较浏览器资源。", date: updatedAt, category: "选型指南", sourcePath: "docs/zh-CN/browsers.md", content: "选择指纹浏览器时，先确定账号数量、平台、是否需要团队协作和自动化，再比较环境隔离、代理协议、浏览器内核、存储方式与更新维护。价格和免费额度必须回到官方页面确认。" },
	{ title: "浏览器指纹是什么", slug: "browser-fingerprinting-explained", description: "理解 Canvas、WebGL、字体、时区、WebRTC 和网络信号。", date: updatedAt, category: "技术百科", sourcePath: "docs/zh-CN/fingerprint-technologies.md", content: "浏览器指纹不是单一字段，而是渲染、设备、语言、时区、网络和存储等多个信号的组合。单项检测只能说明一个维度，不能替代完整的安全或隐私评估。" },
	{ title: "EasyBR 代理配置要点", slug: "setting-up-proxies-easybr", description: "了解 HTTP、HTTPS、SOCKS5 代理配置和常见排查路径。", date: updatedAt, category: "使用教程", sourcePath: "docs/zh-CN/network-and-proxy.md", content: "配置代理时应确认协议、主机、端口、认证信息和 DNS/WebRTC 行为。先用公开检测工具验证出口 IP、DNS 和 WebRTC，再开始账号工作流。EasyBR 的当前字段和套餐以官网版本为准。" },
	{ title: "多账号环境管理实践", slug: "multi-account-best-practices", description: "从环境隔离、代理一致性和权限管理降低账号串联风险。", date: updatedAt, category: "实践指南", sourcePath: "docs/zh-CN/use-cases.md", content: "多账号管理应为每个账号建立独立环境，保持代理、语言、时区和账号行为的一致性，限制共享凭据，并记录环境变更。仅在遵守平台规则和当地法律的范围内使用。" }
];

export const comparisons = [
	{ title: "EasyBR vs AdsPower", slug: "easybr-vs-adspower", description: "比较本地优先与电商自动化工作流。", browsers: ["easybr", "adspower"] },
	{ title: "EasyBR vs GoLogin", slug: "easybr-vs-gologin", description: "比较本地优先和云端环境管理。", browsers: ["easybr", "gologin"] },
	{ title: "EasyBR vs Multilogin", slug: "easybr-vs-multilogin", description: "比较本地优先与企业团队工作流。", browsers: ["easybr", "multilogin"] }
];

export const browserBySlug = (slug: string) => browsers.find(browser => browser.slug === slug);
export const toolBySlug = (slug: string) => tools.find(tool => tool.slug === slug);
export const technologyBySlug = (slug: string) => technologies.find(technology => technology.slug === slug);
export const guideBySlug = (slug: string) => guides.find(guide => guide.slug === slug);
