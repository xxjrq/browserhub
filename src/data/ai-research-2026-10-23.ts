import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const slug = "ai-browser-research-source-verification";
const sources = [
  {
    title: "Perplexity Comet Quick Start Guide",
    url: "https://www.perplexity.ai/comet/resources/articles/comet-quick-start-guide"
  },
  {
    title: "Ways to Use Comet",
    url: "https://www.perplexity.ai/comet/gettingstarted"
  },
  {
    title: "Google Gemini Help: Use Gemini in Chrome",
    url: "https://support.google.com/gemini/answer/16283624?hl=en"
  },
  {
    title: "Google Gemini Apps Privacy Hub",
    url: "https://support.google.com/gemini/answer/13594961?hl=en"
  },
  {
    title: "Perplexity Help Center: What is Pro Search?",
    url: "https://www.perplexity.ai/help-center/en/articles/10352903-what-is-pro-search"
  },
  {
    title: "Perplexity Changelog: Role-based access controls, API credentials, and Brain for Max",
    url: "https://www.perplexity.ai/en-GB/changelog/role-based-access-controls-api-credentials-and-brain-for-max"
  },
  {
    title: "Reddit: Gemini users report trouble opening or checking source links",
    url: "https://www.reddit.com/r/GeminiAI/comments/1qzye6g/gemini_doesnt_show_clickable_source_links_anymore/"
  },
  {
    title: "Reddit: Perplexity users discuss citation-to-claim mismatches",
    url: "https://www.reddit.com/r/perplexity_ai/comments/1kpqy0c/perplexity_struggles_with_basic_url_parsingand/"
  }
];

const copy: Record<"en" | "zh-cn", EditorialGuideCopy> = {
  en: {
    title: "How to verify AI browser research before you cite it",
    description: "Turn a broad question into a source ledger, check links, dates and claim-level evidence in Comet or Gemini in Chrome, reconcile conflicts, and publish only what the sources support.",
    category: "AI browser guides",
    content: "AI browsers can collect candidate sources quickly. Before citing a claim, open the linked page and confirm that its text supports the sentence. Use Comet or Gemini in Chrome to gather leads, then track each claim in a small evidence ledger: what the source says, when it says it, whether the publisher can establish that fact, and what remains uncertain. Product instructions checked October 23, 2026; BrowserHub did not test either product.",
    sections: [
      {
        heading: "Start with a question you can actually verify",
        body: `A broad prompt such as “What is the best treatment for insomnia?” mixes advice, evidence quality, safety, and personal circumstances. Split it into answerable questions before asking a browser: What do current clinical guidelines recommend for adults? Which guideline and publication date support that recommendation? What does it say about people with another condition? For medical decisions, use this workflow to locate sources, not as a substitute for professional advice.

The same move works for ordinary research. Replace “Is remote work better?” with a bounded question: “In the two studies published in 2024 that measured employee retention, what population and time period did each study cover?” Write down the scope, key terms, population, geography, and date range. If the answer depends on a definition, ask for the definition separately.

Gemini in Chrome uses the current tab by default and lets you share up to ten open tabs on a computer; Google says availability is gradual and subject to device, region, language, sign-in, and account requirements. Comet documents asking about the current page and referring to open tabs. These features supply context; you still need to check what the assistant actually used. See [Google’s Gemini in Chrome requirements](https://support.google.com/gemini/answer/16283624?hl=en) and [Comet’s getting started guide](https://www.perplexity.ai/comet/gettingstarted).`
      },
      {
        heading: "Ask for leads and evidence separately",
        body: `Use the browser assistant to discover sources, but request a structured handoff rather than a polished conclusion. For example: “Find primary or official sources for these three questions. For each candidate, give the exact page title, direct URL, publisher, publication or update date if shown, the claim it may support, and a short passage or section to check. Mark dates or details you cannot confirm as unknown. Do not fill gaps from memory.”

Then ask a second, narrower question: “For each URL, open the page and tell me whether the cited passage directly supports the claim. Quote only the smallest useful phrase, include a heading or page location, and say when the page is inaccessible or does not contain the claim.” This separation helps you notice when an assistant has supplied a plausible source list but has not actually matched sources to claims.

Perplexity’s Pro Search documentation says it provides source links and recommends validating information by referring to them. That is a product description, not an independent accuracy guarantee. A July 27, 2026 [Perplexity changelog entry](https://www.perplexity.ai/en-GB/changelog/role-based-access-controls-api-credentials-and-brain-for-max) describes Check Sources for Search or Computer answers and a source side panel. If those controls appear in your account, use them to flag claims for review, then open the cited pages yourself; the announcement concerns Search and Computer and does not establish availability in every Comet session. A Reddit discussion about Gemini links and another about Perplexity URL parsing illustrate the kind of user-reported friction that makes link and claim checks useful; forum posts are signals about questions people have, not proof of prevalence or product defect.`
      },
      {
        heading: "Keep an evidence ledger, not just a bibliography",
        body: `For every sentence you may publish, track one row per supporting source. Record the claim in your own words, the direct page URL, publisher, source type, displayed date, date you checked it, exact supporting passage or location, and a status: supports, partly supports, contradicts, or not checked. Add a note on scope, such as “US adults” or “policy page, not law.” A bibliography shows what you opened; a ledger shows why each source is there.

| Claim | Page and publisher | Dates | Evidence and scope | Status |
| --- | --- | --- | --- | --- |
| Example: the fictional Northstar Transit plan includes a 30-day refund window | northstar.example.invalid/refunds; fictional operator | Published 2026-04-02; checked 2026-10-23 | Hypothetical page says “request within 30 days”; applies to unused monthly passes | Supports in this synthetic example |
| Example: refunds are available for every ticket type | Same fictional page | Same dates | The passage covers unused monthly passes only | Not supported |

This is a synthetic example using an invalid example domain, not a real company or finding. In a real ledger, save enough context to reopen the exact source later. Do not paste private account pages, confidential documents, passwords, or session data into a research assistant just to create a citation record. Google’s [Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en) explains that shared page content and browser context can be processed; review the applicable product and account terms before sharing sensitive material.`
      },
      {
        heading: "Check the page, date, passage and authority",
        body: `Open each cited URL yourself. Confirm that it resolves to the intended publisher and page, rather than a search page, redirect, login wall, unrelated document, or made-up path. Search within the page for the named phrase, then read enough surrounding text to capture exceptions and qualifications. A snippet, title, or AI-generated quotation is a lead, not evidence.

Check four things before marking a row as supporting a claim:

1. Identity: does the URL open the source named by the assistant, and is the publisher responsible for this subject?
2. Time: is the publication or update date visible? Record it separately from the day you observed the page. If no date appears, write “not shown,” not a guessed year.
3. Match: does the passage support the whole sentence, including its number, group, location, and condition? If it supports only part, narrow the sentence.
4. Authority: is this source positioned to establish this particular fact? A vendor can establish what its product documentation currently says; it may not independently establish comparative performance. A forum post can document one person’s report, not general prevalence.

For claims likely to change, such as availability, product features, prices, or rules, check the current primary source and preserve the date you observed it. For historical claims, prefer dated documents or archives. When a page is not accessible, leave the row unverified and find another source; do not let the assistant’s confidence stand in for the missing page.`
      },
      {
        heading: "Reconcile sources that disagree",
        body: `Do not average conflicting numbers or let the newest search result win automatically. First ask whether the sources define the same thing, cover the same population and period, and use the same units. A government page may describe a rule in force; a company page may explain its own current policy; a news story may report a proposal that has not taken effect.

Keep both sources in the ledger. Note the exact point of disagreement, dates, scope, and which source has authority for that point. Then choose one of three outcomes: resolve the conflict with a more direct or newer primary source; narrow the statement so both sources can be true; or publish that the sources disagree and name the unresolved detail. If a source changed after your observation, preserve the old date and re-check before publication.

Ask the assistant to find counterevidence as a separate pass: “What credible source would make this conclusion false, or show a different population or date range?” Treat returned links as candidates and inspect them under the same rules. A second AI answer is not independent corroboration if it relies on the same pages.`
      },
      {
        heading: "Turn the ledger into a citeable note",
        body: `Draft only claims that have a supporting row. Put citations beside the exact sentence they support, and prefer the primary source when available. Keep dates, populations, and conditions in the sentence. If two sources support different parts, cite both where the distinction appears rather than attaching a cluster of links to the end of a paragraph.

Before publishing, run a final pass: click every link; check that each quotation appears on that page; confirm the date and scope; verify that the cited source supports the full sentence; and remove claims whose only support is an inaccessible page or an AI summary. Save the ledger with the draft so an editor can retrace the decision.

Stop and mark a point unknown when the primary source is unavailable, the quoted passage cannot be found, dates conflict without an explanation, the assistant supplied a link that leads elsewhere, or no source supports the claim at the needed level. “Unknown from the sources checked” is a useful result. Guessing to make a paragraph flow is not.

For related workflows, see [Comet vs. Gemini in Chrome](/en/guides/comet-vs-gemini-in-chrome/) for a task-based comparison and [AI browser prompt injection](/en/guides/browser-agent-prompt-injection/) for boundaries when page content may steer an agent.`
      },
      {
        heading: "Common errors that make research hard to audit",
        body: `A clickable citation can still point to the wrong page or support only one clause. Check the destination and passage, not the icon. A page can be authoritative for one fact and weak for another; judge the publisher against the specific claim. Search snippets can omit caveats, while summaries can blend separate sources into one sentence.

Do not treat “published,” “updated,” and “observed” as interchangeable dates. Do not turn one social post into a trend, a company’s product page into independent validation, or the absence of a source into proof that a claim is false. If the assistant says it read a page but you cannot open or verify it, keep the status as unknown. A short, traceable answer is more useful than a complete-looking report built on uncheckable links.`
      }
    ],
    faq: [
      { question: "If an AI browser gives a clickable citation, is that claim verified?", answer: "No. Open the destination and confirm that the page exists, the relevant passage is present, and it supports the whole claim with the stated date and scope." },
      { question: "What should I record when a source has no publication date?", answer: "Write that the date is not shown, record the date you checked the page, and look for a dated primary source if the claim depends on timing." },
      { question: "What if two reliable sources disagree?", answer: "Compare their definitions, populations, dates and authority. Keep both in the ledger, then resolve the difference, narrow the claim, or state what remains uncertain." },
      { question: "Can I cite a source the assistant says it read if I cannot open it?", answer: "Do not treat it as verified. Mark it inaccessible or unchecked, and find an accessible source before relying on the claim." }
    ]
  },
  "zh-cn": {
    title: "AI 浏览器研究怎样核实来源，再写成可引用的结论",
    description: "用 Comet 或 Chrome 中的 Gemini 把宽泛问题拆成证据台账，逐条检查链接、日期、原文和来源权威性，处理冲突，并明确停在未知处。",
    category: "AI 浏览器指南",
    content: "AI 浏览器可以很快收集候选来源。引用一条说法前，先打开链接，确认原文确实支持这句话。用 Comet 或 Chrome 中的 Gemini 找线索，再在证据台账中逐条记录主张：来源写了什么、页面日期、发布者是否有资格证明这件事，以及哪些部分仍然未知。产品文档核对日期为 2026 年 10 月 23 日；BrowserHub 未对这两款产品进行实测。",
    sections: [
      {
        heading: "先把问题改写成可以核对的问句",
        body: `“失眠最好的治疗方法是什么？”把医疗建议、证据质量、安全性和个人情况混在了一起。先拆成几个能查证的问题：当前临床指南对成年人提出了什么建议？哪份指南、哪一天发布或更新？对有其他健康状况的人是否有额外说明？涉及诊疗决策时，这套流程只能帮助找资料，不能代替专业意见。

普通研究也适用。把“远程办公是不是更好”改成有范围的问题：“2024 年发布、测量员工留任情况的两项研究分别覆盖了哪些人群和时间段？”先记下定义、关键词、人群、地区和日期范围。如果结论取决于某个术语的含义，就单独问清定义。

Google 文档说明，Chrome 中的 Gemini 默认使用当前标签页的内容，电脑上最多可以分享 10 个已打开的标签页；该功能仍在分批开放，并受设备、地区、语言、登录状态和账户类型等条件限制。Comet 文档说明可以围绕当前页面提问，也可以引用打开的标签页。这些功能可以提供上下文，仍需确认助手实际使用了哪些内容。可查看 [Google 的 Gemini in Chrome 使用要求](https://support.google.com/gemini/answer/16283624?hl=en)和 [Comet 入门说明](https://www.perplexity.ai/comet/gettingstarted)。`
      },
      {
        heading: "把找线索和核验证据分成两轮",
        body: `让浏览器助手找资料时，要求它交付候选来源，而不是先给一段看似完整的结论。例如：“为以下三个问题找一手资料或官方来源。每条候选资料列出网页标题、直接网址、发布机构、页面显示的发布日期或更新日期、它可能支持的具体说法，以及要核对的原文短句或章节。无法确认的日期和细节标为未知，不要凭记忆补齐。”

接着用更窄的问题核对：“逐个打开这些网址，判断原文是否直接支持对应说法。只摘录核验需要的最短片段，注明章节或页面位置；打不开页面或找不到该说法时请明确说明。”把这两步分开，有助于发现助手虽然列出了看起来可信的来源，却没有核对每条来源和具体主张是否匹配。

Perplexity 的 Pro Search 文档介绍了来源链接，也建议用户查看链接来验证信息。这属于产品说明，并非独立准确率保证。Perplexity 在 2026 年 7 月 27 日的[更新日志](https://www.perplexity.ai/en-GB/changelog/role-based-access-controls-api-credentials-and-brain-for-max)介绍了 Search 或 Computer 答案的 Check Sources 核验功能，以及并排查看来源的侧栏。如果你的账户中能看到这些控件，可以先用它们标记需要复查的主张，再亲自打开引用页面；该公告描述的是 Search 和 Computer，不能据此推断每次 Comet 会话都有这些功能。关于 Gemini 来源链接和 Perplexity 网址解析的 Reddit 讨论，反映了一类用户会遇到的核验问题；论坛帖子只能作为需求线索，不能证明问题普遍存在，也不能单独证实产品缺陷。`
      },
      {
        heading: "维护证据台账，不只保存参考文献",
        body: `每条准备发表的句子都应有对应的来源记录。至少保存：用自己的话写出的主张、网页直链、发布者、来源类型、页面显示的日期、你核对页面的日期、支持该主张的原文或位置，以及状态：支持、部分支持、相矛盾、尚未核对。再补充适用范围，例如“美国成年人”或“政策说明，不是法律”。参考文献只能显示你打开过哪些资料；台账还要说明每个来源为什么能支持这句话。

| 主张 | 页面与发布者 | 日期 | 证据与范围 | 状态 |
| --- | --- | --- | --- | --- |
| 示例：虚构的 Northstar Transit 方案允许在 30 天内申请退款 | northstar.example.invalid/refunds；虚构运营方 | 发布于 2026-04-02；核对于 2026-10-23 | 假设页面写着“30 天内申请”；只适用于未使用的月票 | 此合成示例中支持 |
| 示例：所有票种都能退款 | 同一虚构页面 | 同上 | 原文只涉及未使用的月票 | 不支持 |

这是使用无效示例域名的合成案例，并非真实公司或研究发现。真实台账应保留足够的页面信息，方便之后重新打开同一个来源。不要为了制作引文记录，把私人账户页面、机密文件、密码或会话数据发给研究助手。Google 的 [Gemini Apps 隐私中心](https://support.google.com/gemini/answer/13594961?hl=en)说明，共享的网页内容和浏览器上下文可能会被处理；分享敏感资料前，应先查看适用的产品说明和账户条款。`
      },
      {
        heading: "检查页面身份、日期、原文和来源权威性",
        body: `自己打开每个引用网址。确认页面属于助手所说的发布者，且不是搜索结果页、跳转页、登录墙、无关文档或拼出来的路径。用页面搜索查找引用中的短语，再阅读上下文，确认有没有被省略的例外和限定。搜索摘要、标题和 AI 转述都只是线索，不能代替原文。

把一条记录标为“支持”前，检查四项：

1. 身份：网址是否打开了所说的来源？发布者是否有资格说明这类事实？
2. 时间：页面是否显示发布或更新日期？把它与自己查看页面的日期分开记录。若页面没显示，就写“未标注”，不要猜年份。
3. 匹配：原文是否支持整句话，包括数字、人群、地点和条件？如果只支持其中一部分，就缩小说法。
4. 来源权威性：这个来源是否适合证明这件事？厂商可以说明其产品文档当前写了什么，却不能独立证明产品之间的比较结果。论坛可以记录某人的经历，却不能说明问题有多普遍。

可用性、功能、价格和规则等容易变化的内容，应核对当前一手资料，并保存观察日期。历史事实应优先查找有日期的文件或存档。页面打不开时，先标成未核实并另找来源；不要用助手语气里的自信填补缺失证据。`
      },
      {
        heading: "来源冲突时不要急着选边",
        body: `不要把冲突的数字取平均，也不要自动采用搜索结果里最新的一条。先看来源是否在定义同一件事，是否覆盖同一人群和时间段，计量单位是否相同。政府页面可能描述现行规则，公司页面可能介绍自己的政策，新闻报道则可能谈尚未生效的提案。

把冲突的来源都保留在台账里，写明分歧是什么、日期和范围有何不同，以及哪个来源有权说明这一点。然后选择三种处理方式之一：找更直接或更新的一手资料解决；缩小说法，让现有来源能够同时成立；或者公开说明来源有分歧，并指出尚未解决的细节。如果你查看页面后它又发生变化，保留原观察日期，并在发布前重新核对。

还可以单独让助手寻找反例：“有什么可信来源会推翻这个结论，或说明它适用的人群、日期范围不同？”返回的网址仍要按同样的规则逐个核验。若第二个 AI 答案依赖相同网页，它不能算独立佐证。`
      },
      {
        heading: "从台账写出可以引用的笔记",
        body: `只写有对应证据记录的主张。把引文放在它实际支持的句子旁边，并优先引用可获得的一手资料。把日期、人群和适用条件留在句子里。如果两份来源各自支持不同部分，就在对应位置分别引用，不要把一串网址堆在段落末尾。

发布前做最后一遍核对：逐个点击链接；确认引号中的文字确实出现在该页；检查日期和适用范围；确认来源支持整句话；删掉唯一依据是打不开的页面或 AI 摘要的说法。把台账和草稿一起保存，方便编辑复查判断过程。

遇到以下情况就停下来，标为未知：找不到一手来源；引用片段在页面中不存在；日期冲突但没有资料解释；助手给出的链接实际指向别处；或没有来源能支持所需精度的结论。“目前核对的来源无法确认”也是有效结论。为了让段落读起来完整而猜测，不是研究。

相关流程可见 [Comet 与 Chrome 中的 Gemini 对比](/zh-cn/guides/comet-vs-gemini-in-chrome/)，该文按任务讨论两种产品；如果担心网页内容会引导智能体操作，可读 [AI 浏览器提示词注入指南](/zh-cn/guides/browser-agent-prompt-injection/)。`
      },
      {
        heading: "容易让研究失去可审计性的错误",
        body: `引用可以点击，也仍可能指错页面，或只支持句子中的一个分句。检查目标网页和原文片段，不要只看引用图标。一个来源可能足以证明某件事，却不适合证明另一件事；要针对具体主张判断发布者是否有权威性。搜索摘要可能省略限定词，AI 摘要也可能把不同来源合并成一句话。

不要把“发布”“更新”和“观察”日期混为一谈。不要把一条社交平台发言写成趋势，把厂商页面写成独立验证，或把找不到来源当成主张必然为假。如果助手说它读过某页，而你无法打开或核对，就保留“未知”状态。答案短一些但可追溯，比一份看起来完整、实际无法核验的报告更有用。`
      }
    ],
    faq: [
      { question: "AI 浏览器给了可点击引文，就代表说法已核实吗？", answer: "不代表。打开目标页面，确认页面存在、原文片段确实出现，并且支持带有对应日期和范围的完整主张。" },
      { question: "来源没有发布日期时应该记什么？", answer: "注明页面未显示日期，同时记录你查看页面的日期。如果结论依赖时间，应另找有日期的一手资料。" },
      { question: "两个可靠来源互相矛盾怎么办？", answer: "比较定义、人群、日期，以及各来源能证明什么。把两边都记录在台账中，再解决分歧、缩小主张，或明确写出仍不确定的部分。" },
      { question: "助手说读过某个来源，但我打不开，还能引用吗？", answer: "不要把它当成已核实资料。标记为无法访问或尚未核对，在依赖该主张前另找可访问的来源。" }
    ]
  }
};

export const aiResearchGuides: EditorialGuide[] = [
  {
    ...copy["zh-cn"],
    slug,
    date: "2026-10-23",
    sourcePath: "src/data/ai-research-2026-10-23.ts#ai-browser-research-source-verification",
    availableLocales: ["en", "zh-cn"],
    relatedBrowsers: [],
    relatedTools: [],
    sources,
    relatedGuides: ["comet-vs-gemini-in-chrome", "browser-agent-prompt-injection"]
  }
];

export const aiResearchTranslations: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  [slug]: copy
};
