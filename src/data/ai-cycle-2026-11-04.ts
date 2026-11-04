import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sourcesBySlug: Record<string, { title: string; url: string }[]> = {
	"ai-browser-check-used-car-recalls-by-vin": [
		{ title: "NHTSA: Check for Recalls", url: "https://www.nhtsa.gov/recalls" },
		{ title: "FTC: Used Cars consumer resources", url: "https://consumer.ftc.gov/features/feature-0040-used-cars" },
		{ title: "AAA: Everything You Need to Know About Car Recalls", url: "https://magazine.northeast.aaa.com/daily/life/cars-trucks/everything-you-need-to-know-about-car-recalls/" },
		{ title: "Kelley Blue Book: Everything You Need to Know About Recalls", url: "https://www.kbb.com/car-advice/everything-you-need-to-know-about-recalls/" },
		{ title: "AAA: How to Handle a Vehicle Recall", url: "https://cluballiance.aaa.com/the-extra-mile/series/the-extra-mile-magazine/how-to-handle-a-vehicle-recall" },
		{ title: "Kiplinger: How to Buy a Used Car from a Private Seller", url: "https://www.kiplinger.com/personal-finance/used-cars/how-to-buy-a-used-car-from-a-private-seller-without-getting-burned" },
	],
	"ai-browser-verify-contractor-license-before-hire": [
		{ title: "Washington L&I: Verify a contractor, tradesperson or business", url: "https://www.lni.wa.gov/licensing-permits/contractors/hiring-a-contractor/verify-contractor-tradesperson-business" },
		{ title: "Angi: Contractor licensing, bonds and insurance FAQ", url: "https://www.angi.com/landing/faq" },
		{ title: "HomeAdvisor: Tips for finding the right professional", url: "https://www.homeadvisor.com/customer-care/" },
		{ title: "Kiplinger: What to ask a contractor before renovation", url: "https://www.kiplinger.com/real-estate/home-improvement/what-to-ask-a-contractor-before-a-renovation" },
		{ title: "Reddit HomeImprovement: Vetting contractors before hiring", url: "https://www.reddit.com/r/HomeImprovement/comments/1uzkt21/vetting_contractors_before_hiring/" },
		{ title: "NICB: Contractor state resources directory", url: "https://www.nicb.org/contractor-state-resources" },
		{ title: "Oregon CCB: Consumer tools", url: "https://www.oregon.gov/ccb/Pages/Consumer-Tools.aspx" }
	],
	"playwright-api-request-context-cookie-sharing": [
		{ title: "Playwright: APIRequestContext API", url: "https://playwright.dev/docs/api/class-apirequestcontext" },
		{ title: "Playwright: API testing", url: "https://playwright.dev/docs/api-testing" },
		{ title: "QABattle: Share authentication cookies between API and browser contexts", url: "https://qabattle.com/blog/playwright-api-browser-cookie-sharing" },
		{ title: "Reddit Playwright: Share context to HTTP client", url: "https://www.reddit.com/r/Playwright/comments/1qkoxh6/share_context_to_httpclient/" },
		{ title: "Reddit Playwright: Three approaches to authentication state", url: "https://www.reddit.com/r/Playwright/comments/1t77j5a/i_tested_3_approaches_to_handling_auth_state_in/" }
	],
	"playwright-api-request-context-multipart-upload": [
		{ title: "Playwright: APIRequestContext API", url: "https://playwright.dev/docs/api/class-apirequestcontext" },
		{ title: "Playwright: API testing", url: "https://playwright.dev/docs/api-testing" },
		{ title: "QASkills: APIRequestContext and multipart upload examples", url: "https://qaskills.sh/blog/playwright-apirequestcontext-storage-state-guide" },
		{ title: "Playwright issue: multipart file upload with a file and DTO", url: "https://github.com/microsoft/playwright/issues/20249" },
		{ title: "Playwright issue: upload multiple files through APIRequestContext", url: "https://github.com/microsoft/playwright/issues/19471" },
		{ title: "Playwright issue: multipart buffer type in newContext", url: "https://github.com/microsoft/playwright/issues/23912" },
		{ title: "Mergify: Playwright API testing guide", url: "https://articles.mergify.com/playwright-api-testing/" },
		{ title: "OneUptime: Test multipart file uploads", url: "https://oneuptime.com/blog/post/2026-08-24-test-multipart-file-uploads/view" },
		{ title: "Ray.run: Upload a file with the Node.js fs module", url: "https://ray.run/questions/how-do-i-upload-a-file-using-the-fs-module-in-javascript" }
	],
	"ai-browser-trace-github-issue-to-released-fix": [
		{ title: "GitHub Docs: Link a pull request to an issue", url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue" },
		{ title: "GitHub Docs: About releases", url: "https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases" },
		{ title: "GitHub Changelog: Release info in issue sidebar", url: "https://github.blog/changelog/2026-04-09-release-info-in-issue-sidebar-and-project-defaults/" },
		{ title: "Playwright: Release notes", url: "https://playwright.dev/docs/release-notes" },
		{ title: "Playwright: Issue 40998", url: "https://github.com/microsoft/playwright/issues/40998" },
		{ title: "Playwright community: Browser installation report", url: "https://www.reddit.com/r/Playwright/comments/1tsyddy/playwright-browsers-freezing-github-actions/" },
		{ title: "released: Find which release contains a commit", url: "https://released.blabberate.com/how-it-works" },
		{ title: "PatchMon Help Center: How a release happens", url: "https://feedback.patchmon.net/hc/en/articles/11-how-a-release-happens" },
		{ title: "Reddit Git: When a patch is released", url: "https://www.reddit.com/r/git/comments/1ulk6oe/i_need_to_know_when_my_patches_are_released_so_i/" },
		{ title: "Reddit npm: Resolved issue versus published package version", url: "https://www.reddit.com/r/npm/comments/vgcfqd/how_do_you_update_a_projects_version_that_had_an/" },
		{ title: "Reddit learnprogramming: Merged PR missing from installed npm package", url: "https://www.reddit.com/r/learnprogramming/comments/lfosmg/i_just_submitted_my_first_pr_and_it_got_merged/" }
	]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"ai-browser-check-used-car-recalls-by-vin": {
		en: {
			title: "Use an AI Browser to Check a Used Car for Open Recalls by VIN",
			description: "Build a source-linked recall check from the exact 17-character VIN, verify repair status with the manufacturer, and keep NHTSA lookup limits visible.",
			category: "AI browser task guides",
			content: "A vehicle listing can say “recall-free” while describing the model year generally or repeating a seller’s claim. A useful browser-agent task starts with the exact vehicle identification number (VIN), checks the public recall record, and leaves any safety conclusion to a qualified source. NHTSA’s lookup is a recall screen, not a complete vehicle history report or inspection. This guide shows how to use an AI browser as a careful research assistant: preserve the VIN’s source, record what the agency actually returns, and ask the manufacturer or franchised dealer to confirm unresolved repair status before making a decision.",
			sections: [
				{ heading: "Set the task boundary before opening sites", body: `Ask the browser agent to check one vehicle’s 17-character VIN against NHTSA, capture the result date and source URL, and list any recall campaign identifiers or status wording the page displays. Do not ask it to decide that a vehicle is safe, contact a seller, schedule a repair, or submit the VIN to unrelated paid history services. A VIN identifies a vehicle and may be sensitive in a sale context; use only a listing or vehicle you are authorized to research.

Keep the source of the VIN with the result: for example, a seller-provided listing, a photo of the dashboard plate, or the vehicle door label. If the listing shows only a model and year, stop and request the VIN. NHTSA’s general year/make/model search can show recalls for a family of vehicles; it does not prove which campaigns apply to this particular car. Before the agent browses, define the output fields: VIN source, NHTSA query date, exact page wording, campaign links, and unresolved status questions.` },
				{ heading: "Run the VIN lookup and preserve the original result", body: `Open the official [NHTSA recall lookup](https://www.nhtsa.gov/recalls), enter the VIN exactly as provided, and compare the characters shown in the result with the source. If the valid VIN query explicitly displays “0 unrepaired recalls,” record that exact result and date. A blank page, invalid-VIN message, loading error or blocked request is unknown, not a zero result. Even an explicit zero does not certify the vehicle as safe, prove the database has every campaign or replace an inspection.

Capture each campaign’s description, affected component, manufacturer, campaign number, remedy status if shown, and page date. Keep the source link beside each field; do not merge different campaign records into one generic “recall” summary. If the website asks for a CAPTCHA or blocks automated access, stop and use the site manually. Do not work around an access control or infer a result from snippets.

The [FTC used-car buying guide](https://consumer.ftc.gov/features/feature-0040-used-cars) recommends checking for recalls as part of a broader inspection and history review. Keep those other checks separate: title, odometer, accident history, maintenance, and mechanical condition are not answered by NHTSA’s recall page.` },
				{ heading: "Treat lookup coverage as a limit, not a guarantee", body: `NHTSA explains that its VIN tool covers certain manufacturer-reported safety recalls and may not yet show some newly announced recalls whose VIN ranges are not mapped. It also excludes completed repairs, recalls older than 15 years except where a manufacturer offers broader coverage, some small or specialty manufacturers, non-safety campaigns, and international vehicles. Manufacturers may have VIN information that has not yet appeared on the NHTSA page. Read the live [NHTSA limitations and recall guidance](https://www.nhtsa.gov/recalls) on the day of the check; do not copy a remembered coverage rule as if it could never change.

Only when a valid VIN query explicitly reports zero unrepaired recalls should you record: “NHTSA displayed no open recall for this VIN on [date].” A blank result, invalid VIN, blocked page or loading error is unknown; do not translate it into a clean record. Then ask the manufacturer or a franchised dealer to confirm whether a campaign was completed, announced recently, or requires a remedy. If a campaign appears, ask whether the VIN is included and whether the repair is available and complete. NHTSA says manufacturers must remedy covered safety defects, but the recall page alone cannot establish the repair status of a specific car.

Do not turn a manufacturer’s “no open campaign” response into a claim that no safety problem exists. Recall databases cover defined notices; they do not discover every mechanical defect, warning, service bulletin, or vehicle history event. If the seller’s description conflicts with the agency record, preserve both statements and ask the seller or manufacturer to reconcile them in writing.` },
				{ heading: "Build a short evidence ledger", body: `A table is more useful than a paragraph that hides uncertainty. Keep one row per recall campaign and one row for the lookup itself. Separate a result shown by NHTSA from a statement made by a seller or dealer.

| Record | Evidence to keep | What it does not establish |
| --- | --- | --- |
| VIN and source | Exact VIN, where it came from, check date | That the VIN belongs to the advertised vehicle if the source is unverified |
| NHTSA lookup | Exact result wording, campaign number, page URL | Full repair history or general vehicle safety |
| Manufacturer or dealer confirmation | Name, date, campaign and VIN status, remedy availability | Mechanical condition outside that campaign |
| Remaining checks | Title, history report, independent inspection | A guarantee against future failure |

Ask the agent to label a missing response as “not found” or “not confirmed,” never to fill the gap from a model-year article. If a page returns a campaign list but no VIN-specific status, retain that difference. An evidence ledger should let another person repeat the check without relying on the agent’s summary.` },
				{ heading: "Common errors and how to recover", body: `A VIN typo can return the wrong record or no match. Recheck every character against the vehicle source, especially zero versus O and one versus I. If the page says the VIN is invalid, do not remove characters or guess a replacement; request a clear image or confirmation from the seller.

A model-level recall search is useful for screening but not a substitute for the VIN page. A paid vehicle history report may contain other history fields, but its inclusion of a recall item does not replace the manufacturer’s current repair record. An old recall article may describe an affected model without confirming that this exact vehicle is included.

If the VIN lookup and manufacturer answer disagree, stop the automated summary. Record both dates and exact statements, then ask the manufacturer’s customer service or a franchised dealer to resolve whether the VIN is affected and whether repair was completed. If the agent starts filling contact forms, booking service, or sharing the VIN beyond the public lookup, take over and decide separately.` },
				{ heading: "Use AI browsing for evidence collection, not a safety verdict", body: `A browser agent can reduce tab switching and format findings, but it can misread digits, confuse model-wide notices with VIN-specific applicability, or omit a source caveat. Review the VIN, every campaign link, and any no-result wording yourself. For purchase decisions, use the recall check alongside an independent pre-purchase inspection and the relevant title and history checks described by consumer guidance such as [AAA recall guide](https://magazine.northeast.aaa.com/daily/life/cars-trucks/everything-you-need-to-know-about-car-recalls/) and the [FTC used-car guide](https://consumer.ftc.gov/features/feature-0040-used-cars).

For another browser research workflow that keeps each result tied to its source, see the [product comparison guide](/en/guides/ai-browser-compare-products-across-sites/) and the [source-verification guide](/en/guides/ai-browser-research-source-verification/). This workflow is documentation-based; BrowserHub did not submit a real VIN, run NHTSA’s lookup, or inspect a vehicle. It does not offer a safety determination, legal advice, or a substitute for the manufacturer’s records. Recheck official instructions at the time of use because recall coverage and the lookup interface can change.` }
			],
			faq: [
				{ question: "Does a zero-result VIN lookup mean the used car is safe?", answer: "Only an explicit zero result from a valid VIN query means NHTSA displayed no open recall at that time. A blank, invalid or failed lookup is unknown; even a valid zero is not a safety certification, full history, or inspection." },
				{ question: "Can I use a year, make and model instead of the VIN?", answer: "That can help find recalls that may affect a vehicle family, but it cannot confirm the campaigns for one particular vehicle. Ask for the exact VIN and run the VIN lookup." },
				{ question: "What if a repair is listed as complete?", answer: "Keep the displayed wording and date, then ask the manufacturer or franchised dealer to confirm the repair status for the exact VIN. The lookup does not replace their repair record." },
				{ question: "Did BrowserHub test the lookup with a real car?", answer: "No. This is a source-based workflow. It does not claim a live VIN query, a vehicle inspection, or a safety verdict." }
			]
		},
		"zh-cn": {
			title: "用 AI 浏览器按 VIN 查询二手车未修复召回",
			description: "以准确的 17 位 VIN 核对 NHTSA 召回信息，向制造商确认维修状态，并保留官方查询范围的限制。",
			category: "AI 浏览器任务指南",
			content: "二手车页面可能只笼统写着“没有召回”，也可能只是转述卖家说法。更可靠的浏览器智能体任务应从这辆车的车辆识别代号（VIN）开始，查询公开召回记录，并把最终安全判断留给有资质的来源。NHTSA 查询只是召回筛查，不是完整车辆历史报告或机械检查。本指南说明如何让 AI 浏览器协助查资料：保留 VIN 来源，记录机构页面实际显示的内容，并在做决定前请制造商或品牌经销商确认未完成的维修状态。",
			sections: [
				{ heading: "先限定任务范围", body: `让浏览器智能体只做一件事：用准确的 17 位 VIN 查询 NHTSA 页面，记录查询日期、来源网址，以及页面显示的召回活动编号和状态原文。不要让它替你判断车辆安全、联系卖家、预约维修，也不要把 VIN 提交给无关的付费历史查询服务。VIN 能识别具体车辆；只查询你有权研究的车辆或广告。

把 VIN 来源一起保存，例如卖家广告、仪表台 VIN 照片或车门标签。如果广告只写车型和年份，先索要 VIN。NHTSA 的年份、品牌和车型查询可以列出某类车辆可能涉及的召回，但不能证明这辆车具体适用哪些活动。查询前先确定输出字段：VIN 来源、查询日期、NHTSA 原文、召回链接和仍需确认的问题。` },
				{ heading: "按 VIN 查询并保留原始结果", body: `打开官方 [NHTSA 召回查询](https://www.nhtsa.gov/recalls)，准确输入 VIN，再与来源逐字符核对。只有当有效 VIN 查询明确显示“0 项未修复召回”时，才可写成“NHTSA 截至某日未显示该 VIN 的未修复召回”。空白页面、VIN 无效、访问受阻或加载错误都代表未知，不能当成没有召回。这仍不能证明数据库涵盖所有活动，也不能证明车辆安全或代替检查。

逐项记录召回描述、涉及部件、制造商、活动编号、页面是否显示修复状态以及查询日期。每个字段旁保留来源链接，不要把不同召回记录合并成一句“有召回”。如果网站要求 CAPTCHA 或拒绝自动访问，就停止自动化并手动使用网站；不要绕过访问控制，也不要根据搜索摘要猜结果。

[FTC 的二手车购买指南](https://consumer.ftc.gov/features/feature-0040-used-cars)建议把召回检查纳入更全面的车辆历史与检查流程。产权、里程、事故、保养和机械状况要分开核对，NHTSA 召回页无法回答这些问题。` },
				{ heading: "理解查询覆盖范围", body: `NHTSA 说明，VIN 工具显示的是部分由制造商报告的安全召回；新公布但尚未映射到 VIN 范围的活动可能暂时查不到。已完成的维修、超过 15 年的召回（制造商提供更长覆盖期的情况除外）、部分小型或专业制造商、非安全活动和国际车辆也不在完整覆盖范围内。制造商掌握的信息可能尚未出现在 NHTSA 页面。每次查询都应查看当天的 [NHTSA 说明](https://www.nhtsa.gov/recalls)，不要把记忆中的规则当成永不变化的保证。

只有在有效 VIN 查询明确显示“0 项未修复召回”时，才能记录“NHTSA 截至某日未显示该 VIN 的未修复召回”。空白页、无效 VIN、访问受阻或加载错误都应标为未知，不能记作没有召回。之后请制造商或品牌经销商确认是否有已维修、刚公布或待处理的召回。如果页面显示活动，继续核实 VIN 是否适用、维修是否已完成以及目前能否维修。NHTSA 说明制造商必须为适用的安全缺陷提供补救，但页面本身不能证明某辆车已经完成维修。

不要把制造商说“目前没有未修复活动”扩写成“车辆没有安全问题”。召回记录只覆盖正式公布的特定事项，不涵盖所有机械缺陷、警示、服务通告或车辆历史。卖家说法与机构记录冲突时，分别保存原文，再请卖家或制造商书面解释。` },
				{ heading: "整理成可复核的证据表", body: `表格比一段模糊总结更能保留未知项。每个召回活动单独一行，另设一行记录整次查询，并区分 NHTSA 页面、卖家和经销商的说法。

| 记录 | 保存内容 | 不能证明什么 |
| --- | --- | --- |
| VIN 与来源 | VIN、来源、查询日期 | 未核实来源时不能证明它属于广告中的车辆 |
| NHTSA 查询 | 页面原文、活动编号、网址 | 不能证明完整维修历史或车辆整体安全 |
| 制造商/经销商答复 | 人员、日期、VIN 状态、维修可用性 | 不能说明召回范围外的机械状况 |
| 其他检查 | 产权、历史报告、独立检查 | 不能保证车辆今后不会故障 |

让智能体把找不到的信息标成“未找到”或“未确认”，不能根据同年份文章补空。页面有召回列表但没有 VIN 维修状态时，也要保留两者差异。证据表的目标是让另一个人能复查，而不是只相信智能体的概括。` },
				{ heading: "常见错误与处理方式", body: `VIN 输入错误可能导致没有结果或查到不相关内容。把每个字符与车辆来源核对，特别留意数字 0 与字母 O、数字 1 与字母 I。如果页面提示 VIN 无效，不要删字符或猜测，先请卖家提供清晰照片或确认。

车型级召回搜索只能用于初筛，不能替代 VIN 查询。付费车辆历史报告可能包含更多字段，但其中的召回项目仍不能代替制造商的维修记录。旧文章可能只说明某一车型涉及召回，不能确认这辆车是否适用。

如果 VIN 查询与制造商答复冲突，暂停自动总结。分别记录日期与原话，再请制造商客服或品牌经销商核实车辆是否涉及该活动、维修是否完成。如果智能体开始填写联系表、预约服务或向公开查询以外的地方发送 VIN，请停下来，由你决定是否继续。` },
				{ heading: "让 AI 浏览器收集证据，不给安全结论", body: `浏览器智能体可以减少切换网页和整理记录的时间，但可能误读数字、把车型召回误当成 VIN 适用，或漏掉数据库限制。请亲自检查 VIN、每个活动链接和“没有结果”的措辞。购买前还应结合独立机械检查、产权和车辆历史核查；可参考 [AAA 召回指南](https://magazine.northeast.aaa.com/daily/life/cars-trucks/everything-you-need-to-know-about-car-recalls/)与 [FTC 二手车指南](https://consumer.ftc.gov/features/feature-0040-used-cars)。

需要跨站比较候选项时，可参考[产品比较指南](/zh-cn/guides/ai-browser-compare-products-across-sites/)；整理多处证据时可继续阅读[来源核验指南](/zh-cn/guides/ai-browser-research-source-verification/)。本文依据公开资料编写，BrowserHub 没有提交真实 VIN、运行 NHTSA 查询或检查车辆。本文不提供安全鉴定或法律意见，也不替代制造商记录。召回覆盖范围和页面可能变化，使用时请重新核对官方说明。` }
			],
			faq: [
				{ question: "VIN 查询没有结果，是否说明车辆安全？", answer: "只有有效 VIN 查询明确显示零项时，才能说 NHTSA 当时未显示未修复召回。空白、无效或失败的查询是未知；零项也不是安全证明、完整历史报告或机械检查。" },
				{ question: "可以只用年份、品牌和车型查询吗？", answer: "可以初步了解可能涉及的召回，但无法确认某一辆车。请索要准确 VIN 并执行 VIN 查询。" },
				{ question: "如果页面说维修已完成怎么办？", answer: "保留页面原文和日期，再请制造商或品牌经销商按准确 VIN 核实维修状态。查询页不能替代维修记录。" },
				{ question: "BrowserHub 是否用真实车辆测试过？", answer: "没有。本文是资料型流程说明，不声称实际查询过 VIN、检查过车辆或给出安全结论。" }
			]
		}
	},
	"ai-browser-verify-contractor-license-before-hire": {
		en: {
			title: "Use an AI Browser to Verify a Contractor’s Washington Registration",
			description: "Match the contractor’s legal identity to Washington L&I records, check registration and listed items, and keep local trade rules and registry limits in view.",
			category: "AI browser task guides",
			content: "A polished contractor profile or review page does not establish that the person or company quoted for your project is the same entity shown in a state registry. An AI browser can help gather public records, but the task must be scoped to a jurisdiction and trade. This walkthrough uses Washington State Department of Labor & Industries (L&I) as a concrete example: match names and registration identifiers, review the agency’s listed status fields, and record questions that still need a direct answer. For a related public-source workflow, see the [source-verification guide](/en/guides/ai-browser-research-source-verification/). It is a document-based research workflow, not legal advice, a contractor endorsement, or a prediction of workmanship.",
			sections: [
				{ heading: "Start with the work location and exact business name", body: `Rules depend on where the project takes place and what work is being done. Before browsing, record the project address or jurisdiction, the trade, and the exact legal name and registration or license number supplied in the quote. A marketing name, individual salesperson, and registered business can be different entities. Do not assume that a Washington contractor registration answers separate electrician, plumber, engineer, or other credential requirements.

For this example, use the state’s official [Washington L&I verification page](https://www.lni.wa.gov/licensing-permits/contractors/hiring-a-contractor/verify-contractor-tradesperson-business). For another state, county, or city, first find the official agency through that government’s own site. A national directory or lead-generation marketplace can help locate a registry, but its profile is not the authoritative result. Ask the contractor which legal entity will sign the contract and perform the work before searching.` },
				{ heading: "Search the official Washington L&I record", body: `Open the verification page and search using the business name or contractor registration number. Match the result against the quote: full registered name, address or other identifying details, registration number, and any listed owners or principals. If more than one business has a similar name, do not choose the first result. Ask the contractor to confirm the number and entity in writing.

Record the registry’s current status and the date you checked. Washington’s public lookup may show registration information, trade certifications, bond or lawsuit information, and workers’ compensation account status. Preserve each field separately and quote the agency’s terms. “Active registration,” “paid-to-date account,” a bond record, and a trade certificate are different observations; do not collapse them into “fully licensed and insured.”

The agency warns that public-access information may not be accurate, reliable, or current and does not warrant the record. L&I says database information is updated Monday through Friday by 5 a.m. Pacific Time, excluding state holidays. That is the stated data-update schedule, not a guarantee that a record is real-time or complete. If the website is unavailable, blocked, invalid or shows an ambiguous match, record the lookup as unknown and stop rather than treating a failed lookup as a clean record.` },
				{ heading: "Separate registration from trade credentials and insurance", body: `Washington uses contractor registration for many general contracting businesses; some skilled trades have separate certification or licensing requirements. The category that applies depends on the work. Ask the relevant state or local regulator whether an additional credential is required for this project, and verify that credential in its own official database. The contractor’s general registration number is not proof of every trade qualification.

An online status is only one part of due diligence. Ask the contractor for a current certificate of insurance and verify it with the issuing insurer or agent using contact details you find independently. Confirm the named insured is the entity that will do the job and ask what coverage applies to the actual project. The state lookup may report a workers’ compensation account status, but it does not replace an insurer’s confirmation of liability coverage. Do not send private personal information or accept a PDF certificate as the sole proof of active coverage.

The [Angi FAQ](https://www.angi.com/landing/faq) and [HomeAdvisor’s consumer guidance](https://www.homeadvisor.com/customer-care/) both tell consumers to verify credentials with local authorities and confirm insurance. Those are marketplace-authored recommendations, not a substitute for the issuing agency or insurer. Keep their role clear when collecting sources.` },
				{ heading: "Create a reviewable verification record", body: `Use a compact record so the person reviewing the bids can see what was verified and what was not.

| Check | Evidence to capture | Follow-up if unclear |
| --- | --- | --- |
| Contracting entity | Full legal name, address, number on quote | Ask who signs and performs the work |
| Washington registration | L&I result wording, status, date and URL | Confirm similar-name matches directly |
| Trade-specific credential | Exact classification and issuing board | Ask the regulator whether this work requires it |
| Insurance | Insurer, policy dates, named insured, scope | Call the insurer using independently found contact details |
| Project documents | Scope, permits, timeline and payment terms | Resolve gaps before deciding whether to hire |

Use “not checked,” “not listed,” or “needs confirmation” for missing fields. Do not let a browser agent infer that a blank means the contractor has no history or that an active record means no complaints. Separate facts in the public registry from statements in reviews and from the homeowner’s own judgment of the bid.` },
				{ heading: "Use the workflow in another jurisdiction carefully", body: `The transferable step is finding the agency that regulates the exact work at the project address. Search the state government domain and, if needed, the county or city building department. Check the agency’s own guidance for the difference between a registration, license, certification, bond, and insurance record. Some jurisdictions register general contractors while separately licensing electrical or plumbing work; other locations use different names and scopes.

Do not copy Washington’s fields or legal terms into another state as if requirements were national. The [National Insurance Crime Bureau directory](https://www.nicb.org/contractor-state-resources) and government consumer pages can point toward state resources, but follow each link to the issuing agency and verify that it covers the relevant county and work category. If the registry is missing, stale, or hard to interpret, call the agency using a number published on its official site.

Check what the record does not show. A registry may omit local permits, pending complaints, references, contract quality, financial standing, subcontractor identity, or the quality of completed work. A clean registry result is one checkpoint in a larger hiring decision.` },
				{ heading: "Treat the agent as a research clerk, not a hiring authority", body: `An agent can open public records and assemble a source-linked table, but it can confuse similarly named companies, miss a suffix such as LLC, or report a directory result as if it came from the government. Review the selected entity, official URL, check date, and exact status wording yourself. Stop if the agent proposes signing a contract, paying a deposit, contacting a contractor, or submitting your address or personal details.

Before hiring, compare the written scope, permits, timeline, payment schedule, insurance evidence, references, and contract terms. [Kiplinger’s renovation questions](https://www.kiplinger.com/real-estate/home-improvement/what-to-ask-a-contractor-before-a-renovation) and [Oregon CCB’s consumer tools](https://www.oregon.gov/ccb/Pages/Consumer-Tools.aspx) describe related consumer checks, but rules vary by location. For contract interpretation or a dispute, consult the relevant agency or a qualified professional. BrowserHub did not verify a real contractor; this article explains a repeatable desk-research method.` }
			],
			faq: [
				{ question: "Does Washington L&I registration prove the contractor is qualified for every trade?", answer: "No. Some trades have separate certification or licensing requirements. Check the relevant official regulator for the work and project location." },
				{ question: "If the registry says active, is the contractor insured?", answer: "Not necessarily. Ask for a current certificate and verify it with the issuing insurer or agent using contact details you find independently." },
				{ question: "Can an AI browser choose the correct contractor record?", answer: "It can help compare names and identifiers, but you should confirm the exact contracting entity. Similar names or missing business suffixes can produce a false match." },
				{ question: "Does a clean registry result guarantee good work?", answer: "No. It does not establish workmanship, project fit, references, contract quality, or every local permit requirement." }
			]
		},
		"zh-cn": {
			title: "用 AI 浏览器核对华盛顿州承包商注册信息",
			description: "将承包商的法律主体与华盛顿州 L&I 记录对应，核对公开状态字段，并留意当地工种要求和登记信息限制。",
			category: "AI 浏览器任务指南",
			content: "承包商的精美主页或评价页面，无法证明报价上的人或公司就是州政府登记的主体。AI 浏览器可以协助整理公开记录，但任务必须限定辖区和工种。本指南以华盛顿州劳工与工业部（L&I）为例：核对主体名称和登记号，记录机构显示的状态，并列出仍需直接确认的问题。整理多处来源时，可使用[浏览器智能体来源核验指南](/zh-cn/guides/ai-browser-research-source-verification/)中的逐项核对方法。这是资料核查流程，不是法律意见、承包商背书，也不能预测施工质量。",
			sections: [
				{ heading: "先确定施工地点和法律主体", body: `规定取决于项目所在地和具体工种。浏览前先记录项目地址或辖区、施工类型，以及报价提供的准确法律名称和注册或执照编号。品牌名、销售人员和登记企业可能不是同一主体。不能假设华盛顿州的一般承包商注册就覆盖电工、水管工、工程师或其他职业资质。

本例使用州政府的 [华盛顿州 L&I 承包商核验页面](https://www.lni.wa.gov/licensing-permits/contractors/hiring-a-contractor/verify-contractor-tradesperson-business)。查询其他州、县或城市时，先从政府官网找到主管机构。全国性目录或线索平台可以帮你找到登记处，但平台资料不是最终权威记录。搜索前请承包商确认谁会签合同、谁会实际施工。` },
				{ heading: "查询华盛顿州 L&I 官方记录", body: `打开核验页面，按企业名称或承包商登记号搜索。把结果与报价逐项比对：登记全名、地址或其他身份信息、登记号，以及页面列出的负责人。如果出现多个相似名称，不要直接选第一个结果；请承包商书面确认对应主体和编号。

记录当前状态、查询日期和页面原文。华盛顿州公开查询可能显示承包商注册、工种证书、保证金或诉讼信息、工伤保险账户状态。每项字段应单独保存，并沿用机构自己的术语。“注册有效”“账户已缴费”“存在保证金记录”和“持有工种证书”是不同事实，不能合并成“资质齐全且已投保”。

机构提醒，公开系统的信息可能不准确、不可靠或非最新，且不保证其记录。L&I 说明数据库信息于周一至周五太平洋时间凌晨 5 点前更新（州法定假日除外）。查询结果可以作为证据之一，但 AI 浏览器不能把它变成实时保证。如果网页不可用、阻止自动访问或匹配含糊，应记录问题并停止，不要把查询失败写成记录正常。` },
				{ heading: "区分一般注册、工种资质和保险", body: `华盛顿州许多一般承包业务采用承包商注册制度；部分专业工种另有认证或执照要求。具体类别取决于施工内容。请相关州或地方监管机构确认项目是否需要额外资质，并在对应官方数据库核验。一般承包商注册号不能证明所有工种资格。

网上状态只是尽调的一部分。请承包商提供当前保险证明，再通过自行查找的保险公司或代理联系方式核实。确认被保险主体就是实际承接工程的企业，并询问保险是否覆盖本项目。州登记页可能显示工伤保险账户状态，但不能代替保险公司确认责任险。不要提交个人敏感信息，也不要只凭一份 PDF 保险证明认定保单有效。

[Angi 常见问题](https://www.angi.com/landing/faq)和 [HomeAdvisor 消费者建议](https://www.homeadvisor.com/customer-care/)都建议向当地主管机构核实资质并确认保险。这些是平台提供的建议，不是发证机构或保险公司的核验结果。整理来源时要保留这种区别。` },
				{ heading: "建立可复核的核验记录", body: `用简短清单标明核对了什么、尚未确认什么，让家庭成员比较报价时能看懂证据。

| 核验项 | 保存证据 | 不清楚时的下一步 |
| --- | --- | --- |
| 合同主体 | 报价上的全名、地址、编号 | 确认谁签约、谁施工 |
| 华盛顿州注册 | L&I 原文、状态、日期、网址 | 直接确认相似名称记录 |
| 工种资质 | 具体类别和发证机构 | 询问监管机构是否适用于此工程 |
| 保险 | 保险公司、日期、被保险人、范围 | 用自行查找的联系方式向保险方核实 |
| 项目文件 | 工作范围、许可、时间和付款条款 | 决定聘用前补齐缺项 |

缺少字段时写“未查询”“未列出”或“待确认”。不要让智能体把空白推断成没有投诉，也不要把注册有效写成没有争议。公开登记事实、评价内容和屋主对报价的判断应分开记录。` },
				{ heading: "在其他辖区使用时要重新找规则", body: `可复用的步骤是找到项目所在地负责具体工种的主管机构。先查州政府网站，必要时再查县或市建管部门。阅读机构对注册、执照、认证、保证金和保险记录的定义。有些地区为一般承包商办理注册，电工或水管工另行发证；其他地区的名称和权限范围可能不同。

不要把华盛顿州的字段和法律术语当成全国统一要求。[NICB 州资源目录](https://www.nicb.org/contractor-state-resources)和政府消费者页面可帮助找到入口，但应继续进入发证机构官网，确认覆盖的县区与工种。如果数据库缺失、陈旧或难以解释，通过官网公布的联系方式向机构确认。

还要检查记录没有覆盖哪些方面：地方许可、未结投诉、推荐人、合同质量、财务情况、分包商身份和施工水平都可能不在数据库里。记录干净只是一项核对，不等于完整的聘用决定。` },
				{ heading: "让智能体整理资料，不替你决定聘用", body: `浏览器智能体能打开公开登记页并整理带来源的表格，但它可能混淆同名企业、漏掉 LLC 后缀，或把目录结果误报成政府信息。请亲自确认主体、官方网址、查询日期和状态原文。如果智能体开始签合同、支付定金、联系承包商，或提交你的地址及个人信息，就停下来由你决定。

聘用前还要比较书面范围、许可证、时间表、付款安排、保险证明、推荐人和合同条款。可阅读 [Kiplinger 的装修提问清单](https://www.kiplinger.com/real-estate/home-improvement/what-to-ask-a-contractor-before-a-renovation)和 [俄勒冈 CCB 消费者工具](https://www.oregon.gov/ccb/Pages/Consumer-Tools.aspx)，但各地规定不同。合同解释或纠纷应咨询主管机构或合格专业人士。BrowserHub 没有核验真实承包商；本文仅提供可复查的桌面研究方法。` }
			],
			faq: [
				{ question: "华盛顿州 L&I 注册能证明承包商具备所有工种资质吗？", answer: "不能。有些工种需要单独认证或执照。请按施工地点和工程类别查询对应官方机构。" },
				{ question: "登记显示有效，就说明承包商有保险吗？", answer: "不一定。请索要当前保险证明，并通过自行查找的保险公司或代理联系方式核实。" },
				{ question: "AI 浏览器能判断哪个企业记录正确吗？", answer: "它可以帮助比对名称和编号，但你仍需确认实际签约主体。同名企业或遗漏的公司后缀可能造成误匹配。" },
				{ question: "登记记录正常，是否保证施工质量？", answer: "不能。登记记录不证明施工水平、项目适配、推荐人评价、合同质量或所有地方许可要求。" }
			]
		}
	},
	"playwright-api-request-context-cookie-sharing": {
		en: {
			title: "Why Playwright API Requests May or May Not Share Browser Cookies",
			description: "Choose the cookie jar deliberately: page.request and browserContext.request share the browser context’s cookies, while a standalone API context is isolated.",
			category: "AI browser developer guides",
			content: "When an API call from a Playwright test unexpectedly returns 401, first ask which APIRequestContext made the request. The object reached through page.request or browserContext.request is the same context-associated request client and uses that browser context’s cookie jar. A standalone request.newContext() keeps a separate jar. This solves one specific boundary: cookies. It does not copy localStorage, sessionStorage, IndexedDB, JavaScript memory, or every browser networking rule. This guide gives a loopback-only way to decide which client fits a test and how to avoid leaking a real session. For adjacent UI permission boundaries, see [testing multiple roles with separate contexts](/en/guides/playwright-test-multiple-roles-permissions/) or the [session persistence guide](/en/guides/browser-automation-profile-persistence/).",
			sections: [
				{ heading: "Pick the intended relationship first", body: `Use page.request or browserContext.request when the test needs API calls to use the same cookie state as a particular browser context. Playwright documents these as the same APIRequestContext instance, and its cookie jar is shared with that context. Use playwright.request.newContext() when the API test should have its own independent cookie storage. Do not infer the choice from the variable name; check where the object was created.

This distinction matters for both authentication setup and cleanup. A response that sets a matching cookie through the shared request client updates the browser context’s cookie state. That may be useful when an API login establishes a session for later page navigation, but it also mutates the browser session. A standalone context does not automatically log the page in. If you expect browser and API state to be isolated, create a separate request context explicitly and dispose of it when finished.

Before using this on an application, write down the intended flow: “API request authenticates the browser context,” “API check reuses existing browser cookies,” or “API tests stay isolated.” Those are different test contracts. Avoid silently sharing cookies across tests or between two human accounts.` },
				{ heading: "Reproduce the boundary with a local page", body: `A safe minimal reproduction needs no production account. Start a synthetic HTTP server on 127.0.0.1 with two routes: /set-cookie returns a test-only Set-Cookie header, and /whoami returns the cookie value it received. Launch a fresh Chromium browser and create one context. Call /set-cookie using context.request, then visit /whoami in the page; the page should see the synthetic cookie if its name, domain, path and security attributes match the loopback origin. Call the same route with an independent request.newContext() and confirm its cookie jar is separate.

Keep the test local and use a non-sensitive token such as demo-session=local-only. Do not import cookies from a personal browser or copy a production storage-state file into the fixture. Use a fresh context for each branch so an earlier cookie cannot make an isolated request appear authenticated. Close each APIRequestContext if you created it, then close the browser context, browser and local server in a finally block.

If you need a new local fixture, implement only those routes and assertions. The point is to show whether cookies were shared; do not claim that this reproduces your app’s login, CSRF defenses, SameSite policy, or session expiry unless you add and separately verify those behaviors.` },
				{ heading: "Understand what cookie sharing does not share", body: `An APIRequestContext is not a second browser tab. Cookie sharing does not synchronize localStorage or sessionStorage and does not run the page’s JavaScript. If an application stores its bearer token in localStorage, a standalone API request will not acquire it simply because it uses the same Playwright browser. You may need an explicit test token or a browser-side API call, with the security and test scope understood.

Cookie rules still apply. Cookies are scoped by domain and path and may be Secure or HttpOnly; the fact that two clients have a shared jar does not mean every cookie is sent to every URL. A different host, scheme or path can explain why the expected cookie is absent. HttpOnly prevents page JavaScript from reading a cookie; it does not by itself stop a matching context-associated API request from sending it. Inspect cookie attributes without printing secret values into CI logs. Playwright’s [API testing guide](https://playwright.dev/docs/api-testing) describes how the context-associated request client populates request cookies and applies Set-Cookie responses.

The browser also applies browser-specific behavior around credentials, origins and JavaScript. An APIRequestContext’s HTTP exchange is not identical to fetch executed in a page. If an endpoint relies on an origin header, CSRF token, browser storage or service worker, record that dependency instead of treating 401 as a generic cookie bug.` },
				{ heading: "Diagnose a 401 or stale session in a fixed order", body: `First log the object creation path and the request URL without credentials. Confirm whether it is browserContext.request/page.request or a standalone request.newContext(). Next compare the API request URL with the cookie’s domain, path, secure and expiry attributes. Then inspect whether the login response actually set a cookie and whether a redirect changed the host. If the app authenticates from localStorage, identify that separately.

If an API login response updated the shared jar but the page still appears logged out, check whether the page is on a matching origin and whether its UI waits for the expected user state. A cookie being present is not proof the server accepts it; the server might expire, rotate or revoke it. Conversely, a 401 from a standalone client does not show the browser has lost its session.

Avoid “fixes” that weaken the test contract: manually copying all cookies between contexts, disabling security attributes, setting a global authorization header, or reusing a real profile can hide the source of the mismatch. Prefer a new isolated context and an explicit test account per worker. If your test intentionally shares a browser login, use the context-associated client and assert the state you need through a harmless endpoint.` },
				{ heading: "Keep the example and cleanup safe", body: `Use Playwright 1.16 or later for the request-context APIs; check the installed version’s reference if a property or method is unavailable. Download [playwright-api-context-boundary.mjs](/templates/playwright-api-context-boundary.mjs) and keep that exact filename. Use Node.js 22 or newer with Playwright and matching Chromium installed. It listens only on 127.0.0.1 and uses synthetic data. Set PLAYWRIGHT_MODULE_URL to the installed Playwright module file URL and CHROME_EXECUTABLE_PATH to an installed Chrome executable only when the default module or browser cannot be resolved.

One command per step keeps setup reproducible:

- Install Playwright in an existing Node project if needed: npm install playwright
- Install the matching Chromium if needed: npx playwright install chromium
- Run the downloaded fixture from its folder: node playwright-api-context-boundary.mjs

The script should close its temporary browser contexts, request contexts, browser process and local HTTP server in a finally block. It should not save a profile or cookie file. Remove the downloaded fixture when done; the npm package and browser binary you install remain in your local project/cache. The shared fixture was run once on 2026-11-04 with Node.js 22.22.3, Playwright 1.64.1 and Chrome 156.0.8078.80. It confirmed the synthetic shared cookie appeared in the browser context, the separate request context returned an empty cookie response, and the tiny multipart case passed. This does not test localStorage, CSRF, full authentication, cookie path/domain variants or repeated fields.` },
				{ heading: "Read the fixture result at the right level", body: `The fixture sends a synthetic Set-Cookie response through the context-associated request client, then checks that the browser context can read the cookie and that a fresh standalone request context receives an empty cookie response. On the recorded run, both assertions passed. This demonstrates the cookie-jar relationship for those fixed loopback URLs; it is not a test of your app login, cookie path/domain variations, CSRF checks, localStorage, or an expired server session. If your app still returns 401, compare the exact client creation path and request origin before changing credentials. Use the report as one signal, then reproduce against a harmless endpoint in your own authorized test environment.` }
			],
			faq: [
				{ question: "Does APIRequestContext copy localStorage from the page?", answer: "No. The documented association shares cookies with the browser context. It does not synchronize localStorage, sessionStorage, IndexedDB or page JavaScript state." },
				{ question: "Why is a standalone API request unauthenticated?", answer: "A request.newContext() has its own cookie storage. Use the browser context’s request client when the test intentionally needs shared cookies, or configure a separate test identity explicitly." },
				{ question: "Can an API login log the page in?", answer: "A Set-Cookie response through the context-associated request client updates the shared cookie jar when cookie scope matches. It does not handle app-specific CSRF tokens, localStorage tokens or UI state automatically." },
				{ question: "Should I copy cookies from my normal browser profile?", answer: "No. Use synthetic or approved test accounts. Real profile cookies are credentials and can expose an account if written to logs or files." }
			]
		},
		"zh-cn": {
			title: "为什么 Playwright API 请求有时会共享浏览器 Cookie",
			description: "明确选择 Cookie 容器：page.request 与 browserContext.request 共用浏览器上下文的 Cookie，独立 API 上下文则有自己的存储。",
			category: "AI 浏览器开发指南",
			content: "Playwright 测试中的 API 请求意外返回 401 时，先确认是谁发出了请求。page.request 或 browserContext.request 对应同一个与浏览器上下文关联的 APIRequestContext，并使用该上下文的 Cookie 容器。独立创建的 request.newContext() 则拥有自己的 Cookie 存储。这个边界只说明 Cookie；它不会复制 localStorage、sessionStorage、IndexedDB、JavaScript 内存，也不会模拟所有浏览器网络规则。本指南用本地回环地址说明如何选择客户端，并避免泄露真实会话。",
			sections: [
				{ heading: "先选定请求与浏览器的关系", body: `如果测试要求 API 调用使用某个浏览器上下文中的 Cookie，就使用 page.request 或 browserContext.request。Playwright 文档说明它们是同一个 APIRequestContext 实例，并与该上下文共用 Cookie 容器。如果 API 测试需要独立的 Cookie 存储，则用 playwright.request.newContext()。不要根据变量名猜，检查对象从哪里创建。

这项选择也影响认证准备和清理。通过共享请求客户端发出的响应若设置了匹配的 Cookie，会更新浏览器上下文的 Cookie 状态。API 登录后再打开页面时这可能很有用，但也会改变浏览器会话。独立上下文不会自动让网页登录。如果希望 API 与浏览器隔离，就明确创建独立请求上下文，并在结束时释放。

开始写测试前，先写明要验证的流程：“API 登录后供浏览器上下文使用”“API 检查复用现有浏览器 Cookie”或“API 测试保持隔离”。这三种测试契约不同。不要让多个测试或两个用户账号无意间共用 Cookie。` },
				{ heading: "用本地页面复现 Cookie 边界", body: `最小复现不需要生产账号。建立一个只监听 127.0.0.1 的模拟 HTTP 服务，提供两个地址：/set-cookie 返回测试用 Set-Cookie，/whoami 返回收到的 Cookie 值。启动一个全新的 Chromium 浏览器和上下文，通过 context.request 请求 /set-cookie，再用页面访问 /whoami。如果名称、域名、路径和安全属性匹配回环地址，页面应能看到这个合成 Cookie。再用独立 request.newContext() 请求同一地址，确认它的 Cookie 容器彼此隔离。

只使用 demo-session=local-only 这样的合成值，不要导入个人浏览器 Cookie，也不要把生产 storage-state 文件复制进夹具。每条分支用新上下文，避免旧 Cookie 让隔离请求看起来也已登录。若自己编写小夹具，在 finally 中依次关闭创建的 APIRequestContext、浏览器上下文、浏览器和本地服务器。

这个复现只证明 Cookie 是否共享。除非另外实现并核验，否则不能声称它覆盖了你应用的登录、CSRF、防跨站请求策略、会话过期或其他认证流程。` },
				{ heading: "Cookie 共享不代表同步所有网页状态", body: `APIRequestContext 不是第二个浏览器标签页。共享 Cookie 不会同步 localStorage 或 sessionStorage，也不会运行页面脚本。如果应用把 Bearer token 放在 localStorage，独立 API 请求不会因为用了同一个 Playwright 浏览器就自动获得它。可能需要专用测试令牌或在页面上下文中调用 API，但要先明确安全和测试范围。

Cookie 规则仍然适用。Cookie 会受域名、路径、Secure、HttpOnly 和过期时间限制；共用一个容器也不意味着每个网址都会发送每个 Cookie。主机、协议或路径不同，都可能导致期望的 Cookie 不匹配。检查属性时不要把秘密值写进 CI 日志。[Playwright API 测试指南](https://playwright.dev/docs/api-testing)说明上下文关联客户端如何填充请求 Cookie，以及如何应用 Set-Cookie 响应。

浏览器还会处理凭据、来源和 JavaScript 等浏览器行为。APIRequestContext 的 HTTP 请求与网页里的 fetch 并不完全相同。如果接口依赖 Origin、CSRF 令牌、浏览器存储或 Service Worker，应单独记录这些条件，不要把 401 一概归为 Cookie 问题。` },
				{ heading: "按固定顺序排查 401 或旧会话", body: `先记录对象创建方式和请求网址，不记录凭据。确认使用的是 browserContext.request/page.request 还是独立 request.newContext()。然后检查 API 地址是否匹配 Cookie 的域名、路径、安全属性和过期时间。再确认登录响应是否真的设置了 Cookie，重定向后主机名是否变化。如果应用使用 localStorage 认证，也单独标明。

如果 API 登录响应更新了共享容器，但页面仍显示未登录，确认页面是否处于匹配来源，以及 UI 是否已经渲染预期用户状态。Cookie 存在不代表服务器一定接受它；服务器可能已让会话过期、轮换或撤销。反过来，独立客户端返回 401，也不说明浏览器会话已经失效。

不要靠破坏测试契约来“修复”：跨上下文手动复制所有 Cookie、关闭安全属性、全局设置授权头或复用真实配置文件，都会掩盖问题。优先给每个并行工作单元使用新的隔离上下文和明确的测试身份。如果测试本来就要复用浏览器登录态，就使用上下文关联客户端，并通过无副作用接口断言所需状态。` },
				{ heading: "安全运行与清理", body: `Playwright 1.16 起提供相关请求上下文与 Cookie 共享 API；如果某个属性不可用，应查看项目安装版本对应的 API 文档。下载[playwright-api-context-boundary.mjs](/templates/playwright-api-context-boundary.mjs)，保留准确文件名。需要 Node.js 22 或更新版本、Playwright 和匹配的 Chromium。夹具只监听 127.0.0.1 并使用合成数据。若默认模块或浏览器无法解析，可设置 PLAYWRIGHT_MODULE_URL 为已安装 Playwright 模块的文件 URL，并设置 CHROME_EXECUTABLE_PATH 为已安装 Chrome 的可执行文件路径。

每条命令单独运行：

- 在已有 Node 项目缺少依赖时安装：npm install playwright
- 缺少匹配 Chromium 时安装：npx playwright install chromium
- 运行保存好的夹具：node playwright-api-context-boundary.mjs

脚本在 finally 中关闭创建的请求上下文、浏览器上下文、浏览器进程和本地 HTTP 服务，不写入配置文件或 Cookie 文件。HttpOnly 限制页面 JavaScript 读取 Cookie，不代表匹配的上下文关联 API 请求不会发送该 Cookie。用完可删除下载的夹具；安装的 npm 依赖和浏览器仍留在本地项目或缓存里。该共享夹具已于 2026-11-04 使用 Node.js 22.22.3、Playwright 1.64.1 和 Chrome 156.0.8078.80 运行一次。合成共享 Cookie 在浏览器上下文中可见，独立请求上下文返回空 Cookie 响应，微型 multipart 案例通过。此结果不覆盖 localStorage、CSRF、完整认证、Cookie 路径/域名变体或同名重复字段。若还要测试并行用户角色之间的隔离，可参阅[多角色与权限测试指南](/zh-cn/guides/playwright-test-multiple-roles-permissions/)。` },
				{ heading: "如何解释夹具输出而不过度推断", body: `夹具通过上下文关联请求客户端发送合成 Set-Cookie 响应，再检查浏览器上下文能否读到该 Cookie，以及新建的独立请求上下文是否收到空 Cookie 响应。记录的运行中两项断言都通过。这只说明固定回环地址下的 Cookie 容器关系；它没有测试你的应用登录、Cookie 路径或域名变体、CSRF、localStorage 或服务端会话过期。如果应用仍返回 401，先对照客户端创建方式和请求来源，再考虑凭据问题。可把该结果当作一个边界信号，并在获准的测试环境中用无副作用接口复现。` }
			],
			faq: [
				{ question: "APIRequestContext 会复制页面的 localStorage 吗？", answer: "不会。文档说明关联请求上下文共享 Cookie，但不会同步 localStorage、sessionStorage、IndexedDB 或页面脚本状态。" },
				{ question: "为什么独立 API 请求没有登录态？", answer: "request.newContext() 有自己的 Cookie 存储。确实要共享 Cookie 时用浏览器上下文的请求客户端，否则为 API 显式配置独立测试身份。" },
				{ question: "API 登录后能让页面自动登录吗？", answer: "通过上下文关联客户端返回的 Set-Cookie 在匹配范围内会更新共享容器，但不会自动处理应用的 CSRF、localStorage 令牌或界面状态。" },
				{ question: "可以复制个人浏览器配置里的 Cookie 吗？", answer: "不应这样做。使用合成或获批的测试账号。真实 Cookie 是凭据，写入日志或文件可能暴露账号。" }
			]
		}
	},
	"playwright-api-request-context-multipart-upload": {
		en: {
			title: "Send a Multipart File with Playwright APIRequestContext",
			description: "Build the multipart body with FormData or a file payload, let Playwright generate the boundary, and verify each received part in a local fixture.",
			category: "AI browser developer guides",
			content: "An API upload test is not the same operation as selecting a file in a browser page. Playwright’s APIRequestContext sends an HTTP request whose body can contain multipart form fields; page.setInputFiles instead exercises an HTML file input and the application’s UI flow. Mixing the two can leave a test that checks the wrong contract. This guide focuses on the API boundary: use the multipart option, represent files with the documented shape or FormData, let Playwright set the multipart boundary, and assert the server received the expected field name, filename, content type and bytes. For UI behavior, use the existing [browser-agent file-upload guide](/en/guides/browser-agent-upload-files/).",
			sections: [
				{ heading: "Choose an API contract or a browser upload test", body: `Use APIRequestContext multipart when the test is about a server endpoint accepting multipart/form-data, such as an import API or a test fixture setup route. Use page.locator('input[type=file]').setInputFiles() or a FileChooser when you need to verify the user-facing upload control, validation message, progress state, or page result. A successful API request does not prove that the UI can choose, submit, or display a file correctly.

Playwright documents the multipart option for APIRequestContext and accepts file-like values with name, mimeType and buffer, as well as ReadStream or FormData. A buffer stores the complete test contents in memory; this guide makes no streaming or performance claim. For one named file and a few text fields, a plain object can be clear. If repeated fields with the same name matter, use FormData.append so each part is represented; duplicate keys in a JavaScript object overwrite one another before Playwright sees them. The [APIRequestContext reference](https://playwright.dev/docs/api/class-apirequestcontext) documents the supported shapes and example.

Do not hand-set Content-Type to multipart/form-data. The serializer must add a boundary parameter that matches the body; if you override the header without that boundary, many servers cannot parse the request. Let Playwright build the header from the multipart option unless your server contract explicitly requires another supported format.` },
				{ heading: "Build a small deterministic payload", body: `For a tiny synthetic file, use an in-memory payload with a known filename, MIME type and contents. Playwright accepts a ReadStream file value too, but this guide does not measure or claim its memory or network behavior. A buffer is held in memory; it is not a streaming upload. Do not put a private document or a production user’s file into a fixture just to test serialization.

For example, the documented object shape is conceptually a field named attachment whose value has name, mimeType and buffer properties. With FormData, append text and file values using their exact field names; appending the same name more than once produces multiple parts. Avoid logging the full body because it may contain file contents or credentials. If a test requires a large file, record its expected size and hash separately and confirm the chosen API method’s memory behavior before scaling it up.

The request should target a local synthetic endpoint that records the parsed field names, filenames, content types and byte counts. Return a small JSON summary rather than echoing the file body. That makes failures observable without retaining uploaded contents.` },
				{ heading: "Run a loopback-only multipart fixture", body: `Download [playwright-api-context-boundary.mjs](/templates/playwright-api-context-boundary.mjs) and keep that exact filename. It needs Node.js 22 or newer, a Node project with Playwright and matching Chromium already installed, or set PLAYWRIGHT_MODULE_URL to the installed module’s file URL and CHROME_EXECUTABLE_PATH to an installed Chrome executable. It starts a loopback-only server, sends a text field and one small synthetic file, and checks the actual received field names, filename, MIME type, byte count and SHA-256 against the sent bytes. Its small parser only covers this fixed synthetic payload; it is not a general-purpose multipart parser. The buffer payload is held in memory. It does not test repeated file fields, arbitrary binary data, browser UI upload, or large-file streaming performance.

Keep the fixture narrow: do not contact an external API, write uploaded files to a permanent location, or exercise a real browser profile. If disk storage is necessary for a parser, write to a temporary directory and remove it in finally. Close the HTTP server, APIRequestContext and Playwright browser even when an assertion fails. Include a cleanup assertion or remove the temporary directory after the request finishes.

Use separate setup commands and keep the exact filename:

- Install Playwright in an existing Node project if needed: npm install playwright
- Install matching Chromium if needed: npx playwright install chromium
- Run the downloaded fixture from its folder: node playwright-api-context-boundary.mjs

The fixture also covers the cookie-sharing boundary described in the related [API cookie-sharing guide](/en/guides/playwright-api-request-context-cookie-sharing/). BrowserHub ran this fixture once on 2026-11-04 with Node.js 22.22.3, Playwright 1.64.1 and Chrome 156.0.8078.80. The local server received label and attachment/sample.txt as text/plain, 20 bytes; its SHA-256 matched the sent bytes and the multipart boundary was present. This does not test repeated fields, arbitrary binary input, a general multipart parser, browser UI upload or streaming performance. The script writes no temporary files and closes its request contexts, browser context, browser process and local server in a finally block. Delete the downloaded script when finished; installed npm packages and browser binaries remain in the project/cache.` },
				{ heading: "Debug malformed requests without guessing", body: `If the server returns 400 or says no file was received, check the endpoint’s expected field name first. A backend expecting file may not accept attachment; a backend expecting an array may require repeated parts under files. Confirm whether the server parser expects one or multiple files and which text fields are mandatory. Inspect the boundary in the request header and verify that the raw request body was built by Playwright rather than replaced by a manually assembled buffer.

Check the response body and status explicitly. APIRequestContext returns responses for non-2xx statuses by default unless you ask it to fail, so a fulfilled promise alone does not prove the upload was accepted. Assert the expected status, parsed filename and content length. Keep transport errors, HTTP status failures, and application-level validation messages distinct in the test report.

Do not call a 400 a Playwright bug until a minimal local endpoint shows the same failure. Older language-binding issues may describe earlier APIs; the current Node reference takes precedence. In particular, a Python issue about multiple files in one field is not proof that the current Node API cannot accept repeated FormData entries.` },
				{ heading: "Keep file payloads and cleanup honest", body: `A file-like buffer is convenient for a small fixture but stores its content in memory. Playwright accepts a ReadStream file value too, but this guide does not measure or claim its memory or network behavior. Do not promise constant-memory uploads without measuring the relevant implementation. Avoid using a real profile, credentials, production endpoint, or user file in a self-contained reproduction.

After the request, remove any temporary file or directory and close the API client and server in finally. If the file contents are not needed for the assertion, keep only metadata and byte count. If the application saves uploads, write to an isolated temporary test location and remove that location even if parsing or response assertions fail. Never leave test uploads in a production bucket or user account.

This article is about the API request layer. For the UI file picker flow, use the existing [browser-agent upload guide](/en/guides/browser-agent-upload-files/); for an HTML dropzone, use the relevant Playwright locator API and test the interaction separately.` },
				{ heading: "Interpret the fixture response", body: `The recorded server response lists the text field label and the file field attachment, filename sample.txt, MIME type text/plain and a 20-byte payload. The reported SHA-256 matched the sent buffer and the header contained a multipart boundary. If your server reports a different field name or byte count, compare its endpoint contract with the serialized parts before changing the client. A 2xx response alone does not prove that the intended file was parsed; inspect the server’s parsed result. This fixed parser accepts only the tiny synthetic sample, so use your framework’s supported parser for application tests and do not treat this fixture as a general multipart conformance check.` }
			],
			faq: [
				{ question: "How do I upload a file with APIRequestContext?", answer: "Use its multipart option with a documented file-like value or a FormData object. Verify the endpoint’s exact field name and assert the response." },
				{ question: "How do I send two files under the same field name?", answer: "Use FormData.append for each file part. A JavaScript object cannot preserve duplicate property keys." },
				{ question: "Why should I not set Content-Type manually?", answer: "The multipart body needs a matching boundary parameter in the header. Let Playwright serialize the multipart option and construct the header." },
				{ question: "Does this test the page’s file picker?", answer: "No. It tests an API endpoint. Use setInputFiles or FileChooser to test the browser UI upload path." }
			]
		},
		"zh-cn": {
			title: "用 Playwright APIRequestContext 发送 multipart 文件",
			description: "通过 FormData 或文件对象构造 multipart 请求，让 Playwright 生成 boundary，并在本地夹具验证每个字段。",
			category: "AI 浏览器开发指南",
			content: "API 上传测试与在浏览器页面选择文件不是同一个操作。Playwright 的 APIRequestContext 发送包含 multipart/form-data 字段的 HTTP 请求；page.setInputFiles 测试的是 HTML 文件输入框和应用界面流程。混用两者会让测试检查错误的层次。本指南专注 API 边界：使用 multipart 选项，按文档格式提供文件对象或 FormData，让 Playwright 生成 multipart boundary，并断言服务端收到的字段名、文件名、内容类型和字节数符合预期。若要测试界面上传，请参考[浏览器智能体文件上传指南](/zh-cn/guides/browser-agent-upload-files/)。",
			sections: [
				{ heading: "先确定测 API 还是浏览器上传界面", body: `如果测试目标是服务端接收 multipart/form-data，例如导入接口或测试数据准备接口，用 APIRequestContext。如果要验证用户上传控件、校验提示、进度状态或页面结果，就用 page.locator('input[type=file]').setInputFiles() 或 FileChooser。API 请求成功不能证明页面选文件、提交或展示结果正常。

Playwright 的 APIRequestContext 支持 multipart 选项，文件对象可使用 name、mimeType 和 buffer，也接受 ReadStream 或 FormData。buffer 会将完整测试内容保存在内存中，本文不对流式处理或性能作结论。只有一个文件和少量文本字段时，普通对象可能更直观。如果需要多个同名字段，应使用 FormData.append；JavaScript 对象里重复写同一个键会在 Playwright 收到之前被覆盖。可查看 [APIRequestContext 参考](https://playwright.dev/docs/api/class-apirequestcontext)确认格式。

不要自行把 Content-Type 设为 multipart/form-data。序列化器必须附加与正文匹配的 boundary 参数；如果手动覆盖却没带 boundary，许多服务端无法解析请求。通常应让 Playwright 根据 multipart 选项构造请求头，除非接口协议明确要求其他受支持的格式。` },
				{ heading: "构造小型且确定的测试数据", body: `微型合成文件可以放在内存缓冲区中，并提供固定文件名、MIME 类型和内容。Playwright 也接受 ReadStream 文件值，但本文没有测量或判断它的内存和网络行为。缓冲区会把内容保留在内存中，不是流式上传。不要为了测试序列化而把私人文档或生产用户文件放进夹具。

文档中的对象形式可以理解为：字段 attachment 的值包含 name、mimeType 和 buffer。使用 FormData 时，按服务端要求的字段名逐项添加文本和文件；同名多次 append 会生成多个部分。不要打印完整请求正文，因为里面可能有文件内容或凭据。如果测试必须使用大文件，扩展前先记录预期字节数和哈希，并确认所选 API 的内存行为。

请求应发往本地模拟接口。接口解析 multipart 后，只返回字段名、文件名、MIME 类型和字节数等 JSON 摘要，不回显文件正文。这样出错时看得见差异，也不会留下上传文件副本。` },
				{ heading: "运行仅限回环地址的 multipart 夹具", body: `下载[playwright-api-context-boundary.mjs](/templates/playwright-api-context-boundary.mjs)，并保留准确文件名。该小型固定用途夹具只监听 127.0.0.1，以 Node.js 本地服务接收合成的文本字段和一个文件，返回接收字段、文件名、MIME 类型、字节数与 SHA-256，并检查 Content-Type 中存在 boundary。它的解析逻辑只适用于该固定数据，不是通用 multipart 解析器，也不测试同名重复字段。运行需要 Node.js 22 或更新版本、Playwright 和匹配的 Chromium。默认模块或浏览器不可用时，可设置 PLAYWRIGHT_MODULE_URL 为安装模块的文件 URL，以及 CHROME_EXECUTABLE_PATH 为已安装 Chrome 的可执行文件路径。

夹具范围应保持有限：不连接外部 API、不把上传文件永久保存，也不使用真实浏览器配置文件。如果解析器必须写磁盘，就写入临时目录，并在 finally 中删除。即使断言失败，也要关闭 HTTP 服务、APIRequestContext 和 Playwright 浏览器。

按步骤分别执行命令并保留准确文件名：

- 在已有 Node 项目中安装 Playwright（夹具无需额外 multipart 解析器）：npm install playwright
- 缺少匹配 Chromium 时安装：npx playwright install chromium
- 运行保存的夹具：node playwright-api-context-boundary.mjs

该夹具也覆盖[API Cookie 共享指南](/zh-cn/guides/playwright-api-request-context-cookie-sharing/)中说明的边界。BrowserHub 于 2026-11-04 使用 Node.js 22.22.3、Playwright 1.64.1 和 Chrome 156.0.8078.80 运行一次。服务端收到 label 与 attachment/sample.txt（text/plain，20 字节）；SHA-256 与发送内容一致，Content-Type 中存在 boundary。这只是一个微型合成数据，不是通用解析器、重复字段、任意二进制、浏览器界面或流式性能测试。脚本不会写入临时文件，并在 finally 中关闭请求上下文、浏览器上下文、浏览器进程和本地服务。用完请删除下载的脚本；已安装依赖与浏览器仍留在项目或缓存中。` },
				{ heading: "排查格式错误，不要靠猜", body: `如果服务端返回 400 或没有收到文件，先检查接口要求的字段名。后端可能期待 file 而不是 attachment，也可能要求多个文件用 files 这个字段名重复发送。确认服务端解析器期待一个文件还是多个文件，以及哪些文本字段是必填项。检查请求头中的 boundary，并确认正文由 Playwright multipart 序列化，而不是被你手写的 buffer 覆盖。

显式检查状态码和响应正文。除非配置为遇到错误即失败，否则 APIRequestContext 默认会返回非 2xx 响应；Promise 正常完成不等于服务器接受了文件。断言预期状态、解析出的文件名和字节长度，并在报告中区分网络错误、HTTP 状态错误和应用校验消息。

在最小本地接口也复现失败前，不要直接认定这是 Playwright 缺陷。旧语言绑定的问题可能描述的是早期 API，当前 Node 文档才是判断 Node 用法的依据。Python 关于同字段多文件的 issue，也不能证明现在的 Node API 无法接受重复 FormData 条目。` },
				{ heading: "准确说明文件内存和清理行为", body: `小型夹具使用 buffer 很方便，但文件内容会占用内存。Playwright 也接受 ReadStream 文件值，但本文没有测量或判断它的内存和网络行为。没有测量时不要承诺上传过程始终保持固定内存占用。自包含复现不要使用真实配置文件、凭据、生产接口或用户文件。

请求结束后，在 finally 中移除临时文件或目录，并关闭 API 客户端和本地服务。断言不需要正文时只保留元数据和字节数。如果应用会保存上传文件，应使用隔离的临时位置，并确保解析或断言失败时同样会删除。测试上传不要留在生产对象存储或真实用户账户里。

本文讨论 API 请求层。若要测试页面文件选择，请参考现有的 [浏览器智能体文件上传指南](/zh-cn/guides/browser-agent-upload-files/)；若要测试 HTML 拖放区域，应另行核对对应 Playwright locator API 和交互流程。` },
				{ heading: "解释夹具响应", body: `记录的服务端响应包含文本字段 label、文件字段 attachment、文件名 sample.txt、MIME 类型 text/plain 和 20 字节正文。报告中的 SHA-256 与发送缓冲区一致，请求头中也有 multipart boundary。如果你的服务端返回了不同字段名或字节数，先对照接口约定和实际序列化部分，再决定是否修改客户端。仅收到 2xx 不能证明服务端解析了预期文件，还要检查解析结果。此固定解析器只处理这份微型合成数据；应用测试应使用框架支持的解析器，也不要把夹具当成通用 multipart 一致性测试。` }
			],
			faq: [
				{ question: "怎样用 APIRequestContext 上传文件？", answer: "使用 multipart 选项和文档支持的文件对象或 FormData。先确认接口字段名，再断言服务器响应。" },
				{ question: "如何在同名字段下发送两个文件？", answer: "对每个文件调用 FormData.append。JavaScript 对象无法保留重复属性键。" },
				{ question: "为什么不能手动设置 Content-Type？", answer: "multipart 正文需要与请求头中的 boundary 一致。让 Playwright 对 multipart 选项进行序列化并构造请求头。" },
				{ question: "这会测试页面文件选择器吗？", answer: "不会。它测试 API 接口。要测浏览器界面上传，应使用 setInputFiles 或 FileChooser。" }
			]
		}
	},
	"ai-browser-trace-github-issue-to-released-fix": {
		en: {
			title: "Use an AI Browser to Trace a GitHub Issue to a Released Fix",
			description: "Follow an issue through its linked pull request, merged commit, release tag and installed package version without treating “closed” as “shipped.”",
			category: "AI browser developer guides",
			content: "A GitHub issue can be closed because a change was merged, a duplicate was filed, or the report was declined. Even when a pull request merged, a library package may not yet include the change in a published release. Developers often need a practical answer to a narrower question: which version contains this fix, and does the version I run include it? An AI browser can gather the evidence across an issue tracker, code review, release page and package registry. This workflow keeps each link and version claim visible, and marks the result unknown when the repository does not expose a reliable chain.",
			sections: [
				{ heading: "Define the version question before searching", body: `Start with a specific decision: are you checking whether a fix merged, which release first contains it, whether a backport shipped to a maintenance branch, or whether your project already uses that version? Those questions need different evidence. Do not ask an agent simply “is this fixed?” because a closed issue is not proof of a released package.

Give the browser agent a public issue URL and ask it to produce a small evidence chain: issue state and reason, linked pull request(s), target branch and merge state, merge commit or release reference, tag/version, package publication if relevant, and your project’s installed version. Keep repository, package name, language binding and platform in the request. A fix in one binding or branch may not appear in another package or release stream.

Use only public repository data or repositories you are authorized to access. Do not paste a private GitHub token into a browser form or ask the agent to modify dependencies, open a pull request or publish a release. This task is read-only research; the human maintainer decides whether to upgrade. For capturing a failing browser case before investigating a release, see the [debugging trace guide](/en/guides/browser-agent-debugging-traces/).` },
				{ heading: "Follow issue, pull request and commit links", body: `Open the issue and look for the linked pull request in its development or timeline section. GitHub documents that supported closing keywords link an issue to a pull request, and merging a linked pull request into the default branch commonly closes the issue. But repositories can disable auto-close behavior, use manual links, close reports as duplicates or not planned, and merge work to a branch other than the default. Record what the page says rather than inferring a link from the issue state.

Open each candidate pull request and verify whether it is actually merged, which branch accepted it, and which commit contains the change. A pull request can close or reference several issues. A commit message may close an issue without the pull request being listed as a linked item. If the issue points to a tracking ticket, a follow-up pull request, or a backport, record the chain and do not stop at the first merged change.

The chain should be explicit: issue → pull request → merged commit. If the issue is closed with no linked implementation, write “closed; no release path verified.” If a pull request is open, draft, or merged to an unexpected branch, write that state and stop. Do not turn an issue label such as fixed or completed into a version number.` },
				{ heading: "Verify the first release that contains the change", body: `After confirming the merged commit, inspect the repository’s release page and tags. GitHub releases are based on Git tags that mark a point in repository history; the release date and tag date can differ. Read the release notes and inspect the target tag or commit. A PR title appearing in generated notes is useful evidence, but release-note text can be incomplete, customized or generated using repository-specific rules.

For a stronger check, compare the merged change with the release tag’s history. Squash merges and rebases can replace the original commit SHA, so absence of that SHA does not prove that the fix is absent; follow the merged PR’s resulting commit or compare the relevant source diff. A cherry-pick or backport creates another commit on a maintenance branch, so check the branch relevant to the installed version. If a later revert follows the change, ancestry alone is not enough. If the project publishes npm, PyPI or another package, inspect that registry’s version and release metadata too. A GitHub tag can exist without a corresponding package being published, and a registry package may use a different versioning scheme or release branch. The repository’s official release notes and package registry are separate records; keep both when the question is about what users can install.

When available, GitHub’s issue sidebar can show the first release that shipped a linked pull request, with a stable or pre-release badge, as described in the [GitHub Changelog](https://github.blog/changelog/2026-04-09-release-info-in-issue-sidebar-and-project-defaults/). Treat it as a pointer and verify the release tag, particularly when backports or multiple release lines exist. A missing entry can reflect an unlinked PR or unavailable project data, so it does not prove the fix was never published. Some projects provide a changelog, release API or commit-containment tool; record which one you used. If tags are incomplete or no public source ties the change to a tag or package version, mark the first released version unknown rather than guessing from dates.` },
				{ heading: "Check the version installed in the project", body: `A fix being released does not mean your application is using it. Check the project’s lockfile, package manager output, build manifest, or runtime version report for the exact package and version. Then compare it with the release evidence. A declared range such as ^1.2.0 is not the same as the version actually resolved in a lockfile. A global install, container image, plugin bundle, or transitive dependency may resolve a different copy.

For Node packages, inspect the lockfile or run the project’s package-manager command that reports the installed dependency. For Python, distinguish the distribution name from its import name and use the active environment. For a browser automation framework with separate language packages, verify the package used by the running tests, not a similarly named package in another language. If the repository publishes a canary or prerelease channel, do not present it as the stable release; label the channel and confirm the installed version.

Record four fields: first version confirmed to contain the fix, release channel, currently resolved project version, and evidence date. If your project is pinned to an older major version while the fix only appears in a newer major, the merge does not mean your current dependency can pick it up automatically. Ask the maintainers about a backport rather than silently widening a version range.` },
				{ heading: "Handle duplicates, backports and ambiguous release notes", body: `A closed duplicate may point to the canonical issue; follow that reference before looking for code. A pull request merged to the default branch may not have been released. A backport can have a different pull request and commit on a maintenance branch, so check every supported branch relevant to the installed version. Reopened issues or revert commits may invalidate an earlier “fixed” claim.

If the release notes mention a broad feature but do not identify the issue or commit, inspect the tag’s commit history or source diff. Do not claim the fix is included merely because a release date falls after the merge date: the change may have been omitted, reverted, or released only on another branch. Likewise, a commit reachable from a tag may still need an actual registry publication before package users can install it.

If links are missing or the project has no public release trail, report the strongest confirmed step and stop there. For example: “PR 123 merged to main; no published release containing the commit was found on [date].” That is more useful than inventing certainty. Maintainer comments, automated issue labels and third-party release trackers can help locate evidence, but prefer the repository’s release record and package registry for the final answer.` },
				{ heading: "Use a trace table and review every link", body: `Ask the agent for one row per stage and a direct source URL. A useful output has these columns:

| Stage | Evidence | Status to report |
| --- | --- | --- |
| Issue | URL, state and closure reason | Open, closed as duplicate, completed, not planned, or unclear |
| Pull request | URL, target branch and merge state | Open, draft, merged, closed without merge |
| Commit | SHA and branch ancestry | Identified, not found, or uncertain |
| Release | Tag, release notes and date | Stable, prerelease, backport, or not found |
| Package | Registry version and publication | Published or not verified |
| Installed project | Resolved version from lockfile/runtime | Includes fix, older, different channel, or unknown |

Click each hop instead of relying only on snippets. Compare issue and PR identifiers, branch names, commit hashes and version labels. A browser agent can misread “closed” or confuse a merged pull request with a release. Check the last step yourself before recommending an upgrade or telling a user that a bug is fixed.` },
				{ heading: "Worked source example: treat a community report as a lead", body: `A [Playwright community discussion](https://www.reddit.com/r/Playwright/comments/1tsyddy/playwright-browsers-freezing-github-actions/) reports that one user’s browser-install problem stopped after switching to the official Playwright Docker image and Playwright 1.60.0; the author links issue 40998. This is an author report involving both changes, not a controlled reproduction or official compatibility statement. Use it only as a lead: open the issue, inspect linked implementation work, then check the official Playwright release notes for the relevant version and the package registry for the published package. The official [Playwright release notes](https://playwright.dev/docs/release-notes) show versioned entries, while the current [GitHub issue page](https://github.com/microsoft/playwright/issues/40998) shows its own status and links.

Do not infer that every browser-install delay requires 1.60.0, that the issue’s closure proves a stable package fixed every environment, or that a reported workaround applies to your OS and CI image. The actual project still needs an exact installed-version check and a reproduction under its own conditions. This example demonstrates how a report becomes a research lead; BrowserHub has not run that reported failure or verified the community author’s environment.` },
				{ heading: "What to do when no public release evidence exists", body: `Report the chain’s last confirmed state: issue closed, PR open, PR merged to main, commit present in a tag, package version published, or exact installed version inspected. Do not skip missing links. Ask the maintainer through the project’s normal issue process only if you are authorized and want to contact them; this guide does not send messages or file reports.

The status “merged, not yet released” is a valid answer. So is “release exists, but no evidence ties this commit to it.” Preserve the date and URLs because release trails change. When a stable release arrives, repeat the tag and registry checks before changing a dependency. A version comparison tool can speed up discovery, but verify its answer against the repository tag and registry before using it for a production decision.` }
			],
			faq: [
				{ question: "Does a closed GitHub issue mean the bug is fixed in a release?", answer: "No. It may be a duplicate, not planned, or closed after a merge that has not shipped. Follow the issue to implementation and release evidence." },
				{ question: "Does a merged pull request mean npm or PyPI has the fix?", answer: "No. A merge updates repository history. Check the project’s release tag and the package registry publication separately." },
				{ question: "How do I know if my app uses the fixed version?", answer: "Inspect the resolved package version in the lockfile or active runtime, then compare it with the release that contains the change. A version range alone is not the resolved version." },
				{ question: "What if I cannot find a release containing the commit?", answer: "Report the last verified step and mark the released version unknown. Do not infer it from the issue status or merge date." }
			]
		},
		"zh-cn": {
			title: "用 AI 浏览器追踪 GitHub 问题对应的已发布修复版本",
			description: "从 issue 查到关联 PR、合并提交、发布标签和项目实际安装版本，不把“已关闭”误当作“已发布”。",
			category: "AI 浏览器开发指南",
			content: "GitHub issue 可能因为代码已合并、重复报告或维护者不采纳而关闭。即使 PR 已经合并，软件包也可能尚未包含这项改动。开发者真正要确认的是：哪个版本包含此修复，我运行的版本是否已经包含？AI 浏览器可以跨 issue、代码审查、发布页和包仓库整理证据。本流程保留每一条链接与版本依据；如果项目没有可靠的公开链路，就标记为未知。",
			sections: [
				{ heading: "先明确要查哪一个版本问题", body: `先说明具体决策：要确认修复是否合并、首次出现在哪个版本、维护分支是否收到回移，还是当前项目是否已经使用该版本？这些问题需要不同证据。不要只问智能体“修好了吗”，因为 issue 关闭不能证明软件包已经发布。

给浏览器智能体一个公开 issue 网址，让它整理一条证据链：issue 状态与关闭原因、关联 PR、目标分支与合并状态、合并提交或发布引用、标签/版本、相关软件包发布记录，以及当前项目安装版本。补充仓库、包名、语言绑定和平台。一个语言绑定或分支的修复，不一定会出现在其他包或发布线里。

只读取公开仓库，或你获准访问的私有仓库。不要把私有 GitHub token 粘贴到浏览器表单，也不要让智能体修改依赖、开 PR 或发布版本。这是只读研究任务；是否升级由维护者决定。复现浏览器故障时可先参考[调试追踪指南](/zh-cn/guides/browser-agent-debugging-traces/)。` },
				{ heading: "沿 issue、PR 与提交逐级核对", body: `打开 issue，在开发信息或时间线中查找关联 PR。GitHub 文档说明，PR 描述中的特定关闭关键词可以关联 issue；关联 PR 合并到默认分支后，通常会关闭对应 issue。但仓库管理员可以关闭自动关闭功能，也可能手动关联、把报告标为重复或不计划修复，或者将 PR 合入其他分支。按页面实际显示记录，不要从 issue 状态推断实现路径。

打开候选 PR，确认它是否真正合并、进入了哪个分支，以及具体提交是什么。一个 PR 可以关联多个 issue；提交说明也能关闭 issue，但 PR 可能不会显示为关联项目。如果 issue 指向跟踪任务、后续 PR 或回移 PR，就把每一跳都记录下来，不要停在第一个已合并的改动。

证据链要写清楚：issue → PR → 合并提交。如果 issue 关闭但没有关联实现，就写“已关闭；未核实到发布路径”。PR 未合并、仍为草稿或合入了其他分支时，也应保留该状态并停止。不要把 fixed、completed 这类标签直接转换成版本号。` },
				{ heading: "核对包含改动的首个发布版本", body: `确认合并提交后，再查仓库发布页和标签。GitHub Release 基于 Git tag；tag 标记仓库历史中的一个点，标签日期可能与 Release 日期不同。阅读发布说明并检查目标 tag 或提交。PR 标题出现在自动生成的说明中有参考价值，但说明可能不完整、经过自定义或受仓库规则影响。

更有力的核验方法是比较合并提交与发布 tag 的历史。如果项目向 npm、PyPI 或其他包仓库发布，还要查对应 registry 的版本和发布元数据。GitHub 有 tag 不代表包已经上传；registry 包也可能使用不同的版本方案或维护分支。仓库发布记录与包仓库记录是两份信息；问题涉及用户可安装版本时，应分别保留。

Squash merge 或 rebase 可能改写提交 SHA，因此在 tag 中找不到 PR 原始 SHA 不等于修复未包含；应跟踪合并后提交或比较相关源码差异。Cherry-pick 和 backport 会在维护分支生成不同提交，要检查与你安装版本对应的分支。后续 revert 也意味着提交可达性本身不能证明修复仍有效。

GitHub issue 侧栏有时会显示关联 PR 首次进入的 Release 及稳定版/预发布标记，GitHub 在 [2026 年 4 月 9 日的 Changelog](https://github.blog/changelog/2026-04-09-release-info-in-issue-sidebar-and-project-defaults/)介绍了这项信息。把它当成线索并继续检查 tag；侧栏缺项可能是未关联 PR 或项目数据不可用，不能证明修复从未发布。tag 不完整或公开资料无法连到 tag/软件包版本时，把首个发布版本标成未知，不要据日期猜测。` },
				{ heading: "检查项目当前实际安装的版本", body: `修复发布了，不代表你的应用已经使用它。通过 lockfile、包管理器输出、构建清单或运行时版本信息，确认准确的软件包和已解析版本，再与发布证据对照。依赖范围如 ^1.2.0 不等于 lockfile 中最终解析的版本。全局安装、容器镜像、插件包或传递依赖都可能加载不同副本。

Node 项目检查 lockfile，或运行当前包管理器提供的依赖解析命令。Python 要区分发行包名与 import 名，并确认使用的是哪个虚拟环境。浏览器自动化框架可能有不同语言包，核对正在运行测试所用的软件包，别把另一个语言的同名包当成证据。如果项目还提供 canary 或预发布渠道，不要把它写成稳定版；标明渠道并核对安装版本。

记录四项：确认包含修复的首个版本、发布渠道、项目当前解析版本、核验日期。如果项目锁定在旧主版本，而修复只出现在新主版本，合并并不会让当前依赖范围自动升级。需要回移时，应向维护者确认，不要静默放宽版本范围。` },
				{ heading: "处理重复报告、回移和含糊的说明", body: `如果 issue 被关闭为重复项，先沿着引用找到规范 issue。PR 合并到默认分支后可能仍未发布。回移到维护分支的 PR 和提交可能不同，因此要检查与你安装版本对应的每条支持分支。issue 重新打开或提交被回滚，也会改变先前的“已修复”判断。

如果发布说明只提到大功能、没有 issue 或提交编号，就检查 tag 的提交历史或源码差异。不能只因为发布日期晚于合并日期就断定修复已包含：改动可能被漏掉、回滚，或只发布在另一分支。反过来，提交进入 tag 历史后仍需确认包是否真正发布，用户才能安装。

如果链接缺失或项目没有公开发布链路，就报告最后确认的一步并停止。例如：“PR 123 已合入 main；截至某日，未找到包含该提交的发布版本。”这比虚构确定性有用。维护者留言、自动 issue 标签和第三方版本追踪工具可以帮助找线索，但最终结论优先依据仓库发布记录和包仓库。` },
				{ heading: "用追踪表逐个打开链接", body: `让智能体每一阶段列一行并附直接来源。输出可包含这些列：

| 阶段 | 证据 | 应报告的状态 |
| --- | --- | --- |
| Issue | 网址、状态、关闭原因 | 开放、重复、已完成、不计划修复或不明 |
| PR | 网址、目标分支、合并状态 | 开放、草稿、已合并、关闭但未合并 |
| Commit | SHA 与分支历史 | 已找到、未找到或不确定 |
| Release | 标签、发布说明和日期 | 稳定版、预发布、回移版本或未找到 |
| 软件包 | Registry 版本和发布时间 | 已发布或未核实 |
| 项目安装版 | Lockfile/运行时解析版本 | 包含修复、更旧、不同渠道或未知 |

每一跳都直接打开核对，不要只读搜索摘要。比较 issue 和 PR 编号、分支名、提交哈希和版本标签。浏览器智能体可能把“已关闭”误读成“已发布”，也可能把 PR 合并与版本发布混淆。建议升级或告诉用户缺陷已修复前，亲自检查最后一环。` },
				{ heading: "来源示例：把社区报告当成线索", body: `一条 Playwright 社区讨论称，作者改用官方 Playwright Docker 镜像和 Playwright 1.60.0 后，浏览器安装问题消失，并链接到 issue 40998。这是作者同时改变两项条件后的报告，不是受控复现或官方兼容性说明。它只能作为调查入口：打开 issue，查看关联实现工作，再检查官方 Playwright 发布说明和对应包仓库。官方 [Playwright 发布说明](https://playwright.dev/docs/release-notes)按版本列出改动，[GitHub issue 页面](https://github.com/microsoft/playwright/issues/40998)显示该报告的状态与关联链接。

不要据此推断所有浏览器安装延迟都需要 1.60.0、issue 关闭就证明所有环境都已修好，或该社区作者的处理方法适用于你的操作系统和 CI 镜像。项目仍需确认实际安装版本，并在自己的环境中复现。本文用它说明如何把报告转成调查线索；BrowserHub 没有复现此故障，也没有验证发帖者的环境。` },
				{ heading: "找不到发布证据时怎么写", body: `报告链路中最后一个已确认状态：issue 已关闭、PR 开放、PR 合入 main、提交出现在 tag、软件包版本已发布，或项目实际安装版本已核验。不要跳过缺失环节。若你获得授权且确有必要，可以按项目常用流程询问维护者；本指南不会发送消息或代为提交报告。

“已合并，尚未发布”是有效答案。“已有 Release，但没有证据证明它包含该提交”也有效。保留日期和网址，因为发布链会改变。稳定版发布后，再核对 tag 和 registry，然后决定是否更新依赖。版本比较工具可以帮助发现线索，但用于生产决策前仍要用仓库 tag 和包仓库确认。` }
			],
			faq: [
				{ question: "GitHub issue 已关闭，是否说明缺陷已进入发布版？", answer: "不是。它可能是重复项、不计划修复，或因代码合并而关闭但尚未发布。应继续追踪实现和发布证据。" },
				{ question: "PR 合并后，npm 或 PyPI 一定有修复吗？", answer: "不一定。合并更新仓库历史。还要分别核对仓库发布标签和软件包仓库是否已发布。" },
				{ question: "怎么确认应用是否正在使用修复版本？", answer: "检查 lockfile 或当前运行环境的解析版本，再与包含修复的发布记录对比。声明的版本范围不等于最终安装版本。" },
				{ question: "找不到包含提交的发布版本怎么办？", answer: "报告最后确认的一步，并把已发布版本标为未知。不要从 issue 状态或合并日期推断。" }
			]
		}
	}
};

const related: Record<string, string[]> = {
	"ai-browser-check-used-car-recalls-by-vin": ["ai-browser-research-source-verification", "ai-browser-compare-products-across-sites"],
	"ai-browser-verify-contractor-license-before-hire": ["ai-browser-research-source-verification", "ai-browser-volunteer-opportunity-shortlist"],
	"playwright-api-request-context-cookie-sharing": ["playwright-api-request-context-econnreset-retries", "browser-automation-profile-persistence", "playwright-test-multiple-roles-permissions"],
	"playwright-api-request-context-multipart-upload": ["playwright-api-request-context-econnreset-retries", "browser-agent-upload-files", "browser-agent-request-mocking-har"],
	"ai-browser-trace-github-issue-to-released-fix": ["playwright-cli-vs-mcp", "playwright-mcp-vs-chrome-devtools-mcp", "browser-agent-debugging-traces"]
};

export const aiCycleTranslations04: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;

export const aiCycleGuides04: EditorialGuide[] = Object.entries(copies).map(([slug, copy]) => ({
	...copy.en,
	slug,
	date: "2026-11-04",
	sourcePath: `src/data/ai-cycle-2026-11-04.ts#${slug}`,
	availableLocales: ["en", "zh-cn"],
	relatedBrowsers: [],
	relatedTools: [],
	sources: sourcesBySlug[slug],
	relatedGuides: related[slug]
}));
