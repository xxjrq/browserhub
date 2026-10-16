/**
 * Display translations of the existing catalogue, not a fresh product audit.
 * The source pricingCheckedAt (currently 2026-08-12) and every capability flag
 * survive unchanged. English is an explicit content fallback for non-zh locales;
 * this helper does not claim that those pages have been fully translated.
 */
export type BrowserEditorialInput = {
	slug: string;
	name: string;
	description: string;
	longDescription: string;
	free: string;
	price: string;
	profiles: string;
	features: string[];
	pros: string[];
	cons: string[];
	storage?: string;
	engine?: string;
	bestFor?: string[];
};

const englishFields: Record<string, string> = {
	"本地优先的多账号指纹浏览器": "A local-first anti-detect browser for multiple accounts",
	"面向多账号和自动化的云端指纹浏览器": "A cloud-based anti-detect browser for multiple accounts and automation",
	"面向电商运营和自动化流程的指纹浏览器": "An anti-detect browser for e-commerce operations and automation workflows",
	"面向团队和企业流程的指纹浏览器": "An anti-detect browser for team and enterprise workflows",
	"EasyBR 是基于 Chromium 的指纹浏览器，用于管理相互隔离的浏览器环境。配置和资料优先保存在本地，支持 HTTP、HTTPS 与 SOCKS5 代理。": "EasyBR is a Chromium-based anti-detect browser for managing isolated browser profiles. Configuration and profile data are stored locally first, with support for HTTP, HTTPS and SOCKS5 proxies.",
	"以官网当前套餐为准": "Verify the current plan with the vendor",
	"以官网为准": "Verify with vendor",
	"官网动态报价": "See the vendor's current pricing",
	"未公开": "Not published; verify with vendor",
	"有限": "Limited; verify the current allowance with the vendor",
	"试用": "Trial",
	"试用/付费": "Trial or paid plan",
	"免费": "Free",
	"开源": "Open source",
	"5个": "5 profiles",
	"3个": "3 profiles",
	"2个": "2 profiles",
	"5 个环境终身免费": "5 profiles free for life",
	"3 个浏览器档案": "3 browser profiles",
	"2 个档案永久免费": "2 profiles free for life",
	"5 个档案免费": "5 free profiles",
	"前 2 个月 10 个档案，之后 3 个": "10 profiles for the first 2 months, then 3",
	"10 个档案永久免费": "10 profiles free for life",
	"试用/促销额度以官网为准": "Verify trial and promotional allowances with the vendor",
	"免费计划；100 个云端档案": "Free plan; 100 cloud profiles",
	"5–45 个云端档案免费": "5–45 free cloud profiles",
	"免费版 $0/月": "Free plan at $0/month",
	"免费计划": "Free plan",
	"7 天免费试用": "7-day free trial",
	"$0/月免费计划": "Free plan at $0/month",
	"免费版": "Free version",
	"7 天完整试用": "7-day full trial",
	"开源免费": "Free and open source",
	"$0/月；每月含 10 小时": "$0/month; includes 10 hours per month",
	"3 个档案免费试用": "Free trial with 3 profiles",
	"7 天试用": "7-day trial",
	"免费计划；本地档案永久免费": "Free plan; local profiles free for life",
	"1 个档案免费计划": "Free plan with 1 profile",
	"无限本地档案永久免费": "Unlimited local profiles free for life",
	"$3+/月起": "From $3+/month",
	"$24+/月起": "From $24+/month",
	"$5.4+/月起": "From $5.40+/month",
	"$9/月起（Professional；当前促销 $4.50/月）": "From $9/month (Professional; listed promotion: $4.50/month)",
	"$9/月起（Professional；年付折算 $7.20/月）": "From $9/month (Professional; $7.20/month equivalent when billed annually)",
	"$7.08/月起（年付）": "From $7.08/month, billed annually",
	"$10/月起": "From $10/month",
	"$5.40/月起": "From $5.40/month",
	"$19.99/月起（半年计费）": "From $19.99/month, billed every 6 months",
	"$10/月起（50 个档案）": "From $10/month for 50 profiles",
	"$51.93/月起（约 €45）": "From $51.93/month (approximately €45 as listed)",
	"$34/月起": "From $34/month",
	"$2.81/月起（约 ¥19）": "From $2.81/month (approximately ¥19 as listed)",
	"按档案启动/代理用量计费；代理 $0.30/GB 起": "Usage-based billing for profile launches and proxies; proxy traffic from $0.30/GB",
	"$5/月起（年付价）": "From $5/month, billed annually",
	"$8/月起（年付折算 $4.80/月）": "From $8/month ($4.80/month equivalent when billed annually)",
	"$21/月起（年付）": "From $21/month, billed annually",
	"$24/月起": "From $24/month",
	"$0（开源）": "$0 (open source)",
	"$0（免费）": "$0 (free)",
	"$125 起（终身授权）": "From $125 for a lifetime license",
	"$80/年（高级版）": "$80/year for the premium version",
	"$19/月起": "From $19/month",
	"$4.80/月起": "From $4.80/month",
	"$9/月起": "From $9/month",
	"$0（MIT 开源）": "$0 (MIT-licensed open source)",
	"$29/月起（Solo）": "From $29/month (Solo)",
	"免费计划；付费价格以官网为准": "Free plan; verify paid pricing with the vendor",
	"$0（永久免费）": "$0 (free for life)",
	"免费试用，详见官网价格页": "Free trial; see the vendor's pricing page",
	"本地优先存储": "Local-first storage",
	"HTTP/HTTPS/SOCKS5 代理": "HTTP/HTTPS/SOCKS5 proxies",
	"多环境隔离": "Isolated browser profiles",
	"自动化与 API 支持": "Automation and API support",
	"浏览器环境管理": "Browser profile management",
	"多账号工作流": "Multi-account workflows",
	"代理配置": "Proxy configuration",
	"本地优先": "Local first",
	"有免费额度": "Free allowance available",
	"支持 Windows 和 macOS": "Windows and macOS support",
	"有公开产品资料": "Public product information available",
	"平台数量有限": "Limited platform coverage",
	"套餐和价格以官网当前信息为准": "Verify current plans and prices with the vendor",
	"功能和套餐可能变化": "Features and plans may change"
};

function englishField(value: string, browser: BrowserEditorialInput): string {
	const known = englishFields[value];
	if (known) return known;
	if (value === `${browser.name} 的浏览器环境与多账号资源整理`) return `Browser profile and multi-account resources for ${browser.name}`;
	if (value === `${browser.name} 的公开资源信息，包括状态、平台、浏览器内核和适用场景。使用前请以官方页面为准。`) {
		return `Public information about ${browser.name}, including its status, platforms, browser engine and use cases. Verify current details with the vendor before use.`;
	}
	// New, untranslated catalogue fields remain unknown rather than leaking Chinese
	// or guessing a product capability from a name, plan price or empty field.
	return /\p{Script=Han}/u.test(value) ? "Verify with vendor" : value;
}

export function browserDisplay<T extends BrowserEditorialInput>(browser: T, locale: string): T {
	if (locale.toLowerCase() === "zh-cn") return { ...browser };
	const result = {
		...browser,
		description: englishField(browser.description, browser),
		longDescription: englishField(browser.longDescription, browser),
		free: englishField(browser.free, browser),
		price: englishField(browser.price, browser),
		profiles: englishField(browser.profiles, browser),
		features: browser.features.map(value => englishField(value, browser)),
		pros: browser.pros.map(value => englishField(value, browser)),
		cons: browser.cons.map(value => englishField(value, browser))
	};
	if (browser.storage !== undefined) result.storage = englishField(browser.storage, browser);
	if (browser.engine !== undefined) result.engine = englishField(browser.engine, browser);
	if (browser.bestFor !== undefined) result.bestFor = browser.bestFor.map(value => englishField(value, browser));
	return result;
}

export type ComparisonEditorialSource = { label: string; url: string; accessedAt: string };
export type ComparisonEditorialCopy = {
	sections: Array<{ heading: string; body: string }>;
	sources: ComparisonEditorialSource[];
};
export type ComparisonEditorialLocales = { en: ComparisonEditorialCopy; "zh-cn": ComparisonEditorialCopy };

// These dates document a public-document review, not a product benchmark,
// updated price verification, or an endorsement of vendor performance claims.
const reviewedAt = "2026-10-16";
const source = (label: string, url: string): ComparisonEditorialSource => ({ label, url, accessedAt: reviewedAt });
const easybrProduct = source("EasyBR: desktop product and plan information", "https://www.ebrower.com/");
const easybrApi = source("EasyBR: Local API and CDP integration guide", "https://www.ebrower.com/helperdoc/apidoc.html");
const adsRpa = source("AdsPower: RPA and RPA Plus", "https://www.adspower.com/rpa");
const adsApi = source("AdsPower: Local API, keys and member permissions", "https://www.adspower.com/local-api");
const goFeatures = source("GoLogin: sharing, permissions and import/export", "https://gologin.com/features/");
const goCloud = source("GoLogin: Cloud Browser and remote CDP sessions", "https://gologin.com/cloud-browser/");
const goApi = source("GoLogin: API quickstart", "https://gologin.com/docs/api-reference/introduction/quickstart");
const multiBrowser = source("Multilogin: browser profiles and team workspace", "https://multilogin.com/multiple-accounting/multi-account-browser/");
const multiProduct = source("Multilogin: cloud phones and proxy product overview", "https://multilogin.com/");

export const comparisonEditorial: Record<string, ComparisonEditorialLocales> = {
	"adspower-vs-gologin": {
		en: {
			sections: [
				{ heading: "Choose the execution model before the subscription", body: "AdsPower documents a built-in RPA task builder, reusable tasks in RPA Plus and a Local API. GoLogin documents profile sharing and a separate Cloud Browser that can run remotely through Playwright or Puppeteer. For an operator maintaining repeatable browser tasks, inspect AdsPower's task logs and editing flow. For a developer who needs remote execution, inspect GoLogin's cloud connection and persistence model. These are different workflow choices; neither proves better detection resistance.\n\nCheck which product and plan each feature belongs to. A desktop profile subscription should not be assumed to include unlimited cloud sessions or every automation feature." },
				{ heading: "Run a handoff and failure-recovery trial", body: "Use an account and test site you own. In AdsPower, create a short task, deliberately interrupt it, then inspect the task log and resume procedure. In GoLogin, share one test profile with a restricted teammate, reopen it from a second authorized device, then revoke access. If evaluating Cloud Browser, repeat a harmless authenticated task across two sessions and inspect which state survives. Record the client version, proxy, permission level and result rather than calling a successful login an anti-detection benchmark." },
				{ heading: "Check the permissions behind the API checkbox", body: "AdsPower's API documentation says team members may need Local API permission and that resetting a key invalidates previous keys. GoLogin exposes permissions at profile, folder and workspace levels. Ask how your intended plan handles member access, export, key rotation and session sharing. Compare a written quote for your actual seats, profiles, automation runs and proxy usage; the historical catalogue prices below are not a quote verified today." }
			],
			sources: [adsRpa, adsApi, goFeatures, goCloud]
		},
		"zh-cn": {
			sections: [
				{ heading: "先选择执行方式，再比较订阅", body: "AdsPower 官方资料列出内置 RPA、RPA Plus 可复用任务和 Local API；GoLogin 官方资料列出档案共享，以及可由 Playwright 或 Puppeteer 远程连接的独立 Cloud Browser 产品。需要维护重复浏览器任务的运营人员，应重点检查 AdsPower 的任务日志和流程编辑；需要远端执行的开发者，应检查 GoLogin 的云端连接与状态持久化。两者是工作方式的差别，不能证明谁更难被检测。\n\n还要确认功能属于哪个产品和套餐，不能把桌面档案订阅理解为无限云端会话或全部自动化功能。" },
				{ heading: "用交接与失败恢复完成一次试用", body: "使用自己拥有的测试网站和账号。在 AdsPower 建立一个短任务，故意中断后检查日志与恢复步骤；在 GoLogin 把测试档案分配给受限成员，在第二台已授权设备重新打开，然后撤销权限。若评估 Cloud Browser，再跨两个会话执行同一个无害的登录测试，记录哪些状态得以保留。记录客户端版本、代理、成员权限和结果；登录成功不能称为反检测性能测试。" },
				{ heading: "不要只看“支持 API”", body: "AdsPower 官方 API 说明指出，成员可能需要单独开启 Local API 权限，重置密钥后旧密钥会失效；GoLogin 可在档案、文件夹和工作区设置访问权限。采购时应逐项询问导出、密钥轮换、成员权限和会话共享边界，并按实际席位、环境数、自动化任务与代理用量获取报价。下方目录中的历史价格不代表今天重新核验的报价。" }
			],
			sources: [adsRpa, adsApi, goFeatures, goCloud]
		}
	},
	"gologin-vs-multilogin": {
		en: {
			sections: [
				{ heading: "Separate desktop-browser work from native mobile apps", body: "GoLogin's Cloud Browser documentation describes persistent remote browser sessions for CDP clients. Multilogin's current product pages combine desktop browser profiles with Android cloud phones and built-in proxies. A web QA task and a native Android-app task require different environments. If your work is entirely in websites, evaluate the browser workflow directly; if an authorized test requires an Android application, inspect the cloud-phone product rather than assuming a mobile browser fingerprint can run the app." },
				{ heading: "Test the state and access you need to preserve", body: "For browser work, use a test account, save a session, close it cleanly and reopen it through the documented launch route. Verify cookies and application state, then give a teammate restricted access and revoke it. For a mobile requirement, separately test app installation, data retention and handoff on the offered cloud device. Treat browser profiles, cloud-phone minutes, proxy traffic and member permissions as separate purchasing questions. A headline count of profiles does not answer all four." },
				{ heading: "Read current product documentation alongside older catalogue fields", body: "Multilogin's reviewed browser page currently describes a Chromium-based browser; it does not establish that every older engine option in a third-party catalogue remains available. GoLogin's API quickstart and Cloud Browser page describe different integration entry points, so verify which one your script and plan use. We have reviewed public documentation, not measured launch speed, leak resistance or account outcomes. Ask each vendor to confirm the exact engine, supported operating system and recovery/export options before committing." }
			],
			sources: [goCloud, goApi, goFeatures, multiBrowser, multiProduct]
		},
		"zh-cn": {
			sections: [
				{ heading: "把桌面网页与原生手机应用需求分开", body: "GoLogin 的 Cloud Browser 文档描述可通过 CDP 连接的持久化远程浏览器会话；Multilogin 当前产品页把桌面浏览器档案、Android 云手机与内置代理组合展示。网页 QA 和原生 Android 应用测试需要不同环境。只操作网站时，应直接评估浏览器流程；确需在授权测试中运行 Android 应用时，应检查云手机产品，不能把“手机指纹”理解为能够运行原生应用。" },
				{ heading: "实际验证状态保存和权限交接", body: "网页场景使用测试账号保存会话，正常关闭后再通过官方启动流程打开，检查 Cookie 与应用状态，然后给成员受限权限并撤销。移动应用场景则另测安装、数据保留和云设备交接。采购时把浏览器档案、云手机分钟数、代理流量和成员权限分开询问，一个环境数上限并不能覆盖这四类约束。" },
				{ heading: "用当前文档核对历史目录", body: "本轮查看的 Multilogin 浏览器页面描述的是 Chromium 浏览器，不能据此证明第三方旧目录中的所有内核选项仍可使用。GoLogin API quickstart 与 Cloud Browser 页面也对应不同接入入口，应确认脚本和套餐实际使用哪一种。本页属于公开资料研究，没有测量启动速度、泄漏抵抗或账号结果；付费前请厂商确认具体内核、系统支持以及恢复和导出能力。" }
			],
			sources: [goCloud, goApi, goFeatures, multiBrowser, multiProduct]
		}
	},
	"adspower-vs-multilogin": {
		en: {
			sections: [
				{ heading: "Compare a browser-task workflow with a broader device bundle", body: "AdsPower's RPA documentation focuses on creating, repeating and inspecting browser tasks. Multilogin's current overview prominently offers Android cloud phones alongside browser profiles and proxies. Start with the application you actually need: repetitive website work may make an RPA editor relevant, while a native Android-app requirement calls for a cloud-device evaluation. Do not score an unused mobile bundle as an automatic advantage for a desktop-only team." },
				{ heading: "Give both candidates the same acceptance task", body: "On a site you control, use one test account to open a profile, preserve a session and hand it to an authorized teammate. In AdsPower, additionally check the RPA task history after an intentional failure. In Multilogin, check the browser-profile path separately from a cloud-phone session, and request the relevant device and usage limits. Record successful steps and blocked steps instead of inferring capabilities from an API badge or a marketing slogan." },
				{ heading: "Resolve entitlement and migration questions before rollout", body: "Ask AdsPower to confirm RPA/RPA Plus entitlements, member API permission and the supported transfer path for your source product. Ask Multilogin which browser, proxy and cloud-phone allowances are in the proposed plan and how exports and member removal work. Keep a restorable test copy and validate your own data before any migration. Neither vendor's public material supplies a universal pass rate or a guarantee against account restrictions; this comparison makes no such claim." }
			],
			sources: [adsRpa, adsApi, multiBrowser, multiProduct]
		},
		"zh-cn": {
			sections: [
				{ heading: "浏览器任务流程与设备组合，应按需求比较", body: "AdsPower 的 RPA 文档侧重浏览器任务的创建、重复执行和记录检查；Multilogin 当前产品总览突出云手机，并同时提供浏览器档案和代理。应从实际应用出发：重复网页任务可能更需要流程编辑器，原生 Android 应用则需要云设备评估。对仅操作桌面网页的团队，未使用的手机功能不应自动算作优势。" },
				{ heading: "给两家同一个验收任务", body: "在自己控制的网站中，用测试账号完成打开档案、保留会话、交给已授权成员的流程。AdsPower 额外检查一次故意失败后的 RPA 任务记录；Multilogin 把浏览器档案与云手机分开测试，并获取对应设备和用量限制。记录成功和受阻的具体步骤，不从一个 API 标记或宣传语推断完整能力。" },
				{ heading: "推广到团队前先解决额度与迁移", body: "请 AdsPower 确认 RPA/RPA Plus 权益、成员 API 权限和来源产品的迁移路径；请 Multilogin 明确所报套餐的浏览器、代理与云手机用量，并演示导出和移除成员。迁移前保留可恢复的测试副本并核对自己的数据。两家公开资料都不能给出适用于所有站点的通过率，也不能保证账号不受限制，本页不作这类承诺。" }
			],
			sources: [adsRpa, adsApi, multiBrowser, multiProduct]
		}
	},
	"easybr-vs-adspower": {
		en: {
			sections: [
				{ heading: "Choose between a local integration and an RPA workflow", body: "EasyBR's published API guide describes a logged-in desktop client exposing a local service and CDP connection details. AdsPower documents an RPA editor as well as a Local API. If you already maintain a test script, validate the browser-launch and reconnect sequence in both products. If an operator needs to build repeatable tasks inside the browser manager, evaluate AdsPower's RPA interface rather than assuming that an API flag provides the same workflow." },
				{ heading: "Check storage and member access instead of assuming offline operation", body: "EasyBR's guide describes optional cloud synchronization and account-plan limits; local-first storage does not mean the client never communicates with a server. AdsPower's API page describes member permissions and key management. During a trial, use test data, verify where a profile is saved, transfer it only through a supported route, and remove a teammate's access. Ask both vendors what remains available after sign-out, expiry or a device failure." },
				{ heading: "Keep the comparison and commercial relationship explicit", body: "EasyBR is a related product of BrowserHub. This is a comparison of public documentation, not an independent hands-on ranking. The useful decision is whether each candidate completes your required proxy, session, export and team tasks at the quoted cost. The catalogue's historical price date is retained; current quotes and feature entitlements must be confirmed with each vendor." }
			],
			sources: [easybrApi, easybrProduct, adsRpa, adsApi]
		},
		"zh-cn": {
			sections: [
				{ heading: "本机接口与内置任务流程，按执行人员选择", body: "EasyBR 的官方 API 指南描述已登录桌面客户端提供本机服务及 CDP 连接信息；AdsPower 同时提供 RPA 编辑器与 Local API。已经维护测试脚本的团队，应在两家分别验证启动和重新连接流程；需要运营人员直接编排重复任务时，则应检查 AdsPower RPA 的实际界面，不能把“支持 API”当成完全相同的工作方式。" },
				{ heading: "验证存储与权限，不把本地优先当离线保证", body: "EasyBR 指南写明可选云同步及账号套餐限制，本地优先并不代表客户端完全不访问服务器；AdsPower API 页面说明了成员权限和密钥管理。试用时只用测试资料，确认档案保存位置，通过支持的路径迁移后检查，再移除一名测试成员的权限。分别向厂商确认退出登录、套餐到期或设备故障时的恢复边界。" },
				{ heading: "公开关联关系，再按验收任务选型", body: "EasyBR 是 BrowserHub 的关联产品。本页比较公开资料，不是独立实测排名。真正应比较的是两家能否以所报费用完成你的代理、会话、导出和团队任务。目录保留原有价格记录日期，当前报价和功能权益仍须向对应厂商确认。" }
			],
			sources: [easybrApi, easybrProduct, adsRpa, adsApi]
		}
	},
	"easybr-vs-gologin": {
		en: {
			sections: [
				{ heading: "Decide where the browser should run", body: "EasyBR's API documentation describes controlling a local desktop client. GoLogin separately documents remote execution through its Cloud Browser product. Local automation is relevant when you want a script attached to a managed desktop environment; remote execution is relevant when the browser must run away from that workstation. This distinction does not mean GoLogin has no desktop client or EasyBR has no synchronization features. Confirm the exact product being quoted." },
				{ heading: "Trial a restart, an export and a team handoff", body: "Create a harmless authenticated session on your own test site. In EasyBR, close the environment, relaunch it through the documented Local API, and inspect the returned CDP endpoint and retained state. In GoLogin, test the intended desktop or cloud launch route and assign a restricted profile to a teammate. Revoke access and verify export and recovery behavior. Count the manual recovery steps your team would need if its usual workstation were unavailable." },
				{ heading: "Validate the data boundary and disclose the relationship", body: "EasyBR is a BrowserHub-related product. Its public guide includes an optional cloud-sync setting, so local-first should not be interpreted as a promise that every item stays off vendor servers. GoLogin documents sharing at profile, folder and workspace levels. Ask both vendors for the storage, backup and access rules that apply to your plan. We have not benchmarked privacy outcomes or independently verified every catalogue allowance today." }
			],
			sources: [easybrApi, easybrProduct, goCloud, goFeatures, goApi]
		},
		"zh-cn": {
			sections: [
				{ heading: "先决定浏览器应在哪里运行", body: "EasyBR API 文档描述控制本机桌面客户端；GoLogin 另有描述远程执行的 Cloud Browser 产品。希望脚本连接到受管理的桌面环境，可评估本机自动化；需要浏览器离开办公电脑运行，则应评估远端执行。这不表示 GoLogin 没有桌面端，也不表示 EasyBR 没有同步功能，采购时必须明确报价对应的具体产品。" },
				{ heading: "用重启、导出和交接完成试用", body: "在自己的测试网站建立一个无害的已登录会话。EasyBR 正常关闭环境后，通过官方 Local API 重启，检查返回的 CDP 地址和保留状态；GoLogin 则测试准备使用的桌面或云端启动路径，并给成员受限的档案访问权限。撤权后核对导出与恢复行为，记录常用电脑不可用时需要多少人工步骤。" },
				{ heading: "核对资料边界并公开关联关系", body: "EasyBR 是 BrowserHub 的关联产品。其公开指南包含可选云同步设置，所以本地优先不能解读为所有资料永远不经过服务器。GoLogin 文档列出档案、文件夹和工作区共享。两家都应按实际套餐确认存储、备份和访问规则。本页没有测量隐私效果，也没有声称今天逐条核验了目录中的全部额度。" }
			],
			sources: [easybrApi, easybrProduct, goCloud, goFeatures, goApi]
		}
	},
	"easybr-vs-multilogin": {
		en: {
			sections: [
				{ heading: "Desktop browser profiles and Android cloud phones solve different tasks", body: "EasyBR's public product page focuses on Windows/macOS browser environments and describes mobile directions as custom development. Multilogin's current product overview offers Android cloud phones alongside browser profiles. If the task requires a native Android app, a desktop profile with a mobile user agent is not equivalent. If your task is entirely web-based, compare the desktop workflow without paying for device features you will not use." },
				{ heading: "Match the proposed plan to a recoverable pilot", body: "Use a test account and list required browser profiles, teammates, proxy traffic and any cloud-phone time separately. Run a login, close/reopen the environment, check retained state, hand it to an authorized teammate and revoke access. For EasyBR automation, validate the logged-in desktop client's Local API route. For a Multilogin mobile requirement, test a cloud device separately. Request written clarification of export, backups and what happens after a plan expires." },
				{ heading: "Treat the evidence and relationship as part of the decision", body: "BrowserHub has a relationship with EasyBR. This page uses public product and API documents; it is not a measured safety or performance ranking. Multilogin's current browser page describes Chromium, while older catalogue labels may cover a different product generation. Confirm the exact offered engine and device before purchase, and compare current vendor quotes rather than treating historical catalogue prices as newly checked." }
			],
			sources: [easybrProduct, easybrApi, multiBrowser, multiProduct]
		},
		"zh-cn": {
			sections: [
				{ heading: "桌面浏览器档案与 Android 云手机处理不同任务", body: "EasyBR 公开产品页以 Windows/macOS 浏览器环境为标准产品，并把移动端方向描述为定制开发；Multilogin 当前产品总览提供 Android 云手机，同时提供浏览器档案。需要运行原生 Android 应用时，带手机 User-Agent 的桌面档案并不等价。只操作网站则应直接比较桌面流程，不必把不会使用的设备功能纳入采购理由。" },
				{ heading: "让报价对应一次可恢复的试点", body: "使用测试账号，分别列出需要的浏览器环境、成员、代理流量和云手机时间。完成登录、正常关闭重开、状态检查、授权交接和撤权。EasyBR 自动化应验证已登录桌面客户端的 Local API 路径；Multilogin 移动需求则单独测试云设备。要求两家说明导出、备份和套餐到期后的处理方式，避免直接迁移正式账号。" },
				{ heading: "把证据等级和关联关系放进决策", body: "BrowserHub 与 EasyBR 存在关联。本页依据公开产品与 API 文档，不是安全性或性能实测排名。Multilogin 当前浏览器页描述 Chromium，旧目录中的标签可能对应其他产品代际。购买前核实实际提供的内核和设备，并比较当前正式报价，不能把历史目录价格理解为本轮重新核验。" }
			],
			sources: [easybrProduct, easybrApi, multiBrowser, multiProduct]
		}
	}
};
