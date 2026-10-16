import type { Locale } from "@/lib/i18n";

/**
 * Per-guide localised titles and meta descriptions.
 *
 * Previously `pageMeta()` reused the Chinese `GuideResource.title` and
 * `GuideResource.description` for every locale, so `/en/guides/<slug>/` shipped a
 * Chinese <title> and Chinese meta description. That is a relevance problem for
 * non-Chinese search engines and makes hreflang siblings look like duplicates.
 *
 * Rules for this table:
 * - Titles are written per locale, not transliterated.
 * - Descriptions are unique per guide AND per locale, and carry at least one
 *   concrete differentiator (platform, protocol, signal, scope) so they do not
 *   collapse into a single templated sentence.
 * - No product claims, prices or benchmark numbers are introduced here. Anything
 *   time-sensitive stays on the zh-cn page where it carries a checked-at date.
 */
type GuideCopy = { title: string; description: string };

const translations: Record<string, Partial<Record<Locale, GuideCopy>>> = {
	"how-to-choose-antidetect-browser": {
		en: { title: "How to Choose an Anti-Detect Browser", description: "A six-criteria checklist for anti-detect browsers: profile isolation, engine upkeep, proxy protocols, platform coverage, automation APIs and team permissions — plus a four-step verification flow." },
		ja: { title: "指纹ブラウザの選び方", description: "指紋ブラウザを環境分離・エンジン更新・プロキシ対応・対応環境・自動化 API・権限管理の6項目で比較し、4ステップの検証手順も解説します。" },
		ko: { title: "핑거프린트 브라우저 선택 방법", description: "프로필 격리, 엔진 업데이트, 프록시 프로토콜, 지원 플랫폼, 자동화 API, 팀 권한 6개 기준으로 핑거프린트 브라우저를 비교하고4단계 검증 절차를 정리합니다." },
		es: { title: "Cómo elegir un navegador antidetect", description: "Guía para comparar navegadores antidetect con seis criterios: aislamiento de perfiles, mantenimiento del motor, protocolos de proxy, plataformas, API de automatización y permisos de equipo." },
		pt: { title: "Como escolher um navegador antidetect", description: "Compare navegadores antidetect por seis critérios: isolamento de perfis, atualização do motor, protocolos de proxy, plataformas, API de automação e permissões de equipe." },
		ru: { title: "Как выбрать антидетект-браузер", description: "Сравнение антидетект-браузеров по шести критериям: изоляция профилей, обновление движка, прокси-протоколы, платформы, API автоматизации и права команды." }
	},
	"browser-fingerprinting-explained": {
		en: { title: "What Is Browser Fingerprinting?", description: "How sites combine rendering, device, language, timezone and network signals into a single fingerprint — and why patching one field rarely produces a consistent environment." },
		ja: { title: "ブラウザ指紋とは何ですか", description: "レンダリング・端末・言語・タイムゾーン・ネットワークのシグナルがどう組み合わされて指紋になるか。单一のフィールドを修正しても一貫しない理由も解説します。" },
		ko: { title: "브라우저 핑거프린팅이란", description: "렌더링, 기기, 언어, 시간대, 네트워크 신호가 어떻게 결합되어 핑거프린트를 이루는지 설명하고, 필드 하나만 바꿔도 일관성이 깨지는 이유를 다룹니다." },
		es: { title: "¿Qué es la huella del navegador?", description: "Cómo los sitios combinan señales de renderizado, dispositivo, idioma, zona horaria y red en una sola huella, y por qué parchear un campo no basta." },
		pt: { title: "O que é a impressão digital do navegador?", description: "Como sites combinam sinais de renderização, dispositivo, idioma, fuso horário e rede em uma única impressão digital e por que alterar um campo não basta." },
		ru: { title: "Что такое отпечаток браузера", description: "Как сайты объединяют сигналы рендеринга, устройства, языка, часового пояса и сети в один отпечаток и почему изменения одного поля недостаточно." }
	},
	"setting-up-proxies-easybr": {
		en: { title: "Proxy Setup Essentials for EasyBR", description: "How to enter HTTP, HTTPS and SOCKS5 credentials in EasyBR, then verify the exit IP, DNS path and WebRTC candidates before you start account work." },
		ja: { title: "EasyBR のプロキシ設定のポイント", description: "EasyBR に HTTP・HTTPS・SOCKS5 の認証情報を設定し、作業前に出口 IP・DNS 経路・WebRTC 候補を検証する手順をまとめます。" },
		ko: { title: "EasyBR 프록시 설정要点", description: "EasyBR에 HTTP, HTTPS, SOCKS5 인증 정보를 입력한 뒤 계정 작업을 시작하기 전에 출구 IP, DNS 경로, WebRTC 후보를 검증하는 방법입니다." },
		es: { title: "Claves para configurar proxies en EasyBR", description: "Cómo introducir credenciales HTTP, HTTPS y SOCKS5 en EasyBR y verificar la IP de salida, el DNS y los candidatos WebRTC antes de empezar." },
		pt: { title: "Pontos essential de proxy no EasyBR", description: "Como inserir credenciais HTTP, HTTPS e SOCKS5 no EasyBR e verificar IP de saída, DNS e candidatos WebRTC antes de iniciar as tarefas." },
		ru: { title: "Настройка прокси в EasyBR", description: "Как внести данные HTTP, HTTPS и SOCKS5 в EasyBR и проверить исходящий IP, DNS и кандидатов WebRTC до начала работы с аккаунтами." }
	},
	"multi-account-best-practices": {
		en: { title: "Multi-Account Environment Practices", description: "Give every account its own environment, keep proxy, language and timezone stable over time, restrict shared credentials, and log configuration changes." },
		ja: { title: "マルチアカウント環境の運用事例", description: "アカウントごとに環境を分け、プロキシ・言語・タイムゾーンを長期で一定に保ち、認証情報の共有を制限し、設定変更を記録する実践例です。" },
		ko: { title: "다중 계정 환경 관리 실무", description: "계정마다 독립된 환경을 사용하고 프록시·언어·시간대를 장기 일관되게 유지하며, 자격 증명 공유를 제한하고 설정 변경을 기록하는 실무 방법입니다." },
		es: { title: "Prácticas para entornos multicuenta", description: "Asigna un entorno por cuenta, mantén el proxy, idioma y zona horaria estables, limita las credenciales compartidas y registra los cambios de configuración." },
		pt: { title: "Práticas para ambientes multi-conta", description: "Dê um ambiente por conta, mantenha proxy, idioma e fuso horário estáveis, restrinja credenciais compartilhadas e registre as mudanças de configuração." },
		ru: { title: "Практика изоляции мультиаккаунтов", description: "Выделяйте отдельную среду на каждый аккаунт, держите прокси, язык и часовой пояс стабильными, ограничивайте общие учётные данные и фиксируйте изменения." }
	},
	"free-antidetect-browser": {
		en: { title: "How to Choose a Free Anti-Detect Browser", description: "What free tiers actually include: environment allowances, local versus cloud storage, proxy support and which features disappear once you upgrade." },
		ja: { title: "無料の指纹ブラウザの選び方", description: "無料枠で実際に提供されるもの（環境数、ローカルかクラウド保存、プロキシ対応）と、有料移行後に使えない機能を整理します。" },
		ko: { title: "무료 핑거프린트 브라우저 선택", description: "무료 요금제가 실제로 제공하는 환경 수, 로컬·클라우드 저장, 프록시 지원과 유료 전환 시 사라지는 기능을 정리합니다." },
		es: { title: "Cómo elegir un navegador antidetect gratuito", description: "Qué incluyen realmente los planes gratuitos: perfiles disponibles, almacenamiento local o en la nube, proxy y qué desaparece al subir de plan." },
		pt: { title: "Como escolher um navegador antidetect grátis", description: "O que os planos gratuitos realmente incluem: perfis, armazenamento local ou em nuvem, proxy e o que desaparece ao migrar para um plano pago." },
		ru: { title: "Как выбрать бесплатный антидетект-браузер", description: "Что входит в бесплатные тарифы: количество профилей, локальное или облачное хранение, прокси и что исчезает при переходе на платный план." }
	},
	"local-vs-cloud-browser-storage": {
		en: { title: "Local vs Cloud Browser Profile Storage", description: "Where profile data lives changes your offline access, cross-device collaboration, backup options and exposure surface. Compare both before committing." },
		ja: { title: "ローカル保存とクラウド保存の違い", description: "プロファイルデータの保存場所は、オフライン利用、端末間協業、バックアップ方法、露出範囲に影響します。両者を比較してから選んでください。" },
		ko: { title: "로컬 저장과 클라우드 저장의 차이", description: "프로필 데이터가 저장되는 위치에 따라 오프라인 사용, 기기 간 협업, 백업 방식, 노출 범위가 달라집니다. 선택 전에 비교하세요." },
		es: { title: "Almacenamiento local o en la nube", description: "Dónde viven los datos del perfil cambia el uso sin conexión, la colaboración entre dispositivos, las copias de seguridad y la superficie de exposición." },
		pt: { title: "Armazenamento local ou na nuvem", description: "Onde ficam os dados do perfil muda o uso offline, a colaboração entre dispositivos, os backups e a superfície de exposição. Compare antes de decidir." },
		ru: { title: "Локальное и облачное хранение профилей", description: "От места хранения данных профиля зависят офлайн-доступ, работа на разных устройствах, резервные копии и поверхность утечки. Сравните до выбора." }
	},
	"webrtc-leak-check": {
		en: { title: "How to Check for WebRTC Leaks", description: "WebRTC can bypass your proxy during ICE candidate collection. Learn the four signals to inspect, a six-step verification routine, and which results are false alarms." },
		ja: { title: "WebRTC リークの確認方法", description: "WebRTC は ICE 候補の収集でプロキシを迂回することがあります。確認すべき4つのシグナル、6ステップの検証手順、誤検出の見分け方を解説します。" },
		ko: { title: "WebRTC 누출 확인 방법", description: "WebRTC는 ICE 후보 수집 과정에서 프록시를 우회할 수 있습니다. 확인해야 할4가지 신호,6단계 검증 절차, 오탐 구분 방법을 설명합니다." },
		es: { title: "Cómo comprobar fugas de WebRTC", description: "WebRTC puede omitir el proxy al recoger candidatos ICE. Conoce las cuatro señales a revisar, el proceso de verificación en seis pasos y los falsos positivos." },
		pt: { title: "Como verificar vazamento de WebRTC", description: "O WebRTC pode contornar o proxy durante a coleta de candidatos ICE. Veja os quatro sinais a checar, o roteiro de verificação em seis passos e os falsos positivos." },
		ru: { title: "Как проверить утечку WebRTC", description: "WebRTC может обходить прокси при сборе кандидатов ICE. Разбираем четыре сигнала для проверки, шесть шагов верификации и ложные срабатывания." }
	},
	"read-creepjs-results": {
		en: { title: "How to Read CreepJS Results", description: "Separate raw measurements from inferred scores: which figures are facts you can verify elsewhere, and which are heuristics that need cross-checking." },
		ja: { title: "CreepJS の結果の読み方", description: "実測値と推定スコアを区別します。どの数値が他所で検証できる事実で、どの数値が他ツールとの照合が必要なヒューリスティックかを整理します。" },
		ko: { title: "CreepJS 결과 읽는 법", description: "실측값과 추정 점수를 구분합니다. 어떤 수치가 다른 곳에서 검증 가능한 사실이고, 어떤 수치가 교차 확인이 필요한 휴리스틱인지 정리합니다." },
		es: { title: "Cómo interpretar los resultados de CreepJS", description: "Separa mediciones reales de puntuaciones inferidas: qué cifras son hechos verificables y cuáles son heurísticas que requieren contraste." },
		pt: { title: "Como ler os resultados do CreepJS", description: "Separe medições reais de pontuações inferidas: quais números são fatos verificáveis e quais são heurísticas que exigem conferência cruzada." },
		ru: { title: "Как читать результаты CreepJS", description: "Разделяйте реальные измерения и вычисленные оценки: какие числа — проверяемые факты, а какие — эвристики, требующие сверки с другими инструментами." }
	},
	"configure-http-proxy": {
		en: { title: "How to Configure an HTTP Proxy", description: "The four fields an HTTP proxy entry needs, how to test port reachability before saving, and what to verify afterwards: exit IP, DNS path and HTTPS access." },
		ja: { title: "HTTP プロキシの設定方法", description: "HTTP プロキシの入力項目4つ、保存前にポート到達性を確認する方法、そして保存後の出口 IP・DNS 経路・HTTPS 通信の確認項目を解説します。" },
		ko: { title: "HTTP 프록시 설정 방법", description: "HTTP 프록시에 필요한 네 가지 입력값, 저장 전 포트 도달성 확인, 저장 후 출구 IP·DNS 경로·HTTPS접속 검증 방법을 설명합니다." },
		es: { title: "Cómo configurar un proxy HTTP", description: "Los cuatro campos que necesita un proxy HTTP, cómo probar el puerto antes de guardar y qué verificar después: IP de salida, DNS y acceso HTTPS." },
		pt: { title: "Como configurar um proxy HTTP", description: "Os quatro campos de um proxy HTTP, como testar a porta antes de salvar e o que verificar depois: IP de saída, DNS e acesso HTTPS." },
		ru: { title: "Как настроить HTTP-прокси", description: "Четыре поля записи HTTP-прокси, как проверить доступность порта до сохранения и что проверять после: исходящий IP, DNS и доступ по HTTPS." }
	},
	"configure-socks5-proxy": {
		en: { title: "How to Configure a SOCKS5 Proxy", description: "SOCKS5 tunnels traffic but does not decide where DNS resolves. Configure it, then verify the exit IP, the DNS resolver and WebRTC candidates separately." },
		ja: { title: "SOCKS5 プロキシの設定方法", description: "SOCKS5 はトラフィックをトンネルするだけで DNS の解決場所を決めません。設定後、出口 IP・DNS リゾルバ・WebRTC 候補を個別に検証します。" },
		ko: { title: "SOCKS5 프록시 설정 방법", description: "SOCKS5는 트래픽을 터널로 전달할 뿐 DNS 해석 위치를 결정하지 않습니다. 설정 후 출구 IP, DNS 리졸버, WebRTC 후보를 각각 검증하세요." },
		es: { title: "Cómo configurar un proxy SOCKS5", description: "SOCKS5 tuneliza el tráfico pero no decide dónde se resuelve el DNS. Configúralo y verifica por separado la IP de salida, el resolutor DNS y los candidatos WebRTC." },
		pt: { title: "Como configurar um proxy SOCKS5", description: "O SOCKS5 encapsula o tráfego mas não decide onde o DNS é resolvido. Configure e verifique separadamente o IP de saída, o resolvedor DNS e os candidatos WebRTC." },
		ru: { title: "Как настроить SOCKS5-прокси", description: "SOCKS5 туннелирует трафик, но не определяет, где разрешается DNS. Настройте его и отдельно проверьте исходящий IP, DNS-резолвер и кандидатов WebRTC." }
	},
	"browser-fingerprint-signals": {
		en: { title: "What Signals Make Up a Browser Fingerprint?", description: "Six families of signals — rendering, device, system, language, network and storage — and why each one has to stay consistent with the others." },
		ja: { title: "ブラウザ指紋に含まれる情報", description: "レンダリング・端末・OS・言語・ネットワーク・ストレージの6系統のシグナルと、それぞれの整合性が保たれる必要がある理由を紹介します。" },
		ko: { title: "브라우저 핑거프린트를 구성하는 정보", description: "렌더링, 기기, 시스템, 언어, 네트워크, 저장소 6종류의 신호와 각 신호가 서로 일관되어야 하는 이유를 설명합니다." },
		es: { title: "¿Qué señales forman una huella del navegador?", description: "Seis familias de señales —renderizado, dispositivo, sistema, idioma, red y almacenamiento— y por qué cada una debe ser coherente con las demás." },
		pt: { title: "Quais sinais formam a impressão digital do navegador?", description: "Seis famílias de sinais —renderização, dispositivo, sistema, idioma, rede e armazenamento— e por que cada uma precisa ser consistente com as demais." },
		ru: { title: "Из каких сигналов состоит отпечаток браузера", description: "Шесть семейств сигналов — рендеринг, устройство, система, язык, сеть и хранилище — и почему каждому нужна согласованность с остальными." }
	},
	"browser-profile-permissions": {
		en: { title: "Permissions for Team Browser Profiles", description: "Assign the minimum access each member needs, keep master credentials unshared, restrict export and deletion, and keep an audit trail of proxy and extension changes." },
		ja: { title: "チーム用ブラウザ環境の権限管理", description: "メンバーごとに最小権限を割り当て、マスター認証情報を共有せず、書き出しと削除を制限し、プロキシや拡張機能の変更履歴を残す方法。" },
		ko: { title: "팀 브라우저 프로필 권한 관리", description: "멤버별 최소 권한을 부여하고, 마스터 자격 증명을 공유하지 않으며, 내보내기와 삭제를 제한하고, 프록시·확장자 변경 이력을 남깁니다." },
		es: { title: "Permisos para perfiles de navegador en equipo", description: "Asigna a cada miembro el acceso mínimo, no compartas credenciales maestras, restringe exportación y borrado, y registra los cambios de proxy y extensiones." },
		pt: { title: "Permissões para perfis de navegador em equipe", description: "Dê a cada membro o acesso mínimo, não compartilhe credenciais mestras, restrinja exportação e exclusão e registre mudanças de proxy e extensões." },
		ru: { title: "Права доступа к браузерным профилям команды", description: "Выдавайте каждому участнику минимальные права, не делитесь мастер-учётными данными, ограничивайте экспорт и удаление и фиксируйте изменения прокси и расширений." }
	}
};

/** Returns the localised title/description for a guide, falling back to the zh-cn source copy. */
export function localizedGuideCopy(locale: Locale, slug: string, fallback: { title: string; description: string }): GuideCopy {
	const editorial = editorialGuideTranslations[slug];
	if (editorial) return editorial[locale === "zh-cn" ? "zh-cn" : "en"];
	const localized = translations[slug]?.[locale];
	if (localized) return localized;
	if (locale === "zh-cn") return fallback;
	const english = translations[slug]?.en;
	if (locale === "en" && english) return english;
	// Old untranslated URLs retain an English fallback but are not in the indexing/hreflang set.
	return english ?? fallback;
}

export type GuideSection = { heading: string; body: string };

/**
 * Per-guide English body sections.
 *
 * `GuideResource.sections` only exists on the zh-cn source rows, and until now only
 * the legacy `/guides/[slug]` route rendered it. The locale-prefixed routes — the
 * ones the sitemap actually submits and hreflang points at — ignored `sections`
 * entirely and shipped a single `<p>` of body copy. That made ~10k characters of
 * researched guide content invisible to crawlers on every non-legacy URL.
 *
 * Rules for this table:
 * - These are translations of the existing zh-cn sections, not new material.
 *   No product parameter, price, benchmark or product verdict is introduced here.
 * - Paragraph breaks and "- " list markers are preserved because `SectionBody`
 *   turns blank-line-separated blocks into <p> and "- " runs into <ul><li>.
 * - The closing "responsible use" disclaimer is kept in every guide, matching the
 *   zh-cn source and the site's editorial position.
 */
const sectionTranslations: Record<string, GuideSection[]> = {
	"how-to-choose-antidetect-browser": [
		{
			heading: "Decide whether you actually need an anti-detect browser",
			body: "The core purpose of an anti-detect browser is to keep multiple browser environments isolated from each other, and to keep each environment's network and device signals internally consistent. It solves environment reuse, not concealment.\n\nBefore comparing products, confirm three things:\n- Do you genuinely need to maintain several independent environments at once? With a single account and no multi-platform operations, a normal browser's privacy settings are usually enough.\n- Does your target platform impose explicit environment-consistency requirements? Every platform judges differently, so this cannot be answered generically.\n- Does your use case fall inside the target platform's terms of service. Whether a tool is compliant is decided by the scenario, not by the tool itself.\n\nIf any one of these does not hold, resolving it before comparing tools is usually more effective than switching tools."
		},
		{
			heading: "Six criteria worth checking one by one",
			body: "Do not decide on brand reputation or unit price alone. These six dimensions are where products actually diverge; record a conclusion for each:\n\n- Isolation model: whether environment data lives on your machine or on the vendor's servers decides portability and collaboration. Local-first tools keep working offline; cloud schemes are easier for cross-device work.\n- Browser engine and update policy: the engine sets the baseline for fingerprint signals. A stale engine degrades as the target platform upgrades, so check how actively the vendor maintains it.\n- Proxy support: confirm at least HTTP, HTTPS and SOCKS5, whether proxies can be bound per environment, and whether DNS handling options exist.\n- Platform coverage: the combination of Windows, macOS, Linux and Cloud must cover your actual working environment.\n- Automation and API: a stable interface and compatibility with mainstream automation frameworks decide whether manual steps can become scripts.\n- Team and permissions: with multiple members, least privilege, sharing boundaries and change history matter more than single-user features.\n\nThe platform, engine, storage, free-tier and starting-price fields on this site's comparison pages are organised on exactly these criteria, so you can use them directly as a checklist."
		},
		{
			heading: "A four-step verification process",
			body: "Shortlist → small trial → cost calculation → pre-launch check, in that order, keeps one-sided marketing from steering the decision.\n\nStep one, list the hard constraints: environment count ceiling, required platforms, whether cloud is mandatory, whether an API is needed. Mark the non-negotiable items as must-have.\n\nStep two, filter down to two or three candidates with the must-haves, then actually create environments with the free tier or cheapest plan. Do not skip this: well-written documentation does not guarantee consistent real behaviour.\n\nStep three, calculate the real cost as the actual plan, seats, billing period, taxes and usage, and list proxy traffic fees separately. In many products proxy bandwidth is billed per GB, and that line item often exceeds the browser subscription itself.\n\nStep four, run a consistency check before going live: create an environment, run public detection tools in normal browsing and in your target scenario, and record the Canvas, WebGL, timezone, language and WebRTC results. Repeated tests on the same environment should be stable and should not jump randomly.\n\nPrices, plans and features change; treat every price on this page as subject to the vendor's current official page."
		},
		{
			heading: "Four common mistakes",
			body: "- Treating \"high rating\" as equivalent to \"right for me\". A rating reflects overall performance, which is a different question from whether it fits your constraints.\n- Comparing price while ignoring proxy cost. In multi-account scenarios proxy traffic should be budgeted from actual usage and contract terms; there is no universal cost ratio.\n- Believing claims like \"completely undetectable\". No tool is undetectable everywhere; judge by actual detection results, not by promises.\n- Running several accounts in one environment. Environment reuse may expose shared session or storage state; bind each account to its own environment and keep proxy, language and timezone consistent over time.\n\nThis material is for resource curation, privacy research and compliant browser environment management. Follow the target platform's terms and applicable local law."
		}
	],
	"browser-fingerprinting-explained": [
		{
			heading: "What a browser fingerprint actually is",
			body: "A browser fingerprint is not a single field but a combination of signals a site can read. When a page loads, the browser exposes rendering capability, device parameters, system settings, language, timezone and network characteristics. A site can combine and hash those values into a relatively stable environment identifier used to judge whether two visits come from the same browser environment.\n\nThe key difference from cookies: cookies are stored locally and can be cleared, while a fingerprint comes from the environment itself and can stay consistent after cookies are cleared. That is why fingerprints are used for cookieless tracking and risk screening."
		},
		{
			heading: "Why single-point changes rarely work",
			body: "Many people change only the User-Agent, or swap only the fonts, and are still recognised as the same environment. The reason is that risk systems judge consistency between signals: a timezone set to Tokyo, an English interface language, and Canvas output that looks like a different machine is a contradictory combination, and contradictions look more like disguise.\n\nWhat works is not changing one point but making a group of signals agree with each other and stay stable over a period. Flipping parameters temporarily raises suspicion more often than staying stable does."
		},
		{
			heading: "The signal dimensions worth watching",
			body: "Common dimensions fall into groups:\n- Rendering: differences in Canvas, WebGL and AudioContext output.\n- Device: hardware concurrency, memory, screen resolution and colour depth.\n- System: operating system, font list, timezone, language and region.\n- Network: exit IP, WebRTC candidate addresses, DNS resolution path.\n- Storage: how cookies, LocalStorage and IndexedDB are isolated from each other.\n\nEach item alone is only a fragment. Combined, they form a recognisable environment profile."
		},
		{
			heading: "Two common misconceptions",
			body: "- Believing private browsing removes fingerprints. It mainly isolates local storage and has little effect on rendering, fonts or timezone signals.\n- Believing an unchanging fingerprint is automatically safe. Long-stable signals do look more natural, but if every environment looks identical you lose the ability to distinguish them. The goal is environments that are internally consistent and mutually different, not some \"standard\" fingerprint.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Follow the target platform's terms and applicable local law."
		}
	],
	"setting-up-proxies-easybr": [
		{
			heading: "Confirm three things before configuring",
			body: "Before entering any proxy details, write down three things so you are not working from memory:\n- Protocol: confirm whether the provider offers HTTP, HTTPS or SOCKS5. The entry point and authentication method differ, and the wrong choice fails to connect.\n- Permitted use: confirm which site categories the provider allows. This matters more for compliance than the technical setup does.\n- DNS behaviour: confirm whether the proxy resolves domain names for you. Do not assume SOCKS5 already does this correctly.\n\nEasyBR's proxy fields and plans follow the current official version; this article describes only general troubleshooting approach."
		},
		{
			heading: "Recommended configuration and verification order",
			body: "Work through these in order and keep evidence at each step:\n\nStep one, record your baseline public IP with no proxy configured, as a control.\n\nStep two, select the matching protocol in EasyBR's environment settings and enter host, port and credentials.\n\nStep three, confirm on a standard IP lookup page that the exit IP has become the proxy address. If this fails, stop here.\n\nStep four, use a DNS leak detection tool to confirm queries originate from the proxy server.\n\nStep five, inspect WebRTC candidate addresses and confirm no real address inconsistent with the proxy appears.\n\nStep six, run a real connectivity test in your target scenario and record the test conditions."
		},
		{
			heading: "Troubleshooting when something fails",
			body: "- Cannot connect at all: test from a system command line whether the proxy port is reachable before touching client settings. An unreachable port is a network-layer issue, unrelated to the browser.\n- Connects but authentication fails: check whether the protocol was chosen incorrectly, and whether special characters in the password need encoding.\n- Pages fail to load while IP lookup works: this is usually about where DNS is resolved; enable remote resolution and retry.\n- Only some sites misbehave: this often involves the target site restricting proxy IP ranges — an exit IP reputation issue, not a configuration error.\n\nNever write proxy passwords into public logs, ticket screenshots or shared documents."
		},
		{
			heading: "Two easily overlooked points",
			body: "- \"Configured successfully\" does not mean \"no leaks\". A proxy only constrains traffic inside the tunnel; WebRTC or certain background requests may not follow proxy settings and must be verified separately.\n- Pin your node for long-term use. Frequently switching proxy regions changes your login location repeatedly, which is itself an anomaly signal and can trigger platform risk controls.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Prices, plans and features change; confirm current information on each vendor's official site."
		}
	],
	"multi-account-best-practices": [
		{
			heading: "Establish the isolation boundary first",
			body: "The most basic principle in multi-account management is one account per environment. Bind each account to its own environment, its own proxy and its own login state, and do not reuse cookies or cache between environments.\n\nEnvironment reuse may expose shared sessions or storage; association also depends on the service and the signals it uses. Once the isolation boundary exists, every consistency measure after it becomes meaningful."
		},
		{
			heading: "Keep signals consistent over the long term",
			body: "After isolation, the priority is keeping each environment's signals stable over time:\n- Proxy: pin the node and avoid frequent switches that make the login location jump.\n- Language and timezone: match the region the environment belongs to, for example US English and a US timezone for a North America environment.\n- Behaviour: keep operating rhythm and device habits close to a natural user distribution.\n\nConsistency does not mean \"the more human-like the better\". It means internally coherent and stable. Changing parameters temporarily raises suspicion more than staying stable does."
		},
		{
			heading: "Permissions and change history",
			body: "When teams collaborate, assign the least privilege each member's role requires, avoid sharing master account credentials, and restrict export and deletion.\n\nRecord every change to proxies, extensions or environment configuration in a form that can be traced back: who, at what time, which environment, which field. When linkage appears, these records are the only lead for locating the cause.\n\nTreat credential exposure as a security incident: rotate immediately and audit the affected environments."
		},
		{
			heading: "Three common mistakes",
			body: "- Assuming a different browser engine equals isolation. The engine is only one signal; if network, language and timezone are identical across two environments, they can still be linked.\n- Checking environments only when something breaks. Re-verify fingerprint and proxy consistency periodically with public detection tools during normal work.\n- Equating a tool's capability with permission to use it. Compliance is decided by the scenario and the platform's terms, not by the tool.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Follow the target platform's terms and applicable local law."
		}
	],
	"free-antidetect-browser": [
		{
			heading: "What free tiers are good for",
			body: "A free allowance is best used to validate a workflow: confirm first that the tool's isolation, proxy configuration and detection behaviour meet expectations, then decide whether to pay for more capacity. It is fundamentally a trial entry point, not permanent access to every commercial feature.\n\nIf your account volume already exceeds the free allowance, squeezing into the free tier usually forces environment reuse, restricts export or shortens retention, which raises operational risk instead of lowering it. Free tiers suit starting, not long-term production."
		},
		{
			heading: "Compare item by item",
			body: "Do not look at the free environment count alone. Check at least four more things:\n- Where data is stored: local or cloud determines offline availability and how much control you have over your data.\n- Platform coverage: whether the free tier also supports the Windows, macOS, Linux or mobile platforms you need.\n- Proxy and automation: whether the free tier allows binding proxies and exposes an API or automation interface.\n- Retention and export: whether free environments limit retention days or restrict export.\n\nThe free allowance, price, platform and storage fields on this site's comparison pages are organised on exactly these criteria as a verifiable checklist."
		},
		{
			heading: "Calculate the real cost",
			body: "When moving from free to paid, calculate the actual plan, seats, billing period, taxes and usage and list proxy traffic fees separately. In multi-account scenarios proxy bandwidth is often billed per GB and can exceed the browser subscription itself.\n\nPrices, plans and features change; treat every price here as subject to the vendor's current official page. Do not budget from remembered older prices."
		},
		{
			heading: "Three common mistakes",
			body: "- Treating the free environment count as a usable ceiling. Free tiers often carry functional limits such as restricted automation or export, so real capacity is lower than the number suggests.\n- Ignoring retention rules. Some free allowances cap how long an environment is kept, and not upgrading in time can lose the configuration.\n- Running real production accounts in free environments. Free tiers have many limits and weaker stability; they suit testing, while production accounts belong in paid, stable environments.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Follow the target platform's terms and applicable local law."
		}
	],
	"local-vs-cloud-browser-storage": [
		{
			heading: "What each storage model solves",
			body: "Local-first keeps environment data on your own device: it works offline, and you control where the data lives and how often it is backed up. It suits scenarios that prioritise control over your own data.\n\nCloud storage keeps environment data on the vendor's side: signing in from another device brings up the same environment set, which suits multi-location and multi-device collaboration and centralised management. The trade-off is that you must trust the vendor's storage security and privacy policy, and you depend on network connectivity."
		},
		{
			heading: "Choose by your own priorities",
			body: "You can compare along four dimensions:\n- Offline availability: local-first keeps working without a network; cloud depends on connectivity.\n- Collaboration: cloud is smoother for cross-device and cross-member sync.\n- Data control: local-first gives you more agency over data location and deletion timing.\n- Recovery: cloud usually includes centralised backup and restore; local requires you to plan backups yourself.\n\nThe \"Storage\" field on this site's comparison pages labels each product as local-first, cloud or both, which is a reasonable starting point."
		},
		{
			heading: "Migration and backup considerations",
			body: "Once you pick a storage model, the backup strategy has to follow: for local-first environments, export periodically and keep copies elsewhere so a single device failure does not lose every environment. For cloud environments, confirm the vendor's retention period and export capability so you can retrieve data if the service shuts down.\n\nSwitching storage model usually means recreating environments; fingerprints and configuration from the original environment do not migrate automatically, so plan ahead."
		},
		{
			heading: "Two common misconceptions",
			body: "- Assuming cloud is always less secure. Security depends on the vendor's specific measures and your own habits; it cannot be decided generically.\n- Assuming local is always more reliable. If the local device fails and you have no backup, the data is lost just the same.\n\nWhichever you choose, read the vendor's privacy policy and use it within the target platform's terms and applicable local law."
		}
	],
	"webrtc-leak-check": [
		{
			heading: "What a WebRTC leak is",
			body: "WebRTC is the browser's built-in real-time communication interface, originally built for audio and video calls. To establish a connection, the browser collects local candidate network addresses and negotiates a usable path via ICE (Interactive Connectivity Establishment).\n\nThe problem is that this negotiation does not always follow the proxy. Ordinary web traffic usually goes through an HTTP/HTTPS proxy, while WebRTC candidate collection may query the network card and system interfaces directly, obtaining the real public address and local LAN addresses — and with no proxy in place it can expose the internal network layout.\n\nA \"WebRTC leak\" means you believed traffic was going through the proxy while some signals bypassed it and leaked directly. The common symptom is a detection page showing both the proxy IP and your real public IP, or showing LAN addresses outright."
		},
		{
			heading: "Four signal classes to observe separately",
			body: "A meaningful WebRTC check needs all four at once:\n\n- Public address: should match the proxy exit IP. Two different public IPs at once means there is a leak.\n- LAN addresses: typically 192.168.x.x, 10.x.x.x, 172.16~31.x.x. Their presence means the internal network layout is exposed.\n- ICE candidate types: host, srflx and relay. host is a local address, srflx is reflected via STUN, relay goes through a TURN relay. proxy combined with relay is usually the safest pairing.\n- Permissions and policy: browsers differ in WebRTC defaults, and whether mDNS obfuscation is enabled or candidate collection is restricted both change the outcome.\n\nAny single signal in isolation leads easily to the wrong conclusion. The test is whether an address inconsistent with the proxy exit appears, not whether WebRTC appears at all."
		},
		{
			heading: "Recommended checking steps",
			body: "In the target browser environment, run a full check in this order:\n\nStep one, open the detection page with no proxy and record the current public IP and LAN addresses as a baseline. This establishes your real network identity.\n\nStep two, enable the proxy and reopen the page, comparing whether the public IP has become the proxy exit IP.\n\nStep three, check whether LAN addresses still appear. If the proxy is working but LAN addresses remain visible, the browser's WebRTC policy is not tight enough and needs adjusting in the browser or fingerprinting tool.\n\nStep four, inspect the ICE candidate type distribution and see whether host candidates are disabled.\n\nStep five, cross-verify with a second independent tool. A single tool can produce false positives or misses; results are only worth trusting when two or three tools agree.\n\nStep six, record the test conditions — browser version, operating system, proxy type and test time — so the check can be reproduced. Detection results are only valid for the network conditions at the time."
		},
		{
			heading: "What to do once a leak is confirmed",
			body: "Work through these by severity:\n\n- First rule out whether the proxy is actually working. Confirm the exit IP on a standard lookup page; if it already shows your real IP, the problem is at the proxy layer, not WebRTC.\n- If the proxy works but leaks remain, inspect the WebRTC-related settings in your fingerprinting browser and disable host candidates, or disable WebRTC outright. Disabling WebRTC affects video conferencing, so close it only on accounts that genuinely need it.\n- Check whether the browser holds permissions it does not need; microphone and camera permissions are tied to WebRTC candidate collection.\n- Re-test after changing settings. Never assume the fix worked.\n\nDisabling WebRTC is a strong restriction; weigh it against actual business needs and always follow the target platform's terms and applicable local law."
		},
		{
			heading: "Three easy misjudgements",
			body: "- Seeing a LAN address and declaring failure outright. Modern browsers widely enable mDNS obfuscation, replacing local addresses with randomly generated .local names; not seeing the raw IP is normal protective behaviour.\n- Testing once and concluding. WebRTC candidate collection has timing variability, so an occasional odd value is not a sustained leak; repeat the check three or more times in the same environment.\n- Assuming a proxy means no leaks. A proxy solves the traffic path and does not necessarily constrain WebRTC candidate collection; verify them separately."
		}
	],
	"read-creepjs-results": [
		{
			heading: "Separate three kinds of output",
			body: "CreepJS output falls into three categories worth distinguishing:\n- Factual data: values the browser actually exposes, such as font lists, timezone, language and Canvas noise. These are directly reproducible measurements.\n- Inferred scores: trust or consistency ratings derived from rules. These are heuristic judgements, not objective facts.\n- Risk flags: markers on anomalous or contradictory signals, which only make sense against your real configuration.\n\nTreating a score as a conclusion tends to leave you at the mercy of one tool's methodology."
		},
		{
			heading: "Focus on consistency, not score height",
			body: "What matters more than \"is the score high\" is \"do the signals agree with each other\". For example, whether timezone, language and region point at the same place, and whether rendering characteristics stay stable.\n\nIf signals contradict each other, an environment can look more suspicious than one with mediocre scores but consistent signals. Consistency is the core test of whether an environment looks natural."
		},
		{
			heading: "Cross-verify to raise confidence",
			body: "Do not trust a single tool. Re-test the same environment with independent pages such as BrowserLeaks and Pixelscan, and compare whether the key fields agree.\n\nWhen results diverge, record the test conditions first: browser version, operating system, proxy type and test time. Results are only valid for the network and device conditions at the time, and should be retested after the environment changes."
		},
		{
			heading: "Two common misconceptions",
			body: "- Equating \"good score\" with \"safe\". A score reflects one tool's viewpoint, not the target site's judgement criteria.\n- Testing once and concluding. Browser updates, system changes and proxy switches all change results; repeat checks in the same environment and keep the records.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Follow the target platform's terms and applicable local law."
		}
	],
	"configure-http-proxy": [
		{
			heading: "The four fields of an HTTP proxy",
			body: "When configuring an HTTP/HTTPS proxy, confirm at least four things:\n- Protocol: establish whether the endpoint is HTTP or HTTPS, since authentication and encryption differ.\n- Host and port: note whether an IP or a domain name is required; some providers insist on one form.\n- Credentials: username and password, where special characters in the password sometimes need URL encoding.\n- Permitted use: confirm which site categories the provider allows. This matters more for compliance than the technical setup.\n\nCheck each item before filling anything in rather than typing from memory."
		},
		{
			heading: "Connectivity check before saving",
			body: "Before saving the configuration in the browser, test from a system command line whether the proxy port is reachable. That avoids mistaking a network-layer problem for a client fault.\n\nAn unreachable port is a network-layer issue unrelated to the browser; once the port responds, move to the next step. This step removes a lot of wasted configuration debugging later."
		},
		{
			heading: "Three layers of verification after saving",
			body: "After saving, verify three layers in order:\n\nStep one, confirm on a standard IP lookup page that the exit IP has become the proxy address. If this fails, nothing after it matters.\n\nStep two, check that DNS resolution goes through the proxy channel so your ISP's resolver is not exposed.\n\nStep three, visit the target HTTPS site and confirm the certificate and loading behave normally.\n\nOnly when all three pass is the HTTP proxy genuinely in effect."
		},
		{
			heading: "Two security reminders",
			body: "- Never write proxy passwords into public logs, ticket screenshots or shared documents. Treat credential exposure as a security incident.\n- An HTTP proxy does not guarantee WebRTC candidate collection is handled. A proxy solves the traffic path; WebRTC can bypass it and needs separate testing.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Prices, plans and features change; confirm current information on each vendor's official site."
		}
	],
	"configure-socks5-proxy": [
		{
			heading: "How SOCKS5 differs from an HTTP proxy",
			body: "When troubleshooting network problems, many people treat SOCKS5 and HTTP proxies as the same thing, but their architectures differ.\n\nAn HTTP proxy operates at the application layer. The browser knows it is talking to a proxy, so control over web traffic is deterministic.\n\nSOCKS5 operates at the transport layer and establishes a general-purpose tunnel between client and proxy. That architecture has a direct consequence: DNS resolution behaviour is not mandated by the protocol and depends on the client implementation.\n\nIn practice, resolution happens locally by default, so DNS queries follow the local network's resolver and have nothing to do with the proxy. Only when the client explicitly enables remote resolution are DNS queries sent through the tunnel to the proxy server.\n\nThis is why the same machine with the same SOCKS5 configuration can produce completely different leak results in different clients. When configuring SOCKS5, treat DNS resolution location as an independent check item rather than assuming it is already correct."
		},
		{
			heading: "Four fields to confirm before configuring",
			body: "Confirm these four items one by one instead of filling them in from memory:\n\n- Protocol: confirm the provider offers SOCKS5 rather than SOCKS4 or HTTP. SOCKS4 supports neither authentication nor UDP, so choosing it causes authentication failures.\n- Host and port: note whether an IP or a domain name is required; some providers insist on one form.\n- Credentials: username and password, checking whether special characters need URL encoding.\n- Proxy usage limits: confirm which site categories the provider allows. This matters more for compliance than the technical setup.\n\nAlso locate the DNS resolution option. Different clients place it under \"proxy settings\", \"network settings\" or \"advanced options\"; the naming differs but the meaning is the same: whether the proxy resolves domain names."
		},
		{
			heading: "Configuration and verification steps",
			body: "Follow this order and keep verifiable evidence at each step:\n\nStep one, record the baseline public IP in an environment with no proxy configured, as a control.\n\nStep two, select SOCKS5 in the browser or fingerprinting tool's proxy settings, enter host, port and credentials, and explicitly enable remote DNS resolution.\n\nStep three, confirm on a standard IP lookup page that the exit IP has become the proxy address. If this fails, stop — later tests would be meaningless.\n\nStep four, use a DNS leak detection tool to confirm queries originate from the proxy server rather than a local resolver. If the results show your ISP's DNS server, remote resolution is not in effect.\n\nStep five, inspect WebRTC candidate addresses and confirm no real address inconsistent with the proxy appears. SOCKS5 does not guarantee WebRTC handling, so verify it separately.\n\nStep six, run a real connectivity test in your actual scenario, including target site access, media loading and form submission.\n\nStep seven, record the test conditions and verification date: provider, node region, test time and the detection tools used."
		},
		{
			heading: "Common faults and troubleshooting order",
			body: "When something fails, work from the bottom layer upwards without skipping:\n\n- Cannot connect at all: test from a system command line whether the proxy port is reachable, then check client settings. An unreachable port is a network-layer issue, unrelated to the browser.\n- Connects but authentication fails: check whether the protocol was chosen incorrectly, and whether special characters in the password need encoding.\n- Pages fail to load while IP lookup works: usually about where DNS is resolved; enable remote resolution and retry.\n- Some sites work and others do not: often involves the target site restricting proxy IP ranges — an exit IP reputation issue, not a configuration error.\n- Intermittent failures: check node stability and whether you are being throttled after hitting the provider's traffic allowance.\n\nNever write proxy passwords into public logs, ticket screenshots or shared documents. Treat credential exposure as a security incident."
		},
		{
			heading: "Two easily overlooked boundaries",
			body: "- \"Configured successfully\" does not mean \"no leaks\". SOCKS5 only constrains traffic inside the tunnel; WebRTC and some background application requests may not follow proxy settings, and the two must be verified separately.\n- Pin your node for long-term use. Frequently switching proxy regions changes your login location repeatedly, which is itself an anomaly signal and can trigger platform risk controls.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Prices, plans and features change; confirm current information on each vendor's official site."
		}
	],
	"browser-fingerprint-signals": [
		{
			heading: "The six signal categories",
			body: "Browser fingerprinting can be understood along six dimensions:\n- Rendering: differences in Canvas, WebGL and AudioContext drawing and computation.\n- Device: hardware concurrency, memory, screen resolution, colour depth.\n- System: operating system, font list, timezone, language and region settings.\n- Language: interface language, accepted-language list, spellcheck and regional formats.\n- Network: exit IP and reputation, WebRTC candidate addresses, DNS resolution path, TLS handshake characteristics.\n- Storage: how cookies, LocalStorage and IndexedDB are isolated from each other."
		},
		{
			heading: "Why combined analysis is what works",
			body: "A single field has limited discriminating power; what identifies is the combination and consistency between fields. One machine's Canvas noise may resemble that of hundreds of thousands of others, but the combination of Canvas noise, font set, timezone and screen parameters repeats far less often.\n\nThis is also why changing one field alone is often ineffective: risk systems judge the whole profile, not one value."
		},
		{
			heading: "Using signals for consistency checks",
			body: "When managing multi-account environments, use these six signal categories for routine verification: after creating an environment, observe with public detection tools whether each category falls in the expected range and record a baseline.\n\nOn later re-tests, compare against that baseline — a signal jump may mean the configuration was reset or the proxy is misbehaving. Repeated tests of the same environment should be stable and should not vary randomly."
		},
		{
			heading: "Two common misconceptions",
			body: "- Believing that fixing one \"key field\" makes everything fresh. Signals work as a combination, and single-point changes are exposed by the other fields.\n- Believing more signals means more danger. Risk does not come from the number of signals but from whether they agree with each other and stay stable over time.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Follow the target platform's terms and applicable local law."
		}
	],
	"browser-profile-permissions": [
		{
			heading: "Assign the least privilege each role needs",
			body: "When a team uses a multi-account browser, permissions should follow least privilege: each member receives only the environments and operations their work requires, not blanket admin rights.\n\nCommon permission dimensions include viewing environments, editing environments, proxy management, extension installation, export and deletion. Restricting high-risk operations — export, deletion, proxy changes — to a few people significantly reduces the blast radius of mistakes and credential exposure."
		},
		{
			heading: "Draw clear sharing boundaries",
			body: "Avoid sharing master account credentials; use member sub-accounts or a team workspace instead. A shared master account makes every action unattributable, so when something goes wrong there is nobody to hold responsible.\n\nDraw boundaries between environments too: which environments belong to which member or project, who may borrow one temporarily, and for how long. Unclear boundaries are a common root cause of disorder in multi-account operations."
		},
		{
			heading: "Keep a change record",
			body: "Record every change to proxies, extensions and environment configuration: who, at what time, which environment, which field. The records do not need to be elaborate, but they must be quickly retrievable when linkage or anomalies appear.\n\nTreat credential exposure as a security incident: rotate immediately and audit the affected environments. Change records are the only reliable lead for locating causes."
		},
		{
			heading: "Two common misconceptions",
			body: "- Believing that trusting team members removes the need for permission tiers. Tiering exists to limit the blast radius of mistakes and account exposure; it is unrelated to trust.\n- Believing a one-time configuration needs no review. Proxy failures, extension updates and membership changes all alter the risk surface, so permissions and sharing boundaries should be reviewed periodically.\n\nThis article is for resource curation, privacy research and compliant browser environment management. Follow the target platform's terms and applicable local law."
		}
	]
};

/**
 * Returns the body sections for a guide in the requested locale.
 *
 * zh-cn returns undefined so the caller uses the native `GuideResource.sections`.
 * Old untranslated locale URLs keep an explicitly labelled English fallback.
 * They are excluded from indexing and hreflang until a real translation exists.
 */
export function localizedGuideSections(locale: Locale, slug: string): GuideSection[] | undefined {
	const editorial = editorialGuideTranslations[slug];
	if (editorial) return editorial[locale === "zh-cn" ? "zh-cn" : "en"].sections;
	if (locale === "zh-cn") return undefined;
	return sectionTranslations[slug];
}
import { editorialGuideTranslations } from "./editorial-guides";
