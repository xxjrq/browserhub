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
	const localized = translations[slug]?.[locale];
	if (localized) return localized;
	if (locale === "zh-cn") return fallback;
	const english = translations[slug]?.en;
	if (locale === "en" && english) return english;
	// zh-cn is the only fully translated source today. Rather than leak Chinese into a
	// page declared as ja/ko/es/pt/ru, reuse the English copy instead: it keeps the
	// language promise of the hreflang group and avoids mixed-script titles.
	return english ?? fallback;
}