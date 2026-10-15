import { browsers, comparisons, guides, technologies, tools, type BrowserResource, type ComparisonResource, type GuideResource, type TechnologyResource, type ToolResource } from "@/data/resources";

export const locales = ["zh-cn", "en", "ja", "ko", "es", "pt", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { htmlLang: string; hreflang: string; label: string; ogLocale: string }> = {
	"zh-cn": { htmlLang: "zh-CN", hreflang: "zh-CN", label: "中文", ogLocale: "zh_CN" },
	en: { htmlLang: "en", hreflang: "en", label: "English", ogLocale: "en_US" },
	ja: { htmlLang: "ja", hreflang: "ja", label: "日本語", ogLocale: "ja_JP" },
	ko: { htmlLang: "ko", hreflang: "ko", label: "한국어", ogLocale: "ko_KR" },
	es: { htmlLang: "es", hreflang: "es", label: "Español", ogLocale: "es_ES" },
	pt: { htmlLang: "pt", hreflang: "pt", label: "Português", ogLocale: "pt_BR" },
	ru: { htmlLang: "ru", hreflang: "ru", label: "Русский", ogLocale: "ru_RU" }
};

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const localePath = (locale: Locale, path = "") => {
	const normalized = path.replace(/^\/+|\/+$/g, "");
	return normalized ? `/${locale}/${normalized}/` : `/${locale}/`;
};

export const localeFromPath = (pathname: string): Locale => {
	const candidate = pathname.split("/")[1];
	return isLocale(candidate) ? candidate : "zh-cn";
};

const copy = {
	"zh-cn": {
		homeTitle: "指纹浏览器与隐私资源中心",
		homeDescription: "BrowserHub 整理指纹浏览器、检测与自动化工具、代理与隐私资源，帮助跨境电商、社媒运营与开发者对比多账号浏览器的免费额度、价格与能力。",
		browsers: "指纹浏览器大全", tools: "检测与自动化工具", fingerprint: "浏览器指纹技术", guides: "指南与教程", compare: "浏览器对比",
		browse: "浏览资源", details: "查看详情", official: "访问官网", entries: "条目", updated: "更新于", sourceNote: "价格、套餐和功能请以官方页面为准。",
		browserIntro: "收录公开的反检测浏览器和多账号浏览器，统一比较平台、免费额度、价格、API、自动化与代理能力。",
		toolIntro: "整理浏览器指纹检测、网络测试、自动化和隐私工具，帮助你选择合适的验证路径。",
		fingerprintIntro: "理解 Canvas、WebGL、WebRTC、TLS、语言、时区和存储等浏览器环境信号。",
		guideIntro: "从产品选型、环境隔离、代理配置到指纹排查，提供可执行的公开资料整理。",
		compareIntro: "使用统一字段比较免费额度、价格、平台、内核、存储、API、自动化和代理。",
		about: "关于项目", contact: "联系与贡献", privacy: "隐私说明", home: "首页", related: "相关资源", features: "主要能力", specs: "规格信息", bestFor: "适用场景", limitations: "限制与注意事项", faq: "常见问题", howTo: "使用方法", detection: "检测方式", mitigation: "合规防护思路", comparisonTable: "统一字段对比"
	},
	en: {
		homeTitle: "Anti-Detect Browser & Privacy Resource Hub", homeDescription: "BrowserHub catalogs anti-detect browsers, fingerprint detection, automation, proxy and privacy tools. Compare free plans, pricing and capabilities.",
		browsers: "Anti-Detect Browsers", tools: "Detection & Automation Tools", fingerprint: "Browser Fingerprint Technology", guides: "Guides & Tutorials", compare: "Browser Comparisons",
		browse: "Browse resources", details: "View details", official: "Official website", entries: "entries", updated: "Updated", sourceNote: "Verify current pricing, plans and features on the official website.",
		browserIntro: "Compare public anti-detect and multi-account browsers by platforms, free plans, pricing, APIs, automation and proxy support.", toolIntro: "Explore fingerprint detection, network testing, automation and privacy tools for practical research.", fingerprintIntro: "Learn how Canvas, WebGL, WebRTC, TLS, language, timezone and storage signals identify browser environments.", guideIntro: "Practical, source-based guides for browser selection, profile isolation, proxy setup and fingerprint checks.", compareIntro: "Compare free plans, pricing, platforms, engines, storage, APIs, automation and proxy support using the same fields.",
		about: "About", contact: "Contact & contribute", privacy: "Privacy", home: "Home", related: "Related resources", features: "Key capabilities", specs: "Specifications", bestFor: "Best for", limitations: "Limitations", faq: "FAQ", howTo: "How to use", detection: "Detection", mitigation: "Responsible use", comparisonTable: "Comparison table"
	},
	ja: {
		homeTitle: "指紋ブラウザとプライバシー情報ハブ", homeDescription: "指紋ブラウザ、検出ツール、自動化、プロキシ、プライバシー情報を整理したデータベースです。",
		browsers: "指紋ブラウザ一覧", tools: "検出・自動化ツール", fingerprint: "ブラウザ指紋技術", guides: "ガイドとチュートリアル", compare: "ブラウザ比較", browse: "リソースを見る", details: "詳細を見る", official: "公式サイト", entries: "件", updated: "更新", sourceNote: "料金・プラン・機能は公式サイトで確認してください。", browserIntro: "指紋ブラウザとマルチアカウントブラウザを、料金、環境数、API、自動化、プロキシで比較します。", toolIntro: "指紋検出、ネットワークテスト、自動化、プライバシー関連の公開ツールを整理しています。", fingerprintIntro: "Canvas、WebGL、WebRTC、TLS、言語、タイムゾーン、ストレージの信号を解説します。", guideIntro: "ブラウザ選定、環境分離、プロキシ設定、指紋チェックの実用ガイドです。", compareIntro: "同じ項目で無料枠、料金、OS、エンジン、API、自動化、プロキシを比較します。", about: "プロジェクトについて", contact: "連絡・貢献", privacy: "プライバシー", home: "ホーム", related: "関連リソース", features: "主な機能", specs: "仕様", bestFor: "おすすめ用途", limitations: "制限事項", faq: "よくある質問", howTo: "使い方", detection: "検出方法", mitigation: "適切な利用", comparisonTable: "比較表"
	},
	ko: {
		homeTitle: "핑거프린트 브라우저와 개인정보 리소스 허브", homeDescription: "핑거프린트 브라우저, 탐지 도구, 자동화, 프록시와 개인정보 리소스를 정리한 데이터베이스입니다.", browsers: "핑거프린트 브라우저", tools: "탐지 및 자동화 도구", fingerprint: "브라우저 핑거프린트 기술", guides: "가이드와 튜토리얼", compare: "브라우저 비교", browse: "리소스 보기", details: "상세 보기", official: "공식 웹사이트", entries: "개", updated: "업데이트", sourceNote: "가격과 기능은 공식 사이트에서 확인하세요.", browserIntro: "멀티 계정 브라우저를 플랫폼, 무료 플랜, 가격, API, 자동화와 프록시 기준으로 비교합니다.", toolIntro: "핑거프린트 탐지, 네트워크 테스트, 자동화와 개인정보 도구를 정리합니다.", fingerprintIntro: "Canvas, WebGL, WebRTC, TLS, 언어, 시간대와 저장소 신호를 설명합니다.", guideIntro: "브라우저 선택, 프로필 분리, 프록시 설정과 핑거프린트 점검을 위한 실용 가이드입니다.", compareIntro: "동일한 항목으로 무료 플랜, 가격, 플랫폼, 엔진, API, 자동화와 프록시를 비교합니다.", about: "프로젝트 소개", contact: "연락 및 기여", privacy: "개인정보", home: "홈", related: "관련 리소스", features: "주요 기능", specs: "사양", bestFor: "추천 용도", limitations: "제한 사항", faq: "FAQ", howTo: "사용 방법", detection: "탐지 방법", mitigation: "책임 있는 사용", comparisonTable: "비교표"
	},
	es: {
		homeTitle: "Centro de recursos de navegadores anti-detección", homeDescription: "Base de datos de navegadores anti-detección, detección de huella, automatización, proxies y privacidad.", browsers: "Navegadores anti-detección", tools: "Herramientas de detección y automatización", fingerprint: "Tecnología de huella del navegador", guides: "Guías y tutoriales", compare: "Comparativas", browse: "Explorar recursos", details: "Ver detalles", official: "Sitio oficial", entries: "entradas", updated: "Actualizado", sourceNote: "Verifica precios, planes y funciones en el sitio oficial.", browserIntro: "Compara navegadores anti-detección y multicuenta por plataforma, plan gratuito, precio, API, automatización y proxy.", toolIntro: "Herramientas públicas para detectar huellas, probar redes, automatizar y estudiar la privacidad.", fingerprintIntro: "Explicación de señales Canvas, WebGL, WebRTC, TLS, idioma, zona horaria y almacenamiento.", guideIntro: "Guías prácticas para elegir navegador, aislar perfiles, configurar proxies y revisar huellas.", compareIntro: "Compara planes gratuitos, precios, plataformas, motores, almacenamiento, API, automatización y proxy.", about: "Sobre el proyecto", contact: "Contacto y contribuciones", privacy: "Privacidad", home: "Inicio", related: "Recursos relacionados", features: "Funciones", specs: "Especificaciones", bestFor: "Ideal para", limitations: "Limitaciones", faq: "Preguntas frecuentes", howTo: "Cómo usar", detection: "Detección", mitigation: "Uso responsable", comparisonTable: "Tabla comparativa"
	},
	pt: {
		homeTitle: "Central de recursos de navegadores anti-detecção", homeDescription: "Base de dados de navegadores anti-detecção, detecção de fingerprint, automação, proxies e privacidade.", browsers: "Navegadores anti-detecção", tools: "Ferramentas de detecção e automação", fingerprint: "Tecnologia de fingerprint", guides: "Guias e tutoriais", compare: "Comparações", browse: "Explorar recursos", details: "Ver detalhes", official: "Site oficial", entries: "itens", updated: "Atualizado", sourceNote: "Confirme preços, planos e recursos no site oficial.", browserIntro: "Compare navegadores anti-detecção e multi-conta por plataforma, plano gratuito, preço, API, automação e proxy.", toolIntro: "Ferramentas públicas para testar fingerprint, rede, automação e privacidade.", fingerprintIntro: "Entenda sinais de Canvas, WebGL, WebRTC, TLS, idioma, fuso horário e armazenamento.", guideIntro: "Guias práticos para escolher navegadores, separar perfis, configurar proxies e verificar fingerprints.", compareIntro: "Compare planos gratuitos, preços, plataformas, engines, armazenamento, API, automação e proxy.", about: "Sobre o projeto", contact: "Contato e contribuição", privacy: "Privacidade", home: "Início", related: "Recursos relacionados", features: "Principais recursos", specs: "Especificações", bestFor: "Indicado para", limitations: "Limitações", faq: "Perguntas frequentes", howTo: "Como usar", detection: "Detecção", mitigation: "Uso responsável", comparisonTable: "Tabela comparativa"
	},
	ru: {
		homeTitle: "Центр ресурсов антидетект-браузеров", homeDescription: "База антидетект-браузеров, инструментов анализа отпечатка, автоматизации, прокси и приватности.", browsers: "Антидетект-браузеры", tools: "Инструменты проверки и автоматизации", fingerprint: "Технологии браузерного отпечатка", guides: "Руководства и инструкции", compare: "Сравнение браузеров", browse: "Открыть ресурсы", details: "Подробнее", official: "Официальный сайт", entries: "записей", updated: "Обновлено", sourceNote: "Актуальные цены и функции проверяйте на официальном сайте.", browserIntro: "Сравнение антидетект- и мультиаккаунт-браузеров по платформам, тарифам, API, автоматизации и прокси.", toolIntro: "Открытые инструменты для проверки отпечатка, сети, автоматизации и приватности.", fingerprintIntro: "Объяснение сигналов Canvas, WebGL, WebRTC, TLS, языка, часового пояса и хранилища.", guideIntro: "Практические руководства по выбору браузера, изоляции профилей, прокси и проверке отпечатка.", compareIntro: "Сравнивайте бесплатные планы, цены, платформы, движки, API, автоматизацию и прокси.", about: "О проекте", contact: "Контакты и вклад", privacy: "Конфиденциальность", home: "Главная", related: "Связанные ресурсы", features: "Возможности", specs: "Характеристики", bestFor: "Подходит для", limitations: "Ограничения", faq: "FAQ", howTo: "Как использовать", detection: "Проверка", mitigation: "Ответственное использование", comparisonTable: "Таблица сравнения"
	}
} as const;

export type LocaleCopy = (typeof copy)[Locale];
export const t = (locale: Locale): LocaleCopy => copy[locale];

export type LocalizedKind = "home" | "browsers" | "tools" | "fingerprint" | "guides" | "compare";
export const manifestPaths = [
	"", "browsers", "tools", "fingerprint", "guides", "compare", "about", "contact", "privacy",
	...browsers.map(item => `browsers/${item.slug}`),
	...tools.map(item => `tools/${item.slug}`),
	...technologies.map(item => `fingerprint/${item.slug}`),
	...guides.map(item => `guides/${item.slug}`),
	...comparisons.map(item => `compare/${item.slug}`)
];

export const allLocaleParams = locales.flatMap(locale => manifestPaths.map(path => ({ locale, segments: path ? path.split("/") : [] })));

export function hreflangFor(path: string) {
	return Object.fromEntries([
		...locales.map(locale => [localeMeta[locale].hreflang, `https://browserhub.co${localePath(locale, path)}`]),
		["x-default", path ? `https://browserhub.co/${path.replace(/^\/+|\/+$/g, "")}/` : "https://browserhub.co/"]
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
		return { title: `${name} | ${labels.guides}`, description: resource.description };
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
	return templates[locale];
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
export function relatedLinks(locale: Locale, kind: LocalizedKind, item: any, limit = 6): RelatedLink[] {
	const link = (targetKind: LocalizedKind, entry: any): RelatedLink => {
		const title = "name" in entry ? entry.name : "title" in entry ? entry.title : entry.slug;
		return { href: localePath(locale, `${targetKind}/${entry.slug}`), title, description: localizedResourceDescription(locale, targetKind, entry), kind: targetKind };
	};
	const pick = (entries: RelatedLink[]) => entries.filter(Boolean).slice(0, limit);

	if (kind === "browsers") {
		const slug = item.slug as string;
		const vsBrowsers = comparisons.filter(entry => entry.browsers.includes(slug)).slice(0, 3).map(entry => link("compare", entry));
		const alternatives = browsers.filter(entry => entry.slug !== slug).sort((a, b) => b.rating - a.rating).slice(0, 3).map(entry => link("browsers", entry));
		const guidesForBrowser = guides.filter(entry => entry.relatedBrowsers?.includes(slug)).slice(0, 2).map(entry => link("guides", entry));
		return pick([...vsBrowsers, ...alternatives, ...guidesForBrowser]);
	}

	if (kind === "compare") {
		const pair = item.browsers as [string, string];
		const subjects = pair.map(slug => browsers.find(entry => entry.slug === slug)).filter(Boolean).map(entry => link("browsers", entry));
		const siblings = comparisons.filter(entry => entry.slug !== item.slug && entry.browsers.some(slug => pair.includes(slug))).slice(0, 3).map(entry => link("compare", entry));
		return pick([...subjects, ...siblings]);
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
	const otherGuides = guides.filter(entry => entry.slug !== guide.slug && entry.category === guide.category).slice(0, 2).map(entry => link("guides", entry));
	// Guides usually carry no curated relations, so fall back to top-rated browsers and
	// detection tools. Without this most guide pages would render no internal links at all.
	const fallbackBrowsers = browsers.filter(entry => entry.rating >= 4.5).slice(0, 3).map(entry => link("browsers", entry));
	const fallbackTools = tools.filter(entry => entry.categorySlug.includes("detection") || entry.categorySlug.includes("fingerprint")).slice(0, 2).map(entry => link("tools", entry));
	return pick([...relatedBrowserLinks, ...relatedToolLinks, ...otherGuides, ...fallbackBrowsers, ...fallbackTools]);
}

export function comparisonFaq(locale: Locale, a: BrowserResource, b: BrowserResource, copy: ReturnType<typeof comparisonCopy>) {
	const questions: Record<Locale, [string, string, string]> = {
		"zh-cn": [`${a.name} 和 ${b.name} 哪个更适合我？`, `${copy.fields.price}如何确认？`, `${copy.fields.api}和${copy.fields.automation}是否相同？`],
		en: [`Which is a better fit: ${a.name} or ${b.name}?`, `How should I verify the ${copy.fields.price.toLowerCase()}?`, `Do ${copy.fields.api} and ${copy.fields.automation.toLowerCase()} mean the same thing?`],
		ja: [`${a.name} と ${b.name} はどちらが適していますか？`, `${copy.fields.price}はどこで確認できますか？`, `${copy.fields.api}と${copy.fields.automation}は同じですか？`],
		ko: [`${a.name}과(와) ${b.name} 중 어느 쪽이 적합한가요?`, `${copy.fields.price}는 어디에서 확인하나요?`, `${copy.fields.api}와(과) ${copy.fields.automation}은 같은 의미인가요?`],
		es: [`¿Qué opción encaja mejor: ${a.name} o ${b.name}?`, `¿Cómo se debe verificar el ${copy.fields.price.toLowerCase()}?`, `¿La ${copy.fields.api} es lo mismo que la ${copy.fields.automation.toLowerCase()}?`],
		pt: [`Qual opção é mais adequada: ${a.name} ou ${b.name}?`, `Como confirmar o ${copy.fields.price.toLowerCase()}?`, `${copy.fields.api} e ${copy.fields.automation.toLowerCase()} são a mesma coisa?`],
		ru: [`Что лучше подходит: ${a.name} или ${b.name}?`, `Где проверить ${copy.fields.price.toLowerCase()}?`, `${copy.fields.api} и ${copy.fields.automation.toLowerCase()} — это одно и то же?`]
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

// The catalog is a discriminated union at runtime; this helper intentionally reads fields selected by `kind`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const browserTypeLabel: Record<string, string> = { commercial: "商业", "open-source": "开源", freemium: "免费增值", free: "免费" };

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
