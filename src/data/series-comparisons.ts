import type { ComparisonEditorialLocales, ComparisonEditorialSource } from "./browser-editorial";

// Public documentation research, not a hands-on product benchmark. Numerical
// prices and allowances remain in verified-products.ts and the shared table.
const source = (label: string, url: string): ComparisonEditorialSource => ({ label, url, accessedAt: "2026-10-16" });
const adsPricing = source("AdsPower: current plans and feature entitlements", "https://www.adspower.com/pricing");
const adsApi = source("AdsPower: Local API and member permissions", "https://www.adspower.com/local-api");
const adsRpa = source("AdsPower: RPA and RPA Plus", "https://www.adspower.com/rpa");
const adsDownload = source("AdsPower: official downloads", "https://www.adspower.com/download");
const dolphinPricing = source("Dolphin Anty: plans, engines, scenarios and proxy protocols", "https://dolphin-anty.com/tarifs/");
const dolphinApi = source("Dolphin Anty: token authentication and local automation", "https://docs.dolphin-anty.com/en/api/basic-automation-dolphin-anty");
const dolphinDownload = source("Dolphin Anty: official desktop downloads", "https://dolphin-anty.com/download/");
const morePricing = source("MoreLogin: browser plans, Local API and cloud-phone fees", "https://www.morelogin.com/pricing");
const moreDownload = source("MoreLogin: official desktop and server downloads", "https://www.morelogin.com/download");
const goPricing = source("GoLogin: profile, team and API plan entitlements", "https://gologin.com/pricing/");
const goFeatures = source("GoLogin: cloud storage, sharing and profile management", "https://gologin.com/features/");
const goApi = source("GoLogin: automation quickstart", "https://gologin.com/docs/api-reference/introduction/quickstart");
const goCloud = source("GoLogin: remote Cloud Browser sessions", "https://gologin.com/cloud-browser/");
const octoPricing = source("Octo Browser: plan cards and feature matrix", "https://octobrowser.net/pricing/");
const octoApi = source("Octo Browser: API automation and framework connections", "https://octobrowser.net/api-automation/");
const octoDownload = source("Octo Browser: official desktop downloads", "https://octobrowser.org/download/");
const kameleoPricing = source("Kameleo: concurrency, usage minutes, profiles and SDKs", "https://kameleo.io/pricing");
const kameleoDownload = source("Kameleo: desktop and Docker downloads", "https://kameleo.io/downloads");
const kameleoProduct = source("Kameleo: engine, Local API and Playwright launch example", "https://kameleo.io/");

export const seriesComparisonEditorial: Record<string, ComparisonEditorialLocales> = {
	"adspower-vs-dolphin-anty": {
		en: {
			sections: [
				{
					heading: "AdsPower vs Dolphin Anty: compare the task you maintain",
					body: "Both products document visual browser automation and programmatic access. AdsPower describes RPA, reusable RPA Plus tasks and a Local API; Dolphin Anty's current plan matrix lists a scenario builder and its official guide describes local automation. The useful decision is who will maintain your workflow after a page changes. An operator should evaluate editing, error logs and handoff. A developer should evaluate profile launch, connection details, clean shutdown and reconnection.\n\nStart with one authorized task on a site you control. Choose the product that meets your required steps with an understandable recovery path, rather than counting feature names. [AdsPower RPA](https://www.adspower.com/rpa) and [Dolphin's automation guide](https://docs.dolphin-anty.com/en/api/basic-automation-dolphin-anty) describe different entry points; neither establishes a universal success rate."
				},
				{
					heading: "Read current engine and proxy options without guessing",
					body: "The reviewed official pricing pages list Chrome/Firefox engine options for both candidates. Dolphin's matrix also names HTTP, SOCKS5, SOCKS4 and SSH proxy options. Those are current vendor listings, not a reason to infer that every version, operating system and plan exposes an identical configuration. AdsPower's reviewed evidence establishes proxy configuration but leaves individual protocols unverified in this directory. An unverified field does not mean unsupported.\n\nFor the actual desktop and engine you will use, open a test profile and record the version, selected engine, proxy mode and observed exit. Then inspect [User-Agent and Client Hints](/en/guides/user-agent-client-hints-check/) and [WebGL results](/en/guides/webgl-fingerprint-test/) separately. A Firefox label or a green checker score does not demonstrate complete environmental consistency."
				},
				{
					heading: "Check automation permissions before comparing entry prices",
					body: "A free profile allowance does not establish the API, scenario, sharing and seat entitlements of your eventual subscription. AdsPower documents member Local API permission and key reset behavior. Dolphin's guide requires the desktop application to be running for its Local API and describes token authentication before starting a profile. Ask which identity owns each token and whether a teammate can operate only assigned profiles.\n\nUse the individually reviewed prices in the shared comparison table, then obtain a quote for the same stored profiles, staff, billing term and automation requirements. Include proxy usage and migration time. Do not compare an annual monthly equivalent with a monthly invoice or treat an optional promotion as a permanent rate."
				},
				{
					heading: "Use the same failure and handoff acceptance sheet",
					body: "This is a proposed acceptance test, not a report of tests BrowserHub has performed. Use temporary accounts and non-sensitive markers, record pass, fail or inconclusive, and retain the exact client and plan.\n\n| Check | Give both candidates this task | Record |\n| --- | --- | --- |\n| Task maintenance | Change one selector on your test page | Editing steps and useful error context |\n| Interrupted run | Stop a harmless task before completion | Recovery without duplicate submissions |\n| Persistence | Close normally and reopen the same profile | Expected test state remains |\n| Member handoff | Assign, open, revoke, then retry access | Profile and API authorization behavior |\n| Network failure | Make a test proxy unavailable | Observed connection or clear failure |\n| Secret rotation | Replace the test automation credential | Old credential no longer authorizes |\n\nFor a narrower state check, follow the [profile storage isolation procedure](/en/guides/browser-profile-storage-isolation-test/). Do not interpret a preserved login as proof that fingerprints are unique."
				},
				{
					heading: "Choose from measured workflow costs, then stage migration",
					body: "AdsPower belongs on the shortlist when its RPA editing and reuse flow fits the people responsible for maintenance. Dolphin belongs on it when its scenario workflow, documented proxy options and handoff fit your requirements. These are evaluation conditions, not conclusions about either interface's speed or quality. Weight the criteria before trial so a discount does not silently replace a required permission.\n\nMigrate a small disposable sample first. Verify imported state, proxy assignments, engine behavior and member restrictions; keep the source recoverable until the destination passes. Cookie import is not evidence that every IndexedDB database or extension setting moved. Expand only after the [team evaluation checklist](/en/guides/team-browser-evaluation-checklist/) and your own acceptance record agree."
				}
			],
			sources: [adsPricing, adsApi, adsRpa, adsDownload, dolphinPricing, dolphinApi, dolphinDownload]
		},
		"zh-cn": {
			sections: [
				{
					heading: "AdsPower 与 Dolphin Anty：先比较谁来维护任务",
					body: "两家官方都列出可视化任务和程序接入能力。AdsPower 提供 RPA、可复用的 RPA Plus 任务与 Local API；Dolphin Anty 当前套餐矩阵列有场景构建器，官方指南也说明本地自动化流程。真正需要判断的是：测试网站改版后，由运营人员重新编辑流程，还是由开发者维护脚本？前者应检查节点编辑、错误日志与交接，后者应检查启动档案、取得连接参数、正常关闭和重新连接的完整链路。\n\n先在自己控制的网站上选一个已授权的小任务，比较所需步骤和失败后的恢复方式。不要把功能名称的数量当作实施成本。[AdsPower RPA](https://www.adspower.com/rpa) 与 [Dolphin 自动化文档](https://docs.dolphin-anty.com/en/api/basic-automation-dolphin-anty) 可以帮助确定试用入口，但它们不能证明任何平台的普遍通过率。"
				},
				{
					heading: "按当前官方资料核对内核与代理选项",
					body: "本轮阅读的两家官方套餐页都列有 Chrome/Firefox 内核选项；Dolphin 套餐矩阵同时列出 HTTP、SOCKS5、SOCKS4、SSH。这里据实记录当前官网列项，具体客户端版本、操作系统和套餐是否提供相同配置，还要在实际使用环境中确认。本站对 AdsPower 已确认代理配置能力，但尚未逐个确认协议，因此目录中的未核实字段不能解释为不支持。\n\n试用时记录客户端版本、实际选择的内核、代理模式和观测到的出口，再分别检查 [User-Agent 与 Client Hints](/zh-cn/guides/user-agent-client-hints-check/) 以及 [WebGL 报告](/zh-cn/guides/webgl-fingerprint-test/)。仅看到一个 Firefox 标签或绿色检测提示，不能证明全部环境信号一致；也不要为了让结果看起来更漂亮，同时修改多个不相关参数。"
				},
				{
					heading: "先确认自动化权限，再比较入门价格",
					body: "免费环境数量并不能说明 API、场景任务、档案共享和成员席位都免费开放。AdsPower 文档说明成员 Local API 权限与密钥重置行为；Dolphin 文档说明 Local API 依赖正在运行的桌面客户端，并在启动档案前使用令牌认证。应让实际执行人完成一次授权流程，确认令牌属于谁、成员是否只能操作被分配的档案，以及离职撤权后脚本还能不能继续启动环境。\n\n价格以本页共享对比表中逐项核查的数据为入口，另按相同的保存档案数、人员、计费周期和自动化需求取得报价，补上代理用量与迁移时间。年付折算月价与按月账单应分开，临时促销也不应被写成长期费用。对多人团队，入门套餐便宜并不代表满足权限要求后的总成本更低。"
				},
				{
					heading: "用同一张故障与交接表验收",
					body: "下表是建议执行的验收方案，本站没有据此宣称已完成客户端实测。使用临时账号和非敏感标记，记录通过、失败或无法判断，同时保留套餐与版本信息。\n\n| 检查项 | 两家执行同一个任务 | 记录什么 |\n| --- | --- | --- |\n| 页面改版 | 修改测试页一个选择器 | 修复步骤和错误上下文 |\n| 任务中断 | 在无害流程完成前停止 | 能否恢复且不重复提交 |\n| 状态保留 | 正常关闭后重开同一档案 | 测试状态是否仍在 |\n| 成员交接 | 分配、打开、撤权、重试 | 档案与 API 的授权结果 |\n| 网络故障 | 让测试代理暂时不可用 | 明确失败或观测到的连接 |\n| 凭证轮换 | 替换测试自动化凭证 | 旧凭证是否失效 |\n\n如需确认不同环境是否共享网站状态，再执行 [Cookie 与存储隔离测试](/zh-cn/guides/browser-profile-storage-isolation-test/)。登录状态得以保留，只说明这次状态流程的结果，并不等于指纹唯一、所有网站都无法关联或任何账号结果得到保证。"
				},
				{
					heading: "按实际维护成本决策，分批迁移",
					body: "如果 AdsPower 的流程编辑与复用方式适合负责维护的人，就进入下一轮试用；如果 Dolphin 的场景工作流、已列出的代理选项和交接方式符合要求，也应保留候选资格。这里给的是决策条件，没有把界面快慢、使用体验或检测成绩写成未经测量的结论。先给权限、恢复与维护成本分配权重，再看优惠，避免折扣改变了真正的采购标准。\n\n迁移从一小批可丢弃的测试档案开始，核对导入状态、代理分配、内核行为和成员限制，在目标环境验收前保留可恢复的来源。导入 Cookie 不代表 IndexedDB、扩展设置或其他网站状态全部迁移成功。把记录与 [团队浏览器选型清单](/zh-cn/guides/team-browser-evaluation-checklist/) 对照后，再逐批扩大范围；保留每批的回退条件比一次性搬完更容易定位差异。"
				}
			],
			sources: [adsPricing, adsApi, adsRpa, adsDownload, dolphinPricing, dolphinApi, dolphinDownload]
		}
	},
	"adspower-vs-morelogin": {
		en: {
			sections: [
				{
					heading: "AdsPower vs MoreLogin: a workflow decision, not an API badge",
					body: "AdsPower documents visual RPA and a Local API. MoreLogin's current pricing page lists a Local API, Selenium/Puppeteer integration, Chrome/Firefox options and cloud profile synchronization. Calling MoreLogin a purely manual beginner tool would miss those documented capabilities. Conversely, the existence of an API does not tell you how convenient task editing, retries or member handoff will be.\n\nChoose a representative task before comparing brands. If an operator will maintain it without code, examine AdsPower's RPA workflow and ask MoreLogin to demonstrate the equivalent requirement. If a developer owns it, compare profile create/start/connect/close behavior using the actual plan. The [automation persistence guide](/en/guides/browser-automation-profile-persistence/) helps define what your script needs to preserve between runs."
				},
				{
					heading: "Separate desktop profiles, cloud storage and cloud phones",
					body: "MoreLogin's official pricing page separates browser plans from cloud-phone fees. Its desktop download page lists Windows, macOS and Linux; the reviewed AdsPower download page also lists desktop clients and a separate iOS option. Do not turn an operating-system label into a claim that every API, extension or engine is available on every client. Cloud profile storage also does not mean the browser computation is running remotely.\n\nFor website work, evaluate the desktop profile path you will actually launch. For a native mobile-app requirement, request the relevant phone product, operating system, retained data and usage limits separately. A mobile fingerprint in a desktop browser is not proof that an Android application can run there. Give unused products no automatic advantage in a browser-only comparison."
				},
				{
					heading: "Build one profile-and-seat purchasing basket",
					body: "Use the shared table for the current reviewed price and free allowance, then write down the same target profile count, active staff, roles, term and required API access for both vendors. MoreLogin explicitly lists a user allowance in its free offer; that does not establish every paid plan's sharing or API entitlement. AdsPower's API documentation separately discusses member permission and key management.\n\nAsk for the checkout total, renewal basis, cloud-phone usage if needed and extra seats. Keep temporary trial entitlements separate from the eventual plan. A quote can be incomplete even when its headline price is correct. Neither a larger free allowance nor an annual discount answers whether your restricted teammate can complete the authorized workflow."
				},
				{
					heading: "Run a browser-and-team acceptance matrix",
					body: "Use a small test workspace and a site you own. These are proposed checks, not BrowserHub performance measurements. Record plan, client, engine and role before each run.\n\n| Need | Identical check in both candidates | Acceptance evidence |\n| --- | --- | --- |\n| Automation | Start, connect, read a test page, close | Documented endpoint and useful errors |\n| State | Refresh, restart and reconnect | Expected marker and session behavior |\n| Isolation | Write a marker in A and inspect B | No unexpected shared test state |\n| Team access | Share one profile, then revoke | No continued unauthorized access |\n| Proxy handling | Use the intended route, then interrupt it | Exit observation and clear failure |\n| Growth | Request the intended profile/seat basket | Same term and all required rights |\n\nUse the [storage isolation procedure](/en/guides/browser-profile-storage-isolation-test/) and [DNS report guide](/en/guides/dns-leak-test-browser-proxy/) to interpret narrow results. A passing storage check does not validate network routing."
				},
				{
					heading: "Select the plan that passes your required operations",
					body: "Keep AdsPower on your shortlist when its RPA editor and member API controls fit the people maintaining your tasks. Keep MoreLogin on it when its documented browser integration, synchronization and user allowance fit your deployment. Confirm the actual desktop build on each team operating system; a vendor download link is not a benchmark of stability or resource use.\n\nBefore switching, validate a disposable profile export or transfer, retained website state, assigned proxies and access removal. Do not assume a cookie transfer contains every storage database or secret. Record unanswered questions as unresolved rather than awarding either brand an imaginary point. The useful winner is the candidate that passes your required operations at a complete, understandable cost."
				}
			],
			sources: [adsPricing, adsApi, adsRpa, adsDownload, morePricing, moreDownload]
		},
		"zh-cn": {
			sections: [
				{
					heading: "AdsPower 与 MoreLogin：比较完整流程，别只看 API 标记",
					body: "AdsPower 官方资料提供可视化 RPA 和 Local API；MoreLogin 当前价格页也列出 Local API、Selenium/Puppeteer 接入、Chrome/Firefox 选项以及档案云同步。因此，把 MoreLogin 概括成只能手工使用的入门工具，会遗漏已公开的能力。反过来，两个产品都有 API，也不能证明任务编辑、失败重试、成员交接的实际成本相同。\n\n先选择一个有代表性的已授权任务。如果由运营人员维护，重点查看 AdsPower 的 RPA 编辑流程，并要求 MoreLogin 演示对应需求；如果由开发者维护，则用实际套餐验证创建、启动、连接和关闭档案的链路。可先阅读 [浏览器自动化与环境持久化](/zh-cn/guides/browser-automation-profile-persistence/)，把“脚本能够连接”与“关闭后所需状态仍在”分成两个验收目标。"
				},
				{
					heading: "桌面档案、云存储与云手机需要分开采购",
					body: "MoreLogin 官方价格页将浏览器套餐与云手机费用分开；其下载页列有 Windows、macOS 和 Linux。AdsPower 本轮核查的下载页也有桌面客户端及单列的 iOS 选项。操作系统列表只能证明对应下载入口，不能进一步推断每个客户端都有相同 API、扩展和内核能力。“档案存储在云端”也不意味着浏览器运算发生在远程服务器。\n\n只做网页工作的团队，应检查实际要启动的桌面档案流程。确需运行原生手机应用时，另行询问手机产品、系统、数据保留和用量限制。桌面浏览器中的手机指纹不能直接运行 Android 应用，更不能把浏览器档案数与云手机分钟数加在一起比较。未使用的设备产品不应成为桌面选型的自动加分项，避免为无关能力付费。"
				},
				{
					heading: "按相同环境数与成员需求取得完整报价",
					body: "本页共享对比表提供逐项核查的价格与免费额度。继续采购时，应写明相同的目标档案数、实际使用人数、角色、计费周期和 API 需求，再让两家给出完整方案。MoreLogin 免费报价列出了用户额度，但不能据此推断所有付费套餐的共享和 API 权益；AdsPower 的 Local API 文档也单独讨论成员权限和密钥管理，需要让真正的执行成员完成验证。\n\n报价应包含结账总额、续费规则、额外席位，以及确实需要时才加入的云手机用量。试用期间临时开放的功能，与正式订阅后的权限边界要分开记录。即使入门价格本身准确，缺少必需的成员或自动化权益，仍然不是可执行的采购方案。不要用免费档案多、年付折扣大来代替完整的需求匹配。"
				},
				{
					heading: "用浏览器与团队验收矩阵完成试用",
					body: "在小型测试工作区和自己拥有的网站中执行下表，逐次记录套餐、客户端、内核和成员身份。这是建议的检查流程，不是本站已经测出的产品成绩。\n\n| 需求 | 两家使用同一个检查动作 | 验收证据 |\n| --- | --- | --- |\n| 自动化 | 启动、连接、读取测试页、关闭 | 官方接口及可定位的错误 |\n| 状态保留 | 刷新、重启、重新连接 | 标记与测试会话是否符合预期 |\n| 环境隔离 | 在 A 写入标记，在 B 检查 | 没有意外共享测试状态 |\n| 团队权限 | 分享单个档案后撤权 | 不再出现未授权访问 |\n| 代理处理 | 使用目标线路，再中断代理 | 出口观察与明确失败结果 |\n| 扩容采购 | 按目标环境与席位申请方案 | 同周期且包含必需权益 |\n\n需要细查时，按 [存储隔离测试](/zh-cn/guides/browser-profile-storage-isolation-test/) 和 [DNS 检测解读](/zh-cn/guides/dns-leak-test-browser-proxy/) 分别排查。存储通过不代表网络路径也通过，某一检测页正常也不能代表所有业务网站的结果。"
				},
				{
					heading: "以必需操作和长期维护成本决定是否迁移",
					body: "当 RPA 编辑器与成员 API 控制适合维护任务的人时，继续评估 AdsPower；当 MoreLogin 已公开的浏览器接入、同步方式和用户权益符合部署要求时，也应保留候选。两家的实际桌面版本都要在团队使用的操作系统上验证，下载页有安装包不等于已经证明运行稳定或资源占用更低。把操作时长和失败记录留下，比“适合新手”一类泛化描述更能支持决策。\n\n切换前，用可丢弃的测试档案验证导出或转移、网站状态、代理分配和成员撤权，不假设导入 Cookie 就包含所有数据库与敏感配置。未解决的问题应继续标为待确认，而不是靠品牌印象加分。通过必需操作、成本完整且后续维护可接受的方案，才是这个团队当前可用的选择。"
				}
			],
			sources: [adsPricing, adsApi, adsRpa, adsDownload, morePricing, moreDownload]
		}
	},
	"gologin-vs-octo-browser": {
		en: {
			sections: [
				{
					heading: "GoLogin vs Octo Browser: decide where execution happens",
					body: "GoLogin documents cloud-stored profiles, local launches and a separate Cloud Browser execution path. Octo documents desktop applications and API automation. This establishes available documentation, not the absence of every other deployment option. Ask whether your task needs an installed desktop, a remotely running browser or merely a synchronized profile that opens locally. These are different requirements.\n\nFor a remote automation project, inspect GoLogin's Cloud Browser connection and persistence terms explicitly. For a desktop team, compare the actual client on the intended workstation instead. An API-managed profile is not automatically a hosted browser, and a cloud-stored profile does not remove local hardware limits. [GoLogin's feature page](https://gologin.com/features/) and [Octo's API page](https://octobrowser.net/api-automation/) define the starting questions."
				},
				{
					heading: "Compare the API-enabled plan, not just the cheapest plan",
					body: "Both products document automation, but their reviewed plan matrices attach API access to particular tiers. The smallest advertised subscription is therefore not necessarily the price of your scripted workflow. Write down stored profile capacity, permitted members, active sessions, required API and billing period before evaluating the amount.\n\nGoLogin prices in USD and Octo in EUR in the reviewed offers. Keep those currencies visible rather than inventing a fixed conversion. Octo's reviewed pricing page also contains conflicting profile counts between plan cards and its detailed matrix; obtain confirmation of the actual quota. A precise-looking number does not resolve contradictory source material. The shared table retains field-specific checks and pricing dates instead of replacing them with a blanket current-data claim."
				},
				{
					heading: "Make profile handoff and recovery a separate decision",
					body: "Use an authorized test account to establish state, close the profile normally and reopen it through the documented route. Then hand it to a restricted teammate and revoke access. GoLogin's features page documents sharing and permissions; Octo's plan matrix lists team entitlements. Ask what happens to an already-open session and existing automation credentials when access is removed.\n\nDo not run two writers against an important profile simply to test sharing. Use a disposable copy, define the expected single-owner process and inspect any conflict or recovery behavior. Cookie transfer is only one part of migration: verify your own application's storage and required extensions independently. Follow the [team permissions guide](/en/guides/browser-profile-permissions/) when recording role boundaries."
				},
				{
					heading: "Use the same runtime and environment evidence sheet",
					body: "The following plan separates integration, state and network checks. It is not a checker-score contest or a product benchmark performed by BrowserHub. Record unavailable observations as inconclusive.\n\n| Question | Same task in both products | Useful evidence |\n| --- | --- | --- |\n| Launch route | Start through intended desktop or API path | Version, plan and connection method |\n| Persistence | Save a test marker, close, reopen | Expected marker remains |\n| Isolation | Inspect that marker in a fresh profile | No unexpected shared state |\n| Team scope | Assign one profile, revoke and retry | Documented and observed restrictions |\n| Network route | Check exit and triggered DNS results | Expected path or explained uncertainty |\n| Cost | Quote the complete required workflow | Currency, period, seats and API rights |\n\nUse [DNS interpretation](/en/guides/dns-leak-test-browser-proxy/) and [BrowserLeaks vs CreepJS](/en/guides/browserleaks-vs-creepjs/) to keep the tests' purposes distinct. A detector's label does not establish account outcomes."
				},
				{
					heading: "Confirm mobile offers and migration terms independently",
					body: "A mobile app promotion, a mobile browser fingerprint and a native application environment describe different things. Do not treat a mobile signup offer as a permanent desktop free plan, or assume its profile allowance applies to an existing account. Request the exact eligibility, duration, client and renewal terms if such an offer affects your choice.\n\nGoLogin is worth evaluating when its documented local/cloud execution choices meet your task; Octo is worth evaluating when its documented desktop/API and team plan meet it. Select from your acceptance results, complete quote and recovery procedure. Stage a small migration, retain a recoverable source and confirm state before expanding. No published comparison can substitute for the target workflow's actual entitlement and compatibility."
				}
			],
			sources: [goPricing, goFeatures, goApi, goCloud, octoPricing, octoApi, octoDownload]
		},
		"zh-cn": {
			sections: [
				{
					heading: "GoLogin 与 Octo Browser：先确定浏览器在哪里运行",
					body: "GoLogin 官方资料描述云端保存档案、本地启动，以及单独的 Cloud Browser 执行路径；Octo 有桌面客户端下载和 API 自动化文档。这里确认的是已公开的接入方式，不能据此推断未提到的部署方式一定不存在。采购前应说清楚：需要安装在工作站上的浏览器、真正运行在远程的浏览器，还是只需要同步档案、仍在本机打开？三种需求不能混用同一个“云端”标签。\n\n远程自动化项目应具体检查 GoLogin Cloud Browser 的连接和持久化条款；桌面团队则应比较目标工作站上的实际客户端。API 管理档案不自动等于托管运行，云存储也不能消除本地硬件限制。可以从 [GoLogin 功能页](https://gologin.com/features/) 与 [Octo API 页](https://octobrowser.net/api-automation/) 建立试用问题，而不是直接从品牌宣传判断部署成本。"
				},
				{
					heading: "比较能完成自动化的套餐，而非最低标价",
					body: "两家都有自动化文档，但本轮查看的套餐表将 API 权益放在指定层级。因此，最小订阅价格不一定就是脚本工作流的完整价格。应先写明保存档案数、成员、同时运行需求、API 和计费周期，再比较金额；已保存很多档案，也不意味着机器可以同时打开同样多的浏览器。\n\n已核查报价中，GoLogin 使用美元，Octo 使用欧元，应保留原币种和付款周期，不编造一个长期固定的换算价。Octo 价格页的套餐卡片与详细矩阵还出现了档案额度冲突，需要让厂商确认实际限额，不能挑一个看起来有利的数字作为结论。本页共享表保留字段核查状态与价格日期；精确到小数的金额，也无法弥补套餐权益和容量仍不确定的问题。"
				},
				{
					heading: "将档案交接与恢复能力单独验收",
					body: "使用已授权的测试账号建立状态，正常关闭档案后通过官方路径重开，再把一个档案交给受限成员并撤销权限。GoLogin 功能页描述共享和权限，Octo 套餐矩阵也列有团队权益。应进一步确认撤权后已经打开的会话如何处理、旧自动化凭证是否仍有效，而不是仅检查成员列表里是否删除了一个名字。\n\n不要为了测试共享而让两个操作人同时写入重要档案。使用可丢弃副本，先规定单一负责人和交接顺序，再检查冲突提示与恢复行为。迁移不仅是导入 Cookie，还应分别确认自己应用的本地存储、所需扩展以及代理配置。结合 [浏览器环境权限指南](/zh-cn/guides/browser-profile-permissions/) 记录每个角色能够执行、不能执行和无法判断的动作，后续扩容时才有可复用标准。"
				},
				{
					heading: "使用相同的运行与环境证据表",
					body: "把接入、状态与网络检测分开记录。下表是建议执行的试用方案，不是本站已完成的性能测试，也不按检测分数给产品排高低；无法获得的观察应明确写成无法判断。\n\n| 问题 | 两家执行相同任务 | 有效证据 |\n| --- | --- | --- |\n| 启动路径 | 通过拟采用的桌面或 API 启动 | 版本、套餐与连接方式 |\n| 状态持久化 | 保存测试标记、关闭、重开 | 标记是否符合预期 |\n| 环境隔离 | 在全新环境检查该标记 | 没有意外共享状态 |\n| 团队范围 | 分配单个档案、撤权、重试 | 文档规则与实际限制 |\n| 网络路径 | 检查出口和触发的 DNS 查询 | 预期路径或解释清楚的不确定性 |\n| 完整成本 | 按目标流程获取报价 | 币种、周期、席位和 API 权益 |\n\n阅读 [DNS 检测解读](/zh-cn/guides/dns-leak-test-browser-proxy/) 和 [BrowserLeaks 与 CreepJS 对比](/zh-cn/guides/browserleaks-vs-creepjs/)，避免把不同机制混为一谈。检测页的提示只反映其采集范围，不能保证任何平台的账号结果。"
				},
				{
					heading: "移动促销和迁移条款需要独立确认",
					body: "移动客户端促销、手机浏览器指纹、原生应用环境是不同概念。不要把从手机端注册的活动额度写成桌面永久免费计划，也不要默认老账号同样符合资格。如果某个移动活动影响采购，应询问适用用户、有效时长、实际客户端、到期行为及续费规则；促销横幅本身不足以确认这些条件。\n\n当 GoLogin 已公开的本地与远程执行路径符合任务时，可以重点试用；当 Octo 的桌面、API 和团队套餐符合要求时，也应进入候选。最终按验收结果、完整报价和恢复流程决策，不根据单个推广文章的“更便宜”或“更稳定”下结论。先迁移少量可恢复的测试数据，核对状态后再扩大范围，保留来源及回退条件，避免把一次登录成功误认为整个团队迁移已经完成。"
				}
			],
			sources: [goPricing, goFeatures, goApi, goCloud, octoPricing, octoApi, octoDownload]
		}
	},
	"kameleo-vs-octo-browser": {
		en: {
			sections: [
				{
					heading: "Kameleo vs Octo Browser: concurrency is not profile capacity",
					body: "Kameleo's pricing distinguishes concurrent running browsers, browser-use minutes, local profiles and cloud profile capacity. Octo's plans describe profile capacity, team entitlements and API availability. A large archive of saved profiles and a large number of simultaneous browser processes solve different problems. Compare the resources your workload consumes, not the largest number on either page.\n\nWrite down expected peak sessions, average duration, saved state, local machines and staff. For Kameleo, assess both concurrency and any applicable time allowance. For Octo, confirm the intended plan's stored-profile and API limits separately from workstation capacity. The reviewed Octo cards and matrix disagree on some profile counts, so request confirmation rather than silently choosing one figure."
				},
				{
					heading: "Compare launch, connection and state ownership in your SDK",
					body: "Kameleo's official example starts its engine, creates a profile through the Local API and connects Playwright to a browser endpoint. Its current plan page lists Local API and SDK integration. Octo's automation page documents API-managed profiles and framework connections. An API checkbox alone does not reveal where profile files are stored, who owns the credentials or how an interrupted process should be recovered.\n\nImplement a harmless create-or-select, start, connect, read, close and reopen sequence on a site you control. Record the profile identifier, connection lifecycle and state location without saving tokens in logs. Confirm that cleanup closes the intended test process and preserves or deletes only the data you meant to change. See [automation profile persistence](/en/guides/browser-automation-profile-persistence/) for lifecycle distinctions."
				},
				{
					heading: "Check desktop, container and mobile requirements separately",
					body: "Kameleo's official downloads include Windows, macOS and Docker deployment. Octo's reviewed desktop download page lists Windows, macOS and Linux. A Docker option needs its own image, host, display/headless and resource validation; it should not be interpreted as an identical native Linux desktop experience. Likewise, an emulated mobile browser fingerprint is not an Android operating system capable of installing arbitrary native apps.\n\nTest the actual supported client or container you intend to operate. Ask which engines, extensions, local storage and automation frameworks are available there. If a mobile app promotion is offered, confirm its eligibility and lifecycle independently; it does not automatically establish the permanent free allowance or API entitlement of your desktop plan."
				},
				{
					heading: "Use a workload acceptance table instead of unmatched prices",
					body: "Use the same authorized test workload and label results pass, fail or inconclusive. This is a proposed plan, not a completed BrowserHub benchmark.\n\n| Dimension | Common test | Record before purchase |\n| --- | --- | --- |\n| Peak execution | Run the required harmless jobs concurrently | Actual active-browser entitlement |\n| Time allowance | Repeat with the expected session duration | Applicable minutes and overage terms |\n| Saved state | Close, reopen and read a test marker | Local/cloud location and persistence |\n| Isolation | Inspect a fresh profile on the same origin | No unexpected A/B shared state |\n| API lifecycle | Interrupt and reconnect one test worker | Useful errors and clean recovery |\n| Team access | Give a member the minimum required access | Scope, revocation and credential owner |\n\nUse the [storage isolation test](/en/guides/browser-profile-storage-isolation-test/) for state and the [timezone/language guide](/en/guides/browser-timezone-language-check/) for locale diagnostics. Neither substitutes for concurrency testing or proves universal detection resistance."
				},
				{
					heading: "Choose the operating model and budget the complete workload",
					body: "Kameleo deserves evaluation when its documented engine, SDK and concurrency model fit developer-maintained workloads. Octo deserves evaluation when its documented profile, API and team plan fit the people operating them. These are conditional shortlists, not claims that one is always more automated or cheaper. Use the reviewed EUR prices in the shared table, but compare the same term and required resources before calculating a total.\n\nInclude machines, proxy traffic, member rights, time allowance and recovery effort. Unlimited local profiles do not mean unlimited concurrent processes, unlimited cloud storage or unlimited compute. Migrate a disposable sample, validate state and retain a recoverable source. A documented capability plus your own acceptance evidence provides a more useful decision than a directory's outdated yes/no field."
				}
			],
			sources: [kameleoPricing, kameleoDownload, kameleoProduct, octoPricing, octoApi, octoDownload]
		},
		"zh-cn": {
			sections: [
				{
					heading: "Kameleo 与 Octo Browser：并发数不等于档案容量",
					body: "Kameleo 当前价格页将同时运行的浏览器、使用分钟、本地档案和云端档案容量分别列出；Octo 套餐则列出档案容量、团队权益和 API 开放层级。保存大量历史档案与同时运行大量浏览器进程解决的是不同问题，不能把页面上最大的数字直接横向相除，再得出单环境成本。采购前应写明峰值会话、平均时长、保存状态、机器与人员需求。\n\n评估 Kameleo 时，同时检查并发额度与适用的时间限制；评估 Octo 时，把档案保存上限、API 权益和工作站实际能力分开。已查看的 Octo 套餐卡片与详细矩阵存在部分容量冲突，需要厂商确认实际规则，不宜默默选择其中一个数字。保存额度再高，也不表示机器内存、代理带宽和同时运行权限无限。"
				},
				{
					heading: "比较 SDK 中的启动、连接与状态归属",
					body: "Kameleo 官方示例先启动引擎，通过 Local API 创建档案，再由 Playwright 连接浏览器端点；当前套餐页列出 Local API 与 SDK 接入。Octo 自动化页面也描述 API 管理档案和框架连接。仅有“支持 API”标记，无法回答档案保存在哪里、凭证归谁管理、进程意外终止后怎样恢复，更不能从中推断全部套餐无限开放。\n\n在自己控制的网站上实现一个无害流程：创建或选择测试档案、启动、连接、读取页面、关闭、重新打开。记录档案标识、连接生命周期与状态位置，但不要在日志保存令牌和账号秘密。检查清理步骤只关闭目标测试进程，并按预期保留或删除数据。可参考 [浏览器自动化持久化指南](/zh-cn/guides/browser-automation-profile-persistence/)，把浏览器连接、上下文、档案与服务器端会话分开排查。"
				},
				{
					heading: "桌面、容器与移动需求应独立验证",
					body: "Kameleo 官方下载包含 Windows、macOS 和 Docker 部署；Octo 本轮查看的桌面下载页列有 Windows、macOS 和 Linux。Docker 方案需要另行检查镜像、宿主环境、图形或无头运行方式和资源限制，不能把容器标签直接理解成完全相同的原生 Linux 桌面体验。使用什么系统，就验证相应客户端或容器版本，而不是只在另一台电脑上看演示。\n\n还应确认该部署中的内核、扩展、本地存储与自动化框架。模拟手机浏览器指纹并不是一个可安装任意原生应用的 Android 系统。若某家展示移动应用注册活动，也需要分别确认资格与到期流程，不能推断桌面永久免费额度或桌面 API 权益。把确实需要的设备能力写入验收项，避免用没有实际用途的移动标签影响选择。"
				},
				{
					heading: "用工作负载验收表替代不同口径的价格比较",
					body: "两家使用相同的已授权测试工作负载，结果标为通过、失败或无法判断。下表是建议执行的方案，并非本站完成的对比测评；开始前保留套餐、版本和部署方式。\n\n| 维度 | 共同测试动作 | 采购前记录 |\n| --- | --- | --- |\n| 峰值执行 | 同时运行所需数量的无害任务 | 实际同时运行权益 |\n| 时间额度 | 按预期会话时长重复执行 | 适用分钟与超额规则 |\n| 保存状态 | 关闭、重开并读取测试标记 | 本地或云端位置及持久化 |\n| 环境隔离 | 同源页面检查全新档案 | 没有意外共享 A/B 状态 |\n| API 生命周期 | 中断并重连一个测试进程 | 有用错误及明确恢复路径 |\n| 团队权限 | 给成员最小必要访问范围 | 授权、撤权和凭证归属 |\n\n使用 [存储隔离测试](/zh-cn/guides/browser-profile-storage-isolation-test/) 检查网站状态，使用 [时区与语言指南](/zh-cn/guides/browser-timezone-language-check/) 理解区域信号。二者都不能代替并发工作负载测试，也不能证明适用于所有站点的反检测能力。"
				},
				{
					heading: "按运行方式和完整资源预算决策",
					body: "当引擎、SDK 与并发模型符合开发者维护的任务时，Kameleo 值得进一步试用；当档案、API 与团队套餐符合执行人员流程时，Octo 也应列入候选。这里没有给出谁永远更自动化或更便宜的结论。共享表保留核查后的欧元价格，计算总额前仍需统一付款周期和所需资源，不能把存储容量与运行容量混用。\n\n预算应加入机器、代理流量、成员权限、时间额度和恢复维护。无限本地档案不等于无限同时运行、无限云存储或无限算力。迁移先处理可丢弃样本，确认网站状态后保留可恢复来源，再扩大规模。相比第三方目录里容易过期的是否支持字段，当前官方能力说明加上团队自己的验收记录，更能回答这笔采购是否真的满足任务。"
				}
			],
			sources: [kameleoPricing, kameleoDownload, kameleoProduct, octoPricing, octoApi, octoDownload]
		}
	}
};
