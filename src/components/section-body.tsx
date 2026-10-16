/**
 * Renders a guide/comparison section body as real document structure instead of
 * one long string: blank-line separated blocks become <p>, and "- " prefixed runs
 * become <ul><li>. Section headings are emitted as real <h2> by the caller so
 * every section is a real outline node for crawlers and featured snippets.
 *
 * Shared by the legacy `/guides/[slug]` route and the locale-prefixed
 * `/[locale]/guides/[slug]` route — previously only the legacy route rendered
 * sections, so the locale pages that the sitemap actually submits shipped a
 * single paragraph of body copy.
 */
export function SectionBody({ body, className }: { body: string; className?: string }) {
	const blocks = body.split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
	return (
		<div className={className ?? "space-y-4"}>
			{blocks.map((block, blockIndex) => {
				const lines = block.split("\n").map(line => line.trim()).filter(Boolean);
				if (lines.length > 0 && lines.every(line => line.startsWith("- "))) {
					return (
						<ul key={blockIndex} className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
							{lines.map(line => <li key={line}>{line.slice(2)}</li>)}
						</ul>
					);
				}
				return <p key={blockIndex} className="text-sm leading-7 text-muted-foreground">{block}</p>;
			})}
		</div>
	);
}