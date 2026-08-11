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
		homeDescription: "统一整理指纹浏览器、浏览器指纹检测、自动化工具、代理与隐私技术资源。",
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
		homeTitle: "Anti-Detect Browser & Privacy Resource Hub", homeDescription: "A curated database of anti-detect browsers, fingerprint detection, automation, proxy and privacy resources.",
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
	return {
		title: `${name} | ${section}`,
		description: `${name} — ${section}. ${labels.sourceNote}`
	};
}
