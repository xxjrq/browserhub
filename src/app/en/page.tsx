import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Anti-Detect Browser Hub", description: "A curated resource hub for fingerprint browsers, detection tools, automation, and privacy technology.", alternates: { canonical: "/en/" }, openGraph: { locale: "en_US", title: "Anti-Detect Browser Hub", description: "Fingerprint browser and privacy resources." } };

export default function EnglishHome() {
	return (
		<div className="relative overflow-hidden">
			<div aria-hidden="true" className="bg-grid mask-fade absolute inset-0 opacity-50" />
			<div className="container relative py-24 sm:py-28">
				<article className="mx-auto max-w-3xl">
					<p className="eyebrow text-primary">Anti-Detect Browser Hub</p>
					<h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">Fingerprint browser and privacy resources</h1>
					<p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Browse anti-detect browsers, fingerprint detection tools, automation frameworks, and practical guides.</p>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link href="/browsers/" className={buttonVariants()}>Browse Browsers</Link>
						<Link href="/tools/" className={buttonVariants({ variant: "outline" })}>Explore Tools</Link>
						<Link href="/" className={buttonVariants({ variant: "ghost" })}>中文</Link>
					</div>
				</article>
			</div>
		</div>
	);
}
