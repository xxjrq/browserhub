import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources = {
  "chromeGemini": {
    "title": "Google Chrome Help: Use Gemini in Chrome",
    "url": "https://support.google.com/chrome/answer/16283624?hl=en"
  },
  "chromeAvailability": {
    "title": "Google Gemini Apps Help: Gemini in Chrome availability",
    "url": "https://support.google.com/gemini/answer/17140089?co=GENIE.Platform%3DDesktop&hl=en"
  },
  "edgeStart": {
    "title": "Microsoft Support: Getting started with Copilot in Microsoft Edge",
    "url": "https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge"
  },
  "edgeBrowse": {
    "title": "Microsoft Support: Browse with Copilot in Microsoft Edge",
    "url": "https://support.microsoft.com/en-us/edge/copilot/browse-with-copilot"
  },
  "edgeWork": {
    "title": "Microsoft Support: Using Copilot in Edge at work",
    "url": "https://support.microsoft.com/en-us/microsoft-365-copilot/using-microsoft-copilot-in-edge-at-work"
  },
  "geminiYoutube": {
    "title": "Google Gemini Apps Help: Find and ask about YouTube content",
    "url": "https://support.google.com/gemini/answer/16622858?hl=en"
  },
  "youtubeTranscript": {
    "title": "YouTube Help: View video transcripts",
    "url": "https://support.google.com/youtube/answer/15930243?co=GENIE.Platform%3DDesktop&hl=en"
  },
  "youtubeCaptions": {
    "title": "YouTube Help: Add subtitles and captions",
    "url": "https://support.google.com/youtube/answer/2734796?guide=2734661&hl=en"
  },
  "youtubeChapters": {
    "title": "YouTube Help: Video chapters",
    "url": "https://support.google.com/youtube/answer/9884579?hl=en"
  },
  "readerTranscript": {
    "title": "Reddit r/GeminiAI: Question about vague YouTube link summaries and transcripts",
    "url": "https://www.reddit.com/r/GeminiAI/comments/1wfgus0/ive_been_getting_better_gemini_summaries_by/"
  },
  "readerFailure": {
    "title": "Reddit r/GeminiAI: Reports of wrong or unavailable YouTube summaries",
    "url": "https://www.reddit.com/r/GeminiAI/comments/1t8lhep/youtube_summaries_no_longer_work/"
  },
  "readerAvailability": {
    "title": "Reddit r/GeminiAI: Gemini YouTube feature availability question",
    "url": "https://www.reddit.com/r/GeminiAI/comments/1t1inh3/gemini_no_longer_support_youtube_video/"
  },
  "readerBrowserContext": {
    "title": "Reddit r/GeminiAI: Can Gemini see what is in my browser?",
    "url": "https://www.reddit.com/r/GeminiAI/comments/1t1mgza/how_to_let_gemini_know_what_is_in_my_browser/"
  },
  "readerAssistantChoice": {
    "title": "Reddit r/MicrosoftEdge: Can I replace Edge AI Mode with Gemini?",
    "url": "https://www.reddit.com/r/MicrosoftEdge/comments/1x9hdy1/can_i_replace_bings_ai_mode_in_edge_with_google/"
  }
} satisfies Record<string, { title: string; url: string }>;

const copies = {
  "gemini-in-chrome-vs-copilot-in-edge": {
    "en": {
      "title": "Gemini in Chrome vs Copilot in Edge: choose by task and context",
      "description": "Compare Gemini in Chrome with Copilot in Edge for page summaries, video questions, multi-tab research, context controls and work accounts. Check the feature in your own profile.",
      "category": "AI browser comparisons",
      "content": "If you are deciding whether to stay in Chrome or switch to Edge for AI help, start with the task you actually do. Google documents Gemini in Chrome using the current tab by default, with up to 10 open tabs available when you share them. Microsoft documents Copilot in Edge using page context and, depending on the prompt and settings, other browsing context such as open tabs and history. Both can work with page content; eligibility and controls differ. This comparison uses official documentation checked on October 25, 2026. It is not a speed or quality benchmark.",
      "sections": [
        {
          "heading": "Quick comparison by task",
          "body": "| If you need to… | Start with… | What to check |\n| --- | --- | --- |\n| Ask about the page you are reading | Either sidebar | Whether the current tab is shared and whether the answer points to checkable evidence |\n| Compare several open pages | Gemini in Chrome when you want to choose tabs; Copilot in Edge when its context clues fit | Which tabs or history are in scope, and whether unrelated pages could affect the answer |\n| Ask about media you already played | Gemini in Chrome documents questions about played audio and video; Edge documents video summaries | Whether the feature is available in your account and refers to the right moment |\n| Keep Google Workspace page context | Gemini in Chrome | A shared Workspace page may involve direct access to the Workspace account |\n| Ask an assistant to navigate or act | Check each browser's separate agent controls | A sidebar answer and an agent that clicks or navigates are different workflows |\n\nThe table points to a first trial, not a winner. Gemini in Chrome and Gemini Apps are separate surfaces. Edge consumer Copilot and workplace Copilot also have different account and administrator conditions. Follow the controls shown in the browser you use."
        },
        {
          "heading": "What each browser can see",
          "body": "Google says Gemini in Chrome uses current-tab content by default. You can share other open tabs, up to 10, and remove a tab from the shared set. Unless you change the preference, a new chat also shares the current tab. When you share a Workspace page, Gemini may access the Workspace account directly so it can refer to the whole document rather than only visible tab text. Read [Google's Gemini in Chrome guide](https://support.google.com/chrome/answer/16283624?hl=en) before using that context with internal material.\n\nMicrosoft says Copilot may use your prompt, recent conversation and browsing context. Depending on the request, context can include the current page, page title, open tabs and browser history. Edge selects context based on the prompt. You can turn off “Allow Copilot to read context clues on the web” in Edge's Copilot and AI settings. At first use, Edge explains or asks permission to use browser information, depending on region. At work, an administrator may enable or disable page access, and data handling can follow organization policy. See [Microsoft's Edge Copilot guide](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge) and [work guidance](https://support.microsoft.com/en-us/microsoft-365-copilot/using-microsoft-copilot-in-edge-at-work).\n\nBefore either assistant reads a sensitive page, check the sharing state, signed-in account and your organization's rules. A current-tab assistant still receives page content. A context setting does not replace your data policy."
        },
        {
          "heading": "Try the same workflow in both",
          "body": "For one article, open the page and ask each assistant for a short summary with claims tied to headings or quotations. Check those claims against the source before using them. If a response is generic, ask about one named paragraph and confirm the page is shared.\n\nFor cross-tab research, start with a small set of relevant pages. In Chrome, share only the tabs needed and check the shared-tab indicator. In Edge, review context clues and close pages you do not want considered. Ask a bounded question such as: “Compare the eligibility requirements on these pages and quote the wording that differs.” Then open the sources and verify every difference.\n\nFor a video, choose a public clip you know. Gemini in Chrome documents questions about audio and video you already played on media websites. Edge documents opening a video and asking Copilot to summarize it. Neither help page promises identical handling for every host, caption track, account or region. Check whether the answer gives a useful moment, then play that section."
        },
        {
          "heading": "Check access before switching",
          "body": "Gemini in Chrome is rolling out gradually. Google lists a supported region and language, Chromebook Plus/Mac/Windows, current Chrome, a signed-in profile outside Incognito and applicable age conditions. Work or school accounts may need administrator approval. Check Google's [availability page](https://support.google.com/gemini/answer/17140089?co=GENIE.Platform%3DDesktop&hl=en) when the button is missing.\n\nEdge also varies by feature and account. The consumer sidebar instructions say to sign in with a personal Microsoft account. Work accounts can have organization-managed context and data controls. “Browse with Copilot,” which can click, type and navigate, is separate from asking the sidebar to summarize a page. Microsoft's consumer help describes Browse with Copilot as rolling out to Microsoft 365 Premium subscribers in the US, with more markets to follow. Confirm its [current requirements](https://support.microsoft.com/en-us/edge/copilot/browse-with-copilot) separately. Do not infer that sidebar chat includes the browser agent.\n\nRecord your operating system, browser version, region, language, account type, admin policy and feature entry point during a comparison. That helps separate a rollout or policy difference from a broken browser."
        },
        {
          "heading": "A practical decision rule",
          "body": "Stay with Chrome if its chosen-tab sharing, questions about media already played or Workspace page context fit your work and the feature is available to your account. Start with Edge if its context controls, Microsoft work setup or separate Browse with Copilot flow fit the task you are allowed to perform. If you mainly summarize ordinary web pages, compare both on the same pages and verify the same claims.\n\nDo not decide from an AI label or one polished response. Version, rollout, account settings and the page itself can change the result. For a different browser pairing, see [Comet vs Gemini in Chrome](/en/guides/comet-vs-gemini-in-chrome/). For document workflows, see [how to summarize a PDF in an AI browser](/en/guides/ai-browser-pdf-summary/)."
        }
      ],
      "faq": [
        {
          "question": "Can Gemini in Chrome and Copilot in Edge summarize pages?",
          "answer": "Yes. Google's Chrome guide documents article summaries and questions about the current tab. Microsoft's Edge guide documents page summaries and page questions using browsing context. Availability and context controls differ."
        },
        {
          "question": "Which one can compare multiple tabs?",
          "answer": "Google documents selecting up to 10 open tabs for Gemini in Chrome. Microsoft says Edge may use open tabs as context when relevant and enabled. Share only the pages needed, then check each source."
        },
        {
          "question": "Does either one guarantee private browsing context?",
          "answer": "No. Chrome shares the current tab by default; Edge can use context clues. Work accounts may have administrator policies. Review settings and follow your organization's data rules."
        },
        {
          "question": "Can I use Browse with Copilot if Edge chat works?",
          "answer": "Not necessarily. Microsoft describes Browse with Copilot as a separate feature with its own rollout and account conditions. Check the current requirements in your Edge profile."
        },
        {
          "question": "Why is Gemini missing from Chrome?",
          "answer": "Google says Gemini in Chrome is gradually rolling out and requires a supported region, language, device, browser version, signed-in profile and applicable age. Work or school accounts may need admin enablement."
        }
      ]
    },
    "zh-cn": {
      "title": "Chrome 中的 Gemini vs Edge Copilot：按任务和上下文选择",
      "description": "对照 Gemini in Chrome 与 Edge Copilot 的网页摘要、视频提问、多标签研究、隐私控制和工作账号条件，并核对自己的浏览器实际入口。",
      "category": "AI 浏览器对比",
      "content": "如果你在考虑继续用 Chrome，还是改用 Edge 来处理浏览器里的 AI 任务，先列出自己要完成的工作。Google 说明 Gemini in Chrome 默认使用当前标签页，也可以选择最多 10 个已打开标签页分享给 Gemini。Microsoft 说明 Edge Copilot 会按提示词使用页面上下文，相关设置开启时也可能参考其他浏览信息，例如标签页和历史记录。两者都能处理网页内容，但资格条件和控制方式不同。本文依据 2026 年 10 月 25 日核对的官方文档，不是速度或回答质量实测排名。",
      "sections": [
        {
          "heading": "按任务快速对照",
          "body": "| 你想完成的任务 | 优先查看 | 需要核对 |\n| --- | --- | --- |\n| 询问正在阅读的网页 | 两者侧边栏都可先试 | 当前标签页是否已分享，回答能否对应可核查的原文 |\n| 对照多个已打开网页 | 想指定标签时先看 Gemini in Chrome；Edge 上下文线索适合时也可测试 | 助手参考了哪些标签或历史记录，无关页面会否影响回答 |\n| 提问刚播放过的媒体 | Gemini in Chrome 文档支持询问已播放的音视频；Edge 文档支持视频摘要 | 账号是否开放功能，答案是否指向正确片段 |\n| 保留 Google Workspace 页面上下文 | Gemini in Chrome | 分享 Workspace 页面时可能涉及直接访问 Workspace 账号 |\n| 让助手代为浏览或操作 | 分别查看两款浏览器的智能体功能 | 侧边栏问答与点击、导航的流程权限不同 |\n\n这张表用于确定试用入口，不代表产品排名。Gemini in Chrome 与 Gemini Apps 是不同界面；Edge 个人版 Copilot 与工作账号中的 Copilot 也受不同条件限制。以浏览器当前显示的控件为准。"
        },
        {
          "heading": "两个浏览器助手会看到哪些内容",
          "body": "Google 表示 Gemini in Chrome 默认使用当前标签页内容。你可以再分享其他已打开标签页，最多 10 个，也能从分享列表移除某一页。除非修改默认偏好，开启新对话时当前标签页也会分享。分享 Workspace 页面时，Gemini 可能直接访问 Workspace 账号，以便参考整份文档，而不只看当前可见文字。涉及内部资料前，请先读 [Google 的 Gemini in Chrome 指南](https://support.google.com/chrome/answer/16283624?hl=en)。\n\nMicrosoft 说明 Copilot 可能结合提示词、最近对话和浏览上下文作答。上下文可能包括当前网页、页面标题、已打开标签页和历史记录，Edge 会按提示词判断采用哪些内容。你可以在 Edge“Copilot 和 AI”设置中关闭“允许 Copilot 在 Web 上读取上下文线索”。首次使用时，Edge 会根据地区提示或询问是否使用浏览信息。工作账号可能由管理员开放或限制页面访问，数据处理遵循组织政策。可看 [Microsoft 的 Edge Copilot 指南](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge)和[工作账号说明](https://support.microsoft.com/en-us/microsoft-365-copilot/using-microsoft-copilot-in-edge-at-work)。\n\n让任一助手读取敏感页面前，检查分享状态、登录账号和组织规定。当前标签页助手也会收到页面内容，上下文开关不能代替数据政策。"
        },
        {
          "heading": "用同一套流程分别试用",
          "body": "处理单篇文章时，打开页面并让两边各自生成短摘要，将要点对应到标题或原句。引用前回到原网页核查。如果回答笼统，就指定一个段落追问，并确认标签页已分享。\n\n跨标签研究时，先准备少量相关网页。在 Chrome 中只分享需要比较的标签，并查看分享状态。在 Edge 中检查上下文线索设置，并关掉不想纳入的页面。可以问：“比较这两页的资格要求，列出差异并引用原文。”然后打开每个来源核对。\n\n处理视频时，选择一段你熟悉的公开视频。Gemini in Chrome 文档介绍了对媒体网站上已播放的音视频提问；Edge 帮助页介绍了打开视频后使用 Copilot 总结。两份说明都没有保证所有平台、字幕、账号和地区的行为相同。检查回答指出的时间点，再回到播放器核实。"
        },
        {
          "heading": "换浏览器前先核对账号资格",
          "body": "Gemini in Chrome 正逐步开放。Google 列出的条件包括支持地区和语言、Chromebook Plus/Mac/Windows 电脑、最新版 Chrome、已登录且不在无痕模式，以及适用的最低年龄。工作或学校账号可能需要管理员批准。按钮缺失时，可看 Google 的[开放条件说明](https://support.google.com/gemini/answer/17140089?co=GENIE.Platform%3DDesktop&hl=en)。\n\nEdge 也会按功能和账号变化。个人版侧边栏说明要求使用 Microsoft 个人账号登录；工作账号则可能由组织管理上下文和数据控制。“Browse with Copilot”可以点击、输入和导航，它与让侧边栏总结网页不是同一功能。Microsoft 的消费者帮助页说，该功能正向美国 Microsoft 365 Premium 订阅用户逐步开放，其他市场之后跟进。请单独查看[当前 Browse with Copilot 条件](https://support.microsoft.com/en-us/edge/copilot/browse-with-copilot)，不要把能聊天等同于能使用浏览智能体。\n\n比较时记下操作系统、浏览器版本、地区、语言、账号类型、管理员策略和功能入口。这样更容易分清开放范围差异与浏览器故障。"
        },
        {
          "heading": "用一条简单规则做选择",
          "body": "如果工作依赖 Chrome 的指定标签分享、已播放媒体提问或 Workspace 页面上下文，而且账号已经开放功能，就先留在 Chrome 试用。如果 Edge 的上下文控制、Microsoft 工作账号设置或 Browse with Copilot 更适合获准执行的任务，就先试 Edge。主要需求只是总结网页时，用同一组页面分别试两边，并按同一标准核对结论。\n\n不要只看 AI 标签或一次流畅的回答。浏览器版本、开放范围、账号设置和网页内容都会影响结果。另一组对比可看 [Comet 与 Gemini in Chrome](/zh-cn/guides/comet-vs-gemini-in-chrome/)；PDF 工作流见[用 AI 浏览器总结 PDF](/zh-cn/guides/ai-browser-pdf-summary/)。"
        }
      ],
      "faq": [
        {
          "question": "Gemini in Chrome 和 Edge Copilot 都能总结网页吗？",
          "answer": "可以。Google 的 Chrome 指南记录了文章摘要和基于当前标签页提问；Microsoft 的 Edge 指南记录了网页摘要及使用浏览上下文提问。开放条件和上下文控制有所不同。"
        },
        {
          "question": "哪一个能比较多个标签页？",
          "answer": "Google 说明 Gemini in Chrome 可选择最多 10 个已打开标签页。Microsoft 说明 Edge Copilot 在相关且设置允许时可能使用打开的标签页。只分享需要的页面，并对照来源核实。"
        },
        {
          "question": "两者都能保证浏览上下文私密吗？",
          "answer": "不能。Chrome 默认分享当前标签页，Edge 可以使用上下文线索；工作账号还可能受管理员策略管理。请检查设置并遵守组织的数据规定。"
        },
        {
          "question": "Edge 聊天能用，就能使用 Browse with Copilot 吗？",
          "answer": "不一定。Microsoft 将 Browse with Copilot 作为单独功能，开放计划和账号条件也不同。请在自己的 Edge 账号中核对当前要求。"
        },
        {
          "question": "为什么 Chrome 工具栏没有 Gemini？",
          "answer": "Google 表示该功能正逐步开放，需要满足支持地区、语言、设备、浏览器版本、登录状态和年龄条件。工作或学校账号可能需要管理员启用。"
        }
      ]
    }
  },
  "ai-browser-youtube-summary": {
    "en": {
      "title": "How to summarize a YouTube video with an AI browser and check the result",
      "description": "Choose a documented Gemini or Edge flow for YouTube, separate video and transcript context, and verify claims with captions and timestamps. Troubleshoot missing access and vague or wrong-video answers.",
      "category": "AI browser workflows",
      "content": "A YouTube link by itself does not tell you what an assistant actually read. Current official documentation describes three distinct routes: Gemini in Chrome can answer about audio or video you have played on media websites; Gemini Apps can use public YouTube information; and Copilot in Edge can summarize an open video. The route and your account matter. This guide helps you choose a documented path, confirm what evidence reached the assistant and catch a plausible summary of the wrong clip. Official documentation was checked on October 25, 2026. The workflow is advice, not a product test.",
      "sections": [
        {
          "heading": "Choose a route that matches the material",
          "body": "| What you have | Try first | Evidence to verify |\n| --- | --- | --- |\n| Public YouTube video open in Chrome and already played | Gemini in Chrome media understanding | Confirm the current tab is shared, the video played and the answer matches a known moment |\n| Want Gemini to find or discuss a YouTube video | Gemini Apps with YouTube | Confirm it names the intended video, not a similar search result |\n| Video page open in Edge | Copilot in Edge page summary or a direct question | Check that the page context is enabled and inspect a timestamp or transcript line |\n| Each spoken claim needs a traceable source | Open the YouTube transcript and use it beside the assistant | Compare the caption line and timestamp with playback |\n\nGoogle's Gemini in Chrome guide documents questions about audio and video already played on media websites. A separate Gemini Apps help page documents finding and asking about YouTube content with public information and an Activity requirement. These are different surfaces. Microsoft documents video summaries in the Edge sidebar. Read the matching instructions: [Gemini in Chrome](https://support.google.com/chrome/answer/16283624?hl=en), [Gemini Apps and YouTube](https://support.google.com/gemini/answer/16622858?hl=en) and [Copilot in Edge](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge)."
        },
        {
          "heading": "Check the video and browser context",
          "body": "Open the intended video page and confirm its title, channel, duration and URL. If the video is private, unlisted, age-restricted, region-blocked or behind a sign-in prompt, do not assume an assistant can fetch it just because you have its link. The official descriptions cover media already played, public YouTube information or the current page. They do not promise access to every video or account.\n\nIn Chrome, open the Gemini side panel and check its shared-tab indicator. Google says the current tab is shared by default; you can stop sharing it, and the Media understanding setting controls questions about played media. In Edge, open Copilot from the video page. Microsoft says page prompts may use the current page, title and other relevant browsing context, subject to the context setting. On a work profile, an administrator or DLP rule may limit what Copilot can read. Do not submit private video material or sensitive pages to an unapproved account."
        },
        {
          "heading": "Ask a question that makes the answer checkable",
          "body": "Give the assistant a bounded task and request evidence. For example: “Summarize the speaker's three steps. Give an approximate video timestamp for each, quote a short phrase from that moment, and mark anything you cannot locate.” For a lecture, ask for a concept and the first explanation. For a product demo, ask what action the presenter performs and when. Avoid asking for a complete account of a long video in one sentence.\n\nIf the assistant cannot give a useful timestamp and captions are available, open YouTube's transcript from Show transcript in the description. YouTube says the transcript scrolls with playback and selecting a caption line jumps to that point. Search for a term, copy the relevant excerpt if your use permits it, and ask the assistant to summarize that text. Keep the video open so you can compare words with tone, visuals and surrounding dialogue. A transcript is a navigation aid; it does not show every visual detail."
        },
        {
          "heading": "Verify important claims against captions and playback",
          "body": "Check each important claim in the player. Use the assistant's timestamp, then replay a little before and after it. Compare names, quantities, dates, quoted wording and the relation between events. A sentence can appear in a transcript but be reversed by a later correction, joke or qualification.\n\nWhen captions exist, YouTube's transcript helps locate spoken claims. YouTube says a transcript is available for videos with captions; automatic captions may be unavailable or imperfect. Captions also cannot show everything on screen, such as a chart label or a brief menu action. If a claim depends on a visual, inspect the frame yourself or use a feature that explicitly supports visual questions. Do not infer that transcript-grounded output means the assistant watched every frame.\n\nFor work you will reuse, record the video URL, check date, assistant surface and version, whether you supplied a link or transcript, and verified timestamps. Cite the original video and timestamp in your report, not just the AI summary."
        },
        {
          "heading": "Fix vague, wrong-video or missing results",
          "body": "If a link produces generic text, pause before trusting it. Ask the assistant which title and channel it used. If those do not match, reopen the exact video and start a fresh conversation. In Chrome, confirm the tab is shared and the video played. In Gemini Apps, check the YouTube-connected path and the Activity requirement on Google's help page. In Edge, reopen Copilot from the target page and review the context setting. These steps diagnose the handoff; they cannot guarantee access.\n\nIf details are still missing, use the transcript route and ask about one segment. A transcript supplies spoken content directly but cannot provide a missing caption track. YouTube's help says Show transcript is available for videos with captions. If that control is absent, ask the creator for captions or use an authorized accessibility transcript. Do not treat an unchecked AI transcript as original text.\n\nIf a video is paywalled, private, region-limited or otherwise inaccessible, work only with content you are authorized to share. Do not bypass access controls. Use an allowed transcript excerpt, take notes while watching, or summarize public material that you can access."
        },
        {
          "heading": "Use timestamps as navigation, not proof",
          "body": "A timestamp should land near the claim it supports. Jump to it, then listen through the surrounding exchange. Check whether the creator added chapters. YouTube says chapters divide a video into sections and allow viewers to replay them; creators can add chapters or use automatic chapters. Chapters help navigation but do not validate the AI's wording.\n\nTreat a summary as an index for deciding what to replay. Preserve uncertainty in your notes, keep separate examples separate and label interpretation as interpretation. If the assistant adds facts you cannot locate, ask for the exact segment or remove the claim. For browser context choices, read [Gemini in Chrome vs Copilot in Edge](/en/guides/gemini-in-chrome-vs-copilot-in-edge/); for document checks, see [the AI browser PDF workflow](/en/guides/ai-browser-pdf-summary/)."
        }
      ],
      "faq": [
        {
          "question": "Can Gemini summarize a YouTube video?",
          "answer": "Google documents Gemini in Chrome questions about media already played and Gemini Apps using public YouTube information to find and discuss videos. These are different routes with account and availability conditions; neither promises access to every link."
        },
        {
          "question": "Does Gemini always need captions?",
          "answer": "The Chrome guide describes questions about played media and Gemini Apps documents a YouTube-connected path. The docs do not say every route always needs captions. A transcript helps locate and verify speech when captions exist."
        },
        {
          "question": "Why did it summarize the wrong video?",
          "answer": "The link or browser context may not have reached the intended page. Check the title and channel, reopen the video, confirm the tab is shared and try a fresh chat. Verify the result against playback."
        },
        {
          "question": "What if YouTube has no transcript?",
          "answer": "YouTube says transcripts are available for videos with captions. Ask the creator for captions or use notes or an authorized transcript. Do not treat generated text as verified original speech."
        },
        {
          "question": "Are AI timestamps reliable citations?",
          "answer": "Treat them as navigation suggestions. Open each timestamp, replay the surrounding section and check speech and visuals. Cite the original video and verified timestamp when sharing the result."
        }
      ]
    },
    "zh-cn": {
      "title": "用 AI 浏览器总结 YouTube 视频，并核对摘要",
      "description": "选择有官方说明的 Gemini 或 Edge YouTube 工作流，区分视频与字幕文本上下文，再用字幕和时间戳核验结论，排查访问失败、摘要含糊或视频错位。",
      "category": "AI 浏览器使用指南",
      "content": "只给助手一个 YouTube 链接，无法判断它实际读取了什么。当前官方文档说明了三个不同入口：Gemini in Chrome 可以回答已在媒体网站上播放的音视频问题；Gemini Apps 可以使用 YouTube 公开信息；Edge Copilot 可以总结当前打开的视频。入口和账号条件各不相同。本文说明如何选择有文档支持的流程、检查助手收到的证据，并识别看似合理却讲错视频的回答。官方资料核对日期为 2026 年 10 月 25 日。以下流程是建议，不是产品实测。",
      "sections": [
        {
          "heading": "按素材选择工作流",
          "body": "| 你手头的素材 | 建议先试的入口 | 要核对的证据 |\n| --- | --- | --- |\n| Chrome 中打开并播放的公开视频 | Gemini in Chrome 媒体理解 | 确认分享当前标签页、视频已播放，回答对应熟悉片段 |\n| 想让 Gemini 找 YouTube 视频或讨论内容 | Gemini Apps 的 YouTube 连接 | 确认回答指向目标视频，不是相似标题的结果 |\n| Edge 中打开的视频页面 | Edge Copilot 页面摘要或直接提问 | 确认启用了页面上下文，并检查时间戳或字幕行 |\n| 每条口头结论都要能追溯 | 打开 YouTube 字幕稿并与助手并排核对 | 对照字幕行、时间戳和实际播放 |\n\nGoogle 的 Gemini in Chrome 指南介绍了对媒体网站上已播放音视频提问。另一张 Gemini Apps 帮助页说明，可以利用 YouTube 公开信息查找内容并提问，但需要启用 Activity。这是不同界面。Microsoft 说明 Edge 侧边栏可以总结视频。使用前先读对应说明：[Gemini in Chrome](https://support.google.com/chrome/answer/16283624?hl=en)、[Gemini Apps 与 YouTube](https://support.google.com/gemini/answer/16622858?hl=en)和[Edge Copilot](https://support.microsoft.com/en-us/edge/copilot/getting-started-with-copilot-in-microsoft-edge)。"
        },
        {
          "heading": "确认视频和浏览器上下文",
          "body": "打开目标视频页，核对标题、频道、时长和网址。如果视频是私密或不公开、带年龄限制、受地区限制，或要求先登录，不要因为自己能打开链接，就假定助手也能读取。官方说明分别涉及已播放媒体、YouTube 公开信息或当前页面，没有承诺能访问所有视频和账号。\n\n在 Chrome 中打开 Gemini 侧边栏，查看当前标签页是否已分享。Google 说明当前标签页默认会分享；你可以停止分享，也可以用“媒体理解”设置控制对已播放媒体提问。在 Edge 中从视频页面打开 Copilot。Microsoft 说明页面相关提示词可能使用当前页面、标题和其他浏览上下文，具体取决于设置。工作账号的管理员或 DLP 规则可能限制 Copilot 读取内容。请勿把私人视频或敏感页面交给未经批准的账号。"
        },
        {
          "heading": "提出可以核查的问题",
          "body": "给助手一个范围清楚的任务，并要求提供依据。例如：“总结说话者提出的三个步骤。每一步标出大致时间戳，并引用该处的一小段原话。无法定位的内容请标为未核实。”听讲座时，可以问某个概念第一次出现时的解释；看产品演示时，可以问演示者做了什么操作、发生在什么时候。不要用一句话要求助手完整复述很长的视频。\n\n如果答案没有可用时间戳，而且视频有字幕，可以打开视频说明里的“显示文字稿”。YouTube 说明，文字稿会随播放滚动，点击字幕行可以跳到对应片段。搜索关键词，按许可范围复制相关内容，再让助手整理。保留播放器，以便对照语气、画面和前后对话。文字稿便于定位口头内容，但不能显示所有画面细节。"
        },
        {
          "heading": "用字幕和播放内容核对要点",
          "body": "重要结论要回到播放器核实。若助手提供时间戳，跳到该位置并回放前后片段。对照人名、数量、日期、引语和事件关系。一句话可能出现在字幕里，但随后又被纠正、补充限定，甚至只是玩笑。\n\n有字幕时，YouTube 文字稿可以帮助定位口头陈述。YouTube 说明，只有带字幕的视频才能查看文字稿；自动字幕也可能没有或识别不准。字幕无法显示图表标签或短暂的菜单操作。若结论依赖画面，应自行检查对应帧，或使用明确支持视觉问题的功能。不要因为答案用了字幕内容，就认为助手看过每一帧。\n\n需要复用的工作记录可写下视频链接、核对日期、助手界面和版本、输入链接还是字幕文本，以及验证过的时间戳。报告中应引用原视频和时间戳，不要只引用 AI 摘要。"
        },
        {
          "heading": "修复摘要含糊、视频错位或入口缺失",
          "body": "链接得到泛泛的文字时先暂停。问助手它识别到的视频标题和频道。如果不对，重新打开正确视频并新开对话。在 Chrome 中确认当前标签页已分享且视频播放过；在 Gemini Apps 中核对 YouTube 连接流程及 Google 帮助页提到的 Activity 条件。在 Edge 中从目标视频页重新打开 Copilot，检查上下文设置。这些步骤用于排查传递路径，不能保证一定能访问。\n\n答案仍漏细节时，使用字幕稿并按具体片段提问。字幕稿能提供口头内容，但不能替没有字幕的视频生成原始字幕。YouTube 说明，只有带字幕的视频才能查看文字稿。若没有入口，可以向创作者索取字幕，或使用经授权的无障碍文本。未经核对的 AI 字幕不能当成原始来源。\n\n视频受付费、私密、地区或其他访问限制时，只处理你获准分享的内容，不要绕过控制。可以改用获准的字幕摘录、边看边记笔记，或总结你有权访问的公开材料。"
        },
        {
          "heading": "把时间戳当作导航，不当作证明",
          "body": "时间戳应落在支持结论的片段附近。跳到相应位置，再听完前后对话。还可以查看创作者是否添加章节。YouTube 说明，章节将视频划分为不同片段，方便重新播放；创作者可以手动添加或使用自动章节。章节帮助定位，但不能证明 AI 的表述正确。\n\n把摘要当作决定“接下来重看哪里”的索引。整理笔记时保留说话者的不确定语气，区分不同例子，并把解释标为解释。回答加入视频里找不到的事实时，要求指出片段或删掉说法。浏览器上下文对比可看 [Gemini in Chrome 与 Edge Copilot](/zh-cn/guides/gemini-in-chrome-vs-copilot-in-edge/)；文档核对见 [AI 浏览器 PDF 工作流](/zh-cn/guides/ai-browser-pdf-summary/)。"
        }
      ],
      "faq": [
        {
          "question": "Gemini 能总结 YouTube 视频吗？",
          "answer": "Google 说明 Gemini in Chrome 可以回答已播放媒体的问题，Gemini Apps 可利用 YouTube 公开信息查找和讨论视频。这是不同入口，都受账号和开放范围影响，官方没有保证所有链接都可访问。"
        },
        {
          "question": "Gemini 总结视频一定要有字幕吗？",
          "answer": "Chrome 指南介绍对已播放媒体提问，Gemini Apps 说明 YouTube 连接流程。文档没有说所有入口都必须有字幕。视频带字幕时，YouTube 文字稿可帮助定位和核对口头内容。"
        },
        {
          "question": "为什么助手总结了另一个视频？",
          "answer": "链接或浏览上下文可能没有传到目标页面。检查回答中的标题和频道，重新打开目标视频，确认标签页已分享，再新开对话。任何摘要都应回到播放器核实。"
        },
        {
          "question": "YouTube 没有显示文字稿怎么办？",
          "answer": "YouTube 说明只有带字幕的视频才能查看文字稿。可以向创作者索取字幕，或使用边看边记的笔记、经授权的文字稿。不要把未经核验的生成文本当作原话。"
        },
        {
          "question": "AI 摘要里的时间戳能直接引用吗？",
          "answer": "先把时间戳当作导航提示。打开对应位置，回放周围片段并核对口头内容和画面。分享时引用原视频和已核实的时间戳。"
        }
      ]
    }
  }
} as const satisfies Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>>;

const meta = {
	"gemini-in-chrome-vs-copilot-in-edge": { relatedGuides: ["comet-vs-gemini-in-chrome", "comet-vs-dia", "ai-browser-vs-browser-agent", "ai-browser-pdf-summary"], sources: [sources.chromeGemini, sources.chromeAvailability, sources.edgeStart, sources.edgeBrowse, sources.edgeWork, sources.readerBrowserContext, sources.readerAssistantChoice] },
	"ai-browser-youtube-summary": { relatedGuides: ["gemini-in-chrome-vs-copilot-in-edge", "ai-browser-pdf-summary", "ai-browser-vs-browser-agent", "comet-vs-gemini-in-chrome"], sources: [sources.chromeGemini, sources.geminiYoutube, sources.edgeStart, sources.youtubeTranscript, sources.youtubeCaptions, sources.youtubeChapters, sources.readerTranscript, sources.readerFailure, sources.readerAvailability] }
} as const;

export const aiChoicesGuides25: EditorialGuide[] = (Object.keys(copies) as Array<keyof typeof copies>).map(slug => ({ ...copies[slug]["zh-cn"], slug, date: "2026-10-25", sourcePath: `src/data/ai-choices-2026-10-25.ts#${slug}`, availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: [...meta[slug].sources], relatedGuides: [...meta[slug].relatedGuides] }));
export const aiChoicesTranslations25: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
