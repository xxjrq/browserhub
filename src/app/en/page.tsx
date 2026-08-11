import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Anti-Detect Browser Hub", description: "A curated resource hub for fingerprint browsers, detection tools, automation, and privacy technology." };

export default function EnglishHome() {
	return <div className="container py-20"><article className="mx-auto max-w-3xl"><p className="text-sm text-muted-foreground">Anti-Detect Browser Hub</p><h1 className="mt-4 text-5xl font-bold tracking-tight">Fingerprint browser and privacy resources</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">Browse anti-detect browsers, fingerprint detection tools, automation frameworks, and practical guides.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/browsers/" className={buttonVariants()}>Browse Browsers</Link><Link href="/tools/" className={buttonVariants({ variant: "outline" })}>Explore Tools</Link><Link href="/" className={buttonVariants({ variant: "ghost" })}>中文</Link></div></article></div>;
}
