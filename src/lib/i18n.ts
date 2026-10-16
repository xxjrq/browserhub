import { comparisonEditorial } from "@/data/browser-editorial";
import { browsers, comparisons, guides, technologies, tools, type BrowserResource, type ComparisonResource, type GuideResource, type TechnologyResource, type ToolResource } from "@/data/resources";
import { localizedGuideCopy } from "@/data/guide-translations";

import { locales, localeMeta, localePath, contentLocales, contentPath, t, type Locale } from "./locale-ui";
export * from "./locale-ui";

export type LocalizedKind = "home" | "browsers" | "tools" | "fingerprint" | "guides" | "compare";
export const manifestPaths = [
	"", "browsers", "tools", "fingerprint", "guides", "compare", "about", "contact", "privacy",
	...browsers.map(item => `browsers/${item.slug}`),
	...tools.map(item => `tools/${item.slug}`),
	...technologies.map(item => `fingerprint/${item.slug}`),
	...guides.map(item => `guides/${item.slug}`),
	...comparisons.map(item => `compare/${item.slug}`)
];

export const allLocaleParams = locales.flatMap(locale => manifestPaths.filter(path => {
	const guide = path.startsWith("guides/") ? guides.find(item => `guides/${item.slug}` === path) : undefined;
	return !guide?.availableLocales || guide.availableLocales.includes(locale);
}).map(path => ({ locale, segments: path ? path.split("/") : [] })));

export function hreflangFor(path: string) {
	return Object.fromEntries([
		...contentLocales(path).map(locale => [localeMeta[locale].hreflang, `https://browserhub.co${localePath(locale, path)}`]),
		["x-default", `https://browserhub.co${localePath("zh-cn", path)}`]
	]);
}

export function resourceFor(kind: LocalizedKind, slug?: string): BrowserResource | ToolResource | TechnologyResource | GuideResource | ComparisonResource | undefined {
	if (!slug) return undefined;
	if (kind === "browsers") return browsers.find(item => item.slug === slug);
	if (kind === "tools") return tools.find(item => item.slug === slug);
	if (kind === "fingerprint") return technologies.find(item => item.slug === slug);
	if (kind === "guides") return guides.find(item => item.slug === slug);
	if (kind === "compare") return comparisons.find(item => item.slug === slug);
	return undefined;
}

export function pageMeta(locale: Locale, path: string) {
	const parts = path.split("/").filter(Boolean);
	const kind = (parts[0] ?? "home") as LocalizedKind;
	const slug = parts[1];
	const labels = t(locale);
	const names: Record<string, string> = { browsers: labels.browsers, tools: labels.tools, fingerprint: labels.fingerprint, guides: labels.guides, compare: labels.compare };
	if (!slug) {
		if (kind === "home") return { title: locale === "en" ? "Anti-Detect Browser Resource Hub" : labels.homeTitle, description: labels.homeDescription };
		const sectionCopy: Record<string, [string, string]> = {
			browsers: [labels.browsers, labels.browserIntro], tools: [labels.tools, labels.toolIntro], fingerprint: [labels.fingerprint, labels.fingerprintIntro], guides: [labels.guides, labels.guideIntro], compare: [labels.compare, labels.compareIntro], about: [labels.about, `${labels.about}: ${labels.homeDescription}`], contact: [labels.contact, `${labels.contact}: ${labels.homeDescription}`], privacy: [labels.privacy, `${labels.privacy}: ${labels.homeDescription}`]
		};
		const [title, description] = sectionCopy[kind] ?? [labels.homeTitle, labels.homeDescription];
		return { title, description };
	}
	const resource = resourceFor(kind, slug);
	const name = resource && "name" in resource ? resource.name : resource && "title" in resource ? resource.title : slug;
	const section = names[kind] ?? labels.homeTitle;
	if (kind === "compare" && resource && "browsers" in resource) {
		const a = browsers.find(browser => browser.slug === resource.browsers[0]) ?? browsers[0];
		const b = browsers.find(browser => browser.slug === resource.browsers[1]) ?? browsers[1];
		const comparison = comparisonCopy(locale, a, b);
		const title = locale === "en" ? `${a.name} vs ${b.name}: Features & Pricing` : locale === "zh-cn" ? `${a.name} vs ${b.name}：功能、价格与适用场景对比` : `${a.name} vs ${b.name} — ${labels.compare}`;
		return { title, description: comparison.overview };
	}
	if (kind === "guides" && resource && "content" in resource) {
		const guide = resource as GuideResource;
		const copy = localizedGuideCopy(locale, guide.slug, { title: guide.title, description: guide.description });
		return { title: copy.title, description: copy.description };
	}
	return {
		title: `${name} | ${section}`,
		description: resource && "description" in resource ? localizedResourceDescription(locale, kind, resource) : `${name} — ${section}. ${labels.sourceNote}`
	};
}

export function comparisonCopy(locale: Locale, a: BrowserResource, b: BrowserResource) {
	const names = `${a.name} 与 ${b.name}`;
	const enNames = `${a.name} and ${b.name}`;
	const templates: Record<Locale, { overview: string; verdict: string; strengths: string; limitations: string; scenarios: string; faq: string; fields: Record<string, string>; free: string; price: string; profiles: string; platform: string; engine: string; storage: string; api: string; automation: string; proxy: string; source: string }> = {
		"zh-cn": { overview: `${names} 的主要差异集中在环境存储、免费额度、平台覆盖和自动化方式。下面使用同一组公开字段，帮助个人用户、运营团队和开发者快速缩小选择范围。`, verdict: `如果你更看重本地控制、环境隔离或当前页面列出的免费额度，应优先查看 ${a.name}；如果你更看重 ${b.name} 的平台覆盖、团队工作流或公开集成能力，则可以优先评估 ${b.name}。最终请以两家官网当前套餐和文档为准。`, strengths: `${a.name} 的优势与适用场景`, limitations: `${b.name} 的优势与适用场景`, scenarios: "场景建议", faq: "常见问题", fields: { free: "免费额度", price: "起步价格", profiles: "环境数量", platform: "平台", engine: "浏览器内核", storage: "存储方式", api: "API", automation: "自动化", proxy: "代理" }, free: "免费额度", price: "价格", profiles: "环境数量", platform: "平台", engine: "内核", storage: "存储", api: "API", automation: "自动化", proxy: "代理", source: "价格、套餐和功能可能变化，请以官方页面为准。" },
		en: { overview: `The main differences between ${enNames} are profile storage, free capacity, platform coverage and automation workflow. The table below uses the same public fields so individuals, operators and developers can compare them consistently.`, verdict: `Choose ${a.name} first if local control, profile isolation or its listed free allowance matters most. Evaluate ${b.name} first if its platform coverage, team workflow or public integrations better match your needs. Confirm current plans and documentation on both official websites.`, strengths: `${a.name}: strengths and best-fit scenarios`, limitations: `${b.name}: strengths and best-fit scenarios`, scenarios: "Scenario guidance", faq: "Frequently asked questions", fields: { free: "Free allowance", price: "Starting price", profiles: "Profiles", platform: "Platforms", engine: "Browser engine", storage: "Storage", api: "API", automation: "Automation", proxy: "Proxy" }, free: "Free allowance", price: "Price", profiles: "Profiles", platform: "Platforms", engine: "Engine", storage: "Storage", api: "API", automation: "Automation", proxy: "Proxy", source: "Plans, pricing and features can change; confirm them on the official websites." },
		ja: { overview: `${a.name} と ${b.name} の違いは、プロファイル保存、無料枠、対応プラットフォーム、自動化の運用方法にあります。同じ公開項目で比較し、利用目的に合う候補を絞り込みます。`, verdict: `ローカル管理や環境分離、掲載された無料枠を重視する場合は ${a.name} を先に確認してください。チーム運用や対応プラットフォームを重視する場合は ${b.name} も比較してください。最新情報は公式サイトで確認します。`, strengths: `${a.name} の特徴と適した用途`, limitations: `${b.name} の特徴と適した用途`, scenarios: "用途別の目安", faq: "よくある質問", fields: { free: "無料枠", price: "開始料金", profiles: "環境数", platform: "対応環境", engine: "ブラウザエンジン", storage: "保存方式", api: "API", automation: "自動化", proxy: "プロキシ" }, free: "無料枠", price: "料金", profiles: "環境数", platform: "プラットフォーム", engine: "エンジン", storage: "保存", api: "API", automation: "自動化", proxy: "プロキシ", source: "料金・機能は変更される可能性があるため、公式サイトを確認してください。" },
		ko: { overview: `${a.name}과(와) ${b.name}의 차이는 프로필 저장 방식, 무료 한도, 플랫폼 지원과 자동화 흐름에 있습니다. 동일한 공개 필드로 비교해 사용 목적에 맞는 후보를 찾을 수 있습니다.`, verdict: `로컬 제어와 프로필 격리를 중시하면 ${a.name}을(를) 먼저 확인하고, 팀 워크플로와 플랫폼 범위를 중시하면 ${b.name}도 함께 평가하세요. 최신 요금과 기능은 공식 사이트에서 확인해야 합니다.`, strengths: `${a.name}의 특징과 적합한 사용 시나리오`, limitations: `${b.name}의 특징과 적합한 사용 시나리오`, scenarios: "사용 시나리오", faq: "자주 묻는 질문", fields: { free: "무료 한도", price: "시작 가격", profiles: "프로필 수", platform: "플랫폼", engine: "브라우저 엔진", storage: "저장 방식", api: "API", automation: "자동화", proxy: "프록시" }, free: "무료 한도", price: "가격", profiles: "프로필", platform: "플랫폼", engine: "엔진", storage: "저장", api: "API", automation: "자동화", proxy: "프록시", source: "요금과 기능은 바뀔 수 있으므로 공식 사이트에서 확인하세요." },
		es: { overview: `Las diferencias principales entre ${a.name} y ${b.name} están en el almacenamiento de perfiles, el plan gratuito, las plataformas y la automatización. La tabla usa los mismos campos públicos para facilitar una comparación clara.`, verdict: `Prioriza ${a.name} si necesitas más control local, aislamiento de perfiles o su plan gratuito publicado. Evalúa ${b.name} si encaja mejor con tus plataformas, equipo o integraciones. Confirma siempre la información actual en los sitios oficiales.`, strengths: `${a.name}: ventajas y escenarios`, limitations: `${b.name}: ventajas y escenarios`, scenarios: "Guía por escenario", faq: "Preguntas frecuentes", fields: { free: "Plan gratuito", price: "Precio inicial", profiles: "Perfiles", platform: "Plataformas", engine: "Motor", storage: "Almacenamiento", api: "API", automation: "Automatización", proxy: "Proxy" }, free: "Plan gratuito", price: "Precio", profiles: "Perfiles", platform: "Plataformas", engine: "Motor", storage: "Almacenamiento", api: "API", automation: "Automatización", proxy: "Proxy", source: "Los precios y funciones pueden cambiar; verifica los datos en los sitios oficiales." },
		pt: { overview: `As principais diferenças entre ${a.name} e ${b.name} estão no armazenamento dos perfis, no plano gratuito, nas plataformas e na automação. A tabela usa os mesmos campos públicos para uma comparação consistente.`, verdict: `Priorize ${a.name} se o controle local, o isolamento dos perfis ou o plano gratuito forem mais importantes. Avalie ${b.name} se as plataformas, o trabalho em equipe ou as integrações forem mais adequados. Confirme os dados nos sites oficiais.`, strengths: `${a.name}: vantagens e cenários`, limitations: `${b.name}: vantagens e cenários`, scenarios: "Orientação por cenário", faq: "Perguntas frequentes", fields: { free: "Plano gratuito", price: "Preço inicial", profiles: "Perfis", platform: "Plataformas", engine: "Navegador", storage: "Armazenamento", api: "API", automation: "Automação", proxy: "Proxy" }, free: "Plano gratuito", price: "Preço", profiles: "Perfis", platform: "Plataformas", engine: "Engine", storage: "Armazenamento", api: "API", automation: "Automação", proxy: "Proxy", source: "Preços e recursos podem mudar; confirme as informações nos sites oficiais." },
		ru: { overview: `Главные различия между ${a.name} и ${b.name} связаны с хранением профилей, бесплатным лимитом, платформами и автоматизацией. В таблице используются одинаковые открытые поля для понятного сравнения.`, verdict: `Сначала изучите ${a.name}, если важны локальный контроль, изоляция профилей или опубликованный бесплатный лимит. Изучите ${b.name}, если важнее платформы, командный процесс или интеграции. Актуальные условия проверяйте на официальных сайтах.`, strengths: `${a.name}: преимущества и сценарии`, limitations: `${b.name}: преимущества и сценарии`, scenarios: "Рекомендации по сценарию", faq: "Частые вопросы", fields: { free: "Бесплатный план", price: "Начальная цена", profiles: "Профили", platform: "Платформы", engine: "Движок", storage: "Хранилище", api: "API", automation: "Автоматизация", proxy: "Прокси" }, free: "Бесплатный план", price: "Цена", profiles: "Профили", platform: "Платформы", engine: "Движок", storage: "Хранилище", api: "API", automation: "Автоматизация", proxy: "Прокси", source: "Цены и функции могут меняться; проверяйте данные на официальных сайтах." }
	};
	const editorial = comparisonEditorial[`${a.slug}-vs-${b.slug}`];
	const neutral: Record<Locale, string> = {
		"zh-cn": `先按所需平台、存储位置、团队权限和自动化任务比较 ${a.name} 与 ${b.name}，再用同一组测试账号、重启恢复和撤权任务验证。表格是历史资料快照；当前能力与报价请向各供应商确认。`,
		en: `Compare ${a.name} and ${b.name} against your required platforms, storage location, team permissions and automation tasks. Validate both with the same test-account, restart/recovery and access-revocation pilot. The table is a historical catalogue snapshot; confirm current capabilities and quotes with each vendor.`,
		ja: `${a.name} と ${b.name} を必要なOS、保存場所、権限、自動化タスクで比較し、同じ試用手順で確認してください。最新情報は各公式サイトで確認してください。`,
		ko: `${a.name}과 ${b.name}을 필요한 플랫폼, 저장 위치, 권한, 자동화 작업으로 비교하고 같은 시험 절차로 확인하세요. 최신 정보는 각 공식 사이트에서 확인하세요.`,
		es: `Compara ${a.name} y ${b.name} según plataformas, almacenamiento, permisos y automatización. Valida ambos con las mismas tareas y confirma las condiciones actuales con cada proveedor.`,
		pt: `Compare ${a.name} e ${b.name} por plataformas, armazenamento, permissões e automação. Teste ambos com as mesmas tarefas e confirme as condições atuais com cada fornecedor.`,
		ru: `Сравните ${a.name} и ${b.name} по платформам, хранению, правам и задачам автоматизации. Проверьте оба решения одинаковыми заданиями и уточните текущие условия у поставщиков.`
	};
	return { ...templates[locale], verdict: editorial && (locale === "en" || locale === "zh-cn") ? editorial[locale].sections[0].body.split("\n\n")[0] : neutral[locale] };
}

export type RelatedLink = { href: string; title: string; description: string; kind: LocalizedKind };

/**
 * Localised "how to use" steps for tool pages. Previously these were hard-coded English
 * strings rendered on every locale, which read as untranslated boilerplate.
 */
export function toolHowToSteps(locale: Locale): [string, string, string] {
	const steps: Record<Locale, [string, string, string]> = {
		"zh-cn": ["打开官方页面，先阅读它的隐私说明与数据处理方式。", "在你想要评估的浏览器环境里运行一次检测，记录当时的网络与设备条件。", "与另外一到两个独立工具交叉验证结果，并记录测试条件以便复现。"],
		en: ["Open the official resource and review its privacy notes.", "Run the test in the browser environment you want to evaluate.", "Compare results with independent tools and record the test conditions."],
		ja: ["公式サイトを開き、プライバシーに関する説明とデータの取扱いを確認します。", "評価したいブラウザ環境で実際に実行し、その時のネットワークと端末条件を記録します。", "別の独立したツールと結果を突き合わせ、再現できるようテスト条件を保存します。"],
		ko: ["공식 사이트를 열고 개인정보 안내와 데이터 처리 방식을 확인합니다.", "평가하려는 브라우저 환경에서 실제로 실행하고 그때의 네트워크와 기기 조건을 기록합니다.", "독립적인 다른 도구와 결과를 비교하고 재현 가능하도록 테스트 조건을 남깁니다."],
		es: ["Abre el sitio oficial y revisa sus notas de privacidad y tratamiento de datos.", "Ejecuta la prueba en el entorno de navegador que quieres evaluar y anota las condiciones de red y dispositivo.", "Compara el resultado con otra herramienta independiente y registra las condiciones de la prueba."],
		pt: ["Abra o site oficial e leia as notas de privacidade e tratamento de dados.", "Execute o teste no ambiente de navegador que deseja avaliar e registre as condições de rede e dispositivo.", "Compare o resultado com outra ferramenta independente e registre as condições do teste."],
		ru: ["Откройте официальный сайт и ознакомьтесь с политикой конфиденциальности и обработкой данных.", "Запустите проверку в том окружении браузера, которое вы оцениваете, и зафиксируйте условия сети и устройства.", "Сравните результат с независимым инструментом и сохраните условия теста для воспроизведения."]
	};
	return steps[locale];
}

/**
 * Localised labels for the eight `GuideResource.category` values.
 *
 * `category` is authored in Chinese on the source rows and is rendered verbatim in
 * the guide header, which leaked a Chinese badge into every locale sibling. Only the
 * category label is translated — the guide body sections are handled separately by
 * `localizedGuideSections`.
 */
export function guideCategoryLabel(locale: Locale, category: string): string {
	const map: Record<string, Partial<Record<Locale, string>>> = {
		"选型指南": { en: "Selection guide", ja: "選定ガイド", ko: "선정 가이드", es: "Guía de selección", pt: "Guia de seleção", ru: "Руководство по выбору" },
		"技术百科": { en: "Technical explainer", ja: "技術解説", ko: "기술 해설", es: "Explicación técnica", pt: "Explicação técnica", ru: "Технический разбор" },
		"使用教程": { en: "Tutorial", ja: "チュートリアル", ko: "튜토리얼", es: "Tutorial", pt: "Tutorial", ru: "Руководство" },
		"实践指南": { en: "Practice guide", ja: "実践ガイド", ko: "실무 가이드", es: "Guía práctica", pt: "Guia prático", ru: "Практическое руководство" },
		"技术指南": { en: "Technical guide", ja: "技術ガイド", ko: "기술 가이드", es: "Guía técnica", pt: "Guia técnico", ru: "Техническое руководство" },
		"排查指南": { en: "Troubleshooting guide", ja: "トラブルシューティング", ko: "문제 해결 가이드", es: "Guía de diagnóstico", pt: "Guia de diagnóstico", ru: "Руководство по диагностике" },
		"检测指南": { en: "Detection guide", ja: "検出ガイド", ko: "탐지 가이드", es: "Guía de detección", pt: "Guia de detecção", ru: "Руководство по проверке" },
		"网络指南": { en: "Network guide", ja: "ネットワークガイド", ko: "네트워크 가이드", es: "Guía de red", pt: "Guia de rede", ru: "Руководство по сети" }
	};
	const entry = map[category];
	if (!entry) return category;
	if (locale === "zh-cn") return category;
	return entry[locale] ?? entry.en ?? category;
}

/** Localised copy for the fingerprint signal pages (previously hard-coded English). */
export function fingerprintCopy(locale: Locale, name: string): { what: string; detection: string; mitigation: string } {
	const copy: Record<Locale, { what: string; detection: string; mitigation: string }> = {
		"zh-cn": { what: `${name} 属于浏览器环境识别信号之一，网站可用它判断访问环境是否真实一致。`, detection: "在不同浏览器与网络环境下重复测试该信号，再用公开检测工具交叉验证结果。", mitigation: "保持浏览器版本、设备、语言、时区与网络设置彼此一致，并遵守目标网站条款与当地法律。" },
		en: { what: `${name} is one of the signals browsers expose so sites can judge whether an environment looks consistent.`, detection: "Test the signal across several browsers and networks, then cross-check the result with public detection tools.", mitigation: "Keep browser, device, language, timezone and network settings consistent, and follow the target site's terms and local laws." },
		ja: { what: `${name} はブラウザーが環境侦察に利用するシグナルの一つで、サイトの環境判定に使われます。`, detection: "複数のブラウザとネットワークで同じシグナルを測定し、公開の検出ツールで結果を突き合わせます。", mitigation: "ブラウザ・端末・言語・タイムゾーン・ネットワークの設定を揃え、対象サイトの規約と当地の法律を守ります。" },
		ko: { what: `${name} 은(는) 브라우저가 환경 식별에 노출하는 신호 중 하나로, 사이트가 환경을 판단하는 데 사용됩니다.`, detection: "여러 브라우저와 네트워크에서 같은 신호를 측정하고 공개된 탐지 도구로 결과를 교차 확인합니다.", mitigation: "브라우저, 기기, 언어, 시간대와 네트워크 설정을 일관되게 유지하고 대상 사이트 약관과 현지 법률을 따릅니다." },
		es: { what: `${name} es una de las señales que el navegador expone para que los sitios evaluen si el entorno resulta coherente.`, detection: "Prueba la señal en varios navegadores y redes y contrasta el resultado con herramientas públicas de detección.", mitigation: "Mantén coherentes el navegador, el dispositivo, el idioma, la zona horaria y la red, y sigue las condiciones del sitio y la ley local." },
		pt: { what: `${name} é um dos sinais expostos pelo navegador para que os sites avaliem se o ambiente parece consistente.`, detection: "Teste o sinal em vários navegadores e redes e confronte o resultado com ferramentas públicas de detecção.", mitigation: "Mantenha navegador, dispositivo, idioma, fuso horário e rede consistentes e siga os termos do site e a legislação local." },
		ru: { what: `${name} — один из сигналов, которые браузер передаёт сайтам, чтобы оценить, насколько среда выглядит согласованной.`, detection: "Проверьте сигнал в нескольких браузерах и сетях и сверьте результат с публичными инструментами проверки.", mitigation: "Держите браузер, устройство, язык, часовой пояс и сеть согласованными и соблюдайте правила сайта и местное законодательство." }
	};
	return copy[locale];
}

/**
 * Builds contextual internal links for a detail page so every page is reachable
 * from within the catalogue, not only from its own section index. This keeps the
 * crawl graph connected and spreads link equity to long-tail resource pages.
 */
// `item` is narrowed by `kind` at runtime, not by a TS discriminated union.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function relatedLinks(locale: Locale, kind: LocalizedKind, item: any, limit = 6): RelatedLink[] {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const link = (targetKind: LocalizedKind, entry: any): RelatedLink => {
		const title = "name" in entry ? entry.name : "title" in entry ? entry.title : entry.slug;
		const localTitle = targetKind === "guides" ? localizedGuideCopy(locale, entry.slug, entry).title : title;
		return { href: contentPath(locale, `${targetKind}/${entry.slug}`), title: localTitle, description: localizedResourceDescription(locale, targetKind, entry), kind: targetKind };
	};
	const pick = (entries: RelatedLink[]) => entries.filter(Boolean).slice(0, limit);

	if (kind === "browsers") {
		const slug = item.slug as string;
		const vsBrowsers = comparisons.filter(entry => entry.browsers.includes(slug)).slice(0, 3).map(entry => link("compare", entry));
		const alternatives = browsers.filter(entry => entry.slug !== slug).sort((a, b) => b.rating - a.rating).slice(0, 3).map(entry => link("browsers", entry));
		const guidesForBrowser = guides.filter(entry => entry.relatedBrowsers?.includes(slug)).slice(0, 2).map(entry => link("guides", entry));
		return pick([...guidesForBrowser, ...vsBrowsers, ...alternatives]);
	}

	if (kind === "compare") {
		const pair = item.browsers as [string, string];
		const subjects = pair.map(slug => browsers.find(entry => entry.slug === slug)).filter(Boolean).map(entry => link("browsers", entry));
		const siblings = comparisons.filter(entry => entry.slug !== item.slug && entry.browsers.some(slug => pair.includes(slug))).slice(0, 3).map(entry => link("compare", entry));
		const decisionGuide = guides.find(guide => guide.slug === "best-antidetect-browsers-2026");
		return pick([...subjects, ...(decisionGuide ? [link("guides", decisionGuide)] : []), ...siblings]);
	}

	if (kind === "tools" || kind === "fingerprint") {
		const sameCategory = kind === "tools"
			? tools.filter(entry => entry.slug !== item.slug && entry.categorySlug === item.categorySlug)
			: technologies.filter(entry => entry.slug !== item.slug && entry.category === item.category);
		const siblings = kind === "tools"
			? tools.filter(entry => entry.slug !== item.slug).slice(0, 2).map(entry => link("tools", entry))
			: browsers.filter(entry => entry.rating >= 4.5).slice(0, 3).map(entry => link("browsers", entry));
		return pick([...sameCategory.slice(0, 3).map(entry => link(kind, entry)), ...siblings]);
	}

	// Guides: reuse the curated relations already present in the dataset, then widen.
	const guide = item as GuideResource;
	const relatedBrowserLinks = (guide.relatedBrowsers ?? []).map(slug => browsers.find(entry => entry.slug === slug)).filter((entry): entry is BrowserResource => Boolean(entry)).map(entry => link("browsers", entry));
	const relatedToolLinks = (guide.relatedTools ?? []).map(slug => tools.find(entry => entry.slug === slug)).filter((entry): entry is ToolResource => Boolean(entry)).map(entry => link("tools", entry));
	const otherGuides = guides.filter(entry => entry.slug !== guide.slug && (guide.relatedGuides?.includes(entry.slug) || entry.slug === "best-antidetect-browsers-2026" || entry.category === guide.category)).slice(0, 4).map(entry => link("guides", entry));
	// Guides usually carry no curated relations, so fall back to top-rated browsers and
	// detection tools. Without this most guide pages would render no internal links at all.
	const fallbackBrowsers = browsers.filter(entry => entry.rating >= 4.5).slice(0, 3).map(entry => link("browsers", entry));
	const fallbackTools = tools.filter(entry => entry.categorySlug.includes("detection") || entry.categorySlug.includes("fingerprint")).slice(0, 2).map(entry => link("tools", entry));
	return pick([...otherGuides, ...relatedBrowserLinks, ...relatedToolLinks, ...fallbackBrowsers, ...fallbackTools]);
}

export function comparisonFaq(locale: Locale, a: BrowserResource, b: BrowserResource, copy: ReturnType<typeof comparisonCopy>) {
	const questions: Record<Locale, [string, string, string, string, string]> = {
		"zh-cn": [`${a.name} 和 ${b.name} 哪个更适合我？`, `${copy.fields.price}如何确认？`, `${copy.fields.api}和${copy.fields.automation}是否相同？`, `挂了代理就一定不会泄漏 WebRTC 吗？`, `能不能用一个环境同时登录多个账号？`],
		en: [`Which is a better fit: ${a.name} or ${b.name}?`, `How should I verify the ${copy.fields.price.toLowerCase()}?`, `Do ${copy.fields.api} and ${copy.fields.automation.toLowerCase()} mean the same thing?`, `Does a proxy guarantee no WebRTC leak?`, `Can I run several accounts inside one browser profile?`],
		ja: [`${a.name} と ${b.name} はどちらが適していますか？`, `${copy.fields.price}はどこで確認できますか？`, `${copy.fields.api}と${copy.fields.automation}は同じですか？`, `プロキシを設定すれば WebRTC 漏洩は防げますか？`, `1 つのプロファイルで複数アカウントを運用してもいいですか？`],
		ko: [`${a.name}과(와) ${b.name} 중 어느 쪽이 적합한가요?`, `${copy.fields.price}는 어디에서 확인하나요?`, `${copy.fields.api}와(과) ${copy.fields.automation}은 같은 의미인가요?`, `프록시를 쓰면 WebRTC 누출이 막히나요?`, `한 프로필에서 여러 계정을 함께 돌려도 되나요?`],
		es: [`¿Qué opción encaja mejor: ${a.name} o ${b.name}?`, `¿Cómo se debe verificar el ${copy.fields.price.toLowerCase()}?`, `¿La ${copy.fields.api} es lo mismo que la ${copy.fields.automation.toLowerCase()}?`, `¿El proxy evita siempre la fuga de WebRTC?`, `¿Puedo usar una sola cuenta de perfil para varias cuentas?`],
		pt: [`Qual opção é mais adequada: ${a.name} ou ${b.name}?`, `Como confirmar o ${copy.fields.price.toLowerCase()}?`, `${copy.fields.api} e ${copy.fields.automation.toLowerCase()} são a mesma coisa?`, `O proxy garante que não haja vazamento WebRTC?`, `Posso usar um único perfil para várias contas?`],
		ru: [`Что лучше подходит: ${a.name} или ${b.name}?`, `Где проверить ${copy.fields.price.toLowerCase()}?`, `${copy.fields.api} и ${copy.fields.automation.toLowerCase()} — это одно и то же?`, `Гарантирует ли прокси отсутствие утечки WebRTC?`, `Можно ли вести несколько аккаунтов в одном профиле?`]
	};
	return questions[locale];
}

export function comparisonApiAnswer(locale: Locale, a: BrowserResource, b: BrowserResource) {
	const answers: Record<Locale, string> = {
		"zh-cn": `${a.name} 与 ${b.name} 的 API 和自动化能力应分别查看官方文档，表格只记录公开资料中明确列出的能力。`,
		en: `${a.name} and ${b.name} API and automation capabilities should be confirmed in the official documentation; this table only records publicly stated capabilities.`,
		ja: `${a.name} と ${b.name} の API と自動化機能は公式ドキュメントで個別に確認してください。この表は公開情報だけを記載しています。`,
		ko: `${a.name}과(와) ${b.name}의 API 및 자동화 기능은 공식 문서에서 확인해야 하며, 표에는 공개된 정보만 표시합니다.`,
		es: `Las capacidades de API y automatización de ${a.name} y ${b.name} deben confirmarse en su documentación oficial; la tabla solo recoge información pública.`,
		pt: `As capacidades de API e automação de ${a.name} e ${b.name} devem ser confirmadas na documentação oficial; a tabela registra apenas informações públicas.`,
		ru: `Возможности API и автоматизации ${a.name} и ${b.name} следует проверять в официальной документации; в таблице указаны только открытые данные.`
	};
	return answers[locale];
}

/**
 * Shared "常见误区" (common pitfalls) shown on every comparison page. These are
 * general multi-account practices, not per-product claims, so they stay constant
 * across all 30 comparisons while the data-driven scenario text above differs.
 */
export function comparisonPitfalls(locale: Locale): string[] {
	const lists: Record<Locale, string[]> = {
		"zh-cn": [
			"只比较浏览器订阅价，忽略代理流量费。多账号场景里代理常按 GB 计费，可能超过浏览器本身的开销。",
			"用一个环境同时登录多个账号。环境复用是账号串联最常见的原因；每个账号应绑定独立环境，并保持代理、语言、时区长期一致。",
			"把「不可检测」当作绝对结论。不存在对所有站点都不可检测的工具，应以实际公开检测结果为准，而不是以宣传话术为准。",
			"只看免费环境数量，不看保留规则与功能边界。免费额度可能限制导出、自动化或环境保留天数，迁移前要先确认。"
		],
		en: [
			"Comparing only the browser subscription price and ignoring proxy traffic fees. In multi-account setups proxies are often billed per GB and can exceed the browser cost.",
			"Running several accounts inside one profile. Profile reuse may expose shared session or storage state; give each account its own profile and keep proxy, language and timezone stable over time.",
			"Treating \"undetectable\" as an absolute claim. No tool is undetectable to every site; judge by actual public detection results, not marketing wording.",
			"Looking only at the free profile count and ignoring retention rules and feature limits. Free tiers may cap exports, automation or how long profiles are kept — confirm before migrating."
		],
		ja: [
			"ブラウザの月額だけを比較し、プロキシ通信費を忘れる。マルチアカウントではプロキシが GB 課金でブラウザ代を超えることがあります。",
			"1 つのプロファイルで複数アカウントを運用する。プロファイルの使い回しはアカウント紐付けの最大の原因です。アカウントごとに独立した環境を割り当て、プロキシ・言語・タイムゾーンを長期で一致させてください。",
			"「検出不可能」を絶対視する。すべてのサイトで検出されないツールは存在しません。宣伝文句ではなく、実際の公開検出結果で判断してください。",
			"無料プロファイル数だけを見て、保持ルールや機能制限を確認しない。無料枠はエクスポートや自動化、保持日数を制限する場合があるため、移行前に確認が必要です。"
		],
		ko: [
			"브라우저 구독 가격만 비교하고 프록시 트래픽 비용을 빼먹기. 멀티 계정 환경에서는 프록시가 GB 단위로 과금되어 브라우저 비용을 넘을 수 있습니다.",
			"한 프로필에서 여러 계정 운영. 프로필 재사용은 계정 연동의 가장 흔한 원인입니다. 계정마다 독립된 환경을 주고 프록시·언어·시간대를 장기적으로 일치시키세요.",
			"\"검출 불가\"를 절대적인 사실로 받아들이기. 모든 사이트에서 검출되지 않는 도구는 없습니다. 마케팅 문구가 아닌 실제 공개 검출 결과로 판단하세요.",
			"무료 프로필 개수만 보고 보관 규칙과 기능 한계를 놓치기. 무료 등급은 내보내기·자동화·보관 일수를 제한할 수 있으니 이동 전에 확인하세요."
		],
		es: [
			"Solo comparar la suscripción del navegador e ignorar la facturación del tráfico de proxy. En entornos multicuenta el proxy suele cobrarse por GB y puede superar el coste del navegador.",
			"Usar un mismo perfil para varias cuentas. Reutilizar perfiles es la causa más común de vinculación de cuentas; asigna un perfil propio a cada cuenta y mantén proxy, idioma y zona horaria estables.",
			"Tomar \"indetectable\" como una afirmación absoluta. Ninguna herramienta es indetectable para todos los sitios; juzga por resultados de detección públicos, no por el marketing.",
			"Mirar solo la cantidad de perfiles gratis y pasar por alto las reglas de retención y los límites. La capa gratuita puede limitar exportaciones, automatización o días de retención; confírmalo antes de migrar."
		],
		pt: [
			"Comparar apenas a assinatura do navegador e esquecer o tráfego do proxy. Em contas múltiplas o proxy costuma ser cobrado por GB e pode passar o custo do navegador.",
			"Usar um único perfil para várias contas. Reutilizar perfis é a causa mais comum de vínculo entre contas; dê um perfil próprio a cada conta e mantenha proxy, idioma e fuso estáveis.",
			"Tratar \"indetectável\" como afirmação absoluta. Nenhuma ferramenta é indetectável para todos os sites; julgue por resultados públicos de detecção, não por marketing.",
			"Olhar só a quantidade de perfis grátis e ignorar regras de retenção e limites. O plano gratuito pode limitar exportações, automação ou retenção; confirme antes de migrar."
		],
		ru: [
			"Сравнивать только подписку браузера и игнорировать трафик прокси. При мультиаккаунтах прокси часто тарифицируется за ГБ и может превысить стоимость браузера.",
			"Вести несколько аккаунтов в одном профиле. Переиспользование профилей — самая частая причина привязки аккаунтов; выделяйте отдельный профиль каждому аккаунту и держите прокси, язык и часовой пояс стабильными.",
			"Считать \"необнаружимый\" абсолютным утверждением. Ни одна утилита не необнаружима для всех сайтов; оценивайте по публичным результатам детекта, а не по маркетингу.",
			"Смотреть только на число бесплатных профилей и игнорировать правила хранения и лимиты. Бесплатный уровень может ограничивать экспорт, автоматизацию или срок хранения — проверьте перед миграцией."
		]
	};
	return lists[locale];
}

/** FAQ answer: a proxy does not by itself guarantee no WebRTC leak. */
export function comparisonProxyAnswer(locale: Locale): string {
	const lists: Record<Locale, string> = {
		"zh-cn": "不一定。代理解决的是流量路径，但 WebRTC 的候选地址收集不一定遵循代理设置，可能直接暴露真实公网或局域网地址。应分别验证出口 IP、DNS 解析与 WebRTC 候选地址，三者一致才算配置正确。",
		en: "Not necessarily. A proxy fixes the traffic path, but WebRTC candidate collection may bypass the proxy and expose your real public or local address. Verify the exit IP, the DNS resolver and the WebRTC candidates separately; only when all three agree is the setup correct.",
		ja: "いいえ。プロキシは通信経路を解決しますが、WebRTC の候補収集はプロキシ設定に従わず、実際の公網や LAN アドレスを漏らすことがあります。出口 IP・DNS 解決・WebRTC 候補を別々に検証し、三者が一致して初めて正しい設定です。",
		ko: "아니요. 프록시는 트래픽 경로를 해결하지만 WebRTC 후보 수집이 프록시를 우회해 실제 공인·내부 주소를 노출할 수 있습니다. 출구 IP, DNS 확인, WebRTC 후보를 각각 검증하고 셋이 일치해야 올바른 설정입니다.",
		es: "No necesariamente. El proxy arregla la ruta del tráfico, pero la recolección de candidatos WebRTC puede omitir el proxy y exponer tu dirección pública o local real. Verifica la IP de salida, el resolutor DNS y los candidatos WebRTC por separado; solo cuando los tres coinciden la configuración es correcta.",
		pt: "Não necessariamente. O proxy corrige o caminho do tráfego, mas a coleta de candidatos WebRTC pode contornar o proxy e expor seu endereço público ou local real. Verifique o IP de saída, o resolvedor DNS e os candidatos WebRTC separadamente; só quando os três concordam a configuração está correta.",
		ru: "Не обязательно. Прокси исправляет путь трафика, но сбор кандидатов WebRTC может обходить прокси и раскрыть ваш реальный публичный или локальный адрес. Проверяйте исходящий IP, DNS-резолвер и кандидатов WebRTC по отдельности; настройка верна, только когда все три совпадают."
	};
	return lists[locale];
}

/** FAQ answer: one profile should not host several accounts. */
export function comparisonIsolationAnswer(locale: Locale): string {
	const lists: Record<Locale, string> = {
		"zh-cn": "不建议。同一个环境内登录多个账号是账号串联最常见的原因。正确做法是每个账号绑定独立环境，并保持代理、语言、时区与账号行为长期一致，再用公开检测工具确认环境稳定。",
		en: "No. Logging several accounts into one profile can expose shared sessions or storage. Give each account its own isolated profile, keep the proxy, language and timezone stable over time, then confirm stability with public detection tools.",
		ja: "おすすめしません。1 つのプロファイルで複数アカウントを運用するのはアカウント紐付けの最も一般的な原因です。アカウントごとに独立した環境を割り当て、プロキシ・言語・タイムゾーンを長期で一致させ、公開検出ツールで安定性を確認してください。",
		ko: "권장하지 않습니다. 한 프로필에서 여러 계정을 운영하는 것은 계정 연동의 가장 흔한 원인입니다. 계정마다 독립된 환경을 주고 프록시·언어·시간대를 장기적으로 일치시킨 뒤 공개 검출 도구로 안정성을 확인하세요.",
		es: "No. Iniciar sesión con varias cuentas en un mismo perfil es la causa más común de vinculación de cuentas. Asigna un perfil aislado a cada cuenta, mantén proxy, idioma y zona horaria estables y confirma la estabilidad con herramientas de detección públicas.",
		pt: "Não. Usar várias contas em um único perfil é a causa mais comum de vínculo entre contas. Dê a cada conta um perfil isolado, mantenha proxy, idioma e fuso estáveis e confirme a estabilidade com ferramentas de detecção públicas.",
		ru: "Нет. Вход нескольких аккаунтов в один профиль — самая частая причина привязки аккаунтов. Выделяйте каждому аккаунту изолированный профиль, держите прокси, язык и часовой пояс стабильными и подтверждайте стабильность публичными инструментами детекта."
	};
	return lists[locale];
}

// The catalog is a discriminated union at runtime; this helper intentionally reads fields selected by `kind`.
const browserTypeLabel: Record<string, string> = { commercial: "商业", "open-source": "开源", freemium: "免费增值", free: "免费" };

// `item` is narrowed by `kind` at runtime rather than by a TS discriminated union, because the
// catalog is assembled from several JSON files with different shapes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function localizedResourceDescription(locale: Locale, kind: LocalizedKind, item: any) {
	if (locale === "zh-cn") {
		if (kind === "browsers" && "longDescription" in item && "type" in item) {
			const facts = [item.free, item.price, item.platforms?.length ? `平台 ${item.platforms.join("、")}` : ""].filter(Boolean);
			return `${item.name} 是${browserTypeLabel[item.type] ?? item.type}指纹浏览器，用于多账号环境隔离、自动化与隐私研究。${facts.join("；")}。`;
		}
		if (kind === "tools" && "category" in item)
			return `${item.name} 是面向${item.category}的公开工具，用于浏览器指纹、网络或自动化研究。使用前请阅读官方说明并在合规范围内使用。`;
		if (kind === "fingerprint" && "category" in item)
			return `${item.name} 是浏览器指纹中的信号维度，用于研究渲染、设备、语言、网络与存储的一致性。`;
		if (kind === "guides" && "title" in item) return item.description;
		return item.description;
	}
	if (kind === "compare" && "browsers" in item) {
		const a = browsers.find(browser => browser.slug === item.browsers[0]) ?? browsers[0];
		const b = browsers.find(browser => browser.slug === item.browsers[1]) ?? browsers[1];
		return comparisonCopy(locale, a, b).overview;
	}
	if (kind === "browsers" && "longDescription" in item && "type" in item) {
		const isCjk = (value: unknown) => typeof value === "string" && /[\u4e00-\u9fff]/.test(value);
		const enFacts: string[] = [];
		if (Array.isArray(item.platforms) && item.platforms.length) enFacts.push(`Runs on ${item.platforms.join(", ")}`);
		if (item.price && !isCjk(item.price) && item.price !== "以官网为准") enFacts.push(`plans from ${item.price}`);
		const templates: Partial<Record<Locale, string>> = {
			en: `${item.name} is a ${item.type} anti-detect browser for multi-account isolation, automation and privacy research.${enFacts.length ? ` ${enFacts.join("; ")}.` : ""}`,
			ja: `${item.name} は分離されたブラウザ環境、マルチアカウント運用、プライバシー研究向けの ${item.type} ブラウザです。料金と公開機能は公式情報で確認してください。`,
			ko: `${item.name}은(는) 격리된 브라우저 환경과 멀티 계정 워크플로를 위한 ${item.type} 브라우저 리소스입니다. 요금과 공개 기능은 공식 정보를 확인하세요.`,
			es: `${item.name} es un recurso de navegador ${item.type} para entornos aislados y flujos multicuenta. Revisa sus plataformas y funciones públicas antes de elegir un plan.`,
			pt: `${item.name} é um recurso de navegador ${item.type} para ambientes isolados e fluxos multi-conta. Confira plataformas e recursos públicos antes de escolher um plano.`,
			ru: `${item.name} — это ресурс ${item.type}-браузера для изолированных сред и мультиаккаунт-сценариев. Перед выбором тарифа проверьте платформы и открытые функции.`
		};
		return templates[locale] ?? item.longDescription;
	}
	if (kind === "tools" && "category" in item) return ({ en: `${item.name} is a public ${item.categorySlug ? String(item.categorySlug).replace(/-/g, " ") : item.category} tool for browser fingerprint, network or automation research. Review the official documentation and test conditions before relying on results.`, ja: `${item.name} はブラウザ、ネットワーク、自動化研究向けの公開 ${item.category} リソースです。結果を利用する前に公式ドキュメントを確認してください。`, ko: `${item.name}은(는) 브라우저·네트워크·자동화 연구를 위한 공개 ${item.category} 리소스입니다. 결과를 사용하기 전에 공식 문서를 확인하세요.`, es: `${item.name} es un recurso público de ${item.category} para investigar navegadores, redes o automatización. Consulta su documentación oficial.`, pt: `${item.name} é um recurso público de ${item.category} para pesquisa de navegadores, redes ou automação. Consulte a documentação oficial.`, ru: `${item.name} — открытый ресурс категории «${item.category}» для исследования браузеров, сетей или автоматизации. Изучите официальную документацию.` } as Record<Locale, string>)[locale];
	if (kind === "fingerprint" && "category" in item) return ({ en: `${item.name} is a browser fingerprint signal used to study rendering, device, language, network or storage consistency.`, ja: `${item.name} はレンダリング、端末、言語、ネットワーク、ストレージの一貫性を調べるブラウザ指紋信号です。`, ko: `${item.name}은(는) 렌더링, 장치, 언어, 네트워크 또는 저장소 일관성을 분석하는 브라우저 핑거프린트 신호입니다.`, es: `${item.name} es una señal de huella del navegador relacionada con la coherencia de renderizado, dispositivo, idioma, red o almacenamiento.`, pt: `${item.name} é um sinal de fingerprint usado para estudar a consistência de renderização, dispositivo, idioma, rede ou armazenamento.`, ru: `${item.name} — сигнал браузерного отпечатка для анализа согласованности рендеринга, устройства, языка, сети или хранилища.` } as Record<Locale, string>)[locale];
	if (kind === "guides" && "title" in item) return ({ en: `A practical BrowserHub guide covering browser selection, profile isolation, proxy setup, fingerprint checks and responsible use.`, ja: `ブラウザ選定、プロファイル分離、プロキシ設定、指紋チェックと適切な利用を扱う BrowserHub の実用ガイドです。`, ko: `브라우저 선택, 프로필 분리, 프록시 설정, 핑거프린트 점검과 책임 있는 사용을 다루는 BrowserHub 실용 가이드입니다.`, es: `Guía práctica de BrowserHub sobre selección de navegadores, aislamiento de perfiles, proxies, huellas y uso responsable.`, pt: `Guia prático do BrowserHub sobre escolha de navegadores, isolamento de perfis, proxies, fingerprints e uso responsável.`, ru: `Практическое руководство BrowserHub по выбору браузера, изоляции профилей, прокси, отпечаткам и ответственному использованию.` } as Record<Locale, string>)[locale];
	return item.description;
}
