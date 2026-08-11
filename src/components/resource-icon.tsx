import Image from "next/image";

type ResourceIconProps = { name: string; src?: string; size?: number };

export function ResourceIcon({ name, src, size = 40 }: ResourceIconProps) {
	const parts = name.split(/\s+/).filter(Boolean);
	const initials = (parts.length > 1 ? parts.map(part => part[0]).join("") : name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)).slice(0, 2).toUpperCase();
	if (src) return <Image src={src} alt={`${name} 图标`} width={size} height={size} className="rounded-xl object-contain" />;
	return <span aria-hidden="true" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary/10 font-semibold text-primary" style={{ width: size, height: size, fontSize: Math.max(12, size / 2.5) }}>{initials}</span>;
}
