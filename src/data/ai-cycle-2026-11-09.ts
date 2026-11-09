import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources: Record<string, Array<{ title: string; url: string }>> = {
  "edge-copilot-shopping-migration": [
    { title: "Microsoft Support: Changes to Shopping in Edge", url: "https://support.microsoft.com/en-us/edge/changes-to-shopping-in-edge" },
    { title: "Microsoft Support: Shopping with Microsoft Copilot", url: "https://support.microsoft.com/en-us/edge/copilot/shopping-with-microsoft-copilot" },
    { title: "Microsoft Edge: Shopping tools", url: "https://explore.microsoft.com/en-us/edge/features/shopping" },
    { title: "Microsoft Edge Blog: Shop smarter with Copilot in Edge", url: "https://blogs.windows.com/msedgedev/2025/11/25/shop-smarter-with-copilot-in-edge-this-holiday-season/" },
    { title: "Reddit: Price tracking history is gone", url: "https://www.reddit.com/r/MicrosoftEdge/comments/1us6sw6/price_tracking_history_is_gone/" },
    { title: "iTechGuides: Edge feature changes and shopping migration", url: "https://www.itechguides.com/microsoft-is-retiring-and-changing-features-in-edge-what-users-need-to-know/" }
  ],
  "edge-copilot-sidebar-migration-message": [
    { title: "Microsoft Support: Copilot app content troubleshooting", url: "https://support.microsoft.com/en-us/microsoft-365-copilot/troubleshoot-content-copilot-app" },
    { title: "Windows Central: Copilot migration can leave Edge Sidebar users without the assistant", url: "https://www.windowscentral.com/artificial-intelligence/microsoft-copilot/microsofts-copilot-migration-can-leave-edge-sidebar-users-without-the-ai-assistant-for-days" },
    { title: "Microsoft Q&A: Copilot not working during account and chat migration", url: "https://learn.microsoft.com/en-us/answers/questions/6062015/co-pilot-not-working" },
    { title: "Microsoft Support Articles: Copilot icon missing from Edge sidebar", url: "https://github.com/MicrosoftDocs/SupportArticles-docs/blob/main/support/microsoft-edge/experience/copilot-icon-missing-sidebar.md" },
    { title: "Microsoft Support Articles: Copilot chat loading issues", url: "https://github.com/MicrosoftDocs/SupportArticles-docs/blob/main/support/microsoft-edge/experience/copilot-chat-loading-issues.md" },
    { title: "Reddit: Seen this Copilot migration message?", url: "https://www.reddit.com/r/edge/comments/1xgpa9n/seen_this_message_your_copilot_is_migrating_to/" },
    { title: "Microsoft Support: Browse with Copilot", url: "https://support.microsoft.com/en-us/edge/copilot/browse-with-copilot" }
  ],
  "gemini-chrome-shared-tabs": [
    { title: "Google Gemini Help: Use Gemini in Chrome", url: "https://support.google.com/gemini/answer/16283624?hl=en" },
    { title: "Google Gemini Apps Privacy Hub", url: "https://support.google.com/gemini/answer/13594961?hl=en" },
    { title: "Google Gemini Japan: Introducing Gemini in Chrome", url: "https://note.com/google_gemini/n/ne840249aec6a" },
    { title: "Reddit: Gemini in Chrome says it cannot see the current tab", url: "https://www.reddit.com/r/Chatbots/comments/1tlw7h3/gemini-in-chrome-insisting-it-cannot-do-something-until-i-send-a-link-proving-that-it-can/" },
    { title: "Google Chrome: Gemini in Chrome feature overview", url: "https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/" }
  ],
  "claude-chrome-shortcuts-schedule": [
    { title: "Anthropic Help: Get started with Claude in Chrome", url: "https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome" },
    { title: "Anthropic Academy: Simplify browsing with Claude in Chrome", url: "https://academy.claude.com/tutorials/simplify-your-browsing-experience-with-claude-for-chrome" },
    { title: "Claude Code Docs: Use Claude Code with Chrome", url: "https://code.claude.com/docs/en/chrome" },
    { title: "Claude Help: Claude in Chrome troubleshooting", url: "https://support.claude.com/en/articles/12902405-claude-in-chrome-troubleshooting" },
    { title: "Claude Help: Schedule recurring tasks in Cowork", url: "https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork" },
    { title: "Technically Curious: AI browsing and saved/scheduled tasks", url: "https://technicallycurious.substack.com/p/ai-browsing-glimmers-of-magic-and" },
    { title: "Claude AI Trainer: How to use Claude in Chrome", url: "https://claudeaitrainer.com/blog/how-to-use-claude-in-chrome/" }
  ],
  "edge-copilot-journeys-controls": [
    { title: "Microsoft Support: Copilot Journeys in Edge", url: "https://support.microsoft.com/en-gb/edge/copilot/copilot-journeys" },
    { title: "Microsoft Edge Blog: Edge updates across desktop and mobile", url: "https://blogs.windows.com/msedgedev/2026/05/13/new-updates-to-edge-across-desktop-and-mobile/" },
    { title: "PCWorld: Copilot Journeys and Edge history", url: "https://www.pcworld.com/article/3139261/copilot-is-replacing-edges-browser-history-with-ai-slop.html" },
    { title: "The Windows Club: Turn Copilot Journeys on or off", url: "https://www.thewindowsclub.com/HOW-TO-TURN-ON-OR-OFF-COPILOT-JOURNEYS-IN-MICROSOFT-EDGE" },
    { title: "WiseCleaner: Turn off Copilot Journeys", url: "https://www.wisecleaner.com/think-tank/865-How-to-Turn-off-Copilot-Journeys-in-Microsoft-Edge.html" },
    { title: "Microsoft Edge: Copilot features", url: "https://explore.microsoft.com/en-us/edge/copilot" }
  ]
};

const related: Record<string, string[]> = {
  "edge-copilot-shopping-migration": ["ai-browser-compare-products-across-sites", "browser-agent-shopping-cart-verification", "gemini-in-chrome-vs-copilot-in-edge"],
  "edge-copilot-sidebar-migration-message": ["edge-copilot-page-context-enterprise-dlp", "gemini-in-chrome-vs-copilot-in-edge", "ai-browser-tab-access-permissions"],
  "gemini-chrome-shared-tabs": ["ai-browser-tab-access-permissions", "ai-browser-youtube-summary", "ai-browser-research-source-verification"],
  "claude-chrome-shortcuts-schedule": ["comet-query-shortcuts", "gemini-chrome-skills-create-manage", "dia-skills-create-edit-reuse"],
  "edge-copilot-journeys-controls": ["ai-browser-organize-tabs-by-task", "edge-copilot-page-context-enterprise-dlp", "comet-assistant-history-data-controls"]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "edge-copilot-shopping-migration": {
    "en": {
      "title": "Where Edge Shopping Features Moved: Price History, Tracking, and Copilot",
      "description": "Find Edge price history, tracking, comparison, and cashback after the standalone Shopping icon changes, and tell rollout gaps from settings issues.",
      "category": "AI browser guides",
      "content": "If the blue Shopping tag has disappeared from an Edge product page, Microsoft says the feature is moving into the Copilot sidebar. The new entry point is not guaranteed to show every tool to every account yet: Microsoft describes a gradual regional rollout, and some alerts are still in development. This guide maps the old tools to the documented Copilot route and gives you a short check before you assume your price history or alerts were deleted.",
      "sections": [
        {
          "heading": "What is moving, and what is changing",
          "body": "Microsoft says the standalone Shopping tools are being discontinued as Edge moves price comparison, price history, price tracking, cashback, reviews, and retailer offers into Copilot. The former blue shopping-tag icon and checkout flyouts are being replaced by one sidebar entry point. That is a product-navigation change; it does not mean every old feature is live for every person on the same day.\n\nThe current support page says Product Insights are already live in Copilot for supported pages, including price-history graphs, price tracking, reviews, and other retailers’ buying options. It separately says alerts such as a price drop, lowest price, or cashback eligibility remain in development and may not appear for everyone. Keep those two states separate when diagnosing a missing feature.\n\nThe announcement is a rollout notice, not an account-specific migration receipt. It does not say that an existing alert is guaranteed to transfer unchanged or that every retailer page is supported. Treat your current Edge screen and account as the evidence for what is available to you."
        },
        {
          "heading": "Open the new entry point on a product page",
          "body": "1. Update Edge, then sign in with the Microsoft account you use for personalized shopping features.\n2. Open a supported retailer product page.\n3. Open the Copilot icon in the Edge sidebar. Look for shopping insights in that pane: price history, tracking, comparisons, reviews, or retailer options.\n4. If the page shows the old Shopping tag, you may still be in a transition state. The official notice says the icon will be deprecated; it does not require the new UI to appear simultaneously for every account.\n\nMicrosoft's separate Copilot Shopping help describes opening Copilot and asking a shopping or product question, then selecting a product to inspect details such as available sizes, retailers, review summaries, return windows, and price history. That is another discovery route, but it is not proof that a particular Edge product page supports all of those details. Verify the product and seller directly before using a displayed price or review to decide."
        },
        {
          "heading": "Check settings before troubleshooting availability",
          "body": "If the Copilot pane has no shopping content, check these items in order:\n\n| Check | What to do | What the result means |\n| --- | --- | --- |\n| Browser version | Install the current Edge update and restart | An old build can miss the current interface |\n| Account | Sign in with a Microsoft account | Microsoft lists sign-in as a requirement for personalized shopping |\n| Shopping setting | Open Settings > Privacy, search, and services > Search and connected experiences > Save time and money with Shopping in Microsoft Edge | A disabled setting can prevent shopping features |\n| Page support | Try a product page from a retailer that the feature recognizes | A generic page or unsupported listing may not show insights |\n| Region and rollout | Compare the current feature notice with the account's region | Microsoft says US rollout is broadening and other markets follow later |\n\nDo not use an old registry edit or browser flag as a fix for a staged Copilot feature. The current support page gives a settings path and says rollout varies by region; it does not document a universal hidden toggle that forces the feature on."
        },
        {
          "heading": "Separate price history from a price alert",
          "body": "A chart and an alert are different states. If a price-history graph is visible but no alert appears, the page may be showing a current Product Insight while proactive notifications have not reached your account. Microsoft explicitly marks notifications as still in development and says they may not appear for everyone yet.\n\nIf you previously tracked an item, open the product in Copilot and check whether tracking is offered there before recreating an alert. Recreating it could produce duplicate notifications if the old alert still exists. The support notice describes the new feature family but does not document a migration report or a way to inspect every legacy alert. If the old item is important, note its retailer, exact variant, and previous tracking status, then verify the new state on that product page.\n\nPrice histories can be variant-specific. Match the exact model, storage, size, color, or other option before comparing a graph. The Copilot panel is a shortcut to information; it does not confirm that two listings are the same product or that a displayed deal includes shipping, tax, or seller conditions."
        },
        {
          "heading": "Use a safe comparison before buying",
          "body": "For a purchase decision, copy the product name and exact variant from the retailer page, then compare that variant with any alternate seller or price history. Check currency, condition, seller identity, delivery, return period, and whether the amount includes tax and shipping. Reopen the seller page before checkout because a price card or alert can become stale.\n\nKeep the final purchase action on the retailer's site. Microsoft's description says the Copilot pane can surface product insights and buying options; it does not mean Copilot has completed a purchase or verified the checkout total. For a structured cross-seller comparison, see [our guide to matching the same product across sellers](/en/guides/ai-browser-compare-products-across-sites/). If an item is already in your basket, use [the cart verification checklist](/en/guides/browser-agent-shopping-cart-verification/) to confirm the line item before paying."
        },
        {
          "heading": "What to expect during the change",
          "body": "Microsoft’s current Edge Shopping feature page still describes the address-bar shopping tag, while its separate support notice says the standalone tool is being discontinued and directs users to Copilot. The pages are not fully aligned. Treat Copilot as the stated migration destination, and check which controls are present in your Edge version and region.\n\nThe support page says rollout is gradual by region, alerts are still in development, and the Shopping setting remains under Privacy, search, and services. If a feature is missing after those checks, send Microsoft feedback with the Edge version, account region, retailer URL, product variant, and the control you cannot find. Do not include account identifiers or order details in a public post."
        },
        {
          "heading": "Sources and limits",
          "body": "Primary product sources checked by BrowserHub on November 9, 2026: [Microsoft Support: Changes to Shopping in Edge](https://support.microsoft.com/en-us/edge/changes-to-shopping-in-edge); [Microsoft Support: Shopping with Microsoft Copilot](https://support.microsoft.com/en-us/edge/copilot/shopping-with-microsoft-copilot); [Microsoft Edge Blog: Shop smarter with Copilot in Edge](https://blogs.windows.com/msedgedev/2025/11/25/shop-smarter-with-copilot-in-edge-this-holiday-season/). The official Shopping pages describe different interface states; BrowserHub did not inspect a signed-in Edge account or test a purchase. The support notice says “starting in November” without a year; the separate dated Edge blog is November 25, 2025."
        }
      ],
      "faq": [
        {
          "question": "Did Edge remove price tracking?",
          "answer": "Microsoft says it is moving price tracking into Copilot in Edge. A particular account may not have the new feature yet because rollout is gradual."
        },
        {
          "question": "Where is price history now?",
          "answer": "Open Copilot in the Edge sidebar while viewing a supported product page. Microsoft says the pane can show price history and other Product Insights."
        },
        {
          "question": "Why do I see a chart but no price-drop alert?",
          "answer": "Microsoft says alerts are still in development and may not appear for all users."
        },
        {
          "question": "Does my old alert automatically transfer?",
          "answer": "The public notice does not provide an account-level migration status or guarantee transfer of each alert. Check the item in Copilot before creating another alert."
        },
        {
          "question": "Does the Copilot panel verify the purchase total?",
          "answer": "No. Recheck the exact variant, seller, shipping, tax, and return terms on the retailer's checkout page."
        }
      ]
    },
    "zh-cn": {
      "title": "Edge 购物功能迁到哪里了？查看价格历史、追踪和 Copilot 入口",
      "description": "Edge 地址栏购物图标变化后，按当前官方说明查找价格历史、价格追踪、比价和返现，并区分分阶段开放与设置问题。",
      "category": "AI 浏览器指南",
      "content": "如果 Edge 商品页上的蓝色购物标签不见了，Microsoft 说相关功能正迁入 Copilot 侧边栏。不过新入口不一定已经向每个账号开放全部功能：官方说明这是分地区逐步推出，部分提醒仍在开发中。本文按当前说明梳理旧功能的新入口，并给出简短排查步骤，避免把尚未开放误判成价格历史或提醒已被删除。",
      "sections": [
        {
          "heading": "哪些功能迁移，入口有什么变化",
          "body": "Microsoft 表示，Edge 将停止独立购物工具，把比价、价格历史、价格追踪、返现、评论和其他零售商的购买选项整合进 Copilot。过去的蓝色购物标签和结账时弹出的购物卡片，改由 Copilot 侧边栏作为主要入口。这是产品导航变化，不代表所有旧功能会在同一天向所有账号开放。\n\n当前支持页称，受支持商品页上的 Copilot Product Insights 已可显示价格历史图表、价格追踪、评论和其他零售商的购买选项。页面也单独说明，降价、最低价或返现提醒还在开发中，可能尚未对所有人开放。排查时要把这两种状态分开。\n\n公告说明了总体迁移方向，但不是你账号的迁移回执。它没有保证旧提醒会原样转移，也没有说每个零售商商品页都受支持。你当前 Edge 界面和账号可见内容，才是判断自己能否使用的依据。"
        },
        {
          "heading": "在商品页打开新的入口",
          "body": "1. 更新 Edge，并使用启用了个性化购物功能的 Microsoft 账号登录。\n2. 打开受支持的零售商商品页。\n3. 点击 Edge 侧边栏中的 Copilot 图标，在面板里查看价格历史、价格追踪、比价、评论或其他零售商选项。\n4. 如果页面仍显示旧购物标签，说明你可能还处于迁移过程。官方说旧图标将逐步弃用，没有要求所有账号同时切换到新界面。\n\nMicrosoft 的 Copilot Shopping 帮助还介绍了另一种找商品信息的方法：打开 Copilot，提出购物或商品问题，再选择商品查看尺寸、零售商、评论摘要、退货期和价格历史等详情。这是发现商品信息的另一条路径，不代表每个 Edge 商品页都能显示这些内容。作决定前，仍需直接核对商品型号和卖家页面。"
        },
        {
          "heading": "先核对设置和可用范围",
          "body": "如果 Copilot 面板没有购物信息，按顺序检查：\n\n| 检查项 | 操作 | 结果说明 |\n| --- | --- | --- |\n| 浏览器版本 | 更新 Edge 并重启 | 旧版本可能没有当前界面 |\n| 登录账号 | 使用 Microsoft 账号登录 | 官方将登录列为个性化购物功能的条件 |\n| 购物设置 | 打开“设置 > 隐私、搜索和服务 > 搜索和连接体验 > 使用 Microsoft Edge 购物节省时间和金钱” | 关闭后可能无法使用购物功能 |\n| 商品页支持 | 换到功能能识别的零售商商品页 | 普通网页或未识别的商品可能不会显示信息 |\n| 地区与开放进度 | 对照当前公告与账号所在地区 | Microsoft 说明美国先逐步开放，其他市场随后推出 |\n\n不要用旧注册表改动或实验性 flag 强行打开分阶段推出的 Copilot 功能。当前支持页给出的排查入口是设置，并明确说明不同地区的开放进度不同；没有提供适用于所有用户的隐藏开关。"
        },
        {
          "heading": "区分价格历史与降价提醒",
          "body": "价格图表和价格提醒不是同一功能状态。如果能看到价格历史，却没有降价通知，你可能已经看到当前可用的 Product Insights，但账号还没有收到提醒功能。Microsoft 明确写明，主动提醒仍在开发中，可能暂不可用。\n\n如果你以前追踪过某件商品，先在 Copilot 中打开该商品页，查看是否显示追踪入口，再决定要不要重设。旧提醒也许仍然存在，立即重建可能造成重复通知。公开支持页介绍了新的功能范围，但没有提供逐账号的迁移报告，也没有说明如何查询每一条旧提醒。对重要商品，记下零售商、准确型号和原追踪状态，再核对新页面。\n\n价格历史也可能对应具体规格。比价前要核对型号、存储、尺寸、颜色等选项。Copilot 面板提供信息入口，不会替你确认两个商品完全相同，也不保证标价已包含运费、税费或卖家条件。"
        },
        {
          "heading": "购买前做一次安全核对",
          "body": "作购买决定前，从零售商页面抄下商品名称和准确规格，再与其他卖家的对应型号或历史价格比较。核对币种、成色、卖家、配送、退货期，以及金额是否包含税费和运费。价格卡片或提醒可能已经过时，结账前应重新打开卖家页面。\n\n最后的购买步骤留在零售商网站完成。Microsoft 说明 Copilot 面板可以提供商品信息和购买选项，不代表 Copilot 已替你购买，也不代表它核实了结账总价。跨商家比较可参考[同款商品核对指南](/zh-cn/guides/ai-browser-compare-products-across-sites/)；已经加入购物车时，可用[购物车核验清单](/zh-cn/guides/browser-agent-shopping-cart-verification/)确认项目后再付款。"
        },
        {
          "heading": "迁移期间会看到什么",
          "body": "Microsoft 当前 Edge Shopping 功能页仍介绍地址栏购物标签；另一张支持公告则说独立工具将停止使用，并把用户引向 Copilot。两个官方页面没有完全同步。可以把 Copilot 视为公告所说的新入口，同时核对当前 Edge 版本和所在地区实际显示哪些控件。\n\n支持页说功能按地区逐步开放，提醒仍在开发，Shopping 设置仍位于“隐私、搜索和服务”下。完成这些核对后仍找不到某项功能，可向 Microsoft 反馈 Edge 版本、账号地区、零售商网址、商品规格和缺少的控件。公开发帖时不要写账号标识或订单细节。"
        },
        {
          "heading": "来源与范围",
          "body": "资料核对日期：2026 年 11 月 9 日。主要产品资料：[Microsoft Support: Changes to Shopping in Edge](https://support.microsoft.com/en-us/edge/changes-to-shopping-in-edge)；[Microsoft Support: Shopping with Microsoft Copilot](https://support.microsoft.com/en-us/edge/copilot/shopping-with-microsoft-copilot)；[Microsoft Edge Blog: Shop smarter with Copilot in Edge](https://blogs.windows.com/msedgedev/2025/11/25/shop-smarter-with-copilot-in-edge-this-holiday-season/)。官方 Shopping 页面描述的界面状态并不完全一致；BrowserHub 未登录 Edge 账号，也未测试购买流程。支持公告写“从 11 月开始”，没有年份；另一个注明日期的 Edge 博客发布于 2025 年 11 月 25 日。"
        }
      ],
      "faq": [
        {
          "question": "Edge 删除了价格追踪吗？",
          "answer": "Microsoft 说价格追踪正迁入 Edge Copilot。由于分阶段开放，你的账号可能暂时看不到新功能。"
        },
        {
          "question": "价格历史在哪里？",
          "answer": "在受支持商品页打开 Edge 侧边栏 Copilot。Microsoft 说明面板可以显示价格历史和其他商品信息。"
        },
        {
          "question": "为什么有图表却没有降价提醒？",
          "answer": "官方说提醒仍在开发，可能还未对所有用户开放。"
        },
        {
          "question": "旧提醒会自动转过去吗？",
          "answer": "公开公告没有提供账号级迁移状态，也没有保证每条提醒都会转移。先在 Copilot 商品页核对，再决定是否新建提醒。"
        },
        {
          "question": "Copilot 会核对最终成交价吗？",
          "answer": "不会。结账前应在零售商页面确认规格、卖家、运费、税费和退货条件。"
        }
      ]
    }
  },
  "edge-copilot-sidebar-migration-message": {
    "en": {
      "title": "Edge Copilot Says It Is Migrating: What to Check Before You Reset Anything",
      "description": "Handle the specific Edge sidebar message that Copilot is migrating, check the web experience, and separate it from a missing icon, policy block, or sign-in problem.",
      "category": "AI browser guides",
      "content": "An Edge sidebar message saying Copilot is migrating to a new experience describes a different problem from a missing Copilot button or a work-site DLP refusal. Recent users reported the message during Microsoft's account and chat transition. The safest first step is to use the Copilot web experience named in the message and check whether the account still opens there. This guide separates that temporary migration state from ordinary sidebar setup so you do not erase profile data or change policies based on the wrong diagnosis.",
      "sections": [
        {
          "heading": "Read the exact message before troubleshooting",
          "body": "The migration notice reported by users says Copilot is moving to a new experience, may take a few days, may require restarting Edge, and directs the user to copilot.com in the meantime. Windows Central documented the same text in October 2026 and noted that Microsoft had not published an Edge-specific explanation for the message. A November 5 Microsoft Q&A post describes a similar account-and-chat migration warning even after the user restarted Edge and the computer.\n\nThis is evidence about a particular message and dated reports. It does not establish that every missing Copilot icon is a migration, that a migration always finishes in a fixed number of days, or that restarting will repair it. Microsoft has separately described gradual changes to the Copilot experience. If your screen shows a different error, follow the matching route below."
        },
        {
          "heading": "Try the web experience named in the notice",
          "body": "1. Open a regular browser tab and go to the Copilot web address shown in the migration message.\n2. Sign in with the same Copilot account and the same original sign-in provider or method (Microsoft, Google, Apple, or another method shown for your account). Using the same Edge profile alone does not confirm the Copilot identity.\n3. Start a new conversation or open a recent one. Note whether the web experience works while the sidebar message remains.\n4. Save the message text and date for a support report. Do not repeatedly sign out, clear all browser data, or switch profiles just to force the transition.\n\nMicrosoft's Copilot troubleshooting page explains that account sign-in method can affect access and that migration may leave parts of the experience temporarily unavailable. Its advice is about Copilot account content and identity, not a guarantee that the Edge sidebar will return after one restart. If the web experience works, continue there while the sidebar is unavailable and avoid changing an account's sign-in method unless Microsoft specifically directs you to do so."
        },
        {
          "heading": "Tell migration apart from a missing sidebar icon",
          "body": "A missing icon has several ordinary causes. Microsoft's Edge support article lists the sidebar being disabled, Copilot turned off in sidebar settings, organization policy, an outdated Edge build, and region or account availability. Those checks apply when the icon is absent; they do not explain the distinct “migrating to the new experience” notice.\n\n| What you see | First diagnostic | Avoid assuming |\n| --- | --- | --- |\n| Explicit migration message in the Copilot pane | Try the web experience named by the notice with the same account | That a missing icon fix will end the migration |\n| Sidebar is gone or the Copilot icon is absent | Check Edge sidebar settings, app setting, update, account/region, and managed policy | That account history is being moved |\n| Copilot web asks you to sign in or shows a migration warning | Confirm the original sign-in method and account; follow Microsoft's current account-content guidance | That clearing Edge cookies is harmless to account recovery |\n| A work page is refused while Copilot otherwise works | Ask IT to review the site's DLP or context policy | That this is a migration outage |\n| Pane is blank or stuck loading | Use Microsoft's Edge sidebar loading guide | That the page itself is blocked by DLP |\n\nThe distinction matters because reinstalling Edge, resetting a profile, or changing a managed policy may not address a server-side account migration. Start with the least disruptive check that matches the screen."
        },
        {
          "heading": "Preserve chats and account access",
          "body": "Do not delete your Microsoft account, clear all browsing history, or remove the Edge profile to respond to a migration message. Browser history, Edge profile data, and Copilot conversation history are separate stores. A notice about chats moving does not mean the chats are held only in the local browser profile.\n\nMicrosoft's current Copilot content troubleshooting page describes the account transition and advises keeping the same sign-in method while content moves. Its published guidance does not promise that every conversation will appear at once, and a sidebar outage alone does not prove that conversation data was lost. Check the web account with the original sign-in method first; if the history is absent, use Microsoft's support route and provide the account type, sign-in method, notice text, date, and whether the web or sidebar path works.\n\nFor a managed work account, do not move personal and work accounts between profiles to test the issue. Ask the administrator whether the account or browser is subject to a rollout, policy, or retention rule. Do not send private chat transcripts or customer information in a public support forum.\n\nMicrosoft’s September 2026 guidance says to sign in to the updated Copilot experience by December 31, 2026 to preserve eligible content. Content not migrated by then will be permanently deleted. This account-content deadline is separate from the unknown time it may take for the Edge sidebar message to clear; Microsoft does not guarantee that every content type will migrate."
        },
        {
          "heading": "When an Edge setting or policy is the real issue",
          "body": "If there is no migration text and only the button is missing, Microsoft's sidebar support article suggests checking edge://settings/appearance/copilotAndSidebar, confirming the sidebar is on, and ensuring Copilot is enabled in the sidebar app settings. An unavailable settings page can indicate organization policy. The article also asks users to check Edge's update state and account or region eligibility.\n\nIf the pane opens but will not read a protected work page, that is a separate page-context or DLP path. The [work-profile diagnostic guide](/en/guides/edge-copilot-page-context-enterprise-dlp/) covers work-profile context policies, DLP, and supported page types. A migration message may temporarily prevent the pane from opening at all; it cannot be diagnosed by testing the page context switch.\n\nIf Copilot works in the sidebar on public pages but refuses one protected site, record the site category and exact refusal, then ask IT to review the applicable policy. If the pane is blank on every page, open the [Copilot chat loading guide](https://github.com/MicrosoftDocs/SupportArticles-docs/blob/main/support/microsoft-edge/experience/copilot-chat-loading-issues.md) for a blank pane or stuck response. Keeping those symptoms separate gives support enough information to investigate the actual layer."
        },
        {
          "heading": "Prepare a compact support report",
          "body": "If the notice remains after the steps it names, send support a short report with the exact message and date, Edge version, operating system, profile type, whether the browser is managed, whether copilot.com works with the original Copilot account and sign-in provider or method, whether a restart changed the message, and whether the issue affects only the sidebar or also the Copilot website.\n\nDo not include passwords, recovery codes, full chat transcripts, customer data, or private browser profile files. A screenshot can help if you remove account names, unrelated tabs, and message contents first.\n\nIf copilot.com works with the original sign-in method while the sidebar still shows the migration notice, include both results in the support report. This separates the account-content path from the Edge sidebar symptom without assuming a backend cause."
        },
        {
          "heading": "Sources and limits",
          "body": "Primary product sources checked by BrowserHub on November 9, 2026: [Microsoft Support: Copilot app content troubleshooting](https://support.microsoft.com/en-us/microsoft-365-copilot/troubleshoot-content-copilot-app); [Microsoft Support Articles: Copilot icon missing from Edge sidebar](https://github.com/MicrosoftDocs/SupportArticles-docs/blob/main/support/microsoft-edge/experience/copilot-icon-missing-sidebar.md); [Microsoft Support: Browse with Copilot](https://support.microsoft.com/en-us/edge/copilot/browse-with-copilot). BrowserHub did not inspect the affected account or reproduce the message. Microsoft’s September 2026 content-migration guidance sets the December 31 sign-in deadline."
        }
      ],
      "faq": [
        {
          "question": "Does restarting Edge complete the migration?",
          "answer": "The reported message may ask you to restart, but public reports show that a restart is not a guaranteed immediate fix. Try the named web experience and keep the message for support."
        },
        {
          "question": "Is every missing Copilot button caused by migration?",
          "answer": "No. Sidebar settings, browser version, region, account, and administrator policy can also affect the icon."
        },
        {
          "question": "Should I clear cookies or reset my profile?",
          "answer": "Not as a first response to a migration warning. Check the same account on the web first and follow Microsoft's current account guidance."
        },
        {
          "question": "Does this explain a DLP refusal on a work page?",
          "answer": "No. A page-level refusal while the pane works is a separate organization-policy diagnosis."
        },
        {
          "question": "Does BrowserHub know the migration's backend cause or completion time?",
          "answer": "No. Microsoft has not documented an Edge-specific cause or a universal completion deadline for this exact message in the sources checked."
        }
      ]
    },
    "zh-cn": {
      "title": "Edge Copilot 提示正在迁移怎么办？先核对再重置",
      "description": "针对 Edge 侧栏中的“Copilot 正在迁往新体验”提示，核对网页版账号，并区分图标缺失、组织策略和页面权限问题。",
      "category": "AI 浏览器指南",
      "content": "Edge 侧栏提示 Copilot 正在迁往新体验，与 Copilot 图标消失或工作网页被 DLP 拒绝不是同一种问题。近期有用户报告账号和聊天记录迁移时出现这条提示。先使用提示中给出的 Copilot 网页入口，并确认同一账号能否正常打开。本文把迁移状态和常见侧栏故障分开排查，避免误删配置文件或改动策略。",
      "sections": [
        {
          "heading": "先看清屏幕上的具体提示",
          "body": "用户报告的迁移提示称 Copilot 正在转到新体验，可能需要几天，也可能需要重启 Edge，并建议暂时使用 copilot.com。Windows Central 在 2026 年 10 月记录过同样的提示，并指出 Microsoft 当时没有针对 Edge 侧栏发布专门解释。11 月 5 日的 Microsoft Q&A 用户也报告账号与聊天记录迁移提示；该用户重启 Edge 和电脑后问题仍在。\n\n这些材料说明的是特定提示和带日期的用户报告，不能证明所有 Copilot 图标缺失都是迁移问题，也不能保证重启后一定恢复。Microsoft 也单独说明 Copilot 体验正在逐步变化。如果你的屏幕显示的是其他错误，按下面对应路径处理。"
        },
        {
          "heading": "先试提示中给出的网页版入口",
          "body": "1. 在普通浏览器标签页打开迁移提示中给出的 Copilot 网页地址。\n2. 使用原来的 Copilot 账号和原登录提供方或方式（Microsoft、Google、Apple，或账号页面显示的其他方式）。Edge 配置文件相同并不能证明 Copilot 身份一致。\n3. 尝试开始新对话或打开最近对话。记录网页版是否可用、侧栏是否仍显示迁移提示。\n4. 保存提示文字和出现时间以便联系客服。不要为了强行完成迁移反复退出登录、清空浏览数据或切换配置文件。\n\nMicrosoft 的 Copilot 内容排错页解释了登录方式可能影响访问，迁移过程中部分体验也可能暂时不可用。该页面介绍的是账号内容与身份路径，并未保证重启一次就能让 Edge 侧栏恢复。若网页版可用，可先在那里继续工作。除非 Microsoft 明确要求，否则不要自行更改账号登录方式。"
        },
        {
          "heading": "区分迁移提示和侧栏图标缺失",
          "body": "图标缺失有若干常见原因。Microsoft 的 Edge 支持文章列出：侧栏被关闭、Copilot 在侧栏设置中关闭、组织策略限制、Edge 版本过旧，以及地区或账号不可用。这些检查适用于图标不见的情况，不会解释明确的“正在迁移到新体验”提示。\n\n| 屏幕情况 | 先检查什么 | 不要直接推断 |\n| --- | --- | --- |\n| Copilot 面板内出现明确迁移提示 | 用相同账号试提示所说的网页版 | 图标修复步骤一定能结束迁移 |\n| 整个侧栏或 Copilot 图标消失 | 检查侧栏设置、Copilot 开关、更新、账号/地区和组织策略 | 账号聊天记录正在迁移 |\n| Copilot 网页要求登录或显示迁移提示 | 核对原登录方式和账号，按 Microsoft 当前账号说明处理 | 清除 Edge Cookie 不影响账号恢复 |\n| Copilot 可用，但拒绝读取工作网页 | 请 IT 检查站点 DLP 或上下文策略 | 这是迁移故障 |\n| 面板空白或一直加载 | 使用 Microsoft 的 Edge 侧栏加载排错指引 | 网页被 DLP 阻止 |\n\n区分这些情况很重要。重装 Edge、重置配置文件或改组织策略，未必能解决服务器端账号迁移。先做与屏幕提示对应、影响最小的检查。"
        },
        {
          "heading": "保留聊天记录和账号访问",
          "body": "不要因为迁移提示就删除 Microsoft 账号、清空所有浏览历史或移除 Edge 配置文件。浏览历史、Edge 配置文件数据和 Copilot 对话记录是不同的数据位置。关于聊天迁移的提示，不代表对话只保存在本地浏览器里。\n\nMicrosoft 当前的 Copilot 内容排错说明了账号迁移和登录方式的要求，并建议在内容迁移期间继续使用原登录方式。公开说明没有保证每段对话都会同时出现；侧栏暂时不可用本身也不能证明聊天记录丢失。先用原登录方式检查网页版。若历史记录缺失，通过 Microsoft 官方支持渠道反馈账号类型、登录方式、提示原文、出现时间，以及网页和侧栏分别能否工作。\n\n使用企业或学校账号时，不要为了测试在个人与工作配置文件间来回切账号。请管理员确认账号或浏览器是否受到迁移、策略或保留规则影响。不要在公开论坛贴出私密聊天内容或客户资料。\n\nMicrosoft 于 2026 年 9 月更新的说明指出，需在 2026 年 12 月 31 日前使用原登录方式登录新版 Copilot，才能保留符合条件的内容。届时仍未迁移的内容会被永久删除。这个账号内容期限与 Edge 侧栏提示何时消失是两回事；Microsoft 没有保证所有类型内容都会迁移。"
        },
        {
          "heading": "没有迁移提示时再检查设置和策略",
          "body": "如果没有迁移文字，只是找不到 Copilot 图标，Microsoft 侧栏支持文章建议查看 edge://settings/appearance/copilotAndSidebar，确认侧栏已打开，并在侧栏应用设置中启用 Copilot。如果设置页不可用，可能是组织策略控制；也应检查 Edge 更新和账号/地区可用性。\n\n如果面板可以打开，但读取工作页面时被拒绝，那是页面上下文或 DLP 路径。[工作账号排错指南](/zh-cn/guides/edge-copilot-page-context-enterprise-dlp/)介绍工作配置文件中的上下文策略、DLP 和支持的页面类型。迁移提示可能让面板暂时无法打开，不能靠测试页面上下文开关来判断。\n\n若 Copilot 能读取公开网页，却只拒绝某个受保护网站，记录站点类别和完整提示，交给 IT 检查相关策略。若所有网页都遇到空白面板，查看 [Copilot 聊天加载排错指南](https://github.com/MicrosoftDocs/SupportArticles-docs/blob/main/support/microsoft-edge/experience/copilot-chat-loading-issues.md)，处理空白面板或一直加载。保留症状边界，能让支持人员定位实际故障层。"
        },
        {
          "heading": "准备一份简短的支持报告",
          "body": "如果提示一直没有变化，可向支持人员提供：提示原文和出现日期/时间、Edge 版本、操作系统、配置文件类型、浏览器是否受组织管理、同一个 Microsoft 账号用原登录方式能否打开 copilot.com、重启后提示是否有变化，以及问题是否只影响侧栏。\n\n不要附密码、恢复代码、完整聊天记录、客户信息或浏览器配置文件。若截图有帮助，先隐藏账号名称、无关标签页和消息内容。\n\n如果使用原登录方式可以打开 copilot.com，但侧栏仍显示迁移提示，把两项结果都写进支持报告。这样能区分账号内容路径与 Edge 侧栏症状，但不能据此推断后台原因。"
        },
        {
          "heading": "来源与范围",
          "body": "资料核对日期：2026 年 11 月 9 日。主要产品资料：[Microsoft Support: Copilot app content troubleshooting](https://support.microsoft.com/en-us/microsoft-365-copilot/troubleshoot-content-copilot-app)；[Microsoft Support Articles: Copilot icon missing from Edge sidebar](https://github.com/MicrosoftDocs/SupportArticles-docs/blob/main/support/microsoft-edge/experience/copilot-icon-missing-sidebar.md)；[Microsoft Support: Browse with Copilot](https://support.microsoft.com/en-us/edge/copilot/browse-with-copilot)。BrowserHub 未检查受影响账号，也未复现该提示。 Microsoft 于 2026 年 9 月更新的内容迁移说明列出 12 月 31 日登录期限。"
        }
      ],
      "faq": [
        {
          "question": "重启 Edge 就能完成迁移吗？",
          "answer": "提示可能要求重启，但公开用户报告中有人重启后仍看到提示。请同时检查同账号的 Copilot 网页，并保存原提示。"
        },
        {
          "question": "Copilot 按钮不见，都是迁移问题吗？",
          "answer": "不是。侧栏设置、浏览器版本、地区、账号和管理员策略都可能影响图标。"
        },
        {
          "question": "应该清 Cookie 或重置配置文件吗？",
          "answer": "不应把它作为聊天/账号迁移问题的第一步。先用原登录方式检查网页版，再按 Microsoft 当前说明处理。"
        },
        {
          "question": "这能解释工作网页的 DLP 拒绝吗？",
          "answer": "不能。面板可用但拒绝某个页面，属于另一条组织策略排错路径。"
        },
        {
          "question": "BrowserHub 知道迁移的后台原因或完成时间吗？",
          "answer": "不知道。核对的资料没有为这条具体提示提供 Edge 专属原因或统一完成期限。"
        }
      ]
    }
  },
  "gemini-chrome-shared-tabs": {
    "en": {
      "title": "Gemini in Chrome Shared Tabs: Add, Check, and Remove Pages",
      "description": "Use the current-tab default, add or remove recent tabs, read the sharing indicator, and understand when a shared Google Doc may reach Workspace content.",
      "category": "AI browser guides",
      "content": "Gemini in Chrome uses the current page and other recent tabs you select; pages opened from the Gemini chat or an already shared tab may also be shared automatically. The current tab is shared by default in a new chat, so review which pages the interface marks as shared. This walkthrough shows where to add a tab, inspect and remove shared pages, and why a Google Workspace document can have a broader content path than the visible tab alone.",
      "sections": [
        {
          "heading": "Know what the shared-tab control does",
          "body": "Google's current help says Gemini in Chrome uses page content from the current tab by default. You can turn off the “Share current tab by default” preference, add other recent open tabs, and remove tabs from the shared list. The current page does not automatically mean the assistant has every browser tab; the control shows which pages you have shared for the chat.\n\nThe help page allows up to 10 additional recent open tabs across Chrome windows. That is in addition to the current tab, not a total limit of ten including the current page. Google also shows a tick on shared tabs and a glowing underline when Gemini is using a page. These cues help you inspect context, but they are not a transcript of every item the model considered.\n\nThis guide covers the desktop Chrome Gemini side panel. It does not describe Auto Browse, the Gemini Apps website, a Chrome extension, or an Edge Copilot panel. Those products have separate controls and account conditions."
        },
        {
          "heading": "Add the pages you want in the conversation",
          "body": "Open the intended page, select Ask Gemini in Chrome, then use Add tabs above the message box. Choose the recent open tabs that matter to the question. Pages you open from the Gemini chat or from an already shared tab may also be shared automatically, so review the list again after following a link. You can also type @ in the prompt and select an open tab from the list. A check mark indicates that the tab is shared.\n\nUse a small set of pages with clear roles: for example, one product page and one seller's return policy. Before you ask for a comparison, check that the tabs are the exact models or documents you meant to include. If the same site is open in several tabs, use the title and URL to identify the intended one. Do not assume a tab is included just because it is visible in another Chrome window.\n\nWhen Gemini uses a page, Google says Chrome shows a glowing underline on its tab. This cue can help you notice that a shared page is part of the current interaction. It does not validate Gemini's summary or prove that every line of a page was read. For factual research, open the cited source and verify the claim against the original page; see [our source-checking workflow](/en/guides/ai-browser-research-source-verification/)."
        },
        {
          "heading": "Inspect and remove shared tabs",
          "body": "Before sending a prompt, open Show shared tabs above the text box. Review the listed pages, then click Remove tab beside any page you no longer want to share. Google says the glowing underline disappears when a tab is no longer shared.\n\nRemoving a page is useful when you added the wrong result, switched from a public article to a private account page, or no longer need a comparison source. If you remove the current page, check that the visible list reflects the change before sending another question. A new chat has its own default behavior, so review the list again rather than assuming a choice in an earlier conversation carries over.\n\nTo avoid sharing the current page automatically in new chats, open Chrome Settings > AI innovations > Gemini in Chrome > Permissions, then turn off Share current tab by default. The current help page's interface wording may change with rollout; if a menu name differs, use the settings search for “Gemini in Chrome” and confirm the permission description before changing it."
        },
        {
          "heading": "Treat Google Docs as a special case",
          "body": "Google's help adds an important qualification for Workspace webpages such as docs.google.com: Gemini may directly access your Workspace account to respond about a shared Workspace page. That can let it refer to an entire Google Doc instead of only the portion visible in the tab. To use more personal content from Workspace, Google's instructions say to connect the Workspace app.\n\n“May” matters. A shared Docs tab does not guarantee that every file in the account is available, and the page does not say that Gemini receives all Workspace content by default. It describes a possible access route for the page you shared; broader personal content has a separate connected-app step. If the document contains confidential work, follow your organization's account and data rules before sharing it.\n\nFor a normal webpage, shared-tab permission means the page content is used to answer. For a Workspace page, check both the selected tab and the account connection that may provide document-level content. These are related but not identical checks. A visible tab list is useful for tab scope; it is not a complete record of which content a connected Workspace service can return."
        },
        {
          "heading": "Diagnose a missing or wrong page context",
          "body": "If Gemini answers as though it cannot see a page, first check the shared-tab list and the tab's indicator. Confirm you are in the desktop Chrome Gemini interface, signed into an eligible Chrome profile, and not relying on a different Gemini surface. Google's help says availability is rolling out and depends on supported regions, languages, account eligibility, and Chrome setup.\n\nIf the page is listed but the answer is still off, ask Gemini to name the page it is using, then verify the title and URL yourself. A tab may have a title that resembles another page. Do not paste private account content into the chat simply to compensate for a scope mismatch.\n\nIf the control itself is missing, check rollout eligibility and Chrome version before changing unrelated privacy settings."
        },
        {
          "heading": "A short pre-send checklist",
          "body": "Before asking a question that depends on several pages, check these points:\n\n1. The active browser is Chrome with Gemini in Chrome, not a different assistant surface.\n2. The current tab's default-sharing behavior is understood for this chat.\n3. Every comparison page you need appears in Show shared tabs or has a tick.\n4. The pages are the correct model, version, date, or account document.\n5. Unneeded or sensitive tabs have been removed.\n6. A Workspace document is being shared under the right account and organizational policy.\n7. You will verify factual claims against the source pages before acting on them.\n\nFor a one-page question, a single shared tab may be enough. For a multi-page comparison, use the smallest useful set and ask for a source-by-source table so you can see which statement comes from which page. Do not treat the sharing list as an accuracy guarantee."
        },
        {
          "heading": "Sources and limits",
          "body": "Primary product sources checked by BrowserHub on November 9, 2026: [Google Gemini Help: Use Gemini in Chrome](https://support.google.com/gemini/answer/16283624?hl=en); [Google Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en); [Google Chrome: Gemini in Chrome feature overview](https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/). BrowserHub did not test this in a signed-in account."
        }
      ],
      "faq": [
        {
          "question": "Is the current tab included in the limit of 10?",
          "answer": "Google says you can share up to 10 additional recent open tabs in addition to the current tab."
        },
        {
          "question": "How can I tell a tab is shared?",
          "answer": "It shows a tick in the Add tabs picker; when Gemini is using a page, Chrome shows a glowing underline. Show shared tabs lists pages you can remove."
        },
        {
          "question": "Does removing a tab delete my chat?",
          "answer": "The help page describes removing a page from shared context; it does not say this deletes the conversation or account history."
        },
        {
          "question": "Can Gemini read an entire Google Doc?",
          "answer": "Google says it may directly access the Workspace account for a shared Workspace page and can refer to an entire Doc. This is conditional; it does not promise access to every file."
        },
        {
          "question": "Does this control apply to Edge Copilot or Gemini Apps?",
          "answer": "No. Follow the settings for the product and browser you are actually using."
        }
      ]
    },
    "zh-cn": {
      "title": "选择 Gemini in Chrome 可读取的标签页：添加、检查和移除",
      "description": "了解当前标签默认共享、添加或移除其他页面、查看共享提示，以及共享 Google 文档时可能涉及的 Workspace 内容范围。",
      "category": "AI 浏览器指南",
      "content": "Gemini in Chrome 默认使用当前页面，也可使用你选择的其他近期标签；从 Gemini 对话或已共享标签中打开的页面也可能自动共享。新对话默认共享当前标签，因此要检查界面标记的页面。本文介绍如何添加标签、查看和移除共享页面，以及为什么 Google Workspace 文档可能涉及比可见标签页更广的内容路径。",
      "sections": [
        {
          "heading": "先了解共享标签控制项",
          "body": "Google 当前帮助说明，Gemini in Chrome 默认使用当前标签页内容。你可以关闭“默认共享当前标签页”设置，添加其他最近打开的标签，或从共享列表中移除标签。当前页默认共享，并不代表助手能读取整个浏览器；界面中的共享列表会显示你为本次对话提供的页面。\n\n帮助页允许在当前页之外，额外共享最多 10 个最近打开的标签页，范围可以跨 Chrome 窗口。也就是说，10 个是额外数量，不是连当前页一起计算的总上限。Google 还说明，共享标签会显示勾选标记；Gemini 正在使用页面时，Chrome 会在标签下方显示发光横线。这些提示有助于检查上下文，但不是模型读取内容的逐项记录。\n\n本文介绍桌面版 Chrome 的 Gemini 侧栏，不包括 Auto Browse、Gemini Apps 网站、Chrome 扩展或 Edge Copilot 面板。它们的控制项和账号条件各不相同。"
        },
        {
          "heading": "把需要的页面加入对话",
          "body": "打开目标页面，点击 Chrome 中的 Ask Gemini，再点击消息框上方的 Add tabs，选择与问题有关的最近标签。从 Gemini 对话或已共享标签中打开的页面也可能自动共享；跟随链接后请重新查看共享列表。你也可以在提示中输入 @，从列表中选择打开的标签页。出现勾选标记表示该页已共享。\n\n尽量用少量、用途明确的页面。例如比较商品时，加入一个商品页和一份退货政策即可。提问前确认标签页对应的型号或文档确实是你要用的版本。同一网站如果开了多个标签，可依据标题和 URL 找到目标页面。不要因为另一个 Chrome 窗口里能看到某页，就假定它已经加入对话。\n\nGoogle 说 Gemini 使用页面时，Chrome 会在对应标签下方显示发光横线。这个提示有助于发现共享页面正在参与当前交互，但不能验证摘要准确，也不能证明页面每一行都被读取。资料研究时打开原始来源核对事实，可参考[资料来源核验流程](/zh-cn/guides/ai-browser-research-source-verification/)。"
        },
        {
          "heading": "查看共享页并移除不需要的标签",
          "body": "发送提示前，点击文本框上方的 Show shared tabs。检查列表，对不再需要的页面点击 Remove tab。Google 说明，标签取消共享后，下方的发光横线会消失。\n\n如果误加了搜索结果、从公开文章切换到了私人账户页面，或比较已经结束，可以移除相关标签。移除当前页后，再看一次共享列表确认变化，然后再发送新问题。新对话会按当前设置处理默认共享，不要假定先前对话中的选择会自动延续。\n\n如果不想让新对话自动共享当前页，打开 Chrome“设置 > AI 创新 > Chrome 中的 Gemini > 权限”，关闭“默认共享当前标签页”。开放进度可能会改变菜单文字；如果名称不同，可在设置中搜索“Gemini in Chrome”，先确认权限说明再调整。"
        },
        {
          "heading": "Google Docs 要单独看一层",
          "body": "Google 帮助对 docs.google.com 等 Workspace 网页作了特别说明：Gemini 可能直接访问你的 Workspace 账号，回答你共享的 Workspace 页面问题。这样它可能引用整份 Google 文档，而不只是标签页当前可见的部分。要使用更多个人 Workspace 内容，Google 说明需连接 Workspace 应用。\n\n这里的“可能”不能省略。共享一个 Docs 标签不代表账号里的所有文件都可用；帮助页也没有说 Gemini 默认收到全部 Workspace 内容。它描述的是对你共享的 Workspace 页面可能采用的访问路径；更广泛的个人内容还需要单独连接应用。文档含有工作机密时，先遵循组织的账号和数据规则。\n\n普通网页的共享许可表示页面内容可用于回答。Workspace 页面还要核对所选标签，以及可能提供文档级内容的账号连接。这是两项相关但不同的检查。标签列表能说明标签范围，不是连接的 Workspace 服务所能返回内容的完整记录。"
        },
        {
          "heading": "页面上下文不对或找不到时怎么查",
          "body": "如果 Gemini 回答得像是看不到页面，先检查共享标签列表和标签指示。确认使用的是桌面 Chrome 中的 Gemini in Chrome、登录了符合条件的 Chrome 配置文件，而不是误用了另一个 Gemini 入口。Google 帮助说明该功能正在逐步开放，地区、语言、账号条件和 Chrome 设置都会影响可用性。\n\n若页面已在列表中，但回答仍不准确，可让 Gemini 说出它正在使用的页面，再由你核对标题和 URL。标签标题可能与其他页面相似。不要为了弥补上下文问题，把私人账号资料直接复制到聊天里。\n\n如果看不到相关控制项，先检查开放进度和 Chrome 版本，不要随意改动无关隐私设置。"
        },
        {
          "heading": "发送前快速核对",
          "body": "问题依赖多个网页时，按下面清单检查：\n\n1. 当前使用的是装有 Gemini in Chrome 的 Chrome，而不是其他助手入口。\n2. 已确认当前标签页在这次对话中的默认共享行为。\n3. Show shared tabs 列表或 Add tabs 勾选状态包含需要比较的页面。\n4. 页面对应的型号、版本、日期或账号文档都正确。\n5. 已移除不需要或敏感的标签。\n6. Workspace 文档使用了正确账号，并符合组织规则。\n7. 采取行动前，会对照原始网页核验事实。\n\n只问一页内容时，一个共享标签可能就够了。需要比较多个页面时，选最少但够用的页面，并让助手按来源逐项整理，这样你能看出每条信息来自哪里。共享列表本身不保证答案准确。"
        },
        {
          "heading": "来源与范围",
          "body": "资料核对日期：2026 年 11 月 9 日。主要产品资料：[Google Gemini Help: Use Gemini in Chrome](https://support.google.com/gemini/answer/16283624?hl=en)；[Google Gemini Apps Privacy Hub](https://support.google.com/gemini/answer/13594961?hl=en)；[Google Chrome: Gemini in Chrome feature overview](https://blog.google/products-and-platforms/products/chrome/gemini-3-auto-browse/)。BrowserHub 未登录账号实测。"
        }
      ],
      "faq": [
        {
          "question": "当前标签页算在 10 个上限里吗？",
          "answer": "Google 说明可在当前页之外，额外共享最多 10 个最近打开的标签。"
        },
        {
          "question": "怎么判断标签已经共享？",
          "answer": "Add tabs 列表中会有勾选标记；Gemini 使用页面时，标签下方会出现发光横线。Show shared tabs 可以查看并移除页面。"
        },
        {
          "question": "移除标签会删除聊天记录吗？",
          "answer": "帮助页说明的是从共享上下文移除页面，没有说这会删除对话或账号历史。"
        },
        {
          "question": "Gemini 能读取整份 Google 文档吗？",
          "answer": "Google 说它可能直接访问 Workspace 账号，以便回答共享的 Workspace 页面问题并引用整份文档。这是有条件的，不保证每个文件都能访问。"
        },
        {
          "question": "这个控制项适用于 Edge Copilot 或 Gemini Apps 吗？",
          "answer": "不适用。应按实际使用的产品和浏览器检查设置。"
        }
      ]
    }
  },
  "claude-chrome-shortcuts-schedule": {
    "en": {
      "title": "Save and Schedule a Claude in Chrome Shortcut Safely",
      "description": "Choose between a reusable prompt and a recorded workflow, distinguish classic from Cowork side panels, and check the schedule before relying on a run.",
      "category": "AI browser guides",
      "content": "Claude in Chrome can save a working browser instruction as a shortcut and schedule that shortcut to run again. The control is easy to misplace because Anthropic now documents both a classic extension panel and a Cowork panel, while recording a workflow is available only in the classic panel. This guide maps the repeat-task options, the limits the current help actually states, and a review checklist for a task that runs on a schedule.",
      "sections": [
        {
          "heading": "Pick the repeat method that matches the task",
          "body": "Anthropic documents three ways to make browser work reusable: save a good prompt as a shortcut, record a workflow in the classic side panel, or convert an existing multi-chat workflow into a shortcut. These are not interchangeable. A shortcut can reuse instructions; recording captures a demonstrated sequence; a scheduled shortcut repeats the chosen task at a selected time.\n\nStart with a task that has stable inputs and a clear stop condition, such as checking a public page for a changed status and returning the page URL plus the visible value. Avoid scheduling a task that submits forms, purchases items, sends messages, changes account permissions, or accepts terms without a person reviewing the final action. A repeatable prompt does not make a website's state stable or authorize every future action.\n\nClaude in Chrome is a Chrome extension workflow. Anthropic's current help also describes a Cowork side panel and a classic side panel. Recording is documented for classic only, so first identify which panel you are using before looking for a record control."
        },
        {
          "heading": "Save a prompt as a shortcut",
          "body": "For a prompt that already works, use the save-as-shortcut control on that prompt. The current Help Center says saved shortcuts can be invoked by typing / in the chat and selecting the shortcut, then edited or deleted in extension settings.\n\nGive a shortcut a name tied to the result, not an ambiguous label such as “daily.” Keep the instruction explicit about the start URL, exact account or public page, fields to collect, output format, and what to do when a value is missing. Include a stop condition such as “report the page state; do not click submit or change the account.” Review the saved text after editing, because the scheduled run uses the shortcut's instructions, not the assumptions you remember from the original chat.\n\nIf the source page layout changes, the shortcut may still run while collecting the wrong field. The shortcut is a saved instruction, not a versioned browser test. After a site update, manually run it once and compare its output with the visible page before scheduling it again."
        },
        {
          "heading": "Record a workflow only in the classic panel",
          "body": "Anthropic's help says you can teach Claude a repetitive task by clicking the record icon, performing the steps, stopping the recording, and saving the result as a shortcut. The same help page explicitly says recording is not available when the side panel runs as a Cowork session.\n\nIf you see the Cowork panel, use a saved prompt or another documented Cowork workflow instead of following an old recording tutorial. In the classic panel, record a low-risk task with clear page changes and avoid including passwords, one-time codes, or personal data in the demonstrated flow. Inspect the generated shortcut name, instructions, and starting URL before saving it.\n\nAnthropic's product interface changes over time. If the record icon is absent, check the panel type and current Help Center rather than reinstalling the extension or switching browser profiles immediately. On a Team or Enterprise account, an administrator can control extension availability and site access."
        },
        {
          "heading": "Schedule the saved shortcut",
          "body": "The Claude in Chrome Help Center says a shortcut can be scheduled from the clock icon in the upper-right corner of the extension panel. The Academy walkthrough describes toggling Schedule when creating or editing a shortcut, then choosing frequency, date, time, and model. It lists daily, weekly, monthly, or annual scheduling in the current product help.\n\nBefore saving the schedule, check the task text, start URL, selected frequency, time zone shown by the interface, and model. Use a read-only task first. Do not infer from a clock icon that the browser will run while the computer is asleep, Chrome is closed, the session has expired, or an account sign-in prompt is waiting. Anthropic says background workflows can continue while you switch tabs as long as Chrome is open; that statement is not a guarantee of offline or unattended completion.\n\nEnable notifications so you can see when Claude needs permission or finishes. A scheduled task may still stop for a login, site approval, or other confirmation. Treat each notification as a request to inspect state, not proof that the intended result occurred.\n\nBefore logging out of Claude in Chrome, check the official Claude Code Chrome documentation: it warns that logging out of the extension loses saved shortcuts and scheduled tasks. Keep a copy of the prompt, start URL, and schedule details you need before troubleshooting authentication. This does not guarantee the shortcut or task can be restored."
        },
        {
          "heading": "Separate shortcut scheduling from Cowork scheduled tasks",
          "body": "Claude has more than one scheduling route. This page is about a Claude in Chrome shortcut that repeats browser instructions. Cowork also has a separate scheduled-task feature. Its [current Help Center article](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork) describes when tasks can use account files and connectors, and distinguishes remote schedules from local work. Those Cowork conditions do not establish that a Claude in Chrome shortcut can run while Chrome is closed. A task created in one surface does not necessarily have the same browser access, saved state, or account context in the other.\n\nThe current Help Center says the Cowork side panel is available on a set of paid plans and may require administrator enablement for Enterprise. The classic and Cowork panels do not share every control: recorded workflows are classic-only. Check the product label at the top of the panel before following an older tutorial that describes shortcuts, cross-chat memory, or extension behavior.\n\nIf a shortcut disappears after a sign-in change or logout, consult the current Claude in Chrome Help and Claude Code Chrome documentation for the specific surface. Do not assume that uninstalling and reinstalling preserves locally stored browser instructions. The destination account, organization, and current panel mode may affect what is available."
        },
        {
          "heading": "Verify one run before depending on repetition",
          "body": "Use a short verification pass before leaving a shortcut on a schedule:\n\n1. Run it manually on the intended public or approved page.\n2. Compare each returned field with the visible page and source URL.\n3. Confirm that missing values are marked unknown rather than filled by inference.\n4. Check that the task stops before any action requiring your approval.\n5. Confirm the saved shortcut still contains the approved instructions.\n6. Set the schedule and enable notifications.\n7. Review the first scheduled result and verify the page state yourself.\n\nIf a scheduled run fails, record the date, page URL, exact notification, whether Chrome was open, and whether a sign-in or permission prompt appeared. Do not immediately create duplicate schedules; first check the task status shown in the interface. A failed run is not evidence that the page was unchanged, so inspect the site before retrying any action that could have side effects."
        },
        {
          "heading": "Sources and limits",
          "body": "Primary product sources checked by BrowserHub on November 9, 2026: [Anthropic Help: Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome); [Anthropic Academy: Simplify browsing with Claude in Chrome](https://academy.claude.com/tutorials/simplify-your-browsing-experience-with-claude-for-chrome); [Claude Code Docs: Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome); [Claude Help: Claude in Chrome troubleshooting](https://support.claude.com/en/articles/12902405-claude-in-chrome-troubleshooting). The current help surfaces may change. BrowserHub did not install the extension, schedule a task, or claim a hands-on run."
        }
      ],
      "faq": [
        {
          "question": "Can I record a workflow in the Cowork panel?",
          "answer": "Anthropic's current help says recording is available in the classic side panel only."
        },
        {
          "question": "Can I schedule a saved shortcut?",
          "answer": "Yes. The help describes a clock control in the extension panel; the Academy guide describes enabling Schedule while creating or editing a shortcut."
        },
        {
          "question": "Will it run when Chrome is closed?",
          "answer": "The cited help says background workflows continue while you switch tabs as long as Chrome remains open. It does not promise execution with Chrome closed or the computer asleep."
        },
        {
          "question": "Does a scheduled run have permission to submit a form?",
          "answer": "A schedule is not blanket authorization. Keep consequential actions behind a person’s review and approval."
        },
        {
          "question": "Are Claude in Chrome shortcuts the same as Cowork scheduled tasks?",
          "answer": "No. They are separate product surfaces with different controls and access paths."
        }
      ]
    },
    "zh-cn": {
      "title": "保存并定时运行 Claude in Chrome 快捷方式",
      "description": "区分可复用提示和录制流程，确认经典侧栏与 Cowork 侧栏的不同，并在依赖定时运行前核对设置。",
      "category": "AI 浏览器指南",
      "content": "Claude in Chrome 可以把有效的浏览器指令保存为快捷方式，并安排它再次运行。这个入口容易找错，因为 Anthropic 现在同时说明经典扩展侧栏和 Cowork 侧栏，而录制工作流只适用于经典侧栏。本文梳理重复任务的几种方式、当前帮助页明确写出的运行条件，以及定时任务开始前的核验清单。",
      "sections": [
        {
          "heading": "按任务选择重复方式",
          "body": "Anthropic 介绍了三种复用浏览器工作的方式：把有效提示保存为快捷方式、在经典侧栏录制操作，或把跨多个聊天完成的工作流转换成快捷方式。这几种方式并不相同。快捷方式复用指令；录制会示范一套操作顺序；定时快捷方式则会在指定时间再次运行选定任务。\n\n先挑输入稳定、结束条件清楚的任务，例如检查公开网页是否出现状态变化，并返回 URL 和页面上可见的值。不要把提交表单、购物付款、发送消息、修改账号权限或接受条款设为无人复核的定时步骤。指令可重复，不代表网站状态固定，也不等于预先授权未来的每一次操作。\n\nClaude in Chrome 是 Chrome 扩展工作流。Anthropic 当前帮助页还区分 Cowork 侧栏与经典侧栏，并说明录制功能仅在经典侧栏提供。找不到录制按钮时，先确认正在用哪种面板。"
        },
        {
          "heading": "把有效提示保存为快捷方式",
          "body": "已经验证有效的提示，可使用该提示上的保存为快捷方式操作。当前帮助中心说明，在聊天框输入 / 可以找到已保存快捷方式并选择使用；也可以在扩展设置里编辑或删除。\n\n快捷方式名称应对应任务结果，不要只叫“每天”之类的模糊名称。指令里写明起始 URL、准确账号或公开页面、要收集的字段、输出格式，以及字段缺失时该怎么办。再加上停止条件，例如“只报告网页状态，不点击提交，也不修改账号”。编辑快捷方式后要重新读一遍保存的内容，因为定时运行遵照的是已保存指令，不会自动带上你对旧对话的记忆。\n\n网站改版后，快捷方式可能仍然正常运行，却提取了错误字段。它保存的是提示，不是带版本的浏览器测试。网站更新后，先手动运行一次，把输出与可见页面对照，再决定要不要继续定时运行。"
        },
        {
          "heading": "录制工作流只在经典侧栏可用",
          "body": "Anthropic 帮助页说明，点击录制图标、执行操作、停止录制后，可以把流程保存为快捷方式。该页也明确说明，如果侧栏正在运行 Cowork 会话，就无法录制工作流。\n\n看到 Cowork 侧栏时，应使用已保存提示或该产品支持的其他 Cowork 工作流，不要照搬较早的录制教程。使用经典侧栏录制时，选择风险较低、页面状态明确的任务；演示流程中不要包含密码、一次性验证码或个人信息。保存前检查自动生成的快捷方式名称、指令和起始 URL。\n\nAnthropic 的产品界面会变化。如果没有录制图标，先核对侧栏类型和当前帮助中心，不要马上重装扩展或切换浏览器配置文件。Team 或 Enterprise 账号还可能受到管理员对扩展和网站访问范围的控制。"
        },
        {
          "heading": "为已保存的快捷方式设置日程",
          "body": "Claude in Chrome 帮助中心说，可以点击扩展面板右上角的时钟图标，为快捷方式设置定时运行。Anthropic Academy 的教程介绍了创建或编辑快捷方式时打开 Schedule，再选择频率、日期、时间和模型。当前产品帮助列出的频率包括每天、每周、每月或每年。\n\n保存日程前，检查任务指令、起始 URL、频率、界面显示的时区和所选模型。先从只读任务开始。不能因为看到时钟图标，就推断浏览器关闭、电脑休眠、登录过期或等待账号确认时也会运行。Anthropic 说浏览器保持打开时，即使切换标签，后台工作仍可继续；这并不保证离线或无人值守执行。\n\n开启通知，以便知道 Claude 何时需要权限或完成任务。定时任务仍可能停下来等待登录、站点授权或其他确认。收到通知时应查看当前状态，不能把通知当成目标结果已实现的证明。\n\n退出 Claude in Chrome 前先看官方 Claude Code Chrome 文档：文档提醒，退出扩展账号会丢失已保存的快捷方式和定时任务。排查登录问题前，先保留需要的提示词、起始网址和日程信息；这不保证快捷方式或任务一定能恢复。"
        },
        {
          "heading": "区分快捷方式与 Cowork 定时任务",
          "body": "Claude 有不止一种日程入口。本文讨论的是 Claude in Chrome 快捷方式重复运行浏览器指令。Cowork 也有独立的定时任务功能。[当前帮助页](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork)说明任务何时可以使用账号文件和连接器，并区分远程日程与本地工作。这些 Cowork 条件不代表 Claude in Chrome 快捷方式可以在 Chrome 关闭时运行。一个界面创建的任务不一定在另一个界面拥有相同的浏览器访问、保存状态或账号上下文。\n\n当前帮助中心说明，Cowork 侧栏面向部分付费方案；Enterprise 可能需要管理员启用云端 Cowork 和 Chrome 扩展。经典与 Cowork 面板的操作并不完全相同，录制工作流只在经典侧栏提供。阅读旧教程时，先检查面板顶部标记的产品名称，再判断文中提到的快捷方式、跨聊天记忆或扩展行为是否适用。\n\n若退出登录或更换账号后快捷方式不见，针对实际使用的界面查阅 Claude in Chrome 帮助或 Claude Code Chrome 文档。不要假设卸载重装会保留本地浏览器指令。目标账号、组织和当前面板模式都可能影响可见内容。"
        },
        {
          "heading": "依赖定时任务前先核实一次运行",
          "body": "把快捷方式长期交给日程运行前，做一轮简短核验：\n\n1. 在目标公开网页或获准页面上手动运行。\n2. 把每个输出字段与可见页面和来源 URL 对照。\n3. 确认缺失值会标为未知，而不是由模型猜测补齐。\n4. 确认需要审批的操作会停下来等待你。\n5. 再读一次快捷方式，确认保存的指令就是已审批版本。\n6. 设置时间并启用通知。\n7. 检查第一次定时结果，并自行核对网页状态。\n\n若定时运行失败，记录日期、页面 URL、通知原文、Chrome 是否打开，以及是否出现登录或权限提示。不要立刻新建重复日程；先查看界面显示的运行状态。失败并不证明网页没有变化，所以重试可能产生副作用的操作前，要先查看网站当前状态。"
        },
        {
          "heading": "来源与范围",
          "body": "资料核对日期：2026 年 11 月 9 日。主要产品资料：[Anthropic Help: Get started with Claude in Chrome](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome)；[Anthropic Academy: Simplify browsing with Claude in Chrome](https://academy.claude.com/tutorials/simplify-your-browsing-experience-with-claude-for-chrome)；[Claude Code Docs: Use Claude Code with Chrome](https://code.claude.com/docs/en/chrome)；[Claude Help: Claude in Chrome troubleshooting](https://support.claude.com/en/articles/12902405-claude-in-chrome-troubleshooting)。产品界面和开放情况可能变化。BrowserHub 未安装扩展、设置日程，也未声称实际运行过任务。"
        }
      ],
      "faq": [
        {
          "question": "能在 Cowork 侧栏录制工作流吗？",
          "answer": "Anthropic 当前帮助说明，录制功能只在经典侧栏提供。"
        },
        {
          "question": "已保存的快捷方式可以定时运行吗？",
          "answer": "可以。帮助页介绍扩展面板中的时钟入口；Academy 教程说明在创建或编辑快捷方式时启用 Schedule。"
        },
        {
          "question": "关闭 Chrome 后还会运行吗？",
          "answer": "引用的帮助页只说 Chrome 保持打开时，切换标签不影响后台工作，没有承诺 Chrome 关闭或电脑休眠时仍运行。"
        },
        {
          "question": "定时运行是否自动获准提交表单？",
          "answer": "日程不等于一揽子授权。涉及重要后果的操作应由人检查并批准。"
        },
        {
          "question": "Claude in Chrome 快捷方式和 Cowork 定时任务相同吗？",
          "answer": "不同。它们属于不同产品界面，控制项和访问路径也不同。"
        }
      ]
    }
  },
  "edge-copilot-journeys-controls": {
    "en": {
      "title": "Edge Copilot Journeys: Turn It On, Check Its Data, or Remove It",
      "description": "Distinguish topic cards from live tab groups, understand first-use history versus ongoing browsing summaries, and check sync and deletion controls.",
      "category": "AI browser guides",
      "content": "Copilot Journeys turns browsing activity into topic cards on Edge's new tab page. It is separate from grouping the tabs you have open right now, and the current help describes different data for the first cards and for ongoing use. This guide shows the opt-in path, what the help says is used, what turning the feature off deletes, and which desktop or mobile sync details are still limited.",
      "sections": [
        {
          "heading": "Journeys are history-based topic cards, not live tab groups",
          "body": "A Journey is a topic card that helps you resume a browsing project. Selecting one opens a Copilot chat about that topic, where you can continue researching or compare options. It is not a label applied to a set of currently open tabs, and hiding a card is not the same action as turning the feature off.\n\nMicrosoft's current support page says Journeys are off by default for personal Microsoft accounts. The help lists Microsoft 365 Personal, Family, Premium, and Pro. The new-tab page and Journeys settings both need to be enabled. The feature is described for Edge desktop and mobile, but mobile availability may still be rolling out.\n\nThis distinction matters if your goal is to organize a working window. Use Edge's tab groups for live tabs; consider Journeys only if you want topic cards derived from browsing history. Our [task-based tab organization guide](/en/guides/ai-browser-organize-tabs-by-task/) covers the live-window case."
        },
        {
          "heading": "Turn on Journeys only if you want the feature",
          "body": "On desktop, Microsoft documents this path: Edge menu > Settings > Copilot and AI > turn on Copilot new tab page > turn on Journeys. The mobile path is similar, but the support article says the feature may not be available to everyone yet. If the Journeys toggle is missing, confirm you are signed into a personal Microsoft account and recheck after updating Edge; the help does not say a policy flag or old browser experiment can force rollout.\n\nOnce enabled, Journeys works in the background while you browse. Microsoft says it may take some browsing activity before cards appear and shows up to three cards at the bottom of the new-tab page. A new user may be offered a one-time import of recent history from another browser or use of recent Edge history. You can skip either option and allow cards to build from new activity instead.\n\nIf you choose an import, Microsoft says imported history is added to Edge browsing history and may be used by other Edge features. Make that choice deliberately, especially on a shared or managed device. You can start with new browsing activity without importing older history."
        },
        {
          "heading": "The first cards and ongoing cards use different data",
          "body": "The current help makes a useful distinction:\n\n| Stage | Data Microsoft says is used | Important boundary |\n| --- | --- | --- |\n| One-time first cards from existing browser history | Recent page URLs and titles | Microsoft says Copilot does not access the full content of those previously visited pages for this initial process |\n| Ongoing Journeys while browsing | Short summaries of viewed page content, related titles, URLs, searches, and Copilot chats | This is broader than the one-time first-card input |\n| Imported history from another browser | Recent history used for first Journeys and added to Edge history | Other Edge features may also use the imported history |\n\nMicrosoft says a filtering system helps exclude sensitive sites and personal information. It also says non-sensitive content is sent to Microsoft services to create summaries. That description does not mean all processing is local. When history sync is off, the Journey data is built locally on each device and does not sync, but local organization is not the same as local-only AI inference.\n\nMicrosoft says Journeys and their underlying data are automatically deleted after 14 days. A topic card is a short-lived aid for resuming work, not a durable archive or backup. Save important URLs or records separately."
        },
        {
          "heading": "Choose the right control: hide, turn off, or clear history",
          "body": "Microsoft documents three separate actions. Hiding a single Journey card removes it from the new-tab page. Turning Journeys off stops collection right away and deletes information previously stored to create Journeys. Clearing Edge browsing history is a separate action that Microsoft recommends doing after turning Journeys off if you want to prevent Journeys from using that history.\n\nThe support page does not say that hiding a card deletes the underlying browsing data, nor that turning Journeys off deletes all Edge history or Copilot chat history. Keep the scope precise:\n\n1. To remove one card from view, use the card's hide control.\n2. To stop new Journey data collection and remove stored Journey-creation information, turn off Journeys in Edge Settings > Copilot and AI.\n3. To clear browsing history too, turn Journeys off first, then clear history from Edge's History controls.\n4. To manage Copilot conversations or other account activity, use the separate Microsoft account controls; this feature switch is not a universal Copilot data-delete button.\n\nIf you share the device, check both the Edge profile and the Microsoft account you are signed into before making changes."
        },
        {
          "heading": "Check sync and device limits",
          "body": "When Edge History sync is on, Microsoft says Journeys data syncs across signed-in devices. When History sync is off, Journeys are built locally on each device and do not sync. The settings page for sync is Edge Settings > Profiles > Sync; the Journeys page also shows its sync state under Settings > Copilot and AI > Journeys.\n\nMicrosoft's current help says device sync is available on PCs only; mobile sync is not available yet. The page does describe Journeys on mobile, but that does not mean mobile cards sync with desktop. If a card is absent on a phone, check mobile rollout and the sync boundary before assuming history was lost.\n\nAlso separate browser History sync from any unrelated Copilot conversation-history setting. A synced Journey is not necessarily the same object as a chat, favorite, or currently open tab group. If you need a specific source again, save its URL separately rather than relying on a topic card to preserve every visited page."
        },
        {
          "heading": "Troubleshoot cards that do not appear",
          "body": "If Journeys is on but no cards appear, first confirm that the Copilot new-tab page is enabled, the right personal Microsoft account is signed in, and Edge History has enough recent activity. Microsoft says cards may take some browsing activity to build and appear at the bottom of the new-tab page, up to three at a time.\n\nIf you recently enabled the feature, you can use the one-time history option if it is offered; otherwise let new activity accumulate. If the toggle is absent on mobile, remember the documented rollout caveat. A missing Journey card does not show that Edge deleted the browsing history; Journey generation and regular history are related inputs but distinct views.\n\nFor a data concern, turn Journeys off before clearing history, following the order Microsoft documents. For a sync concern, check History sync on the PC and the Journey sync state. For an account or policy question, confirm whether the profile is personal or managed. Avoid third-party registry or flag recipes; the current support page describes ordinary settings and account eligibility."
        },
        {
          "heading": "Sources and limits",
          "body": "Primary product sources checked by BrowserHub on November 9, 2026: [Microsoft Support: Copilot Journeys in Edge](https://support.microsoft.com/en-gb/edge/copilot/copilot-journeys); [Microsoft Edge Blog: Edge updates across desktop and mobile](https://blogs.windows.com/msedgedev/2026/05/13/new-updates-to-edge-across-desktop-and-mobile/). BrowserHub did not enable Journeys or inspect a Microsoft account."
        }
      ],
      "faq": [
        {
          "question": "Is Journeys enabled by default?",
          "answer": "No. Microsoft says it is turned off by default."
        },
        {
          "question": "Does the initial history import send full old page contents?",
          "answer": "Microsoft says the one-time first-card process uses recent URLs and titles, not full content of previously visited pages. Ongoing use uses short page summaries and related activity."
        },
        {
          "question": "Does turning it off clear Edge browsing history?",
          "answer": "No. Microsoft lists turning Journeys off and clearing browsing history as separate steps."
        },
        {
          "question": "Does turning it off delete every Copilot chat?",
          "answer": "The help says it deletes information stored to create Journeys. It does not describe this as deleting all Copilot conversation history."
        },
        {
          "question": "Do Journeys sync to phones?",
          "answer": "Microsoft says mobile Journeys are rolling out, but device sync is currently available on PCs only; mobile sync is not available yet."
        },
        {
          "question": "Does “built locally” mean no content reaches Microsoft?",
          "answer": "No. The same support page says non-sensitive ongoing page content may be sent to Microsoft's services for summaries. Local building with sync disabled is not a claim of fully on-device inference."
        },
        {
          "question": "How long are Journeys kept?",
          "answer": "Microsoft says Journeys and their underlying data are automatically deleted after 14 days. Save important pages separately."
        }
      ]
    },
    "zh-cn": {
      "title": "Edge Copilot Journeys 怎么开关和清除？看懂数据来源与同步范围",
      "description": "区分浏览历史生成的主题卡片与当前标签分组，了解首次使用和持续使用的数据、关闭与删除步骤以及设备同步边界。",
      "category": "AI 浏览器指南",
      "content": "Copilot Journeys 会把浏览活动整理成 Edge 新标签页中的主题卡片。它与当前窗口里的标签分组不同；当前帮助页也区分首次生成卡片和后续持续使用的数据。本文说明开启路径、官方列出的数据范围、关闭后会删除什么，以及电脑和手机端的同步限制。",
      "sections": [
        {
          "heading": "Journeys 是历史主题卡片，不是实时标签组",
          "body": "Journey 是帮助你继续某个浏览主题的卡片。点击后会打开相关 Copilot 对话，你可以继续研究或比较选项。它不是给当前打开的一组标签加上名称；隐藏一张卡片也不等于关闭整个功能。\n\nMicrosoft 当前支持页说 Journeys 默认关闭，适用于个人 Microsoft 账号，包括 Microsoft 365 Personal、Family、Premium 和 Pro。启用时要打开 Copilot 新标签页和 Journeys 两项。文档介绍了 Edge 桌面端和移动端，但手机功能仍在逐步开放。\n\n若你想整理当前工作窗口，请使用 Edge 标签组；若你想根据浏览历史生成主题卡片，再考虑使用 Journeys。[按任务整理标签页指南](/zh-cn/guides/ai-browser-organize-tabs-by-task/)介绍的是实时窗口里的整理方法。"
        },
        {
          "heading": "只有想使用时再开启 Journeys",
          "body": "Microsoft 为桌面端列出的路径是：Edge 菜单 > 设置 > Copilot 和 AI > 打开 Copilot 新标签页 > 打开 Journeys。手机版路径相似，但支持页提醒功能可能还未对所有人开放。如果看不到 Journeys 开关，先确认使用个人 Microsoft 账号并更新 Edge；帮助页没有说可以用策略 flag 或旧版实验开关强行开启。\n\n打开后，Journeys 会在浏览时于后台工作。Microsoft 说它可能需要累积一些浏览活动才会生成卡片；卡片会出现在新标签页底部，一次最多显示三张。刚开始使用的用户可能会看到一次性导入其他浏览器近期历史记录，或使用 Edge 近期历史的选项。也可以跳过，等待新活动逐步生成卡片。\n\n如果选择导入，Microsoft 说明导入的历史会加入 Edge 浏览历史，也可能被其他 Edge 功能使用。共享设备或受管理设备上，应先想清楚再导入。你可以选择只基于新的浏览活动开始使用。"
        },
        {
          "heading": "首次卡片和持续使用的数据不同",
          "body": "当前帮助页区分了不同阶段：\n\n| 阶段 | Microsoft 说明会使用的数据 | 需要注意的边界 |\n| --- | --- | --- |\n| 首次读取已有浏览历史生成卡片 | 近期访问的 URL 和页面标题 | Microsoft 说此过程不会读取这些旧页面的完整内容 |\n| 持续生成 Journeys | 浏览页面的简短摘要、相关标题、URL、搜索和 Copilot 聊天 | 数据范围比首次生成更广 |\n| 从其他浏览器导入历史 | 使用近期历史生成第一批 Journeys，并写入 Edge 历史 | 其他 Edge 功能也可能使用这些已导入历史 |\n\nMicrosoft 说过滤系统会尝试排除敏感网站和个人信息；非敏感页面内容会发送到 Microsoft 服务生成摘要。这不代表所有处理都在本机进行。关闭历史同步时，Journey 数据会在本设备本地生成且不跨设备同步，但“本地整理”不能等同于 AI 推理完全在本机完成。\n\nMicrosoft 说明 Journeys 及其底层数据会在 14 天后自动删除。因此主题卡片只是短期恢复浏览主题的工具，不是长期档案或备份。重要网址和记录应另行保存。"
        },
        {
          "heading": "选对操作：隐藏、关闭或清浏览历史",
          "body": "Microsoft 把三个操作分别说明。隐藏单张 Journey 卡片，只会让它从新标签页消失。关闭 Journeys 会立即停止数据收集，并删除此前用于创建 Journeys 的信息。清除 Edge 浏览历史则是另一项操作；如果不想让 Journeys 使用这段历史，Microsoft 建议先关闭功能，再清历史。\n\n支持页没有说隐藏卡片会删除底层浏览数据，也没有说关闭 Journeys 会清空所有 Edge 历史或 Copilot 聊天记录。按下面区分操作范围：\n\n1. 只想从页面移除一张卡片，用卡片上的隐藏选项。\n2. 想停止收集新的 Journey 数据并删除已保存的创建信息，在 Edge“设置 > Copilot 和 AI”中关闭 Journeys。\n3. 还想清除浏览历史，先关闭 Journeys，再从 Edge 历史记录中清除。\n4. 想管理 Copilot 对话或其他账号活动，使用独立的 Microsoft 账号控制项；这个开关不是通用的 Copilot 数据清除按钮。\n\n如果设备由多人共用，修改前确认 Edge 配置文件和当前登录的 Microsoft 账号。"
        },
        {
          "heading": "核对同步状态和设备限制",
          "body": "Edge 历史同步开启时，Microsoft 说 Journeys 数据会在已登录设备间同步。历史同步关闭时，Journey 会在各设备分别生成，不跨设备同步。历史同步入口位于 Edge“设置 > 配置文件 > 同步”；Journeys 状态也可在“设置 > Copilot 和 AI > Journeys”查看。\n\nMicrosoft 当前帮助页说设备同步只支持电脑，手机同步暂不可用。文档虽然说明手机也有 Journeys，但不代表手机卡片会与电脑同步。如果手机上没有某张卡片，先核对手机版开放进度和同步限制，不要立即推断浏览历史丢失。\n\n浏览历史同步与 Copilot 对话记录设置也要分开。同步的 Journey 不一定等于聊天、收藏夹或当前标签组。如果某个具体来源很重要，单独保存网址，不要把主题卡片当成完整的浏览记录备份。"
        },
        {
          "heading": "卡片没有出现时的排查",
          "body": "启用 Journeys 后没有卡片，先确认 Copilot 新标签页已打开、登录的是正确的个人 Microsoft 账号，并且 Edge 里有足够的近期浏览活动。Microsoft 说卡片可能需要累积一些浏览活动，之后会出现在新标签页底部，一次最多三张。\n\n刚启用时，如果出现一次性历史选项，可以按需选择；也可以等待新浏览活动逐步生成卡片。手机开关缺失时，记住官方注明的逐步开放状态。Journeys 卡片缺失不能证明 Edge 删除了浏览历史；历史本身和 Journeys 是相关但不同的视图。\n\n担心数据时，按 Microsoft 建议先关闭 Journeys，再清理历史。担心同步时，检查电脑上的历史同步开关和 Journey 同步状态。账号或组织策略有疑问时，确认这是个人还是受管理的配置文件。不要依赖第三方注册表或 flag 教程；当前支持页介绍的是常规设置和账号条件。"
        },
        {
          "heading": "来源与范围",
          "body": "资料核对日期：2026 年 11 月 9 日。主要产品资料：[Microsoft Support: Copilot Journeys in Edge](https://support.microsoft.com/en-gb/edge/copilot/copilot-journeys)；[Microsoft Edge Blog: Edge updates across desktop and mobile](https://blogs.windows.com/msedgedev/2026/05/13/new-updates-to-edge-across-desktop-and-mobile/)。BrowserHub 未开启 Journeys，也未检查 Microsoft 账号。"
        }
      ],
      "faq": [
        {
          "question": "Journeys 默认开启吗？",
          "answer": "不开启。Microsoft 说它默认关闭。"
        },
        {
          "question": "首次读取旧历史会发送完整页面内容吗？",
          "answer": "Microsoft 说首次生成卡片使用近期 URL 和标题，不读取旧页面完整内容。后续会用页面摘要及相关活动。"
        },
        {
          "question": "关闭 Journeys 会清空 Edge 浏览历史吗？",
          "answer": "不会。Microsoft 把关闭 Journeys 和清除浏览历史列为两个步骤。"
        },
        {
          "question": "关闭后会删除所有 Copilot 聊天吗？",
          "answer": "帮助页说会删除用于创建 Journeys 的信息，没有说会删除全部 Copilot 对话记录。"
        },
        {
          "question": "手机上的 Journeys 会同步吗？",
          "answer": "Microsoft 说移动端正在开放，但目前设备同步只支持电脑，手机同步尚未提供。"
        },
        {
          "question": "“本地生成”是否代表内容不会发给 Microsoft？",
          "answer": "不是。相同支持页说非敏感的持续浏览内容可能发送到 Microsoft 服务生成摘要。关闭同步后本地生成，不代表推理完全在设备上完成。"
        },
        {
          "question": "Journeys 会保留多久？",
          "answer": "Microsoft 说明 Journeys 及其底层数据会在 14 天后自动删除。重要页面请另行保存。"
        }
      ]
    }
  }
};

const slugs = Object.keys(copies);
export const aiCycleGuides09: EditorialGuide[] = slugs.map(slug => ({
  ...copies[slug]["zh-cn"], slug, date: "2026-11-09", sourcePath: `src/data/ai-cycle-2026-11-09.ts#${slug}`,
  availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug], relatedGuides: related[slug]
}));
export const aiCycleTranslations09: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
