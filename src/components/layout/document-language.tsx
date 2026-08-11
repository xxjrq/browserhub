"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPath, localeMeta } from "@/lib/i18n";

export function DocumentLanguage() {
	const pathname = usePathname();
	useEffect(() => {
		document.documentElement.lang = localeMeta[localeFromPath(pathname)].htmlLang;
	}, [pathname]);
	return null;
}
