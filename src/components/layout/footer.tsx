import Link from "next/link";
import Image from "next/image";

const resources = [
	{ name: "指纹浏览器", href: "/browsers/" },
	{ name: "检测工具", href: "/tools/" },
	{ name: "指纹技术", href: "/fingerprint/" },
	{ name: "指南与教程", href: "/guides/" },
	{ name: "浏览器对比", href: "/compare/" }
];

const project = [
	{ name: "关于项目", href: "/about/" },
	{ name: "联系与贡献", href: "/contact/" },
	{ name: "隐私说明", href: "/privacy/" }
];

const community = [
	{ name: "GitHub", href: "https://github.com/xxjrq/antidetect-browser-hub" },
	{ name: "Gitee", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
	{ name: "Telegram 社区", href: "https://t.me/+_y3DoCss8dplY2Fl" },
	{ name: "EasyBR 官网", href: "https://www.ebrower.com/?utm_source=browserhub&utm_medium=referral&utm_campaign=resource_hub" }
];

export function Footer() {
	return (
		<footer className="border-t">
			<div className="container py-14">
				<div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="max-w-xs space-y-4">
						<Link href="/" className="flex items-center gap-2.5">
							<Image src="/brand/browserhub-mark.svg" alt="" width={24} height={24} />
							<span className="text-[15px] font-semibold tracking-tight">BrowserHub</span>
						</Link>
						<p className="text-sm leading-6 text-muted-foreground">中立收录指纹浏览器、检测工具、自动化框架与隐私技术资源，信息以官方页面为准。</p>
						<p className="font-mono text-[11px] tracking-wide text-muted-foreground/70 uppercase">Neutral · Curated · Independent</p>
					</div>
					<nav aria-label="资源页脚导航">
						<h2 className="eyebrow mb-4">资源</h2>
						<ul className="space-y-2.5">{resources.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.name}</Link></li>)}</ul>
					</nav>
					<nav aria-label="项目页脚导航">
						<h2 className="eyebrow mb-4">项目</h2>
						<ul className="space-y-2.5">{project.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.name}</Link></li>)}</ul>
					</nav>
					<nav aria-label="社区页脚导航">
						<h2 className="eyebrow mb-4">社区与产品</h2>
						<ul className="space-y-2.5">
							{community.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.name}</a></li>)}
							<li><span className="text-sm text-muted-foreground">QQ 群：967818141</span></li>
						</ul>
					</nav>
				</div>
				<div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
					<p>© {new Date().getFullYear()} BrowserHub</p>
					<p className="font-mono tracking-wide">信息仅供资源整理与研究参考 · 价格与功能以官方页面为准</p>
				</div>
			</div>
		</footer>
	);
}
