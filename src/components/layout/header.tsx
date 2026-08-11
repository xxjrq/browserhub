"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
	const pathname = usePathname();

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

	const isActive = (href: string) => pathname.startsWith(href);

	return <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
		<div className="container flex h-14 items-center justify-between gap-4">
			<Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
				<Image src="/brand/browserhub-mark.svg" alt="" width={24} height={24} priority />
				<span className="truncate text-[15px] font-semibold tracking-tight">BrowserHub</span>
				<span className="hidden font-mono text-[10px] tracking-widest text-muted-foreground uppercase lg:inline">Resource Database</span>
			</Link>
			<nav className="hidden items-center gap-0.5 md:flex" aria-label="主导航">
				{navigation.map(item => (
					<Link
						key={item.href}
						href={item.href}
						aria-current={isActive(item.href) ? "page" : undefined}
						className={cn(
							"relative rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
							isActive(item.href) ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
						)}
					>
						{item.name}
						{isActive(item.href) && <span className="absolute inset-x-3 -bottom-[13px] h-px bg-primary" aria-hidden="true" />}
					</Link>
				))}
			</nav>
			<div className="flex items-center gap-1">
				<Link href="/browsers/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden text-muted-foreground hover:text-foreground md:inline-flex")} aria-label="搜索资源"><Search className="h-[18px] w-[18px]" /></Link>
				<Link href="/en/" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden text-muted-foreground hover:text-foreground md:inline-flex")} aria-label="切换到英文"><Languages className="h-[18px] w-[18px]" /></Link>
				<button type="button" onClick={toggleTheme} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-muted-foreground hover:text-foreground")} aria-label={dark ? "切换到浅色主题" : "切换到深色主题"}>{dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}</button>
				<button type="button" onClick={() => setOpen(value => !value)} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-muted-foreground hover:text-foreground md:hidden")} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "关闭菜单" : "打开菜单"}>{open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}</button>
			</div>
		</div>
		{open && (
			<nav id="mobile-navigation" className="border-t bg-background md:hidden" aria-label="移动端主导航">
				<div className="container grid gap-0.5 py-3">
					{navigation.map(item => (
						<Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("rounded-md px-3 py-2.5 text-sm", isActive(item.href) ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>{item.name}</Link>
					))}
					<Link href="/en/" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">English</Link>
				</div>
			</nav>
		)}
	</header>;
}
