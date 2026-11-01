import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * The editorial-policy disclosure shown on the about page.
 *
 * The four section headings are localised in all seven locales, because a page
 * should not carry an English document outline under a localised `<title>`.
 * The bodies stay in zh-cn and en — the other locales render the English text
 * and mark it `lang="en"`, matching the fallback used across the site.
 *
 * The bodies restate the site's own editorial rules. They assert no product
 * capability, price, detection result or vendor claim.
 */

type Section = [string, string];

const sections: Record<Locale, Section[]> = {
	"zh-cn": [
		["谁在维护 BrowserHub", "BrowserHub 是由 xxjrq 维护的资源与研究网站。EasyBR 为关联产品，获得特色展示。本站不属于独立检测实验室；其他供应商仍列示并链接其官方资料。"],
		["文章如何研究", "编辑指南参考供应商公开文档、浏览器标准和可复现的选型检查表，每篇注明来源与核查日期。资料研究与产品实测分开标注；实测必须记录版本、测试条件与证据。任何产品都不能保证匿名或账号结果。"],
		["价格、日期与编辑标签", "产品条目展示官方来源、公开资料核查日期与逐项状态。已确认价格按原币种和计费周期保存为日期快照，不是即时报价；未核实价格明确标注，未知能力不代表不支持。购买前请访问官方价格页确认。页面修改日期不代表所有产品或价格重新实测。特色展示属于推广；旧星级仅为编辑整理标签，不是用户评价均分或性能排名。"],
		["纠错与贡献", "欢迎通过公开 GitHub Issues 提交页面地址、官方证据和核查时间。不要提交账号密码、浏览器环境导出文件或个人浏览数据。可验证的修正会经过复核，实质改动保留在仓库历史中。"]
	],
	en: [
		["Who publishes BrowserHub", "BrowserHub is a resource and research website maintained by xxjrq. EasyBR is an affiliated product and receives featured placement. BrowserHub is not an independent testing laboratory. Other vendors remain listed with links to their official information."],
		["How articles are researched", "Editorial guides use public vendor documentation, browser standards and reproducible evaluation checklists. Sources and review dates appear on each article. Document-based comparisons are labelled; hands-on results require a recorded browser version, test conditions and evidence. No product can guarantee anonymity or an account outcome."],
		["Prices, dates and editorial labels", "Each product lists official sources, a documentation review date and field-level verification status. Confirmed prices are dated snapshots in the original currency and billing period, not live quotes. Unverified prices are labelled; an unknown capability does not mean unsupported. Check the official pricing link before purchasing. A page modification date does not imply every product or price was re-tested. Featured placement is promotional. Legacy stars are subjective curation labels, not user review averages or measured performance rankings."],
		["Corrections and contributions", "Send a correction through the public GitHub issues page with the affected URL, official evidence and date. Never submit account credentials, profile exports or personal browsing data. We review verifiable corrections and disclose material changes in repository history."]
	],
	ja: [
		["BrowserHub の運営者", "BrowserHub は xxjrq が保守するリソースとリサーチのウェブサイトです。EasyBR は関連製品として特集枠に掲載されます。BrowserHub は独立したテストラボではなく、他のサプライヤーも公式情報へのリンクとともに掲載されています。"],
		["記事の調査方法", "編集ガイドはサプライヤーの公開ドキュメント、ブラウザ標準、再現可能な評価チェックリストを参照し、記事ごとに出典と確認日を記載します。資料に基づく比較と実地テストは区別して示し、実地テストにはバージョン、テスト条件、証拠の記録が必要です。どの製品も匿名性にもアカウントの結果にも保証するものではありません。"],
		["価格、日付、編集ラベル", "各製品には公式情報源、公開文書の確認日、項目ごとの確認状態を掲載します。確認済みの価格は元通貨と請求サイクルで保存された日付のスナップショットであり、現在の見積ではありません。未確認の価格は明示し、未知の機能が未対応であることを意味しません。購入前に公式の価格ページを確認してください。ページの更新日付は、すべての製品と価格を再検証したことを意味しません。特集枠掲載はプロモーションです。旧来のスターは編集による主観的な整理ラベルであり、利用者による評価の平均や実測のランキングではありません。"],
		["訂正と投稿", "訂正は公開の GitHub Issues ページから、対象の URL、公式の証拠、日付を添えて送ってください。アカウントの認証情報、プロファイルのエクスポート、個人を含む閲覧データは送らないでください。検証可能な訂正はレビューし、実質的な変更はリポジトリの履歴に残します。"]
	],
	ko: [
		["BrowserHub 운영", "BrowserHub는 xxjrq가 관리하는 리소스·리서처 웹사이트입니다. EasyBR는 관련 제품으로 추천 노출을 받습니다. BrowserHub는 독립적인 테스트 랩이 아니며, 다른 공급사도 공식 정보 링크와 함께 계속 수록됩니다."],
		["기사 조사 방법", "편집 가이드는 공급사 공개 문서, 브라우저 표준, 재현 가능한 평가 체크리스트를 참조하며 기사마다 출처와 확인 날짜를 표기합니다. 자료 조사와 실지 테스트는 구분해 표기하고, 실지 테스트에는 버전·테스트 조건·증거 기록이 필요합니다. 어떤 제품도 익명성이나 계정 결과를 보장하지 않습니다."],
		["가격·날짜·편집 라벨", "각 제품은 공식 출처, 공개 문서 확인일, 항목별 확인 상태를 함께 표기합니다. 확인된 가격은 원 통화와 청구 주기가 표시된 날짜 스냅샷이며 현재 견적이 아닙니다. 미확인 가격은 명시하고, 미확인 기능은 미지원을 의미하지 않습니다. 구매 전 공식 가격 페이지에서 확인하세요. 페이지 수정일은 모든 제품과 가격이 다시 검증되었다는 뜻이 아닙니다. 추천 배치는 홍보이며, 기존 별점은 편집 분류 라벨로 이용자 리뷰 평균이나 실측 순위가 아닙니다."],
		["정정과 기여", "정정은 공개 GitHub Issues로 대상 URL, 공식 증거와 날짜를 함께 보내 제출하세요. 계정 인증 정보, 프로필 내보내기, 개인 browsing 데이터는 보내지 마세요. 검증 가능한 정정은 검토하며, 중요한 변경은 저장소 이력에 남깁니다."]
	],
	es: [
		["Quién publica BrowserHub", "BrowserHub es un sitio web de recursos e investigación mantenido por xxjrq. EasyBR es un producto afiliado y obtiene una colocación destacada. BrowserHub no es un laboratorio de pruebas independiente. El resto de proveedores se mantiene en el catálogo con enlaces a su información oficial."],
		["Cómo se investigan los artículos", "Las guías editoriales usan documentación pública de los proveedores, estándares del navegador y listas de evaluación reproducibles. Cada artículo indica sus fuentes y la fecha de revisión. Las comparaciones basadas en documentos se identifican como tales; los resultados en manos propias exigen versión del navegador, condiciones de prueba y evidencia registrados. Ningún producto garantiza el anonimato ni el resultado de una cuenta."],
		["Precios, fechas y etiquetas editoriales", "Cada producto indica sus fuentes oficiales, la fecha de revisión de la documentación y el estado de verificación de cada campo. Los precios confirmados son instantáneas fechadas en la moneda y el ciclo de facturación originales, no tarifas vigentes. Los precios no verificados se señalan; una capacidad desconocida no significa que no esté soportada. Consulta el enlace oficial de precios antes de comprar. La fecha de modificación de una página no implica que se hayan vuelto a probar todos los productos o precios. La colocación destacada es promocional. Las estrellas heredadas son etiquetas subjetivas de curación, no medias de reseñas de usuarios ni rankings medidos."],
		["Correcciones y contribuciones", "Envía una corrección por la página pública de incidencias de GitHub con la URL afectada, la evidencia oficial y la fecha. Nunca envíes credenciales de cuenta, exportaciones de perfiles ni datos de navegación personales. Revisamos las correcciones verificables y divulgamos los cambios materiales en el historial del repositorio."]
	],
	pt: [
		["Quem publica o BrowserHub", "O BrowserHub é um site de recursos e pesquisa mantido por xxjrq. O EasyBR é um produto afiliado e recebe uma colocação em destaque. O BrowserHub não é um laboratório de testes independente. Os demais fornecedores permanecem listados com links para suas informações oficiais."],
		["Como os artigos são pesquisados", "Os guias editoriais usam documentação pública dos fornecedores, padrões de navegador e listas de avaliação reproduzíveis. Cada artigo indica suas fontes e a data de revisão. Comparações baseadas em documentos são identificadas como tal; resultados com teste próprio exigem versão do navegador, condições de teste e evidência registradas. Nenhum produto garante anonimato nem o resultado de uma conta."],
		["Preços, datas e etiquetas editoriais", "Cada produto lista as fontes oficiais, a data de revisão da documentação e o status de verificação de cada campo. Preços confirmados são instantâneos datados na moeda e no ciclo de faturamento originais, não cotações vigentes. Preços não verificados são sinalizados; uma capacidade desconhecida não significa que não seja suportada. Confira o link oficial de preços antes de comprar. A data de modificação de uma página não implica que todos os produtos ou preços foram testados novamente. A colocação em destaque é promocional. As estrelas legadas são etiquetas subjetivas de curadoria, não médias de avaliações de usuários nem rankings medidos."],
		["Correções e contribuições", "Envie uma correção pela página pública de issues do GitHub com a URL afetada, a evidência oficial e a data. Nunca envie credenciais de conta, exportações de perfis ou dados pessoais de navegação. Revisamos correções verificáveis e divulgamos mudanças relevantes no histórico do repositório."]
	],
	ru: [
		["Кто ведёт BrowserHub", "BrowserHub — это сайт ресурсов и исследований, который ведёт xxjrq. EasyBR является связанным продуктом и получает рекомендуемое размещение. BrowserHub не является независимой испытательной лабораторией. Остальные поставщики остаются в каталоге со ссылками на их официальную информацию."],
		["Как исследуются статьи", "Редакционные руководства опираются на публичную документацию поставщиков, стандарты браузеров и воспроизводимые чек-листы оценки. В каждой статье указаны источники и дата проверки. Сравнения по документам помечены отдельно; результаты собственных тестов требуют зафиксированных версии браузера, условий теста и доказательств. Ни один продукт не гарантирует анонимность или результат аккаунта."],
		["Цены, даты и редакционные метки", "У каждого продукта указаны официальные источники, дата проверки документации и статус проверки по каждому полю. Подтверждённые цены — датированные снимки в исходной валюте и периоде оплаты, а не действующие котировки. Непроверенные цены помечены; неизвестная возможность не означает её отсутствие. Перед покупкой проверьте официальную ссылку с ценами. Дата изменения страницы не означает, что все продукты или цены проверялись заново. Рекомендуемое размещение — это реклама. Прежние звёзды — субъективные метки редакционного отбора, а не средние оценки отзывов пользователей и не измеренные рейтинги."],
		["Исправления и участие", "Отправьте исправление через публичную страницу issues на GitHub, указав затронутый URL, официальное доказательство и дату. Не отправляйте учётные данные аккаунтов, экспорты профилей и персональные данные о посещениях. Мы проверяем обоснованные исправления и отмечаем существенные изменения в истории репозитория."]
	]
};

export function EditorialPolicy({ locale = "zh-cn" }: { locale?: Locale }) {
	const en = locale !== "zh-cn";
	const list = sections[locale] ?? sections.en;
	return <div className="mt-8 space-y-7">{list.map(([heading, body]) => <section key={heading}><h2 className="text-xl font-semibold">{heading}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground" lang={en ? "en" : "zh-CN"}>{body}</p></section>)}<p className="text-sm" lang={en ? "en" : "zh-CN"}><a href="https://github.com/xxjrq/antidetect-browser-hub/issues" className="text-primary underline underline-offset-4">GitHub Issues</a> · <Link href={localePath(en ? "en" : "zh-cn", "guides/best-antidetect-browsers-2026")} className="text-primary underline underline-offset-4">{en ? "2026 browser evaluation guide" : "2026 浏览器选型指南"}</Link></p></div>;
}
