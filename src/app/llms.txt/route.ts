import { browsers, comparisons, guides, tools } from "@/data/resources";

export const dynamic = "force-static";

const browserTypeLabel: Record<string, string> = { commercial: "商业", "open-source": "开源", freemium: "免费增值", free: "免费" };

function browserLine(b: (typeof browsers)[number]) {
	const type = browserTypeLabel[b.type] ?? b.type;
	const platforms = b.platforms.join("、");
	const capabilities = [
		b.proxy ? "支持代理" : "",
		b.api || b.automation ? "API 与自动化" : "",
		b.storage && b.storage !== "以官网为准" ? `${b.storage}存储` : ""
	].filter(Boolean).join("、");
	const tail = capabilities ? `；${capabilities}。` : "。";
	return `- ${b.name} — ${type}指纹浏览器；${b.free}；${b.price}；平台：${platforms}${tail}`;
}

export function GET() {
	const browserFacts = browsers.map(browserLine).join("\n");
	const compareList = comparisons.map(c => c.title).join("、");
	const guideList = guides.map(g => `- ${g.title}（${g.category}）`).join("\n");
	const toolFacts = tools.slice(0, 12).map(t => `- ${t.name} — ${t.category}`).join("\n");

	const body = `# BrowserHub 指纹浏览器资源大全

BrowserHub is an independent, open research hub for anti-detect (fingerprint) browsers, detection & automation tools, proxy and privacy technologies. It compares public, verifiable product facts so individuals, growth teams and developers can evaluate multi-account and privacy tooling. Pricing and features change — always confirm on the official site.

## 关于 BrowserHub / About
BrowserHub（中文名「指纹浏览器资源大全」）是一个独立的开源资料站，统一整理反检测浏览器、浏览器指纹检测、自动化框架、代理与隐私技术。所有数据以公开信息为准，帮助跨境电商、社媒运营、安全研究与开发者对比多账号浏览器的免费额度、价格、平台、存储、代理与自动化能力。

## 覆盖内容 / What we cover
- 反检测 / 指纹浏览器（多账号环境隔离）
- 指纹检测与机器人检测工具
- 自动化框架（Playwright、Puppeteer、Selenium）
- 浏览器指纹信号（Canvas、WebGL、WebRTC、TLS、时区、语言、存储）
- 实用指南（浏览器选型、代理配置、多账号最佳实践）
- 热门浏览器横向对比

## 收录浏览器（关键事实）/ Browsers tracked
${browserFacts}

## 检测与自动化工具（节选）/ Tools (sample)
${toolFacts}

## 热门对比 / Popular comparisons
${compareList}

## 使用指南 / Guides
${guideList}

## 常见问题 / FAQ
Q: 什么是指纹浏览器 / 反检测浏览器？
A: 一类通过隔离 Cookie、缓存与指纹参数（Canvas、WebGL、时区、语言、WebRTC 等）来降低账号关联风险的浏览器环境工具，常用于多账号管理与隐私研究。

Q: 免费和付费怎么选？
A: 免费方案适合先验证工作流；商业场景应比较免费环境数量、是否本地存储、代理与自动化支持，以及升级后的价格。最终以各官网为准。

Q: 数据来源是否权威？
A: BrowserHub 仅整理公开资料，价格、套餐与功能可能变化，一切以各产品官网当前信息为准。

## 项目与链接 / Links
- 站点：https://browserhub.co/
- GitHub：https://github.com/xxjrq/antidetect-browser-hub
- Gitee：https://gitee.com/xxjrq/antidetect-browser-hub
- EasyBR（关联产品）：https://www.ebrower.com/
`;

	return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
}
