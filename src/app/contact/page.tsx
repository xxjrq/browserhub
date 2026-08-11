import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "联系与贡献", description: "通过 GitHub、Gitee、Telegram 和 QQ 群联系 BrowserHub 项目。", alternates: { canonical: "/contact/" } };

const channels = [
	{ name: "GitHub Issues", description: "提交资源、修正和功能建议", href: "https://github.com/xxjrq/antidetect-browser-hub/issues" },
	{ name: "Telegram 社区", description: "资源交流与更新通知", href: "https://t.me/+_y3DoCss8dplY2Fl" },
	{ name: "QQ群", description: "967818141 · EasyBR 指纹浏览器交流社区" },
	{ name: "Gitee", description: "中文镜像与协作入口", href: "https://gitee.com/xxjrq/antidetect-browser-hub" }
];

const cardClass = "group rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.18)] dark:hover:shadow-[0_10px_30px_-14px_rgb(0_0_0/0.7)]";

export default function ContactPage() {
	return (
		<div className="container py-16 sm:py-20">
			<article className="mx-auto max-w-3xl">
				<p className="eyebrow">Contact</p>
				<h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">联系与贡献</h1>
				<p className="mt-6 text-lg leading-8 text-muted-foreground">欢迎提交官方链接、资源修正、翻译和内容建议。提交时请附上来源 URL、修改理由和适用语言。</p>
				<div className="mt-10 grid gap-4 sm:grid-cols-2">
					{channels.map((channel) => {
						const content = (
							<>
								<span className="flex items-center justify-between gap-2">
									<strong className="font-semibold tracking-tight">{channel.name}</strong>
									{channel.href ? <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" /> : null}
								</span>
								<span className="mt-2 block text-sm text-muted-foreground">{channel.description}</span>
							</>
						);
						return channel.href ? (
							<a key={channel.name} className={cardClass} href={channel.href} target="_blank" rel="noopener noreferrer">
								{content}
							</a>
						) : (
							<div key={channel.name} className="rounded-xl border bg-card p-5">
								{content}
							</div>
						);
					})}
				</div>
			</article>
		</div>
	);
}
