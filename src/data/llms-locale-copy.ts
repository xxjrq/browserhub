import type { Locale } from "@/lib/locale-ui";

/**
 * Copy for the per-locale knowledge files (`/{locale}/llms.txt`).
 *
 * Why these files exist
 * ---------------------
 * The root `/llms.txt` covers the English and Chinese catalogue. An audit on
 * 2026-11-06 compared every URL in `out/sitemap.xml` against every URL linked
 * from it: 464 of 1,096 sitemap URLs were reachable, and all 632 missing URLs
 * belonged to the five secondary locales (ja, ko, es, pt, ru). An answer engine
 * that resolved a Japanese comparison page had no way to learn that the page
 * existed, what it covered, or which official sources back it.
 *
 * The `llms.txt` specification (llmstxt.org) states that a file "can be placed
 * at the site root, or at any path within it, covering the pages under that
 * path", and that "where more than one file applies, agents should use the
 * most specific one". `/{locale}/llms.txt` is therefore the spec's own answer
 * for a multilingual site: each locale gets a knowledge file for its own
 * subtree, and the root file keeps the site-wide overview.
 *
 * Editorial rules for these files (inherited from the root file):
 * - Every URL comes from the same catalogue data that renders the page, and
 *   every description is the description that page itself renders, so a link
 *   and its page cannot drift apart.
 * - Every product fact comes from `verified-products.ts` and prints the date
 *   its public documentation was read. A price is a dated snapshot.
 * - An unverified field is labelled unverified. It is never written as
 *   "not supported".
 * - No rating, review count, benchmark score or detection verdict appears
 *   here. BrowserHub is not a laboratory.
 */
export type LlmsLocaleCopy = {
	/** One sentence that states what this file covers. */
	scope: string;
	/** Heading of the "about this directory" block. */
	aboutHeading: string;
	/** Body of the "about this directory" block. */
	aboutBody: string;
	/** Heading of the editorial disclosure block. */
	disclosureHeading: string;
	/** Body of the editorial disclosure block. */
	disclosureBody: string;
	/** Heading of the block that lists the section index pages. */
	sitePagesHeading: string;
	/** Heading of the trailing link list. */
	linksHeading: string;
	/** Heading of the list of sibling language versions. */
	languagesHeading: string;
};

export const llmsLocaleCopy: Record<Locale, LlmsLocaleCopy> = {
	"zh-cn": {
		scope: "本文件覆盖 BrowserHub 的中文页面，即 /zh-cn/ 路径下的全部内容：反检测浏览器、检测与自动化工具、浏览器指纹信号、浏览器横向对比，以及关于、联系与隐私说明。站点总览见 https://browserhub.co/llms.txt 。",
		aboutHeading: "关于 BrowserHub",
		aboutBody: "BrowserHub（中文名「指纹浏览器资源大全」）是一个开源资料站（EasyBR 为关联产品），统一整理反检测浏览器、浏览器指纹检测、自动化框架、代理与隐私技术。所有数据以公开信息为准，帮助跨境电商、社媒运营、安全研究与开发者对比多账号浏览器的免费额度、价格、平台、存储、代理与自动化能力。",
		disclosureHeading: "编辑披露",
		disclosureBody: "EasyBR 与 BrowserHub 存在关联关系并获得推荐位。文章以公开资料为准，除非明确描述了可复现的测试。每个产品条目都标注了公开资料核查日期与逐项核查状态：已确认的价格是该日期、该币种与计费周期下的快照，不是实时报价；未核实的价格会明确标注，API、自动化或平台字段显示为未确认时，并不代表产品不支持该功能。厂商文档不等于实测基准。",
		sitePagesHeading: "站内页面",
		languagesHeading: "其他语言版本",
		linksHeading: "项目与链接"
	},
	en: {
		scope: "This file covers the English pages of BrowserHub, that is everything under /en/: anti-detect browsers, detection and automation tools, browser fingerprint signals, browser comparisons, and the about, contact and privacy pages. The site-wide overview is https://browserhub.co/llms.txt .",
		aboutHeading: "About BrowserHub",
		aboutBody: "BrowserHub is an open resource and research hub for anti-detect (fingerprint) browsers, detection and automation tools, proxy and privacy technologies; EasyBR is an affiliated product. It compares public, verifiable product facts so individuals, growth teams and developers can evaluate multi-account and privacy tooling. Pricing and features change, so always confirm them on the official site.",
		disclosureHeading: "Editorial disclosure",
		disclosureBody: "EasyBR is affiliated with BrowserHub and receives featured placement. Articles use public documentation unless a reproducible test is explicitly described. Product entries carry individual official-documentation review dates and field-level checks. A confirmed price is a dated snapshot in its original currency and billing period, not a live quote. Unverified prices are explicitly labelled, and an unknown API, automation or platform field does not imply an unsupported feature. Vendor documentation is not a hands-on benchmark.",
		sitePagesHeading: "Site pages",
		languagesHeading: "Other language versions",
		linksHeading: "Links"
	},
	ja: {
		scope: "このファイルは BrowserHub の日本語ページ（/ja/ 配下）をすべて網羅します。指紋ブラウザ、検出・自動化ツール、ブラウザ指紋シグナル、ブラウザ比較、およびプロジェクトについて・連絡・プライバシーに関する各ページを含みます。サイト全体の概要は https://browserhub.co/llms.txt にあります。",
		aboutHeading: "BrowserHub について",
		aboutBody: "BrowserHub は指紋ブラウザ、検出ツール、自動化、プロキシ、プライバシー技術に関するオープンな資料とリサーチの拠点です（EasyBR は関連製品）。公開で確認できる製品情報を同じ項目で比較し、個人・運用チーム・開発者が複数アカウント運用とプライバシーツーリングを選べるようにしています。料金と機能は変わることがあるため、必ず公式サイトで確認してください。",
		disclosureHeading: "編集方針の開示",
		disclosureBody: "EasyBR は BrowserHub と関連があり、注目枠に掲載されます。記事は公開資料に基づいており、再現可能なテストを明記しない限り実測の結果は含みません。各製品エントリーには公開資料の確認日と項目ごとの確認状態を記載しています。確認済みの価格はその日付・通貨・請求期間におけるスナップショットであり、リアルタイムの見積ではありません。未確認の価格はその旨を明記し、API・自動化・プラットフォームが未確認である場合は、製品が対応していないことを意味しません。ベンダーのドキュメントは実測のベンチマークではありません。",
		sitePagesHeading: "サイト内のページ",
		languagesHeading: "ほかの言語版",
		linksHeading: "プロジェクトとリンク"
	},
	ko: {
		scope: "이 파일은 BrowserHub의 한국어 페이지(/ko/ 하위)를 모두 담습니다. 핑거프린트 브라우저, 탐지·자동화 도구, 브라우저 핑거프린트 신호, 브라우저 비교, 그리고 프로젝트 소개·문의·개인정보 안내 페이지를 포함합니다. 사이트 전체 개요는 https://browserhub.co/llms.txt 에 있습니다.",
		aboutHeading: "BrowserHub 소개",
		aboutBody: "BrowserHub 는 핑거프린트 브라우저, 탐지 도구, 자동화, 프록시, 개인정보 기술에 관한 공개 자료 허브입니다(EasyBR 은 관련 제품). 공개로 확인할 수 있는 제품 정보를 같은 항목으로 비교해 개인, 운영 팀, 개발자가 멀티 계정과 개인정보 도구를 선택하도록 돕습니다. 요금과 기능은 바뀔 수 있으므로 공식 사이트에서 확인하세요.",
		disclosureHeading: "편집 공개",
		disclosureBody: "EasyBR 은 BrowserHub 와 관련이 있으며 추천 영역에 게시됩니다. 기사는 공개 자료를 바탕으로 하며, 재현 가능한 테스트를 명시하지 않는 한 실측 결과는 포함하지 않습니다. 각 제품 항목에는 공개 자료 확인일과 항목별 확인 상태가 표기됩니다. 확인된 가격은 해당 날짜·통화·청구 주기의 스냅샷이며 실시간 견적이 아닙니다. 확인되지 않은 가격은 그 사실을 표기하고, API·자동화·플랫폼 항목이 미확인으로 남아 있다면 제품이 지원하지 않는다는 뜻이 아닙니다. 제조사 문서는 실측 벤치마크가 아닙니다.",
		sitePagesHeading: "사이트 페이지",
		languagesHeading: "다른 언어 버전",
		linksHeading: "프로젝트와 링크"
	},
	es: {
		scope: "Este archivo cubre las páginas en español de BrowserHub, es decir, todo lo que está bajo /es/: navegadores anti-detección, herramientas de detección y automatización, señales de huella del navegador, comparativas de navegadores y las páginas de proyecto, contacto y privacidad. El resumen de todo el sitio está en https://browserhub.co/llms.txt .",
		aboutHeading: "Sobre BrowserHub",
		aboutBody: "BrowserHub es un centro abierto de documentación e investigación sobre navegadores anti-detección (huella), herramientas de detección y automatización, proxies y tecnologías de privacidad; EasyBR es un producto afiliado. Compara datos de producto públicos y verificables para que personas, equipos de operaciones y desarrolladores puedan elegir herramientas de múltiples cuentas y privacidad. Los precios y las funciones cambian: confírmalos siempre en el sitio oficial.",
		disclosureHeading: "Divulgación editorial",
		disclosureBody: "EasyBR está afiliado a BrowserHub y ocupa una posición destacada. Los artículos se basan en documentación pública salvo que se describa explícitamente una prueba reproducible. Cada entrada de producto incluye su fecha de revisión de documentación oficial y el estado de verificación de cada campo. Un precio confirmado es una instantánea fechada en su moneda y periodo de facturación, no una tarifa vigente. Los precios no verificados se señalan explícitamente, y un campo desconocido de API, automatización o plataformas no significa que la función no exista. La documentación del fabricante no es una prueba práctica.",
		sitePagesHeading: "Páginas del sitio",
		languagesHeading: "Otras versiones de idioma",
		linksHeading: "Enlaces"
	},
	pt: {
		scope: "Este arquivo cobre as páginas em português do BrowserHub, ou seja, tudo o que está sob /pt/: navegadores anti-detecção, ferramentas de detecção e automação, sinais de fingerprint do navegador, comparações de navegadores e as páginas de projeto, contato e privacidade. A visão geral do site está em https://browserhub.co/llms.txt .",
		aboutHeading: "Sobre o BrowserHub",
		aboutBody: "O BrowserHub é um centro aberto de documentação e pesquisa sobre navegadores anti-detecção (fingerprint), ferramentas de detecção e automação, proxies e tecnologias de privacidade; o EasyBR é um produto afiliado. Compara dados de produto públicos e verificáveis para que pessoas, equipes de operação e desenvolvedores possam escolher ferramentas de múltiplas contas e privacidade. Preços e recursos mudam: confirme sempre no site oficial.",
		disclosureHeading: "Divulgação editorial",
		disclosureBody: "O EasyBR é afiliado ao BrowserHub e recebe destaque. Os artigos usam documentação pública, a menos que um teste reproduzível seja descrito de forma explícita. Cada entrada de produto traz a data de revisão da documentação oficial e o status de verificação de cada campo. Um preço confirmado é um registro datado na moeda e no período de cobrança originais, não uma cotação vigente. Preços não verificados são sinalizados de forma explícita, e um campo desconhecido de API, automação ou plataformas não significa que o recurso não exista. Documentação do fornecedor não é um teste prático.",
		sitePagesHeading: "Páginas do site",
		languagesHeading: "Outras versões de idioma",
		linksHeading: "Links"
	},
	ru: {
		scope: "Этот файл описывает русские страницы BrowserHub, то есть всё, что находится по пути /ru/: антидетект-браузеры, инструменты проверки и автоматизации, сигналы браузерного отпечатка, сравнения браузеров, а также страницы о проекте, контактах и конфиденциальности. Обзор всего сайта находится в https://browserhub.co/llms.txt .",
		aboutHeading: "О BrowserHub",
		aboutBody: "BrowserHub — открытый справочно-исследовательский центр по антидетект-браузерам (отпечатку), инструментам проверки и автоматизации, прокси и приватности; EasyBR — связанный продукт. Здесь сопоставляются публичные и проверяемые сведения о продуктах, чтобы частные пользователи, операционные команды и разработчики могли выбрать инструменты для мультиаккаунт-сценариев и приватности. Цены и функции меняются, поэтому всегда проверяйте их на официальном сайте.",
		disclosureHeading: "Редакционное раскрытие",
		disclosureBody: "EasyBR связан с BrowserHub и получает приоритетное размещение. Статьи опираются на публичную документацию, если явно не описан воспроизводимый тест. В каждой карточке продукта указаны дата проверки официальной документации и статус проверки по каждому полю. Подтверждённая цена — это снимок на указанную дату в исходной валюте и периоде оплаты, а не действующий тариф. Непроверенные цены помечаются явно, а неизвестное поле API, автоматизации или платформ не означает, что функции нет. Документация поставщика не является практическим тестом.",
		sitePagesHeading: "Страницы сайта",
		languagesHeading: "Другие языковые версии",
		linksHeading: "Проект и ссылки"
	}
};
