export const metadata = { title: "隐私说明", description: "BrowserHub 静态站的隐私说明。", alternates: { canonical: "/privacy/" } };

export default function PrivacyPage() {
	return (
		<div className="container py-16 sm:py-20">
			<article className="mx-auto max-w-3xl">
				<p className="eyebrow">Privacy</p>
				<h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">隐私说明</h1>
				<p className="mt-6 text-lg leading-8 text-muted-foreground">本站第一版为静态内容站，不要求登录，不收集浏览器配置，不提供用户数据后台。第三方链接会跳转到对应服务商的页面，请在使用前阅读对方的隐私政策。</p>
			</article>
		</div>
	);
}
