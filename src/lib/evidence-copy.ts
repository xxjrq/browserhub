import type { Locale } from "./locale-ui";

/**
 * Product evidence copy, shared by the page and by the knowledge files.
 *
 * This table used to live inside `components/product-evidence.tsx`, which meant
 * the `llms.txt` generator could not reuse it. That mattered: the knowledge
 * file has to print the same "documentation reviewed on <date>" line and the
 * same price-status wording the page prints, otherwise an answer engine can
 * cite a price without the date it was checked — the one thing the editorial
 * rules forbid.
 *
 * The wording is unchanged; only its home moved. `components/product-evidence.tsx`
 * still renders the identical strings, and `scripts/check-product-evidence.mjs`
 * still validates the built HTML against the reviewed records.
 */

export type EvidenceCopy = {
	heading: string;
	reviewed: string;
	priceConfirmed: string;
	priceUnverified: string;
	fieldChecks: string;
	evidence: string;
	fields: Record<string, string>;
	status: { verified: string; contradicted: string; unverified: string };
};

export const evidenceCopy: Record<Locale, EvidenceCopy> = {
	"zh-cn": {
		heading: "官方来源与逐项核查",
		reviewed: "公开资料核查于",
		priceConfirmed: "所列价格已在该日期确认；请核对币种、计费周期与活动条件。",
		priceUnverified: "当前价格未核实；本页不将历史报价作为现价。",
		fieldChecks: "查看字段状态与支持证据",
		evidence: "证据",
		fields: {
			free: "免费额度", price: "价格与计费周期", profiles: "环境数量", platforms: "客户端平台",
			engine: "浏览器内核", storage: "资料位置", api: "API", automation: "自动化",
			proxy: "代理", proxyProtocols: "代理协议"
		},
		status: { verified: "官方资料已确认", contradicted: "旧资料已纠正", unverified: "未核实" }
	},
	en: {
		heading: "Official sources and verification",
		reviewed: "Documentation reviewed",
		priceConfirmed: "Listed price confirmed on that date; check currency, billing period and promotion terms.",
		priceUnverified: "Current price unverified; no live quote is asserted.",
		fieldChecks: "Field checks and supporting evidence",
		evidence: "Evidence",
		fields: {
			free: "Free allowance", price: "Price and billing", profiles: "Profiles", platforms: "Client platforms",
			engine: "Engine", storage: "Storage", api: "API", automation: "Automation",
			proxy: "Proxy", proxyProtocols: "Proxy protocols"
		},
		status: { verified: "Confirmed in official documentation", contradicted: "Previous claim corrected", unverified: "Unverified" }
	},
	ja: {
		heading: "公式情報源と項目ごとの確認",
		reviewed: "公開情報の確認日",
		priceConfirmed: "掲載価格はこの日付に確認されたものです。通貨、請求期間、キャンペーン条件はご確認ください。",
		priceUnverified: "現在の価格は未確認です。過去の掲載額を現在の価格として扱いません。",
		fieldChecks: "項目ごとの状態と根拠を確認する",
		evidence: "根拠",
		fields: {
			free: "無料枠", price: "価格と請求期間", profiles: "プロファイル数", platforms: "対応クライアント",
			engine: "ブラウザエンジン", storage: "保存場所", api: "API", automation: "自動化",
			proxy: "プロキシ", proxyProtocols: "プロキシプロトコル"
		},
		status: { verified: "公式文書で確認済み", contradicted: "旧い記載を修正済み", unverified: "未確認" }
	},
	ko: {
		heading: "공식 출처와 항목별 확인",
		reviewed: "공개 자료 확인일",
		priceConfirmed: "표시된 가격은 해당 날짜에 확인된 것입니다. 통화, 청구 주기, 프로모션 조건을 확인하세요.",
		priceUnverified: "현재 가격은 확인되지 않았습니다. 과거 표시 금액을 현재 가격으로 취급하지 않습니다.",
		fieldChecks: "항목별 상태와 근거 확인",
		evidence: "근거",
		fields: {
			free: "무료 한도", price: "가격과 청구 주기", profiles: "프로필 수", platforms: "지원 클라이언트",
			engine: "브라우저 엔진", storage: "저장 위치", api: "API", automation: "자동화",
			proxy: "프록시", proxyProtocols: "프록시 프로토콜"
		},
		status: { verified: "공식 문서로 확인됨", contradicted: "이전 기재를 정정함", unverified: "미확인" }
	},
	es: {
		heading: "Fuentes oficiales y verificación por campo",
		reviewed: "Documentación revisada el",
		priceConfirmed: "El precio indicado se confirmó en esa fecha; verifica la moneda, el periodo de facturación y las condiciones de la promoción.",
		priceUnverified: "El precio actual no está verificado; no se afirma ninguna tarifa vigente.",
		fieldChecks: "Estado de cada campo y evidencia de apoyo",
		evidence: "Evidencia",
		fields: {
			free: "Plan gratuito", price: "Precio y facturación", profiles: "Perfiles", platforms: "Clientes compatibles",
			engine: "Motor", storage: "Ubicación de los datos", api: "API", automation: "Automatización",
			proxy: "Proxy", proxyProtocols: "Protocolos de proxy"
		},
		status: { verified: "Confirmado en la documentación oficial", contradicted: "Afirmación anterior corregida", unverified: "Sin verificar" }
	},
	pt: {
		heading: "Fontes oficiais e verificação por campo",
		reviewed: "Documentação revisada em",
		priceConfirmed: "O preço indicado foi confirmado nessa data; verifique a moeda, o ciclo de faturamento e as condições da promoção.",
		priceUnverified: "O preço atual não está verificado; nenhuma tarifa vigente é afirmada.",
		fieldChecks: "Estado de cada campo e evidências de apoio",
		evidence: "Evidência",
		fields: {
			free: "Plano gratuito", price: "Preço e faturamento", profiles: "Perfis", platforms: "Clientes compatíveis",
			engine: "Motor", storage: "Localização dos dados", api: "API", automation: "Automação",
			proxy: "Proxy", proxyProtocols: "Protocolos de proxy"
		},
		status: { verified: "Confirmado na documentação oficial", contradicted: "Afirmação anterior corrigida", unverified: "Não verificado" }
	},
	ru: {
		heading: "Официальные источники и проверка по полям",
		reviewed: "Документация проверена",
		priceConfirmed: "Указанная цена подтверждена на эту дату; проверьте валюту, период оплаты и условия акции.",
		priceUnverified: "Текущая цена не подтверждена; актуальный тариф не заявляется.",
		fieldChecks: "Статус каждого поля и подтверждающие материалы",
		evidence: "Подтверждение",
		fields: {
			free: "Бесплатный план", price: "Цена и период оплаты", profiles: "Профили", platforms: "Поддерживаемые клиенты",
			engine: "Движок", storage: "Расположение данных", api: "API", automation: "Автоматизация",
			proxy: "Прокси", proxyProtocols: "Протоколы прокси"
		},
		status: { verified: "Подтверждено официальной документацией", contradicted: "Прежнее утверждение исправлено", unverified: "Не подтверждено" }
	}
};
