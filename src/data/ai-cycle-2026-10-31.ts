import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sourcesBySlug: Record<string, { title: string; url: string }[]> = {
  "ai-browser-shortlist-job-postings": [
    { title: `Tom's Guide: Make ChatGPT your personal job scout`, url: "https://www.tomsguide.com/ai/job-hunting-is-exhausting-heres-how-to-make-chatgpt-your-personal-job-scout" },
    { title: `NextWork: Build a multi-board job search agent`, url: "https://nextwork.ai/projects/075b7476-8bfb-497a-b3fb-53516d1daa9a" },
    { title: `Google Search Help: Search for jobs`, url: "https://support.google.com/websearch/answer/7498276?hl=en" },
    { title: `ego(lite): AI browser automation for job hunting`, url: "https://www.egolite.ai/solutions/auto-apply-jobs" }
  ],
  "ai-browser-scholarship-eligibility-shortlist": [
    { title: `ScholarScan: AI Scholarship Finder`, url: "https://www.scholarscan.ai/" },
    { title: `PrepGPT: Scholarship finder and eligibility rules`, url: "https://prepgpt.com/features/scholarship-finder" },
    { title: `AspireOpen: How scholarship matching works`, url: "https://aspireopen.com/how-it-works/" },
    { title: `Next Scholar: AI Scholarship Finder`, url: "https://www.nextscholar.com/" },
    { title: `CareerOneStop: Scholarship Finder`, url: "https://www.careeronestop.org/toolkit/training/find-scholarships.aspx" },
    { title: `Federal Student Aid: Scholarship basics and tips`, url: "https://studentaid.gov/articles/scholarship-tips/" }
  ],
  "playwright-dynamic-combobox-option-selection": [
    { title: `W3C ARIA Authoring Practices: Combobox Pattern`, url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" },
    { title: `Playwright: Actions`, url: "https://playwright.dev/docs/input" },
    { title: `Playwright: Locators`, url: "https://playwright.dev/docs/locators" },
    { title: `r/QualityAssurance: Dropdown options sometimes don't load`, url: "https://www.reddit.com/r/QualityAssurance/comments/1juiccz/dropdown_options_sometimes_dont_load_in/" },
    { title: `r/Playwright: React dropdown click issue`, url: "https://www.reddit.com/r/Playwright/comments/1p266v1/dropdown_in_react_and_im_having_trouble/" }
  ],
  "browser-agent-diagnose-blocked-clicks": [
    { title: `Playwright: Auto-waiting and actionability`, url: "https://playwright.dev/docs/actionability" },
    { title: `GitHub: Playwright element click intercepted`, url: "https://github.com/feder-cr/invisible_playwright/wiki/playwright-element-click-intercepted" },
    { title: `ObserveOne: Playwright element is intercepted`, url: "https://www.observeone.com/community/errors/playwright/element-intercepted" },
    { title: `BrowserStack: Click, type and hover with Playwright`, url: "https://www.browserstack.com/guide/playwright-click-type" }
  ],
  "browser-agent-reveal-and-check-tooltip-help": [
    { title: `W3C ARIA Authoring Practices: Tooltip Pattern`, url: "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/" },
    { title: `MDN: ARIA tooltip role`, url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/tooltip_role" },
    { title: `Playwright MCP: Interaction and hover`, url: "https://playwright.dev/mcp/tools/interaction" },
    { title: `QABattle: Test hover tooltips without flake`, url: "https://www.qabattle.com/blog/test-hover-tooltips-without-flake" },
    { title: `r/Playwright: Screenshot of a hovering button`, url: "https://www.reddit.com/r/Playwright/comments/1uecko2/how_to_make_screenshot_of_hovering_button/" }
  ]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "ai-browser-shortlist-job-postings": {
    en: {
      title: `Use an AI Browser to Build a Job Shortlist You Can Verify`,
      description: `Turn public job postings into a source-linked shortlist with explicit dealbreakers, evidence, duplicate checks, and a stop before applying.`,
      category: "AI browser guides",
      content: `An AI browser can help collect public job postings into a shortlist, but a match score is not proof that a role fits. Ask it to compare each posting with your stated constraints, preserve the original wording behind every important field, and leave unclear details visible. The workflow ends at a reviewable shortlist; it does not apply, contact recruiters or upload a résumé.`,
      sections: [
        { heading: `Separate dealbreakers from preferences`, body: `Write down the conditions that remove a role from consideration before opening job boards. Typical hard constraints include a location or work-authorisation requirement, a minimum base salary, an employment type, a required schedule, or a deadline. Preferences such as a particular technology, company size, or title can influence ranking without turning into a silent rejection rule. Make the browser report which condition it used for each decision.

For example, a search profile might say: “Remote in Canada or hybrid within 25 km of Ottawa; permanent full time; posted within 14 days; salary range must be shown and start at CAD 105,000; prefer TypeScript and accessibility work; exclude contract and unpaid roles.” That brief is deliberately explicit about “must” and “prefer.” It is a fictional example, not a tested search result or a promise that a browser can access every board.

Keep private details out of the first pass. A résumé, account credentials, immigration documents, and demographic information are rarely needed to collect public listings. Start with the minimum role criteria. Add personal information only if you have chosen the tool, understand where it is processed, and need it for a clearly defined step.` },
        { heading: `Use the employer posting as the evidence record`, body: `Search result cards and job-board summaries can be stale or abbreviated. For each candidate, open the employer’s own careers page when possible and record the direct URL. Keep the board URL too if it explains where the role was found. Google says its job results aggregate postings from employers and career sites, and notes that some displayed details may be identified automatically from descriptions. Treat the employer page as the place to confirm title, location, requirements, salary and status, not the search snippet.

Ask the agent to quote a short supporting phrase for fields that affect your decision. “Remote” may mean a specific country, a time-zone band, or only occasional work from home. “Salary” may be a broad annual range, hourly pay, or a range for a different location. Keep the field value beside the quote and link. If the source does not state it, use “not stated.” Do not let the model fill a blank with an industry estimate or infer that an old posting is still open.

A source trail is useful when two sites disagree. Record both values, their URLs and the check time, then mark the row for your review. Do not quietly choose the value that makes a role look like a closer match.` },
        { heading: `Build a shortlist table that keeps unknowns visible`, body: `A compact comparison makes the next action clearer than an unqualified fit score. Include role title, employer, direct posting URL, source site, location wording, salary and currency, employment type, date posted if shown, required qualifications, preferred qualifications, and the last checked time. Add separate columns for hard-constraint result and evidence quality.

| Field | What to preserve | If the page is unclear |
| --- | --- | --- |
| Location | Exact employer wording and eligible countries | Mark “needs confirmation”; do not normalize “remote” to worldwide |
| Pay | Stated range, currency, pay period and location scope | Keep null or “not stated”; do not estimate |
| Requirements | Required and preferred phrases separately | Quote the section and flag ambiguous wording |
| Status | Open/closed label and page check time | Recheck the employer page before acting |
| Duplicate | Employer, title, location and requisition ID if present | Keep both links until identity is confirmed |

The hard-constraint column should use simple values such as pass, fail, or needs checking. A role with unknown salary is not a pass merely because the title matches. The match explanation should cite the exact evidence and list any missing field that could change the decision.` },
        { heading: `Deduplicate without merging different requisitions`, body: `The same role can appear on the employer site and one or more job boards. Compare the employer, title, location, requisition number and description before merging entries. A shared title is weak evidence: companies can advertise several positions with identical names in different regions or teams. If no requisition ID is exposed, preserve both source links and label the possible duplicate rather than discarding one.

Likewise, do not treat “posted today” on an aggregator as proof the employer opened a new role today. It may indicate the aggregator refreshed the listing. Keep the source’s date label and the time you observed it as separate facts. When the employer page is missing or redirects, record that condition; it may be expired, private, or temporarily unavailable.

For a simple review order, sort first by dealbreaker status, then by evidence completeness, then by the preferences you named. Avoid a single opaque 0 to 100 match score. If you do use a score, show the criteria and weights so you can change them, and never present it as a probability of being hired.` },
        { heading: `Review role fit before sharing a résumé or applying`, body: `A shortlist should lead to a human decision, not an automatic submission. Read the employer’s full description, confirm that the posting is still available, and check whether the application site belongs to the employer or its stated recruiting platform. Do not let an agent answer screening questions about citizenship, work authorisation, salary history, disability, or experience unless you supplied the exact answer and have reviewed how it will be used.

Some job boards restrict automation or require a sign-in. Follow the board’s terms and stop if the page presents a CAPTCHA, identity check, timed assessment, or request the agent does not understand. The fact that a tool can operate a logged-in browser does not mean it has permission to submit applications. Keep the task to public pages unless you deliberately authorize a later, separately reviewed step.

Before moving a role to “apply,” verify the company, role, location, compensation if available, and résumé version yourself. Maintain a small audit note: what the browser found, which claims you checked, and what still needs a question to the employer.` },
        { heading: `A prompt that asks for evidence instead of confidence`, body: `Use a request like this with a browser tool you already trust: “Search these public job boards and employer career pages for roles matching the criteria below. Do not sign in, upload files, contact anyone, or apply. For each result return the employer’s direct posting URL, exact title, location wording, stated pay and currency, required qualifications, preferred qualifications, posted/closing dates if shown, requisition ID, and a short quote with the source page for every field. Mark missing, conflicting or stale information as unknown. Keep possible duplicates linked until their requisition identity is confirmed. Return a shortlist with pass, fail or needs checking for each hard requirement, then wait for my review.”

Test the request on two or three known public postings before scaling it. Compare the output against the pages yourself. This is a small check of extraction quality, not a benchmark of an AI browser, and it says nothing about rankings or hiring outcomes. If the agent cannot preserve source text and links, use the browser to find the pages and make the table manually.` }
      ],
      faq: [
        { question: `Can an AI browser tell whether I will get an interview?`, answer: `No. It can compare a posting with criteria you provide, but it cannot know an employer’s applicant pool or selection decision. Treat any fit score as a sorting aid, not a hiring probability.` },
        { question: `Should I give the browser agent my résumé?`, answer: `A public-posting search usually works from role criteria alone. Share a résumé only after checking the tool’s data handling and only if the next task needs it. Review any extracted personal information before it is sent elsewhere.` },
        { question: `How do I handle a job page that disagrees with a job board?`, answer: `Keep both URLs, quotes and observation times. Prefer the employer’s current posting for confirmation, and mark unresolved differences for a person to check.` }
      ]
    },
    "zh-cn": {
      title: `用 AI 浏览器整理一份可核验的求职岗位清单`,
      description: `把公开招聘信息整理成带来源的岗位短名单，保留硬性条件、证据、重复项和申请前的人工确认。`,
      category: "AI 浏览器指南",
      content: `AI 浏览器可以把公开招聘信息整理成候选清单，但匹配分数不能证明岗位适合你。要求它逐项对照你写明的条件，保留重要字段的原文，并把未确认的信息留空。本文只处理岗位研究与复核，不替你投递、联系招聘方或上传简历。`,
      sections: [
        { heading: `先分清硬性条件和偏好`, body: `打开招聘网站前，先列出哪些条件不满足就不考虑。硬性条件可以是工作地点或工作许可、最低薪资、雇佣类型、工作安排或截止日期。技术栈、公司规模和职位名称则可以作为排序偏好，不要让它们悄悄变成淘汰条件。要求浏览器说明每个判断依据了哪一条条件。

例如，筛选说明可以写成：“加拿大境内远程，或渥太华25公里内混合办公；长期全职；14天内发布；必须公开薪资且起薪达到105,000加元；偏好 TypeScript 和无障碍工作；排除合同制和无薪岗位。”这里的“必须”和“偏好”边界是明确的。这只是虚构示例，不是实测搜索结果，也不保证浏览器能访问每个招聘网站。

第一轮不要提供不必要的私密信息。简历、账号密码、移民文件和人口统计信息，通常不是整理公开岗位所需的资料。先用最少的岗位条件搜索。只有在你选定工具、了解信息处理位置，并确实需要某一步时，再决定是否提供个人材料。` },
        { heading: `以雇主招聘页作为核验依据`, body: `搜索结果卡片和招聘网站摘要可能过期，也可能省略条件。每个候选岗位尽量打开雇主官网招聘页，并记录直接网址；发现岗位的招聘网站链接也可以保留。Google 说明其职位搜索会聚合雇主和职业网站的职位，部分展示信息还可能从描述中自动识别。因此应把雇主页面当作确认职位名称、地点、要求、薪资和开放状态的依据，而不是只看搜索摘要。

让智能体为影响判断的字段摘录一小段原文。“远程”可能只覆盖某个国家、时区，或表示偶尔在家办公。薪资可能是年薪区间、时薪，也可能针对另一个地区。字段旁边应保留原文和链接；页面没写就记“未说明”。不要让模型用行业均值填空，也不要把旧页面推断成仍在招聘。

两个网站说法冲突时，保留两个值、网址和查看时间，标记待复核。不要为了提高匹配度而擅自挑一个。` },
        { heading: `用能容纳未知项的表格`, body: `职位名、雇主、招聘页链接、来源网站、地点原文、薪资和币种、雇佣类型、页面显示的发布日期、硬性要求、优先要求、查看时间，构成一张有用的比较表。再分开记录硬性条件结果和证据完整度。

| 字段 | 保留什么 | 页面不清楚时 |
| --- | --- | --- |
| 地点 | 雇主原文及可应聘国家 | 标记待确认；不把“远程”改写成全球可申请 |
| 薪资 | 区间、币种、周期和地区范围 | 留空或记未说明；不估算 |
| 要求 | 分开记必须条件和优先条件 | 摘录原文，含糊处待确认 |
| 状态 | 开放/关闭状态和查看时间 | 行动前重新核对雇主页面 |
| 重复项 | 雇主、职位、地点和招聘编号 | 确认身份前保留两个来源链接 |

硬性条件只用“满足、不满足、待确认”等简单状态。薪资未知的岗位不能因为职位名称合适就算通过。匹配解释要给出原始证据，并列出可能改变判断的缺失字段。` },
        { heading: `去重时别合并不同招聘编号`, body: `同一职位可能同时出现在雇主官网和多个招聘网站。合并前核对雇主、职位名称、地点、招聘编号和描述。同名只能说明名称相同，公司可能在不同地区或团队招聘多个同名岗位。没有编号时保留两个链接，标记疑似重复，不要直接删掉其中一条。

聚合网站显示“今天发布”，也不一定代表雇主今天新增了职位，有时只是网站刷新了列表。把页面上的日期和你查看的时间分别记录。如果雇主页面丢失或跳转，记录这个情况；岗位可能过期、设为私有，也可能只是暂时不可用。

排序时可先看硬性条件，再看证据是否完整，最后按你声明的偏好排列。不要使用看不见依据的0到100分数。若确实要评分，应公开条件和权重，并允许自己调整；分数不代表录用概率。` },
        { heading: `分享简历或申请前由本人复核`, body: `岗位清单应该交给你作决定，不应自动提交申请。阅读雇主完整描述，确认岗位仍开放，并检查申请页面确实属于雇主或它注明的招聘平台。有关公民身份、工作许可、薪资历史、残障情况和工作经验的问题，除非你提供了准确答案并审阅用途，否则不要让智能体代答。

有些招聘网站限制自动化，或要求登录。遵守网站条款；出现验证码、身份检查、限时测评，或智能体不理解的请求时先停下。工具能操作已登录浏览器，不等于它获准替你提交申请。除非你另行授权并逐步复核，任务应限于公开页面。

把岗位标记为“准备申请”前，亲自核对公司、职位、地点、可获得的薪酬信息和简历版本。留一条简短记录：浏览器找到了什么、哪些说法已核实、还需要向雇主询问什么。` },
        { heading: `要求证据的提示词`, body: `可以把下面的要求交给你信任的浏览器工具：“搜索这些公开招聘网站和雇主招聘页，寻找符合以下条件的岗位。不要登录、上传文件、联系任何人或提交申请。每个结果都返回雇主的直接招聘页、职位原名、地点原文、页面写明的薪资和币种、硬性要求、优先要求、页面显示的发布时间或截止日、招聘编号，并为每个字段提供网页原文短句和来源链接。缺失、矛盾或可能过期的内容标为未知。招聘编号确认前，保留疑似重复项及两个链接。逐条标记硬性条件为满足、不满足或待确认，整理清单后等待我复核。”

先用两三个已知公开职位检查结果，再扩大搜索。把字段与网页逐项对照。这只是一次小范围的信息提取检查，不是 AI 浏览器评测，也不说明排名或求职结果。如果智能体无法保留来源原文和链接，可以让它帮忙找网页，再由你手动整理表格。` }
      ],
      faq: [
        { question: `AI 浏览器能判断我会不会获得面试吗？`, answer: `不能。它可以按你给定的条件比较招聘信息，但不知道雇主的申请人情况和录用决定。匹配分数只适合排序，不是录用概率。` },
        { question: `应该把简历给浏览器智能体吗？`, answer: `搜索公开岗位通常只需要岗位条件。先核对工具如何处理数据，只有下一步确实需要时再提供简历。个人信息发送到别处前应由你复核。` },
        { question: `招聘网站和雇主页面不一致怎么办？`, answer: `保留两个网址、原文和查看时间。以雇主当前招聘页进行确认，并把无法解决的差异交给人工检查。` }
      ]
    }
  },
  "ai-browser-scholarship-eligibility-shortlist": {
    en: {
      title: `Use an AI Browser to Shortlist Scholarships Without Guessing Eligibility`,
      description: `Compare scholarships by official source, eligibility rule, deadline and missing evidence. Keep the browser agent's shortlist separate from an award decision.`,
      category: "AI browser guides",
      content: `Scholarship search spans provider pages, school sites and public directories, but a polished match score can still hide an unverified rule or expired deadline. Use an AI browser to collect candidates and source text, then classify each requirement as confirmed, not met or needs checking. Use the shortlist to decide what to investigate. Confirm eligibility against the provider’s current rules.`,
      sections: [
        { heading: `Start with a search profile that reveals eligibility boundaries`, body: `Write only the profile details needed to find opportunities: study level, field, school or destination country, residency or citizenship rules when relevant, graduation year, and a few interests or activities. Keep sensitive facts optional until a particular award clearly requires them. Do not paste tax, bank, government identity, or account information into a general web search task.

Separate hard eligibility gates from useful matches. A rule that says applicants must be residents of a named region is a gate. An award that prefers applicants interested in public service is a match factor. The agent should preserve that distinction instead of turning every word in a scholarship description into a binary rule. Use “confirmed,” “not met,” and “needs checking.” A missing rule is not evidence that the student qualifies.

Search across several source types: school financial-aid pages, state or regional programs, community foundations, professional associations and national directories. A search engine or directory can surface candidates, but its listing is a discovery pointer. The organization that administers the award owns the current eligibility and application instructions.` },
        { heading: `Verify the award on the provider's page`, body: `For every candidate, ask the agent to open the official provider page and capture its title, direct URL, award name, administering organization and the exact rule text that matters. Record the date checked. If the source links to an application portal or a PDF, keep that URL too and note which page supplied each fact.

Federal Student Aid advises applicants to check that they meet each scholarship’s requirements and to submit before the deadline rather than waiting until the final hours. Treat that as practical guidance, not a claim that one particular deadline method guarantees acceptance. A third-party listing may be useful for discovery but can lag a provider’s announcement. If it conflicts with the official page, preserve both and check the provider or school office.

Do not rely on a snippet, a generated summary, or the name of an award to establish eligibility. A title such as “Women in Engineering” does not by itself answer whether the award requires a particular degree, school, citizenship, GPA or application year. Capture the actual clause and its surrounding context so a student can review it.` },
        { heading: `Use an eligibility ledger, not a single match percentage`, body: `A decision table makes missing evidence visible. Include the award and provider, official page, award amount and currency if stated, deadline and time zone if stated, study year, geography, citizenship or residency, field of study, GPA or test threshold, required essays or documents, last checked time, and each rule’s status. Keep official wording separate from your interpretation.

| Check | Record from the page | Status when evidence is missing |
| --- | --- | --- |
| Who can apply | Citizenship, residency, age, school and study level | Needs checking |
| Academic rule | Minimum GPA, test result or program | Needs checking |
| Deadline | Date, time zone, time of day and application year | Needs checking; never infer from last year |
| Award value | Amount, currency, one-time or renewable if stated | Not stated |
| Required materials | Transcript, essay, references or portfolio | Needs checking |
| Source | Provider page, PDF or official application portal | Do not score until verified |

Avoid converting a row into “eligible” when only some criteria are known. If a service gives a numerical match score, ask what it measured and whether the result uses current source rules. A score is a product’s ranking output, not a guarantee of qualification, winning, or funding amount.` },
        { heading: `Separate deadline tracking from application submission`, body: `Record the deadline as printed, including time zone and any “received by” language. “March 1” without a year is incomplete. “Postmarked by” and “submitted online by” can describe different requirements. When the page lacks a time zone or a final cutoff time, flag it for confirmation and use a calendar reminder well before the date.

The browser can organize a checklist for each opportunity: confirm the current call is open, gather the requested materials, ask a referee if required, and set an internal review date. It should not start an application, upload a transcript, request a recommendation or submit an essay unless you have separately decided to perform that action and reviewed the relevant page. The article’s suggested workflow stops at the research shortlist.

Application dates and rules can change between years. A prior-year page can help locate the administering organization, but it cannot serve as current eligibility evidence. Put “current cycle verified” only after reading the live call for the year in which the student intends to apply.` },
        { heading: `Check legitimacy and protect student information`, body: `Use official school, government, foundation, association or named sponsor websites to confirm a scholarship. Federal Student Aid provides advice on finding scholarships and avoiding financial-aid scams. Be cautious if a listing asks for an upfront application fee, promises a guaranteed award, or requests extensive personal data before explaining who administers the program. A third-party directory’s verification badge does not replace checking the provider.

When a scholarship asks for identity, financial or demographic information, open the provider’s policy and application page yourself. Share only the minimum necessary with the actual administrator. An AI browser may send page content and task context to its model provider, even if it operates in a local browser window; check the selected product’s privacy and retention terms before using personal details. Keep the early discovery pass generic whenever possible.

Also check whether an award is paid to the student, the school, or an account and whether it can affect other aid. Those terms belong to the provider and financial-aid office. The browser can quote and organize them, but should not give a personalized aid or tax determination.` },
        { heading: `A prompt for a source-linked research pass`, body: `A bounded request might say: “Search public scholarship and grant pages for opportunities relevant to this non-sensitive profile: [study level, field, location, year, interests]. Do not sign in, submit forms, contact anyone, or upload documents. For every candidate, return the administering organization’s official page URL and quote the exact eligibility rules, deadline with year and time zone if shown, award amount and currency, and required materials. Mark each rule confirmed, not met, or needs checking. Distinguish official provider pages from directory listings. If sources disagree, include both values and links. Do not calculate a likelihood of winning. Stop after a reviewable shortlist.”

Before relying on the results, open a small sample of provider pages yourself and compare the quotes, dates and rules. Record where you checked the live page. This is a practical quality check, not a benchmark of scholarship tools. The site’s current cycle, applicant’s full facts and administrator’s decision remain authoritative.` }
      ],
      faq: [
        { question: `Can an AI browser confirm that I am eligible for a scholarship?`, answer: `It can compare information you provide with rules it finds, but a missing or ambiguous rule should remain “needs checking.” Verify every requirement on the current provider page and ask the administrator when the wording is unclear.` },
        { question: `Which scholarship deadline should I trust?`, answer: `Check the current cycle on the administering organization’s page. Preserve the full date and time-zone wording. If a directory and provider disagree, use the provider’s current instructions or contact the provider.` },
        { question: `Should I upload a transcript or tax information during scholarship discovery?`, answer: `Usually not. Search with a minimal profile first. Provide sensitive documents only through the actual provider’s application when required, after checking the site and its data handling.` }
      ]
    },
    "zh-cn": {
      title: `用 AI 浏览器筛选奖学金，别猜申请资格`,
      description: `按官方来源、资格规则、截止时间和缺失证据比较奖学金。把智能体给出的清单与实际获奖决定分开。`,
      category: "AI 浏览器指南",
      content: `奖学金信息分散在资助方、学校和公开目录网站上，漂亮的匹配分数也可能漏掉未核实的条件或过期截止日期。可以让 AI 浏览器收集候选项目与来源原文，再把每项要求标为已确认、不符合或待核实。清单帮助你决定下一步查什么，不能替资助方确认资格或取代当期申请规则。`,
      sections: [
        { heading: `先用能说明资格边界的搜索档案`, body: `只写查找项目需要的资料：学习阶段、专业方向、学校或目标国家、必要时的居住地或公民身份、毕业年份，以及少量兴趣和活动信息。某项奖学金确实要求敏感信息前，先把它留作可选项。不要把税务、银行、政府证件或账号信息贴进普通网页搜索任务。

把硬性资格门槛与匹配偏好分开。要求申请人必须住在指定地区，是硬性门槛；项目偏好对公共服务感兴趣的申请人，则是匹配因素。智能体应保留这一区别，而不是把简介里的每句话都转成二元资格规则。状态可用“已确认、不符合、待核实”。规则缺失不代表申请人符合。

搜索时可以查看学校助学金页、州或地区项目、社区基金会、专业协会和全国性目录。搜索引擎或目录负责发现候选机会，最终资格和申请要求由项目管理方说明。` },
        { heading: `在资助方页面核对每个项目`, body: `要求智能体打开项目管理方的官方页面，记录页面标题、直接链接、奖项名称、管理机构以及与你有关的规则原文，并注明查看日期。如果页面链接到申请门户或 PDF，也保留其链接，并写明每个事实来自哪一页。

美国联邦学生资助办公室建议申请人先确认自己符合奖学金要求，并尽量不要等到最后时刻才提交。这是实用建议，不代表某种提交时机能保证申请成功。第三方目录可以帮助发现项目，但信息可能晚于资助方更新。如果目录与官方页面冲突，先保留两个说法，再查资助方或学校办公室。

不要只凭搜索摘要、生成式总结或奖项名称判断资格。“女性工程”之类标题不能回答项目是否要求特定学位、学校、公民身份、GPA 或申请年份。要摘录实际条款及上下文，方便学生复核。` },
        { heading: `建立资格台账，不要只看匹配百分比`, body: `一张判断表可以暴露缺失证据。记录项目名称和资助方、官方页面、页面写明的金额和币种、截止日期及时区、学习年级、地区、公民身份或居住地、专业、GPA 或考试门槛、所需论文或材料、查看时间，以及每条规则的状态。官方原文和自己的解释应分开保存。

| 核对项 | 从页面记录 | 缺少证据时 |
| --- | --- | --- |
| 谁可申请 | 公民身份、居住地、年龄、学校和学习阶段 | 待核实 |
| 学业规则 | GPA、考试成绩或项目要求 | 待核实 |
| 截止日期 | 日期、时区、具体时间和申请年份 | 待核实；不要照搬去年日期 |
| 奖励金额 | 金额、币种、一次性或可续期说明 | 未说明 |
| 申请材料 | 成绩单、论文、推荐人或作品集 | 待核实 |
| 来源 | 资助方网页、PDF 或官方申请门户 | 核实前不评分 |

不要在只有部分条件时把一项标为“符合”。如果服务给出数字匹配分，先问它测量了什么、用的是不是当期规则。分数是产品的排序结果，不保证资格、获奖或资助金额。` },
        { heading: `把截止时间管理与申请提交分开`, body: `照页面记录完整截止说明，包括时区和是否必须在某个时间前收到。“3月1日”没有年份就不完整。“以邮戳为准”和“在线提交”也可能是不同要求。如果页面没写时区或具体截止时间，标记待确认，并提前设置提醒。

浏览器可以整理每个项目的清单：确认本轮仍开放、准备材料、按要求联系推荐人、设定内部复核日期。本文建议的流程止于研究清单；除非你另行决定并审阅页面，否则不要启动申请、上传成绩单、索取推荐信或提交论文。

不同年份的申请日期和规则可能变化。往年页面可以帮助找到资助方，但不能作为当前资格证据。只有读过计划申请年份的最新项目通知后，才标记为“当期已核实”。` },
        { heading: `核对项目真伪并保护学生信息`, body: `可以优先从学校、政府、基金会、专业协会或明确列出的赞助方网站核验奖学金。美国联邦学生资助办公室也提供寻找奖学金和识别助学金骗局的建议。若页面在解释管理机构前就收取申请费、保证获奖，或索取大量个人资料，应先查明来源。目录网站的认证标记不能取代官方页面核对。

要求提供身份、财务或人口统计资料时，亲自打开资助方的政策和申请页。只向实际管理方提交必要资料。AI 浏览器即使在本机窗口操作，也可能把页面内容和任务上下文发送给其模型服务商；涉及个人信息前，要读所用产品的数据处理和保留说明。早期发现项目时尽量使用概括的搜索条件。

还要查看资助金是支付给学生、学校还是其他账户，以及它是否会影响其他资助。这些问题由资助方和学校助学金办公室说明。浏览器可以摘录资料，但不应替个人作助学金或税务判断。` },
        { heading: `让智能体提供带来源的研究结果`, body: `可以提出这样的有限请求：“在公开奖学金和助学金页面中，按以下非敏感条件查找项目：[学习阶段、专业、地区、年份、兴趣]。不要登录、提交表单、联系任何人或上传材料。每个候选项目都返回管理机构的官方页面链接，并摘录准确的资格规则、带年份和时区的截止时间、金额及币种、所需材料。逐项标为已确认、不符合或待核实。区分资助方页面与目录信息。来源冲突时同时列出两种说法和链接。不要估算获奖概率。最后停在供我复核的清单。”

采用结果前，自己打开少量资助方页面，核对原文、日期和规则，并记录核验位置。这是实际工作中的小范围质量检查，不是对奖学金工具的基准评测。当期通知、申请人的完整情况和管理方决定仍然是最终依据。` }
      ],
      faq: [
        { question: `AI 浏览器能确认我符合奖学金条件吗？`, answer: `它可以把你提供的资料与找到的规则作比较，但缺失或含糊的规则应标为“待核实”。请在当期官方页面检查每项要求，不清楚时联系管理方。` },
        { question: `应该相信哪个奖学金截止日期？`, answer: `查看管理机构发布的当期通知，并保留完整日期和时区。如果目录与资助方说法不同，以资助方当前说明为准，或向管理方确认。` },
        { question: `搜索奖学金时要上传成绩单或税务信息吗？`, answer: `通常不需要。先用最少资料搜索。确需敏感材料时，只通过核实过的资助方申请页面提交，并先了解数据处理方式。` }
      ]
    }
  },
  "playwright-dynamic-combobox-option-selection": {
    en: {
      title: `Select Dynamic Combobox Options Reliably with Playwright`,
      description: `Separate native select controls from async custom comboboxes, wait for the intended option, and verify the committed value instead of retrying blind clicks.`,
      category: "Browser agent developer guides",
      content: `When Playwright cannot select an autocomplete value, first identify the widget. A native select has an option list in the control; a custom combobox may fetch suggestions after typing, render them in a portal, or recycle visible options. The repair depends on that behavior. Use this as a scoped diagnosis path for asynchronous suggestions and selection state. Component libraries still differ in markup and behavior.`,
      sections: [
        { heading: `Identify which control you are operating`, body: `Inspect the focused element and accessible snapshot before choosing an action. A native HTML select is a real select control, so Playwright’s selectOption API applies. A custom widget typically exposes a textbox or button with combobox semantics, an expanded/collapsed state and a separate popup. Its visible options may be rendered elsewhere in the DOM. Calling selectOption on a text input cannot make those custom options appear.

Use the accessible role and name when they exist. The W3C combobox pattern describes a popup that may be a listbox, grid, tree or dialog. An editable combobox can accept arbitrary text or use typed input to filter allowed suggestions. The pattern determines the right interaction: a free-text search box does not necessarily require selecting a result, while a restricted location field probably does.

Record the initial value and the user-visible control. If the snapshot omits the popup, open the control first and take a fresh snapshot. After a rerender, discard element references captured from the old snapshot and stored ElementHandle objects. A Playwright Locator normally resolves against the current DOM each time you use it; reuse the query only while its role and name still identify the intended control, then verify the exact option after it appears.` },
        { heading: `Wait for the suggestion that matches the query`, body: `Autocomplete often has more than one meaningful state: the text is entered, a request is pending, the list is visible, the desired option appears, and the component accepts a selection. Waiting for the list container alone only proves it opened. Wait for the exact option name you need, scoped to the active combobox if several controls share the page.

The options can change while the user types. If a stale request finishes last, the popup may show results for an earlier query. A reliable flow waits for the desired matching option and confirms the visible list is associated with the current input value. If the page exposes a loading state or busy attribute, include it in diagnosis. Do not replace this with a fixed sleep or a retry loop that can select the wrong prior result.

For a server-backed picker, look at one controlled test case and the relevant network or trace record to see whether a response is late, absent, or returning no matches. That is a different failure from an option that exists but cannot be clicked. Playwright auto-waiting covers actionability; it cannot invent suggestions that the application never rendered.` },
        { heading: `Choose selection behavior that matches the widget`, body: `For native select controls, use selectOption with the option value, label or index that the page actually exposes. Then assert the selected value or visible label. For custom controls, use the normal interaction: focus or open the combobox, enter a query, wait for the matching option, activate it, then inspect the combobox’s committed value. Some widgets require Enter or arrow keys; others require clicking an option. Follow the observed and documented keyboard model rather than assuming every component behaves alike.

When the control filters suggestions on individual key events, fill may trigger an input event with the final string, while the application may also depend on key-by-key behavior. Playwright documents pressSequentially for cases where special keyboard handling matters. Use it only when the app actually requires those events, and keep the rest of the test at the user-facing level.

Avoid force-clicking or dispatching synthetic click events just because the option is hard to reach. Those bypass checks and can hide a broken popup, wrong option, or overlay. If the intended option is genuinely outside a virtual menu’s mounted range, scroll the popup as a user would, then re-identify the option by its name before activating it.` },
        { heading: `Verify the value was committed, not merely typed`, body: `After selection, check the control’s actual displayed or selected value. A selected chip, label, hidden input value or form summary may be the authoritative state; a query string still sitting in the textbox can look like a successful choice while no value has been committed. If the form depends on a downstream field, confirm that the dependent options update before continuing.

When an agent is gathering data rather than testing a form, record both the text it searched and the exact suggestion it chose. This matters for names with accents, alternate spellings, same-name cities, company entities, and product variants. If the site displays a canonical identifier, keep it with the label. A final answer should report ambiguity rather than silently selecting the first of several matches.

Use an assertion tied to the task’s outcome. For example, verify that the chosen location appears in the review step before the agent continues. Do not treat “click returned without error” as proof that the application accepted the choice.` },
        { heading: `Diagnose repeated failures in a narrow order`, body: `If the option cannot be found, check the control type, popup state, exact accessible name and whether the list is still loading. If it is visible but not actionable, inspect whether an overlay covers it, whether the list belongs to a different combobox, and whether a virtual list has mounted the desired row. If it can be selected but the form remains unchanged, inspect the committed state or dependent field rather than adding more click attempts.

Keep the test focused on one known value and capture a trace or screenshot around the failure. Compare a slow debug run with normal execution, but do not decide that “debug mode fixes it.” The timing difference is evidence of a race or hydration boundary to investigate. A deterministic test can seed a known suggestion response; a separate end-to-end test can cover the application’s real integration.

If the widget has no usable role, label, current state or stable test hook, that is a product accessibility and testability issue. Ask the application team to expose a meaningful name and selected state. An agent should not guess a CSS path that reaches a visually similar but unrelated option.` },
        { heading: `A small acceptance checklist for agents and tests`, body: `Before the selection, verify there is exactly one intended combobox and it has the expected label. After typing, verify that the current query’s suggestion is visible and uniquely identifiable. Activate it using the interaction supported by that widget. Then verify the committed value in the form’s review state and, where relevant, the dependent field or saved response.

Keep these outcomes distinct: query typed, option list opened, matching option rendered, option activated, application accepted value. If a step fails, report the last confirmed state and preserve the page for diagnosis rather than restarting the whole workflow automatically. That prevents duplicate actions and makes it clear which part of the widget needs repair.

The W3C pattern is an accessibility design reference, not a guarantee that every site follows it. Component libraries can differ in markup, keyboard behavior and portal structure. Check the current Playwright and component documentation for the versions in the project before turning a scoped example into a shared helper.

For a runnable local example, download the [synthetic interaction fixture](/templates/browser-agent-interaction-fixture.mjs) into a temporary Node.js project. It requires Node.js 22 or later, Playwright and Chromium. Run these commands one at a time:

- npm init -y
- npm install playwright
- npx playwright install chromium
- node browser-agent-interaction-fixture.mjs

Successful output is JSON with local_browser_agent_interaction_fixture_passed, the Research option committed as department:research, an initially blocked Save trial followed by the explicitly named fixture dismissal and a successful local click, and tooltip text read through hover and programmatic focus. If Playwright is already installed, set PLAYWRIGHT_MODULE_URL to its module file and optionally CHROME_EXECUTABLE_PATH to a Chromium executable; quote paths that contain spaces. Playwright supplies a disposable browser profile for this launch. The server serves only on 127.0.0.1, page requests to other origins are blocked, and only the synthetic local page state changes. It does not test a vendor widget, a production site, an AI model, authentication, real application permissions or physical network isolation.` }
      ],
      faq: [
        { question: `Can I use selectOption on a custom React dropdown?`, answer: `Only if the control is an actual select element. A custom combobox uses its own textbox, popup and option behavior; open it, wait for the intended option, activate that option and verify the committed value.` },
        { question: `Why does the option appear in debug mode but not in CI?`, answer: `A slower run may expose a timing or rendering race. Check when the request returns, when the popup opens and whether the expected option belongs to the latest query. A fixed delay may hide the race without fixing it.` },
        { question: `Is a successful click enough to prove the selection worked?`, answer: `No. Check the control’s selected value or the form’s review state. A query can remain visible in a textbox without the application accepting it as an option.` }
      ]
    },
    "zh-cn": {
      title: `用 Playwright 稳定选择动态组合框选项`,
      description: `区分原生 select 和异步自定义组合框，等待目标选项并核验最终提交值，不要盲目重试点击。`,
      category: "浏览器智能体开发指南",
      content: `Playwright 无法选中自动补全项时，先确认控件类型。原生 select 的选项在控件中；自定义组合框可能在输入后请求建议、把弹层渲染到门户容器，或只挂载部分列表项。修复方法取决于这些行为。本文提供浏览器智能体开发者的排查路径和验收清单，不承诺某个定位器适用于所有组件库。`,
      sections: [
        { heading: `先识别正在操作的控件`, body: `先检查当前焦点元素和无障碍快照，再选择操作方式。原生 HTML select 可以用 Playwright 的 selectOption API。自定义控件通常会暴露带有名称的文本框或按钮，以及组合框语义、展开状态和单独的弹层。可见选项可能被渲染在 DOM 的其他位置。对文本框调用 selectOption 不会自动显示自定义建议。

控件存在可访问名称时，按角色和名称定位。W3C 的 combobox 模式允许弹层是列表框、网格、树或对话框。可编辑组合框可以接受任意文字，也可以把输入当成筛选条件。交互方式因而不同：自由文本搜索未必要求选一条建议，而受限的位置字段通常需要确认一个选项。

记录控件的初始值和用户能看到的对象。如果快照里没有弹层，先打开控件并重新获取快照。组件重绘后，丢弃从旧快照取得的元素引用和已保存的 ElementHandle。Playwright Locator 通常会在每次操作时重新查询当前 DOM；只有当它的角色和名称仍能指向目标控件时才复用查询，并在选项出现后再次确认具体选项。` },
        { heading: `等待与当前查询匹配的建议`, body: `自动补全往往要经过多个状态：文本已输入、请求等待中、列表已显示、目标选项已出现、组件已接受选择。只等列表容器出现，只能说明弹层打开。应等待准确的目标选项，并在同页有多个控件时将范围限定在当前组合框。

用户继续输入时，建议项可能改变。如果较早发出的请求最后才返回，弹层可能显示的是上一个查询的结果。可靠流程应等待当前查询对应的目标建议，并确认列表与当前输入内容有关。页面提供加载状态或忙碌属性时，也可用于排查。不要改成固定休眠，也不要不断重试到误选上一条结果为止。

对服务端建议列表，可以用一个受控样例和对应 trace 检查响应是否迟到、缺失或没有匹配项。这与“选项存在但点不到”是两类故障。Playwright 会等待交互条件，但无法生成应用从未渲染的选项。` },
        { heading: `按控件实际行为选择选项`, body: `原生 select 可按页面实际提供的 value、label 或 index 使用 selectOption，并核验选中值或显示标签。自定义控件则按用户路径操作：聚焦或展开、输入查询、等待匹配项、激活选项，再检查组合框提交的值。有的控件需要 Enter 或方向键，有的需要点击。应按已观察和文档说明的键盘模式操作，不能假定所有组件相同。

如果控件依赖逐个键盘事件筛选，fill 通常会填入最终文本并触发 input 事件，但应用也可能要求逐键事件。Playwright 提供 pressSequentially 用于确实需要特殊键盘处理的场景。只有应用需要时才用它，测试其余部分仍保持在用户可见的交互层。

选项难以点击时，不要马上强制点击或派发合成事件。这些做法会跳过检查，掩盖弹层故障、误选或遮挡问题。如果虚拟列表还没有挂载目标项，按用户方式滚动弹层，再通过名称重新识别选项。` },
        { heading: `核验值已提交，而不是只打进文本框`, body: `选择之后，检查控件实际显示或提交的值。真正状态可能是已选标签、控件标签、隐藏输入或表单摘要；文本框仍有查询词，看上去像成功，实际可能没有选中任何值。如果表单会更新依赖字段，继续操作前应确认新选项已加载。

智能体在提取资料时，也应同时记录搜索文字和最终选择的建议项。带重音符号、不同拼写、同名城市、公司实体和商品型号都可能容易混淆。页面若提供标准 ID，应连同显示名称一起保存。存在多个相似匹配时，最终答案应说明歧义，不要默默选第一项。

把断言绑定到实际任务结果。例如，智能体继续前，确认所选位置已经出现在复核页面中。点击没有报错，不代表应用接受了选择。` },
        { heading: `按顺序缩小重复故障范围`, body: `找不到选项时，依次检查控件类型、弹层状态、可访问名称是否准确，以及列表是否还在加载。选项可见但不能操作时，检查是否被遮挡、是否属于另一个组合框，以及虚拟列表是否已挂载目标行。若选项已点中但表单未变化，检查提交状态或依赖字段，不要继续增加点击次数。

将测试限定为一个已知输入，并在失败附近保存 trace 或截图。比较慢速调试和正常执行结果，但不要认定“调试模式能跑通”就修好了；速度差异提示可能有竞态或页面水合时序。可以用已知建议响应写一个确定性测试，另外用独立端到端测试覆盖真实应用集成。

如果控件没有合适角色、标签、当前状态或稳定测试标记，这是应用的无障碍和可测试性问题。请应用团队提供有意义的名称及选中状态。智能体不应猜一个 CSS 路径，指向外观看起来相似但实际无关的选项。` },
        { heading: `给测试和智能体使用的验收清单`, body: `操作前确认目标组合框唯一且标签正确。输入后确认当前查询的建议项可见并且能唯一识别。按控件支持的方式激活后，检查表单复核状态中的提交值，以及相关依赖字段或保存结果。

把五个状态分开记录：查询已输入、选项列表已打开、匹配项已渲染、选项已激活、应用已接受该值。任何一步失败时，报告最后确认到的状态，并保留页面用于排错，不要自动重启整个流程。这样可以避免重复操作，也能说明需要修的是控件哪一部分。

W3C 模式是无障碍设计参考，不能保证每个网站都遵循它。组件库在标记、键盘操作和 portal 结构上可能不同。把局部示例做成共享封装前，应检查项目当前使用的 Playwright 与组件版本文档。

需要可运行示例时，下载[合成交互 fixture](/templates/browser-agent-interaction-fixture.mjs)到临时 Node.js 项目。前置条件是 Node.js 22 或更新版本、Playwright 和 Chromium。请逐条运行以下命令：

- npm init -y
- npm install playwright
- npx playwright install chromium
- node browser-agent-interaction-fixture.mjs

成功时会输出 JSON，其中包含 local_browser_agent_interaction_fixture_passed、Research 建议项提交为 department:research、保存按钮的初次操作被遮挡以及通过 fixture 专用关闭按钮处理后再次正常点击，还有经悬停和程序化焦点读到的帮助文字。已有 Playwright 安装时，可将 PLAYWRIGHT_MODULE_URL 设为模块文件，并可选将 CHROME_EXECUTABLE_PATH 设为 Chromium 程序路径；路径有空格时请加引号。Playwright 会为本次启动提供一次性浏览器档案。服务只在 127.0.0.1 提供页面，并阻止发往其他源的页面请求；只改变合成页面状态。它没有测试供应商组件、线上网站、AI 模型、身份验证、真实应用权限或物理网络隔离。` }
      ],
      faq: [
        { question: `自定义 React 下拉框能用 selectOption 吗？`, answer: `只有实际控件是 select 元素时才适用。自定义组合框使用自己的文本框、弹层和选项交互；展开后等待目标项、激活并核验已提交的值。` },
        { question: `为什么调试模式能看到选项，CI 却找不到？`, answer: `较慢的运行可能暴露请求或渲染时序问题。检查请求何时返回、弹层何时打开，以及目标选项是否对应最新输入。固定延迟可能遮住竞态，却没有解决它。` },
        { question: `点击成功就能证明选项已选中吗？`, answer: `不能。检查控件选中值或表单复核状态。文本框里仍然显示查询词，并不代表应用已接受某个建议项。` }
      ]
    }
  },
  "browser-agent-diagnose-blocked-clicks": {
    en: {
      title: `Diagnose a Browser Agent's Click Blocked by an Overlay`,
      description: `Read Playwright's hit-target evidence, identify the covering layer, and choose a safe recovery without blindly forcing a click.`,
      category: "Browser agent developer guides",
      content: `A Playwright click that times out because another element intercepts pointer events has identified a real interaction boundary: the target is not receiving the click at the chosen point. Use the hit-target evidence to decide whether to wait, choose a supported dismissal, re-identify the target or stop.`,
      sections: [
        { heading: `Read the failure as a hit-target report`, body: `Playwright checks that a click target is unique, visible, stable, enabled and able to receive events. When another element occupies the click point, the action can fail with a description of the hit target. The failure is useful evidence. It does not mean the locator is necessarily wrong, and it does not mean a human could safely click through the covering element.

Capture the complete error, current URL, screenshot and trace around the action. Note whether the covering element is a cookie banner, sticky header, loading mask, popover, modal backdrop, tooltip or a real control. Record the target’s accessible name and the overlay’s visible state. If the browser agent only reports “click failed,” ask for this evidence before retrying.

Use the screenshot and DOM/accessible snapshot together. A screenshot shows which pixels are covered, while a snapshot can show names, roles and state. Each has limits: hidden content may not appear in either view, and a screenshot can make two overlapping controls hard to distinguish. Re-capture after any page transition instead of assuming the earlier target is still in the same place.` },
        { heading: `Decide whether the covering layer belongs to the task`, body: `If a consent banner, sign-in prompt or confirmation dialog is visible, handle it according to the user's choice and the page’s documented behavior. A browser agent should not accept or reject consent on its own, bypass authentication, or close an important prompt just to reach the next button. When the action needs a decision, ask the person or stop with a clear explanation.

If a spinner or loading mask covers the page, wait for the specific application state to finish or investigate why it never does. If an animation briefly overlaps the target, wait for that animation to end. If a tooltip or menu belongs to another control, move focus or pointer away using the interface’s normal behavior and then re-check the target. A transparent backdrop can still be functionally important even if it is hard to see.

Classify the overlay by what it means and does. Removing a banner from the DOM, changing pointer-events by script, or clicking through a modal can skip the application’s actual state transition. Do not turn a UI obstruction into an authorization or consent decision.` },
        { heading: `Distinguish obstruction from a misplaced or stale target`, body: `A sticky header or fixed footer can cover a target after scrolling. A layout shift can move it between the agent’s snapshot and click. A portal-mounted list can place its option outside the expected container. A reference captured from an earlier snapshot or a stored ElementHandle can become detached after a rerender. A Playwright Locator normally resolves again against the current DOM, although a broad query may now match a different control. These failures call for a fresh observation and a re-identified target, not a forced click.

Check whether the target’s bounding box and the hit-target description match the current screenshot. If the desired action is below the fold, let Playwright scroll the locator into view and then inspect the post-scroll state. If the application has a scroll container or sticky region, test the actual visible hit point. Avoid hard-coded pixel offsets unless the interface contract requires them and the layout is controlled.

For a browser agent, describe the task again in terms of the visible control and its expected result: “Close the page’s non-blocking help popover, then confirm the Save button is uncovered.” That instruction still does not authorize it to dismiss a consent choice or destructive confirmation. User intent and action authority remain separate from the mechanics of locating a button.` },
        { heading: `Repair the application or wait on a specific state`, body: `If the covering layer is expected, use its supported close or confirm action and wait for it to become hidden. If it is temporary, wait for a meaningful state such as the mask leaving or the result panel appearing. Playwright auto-waiting already waits on actionability for a normal click; a separate wait is useful when it names the application condition that must change before the action.

If the overlay is a product bug, preserve the trace and fail the test. Examples include a backdrop that remains after a modal closes, a loading mask that never clears, or a banner that covers a primary action with no reachable dismiss control. An end-to-end test should reveal the defect instead of hiding it with a synthetic event.

Use a bounded retry only when the state is known to be transient and each retry re-checks the page. A blind loop can make repeated clicks, choose a new element that moved under the pointer, or conceal a broken modal lifecycle. Log what changed and stop after a small, explicit attempt limit.` },
        { heading: `Use force only for a documented test requirement`, body: `Playwright’s force option bypasses some actionability checks; dispatchEvent triggers an event without the normal user interaction. These tools can be useful for a narrowly scoped test of application event handling, but they do not establish that a user or visual agent could perform the action. A passing forced click may leave a modal open or trigger an unintended layer.

Before using force, prove the intended layer is genuinely irrelevant to the test and that normal interaction is intentionally out of scope. State that limitation next to the test. Do not use force to get past consent, verification, a permission prompt, an unknown dialog, a payment confirmation or an error message. For an agent in a real browser, pausing is safer than inventing a path through a covering layer.

If repeated tests consistently need force because a real overlay blocks the target, fix the page or use an accessible, documented interaction that follows the product’s state machine. Do not convert a test workaround into a general agent policy.` },
        { heading: `A recovery record that prevents unsafe repetition`, body: `For each blocked action, keep a short record with the target, covering element, screenshot/trace time, page state, decision and observed result. Useful states include blocked by consent choice, waiting on known load, popup dismissed by user choice, target moved after scroll, modal still open, and application defect. This makes it possible to tell a recoverable wait from a decision requiring human input.

After the obstruction is handled, re-read the page and resolve the target from its current role, accessible name or stable identifier. Confirm the intended control receives the action and verify the result that matters, such as a new page or a changed status. Do not assume that a click which no longer errors had the intended effect.

For a task with external consequences, such as submitting a form or sending a message, the page state and authorization must be checked again immediately before the action. A cleared overlay is not consent to proceed. Keep the last safe state and ask the user when the choice or consequence is uncertain.

Download the linked [synthetic interaction fixture](/templates/browser-agent-interaction-fixture.mjs) into a temporary Node.js project folder and save it with the filename browser-agent-interaction-fixture.mjs. It requires Node.js 22 or later, Playwright and Chromium. Run one command per bullet:

- npm init -y
- npm install playwright
- npx playwright install chromium
- node browser-agent-interaction-fixture.mjs

Its JSON output reports a Playwright actionability trial detecting the overlay, the named fixture dismissal, and the later normal click result. The dismissal is explicitly part of this synthetic test only. The server binds to 127.0.0.1, cross-origin page requests are blocked and only local fixture state changes. Playwright supplies a disposable browser profile for this launch. If you already have Playwright, PLAYWRIGHT_MODULE_URL may select its module file and CHROME_EXECUTABLE_PATH may select Chromium. This does not test a production app, vendor overlay, real consent choice, user authorization or physical network isolation.` }
      ],
      faq: [
        { question: `Does an intercepting element mean the Playwright locator is wrong?`, answer: `Not necessarily. The locator may find the intended control, but another element occupies the click point. Inspect the hit-target description and current screenshot before changing the locator.` },
        { question: `Should a browser agent use force: true when a click is blocked?`, answer: `Not as a default. First identify the covering layer and handle its state through the supported UI. Force bypasses actionability checks and can hide an unintended or unsafe path.` },
        { question: `Will a longer timeout fix an overlay click?`, answer: `Only if the covering element is expected to disappear within that time. Otherwise the timeout delays diagnosis. Wait for a specific state or stop and report the blocker.` }
      ]
    },
    "zh-cn": {
      title: `排查浏览器智能体被遮罩挡住的点击`,
      description: `读取 Playwright 的命中目标线索，识别遮挡层，并选择安全恢复方法，避免盲目强制点击。`,
      category: "浏览器智能体开发指南",
      content: `Playwright 点击因其他元素拦截指针事件而超时时，说明目标在当前点击位置接收不到事件。应根据命中对象线索判断是等待、使用界面支持的关闭操作、重新定位还是停止。强制点击不是通用修复。`,
      sections: [
        { heading: `把错误读成命中目标报告`, body: `Playwright 点击前会检查目标唯一、可见、稳定、启用且能接收事件。其他元素占据点击点时，操作可能失败并说明命中对象。这个失败本身是有用线索。它不一定表示定位器错误，也不表示人可以安全地穿过遮挡层点击。

保存完整错误、当前网址、截图以及操作附近的 trace。记录覆盖元素是 Cookie 横幅、固定页头、加载遮罩、弹层、模态背景、工具提示还是真实控件，并记下目标的可访问名称和遮罩状态。智能体只报告“点击失败”时，先要求它提供这些证据，再决定是否重试。

截图和 DOM/无障碍快照应结合查看。截图展示被遮住的像素；快照能提供名称、角色和状态，但二者都有局限。隐藏内容可能都看不见，截图也可能难以区分重叠控件。页面状态变化后重新采集，不要假定旧位置和目标仍然有效。` },
        { heading: `判断覆盖层是否属于任务流程`, body: `如果出现 Cookie 同意横幅、登录提示或确认对话框，应按用户选择和页面支持的方式处理。浏览器智能体不能自行接受或拒绝同意、绕过身份验证，也不能为了点下一个按钮关闭重要提示。操作需要作决定时，应询问用户或停下来解释原因。

加载遮罩挡住页面时，等待具体应用状态完成，或排查它为何没有结束。动画短暂覆盖目标时，等动画结束。工具提示或菜单由另一个控件触发时，通过正常界面方式移开焦点或指针，再检查目标。即使透明背景不明显，也可能负责阻止底层操作。

应根据遮罩代表什么来决定下一步，不要只看 CSS 类名。直接从 DOM 移除横幅、用脚本设置 pointer-events 或点击模态框下面的内容，可能跳过应用真实状态转换。不能把界面遮挡处理变成授权或同意判断。` },
        { heading: `区分遮挡、目标偏移和旧引用`, body: `滚动后，固定页头或页脚可能覆盖目标；布局变化可能让快照和点击之间的位置改变；portal 列表可能把选项放在预想容器之外；组件重绘后，从旧快照取得的引用或已保存的 ElementHandle 可能已脱离页面。Playwright Locator 通常会重新查询当前 DOM，但范围过宽的查询也可能匹配到另一个控件。这些问题需要重新观察并识别当前目标，不应强制点击。

核对目标边界和命中描述是否与最新截图一致。目标在屏幕外时，可让 Playwright 将定位器滚动到可视区域，再检查滚动后的状态。如果应用有内部滚动容器或固定区域，就按真实可见的命中位置检查。除非界面契约明确要求且布局受控，不要硬编码像素偏移。

对浏览器智能体，可以按用户可见状态描述任务：“关闭页面中不影响决策的帮助弹层，再确认保存按钮已无遮挡。”这并没有授权它关闭同意选择或具有后果的确认框。用户意图与点击技术是两件事。` },
        { heading: `针对明确状态等待，或修复应用`, body: `遮挡层属于正常流程时，使用它支持的关闭或确认操作，再等待它消失。遮罩是临时状态时，等待有意义的条件，例如遮罩离开或结果面板出现。普通点击会自动等待操作条件；只有在它明确说明操作前必须发生的应用状态变化时，额外等待才有帮助。

遮挡是产品故障时，保留 trace 并让测试失败。比如模态框关闭后背景仍然存在、加载遮罩一直不消失，或主按钮被横幅覆盖又没有可达的关闭按钮。端到端测试应暴露问题，不应用合成事件掩盖它。

只有确认状态短暂且每次重试都会重新检查页面时，才考虑有限重试。盲目循环会重复点击、误选新移到指针下的元素，或掩盖模态框生命周期问题。记录状态变化，并在明确的小次数上限后停止。` },
        { heading: `force 只用于有边界的测试`, body: `Playwright 的 force 会跳过部分操作条件检查；dispatchEvent 则会绕过正常用户交互直接派发事件。它们可用于范围很窄的应用事件处理测试，但不能证明用户或视觉智能体能完成该操作。强制点击通过后，模态框可能仍开着，或实际上触发了另一层。

使用 force 前，要证明覆盖层与测试目标无关，并明确写出正常交互不在测试范围内。不要用 force 绕开同意页面、身份验证、权限提示、未知对话框、支付确认或错误信息。真实浏览器中的智能体应在无法判断时暂停，而不是自行制造穿过覆盖层的操作路线。

若重复测试都依赖强制点击才能绕过真实遮罩，应修复页面，或使用符合产品状态机的无障碍界面操作。不要把测试临时手段升级成通用智能体策略。` },
        { heading: `记录恢复结果，防止不安全重复`, body: `每次点击受阻时，留下目标、覆盖元素、截图或 trace 时间、页面状态、处理决定和观察结果。状态可以是等待加载、被同意选择挡住、用户确认后关闭提示、滚动后目标偏移、模态框仍然打开或应用缺陷。这样能区分可恢复的等待和需要人工决定的情况。

处理遮挡后重新读取页面，根据当前角色、可访问名称或稳定标识重新定位目标。确认目标控件确实接收了操作，并验证重要结果，例如打开新页面或状态变化。点击没有再次报错，不代表结果一定正确。

涉及外部后果的操作，例如提交表单或发送消息，应在执行前再次核对页面状态和授权。遮挡消失不等于同意继续。选择或后果不确定时，保留最后安全状态并询问用户。

下载[合成交互 fixture](/templates/browser-agent-interaction-fixture.mjs)到临时 Node.js 项目文件夹，并保存为 browser-agent-interaction-fixture.mjs。需要 Node.js 22 或更新版本、Playwright 和 Chromium。逐条运行以下命令：

- npm init -y
- npm install playwright
- npx playwright install chromium
- node browser-agent-interaction-fixture.mjs

JSON 输出会报告 Playwright 的操作条件试运行检测到遮挡、使用命名的 fixture 专用关闭按钮，以及之后正常点击的结果。这个关闭操作仅获准用于合成测试。服务只绑定 127.0.0.1，跨源页面请求会被阻止，只改变本地 fixture 状态。Playwright 会为本次启动提供一次性浏览器档案。已有 Playwright 时，可用 PLAYWRIGHT_MODULE_URL 选择模块文件，并可选用 CHROME_EXECUTABLE_PATH 选择 Chromium。它没有测试线上应用、供应商遮罩、真实同意选择、用户授权或物理网络隔离。` }
      ],
      faq: [
        { question: `有元素拦截点击，说明 Playwright 定位器错了吗？`, answer: `不一定。定位器可能找到目标，但另一个元素占据点击点。先看命中对象描述和当前截图，再决定是否需要换定位器。` },
        { question: `浏览器智能体点击被挡时应该使用 force: true 吗？`, answer: `不要默认使用。先识别遮挡层，并按界面支持的方式处理状态。force 会跳过操作条件检查，可能掩盖误操作或不安全路线。` },
        { question: `延长超时时间能解决遮罩点击吗？`, answer: `只有遮挡按预期会在超时内消失时才有用。否则只会推迟诊断。应等待特定状态，或停止并报告阻挡原因。` }
      ]
    }
  },
  "browser-agent-reveal-and-check-tooltip-help": {
    en: {
      title: `Help a Browser Agent Find Instructions Hidden in a Tooltip`,
      description: `Make hover and focus help visible, preserve its connection to the trigger, and distinguish a tooltip from an interactive menu or dialog.`,
      category: "Browser agent developer guides",
      content: `A browser agent may reach an icon but miss the explanation that appears only on hover or keyboard focus. Inspect the trigger, reveal the help with a supported interaction, and verify that the text belongs to that control before using it. The workflow reveals the help, confirms which control it describes and checks whether a keyboard user or agent can reach it.`,
      sections: [
        { heading: `Treat the icon and its explanation as one control`, body: `A small question-mark or information icon is often a trigger, not the content itself. Identify the control by its accessible name and inspect its current description or relationships. The W3C tooltip pattern describes a tooltip as supplemental information shown when its owning element receives keyboard focus or the pointer hovers over it. The tooltip container has role=tooltip, and the trigger references it with aria-describedby.

For an agent asked to understand a label, do not infer the answer from an icon shape. First capture the surrounding label and accessible snapshot. If the control’s accessible description already includes the help text, the agent may not need to open anything. If it does not, hover or focus the specific trigger through the tool’s supported interaction, then take a fresh snapshot and read the revealed text.

Keep the relationship visible in the result: say which control the text explained, quote the relevant phrase, and keep the page or source location. A tooltip from an adjacent icon can describe a different unit, exception, or warning. Spatial proximity alone does not prove that the text belongs to the control the agent is evaluating.` },
        { heading: `Reveal help with hover or keyboard focus`, body: `Some browser agent tools expose a hover action that can reveal tooltips, menus or hover states. After hovering the trigger, inspect the updated page rather than assuming the help appeared. A tooltip may have a short delay, may close when the pointer leaves, or may not exist on that page at all. Wait for the expected help text or role, not for an arbitrary duration.

Keyboard focus is a second useful path. Focus the trigger, then check whether the explanation becomes visible or is provided through the trigger’s accessible description. The W3C guidance says Escape dismisses a tooltip and focus stays on its trigger. The tooltip pattern is still marked as work in progress, so treat it as a design reference and check the actual application behavior rather than assuming every product follows the pattern.

Native browser title bubbles differ from richer tooltip widgets. MDN notes that a title attribute may produce a browser tooltip on hover, but it cannot be activated by keyboard focus or touch. If the information is essential, visible help text or a keyboard-accessible control is more dependable. An agent limited to DOM snapshots may not capture browser-native bubble text consistently.` },
        { heading: `Do not mistake a tooltip for an interactive popup`, body: `A tooltip provides a description and normally does not receive focus itself. If the revealed surface contains links, buttons, inputs or a choice the user must make, it may be a menu, popover or dialog instead. Identify the role and controls before deciding how to interact. A hover that opens a set of focusable actions is not a tooltip just because it looks like a small bubble.

This distinction matters for task authorization. Reading an explanation is different from selecting an option or activating a menu item. If the surface contains a control that can save, send, delete or change a setting, stop at the boundary until the user’s instruction clearly covers that action. The task “tell me what this icon means” does not authorize clicking the item described by the icon.

Use the screenshot to confirm visual placement and the semantic snapshot to connect the text to its trigger. If they disagree, report the mismatch. Do not paste the text into an answer as a page fact until its association is clear.` },
        { heading: `Check whether the help is actually accessible`, body: `For an application test, verify more than the tooltip’s appearance. Check that the trigger has a usable accessible name, that the help text is associated with the right trigger, that keyboard focus can reveal it, and that the text remains available long enough to read. If the tooltip disappears as the pointer moves into it, a person or visual agent may not be able to inspect it reliably.

An informative help message should not be the only way to discover a critical requirement. For example, a required field, fee, eligibility condition or destructive effect should also appear in visible form text or an accessible description that works without a mouse. A hover-only title can be useful as extra detail, but it is a weak place for the only copy of a task boundary.

If the app has no role, label or stable description, note that limitation and ask for a product accessibility fix. Do not invent a selector and treat a hidden string found elsewhere in the DOM as information the user could actually reach.` },
        { heading: `Build a test around the meaning, not the animation`, body: `A focused test can start from a known help icon, assert its accessible name, reveal it by hover, and verify the associated description. A second path can focus it by keyboard and check the same information. Test Escape or pointer movement only if the product promises those dismissal behaviors. Keep the assertions about text and association separate from visual styling checks.

Do not rely on a screenshot taken after a hover if the pointer moved during the capture or the help was already dismissed. If a tooltip test flakes, inspect the trace for the trigger, focus state, hover path, popup role and dismissal event. Then wait for the exact visible text with the normal assertion mechanism. A sleep can mask a missing association or an early close.

An agent’s read task can be stated narrowly: “Inspect the ‘i’ control next to Renewal date. Reveal its help by hover or keyboard focus, quote the date rule, and confirm the help is associated with Renewal date. Do not change the selected plan.” This checks both the information and its scope while keeping the agent away from unrelated controls.` },
        { heading: `Report hidden or ambiguous help honestly`, body: `Sometimes the trigger is unlabeled, the tooltip never appears, or multiple nearby controls have similar icons. The correct result may be “I could not identify which control this note describes,” not a guess. Save the screenshot and the observed accessible names, then ask for a clearer label or help text.

When the text conflicts with an adjacent heading or the page’s selected option, preserve the conflict and source positions. Do not silently pick one statement. A help bubble may be stale, detached from a rerendered control, or reused across several rows. Re-open it after the page changes and confirm its current association.

For production use, keep the action history small: which trigger was inspected, how it was revealed, what text was read, and whether any page state changed. This gives a reviewer enough context to reproduce the answer without presenting a visual hover as a completed user action.

Download the linked [synthetic interaction fixture](/templates/browser-agent-interaction-fixture.mjs) into a temporary Node.js project folder and save it with the filename browser-agent-interaction-fixture.mjs. It requires Node.js 22 or later, Playwright and Chromium. Run one command per bullet:

- npm init -y
- npm install playwright
- npx playwright install chromium
- node browser-agent-interaction-fixture.mjs

Its JSON includes tooltip text revealed first by hover and then by programmatic focus through Playwright locator.focus(), along with the trigger’s aria-describedby target. It also demonstrates dynamic option commitment and a separate blocked-click case. Tab navigation and focus order are not tested. Use PLAYWRIGHT_MODULE_URL to point at an existing Playwright module and optionally CHROME_EXECUTABLE_PATH for Chromium. The fixture serves only on 127.0.0.1, blocks page requests outside that origin and mutates only synthetic local state. Playwright supplies a disposable browser profile for this launch. This does not test browser-native title bubbles, screen readers, third-party widgets, a production app or an AI agent’s reasoning.` }
      ],
      faq: [
        { question: `Can an accessibility snapshot contain tooltip text before it opens?`, answer: `It can when the trigger exposes the text as an accessible description. Otherwise, reveal the help through hover or keyboard focus and capture a fresh snapshot. Tool behavior varies by page and agent.` },
        { question: `Is a title attribute the same as an ARIA tooltip?`, answer: `No. A title may produce a browser-native hover bubble. An ARIA tooltip widget has its own role and should be associated with its trigger. Native title bubbles are not activated by keyboard focus or touch.` },
        { question: `Should a browser agent click a button described by a tooltip?`, answer: `Only if the user’s task authorizes that action. Reading help does not authorize changing a setting, sending a message or selecting an option.` }
      ]
    },
    "zh-cn": {
      title: `让浏览器智能体找到提示气泡里的说明`,
      description: `通过悬停或键盘焦点显示帮助文字，确认它属于哪个控件，并区分提示气泡、菜单和对话框。`,
      category: "浏览器智能体开发指南",
      content: `浏览器智能体可能找到了图标，却没读到只在悬停或键盘聚焦时出现的说明。应检查触发控件，通过支持的交互显示帮助，再确认文字确实属于这个控件。本文处理在陌生页面中读取界面说明的具体任务，也解释快照的局限，以及让帮助内容易于发现的无障碍信息。`,
      sections: [
        { heading: `把图标和说明视为同一个控件`, body: `问号或信息图标通常是触发器，不是帮助文字本身。先用可访问名称识别控件，并检查它当前的描述和关联关系。W3C 的 tooltip 模式把它描述为补充说明：控件获得键盘焦点或指针悬停时显示。提示容器使用 role=tooltip，触发器通过 aria-describedby 指向它。

智能体需要理解标签时，不要按图标样式猜答案。先记录周围标签和无障碍快照。如果控件的可访问描述已包含说明，就不必再打开。如果没有，就用工具支持的方式悬停或聚焦指定触发器，重新采集快照并读取出现的文字。

输出时保留关联关系：说明它解释了哪个控件、摘录相关短句，并记录页面位置。相邻图标的气泡可能描述不同单位、例外或警告。距离接近不能证明那段话属于正在检查的控件。` },
        { heading: `通过悬停或键盘焦点显示帮助`, body: `部分浏览器智能体工具提供 hover 动作，可以显示提示、菜单或悬停状态。悬停触发器后，应查看更新的页面，不能假设说明一定出现。提示可能延迟显示、在指针离开时关闭，也可能根本不存在。应等待准确的帮助文字或角色，不要使用任意固定延迟。

键盘焦点是第二条检查路径。聚焦触发器后，观察说明是否出现，或者触发器的无障碍描述是否提供了帮助文字。W3C 指南说 Escape 可以关闭提示，焦点留在触发控件上。tooltip 模式仍标记为进行中，因此应把它当作设计参考，不能假设每个产品都照此实现。

浏览器原生 title 气泡与较完整的提示组件不同。MDN 指出 title 属性可能在悬停时显示浏览器提示，但无法通过键盘焦点或触屏激活。关键信息应使用可见文字或支持键盘操作的控件。只读 DOM 快照的智能体，也未必能稳定读取浏览器原生气泡。` },
        { heading: `不要把交互弹层误当成提示`, body: `提示气泡用于说明，通常自身不会获得焦点。如果显示的内容里有链接、按钮、输入框或需要用户作出的选择，它可能其实是菜单、弹出层或对话框。操作前先识别角色和控件。包含一组选项的悬停弹层，即使看起来像小气泡，也不是普通 tooltip。

这一区别涉及任务授权。读取说明与选择选项或点击菜单项不同。如果弹层里有保存、发送、删除或修改设置的操作，应在用户指令明确覆盖之前停下。“告诉我这个图标是什么意思”不等于授权点击图标说明的功能。

用截图确认视觉位置，用语义快照把说明关联到触发器。如果两者不一致，报告这种差异。关联不清时，不要直接把文字当作页面事实写进回答。` },
        { heading: `检查帮助文字是否真正无障碍`, body: `应用测试不能只检查提示是否出现。还应确认触发器有可用名称、帮助文本关联到正确控件、键盘焦点可以显示说明，文字也会停留足够长以供阅读。如果指针一移向气泡它就消失，用户或视觉智能体可能无法可靠查看。

重要要求不能只藏在提示里。例如必填条件、费用、资格限制或删除后果，还应出现在页面可见文字或可访问描述中，并能在不使用鼠标时查看。悬停提示可以补充细节，但不适合存放关键操作边界的唯一副本。

应用没有角色、标签或稳定描述时，记录该限制并要求修复无障碍问题。不要猜 CSS 选择器，也不要把 DOM 里某段用户无法到达的隐藏文本当作可用信息。` },
        { heading: `按说明含义编写测试，不只看动画`, body: `一个专注的测试可以从已知帮助图标开始，检查它的可访问名称，悬停后核验相关描述。第二条路径可以用键盘聚焦并查看同一内容。只有产品承诺了 Escape 或指针移动关闭行为时，才额外测试这些条件。文字内容和关联关系的断言应与视觉样式检查分开。

悬停期间若指针移动或气泡提前消失，截图可能捕捉不到它。测试不稳定时查看 trace 中的触发器、焦点状态、悬停路径、弹层角色和关闭事件。随后用正常断言等待准确文字。休眠可能掩盖关联缺失或过早关闭的问题。

可以把智能体任务写得很具体：“查看 Renewal date 旁的 i 控件。通过悬停或键盘焦点显示说明，摘录日期规则，并确认说明关联到 Renewal date。不要更改当前方案。”这样既核对信息和范围，也避免操作无关控件。` },
        { heading: `如实报告说明缺失或关联不明`, body: `触发器可能没有标签、提示没有出现，或相邻控件使用相似图标。这时正确结果可能是“无法识别这条说明描述哪个控件”，而不是猜测。保存截图和观察到的可访问名称，再要求页面提供更清晰的标签或帮助。

如果文字与相邻标题或当前选项冲突，应保留两者及其页面位置，不能擅自挑一个。提示可能过期、与重绘后的控件脱离，或被多行共享。页面变化后重新打开并确认当前关联。

生产使用时只需保留精简操作记录：检查了哪个触发器、用什么方式显示、读到什么文字，以及页面状态是否发生变化。这样复核者能复现答案，也不会把一次视觉悬停说成完整用户操作。

下载[合成交互 fixture](/templates/browser-agent-interaction-fixture.mjs)到临时 Node.js 项目文件夹，并保存为 browser-agent-interaction-fixture.mjs。需要 Node.js 22 或更新版本、Playwright 和 Chromium。逐条运行以下命令：

- npm init -y
- npm install playwright
- npx playwright install chromium
- node browser-agent-interaction-fixture.mjs

JSON 会展示提示文字先通过悬停、再通过 Playwright locator.focus() 程序化聚焦显示，并记录触发器的 aria-describedby 目标；还会演示动态选项提交以及单独的遮挡点击场景。Tab 键导航和焦点顺序未测试。已有 Playwright 时可用 PLAYWRIGHT_MODULE_URL 指定模块，并可选用 CHROME_EXECUTABLE_PATH 指定 Chromium。fixture 只在 127.0.0.1 提供页面，阻止发往其他源的页面请求，只改变合成的本地状态。Playwright 会为本次启动提供一次性浏览器档案。它没有测试浏览器原生 title 气泡、屏幕阅读器、第三方组件、线上应用或 AI 智能体推理能力。` }
      ],
      faq: [
        { question: `提示打开前，无障碍快照会包含里面的文字吗？`, answer: `如果触发器通过可访问描述提供了文字，快照可能已经包含。否则应先通过悬停或键盘焦点显示提示，再重新获取快照。不同页面和工具表现会不同。` },
        { question: `title 属性等同于 ARIA tooltip 吗？`, answer: `不等同。title 可能显示浏览器原生悬停气泡；ARIA 提示组件有自己的角色，并应关联到触发器。原生 title 气泡不能通过键盘焦点或触屏激活。` },
        { question: `智能体应该点击提示里描述的按钮吗？`, answer: `只有用户任务授权该操作时才可以。读取说明并不代表可以更改设置、发送消息或选择选项。` }
      ]
    }
  }
};

const related: Record<string, string[]> = {
  "ai-browser-shortlist-job-postings": ["ai-browser-job-application-status", "browser-agent-structured-data-extraction", "ai-browser-research-source-verification"],
  "ai-browser-scholarship-eligibility-shortlist": ["ai-browser-job-application-status", "browser-agent-structured-data-extraction", "ai-browser-research-source-verification"],
  "playwright-dynamic-combobox-option-selection": ["browser-agent-date-picker", "browser-agent-form-submission", "playwright-rich-text-editor-state-not-updated"],
  "browser-agent-diagnose-blocked-clicks": ["browser-agent-cookie-consent-choice", "browser-agent-debugging-traces", "browser-agent-accessibility-snapshot-vs-screenshot"],
  "browser-agent-reveal-and-check-tooltip-help": ["browser-agent-accessibility-snapshot-vs-screenshot", "browser-agent-shadow-dom", "browser-agent-debugging-traces"]
};

export const aiCycleTranslations31: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides31: EditorialGuide[] = Object.keys(copies).map((slug) => ({
  ...copies[slug]["zh-cn"],
  slug,
  date: "2026-10-31",
  sourcePath: `src/data/ai-cycle-2026-10-31.ts#${slug}`,
  availableLocales: ["en", "zh-cn"],
  relatedBrowsers: [],
  relatedTools: [],
  sources: sourcesBySlug[slug],
  relatedGuides: related[slug] ?? []
}));
