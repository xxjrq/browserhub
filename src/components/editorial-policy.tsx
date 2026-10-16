import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

export function EditorialPolicy({ locale = "zh-cn" }: { locale?: Locale }) {
	const en = locale !== "zh-cn";
	const sections = en ? [
		["Who publishes BrowserHub", "BrowserHub is a resource and research website maintained by xxjrq. EasyBR is an affiliated product and receives featured placement. BrowserHub is not an independent testing laboratory. Other vendors remain listed with links to their official information."],
		["How articles are researched", "Editorial guides use public vendor documentation, browser standards and reproducible evaluation checklists. Sources and review dates appear on each article. Document-based comparisons are labelled; hands-on results require a recorded browser version, test conditions and evidence. No product can guarantee anonymity or an account outcome."],
		["Prices, dates and editorial labels", "Each product lists official sources, a documentation review date and field-level verification status. Confirmed prices are dated snapshots in the original currency and billing period, not live quotes. Unverified prices are labelled; an unknown capability does not mean unsupported. Check the official pricing link before purchasing. A page modification date does not imply every product or price was re-tested. Featured placement is promotional. Legacy stars are subjective curation labels, not user review averages or measured performance rankings."],
		["Corrections and contributions", "Send a correction through the public GitHub issues page with the affected URL, official evidence and date. Never submit account credentials, profile exports or personal browsing data. We review verifiable corrections and disclose material changes in repository history."]
	] : [
		["谁在维护 BrowserHub", "BrowserHub 是由 xxjrq 维护的资源与研究网站。EasyBR 为关联产品，获得特色展示。本站不属于独立检测实验室；其他供应商仍列示并链接其官方资料。"],
		["文章如何研究", "编辑指南参考供应商公开文档、浏览器标准和可复现的选型检查表，每篇注明来源与核查日期。资料研究与产品实测分开标注；实测必须记录版本、测试条件与证据。任何产品都不能保证匿名或账号结果。"],
		["价格、日期与编辑标签", "产品条目展示官方来源、公开资料核查日期与逐项状态。已确认价格按原币种和计费周期保存为日期快照，不是即时报价；未核实价格明确标注，未知能力不代表不支持。购买前请访问官方价格页确认。页面修改日期不代表所有产品或价格重新实测。特色展示属于推广；旧星级仅为编辑整理标签，不是用户评价均分或性能排名。"],
		["纠错与贡献", "欢迎通过公开 GitHub Issues 提交页面地址、官方证据和核查时间。不要提交账号密码、浏览器环境导出文件或个人浏览数据。可验证的修正会经过复核，实质改动保留在仓库历史中。"]
	];
	return <div className="mt-8 space-y-7" lang={en ? "en" : "zh-CN"}>{sections.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-semibold">{heading}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></section>)}<p className="text-sm"><a href="https://github.com/xxjrq/antidetect-browser-hub/issues" className="text-primary underline underline-offset-4">GitHub Issues</a> · <Link href={localePath(en ? "en" : "zh-cn", "guides/best-antidetect-browsers-2026")} className="text-primary underline underline-offset-4">{en ? "2026 browser evaluation guide" : "2026 浏览器选型指南"}</Link></p></div>;
}
