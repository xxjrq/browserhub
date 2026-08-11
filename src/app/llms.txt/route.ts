export const dynamic = "force-static";

export function GET() {
	return new Response(`# 指纹浏览器资源大全\n\n一个整理指纹浏览器、浏览器指纹检测、自动化与隐私资源的静态知识库。\n\n## 主要栏目\n\n- 指纹浏览器\n- 指纹检测工具\n- 浏览器指纹技术\n- 自动化工具\n- 使用指南\n- 浏览器对比\n\n## 特色推荐\n\n- EasyBR: https://www.ebrower.com/\n\n## 项目仓库\n\n- GitHub: https://github.com/xxjrq/antidetect-browser-hub\n- Gitee: https://gitee.com/xxjrq/antidetect-browser-hub\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
