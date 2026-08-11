import { Check } from "lucide-react";

export const metadata = { title: "关于项目", description: "BrowserHub 指纹浏览器、检测工具和隐私资源项目说明。", alternates: { canonical: "/about/" } };

const principles = ["优先链接官方页面。", "产品价格和功能以官方信息为准。", "特色推荐会明确标注，不伪装成客观排名。"];

export default function AboutPage() {
	return (
		<div className="container py-16 sm:py-20">
			<article className="mx-auto max-w-3xl">
				<p className="eyebrow">About</p>
				<h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">关于项目</h1>
				<p className="mt-6 text-lg leading-8 text-muted-foreground">这是一个面向开发者、跨境团队和隐私研究者的指纹浏览器与浏览器技术资源库。项目优先整理公开资料，区分事实、编辑说明和特色推荐。</p>
				<div className="mt-12 border-t pt-10">
					<p className="eyebrow">Principles</p>
					<h2 className="mt-3 text-xl font-semibold tracking-tight">维护原则</h2>
					<ul className="mt-5 space-y-3">
						{principles.map((principle) => (
							<li key={principle} className="flex items-start gap-3 text-muted-foreground">
								<Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
								{principle}
							</li>
						))}
					</ul>
				</div>
			</article>
		</div>
	);
}
