/**
 * Localised headings for the comparison research sections.
 *
 * The research itself is authored in zh-cn and en only. The five remaining
 * locales reuse the English body, which is the fallback the rest of the site
 * uses (`tool-sections.ts`, `fingerprint-sections.ts`, `browser-sections.ts`).
 * The headings are short structural labels, so they are translated in every
 * locale — a page should not carry an English document outline under a
 * localised `<title>`.
 *
 * A 2026-11-01 audit of the built pages found that the comparison detail pages
 * were the largest remaining source of untranslated headings: every one of the
 * 29 pairs rendered its research headings in English on the ja/ko/es/pt/ru
 * pages, on top of the duplicated "Official sources and verification" heading
 * that the evidence block emitted twice.
 *
 * The map is keyed by the English heading string. All 43 English headings are
 * distinct, and `scripts/check-comparison-editorial.mjs` asserts that every
 * heading in the three editorial modules has an entry here, so a renamed
 * heading fails the build instead of silently falling back to English.
 *
 * Editorial rules, unchanged from the bodies:
 * - The headings name the research step; they assert no product capability,
 *   price, detection result or vendor claim.
 * - The "X vs Y" headings keep the product names as written.
 */

import type { Locale } from "@/lib/locale-ui";

export type EditorialHeadingLocales = Record<Locale, string>;

const heading = (zh: string, en: string, ja: string, ko: string, es: string, pt: string, ru: string): EditorialHeadingLocales => ({
	"zh-cn": zh,
	en,
	ja,
	ko,
	es,
	pt,
	ru
});

export const comparisonEditorialHeadings: Record<string, EditorialHeadingLocales> = {
	// --- series-comparisons.ts ---
	"AdsPower vs Dolphin Anty: compare the task you maintain": heading(
		"AdsPower 与 Dolphin Anty：先比较谁来维护任务",
		"AdsPower vs Dolphin Anty: compare the task you maintain",
		"AdsPower と Dolphin Anty：運用するタスクから比較する",
		"AdsPower 대 Dolphin Anty: 관리하는 작업부터 비교하기",
		"AdsPower frente a Dolphin Anty: compara la tarea que mantienes",
		"AdsPower vs Dolphin Anty: compare a tarefa que você mantém",
		"AdsPower против Dolphin Anty: сравнивайте задачу, которую вы ведёте"
	),
	"Read current engine and proxy options without guessing": heading(
		"按当前官方资料核对内核与代理选项",
		"Read current engine and proxy options without guessing",
		"推測ではなく現行のエンジンとプロキシ設定を確認",
		"추측 대신 현재 엔진과 프록시 옵션 확인",
		"Consulta las opciones actuales de motor y proxy sin suposiciones",
		"Consulte as opções atuais de engine e proxy sem suposições",
		"Проверьте актуальные варианты движка и прокси, не догадываясь"
	),
	"Check automation permissions before comparing entry prices": heading(
		"先确认自动化权限，再比较入门价格",
		"Check automation permissions before comparing entry prices",
		"入門価格を比較する前に自動化権限を確認する",
		"입문 가격을 비교하기 전에 자동화 권한 확인",
		"Comprueba los permisos de automatización antes de comparar precios de entrada",
		"Verifique as permissões de automação antes de comparar preços de entrada",
		"Проверьте права на автоматизацию до сравнения начальных цен"
	),
	"Use the same failure and handoff acceptance sheet": heading(
		"用同一张故障与交接表验收",
		"Use the same failure and handoff acceptance sheet",
		"障害と引き継ぎに同じ验收表を使う",
		"장애물과 인수인계에 동일한 승인표 사용",
		"Usa la misma hoja de aceptación de fallos y traspasos",
		"Use a mesma folha de aceitação de falhas e transferências",
		"Используйте одну таблицу приёмки для сбоев и передачи доступа"
	),
	"Choose from measured workflow costs, then stage migration": heading(
		"按实际维护成本决策，分批迁移",
		"Choose from measured workflow costs, then stage migration",
		"測定した運用コストから選び、段階的に移行する",
		"측정한 운영 비용으로 선택한 뒤 단계적으로 이전",
		"Elige según costes de flujo de trabajo medidos y migra por fases",
		"Escolha pelos custos de fluxo de trabalho medidos e migre em etapas",
		"Выбирайте по измеренным операционным затратам и переходите поэтапно"
	),
	"AdsPower vs MoreLogin: a workflow decision, not an API badge": heading(
		"AdsPower 与 MoreLogin：按工作方式决策，不看 API 标签",
		"AdsPower vs MoreLogin: a workflow decision, not an API badge",
		"AdsPower と MoreLogin：API の有無ではなく運用方式で決める",
		"AdsPower 대 MoreLogin: API 배지가 아닌 워크플로 선택",
		"AdsPower frente a MoreLogin: una decisión de flujo de trabajo, no de API",
		"AdsPower vs MoreLogin: uma decisão de fluxo de trabalho, não de API",
		"AdsPower против MoreLogin: решение о рабочем процессе, а не о наличии API"
	),
	"Separate desktop profiles, cloud storage and cloud phones": heading(
		"把桌面档案、云端存储与云手机分开",
		"Separate desktop profiles, cloud storage and cloud phones",
		"デスクトッププロファイル、クラウド保存、クラウド端末を分けて考える",
		"데스크톱 프로필, 클라우드 저장, 클라우드폰을 구분하기",
		"Separa perfiles de escritorio, almacenamiento en la nube y teléfonos en la nube",
		"Separe perfis de desktop, armazenamento em nuvem e celulares em nuvem",
		"Разделите десктопные профили, облачное хранилище и облачные устройства"
	),
	"Build one profile-and-seat purchasing basket": heading(
		"把环境数与席位放进同一张采购清单",
		"Build one profile-and-seat purchasing basket",
		"プロファイル数と席数をまとめて計算する",
		"프로필 수와 좌석 수를 하나의 구매 목록으로 계산",
		"Construye una cesta única de perfiles y asientos",
		"Monte uma única cesta de perfis e assentos",
		"Соберите единую корзину профилей и мест"
	),
	"Run a browser-and-team acceptance matrix": heading(
		"用同一张浏览器与团队验收表",
		"Run a browser-and-team acceptance matrix",
		"ブラウザとチームで同じ验收表を使う",
		"브라우저와 팀에 동일한 인수인계 매트릭스 사용",
		"Ejecuta una matriz de aceptación común para navegador y equipo",
		"Execute uma matriz de aceitação única para navegador e equipe",
		"Примените одну матрицу приёмки для браузера и команды"
	),
	"Select the plan that passes your required operations": heading(
		"选择能通过你的必需操作的套餐",
		"Select the plan that passes your required operations",
		"必要な運用要件を満たすプランを選ぶ",
		"필요한 운영 요구사항을 통과하는 요금제 선택",
		"Elige el plan que supera tus operaciones requeridas",
		"Escolha o plano que atende às operações que você precisa",
		"Выберите план, который проходит ваши рабочие сценарии"
	),
	"GoLogin vs Octo Browser: decide where execution happens": heading(
		"GoLogin 与 Octo Browser：先决定在哪里运行",
		"GoLogin vs Octo Browser: decide where execution happens",
		"GoLogin と Octo Browser：実行環境を決める",
		"GoLogin 대 Octo Browser: 실행이 이루어질 곳 결정",
		"GoLogin frente a Octo Browser: decide dónde se ejecuta",
		"GoLogin vs Octo Browser: decida onde a execução acontece",
		"GoLogin против Octo Browser: решите, где выполняется работа"
	),
	"Compare the API-enabled plan, not just the cheapest plan": heading(
		"比较支持 API 的档位，而不只是最便宜的档位",
		"Compare the API-enabled plan, not just the cheapest plan",
		"最安のプランではなく API が使えるプランを比較する",
		"가장 싼 요금제가 아니라 API 지원 요금제 비교",
		"Compara el plan con API, no solo el más barato",
		"Compare o plano com API, não apenas o mais barato",
		"Сравнивайте план с API, а не только самый дешёвый"
	),
	"Make profile handoff and recovery a separate decision": heading(
		"把档案交接与恢复当作单独决策",
		"Make profile handoff and recovery a separate decision",
		"プロファイルの引き継ぎと復旧は別の判断にする",
		"프로필 인수인계와 복구는 별개 판단으로 분리",
		"Trata el traspaso de perfiles y la recuperación como decisiones aparte",
		"Trate a transferência de perfis e a recuperação como decisões separadas",
		"Рассмотрите передачу профилей и восстановление как отдельные решения"
	),
	"Use the same runtime and environment evidence sheet": heading(
		"用同一张运行与环境证据表",
		"Use the same runtime and environment evidence sheet",
		"同じ実行環境・環境情報の記録表を使う",
		"동일한 런타임과 환경 기록표 사용",
		"Usa la misma hoja de evidencias de entorno y ejecución",
		"Use a mesma folha de evidências de ambiente e execução",
		"Используйте одну таблицу доказательств среды и запуска"
	),
	"Confirm mobile offers and migration terms independently": heading(
		"单独确认移动端方案与迁移条款",
		"Confirm mobile offers and migration terms independently",
		"モバイル版の提供内容と移行条件は個別に確認する",
		"모바일 제공 조건과 이전 약관은 별도로 확인",
		"Confirma por separado las ofertas móviles y las condiciones de migración",
		"Confirme separadamente as ofertas móveis e os termos de migração",
		"Проверяйте мобильные предложения и условия миграции отдельно"
	),
	"Kameleo vs Octo Browser: concurrency is not profile capacity": heading(
		"Kameleo 与 Octo Browser：并发数不等于档案数",
		"Kameleo vs Octo Browser: concurrency is not profile capacity",
		"Kameleo と Octo Browser：同時実行数はプロファイル数ではない",
		"Kameleo 대 Octo Browser: 동시 실행 수가 프로필 수와 같지 않음",
		"Kameleo frente a Octo Browser: la concurrencia no es la capacidad de perfiles",
		"Kameleo vs Octo Browser: concorrência não é capacidade de perfis",
		"Kameleo против Octo Browser: параллельность — это не число профилей"
	),
	"Compare launch, connection and state ownership in your SDK": heading(
		"在你的 SDK 中比较启动、连接与状态归属",
		"Compare launch, connection and state ownership in your SDK",
		"SDK での起動、接続、状態の保持方法を比較する",
		"SDK의 실행, 연결, 상태 보관 방식을 비교",
		"Compara arranque, conexión y custodia del estado en tu SDK",
		"Compare inicialização, conexão e guarda de estado no seu SDK",
		"Сравните запуск, подключение и хранение состояния в вашем SDK"
	),
	"Check desktop, container and mobile requirements separately": heading(
		"分别确认桌面、容器与移动端要求",
		"Check desktop, container and mobile requirements separately",
		"デスクトップ、コンテナ、モバイルの要件を分けて確認する",
		"데스크톱, 컨테이너, 모바일 요구사항을 따로 확인",
		"Revisa por separado los requisitos de escritorio, contenedor y móvil",
		"Verifique separadamente os requisitos de desktop, contêiner e mobile",
		"Проверяйте отдельно требования для десктопа, контейнера и мобильных"
	),
	"Use a workload acceptance table instead of unmatched prices": heading(
		"用工作量验收表，而不是无法对齐的价格",
		"Use a workload acceptance table instead of unmatched prices",
		"価格比較ではなく業務量の验收表を使う",
		"맞지 않는 가격 비교 대신 업무량 승인표 사용",
		"Usa una tabla de aceptación por carga de trabajo en lugar de precios sin correspondencia",
		"Use uma tabela de aceitação por carga de trabalho em vez de preços sem correspondência",
		"Используйте таблицу приёмки по рабочей нагрузке, а не несопоставимые цены"
	),
	"Choose the operating model and budget the complete workload": heading(
		"确定运行方式，并为完整工作量做预算",
		"Choose the operating model and budget the complete workload",
		"運用方式を決め、工作量全体を予算に含める",
		"운영 방식을 정하고 전체 작업량으로 예산 책정",
		"Elige el modelo operativo y presupuesta la carga completa",
		"Escolha o modelo operacional e orça a carga completa",
		"Выберите операционную модель и заложите в бюджет всю нагрузку"
	),

	// --- browser-editorial.ts ---
	"Choose the execution model before the subscription": heading(
		"先选择执行方式，再比较订阅",
		"Choose the execution model before the subscription",
		"購読の前に実行方式を決める",
		"구독 전에 실행 방식을 결정",
		"Elige el modelo de ejecución antes de la suscripción",
		"Escolha o modelo de execução antes da assinatura",
		"Определите модель выполнения до подписки"
	),
	"Run a handoff and failure-recovery trial": heading(
		"用交接与失败恢复完成一次试用",
		"Run a handoff and failure-recovery trial",
		"引き継ぎと障害復旧の試験を行う",
		"인수인계와 장애 복구 시험 진행",
		"Haz una prueba de traspaso y recuperación ante fallos",
		"Faça um teste de transferência e recuperação de falhas",
		"Проведите пробную передачу доступа и восстановление после сбоя"
	),
	"Check the permissions behind the API checkbox": heading(
		"不要只看“支持 API”",
		"Check the permissions behind the API checkbox",
		"API 対応表示の背後にある権限を確認する",
		"API 지원 표기 뒤의 권한 확인",
		"Comprueba los permisos que hay detrás de la casilla de API",
		"Verifique as permissões por trás da marcação de API",
		"Проверьте права, скрытые за отметкой о поддержке API"
	),
	"Separate desktop-browser work from native mobile apps": heading(
		"把桌面网页与原生手机应用需求分开",
		"Separate desktop-browser work from native mobile apps",
		"デスクトップブラウザの作業とネイティブアプリ開発を分ける",
		"데스크톱 브라우저 작업과 네이티브 앱을 구분",
		"Separa el trabajo del navegador de escritorio de las apps móviles nativas",
		"Separe o trabalho do navegador desktop dos aplicativos móveis nativos",
		"Разделите работу в десктопном браузере и нативные мобильные приложения"
	),
	"Test the state and access you need to preserve": heading(
		"实际验证状态保存和权限交接",
		"Test the state and access you need to preserve",
		"保持すべき状態と権限をテストする",
		"유지해야 할 상태와 접근 권한 테스트",
		"Prueba el estado y el acceso que necesitas conservar",
		"Teste o estado e o acesso que você precisa preservar",
		"Проверьте состояние и доступ, которые нужно сохранить"
	),
	"Read current product documentation alongside older catalogue fields": heading(
		"用当前文档核对历史目录",
		"Read current product documentation alongside older catalogue fields",
		"古い目録項目と現行の製品文書を併せて読む",
		"오래된 카탈로그 항목과 현재 제품 문서를 함께 확인",
		"Lee la documentación actual junto a los campos antiguos del catálogo",
		"Leia a documentação atual junto aos campos antigos do catálogo",
		"Читайте текущую документацию вместе со старыми полями каталога"
	),
	"Compare a browser-task workflow with a broader device bundle": heading(
		"浏览器任务流程与设备组合，应按需求比较",
		"Compare a browser-task workflow with a broader device bundle",
		"ブラウザタスクの運用と、より広いデバイス構成を比較する",
		"브라우저 작업 흐름과 더 넓은 디바이스 묶음 비교",
		"Compara un flujo de tareas del navegador con un paquete de dispositivos más amplio",
		"Compare um fluxo de tarefas no navegador com um conjunto de dispositivos mais amplo",
		"Сравните рабочий процесс браузерных задач с более широким набором устройств"
	),
	"Give both candidates the same acceptance task": heading(
		"给两家同一个验收任务",
		"Give both candidates the same acceptance task",
		"両方の候補に同じ验收タスクを実施する",
		"두 후보에 동일한 승인 작업을 부여",
		"Da la misma tarea de aceptación a ambos candidatos",
		"Dê a mesma tarefa de aceitação aos dois candidatos",
		"Дайте обоим кандидатам одну и ту же приёмочную задачу"
	),
	"Resolve entitlement and migration questions before rollout": heading(
		"上线前先解决权限与迁移问题",
		"Resolve entitlement and migration questions before rollout",
		"本番展開の前に利用権の条件を解消する",
		"출시 전에 사용 권한 조건 정리",
		"Resuelve las cuestiones de derechos antes del despliegue",
		"Resolva as questões de direitos antes da implantação",
		"Урегулируйте вопросы с доступом до внедрения"
	),
	"Choose between a local integration and an RPA workflow": heading(
		"在本地接入与 RPA 流程之间做选择",
		"Choose between a local integration and an RPA workflow",
		"ローカル連携と RPA 運用のどちらを選ぶか",
		"로컬 연동과 RPA 워크플로 중 선택",
		"Elige entre una integración local y un flujo de RPA",
		"Escolha entre integração local e um fluxo de RPA",
		"Выберите между локальной интеграцией и процессом RPA"
	),
	"Check storage and member access instead of assuming offline operation": heading(
		"确认存储位置与成员权限，而不是默认可以离线运行",
		"Check storage and member access instead of assuming offline operation",
		"オフライン動作と決めつけず、保存場所とメンバー権限を確認する",
		"오프라인 동작으로 단정하지 말고 저장 위치와 멤버 권한 확인",
		"Comprueba el almacenamiento y el acceso de miembros en lugar de asumir funcionamiento sin conexión",
		"Verifique o armazenamento e o acesso de membros em vez de supor funcionamento offline",
		"Проверьте хранение и права участников, а не предполагайте офлайн-работу"
	),
	"Keep the comparison and commercial relationship explicit": heading(
		"把对比关系与商业关系写清楚",
		"Keep the comparison and commercial relationship explicit",
		"比較と商業的な関係は明示する",
		"비교와 상업적 관계를 명시적으로 유지",
		"Mantén explícita la relación entre la comparación y la comercial",
		"Mantenha explícita a relação entre a comparação e a comercial",
		"Явно обозначьте связь сравнения с коммерческими отношениями"
	),
	"Decide where the browser should run": heading(
		"先决定浏览器应该在哪里运行",
		"Decide where the browser should run",
		"ブラウザを実行する場所を決める",
		"브라우저가 실행될 위치를 결정",
		"Decide dónde debe ejecutarse el navegador",
		"Decida onde o navegador deve ser executado",
		"Определите, где должен работать браузер"
	),
	"Trial a restart, an export and a team handoff": heading(
		"试用一次重启、一次导出与一次团队交接",
		"Trial a restart, an export and a team handoff",
		"再起動、エクスポート、チーム引き継ぎを試す",
		"재시작, 내보내기, 팀 인수인계 시험",
		"Prueba un reinicio, una exportación y un traspaso de equipo",
		"Teste um reinício, uma exportação e uma transferência de equipe",
		"Испытайте перезапуск, экспорт и передачу доступа команде"
	),
	"Validate the data boundary and disclose the relationship": heading(
		"确认数据边界并披露关联关系",
		"Validate the data boundary and disclose the relationship",
		"データの境界を確認し、関係性を明示する",
		"데이터 경계를 확인하고 관계를 공개",
		"Valida el límite de datos y revela la relación",
		"Valide o limite de dados e revele a relação",
		"Проверьте границу данных и раскройте отношения"
	),
	"Desktop browser profiles and Android cloud phones solve different tasks": heading(
		"桌面浏览器档案与 Android 云手机解决的是不同任务",
		"Desktop browser profiles and Android cloud phones solve different tasks",
		"デスクトップブラウザのプロファイルと Android クラウド端末は用途が異なる",
		"데스크톱 브라우저 프로필과 Android 클라우드폰은 목적이 다름",
		"Los perfiles de navegador de escritorio y los teléfonos en la nube de Android resuelven tareas distintas",
		"Perfis de navegador desktop e celulares em nuvem no Android resolvem tarefas diferentes",
		"Десктопные профили браузера и облачные Android-устройства решают разные задачи"
	),
	"Match the proposed plan to a recoverable pilot": heading(
		"把候选套餐放进一次可恢复的试点",
		"Match the proposed plan to a recoverable pilot",
		"提案されたプランを復元可能なパイロットに当てはめる",
		"제안된 요금제를 복구 가능한 파일럿에 연결",
		"Ajusta el plan propuesto a un piloto recuperable",
		"Encaixe o plano proposto em um piloto recuperável",
		"Соотнесите предлагаемый план с восстановимым пилотом"
	),
	"Treat the evidence and relationship as part of the decision": heading(
		"把证据与关联关系视为决策的一部分",
		"Treat the evidence and relationship as part of the decision",
		"証拠と関係性を判断の一部として扱う",
		"근거와 관계성을 판단의 일부로 취급",
		"Trata la evidencia y la relación como parte de la decisión",
		"Trate a evidência e a relação como parte da decisão",
		"Относитесь к данным и отношениям как части решения"
	),

	// --- comparison-editorial-generated.ts (shared by nineteen pairs) ---
	"Start with the fields each vendor documents": heading(
		"先看两家文档记录的字段，再决定选型",
		"Start with the fields each vendor documents",
		"まず各ベンダーの公開項目から確認する",
		"우선 각 공급사가 기록한 항목에서 시작",
		"Empieza por los campos que documenta cada proveedor",
		"Comece pelos campos que cada fornecedor documenta",
		"Начните с полей, которые документирует каждый поставщик"
	),
	"Keep the free allowance, the trial and the paid tier apart": heading(
		"把免费额度、试用和付费档分开算",
		"Keep the free allowance, the trial and the paid tier apart",
		"無料枠、体験版、有料プランを分けて計算する",
		"무료 한도, 체험판, 유료 등급을 나누어 계산",
		"Separa el plan gratuito, la prueba y el nivel de pago",
		"Separe o plano gratuito, o teste e o nível pago",
		"Разделяйте бесплатный лимит, пробный период и платный тариф"
	),
	"Confirm which tier carries API and proxy access": heading(
		"确认自动化与代理能力属于哪个档位",
		"Confirm which tier carries API and proxy access",
		"API とプロキシがどのプランに含まれるか確認する",
		"API와 프록시가 어느 등급에 포함되는지 확인",
		"Confirma qué nivel incluye el acceso a API y proxy",
		"Confirme qual nível inclui acesso a API e proxy",
		"Уточните, в каком тарифе включены API и прокси"
	),
	"Run one acceptance sheet against both": heading(
		"用同一张验收表分别跑一遍",
		"Run one acceptance sheet against both",
		"同じ验收表を両方に実施する",
		"동일한 승인표를 양쪽에 적용",
		"Ejecuta una misma hoja de aceptación contra ambos",
		"Execute uma mesma folha de aceitação nos dois",
		"Примените одну таблицу приёмки к обоим вариантам"
	),
	"Published caveats, open questions and what to ask before you buy": heading(
		"公开提示、待确认项和购买前要问的问题",
		"Published caveats, open questions and what to ask before you buy",
		"公開されている注意点、未解決の疑問、購入前に確認すべきこと",
		"공개된 주의사항, 미해결 질문, 구매 전 확인할 사항",
		"Advertencias publicadas, preguntas abiertas y qué preguntar antes de comprar",
		"Ressalvas publicadas, questões em aberto e o que perguntar antes de comprar",
		"Опубликованные оговорки, открытые вопросы и что спросить перед покупкой"
	)
};

/**
 * The localised heading for a research section, falling back to the English
 * string when a heading has no entry yet. The build check asserts that every
 * heading used by the editorial modules is present in the map, so the fallback
 * only covers copy added outside that check.
 */
export function comparisonEditorialHeading(english: string, locale: Locale): string {
	return comparisonEditorialHeadings[english]?.[locale] ?? english;
}
