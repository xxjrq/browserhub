import { Fragment } from "react";
import Link from "next/link";

// Small Markdown subset. Raw HTML is always treated as text.
function inline(text: string) {
	return text.split(/(\[[^\]]+\]\((?:https:\/\/|\/)[^\s)]+\))/g).map((part, index) => {
		const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
		if (!match || match[2].startsWith("//")) return <Fragment key={index}>{part}</Fragment>;
		return match[2].startsWith("/")
			? <Link key={index} href={match[2]} className="text-primary underline underline-offset-4">{match[1]}</Link>
			: <a key={index} href={match[2]} rel="noopener noreferrer" className="text-primary underline underline-offset-4">{match[1]}</a>;
	});
}

export function SectionBody({ body, className }: { body: string; className?: string }) {
	const blocks = body.split(/\n{2,}/).map(block => block.trim()).filter(Boolean);
	return <div className={className ?? "space-y-4"}>{blocks.map((block, index) => {
		const lines = block.split("\n").map(line => line.trim()).filter(Boolean);
		if (lines.length && lines.every(line => line.startsWith("- "))) {
			return <ul key={index} className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">{lines.map((line, i) => <li key={i}>{inline(line.slice(2))}</li>)}</ul>;
		}
		if (lines.length >= 3 && lines[0].startsWith("|") && /^\|[\s:|\-]+\|$/.test(lines[1])) {
			const row = (line: string) => line.replace(/^\||\|$/g, "").split("|").map(cell => cell.trim());
			return <div key={index} className="my-6 overflow-x-auto rounded-lg border"><table className="w-full min-w-[36rem] text-left text-sm"><thead className="bg-muted"><tr>{row(lines[0]).map((cell, i) => <th key={i} scope="col" className="p-3 font-semibold">{inline(cell)}</th>)}</tr></thead><tbody>{lines.slice(2).map((line, i) => <tr key={i} className="border-t">{row(line).map((cell, j) => <td key={j} className="p-3 align-top leading-6 text-muted-foreground">{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
		}
		return <p key={index} className="text-sm leading-7 text-muted-foreground">{inline(block)}</p>;
	})}</div>;
}
