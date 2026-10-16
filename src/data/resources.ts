import browserCatalog from "./catalog/browsers.json";
import readmeBrowserCatalog from "./catalog/readme-browsers.json";
import toolCatalog from "./catalog/tools.json";
import technologyCatalog from "./catalog/technologies.json";
import useCaseCatalog from "./catalog/use-cases.json";
import { comparisonSections } from "./comparison-sections";

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

const updatedAt = "2026-10-15";
const pricingCheckedAt = "2026-08-12";
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
		pricingUrl: "https://www.ebrower.com/",
	},
	gologin: { description: "面向多账号和自动化的云端指纹浏览器", rating: 4, free: "3 个浏览器档案", price: "$9/月起（Professional；当前促销 $4.50/月）", pricingUrl: "https://gologin.com/pricing/" },
	adspower: { description: "面向电商运营和自动化流程的指纹浏览器", rating: 4, free: "2 个档案永久免费", price: "$9/月起（Professional；年付折算 $7.20/月）", pricingUrl: "https://www.adspower.com/pricing" },
	multilogin: { description: "面向团队和企业流程的指纹浏览器", rating: 4, free: "5 个档案免费", price: "$7.08/月起（年付）", pricingUrl: "https://multilogin.com/pricing/" },
	"dolphin-anty": { free: "5 个档案免费", price: "$10/月起", pricingUrl: "https://dolphin-anty.com/pricing/" },
	morelogin: { free: "2 个档案永久免费", price: "$5.40/月起", pricingUrl: "https://www.morelogin.com/pricing" },
	incogniton: { free: "前 2 个月 10 个档案，之后 3 个", price: "$19.99/月起（半年计费）", pricingUrl: "https://incogniton.com/pricing/" },
	bitbrowser: { free: "10 个档案永久免费", price: "$10/月起（50 个档案）", pricingUrl: "https://www.bitbrowser.net/price" },
	"octo-browser": { free: "试用/促销额度以官网为准", price: "$10/月起", pricingUrl: "https://octobrowser.net/pricing/" },
	kameleo: { free: "免费计划；100 个云端档案", price: "$51.93/月起（约 €45）", pricingUrl: "https://kameleo.io/pricing" },
	undetectable: { free: "5–45 个云端档案免费", price: "$34/月起", pricingUrl: "https://undetectable.io/pricing/" },
	ixbrowser: { free: "免费版 $0/月", price: "$2.81/月起（约 ¥19）", pricingUrl: "https://www.ixbrowser.com/en/pricing" },
	nstbrowser: { free: "免费计划", price: "按档案启动/代理用量计费；代理 $0.30/GB 起", pricingUrl: "https://www.nstbrowser.io/en/pricing" },
	hidemyacc: { free: "7 天免费试用", price: "$5/月起（年付价）", pricingUrl: "https://hidemyacc.com/pricing" },
	dicloak: { free: "$0/月免费计划", price: "$8/月起（年付折算 $4.80/月）", pricingUrl: "https://dicloak.com/pricing" },
	"ghost-browser": { free: "免费版", price: "$21/月起（年付）", pricingUrl: "https://ghostbrowser.com/upgrade/" },
	wade: { free: "7 天完整试用", price: "$10/月起", pricingUrl: "https://wade.is/pricing" },
	"linken-sphere": { free: "免费计划", price: "$24/月起", pricingUrl: "https://ls.app/pricing" },
	camoufox: { free: "开源免费", price: "$0（开源）", pricingUrl: "https://camoufox.com/" },
	gpmlogin: { free: "7 天免费试用", price: "$125 起（终身授权）", pricingUrl: "https://gpmloginapp.com/en" },
	"browser-automation-studio": { free: "免费版", price: "$80/年（高级版）", pricingUrl: "https://bablosoft.com/shop/BrowserAutomationStudio" },
	lightpanda: { free: "$0/月；每月含 10 小时", price: "$19/月起", pricingUrl: "https://lightpanda.io/pricing" },
	roxybrowser: { free: "3 个档案免费试用", price: "$4.80/月起", pricingUrl: "https://roxybrowser.com/pricing" },
	nullprint: { free: "7 天试用", price: "$9/月起", pricingUrl: "https://nullprint.net/pricing/" },
	multizen: { free: "开源免费", price: "$0（MIT 开源）", pricingUrl: "https://getmultizen.com/" },
	donutbrowser: { free: "免费计划；本地档案永久免费", price: "$29/月起（Solo）", pricingUrl: "https://donutbrowser.com/pricing/" },
	"0detect": { free: "1 个档案免费计划", price: "免费计划；付费价格以官网为准", pricingUrl: "https://0detect.com/prices" },
	adblogin: { free: "无限本地档案永久免费", price: "$0（永久免费）", pricingUrl: "https://adblogin.com/" }
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
	return {
		name: row.name,
		slug: nameSlug,
		description: detail.description ?? `${row.name} 的浏览器环境与多账号资源整理`,
		longDescription: detail.longDescription ?? `${row.name} 的公开资源信息，包括状态、平台、浏览器内核和适用场景。使用前请以官方页面为准。`,
		free: detail.free ?? row.freePlan,
		price: normalizePrice(detail.price ?? row.price),
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
		cons: detail.cons ?? ["功能和套餐可能变化"],
		updatedAt,
		sourceUrl: `https://github.com/xxjrq/antidetect-browser-hub/blob/main/README.md#${nameSlug}`,
		pricingUrl: detail.pricingUrl ?? row.url,
		pricingCheckedAt,
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
	{
		title: "如何选择指纹浏览器",
		slug: "how-to-choose-antidetect-browser",
		description: "从环境隔离、平台、自动化和代理能力比较浏览器资源。",
		date: updatedAt,
		category: "选型指南",
		sourcePath: "docs/zh-CN/browsers.md",
		content: "选择指纹浏览器时，先确定账号数量、平台、是否需要团队协作和自动化，再比较环境隔离、代理协议、浏览器内核、存储方式与更新维护。价格和免费额度必须回到官方页面确认。",
		relatedBrowsers: ["easybr", "gologin", "adspower"],
		sections: [
			{
				heading: "先判断你是否真的需要指纹浏览器",
				body: "指纹浏览器的核心作用是让多个浏览器环境彼此隔离，并让每个环境的网络与设备信号保持内部自洽。它解决的是「环境复用」问题，而不是「隐藏」问题。\n\n在决定选型之前，建议先确认三件事：\n- 你是否确实需要同时维护多个互相独立的环境？如果只有一个账号且不涉及多平台运营，常规浏览器的隐私设置通常已经够用。\n- 你的目标平台是否对环境一致性有明确要求？不同平台的判定口径差异很大，不能一概而论。\n- 你的使用场景是否在目标平台的服务条款允许范围内。工具是否合规由使用场景决定，而不是由工具本身决定。\n\n如果这三项中有任意一项不成立，先解决它再谈选型，通常比换工具更有效。"
			},
			{
				heading: "六个应该逐项核对的判断依据",
				body: "不要按品牌印象或单价高低做决定。以下六项是真正拉开差距的维度，建议逐项记录结论：\n\n- 环境隔离方式：环境数据存在本地还是云端，决定了数据可迁移性和协作方式。本地优先的工具在断网时仍可使用，云端方案在跨设备协作上更方便。\n- 浏览器内核与版本策略：内核决定了指纹信号的基线。停更的旧内核会随着目标平台升级而逐步失效，选型时应确认厂商的内核跟进节奏。\n- 代理能力：至少要确认是否支持 HTTP、HTTPS、SOCKS5，是否支持代理绑定到单个环境，以及是否具备 DNS 处理选项。\n- 平台覆盖：Windows、macOS、Linux、Cloud 的组合要覆盖你实际的办公环境。\n- 自动化与 API：是否有稳定的接口、是否与主流自动化框架兼容，这决定你能否把手工流程沉淀成脚本。\n- 团队与权限：多成员协作时，最小权限、共享边界和变更记录比单人功能更重要。\n\n本站对比页中的平台、内核、存储、免费额度和起步价格字段，就是按这套口径整理的，可以直接作为核对清单使用。"
			},
			{
				heading: "用四步流程完成选型验证",
				body: "列清单 → 小样试用 → 价格核算 → 落地检查，按顺序走完，可以避免被单方面宣传带偏。\n\n第一步，列出硬性约束。包括环境数量上限、必须支持的平台、是否必须云端、是否需要 API。把不能妥协的项标成必选。\n\n第二步，用必选项筛出 2 到 3 个候选，用免费额度或最低档套餐实际创建环境。不要跳过这一步，文档写得好不等于实际行为一致。\n\n第三步，核算真实成本时按「环境数 × 单价 × 留存月数」计算，并单独列出代理流量费用。很多产品的价格结构里，代理是按 GB 另计的，这部分常常超过浏览器本身的订阅费。\n\n第四步，落地前做一次一致性检查：新建一个环境，分别在普通访问和目标场景下运行公开检测工具，记录 Canvas、WebGL、时区、语言、WebRTC 的结果。同一环境多次检测应当稳定，不应出现随机跳变。\n\n价格、套餐和功能均可能变化，本页所有价格信息请以对应官网当前页面为准。"
			},
			{
				heading: "四个常见误区",
				body: "- 把「评分高」直接等同于「适合我」。评分反映的是综合表现，与你的具体约束是否匹配是两回事。\n- 只比较价格，不计算代理成本。多账号场景下，代理流量费用常常是浏览器订阅费的两到三倍。\n- 相信「完全 undetectable」这类表述。不存在对所有站点都不可检测的工具，选择时应以实际检测结果为准，而不是以承诺为准。\n- 用一个环境同时跑多个账号。环境复用是账号串联最常见的原因，每个账号应绑定独立环境，并保持代理、语言、时区的长期一致。\n\n以上内容仅用于资源整理、隐私研究和合规的浏览器环境管理。请遵守目标平台条款与当地法律。"
			}
		]
	},
	{ title: "浏览器指纹是什么", slug: "browser-fingerprinting-explained", description: "理解 Canvas、WebGL、字体、时区、WebRTC 和网络信号。", date: updatedAt, category: "技术百科", sourcePath: "docs/zh-CN/fingerprint-technologies.md", content: "浏览器指纹不是单一字段，而是渲染、设备、语言、时区、网络和存储等多个信号的组合。单项检测只能说明一个维度，不能替代完整的安全或隐私评估。", sections: [
		{
			heading: "浏览器指纹到底是什么",
			body: "浏览器指纹不是某一个字段，而是一组可被网站读取的信号组合。打开页面时，浏览器会暴露渲染能力、设备参数、系统设置、语言、时区和网络特征等信息。站点把这些值拼接、哈希后，就能得到一个相对稳定的「环境标识」，用来判断两次访问是否来自同一个浏览器环境。\n\n它和 Cookie 最大的区别是：Cookie 存在本地、可以清除，而指纹来自环境本身，清除 Cookie 后仍然可能保持一致。正因如此，指纹常用于无 Cookie 追踪和风控识别。"
		},
		{
			heading: "为什么单点修改往往无效",
			body: "很多人只改 User-Agent 或只换一个字体，结果仍然被识别为同一环境。原因是风控看的是信号之间的「一致性」：时区设在东京、语言却是英文、Canvas 又呈现另一台机器的渲染特征，这种互相矛盾的组合反而更像伪装。\n\n有效的做法不是改单点，而是让一组信号彼此自洽，并保持在一段时间内稳定。临时切换参数比长期稳定更容易触发异常判定。"
		},
		{
			heading: "需要关注的信号维度",
			body: "常见维度可以分成几类：\n- 渲染类：Canvas、WebGL、AudioContext 的绘制差异。\n- 设备类：硬件并发数、内存、屏幕分辨率与色彩深度。\n- 系统类：操作系统、字体列表、时区、语言与区域。\n- 网络类：出口 IP、WebRTC 候选地址、DNS 解析路径。\n- 存储类：Cookie、LocalStorage、IndexedDB 之间的隔离关系。\n\n每一项单独看都只是碎片，组合在一起才构成可识别的环境画像。"
		},
		{
			heading: "两个常见误区",
			body: "- 认为「隐身模式」能消除指纹。隐身模式主要隔离本地存储，对渲染、字体、时区等环境信号几乎没有影响。\n- 认为指纹固定不变就是安全。信号长期不变确实更自然，但如果所有环境长得一模一样，反而失去区分度。目标是让每个环境自洽且彼此不同，而不是追求某个「标准」指纹。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。请遵守目标平台条款与当地法律。"
		}
	] },
	{ title: "EasyBR 代理配置要点", slug: "setting-up-proxies-easybr", description: "了解 HTTP、HTTPS、SOCKS5 代理配置和常见排查路径。", date: updatedAt, category: "使用教程", sourcePath: "docs/zh-CN/network-and-proxy.md", content: "配置代理时应确认协议、主机、端口、认证信息和 DNS/WebRTC 行为。先用公开检测工具验证出口 IP、DNS 和 WebRTC，再开始账号工作流。EasyBR 的当前字段和套餐以官网版本为准。", relatedBrowsers: ["easybr"], sections: [
		{
			heading: "配置前先确认三件事",
			body: "在填入任何代理信息之前，先把三件事写下来，避免凭记忆操作：\n- 协议类型：确认服务商提供的是 HTTP、HTTPS 还是 SOCKS5。三者配置入口和认证方式不同，填错会导致连接失败。\n- 用途边界：确认服务商允许的目标网站类型，这部分在合规层面比技术配置更重要。\n- DNS 行为：SOCKS5 是否由代理端解析域名，需要单独确认，不能默认它已经正确。\n\nEasyBR 的代理字段与套餐以官网当前版本为准，本文只描述通用排查思路。"
		},
		{
			heading: "推荐的配置与验证顺序",
			body: "按顺序走完，每一步都留下可复核的证据：\n\n第一步，先在没挂代理时记录基线公网 IP，作为对照。\n\n第二步，在 EasyBR 的环境设置里选择对应协议，填入主机、端口和认证信息。\n\n第三步，用普通 IP 查询页面确认出口 IP 已变为代理地址。这一步不通过就不用继续。\n\n第四步，用 DNS 泄漏检测工具确认查询由代理服务器发起。\n\n第五步，检查 WebRTC 候选地址，确认没有出现与代理不一致的真实地址。\n\n第六步，在目标场景里做一次实际连通性测试，并记录测试条件。"
		},
		{
			heading: "出问题时怎么排查",
			body: "- 完全连不上：先在系统命令行测试代理端口是否可达，再回头看客户端配置。端口不通属于网络层问题，与浏览器无关。\n- 能连但认证失败：检查协议类型是否选错，以及密码里的特殊字符是否需要编码。\n- 网页打不开但 IP 查询正常：通常是 DNS 解析位置的问题，启用远程解析后重试。\n- 部分站点异常：可能涉及目标站点对代理 IP 段的限制，属于出口 IP 信誉问题，不是配置错误。\n\n排查过程中不要把代理密码写进公开日志、工单截图或共享文档。"
		},
		{
			heading: "两个容易忽略的点",
			body: "- 「配置成功」不等于「没有泄漏」。代理只约束隧道内的流量，WebRTC 或某些后台请求可能不遵循代理设置，必须分别验证。\n- 长期使用应固定节点。频繁切换代理区域会让登录地频繁变化，本身就是一种异常信号，可能触发平台风控。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。价格、套餐和功能可能变化，请以对应官方网站当前信息为准。"
		}
	] },
	{ title: "多账号环境管理实践", slug: "multi-account-best-practices", description: "从环境隔离、代理一致性和权限管理降低账号串联风险。", date: updatedAt, category: "实践指南", sourcePath: "docs/zh-CN/use-cases.md", content: "多账号管理应为每个账号建立独立环境，保持代理、语言、时区和账号行为的一致性，限制共享凭据，并记录环境变更。仅在遵守平台规则和当地法律的范围内使用。", relatedBrowsers: ["easybr", "multilogin", "adspower"], sections: [
		{
			heading: "先建立隔离的边界",
			body: "多账号管理最底层的原则是「一账号一环境」。每个账号绑定独立的环境、独立的代理、独立的登录态，不在环境之间复用 Cookie 或缓存。\n\n环境复用是账号串联最常见的原因。很多被关联的案例，追溯下来都是两个账号共享了同一个指纹环境、同一个出口 IP，或同一份本地存储。隔离边界一旦建立，后续所有一致性操作才有意义。"
		},
		{
			heading: "保持信号长期一致",
			body: "隔离之后，关键是让每个环境的信号在长时间内保持稳定：\n- 代理：固定节点，避免频繁切换导致登录地跳动。\n- 语言与时区：与环境所属地区保持一致，例如北美环境用美式英语和对应时区。\n- 行为：操作节奏、设备使用习惯尽量贴近真实用户的自然分布。\n\n一致性不是「越像越好」，而是「自洽且稳定」。临时改参数比长期稳定更容易触发异常判定。"
		},
		{
			heading: "权限与变更记录",
			body: "团队协作时，按成员职责分配最小权限，避免共享主账号凭据，限制导出和删除操作。\n\n每次修改代理、扩展或环境配置，都留下可回溯的记录：谁、在什么时间、改了哪个环境的什么字段。出现关联时，这些记录是定位原因的唯一线索。\n\n凭据泄露应视为安全事件，立即轮换并审计受影响的环境。"
		},
		{
			heading: "三个常见误区",
			body: "- 认为「不同浏览器内核」就等于隔离。内核不同只是信号之一，如果两个环境的网络、语言、时区完全一致，仍可能被关联。\n- 只在出问题时才检查环境。应在日常工作中周期性用公开检测工具复验指纹与代理一致性。\n- 把工具能力等同于合规许可。是否合规由使用场景和平台条款决定，而不是由工具本身决定。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。请遵守目标平台条款与当地法律。"
		}
	] },
	{ title: "免费指纹浏览器怎么选", slug: "free-antidetect-browser", description: "从免费环境数量、平台限制、存储方式和功能边界比较免费方案。", date: updatedAt, category: "选型指南", sourcePath: "data/browsers.json", content: "免费方案适合先验证工作流，不代表永久拥有全部商业功能。比较时应同时看免费环境数量、数据是否本地保存、是否支持代理和自动化，以及升级后的价格。", relatedBrowsers: ["easybr", "gologin", "adspower"], sections: [
		{
			heading: "免费方案适合做什么",
			body: "免费额度最适合用来验证工作流：先确认工具的环境隔离、代理配置和检测表现是否符合预期，再决定是否付费扩容。它本质上是「试水」入口，不代表永久拥有全部商业功能。\n\n如果你的账号规模已经超过免费额度，强行挤在免费层通常会导致环境复用、导出受限或保留天数不足，反而增加运营风险。免费适合起步，不适合长期主力。"
		},
		{
			heading: "比较时要逐项核对",
			body: "不要只看「免费环境数量」这一个数字，至少还要看四项：\n- 数据保存位置：环境数据存在本地还是云端，决定离线可用性和数据自主管控。\n- 平台覆盖：免费档是否也支持你需要的 Windows、macOS、Linux 或移动端。\n- 代理与自动化：免费档是否允许绑定代理、是否开放 API 或自动化接口。\n- 保留与导出：免费环境是否限制保留天数、是否限制导出。\n\n本站对比页的免费额度、价格、平台、存储等字段，就是按这套口径整理的可核对清单。"
		},
		{
			heading: "核算真实成本",
			body: "免费升付费时，按「环境数 × 单价 × 留存月数」计算，并单独列出代理流量费用。多账号场景下，代理常按 GB 计费，可能超过浏览器本身的订阅费。\n\n价格、套餐和功能均可能变化，本文所有价格信息请以对应官网当前页面为准。不要凭记忆里的旧价格做预算。"
		},
		{
			heading: "三个常见误区",
			body: "- 把免费环境数量当成可用上限。免费档往往还有功能边界，例如限制自动化或导出，实际可用度低于数字本身。\n- 忽略保留规则。部分免费额度限制环境保留天数，到期前未升级可能丢失配置。\n- 在免费环境里跑真实主力账号。免费层限制多、稳定性弱，更适合测试，主力账号应放在付费且稳定的环境里。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。请遵守目标平台条款与当地法律。"
		}
	] },
	{ title: "本地存储与云端存储区别", slug: "local-vs-cloud-browser-storage", description: "理解浏览器环境数据放在本地或云端时的安全、协作与恢复差异。", date: updatedAt, category: "技术指南", sourcePath: "data/browsers.json", content: "本地存储通常便于控制数据位置和离线使用，云端存储更适合跨设备协作和集中管理。选择时要关注同步范围、备份机制、团队权限和供应商的隐私政策。", relatedBrowsers: ["easybr", "multilogin", "gologin"], sections: [
		{
			heading: "两种存储方式分别解决什么",
			body: "本地优先（local-first）把环境数据放在你自己的设备上，断网也能使用，数据位置和备份节奏由你控制，更适合重视数据自主管控的场景。\n\n云端存储把环境数据放在服务商一侧，跨设备登录即可拉起同一套环境，更适合多地、多设备协作和集中管理。代价是你需要信任服务商的存储安全和隐私政策，并依赖网络连接。"
		},
		{
			heading: "按你的优先级做选择",
			body: "可以从四个维度来比对：\n- 离线可用：本地优先在断网时仍可使用，云端依赖网络。\n- 协作便利：云端在跨设备、跨成员同步上更顺手。\n- 数据控制：本地优先对数据位置和删除节奏更有主动权。\n- 恢复能力：云端通常自带集中备份与恢复，本地需要你自己规划备份。\n\n本站对比页的「存储方式」字段会标注每个产品是本地优先、云端还是两者兼有，可以作为核对起点。"
		},
		{
			heading: "迁移与备份的注意点",
			body: "选定存储方式后，备份策略要跟上：本地优先的环境建议定期导出并异地保存，避免单设备损坏导致全部环境丢失；云端环境则要确认服务商的保留期限和导出能力，防止停服时无法取回数据。\n\n切换存储方式通常意味着重新创建环境，原环境的指纹与配置不会自动迁移，应提前规划。"
		},
		{
			heading: "两个常见误区",
			body: "- 认为云端一定更不安全。安全性取决于服务商的具体措施和你的使用习惯，不能一概而论。\n- 认为本地一定更可靠。本地设备一旦损坏且未备份，数据同样会丢失。\n\n无论选哪种，都请阅读供应商隐私政策，并在遵守目标平台条款与当地法律的前提下使用。"
		}
	] },
	{
		title: "WebRTC 泄漏如何检查",
		slug: "webrtc-leak-check",
		description: "使用公开工具检查 WebRTC 是否暴露本地或真实网络地址。",
		date: updatedAt,
		category: "排查指南",
		sourcePath: "data/technologies.json",
		content: "检查 WebRTC 时应分别观察公网地址、局域网地址、候选 ICE 路径和浏览器权限。不同浏览器、代理和系统设置的结果可能不同，应在实际工作环境中重复验证。",
		relatedTools: ["browserleaks", "iphey"],
		sections: [
			{
				heading: "WebRTC 泄漏指的是什么",
				body: "WebRTC 是浏览器内置的实时通信接口，最初用于音视频通话。为了建立连接，浏览器需要收集本机候选网络地址，并通过 ICE（Interactive Connectivity Establishment）协商出一条可用路径。\n\n问题在于，这条协商过程并不总是遵循代理。普通网页流量通常走 HTTP/HTTPS 代理，而 WebRTC 的候选收集可能直接询问网卡和系统接口，拿到真实公网地址、本地局域网地址，甚至在没有代理时把内网结构一并暴露。\n\n所谓「WebRTC 泄漏」，指的就是：你以为流量走了代理，实际上某些信号被绕过代理直接泄露。常见表现是检测页面同时显示代理 IP 和你的真实公网 IP，或者直接显示局域网地址。"
			},
			{
				heading: "需要分别观察的四类信号",
				body: "做一次有效的 WebRTC 检查，需要同时看四类结果，缺一不可：\n\n- 公网地址：应与代理出口 IP 一致。如果同时出现两个不同的公网 IP，说明存在泄漏。\n- 局域网地址：常见的 192.168.x.x、10.x.x.x、172.16~31.x.x。出现即代表内网结构暴露。\n- ICE 候选类型：分为 host、srflx、relay 三类。host 是本地地址，srflx 是通过 STUN 反射得到的地址，relay 是走 TURN 中继的地址。proxy 与 relay 通常是最安全的组合。\n- 权限与策略：不同浏览器对 WebRTC 的权限默认值不同，是否禁用 mDNS、是否限制候选收集，都会影响最终结果。\n\n单看某一个信号容易得出错误结论。判断依据是「是否出现与代理出口不一致的地址」，而不是「有没有出现 WebRTC」。"
			},
			{
				heading: "推荐的检查步骤",
				body: "在目标浏览器环境中，按以下顺序做一次完整检查：\n\n第一步，先在不挂代理的情况下打开检测页面，记录当前的公网 IP 和局域网地址，作为基线。这一步是为了确认你的真实网络身份。\n\n第二步，挂上代理后重新打开检测页面，对比公网 IP 是否已经变为代理出口 IP。\n\n第三步，检查局域网地址是否仍然出现。如果代理已经生效但内网地址依然可见，通常说明浏览器的 WebRTC 策略未收紧，需要在浏览器或指纹工具中调整。\n\n第四步，检查 ICE 候选类型分布，观察 host 类型候选是否被禁用。\n\n第五步，用第二个独立工具交叉验证。单一工具可能存在误报或漏报，两到三个工具结果一致时才值得采信。\n\n第六步，记录测试条件，包括浏览器版本、操作系统、代理类型和测试时间，便于后续复现。检测结果只在当时的网络条件下有效。"
			},
			{
				heading: "发现泄漏后怎么处理",
				body: "确认存在泄漏后，按影响程度依次处理：\n\n- 先排查代理是否真正生效。用普通 IP 查询页面确认出口 IP，如果这里就已经是真实 IP，问题在代理层而不是 WebRTC。\n- 代理已生效但仍有泄漏时，在指纹浏览器中检查 WebRTC 相关配置项，禁用 host 类型候选或直接禁用 WebRTC。禁用 WebRTC 会影响视频会议等场景，建议只在确有需要的账号上关闭。\n- 检查浏览器是否被授予了不必要的权限，麦克风、摄像头权限与 WebRTC 候选收集相关联。\n- 修改配置后必须重新检测确认，不能假设已经修复。\n\n需要注意，禁用 WebRTC 属于较强的限制手段，应根据实际业务需求权衡，并且始终遵守目标平台的条款与当地法律。"
			},
			{
				heading: "三个容易误判的地方",
				body: "- 看到局域网地址就直接判定失败。现代浏览器普遍启用了 mDNS 混淆，会把本地地址替换为随机生成的 .local 域名，此时看不到原始 IP 反而是正常的保护行为。\n- 只测一次就下结论。WebRTC 候选收集存在时序差异，偶尔的异常值不代表持续泄漏，建议在同一环境下重复检测三次以上。\n- 认为挂了代理就等于没有泄漏。代理解决的是流量路径问题，不一定同时约束 WebRTC 候选收集行为，这两者需要分别验证。"
			}
		]
	},
	{ title: "如何阅读 CreepJS 检测结果", slug: "read-creepjs-results", description: "理解 CreepJS 中的指纹、信任分数和环境一致性信号。", date: updatedAt, category: "检测指南", sourcePath: "data/tools.json", content: "CreepJS 适合研究浏览器暴露的多维信号。阅读结果时先区分事实数据、推断分数和风险提示，再结合 BrowserLeaks、Pixelscan 等工具交叉观察，避免把单一分数当作结论。", relatedTools: ["creepjs", "browserleaks", "pixelscan"], sections: [
		{
			heading: "先区分三类输出",
			body: "CreepJS 的结果可以分成三类，阅读时先分清楚：\n- 事实数据：浏览器实际暴露的字段值，例如字体列表、时区、语言、Canvas 噪声。这部分是可直接复现的测量值。\n- 推断分数：工具基于规则给出的信任度或一致性评分，属于启发式判断，不是客观事实。\n- 风险提示：对异常或矛盾信号的标记，需要结合你的真实配置来理解。\n\n把分数当成结论，往往会被单一工具的口径带偏。"
		},
		{
			heading: "重点看一致性，而不是分数高低",
			body: "更有价值的不是「分数高不高」，而是「信号之间是否自洽」。例如时区、语言、地区设置是否指向同一地点，渲染特征是否稳定。\n\n如果各项信号互相矛盾，即使总分看起来不错，也可能比信号一致但分数一般的环境更可疑。一致性是判断环境是否「自然」的核心。"
		},
		{
			heading: "用交叉验证提高可信度",
			body: "不要只信一个工具。用 BrowserLeaks、Pixelscan 等相互独立的检测页对同一环境复测，观察关键字段是否一致。\n\n出现分歧时，先记录测试条件：浏览器版本、操作系统、代理类型和测试时间。检测结果只在当时的网络与设备条件下有效，环境变更后应重新测试。"
		},
		{
			heading: "两个常见误区",
			body: "- 把「分数好」等同于「安全」。分数只是工具视角，不代表目标站点的判定口径。\n- 测一次就下结论。浏览器更新、系统变更、代理切换都会改变结果，建议在同一环境下重复检测并留存记录。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。请遵守目标平台条款与当地法律。"
		}
	] },
	{ title: "如何配置 HTTP 代理", slug: "configure-http-proxy", description: "整理 HTTP/HTTPS 代理的字段、认证方式和连通性检查步骤。", date: updatedAt, category: "网络指南", sourcePath: "data/network-and-proxy.md", content: "HTTP 代理配置至少包含协议、主机、端口和认证信息。保存前先确认端口可达，保存后检查出口 IP、DNS 和 HTTPS 访问，避免把代理密码写入公开日志。", relatedBrowsers: ["easybr", "adspower"], sections: [
		{
			heading: "HTTP 代理的四个字段",
			body: "配置 HTTP/HTTPS 代理时，至少确认四项：\n- 协议：明确是 HTTP 还是 HTTPS 入口，两者认证与加密方式不同。\n- 主机与端口：注意区分 IP 与域名形式，部分服务商对形式有要求。\n- 认证信息：用户名与密码，密码中的特殊字符有时需要 URL 编码。\n- 用途边界：确认服务商允许代理的目标网站类型，这在合规层面比技术配置更重要。\n\n填写前先逐项核对，不要凭记忆填入。"
		},
		{
			heading: "保存前的连通性检查",
			body: "在浏览器里保存配置之前，建议先在系统命令行测试代理端口是否可达，避免把网络层问题误判成客户端故障。\n\n端口不通属于网络层问题，与浏览器无关；端口通了再进行下一步，能大幅缩小排查范围。这一步能省掉后面大量无效的配置调试。"
		},
		{
			heading: "保存后的三层验证",
			body: "保存配置后，按顺序验证三层：\n\n第一步，用普通 IP 查询页面确认出口 IP 已变为代理地址。这一步不通过，后续都没意义。\n\n第二步，检查 DNS 解析是否走代理通道，避免本地运营商 DNS 暴露。\n\n第三步，访问目标 HTTPS 站点，确认证书与加载正常。\n\n三层都通过，才说明 HTTP 代理真正生效。"
		},
		{
			heading: "两个安全提醒",
			body: "- 不要把代理密码写入公开日志、工单截图或共享文档。凭据泄露应视为安全事件处理。\n- HTTP 代理不保证处理 WebRTC 候选收集。代理解决流量路径，WebRTC 可能绕过，需要单独检测。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。价格、套餐和功能可能变化，请以对应官方网站当前信息为准。"
		}
	] },
	{
		title: "如何配置 SOCKS5 代理",
		slug: "configure-socks5-proxy",
		description: "说明 SOCKS5 代理的配置要点、DNS 行为和常见故障。",
		date: updatedAt,
		category: "网络指南",
		sourcePath: "data/network-and-proxy.md",
		content: "SOCKS5 更接近传输层转发，但是否代理 DNS 取决于客户端实现。配置后应分别检查网页访问、DNS 泄漏和 WebRTC 候选地址，并确认代理服务商允许对应用途。",
		relatedBrowsers: ["easybr", "gologin"],
		sections: [
			{
				heading: "SOCKS5 与 HTTP 代理的区别",
				body: "很多人在排查网络问题时，会把 SOCKS5 和 HTTP 代理当成同一种东西，但两者的架构并不相同。\n\nHTTP 代理工作在应用层，浏览器明确知道自己在和代理通信，因此代理对网页流量的控制是确定的。\n\nSOCKS5 工作在传输层，客户端与代理之间建立的是通用隧道。这个架构带来一个直接后果：DNS 解析行为不由协议强制规定，而取决于客户端实现。\n\n具体来说，解析请求默认在本地完成，此时 DNS 查询走的是本地网络的解析路径，与代理无关。只有当客户端明确启用远程解析时，DNS 查询才会一并通过隧道发给代理服务器处理。\n\n这就是为什么同一台机器、同一份 SOCKS5 配置，在不同客户端下可能得到完全不同的泄漏结果。配置 SOCKS5 时必须把 DNS 解析位置当成一个独立检查项，而不是默认它已经正确。"
			},
			{
				heading: "配置前需要确认的四个字段",
				body: "配置代理前，先把这四项逐一确认，不要凭记忆填写：\n\n- 协议类型：确认服务商提供的是 SOCKS5 而不是 SOCKS4 或 HTTP。SOCKS4 不支持认证和 UDP，配置错误会导致认证失败。\n- 主机与端口：注意区分 IP 和域名形式，部分服务商对形式有要求。\n- 认证信息：用户名与密码，注意密码中包含特殊字符时是否需要 URL 编码。\n- 代理用途限制：确认服务商允许代理的目标网站类型。这一点在合规层面比技术配置更重要。\n\n另外需要确认 DNS 解析选项的位置。不同客户端把它放在「代理设置」「网络设置」或「高级选项」中，命名不统一，但含义一致：是否由代理端解析域名。"
			},
			{
				heading: "配置与验证步骤",
				body: "按以下顺序操作，每一步都留下可复核的证据：\n\n第一步，先在未配置代理的环境下记录基线公网 IP，作为对照。\n\n第二步，在浏览器或指纹工具的代理设置中选择 SOCKS5 类型，填入主机、端口和认证信息。明确启用远程 DNS 解析选项。\n\n第三步，用普通 IP 查询页面确认出口 IP 已变为代理地址。这一步不通过就不用继续，后续测试都没有意义。\n\n第四步，使用 DNS 泄漏检测工具，确认查询由代理服务器发起，而不是本地解析器。如果检测结果显示本地运营商的 DNS 服务器，说明远程解析没有生效。\n\n第五步，检查 WebRTC 候选地址，确认没有出现与代理不一致的真实地址。SOCKS5 不保证处理 WebRTC，需要单独验证。\n\n第六步，进行实际业务场景的连通性测试，包括目标站点的访问、多媒体加载和表单提交。\n\n第七步，记录测试条件与核验日期，包括服务商、节点区域、测试时间和所用检测工具。"
			},
			{
				heading: "常见故障与排查顺序",
				body: "遇到问题时，按从底层到上层的顺序排查，不要跳跃：\n\n- 完全无法连接：先在系统命令行测试代理端口是否可达，再检查客户端配置。端口不通属于网络层问题，与浏览器无关。\n- 能连接但认证失败：检查协议类型是否选错，以及密码中的特殊字符是否需要编码。\n- 网页打不开但 IP 查询正常：通常是 DNS 解析位置的问题，启用远程解析后重试。\n- 部分站点正常部分异常：可能涉及目标站点对代理 IP 段的限制，属于出口 IP 信誉问题，不是配置错误。\n- 时通时断：检查节点稳定性，以及是否在代理流量达到服务商限额后被限速。\n\n排查过程中不要把代理密码写入公开日志、工单截图或共享文档。凭据泄露应视为安全事件处理。"
			},
			{
				heading: "两个容易被忽略的边界",
				body: "- 「配置成功」不等于「没有泄漏」。SOCKS5 只约束隧道内的流量，WebRTC、部分应用的后台请求可能不遵循代理设置，这两者必须分别验证。\n- 长期使用时应固定节点。频繁切换代理区域会导致登录地频繁变化，本身就是一种异常信号，可能触发平台的风控机制。\n\n本文仅用于资源整理、隐私研究和合规的浏览器环境管理。价格、套餐和功能可能变化，请以对应官方网站当前信息为准。"
			}
		]
	},
	{ title: "浏览器指纹包含哪些信息", slug: "browser-fingerprint-signals", description: "按渲染、设备、系统、语言、网络和存储六类理解指纹信号。", date: updatedAt, category: "技术百科", sourcePath: "data/technologies.json", content: "常见指纹信号包括 Canvas、WebGL、字体、屏幕、时区、语言、硬件并发数、TLS、IP 信誉和存储状态。它们通常被组合分析，不能只修改一个字段来代表完整环境。", relatedTools: ["creepjs", "browserleaks"], sections: [
		{
			heading: "六类信号分别是什么",
			body: "浏览器指纹可以从六个维度理解：\n- 渲染类：Canvas、WebGL、AudioContext 的绘制与计算差异。\n- 设备类：硬件并发数、内存、屏幕分辨率、色彩深度。\n- 系统类：操作系统、字体列表、时区、语言与区域设置。\n- 语言类：界面语言、可接受语言列表、拼写与区域格式。\n- 网络类：出口 IP 与信誉、WebRTC 候选地址、DNS 解析路径、TLS 握手特征。\n- 存储类：Cookie、LocalStorage、IndexedDB 之间的隔离关系。"
		},
		{
			heading: "为什么组合分析才有效",
			body: "单个字段的区分度有限，真正有识别力的是字段之间的组合与一致性。例如，某台机器的 Canvas 噪声可能和成千上万台相似，但「Canvas 噪声 + 字体集合 + 时区 + 屏幕参数」的组合，重复概率就低得多。\n\n这也是为什么只改一个字段往往无效：风控看的是整体画像，而不是某一个值。"
		},
		{
			heading: "如何用信号做一致性检查",
			body: "管理多账号环境时，可以用这六类信号做日常核对：新建环境后，用公开检测工具观察每类信号是否落在预期范围内，并记录基线。\n\n后续复测时对比基线，信号跳变可能意味着配置被重置或代理异常。同样的环境多次检测应当稳定，不应出现随机变化。"
		},
		{
			heading: "两个常见误区",
			body: "- 认为改掉某个「关键字段」就能焕然一新。信号是组合生效的，单点修改容易被其他字段暴露。\n- 认为信号越多越危险。风险不在于信号数量，而在于信号之间是否自洽、是否长期稳定。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。请遵守目标平台条款与当地法律。"
		}
	] },
	{ title: "多账号浏览器的权限管理", slug: "browser-profile-permissions", description: "为团队环境设置最小权限、共享边界和变更记录。", date: updatedAt, category: "实践指南", sourcePath: "data/use-cases.json", content: "团队使用多账号浏览器时，应按成员职责分配最小权限，避免共享主账号凭据，限制导出和删除操作，并记录代理、扩展和环境配置的变更。", relatedBrowsers: ["easybr", "multilogin", "adspower"], sections: [
		{
			heading: "按职责分配最小权限",
			body: "团队使用多账号浏览器时，权限应遵循「最小够用」原则：每个成员只拿到完成工作所必需的環境与操作权，而不是全站管理员。\n\n常见的权限维度包括：环境查看、环境编辑、代理管理、扩展安装、导出与删除。把高风险操作（导出、删除、修改代理）限制在少数人手里，能显著降低误操作与凭据泄露的波及面。"
		},
		{
			heading: "划清共享边界",
			body: "避免共享主账号凭据，改用成员子账号或团队工作区来协作。共享主账号会让所有操作无法追溯到个人，一旦出问题无从定责。\n\n环境之间也要划清边界：哪些环境属于哪个成员或项目，谁可以临时借用，借用的期限是多久。边界模糊是多账号运营混乱的常见根源。"
		},
		{
			heading: "保留变更记录",
			body: "对代理、扩展和环境配置的每一次修改，都应记录：谁、在什么时间、改了哪个环境的什么字段。这些记录不必复杂，但要在出现关联或异常时能被快速检索到。\n\n凭据泄露应视为安全事件，立即轮换并审计受影响的环境。变更记录是定位原因的唯一可靠线索。"
		},
		{
			heading: "两个常见误区",
			body: "- 认为「信任成员」就不需要权限分级。权限分级是为了降低误操作与账号泄露的波及范围，与信任无关。\n- 认为配置一次就不用再管。代理失效、扩展更新、成员变动都会改变风险面，应定期复核权限与共享边界。\n\n本文仅用于资源整理、隐私研究与合规的浏览器环境管理。请遵守目标平台条款与当地法律。"
		}
	] }
];

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

// Attach the generated, data-driven "逐项核对清单" sections (see comparison-sections.ts).
// These are Chinese-only prose, so the locale routes render them on zh-cn only.
export const comparisons: ComparisonResource[] = rawComparisons.map(comparison => ({
	...comparison,
	sections: comparisonSections[comparison.slug]
}));

export const browserBySlug = (slug: string) => browsers.find(browser => browser.slug === slug);
export const toolBySlug = (slug: string) => tools.find(tool => tool.slug === slug);
export const technologyBySlug = (slug: string) => technologies.find(technology => technology.slug === slug);
export const guideBySlug = (slug: string) => guides.find(guide => guide.slug === slug);
