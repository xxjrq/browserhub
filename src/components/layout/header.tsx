"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Languages, Menu, Moon, Search, Sun, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { localeFromPath, localeMeta, localePath, locales, t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
	const [open, setOpen] = useState(false);
	const [dark, setDark] = useState(false);
	const pathname = usePathname();
	const isLocalized = locales.some(locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
	const locale = localeFromPath(pathname);
	const labels = t(locale);
	const rawResourcePath = isLocalized ? pathname.replace(/^\/(zh-cn|en|ja|ko|es|pt|ru)\/?/, "").replace(/^\/+|\/+$/g, "") : pathname.replace(/^\/+|\/+$/g, "");
	const resourcePath = /^(browsers|tools|fingerprint|guides|compare|about|contact|privacy)(\/|$)/.test(rawResourcePath) ? rawResourcePath : "";
	const homeHref = isLocalized ? localePath(locale) : "/";
	const navigation = [
		{ name: labels.browsers, path: "browsers" },
		{ name: labels.tools, path: "tools" },
		{ name: labels.fingerprint, path: "fingerprint" },
		{ name: labels.guides, path: "guides" },
		{ name: labels.compare, path: "compare" }
	];
	const hrefFor = (path: string) => isLocalized ? localePath(locale, path) : `/${path}/`;

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

	const isActive = (path: string) => pathname === hrefFor(path) || pathname.startsWith(`${hrefFor(path).replace(/\/$/, "")}/`);

	return <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
		<div className="container flex h-14 items-center justify-between gap-4">
			<Link href={homeHref} className="flex min-w-0 shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
				<Image src="/brand/browserhub-mark.svg" alt="" width={24} height={24} priority />
				<span className="truncate text-[15px] font-semibold tracking-tight">BrowserHub</span>
				<span className="hidden font-mono text-[10px] tracking-widest text-muted-foreground uppercase lg:inline">Resource Database</span>
			</Link>
			<nav className="hidden items-center gap-0.5 md:flex" aria-label="主导航">
				{navigation.map(item => (
					<Link
						key={item.path}
						href={hrefFor(item.path)}
						aria-current={isActive(item.path) ? "page" : undefined}
						className={cn(
							"relative rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
							isActive(item.path) ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
						)}
					>
						{item.name}
						{isActive(item.path) && <span className="absolute inset-x-3 -bottom-[13px] h-px bg-primary" aria-hidden="true" />}
					</Link>
				))}
			</nav>
			<div className="flex items-center gap-1">
				<Link href={hrefFor("browsers")} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "hidden text-muted-foreground hover:text-foreground md:inline-flex")} aria-label={labels.browsers}><Search className="h-[18px] w-[18px]" /></Link>
				<details className="relative hidden md:block">
					<summary className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "list-none cursor-pointer text-muted-foreground hover:text-foreground")} aria-label="选择语言"><Languages className="h-[18px] w-[18px]" /></summary>
					<div className="absolute top-11 right-0 z-50 grid min-w-32 gap-1 rounded-lg border bg-background p-1.5 shadow-xl">
						{locales.map(target => <Link key={target} href={localePath(target, resourcePath)} className={cn("rounded-md px-3 py-2 text-sm hover:bg-muted", target === locale && "bg-muted font-medium")} hrefLang={localeMeta[target].hreflang}>{localeMeta[target].label}</Link>)}
					</div>
				</details>
				<button type="button" onClick={toggleTheme} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-muted-foreground hover:text-foreground")} aria-label={dark ? "切换到浅色主题" : "切换到深色主题"}>{dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}</button>
				<button type="button" onClick={() => setOpen(value => !value)} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-muted-foreground hover:text-foreground md:hidden")} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "关闭菜单" : "打开菜单"}>{open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}</button>
			</div>
		</div>
		{open && (
			<nav id="mobile-navigation" className="border-t bg-background md:hidden" aria-label="移动端主导航">
				<div className="container grid gap-0.5 py-3">
					{navigation.map(item => (
						<Link key={item.path} href={hrefFor(item.path)} onClick={() => setOpen(false)} className={cn("rounded-md px-3 py-2.5 text-sm", isActive(item.path) ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>{item.name}</Link>
					))}
					<div className="mt-2 grid grid-cols-2 gap-1 border-t pt-2">
						{locales.map(target => <Link key={target} href={localePath(target, resourcePath)} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{localeMeta[target].label}</Link>)}
					</div>
				</div>
			</nav>
		)}
	</header>;
}
