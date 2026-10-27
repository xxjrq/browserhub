/**
 * Data-driven prose for the comparison detail pages.
 *
 * Why this module exists: a 2026-10-27 audit of `out/` measured the English
 * comparison pages that carry no hand-written editorial research at 5 `<h2>`
 * and 659 visible words, against 8 `<h2>` on the Simplified Chinese pages of
 * the same pairs. The three sections below were the only real prose on those
 * pages, and the locale route rendered them on Simplified Chinese only,
 * because the body copy was written in Chinese and would otherwise leak into
 * every hreflang sibling.
 *
 * Editorial rules for this file (these are red lines, not style preferences):
 * - Every value interpolated below comes from a reviewed resource field:
 *   `name`, `free`, `price`, `platforms`, `engine` and `storage`. Nothing here
 *   asserts a capability, a benchmark, a detection result or a price that is
 *   not already on the comparison table of the same page.
 * - `free` and `price` are dated snapshots from `verified-products.ts`. The
 *   prose tells the reader how to interpret them; it never turns them into a
 *   ranking, a recommendation or a live quote.
 * - The third section used to be one identical paragraph on all 29 pairs. It
 *   now names the two products, so each page carries advice specific to that
 *   pair instead of a paragraph repeated across the section.
 *
 * Locale policy follows `.agents/product-marketing.md`: English and Simplified
 * Chinese carry complete article copy. The other locales reuse the English
 * body with localised headings, matching the existing fallback behaviour used
 * by `tool-sections.ts`, `fingerprint-sections.ts` and `browser-sections.ts`.
 *
 * This module deliberately does not import resources.ts (which consumes it).
 */

export type ComparisonCopyLocale = "zh-cn" | "en";

export type ComparisonSection = { heading: string; body: string };

type ComparisonBrowser = {
	name: string; free: string; price: string; platforms: string[]; engine: string; storage: string;
};

/** Locale coverage for section bodies. Other locales fall back to English. */
const FULL_COPY_LOCALES: ComparisonCopyLocale[] = ["zh-cn", "en"];

/**
 * Localised section headings. All seven locales are covered because headings
 * are short structural labels, not article prose.
 */
const headings: Record<string, [string, string, string]> = {
	"zh-cn": ["免费额度与预算如何核对", "部署与资料位置检查", "功能确认与选型记录"],
	en: ["How to check the free allowance and budget", "How to check deployment and data location", "Confirm each feature and record the evaluation"],
	ja: ["無料枠と予算の確認方法", "導入環境とデータ保存場所の確認", "機能確認と評価記録"],
	ko: ["무료 할당량과 예산 확인 방법", "배포 환경과 데이터 저장 위치 확인", "기능 확인과 평가 기록"],
	es: ["Cómo comprobar la cuota gratuita y el presupuesto", "Cómo comprobar el despliegue y la ubicación de los datos", "Confirma cada función y registra la evaluación"],
	pt: ["Como verificar a cota gratuita e o orçamento", "Como verificar a implantação e o local dos dados", "Confirme cada recurso e registe a avaliação"],
	ru: ["Как проверить бесплатный лимит и бюджет", "Как проверить развёртывание и место хранения данных", "Проверьте каждую возможность и зафиксируйте оценку"]
};

export function comparisonSectionHeadings(locale: string): [string, string, string] {
	return headings[locale] ?? headings.en;
}

/**
 * Build the three sections for one pair.
 *
 * The first two sections restate the pair's own reviewed fields and then say
 * how to interpret them. The third names both products, so it is specific to
 * this pair instead of repeating one paragraph on every page of the section.
 *
 * Prose uses the same reviewed fields as the table, without a second price list.
 */
export function comparisonSectionsFor(a: ComparisonBrowser, b: ComparisonBrowser, locale = "zh-cn"): ComparisonSection[] {
	const copyLocale: ComparisonCopyLocale = FULL_COPY_LOCALES.includes(locale as ComparisonCopyLocale) ? (locale as ComparisonCopyLocale) : "en";
	const headingsForLocale = comparisonSectionHeadings(locale);
	const bodies = copyLocale === "zh-cn" ? zhBodies(a, b) : enBodies(a, b);
	return headingsForLocale.map((heading, index) => ({ heading, body: bodies[index] }));
}

function zhBodies(a: ComparisonBrowser, b: ComparisonBrowser): string[] {
	return [
		`${a.name}：${a.free}；套餐价格：${a.price}。\n\n${b.name}：${b.free}；套餐价格：${b.price}。\n\n先区分永久免费额度、限时试用、月付与长期预付折算，再按实际环境数、成员数、代理流量和税费计算总成本。币种不同的套餐不直接当作同币种排名；未能核实的报价请通过下方官方来源确认。`,
		`${a.name} 的已整理平台：${a.platforms.join("、")}；内核：${a.engine}；资料位置：${a.storage}。\n\n${b.name} 的已整理平台：${b.platforms.join("、")}；内核：${b.engine}；资料位置：${b.storage}。\n\n用实际操作系统验证安装、更新、代理连接、导入导出与备份恢复。本地优先不等于完全离线，云同步也不等于完整备份。Android 指纹、云手机和 Android 客户端是不同能力。`,
		`对照本页 ${a.name} 与 ${b.name} 的官方来源和逐项核查状态，分别确认 API、自动化框架接入、代理协议与团队权限。表格中未标注支持表示本次未确认，并不等于产品明确不支持。\n\n用同一套业务检查表记录浏览器版本、套餐、环境数和测试日期。不要将编辑星级、单个检测页面的分数或供应商宣传当作账号安全保证。`
	];
}

function enBodies(a: ComparisonBrowser, b: ComparisonBrowser): string[] {
	return [
		`${a.name}: ${a.free}; plan price: ${a.price}.\n\n${b.name}: ${b.free}; plan price: ${b.price}.\n\nSeparate a permanent free allowance from a time-limited trial, and separate monthly billing from the discounted equivalent of an annual or longer prepay, before you total the cost for your actual number of environments, seats, proxy traffic and taxes. Plans quoted in different currencies are not directly comparable as one currency ranking, and a price that could not be verified has to be confirmed through the official sources listed below.`,
		`${a.name}: reviewed platforms ${a.platforms.join(", ")}; engine ${a.engine}; data location ${a.storage}.\n\n${b.name}: reviewed platforms ${b.platforms.join(", ")}; engine ${b.engine}; data location ${b.storage}.\n\nVerify installation, updates, proxy connection, import/export and backup recovery on the operating system you actually use. Local-first storage does not mean the client is fully offline, and cloud sync is not the same as a complete backup. An Android fingerprint, a cloud phone and an Android client are three different capabilities.`,
		`Check the official sources and the field-level verification status for ${a.name} and ${b.name} on this page, then confirm API access, automation framework support, proxy protocols and team permissions one by one. A field that is not marked as supported means it was not confirmed in this review; it does not mean the vendor explicitly does not support it.\n\nRecord the browser version, plan, environment count and test date for both products using the same checklist. Do not treat an editorial rating, a score from a single detection page, or vendor marketing as a guarantee of account safety.`
	];
}
