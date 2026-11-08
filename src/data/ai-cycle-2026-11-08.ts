import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
  "gemini-chrome-auto-browse-no-action": [
    {
      "title": "Google Chrome Help: Auto Browse tasks",
      "url": "https://support.google.com/chrome/answer/16821166?hl=en-GB"
    },
    {
      "title": "Google Chrome Enterprise Help: Gemini in Chrome and Auto Browse",
      "url": "https://support.google.com/chrome/a/answer/17030585?hl=en"
    },
    {
      "title": "Google Chrome Help Community: Gemini in Chrome cannot perform Auto Browse",
      "url": "https://support.google.com/chrome/thread/425490329/gemini-in-chrome-cant-perform-auto-browse?hl=en"
    },
    {
      "title": "TechRadar: A hands-on guide to Gemini Auto Browse in Chrome",
      "url": "https://www.techradar.com/ai-platforms-assistants/i-tried-gemini-spark-in-chrome-and-its-the-perfect-ai-for-handling-all-the-boring-bits-online"
    }
  ],
  "gemini-chrome-skills-create-manage": [
    {
      "title": "Google Chrome Help: Customize Gemini in Chrome and manage Skills",
      "url": "https://support.google.com/gemini/answer/16988996?hl=en-6"
    },
    {
      "title": "Google Gemini Apps Help: About the Gems-to-Skills transition",
      "url": "https://support.google.com/gemini/answer/18560919"
    },
    {
      "title": "TechRadar: A hands-on guide to Chrome Skills",
      "url": "https://www.techradar.com/ai-platforms-assistants/i-tried-chromes-new-ai-skills-feature-and-its-like-a-mini-toolkit-of-ai-shortcuts"
    },
    {
      "title": "Android Central: Chrome Skills save repeated prompts",
      "url": "https://www.androidcentral.com/apps-software/tired-of-repeating-ai-prompts-chromes-new-feature-handles-it-for-you"
    }
  ],
  "comet-control-browser-missing": [
    {
      "title": "Perplexity Help Center: Work with Browsers and Apps, modified Nov 6, 2026",
      "url": "https://www.perplexity.ai/help-center/en/articles/19800006-work-with-browsers-and-apps"
    },
    {
      "title": "Perplexity changelog: Computer browser extension for Mac",
      "url": "https://www.perplexity.ai/changelog/automations-inline-visualizations-and-gpt-6-1-sol"
    },
    {
      "title": "Perplexity: Comet Assistant permission and browser actions",
      "url": "https://www.perplexity.ai/en-GB/hub/blog/comet-assistant-puts-you-in-control"
    },
    {
      "title": "Reddit: Users ask whether Control Browser disappeared",
      "url": "https://www.reddit.com/r/perplexity_ai/comments/1wbdxms/has_perplexity_removed_control_browser_what_other/"
    },
    {
      "title": "Reddit: Missing Comet browser control and Computer route",
      "url": "https://www.reddit.com/r/perplexity_ai/comments/1x2qx8s/browser_control_in_comet_and_file_access_in_the/"
    }
  ],
  "perplexity-comet-usage-limits": [
    {
      "title": "Perplexity Help Center: How credits work, modified Nov 4, 2026",
      "url": "https://www.perplexity.ai/help-center/en/articles/13838041-how-credits-work-on-perplexity"
    },
    {
      "title": "Perplexity Help Center: Compare subscription plans",
      "url": "https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you"
    },
    {
      "title": "Reddit: What are the actual limits for Comet browser tasks?",
      "url": "https://www.reddit.com/r/PerplexityComet/comments/1snzxdp/what_are_the_actual_limits_for_comet_browser/"
    },
    {
      "title": "Reddit: Hit a usage limit on Comet after a period of inactivity",
      "url": "https://www.reddit.com/r/PerplexityComet/comments/1tgftrm/hit_usage_limit_on_perplexity_comet_browser/"
    },
    {
      "title": "Reddit: Questions about Perplexity model limits",
      "url": "https://www.reddit.com/r/perplexity_ai/comments/1v92neo/model_limits/"
    }
  ],
  "opera-neon-choose-ai-agent": [
    {
      "title": "Opera Blog: Intelligent Mode and agent suggestions, Feb 2, 2026",
      "url": "https://blogs.opera.com/news/2026/02/opera-neon-ai-browser-intelligent-mode/"
    },
    {
      "title": "Opera Neon: Current FAQ on Chat, Do and Research",
      "url": "https://www.operaneon.com/faq"
    },
    {
      "title": "ShiftDelete: Interview with Opera on Opera Neon agents, Mar 16, 2026",
      "url": "https://en.shiftdelete.net/how-do-ai-agents-work-we-asked-opera-about-opera-neon/"
    },
    {
      "title": "Chris Chinchilla: Testing Neon, Mar 4, 2026",
      "url": "https://chrischinchilla.com/blog/2026/opera-neon/"
    },
    {
      "title": "Digital Trends: Opera Neon early-access hands-on, Oct 26, 2025",
      "url": "https://www.digitaltrends.com/computing/i-tried-a-operas-ai-browser-that-can-shop-book-and-even-apply-for-jobs-for-you-and-its-not-worth-it-just-yet/"
    },
    {
      "title": "Tom’s Guide: Opera Neon first-look walkthrough",
      "url": "https://www.tomsguide.com/ai/opera-neon-is-now-available-to-the-public-heres-how-to-use-the-new-ai-browser"
    }
  ]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "gemini-chrome-auto-browse-no-action": {
    "en": {
      "title": "Gemini in Chrome says Auto Browse finished, but the page did not change",
      "description": "Check what the browser actually did before repeating a Gemini Auto Browse task. Use the task page, visible browser state and result checklist to distinguish a completed action from a completion message.",
      "category": "AI browser guides",
      "content": "Gemini saying it finished does not prove that the requested website state changed. Google’s current Auto Browse help warns that Gemini may report a task as complete when it is not. Before asking it to try again, return to the task tab and check the exact page, account and result you requested. A Chrome Help Community thread titled “Gemini in Chrome can’t perform Auto Browse” reflects the same kind of reader question, but its body is not available for a reliable incident description. This guide turns Google’s warning into a site-state check: verify what changed, then decide whether a retry is safe.",
      "sections": [
        {
          "heading": "Check the actual task tab, not only the chat reply",
          "body": "In Chrome, open the relevant Gemini task and use its Switch tabs or Check your task control to return to the browser tab used for the run. Google’s current instructions say an Auto Browse icon appears on the working tab and that Chrome can show a notification when Gemini needs help. If the chat panel says “done” but the task tab is elsewhere, the reply may describe a plan or partial result rather than the state you expect. The tab and page are the evidence to inspect.\n\nRecord three things before continuing: the page URL or site name, the account or profile visible in that page, and the exact result that should now exist. For a search task, check the visible result list and query. For a form, check the field values and whether the site shows a saved or submitted state. For a product task, check the selected variant and cart line. If the page is still on the starting screen, the requested browser action has not been confirmed even if Gemini described the intended steps.\n\nGoogle documents that Auto Browse can use a local desktop browser or a remote browser. A task may therefore be working in a different browser context than the one you first expect. Use the task thread’s own tab switch or live view, where offered, instead of guessing from another Chrome window. The existing [local versus remote Auto Browse guide](/en/guides/gemini-auto-browse-local-vs-remote/) explains how those two paths affect session state and continuation."
        },
        {
          "heading": "Reconcile the requested outcome before retrying",
          "body": "Write the task as a before-and-after check. “Find the page and scroll” is complete only when the requested page is open and the relevant portion is visible. “Add one item” is complete only when the site shows the correct item, variant and quantity in the cart. “Save a draft” is complete only when the website shows a saved draft in the intended account. A friendly summary is not a receipt, confirmation page or saved record.\n\n| What you asked for | Check on the site | Safe next step if it is absent |\n| --- | --- | --- |\n| Open or search for a page | Address bar, site, query and visible result | Ask Gemini to open the named result; check the tab afterward |\n| Fill a form | Each field, selected option and page validation | Take over and inspect the form; do not press submit blindly |\n| Save or submit | Site’s own saved state, receipt or confirmation | Search the site for the saved item before retrying |\n| Add an item to a cart | Product, variant, quantity and cart line | Verify the cart first; stop before checkout unless separately authorized |\n| Change an account setting | The setting after reload, plus any confirmation | Do not issue the same change again until the first attempt is understood |\n\nFor a consequential action, treat an uncertain result as unresolved. A second run could create a duplicate booking, message, order or record. If you cannot establish whether the first attempt took effect, pause and check the site’s activity page or contact its support before asking an agent to repeat the action. This is the same principle used in reliable web automation: confirm the durable target state instead of treating a click or completion sentence as proof."
        },
        {
          "heading": "Separate a no-op from a step that needs you",
          "body": "A task can stop for a reason that does not mean the feature is broken. Google says Gemini may pause and ask you to take over for a sensitive step, sign-in, or another point that needs user input. Look for a browser notification or a waiting status in the task thread. If the task asks for a login, cookie choice, CAPTCHA or confirmation, complete only the step you intended to authorize, then use Resume or Give back task if that control is shown.\n\nIf there is no request for input, compare the task’s visible activity with the page. Did the browser open another site? Did the current tab change? Did it select an option? Did the page show an error or block? A short chain of visible actions can explain why the result is incomplete. If nothing changed, do not infer that a hidden action happened. If the page changed but the target record is absent, the task may have failed after navigation or at a site-specific step.\n\nKeep feature availability separate from task execution. Google currently lists eligibility requirements for Auto Browse, including a personal account, supported location and language, a compatible Chrome setup, and gradual rollout. A managed profile may have separate administrator controls. If the Auto Browse entry itself is missing, use Google’s current eligibility and administrator documentation; do not apply an old flag recipe as a universal fix. If the feature is available but a particular run made no visible progress, diagnose that run’s page state rather than changing profile or policy settings at random."
        },
        {
          "heading": "Use a small retry only after checking for side effects",
          "body": "Once you know the site state and there is no partial action to duplicate, retry with one observable step. Name the destination and the condition that counts as success: “Open the search result titled X, then stop when its page title is visible.” For a form, ask the assistant to fill named fields and stop before submission. Keep the task to a small number of sites so it is clear which page the browser should use.\n\nIf the next step requires your approval, review the page and the proposed action yourself. Google’s current Auto Browse guide explains how to take over, resume or stop a task. A takeover hands you the browser; it does not make the prior state correct. After you return control, inspect the target page again. For multi-step or purchase tasks, compare the final page with a short checklist of fields, quantity, price or destination before confirming anything.\n\nAvoid sending the same instruction repeatedly while the first task is still active. Check the task thread, task tab and site state first. If the original run is clearly stopped and no changes occurred, a focused retry is reasonable. If the site shows an ambiguous or partial change, resolve that record through the site before starting over."
        },
        {
          "heading": "Capture useful evidence when the mismatch repeats",
          "body": "If a second, low-risk attempt produces the same mismatch, collect enough information to report the issue without exposing private account content. Note the date, Chrome version from chrome://version, operating system, whether the task used local Chrome or a remote browser, and a brief prompt with personal details removed. Record the task status, the page where it stopped, the result you expected and what the page actually showed. A screenshot of a public page or a redacted error is more useful than a long narrative about what the model seemed to intend.\n\nGoogle’s Chrome Help Community accepts product questions, but community replies may be unofficial and can describe older versions. The linked Community page is a reader question, not a verified diagnosis. Current official help should decide which buttons and requirements apply today. If the task failed after reaching a site-specific error, report that site and visible error; if the entry point itself is unavailable, include the account type and organization policy question instead.\n\nFor an agent that clicks the wrong control because another element covers it, see [diagnose a browser agent click intercepted by an overlay](/en/guides/browser-agent-diagnose-blocked-clicks/). For web forms where the values are correct but no submission result appears, use [browser agent form submission](/en/guides/browser-agent-form-submission/). Those guides cover different failure points from a task that reports completion without an observable page change."
        }
      ],
      "faq": [
        {
          "question": "Does Gemini’s “done” message prove that Auto Browse changed the site?",
          "answer": "No. Check the task tab and the site’s own state. A completion message alone does not verify that a search, form, cart, booking or account setting changed."
        },
        {
          "question": "How do I know whether Gemini is waiting for me?",
          "answer": "Check the task thread and Chrome notification area for a request to take over or complete a step. Google says tasks may pause for sign-in, sensitive actions or other user input."
        },
        {
          "question": "Should I ask Gemini to repeat the action if the page looks unchanged?",
          "answer": "First verify the task tab and search the site for a saved or partially completed record. Repeating an uncertain booking, message or account change can create a duplicate."
        },
        {
          "question": "Does the linked Chrome Community thread prove a widespread Auto Browse failure?",
          "answer": "No. The page title identifies a user question, but its body was not available for verification. Google’s current Auto Browse help is the source for documented task behavior; neither that question nor this guide establishes an outage or failure rate."
        }
      ]
    },
    "zh-cn": {
      "title": "Gemini in Chrome 说 Auto Browse 已完成，网页却没有变化",
      "description": "重复运行 Gemini Auto Browse 前，先检查浏览器实际做了什么。通过任务标签、页面状态和结果清单，区分已完成的操作与完成提示。",
      "category": "AI 浏览器指南",
      "content": "Gemini 说任务已完成，不等于目标网页状态已经改变。Google 当前的 Auto Browse 帮助提醒用户：Gemini 可能会把实际未完成的任务报告为已完成。再次要求它操作前，先回到任务标签，核对具体网页、账号和目标结果。Chrome 帮助社区有一个标题为“Gemini in Chrome 无法执行 Auto Browse”的问题页，主题与这种疑问相近，但目前无法可靠核实其正文，因此不把它当作具体事故案例。本文把 Google 的提醒变成网页状态核对步骤：先确认哪些内容真的改变，再判断是否可以安全重试。",
      "sections": [
        {
          "heading": "先看任务标签，不只看聊天回复",
          "body": "在 Chrome 中打开对应的 Gemini 任务，通过 Switch tabs 或 Check your task 回到任务使用的浏览器标签。Google 当前说明中提到，Auto Browse 工作时标签会显示图标；需要用户协助时，Chrome 可能显示通知。如果聊天面板说“完成”但标签还停在别处，这句话可能只是在总结计划或部分结果。应检查实际任务页。\n\n继续操作前，记下三项：页面地址或网站名称、网页显示的账号或个人资料，以及目标结果的明确条件。搜索任务要检查查询内容和结果列表；表单要看字段值以及网站是否显示已保存或已提交状态；商品任务要检查型号、版本和购物车行项目。若页面仍处于起始状态，就不能确认请求的网页操作已经发生，即使回复描述了预期步骤。\n\nGoogle 文档说明 Auto Browse 可能通过桌面本地 Chrome，也可能通过远程浏览器工作。因此任务可能在另一个浏览上下文里运行。使用任务对话自带的标签切换或实时查看入口（如果界面提供），不要只凭另一扇 Chrome 窗口判断。关于两种路径和状态续接，可读[Gemini Auto Browse 本地与远程浏览器说明](/zh-cn/guides/gemini-auto-browse-local-vs-remote/)。"
        },
        {
          "heading": "重试前先核对目标结果",
          "body": "把任务写成“之前是什么、完成后应该是什么”。“找到页面并滚动”要以目标页面已打开、指定内容可见为准；“添加一个商品”要以网站购物车中的正确商品、版本和数量为准；“保存草稿”要以目标账号里能看到草稿为准。回复中的总结不能替代收据、确认页或保存记录。\n\n| 请求的操作 | 在网站检查什么 | 没有结果时的安全下一步 |\n| --- | --- | --- |\n| 打开或搜索页面 | 地址栏、网站、搜索词和可见结果 | 要求打开指定结果，再检查任务标签 |\n| 填表 | 每个字段、选项和页面校验提示 | 接管后检查表单；不要盲目点提交 |\n| 保存或提交 | 网站自己的保存状态、回执或确认页 | 先在网站查找记录，再决定是否重试 |\n| 加入购物车 | 商品、版本、数量和购物车行项目 | 先核对购物车；未经单独授权就停在结账前 |\n| 修改账号设置 | 刷新后的设置值和确认信息 | 不要在第一次结果未明时再次提交同一修改 |\n\n遇到重要操作，结果不明确就先按“尚未解决”处理。第二次运行可能造成重复预约、消息、订单或记录。若无法确认第一次是否生效，先查看网站活动记录或联系网站支持，再让智能体重做。可靠的网页自动化会确认持久状态，而不会把一次点击或一句完成提示当作证据。"
        },
        {
          "heading": "区分无操作与等待你处理",
          "body": "任务暂停不一定表示功能故障。Google 说明 Gemini 可能在登录、敏感步骤或需要用户输入时暂停，并让你接管。查看浏览器通知和任务线程的等待状态。如果页面要求登录、选择 Cookie、完成 CAPTCHA 或确认操作，只处理你本来就授权的步骤；完成后再使用 Resume 或 Give back task（如果界面显示）。\n\n若没有等待提示，比较浏览器活动与页面：它有没有打开其他网站、切换标签或选择选项？网页是否显示错误或拦截？可见操作记录能说明任务为什么没有完成。若页面完全没变，不要推断后台完成了操作；若页面已经切换但目标记录不存在，失败可能发生在导航之后或网站特定步骤。\n\n把功能能否使用与单次任务执行分开判断。Google 当前列有 Auto Browse 的资格条件，包括个人账号、受支持的地区和语言、兼容的 Chrome 设置，以及逐步开放状态。受管理的浏览器资料还可能有管理员控制。若入口本身缺失，应查当前资格说明和管理员文档；不要把旧旗标教程当成通用修复。若入口可用但某次任务没有可见进展，则针对该任务页面诊断，不要随意切换资料或策略。"
        },
        {
          "heading": "确认没有副作用后再做小范围重试",
          "body": "确认网站状态、没有半途写入的记录后，再让 Gemini 执行一个可观察步骤。写出目标页面和成功条件，例如：“打开标题为 X 的搜索结果，页面标题出现后停止。”填写表单时，可以要求它填写指定字段并在提交前停下。先把任务限制在少数几个网站，确保它知道要操作哪一页。\n\n如果接下来需要你批准，自己检查页面和待执行动作。Google 当前 Auto Browse 帮助说明了接管、恢复或停止任务的方式。接管浏览器只会把控制权交给你，不会自动修正之前的页面状态。还回控制权后再查目标页面。涉及多步操作或购买时，先按清单对照字段、数量、价格或目的地，再确认最终操作。\n\n原任务还在运行时，不要连续发送同一指令。先看任务线程、任务标签和网站状态。如果原任务已明确停止且没有任何变更，可以做一次聚焦的重试。如果网页显示含糊或部分变更，应先在网站中解决那条记录，再重新开始。"
        },
        {
          "heading": "多次出现差异时记录可复现信息",
          "body": "如果第二次低风险尝试仍有同样差异，整理简短材料后再报告问题，避免暴露账号内容。记录日期、从 chrome://version 读取的 Chrome 版本、操作系统、任务使用本地还是远程浏览器、去掉个人信息后的提示词、任务状态、停止页面、预期结果和网页实际显示内容。公开网页的截图或打码后的错误信息，比描述模型“似乎想做什么”的长篇文字更容易核查。\n\nGoogle Chrome 帮助社区可以提交产品问题，但社区回复可能是非官方内容，也可能对应旧版本。下方的 Chrome 帮助社区页面是读者问题，不是经过核实的故障诊断。按钮和使用条件应以当日官方帮助为准。若任务停在特定网站错误页，报告网站和可见错误；若入口缺失，则补充账号类型和可能的组织策略信息。\n\n若智能体点击时被其他网页元素挡住，可读[排查浏览器智能体点击被遮挡](/zh-cn/guides/browser-agent-diagnose-blocked-clicks/)。若表单值正确但没有提交结果，可看[浏览器智能体表单提交](/zh-cn/guides/browser-agent-form-submission/)。这些指南针对不同故障点，本文讲的是任务回复已完成但页面没有可观察变化。"
        }
      ],
      "faq": [
        {
          "question": "Gemini 说“完成”，能证明网页已经改变吗？",
          "answer": "不能。检查任务标签和网站自己的状态。完成提示本身无法验证搜索、表单、购物车、预约或账号设置是否已改变。"
        },
        {
          "question": "怎么知道 Gemini 正在等我处理？",
          "answer": "查看任务线程和 Chrome 通知中是否有接管或完成人工步骤的请求。Google 说明任务可能在登录、敏感操作或其他需要用户输入的位置暂停。"
        },
        {
          "question": "页面看起来没变化时，我要不要让 Gemini 再做一次？",
          "answer": "先确认任务标签，并在网站里查找已保存或部分完成的记录。重复不确定的预约、消息或账号修改可能造成重复数据。"
        },
        {
          "question": "链接中的 Chrome 社区问题能证明 Auto Browse 普遍故障吗？",
          "answer": "不能。我们只能核对问题页标题，无法确认正文。应以 Google 当前 Auto Browse 帮助中明确说明的任务行为为准；该问题和本文都不能证明存在服务故障或故障率。"
        }
      ]
    }
  },
  "gemini-chrome-skills-create-manage": {
    "en": {
      "title": "Gemini in Chrome Skills: save, edit and reuse a browser prompt",
      "description": "Turn a repeated page-reading instruction into a Gemini in Chrome Skill, test it on the active page and diagnose a missing Skills menu against current version and rollout requirements.",
      "category": "AI browser guides",
      "content": "If you find yourself pasting the same page-reading instructions into Gemini in Chrome, a Skill can save that prompt for reuse. The useful test is whether it works on another page with the same shape, while still reading the page you intend. Google’s current help page documents a slash-command menu, built-in Skills, custom Skills, editing and deletion. It also says rollout is gradual and that managed accounts may need administrator enablement. A missing menu therefore does not by itself prove that you created a Skill incorrectly.",
      "sections": [
        {
          "heading": "Check that you are using Chrome Skills",
          "body": "This workflow is specifically for Skills inside Gemini in Chrome on desktop. Google lists Chromebook Plus, Mac or Windows, current Chrome with Gemini in Chrome enabled, a personal Google Account, age 13 or the applicable age in your country, a supported region, and English (United States) as the Chrome language. Managed or Enterprise accounts can use Skills only if an administrator has enabled them. The feature is rolling out gradually; Google’s current help page says Chrome 147 or newer and describes a Skills flag as a possible manual enablement path for eligible users.\n\nStart by checking the browser version at chrome://version, confirming that you are in the intended Chrome profile, and opening Ask Gemini. Type / in its prompt field. If a Skills menu appears, you can browse recommended items or open the full directory at chrome://skills/browse. If the menu does not appear, compare your setup with Google’s current requirements before editing flags or creating another profile. A policy-managed computer should follow its administrator’s instructions; an organization can disable or control AI features centrally.\n\n| What you see | Likely next check | Avoid assuming |\n| --- | --- | --- |\n| / opens Skills | Browse or invoke a saved item | That a selected Skill has already read the intended page |\n| No Skills menu | Chrome version, account, Gemini in Chrome status and rollout | That an older tutorial’s menu path is current |\n| Personal profile works; work profile does not | Ask the administrator whether Skills are enabled | That changing accounts is an approved workaround |\n| A custom Skill appears but its output is generic | Test its prompt against the current active page | That saving alone proves it ran with page context |\n\nGoogle has a separate Skills feature in Gemini Apps. Its Skills transition for Gems is not the same as this Chrome page’s slash-menu feature, and the two help pages can have different availability and behavior. When following instructions, check that the page title says “Gemini in Chrome.” This also keeps Chrome Skills separate from Dia Skills and Perplexity Comet shortcuts, which have their own controls."
        },
        {
          "heading": "Turn a recurring page task into a narrow prompt",
          "body": "Write the reusable instruction around a job you repeat, not a vague goal such as “analyze this page.” Specify the material to inspect, the output, and what to do when information is absent. For a public product page, a prompt might say: “From the page I am viewing, list the product name, model number, stated warranty and any compatibility limits. Quote or link the page text for each field. Write ‘not stated’ when the page does not answer a field.” That instruction gives you a way to spot a made-up warranty or a compatibility claim copied from another site.\n\nUse page-dependent language such as “the page I am viewing” only after checking how the current Chrome Skill works in your account. First send the same instruction as a normal prompt on a harmless public page. Check that the answer uses the page you intended and that its fields are supported. Save it as a Skill, then try it on a second page with a similar structure. The second run tests whether the saved instructions generalize without silently relying on the first page’s details.\n\nA good reusable Skill handles one recurring task. Separate tasks that need different sources, output formats or levels of permission. A page summary and a cross-site comparison may need different instructions. If a Skill can use connected apps, list only the app context needed. Google says Chrome Skills are custom instructions; that description does not grant access to every connected app or authorize the Skill to act on an account."
        },
        {
          "heading": "Create, invoke and manage a custom Skill",
          "body": "Google’s current desktop steps begin in the Ask Gemini panel. Type /, choose Add Skill, enter a name and prompt, then save. To use it again, type / followed by its name. The same help page describes editing, creating and deleting entries through Browse Skills. A direct route to the saved list is chrome://skills/yourSkills; the full library is at chrome://skills/browse.\n\nAfter saving, run the Skill from a fresh prompt on the page you want it to inspect. Check the answer against that page. A useful repeatable check is to compare the output with the same short checklist each time: Did it name the right page? Did it preserve the requested fields? Did it leave unknowns blank? Did it cite the page rather than assume a fact? If the answer does not follow the prompt, edit the saved instructions and run the same safe example again.\n\nYou can copy a Skill’s instructions from its menu. This provides a simple fallback when you want to reuse or revise the text outside the Skill interface. Keep a copy before a substantial edit if you need the previous wording; do not assume that deleting a Skill preserves a recoverable version. Avoid saving passwords, private customer details or one-time account actions as reusable instructions."
        },
        {
          "heading": "When Skills is missing or a prompt seems ignored",
          "body": "Work through the checks in order. Confirm that you are using desktop Chrome on a supported platform and the current profile. Check that Gemini in Chrome itself is available. Then check Chrome version and the Skills rollout note. On an eligible unmanaged profile, Google documents a Skills flag for Chrome 147 or later; flags can change, and a company-managed browser may override them. Do not toggle multiple experimental flags on a managed work profile to bypass an organization’s policy.\n\nIf the Skill is visible but behaves like a plain prompt, distinguish three stages: the slash menu found the saved Skill; Gemini received its instructions; the answer used the intended tab context. Test with a short, public page and ask for one detail that is clearly visible there. If the response uses a different page or cannot identify the source, give it the page URL or quote the relevant passage and see whether the result changes. This checks the workflow without claiming a model test or assuming that all account settings behave identically.\n\nIf you still cannot locate Skills, note Chrome version, operating system, account type, whether Gemini in Chrome is available and whether the device is managed. Those details help Google support or an administrator separate a gradual rollout from a policy setting. An older walkthrough can show a menu that your account does not yet have; it cannot confirm rollout to your account."
        },
        {
          "heading": "Choose Skills when the same browser instruction recurs",
          "body": "A Skill fits a repeat task whose source rules and output format stay mostly the same. Use a one-off prompt when the instructions depend on new facts or a single unusual page. A saved Skill reduces repeated typing; it does not guarantee that Gemini will find every field, interpret the page correctly or complete a website action. Review the result each time, especially before sharing it or using it to change an account.\n\nGoogle’s Gemini Apps Skills and Chrome Skills should not be treated as interchangeable. Google’s November 2026 help explains that personal-account Gems are beginning a transition to Skills in Gemini Apps. The Chrome feature has its own current requirements, commands and saved-list routes. Dia’s Skills, documented in our [Dia Skills create, edit and reuse guide](/en/guides/dia-skills-create-edit-reuse/), are another separate product feature. For Comet’s / prompt shortcuts, see [Perplexity Comet Query Shortcuts](/en/guides/comet-query-shortcuts/)."
        }
      ],
      "faq": [
        {
          "question": "How do I open Skills in Gemini in Chrome?",
          "answer": "Open Ask Gemini in desktop Chrome and type / in the prompt field. Google documents the full library at chrome://skills/browse and saved items at chrome://skills/yourSkills."
        },
        {
          "question": "Why is Skills missing from my Chrome profile?",
          "answer": "Check supported desktop platform, Chrome version, Gemini in Chrome availability, account type, rollout status and administrator policy. Google says Chrome Skills are rolling out gradually and managed or Enterprise accounts need administrator enablement."
        },
        {
          "question": "Are Gemini Apps Skills and Chrome Skills the same feature?",
          "answer": "No. They have separate help pages, availability and controls. Check that the instructions you follow specifically say Gemini in Chrome."
        },
        {
          "question": "How can I tell whether a saved Skill used the page I intended?",
          "answer": "Run it on a harmless page, ask for a visible field and verify the answer against that page. A saved entry alone does not prove it used the correct tab."
        }
      ]
    },
    "zh-cn": {
      "title": "Gemini in Chrome Skills：保存、编辑并复用浏览器提示",
      "description": "把重复使用的网页阅读指令保存成 Gemini in Chrome Skill，在当前页面测试，并按最新版本和开放范围排查 Skills 菜单缺失。",
      "category": "AI 浏览器指南",
      "content": "如果你总要把相同的网页阅读要求粘贴到 Gemini in Chrome，可以保存成 Skill 以便复用。关键检查是：换到另一张结构相近的网页后，它是否仍读取你指定的页面。Google 当前帮助页说明，Gemini in Chrome 有斜杠菜单、内置 Skills、自定义 Skills、编辑和删除入口；同时提到功能正在逐步开放，受管理账号可能需要管理员启用。因此，菜单暂时没出现，不能直接说明创建步骤错了。",
      "sections": [
        {
          "heading": "先确认你打开的是 Chrome Skills",
          "body": "本文讲的是桌面版 Gemini in Chrome 的 Skills。Google 当前列出的条件包括 Chromebook Plus、Mac 或 Windows 电脑，最新版 Chrome，已启用 Gemini in Chrome，以及个人 Google 账号、年满 13 周岁（或达到所在国家/地区适用年龄）、位于受支持的地区，并将 Chrome 语言设为英语（美国）。受管理或 Enterprise 账号只有在管理员启用后才能使用。Google 帮助页还说明功能正在逐步开放，并把 Chrome 147 或更高版本和 Skills 旗标列为可能的手动启用方式。\n\n先在 chrome://version 查看浏览器版本，确认使用正确的 Chrome 个人资料，再打开 Ask Gemini 并输入 /。如果出现 Skills 菜单，可以浏览推荐项，也可以访问 chrome://skills/browse 查看完整目录。若菜单没有出现，按 Google 当前条件逐项检查，再考虑修改旗标或创建另一个浏览器资料。公司管理的设备应遵循管理员设置；组织可能统一控制 AI 功能。\n\n| 当前看到的现象 | 下一项检查 | 不要据此认定 |\n| --- | --- | --- |\n| 输入 / 后出现 Skills | 浏览或调用已保存项目 | 选中 Skill 后它已读取目标页面 |\n| 没有 Skills 菜单 | Chrome 版本、账号、Gemini in Chrome 状态和开放进度 | 旧教程里的菜单路径仍然正确 |\n| 个人资料可用，工作资料不可用 | 询问管理员是否启用 Skills | 换账号是获得批准的绕过方法 |\n| 自定义 Skill 出现，但回答很泛 | 在当前活动页面测试提示词 | 仅凭保存动作就能证明它读取了页面 |\n\nGemini Apps 中也有独立的 Skills 功能。Gems 迁移到 Skills 的变更不等于 Chrome 页面里的斜杠菜单功能，两套帮助说明的开放范围和行为也可能不同。查操作步骤时，确认页面标题写的是“Gemini in Chrome”。这也能避免把 Chrome Skills 和 Dia Skills、Perplexity Comet 快捷方式混为一谈；它们属于不同产品，各有自己的操作入口。"
        },
        {
          "heading": "把重复页面任务写成具体提示",
          "body": "围绕一项重复工作写指令，不要只写“分析这个页面”。说清要检查什么、要输出什么，以及信息缺失时怎么处理。比如针对公开产品页，可以要求：“从我正在查看的页面中列出产品名称、型号、页面标出的保修期和兼容限制。每个字段引用或链接页面原文。页面没有说明的字段写‘未注明’。”这样你可以发现模型编造保修信息，或把其他网页的兼容性内容套过来。\n\n只有确认当前 Chrome Skill 会按预期读取页面后，才使用“正在查看的页面”这类上下文要求。先在一张无风险的公开网页上把同一条指令作为普通提示运行，检查它确实使用目标页面，且字段有页面依据。保存成 Skill 后，再换一张结构相近的页面测试。第二次运行可以判断指令是否适用于同类页面，而不是无意间依赖第一次页面里的具体信息。\n\n一个 Skill 最好处理一项重复工作。来源、输出格式或权限要求不同的任务，应该用不同提示。网页摘要和跨站对比可能需要不同的流程。若 Skill 可以使用连接的应用，只列出完成任务必需的应用上下文。Google 把 Chrome Skills 说明为自定义指令；这不等于授予它访问所有连接应用或操作账号的权限。"
        },
        {
          "heading": "创建、调用和管理自定义 Skill",
          "body": "Google 当前的桌面步骤从 Ask Gemini 面板开始：输入 /，选择 Add Skill，填写名称和提示词，然后保存。以后输入 / 和 Skill 名称即可调用。帮助页还说明，可以通过 Browse Skills 编辑、创建或删除条目。已保存列表地址是 chrome://skills/yourSkills，完整技能库位于 chrome://skills/browse。\n\n保存后，在目标页面上用新提示运行 Skill，并对照网页检查回答。每次都可以核对相同清单：页面名称对吗？指定字段都保留了吗？未知内容有没有留空？引用的是当前页面还是模型凭记忆推断？如果回答没有遵循指令，修改已保存的文本，然后在同一类安全页面上再测一次。\n\n你也可以从 Skill 菜单复制其指令。这在想把文本拿到界面外复用或修改时很方便。如果大幅编辑前还需要保留旧版本，可以先复制一份。不要假设删除后一定能恢复原文。不要把密码、私人客户资料或只适用于一次的账号操作保存成通用指令。"
        },
        {
          "heading": "Skills 缺失或提示似乎未生效时",
          "body": "按顺序检查：当前是不是受支持平台上的桌面 Chrome？使用的资料是否正确？Gemini in Chrome 本身能否打开？再核对 Chrome 版本和 Skills 开放说明。对符合条件且未受管理的资料，Google 记录了 Chrome 147 或更高版本下的 Skills 旗标。旗标可能变化，公司管理的浏览器也可能覆盖用户设置。不要在受管理的工作资料中随意切换多个实验旗标来绕过组织策略。\n\n如果 Skill 在列表里，但看起来只像普通提示文字，分别检查三步：斜杠菜单是否找到保存项；Gemini 是否收到指令；回答是否使用了目标标签的上下文。找一张简短的公开页面，要求它指出一项清楚可见的信息。若回答指向别的页面或说不出来源，可以把目标网址或原文段落写进提示，再看结果是否改变。这样是在检查自己的工作流，不代表完成了模型测试，也不推断所有账号设置都一样。\n\n仍然找不到 Skills 时，记录 Chrome 版本、操作系统、账号类型、Gemini in Chrome 是否可用，以及设备是否受管理。Google 支持人员或组织管理员可以据此区分逐步开放与策略控制。旧教程可能展示尚未向你的账号开放的菜单，不能据此判断自己的账号是否已经获得该功能。"
        },
        {
          "heading": "重复的浏览器指令适合保存为 Skill",
          "body": "当来源规则和输出格式大体固定，而且任务会在多个页面重复时，保存为 Skill 合适。每次都依赖新事实或特定页面的一次性提示，更适合直接输入。Skill 能减少重复打字，但不能保证 Gemini 找到所有字段、正确理解页面或完成网站操作。每次都要检查结果，尤其是在分享结果或据此修改账号之前。\n\nGoogle Gemini Apps Skills 和 Chrome Skills 不应视为同一功能。Google 在 2026 年 11 月更新的 Gemini Apps 帮助页说明，个人账号的 Gems 正开始迁移到 Skills；Chrome 功能有自己的开放条件、斜杠命令和已保存列表路径。我们也有[Dia Skills 创建、编辑和复用指南](/zh-cn/guides/dia-skills-create-edit-reuse/)，讲的是另一种产品功能。Comet 的 / 提示快捷方式见[Perplexity Comet 查询快捷方式](/zh-cn/guides/comet-query-shortcuts/)。"
        }
      ],
      "faq": [
        {
          "question": "Gemini in Chrome 里怎么打开 Skills？",
          "answer": "在桌面版 Chrome 打开 Ask Gemini，在输入框里键入 /。Google 说明完整技能库在 chrome://skills/browse，已保存项目列表在 chrome://skills/yourSkills。"
        },
        {
          "question": "为什么我的 Chrome 资料里没有 Skills？",
          "answer": "检查桌面平台、Chrome 版本、Gemini in Chrome 是否可用、账号类型、开放进度和管理员策略。Google 说明 Chrome Skills 正在逐步开放，受管理或 Enterprise 账号需要管理员启用。"
        },
        {
          "question": "Gemini Apps Skills 和 Chrome Skills 是同一个功能吗？",
          "answer": "不是。它们有不同的帮助页面、开放条件和控件。按教程操作时，要确认页面明确写的是 Gemini in Chrome。"
        },
        {
          "question": "怎么确认 Skill 用的是我想要的网页？",
          "answer": "在无风险页面上运行，要求它读一项页面可见的信息，再对照页面核实。保存列表里出现 Skill 不能证明它使用了正确标签。"
        }
      ]
    }
  },
  "comet-control-browser-missing": {
    "en": {
      "title": "Comet “Control Browser” is missing: check the route you are using",
      "description": "Troubleshoot missing browser control in Perplexity Comet and the Perplexity desktop app. Separate Comet’s own Assistant from Computer’s installed-browser routes and check current permission flow.",
      "category": "AI browser guides",
      "content": "If Comet’s Assistant no longer shows a “Control Browser” option, do not assume the feature was removed for every account. Perplexity documents more than one browser-control route: the Assistant can act inside Comet, while Computer in the Mac desktop app can use an installed Comet browser or, in supported releases, a Chromium browser extension. Recent users have reported a missing control and received conflicting explanations. The current help pages do not establish a universal migration. Start by identifying the app, platform, version and browser that the task should use.",
      "sections": [
        {
          "heading": "Identify which Perplexity surface you opened",
          "body": "“Comet Assistant” means the AI panel inside the Comet browser. “Computer” is a Perplexity task surface that can coordinate multi-step work. The desktop app has its own browser-connection flow. A help page about Computer using Chrome does not prove that the same extension control appears inside Comet Assistant, and an old Comet screenshot does not prove that its control is still available in every current account.\n\n| What you opened | Current documented browser path | What to verify |\n| --- | --- | --- |\n| Comet browser on desktop | Ask Comet Assistant from the browser; it may offer to browse or act with your approval | Comet is updated, the page is open in the intended profile, and the request asks for an actual page action |\n| Perplexity desktop app on Mac, with Comet installed | Current help says install Comet; first use requests permission and uses the installed browser | Comet is installed and the permission prompt was accepted |\n| Perplexity desktop app on Mac with Chrome, Edge or Brave | The Oct 2026 changelog documents a Chromium extension route in Mac app version 26.38 or later | Extension installed, current app version, and selected browser in Settings > Connectors |\n| Perplexity app on Windows | The opened extension instructions do not establish the same Computer extension route for Windows | Check current platform-specific help; do not copy Mac steps as Windows instructions |\n\nThe November 6, 2026 Perplexity help page describes the Mac desktop app path: install Comet, then allow the app to request permission when a task needs the local browser. It says no separate Comet connector needs to be enabled in the app before first use. A separate October changelog describes the extension for Chrome, Edge or Brave on the Mac app, with a connector choice in Settings. These are documented routes with different prerequisites, not proof that every user’s missing Comet control moved to a single new place."
        },
        {
          "heading": "Check the current Comet Assistant path",
          "body": "If you intended to use the browser you are already viewing, open the page in Comet and start the request from the Assistant inside that browser. Describe the action and the page it should use. Perplexity’s current explanation says the Assistant may ask whether to handle a task itself; it can show browser actions and pause before sensitive steps such as sign-in or purchase. Approve only the action you intend. A request to explain a page may return an answer without controlling the page, so phrase the task as an action when that is what you need.\n\nIf the control option is absent, record the Comet version from its About or update screen, operating system, account/plan label and whether the request was started in Comet or the general Perplexity app. Check for an update through Comet’s own update control, then open a harmless public page and try a low-risk navigation instruction. Do not use a purchase, message or account change as a diagnostic prompt. The result helps distinguish an absent interface from an action that was offered but not carried out.\n\nA dated Reddit thread from September 2026 shows users asking whether Control Browser had disappeared, with some replies reporting different behavior on desktop and Android. A second thread from October reports the control absent for one user and Computer working instead. These posts establish confusion and account-level variation in reports; they do not prove a global product change, cause, supported plan or current fix. Use the current in-product prompt and Perplexity documentation for your own account."
        },
        {
          "heading": "Check Computer’s installed-browser route on Mac",
          "body": "If you started from the Perplexity Mac desktop app, first confirm whether the installed-browser route or extension route is documented for your setup. Perplexity’s help page updated November 6 says that installing Comet is the documented Mac path. When a task needs the local browser, the app requests permission and then uses the installed Comet browser. There is no separate Comet connector switch to turn on before the first use. If no permission request appears, verify that you started a task which needs the browser and that Comet is installed; then consult current support rather than searching for an undocumented connector.\n\nFor the separate extension path, Perplexity’s October changelog specifies Mac app version 26.38.0 or later and an extension for a Chromium browser such as Chrome, Edge or Brave. The connected browser can be changed under Settings > Connectors, and Comet remains the default when installed. Check the selected browser there before starting. An extension in Chrome will not silently control a different browser profile, and permission to use the browser does not mean the task has permission to submit every form or access every account.\n\nIf the task opens a browser prompt, review the app name and requested access before approving. Use a public page to confirm that the correct browser opens and that it can see the intended tab. If a required sign-in prompt appears, complete it yourself only when the account and site are expected. Close or disconnect the route when the task is done if you no longer want the desktop app to use that browser."
        },
        {
          "heading": "Diagnose by the point where the route stops",
          "body": "Use the first point of failure to decide what to check next. A missing button, denied permission and an action that begins but does not change the page are different problems.\n\n| Observation | Check next | Evidence to keep |\n| --- | --- | --- |\n| No control or browser task choice appears | Confirm Comet Assistant versus Perplexity Computer; update and try from the intended surface | App name, version, OS, account label and screenshot with private data hidden |\n| Mac desktop app never asks for local-browser permission | Confirm Comet is installed and the task actually requires local browser access | Task surface, permission status and whether Comet opens |\n| Chrome/Edge/Brave does not appear in Connectors | Confirm Mac desktop app 26.38+ and the extension route is available for that version | App version, browser version and extension status |\n| Browser opens but uses the wrong page or profile | Stop, switch to the intended profile/page and restate the task | Site, profile label and exact visible result |\n| Assistant describes actions but page state is unchanged | Verify the page and avoid repeating a potentially consequential action | Task summary, page URL and observed state |\n\nDo not treat browser access as authorization to send a message, make a purchase or change an account. The Assistant’s permission prompt and the website’s own final confirmation are separate steps. For choosing Comet versus Gemini in Chrome, see [Perplexity Comet vs Gemini in Chrome](/en/guides/comet-vs-gemini-in-chrome/). For an unchanged page, [Gemini Auto Browse result verification](/en/guides/gemini-chrome-auto-browse-no-action/) gives a general state-check pattern, not Comet-specific controls."
        },
        {
          "heading": "Report a missing control without overstating the cause",
          "body": "If the route is still absent, send support a short report with the surface you opened, platform, app and browser versions, account type, visible control names, and whether you saw a permission prompt. Include a public, non-sensitive page example. Do not attach cookies, browser profiles, passwords or a full account export. If a task began and failed, include its task link where the product offers one.\n\nWhen reading Reddit or old walkthroughs, compare the post date with today’s help page. A control may vary by platform, rollout, plan or app release, and a screenshot from an earlier build is not a current guarantee. The best useful conclusion may be “the help page documents the Mac desktop-app route, while my Comet account does not show the same control.” That is precise enough to request clarification without claiming that Perplexity removed a feature for everyone."
        }
      ],
      "faq": [
        {
          "question": "Was Control Browser removed from Comet for everyone?",
          "answer": "The current sources reviewed here do not establish a universal removal. Users have reported different interfaces, while current Perplexity help documents both Comet Assistant behavior and Computer browser routes."
        },
        {
          "question": "Does the Mac desktop app need a Comet connector toggle?",
          "answer": "The November 6 help page says no separate Comet connector is needed before first use. The app requests permission when a task needs the installed Comet browser."
        },
        {
          "question": "Can I use the Chrome extension instructions on Windows?",
          "answer": "The cited extension changelog describes the Mac desktop app. It does not establish the same Computer extension route for Windows; check current Windows documentation."
        },
        {
          "question": "Should I approve a browser permission prompt?",
          "answer": "Only if the app, browser and task are the ones you intended. Review access before approving and keep sensitive actions subject to their own confirmation."
        }
      ]
    },
    "zh-cn": {
      "title": "Comet 找不到“Control Browser”：先确认当前使用路径",
      "description": "排查 Perplexity Comet 和 Perplexity 桌面应用中缺少浏览器控制的问题，区分 Comet Assistant 与 Computer 的已安装浏览器路径，并核对当前授权流程。",
      "category": "AI 浏览器指南",
      "content": "如果 Comet Assistant 里看不到“Control Browser”，不要立刻认定所有账号都已移除该功能。Perplexity 文档列出了不止一种浏览器操作路径：Comet Assistant 可以在 Comet 浏览器里操作，Mac 桌面应用中的 Computer 则可以使用已安装的 Comet，或在特定版本中通过 Chromium 浏览器扩展连接。近期用户报告过控制入口消失，也有人得到不同解释。现有帮助页没有证明所有账号都统一迁移到了一个新入口。先确认你打开的产品、平台、版本，以及任务准备使用哪个浏览器。",
      "sections": [
        {
          "heading": "确认你打开了哪个 Perplexity 界面",
          "body": "“Comet Assistant”指 Comet 浏览器内的 AI 面板；“Computer”指 Perplexity 的多步骤任务功能。桌面应用有自己的浏览器连接方式。讲 Computer 如何使用 Chrome 的帮助页，不能证明 Comet Assistant 中也会出现同一个扩展控件；旧版 Comet 截图也不能证明当前每个账号都保留相同入口。\n\n| 当前打开的界面 | 文档记载的浏览器路径 | 接下来核对什么 |\n| --- | --- | --- |\n| 桌面 Comet 浏览器 | 从浏览器里的 Assistant 发起请求；它可能询问是否要代为浏览或操作 | Comet 已更新、目标页面在正确资料中、提示明确要求网页动作 |\n| Mac Perplexity 桌面应用，已安装 Comet | 当前帮助说明为安装 Comet；首次需要本地浏览器时请求权限 | Comet 已安装，权限提示已获准 |\n| Mac Perplexity 桌面应用，使用 Chrome、Edge 或 Brave | 2026 年 10 月更新记录了 Mac 26.38 及以上版本的 Chromium 扩展路径 | 扩展已安装、应用版本正确，并在 Settings > Connectors 中选择目标浏览器 |\n| Windows Perplexity 应用 | 已查看的扩展说明没有确认 Windows 使用同一 Computer 扩展路径 | 查当前平台帮助，不要直接照搬 Mac 步骤 |\n\nPerplexity 2026 年 11 月 6 日的帮助页讲的是 Mac 桌面应用路径：安装 Comet；当任务需要本地浏览器时，应用会请求授权，然后使用已安装的 Comet。首次使用前，不需要在应用中打开单独的 Comet connector。另一个 10 月更新记录介绍了 Mac 桌面应用里的 Chrome、Edge 或 Brave 扩展，并允许在 Settings > Connectors 中切换连接浏览器。这些是前提不同的已记录路径，不能据此说所有用户缺失的 Comet 控件都迁移到了同一处。"
        },
        {
          "heading": "检查 Comet Assistant 的当前操作方式",
          "body": "如果你想让助手操作当前正在浏览的网页，就在 Comet 内打开该页面，并从 Comet Assistant 发起请求。说明要做的动作和目标页面。Perplexity 当前的产品说明称，Assistant 可能询问是否代为处理，并展示浏览动作；登录或购买等敏感步骤会暂停并请求许可。只批准你明确希望执行的动作。若你只是要求解释网页，助手可能只返回文字答案；需要它操作页面时，应在提示中写清具体动作。\n\n如果控制入口没有出现，记下 Comet 的 About 或更新页面显示的版本、操作系统、账号或套餐标识，以及请求是在 Comet 还是 Perplexity 普通应用中发起。先通过 Comet 自己的更新入口检查版本，再用公开且无风险的网页测试一次简单导航。不要用购买、发消息或修改账号设置来诊断。这样可以区分界面入口缺失与入口存在但操作未执行。\n\n2026 年 9 月 Reddit 帖子中有用户询问 Control Browser 是否消失，也有人报告桌面和 Android 的行为不同。10 月的另一条帖子提到某个账号缺少入口，而 Computer 能工作。这些帖子能证明有人遇到困惑、报告了不同界面；不能证明全局改版、具体原因、套餐适用范围或当前修复方法。应以自己账号中出现的操作提示和 Perplexity 当前文档为准。"
        },
        {
          "heading": "在 Mac 上检查 Computer 已安装浏览器路径",
          "body": "如果你从 Perplexity Mac 桌面应用发起任务，先确认当前配置对应的是已安装浏览器路径还是扩展路径。Perplexity 11 月 6 日更新的帮助说明指出，Mac 路径是安装 Comet。当任务需要本地浏览器时，应用会请求授权，然后使用已安装的 Comet。首次使用前没有单独的 Comet connector 开关。如果没有授权提示，确认这项任务确实需要浏览器且 Comet 已安装；然后查看当前支持文档，不要寻找没有记录的连接器。\n\n扩展是另一条路径。Perplexity 的 10 月更新说明要求 Mac 桌面应用 26.38.0 或更新版本，并为 Chrome、Edge、Brave 等 Chromium 浏览器提供扩展。可以在 Settings > Connectors 切换连接浏览器；若已安装，Comet 仍是默认项。开始任务前确认这里选的是哪个浏览器。Chrome 的扩展不会自动控制另一个浏览器资料；授权浏览器访问也不等于允许任务提交任何表单或访问所有账号。\n\n出现浏览器权限提示时，先核对应用名称和请求权限，再决定是否允许。可以用公开网页确认打开的是正确浏览器，并查看任务能否看到目标标签。若任务需要登录，只在账号和网站符合预期时自行完成登录。任务结束后，如果不希望桌面应用继续使用该浏览器，再关闭或断开连接。"
        },
        {
          "heading": "按停止位置判断该查什么",
          "body": "先找到问题发生的阶段。按钮缺失、权限被拒，以及开始操作却没有改变页面，是不同故障。\n\n| 看到的情况 | 下一步检查 | 保留的证据 |\n| --- | --- | --- |\n| 没有控制按钮或浏览器任务选项 | 确认是 Comet Assistant 还是 Perplexity Computer；更新后从目标界面尝试 | 应用名称、版本、系统、账号类型和隐藏私密信息后的截图 |\n| Mac 应用没有请求本地浏览器权限 | 确认 Comet 已安装，且任务确实需要本地浏览器 | 任务界面、权限状态和 Comet 是否打开 |\n| Connectors 中没有 Chrome/Edge/Brave | 确认 Mac 桌面应用版本为 26.38+，且当前版本支持扩展路径 | 应用版本、浏览器版本和扩展状态 |\n| 打开的不是目标页面或资料 | 停止任务，切换到正确页面或资料，再重新说明目标 | 网站、资料名称和页面实际显示内容 |\n| Assistant 描述了动作，但网页没变 | 核对页面状态；避免重复可能已经提交的操作 | 任务摘要、页面网址和当前状态 |\n\n浏览器访问权限不是发送消息、购物或修改账号的授权。Assistant 的浏览器权限提示与网站自己的最后确认是两道不同步骤。比较 Comet 与 Chrome 中 Gemini 的产品选择，可看[Perplexity Comet 与 Gemini in Chrome 对比](/zh-cn/guides/comet-vs-gemini-in-chrome/)。若网页状态没有变化，[核对 Gemini Auto Browse 页面结果](/zh-cn/guides/gemini-chrome-auto-browse-no-action/)提供通用状态核对方法，但不包含 Comet 专属控件说明。"
        },
        {
          "heading": "报告缺失入口时不要猜原因",
          "body": "若入口仍缺失，向支持人员提供简短记录：打开了哪个界面、平台、应用与浏览器版本、账号类型、可见控件名称，以及是否收到权限请求。用公开、无敏感信息的网页作为例子。不要附带 Cookie、浏览器资料、密码或完整账号导出。如果任务已经启动且中途失败，并且产品提供任务链接，可以附上该链接。\n\n查阅 Reddit 和旧教程时，先比较发布日期与当前帮助页面。控件可能因平台、逐步开放、套餐或应用版本而不同；旧版本截图不保证当前仍适用。更准确的结论可以是：“当前帮助页写明了 Mac 桌面应用路径，但我的 Comet 账号没有显示同样的控制入口。”这足以提出问题，无需断言 Perplexity 已对所有人移除功能。"
        }
      ],
      "faq": [
        {
          "question": "Perplexity 已对所有人移除 Comet 的 Control Browser 吗？",
          "answer": "当前查到的来源不能证明全局移除。用户报告了不同界面，Perplexity 当前帮助页则分别记录了 Comet Assistant 和 Computer 的浏览器路径。"
        },
        {
          "question": "Mac 桌面应用需要单独打开 Comet connector 吗？",
          "answer": "11 月 6 日的帮助页说，首次使用前不需要单独的 Comet connector。任务需要已安装的本地 Comet 时，应用会请求权限。"
        },
        {
          "question": "Windows 可以照搬 Chrome 扩展步骤吗？",
          "answer": "引用的扩展更新说明针对 Mac 桌面应用，没有确认 Windows 使用同一 Computer 扩展路径。请查当前 Windows 文档。"
        },
        {
          "question": "我应该允许浏览器权限提示吗？",
          "answer": "仅当应用、浏览器和任务都符合你的预期时才允许。批准前检查访问范围；敏感操作还要单独确认。"
        }
      ]
    }
  },
  "perplexity-comet-usage-limits": {
    "en": {
      "title": "Perplexity Comet usage limits: separate Search from Work and Computer",
      "description": "Diagnose a Comet usage-limit or credit prompt by checking Search versus Work mode, weekly included Computer usage, account credits and the Usage page. Current consumer rules may vary by rollout.",
      "category": "AI browser guides",
      "content": "A Comet message about a usage limit can refer to different things. A normal Perplexity Search, Comet Assistant in Search mode and Comet Assistant in Work mode do not share one published counter. The current Perplexity credits guide says Search does not use Computer credits, while Work mode runs Computer and does. Paid Consumer Pro may also include weekly Computer usage during rollout. Check the mode and your account’s Usage page before deciding that you exhausted a search allowance or need to upgrade.",
      "sections": [
        {
          "heading": "Identify what you sent before interpreting the warning",
          "body": "In Comet, inspect the mode selector before you submit a prompt. Search mode asks for an answer; Work mode hands the request to Computer for multi-step execution. Perplexity’s current credits guide, last modified November 4, 2026, lists Ask searches and Comet Assistant in Search mode as not consuming credits. It lists Computer tasks and Comet Assistant in Work mode as credit-using.\n\n| Request path | What the current help page says | What to check |\n| --- | --- | --- |\n| Perplexity Ask / Search | Does not consume Computer credits | Search mode is selected before you send |\n| Comet Assistant, Search mode | Does not consume Computer credits | The mode selector still says Search |\n| Comet Assistant, Work mode | Runs Computer and uses included usage or credits | Work mode is selected and the task page is a Computer task |\n| A page with /computer/tasks/ in the address | It is a Computer task; you cannot switch it to Search mid-task | Leave the task and start a new Search session if you want a regular answer |\n\nA credit prompt after selecting Work mode does not mean that your Perplexity Search allowance is gone. It means the request is being handled by Computer, subject to that account’s included usage and credit state. The label “Pro” by itself also does not say whether a particular request is a Search or a Computer task."
        },
        {
          "heading": "Check whether weekly Pro Computer usage is available",
          "body": "Perplexity’s current help page says paid Consumer Pro plans include a weekly amount of Computer usage, but it is rolling out gradually. This inclusion is available only when the Usage page shows “Included in Pro.” The same page says it does not apply to promotional or non-paying Pro, Max or Enterprise plans. Those accounts follow their own credit rules. Do not infer that every account on Pro has the same weekly allowance.\n\nWhen the weekly inclusion is present, its cycle starts the first time you use included usage, not on your billing date. Unused included usage does not roll over. The Usage page shows the remaining weekly amount and its reset date; check that page instead of estimating from the subscription renewal date or a Reddit comment. The included-usage meter is separate from a credit balance.\n\nThe help page says included usage runs on Light effort when you have no credits available. If credits are available, you can use any effort setting; higher effort uses the weekly included allowance faster. Once that allowance runs out, the task may use credits if available. If you do not see “Included in Pro,” that account has not received the feature according to the current document. Don’t treat it as a bug or assume a hidden fixed task count."
        },
        {
          "heading": "Read the Usage page before buying or restarting anything",
          "body": "Open the Usage page linked from account settings. The current help page says it shows Bonus, Plan and Purchased credit balances, remaining included weekly Computer usage for eligible paid Consumer Pro accounts, the next reset date, usage by type and session, and auto-refill and spending-limit settings. For an individual Computer run, open that session’s Usage dropdown to see the credits used and usage type.\n\nIf you have not used Computer recently but the total looks lower, check the credit categories and expiry dates. The current documentation says bonus credits can expire on their stated date; monthly Plan credits refresh on the billing cycle and do not roll over; purchased credits are consumed after bonus and plan credits. This can explain a lower balance after inactivity without proving that a new task ran. The Usage page and task dropdown are better evidence than a remembered starting balance.\n\nIf weekly included usage runs out, what happens next depends on the account: Computer can switch to available credits; enabled auto-refill can purchase more under the account settings; without credits or auto-refill, the task is blocked until the weekly reset or another allowed option. The page says the included weekly reset is shown for that account. Check whether auto-refill is on before resuming a task if avoiding an unexpected purchase matters to you. Perplexity says auto-refill is off by default, but verify your own setting."
        },
        {
          "heading": "Keep Search available when you only need an answer",
          "body": "You do not need to use Computer for a question that Search can answer. Perplexity’s current help page says there is no account setting to disable Computer or set a permanent default mode for every surface. On the web Home page, the last selected mode can affect what is selected next. Before sending a prompt, read the mode label. If the interface says Work or Computer, choose Search when you only want a regular answer.\n\nA Computer task page cannot switch back to Search mid-session. Go back to the Home page, select Search in the mode toggle and begin a new session. If you need to keep context from the Computer task, copy only the information needed into the new prompt. Do not assume a task can be converted without starting a new Search thread.\n\nThe same distinction applies inside Comet: Assistant Search is a question-and-answer path; Assistant Work is a Computer task. If you did not intend to delegate browser actions, return to Search before submitting. This avoids starting a task that uses a separate allowance or credit source. If you do want browser actions, review the page and permissions in the [Comet Control Browser route guide](/en/guides/comet-control-browser-missing/) before authorizing them."
        },
        {
          "heading": "Separate a limit notice from a failed task",
          "body": "A usage warning, a task that stops, and a task that finishes with an incorrect result are different cases. Check the task status, mode and Usage details before repeating it. The current credits help page says paused Computer tasks may resume when eligible credits return, while new tasks can be blocked when usage is exhausted. It separately explains that a task that finished with an unwanted result does not automatically receive a credit refund. Do not assume that rerunning a failed-looking task is free.\n\nIf the screen says credits remain but Computer reports none, refresh the Usage page and check whether you are looking at the right balance. The current support guide includes a separate Enterprise case where an organization’s shared credit pool can differ from an individual allocation or administrator-set cap. For a consumer account, capture the task link, warning, mode label and visible balance, then use Help > Contact Support. Do not use unofficial endpoints or browser developer tools to inspect private account limits.\n\nOlder community questions about “Comet Pro search limits” may describe earlier product labels or modes. Current official documentation separates Pro Search limits from Computer credit usage and also separates Comet Assistant Search from Work. Reddit posts help show why users ask about the counter; they do not establish your account’s quota or reset date. Use the account’s Usage page and the latest help wording for the answer that applies to your plan."
        }
      ],
      "faq": [
        {
          "question": "Does Comet Assistant Search use Computer credits?",
          "answer": "Perplexity’s current credits page says Comet Assistant in Search mode does not use credits. Work mode runs Computer and does use included usage or credits."
        },
        {
          "question": "Does every Perplexity Pro account have weekly Computer usage?",
          "answer": "No. The feature is rolling out. The Usage page should show “Included in Pro” for an account that has it; the help page excludes promotional or non-paying Pro, Max and Enterprise plans from that inclusion."
        },
        {
          "question": "When does the included weekly usage reset?",
          "answer": "For an eligible paid Consumer Pro account, the week starts when you first use included usage, not on the billing date. The account’s Usage page shows its next reset date."
        },
        {
          "question": "Why did my balance fall if I was not using Comet?",
          "answer": "Check bonus expiry and the separate credit categories. Bonus credits can expire on their stated date; monthly plan credits follow the billing cycle. A lower balance alone does not show that a task ran."
        },
        {
          "question": "Can I switch a Computer task to Search without losing the task page?",
          "answer": "No. The current help page says a Computer task page cannot switch to Search mid-task. Return Home, select Search and start a new session, copying only the context you need."
        }
      ]
    },
    "zh-cn": {
      "title": "Perplexity Comet 使用限额：区分 Search、Work 和 Computer",
      "description": "通过 Search 与 Work 模式、每周 Computer 包含用量、账号积分和 Usage 页面，排查 Comet 限额或积分提示。当前消费者规则可能因开放进度而不同。",
      "category": "AI 浏览器指南",
      "content": "Comet 显示用量限制，可能指不同的计数器。普通 Perplexity Search、Comet Assistant 的 Search 模式和 Work 模式，并不共用一个已公布的额度。Perplexity 当前积分帮助页说明：Search 不消耗 Computer 积分，Work 模式会运行 Computer。付费 Consumer Pro 也可能在逐步开放中获得每周 Computer 包含用量。先检查模式和账号 Usage 页面，再判断是搜索额度用完，还是需要更改套餐。",
      "sections": [
        {
          "heading": "先确认你发起的是哪种请求",
          "body": "提交提示前，先检查 Comet 的模式选择器。Search 用于获取答案；Work 会把请求交给 Computer 执行多步骤任务。Perplexity 2026 年 11 月 4 日更新的积分帮助页把 Ask 搜索和 Comet Assistant 的 Search 模式列为不消耗积分；Computer 任务和 Assistant 的 Work 模式则会使用包含用量或积分。\n\n| 请求路径 | 当前帮助页说明 | 应检查什么 |\n| --- | --- | --- |\n| Perplexity Ask / Search | 不消耗 Computer 积分 | 发送前是否选中 Search |\n| Comet Assistant 的 Search 模式 | 不消耗 Computer 积分 | 模式选择器仍显示 Search |\n| Comet Assistant 的 Work 模式 | 运行 Computer，使用包含用量或积分 | 选中的是 Work，任务是否属于 Computer |\n| 地址含 /computer/tasks/ 的页面 | 这是 Computer 任务；任务中无法切换为 Search | 离开任务页面，另开 Search 会话以获得普通答案 |\n\n选择 Work 后出现积分提示，不代表 Perplexity Search 的额度已经用完；它表示请求由 Computer 处理，需按该账号的包含用量和积分状态结算。账号标有“Pro”，也不能说明这条请求使用的是 Search 还是 Computer。"
        },
        {
          "heading": "检查账号是否有每周 Pro Computer 包含用量",
          "body": "Perplexity 当前帮助页称，付费 Consumer Pro 计划有每周 Computer 用量，但该功能正在逐步开放。只有 Usage 页面显示“Included in Pro”时，才能确认账号拥有这项包含用量。帮助页说明，促销或非付费 Pro、Max 和 Enterprise 计划不包含在内；这些账号适用各自的积分规则。不能推断所有 Pro 账号都享有相同的每周额度。\n\n若账号显示每周包含用量，它从第一次使用时开始计算，不按账单日重置。未使用的额度不会结转。Usage 页面会显示剩余用量和下次重置日期；应查看该页面，不要按订阅续费日期或 Reddit 评论推算。包含用量的计数与积分余额分开显示。\n\n帮助页说明，没有可用积分时只能选择 Light effort。有积分时可以选择任意 effort 设置；更高设置会更快消耗每周包含用量。包含用量用完后，如果账号还有积分，任务可能转而使用积分。如果页面没有“Included in Pro”，按当前文档说明，该账号尚未开放此功能。不要把它直接当成故障，也不要猜测隐藏的固定任务次数。"
        },
        {
          "heading": "购买或重试前先看 Usage 页面",
          "body": "从账号设置打开 Usage 页面。当前帮助页说明，这里可查看 Bonus、Plan 和 Purchased 等积分余额；符合条件的付费 Consumer Pro 账号还可查看每周 Computer 剩余用量和重置日期。页面也显示按类型与会话划分的用量、自动补充和支出上限设置。查看某次 Computer 运行时，打开对应会话的 Usage 下拉项，检查使用了多少积分和积分类型。\n\n如果最近没有使用 Computer，但余额变少了，查看积分类别和过期日期。当前文档说明，Bonus 积分会在注明日期过期；每月 Plan 积分按账单周期刷新且不结转；Purchased 积分在 Bonus 和 Plan 积分之后使用。这些情况可能解释长期未使用后余额下降，但不能证明有新任务运行。Usage 页面和任务下拉明细，比记忆中的初始余额更准确。\n\n每周包含用量耗尽后会如何处理，取决于账号：Computer 可转用现有积分；若启用了自动补充，系统会按账号设置购买积分；若没有积分且未启用自动补充，则任务会被阻止，直到每周重置或选择其他允许的方式。当前帮助页说账号的周重置时间会显示在 Usage 页面。如果不想意外购买，在恢复任务前检查自动补充状态。Perplexity 说自动补充默认关闭，但仍应查看自己的设置。"
        },
        {
          "heading": "只想要答案时继续使用 Search",
          "body": "可以用 Search 回答不需要 Computer 的问题。Perplexity 当前帮助页称，账号没有一个设置能彻底关闭 Computer 或为所有界面设定永久默认模式。Web Home 页面可能会记住上次选择的模式。发送提示前看清模式标签；如果显示 Work 或 Computer，而你只需要普通答案，就切换为 Search。\n\nComputer 任务页面不能在同一任务中切回 Search。返回 Home，在模式切换器中选择 Search，再开启新会话。如果要保留 Computer 任务里的上下文，只把必要信息复制到新提示中。不要假设原任务页能无损转换成 Search 对话。\n\nComet 内的模式选择也遵循这一点：Assistant Search 用于问答，Assistant Work 会启动 Computer 任务。若你不打算委托浏览器操作，先切回 Search 再发送请求，避免启动另一种用量或积分计数。确实需要网页操作时，授权前可看[Comet Control Browser 路径排查](/zh-cn/guides/comet-control-browser-missing/)。"
        },
        {
          "heading": "区分限额提示与任务失败",
          "body": "用量提醒、任务中断，以及任务完成但结果不对，是不同情况。重发前检查任务状态、模式和 Usage 明细。当前积分帮助页说明，暂停的 Computer 任务可能会在额度恢复后继续；新任务则可能在用量耗尽时被阻止。页面还单独说明，任务已完成但结果不满意，不会自动退款。不要假设看起来失败的任务可以免费重跑。\n\n如果界面说没有额度，但 Usage 页面仍显示余额，刷新后再看具体余额类型。当前支持说明另列了 Enterprise 情况：组织共享积分池可能不同于个人额度或管理员设置的上限。消费者账号可记录任务链接、错误提示、模式标签和可见余额，再从 Help > Contact Support 联系支持。不要通过非官方接口或浏览器开发者工具检查私人账号限额。\n\n较早的社区帖子可能用“Comet Pro search limit”等旧名称描述其他模式。当前官方资料把 Pro Search 限制与 Computer 积分分开，也把 Comet Assistant 的 Search 与 Work 分开。Reddit 可以说明用户为何在问计数器，但不能证明你的账号限额或重置日期。应以 Usage 页面和最新帮助说明为准。"
        }
      ],
      "faq": [
        {
          "question": "Comet Assistant 的 Search 模式会用 Computer 积分吗？",
          "answer": "Perplexity 当前积分页说 Search 模式不使用积分。Work 模式会运行 Computer，使用包含用量或积分。"
        },
        {
          "question": "每个 Perplexity Pro 账号都有每周 Computer 用量吗？",
          "answer": "没有。功能正在逐步开放。已开放的账号应在 Usage 页面看到“Included in Pro”；帮助页还把促销或非付费 Pro、Max 和 Enterprise 账号排除在这项包含用量之外。"
        },
        {
          "question": "每周包含用量何时重置？",
          "answer": "符合条件的付费 Consumer Pro 账号从首次使用包含用量时开始计算一周，而非从账单日开始。Usage 页面会显示下次重置日期。"
        },
        {
          "question": "最近没用 Comet，为什么余额变少了？",
          "answer": "检查 Bonus 过期时间和不同积分类别。Bonus 会在注明日期过期，每月 Plan 积分按账单周期刷新。余额下降本身不能证明有任务运行。"
        },
        {
          "question": "Computer 任务中途能切换为 Search 吗？",
          "answer": "不能。当前帮助页说 Computer 任务不能在会话中切到 Search。返回 Home 后选择 Search 开启新会话，只复制必要上下文。"
        }
      ]
    }
  },
  "opera-neon-choose-ai-agent": {
    "en": {
      "title": "Opera Neon Chat, Do or Research: choose a mode when it suggests a switch",
      "description": "Choose between Chat, browser actions in Do and Research, and check what an accepted Opera Neon suggestion opens. Make is described only in Opera’s February 2026 mode-switch instructions.",
      "category": "AI browser guides",
      "content": "Opera Neon offers different ways to answer, act in the browser and research a question. Start with the result you need: Chat for a conversation or creation, Do for browser actions, and Research for gathering and analyzing sources. Neon may suggest a different agent after you send a prompt, but switching remains your choice. The suggestion does not silently launch the other agent or complete an action by itself.",
      "sections": [
        {
          "heading": "Choose by the result you need",
          "body": "Opera’s current FAQ describes Chat as a conversational agent that can also create items such as images, videos and web apps; Do focuses on browser actions; Research agents gather and analyze information. The exact task matters more than the label. “Explain this paragraph” fits Chat. “Open the second result and compare its specifications with this tab” may fit Do. “Collect sources and write a brief overview” points to Research. Opera’s February 2, 2026 Intelligent Mode post also documented Make as a separate destination for a switch suggestion, but Make is not listed in the current FAQ; treat that as dated behavior and follow the options actually shown in your version.\n\n| Your desired result | Start with | What to check afterward |\n| --- | --- | --- |\n| Answer, explanation or creation such as an image or web app | Neon Chat | Whether it used the page context you intended |\n| Navigate a site or act in the open browser | Neon Do | The current page, steps and any requested approval |\n| Fast research overview | One-Minute Research | Sources and the scope of its summary |\n| Longer, structured analysis | Deep Research | Source coverage and report boundaries |\n| Research using your browsing context | Local Research, when available | Which open tabs or signed-in sources it uses |\n| Make, if it appears in your version | Dated February 2026 instructions describe a separate Make interface | Confirm current availability and artifact destination |\n\nOpera’s FAQ says Neon Do can work with the page you are viewing, tab commands, scheduled tasks and connected Google tools. It describes One-Minute Research as a quick overview and Deep Research as detailed analysis with structured reports. Local Research uses browser context, which may include local search and sites where you are signed in. If you do not want a task to use a page or account, choose a mode and context that do not require that data."
        },
        {
          "heading": "Use the suggestion without losing the choice",
          "body": "Opera’s Intelligent Mode post, dated February 2, 2026, says you can type a request from the start page or Neon Chat. If Neon detects another agent may fit, it asks whether you want to switch. You can accept the suggestion or choose “No, keep chatting” and continue in Chat. You can also clarify the task in the existing chat instead of switching.\n\nThe destinations differ: accepting Do reopens the conversation in a new tab using Do; accepting Make takes you to the Make interface; accepting One-Minute Research creates a new chat for that agent and preserves the earlier chat. These details help explain why the conversation may appear to move after a suggestion. They do not mean the agent starts acting before you accept.\n\nBefore accepting a suggestion, read it as a proposed tool choice. Ask whether the output you requested is an answer, a browser action, a created artifact or a research brief. If the suggestion would use the browser and your request only needs an explanation, remain in Chat. If you want Do to interact with a website, check the target page and what information it can see before approving any sensitive action."
        },
        {
          "heading": "If Neon suggests a mode that does not fit",
          "body": "Keep the original chat when the task is still a question or the suggestion changes the requested output. Add a sentence explaining the result you need: “Compare the claims in these two open tabs and give me a sourced summary; do not change either page.” If you want an action, state the boundary: “Open the official settings page and show me the option, but stop before changing it.” This makes it clearer whether Chat, Research or Do fits the job while leaving the final choice with you.\n\nA prompt can also contain two different jobs. For example, “research the return policy and cancel my order” combines source gathering with an account action. Split it: first gather and cite the policy, then review the account and decide whether to authorize a cancellation. A mode suggestion cannot determine whether the action is appropriate for your account or whether a website’s requirements have been met.\n\nAn independent Opera Neon review published March 4, 2026 reported that switching modes sometimes lost conversation history in the reviewer’s tests. That report is historical and does not establish current behavior. Opera’s February instructions specify what happens for Do, Make and One-Minute Research; after switching, check whether the prior chat remains visible before continuing with context-sensitive work. Copy a short task summary into the new context if needed, rather than assuming every mode shares all conversation state."
        },
        {
          "heading": "Verify what happened after a switch",
          "body": "After you accept a suggestion, confirm that Neon opened the expected interface. If it suggested Do, check that the new tab is the right conversation and the target page is correct before allowing an action. If Make appears in your version, confirm its artifact type and destination; Opera’s current FAQ does not document it. If it opened One-Minute Research, check that the new research chat contains your full question and that the old chat remains available.\n\nNeon’s current FAQ describes multiple browser-context capabilities, including page access and actions when allowed. That is a reason to review context, not to assume every mode sees the same tabs. When the prompt mentions a local page, account, or file, check the visible task context. If the agent has selected the wrong page or source, stop and reframe the request before continuing. For a high-impact action, keep the final confirmation in your hands.\n\nIndependent coverage can help explain the mode differences but may predate the suggestion workflow. A Digital Trends hands-on review from October 2025 described confusion finding the Do menu and reported a wrong booking location and time in that early-access test. Opera later added Intelligent Mode suggestions in February 2026. Treat the review as a dated example of why mode and outcome checks matter, not as a current test of the latest release."
        },
        {
          "heading": "Use Research and Do for different browser jobs",
          "body": "Research agents gather and synthesize information; Do navigates and acts in the browser. If the goal is to compare current public sources, Research may be a suitable starting point, but verify its source links and dates before relying on the brief. If the task depends on a page already open or a site interaction, Do may fit, but check which page it uses and stop before any account change you have not approved.\n\nFor an overview, One-Minute Research is designed for a quick research-style answer; it is not a guarantee that a complex question can be settled in a minute. Deep Research is described as the more detailed, structured option. Match the scope to the task: a few factual questions may need Chat, a fast first scan may fit One-Minute Research, and a multi-source analysis may warrant Deep Research. Use the output as a starting point and verify the sources independently.\n\nDo not use Neon mode labels as a quality score. A suggestion means Opera’s system proposes another agent based on the prompt. It does not establish that the agent will be faster, more accurate, or able to complete a particular website action. Use the mode that matches the work, confirm the destination after switching, and check the resulting page or artifact."
        }
      ],
      "faq": [
        {
          "question": "Does Opera Neon automatically start Do when it suggests it?",
          "answer": "No. Opera’s Intelligent Mode instructions say Neon asks whether you want to switch. You can accept the suggestion or keep chatting."
        },
        {
          "question": "What happens to the conversation if I accept a suggestion?",
          "answer": "Opera’s February 2026 instructions say Do reopens the conversation in a new tab, Make opens its interface, and One-Minute Research creates a new chat while preserving the earlier chat. The current FAQ does not list Make, so confirm which choices are available in your version."
        },
        {
          "question": "Which agent should I use to research a question?",
          "answer": "Use Chat for a direct answer or supported creation, One-Minute Research for a quick overview, or Deep Research for more structured analysis. Check sources and dates in the output."
        },
        {
          "question": "Does Local Research use my browser context?",
          "answer": "Opera’s FAQ says Local Research can use browser context, including open tabs and sources where you are signed in. Review the selected context before relying on it."
        }
      ]
    },
    "zh-cn": {
      "title": "Opera Neon 的 Chat、Do 和 Research：收到切换建议时怎么选",
      "description": "按任务在 Chat、Do 浏览器操作和 Research 之间选择，并核对接受 Opera Neon 建议后会打开什么界面。Make 仅见于 Opera 2026 年 2 月的切换说明。",
      "category": "AI 浏览器指南",
      "content": "Opera Neon 提供对话、浏览器操作和研究等不同方式。先确定需要的结果：对话或创作可用 Chat，网页操作可用 Do，搜集和分析来源可用 Research。输入提示后，Neon 可能建议切换到另一个 Agent，但是否切换由你决定。建议本身不会悄悄启动另一个 Agent，也不会自动完成网页操作。",
      "sections": [
        {
          "heading": "按想要的结果选择",
          "body": "Opera 当前 FAQ 将 Chat 描述为对话 Agent，也能生成图片、视频和网页应用等内容；Do 侧重浏览器操作；Research Agent 用来收集和分析信息。具体任务比名称更重要。“解释这段文字”适合 Chat；“打开第二个搜索结果并与当前标签比较参数”可能适合 Do；“收集来源并写一份概览”适合 Research。Opera 在 2026 年 2 月 2 日的 Intelligent Mode 说明中还把 Make 作为独立切换目标，但当前 FAQ 已未列出 Make；应把它视为有日期的说明，并以你当前版本显示的选项为准。\n\n| 想得到的结果 | 可以先用 | 完成后检查什么 |\n| --- | --- | --- |\n| 回答、解释或生成图片、网页应用等 | Neon Chat | 是否读取了你希望提供的页面上下文 |\n| 浏览网站或操作当前网页 | Neon Do | 当前页面、操作步骤和待批准事项 |\n| 快速研究概览 | One-Minute Research | 来源和摘要覆盖范围 |\n| 较长、结构化的分析 | Deep Research | 来源覆盖情况和报告范围 |\n| 使用浏览上下文开展研究 | Local Research（若可用） | 它会读取哪些标签或已登录来源 |\n| Make（若当前版本仍显示） | 2026 年 2 月的切换说明记录了单独的 Make 界面 | 核对当前是否可用及作品生成位置 |\n\nOpera FAQ 说 Neon Do 可以处理当前网页、标签命令、定时任务和已连接的 Google 工具。该 FAQ 把 One-Minute Research 说明为快速概览，把 Deep Research 说明为详细分析和结构化报告。Local Research 使用浏览器上下文，可能包含本地搜索和你已登录的网站。如果任务不需要某个页面或账号，不要把该数据交给需要这些上下文的模式。"
        },
        {
          "heading": "使用建议，但保留自己的选择",
          "body": "Opera 在 2026 年 2 月 2 日发布的 Intelligent Mode 说明中说，可以从起始页或 Neon Chat 输入请求。如果 Neon 认为另一个 Agent 更合适，会询问是否切换。你可以接受建议，也可以选“No, keep chatting”留在 Chat 中继续。你还可以在原对话里补充说明，而不切换模式。\n\n切换后打开的位置不同：接受 Do 会在新标签页中用 Do 重新打开该对话；接受 Make 会转到 Make 界面；选择 One-Minute Research 会新建该 Agent 的聊天，同时保留先前对话。这可以解释为什么选择建议后界面看起来变了，但不代表 Agent 在你接受前已经开始操作。\n\n把建议当成一个待选择的工具，而非必须执行的命令。先确定你需要的是答案、网页动作、创作产物还是研究简报。若建议使用浏览器，而你的请求只需要解释，就留在 Chat。如果你希望 Do 操作网页，批准敏感动作前要核对目标页面和可读取的信息范围。"
        },
        {
          "heading": "建议的模式不合适时怎么做",
          "body": "任务仍然是提问，或建议把结果类型改掉时，可以留在原聊天里。补充一句说明需要的结果，例如：“比较这两个已打开标签的说法并写出有来源的摘要，不要修改页面。”如果需要网页动作，则说明边界：“打开官方设置页面并指出该选项，先不要修改。”这样能帮助辨别 Chat、Research 或 Do 哪个更符合任务，同时仍由你决定是否切换。\n\n一个提示也可能混合两种工作。比如“研究退货规则并取消订单”同时包含信息搜集和账号操作。可以拆开处理：先收集并引用规则，再查看账号，之后由你决定是否授权取消。模式建议无法判断该账号是否应该执行操作，也无法证明网站条件都已满足。\n\n一篇 2026 年 3 月 4 日的独立 Neon 评测说，作者测试时切换模式有时会丢失对话历史。这是当时的用户测试，不能证明当前版本仍有相同问题。Opera 2 月的说明写出了 Do、Make 和 One-Minute Research 的切换结果；切换后仍应检查原对话是否可见，再继续依赖上下文。若新界面缺少必要信息，把短摘要复制过去，不要假设所有 Agent 会共享完整对话状态。"
        },
        {
          "heading": "切换后确认打开的页面和结果",
          "body": "接受建议后，检查 Neon 是否打开了预期界面。若建议 Do，确认新标签里是正确对话，目标网页也正确，再允许它执行动作。若当前版本出现 Make，核对作品类型和生成位置；Opera 当前 FAQ 未列出此模式。若转到 One-Minute Research，检查新对话是否带上完整问题，以及之前的聊天是否仍然保留。\n\nNeon 当前 FAQ 介绍了多种浏览器上下文能力，包括读取页面，以及在获准时操作网页。这意味着应该检查上下文，而不是假定所有 Agent 能看到同一组标签。提示中若提到本地网页、账号或文件，先看界面显示的任务上下文。如果 Agent 选错了页面或来源，先停止并重新说明，再继续。涉及重要操作时，最终确认应由你自己完成。\n\n独立媒体能帮助理解模式差别，但可能早于建议流程。Digital Trends 在 2025 年 10 月的一篇早期体验中提到，作者一开始没找到 Do 菜单，并报告一次预约选错了地点和时间。Opera 于 2026 年 2 月增加了 Intelligent Mode 建议。该评测只能说明早期界面中存在过让人困惑的体验，不能作为当前版本测试；现在的控件和建议流程应以最新产品资料为准。"
        },
        {
          "heading": "Research 和 Do 适合不同的浏览器任务",
          "body": "Research Agent 用于搜集和整理信息；Do 用于在浏览器中导航和操作。如果目标是比较当前公开来源，Research 可以作为起点，但要检查报告里的来源链接和日期。若任务依赖已打开的页面或网页交互，Do 可能更合适；先检查它会使用哪一页，并在未经批准前停止账号变更。\n\nOne-Minute Research 面向快速概览，但这不保证复杂问题能在一分钟内解决。Deep Research 被说明为较详细、结构更完整的选项。按工作范围选择：几个事实问题可以用 Chat；先快速扫描可用 One-Minute Research；需要综合多个来源时可考虑 Deep Research。研究输出只是起点，重要来源应自行核对。\n\n不要把 Neon 模式名称当成质量评分。收到建议只说明 Opera 系统根据提示推荐另一个 Agent，不能证明它会更快、更准确或一定能完成特定网站操作。选择符合工作目的的模式，切换后确认目标界面，再检查最终页面或作品。"
        }
      ],
      "faq": [
        {
          "question": "Opera Neon 会在建议后自动启动 Do 吗？",
          "answer": "不会。Opera Intelligent Mode 说明中写明，Neon 会询问是否切换。你可以接受，也可以留在 Chat 继续对话。"
        },
        {
          "question": "接受建议后，对话会发生什么变化？",
          "answer": "Opera 在 2026 年 2 月的说明中称，Do 会在新标签中重新打开对话，Make 会打开其界面，One-Minute Research 会新建聊天并保留先前对话。当前 FAQ 未列出 Make，因此要先确认你的版本实际提供哪些选项。"
        },
        {
          "question": "研究问题应该用哪个 Agent？",
          "answer": "直接回答或生成支持的内容可用 Chat；快速概览可用 One-Minute Research；较复杂的多来源问题可考虑 Deep Research。检查输出中的来源和日期。"
        },
        {
          "question": "Local Research 会使用浏览上下文吗？",
          "answer": "Opera FAQ 说 Local Research 可以使用浏览上下文，包括打开的标签和已登录来源。依赖结果前先检查使用了哪些上下文。"
        }
      ]
    }
  }
};

const related: Record<string, string[]> = {
  "gemini-chrome-auto-browse-no-action": ["gemini-auto-browse-local-vs-remote", "browser-agent-form-submission", "browser-agent-diagnose-blocked-clicks"],
  "gemini-chrome-skills-create-manage": ["dia-skills-create-edit-reuse", "comet-query-shortcuts", "ai-browser-research-source-verification"],
  "comet-control-browser-missing": ["comet-extension-compatibility", "comet-query-shortcuts", "comet-vs-gemini-in-chrome"],
  "perplexity-comet-usage-limits": ["comet-control-browser-missing", "comet-query-shortcuts", "comet-assistant-history-data-controls"],
  "opera-neon-choose-ai-agent": ["opera-ai-page-content-permission", "opera-browser-connector-chatgpt-permissions", "comet-vs-dia"]
};

const slugs = Object.keys(copies);
export const aiCycleGuides08: EditorialGuide[] = slugs.map(slug => ({
  ...copies[slug]["zh-cn"], slug, date: "2026-11-08", sourcePath: `src/data/ai-cycle-2026-11-08.ts#${slug}`,
  availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
export const aiCycleTranslations08 = copies;

