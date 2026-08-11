import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ExternalLink, Minus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceIcon } from "@/components/resource-icon";
import { Rating } from "@/components/rating";
import { StatusBadge } from "@/components/status-badge";
import { browsers, comparisons, guides, technologies, tools, type BrowserResource, type ComparisonResource, type GuideResource, type TechnologyResource, type ToolResource } from "@/data/resources";
import { allLocaleParams, comparisonApiAnswer, comparisonCopy, comparisonFaq, hreflangFor, isLocale, localeMeta, localePath, localizedResourceDescription, pageMeta, resourceFor, t, type Locale, type LocalizedKind } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
	return allLocaleParams;
}

function jsonLd(locale: Locale, path: string, title: string, description: string, type: string, item?: BrowserResource | ToolResource | TechnologyResource | GuideResource | ComparisonResource) {
	const url = `https://browserhub.co${localePath(locale, path)}`;
	const graph: Record<string, unknown>[] = [
		{ "@context": "https://schema.org", "@type": type, name: title, headline: title, description, url, inLanguage: locale }
	];
	graph.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: t(locale).home, item: `https://browserhub.co${localePath(locale)}` }, { "@type": "ListItem", position: 2, name: title, item: url }] });
	if (item && "features" in item) graph[0].featureList = item.features;
	if (item && "browsers" in item) {
		const a = browsers.find(browser => browser.slug === item.browsers[0]) ?? browsers[0];
		const b = browsers.find(browser => browser.slug === item.browsers[1]) ?? browsers[1];
		const copy = comparisonCopy(locale, a, b);
		const questions = comparisonFaq(locale, a, b, copy);
		graph.push({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: [a, b].map((browser, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "SoftwareApplication", name: browser.name, operatingSystem: browser.platforms.join(", "), applicationCategory: "WebApplication", url: browser.website } })) });
		graph.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
			{ "@type": "Question", name: questions[0], acceptedAnswer: { "@type": "Answer", text: copy.verdict } },
			{ "@type": "Question", name: questions[1], acceptedAnswer: { "@type": "Answer", text: copy.source } },
			{ "@type": "Question", name: questions[2], acceptedAnswer: { "@type": "Answer", text: comparisonApiAnswer(locale, a, b) } }
		] });
	}
	return graph;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments?: string[] }> }): Promise<Metadata> {
	const { locale: rawLocale, segments = [] } = await params;
	if (!isLocale(rawLocale)) return {};
	const locale = rawLocale;
	const path = segments.join("/");
	const meta = pageMeta(locale, path);
	const basePath = localePath(locale, path);
	return {
		title: meta.title,
		description: meta.description,
		alternates: { canonical: basePath, languages: hreflangFor(path) },
		openGraph: { type: "website", locale: localeMeta[locale].ogLocale, title: meta.title, description: meta.description, url: `https://browserhub.co${basePath}`, siteName: "BrowserHub", images: [{ url: "/brand/browserhub-og.png", width: 1200, height: 630, alt: "BrowserHub" }] },
		twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: ["/brand/browserhub-og.png"] }
	};
}

function Shell({ locale, path, children }: { locale: Locale; path: string; children: React.ReactNode }) {
	return <div className="container py-12 md:py-16"><nav className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground" aria-label="Breadcrumb"><Link href={localePath(locale)} className="hover:text-foreground">{t(locale).home}</Link>{path && <><span>/</span><span className="text-foreground">{path.split("/").map(part => part.replaceAll("-", " ")).join(" / ")}</span></>}</nav>{children}</div>;
}

function PageHeader({ locale, eyebrow, title, description, count }: { locale: Locale; eyebrow: string; title: string; description: string; count?: number }) {
	return <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div className="max-w-3xl"><p className="eyebrow text-primary">{eyebrow}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1><p className="mt-4 leading-7 text-muted-foreground">{description}</p></div>{typeof count === "number" && <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">{count} {t(locale).entries}</p>}</div>;
}

function Home({ locale }: { locale: Locale }) {
	const labels = t(locale);
	const featured = browsers.find(item => item.featured) ?? browsers[0];
	return <Shell locale={locale} path=""><section className="relative overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center md:px-12 md:py-24"><p className="eyebrow text-primary">BrowserHub · Resource Database</p><h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">{labels.homeTitle}</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{labels.homeDescription}</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href={localePath(locale, "browsers")} className={buttonVariants()}>{labels.browse}<ArrowRight className="ml-2 h-4 w-4" /></Link><Link href={localePath(locale, "tools")} className={buttonVariants({ variant: "outline" })}>{labels.tools}</Link></div></section><section className="mt-12"><div className="mb-5 flex items-center justify-between"><h2 className="text-xl font-semibold">{labels.browsers}</h2><Link href={localePath(locale, "browsers")} className="text-sm text-muted-foreground hover:text-primary">{labels.browse} →</Link></div><Link href={localePath(locale, `browsers/${featured.slug}`)} className="grid gap-5 rounded-xl border border-primary/30 bg-card p-6 transition-colors hover:border-primary/60 md:grid-cols-[auto_1fr_auto] md:items-center"><ResourceIcon name={featured.name} src={featured.icon} website={featured.website} size={56} /><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-xl font-semibold">{featured.name}</h3><Star className="h-4 w-4 fill-primary text-primary" /><StatusBadge status={featured.status} /></div><p className="mt-2 leading-7 text-muted-foreground">{featured.longDescription}</p></div><div className="text-right"><p className="font-mono font-medium">{featured.price}</p><p className="mt-1 text-xs text-muted-foreground">{featured.free}</p></div></Link></section><section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["browsers", labels.browsers, browsers.length], ["tools", labels.tools, tools.length], ["fingerprint", labels.fingerprint, technologies.length], ["compare", labels.compare, comparisons.length]].map(([path, title, count]) => <Link key={path} href={localePath(locale, path as string)} className="rounded-xl border bg-card p-5 transition-colors hover:border-foreground/30"><p className="font-mono text-3xl font-medium">{count}+</p><h2 className="mt-3 font-semibold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{labels.browse}</p></Link>)}</section></Shell>;
}

function Collection({ locale, kind }: { locale: Locale; kind: LocalizedKind }) {
	const labels = t(locale);
	const config = kind === "browsers" ? { title: labels.browsers, intro: labels.browserIntro, items: browsers, eyebrow: "Database / Browsers" } : kind === "tools" ? { title: labels.tools, intro: labels.toolIntro, items: tools, eyebrow: "Database / Tools" } : kind === "fingerprint" ? { title: labels.fingerprint, intro: labels.fingerprintIntro, items: technologies, eyebrow: "Knowledge / Fingerprint" } : kind === "guides" ? { title: labels.guides, intro: labels.guideIntro, items: guides, eyebrow: "Knowledge / Guides" } : { title: labels.compare, intro: labels.compareIntro, items: comparisons, eyebrow: "Database / Compare" };
	return <Shell locale={locale} path={kind}><PageHeader locale={locale} eyebrow={config.eyebrow} title={config.title} description={config.intro} count={config.items.length} /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{config.items.map(item => { const name = "name" in item ? item.name : "title" in item ? item.title : ""; const description = localizedResourceDescription(locale, kind, item); return <Link key={item.slug} href={localePath(locale, `${kind}/${item.slug}`)} className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/30"><div className="flex items-start gap-3">{"name" in item && "website" in item && <ResourceIcon name={item.name} src={item.icon} website={item.website} size={40} />}<div className="min-w-0 flex-1"><h2 className="font-semibold tracking-tight">{name}</h2><p className="mt-1 font-mono text-[11px] uppercase text-muted-foreground">{"category" in item ? item.category : kind}</p></div>{"status" in item && <StatusBadge status={item.status} />}</div><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{description}</p><span className="mt-5 inline-flex items-center gap-1 border-t pt-3 text-sm font-medium text-muted-foreground group-hover:text-primary">{labels.details}<ArrowRight className="h-3.5 w-3.5" /></span></Link>; })}</div></Shell>;
}

function InfoPage({ locale, kind }: { locale: Locale; kind: "about" | "contact" | "privacy" }) {
	const labels = t(locale);
	const title = labels[kind];
	const body = kind === "about" ? labels.homeDescription : kind === "contact" ? `${labels.contact}: GitHub, Gitee, Telegram and QQ community channels are available from the project footer.` : `${labels.privacy}. BrowserHub is a static resource directory. Review the privacy policy of each linked service before using it.`;
	return <Shell locale={locale} path={kind}><article className="mx-auto max-w-3xl"><p className="eyebrow text-primary">BrowserHub</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1><Card className="mt-8"><CardContent className="pt-6"><p className="text-base leading-8 text-muted-foreground">{body}</p></CardContent></Card></article></Shell>;
}

function Detail({ locale, kind, item }: { locale: Locale; kind: LocalizedKind; item: BrowserResource | ToolResource | TechnologyResource | GuideResource | ComparisonResource }) {
	const labels = t(locale);
	const path = `${kind}/${item.slug}`;
	if (kind === "browsers" && "price" in item) return <Shell locale={locale} path={path}><article className="mx-auto max-w-5xl"><header className="mb-10 flex flex-wrap items-center gap-4"><ResourceIcon name={item.name} src={item.icon} website={item.website} size={64} /><div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{item.name}</h1><div className="mt-2 flex flex-wrap items-center gap-2"><StatusBadge status={item.status} /><Rating value={item.rating} /></div></div></header><p className="mb-10 max-w-3xl text-lg leading-8 text-muted-foreground">{localizedResourceDescription(locale, kind, item)}</p><div className="grid gap-5 md:grid-cols-3"><Card><CardHeader><CardTitle className="text-base">{labels.specs}</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><div className="flex justify-between gap-4"><span className="text-muted-foreground">Free</span><span>{item.free}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Price</span><span className="font-mono">{item.price}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Profiles</span><span>{item.profiles}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Platform</span><span>{item.platforms.join(", ")}</span></div></CardContent></Card><Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">{labels.features}</CardTitle></CardHeader><CardContent><ul className="grid gap-3 sm:grid-cols-2">{item.features.map(feature => <li key={feature} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{feature}</li>)}</ul></CardContent></Card></div><section className="mt-10 grid gap-5 md:grid-cols-2"><Card><CardHeader><CardTitle className="text-base">{labels.bestFor}</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm leading-7">{item.bestFor.map(value => <li key={value}>• {value}</li>)}</ul></CardContent></Card><Card><CardHeader><CardTitle className="text-base">{labels.limitations}</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm leading-7">{item.cons.map(value => <li key={value}>• {value}</li>)}</ul></CardContent></Card></section><a href={`${item.website}${item.sponsored ? "?utm_source=browserhub&utm_medium=referral&utm_campaign=resource_hub" : ""}`} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "mt-10")}><ExternalLink className="mr-2 h-4 w-4" />{labels.official}</a><p className="mt-8 border-t pt-5 text-xs leading-6 text-muted-foreground">{labels.sourceNote} · {labels.updated} {item.updatedAt}</p></article></Shell>;
	if (kind === "tools" && "pricing" in item) return <Shell locale={locale} path={path}><article className="mx-auto max-w-4xl"><header className="mb-10 flex items-center gap-4"><ResourceIcon name={item.name} src={item.icon} website={item.website} size={60} /><div><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{item.name}</h1><p className="mt-2 text-sm text-muted-foreground">{item.category} · {item.platforms.join(", ")}</p></div></header><p className="text-lg leading-8 text-muted-foreground">{localizedResourceDescription(locale, kind, item)}</p><h2 className="mt-10 text-xl font-semibold">{labels.features}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{item.features.map(feature => <li key={feature} className="rounded-lg border bg-card px-4 py-3 text-sm"><Check className="mr-2 inline h-4 w-4 text-success" />{feature}</li>)}</ul><h2 className="mt-10 text-xl font-semibold">{labels.howTo}</h2><ol className="mt-4 list-decimal space-y-3 pl-6 text-sm leading-7 text-muted-foreground"><li>Open the official resource and review its privacy notes.</li><li>Run the test in the browser environment you want to evaluate.</li><li>Compare results with independent tools and record the test conditions.</li></ol><a href={item.website} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "mt-10")}><ExternalLink className="mr-2 h-4 w-4" />{labels.official}</a></article></Shell>;
	if (kind === "fingerprint" && "doc" in item) return <Shell locale={locale} path={path}><article className="mx-auto max-w-4xl"><header className="mb-10"><p className="eyebrow text-primary">{item.category}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{item.name} · {labels.fingerprint}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{localizedResourceDescription(locale, kind, item)}</p></header><div className="grid gap-5 md:grid-cols-2"><Card><CardHeader><CardTitle className="text-base">What</CardTitle></CardHeader><CardContent><p className="text-sm leading-7 text-muted-foreground">{localizedResourceDescription(locale, kind, item)}</p></CardContent></Card><Card><CardHeader><CardTitle className="text-base">{labels.detection}</CardTitle></CardHeader><CardContent><p className="text-sm leading-7 text-muted-foreground">Compare the signal in multiple browsers and networks, then cross-check with public detection tools.</p></CardContent></Card></div><h2 className="mt-10 text-xl font-semibold">{labels.mitigation}</h2><p className="mt-4 leading-8 text-muted-foreground">Keep browser, device, language, timezone and network settings consistent. Follow the target website terms and local laws.</p><a href={item.doc} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }), "mt-8")}><ExternalLink className="mr-2 h-4 w-4" />{labels.official}</a></article></Shell>;
	if (kind === "guides" && "content" in item) return <Shell locale={locale} path={path}><article className="mx-auto max-w-3xl"><header className="mb-10"><Badge variant="secondary">{item.category}</Badge><h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{localizedResourceDescription(locale, kind, item)}</p></header><Card><CardHeader><CardTitle>{item.title}</CardTitle></CardHeader><CardContent><p className="text-sm leading-8 text-muted-foreground">{locale === "zh-cn" ? item.content : localizedResourceDescription(locale, kind, item)}</p></CardContent></Card><p className="mt-8 border-l-2 border-primary bg-primary/[0.04] px-4 py-3 text-sm leading-7 text-muted-foreground">{labels.sourceNote}</p></article></Shell>;
	if (kind === "compare" && "browsers" in item) {
		const a = browsers.find(browser => browser.slug === item.browsers[0]) ?? browsers[0];
		const b = browsers.find(browser => browser.slug === item.browsers[1]) ?? browsers[1];
		const copy = comparisonCopy(locale, a, b);
		const questions = comparisonFaq(locale, a, b, copy);
		const rows: Array<[string, string | boolean, string | boolean]> = [
			[copy.fields.free, a.free, b.free], [copy.fields.price, a.price, b.price], [copy.fields.profiles, a.profiles, b.profiles],
			[copy.fields.platform, a.platforms.join(", "), b.platforms.join(", ")], [copy.fields.engine, a.engine, b.engine],
			[copy.fields.storage, a.storage, b.storage], [copy.fields.api, a.api, b.api], [copy.fields.automation, a.automation, b.automation], [copy.fields.proxy, a.proxy, b.proxy]
		];
		const valueCell = (value: string | boolean) => typeof value === "boolean" ? value ? <Check aria-label="Supported" className="h-4 w-4 text-success" /> : <Minus aria-label="Not listed" className="h-4 w-4 text-muted-foreground" /> : value;
		const faq = [
			{ q: questions[0], a: copy.verdict },
			{ q: questions[1], a: copy.source },
			{ q: questions[2], a: comparisonApiAnswer(locale, a, b) }
		];
		return <Shell locale={locale} path={path}><article className="mx-auto max-w-6xl">
			<header className="mb-10"><div className="flex flex-wrap items-center gap-4"><ResourceIcon name={a.name} src={a.icon} website={a.website} size={52} /><span className="text-2xl font-semibold">{a.name}</span><span className="rounded-full border px-3 py-1 font-mono text-sm text-muted-foreground">vs</span><ResourceIcon name={b.name} src={b.icon} website={b.website} size={52} /><span className="text-2xl font-semibold">{b.name}</span></div><h1 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">{a.name} vs {b.name}</h1><p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">{copy.overview}</p></header>
			<section className="mb-8 rounded-xl border border-primary/30 bg-primary/[0.04] p-6"><p className="eyebrow text-primary">Verdict</p><p className="mt-3 leading-8 text-muted-foreground">{copy.verdict}</p></section>
			<Card><CardHeader><CardTitle>{labels.comparisonTable}</CardTitle></CardHeader><CardContent className="overflow-x-auto p-0"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-y bg-muted/50 text-left"><th className="p-4">{copy.fields.price}</th><th className="p-4">{a.name}</th><th className="p-4">{b.name}</th></tr></thead><tbody>{rows.map(([field, va, vb]) => <tr key={field} className="border-b last:border-0"><td className="p-4 font-medium text-muted-foreground">{field}</td><td className="p-4">{valueCell(va)}</td><td className="p-4">{valueCell(vb)}</td></tr>)}</tbody></table></CardContent></Card>
			<section className="mt-8 grid gap-5 md:grid-cols-2"><Card><CardHeader><CardTitle>{copy.strengths}</CardTitle></CardHeader><CardContent><ul className="space-y-3 text-sm leading-7">{a.pros.slice(0, 4).map(value => <li key={value}><Check className="mr-2 inline h-4 w-4 text-success" />{value}</li>)}</ul><p className="mt-5 border-t pt-4 text-sm text-muted-foreground">{a.bestFor.slice(0, 3).join(" · ")}</p></CardContent></Card><Card><CardHeader><CardTitle>{copy.limitations}</CardTitle></CardHeader><CardContent><ul className="space-y-3 text-sm leading-7">{b.pros.slice(0, 4).map(value => <li key={value}><Check className="mr-2 inline h-4 w-4 text-success" />{value}</li>)}</ul><p className="mt-5 border-t pt-4 text-sm text-muted-foreground">{b.bestFor.slice(0, 3).join(" · ")}</p></CardContent></Card></section>
			<section className="mt-8"><h2 className="text-xl font-semibold">{copy.scenarios}</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[a, b].flatMap(browser => browser.bestFor.slice(0, 2).map(scenario => <div key={`${browser.slug}-${scenario}`} className="rounded-lg border bg-card p-4 text-sm"><p className="font-medium">{browser.name}</p><p className="mt-2 text-muted-foreground">{scenario}</p></div>))}</div></section>
			<section className="mt-10"><h2 className="text-xl font-semibold">{copy.faq}</h2><div className="mt-4 space-y-3">{faq.map(entry => <Card key={entry.q}><CardHeader><CardTitle className="text-base">{entry.q}</CardTitle></CardHeader><CardContent><p className="text-sm leading-7 text-muted-foreground">{entry.a}</p></CardContent></Card>)}</div></section>
			<p className="mt-10 border-t pt-5 text-xs leading-6 text-muted-foreground">{copy.source} · {labels.updated} {a.updatedAt}</p>
		</article></Shell>;
	}
	notFound();
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; segments?: string[] }> }) {
	const { locale: rawLocale, segments = [] } = await params;
	if (!isLocale(rawLocale)) notFound();
	const locale = rawLocale;
	const path = segments.join("/");
	const [kindRaw, slug] = segments;
	if (!path) return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale, path, t(locale).homeTitle, t(locale).homeDescription, "WebSite")) }} /><Home locale={locale} /></>;
	if (["about", "contact", "privacy"].includes(kindRaw) && !slug) return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale, path, pageMeta(locale, path).title, pageMeta(locale, path).description, "AboutPage")) }} /><InfoPage locale={locale} kind={kindRaw as "about" | "contact" | "privacy"} /></>;
	const kind = kindRaw as LocalizedKind;
	if (!["browsers", "tools", "fingerprint", "guides", "compare"].includes(kind)) notFound();
	if (!slug) return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale, path, pageMeta(locale, path).title, pageMeta(locale, path).description, "CollectionPage")) }} /><Collection locale={locale} kind={kind} /></>;
	const item = resourceFor(kind, slug);
	if (!item) notFound();
	const meta = pageMeta(locale, path);
	return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale, path, meta.title, meta.description, kind === "guides" || kind === "compare" ? "Article" : kind === "fingerprint" ? "TechArticle" : kind === "browsers" ? "SoftwareApplication" : "WebApplication", item)) }} /><Detail locale={locale} kind={kind} item={item} /></>;
}
