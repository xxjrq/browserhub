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

/**
 * Footer copy.
 *
 * `components/layout/footer.tsx` renders inside the root layout, so it is emitted on
 * every localized URL. Its links and headings were hard-coded Chinese, which put a
 * Chinese nav block at the bottom of all 956 non-Chinese pages and contradicted the
 * language promise made by <title> and hreflang. Kept separate from `t()` because the
 * footer needs link labels and section headings rather than page metadata.
 */
export type FooterCopy = {
	tagline: string;
	sections: { resources: string; project: string; community: string };
	links: { browsers: string; tools: string; fingerprint: string; guides: string; compare: string; about: string; contact: string; privacy: string; telegram: string; easybr: string; qq: string };
	disclaimer: string;
};

const footerCopy: Record<Locale, FooterCopy> = {
	"zh-cn": {
		tagline: "收录指纹浏览器、检测工具、自动化框架与隐私技术资源，信息以官方页面为准。",
		sections: { resources: "资源", project: "项目", community: "社区与产品" },
		links: { browsers: "指纹浏览器", tools: "检测工具", fingerprint: "指纹技术", guides: "指南与教程", compare: "浏览器对比", about: "关于项目", contact: "联系与贡献", privacy: "隐私说明", telegram: "Telegram 社区", easybr: "EasyBR 官网", qq: "QQ 群：967818141" },
		disclaimer: "信息仅供资源整理与研究参考 · 价格与功能以官方页面为准"
	},
	en: {
		tagline: "A curated catalogue of anti-detect browsers, detection tools, automation frameworks and privacy resources. Verify details on official pages.",
		sections: { resources: "Resources", project: "Project", community: "Community" },
		links: { browsers: "Anti-detect browsers", tools: "Detection tools", fingerprint: "Fingerprinting", guides: "Guides", compare: "Comparisons", about: "About", contact: "Contact & contribute", privacy: "Privacy", telegram: "Telegram community", easybr: "EasyBR official site", qq: "QQ group: 967818141" },
		disclaimer: "For resource curation and research only · Verify prices and features on official pages"
	},
	ja: {
		tagline: "指紋ブラウザ、検出ツール、自動化フレームワーク、プライバシー技術のリソースを掲載。最新情報は公式サイトをご確認ください。",
		sections: { resources: "リソース", project: "プロジェクト", community: "コミュニティ" },
		links: { browsers: "指紋ブラウザ", tools: "検出ツール", fingerprint: "指紋技術", guides: "ガイド", compare: "比較", about: "プロジェクトについて", contact: "連絡・貢献", privacy: "プライバシー", telegram: "Telegram コミュニティ", easybr: "EasyBR 公式サイト", qq: "QQ グループ：967818141" },
		disclaimer: "リソース整理と研究のための参考情報 · 価格と機能は公式サイトで確認してください"
	},
	ko: {
		tagline: "핑거프린트 브라우저, 탐지 도구, 자동화 프레임워크, 개인정보 기술 리소스를 정리했습니다. 최신 정보는 공식 사이트에서 확인하세요.",
		sections: { resources: "리소스", project: "프로젝트", community: "커뮤니티" },
		links: { browsers: "핑거프린트 브라우저", tools: "탐지 도구", fingerprint: "핑거프린팅", guides: "가이드", compare: "비교", about: "프로젝트 소개", contact: "연락 및 기여", privacy: "개인정보", telegram: "Telegram 커뮤니티", easybr: "EasyBR 공식 사이트", qq: "QQ 그룹: 967818141" },
		disclaimer: "리소스 정리와 연구를 위한 참고 정보 · 가격과 기능은 공식 사이트에서 확인하세요"
	},
	es: {
		tagline: "Catálogo de recursos de navegadores anti-detección, herramientas de detección, frameworks de automatización y recursos de privacidad. Verifica los detalles en las páginas oficiales.",
		sections: { resources: "Recursos", project: "Proyecto", community: "Comunidad" },
		links: { browsers: "Navegadores anti-detección", tools: "Herramientas de detección", fingerprint: "Huella del navegador", guides: "Guías", compare: "Comparativas", about: "Acerca de", contact: "Contacto y contribuciones", privacy: "Privacidad", telegram: "Comunidad de Telegram", easybr: "Sitio oficial de EasyBR", qq: "Grupo QQ: 967818141" },
		disclaimer: "Solo para curar recursos e investigación · Verifica precios y funciones en las páginas oficiales"
	},
	pt: {
		tagline: "Catálogo de recursos de navegadores anti-detecção, ferramentas de detecção, frameworks de automação e recursos de privacidade. Verifique os detalhes nos sites oficiais.",
		sections: { resources: "Recursos", project: "Projeto", community: "Comunidade" },
		links: { browsers: "Navegadores anti-detecção", tools: "Ferramentas de detecção", fingerprint: "Fingerprint", guides: "Guias", compare: "Comparações", about: "Sobre", contact: "Contato e contribuição", privacy: "Privacidade", telegram: "Comunidade Telegram", easybr: "Site oficial do EasyBR", qq: "Grupo QQ: 967818141" },
		disclaimer: "Apenas para curadoria de recursos e pesquisa · Confirme preços e recursos nos sites oficiais"
	},
	ru: {
		tagline: "Каталог ресурсов антидетект-браузеров, инструментов проверки, фреймворков автоматизации и ресурсов о приватности. Проверяйте данные на официальных сайтах.",
		sections: { resources: "Ресурсы", project: "Проект", community: "Сообщество" },
		links: { browsers: "Антидетект-браузеры", tools: "Инструменты проверки", fingerprint: "Отпечаток браузера", guides: "Руководства", compare: "Сравнения", about: "О проекте", contact: "Контакты и вклад", privacy: "Конфиденциальность", telegram: "Сообщество Telegram", easybr: "Официальный сайт EasyBR", qq: "QQ-группа: 967818141" },
		disclaimer: "Только для подбора ресурсов и исследований · Проверяйте цены и функции на официальных сайтах"
	}
};

export const footer = (locale: Locale): FooterCopy => footerCopy[locale];

/**
 * Accessible names for header controls.
 *
 * These were hard-coded Chinese aria-labels on a client component, so screen-reader
 * users navigating an English or Japanese page heard Chinese control names. They are
 * not visible text, but they are still part of the page's language contract.
 */
const a11yCopy: Record<Locale, { mainNav: string; mobileNav: string; language: string; lightTheme: string; darkTheme: string; openMenu: string; closeMenu: string }> = {
	"zh-cn": { mainNav: "主导航", mobileNav: "移动端主导航", language: "选择语言", lightTheme: "切换到浅色主题", darkTheme: "切换到深色主题", openMenu: "打开菜单", closeMenu: "关闭菜单" },
	en: { mainNav: "Main navigation", mobileNav: "Mobile navigation", language: "Select language", lightTheme: "Switch to light theme", darkTheme: "Switch to dark theme", openMenu: "Open menu", closeMenu: "Close menu" },
	ja: { mainNav: "メインナビゲーション", mobileNav: "モバイルナビゲーション", language: "言語を選択", lightTheme: "ライトテーマに切り替え", darkTheme: "ダークテーマに切り替え", openMenu: "メニューを開く", closeMenu: "メニューを閉じる" },
	ko: { mainNav: "주요 탐색", mobileNav: "모바일 탐색", language: "언어 선택", lightTheme: "라이트 테마로 전환", darkTheme: "다크 테마로 전환", openMenu: "메뉴 열기", closeMenu: "메뉴 닫기" },
	es: { mainNav: "Navegación principal", mobileNav: "Navegación móvil", language: "Seleccionar idioma", lightTheme: "Cambiar al tema claro", darkTheme: "Cambiar al tema oscuro", openMenu: "Abrir menú", closeMenu: "Cerrar menú" },
	pt: { mainNav: "Navegação principal", mobileNav: "Navegação móvel", language: "Selecionar idioma", lightTheme: "Mudar para o tema claro", darkTheme: "Mudar para o tema escuro", openMenu: "Abrir menu", closeMenu: "Fechar menu" },
	ru: { mainNav: "Основная навигация", mobileNav: "Мобильная навигация", language: "Выбрать язык", lightTheme: "Переключить на светлую тему", darkTheme: "Переключить на тёмную тему", openMenu: "Открыть меню", closeMenu: "Закрыть меню" }
};

export const a11y = (locale: Locale) => a11yCopy[locale];

export function contentLocales(path: string): readonly Locale[] {
	return /^guides\/[^/]+/.test(path) ? ["zh-cn", "en"] : locales;
}

export function contentPath(locale: Locale, path: string) {
	return localePath(contentLocales(path).includes(locale) ? locale : "en", path);
}
