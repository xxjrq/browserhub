"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { footer, localeFromPath, localePath, locales } from "@/lib/locale-ui";

/**
 * Locale-aware footer.
 *
 * The footer renders inside the root layout, so it appears on every URL. It used to
 * hard-code Chinese links and headings, which put a Chinese navigation block at the
 * bottom of all 956 non-Chinese pages and contradicted the <title>/hreflang language
 * promise. Copy now comes from `footer(locale)`; internal links keep the visitor in
 * the locale they arrived in.
 */
export function Footer() {
	const pathname = usePathname();
	const locale = localeFromPath(pathname);
	const copy = footer(locale);
	const isLocalized = locales.some(item => pathname === `/${item}` || pathname.startsWith(`/${item}/`));
	const href = (path: string) => (isLocalized ? localePath(locale, path) : `/${path}/`);

	const resources = [
		{ name: copy.links.browsers, href: href("browsers") },
		{ name: copy.links.tools, href: href("tools") },
		{ name: copy.links.fingerprint, href: href("fingerprint") },
		{ name: copy.links.guides, href: href("guides") },
		{ name: copy.links.compare, href: href("compare") }
	];

	const project = [
		{ name: copy.links.about, href: href("about") },
		{ name: copy.links.contact, href: href("contact") },
		{ name: copy.links.privacy, href: href("privacy") }
	];

	const community = [
		{ name: "GitHub", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Gitee", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: copy.links.telegram, href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: copy.links.easybr, href: "https://www.ebrower.com/?utm_source=browserhub&utm_medium=referral&utm_campaign=resource_hub" }
	];

	return (
		<footer className="border-t">
			<div className="container py-14">
				<div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="max-w-xs space-y-4">
						<Link href={isLocalized ? localePath(locale) : "/"} className="flex items-center gap-2.5">
							<Image src="/brand/browserhub-mark.svg" alt="" width={24} height={24} />
							<span className="text-[15px] font-semibold tracking-tight">BrowserHub</span>
						</Link>
						<p className="text-sm leading-6 text-muted-foreground">{copy.tagline}</p><p className="text-xs leading-6 text-muted-foreground" lang={locale === "zh-cn" ? "zh-CN" : "en"}>{locale === "zh-cn" ? "EasyBR 为关联产品。" : "EasyBR is an affiliated product."} <Link href={href("about")} className="underline underline-offset-4">{locale === "zh-cn" ? "编辑与披露政策" : "Editorial policy"}</Link></p>
						<p className="font-mono text-[11px] tracking-wide text-muted-foreground/70 uppercase">Curated · Sources disclosed</p>
					</div>
					<nav aria-label={copy.sections.resources}>
						<h2 className="eyebrow mb-4">{copy.sections.resources}</h2>
						<ul className="space-y-2.5">{resources.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.name}</Link></li>)}</ul>
					</nav>
					<nav aria-label={copy.sections.project}>
						<h2 className="eyebrow mb-4">{copy.sections.project}</h2>
						<ul className="space-y-2.5">{project.map(link => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.name}</Link></li>)}</ul>
					</nav>
					<nav aria-label={copy.sections.community}>
						<h2 className="eyebrow mb-4">{copy.sections.community}</h2>
						<ul className="space-y-2.5">
							{community.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.name}</a></li>)}
							<li><span className="text-sm text-muted-foreground">{copy.links.qq}</span></li>
						</ul>
					</nav>
				</div>
				<div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
					<p>© {new Date().getFullYear()} BrowserHub</p>
					<p className="font-mono tracking-wide">{copy.disclaimer}</p>
				</div>
			</div>
		</footer>
	);
}