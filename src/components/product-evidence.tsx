import { verifiedProducts } from "@/data/verified-products";

const fields: Record<string, [string, string]> = {
	free: ["免费额度", "Free allowance"], price: ["价格与计费周期", "Price and billing"],
	profiles: ["环境数量", "Profiles"], platforms: ["客户端平台", "Client platforms"],
	engine: ["浏览器内核", "Engine"], storage: ["资料位置", "Storage"],
	api: ["API", "API"], automation: ["自动化", "Automation"],
	proxy: ["代理", "Proxy"], proxyProtocols: ["代理协议", "Proxy protocols"]
};

export function ProductEvidence({ slug, locale = "zh-cn", compact = false }: { slug: string; locale?: string; compact?: boolean }) {
	const product = verifiedProducts[slug];
	if (!product) return null;
	const en = locale !== "zh-cn";
	const edition = en ? "en" : "zh-cn";
	const status = (value: string) => value === "verified" ? (en ? "Confirmed in official documentation" : "官方资料已确认") : value === "contradicted" ? (en ? "Previous claim corrected" : "旧资料已纠正") : (en ? "Unverified" : "未核实");
	return <section id={compact ? undefined : "product-evidence"} lang={en ? "en" : "zh-CN"} data-product-evidence={slug} className="mt-8 rounded-xl border bg-muted/20 p-5">
		<h2 className="text-base font-semibold">{en ? "Official sources and verification" : "官方来源与逐项核查"}</h2>
		<p className="mt-2 text-xs leading-6 text-muted-foreground">{en ? "Documentation reviewed" : "公开资料核查于"} <time dateTime={product.verifiedAt}>{product.verifiedAt}</time> · {product.pricingStatus === "verified" ? (en ? "Listed price confirmed on that date; check currency, billing period and promotion terms." : "所列价格已在该日期确认；请核对币种、计费周期与活动条件。") : (en ? "Current price unverified; no live quote is asserted." : "当前价格未核实；本页不将历史报价作为现价。")}</p>
		<ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">{product.notes[edition].map(note => <li key={note}>{note}</li>)}</ul>
		{!compact && <details className="mt-4"><summary className="cursor-pointer text-sm font-medium">{en ? "Field checks and supporting evidence" : "查看字段状态与支持证据"}</summary><dl className="mt-3 divide-y">{Object.entries(product.checks).map(([field, check]) => <div key={field} className="py-3 text-sm"><dt className="font-medium">{fields[field]?.[en ? 1 : 0] ?? field} · {status(check.status)}</dt><dd className="mt-1 text-muted-foreground"><span lang="en">{check.note}</span>{check.sourceUrls.length > 0 && <span className="ml-2">{check.sourceUrls.map((url, index) => <a key={url} href={url} rel="noopener noreferrer" className="mr-2 text-primary underline underline-offset-4">{en ? "Evidence" : "证据"} {index + 1}</a>)}</span>}</dd></div>)}</dl></details>}
		<ul className="mt-4 space-y-2 text-sm">{(compact ? product.sources.slice(0, 2) : product.sources).map(source => <li key={source.url}><a href={source.url} rel="noopener noreferrer" className="text-primary underline underline-offset-4">{source.title}</a><span className="ml-2 text-xs text-muted-foreground">{source.checkedAt}</span></li>)}</ul>
	</section>;
}
