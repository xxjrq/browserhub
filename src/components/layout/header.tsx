"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Languages, Menu, Moon, Search, Sun, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
	{ name: "浏览器", href: "/browsers/" },
	{ name: "检测工具", href: "/tools/" },
	{ name: "指纹技术", href: "/fingerprint/" },
	{ name: "指南", href: "/guides/" },
	{ name: "对比", href: "/compare/" }
];

export function Header() {
	const [open, setOpen] = useState(false);
	const [dark, setDark] = useState(false);

	useEffect(() => {
		const saved = window.localStorage.getItem("browsertools-theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const enabled = saved ? saved === "dark" : prefersDark;
		window.requestAnimationFrame(() => setDark(enabled));
	}, []);
	useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

	const toggleTheme = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		window.localStorage.setItem("browsertools-theme", next ? "dark" : "light");
	};

	return <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
		<div className="container flex h-16 items-center justify-between gap-4">
			<Link href="/" className="flex min-w-0 shrink-0 items-center gap-2" onClick={() => setOpen(false)}><Image src="/brand/browserhub-mark.svg" alt="" width={28} height={28} priority /><span className="truncate text-lg font-bold">指纹浏览器资源库</span></Link>
			<nav className="hidden items-center gap-1 md:flex" aria-label="主导航">{navigation.map(item => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">{item.name}</Link>)}</nav>
			<div className="flex items-center gap-1">
				<Link href="/browsers/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden md:inline-flex")} aria-label="浏览器资源"><Search className="h-5 w-5" /></Link>
				<Link href="/en/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden md:inline-flex")} aria-label="切换到英文"><Languages className="h-5 w-5" /></Link>
				<button type="button" onClick={toggleTheme} className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label={dark ? "切换到浅色主题" : "切换到深色主题"}>{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
				<button type="button" onClick={() => setOpen(value => !value)} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "关闭菜单" : "打开菜单"}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
			</div>
		</div>
		{open && <nav id="mobile-navigation" className="border-t bg-background md:hidden" aria-label="移动端主导航"><div className="container grid gap-1 py-3">{navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-accent">{item.name}</Link>)}<Link href="/en/" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-accent">English</Link></div></nav>}
	</header>;
}
