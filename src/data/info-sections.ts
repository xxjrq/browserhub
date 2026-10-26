/**
 * Long-form sections for the three site-level pages: about, contact and privacy.
 *
 * Why this module exists: an audit of all 986 sitemap URLs (aggregated by page
 * type, measuring `<h2>` count and visible `<article>` text per page) showed
 * these were the thinnest pages left on the site:
 *
 *   contact  7 URLs   0 h2   49-150 characters
 *   privacy  7 URLs   1 h2  248-763 characters
 *   about    7 URLs   4 h2  565-1742 characters
 *
 * Every other page class was already healthy (guides 11.7 h2 / 12.9k chars,
 * browsers 7.2 / 10.0k, compare 7.9 / 6.6k, tools 6.9 / 4.6k, fingerprint
 * 5.8 / 5.3k). These three page kinds had no long-form body at all, and the
 * locale route compounded it: for ja/ko/es/pt/ru the contact and privacy
 * bodies fell back to `labels.sourceNote` — a *pricing disclaimer* ("verify
 * current pricing on the official site") — which is simply the wrong subject
 * matter for a contact or privacy page.
 *
 * Editorial rules for this file (red lines, not style preferences):
 * - Every factual statement below was verified against the running site, the
 *   exported build, the nginx configuration or the published source. Product
 *   counts come from the catalogue; product facts are not restated here.
 * - No price, benchmark, detection verdict or vendor claim appears here.
 * - No user review, rating average or "passes detection" claim appears here.
 * - The privacy pages describe what the site actually does, including the
 *   analytics script, the server access log and the local theme preference.
 *   Nothing is omitted to make the site look better.
 * - `EditorialPolicy` already covers who publishes the site, how articles are
 *   researched, how prices and dates are labelled, and how corrections work.
 *   `PrivacyNotice` already covers the analytics disclosure. Neither is
 *   repeated here; these sections cover the catalogue, the submission
 *   workflow, and the data-handling specifics the two components omit.
 *
 * Locale policy follows `.agents/product-marketing.md`: English and Simplified
 * Chinese carry complete copy. The other locales reuse the English body with
 * localised headings, matching the fallback used by `browser-sections`,
 * `tool-sections` and `fingerprint-sections`.
 */

import { localePath, t, type Locale } from "@/lib/locale-ui";

export type InfoKind = "about" | "contact" | "privacy";
export type InfoSection = { heading: string; body: string };
export type InfoFaq = { question: string; answer: string };
export type InfoChannel = { name: string; description: string; href?: string };
export type InfoRelated = { href: string; title: string; description: string };

/** The catalogue snapshot the counts in this file describe. */
export const infoCatalogueSnapshotDate = "2026-10-26";

type CopyLocale = "zh-cn" | "en";

const copyLocale = (locale: Locale): CopyLocale => (locale === "zh-cn" ? "zh-cn" : "en");

// ---------------------------------------------------------------------------
// Section headings — all seven locales, because headings are short structural
// labels rather than article prose.
// ---------------------------------------------------------------------------

const headings: Record<InfoKind, Record<Locale, string[]>> = {
	about: {
		"zh-cn": ["目录结构与字段口径", "怎么用这个目录", "收录标准与不收录的内容"],
		en: ["Catalogue structure and field definitions", "How to use this directory", "What qualifies for inclusion, and what does not"],
		ja: ["ディレクトリの構成と項目定義", "このディレクトリの使い方", "掲載の基準と掲載しないもの"],
		ko: ["디렉터리 구성과 항목 정의", "이 디렉터리 사용 방법", "수록 기준과 수록하지 않는 것"],
		es: ["Estructura del catálogo y definición de campos", "Cómo usar este directorio", "Qué entra en el catálogo y qué no"],
		pt: ["Estrutura do catálogo e definição de campos", "Como usar este diretório", "O que entra no catálogo e o que não entra"],
		ru: ["Структура каталога и значения полей", "Как пользоваться этим каталогом", "Что попадает в каталог, а что нет"]
	},
	contact: {
		"zh-cn": ["提交前需要准备什么", "处理流程与边界", "可用渠道"],
		en: ["What to prepare before submitting", "How submissions are handled, and where the line is", "Available channels"],
		ja: ["送信する前に用意すること", "対応の流れと境界", "連絡できる窓口"],
		ko: ["제출 전에 준비할 것", "처리 절차와 경계", "이용 가능한 채널"],
		es: ["Qué preparar antes de enviar", "Cómo se tramitan los envíos y dónde está el límite", "Canales disponibles"],
		pt: ["O que preparar antes de enviar", "Como as submissões são tratadas e onde está o limite", "Canais disponíveis"],
		ru: ["Что подготовить перед отправкой", "Как обрабатываются обращения и где граница", "Доступные каналы"]
	},
	privacy: {
		"zh-cn": ["本站不收集什么", "第三方脚本与嵌入内容", "访问日志与搜索记录"],
		en: ["What this site does not collect", "Third-party scripts and embedded content", "Access logs and search terms"],
		ja: ["このサイトが取得しないもの", "第三者スクリプトと埋め込みコンテンツ", "アクセスログと検索履歴"],
		ko: ["이 사이트가 수집하지 않는 것", "제3자 스크립트와 임베드 콘텐츠", "접근 로그와 검색 기록"],
		es: ["Lo que este sitio no recopila", "Scripts de terceros y contenido incrustado", "Registros de acceso y búsquedas"],
		pt: ["O que este site não coleta", "Scripts de terceiros e conteúdo incorporado", "Logs de acesso e termos de busca"],
		ru: ["Что этот сайт не собирает", "Сторонние скрипты и встроенный контент", "Журналы доступа и поисковые запросы"]
	}
};

// ---------------------------------------------------------------------------
// Section bodies — zh-cn and en.
// ---------------------------------------------------------------------------

const aboutBodies: Record<CopyLocale, string[]> = {
	"zh-cn": [
		"目录按对象类型分成五块：浏览器目录收录 36 款反检测浏览器，工具目录收录 35 个检测与自动化工具，指纹信号目录收录 15 个信号条目，对比目录收录 29 组两两对比，指南部分按主题持续发布。以上数量对应 2026-10-26 的目录快照。\n\n每个条目使用同一组字段：免费额度、价格档位、可创建的档案或环境数量、支持的平台、渲染内核、存储位置、是否提供 API、是否支持自动化、支持的代理协议。字段来自产品公开文档，逐项标注来源与核查日期。\n\n字段口径统一是横向比较的前提。「支持代理」在不同厂商文档里可能指能填代理地址，也可能指内置代理服务；「本地优先」指配置默认保存在本机，但也可能保留云同步选项。目录记录的是文档写法，含义差异要在读表时留意，具体接入方式以各产品官方文档为准。",
		"按你要解决的问题选入口。想快速判断哪款产品适合自己，从对比目录挑一组对比，看完整字段与逐项来源；想知道某个功能到底代表什么，去对应产品的详情页，字段解释和常见误区都在那里展开；想理解某个指纹信号怎么产生、怎么被观察，去指纹信号目录；想排查具体问题——代理不生效、指纹跳变、环境之间串号——从指南目录按症状进入。\n\n站内所有条目页都带有指向原站的官方链接。读完站内记录之后，采购或接入前请回到产品自己的页面确认当前信息。",
		"进入目录的门槛是公开可核验：产品要有官方站点，字段要能在其文档或价格页里读到。达不到这两条的产品不收录。\n\n以下内容不进入目录：需要付费才能看到的评测结论、无法追溯来源的第三方数据、任何声称能保证「过检测」或保证账号结果的宣传语，以及把多个环境共用同一套配置当作隔离方案的做法。目录也不收录任何无法在公开文档中核实的功能结论。"
	],
	en: [
		"The directory is split into five parts by object type: 36 anti-detect browsers, 35 detection and automation tools, 15 fingerprint signal entries, 29 pairwise comparisons, and a guides section that publishes continuously by topic. Those counts correspond to the 2026-10-26 catalogue snapshot.\n\nEvery entry uses the same field set: free allowance, price tier, number of profiles or environments, supported platforms, rendering engine, storage location, API availability, automation support and supported proxy protocols. The fields come from public product documentation, and each one carries its source and review date.\n\nConsistent field definitions are what make a horizontal comparison possible. \"Proxy support\" may mean an address field in one vendor's documentation and a bundled proxy service in another's; \"local-first\" may describe configuration that lives on your machine while still offering cloud sync as an option. The directory records how the documentation phrases it — the difference in meaning is worth noticing when reading a table, and the actual integration path belongs to each product's own documentation.",
		"Pick the entry point by the question you are actually asking. To decide quickly which product fits, start from the comparison directory, choose a pair, and read the full field set with per-field sources. To find out what a capability really means, open that product's detail page, where each field is explained alongside common misreadings. To understand how a fingerprint signal is produced and observed, use the fingerprint signal directory. To troubleshoot a concrete problem — a proxy that will not apply, a fingerprint that keeps changing, state leaking between environments — enter the guides section by symptom.\n\nEvery entry page links out to the product's own site. After reading the record here, confirm current information on the vendor's page before you buy or integrate.",
		"The bar for inclusion is public verifiability: the product needs an official site, and its fields need to be readable in that documentation or on its pricing page. Products that fail either test are not listed.\n\nThe following never enter the directory: review conclusions behind a paywall, third-party data whose origin cannot be traced, marketing claims that guarantee \"passing detection\" or guarantee account outcomes, and treating a single shared configuration across multiple environments as an isolation scheme. The directory also carries no feature conclusion that cannot be checked against public documentation."
	]
};

const contactBodies: Record<CopyLocale, string[]> = {
	"zh-cn": [
		"不同类型的反馈需要不同的材料。\n\n- 纠错（价格、免费额度、平台、功能）：给出条目页面地址、正确的数值或表述、官方来源链接，以及你核对该来源的日期。价格请注明币种与计费周期（按月还是按年）。\n- 新增资源：给出产品名称、官网地址、价格页与文档地址。官网有而价格页缺失也可以提交，价格字段会标注为未核实。\n- 翻译修订：给出页面地址、原文与建议译文，以及你的语言背景。\n- 事实性勘误：给出文章地址、错误表述与官方文档对应位置。\n\n不要提交账号凭据、浏览器环境导出文件或个人浏览数据。这些内容无法用于公开核对，也不应该出现在公开 Issue 里。",
		"流程是公开的：先按上述要求检查材料是否可核验，再对照官方来源确认差异，确认成立才改动记录。改动保留在仓库历史中，可以追溯。\n\n有几件事本站不做：不做付费收录与付费排名，不为厂商代写评测，不承诺任何产品能通过特定检测，也不提供账号代运营或环境代测。特色展示位不公开出售，也不能用提交修正的方式换取。\n\n如果一条反馈与已核实的事实冲突，Issue 里会写明依据，双方可以继续讨论；只要给出可核验的官方依据，纠正会进入下一次发布。",
		"下面的渠道都可以用来联系。提交纠错优先用 Gitee 仓库的 Issue，那里同时记录了上游源代码仓库的公开地址；讨论与资源交流用 Telegram 或 QQ 群；与 EasyBR 本身的商务问题走产品官网。\n\n无论走哪个渠道，请附上条目页面地址、官方来源链接和核对日期——这三项决定了反馈能不能被核对。"
	],
	en: [
		"Different kinds of feedback need different material.\n\n- Corrections (price, free allowance, platform, capability): give the entry URL, the correct value or wording, the official source link, and the date you checked that source. For prices, state the currency and the billing period (monthly or annual).\n- New resource: give the product name, its homepage, pricing page and documentation URL. A homepage with no pricing page is still acceptable; the price field will be marked unverified.\n- Translation fixes: give the page URL, the original passage, your suggested translation and the language you work in.\n- Factual errata: give the article URL, the incorrect statement, and where the official documentation says otherwise.\n\nNever submit account credentials, exported browser profiles or personal browsing data. None of it can be checked in public, and none of it belongs in a public issue.",
		"The process is public. Material is first checked against the requirements above, then the difference is confirmed against the official source, and the record only changes if the difference holds. Changes stay in the repository history and can be traced.\n\nThere are things this site does not do: it does not sell listings or placements, does not write reviews on a vendor's behalf, does not promise that any product will pass a particular detection service, and does not run accounts or environments on someone's behalf. Featured placement is not for sale and cannot be obtained by submitting a correction.\n\nIf a report conflicts with a fact that has already been verified, the issue will state the evidence and the discussion can continue. As long as an official verifiable source is supplied, the correction enters the next release.",
		"Any of the channels below can be used to get in touch. For corrections, the Gitee issue tracker comes first; it also records the public address of the upstream source repository. Use Telegram or the QQ group for discussion and resource exchange, and the product's own site for commercial questions about EasyBR.\n\nWhichever channel you use, please include the entry URL, the official source link and the date you checked. Those three items decide whether a report can be verified at all."
	]
};

const privacyBodies: Record<CopyLocale, string[]> = {
	"zh-cn": [
		"本站是静态站点，不要求注册，也没有账号系统，因此没有需要登录后填写的信息。\n\n本站自身不设置任何 Cookie：访问任何页面都不会收到来自本站的 Set-Cookie 响应头。浏览器本地只保存一个主题偏好键（browsertools-theme），用于记住浅色或深色外观，这个值不会回传服务器。\n\n站内没有需要提交数据的表单。首页的搜索框是一个 GET 表单，关键词会出现在地址栏和服务器访问日志里（见第三节），除此之外没有表单向任何接口发送内容。",
		"页面本身不内嵌第三方 iframe，也不在自己的页面里代理任何厂商服务。产品链接指向各厂商自己的站点，点开之后适用的是对方的隐私政策与数据处理方式。\n\n字体是自托管的，构建产物不请求任何字体 CDN，因此打开页面不会因为排版而向第三方发起请求。站内脚本全部来自本站自身的静态资源。\n\n唯一加载的第三方脚本是上文提到的百度统计。除此之外，页面不加载广告、社交插件或嵌入式内容。",
		"托管服务器生成访问日志（nginx combined 格式），其中包含 IP 地址、浏览器标识和请求路径。搜索关键词作为查询串出现在路径里，因此也会出现在日志中；这些日志用于运维与引荐来源的汇总分析。\n\n日志在服务器端，无法像浏览器端设置那样单独关闭。如果你不希望产生任何访问记录，可以使用浏览器的隐私模式或拦截请求的扩展；不加载统计脚本时，站内不产生任何自定义访问事件。"
	],
	en: [
		"This site is static. It requires no registration and has no account system, so there is no information to fill in after signing in.\n\nThe site sets no cookies of its own: no page returns a Set-Cookie header from this site. In your browser, exactly one local preference is stored — browsertools-theme, which remembers whether you chose the light or the dark appearance. That value is never sent back to the server.\n\nThere are no forms that submit data. The search box on the home page is a GET form, so the search term appears in the address bar and in the server access log (see the third section below); beyond that, no form sends content anywhere.",
		"The pages embed no third-party iframes and do not proxy any vendor service on their own. Product links point to each vendor's own site, and once you open one, that vendor's privacy policy and data handling apply.\n\nFonts are self-hosted and the build output requests no font CDN, so opening a page sends no request to a third party for typesetting. All scripts on the site come from the site's own static assets.\n\nThe only third-party script that loads is the Baidu Tongji script described above. Beyond that, the site loads no advertising, social widgets or embedded content.",
		"The hosting server writes access logs in nginx's combined format, containing the IP address, the browser identifier and the requested path. A search term appears in that path as a query string, so it appears in the log too; these logs are used for operations and for aggregate referral analysis.\n\nThe logs live on the server and cannot be switched off the way a browser-side setting can. If you would rather leave no access record at all, use your browser's private mode or a request-blocking extension; with the analytics script not loaded, the site records no custom visit events."
	]
};

const bodies: Record<InfoKind, Record<CopyLocale, string[]>> = {
	about: aboutBodies,
	contact: contactBodies,
	privacy: privacyBodies
};

// ---------------------------------------------------------------------------
// Opening paragraph — the sentence that leads the page.
// ---------------------------------------------------------------------------

const openings: Record<InfoKind, Record<CopyLocale, string>> = {
	about: {
		"zh-cn": "BrowserHub 是一个公开资料索引，把反检测浏览器、指纹检测工具、自动化框架、指纹信号与隐私技术放在同一组字段下比较。本页说明这个目录收录什么、不收录什么，以及每条信息是怎么被复核的。",
		en: "BrowserHub is a public reference index that compares anti-detect browsers, fingerprint detection tools, automation frameworks, fingerprint signals and privacy tooling under one shared set of fields. This page explains what the directory includes, what it deliberately leaves out, and how each entry is checked."
	},
	contact: {
		"zh-cn": "提交纠错、补充资源、翻译修订或商务意向都有对应入口。带上来源链接和核对日期的反馈处理最快。",
		en: "Corrections, additional resources, translation fixes and commercial enquiries all have a route. Feedback that arrives with a source link and a date moves fastest."
	},
	privacy: {
		"zh-cn": "本页说明 BrowserHub 在你的浏览器上会记录什么、不会记录什么，以及这些数据的来源与用途。",
		en: "This page describes what BrowserHub records in your browser, what it does not record, and where each piece of data comes from and what it is used for."
	}
};

// ---------------------------------------------------------------------------
// Meta descriptions — one per page kind and locale. These used to reuse the
// home description with a label prefix, which made all three pages read the
// same to a search engine and gave a crawler nothing page-specific to index.
// ---------------------------------------------------------------------------

const descriptions: Record<InfoKind, Record<CopyLocale, string>> = {
	about: {
		"zh-cn": "BrowserHub 关于项目：目录结构与统一字段口径、36 款反检测浏览器与 35 个工具的收录范围、公开可核验的收录标准，以及每条信息的复核日期与更新节奏。",
		en: "About BrowserHub: how the catalogue is structured and which fields every entry shares, what the 36 anti-detect browsers and 35 tools cover, the public-verifiability rule for inclusion, and how review dates are set."
	},
	contact: {
		"zh-cn": "联系与贡献 BrowserHub：提交价格或功能纠错、新增产品、翻译修订需要附上哪些材料，处理流程与不做的承诺，以及 Gitee、Telegram、QQ 群等可用渠道。",
		en: "Contact and contribute to BrowserHub: what to include with a price or feature correction, a new product or a translation fix, how submissions are handled, and the available channels including Gitee, Telegram and a QQ group."
	},
	privacy: {
		"zh-cn": "BrowserHub 隐私说明：本站不收集什么、访问统计脚本与服务器访问日志会记录什么、第三方脚本与嵌入内容有哪些，以及你的选择与提问方式。",
		en: "BrowserHub privacy: what this site does not collect, what the analytics script and the server access log do record, which third-party scripts and embedded content are used, and your options and how to ask a question."
	}
};

// ---------------------------------------------------------------------------
// FAQ — questions localised into all seven locales; answers in zh-cn and en.
// ---------------------------------------------------------------------------

const faqQuestions: Record<InfoKind, Record<Locale, string[]>> = {
	about: {
		"zh-cn": ["这个目录收录了多少内容？", "站内的字段是从哪里来的？", "页面上的星级是什么？", "EasyBR 和这个目录是什么关系？"],
		en: ["How much does this directory cover?", "Where do the fields come from?", "What do the stars on a page mean?", "What is the relationship between EasyBR and this directory?"],
		ja: ["このディレクトリはどれくらいの内容を収録していますか？", "サイト内の項目はどこから得られていますか？", "ページ上の星は何ですか？", "EasyBR とこのディレクトリの関係は何ですか？"],
		ko: ["이 디렉터리는 어느 정도의 내용을 수록하고 있나요?", "사이트의 항목은 어디에서 얻어오나요?", "페이지의 별은 무엇을 뜻하나요?", "EasyBR 와 이 디렉터리는 어떤 관계인가요?"],
		es: ["¿Cuánto contenido recoge este directorio?", "¿De dónde proceden los campos del sitio?", "¿Qué significan las estrellas de una página?", "¿Qué relación hay entre EasyBR y este directorio?"],
		pt: ["Quanto conteúdo este diretório reúne?", "De onde vêm os campos do site?", "O que significam as estrelas de uma página?", "Qual é a relação entre o EasyBR e este diretório?"],
		ru: ["Сколько материала собрал этот каталог?", "Откуда берутся поля на сайте?", "Что означают звёзды на странице?", "Какова связь между EasyBR и этим каталогом?"]
	},
	contact: {
		"zh-cn": ["提交纠错需要提供什么？", "可以提交尚未收录的产品吗？", "提交后多久会被处理？", "会提供付费收录或排名吗？"],
		en: ["What do I need to submit a correction?", "Can I submit a product that is not listed yet?", "How long does a submission take to handle?", "Do you offer paid listings or rankings?"],
		ja: ["修正の送信には何が必要ですか？", "未掲載の製品を送れますか？", "送信後どのくらいで処理されますか？", "有料掲載やランキングはありますか？"],
		ko: ["정정 제출에는 무엇이 필요하나요?", "아직 수록되지 않은 제품도 제출할 수 있나요?", "제출 후 처리는 얼마나 걸리나요?", "유료 수록이나 랭킹을 제공하나요?"],
		es: ["¿Qué necesito para enviar una corrección?", "¿Puedo enviar un producto que aún no está listado?", "¿Cuánto tarda en tramarse un envío?", "¿Ofrecen listados o rankings de pago?"],
		pt: ["O que preciso para enviar uma correção?", "Posso enviar um produto que ainda não está listado?", "Quanto tempo leva para tratar um envio?", "Vocês oferecem listagens ou rankings pagos?"],
		ru: ["Что нужно для отправки исправления?", "Можно ли отправить ещё не добавленный продукт?", "Сколько времени занимает обработка?", "Есть ли платные размещения и рейтинги?"]
	},
	privacy: {
		"zh-cn": ["使用本站需要注册吗？", "本站会设置 Cookie 吗？", "我的搜索关键词会被记录吗？", "点击产品链接后，数据归谁处理？"],
		en: ["Do I need an account to use this site?", "Does this site set cookies?", "Is my search term recorded?", "Who handles the data after I click a product link?"],
		ja: ["このサイトの利用にアカウント登録は必要ですか？", "このサイトは Cookie を設定しますか？", "検索キーワードは記録されますか？", "製品リンクをクリックした後のデータはどこが扱いますか？"],
		ko: ["이 사이트를 이용하려면 계정이 필요한가요?", "이 사이트는 Cookie를 설정하나요?", "검색 키워드는 기록되나요?", "제품 링크를 클릭한 뒤 데이터는 누가 처리하나요?"],
		es: ["¿Necesito una cuenta para usar este sitio?", "¿Este sitio establece cookies?", "¿Se registra el término que busco?", "¿Quién trata los datos después de pulsar un enlace de producto?"],
		pt: ["Preciso de conta para usar este site?", "Este site define cookies?", "O termo que busco fica registrado?", "Quem trata os dados depois de clicar num link de produto?"],
		ru: ["Нужен ли аккаунт для использования сайта?", "Устанавливает ли сайт cookies?", "Записывается ли мой поисковый запрос?", "Кто обрабатывает данные после перехода по ссылке на продукт?"]
	}
};

const faqAnswers: Record<InfoKind, Record<CopyLocale, string[]>> = {
	about: {
		"zh-cn": [
			"截至 2026-10-26 的目录快照包含 36 款反检测浏览器、35 个检测与自动化工具、15 个指纹信号条目和 29 组两两对比；指南部分按主题持续发布，数量随发布批次变化。数量统计的是条目本身，不是访问量或用户数。",
			"每个字段都来自产品公开文档，条目上标注来源链接与核查日期。无法在公开页面确认的字段会标为未核实，而不是留空或按经验猜测。价格字段是某个日期的快照，不是实时报价。",
			"编辑整理标签，用来标记目录中的收录顺序，不是用户评价均分，也不是性能排名。特色展示位是关联产品的推广位置，与评分无关。",
			"EasyBR 是关联产品，在目录中获得特色展示位。这一关系在页面与编辑政策中写明，其余供应商同样列示并链接到各自官方资料。"
		],
		en: [
			"The 2026-10-26 catalogue snapshot holds 36 anti-detect browsers, 35 detection and automation tools, 15 fingerprint signal entries and 29 pairwise comparisons. The guides section publishes continuously by topic, so its count changes with each release batch. These numbers count entries — not visits and not users.",
			"Every field comes from public product documentation, and the entry carries a source link and a review date. A field that public pages cannot confirm is marked unverified rather than left blank or guessed from experience. A price field is a snapshot taken on a stated date, not a live quote.",
			"An editorial curation label that marks ordering within the directory. It is not an average of user reviews and not a performance ranking. Featured placement is the promotional position of an affiliated product and has nothing to do with the stars.",
			"EasyBR is an affiliated product and receives featured placement in the directory. That relationship is stated on the pages and in the editorial policy, and every other vendor is listed the same way with links to its own official material."
		]
	},
	contact: {
		"zh-cn": [
			"条目页面地址、正确的数值或表述、官方来源链接，以及你核对该来源的日期。价格请注明币种与计费周期。",
			"可以。需要产品名称、官网地址，以及能找到的价格页或文档地址。公开页面无法确认的字段会标注为未核实，而不是被略过。",
			"流程是公开的：材料可核验且与官方来源确认差异后才会改动记录，改动保留在仓库历史中。站点按发布批次上线，因此从提交到上线之间存在间隔。",
			"不会。本站不做付费收录与付费排名，也不代写评测。特色展示位不公开出售，也不能用提交修正的方式换取。"
		],
		en: [
			"The entry URL, the correct value or wording, the official source link, and the date you checked that source. For prices, state the currency and the billing period.",
			"Yes. You need the product name, its homepage, and a pricing page or documentation URL that can be found. Fields that public pages cannot confirm are marked unverified rather than left out.",
			"The process is public: a record only changes after the material is verifiable and the difference is confirmed against the official source, and the change stays in the repository history. The site ships in release batches, so there is a gap between a submission and the live page.",
			"No. This site does not sell listings or placements and does not write reviews on a vendor's behalf. Featured placement is not for sale and cannot be obtained by submitting a correction."
		]
	},
	privacy: {
		"zh-cn": [
			"不需要。本站是静态站点，没有账号系统，也没有需要提交信息的表单。",
			"本站自身不设置 Cookie，访问页面不会收到来自本站的 Set-Cookie 响应头。加载的百度统计脚本会按其自身政策写入自己的 Cookie 与本地存储项。",
			"会进入托管服务器的访问日志。日志包含 IP 地址、浏览器标识和请求路径，搜索词以查询串形式出现在路径里。这些日志用于运维与引荐来源的汇总分析。",
			"链接指向各厂商自己的站点，之后适用的是对方的隐私政策与数据处理方式。本站不代理任何厂商服务，也不内嵌第三方 iframe。"
		],
		en: [
			"No. This site is static, has no account system and has no form that submits information.",
			"The site itself sets no cookies: no page returns a Set-Cookie header from this site. The Baidu Tongji script that loads does write its own cookies and local storage entries, under its own policy.",
			"Yes, it reaches the hosting server's access log. The log holds the IP address, the browser identifier and the requested path, and the search term appears in that path as a query string. These logs are used for operations and for aggregate referral analysis.",
			"The links point to each vendor's own site, and that vendor's privacy policy and data handling apply from then on. This site proxies no vendor service and embeds no third-party iframe."
		]
	}
};

// ---------------------------------------------------------------------------
// Contact channels — names and descriptions in all seven locales.
// ---------------------------------------------------------------------------

const channels: Record<Locale, InfoChannel[]> = {
	"zh-cn": [
		{ name: "Gitee 仓库与 Issue", description: "公开镜像仓库，Issue 开放，用于提交纠错与新增资源；同时记录上游源代码仓库的公开地址。", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: "GitHub 上游仓库", description: "源代码上游，用于查看实现与提交历史。", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Telegram 社区", description: "讨论、资源交流与更新通知。", href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: "QQ 群", description: "EasyBR 指纹浏览器交流社区，QQ 群号 967818141。" },
		{ name: "EasyBR 官网", description: "关联产品的官网，产品接入与商务咨询以官方渠道为准。", href: "https://www.ebrower.com/" }
	],
	en: [
		{ name: "Gitee repository and issues", description: "Public mirror repository with issues open, used for corrections and new resource submissions; it also records the public address of the upstream source repository.", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: "GitHub upstream repository", description: "The source-code upstream, for reading the implementation and commit history.", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Telegram community", description: "Discussion, resource exchange and update notifications.", href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: "QQ group", description: "EasyBR fingerprint browser community, QQ group 967818141." },
		{ name: "EasyBR official site", description: "The affiliated product's own site; use the vendor's channels for integration and commercial questions.", href: "https://www.ebrower.com/" }
	],
	ja: [
		{ name: "Gitee リポジトリと Issue", description: "公開ミラーで Issue が開いています。修正とリソース追加の送信先であり、上流ソースリポジトリの公開アドレスも記載しています。", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: "GitHub 上流リポジトリ", description: "ソースコードの上流。実装とコミット履歴の確認用。", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Telegram コミュニティ", description: "議論、リソース交流、更新通知。", href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: "QQ グループ", description: "EasyBR フィンガープリントブラウザのコミュニティ、QQ グループ番号 967818141。" },
		{ name: "EasyBR 公式サイト", description: "関連製品の公式サイト。導入や商用相談は公式窓口へ。", href: "https://www.ebrower.com/" }
	],
	ko: [
		{ name: "Gitee 저장소와 Issue", description: "공개 미러 저장소이며 Issue가 열려 있습니다. 정정 제출과 리소스 추가에 사용되며, 상위 소스 저장소의 공개 주소도 기록되어 있습니다.", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: "GitHub 상위 저장소", description: "소스 코드 상위 저장소. 구현과 커밋 이력을 확인할 수 있습니다.", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Telegram 커뮤니티", description: "논의, 리소스 공유, 업데이트 알림.", href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: "QQ 그룹", description: "EasyBR 핑거프린트 브라우저 커뮤니티, QQ 그룹 967818141." },
		{ name: "EasyBR 공식 사이트", description: "관련 제품의 공식 사이트. 도입과 상용 문의는 공식 채널로 진행하세요.", href: "https://www.ebrower.com/" }
	],
	es: [
		{ name: "Repositorio e issues de Gitee", description: "Repositorio espejo público con issues abiertos, para correcciones y nuevas fichas; también registra la dirección pública del repositorio de código fuente.", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: "Repositorio upstream de GitHub", description: "El upstream del código fuente, para revisar la implementación y el historial de commits.", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Comunidad de Telegram", description: "Debate, intercambio de recursos y avisos de actualización.", href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: "Grupo de QQ", description: "Comunidad de navegadores de huella de EasyBR, grupo de QQ 967818141." },
		{ name: "Sitio oficial de EasyBR", description: "El sitio del producto afiliado; para integración y consultas comerciales usa los canales del proveedor.", href: "https://www.ebrower.com/" }
	],
	pt: [
		{ name: "Repositório e issues do Gitee", description: "Repositório espelho público com issues abertas, usado para correções e novas fichas; também registra o endereço público do repositório de código-fonte.", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: "Repositório upstream no GitHub", description: "O upstream do código-fonte, para consultar a implementação e o histórico de commits.", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Comunidade no Telegram", description: "Discussão, troca de recursos e avisos de atualização.", href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: "Grupo QQ", description: "Comunidade de navegadores de impressão digital da EasyBR, grupo QQ 967818141." },
		{ name: "Site oficial da EasyBR", description: "O site do produto afiliado; para integração e questões comerciais use os canais do fornecedor.", href: "https://www.ebrower.com/" }
	],
	ru: [
		{ name: "Репозиторий и issues на Gitee", description: "Публичное зеркало с открытыми issues — сюда отправляют исправления и новые записи; здесь же указан публичный адрес исходного репозитория.", href: "https://gitee.com/xxjrq/antidetect-browser-hub" },
		{ name: "Исходный репозиторий на GitHub", description: "Upstream исходного кода — чтобы посмотреть реализацию и историю коммитов.", href: "https://github.com/xxjrq/antidetect-browser-hub" },
		{ name: "Сообщество в Telegram", description: "Обсуждения, обмен ресурсами и уведомления об обновлениях.", href: "https://t.me/+_y3DoCss8dplY2Fl" },
		{ name: "Группа QQ", description: "Сообщество EasyBR по браузерам отпечатка, группа QQ 967818141." },
		{ name: "Официальный сайт EasyBR", description: "Сайт связанного продукта; по интеграции и коммерческим вопросам обращайтесь к вендору.", href: "https://www.ebrower.com/" }
	]
};

// ---------------------------------------------------------------------------
// Related internal links — titles come from the shared locale label table so
// they stay in step with the navigation; descriptions are zh-cn and en.
// ---------------------------------------------------------------------------

const relatedTargets: Record<InfoKind, { kind: "browsers" | "compare" | "guides" | "tools" | "fingerprint"; zh: string; en: string }[]> = {
	about: [
		{ kind: "browsers", zh: "按统一字段比较 36 款反检测浏览器的免费额度、价格、平台与能力。", en: "Compare 36 anti-detect browsers on free allowance, price, platform and capability." },
		{ kind: "compare", zh: "29 组两两对比，含逐项来源与价格核验状态。", en: "29 pairwise comparisons with per-field sources and price verification status." },
		{ kind: "guides", zh: "按症状进入的排查与选型指南，含官方文档来源。", en: "Troubleshooting and selection guides entered by symptom, with official documentation sources." }
	],
	contact: [
		{ kind: "guides", zh: "先读指南，多数问题在来源与步骤里已经写明。", en: "Read the guides first; most questions are already answered there with sources and steps." },
		{ kind: "compare", zh: "对比页列出每项字段的来源链接，纠错时可直接引用。", en: "Comparison pages list a source link per field, so corrections can cite them directly." },
		{ kind: "browsers", zh: "产品页字段与核查日期一目了然，便于指出具体哪一项有误。", en: "Product pages show each field with its review date, which makes it easy to point at the exact item in question." }
	],
	privacy: [
		{ kind: "browsers", zh: "浏览器目录：产品字段与逐项来源。", en: "Browser directory: product fields with per-field sources." },
		{ kind: "guides", zh: "指南目录：方法、步骤与版本边界。", en: "Guides directory: methods, steps and version boundaries." },
		{ kind: "fingerprint", zh: "指纹信号目录：信号如何产生与如何被观察。", en: "Fingerprint signal directory: how signals are produced and observed." }
	]
};

type RelatedTarget = (typeof relatedTargets)[InfoKind][number];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function infoOpening(kind: InfoKind, locale: Locale): string {
	return openings[kind][copyLocale(locale)];
}

export function infoDescription(kind: InfoKind, locale: Locale): string {
	return descriptions[kind][copyLocale(locale)];
}

export function infoSections(kind: InfoKind, locale: Locale): InfoSection[] {
	const labels = headings[kind][locale] ?? headings[kind].en;
	const copy = bodies[kind][copyLocale(locale)];
	return labels.map((heading, index) => ({ heading, body: copy[index] }));
}

export function infoFaq(kind: InfoKind, locale: Locale): InfoFaq[] {
	const questions = faqQuestions[kind][locale] ?? faqQuestions[kind].en;
	const answers = faqAnswers[kind][copyLocale(locale)];
	return questions.map((question, index) => ({ question, answer: answers[index] }));
}

export function infoChannels(locale: Locale): InfoChannel[] {
	return channels[locale] ?? channels.en;
}

export function infoRelated(kind: InfoKind, locale: Locale): InfoRelated[] {
	const labels = t(locale);
	const titles: Record<string, string> = {
		browsers: labels.browsers,
		compare: labels.compare,
		guides: labels.guides,
		tools: labels.tools,
		fingerprint: labels.fingerprint
	};
	const descriptionKey: "zh" | "en" = locale === "zh-cn" ? "zh" : "en";
	return relatedTargets[kind].map((target: RelatedTarget) => ({
		href: localePath(locale, target.kind),
		title: titles[target.kind],
		description: target[descriptionKey]
	}));
}
