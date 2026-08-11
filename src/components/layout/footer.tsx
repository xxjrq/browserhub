import Link from "next/link";
import { Shield } from "lucide-react";

const resources = [
	{ name: "浏览器", href: "/browsers/" },
	{ name: "检测工具", href: "/tools/" },
	{ name: "指纹技术", href: "/fingerprint/" },
	{ name: "指南", href: "/guides/" }
];

export function Footer() {
	return <footer className="border-t bg-muted/50"><div className="container py-12"><div className="grid gap-8 md:grid-cols-4"><div className="space-y-4"><Link href="/" className="flex items-center gap-2"><Shield className="h-6 w-6 text-primary" aria-hidden="true" /><span className="text-lg font-bold">指纹浏览器资源库</span></Link><p className="text-sm leading-6 text-muted-foreground">整理指纹浏览器、检测工具、自动化与隐私技术资源。</p></div><div><h2 className="mb-4 text-sm font-semibold">资源</h2><ul className="space-y-2">{resources.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.name}</Link></li>)}</ul></div><div><h2 className="mb-4 text-sm font-semibold">项目</h2><ul className="space-y-2"><li><Link href="/about/" className="text-sm text-muted-foreground hover:text-foreground">关于项目</Link></li><li><Link href="/contact/" className="text-sm text-muted-foreground hover:text-foreground">联系与贡献</Link></li><li><Link href="/privacy/" className="text-sm text-muted-foreground hover:text-foreground">隐私说明</Link></li></ul></div><div><h2 className="mb-4 text-sm font-semibold">社区</h2><ul className="space-y-2"><li><a href="https://github.com/xxjrq/antidetect-browser-hub" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a></li><li><a href="https://gitee.com/xxjrq/antidetect-browser-hub" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Gitee</a></li><li><a href="https://www.ebrower.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">EasyBR官网</a></li></ul></div></div><div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground"><p>© {new Date().getFullYear()} 指纹浏览器资源库 · 信息仅供资源整理与研究参考</p></div></div></footer>;
}
