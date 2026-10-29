import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const meetingSources = [
  { title: "Microsoft Support: Prepare for your meeting with Copilot", url: "https://support.microsoft.com/en-us/outlook/prepare-for-your-meeting-with-copilot" },
  { title: "Zoom Support: Generating meeting agendas with AI", url: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0081706" },
  { title: "Claude Academy: Prepare and plan from your calendar", url: "https://academy.claude.com/use-cases/prepare-and-plan-from-your-calendar" },
  { title: "ChatGPT use cases: Prepare meeting briefs", url: "https://learn.chatgpt.com/use-cases/meeting-prep-briefs" },
  { title: "ChatGPT Learn: Browser extension", url: "https://learn.chatgpt.com/docs/chrome-extension" }
];
const timezoneSources = [
  { title: "Google Calendar Help: Use Google Calendar in different time zones", url: "https://support.google.com/calendar/answer/37064?hl=en" },
  { title: "Google Calendar API: Events and calendars", url: "https://developers.google.com/workspace/calendar/api/concepts/events-calendars" },
  { title: "Microsoft Learn: Multiple time zones show an incorrect time difference when DST starts and ends", url: "https://learn.microsoft.com/en-us/troubleshoot/outlook/calendaring/additional-time-zone-shows-one-hour-offset-on-dst" },
  { title: "Microsoft Learn: How time zone normalization works in Outlook", url: "https://learn.microsoft.com/en-us/microsoft-365-apps/outlook/user-interface/time-zone-normalization" },
  { title: "IANA: Time Zones and the Time Zone Database", url: "https://www.iana.org/time-zones" },
  { title: "MDN: Temporal.ZonedDateTime", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal/ZonedDateTime" },
  { title: "Reddit r/GoogleCalendar: Timezones for Calendar events not working?", url: "https://www.reddit.com/r/GoogleCalendar/comments/1t1s0s0/timezones-for-calendar-events-not-working/" }
];
const permissionSources = [
  { title: "ChatGPT Learn: Browser extension", url: "https://learn.chatgpt.com/docs/chrome-extension" },
  { title: "ChatGPT Learn: Browser", url: "https://learn.chatgpt.com/docs/browser" },
  { title: "ChatGPT Learn: ChatGPT Work local security", url: "https://learn.chatgpt.com/docs/enterprise/chatgpt-work-local-security" },
  { title: "Claude Help Center: Claude in Chrome permissions guide", url: "https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide" },
  { title: "Google Chrome Help: Ask Gemini in Chrome to complete tasks for you with auto browse", url: "https://support.google.com/chrome/answer/16821166?hl=en" },
  { title: "Reddit r/ChatGPT: Browser access works on some sites but gets blocked on others", url: "https://www.reddit.com/r/ChatGPT/comments/1wu850y/browser_access_works_on_some_sites_but_gets/" }
];
const sessionSources = [
  { title: "Playwright: Authentication", url: "https://playwright.dev/docs/auth" },
  { title: "Playwright MCP: Storage & Authentication", url: "https://playwright.dev/mcp/tools/storage" },
  { title: "Playwright: BrowserContext storageState API", url: "https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state" },
  { title: "Reddit r/Playwright: Handle 401s and session expiry in long regression suites", url: "https://www.reddit.com/r/Playwright/comments/1wxhcti/handle_401s_and_session_expiry_in_long_regression/" },
  { title: "Reddit r/Playwright: Auth0 + Playwright storage state does not work for more than 1 test", url: "https://www.reddit.com/r/Playwright/comments/1fexpzz/auth0_playwright_storage_state_does_not_work_for/" }
];
const networkSources = [
  { title: "Playwright: Network", url: "https://playwright.dev/docs/network" },
  { title: "Playwright: Request API", url: "https://playwright.dev/docs/api/class-request" },
  { title: "Playwright: Page API", url: "https://playwright.dev/docs/api/class-page" },
  { title: "Playwright: Release notes", url: "https://playwright.dev/docs/release-notes" },
  { title: "Playwright issue #42385: WebKit page.goto hangs with no request issued", url: "https://github.com/microsoft/playwright/issues/42385" },
  { title: "Playwright issue #16749: Tests fail in Azure Pipelines with connection reset", url: "https://github.com/microsoft/playwright/issues/16749" },
  { title: "Reddit r/Playwright: Annoyed by timeout option when getting a URL", url: "https://www.reddit.com/r/Playwright/comments/16qfstt/annoyed-by-timeout-option-when-getting-a-url/" }
];

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "ai-browser-meeting-prep-brief": {
    en: {
      title: "Prepare an AI Browser Meeting Brief from Calendar, Email, and Notes",
      description: "Turn an authorized meeting event and related sources into a brief with traceable facts, open questions, and a draft agenda. Review it before sharing.",
      category: "AI browser guides",
      content: "A useful meeting brief tells you which event it covers, where each detail came from, and what still needs checking. An assistant can gather context from a calendar, email threads, notes, and linked documents, but its answer can sound complete when those sources are missing. Use a read-first workflow, keep each material claim next to its source, and stop at a private draft. This is a process guide, not a test of any vendor's meeting assistant.",
      sections: [
        { heading: "Choose the event before collecting context", body: `Start with one calendar event. Confirm its title, date, time zone, attendee list, organizer, and links. A recurring series may contain a changed agenda or attendee list for one instance, so use the actual event. If two events have similar titles, keep the event URL or another stable identifier in your notes.

Microsoft says Copilot's meeting insights rely on related content and may be generic when shared documents, prior emails, or chat history are missing. Zoom describes using earlier documents or meetings to draft an agenda. These are product descriptions, not evidence that a generated brief is complete. Mark sources as missing when you cannot find them.` },
        { heading: "Keep evidence beside each important statement", body: `Record the source title, link, and date checked for every point that could change what you say or decide. Distinguish confirmed event facts from suggested questions and inferences.

| Brief field | Fictional entry | Evidence to retain |
| --- | --- | --- |
| Event | Q3 design review, 2026-11-03 10:00–10:30 Europe/London | Calendar URL and displayed time zone |
| Attendees | Priya Shah, Daniel Wu | Names and domains shown on the event |
| Confirmed context | Team needs a decision on the mobile release gate | Linked planning note, heading, last updated date |
| Open issue | Invite names a release gate but no owner | Event and note; label unresolved |
| Prep question | Which test result would change the release decision? | Suggested question, not a sourced fact |
| Missing context | No recent thread found in the checked mailbox range | Search scope and date range, not “no discussion exists” |

This prevents a plausible summary from turning a missing source into a claim. For a long document, include its page or heading so a person can reopen the passage.` },
        { heading: "Draft from a fictional source packet", body: `Suppose an event called “Vendor renewal review” links to a six-page service note. The note says the evaluation ends on 2026-11-15, lists a pending security review, and says nothing about renewal cost. A related email dated 2026-10-27 asks whether a usage report will arrive before the meeting.

A careful draft reads: “Suggested decision question: whether to continue evaluation after 2026-11-15. Review status: security review pending (service note, ‘Open checks’, observed 2026-10-29). The note does not state renewal cost. Related email asks for a usage report by the meeting; receipt is not confirmed. Ask who owns the security review and whether the report arrived.”

It should not call the review failed, infer a price, or claim the report was received. This example is fictional; no calendar or email account was accessed.` },
        { heading: "Review the draft and keep follow-up actions separate", body: `Check every date, name, decision status, attachment, and quoted number against its source. Look for context that changed after a note was written. If the assistant mixes two events, drops a qualification, or uses an attendee's unrelated email, remove the claim and narrow the source set.

A final packet can include the event summary, linked facts, unresolved items, a short agenda, questions to ask, and a blank note area. Do not let preparation silently change the meeting, invite attendees, or send the packet. ChatGPT's current Chrome-extension guide distinguishes tab context, website access, extension permissions, and file-URL access. Those controls describe that product and do not establish identical behavior in other assistants.

For claim-by-claim checks, see [AI browser research source verification](/en/guides/ai-browser-research-source-verification/). For a consequential send or form action, see [browser agent submission approval](/en/guides/browser-agent-form-submission/).` },
        { heading: "Give the assistant a source-bounded brief request", body: `Before it searches, give it a narrow instruction such as: “Prepare a private brief for the calendar event [event URL or stable ID]. Use only the event and the sources I authorize: [source IDs, titles and supplied links]. Check [date range]. Do not search other events, unrelated mail or the wider drive. For every material fact, return its source ID, title, supplied link, passage or heading, source date if shown, and date checked. Mark each item CONFIRMED, INFERRED, MISSING or NOT READ. Never invent a link or source date. Separate the decision needed, open questions and a short agenda. Keep everything as a draft; do not edit the calendar, invite anyone or send the brief.”

A compact source register can use “ID | title | link supplied by me | source date shown | checked on | read status”. If a connector cannot read an item, label it NOT READ rather than filling the gap from another source. If the event refers to a report but the authorized packet does not contain it, say that the packet has no report; do not claim the report does not exist.` },
        { heading: "Check the brief against a fictional source register", body: `Use the earlier fictional renewal packet: S1 is the six-page service note, last checked 2026-10-29; S2 is a related email dated 2026-10-27. These IDs and dates are fictional labels, not links to real records.

| Output field | Draft from S1 and S2 | Status |
| --- | --- | --- |
| Suggested decision question | Continue the evaluation after 2026-11-15? | Proposed by the brief writer, not stated in S1 or S2 |
| Confirmed | Evaluation ends 2026-11-15; security review is pending (S1, “Open checks”) | Source-backed |
| Missing | Renewal price is not stated in S1; no usage report is included in the packet | Missing from these sources only |
| Unconfirmed | S2 asks whether the usage report will arrive before the meeting | Arrival and receipt are not confirmed |
| Questions | Who owns the pending review? Has the report arrived? What would change the decision? | Ask in the meeting |
| Short agenda | 3 min: review status; 3 min: verify report and owner; 4 min: decide next step and due date | Draft, 10 minutes |
| Action state | Private draft; no calendar or message changes | Not sent |

Correct three tempting errors: an email asking whether a report will arrive is not evidence it arrived; “pending review” does not mean “failed”; and a price missing from the note is not a zero price. If a source was not opened, mark it NOT READ. Leave the agenda as a proposal for the organizer to review.` },
      ],
      faq: [
        { question: "Can an AI browser make a complete brief from a calendar event alone?", answer: "It can draft one, but the result may be generic when related notes, email, or shared documents are missing. List sources checked and show missing context explicitly." },
        { question: "Should the assistant send the brief to attendees?", answer: "Keep preparation at a private draft unless sharing is separately authorized. Review recipients, sensitive details, and source links before sending." },
        { question: "Does a citation prove the brief is accurate?", answer: "No. Open the cited passage and check that it supports the statement, including its date and qualifications." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器准备会前简报：核对日历、邮件和会议资料",
      description: "从获准访问的日历事件及相关资料整理有来源的简报，标明待确认事项和议程草稿；复核前不对外发送。",
      category: "AI 浏览器指南",
      content: "一份能用的会前简报应说明对应哪场会议、每条关键信息来自哪里、哪些地方还没确认。AI 可以从日历、邮件、会议笔记和链接文档收集背景，但资料缺失时，回答仍可能显得完整。先用只读流程整理来源，再把议程和问题留在私人草稿里。本文说明工作方法，没有测试任何厂商的会议助手。",
      sections: [
        { heading: "先确定会议事件，再收集材料", body: `从一条日历事件开始，核对标题、日期、时区、参会人、组织者和链接。重复会议的某一次可能更改了议程或参与者，不能默认每场完全相同。如果标题相近，把事件链接或其他稳定标识记在工作记录里。

Microsoft 说明 Copilot 的会议信息依赖相关资料；缺少共享文档、历史邮件或聊天记录时，结果可能比较笼统。Zoom 介绍了用旧文档或之前的会议辅助生成议程。这些是产品方的功能说明，不代表生成内容完整。找不到资料时应标为缺失，而不是补成事实。` },
        { heading: "让简报中的重要信息都能追溯", body: `可能影响发言或决策的内容，都要记录来源标题、链接和查看日期。把已确认的会议事实、建议问题和推断分开。

| 简报字段 | 虚构示例 | 应保留的依据 |
| --- | --- | --- |
| 会议 | Q3 设计评审，2026-11-03 10:00–10:30 Europe/London | 日历链接和显示时区 |
| 参会人 | Priya Shah、Daniel Wu | 事件显示的姓名和邮箱域名 |
| 已确认背景 | 团队需要决定移动版发布门槛 | 计划文档、小节标题、更新日期 |
| 未解决事项 | 邀请提到发布门槛，但没有责任人 | 事件与文档；标为待确认 |
| 会前问题 | 哪项测试结果会改变发布决定？ | 建议问题，不能冒充来源事实 |
| 缺少的背景 | 在指定邮箱和日期范围内没找到近期邮件 | 记录查询范围，不能写成“没有讨论过” |

这样可以避免把来源缺失的内容写进一份看似完整的摘要。长文还应注明页码或小节，方便参会者打开原文复查。` },
        { heading: "用虚构资料包起草简报", body: `假设一场“供应商续约评审”链接了一份六页服务记录。记录写着评估将于 2026-11-15 结束，有一项安全审查仍待处理，没有说明续约价格。一封 2026-10-27 的相关邮件询问用量报告能否在会前到达。

一份谨慎的草稿可以写：“建议的问题：2026-11-15 后是否继续评估？审查状态：安全审查待处理（服务记录‘未完成检查’，2026-10-29 查看）。记录未写续约费用。相关邮件询问用量报告能否在会前到达，是否收到尚未确认。建议询问安全审查负责人，以及报告是否已经到达。”

不能把待审查改成审查失败，不能猜价格，也不能说报告已经收到。例子是虚构的，没有访问真实日历或邮箱。` },
        { heading: "检查草稿，后续操作另行授权", body: `逐条核对日期、姓名、决定状态、附件和数字，并确认资料是否有更新。如果助手混淆两场会议、漏掉限定条件，或引用参会人无关邮件，就删除该条并缩小资料范围。

最终简报可以包括会议摘要、带链接的已知事实、未解决项、简短议程、待问问题和空白记录区。除非另有授权，不要让助手修改日历、邀请参会人或发送简报。ChatGPT Chrome 扩展的当前官方说明分别介绍了标签页上下文、网站访问、扩展权限和文件 URL 权限；这些规则只适用于该产品，不能推成所有助手都有相同权限。

逐项核验事实可看 [AI 浏览器研究来源核验](/zh-cn/guides/ai-browser-research-source-verification/)，涉及发送或提交的操作可参考[浏览器智能体表单提交审批](/zh-cn/guides/browser-agent-form-submission/)。` },
        { heading: "先给出限定来源范围的简报指令", body: `开始检索前，先给助手一条范围明确的指令，例如：“请为日历事件[事件链接或稳定 ID]准备一份私人简报。只使用这场事件和我授权的资料：[来源 ID、标题和我提供的链接]。检查范围是[日期区间]。不要搜索其他会议、无关邮件或整个云盘。每条重要事实都列出来源 ID、标题、我提供的链接、原文小节或页码、来源显示的日期和查看日期。每条标为已确认、推断、缺失或未读取。不得编造链接和来源日期。单独列出待决事项、待问问题和简短议程。保持为草稿，不修改日历、不邀请他人、不发送简报。”

来源登记表可以写成“ID｜标题｜由我提供的链接｜来源显示日期｜查看日期｜读取状态”。连接器读不到某份材料时标为“未读取”，不要用其他资料填补。如果事件提到一份报告，但授权资料包里没有，就写“本次资料包没有报告”；不要推断这份报告不存在。` },
        { heading: "用虚构来源表核对简报", body: `沿用上文虚构的续约资料：S1 是六页服务记录，查看日期为 2026-10-29；S2 是 2026-10-27 的相关邮件。这些 ID 和日期只是虚构标签，不对应真实资料链接。

| 输出字段 | 根据 S1 和 S2 起草的内容 | 状态 |
| --- | --- | --- |
| 建议的问题 | 2026-11-15 后是否继续评估？ | 简报作者提出，S1/S2 没有明确要求 |
| 已确认 | 评估于 2026-11-15 结束；安全审查仍待处理（S1“未完成检查”） | 有来源支持 |
| 缺失 | S1 未写续约费用；资料包里没有用量报告 | 仅表示这些来源里缺少 |
| 未确认 | S2 询问用量报告能否在会前到达 | 尚未确认报告是否到达或收到 |
| 待问问题 | 谁负责未完成的审查？报告到了吗？什么情况会改变决定？ | 会上询问 |
| 简短议程 | 3 分钟：核对审查状态；3 分钟：确认报告与负责人；4 分钟：决定下一步和期限 | 10 分钟草稿 |
| 操作状态 | 私人草稿；未改日历或消息 | 未发送 |

有三种说法要纠正：邮件询问报告是否会到，不代表报告已经到达；“审查待处理”不等于“审查失败”；记录没写价格不等于价格为零。来源未打开时标为“未读取”。议程只是提案，留给组织者审核。` },
      ],
      faq: [
        { question: "只给 AI 浏览器一条日历事件，就能得到完整简报吗？", answer: "它可以先起草，但缺少相关笔记、邮件或共享文档时，结果可能比较笼统。应列出实际检查过的来源，并明确说明缺少哪些背景。" },
        { question: "要不要让助手把简报直接发给参会者？", answer: "除非已单独授权分享，否则先保留为私人草稿。发送前核对收件人、敏感信息和来源链接。" },
        { question: "摘要附了文档引用，就能证明内容准确吗？", answer: "不能。打开引用位置，确认它支持对应说法，并核对日期与限定条件。" }
      ]
    }
  },
  "ai-browser-calendar-timezone-proposal": {
    en: {
      title: "Propose Meeting Times Across Time Zones with an AI Browser",
      description: "Draft date-specific candidates with IANA zones, UTC offsets, and both local dates. Escalate DST gaps and repeated times for human confirmation.",
      category: "AI browser guides",
      content: "A calendar suggestion should name the instant it means, then show how that instant appears to each participant. A city name, browser locale, or fixed offset is not enough: daylight-saving rules change by date, and local clock times can be skipped or repeated. Have an AI browser draft candidates from explicit constraints, verify them against named time zones, and leave the calendar unchanged until a person confirms.",
      sections: [
        { heading: "Use a real date and named time zones", body: `Ask for the date range, meeting length, each participant's IANA time zone, working hours, and blackout periods. Keep a stated local time attached to its zone. If someone gives only a country, region, or ambiguous city name, confirm the intended time zone before calculating.

Google Calendar supports choosing an event time zone and displays the same event in invitees' local zones. The Google Calendar API uses IANA names such as America/Los_Angeles. Use date-aware time-zone rules; do not reuse today's UTC offset for a future meeting. IANA's database can change when governments change their rules, so verify the current data near the meeting date.` },
        { heading: "Recalculate a fictional candidate", body: `Assume one participant is in America/Los_Angeles and the other in Europe/London. On 2026-11-02, Los Angeles is on Pacific Standard Time (UTC−08:00) after its November 1 clock change; London is on GMT (UTC+00:00) after its October 25 change. A 09:00 Los Angeles candidate maps to 17:00 UTC and 17:00 in London on the same date.

| Participant | IANA zone | Candidate local time | Offset on 2026-11-02 | UTC instant | Local date |
| --- | --- | --- | --- | --- | --- |
| Los Angeles | America/Los_Angeles | 2026-11-02 09:00 | −08:00 | 2026-11-02 17:00Z | 2026-11-02 |
| London | Europe/London | 2026-11-02 17:00 | +00:00 | 2026-11-02 17:00Z | 2026-11-02 |

This is a worked conversion, not a calendar booking or evidence those hours suit the participants. Recompute if the date or zone changes. Microsoft has documented Outlook display errors around DST boundaries; after entry, verify the event itself.` },
        { heading: "Format a UTC instant with Node.js", body: `Download [calendar-timezone-format.mjs](/templates/calendar-timezone-format.mjs), save it as calendar-timezone-format.mjs, then run node calendar-timezone-format.mjs in that directory. It requires Node.js 22 or later with ICU time-zone data. In one local run on 2026-10-29, Node.js 22.22.3 with ICU 78.2 and bundled time-zone data 2026a printed “America/Los_Angeles: 02/11/2026, 09:00 GMT-08:00” and “Europe/London: 02/11/2026, 17:00 GMT+00:00”, then exited successfully. It does not read or update a calendar. This example formats a known UTC instant; it does not detect ambiguous local input or test DST gaps/folds. The output reflects the runtime's bundled time-zone data; recheck the rules near an actual future meeting.` },
        { heading: "Pause on skipped or repeated times", body: `When clocks move forward, some local times have zero valid instants. For example, fictional Los Angeles 2026-03-08 02:30 does not exist; show nearby alternatives such as 01:30 or 03:00 with their UTC instants and ask the organizer to choose. When clocks move back, a local time can have two valid instants: fictional Los Angeles 2026-11-01 01:30 is either PDT (UTC−07:00, 08:30Z) or PST (UTC−08:00, 09:30Z). Show both and ask the organizer. Do not shift or select silently.

A candidate table should show the event date, IANA zone, date-specific offset, UTC instant, both participants' local date and time, duration, and unresolved constraints. After a person chooses, open the event draft and compare its displayed values with the table. Keep invitees and send controls untouched until separately approved. See [browser agent form submission approval](/en/guides/browser-agent-form-submission/).` }
      ],
      faq: [
        { question: "Can browser locale stand in for a participant's time zone?", answer: "No. Use an IANA zone supplied or confirmed for each participant. A device locale does not identify another person's time zone." },
        { question: "Should an agent choose one interpretation of a repeated DST time?", answer: "No. Show both possible instants with their offsets and ask the organizer to choose." },
        { question: "Does matching local time prove an invite is correct?", answer: "No. Check the event date, zone, UTC instant, duration, invitees, and final display before sending." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器提出跨时区会议时间：标明日期、时区和 UTC",
      description: "生成带 IANA 时区、UTC 偏移和双方当地日期的候选时间；遇到夏令时缺失或重复时刻时交由人确认。",
      category: "AI 浏览器指南",
      content: "日程建议要先确定具体时刻，再说明它在各参会人所在地如何显示。城市名称、浏览器语言或固定的“相差几小时”都不够，因为夏令时会按日期改变偏移，本地钟表时间还可能被跳过或重复。让 AI 浏览器根据明确条件起草候选时间，按命名时区逐项复算；得到确认前不改日历。",
      sections: [
        { heading: "使用真实日期和命名时区", body: `先询问日期范围、会议时长、各参会人的 IANA 时区、工作时间和不可用时段。用户提供的当地时间要与所属时区一起记录。对方只给国家、地区或可能有歧义的城市名称时，先确认具体时区再换算。

Google Calendar 支持为事件选择时区，并按参会人当地时间显示同一事件。Google Calendar API 使用 America/Los_Angeles 这类 IANA 名称。换算应使用按日期读取时区规则的数据，不能把今天的 UTC 偏移直接套到未来日期。各国政府可能调整规则，IANA 时区数据库也会更新；临近会议时应复核当前规则。` },
        { heading: "复算一个虚构候选时间", body: `假设一位参会人在 America/Los_Angeles，另一位在 Europe/London。2026-11-02 时，洛杉矶已在 11 月 1 日换回太平洋标准时间（UTC−08:00）；伦敦已在 10 月 25 日结束夏令时，使用 GMT（UTC+00:00）。所以洛杉矶时间 09:00 对应 17:00 UTC，也对应伦敦同一天的 17:00。

| 参会人 | IANA 时区 | 候选当地时间 | 2026-11-02 偏移 | UTC 时刻 | 当地日期 |
| --- | --- | --- | --- | --- | --- |
| 洛杉矶 | America/Los_Angeles | 2026-11-02 09:00 | −08:00 | 2026-11-02 17:00Z | 2026-11-02 |
| 伦敦 | Europe/London | 2026-11-02 17:00 | +00:00 | 2026-11-02 17:00Z | 2026-11-02 |

这是可复算的时间换算，不代表已在日历预约，也不说明时间适合参会者。日期或时区改变后要重算。Microsoft 记录过 Outlook 在夏令时边界附近的显示误差，因此写入后要核对事件。` },
        { heading: "用 Node.js 按时区格式化 UTC 时刻", body: `下载 [calendar-timezone-format.mjs](/templates/calendar-timezone-format.mjs)，保存为 calendar-timezone-format.mjs，并在该目录运行 node calendar-timezone-format.mjs。需要 Node.js 22 或更新版本及 ICU 时区数据。2026-10-29 的一次本地运行使用 Node.js 22.22.3、ICU 78.2 和附带时区数据 2026a，输出：“America/Los_Angeles: 02/11/2026, 09:00 GMT-08:00” 和 “Europe/London: 02/11/2026, 17:00 GMT+00:00”，随后正常退出。它不读取或修改日历，只格式化已知 UTC 时刻；不会反解含糊的当地时间，也没有测试夏令时缺口或重复时刻。该输出反映运行时自带的时区数据，实际会议临近时要复核规则。` },
        { heading: "遇到跳过或重复的时刻就暂停", body: `时钟向前调整时，部分当地时间对应零个有效时刻。例如虚构的洛杉矶时间 2026-03-08 02:30 不存在；可列出 01:30 或 03:00 等相邻选择及 UTC 时刻，请组织者决定。时钟向后调整时，一个当地时间可能对应两个时刻：虚构的洛杉矶时间 2026-11-01 01:30，可能是 PDT（UTC−07:00，08:30Z），也可能是 PST（UTC−08:00，09:30Z）。两种都列出让组织者选择，不要静默平移或任选一个。

候选表要包含事件日期、IANA 时区、当天偏移、UTC 时刻、双方当地日期与时间、时长和未满足的条件。人工选择后，打开事件草稿逐项对照。参会人和发送按钮保持待确认状态。提交边界见[浏览器智能体表单提交审批](/zh-cn/guides/browser-agent-form-submission/)。` }
      ],
      faq: [
        { question: "可以用浏览器语言代替参会人的时区吗？", answer: "不可以。每位参会人都应使用其提供或确认的 IANA 时区。设备语言不能推断他人的时区。" },
        { question: "重复的夏令时时刻要由智能体自行挑一个吗？", answer: "不要。重复的当地时间对应两个时刻，应同时列出偏移和 UTC 时间，交由组织者选择。" },
        { question: "双方当地时间一致就能证明邀请发对了吗？", answer: "不能。发送前应检查事件日期、时区、UTC 时刻、时长、参会人和日历显示。" }
      ]
    }
  },
  "ai-browser-tab-access-permissions": {
    en: {
      title: "Why an AI Browser Cannot See a Tab: Check the Permission Path",
      description: "Separate built-in browser state, extension access, tab context, site approval, profile selection, and file URL permission. Grant only what the task needs.",
      category: "AI browser guides",
      content: "When an assistant says it cannot see a page, identify which browser surface the task uses. A built-in browser, an extension attached to an existing profile, and a cloud browser do not share the same tabs or permissions. A website allowlist also differs from the browser's installation permission for an extension. Check the exact path and page before granting more access.",
      sections: [
        { heading: "Identify the browser surface first", body: `| Task context | First check | Boundary |
| --- | --- | --- |
| Page opened in an app's built-in browser | Confirm the active tab and its own profile/history | It normally has separate state and does not inherit regular Chrome cookies or tabs |
| Existing signed-in Chrome tab | Confirm the official extension is enabled in the active Chrome profile | Another profile may not have the extension; browser-install permission differs from site approval |
| Tab mentioned in chat | Confirm the page is still open and ask which title/URL the assistant can see | A tab reference does not prove that every other tab was excluded |
| Local file URL or upload | Check whether the product supports that route and whether file URL access is needed | This is not general disk access and not every assistant supports local upload |
| Managed work browser | Ask the administrator which policy controls the feature | Organization settings can narrow or disable local choices |

These are product-specific paths, not a universal browser-agent permission model.` },
        { heading: "For ChatGPT, separate extension access from site access", body: `Current ChatGPT Learn documentation supports the extension with Chrome, Edge, Brave, Opera, and Vivaldi; side chat is available in Chrome, Edge, Brave, and Vivaldi. Rollout and workspace settings may affect availability. If the browser is missing, the setup guide says to check the active profile, extension installation, browser connection, and whether the product shows “Manage” rather than “Install”.

The extension's browser permission prompt can include broad capabilities such as reading or changing website data. ChatGPT also applies its own site confirmations and allow/block settings. The current extension guide says a Chrome task uploading a local file may require enabling “Allow access to file URLs”. This setting describes that Chrome extension path; it does not establish general filesystem access or a feature in other assistants. Review the selected file and the installed product's wording before enabling it.

The built-in ChatGPT browser uses separate browser state and cannot automate file uploads. The extension is the documented path for existing browser tabs when the extension and website access are approved. Account, platform, app-version, workspace, and rollout conditions affect which options appear. Follow the current installed interface, not an old Atlas walkthrough.` },
        { heading: "Check one permission layer at a time", body: `1. Name the task path: built-in browser, extension, or another product.
2. Confirm the target page is open in that path's profile.
3. Check if the site is blocked or needs a one-time approval.
4. For an extension, confirm it is enabled in the active profile and its browser installation permission is accepted.
5. For a local file, check the supported upload route and any file-URL control. Start with a non-sensitive sample.
6. Ask the assistant to identify the page it can see; verify its title and URL yourself.
7. Remove temporary permission when it is no longer needed.

A site permission lets an assistant interact with a site under the product's rules. It does not make the page trustworthy, satisfy your account's access policy, or approve every action. Page content can contain misleading instructions; see the [prompt-injection boundary guide](/en/guides/browser-agent-prompt-injection/) for that separate risk.` },
        { heading: "Do not transfer one vendor's controls to another", body: `Claude in Chrome documents its own permission modes and extra prompts on some sites. Gemini in Chrome documents its task controls, password-manager sign-in approval, and Stop/Take over controls. Those descriptions apply only to those products and may depend on rollout or eligibility. An “allow” setting in one assistant does not imply the same scope elsewhere.

If the documented checks do not resolve access, record the product/app version, operating system, browser/profile, page origin, exact message, and permission state. Keep account names, cookies, credentials, private page content, and browser-state files out of a public issue. One user's report is evidence of that report, not proof everyone has the same failure.` }
      ],
      faq: [
        { question: "Does mentioning one tab let the assistant read my whole browser?", answer: "That depends on the product and its current permissions. A tab reference can provide page context, but review extension and site access separately; do not assume other tabs are excluded." },
        { question: "Does file URL access let an AI read every file on my computer?", answer: "No such general claim follows from the ChatGPT Chrome guide. It documents a toggle for a Chrome task that uploads a local file; check the current browser and product scope." },
        { question: "Why can the assistant see a page in one profile but not another?", answer: "Extensions and sign-in state are often profile-specific. Confirm the extension is installed and enabled in the profile containing the target tab." },
        { question: "Can ChatGPT, Claude, and Gemini use the same permission settings?", answer: "Use the same questions, then follow each product's current controls and eligibility. Their names and scopes are not interchangeable." }
      ]
    },
    "zh-cn": {
      title: "AI 浏览器看不到标签页？按权限路径逐项排查",
      description: "区分内置浏览器、扩展、本地配置文件、标签页上下文、网站授权和文件 URL 权限，只开放任务所需范围。",
      category: "AI 浏览器指南",
      content: "助手说看不到页面时，先确认任务使用哪一种浏览器入口。应用内置浏览器、连接现有配置文件的扩展和云端浏览器，不会天然共享标签页或权限。网站访问白名单也不同于浏览器安装扩展时要求的权限。按实际入口和目标页面排查，再决定是否需要增加授权。",
      sections: [
        { heading: "先确定浏览器入口", body: `| 任务上下文 | 先检查什么 | 权限边界 |
| --- | --- | --- |
| 应用内置浏览器打开的页面 | 当前标签页和它自己的配置文件/历史记录 | 通常有单独状态，不会继承日常 Chrome Cookie 或标签页 |
| 已登录的 Chrome 标签页 | 当前 Chrome 配置文件是否启用了官方扩展 | 另一个配置文件可能没有扩展；浏览器安装权限与网站授权不同 |
| 在聊天里提到的标签页 | 页面是否仍打开，以及助手能看到什么标题/URL | 指定页面不代表其他标签一定被排除 |
| 本地文件 URL 或上传 | 产品是否支持该路径，是否需要文件 URL 权限 | 这不是完整磁盘权限，也不代表每个助手支持本地上传 |
| 企业管理的浏览器 | 由管理员确认控制该功能的策略 | 组织设置可能关闭或收窄用户选项 |

这些是产品各自的路径，不能当成通用权限模型。` },
        { heading: "ChatGPT 要分别检查扩展和网站访问", body: `当前 ChatGPT Learn 说明 Chrome、Edge、Brave、Opera、Vivaldi 可使用扩展；侧栏聊天只支持 Chrome、Edge、Brave、Vivaldi。功能开放进度和工作区设置也会影响可用性。若浏览器没有出现，官方排查步骤包括检查活动配置文件、扩展安装、浏览器连接，以及界面显示“管理”还是“安装”。

浏览器安装扩展时，权限提示可能涉及读取或修改网站数据等较宽范围。ChatGPT 还会使用自己的网站确认和允许/屏蔽设置。当前扩展说明指出，Chrome 任务上传本地文件时可能需要开启“允许访问文件 URL”。这一项说明的是该 Chrome 扩展路径，不代表拥有通用文件系统权限，也不能推断其他助手具备同样功能。开启前看清具体文件及当前产品提示。

ChatGPT 内置浏览器使用独立状态，而且不能自动上传文件。官方文档说明，只有扩展和网站访问都获准时，扩展路径才可接入现有浏览器页。账号、平台、应用版本、工作区和开放进度都会影响实际选项。按当前安装版本操作，不沿用旧 Atlas 教程推断能力。` },
        { heading: "一次只检查一层权限", body: `1. 写明任务入口：内置浏览器、扩展或其他产品。
2. 确认目标页在该入口对应的配置文件里打开。
3. 查看网站是否被屏蔽，或需要本次单独批准。
4. 使用扩展时，确认它在活动配置文件启用，并接受了浏览器安装权限。
5. 处理本地文件时，核对产品支持的上传方式和文件 URL 控制；先用不含敏感资料的样本。
6. 让助手说出可见页面，再由你核对标题和 URL。
7. 临时权限不再需要时就移除。

允许访问网站，只表示助手可以按产品规则与该网站交互；它不能证明网页可信、不能替代账号授权，也不会自动批准所有操作。页面内容可能含误导指令；另一问题可参考[提示注入边界指南](/zh-cn/guides/browser-agent-prompt-injection/)。` },
        { heading: "不要把一家厂商的权限设置套到另一家", body: `Claude in Chrome 文档介绍了该产品自己的权限模式，以及部分网站上的额外提示。Gemini in Chrome 说明了它的任务控制、密码管理器登录授权和“停止/接管”入口。这些说明只适用于对应产品，能否使用还可能受开放范围或资格影响。一个助手里的“允许”不能推成另一家的权限范围相同。

按文档检查后仍无法访问时，记录产品与应用版本、操作系统、浏览器和配置文件、页面来源、错误原文与权限状态。不要把账号名称、Cookie、凭据、私人页面内容或浏览器状态文件发到公开问题帖。一个用户报告只说明那次经历，不能证明所有用户都有相同故障。` }
      ],
      faq: [
        { question: "在提示里提到一个标签，助手就能读取整个浏览器吗？", answer: "取决于产品和当前权限。标签引用可以提供页面上下文，但网站和扩展权限仍需分别核对，也不要假定其他标签被排除。" },
        { question: "允许文件 URL 就等于 AI 能读取电脑里的所有文件吗？", answer: "不能从 ChatGPT Chrome 文档得出这种结论。它说明 Chrome 任务上传本地文件时可能需要该开关；仍要看当前浏览器和产品的权限范围。" },
        { question: "为什么助手在一个配置文件能看页面，换一个就不行？", answer: "扩展和登录状态通常按配置文件区分。请在含目标标签的配置文件中检查扩展是否安装并启用。" },
        { question: "ChatGPT、Claude 和 Gemini 可以共用同一套权限吗？", answer: "可以用相同问题逐项检查，但要按各产品当前控制项和使用条件操作。权限名称和范围不可互换。" }
      ]
    }
  },
  "browser-agent-session-expiry-recovery": {
    en: {
      title: "Recover a Browser Agent After Login Expires: Recheck Before Resuming",
      description: "Separate expired authentication from network failure, pause protected work, let an authorized person sign in, then inspect the target state before retrying a write.",
      category: "AI browser guides",
      content: "A saved Playwright storage state is a snapshot, not a promise that a login will stay valid. When an agent is redirected to sign-in or receives an authentication error, pause and classify the failure. After an approved refresh or human sign-in, reopen the intended page and inspect whether the previous action already took effect. A timeout or login redirect cannot tell you whether a server-side write committed.",
      sections: [
        { heading: "Distinguish authentication from connectivity", body: `An HTTP 401 or an application's sign-in redirect can indicate an authentication problem. A 403 may mean that the account or action is not authorized; do not loop through login. A request-failure event is different: the request lifecycle did not finish normally and may or may not have received a response. A 500/503 is an HTTP response, not proof that the session expired.

| Observation | First interpretation | Safe next step |
| --- | --- | --- |
| Redirect to sign-in or “session expired” | Possible invalid or expired session | Stop protected work; confirm origin and expected sign-in page |
| HTTP 401 | This request was not accepted as authenticated | Pause and use the app's normal refresh or human sign-in flow |
| HTTP 403 | Account/action may lack permission | Stop and contact an authorized owner |
| Transport failure or timeout | Network/browser/server path may be interrupted | Diagnose connectivity; don't assume a write failed |
| HTTP 5xx | Server returned an error | Read current object state before considering a retry |

Record final URL, available response status, visible state, and time. Status codes are app-specific evidence, not substitutes for checking the actual signed-in account.` },
        { heading: "Resume through a human-approved sign-in", body: `Stop actions that read sensitive data or change account state. Keep the task, target URL, and last confirmed result. Use the refresh flow described in the site's documentation, or pause for an authorized person to handle SSO, MFA, CAPTCHA, or re-consent. Never place passwords or one-time codes in a prompt, trace, console log, or source file.

After sign-in, return to the exact object and confirm the account and page. Successful login does not prove the interrupted action completed. Inspect the target record or activity history, then resume only when the next step's preconditions are visible again. For a deliberate MFA handoff, see [browser agent human takeover](/en/guides/browser-agent-human-takeover/).` },
        { heading: "Read the target state before retrying a write", body: `Creating a record, sending a message, submitting a form, or changing a setting has an uncertain outcome until the target state is read. A request may reach the server even if the browser loses its response. Search by a stable task key and compare the current fields with the intended values. If you cannot tell whether it committed, stop for human review.

A safe read-only operation can often be retried after connectivity is confirmed. A write is safe to retry only when the app documents an idempotency key or you have verified no matching effect exists and authorization remains valid. A click timeout does not mean “nothing happened.” This differs from [network interruption recovery](/en/guides/browser-agent-network-interruption-recovery/), which starts with connectivity diagnosis.

For example, suppose a fictional support-ticket create action ends at an HTTP 401. After an authorized person signs in to the same account, search the ticket list and activity log for the stable task key “BH-2026-0041”. If the ticket exists, compare its fields and stop; do not create a duplicate. If the first list view shows nothing, check the application’s search and activity history or wait for its documented consistency delay. If the result remains uncertain, hand it to a person instead of repeating the create action.` },
        { heading: "Update the state file only after confirming login", body: `Playwright storageState does not refresh an expired login. In current Playwright, cookies and local storage are captured; IndexedDB requires the explicit indexedDB: true option (added in v1.51), and virtual WebAuthn credentials require credentials: true (v1.61). That option covers the virtual authenticator, not a physical security key. The standard state API does not persist sessionStorage. Playwright MCP documents its own save/restore scope; do not assume its file has the same fields as BrowserContext.storageState. None of these files renews a site token.

Keep auth files out of version control and restrict access. Use a disposable test account for local development. After confirming sign-in completed, refresh the state file through the documented login setup, then open a harmless authenticated page before running dependent tests. Do not silently overwrite a known-good state with an incomplete login result. Playwright documentation was checked 2026-10-29; this guide did not test a live account or auth flow. See the [BrowserContext storageState API](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state) for option details.` }
      ],
      faq: [
        { question: "Does loading storageState refresh an expired token?", answer: "No. It loads saved browser storage. The site may reject it after credentials expire; create a fresh authorized state through its login flow." },
        { question: "Can I retry a form after it redirects to sign-in?", answer: "First inspect the target object or activity history. The server might have accepted the write before the browser lost the response." },
        { question: "Does requestfailed mean the login expired?", answer: "No. It describes a failed request lifecycle. Check the final page, response if available, and application auth state separately." },
        { question: "Does Playwright storageState include sessionStorage?", answer: "The current auth guide says the standard API does not persist sessionStorage. It is origin-specific and needs a separate save/restore approach when an app uses it." }
      ]
    },
    "zh-cn": {
      title: "浏览器智能体登录过期后怎么恢复：重试前先查结果",
      description: "区分登录过期与网络故障，暂停受保护操作，由获准人员登录，再读取目标状态后决定是否重试写入。",
      category: "AI 浏览器指南",
      content: "Playwright 保存的浏览器状态是一份快照，不能保证登录一直有效。智能体被重定向到登录页或收到认证错误时，应先暂停并判断原因。经授权刷新或由人重新登录后，重新打开目标页面，确认上一次操作是否已生效。超时或登录跳转本身不能说明服务端没有保存数据。",
      sections: [
        { heading: "先分清认证问题和网络故障", body: `HTTP 401 或跳到应用登录页，可能表示认证失效。403 可能说明账号或操作不具备权限，不应反复尝试登录。请求失败事件是另一类信号：请求生命周期没有正常结束，但可能已收到响应，也可能没有。500/503 是 HTTP 响应，不等同于会话过期。

| 观察结果 | 初步判断 | 下一步安全动作 |
| --- | --- | --- |
| 跳到登录页或显示会话过期 | 会话可能无效或过期 | 暂停受保护操作，核对来源和登录页 |
| HTTP 401 | 这次请求没有通过认证 | 暂停，按应用流程刷新或由人登录 |
| HTTP 403 | 账号/操作可能没有权限 | 停止并联系获准负责人 |
| 传输失败或超时 | 网络、浏览器或服务路径可能中断 | 排查连接，不能假定写入失败 |
| HTTP 5xx | 服务端返回错误 | 考虑重试前先读取目标对象状态 |

记录最终 URL、可用响应状态、页面可见状态和时间。状态码含义取决于应用，不能代替实际登录状态检查。` },
        { heading: "经人工授权后重新登录", body: `先停止读取敏感资料或修改账号状态。保留任务、目标 URL 和最后一项已确认结果。按网站文档说明的流程刷新；遇到 SSO、MFA、CAPTCHA 或重新授权时，暂停交给有权操作的人完成。不要把密码或一次性验证码写进提示、追踪文件、控制台日志或源码。

重新登录后，回到准确对象，确认账号和页面无误。登录成功不代表中断前的操作已经完成。检查目标记录或活动历史，再从下一步前置条件已重新出现的地方继续。MFA 人工交接可看[浏览器智能体人工接管](/zh-cn/guides/browser-agent-human-takeover/)。` },
        { heading: "重试写入前先读取目标状态", body: `创建记录、发消息、提交表单或修改设置，在读取目标状态前都应视为结果未知。浏览器即使没有收到响应，请求也可能已经到达服务器。用稳定任务标识查找记录，再检查当前字段是否符合预期。无法判断是否提交成功时，应暂停交给人复核。

确认连接恢复后，只读操作通常可以安全重试。写入操作只有在应用说明支持幂等键，或确认没有对应结果且仍获准重试时才可再次执行。点击超时不代表“什么都没发生”。这与[网络中断恢复](/zh-cn/guides/browser-agent-network-interruption-recovery/)不同，后者从连接诊断开始。

例如，虚构的客服工单创建在 HTTP 401 后中断。获准人员登录同一账号后，用稳定任务键“BH-2026-0041”查工单列表和活动记录。若工单已存在，核对字段后停止，不要重复创建。若列表暂时没有结果，再检查应用搜索和活动历史，或等待应用说明的同步时间；仍无法判断时交由人工处理，不要再次创建。` },
        { heading: "确认登录完成后再更新状态文件", body: `Playwright storageState 不会刷新过期登录。当前版本会保存 Cookie 和本地存储；IndexedDB 需要显式设置 indexedDB: true（v1.51 加入），虚拟 WebAuthn 凭证需要 credentials: true（v1.61 加入）。该选项保存虚拟验证器数据，不等于能导出实体安全密钥。标准状态 API 不持久化 sessionStorage。Playwright MCP 文档说明的是它自己的保存/恢复范围，不能假设该文件与 BrowserContext.storageState 含有相同字段。上述文件都不会替网站续期。

认证文件应排除在版本控制之外并限制访问。本地开发使用一次性测试账号。确认登录已完成后，再按文档中的流程更新状态文件；打开一个无害的认证页面确认状态有效，然后运行依赖它的测试。不要用未完成的登录结果覆盖已知可用状态。本文于 2026-10-29 核对 Playwright 文档，没有测试真实账号或认证流程。选项细节见 [BrowserContext storageState API](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state)。` }
      ],
      faq: [
        { question: "加载 storageState 会自动刷新过期令牌吗？", answer: "不会。它只加载保存的浏览器状态。凭据过期后，网站可能拒绝该状态；应通过应用认可的登录流程重新生成。" },
        { question: "页面跳到登录页后，能直接重试表单吗？", answer: "先检查目标对象或活动记录。浏览器丢失响应前，服务器可能已经接受写入。" },
        { question: "requestfailed 代表登录过期吗？", answer: "不代表。它说明请求生命周期失败；应分别检查最终页面、可用响应和应用认证状态。" },
        { question: "Playwright storageState 会保存 sessionStorage 吗？", answer: "当前认证指南说明标准 API 不会持久化 sessionStorage。它按来源隔离，应用依赖它时要单独保存和恢复。" }
      ]
    }
  },
  "browser-agent-network-interruption-recovery": {
    en: {
      title: "Recover a Playwright Browser Agent After a Network Interruption",
      description: "Classify request failure, HTTP error, timeout, and lost response. Retry bounded reads and inspect target state before repeating a write.",
      category: "AI browser guides",
      content: "A timed-out navigation is not a transaction receipt. The request may not have left the browser, may have reached the server, or may have completed while the response was lost. Separate transport failures from HTTP status codes, restore connectivity, and read the current page or record before repeating a change. Keep retries finite and limited to operations safe to replay.",
      sections: [
        { heading: "Read Playwright's request lifecycle correctly", body: `Playwright emits request, then response when headers arrive, then requestfinished when the body completes. If a request fails, requestfailed replaces requestfinished and may occur instead of response. The event therefore does not prove the server never received the request. A 404 or 503 is an HTTP response and normally completes with requestfinished; inspect status separately.

| Signal | What it tells you | What it cannot tell you |
| --- | --- | --- |
| requestfailed | This browser request did not complete normally | Whether a server-side write already happened |
| HTTP 404/503 | An HTTP response arrived with that status | Whether repeating a write is safe |
| page.goto() timeout | The selected navigation wait condition was not met in time | That the app made no change |
| Visible offline/error banner | The page currently reports a failure | Whether the prior action committed |

These event descriptions follow Playwright's Request API. Attach listeners before an action when diagnosing your own fixture. Do not log headers, cookies, form bodies, or private account URLs.` },
        { heading: "Use a bounded recovery sequence", body: `1. Stop issuing actions. Record the URL, step, request method, and visible page state without credentials.
2. Classify transport failure, HTTP status, application error, or timeout. Check whether the browser is offline or the site returned a status.
3. Restore the approved network path. Do not switch proxies, disable protections, or bypass a challenge as an automatic retry.
4. Open a read-only status page and confirm the account and target record.
5. Retry a read a small, fixed number of times with a delay and a stop condition. Exit when the result remains unknown.
6. Before a write retry, inspect the target record. Retry only with a documented idempotency key or after confirming no effect occurred and authorization remains valid.

A blank page after timeout may recover; a normal-looking page may show stale data. Read a state the application actually changed instead of relying on a browser connection indicator.` },
        { heading: "Record local Playwright events", body: `Download [browser-agent-network-recovery-fixture.mjs](/templates/browser-agent-network-recovery-fixture.mjs) and save it as browser-agent-network-recovery-fixture.mjs in a local Node project. It requires Node.js 22+, an installed Playwright package, and a compatible browser. If needed, create an isolated project, run npm init -y, npm install playwright, then npx playwright install chromium. Package and browser setup downloads files; once launched, the script blocks page requests outside its loopback fixture. Run node browser-agent-network-recovery-fixture.mjs in the directory containing the file and Playwright package. PLAYWRIGHT_MODULE_URL and CHROME_EXECUTABLE_PATH may select existing installs. The script starts a temporary loopback-only server, observes one synthetic GET while BrowserContext is offline, restores connectivity and reads a fixed synthetic state, then checks that a synthetic 503 emits response and requestfinished. One local run on 2026-10-29 used Node.js 22.22.3, Playwright 1.64.0-alpha-1790635538000 and Google Chrome 156.0.8078.49; this observed alpha is evidence about that run, not a recommended version or a compatibility claim. It observed requestfailed for the offline GET, response 200 plus requestfinished for the recovered synthetic read, and response 503 plus requestfinished for the synthetic unavailable endpoint; it exited 0. This simulates BrowserContext offline state, not a physical network outage or production recovery. The fixture makes no application writes; it performs one explicit recovered GET, no write retry and no automatic retry loop. It does not test production recovery or MFA. Chrome background traffic was not audited.` },
        { heading: "Keep auth recovery separate from network recovery", body: `A failed connection, a 503 response, and an authentication redirect need different handling. If the session expired, pause for the site's refresh or human sign-in flow, then re-read the target object. If the network failed, restore the approved connection and inspect current state. In both cases, don't repeat a purchase, send, create, or submit action just because the browser timed out.

The [HAR and request-mocking guide](/en/guides/browser-agent-request-mocking-har/) covers predictable test substitutes; mocking does not prove real recovery. Use [browser-agent debugging traces](/en/guides/browser-agent-debugging-traces/) to inspect an unexplained failure, and see the [session-expiry guide](/en/guides/browser-agent-session-expiry-recovery/) for authentication.` }
      ],
      faq: [
        { question: "Does requestfailed mean the server did not receive the request?", answer: "No. It may replace response when headers never arrived or replace requestfinished after a response. It cannot establish whether the server applied a write." },
        { question: "Is HTTP 503 the same as a network failure?", answer: "No. A 503 is an HTTP response. A transport failure may have no HTTP response; record event type and status separately." },
        { question: "Can I automatically retry a timed-out form submission?", answer: "Only if the operation is documented as idempotent or you verify it did not take effect and the retry remains authorized. Otherwise keep the outcome unknown." },
        { question: "Does a successful reload prove the earlier action failed?", answer: "No. Inspect the target object or audit history to determine whether that action committed." }
      ]
    },
    "zh-cn": {
      title: "浏览器智能体遇到网络中断后怎么恢复：先查状态再重试",
      description: "区分请求失败、HTTP 错误、超时和响应丢失；有限重试只读操作，重复写入前先核对目标状态。",
      category: "AI 浏览器指南",
      content: "页面导航超时不是事务回执。请求可能没离开浏览器，也可能已到达服务器，只是响应没有返回，甚至服务端已经完成操作。应把传输失败和 HTTP 状态分开，恢复连接后重新读取页面或记录，再决定是否重做。重试要有次数上限，而且只适用于结果可以安全复用的动作。",
      sections: [
        { heading: "正确理解 Playwright 请求生命周期", body: `Playwright 先发出 request；收到响应头时发出 response；响应正文下载完成后发出 requestfinished。请求中途失败时，requestfailed 会代替 requestfinished，也可能在 response 之前出现。因此它不能证明服务器从未收到请求。404 或 503 是 HTTP 响应，通常仍触发 requestfinished；状态码需要单独检查。

| 信号 | 它说明什么 | 它无法说明什么 |
| --- | --- | --- |
| requestfailed | 浏览器请求没有正常完成 | 服务端写入是否已生效 |
| HTTP 404/503 | 收到了对应状态的 HTTP 响应 | 重试写入是否安全 |
| page.goto() 超时 | 导航未能在规定时间达到等待条件 | 应用没有发生任何改变 |
| 页面显示离线/错误提示 | 页面当前报告了故障 | 上一次操作是否已提交 |

这些生命周期说明依据 Playwright Request API。排查自己的夹具时，在动作前安装监听器。不要记录请求头、Cookie、表单正文或真实账号私人 URL。` },
        { heading: "按有限步骤恢复", body: `1. 停止继续操作。记录 URL、步骤、请求方法和可见页面状态，不记录凭据。
2. 分类传输失败、HTTP 状态、应用错误或超时。确认浏览器是否离线，或网站是否返回了状态码。
3. 恢复获准的网络路径。不要自动换代理、关闭安全保护或绕过验证挑战。
4. 打开只读状态页，核对账号和目标记录。
5. 对只读请求设置较小的固定重试次数、等待时间和停止条件。结果仍不清楚时退出。
6. 写入操作先检查结果。只有应用说明支持幂等键，或已经确认没有效果且仍获准重试，才再次提交。

超时后空白页可能恢复，外观正常的页面也可能显示旧数据。应读取应用实际改变过的状态，而不是只看浏览器连接图标。` },
        { heading: "在本地记录 Playwright 事件", body: `下载 [browser-agent-network-recovery-fixture.mjs](/templates/browser-agent-network-recovery-fixture.mjs)，保存到本地 Node 项目目录并命名 browser-agent-network-recovery-fixture.mjs。需要 Node.js 22+、已安装的 Playwright 包和兼容浏览器。如需新建隔离项目，可运行 npm init -y、npm install playwright，再运行 npx playwright install chromium。安装会下载依赖和浏览器；启动脚本后，页面请求会被限制在本地回环夹具。请在文件与 Playwright 包所在目录运行 node browser-agent-network-recovery-fixture.mjs。PLAYWRIGHT_MODULE_URL 和 CHROME_EXECUTABLE_PATH 可选择已有安装。脚本启动临时回环服务器，在 BrowserContext 离线时观察一个合成 GET，恢复连接后读取固定合成状态，再确认合成 503 会产生 response 和 requestfinished。2026-10-29 的一次本地运行使用 Node.js 22.22.3、Playwright 1.64.0-alpha-1790635538000 和 Google Chrome 156.0.8078.49；这个 alpha 版本只记录该次环境，不是推荐版本或兼容性承诺。观察到离线 GET 的 requestfailed、恢复后合成读取的 response 200 与 requestfinished，以及合成 503 的 response 与 requestfinished，退出码为 0。这里模拟的是 BrowserContext 离线状态，不是物理断网或生产环境恢复。夹具不执行应用写入，只显式执行一次恢复后的 GET，不做写入重试或自动重试循环；没有测试生产环境恢复或 MFA。没有审计 Chrome 后台流量.` },
        { heading: "认证恢复与网络恢复分开处理", body: `连接失败、503 响应和认证跳转需要走不同分支。会话过期时，暂停并按网站流程刷新或由人登录，再读取目标对象。网络故障时，恢复获准连接后检查当前状态。无论哪一种，都不要因浏览器超时而重复购买、发送、创建或提交。

[HAR 与请求模拟指南](/zh-cn/guides/browser-agent-request-mocking-har/)讲的是可预测的测试替身，不等于真实网络恢复。[浏览器智能体调试追踪](/zh-cn/guides/browser-agent-debugging-traces/)可用于排查原因；认证问题见[会话过期恢复指南](/zh-cn/guides/browser-agent-session-expiry-recovery/)。` }
      ],
      faq: [
        { question: "requestfailed 是否说明服务器没收到请求？", answer: "不能这么判断。没有响应头时它可能代替 response；收到响应后也可能代替 requestfinished。它不能确定写入有没有生效。" },
        { question: "HTTP 503 等于网络断开吗？", answer: "不等于。503 是 HTTP 响应；传输失败可能没有 HTTP 响应。要分别记录事件和状态码。" },
        { question: "表单超时后能否自动重试？", answer: "只有操作明确支持幂等，或已确认它未生效且重试仍获授权时才可以。否则保留结果未知。" },
        { question: "重新加载成功能证明上一次操作失败吗？", answer: "不能。检查目标对象或审计记录，确认先前操作是否提交。" }
      ]
    }
  }
};

const related: Record<string, string[]> = {
  "ai-browser-meeting-prep-brief": ["ai-browser-research-source-verification", "browser-agent-structured-data-extraction", "browser-agent-form-submission"],
  "ai-browser-calendar-timezone-proposal": ["browser-timezone-language-check", "browser-agent-form-submission", "ai-browser-meeting-prep-brief"],
  "ai-browser-tab-access-permissions": ["ai-browser-vs-browser-agent", "browser-agent-prompt-injection", "browser-agent-upload-files", "ai-browser-pdf-summary"],
  "browser-agent-session-expiry-recovery": ["browser-automation-profile-persistence", "browser-use-existing-browser-session", "browser-agent-human-takeover", "browser-agent-network-interruption-recovery"],
  "browser-agent-network-interruption-recovery": ["browser-agent-debugging-traces", "browser-agent-request-mocking-har", "browser-agent-wait-for-page-ready", "browser-agent-session-expiry-recovery"]
};
const sourcesBySlug: Record<string, { title: string; url: string }[]> = {
  "ai-browser-meeting-prep-brief": meetingSources,
  "ai-browser-calendar-timezone-proposal": timezoneSources,
  "ai-browser-tab-access-permissions": permissionSources,
  "browser-agent-session-expiry-recovery": sessionSources,
  "browser-agent-network-interruption-recovery": networkSources
};
const slugs = Object.keys(copies);

export const aiCycleGuides29: EditorialGuide[] = slugs.map((slug) => ({
  ...copies[slug]["zh-cn"],
  slug,
  date: "2026-10-29",
  sourcePath: `src/data/ai-cycle-2026-10-29.ts#${slug}`,
  availableLocales: ["en", "zh-cn"],
  relatedBrowsers: [],
  relatedTools: [],
  sources: sourcesBySlug[slug],
  relatedGuides: related[slug]
}));

export const aiCycleTranslations29: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
