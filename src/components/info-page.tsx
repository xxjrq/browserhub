import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionBody } from "@/components/section-body";
import { EditorialPolicy } from "@/components/editorial-policy";
import { PrivacyNotice } from "@/components/privacy-notice";
import { infoChannels, infoFaq, infoOpening, infoRelated, infoSections, type InfoKind } from "@/data/info-sections";
import { t, type Locale } from "@/lib/locale-ui";

/**
 * Shared renderer for the three site-level pages: about, contact and privacy.
 *
 * Both the locale route (`[locale]/[[...segments]]`) and the legacy routes
 * (`/about`, `/contact`, `/privacy`) render through this component, so the two
 * cannot drift apart. An earlier revision only changed the locale route and
 * the legacy pages kept the old copy, which meant the change never reached the
 * canonical URLs.
 *
 * `EditorialPolicy` (about) and `PrivacyNotice` (privacy) are kept because they
 * carry the editorial-policy and analytics disclosures that the site's footer
 * and llms.txt point at. The section data in `info-sections.ts` deliberately
 * does not repeat them.
 *
 * Locale policy follows `.agents/product-marketing.md`: the section bodies and
 * FAQ answers are authored in zh-cn and en; the other locales reuse the English
 * body with localised headings, matching `browser-sections` and `tool-sections`.
 */

const kindLabel: Record<InfoKind, string> = {
	about: "About",
	contact: "Contact",
	privacy: "Privacy"
};

export function InfoPage({ locale, kind }: { locale: Locale; kind: InfoKind }) {
	const labels = t(locale);
	const sections = infoSections(kind, locale);
	const faq = infoFaq(kind, locale);
	const channels = kind === "contact" ? infoChannels(locale) : [];
	const related = infoRelated(kind, locale);

	return (
		<article className="mx-auto max-w-3xl">
			<p className="eyebrow text-primary">{kindLabel[kind]}</p>
			<h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{labels[kind]}</h1>
			<p className="mt-5 text-lg leading-8 text-muted-foreground">{infoOpening(kind, locale)}</p>

			<div className="mt-10 space-y-8">
				{sections.map(section => (
					<section key={section.heading}>
						<h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
						<SectionBody body={section.body} className="mt-4" />
					</section>
				))}
			</div>

			{kind === "about" ? <EditorialPolicy locale={locale} /> : null}
			{kind === "privacy" ? <PrivacyNotice locale={locale} /> : null}

			{channels.length ? (
				<section className="mt-10">
					<h2 className="text-xl font-semibold tracking-tight">{labels.contact}</h2>
					<div className="mt-5 grid gap-4 sm:grid-cols-2">
						{channels.map(channel => {
							const content = (
								<>
									<span className="flex items-center justify-between gap-2">
										<strong className="font-semibold tracking-tight">{channel.name}</strong>
										{channel.href ? <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" /> : null}
									</span>
									<span className="mt-2 block text-sm leading-6 text-muted-foreground">{channel.description}</span>
								</>
							);
							return channel.href ? (
								<a key={channel.name} className="group rounded-xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25" href={channel.href} target="_blank" rel="noopener noreferrer">
									{content}
								</a>
							) : (
								<div key={channel.name} className="rounded-xl border bg-card p-5">
									{content}
								</div>
							);
						})}
					</div>
				</section>
			) : null}

			<section className="mt-10">
				<h2 className="text-xl font-semibold tracking-tight">{labels.faq}</h2>
				<div className="mt-4 space-y-3">
					{faq.map(entry => (
						<Card key={entry.question}>
							<CardHeader>
								<CardTitle className="text-base">{entry.question}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm leading-7 text-muted-foreground">{entry.answer}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{related.length ? (
				<section className="mt-12 border-t pt-8">
					<h2 className="text-xl font-semibold tracking-tight">{labels.related}</h2>
					<div className="mt-5 grid gap-4 sm:grid-cols-3">
						{related.map(entry => (
							<a key={entry.href} className="group flex flex-col rounded-xl border bg-card p-4 transition-colors hover:border-foreground/30" href={entry.href}>
								<span className="font-semibold tracking-tight">{entry.title}</span>
								<span className="mt-2 text-sm leading-6 text-muted-foreground">{entry.description}</span>
							</a>
						))}
					</div>
				</section>
			) : null}
		</article>
	);
}
