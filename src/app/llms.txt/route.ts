export const dynamic = "force-static";

export function GET() {
	return new Response(`# BrowserHub 指纹浏览器资源大全\n\nBrowserHub 整理指纹浏览器、浏览器指纹检测、自动化、代理与隐私资源。状态、价格和功能以官方页面为准。\n\n## 主要栏目\n\n- [指纹浏览器](https://browserhub.co/browsers/)\n- [指纹检测与自动化工具](https://browserhub.co/tools/)\n- [浏览器指纹技术](https://browserhub.co/fingerprint/)\n- [使用指南](https://browserhub.co/guides/)\n- [浏览器对比](https://browserhub.co/compare/)\n- [联系与贡献](https://browserhub.co/contact/)\n\n## 特色推荐\n\n- [EasyBR 详情](https://browserhub.co/browsers/easybr/)（本站关联产品）\n- [EasyBR 官网](https://www.ebrower.com/)\n\n## 项目仓库\n\n- [GitHub 资源库](https://github.com/xxjrq/antidetect-browser-hub)\n- [Gitee 资源库](https://gitee.com/xxjrq/antidetect-browser-hub)\n`, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
}
