/**
 * The analytics disclosure shown on the privacy page.
 *
 * The heading is localised in all seven locales. The paragraph stays in zh-cn
 * and en — the other locales render the English text and mark it `lang="en"`,
 * which is the same fallback the rest of the site uses.
 */

import type { Locale } from "@/lib/locale-ui";

const heading = {
	"zh-cn": "访问统计",
	en: "Traffic measurement",
	ja: "アクセス解析",
	ko: "접속 통계",
	es: "Medición del tráfico",
	pt: "Medição de tráfego",
	ru: "Статистика посещений"
};

const policyLink = {
	"zh-cn": "百度隐私政策",
	en: "Baidu privacy policy",
	ja: "百度のプライバシーポリシー",
	ko: "바이두 개인정보 정책",
	es: "Política de privacidad de Baidu",
	pt: "Política de privacidade do Baidu",
	ru: "Политика конфиденциальности Baidu"
};

export function PrivacyNotice({ locale = "zh-cn" }: { locale?: Locale }) {
	const en = locale !== "zh-cn";
	const text = en
		? "Production pages use the existing Baidu Analytics installation to measure visits and catalogue navigation. Funnel events record the language, public article/product slug and action type. We do not put account credentials, browser profiles, proxy passwords, form contents or URL query strings into these custom events. The hosting server also produces access logs for operations and aggregate referral analysis; these can contain IP addresses and user agents. The analytics provider processes its own technical usage data under its policy. BrowserHub does not require a visitor account."
		: "生产页面使用现有百度统计代码观察访问与目录导航。新增转化事件只记录语言、公开文章或产品标识和操作类型，不向这些自定义事件写入账号密码、浏览器环境、代理密码、表单内容或网址查询参数。托管服务器也会生成用于运维和引荐汇总的访问日志，可能包含 IP 地址和浏览器标识。统计供应商按其政策处理自身的技术使用数据。访问 BrowserHub 无需注册账号。";
	return <section className="mt-8"><h2 className="text-xl font-semibold">{heading[locale] ?? heading.en}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground" lang={en ? "en" : "zh-CN"}>{text}</p><a href="https://privacy.baidu.com/policy" className="mt-3 inline-block text-sm text-primary underline underline-offset-4" lang={en ? "en" : "zh-CN"}>{policyLink[locale] ?? policyLink.en}</a></section>;
}
