import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sourcesBySlug: Record<string, { title: string; url: string }[]> = {
  "ai-browser-build-degree-plan-from-course-catalogs": [
    { title: "CoursePlanner.ai: Degree planner", url: "https://courseplanner.ai/" },
    { title: "MonMap: Monash course planner", url: "https://monmap.monashcoding.com/" },
    { title: "Reddit: CourseTree and manual prerequisite checking", url: "https://www.reddit.com/r/UCalgary/comments/1u353bi/got_tired_of_course_planning_juggling_tabs_and/" },
    { title: "Northern Arizona University: Academic catalog and progression plans", url: "https://catalog.nau.edu/ProgressionPlans/" },
    { title: "UBC Computer Science: Artificial Intelligence option requirements", url: "https://www.cs.ubc.ca/undergrads/degree-programs-options/ai-option" },
    { title: "Microsoft AI Agents for Beginners: Browser use lesson", url: "https://microsoft.github.io/ai-agents-for-beginners/15-browser-use/" }
  ],
  "ai-browser-build-conference-agenda": [
    { title: "Janix: Conference program and personal schedule", url: "https://janix.ai/program/" },
    { title: "AirBalloon: My Agenda for attendees", url: "https://airballoon.ai/help/roles/attendee/my-agenda/" },
    { title: "CalendarMCP: Conference schedule loader example", url: "https://calendarmcp.ai/showcase" },
    { title: "IETF Datatracker: RFC 5545 iCalendar specification", url: "https://datatracker.ietf.org/doc/html/rfc5545" }
  ],
  "ai-browser-volunteer-opportunity-shortlist": [
    { title: "Network for Good: Find a volunteer opportunity", url: "https://www.networkforgood.org/volunteer/default.aspx" },
    { title: "Reach Volunteering: Search opportunities", url: "https://reachvolunteering.org.uk/search/opportunities" },
    { title: "Reddit: How to search for volunteering roles", url: "https://www.reddit.com/r/volunteer/comments/1hqi6hl/how_to_use_google_or_any_search_engine_to_find/" },
    { title: "Volunteer Iowa: Find volunteer opportunities", url: "https://volunteer.iowa.gov/volunteering/individuals/find-volunteer-opportunities" },
    { title: "Volunteer Florida: Volunteer Connect", url: "https://www.volunteerflorida.org/volunteerconnect/" }
  ],
  "playwright-test-multiple-roles-permissions": [
    { title: "Playwright: Authentication and testing multiple roles together", url: "https://playwright.dev/docs/auth#testing-multiple-roles-together" },
    { title: "Playwright: Browser contexts", url: "https://playwright.dev/docs/browser-contexts" },
    { title: "Ministry of Testing: Playwright recipes for multiple authenticated roles in one test", url: "https://www.ministryoftesting.com/insights/simple-playwright-authentication-recipes-a-cookbook-for-software-testers" },
    { title: "Leapwork: Test role-based access with multiple authenticated Playwright users", url: "https://docs.leapwork.com/playwright/latest/authentication-authorization/how-to-test-role-based-access-with-multiple-authenticated-users-in-playwright" },
    { title: "Reddit: RBAC test architecture discussion", url: "https://www.reddit.com/r/Playwright/comments/1l2f2il/rbac_test_architecture_in_playwright/" },
    { title: "OWASP Authorization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" }
  ],
  "playwright-stabilize-dynamic-screenshot-assertions": [
    { title: "Playwright: Visual comparisons", url: "https://playwright.dev/docs/test-snapshots" },
    { title: "Playwright: Page screenshot assertions", url: "https://playwright.dev/docs/api/class-pageassertions" },
    { title: "BrowserStack: Playwright screenshot guide", url: "https://www.browserstack.com/guide/playwright-screenshot" },
    { title: "BrowserStack: Screenshot testing guide", url: "https://www.browserstack.com/guide/screenshot-testing" },
    { title: "Reddit: Visual comparison failures with dynamic content", url: "https://www.reddit.com/r/QualityAssurance/comments/1ib8adp/playwright_has_native_visual_comparisons_feature_to/" },
    { title: "Reddit: Visual regression flakiness in CI", url: "https://www.reddit.com/r/Everything_QA/comments/1s2yl0e/how_do_you_deal_with_visual_regression_flakiness/" }
  ]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "ai-browser-build-degree-plan-from-course-catalogs": {
    en: {
      title: "Use an AI Browser to Draft a Degree Plan from Course Catalogs",
      description: "Turn official course requirements into a source-linked draft plan, keep prerequisite and term-availability rules visible, and take unresolved choices to an adviser.",
      category: "AI browser guides",
      content: "A browser agent can help organize degree requirements across catalogs, progression maps, and term schedules. Its output should stay a draft: course availability changes, exceptions need approval, and a plausible prerequisite sequence is not an official degree audit. Keep each requirement linked to the university source, separate confirmed rules from assumptions, and ask an academic adviser to resolve anything the catalog leaves open.",
      sections: [
        { heading: "Start with the official program and your planning constraints", body: `Pick the institution, degree, catalog year, and program option before asking an agent to compare courses. Universities may publish several curricula for students who entered in different years. A four-year sample plan is a reference, while the catalog or department handbook usually defines the requirements that apply to a particular cohort. Write down completed courses, transfer credit that has been formally accepted, the target credit load, preferred study pace, and any scheduling constraints. Leave out student ID numbers and transcripts unless an approved university tool needs them.

Separate graduation requirements from preferences. A required core course, minimum credit count, or prerequisite is a constraint. Interest in taking a certain elective, avoiding an early class, or balancing workload is a preference. That distinction lets a reviewer see why a suggested course moved without letting a model quietly waive a rule. The example plan in this guide is a method, not advice for any named student's degree.` },
        { heading: "Collect the rule from the right page", body: `Use the university catalog for requirement language and the registrar's current schedule for whether a class is offered in a particular term. Department progression plans can help show a normal order, but they may be advisory and may not cover transfers, substitutions, or prerequisite concessions. A course search page can show meeting times and seats; it does not replace the degree audit.

Keep a source ledger with the exact page title, direct URL, catalog year or term, access date, and the phrase that supports each rule. If two official pages differ, record both and ask which one controls. Do not treat a search snippet, an AI summary, a student planner, or an old PDF as the final authority. For example, one catalog may say Course B requires Course A with a minimum grade, while the term schedule only says Course B is offered in spring. Those facts answer different questions and both belong in the record.` },
        { heading: "Model prerequisites as rules, not a flat course list", body: `A course plan needs more than names and credit totals. Record prerequisites, co-requisites, minimum grades, repeat limits, required subgroups, and whether a requirement is one course or a choice among several. Parentheses and words such as “and,” “or,” “either,” and “one of” change the logic. If the catalog says A and B are both required before C, a list that contains only A is not feasible. If either D or E satisfies a requirement, keep both alternatives until the student chooses.

| Planning field | Evidence to retain | What the draft must not assume |
| --- | --- | --- |
| Degree requirement | Exact catalog wording and catalog year | A sample map is binding for every cohort |
| Prerequisite | Course code, grade threshold, AND/OR structure | A recommended order is a hard prerequisite |
| Term offering | Registrar schedule and term label | A past offering will repeat next year |
| Transfer or substitution | Official evaluation or written approval | Similar course titles transfer automatically |
| Credit load | Published minimum and maximum | A normal load is possible for every student |

Keep unknown prerequisite relationships as unresolved. Do not let the agent repair a missing rule by guessing from course titles or topic descriptions.` },
        { heading: "Build a term-by-term draft with alternatives", body: `Place required courses only after their documented prerequisites and mark any dependency the official source does not settle. For each term, include the course code, credits, expected offering evidence, and the degree requirement it fills. Check that no course appears twice unless repetition is explicitly allowed and needed. Add a second plan when one uncertain course offering changes the path. This is more useful than a single neat four-year sequence that hides the dependency.

Use a small status vocabulary: confirmed by catalog, confirmed by current schedule, student-reported, assumed, or needs adviser review. If a required course is offered only once a year according to the schedule you checked, cite that schedule and year; do not describe the cadence as permanent. If no future schedule is available, say “offering not yet published.” A plan should show credit totals, prerequisite breaks, and term conflicts separately so one green summary does not hide a missing condition.` },
        { heading: "Validate against the degree audit and ask targeted questions", body: `Before relying on the draft, compare it with the university's degree audit or an adviser-reviewed plan. Verify completed and transfer credits against the official record. Check residency rules, minimum grades, major and minor overlap limits, general education categories, upper-level credit requirements, and any capstone sequence that applies to the actual program year. An AI-generated table cannot approve a substitution or guarantee the student will graduate on its proposed date.

Turn every unresolved item into a short adviser question with its sources attached: “The 2026-27 catalog lists Course C after A and B, while the department map places it in year two. Does the map assume an additional transfer credit?” Ask which catalog year governs, whether a prerequisite exception is available, and when the next term schedule will be final. The adviser can answer the rule; the plan can then be updated with that dated answer.` },
        { heading: "Use a bounded prompt and keep registration separate", body: `A prompt can direct the browser to gather and organize public evidence without giving it registration authority: “Using only the university's official catalog, department progression plan, and registrar schedule linked below, draft a term-by-term plan for this program and catalog year. List every requirement, prerequisite and co-requisite with its direct source. Separate confirmed rules, student-provided completed courses, assumptions, and unresolved questions. Show at least one alternative when an offering or prerequisite is unknown. Do not sign in, open student records, contact staff, submit a petition, enroll, drop a course, or change my calendar. Stop with a draft and questions for an adviser.”

Read the cited source pages yourself, then compare the plan with the degree audit. A browser task that ends at a reviewable plan is complete even when the sources cannot support a final sequence. Keep the final table's catalog year and last-checked date visible so a later reader does not mistake it for current institutional approval. For a separate checklist on checking claims against original pages, see [AI browser research source verification](/en/guides/ai-browser-research-source-verification/).` }
      ],
      faq: [
        { question: "Can an AI browser confirm that I will graduate on time?", answer: "No. It can organize requirements and show a draft sequence. The university's official audit and adviser must confirm program rules, transfer credit, substitutions, and completion." },
        { question: "Should I use the sample progression map as the final rule?", answer: "Use it as planning context. Check the catalog year that applies to you and the registrar's current schedule; ask the department about exceptions or conflicts." },
        { question: "What if the catalog and schedule do not match?", answer: "Keep both URLs and the exact wording in the ledger. Mark the requirement unresolved and ask the department or registrar which source governs." },
        { question: "Can the agent enroll me after creating a plan?", answer: "This workflow stops at a private draft. Registration, dropping courses, petitions, and calendar changes require separate explicit review and authorization." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器根据课程目录起草学位修读计划",
      description: "把官方课程要求整理成带来源的计划草稿，保留先修课和开课学期规则，并把未解决的问题交给学业顾问。",
      category: "AI 浏览器指南",
      content: "浏览器智能体可以帮你整理学位目录、培养方案和当学期课程表中的信息。它给出的应是草稿：课程开设会变化，特殊替代需要批准，符合先修顺序也不等于学校完成了正式学位审核。每项要求都保留学校来源，把已确认规则与假设分开，目录没有说明的部分留给学业顾问确认。",
      sections: [
        { heading: "先确定专业版本和个人规划条件", body: `先确认学校、学位、目录年份和具体专业方向，再让智能体比较课程。学生入学年份不同，适用的培养方案也可能不同。四年示例计划通常用来说明建议顺序，正式要求要查对应年份的目录或院系手册。记录已修课程、学校正式认定的转学分、目标学分负担、期望修读节奏和时间限制。除非学校批准的工具确实需要，不要输入学号或完整成绩单。

把毕业要求与个人偏好分开。必修核心课、最低学分和先修课属于硬性条件；想选某门选修课、避开早课或平衡课程负担属于偏好。这样顾问能看懂为什么某门课被调整，也不至于让模型悄悄把规则当成可选项。本文中的计划只是方法示例，不对应任何具体学生的学位建议。` },
        { heading: "从对应的官方页面读取规则", body: `课程目录用于核对学位要求，注册办公室当前课程表用于确认某门课是否在某学期开放。院系培养方案可以展示常见顺序，但它可能只是建议，也可能没有覆盖转学分、课程替代或先修课豁免。课程搜索页面可能列出上课时间和席位，这不等同于学位审核。

为每条规则记录页面标题、直接网址、目录年份或学期、查看日期和对应原文。两份官方页面不一致时，保留两个来源并询问哪个适用。搜索摘要、AI 总结、学生规划工具和旧 PDF 都不能直接当最终依据。例如，一份目录可能写课程 B 必须先修 A 且成绩达到某档，当前课程表只说明 B 在春季开设。这两条信息回答的是不同问题，都应记录。` },
        { heading: "把先修关系记录为条件", body: `计划不能只列课程名称和总学分。还要记录先修课、并修课、最低成绩、重修限制、必修分组，以及要求是一门指定课程还是一组选修中的任意一门。目录中的“且”“或”“二选一”会改变条件。如果目录写明课程 C 需要先修 A 和 B，那么只安排 A 就不满足要求。如果 D 或 E 任一门都能满足分组，就先保留两个选择，等学生决定。

| 规划字段 | 应保留的证据 | 草稿不能假定什么 |
| --- | --- | --- |
| 学位要求 | 原文和目录年份 | 示例方案适用于所有届别 |
| 先修课程 | 课程号、成绩门槛和逻辑关系 | 建议顺序就是硬性先修条件 |
| 开课学期 | 注册办公室的学期课程表 | 过去开过就代表明年仍会开 |
| 转学分或替代 | 正式评估或书面批准 | 课程名称相似就能互认 |
| 学分负担 | 已发布的上下限 | 常见修读量适合每位学生 |

关系不清楚时标为待确认。不要根据课程名称或简介猜缺失的先修关系。` },
        { heading: "安排学期并保留备选计划", body: `只有在有证据确认先修条件后，才把课程放到相应学期；官方页面未说明的依赖关系要标为待确认。每学期列课程号、学分、开课依据和满足的学位要求。除非规则明确允许且需要重修，不要重复安排同一门课。如果某门课是否开设会改变后续路径，列出第二种方案。它比一张掩盖依赖条件的整齐四年计划更实用。

使用清楚的状态词：目录已确认、当前课程表已确认、学生提供、假设、需要顾问确认。如果目录说明某门必修课只在每年某个学期开放，应引用你检查的年份，不能把它写成永久规律。未来课程表还未发布时，就写“尚未公布”。计划要分开显示学分总数、先修断点和时间冲突，避免一个绿色总评掩盖未解决的条件。` },
        { heading: "用学位审核和具体问题复核", body: `依赖草稿前，应对照学校学位审核系统或顾问审过的计划。转学分和已修课程要和学校记录核对。再检查在本校完成的学分要求、最低成绩、主修和辅修课程能否重叠、通识教育类别、高年级学分及适用于本届学生的毕业项目顺序。AI 生成的表格不能批准课程替代，也不能保证你会按计划毕业。

把每个疑问连同来源变成一句具体问题：“2026-27 目录把课程 C 放在 A 和 B 之后，院系计划却把它列在二年级。这个计划是否假设我已经获得另一门转学分？”询问适用的目录年份、是否能申请先修豁免，以及下学期课程表何时确定。顾问确认后再用带日期的答复更新计划。` },
        { heading: "限定浏览任务，选课另行处理", body: `可以这样要求浏览器整理公开资料，同时不给它选课权限：“仅使用下面链接中的学校官方目录、院系培养方案和注册办公室课程表，为这个专业和目录年份起草逐学期计划。每项要求、先修课和并修课都列直接来源。分别标记学校已确认规则、我提供的已修课程、假设和未解决问题。遇到开课学期或先修关系未知时，给出至少一个备选方案。不要登录、查看学生记录、联系员工、提交申请、注册、退课或更改日历。输出草稿和待问顾问的问题后停止。”

读者仍需打开引用页面检查，并和学位审核结果对照。来源不足以支持最终课程顺序时，留下待确认项也是合格结果。保留目录年份和最后核对日期，免得后续读者把旧草稿当成学校当前批准的方案。还可参考[AI 浏览器研究来源核验](/zh-cn/guides/ai-browser-research-source-verification/)逐项检查原始页面。` }
      ],
      faq: [
        { question: "AI 浏览器能确认我会按时毕业吗？", answer: "不能。它可以整理要求并展示计划草稿。课程替代、转学分和毕业条件要以学校的正式审核和顾问答复为准。" },
        { question: "培养方案可以作为最终规则吗？", answer: "可用作规划参考。请核对适用的目录年份和注册办公室当前课程表，并就例外或冲突询问院系。" },
        { question: "目录和课程表不一致时怎么办？", answer: "在清单里同时保留两个网址和原文，把要求标成待确认，再询问院系或注册办公室哪个来源适用。" },
        { question: "计划生成后可以让智能体替我选课吗？", answer: "本文流程停在私人草稿。注册、退课、提交申请和修改日历都需要单独复核和明确授权。" }
      ]
    }
  },
  "ai-browser-build-conference-agenda": {
    en: {
      title: "Use an AI Browser to Build a Conference Session Agenda",
      description: "Turn a public multi-track program into a personal shortlist with source links, time-zone checks, room-change buffers, and unresolved conflicts.",
      category: "AI browser guides",
      content: "A conference schedule is a set of sessions competing for the same hours, rooms, and travel time. An AI browser can collect sessions that fit your interests and lay them out as a draft agenda. Keep the official program page beside each title, preserve the event's time zone, and flag overlapping talks or impossible room changes. Favoriting or listing a session does not reserve a seat or register you.",
      sections: [
        { heading: "Write down what makes a session worth attending", body: `Before searching the program, list the topics, speakers, formats, and outcomes you care about. Separate must-attend sessions from preferences such as a speaker, track, hands-on lab, or networking period. Add the days you can attend, whether you will be onsite or remote, and any access or travel needs. Keep the brief short enough that the agent can explain why a session matched it.

Use a fictional profile for planning practice: prioritize browser security and developer tooling, attend one workshop, avoid simultaneous room changes across the venue, and leave thirty minutes for lunch. Those are user constraints, not properties of a real conference. If the organizer has not published an access route or recording policy, mark it unknown rather than guessing from last year's event.` },
        { heading: "Use the conference program as the session source", body: `Start from the event organizer's program or attendee portal. Search previews and third-party event listings may omit room changes, session cancellations, capacity notes, or the year. Record the session page URL, title, speaker, track, date, start and end time, room or online link, format, and any registration requirement. Save the page's last-updated notice when available.

Keep the official event time zone in the ledger. A browser might display a time in your device zone, while the organizer's grid shows local venue time. Record both the source time and the converted view with the zone label. A daylight-saving transition can make a numeric offset misleading, so prefer a named time zone such as America/Chicago when the source provides one. Do not calculate a travel plan from an unlabeled time.` },
        { heading: "Check overlap, travel, and session capacity", body: `Two sessions can fit an interest profile and still be impossible to attend together. Treat time overlap as a hard conflict. Treat a short walk between rooms, a remote-only link, a full workshop, or a session limited to registered attendees as a condition to verify. If a program has parallel tracks, ask the agent to keep a primary choice and one alternate for each overlapping block.

| Agenda field | Record | Review question |
| --- | --- | --- |
| Time | Start, end, date, and named zone | Is this event time or the browser's local display? |
| Location | Room, building, link, or virtual platform | Can I reach the next session in time? |
| Session status | Published, canceled, moved, or unknown | Did the organizer update this page recently? |
| Attendance | Open, capacity-limited, or registration required | Does saving the session reserve anything? |
| Preference | Must attend, preferred, or alternate | What will I miss if two favorites overlap? |

Do not use a map estimate as proof of room access, walking distance indoors, or wheelchair route. Ask the event team or consult its accessibility page when the venue details affect participation.` },
        { heading: "Make the agenda useful on the event day", body: `Sort the selected sessions by the event's local date and start time. Include the room, building, track, short reason for choosing it, source URL, and a transition note before the next session. Leave breaks between sessions when the venue is large or the agenda uses separate campuses. Keep a separate “maybe” list for talks you would attend if a preferred session is full or canceled.

If you export an iCalendar file, inspect the time-zone and recurrence fields before importing it. Calendar data can carry a zone identifier and an event interval; a formatted start time alone may not preserve those details. A simple table or printable note is often safer for a draft. Only add events to a real calendar after reviewing the titles, dates, time zones, and number of entries. Never let an agent accept a paid workshop, book travel, or register you as part of agenda discovery.` },
        { heading: "Recheck updates and preserve uncertainty", body: `Conference programs change. Before the day begins, reopen the official page for each selected session and check the time, room, speaker, cancellation, and capacity status. Keep the time of that check in the notes. A session being present in a cached agenda does not prove it will still run.

If the program page and attendee portal disagree, record both links and ask the organizer which listing is current. When a page is blocked, label it unavailable; do not claim to have read it. If a session has no end time or a room is missing, keep the gap visible and do not fill it from a previous edition. This lets a person adjust the agenda without losing where each claim came from.` },
        { heading: "Give the browser a bounded task", body: `A useful request is: “Use the public official program pages linked below to create a draft agenda for Tuesday and Wednesday. My priorities are browser security, developer tooling, and one hands-on workshop. Keep a source link for each session, preserve the organizer's time zone, list the room and exact time, identify overlapping sessions, and suggest one alternate per conflict. Include only sessions that appear in the current official program. Mark missing capacity, access, and cancellation information unknown. Do not sign in, favorite or register for sessions, buy tickets, book travel, email speakers, or change my calendar. Stop with a reviewable table.”

After the agent finishes, check every row against the source page and verify room transitions. A session shortlist is useful when you can see the trade-offs and decide for yourself. It should not imply that saved, liked, or imported entries guarantee attendance.` }
      ],
      faq: [
        { question: "Does adding a talk to a personal agenda reserve a seat?", answer: "Not unless the organizer explicitly says so. Some events say a saved session is only a planning aid and attendance may remain capacity-limited." },
        { question: "Which time zone should the agenda use?", answer: "Keep the event's named local time zone from the official program. If you also show a converted time, label both zones and the date." },
        { question: "Can the browser register me for a workshop?", answer: "This workflow stops before registration. Check availability, price, and cancellation terms yourself before a separately authorized booking." },
        { question: "What if the attendee portal and public schedule disagree?", answer: "Keep both URLs, mark the conflict, and ask the event organizer which page is current." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器整理会议或大会的个人议程",
      description: "从公开的多轨日程中筛选场次，保留来源链接、时区和换场时间，并标出尚未解决的冲突。",
      category: "AI 浏览器指南",
      content: "会议日程中的场次会争用同一段时间、会议室和换场时间。AI 浏览器可以根据兴趣收集场次并整理成个人议程草稿。每个标题都要留有官方来源，保留大会使用的时区，并标记时间冲突或不可能的换场。收藏或列入议程不代表已占座或完成注册。",
      sections: [
        { heading: "先写下什么样的场次值得参加", body: `搜索大会日程前，列出你关心的主题、讲者、形式和收获。把必须参加的场次与偏好分开，例如希望听某位讲者、参加某条分轨、动手实验或留出交流时间。写明可参加的日期、线上或现场、无障碍及交通需求。描述要简洁，让智能体能说明每个场次为何符合条件。

可以用虚构条件练习：优先关注浏览器安全和开发工具，参加一个工作坊，避免连续场次需要跨楼赶场，并留出三十分钟吃午餐。这些只是规划条件，不代表某个真实会议的安排。组织方没有公布无障碍路线或录像政策时，标记为未知，不要从上一年的活动推断。` },
        { heading: "以大会官方日程作为场次来源", body: `从主办方的公开日程或参会者入口开始。搜索摘要和第三方会议信息页可能漏掉教室变更、取消、容量限制或活动年份。每个场次记录详情网址、标题、讲者、分轨、日期、起止时间、地点或线上链接、形式及注册要求。页面有更新时间时也记录下来。

在清单中保留主办方采用的时区。浏览器可能显示设备本地时间，而主办方日程按举办地时间显示。记录来源时间和换算后的时间，并注明各自时区。夏令时切换可能让数字偏移量难以辨认；来源提供命名时区时，优先保留例如 America/Chicago 这样的名称。时间没有时区标注时，不要据此安排交通。` },
        { heading: "检查时间重叠、换场和场次容量", body: `两个场次都符合兴趣，也可能无法同时参加。时间重叠应作为硬冲突；会议室距离较远、仅有线上链接、工作坊人数有限或只对已注册参会者开放，都需要核实。如果大会分轨同时进行，可要求智能体为每个时间段保留首选项和一个备选项。

| 议程字段 | 记录内容 | 复核问题 |
| --- | --- | --- |
| 时间 | 起止时刻、日期和命名时区 | 这是大会时间还是浏览器显示的本地时间？ |
| 地点 | 会议室、楼宇、链接或线上平台 | 能否及时到达下一场？ |
| 场次状态 | 已发布、取消、改期或未知 | 主办方最近更新过此页吗？ |
| 参加方式 | 公开、限额或需要注册 | 收藏是否真的占位？ |
| 偏好 | 必须参加、优先或备选 | 两个场次重叠时会错过什么？ |

地图距离不能证明室内通行时间、无障碍路线或楼宇入口情况。场馆条件会影响参加时，应查活动无障碍页面或向组织方询问。相邻场次之间如果只有十分钟，还要确认是否要取行李、通过安检或换乘班车；这些等待不能从演讲时间表推断。议程可以把换场和休息显示为独立时间块，不要把它们并进场次时长。` },
        { heading: "让议程在活动当天仍然好用", body: `按大会当地日期和开始时间排序。每项列出地点、楼宇、分轨、选择理由、来源链接，以及赶下一场所需注意的换场时间。大型场馆或分校区活动之间应留出休息和步行时间。另设“备选”清单，方便首选场次满额或取消时调整。

为每天设置可参加的起止时段，并把午餐、签到和休息单独列出。线上场次要记录参与入口和所在地时区；如需跨楼宇或跨校区，查主办方提供的交通和无障碍路线。录播是否提供也要以官方说明为准，不要把“错过后可补看”当作默认选项。

若导出 iCalendar 文件，导入前要检查时区和重复事件字段。日历格式可以携带时区标识和事件区间，只有一个格式化开始时间未必保留完整信息。草稿阶段使用表格或可打印笔记可能更安全。只有复核标题、日期、时区和条目数量之后，才把活动加入真实日历。议程整理不应让智能体自动接受付费工作坊、订旅程或注册。若要把最终时间写入日历，再看[AI 浏览器跨时区日历提议](/zh-cn/guides/ai-browser-calendar-timezone-proposal/)中的时区复核步骤。` },
        { heading: "活动前复查更新并保留不确定项", body: `大会日程可能变化。活动当天前，重新打开每个场次的官方页面，核对时间、地点、讲者、取消情况和容量状态，并记下检查时间。某场出现在缓存的议程里，不代表它当天一定照常举行。

公开日程和参会者入口内容不一致时，保留两个链接并询问主办方哪一页是最新的。页面打不开，就标为无法访问，不能声称读过。场次没有结束时间或缺少地点时，保留空缺，不要用往届信息补上。这样读者能自行调整，也能找到每条判断的来源。` },
        { heading: "给浏览器一个有边界的任务", body: `可以这样提问：“只用下面链接中的大会官方公开日程，制作周二和周三的议程草稿。我的优先主题是浏览器安全、开发工具和一个动手工作坊。每项保留来源链接、主办方时区、准确时间和地点，标出时间重叠，每个冲突给一个备选场次。只列入当前官方日程中出现的场次。容量、无障碍和取消信息没有公布时写未知。不要登录、收藏或注册场次、买票、订行程、给讲者发邮件或修改我的日历。最后输出一张可复核的表格并停止。”

完成后逐行对照来源并检查换场。好的场次清单应让你看清取舍并自行决定。收藏、点赞或导入日历都不能暗示已经保证能参加。` }
      ],
      faq: [
        { question: "把讲座加入个人议程就能占到座位吗？", answer: "除非主办方明确说明，否则不能这样推断。有些活动的收藏仅用于规划，现场仍可能限额。" },
        { question: "议程应该使用哪个时区？", answer: "保留官方日程使用的举办地命名时区。如果也显示换算时间，要标明两种时区和日期。" },
        { question: "可以让浏览器替我注册工作坊吗？", answer: "本文流程停在注册之前。单独授权操作前，应自行确认名额、费用和取消条款。" },
        { question: "参会入口和公开日程不一致怎么办？", answer: "保留两个网址、标记冲突，并询问主办方哪个页面是最新版本。" }
      ]
    }
  },
  "ai-browser-volunteer-opportunity-shortlist": {
    en: {
      title: "Use an AI Browser to Find Volunteer Roles That Fit Your Schedule",
      description: "Compare public volunteer listings by availability, time commitment, access needs, eligibility, and official organization details before contacting anyone.",
      category: "AI browser guides",
      content: "A volunteer role can sound appealing and still fail to fit your weekly availability, travel limit, skills, or access needs. An AI browser can help collect public listings into a reviewable shortlist. Confirm each role on the organization's own page, keep schedule and eligibility details beside the source, and stop before messaging or signing up. A directory match is a lead, not proof that the role is active or suitable.",
      sections: [
        { heading: "Describe your real availability and boundaries", body: `Start with time and access, not only the cause you care about. List the days and hours you can commit, whether the time is regular or flexible, travel distance, remote or onsite preference, minimum and maximum duration, and any training window. Add the skills you can offer and the tasks you want to avoid. If an accommodation is needed, note what an organizer must confirm without sharing private health details in a general agent prompt.

A useful profile separates a hard constraint from a preference. “No more than two hours on weekday evenings” may rule out a role with a four-hour weekly shift. “Prefer environmental work” can rank two otherwise eligible roles without removing the other one. State the location radius and whether public transit or step-free access matters. If you cannot take an ongoing commitment, ask for one-day events or short projects instead of letting the agent infer flexibility.` },
        { heading: "Search more than one directory, then verify the host", body: `Volunteer directories differ in geography, cause areas, role types, age restrictions, schedules, and how old listings are removed. Search a national or regional service, a local volunteer center, and organizations in the cause area. The public search pages inspected for this guide expose different filters: some list time commitment and availability, while others focus on location, interest, age group, or opportunity type. A listing on a directory may be incomplete or stale.

Open the host organization's own opportunity page before treating a result as current. Record the organization name, role title, canonical listing URL, location or remote scope, posted or closing date if shown, and a time checked. If the listing only appears on a directory or redirects to a broken page, say that. Do not infer the organization's reputation from a directory badge, and do not treat the directory's screening as a guarantee of safety.` },
        { heading: "Compare commitment, eligibility, and practical access", body: `Volunteer pages often describe work in broad terms. Keep the exact requirements and the organizer's phrasing rather than converting them into a confident fit score. Verify age or background-check requirements, onboarding, training hours, minimum term, shift schedule, lifting or standing requirements, language needs, transport, and whether expenses are reimbursed. Ask the organization about accommodations when its page does not answer that question.

| Field | What to record | If the source is unclear |
| --- | --- | --- |
| Schedule | Days, hours, shift frequency, date range | Mark unknown and ask before committing |
| Commitment | Total hours or hours per week and term length | Keep the exact phrase; do not normalize vaguely |
| Eligibility | Age, skills, checks, training, language | Quote the requirement and link to the page |
| Access | Location, remote limits, physical tasks, accommodations | Ask the host; do not guess from a role title |
| Organization | Legal or public name and its own website | Keep directory and organization URLs separate |
| Status | Application window or last update | Recheck before sharing personal information |

If the listing clearly requires hours or access conditions that conflict with yours, mark it mismatch. Reserve needs checking for details the source omits or states ambiguously.` },
        { heading: "Rank the shortlist without hiding trade-offs", body: `Use pass, mismatch, or needs checking for each hard condition, then rank preferences. For example, if a role requires Tuesday evenings and you are available only on Saturday mornings, mark it mismatch. Reserve needs checking for a shift the listing omits or describes ambiguously. A short explanation is more useful than a single score: “Remote from anywhere in the UK; asks for three to seven hours a week; requires prior trustee experience; exact weekday availability not stated.” That lets you decide whether to ask a question.

Keep one row per distinct role, even when the same host advertises several positions. Do not merge entries just because the organization name matches. A one-off event and a continuing role have different schedules; a volunteer coordinator and a hands-on role may require different checks. Save alternate listings so a full or expired first choice does not force you to accept something outside your limits.` },
        { heading: "Check legitimacy and privacy before contacting a group", body: `Before applying, use the organization's own website to confirm the role, contact route, location, and any background-check process. Be careful with requests for money, payment-card details, passwords, identity documents, or personal data unrelated to the role. A legitimate volunteer task may need a screening process, but the organization should explain who handles the information and why. Ask a local volunteer center if the group or request is hard to verify.

Keep the AI browser on public pages for the research pass. Do not ask it to email a coordinator, create an account, share your phone number, upload identification, accept a shift, or schedule an interview. Once you choose a role, contact the organization yourself or separately review a specific message. A published listing does not authorize the agent to represent you.` },
        { heading: "Use a prompt that stops at a shortlist", body: `Try: “Find current public volunteer opportunities for a person who can serve on Saturday mornings, up to three hours each week, within 20 km of Bristol or fully remote. Prioritize mentoring and community technology support. Record the host organization, direct role URL, location or remote scope, exact time commitment, eligibility, training, accessibility information, deadline, and date checked. Use pass, mismatch, or needs checking against my constraints. Prefer the organization's own page; keep directory-only results labeled. Do not contact anyone, create an account, submit an application, or share my personal details. Return a source-linked shortlist and questions to ask.”

Read the original role pages before choosing. A browser can make the search and comparison easier to review, but only the organization can confirm whether its listing remains open and whether it can accommodate a particular schedule or access need.` }
      ],
      faq: [
        { question: "Is a directory listing proof that the role is still open?", answer: "No. Check the host organization's page and ask it if the listing has no current status or date." },
        { question: "Should I enter a disability or medical condition in the prompt?", answer: "Share only the minimum information needed. Describe the accommodation to confirm rather than copying medical details into a general agent prompt." },
        { question: "Can an agent apply to a volunteer role for me?", answer: "This workflow stops before contact or application. Review the organization and the exact role first, then decide whether to authorize a separate step." },
        { question: "How do I compare two roles with different schedules?", answer: "Check each hard condition first, including shift hours, term length, travel, training, and access. Keep unresolved details visible instead of hiding them in one score." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器筛选符合时间安排的志愿服务",
      description: "按可服务时间、投入时长、无障碍需求、资格和组织方信息比较公开岗位，先核实再联系。",
      category: "AI 浏览器指南",
      content: "志愿服务岗位看起来合适，实际可能不符合每周可投入时间、通勤范围、技能或无障碍需求。AI 浏览器可以把公开岗位整理成可复核清单。每个岗位都应在组织方自己的网站确认，把时间和资格条件与来源放在一起，并在联系或报名之前停下。目录匹配只是线索，不能证明岗位仍开放或适合你。",
      sections: [
        { heading: "先说明实际可服务时间和边界", body: `从时间和参与条件开始，而不只是你关心的公益议题。列出可服务的星期和时段、时间是否固定、通勤距离、线上或现场偏好、最短和最长持续时间，以及培训安排。说明可以提供的技能和不愿承担的任务。需要无障碍安排时，只写需要组织方确认的条件，不要把详细健康资料交给通用智能体。

清楚区分硬条件和偏好。“工作日晚上每次不超过两小时”可能会排除每周固定四小时的岗位；“偏好环境保护项目”可以帮助排序，但不必删掉其他合格选择。写明地点半径，以及是否依赖公共交通或无台阶通道。如果无法长期投入，优先找单日活动或短期项目，不要让智能体替你猜可以调整时间。` },
        { heading: "搜索多个目录，再核对组织方页面", body: `志愿服务目录在覆盖地区、议题类别、岗位类型、年龄限制、时间和旧信息清理方式上各不相同。可以同时查看全国或地区服务、本地志愿者中心，以及相关公益组织。本文检查的公开搜索页面提供了不同筛选项：有些列出每周投入和可用时段，有些主要按地区、兴趣、年龄组或活动类型筛选。目录中的岗位描述可能缺项或过期。

把结果当作当前岗位前，先打开服务组织自己的机会页面。记录组织名称、岗位标题、原始岗位网址、地点或远程范围、发布或截止日期（若页面有显示）和检查时间。如果岗位只出现在目录，或跳转到失效页面，应如实写明。不能凭目录徽标判断组织信誉，也不能把目录的审核理解成安全保证。` },
        { heading: "比较投入、资格和实际参与条件", body: `志愿岗位页面常用概括性描述。保留组织方的原话，不要把它改写成确定匹配评分。确认年龄或背景审查、入职说明、培训时长、最低服务期限、值班时间、站立或搬运要求、语言能力、交通和费用报销。如果页面没有说明无障碍条件，应向组织方询问。

| 字段 | 记录内容 | 来源不清楚时 |
| --- | --- | --- |
| 时间 | 星期、时段、频率和日期范围 | 标为未知，承诺前询问 |
| 投入量 | 总时长或每周小时数和周期 | 保留原句，不要模糊换算 |
| 资格 | 年龄、技能、审查、培训和语言 | 引用原要求并保留页面链接 |
| 参与条件 | 地点、远程限制、体力任务和无障碍安排 | 向组织方确认，不从岗位名猜测 |
| 组织信息 | 公开名称和组织方网站 | 分别保留目录和组织网址 |
| 状态 | 报名窗口或最近更新时间 | 分享个人资料前重新核对 |

如果岗位原文明确要求的时段或参与条件与你的条件冲突，标为“不符合”；只有原文缺少关键信息或说法含糊时才标为“待确认”。不要把确定的冲突留作待问问题。` },
        { heading: "排序时保留取舍", body: `每条硬条件使用“符合、不符合、待确认”。确认这些条件后再按偏好排序。简短解释比单一分数有用：“可从英国任何地方远程参与；每周需要三到七小时；要求有理事经验；未说明具体值班日。”你可以据此判断是否要问组织方。

不同岗位应各占一行，即使它们属于同一个组织也不要合并。一次性活动和长期岗位的时间不同；志愿者协调和现场服务需要的审查也可能不同。排班要区分固定值班、轮班、培训日和临时替班，并把通勤时间与每周投入量分开计算。保留备选项，免得首选名额满了或信息过期后，被迫接受不符合自己限制的岗位。` },
        { heading: "联系前确认组织真实性和个人资料范围", body: `申请前通过组织方官网核实岗位、联系渠道、服务地点和背景审查流程。对于要求付款、银行卡信息、密码、身份证件或与岗位无关个人资料的请求要谨慎。合理的志愿者筛查可能会收集必要信息，但组织方应说明谁会处理资料和用途。组织或请求难以核实时，可向当地志愿者中心求证。

研究阶段只让 AI 浏览器读取公开页面。不要让它给协调员发邮件、创建账号、提供手机号、上传身份证件、接受排班或安排面谈。选定岗位后，由你自己联系组织，或另行复核一封明确的消息。页面公开发布岗位并不代表智能体可以代表你沟通。` },
        { heading: "让提示词停在可复核清单", body: `可以这样要求：“查找当前公开志愿岗位。我的条件是周六上午可服务，每周最多三小时，距离布里斯托二十公里以内或完全远程。优先关注辅导和社区数字技术支持。记录组织、直接岗位网址、地点或远程范围、原文投入时长、资格、培训、无障碍信息、截止日期和检查日期。对照条件标记符合、不符合或待确认。优先使用组织方页面；只找到目录信息时明确标注。不要联系任何人、创建账号、提交申请或分享我的个人资料。返回一份带来源链接的清单和待询问问题。”

选择前还要阅读岗位原文。浏览器能让搜索和比较过程更容易复核，但只有组织方能确认岗位是否仍开放，以及能否安排特定时段或无障碍参与条件。` }
      ],
      faq: [
        { question: "目录中的岗位是否证明还在招募？", answer: "不能。查看组织方自己的页面；状态和日期不清楚时，直接向组织确认。" },
        { question: "提示词里要写残障或疾病信息吗？", answer: "只提供完成任务所需的最少信息。写需要确认的参与安排即可，不要把详细医疗资料放进通用智能体提示词。" },
        { question: "可以让智能体替我申请岗位吗？", answer: "本文流程停在联系和申请之前。先核对组织及具体岗位，再决定是否单独授权后续步骤。" },
        { question: "两个岗位的排班不同，如何比较？", answer: "分别检查每项硬条件，包括值班时间、周期、通勤、培训和参与条件。未解决的信息要保留，不能藏进一个总分里。" }
      ]
    }
  },
  "playwright-test-multiple-roles-permissions": {
    en: {
      title: "Test Multiple User Roles and Permission Boundaries with Playwright",
      description: "Use separate browser contexts for a synthetic admin and member, then verify protected server responses as well as what the interface displays.",
      category: "Browser agent development",
      content: "A role-based UI test should check what each user can see and what the server will actually allow. In a real test, Playwright can open separate browser contexts initialized with approved test identities, keeping their cookies and storage apart. That isolation helps reproduce two sessions; it does not establish that the application enforces authorization. Verify a protected endpoint or persisted action for each role in an environment you control. The downloadable example uses a caller-controlled toy selector instead of authentication, so it cannot validate a real permission policy.",
      sections: [
        { heading: "Write the permission matrix before the test", body: `Choose one protected action and state the expected result for each role. For example, an administrator may view a synthetic audit panel while a member sees the ordinary dashboard; the member's request to the protected API must still be denied. A hidden button is not a security boundary. The server must check the authenticated identity and the requested action, including when a caller bypasses the page and sends a direct request.

| Role | Page-level expectation | Protected request expectation |
| --- | --- | --- |
| Admin | Shows the audit link and panel | Returns the synthetic audit record |
| Member | Does not show the audit link | Returns the documented forbidden response |
| Signed out | Shows sign-in route | Returns an unauthenticated response |

Use the matrix to distinguish authentication (“who is signed in?”) from authorization (“may this identity do this action?”). Keep a stable test object identifier and a known expected response so a failure points to the relevant boundary.` },
        { heading: "Create one context for each role", body: `Playwright's authentication guide shows how to create multiple BrowserContexts with different saved states in one test. A context owns its cookies, local storage, pages, and other session data. Do not reuse one Page and swap a role label in page content; that would not model independent browser sessions. Create both contexts from known test state, create one page per context, and use the same controlled origin for the comparison.

Separate contexts help catch accidental state leakage, such as an admin cookie copied into a member page. They do not make the server enforce a policy. The application test environment must create or seed two distinct test identities with the roles under test. Avoid borrowing a colleague's profile, copying a real session cookie, or attaching a production account. The fixture described below supplies simulated identities only and cannot validate a real application's access controls.` },
        { heading: "Check the rendered interface and the server boundary", body: `For each role, assert a meaningful visible state, then request the protected resource from that role's context. The admin page should show the permitted view and its request should return the expected synthetic payload. The member page should omit the restricted control, and its direct request should receive the documented denial. If the control is hidden but the endpoint returns protected data, the test must fail. If the control appears for a role that should not have it, the UI assertion must fail even if the endpoint denies access.

Keep status and body checks separate. A 403 may be the intended result for an authenticated user without permission; a 401 may indicate an unauthenticated request. Exact application behavior can differ, so assert the contract your service documents. Also check that the denied request did not change the test record. Permission checks cover both reads and writes when those actions have different policy rules.` },
        { heading: "Keep the test isolated and clean up both contexts", body: `Create contexts inside the test and close them in a finally block, so a failing assertion does not leave a browser session running. Use a new context per role even when the same browser process hosts both pages. If the two roles can modify shared test data, seed separate records or reset the fixture between cases. For role combinations beyond admin and member, create a table-driven test over the documented permission matrix rather than copying assertions with inconsistent expectations.

Never print cookie values, storage-state JSON, access tokens, or secret response fields in the test output. Playwright warns that saved authentication state can contain credentials usable to impersonate an account. Use throwaway identities, keep auth files out of version control, and remove them with the test output directory. If a saved state expires, regenerate it through the approved test login flow; do not copy active browser state from a human profile.` },
        { heading: "Read failures as clues, not proof of a breach", body: `A member-visible button paired with a 403 can reveal a UI permissions mismatch. A missing button paired with a successful protected API response is a server-side access-control defect in the test environment and needs immediate investigation. A 401 can mean the test setup did not authenticate the role at all; inspect the final URL and controlled test identity before concluding that authorization is broken.

Record role name, action, object ID, page expectation, request method and route, response status, and whether test data changed. Avoid storing response bodies that contain unrelated personal information. OWASP's authorization guidance recommends checking permissions on every request and denying by default. This synthetic example illustrates a test shape; it is not an audit of any production service, identity provider, or deployed authorization policy.` },
        { heading: "Run the downloadable local fixture", body: `Download [the local role and screenshot fixture](/templates/playwright-role-visual-fixture.mjs) and save it as playwright-role-visual-fixture.mjs in a temporary Node.js project. It requires Node.js 22 or later and Playwright. Run each command from that project directory:

- npm init -y
- npm install playwright
- npx playwright install chromium
- node playwright-role-visual-fixture.mjs

If Playwright is already installed in a shared cache, set PLAYWRIGHT_MODULE_URL to its module URL before running the script. The script starts a loopback-only server and launches two fresh browser contexts. Its readable fixture-role cookie is a caller-controlled toy selector, not an authentication credential. The endpoint branches on that value only to make the demo states distinct.

The fixture checks the synthetic admin and member page states and one direct member request to the loopback endpoint. It then captures two screenshots of the same page with different fixed timestamp text, asserts both text values separately, shows that unmasked PNG buffers differ, and checks that the masked buffers are byte-equal in this single process. It writes no screenshot files. It uses no non-loopback page requests, real accounts, application backend, model API, or production data. This does not implement authentication, test a real authorization contract, assess security, or establish baseline compatibility across environments.` }
      ],
      faq: [
        { question: "Do separate browser contexts prove that authorization is secure?", answer: "No. They isolate browser storage. Test the server's protected endpoint for each role and inspect whether unauthorized requests change data." },
        { question: "Is hiding an admin button enough to deny a member?", answer: "No. The server must enforce the permission for every protected request, even if someone bypasses the UI." },
        { question: "Can I use my real signed-in browser state?", answer: "Use disposable test identities in a controlled environment. Stored state can contain credentials that impersonate the account." },
        { question: "What does the downloadable fixture verify?", answer: "It demonstrates synthetic context separation, a local protected response, and screenshot masking. It does not test a production application's authorization." }
      ]
    },
    "zh-cn": {
      title: "用 Playwright 测试多角色权限边界",
      description: "为虚构管理员和普通成员创建独立浏览器上下文，并分别检查受保护接口响应和页面显示内容。",
      category: "浏览器智能体开发",
      content: "基于角色的界面测试，既要检查不同用户能看到什么，也要检查服务器实际允许什么。真实测试可以让 Playwright 为两个经批准的一次性身份创建独立浏览器上下文，使 Cookie 和存储数据各自隔离。这有助于模拟两个会话，但不能证明应用已经执行权限控制。应分别验证受保护接口或持久化操作。本文下载示例使用调用方可控的演示选择器代替认证，因此不能验证真实权限策略。",
      sections: [
        { heading: "先写权限矩阵，再开始测试", body: `选择一个受保护操作，明确每种角色的预期结果。例如，管理员可以查看虚构的审计面板，普通成员只看到一般工作台；成员即使直接请求受保护 API，也应被拒绝。隐藏按钮不是安全边界。服务器必须根据已认证身份和请求操作逐次检查权限，包括绕过页面直接发送请求的情况。

| 角色 | 页面预期 | 受保护请求预期 |
| --- | --- | --- |
| 管理员 | 显示审计链接和面板 | 返回合成审计记录 |
| 普通成员 | 不显示审计链接 | 返回约定的禁止访问响应 |
| 未登录 | 显示登录入口 | 返回未认证响应 |

矩阵要分别说明认证和授权：“当前是谁登录”与“这个身份能否执行该操作”是两项检查。使用稳定的测试对象编号和已知响应结果，失败时才能定位到对应边界。` },
        { heading: "为每种角色创建独立上下文", body: `Playwright 认证指南展示了如何在一个测试中使用不同保存状态创建多个 BrowserContext。上下文分别拥有 Cookie、本地存储、页面和其他会话数据。不要在同一个 Page 上只修改角色标签来模拟不同账号，这不是真正独立的浏览器会话。应从已知测试状态分别创建两个上下文和页面，并在同一个受控来源下对比。

独立上下文有助于发现管理员 Cookie 意外泄漏到成员页面等状态混用问题，但它不能让服务器自动执行权限策略。测试环境应创建或初始化两个具备不同角色的一次性身份。不要借用同事档案、复制真实会话 Cookie 或附加生产账号。下方 fixture 只使用调用方可控的演示选择器；它既不是认证，也不是对真实应用访问控制的检查。` },
        { heading: "同时检查页面和服务端边界", body: `对每种角色先断言有意义的可见状态，再从该角色的上下文请求受保护资源。管理员页面应显示允许的内容，请求应返回预期合成数据。成员页面不应显示受限控件，直接请求也应收到约定的拒绝响应。如果按钮隐藏但接口泄露受保护数据，测试必须失败。如果不应有权限的角色看到了按钮，即使接口返回拒绝，页面断言也应失败。

分别检查状态码和响应内容。已认证但无权访问时，应用可能约定返回 403；401 可能表示请求未认证。实际行为依应用 API 契约，测试时按服务文档断言。还要检查被拒绝请求没有修改测试记录。读取权限和写入权限可能不同，应分别确认适用规则。` },
        { heading: "隔离测试数据并关闭两个上下文", body: `在测试中创建上下文，并在 finally 中关闭，避免断言失败后留下浏览器会话。即使两个页面由同一个浏览器进程运行，每个角色也应有独立上下文。如果角色可能修改共享测试数据，应创建独立记录或在用例间重置 fixture。角色超过两种时，可按文档权限矩阵编写数据驱动测试，不要复制一组期望却漏改其中几条断言。

不要在测试输出打印 Cookie 值、状态 JSON、访问令牌或包含秘密字段的响应。Playwright 提醒，认证状态文件可能包含可用于冒充账号的凭据。使用临时身份，把认证文件排除在版本控制之外，并随测试输出目录一并清理。保存状态过期后，应按获准的测试登录流程重新生成，不能从真人浏览器资料中复制。` },
        { heading: "把失败当作线索，别直接推断安全事故", body: `成员看到了按钮但接口返回 403，可能是界面权限展示错误。按钮隐藏而受保护 API 成功返回，则是测试环境中的服务端访问控制缺陷，需要调查。若返回 401，可能是测试身份根本没有登录成功；在判断授权出错前，应先检查最终网址和受控测试身份。

记录角色名、操作、对象编号、页面预期、请求方法和路由、响应状态，以及测试数据是否变化。避免保存无关个人资料的响应内容。OWASP 的授权指南建议每次请求都检查权限，并默认拒绝。本文合成示例只展示测试结构，没有审计任何生产服务、身份提供商或线上权限策略。` },
        { heading: "运行本地下载 fixture", body: `下载[本地角色和截图 fixture](/templates/playwright-role-visual-fixture.mjs)，保存为临时 Node.js 项目中的 playwright-role-visual-fixture.mjs。需要 Node.js 22 或更新版本及 Playwright。在项目目录中逐条运行：

- npm init -y
- npm install playwright
- npx playwright install chromium
- node playwright-role-visual-fixture.mjs

如果 Playwright 已安装在共享缓存中，可在运行前把 PLAYWRIGHT_MODULE_URL 设为对应模块 URL。脚本只会在本机回环地址启动服务器，并创建两个新的浏览器上下文。可读的 fixture-role Cookie 是调用方可控的演示选择器，不是认证凭据；本地接口仅根据它切换示例响应。

fixture 检查虚构管理员和成员页面状态，以及成员对本机接口的一次直接请求。随后它对同一页面的两段固定时间戳文字分别断言，截取两组截图，显示未遮罩的 PNG 字节不同，并检查同一进程中遮罩后的字节相同。脚本不写截图文件，也不访问非本机页面、真实账号、业务后端、模型 API 或生产数据。这不是认证实现，不会测试真实授权契约或评估安全性，也不能证明不同环境中的截图基准兼容。` }
      ],
      faq: [
        { question: "不同浏览器上下文能证明授权安全了吗？", answer: "不能。上下文只隔离浏览器存储。应按角色测试服务器受保护接口，并检查未授权请求是否改动数据。" },
        { question: "隐藏管理员按钮足以拒绝成员操作吗？", answer: "不够。即使用户绕过界面直接请求，服务器仍必须对每次受保护请求执行权限检查。" },
        { question: "可以使用自己已登录的浏览器状态吗？", answer: "应在受控环境中使用一次性测试身份。保存的认证状态可能包含可冒充账号的凭据。" },
        { question: "下载的 fixture 会验证什么？", answer: "它演示合成上下文隔离、本地受保护响应和截图遮罩，不会测试生产应用的授权策略。" }
      ]
    }
  },
  "playwright-stabilize-dynamic-screenshot-assertions": {
    en: {
      title: "Stabilize Playwright Screenshot Assertions Around Dynamic Content",
      description: "Make visual tests repeatable by fixing page state, masking only volatile regions, and asserting the masked content separately.",
      category: "Browser agent development",
      content: "A screenshot mismatch can come from a real layout change, a changing timestamp, an animation, different test data, or a different rendering environment. Playwright's screenshot assertion waits for consecutive screenshots to stabilize, but it cannot decide which difference matters to your product. Make the page state deterministic first, mask only known noise, and assert important dynamic content through text or accessible state separately.",
      sections: [
        { heading: "Decide what the screenshot should prove", body: `A visual assertion is useful for a stable rendering contract: spacing, responsive structure, a component state, or a critical layout. It is weaker for values whose correctness depends on business logic, user permissions, or the contents of a list. Cover those behaviors with normal assertions and use a screenshot to catch visual regressions around them. Before writing a baseline, define the route, viewport, color scheme, locale, test data, and interaction state.

Playwright Test's toHaveScreenshot assertion waits until two consecutive screenshots look the same before comparing the result to the stored expectation. This helps with short-lived visual settling, but it does not make a rotating ad, random record order, live clock, or nondeterministic API response stable. A screenshot that happens to match after a delay may still capture the wrong application state.` },
        { heading: "Freeze the source of variation when possible", body: `Control data at the earliest reliable layer. Seed or reset test records, stub an API response owned by your test, freeze the page clock when dates matter, and wait for the visible state you intend to capture. Disable animations only when motion is outside the behavior under test. Move the pointer away from hover-sensitive controls, make font loading predictable, and use the same browser build and operating environment for baseline generation and comparison.

If an external image, advertisement, or user-generated item changes unpredictably, decide whether it belongs in the visual contract. A selector mask can hide that region, but it also hides unexpected layout or content changes inside the masked area. Prefer a deterministic fixture or a small element-level assertion when possible. Avoid network-idle as a universal readiness signal: persistent connections or background polling can keep it from representing the page's actual readiness.` },
        { heading: "Mask only an identified volatile region", body: `Playwright screenshot assertions accept locators to mask. Use a locator tied to the actual volatile element, such as a displayed time label, instead of blanketing a large panel or the whole page. Give the mask a visible color in a review screenshot if that helps reviewers understand what was excluded. Keep the mask list near the assertion so a later maintainer can see why the area is ignored.

| Source of difference | Better first step | When masking may fit |
| --- | --- | --- |
| Current time or relative age | Freeze the clock or use fixed test data | When the live value itself is out of scope |
| Random avatar or decorative image | Use a stable fixture image | When the image is genuinely noncritical |
| Rotating promotion | Disable it in the test environment | When only that isolated region is out of scope |
| Dynamic balance or permission label | Assert its value and role separately | Do not mask a decision-critical value |
| Font or browser rendering drift | Pin the environment and fonts | Masking usually hides the wrong layer |

Masking every changed element until the test passes removes the signal the screenshot was meant to catch. Review masks as part of the test's maintenance, not as a way to silence every red diff.` },
        { heading: "Assert the information you masked", body: `A screenshot mask removes pixels from the comparison; it does not check that the element still exists or contains the expected value. Add a locator assertion for the exact text, role, and visibility when that content matters. For a time stamp, you might assert that the status label appears and matches a fixed test clock while allowing its rendered region to be masked for a broader page snapshot. This protects both the semantic value and the surrounding layout.

Do not mask an entire control if the test is supposed to detect whether it is disabled, missing, or mislabeled. Instead, assert enabled state, accessible name, and action outcome separately, then mask only the unstable decoration. Keep a page-level snapshot and an element-level snapshot for separate questions rather than using one large screenshot to cover every behavior.` },
        { heading: "Keep baselines tied to the environment", body: `Playwright's visual comparison guide warns that screenshots vary by operating system, browser version, hardware, power source, and headless mode. A baseline generated on one environment is not automatically byte-portable to another. Record the Playwright package and browser versions, operating system, viewport, device scale factor, fonts, and relevant project settings next to the baseline update. Run the comparison in the same controlled environment as the reference whenever practical.

When a snapshot fails in CI, inspect the actual and expected images plus the diff. First ask whether the page state changed, then whether the rendering environment changed, and only then whether the product layout regressed. Update a baseline only after a person reviews the new behavior against the product requirement. Do not bulk-update snapshots just to clear a build. Pixel thresholds can tolerate small rendering differences, but a larger threshold can hide a real defect; document why it is set.` },
        { heading: "Reproduce the pattern with a local fixture", body: `Download [the local role and screenshot fixture](/templates/playwright-role-visual-fixture.mjs) and save it as playwright-role-visual-fixture.mjs in a temporary Node.js project. It requires Node.js 22 or later and Playwright. Run each command from that project directory:

- npm init -y
- npm install playwright
- npx playwright install chromium
- node playwright-role-visual-fixture.mjs

If Playwright is already installed in a shared cache, set PLAYWRIGHT_MODULE_URL to its module URL before running the script. It serves a synthetic page on 127.0.0.1, creates fresh browser contexts, and compares two screenshots with different fixed timestamp text while separately asserting each exact text value.

The fixture makes two same-process captures of one synthetic page with different fixed timestamp text. It asserts both text values separately, checks that the unmasked PNG buffers differ, and checks that the masked buffers match byte for byte in this controlled run. It writes no image files, blocks page requests to any origin except its exact ephemeral loopback origin, and blocks service workers. Its readable fixture-role cookie is a caller-controlled toy selector, not an authenticated identity; the Node endpoint branches on the same synthetic value. This demonstrates mask mechanics only, not authentication, application authorization, a general visual regression suite, or cross-environment baseline portability. For a broader discussion of how visual and semantic checks answer different questions, see [browser-agent accessibility snapshots versus screenshots](/en/guides/browser-agent-accessibility-snapshot-vs-screenshot/). Add a toHaveScreenshot baseline to your own Playwright Test suite only after pinning the environment that will generate and compare it.` }
      ],
      faq: [
        { question: "Does toHaveScreenshot wait for the page to finish every request?", answer: "No. It waits for consecutive screenshots to stabilize. Control API data and define an observable readiness condition for your page." },
        { question: "Should I mask every timestamp and changing section?", answer: "Mask only content that is truly outside the visual contract. Assert decision-critical or user-visible values separately so masking does not hide a regression." },
        { question: "Can I generate a baseline on macOS and compare it on Linux?", answer: "Do not assume they are interchangeable. Browser rendering depends on the OS, browser build, fonts, hardware, and headless mode." },
        { question: "Does the fixture prove my screenshot tests are stable?", answer: "No. It demonstrates a synthetic timestamp mask and a separate text assertion on one local run; it does not test cross-environment baseline portability." }
      ]
    },
    "zh-cn": {
      title: "处理动态内容导致的 Playwright 截图断言不稳定",
      description: "先固定页面状态，只遮罩已确认会变化的区域，并单独断言被遮罩的内容。",
      category: "浏览器智能体开发",
      content: "截图不匹配可能来自真实布局变化、时间戳更新、动画、测试数据变化，也可能来自不同的渲染环境。Playwright 的截图断言会等待连续截图稳定，但不会替你判断哪些差异影响产品。先让页面状态可重复，再只遮罩确定的噪声，并通过文字或可访问状态单独检查重要动态内容。",
      sections: [
        { heading: "先确定截图要验证什么", body: `视觉断言适合检查稳定的渲染约定，例如间距、响应式结构、组件状态或关键布局。业务逻辑、用户权限或列表内容不宜只靠截图验证。用常规断言检查这些行为，再用截图检查周围是否出现视觉回归。生成基准图前先固定路由、视口、配色、语言环境、测试数据和交互状态。

Playwright Test 的 toHaveScreenshot 会等到连续两张截图相同后，再与保存的预期图比较。这有助于避开短暂的渲染变化，但无法让轮播广告、随机排序、实时钟或不确定的 API 响应变得稳定。截图过一段时间后刚好匹配，也不代表捕获的是正确应用状态。` },
        { heading: "能固定变化来源时，先从源头处理", body: `尽量在可靠的最早环节控制数据。为测试记录设种子或重置数据，为测试自有的 API 固定响应，日期有影响时冻结页面时钟，等待你要检查的可见状态。若动画不属于本次行为验证，可以在截图中关闭。把鼠标移出悬停控件，固定字体加载方式，并让基准截图和比较使用同一浏览器构建及运行环境。

外部图片、广告或用户内容若无法预测，先决定它是否属于视觉约定。定位器遮罩可以隐藏这块内容，但也会遮掉其中意外出现的布局和文字变化。能用固定 fixture 或小范围元素断言时优先使用。不要把 network-idle 当通用页面就绪信号：持续连接或后台轮询可能一直运行，它未必代表页面已准备好。` },
        { heading: "只遮罩已识别的变化区域", body: `Playwright 截图断言可以接收要遮罩的定位器。应指向具体动态元素，例如页面上显示的时间标签，而不是把整块面板甚至整页遮掉。需要给审阅者解释排除范围时，可在用于审查的截图中显示遮罩颜色。让遮罩列表紧挨断言，后续维护者才能看懂为什么这个区域不参与比较。

| 差异来源 | 优先处理方式 | 何时考虑遮罩 |
| --- | --- | --- |
| 当前时间或相对日期 | 冻结时钟或使用固定测试数据 | 实时值本身不在测试范围内时 |
| 随机头像或装饰图片 | 使用稳定的样本图片 | 图片本身确实不重要时 |
| 轮播促销内容 | 在测试环境停用轮播 | 只有隔离的促销区域不属于目标时 |
| 动态余额或权限标签 | 单独断言准确值和角色 | 影响判断的内容不要遮掉 |
| 字体或浏览器渲染差异 | 固定环境和字体 | 遮罩通常会掩盖错误层次 |

把所有变化元素都遮到测试通过，会移除截图原本要发现的信号。遮罩应作为测试维护内容复核，不是消除红色差异的快捷方式。` },
        { heading: "单独断言被遮罩的信息", body: `截图遮罩只会从像素比较中排除区域，不会检查元素是否仍存在或值是否正确。重要内容应使用定位器单独断言准确文本、角色和可见状态。例如时间戳可以在固定测试时钟下断言准确文案，同时在较大页面快照中遮罩其渲染区域。这样既检查语义值，也保留周围布局比较。

如果测试目标是确认控件是否禁用、缺失或标错，就不要把控件整体遮掉。分别断言启用状态、可访问名称和操作结果，再只遮住不稳定的装饰。页面级截图与元素级截图可以回答不同问题，不必用一张大截图覆盖所有行为。` },
        { heading: "基准图应绑定生成环境", body: `Playwright 视觉比较指南提醒，截图会受操作系统、浏览器版本、硬件、电源状态和无头模式影响。一个环境生成的基准图不能默认逐字节移植到另一环境。更新基准时，记录 Playwright 包和浏览器版本、操作系统、视口、设备缩放、字体和相关项目配置。尽可能在和基准生成相同的受控环境中比较。

CI 截图失败时，查看实际图、预期图和差异图。先查页面状态是否变化，再查渲染环境是否变化，最后判断是否是产品布局回归。只有人工对照产品要求复核了新行为，才更新基准。不要为了让构建变绿而批量更新快照。像素阈值可以容忍细小渲染差异，但阈值过大会掩盖真实缺陷，应说明设置理由。` },
        { heading: "用本地 fixture 复现模式", body: `下载[本地角色和截图 fixture](/templates/playwright-role-visual-fixture.mjs)，保存为临时 Node.js 项目中的 playwright-role-visual-fixture.mjs。需要 Node.js 22 或更新版本及 Playwright。在项目目录中逐条运行：

- npm init -y
- npm install playwright
- npx playwright install chromium
- node playwright-role-visual-fixture.mjs

如果 Playwright 已安装在共享缓存中，可在运行前把 PLAYWRIGHT_MODULE_URL 设为对应模块 URL。脚本会在 127.0.0.1 提供合成页面，创建新的浏览器上下文，并比较两段固定时间戳文字对应的截图。

fixture 会在同一进程中对同一合成页面截取两组不同固定时间戳的截图，分别断言两段文字，检查未遮罩的 PNG 字节不同，并检查遮罩后的字节完全一致。它不写图片文件，只允许访问当前精确的临时回环地址，并阻止 Service Worker。可读的 fixture-role Cookie 是调用方可控的演示选择器，不是认证身份；Node 接口也只是根据同一合成值切换分支。这只演示遮罩机制，不是认证实现、真实应用授权测试、通用视觉回归套件或跨环境基准兼容性验证。视觉图与语义快照解决的问题不同，可参考[浏览器智能体截图和无障碍快照对比](/zh-cn/guides/browser-agent-accessibility-snapshot-vs-screenshot/)。自己的 Playwright Test 套件应先固定生成和比较环境，再增加 toHaveScreenshot 基准。` }
      ],
      faq: [
        { question: "toHaveScreenshot 会等所有页面请求结束吗？", answer: "不会。它等待连续截图稳定。应固定 API 数据，并为页面定义可观察的就绪条件。" },
        { question: "所有时间戳和动态区域都要遮罩吗？", answer: "只遮罩确实不在视觉验证范围内的内容。重要值要另外断言，避免遮罩掩盖问题。" },
        { question: "可以在 macOS 生成基准图，再在 Linux 比较吗？", answer: "不要假定两边结果可直接通用。渲染会受系统、浏览器版本、字体、硬件和无头模式影响。" },
        { question: "fixture 能证明我的截图测试稳定吗？", answer: "不能。它只演示同一进程中两段固定时间戳的遮罩比较和独立文字断言，没有测试跨环境基准兼容性。" }
      ]
    }
  }
};

const related: Record<string, string[]> = {
  "ai-browser-build-degree-plan-from-course-catalogs": ["ai-browser-scholarship-eligibility-shortlist", "ai-browser-research-source-verification", "ai-browser-calendar-timezone-proposal", "ai-browser-organize-tabs-by-task"],
  "ai-browser-build-conference-agenda": ["ai-browser-calendar-timezone-proposal", "ai-browser-trip-planning", "ai-browser-meeting-prep-brief", "ai-browser-research-source-verification"],
  "ai-browser-volunteer-opportunity-shortlist": ["ai-browser-shortlist-job-postings", "ai-browser-scholarship-eligibility-shortlist", "ai-browser-research-source-verification", "browser-agent-structured-data-extraction"],
  "playwright-test-multiple-roles-permissions": ["browser-agent-session-expiry-recovery", "browser-automation-profile-persistence", "playwright-mcp-existing-browser", "browser-agent-debugging-traces"],
  "playwright-stabilize-dynamic-screenshot-assertions": ["browser-agent-accessibility-snapshot-vs-screenshot", "browser-agent-debugging-traces", "playwright-virtualized-grid-row-actions", "playwright-rich-text-editor-state-not-updated"]
};

export const aiCycleTranslations01: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides01: EditorialGuide[] = Object.keys(copies).map((slug) => ({
  ...copies[slug]["zh-cn"],
  slug,
  date: "2026-11-01",
  sourcePath: `src/data/ai-cycle-2026-11-01.ts#${slug}`,
  availableLocales: ["en", "zh-cn"],
  relatedBrowsers: [],
  relatedTools: [],
  sources: sourcesBySlug[slug],
  relatedGuides: related[slug] ?? []
}));
