"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ResourceIconProps = {
	name: string;
	src?: string;
	website?: string;
	size?: number;
	className?: string;
};

const getDomain = (url?: string) => {
	if (!url) return undefined;
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return undefined;
	}
};

// Deterministic, very low-chroma tint per resource name — keeps monogram tiles
// distinguishable without turning the directory into a rainbow.
const hashHue = (value: string) => {
	let hash = 0;
	for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) % 360;
	return hash;
};

export function ResourceIcon({ name, src, website, size = 40, className }: ResourceIconProps) {
	const [failed, setFailed] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const domain = getDomain(website);
	const remote = src ?? (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : undefined);
	const showImage = Boolean(remote) && !failed;

	const parts = name.split(/\s+/).filter(Boolean);
	const fallback = (parts.length > 1 ? parts.map(part => part[0]).join("") : name.replace(/[^A-Za-z0-9]/g, "")).slice(0, 2).toUpperCase() || name.slice(0, 2).toUpperCase();
	const hue = hashHue(name);

	return (
		<span
			className={cn(
				"relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[24%] border font-mono font-medium select-none",
				"border-[oklch(0.88_0.03_var(--tile-hue))] bg-[oklch(0.96_0.025_var(--tile-hue))] text-[oklch(0.42_0.1_var(--tile-hue))] dark:border-[oklch(0.38_0.03_var(--tile-hue))] dark:bg-[oklch(0.27_0.03_var(--tile-hue))] dark:text-[oklch(0.87_0.05_var(--tile-hue))]",
				className
			)}
			style={{ width: size, height: size, fontSize: Math.max(11, Math.round(size / 2.7)), "--tile-hue": hue } as React.CSSProperties}
			aria-hidden={showImage ? undefined : true}
		>
			{/* Monogram stays underneath so slow icon hosts never leave an empty tile */}
			{fallback}
			{showImage ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={remote}
					alt={`${name} 图标`}
					width={size}
					height={size}
					loading="lazy"
					onLoad={() => setLoaded(true)}
					onError={() => setFailed(true)}
					className={cn("absolute inset-0 h-full w-full bg-card object-contain p-[16%] transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
				/>
			) : null}
		</span>
	);
}
