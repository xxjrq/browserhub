import Link from "next/link";
import { guideSeries, guideSeriesFor } from "@/data/guide-series";
import { localizedGuideCopy } from "@/data/guide-translations";
import { localePath, type Locale } from "@/lib/locale-ui";

const editionFor = (locale: Locale) => locale === "zh-cn" ? "zh-cn" : "en";
const titleFor = (locale: Locale, slug: string) => localizedGuideCopy(locale, slug, { title: slug.replaceAll("-", " "), description: "" }).title;

/**
 * Localised structural labels for the series index and trail.
 *
 * The series titles and descriptions are article copy and stay in zh-cn and
 * en, so the other locales reuse the English text and mark it `lang="en"`.
 * The labels below are short structural strings, so they are translated in
 * every locale.
 */
const labels = {
	indexHeading: {
		"zh-cn": "按系列阅读",
		en: "Follow a learning path",
		ja: "学習パスに従って読む",
		ko: "학습 경로대로 읽기",
		es: "Sigue una ruta de aprendizaje",
		pt: "Siga um caminho de aprendizagem",
		ru: "Читайте по маршруту обучения"
	},
	connected: (count: number) => ({
		"zh-cn": `${count} 篇相互衔接的指南，文章中可继续阅读前后章节。`,
		en: `${count} connected guides. Each article links to the next step.`,
		ja: `${count} 本の連続したガイド。各記事から次のステップへ進めます。`,
		ko: `${count}개의 연결된 가이드입니다. 각 글에서 다음 단계로 이동할 수 있습니다.`,
		es: `${count} guías conectadas. Cada artículo enlaza con el siguiente paso.`,
		pt: `${count} guias conectados. Cada artigo leva à próxima etapa.`,
		ru: `${count} связанных руководств. Каждая статья ведёт к следующему шагу.`
	}),
	downloadRecord: {
		"zh-cn": "下载环境检测空白记录表（CSV）",
		en: "Download the blank environment test record (CSV)",
		ja: "空欄の環境テスト記録（CSV）をダウンロード",
		ko: "빈 환경 테스트 기록(CSV) 다운로드",
		es: "Descargar el registro de prueba de entorno en blanco (CSV)",
		pt: "Baixe o registro de teste de ambiente em branco (CSV)",
		ru: "Скачайте пустой бланк проверки окружения (CSV)"
	},
	ownObservations: {
		"zh-cn": "填写自己的观察结果，模板未预填任何实测结论。",
		en: "Fill it with your own observations; no benchmark results are prefilled.",
		ja: "自分の観測結果をご記入ください。ベンチマーク結果は同梱されていません。",
		ko: "직접 관찰한 결과를 입력하세요. 벤치마크 결과는 미리 채워져 있지 않습니다.",
		es: "Rellénalo con tus propias observaciones; no incluye resultados de referencia.",
		pt: "Preencha com as suas próprias observações; nenhum resultado de referência vem preenchido.",
		ru: "Заполните его своими наблюдениями; готовых результатов тестов в нём нет."
	},
	seriesAria: {
		"zh-cn": "系列阅读",
		en: "Guide series",
		ja: "ガイドシリーズ",
		ko: "가이드 시리즈",
		es: "Serie de guías",
		pt: "Série de guias",
		ru: "Серия руководств"
	},
	previous: {
		"zh-cn": "上一篇：",
		en: "Previous: ",
		ja: "前へ：",
		ko: "이전: ",
		es: "Anterior: ",
		pt: "Anterior: ",
		ru: "Назад: "
	},
	next: {
		"zh-cn": "下一篇：",
		en: "Next: ",
		ja: "次へ：",
		ko: "다음: ",
		es: "Siguiente: ",
		pt: "Próximo: ",
		ru: "Вперёд: "
	},
	downloadBlank: {
		"zh-cn": "下载空白检测记录表",
		en: "Download the blank test record",
		ja: "空欄のテスト記録をダウンロード",
		ko: "빈 테스트 기록 다운로드",
		es: "Descargar el registro de prueba en blanco",
		pt: "Baixe o registro de teste em branco",
		ru: "Скачайте пустой бланк проверки"
	},
	sameConditions: {
		"zh-cn": "各项检测使用同一组条件，填写自己的观察结果。",
		en: "Use the same conditions across checks and enter your own observations.",
		ja: "各チェックで同じ条件を使い、自分の観測結果を記入してください。",
		ko: "모든 점검에서 같은 조건을 사용하고 직접 관찰한 결과를 입력하세요.",
		es: "Usa las mismas condiciones en cada comprobación e introduce tus propias observaciones.",
		pt: "Use as mesmas condições em todas as verificações e registre as suas próprias observações.",
		ru: "Используйте одинаковые условия для всех проверок и вносите свои наблюдения."
	},
	allPaths: {
		"zh-cn": "查看全部系列",
		en: "All learning paths",
		ja: "すべての学習パス",
		ko: "전체 학습 경로",
		es: "Todas las rutas de aprendizaje",
		pt: "Todos os caminhos de aprendizagem",
		ru: "Все маршруты обучения"
	}
};

export function GuideSeriesIndex({ locale }: { locale: Locale }) {
	const edition = editionFor(locale);
	const en = edition === "en";
	return <section className="mb-10" aria-labelledby="guide-series-heading">
		<h2 id="guide-series-heading" className="text-xl font-semibold">{labels.indexHeading[locale] ?? labels.indexHeading.en}</h2>
		<div className="mt-5 grid gap-4 lg:grid-cols-3">{guideSeries.map(series => <section key={series.id} id={series.id} className="scroll-mt-24 rounded-xl border bg-muted/20 p-5" lang={en ? "en" : "zh-CN"}>
			<h3 className="font-semibold">{series.copy[edition].title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{series.copy[edition].description}</p>
			<ol className="mt-4 list-decimal space-y-3 pl-5 text-sm">{series.slugs.slice(0, 4).map(slug => <li key={slug}><Link href={localePath(edition, `guides/${slug}`)} className="text-primary underline-offset-4 hover:underline">{titleFor(locale, slug)}</Link></li>)}</ol>
			<p className="mt-4 text-xs text-muted-foreground">{labels.connected(series.slugs.length)[locale] ?? labels.connected(series.slugs.length).en}</p>
		</section>)}</div>
		<p className="mt-5 text-sm leading-7"><a href="/templates/browser-environment-checklist.csv" download className="text-primary underline underline-offset-4">{labels.downloadRecord[locale] ?? labels.downloadRecord.en}</a><span className="ml-2 text-muted-foreground">{labels.ownObservations[locale] ?? labels.ownObservations.en}</span></p>
	</section>;
}

export function GuideSeriesTrail({ locale, slug }: { locale: Locale; slug: string }) {
	const series = guideSeriesFor(slug);
	if (!series) return null;
	const edition = editionFor(locale);
	const en = edition === "en";
	const index = series.slugs.indexOf(slug);
	const neighbours = [series.slugs[index - 1], series.slugs[index + 1]].filter(Boolean);
	return <nav aria-label={labels.seriesAria[locale] ?? labels.seriesAria.en} data-guide-series={series.id} className="mt-10 rounded-xl border p-5">
		<p className="text-xs text-muted-foreground" lang={en ? "en" : "zh-CN"}>{series.copy[edition].title} · {index + 1} / {series.slugs.length}</p>
		<ul className="mt-3 space-y-3 text-sm">{neighbours.map(target => <li key={target}><Link href={localePath(edition, `guides/${target}`)} className="text-primary underline-offset-4 hover:underline">{(series.slugs.indexOf(target) < index ? labels.previous : labels.next)[locale] ?? (series.slugs.indexOf(target) < index ? labels.previous.en : labels.next.en)}{titleFor(locale, target)}</Link></li>)}</ul>
		{series.id === "environment-detection" && <p className="mt-4 text-xs leading-6"><a href="/templates/browser-environment-checklist.csv" download className="text-primary underline underline-offset-4">{labels.downloadBlank[locale] ?? labels.downloadBlank.en}</a> · <span>{labels.sameConditions[locale] ?? labels.sameConditions.en}</span></p>}
		<Link href={`${localePath(edition, "guides")}#${series.id}`} className="mt-4 inline-block text-xs underline underline-offset-4">{labels.allPaths[locale] ?? labels.allPaths.en}</Link>
	</nav>;
}
