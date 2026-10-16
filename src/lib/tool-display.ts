import type { ToolResource } from "@/data/resources";

const english: Record<string, string> = {
	"Canvas": "Canvas", "WebGL": "WebGL", "WebRTC 泄漏": "WebRTC exposure", "DNS 泄漏": "DNS leaks", "字体指纹": "Font fingerprinting", "指纹分析": "Fingerprint analysis", "信任信号": "Trust heuristics", "自动化相关信号": "Automation signals", "隐私指标": "Privacy indicators", "机器人信号": "Bot signals", "环境检查": "Environment checks", "指纹观察": "Fingerprint observations", "唯一性研究": "Uniqueness research", "浏览器信号分析": "Browser signal analysis", "Chromium、Firefox、WebKit": "Chromium, Firefox, WebKit", "自动等待": "Auto-waiting", "网络拦截": "Network interception", "移动端模拟": "Mobile emulation", "并行测试": "Parallel testing", "截图": "Screenshots", "PDF 生成": "PDF generation", "表单自动化": "Form automation", "UI 测试": "UI testing", "WebDriver 标准": "WebDriver standards", "多语言": "Multiple programming languages", "成熟生态": "Established ecosystem", "公开检测或自动化能力": "Public testing or automation capabilities", "官方文档与示例": "Official documentation and examples"
};

export function toolDisplay(tool: ToolResource, locale: string): ToolResource {
	if (locale === "zh-cn") return tool;
	return { ...tool, category: tool.categorySlug.replace(/-/g, " "), features: tool.features.map(feature => english[feature] ?? feature), pricing: "Check official pricing" };
}
