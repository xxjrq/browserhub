import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sourcesBySlug: Record<string, { title: string; url: string }[]> = {
  "ai-browser-audit-rental-listings-before-a-viewing": [
    { title: "The Daily Prompt: apartment-listing agent report", url: "https://thedailyprompt.ai/agent-uses/use-an-agent-to-monitor-apartment-listings" },
    { title: "Reddit: apartment-hunting agent project and reader discussion", url: "https://www.reddit.com/r/SideProject/comments/1rpk4o6/i_built_an_ai_that_apartmenthunts_for_you_and/" },
    { title: "brightplace: renter use cases and trade-offs", url: "https://www.brightplace.ai/llm-info" },
    { title: "Apartments.com: AI-powered conversational search announcement", url: "https://www.apartments.com/grow/news/apartments-ai-conversational-search-launch" },
    { title: "CoStar: Apartments.com in the GPT-6 Astra apartment-hunting demo", url: "https://investors.costargroup.com/node/17306/pdf" },
    { title: "realestate.com.au: AI Assistant capabilities and limits", url: "https://help.realestate.com.au/hc/en-us/articles/62368223508505-What-is-the-AI-Assistant-on-realestate-com-au" },
    { title: "FTC: rental listing and payment scam advice", url: "https://consumer.ftc.gov/articles/rental-listing-scams" }
  ],
  "ai-browser-check-laptop-dock-compatibility": [
    { title: "iTechGuides: USB-C dock compatibility buying guide", url: "https://www.itechguides.com/usb-c-docking-station-buying-guide-ports-power-delivery-displays-and-compatibility/" },
    { title: "Laptop Mag: docking station review method and host-port notes", url: "https://www.laptopmag.com/articles/best-docking-station" },
    { title: "Reddit: buyer question about USB-C dock compatibility", url: "https://www.reddit.com/r/UsbCHardware/comments/1d9d8ay/a_novice_looking_to_buy_a_usb_c_dock/" },
    { title: "Microsoft Learn: Windows docking recommendations", url: "https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/docking" },
    { title: "MSI: USB-C docking station compatibility FAQ", url: "https://www.msi.com/faq/faq-10184" },
    { title: "Dell: dock compatibility matrix", url: "https://www.delltechnologies.com/asset/en-us/products/electronics-and-accessories/technical-support/dell_docking_compatibility_guide.pdf" },
    { title: "Anker: determine dock compatibility with a computer", url: "https://service.anker.com/au/article-description/What-Should-I-Do-to-Determine-If-the-Dock-is-Compatible-with-My-Computer-A83C3" }
  ],
  "ai-browser-audit-subscriptions-before-cancelling": [
    { title: "Agent Finder: AI-assisted subscription audit workflow", url: "https://agent-finder.co/guides/ai-agent-cancel-subscriptions" },
    { title: "Tom's Guide: subscription review and agent-assisted cancellation report", url: "https://www.tomsguide.com/ai/i-asked-chatgpt-which-streaming-services-to-cancel-this-month-then-used-agent-mode-to-do-it" },
    { title: "Tom's Guide: agent-guided streaming subscription cancellation report", url: "https://www.tomsguide.com/ai/i-used-chatgpt-to-cancel-my-streaming-subscriptions-heres-how-to-try-it-too" },
    { title: "Candor: find forgotten subscriptions with or without AI", url: "https://candor.money/find-forgotten-subscriptions" },
    { title: "OpenAI Help Center: cancel ChatGPT subscriptions by purchase channel", url: "https://help.openai.com/en/articles/7232927-canceling-your-chatgpt-subscription" },
    { title: "Google Play Help: cancel, pause or change a subscription", url: "https://support.google.com/googleplay/answer/7018481" }
  ],
  "playwright-test-spa-history-back-forward": [
    { title: "amLab: waiting for single-page navigation and re-hydration", url: "https://lab.amalitsky.com/posts/2022/wait-for-single-page-navigation-and-re-hydration-playwright-react/" },
    { title: "TechYorker: test client-side routing and deep links", url: "https://techyorker.com/how-to-test-client-side-routing-and-deep-links-with-playwright/" },
    { title: "TurnTrout: debugging Playwright timing and SPA navigation", url: "https://turntrout.com/playwright-tips" },
    { title: "Reddit: extension behavior during real SPA navigation", url: "https://www.reddit.com/r/chrome_extensions/comments/1xbmldz/testing-extensions-with-playwrightwebext/" },
    { title: "Playwright: navigation and same-document history behavior", url: "https://playwright.dev/docs/navigations" },
    { title: "Playwright: waitForURL and pushState test cases", url: "https://github.com/microsoft/playwright/blob/main/tests/page/page-wait-for-url.spec.ts" },
    { title: "React Router: navigate back and forward safely", url: "https://reactrouter.com/api/hooks/useNavigate" }
  ],
  "playwright-api-request-context-econnreset-retries": [
    { title: "GitHub issue: APIRequestContext ECONNRESET retry confusion", url: "https://github.com/microsoft/playwright/issues/38668" },
    { title: "GitHub issue: ECONNRESET after keep-alive socket reuse", url: "https://github.com/microsoft/playwright/issues/42698" },
    { title: "Reddit: API failures in Playwright UI tests on CI", url: "https://www.reddit.com/r/Playwright/comments/1sn9mw5/api_failures_when_running_ui_tests_in_gitaction/" },
    { title: "Playwright: APIRequestContext maxRetries contract", url: "https://playwright.dev/docs/api/class-apirequestcontext" },
    { title: "Playwright: retry feature request and failure boundaries", url: "https://github.com/microsoft/playwright/issues/34207" }
  ]
};

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "ai-browser-audit-rental-listings-before-a-viewing": {
    en: {
      title: "Use an AI Browser to Check Rental Listings Before a Viewing",
      description: "Turn public rental pages into a source-linked shortlist, separate recurring rent from move-in costs, and flag details that still need a person to confirm.",
      category: "AI browser guides",
      content: "Apartment listings combine fast-changing availability, one-time fees, monthly charges and media that may not show the exact unit. An AI browser can collect the details into a comparison sheet, but the listing and property manager remain the sources to verify. Keep an exact link and checked time for each claim. Stop at a shortlist: do not let the agent message a landlord, book a viewing, submit an application, share identity documents or send money.",
      sections: [
        { heading: "Set the requirements and privacy boundary first", body: `Write down the location or commute area, move-in window, maximum base rent, bedrooms, pets, accessibility needs and non-negotiable features. Separate hard limits from preferences. “Within a 30-minute rail trip” is only useful if the route and service time can be checked; a neighborhood label is not a travel-time calculation. Give a broad area rather than a home or work address, and do not paste income records, identity numbers, account credentials or a credit report into an agent prompt.

Decide what the agent may read and what it must leave alone. Public listings, public fee pages and transit operators’ public route information are reasonable inputs. A sign-in wall, application portal, private message thread or payment page should end the task. If the site blocks access, record that page as unavailable instead of trying to evade a restriction.` },
        { heading: "Keep a source record for each property", body: `A search result is a lead, not proof that an apartment is available. For every candidate, save the exact unit or listing URL, property name, unit number when public, date checked, posted availability date, advertised rent and the page that supports each figure. If a listing page links to a property’s own site, check whether the same unit and dates appear there. A search snippet, cached card or AI summary cannot confirm live availability.

Avoid merging multiple apartments in one building. Floor plan, floor, view, pet policy and fees can vary by unit. If one site says “available now” and another shows a future date, keep both observations, name the URLs and mark availability unresolved. Do not infer that two pages describe the same unit only because their photos or rent match.` },
        { heading: "Separate move-in cash from the monthly cost", body: `A useful comparison shows several amounts instead of one blended total. Record advertised monthly rent, recurring mandatory fees, utilities stated by the listing, deposit, application or administration charges, parking, pet charges and any concession. Keep refundable deposits separate from non-refundable charges. Add a timeframe and currency to every amount. If the page omits a value, use “not stated,” not zero.

| Field | Record | Do not assume |
| --- | --- | --- |
| Base rent | Amount, unit, lease term and checked date | A promotional rent applies to every unit or month |
| Recurring charges | Fee name and whether required | A one-time fee repeats monthly |
| Up-front charges | Deposit and named move-in fees | A deposit is non-refundable or identical by applicant |
| Utilities | Included services and cited source | “Utilities included” means every utility |
| Availability | Unit, date and source page | A building-level date applies to a specific unit |
| Concession | Eligibility and effective months | A temporary credit is a lower permanent rent |

Do not calculate an “all-in” figure when mandatory fees or utility amounts are missing. You can calculate a disclosed subtotal, label the omissions, and ask the property manager to confirm the remaining costs yourself.` },
        { heading: "Check photos and claims without pretending to authenticate them", body: `Compare the unit number and floor plan with the images and written description. Look for obvious inconsistencies: a different number of bedrooms, an amenity shown in a photo but absent from the unit description, or photos that appear to describe a model apartment. A mismatch is a question to verify, not proof of fraud or proof that an image was generated. Listing photographs can be staged, edited or reused; a browser agent cannot establish the physical condition of a home from a web page.

Use the property’s own page or a dated floor plan to confirm what belongs to the exact unit. If a page identifies photos as illustrative, preserve that note. If the agent cannot find a unit identifier or the photo source, mark the match as uncertain. Never let a polished image erase a missing fact from the comparison.` },
        { heading: "Compare only what the sources actually establish", body: `A decision table should preserve evidence and unknowns, not create a ranking that hides them. Useful columns include listing URL, exact unit, date checked, rent, disclosed recurring fees, move-in fees, earliest availability, commute source, pet or access conditions, photo-to-unit match and unanswered questions. Show “confirmed by the public listing,” “confirmed by property page,” “not stated,” and “conflict” as separate statuses.

Neighborhood descriptions and commute claims need their own sources. A listing’s “near transit” label does not provide a travel time. If you calculate a route with a transit planner, record the origin area, destination, departure time and service date; schedules and disruptions can change. Do not infer safety, school quality, tenant eligibility or financial suitability from reviews or neighborhood stereotypes. Those are personal or regulated decisions that need current, appropriate evidence.` },
        { heading: "Use a bounded prompt and stop before contact", body: `Give the browser a short list of public sources and the limits of the task. For example: “Use the public rental pages I provide to make a comparison table for the area and move-in month below. Preserve the exact listing and unit URLs, the time checked, stated rent, each named recurring and one-time charge, availability date, floor-plan link and any contradiction. Keep missing data unknown. Compare only facts shown by the source. Do not sign in, open an application, contact an owner, reserve a tour, upload documents, share my contact details, accept terms or pay. Stop with the table and questions for me.”

Before using the shortlist, open each exact listing and confirm it still resolves to the same unit. If details conflict, the page is blocked or the unit has disappeared, remove it from the “verified” group and retain the reason. A contact, viewing or application is a separate action; review the terms and take it yourself only after you choose to continue. For a broader method of tracing claims back to source pages, see [AI browser research source verification](/en/guides/ai-browser-research-source-verification/).` },
        { heading: "What this workflow can and cannot conclude", body: `The output can help you compare public claims and prepare questions. It cannot prove that a landlord owns a property, that a listing is current, that fees are complete, that photos show the offered unit, or that a neighborhood is suitable. The Federal Trade Commission advises renters to verify the property and be alert to requests for unusual payment methods; use its [rental listing scam guidance](https://consumer.ftc.gov/articles/rental-listing-scams) for current warning signs. If the site blocks access or an agent invents a detail, preserve the uncertainty and check with the source directly.

Treat the comparison as a dated working note. Availability and prices can change between the check and a viewing. Reopen the official listing shortly before you act, confirm the unit and the written lease terms, and do not pay or send identity documents based on an agent-generated summary.` }
      ],
      faq: [
        { question: "Can an AI browser confirm that a rental listing is legitimate?", answer: "No. It can collect public evidence and flag inconsistencies. Ownership, availability, fee completeness and the condition of the property still need confirmation from reliable sources and the property contact." },
        { question: "Should it message landlords or schedule tours?", answer: "This workflow stops before contact. Review the shortlist and decide yourself whether to contact anyone or share personal details." },
        { question: "How should missing fees be compared?", answer: "Mark them as not stated. Do not replace missing charges with zero or calculate a complete monthly total from partial data." },
        { question: "Can listing photos prove the exact unit has an amenity?", answer: "No. Photos may be staged or reused. Match them to the exact unit and floor plan, then ask the property contact to confirm unresolved details." },
        { question: "What if two pages disagree about availability?", answer: "Keep both URLs and checked times, mark the conflict, and verify with the property source before treating the unit as available." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器核对出租房源再安排看房",
      description: "把公开房源整理成带来源的对照表，分开记录月租与入住费用，并标出需要人工确认的内容。",
      category: "AI 浏览器指南",
      content: "租房页面上的可租日期、一次性费用、月费和照片都可能变化，也未必对应具体房间。AI 浏览器可以汇总公开信息，但房源页面和物业方才是核实详情的来源。每条判断都保留原始网址和查看时间。工作流程停在对照表，不让智能体联系房东、预约看房、提交申请、发送证件或转账。",
      sections: [
        { heading: "先列需求与隐私边界", body: `写下目标区域或通勤范围、入住时间、最高基础月租、卧室数、宠物、无障碍需求和必备条件，再区分硬性条件与偏好。“坐轨道交通三十分钟内”只有在路线和班次可核实时才有意义；社区名称本身不是通勤时间。尽量提供大致区域，不要输入家庭或单位的精确地址，也不要粘贴收入证明、证件号码、账号密码或信用报告。

明确允许智能体查看哪些内容。公开房源、公开费用页和交通运营方的路线信息可以作为输入。遇到登录页、申请入口、私人消息或付款页面时就结束任务。页面无法访问，记录为无法读取；不要尝试绕过网站限制。` },
        { heading: "每套房源都留一条来源记录", body: `搜索结果只是线索，不能证明这套房现在还可租。每个候选都记录具体房间或房源网址、物业名称、页面公开的房号、查看日期、标注的可入住日期、租金，以及支持各项信息的页面。如果房源页链接到物业官网，核对同一房间和日期是否仍在。搜索摘要、缓存卡片或 AI 总结都不能证明实时库存。

不要把同一栋楼的多套房合成一套。户型、楼层、视野、宠物政策和费用可能因房间不同。一个页面写“立即入住”，另一个写未来日期时，分别保留网址并标成未解决，不要只因照片或租金相同就断定是同一套。` },
        { heading: "把入住时要付的钱和每月成本分开", body: `对照表应列出不同金额，避免合成一个看似精确的总价。记录基础月租、必须支付的月费、页面说明的水电网费用、押金、申请或管理费、停车费、宠物费和优惠。可退押金与不可退费用分开。每项金额都带币种、周期和查看日期；页面没写就标“未说明”，不能写成零。

| 字段 | 记录内容 | 不要默认 |
| --- | --- | --- |
| 基础月租 | 金额、单位、租期和查看日期 | 促销价适用于所有房间或月份 |
| 每月费用 | 费用名称及是否必交 | 一次性费用会按月重复 |
| 入住费用 | 押金和列明的入住收费 | 押金不可退或所有申请人金额相同 |
| 水电等 | 包含的项目及来源 | “含杂费”代表全部费用都包含 |
| 可入住日期 | 房间、日期和页面 | 整栋楼的日期适用于具体房间 |
| 优惠 | 适用条件和月份 | 临时抵扣等于永久降租 |

有必交费用或水电金额缺失时，不要计算完整“全包价”。可以列已披露的小计、写清缺项，再自行向物业确认。` },
        { heading: "核对照片与文字，但不要假装能鉴真", body: `把房号和户型与照片、文字说明对照，留意明显不一致：卧室数量不同、照片里的设施没有出现在房间说明中，或图片看起来像样板间。发现差异时应列为待核实，不能据此认定诈骗，也不能断言图片由 AI 生成。房源照可能经过布置、编辑或重复使用；网页内容无法证明实际房屋状况。

优先查物业自己的页面或带日期的户型图，确认哪些信息适用于具体房间。页面注明图片仅供参考时保留这条说明。找不到房号或图片来源，就把匹配状态标为不确定，不能让一张精修照片掩盖缺失信息。` },
        { heading: "只比较来源能证明的事实", body: `对照表要保留证据和未知项，不要用一个排名掩盖差异。可列房源网址、房号、查看日期、租金、已披露月费、入住费用、最早可入住日期、通勤来源、宠物或无障碍条件、照片与房间是否匹配、待问问题。用不同状态表示“房源页已说明”“物业页已说明”“未说明”和“页面冲突”。

社区介绍和通勤说法需要独立来源。房源写着“靠近地铁”不等于给出了通勤时间。若用交通规划工具计算，要记录起点区域、终点、出发时间和日期；班次与临时服务变化都会影响结果。不要从评价或社区刻板印象推断安全、学校质量、租客资格或个人负担能力。` },
        { heading: "给浏览器设定范围，并在联系前停止", body: `只提供公开来源，并写明操作边界。可以这样要求：“仅根据我提供的公开房源页面，为指定区域和入住月份制作对照表。每项保留具体房源和房号网址、查看时间、页面所写租金、每项月费和一次性费用、可入住日期、户型图链接及页面矛盾。缺失信息标未知，只比较来源确实写明的内容。不要登录、打开申请、联系房东、预约看房、上传文件、发送我的联系方式、接受条款或付款。完成表格和待确认问题后停止。”

使用前重新打开每个房源网址，确认指向的仍是同一套房。详情冲突、页面被挡或房间已下架时，从“已核实”中移出并保留原因。联系、看房和申请是单独的决定，应由你阅读条款后自行继续。如何把结论追溯到原始网页，可看[AI 浏览器研究来源核验指南](/zh-cn/guides/ai-browser-research-source-verification/)。` },
        { heading: "这套流程能说明什么，不能证明什么", body: `结果可以帮助你整理公开说法和准备问题，但不能证明房东拥有房屋、房源仍有效、费用已经列全、照片展示的是出租房间，或某个社区适合你。美国联邦贸易委员会建议租客核实房源，并警惕不寻常的付款方式；查看其[租房诈骗指南](https://consumer.ftc.gov/articles/rental-listing-scams)了解当前提醒。页面无法打开或智能体补出了详情时，保留不确定性，直接向来源核实。

把对照表当成有日期的工作记录。看房前重新打开物业页面，核实房号、条款和状态；租金与可租日期可能在检查后变化。不要凭 AI 摘要付款或发送证件。` }
      ],
      faq: [
        { question: "AI 浏览器能确认房源真实吗？", answer: "不能。它可以收集公开证据并标出不一致。房屋归属、实时空置、费用完整性和房屋状况仍要通过可靠来源或物业方核实。" },
        { question: "可以让智能体联系房东或预约看房吗？", answer: "本文流程停在联系前。先审阅对照表，再由你决定是否联系以及是否提供个人信息。" },
        { question: "缺失的费用应该怎么比较？", answer: "标为未说明。不要把缺失费用填成零，也不要用不完整数据计算全包月租。" },
        { question: "照片能证明房间有某种设施吗？", answer: "不能。照片可能布置过或重复使用。先匹配具体房间和户型，再请物业确认仍不清楚的细节。" },
        { question: "两个页面写的可租时间不一致怎么办？", answer: "保留两个网址和查看时间，标出冲突；向物业核实前不要认定房间仍可租。" }
      ]
    }
  },
  "ai-browser-check-laptop-dock-compatibility": {
    en: {
      title: "Use an AI Browser to Check a Laptop and USB-C Dock Combination",
      description: "Verify whether one exact laptop, dock, cable and display setup supports the features you need by following model-specific manufacturer documentation.",
      category: "AI browser guides",
      content: "A USB-C plug only identifies the connector. It does not establish that a laptop port can drive displays, charge from a dock or support every dock feature. An AI browser can gather the exact model documents into a compatibility matrix, but the manufacturer’s specifications and support tables control. Check each required function separately and leave unknowns unresolved; a page summary is not a hardware test.",
      sections: [
        { heading: "Write down the exact devices and required functions", body: `Record the laptop’s full model number, generation, processor or configuration when the manufacturer’s support page distinguishes them, the dock’s exact model, the included or proposed host cable, the displays, and the operating system. State the outcome you need: external video, a certain number of monitors at given resolutions and refresh rates, charging through one cable, Ethernet, USB data rate, audio, wake behavior or a dock power button.

Do not begin with “Will this USB-C dock work?” That question hides separate functions. A system may pass USB data while video or charging is unsupported. You can answer only for the exact model and configuration documented; a family name or the shape of a port is not enough.` },
        { heading: "Check the laptop port’s documented capabilities", body: `Open the laptop manufacturer’s specification or support page for the exact model. First identify which display path the dock uses. For native video from the laptop GPU, check whether the exact host port supports DisplayPort Alternate Mode, Thunderbolt or documented USB4 video, then confirm the supported display count, resolution and port-specific limits. The words “USB-C” alone describe connector shape, not which optional data, video or power functions are present.

Do not rule out every dock just because a port lacks native video output. Some USB graphics docks, including DisplayLink-based models, can send display data over an ordinary USB data connection when the exact laptop OS, driver and dock support that path. Check the dock maker’s current driver and operating-system matrix, including display limits. Mark the path unknown if support material is missing; a driver requirement is not proof that the setup supports the required monitor configuration.

Manufacturer icon guides can help decode a mark beside a port, but use the model manual or technical specification to confirm it. Do not transfer a conclusion from a different CPU configuration, regional model, year or dock bundle.` },
        { heading: "Read the dock’s host and display limits", body: `The dock’s own support page should identify its display path, supported host protocols, upstream port, power supply, host charging output, display combinations, and any operating-system or driver requirements. Native GPU-video docks need the compatible host video mode and bandwidth. USB graphics or DisplayLink docks may work over USB data without native video alternate mode, but only where the dock maker supports that laptop, OS, driver version and monitor setup. Do not treat these two paths as interchangeable or assume every USB data port can drive every such dock.

| Function | Laptop evidence | Dock and cable evidence |
| --- | --- | --- |
| Native GPU video | Exact port supports DP Alt Mode, Thunderbolt or documented USB4 video | Dock supports that host mode and the target display combination |
| USB graphics video | Port supports the required USB data path; OS and driver support are documented | Exact dock, driver, OS and display limits are listed by the maker |
| Charging | Exact port accepts USB Power Delivery input | Dock host output and adapter meet laptop requirements |
| Monitor count | Exact configuration’s GPU and port limits | Simultaneous display resolution and refresh table |
| USB data | Port protocol and speed | Dock port and cable meet the needed rate |
| Network or audio | OS and driver support | Dock support table covers OS, driver and device |

Check each row independently. Microsoft’s docking guidance describes indirect display over USB, including USB ports without an alternate mode; that is a different path from native GPU video and still depends on the applicable implementation and driver. A supported display path does not prove that charging works, and a power rating does not prove a monitor configuration.` },
        { heading: "Include the cable, power budget and software", body: `The cable between laptop and dock is part of the connection. Check its documented data rate, video or Thunderbolt/USB4 support, and power rating against the function you need. A charge-only or lower-capability cable can reduce what works even when the laptop and dock support more. If the dock uses an external adapter, use the dock manual’s host power figure rather than the total adapter wattage as if all of it reached the computer.

Check required BIOS, firmware and operating-system drivers on the manufacturer’s support page and keep their version or publication date in the notes. A software prerequisite does not establish the port’s hardware capability. When a support table says a feature is unavailable on one configuration, preserve that exception rather than repeating a general marketing statement.` },
        { heading: "Build an evidence matrix and a confidence boundary", body: `For every requested function, record the exact source title, model or configuration covered, checked date, relevant statement and status: supported by documentation, limited, not supported, or not stated. Link to the laptop specification, dock manual or compatibility matrix, cable specification and display manual. A seller listing may help identify the model but should not override manufacturer support documentation.

If the documents disagree, do not average them. Keep both statements and ask the laptop or dock maker which applies to the exact serial or configuration. If the required port function is not documented, mark it unresolved. Do not claim that you tested the combination unless someone actually connected those devices and checked each output under the stated operating system.` },
        { heading: "Ask for a compatibility verdict, not a product ranking", body: `A bounded task can say: “Check whether this exact laptop model and configuration, this dock model, this host cable and these displays support the following requirements: extended display at the listed resolution and refresh rate, USB data, Ethernet and charging. First classify the dock’s display method as native GPU video or USB graphics/DisplayLink. For native video, verify host DP Alt Mode, Thunderbolt or USB4 video support. For USB graphics, verify the exact driver, operating system and model support. Use the laptop, dock, cable and display makers’ current support pages first. For each function, return the exact URL and model covered, state supported, limited, unsupported or not stated, and explain conflicts. Do not rank other docks, infer native video from the USB-C connector, contact a seller, place an order or claim a hands-on test. Stop with unresolved questions.”

Review the cited model numbers and confirm that the table describes the configuration you own or intend to buy. Microsoft’s [docking recommendations](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/docking) discuss both native alternate-mode video and indirect display over USB. Then confirm the exact laptop, dock, OS and driver in the manufacturers’ support material. If any required path is unspecified, ask the manufacturer before relying on it.` },
        { heading: "When to ask support or test the actual setup", body: `Get confirmation from the manufacturer when a model has several board, processor or regional variants, a spec page omits the USB-C port’s functions, a dock table lists exceptions, or the cable is not identified. If you already have the devices, test one requirement at a time: connect the supported power adapter, check that the operating system detects the dock, verify each screen’s resolution and refresh rate, transfer data, and inspect charging under load. Record device models, OS, firmware and cable.

That checklist describes a possible owner-run test; it is not a report that BrowserHub performed one. A successful connection on one setup would not establish compatibility across a model family. Keep documented support and observed results in separate columns.` }
      ],
      faq: [
        { question: "Does every USB-C port support a dock’s video output?", answer: "No for native GPU video: check for DP Alt Mode, Thunderbolt or documented USB4 video on the exact model. A USB graphics/DisplayLink dock may use USB data instead if the exact laptop, operating system and driver are supported; verify that path with the dock maker." },
        { question: "If the laptop charges from USB-C, will it charge through this dock?", answer: "Not necessarily. Confirm USB Power Delivery input on the laptop port and the dock’s host output and power limits." },
        { question: "Can an AI browser test compatibility?", answer: "It can compare published specifications. It cannot physically test a device combination unless a separate, real test is performed and documented." },
        { question: "Why do two monitors work at lower resolution?", answer: "The supported combination can depend on the laptop’s video path, dock bandwidth, display limits, cable and operating system. Check the exact simultaneous-display table." },
        { question: "What if the manual does not list my laptop?", answer: "Mark the capability unknown and ask the laptop or dock maker about the exact model and configuration before purchase or relying on it." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器核对笔记本与 USB-C 扩展坞是否兼容",
      description: "根据厂商的具体型号资料，核实一套笔记本、扩展坞、线缆和显示器组合能否支持所需功能。",
      category: "AI 浏览器指南",
      content: "USB-C 插头只能说明接口形状，不能证明笔记本接口能输出视频、通过扩展坞充电或支持扩展坞的全部功能。AI 浏览器可以把具体型号的资料整理成兼容性矩阵，但应以厂商规格和支持表为准。逐项核对所需功能，资料缺失就保留未知；网页摘要不是硬件测试。",
      sections: [
        { heading: "先写明具体设备和所需功能", body: `记录笔记本完整型号、代际，以及厂商支持页会区分的处理器或配置；同时记录扩展坞型号、主机线缆、显示器和操作系统。写清楚你需要什么：外接视频、指定数量和分辨率/刷新率的显示器、单线充电、网口、USB 速率、音频、唤醒或扩展坞电源键。

不要只问“这款 USB-C 扩展坞能不能用”。这句话把几种独立功能混在一起。电脑可能能传 USB 数据，却不能输出视频或充电。结论只适用于文档覆盖的具体型号和配置；产品系列名或接口外形都不够。` },
        { heading: "查笔记本接口写明支持什么", body: `打开笔记本厂商针对具体型号的规格页或支持页面，先判断扩展坞走哪种显示路径。若使用笔记本显卡的原生视频输出，查具体接口是否支持 DisplayPort Alt Mode、Thunderbolt 或文档明确的 USB4 视频，再核对显示器数量、分辨率和接口限制。“USB-C”只说明接口形状，不代表具备这些可选功能。

不要因为接口没有原生视频输出，就排除所有扩展坞。有些 USB 图形扩展坞（例如使用 DisplayLink 的型号）可通过普通 USB 数据连接传输显示数据，但前提是具体笔记本系统、驱动和扩展坞都支持。要核对厂商当前的驱动、操作系统和显示器限制表。资料没有说明时标未知；需要安装驱动不等于已经证明可以支持所需屏幕组合。

接口旁的标志可作为线索，但仍应查型号手册或技术规格。不要把不同处理器配置、地区型号、年份或扩展坞套装的结论直接套用过来。` },
        { heading: "查扩展坞主机端和显示限制", body: `扩展坞支持页应说明显示路径、主机协议、上行接口、电源适配器、主机充电输出、显示器组合，以及操作系统或驱动要求。使用笔记本显卡原生视频的扩展坞，需要兼容的主机视频模式和带宽。USB 图形或 DisplayLink 扩展坞有时可通过 USB 数据传输，不要求接口支持原生视频 Alt Mode；但必须由厂商支持这款笔记本、系统、驱动版本和显示器组合。两条路径不同，不能互相替代，也不能假设任意 USB 数据接口都能驱动所有这类扩展坞。

| 功能 | 笔记本证据 | 扩展坞与线缆证据 |
| --- | --- | --- |
| 原生显卡视频 | 具体接口支持 DP Alt Mode、Thunderbolt 或文档说明的 USB4 视频 | 扩展坞支持该主机模式并列出目标屏幕组合 |
| USB 图形视频 | 接口满足所需 USB 数据路径；系统和驱动有文档支持 | 厂商列出具体型号、驱动、系统和屏幕限制 |
| 充电 | 具体接口支持 USB Power Delivery 输入 | 扩展坞主机输出和适配器满足电脑要求 |
| 显示器数量 | 具体配置的显卡和接口限制 | 同时连接时的分辨率与刷新率表 |
| USB 数据 | 接口协议和速率 | 扩展坞端口与线缆都满足所需速率 |
| 网口或音频 | 操作系统和驱动支持 | 扩展坞支持的系统、驱动及设备规格 |

每一行都要独立核实。微软的扩展坞建议提到可以通过不支持 Alt Mode 的 USB 接口实现间接显示；这与显卡原生视频是不同路径，仍取决于具体实现和驱动。支持视频不代表能充电，标称功率也不代表一定支持目标显示组合。` },
        { heading: "把线缆、电源预算和软件也算进去", body: `笔记本与扩展坞之间的线缆也是连接的一部分。根据所需功能，核对线缆资料中的数据速率、视频或 Thunderbolt/USB4 支持以及供电能力。即使笔记本和扩展坞都支持某功能，低规格或仅充电线缆也可能限制结果。扩展坞使用外接电源时，应查说明书给主机的供电数字，不要把适配器总功率都当成能给电脑用的功率。

到厂商支持页确认所需 BIOS、固件和系统驱动，并在记录里保留版本或发布日期。软件前置条件不能证明接口硬件能力。如果支持表列出某些配置的例外，保留这项限制，不要只转述营销页上的笼统描述。` },
        { heading: "做证据矩阵，并写清结论边界", body: `对每个所需功能，记录来源标题、覆盖的型号或配置、查看日期、支持结论的原文和状态：文档支持、有限支持、不支持或未说明。链接到笔记本规格页、扩展坞手册或兼容表、线缆规格和显示器手册。零售页可帮助识别型号，但不应覆盖厂商支持资料。

资料有冲突时不要取平均。保留两条说法，并向笔记本或扩展坞厂商确认具体配置适用哪一条。必需接口能力未写明，就标为未解决。除非真的连接设备并按所述操作系统检查每项输出，否则不要写成已测试兼容。` },
        { heading: "要求给出兼容性判断，不要产品排名", body: `可以这样布置任务：“核对这款具体型号和配置的笔记本、这款扩展坞、这条主机线缆和这些显示器，能否满足指定分辨率与刷新率的扩展显示、USB 数据、网口和充电。先区分扩展坞使用显卡原生视频，还是 USB 图形/DisplayLink 路径。原生视频要确认主机支持 DP Alt Mode、Thunderbolt 或 USB4 视频；USB 图形要确认具体驱动、系统和型号均受支持。优先使用笔记本、扩展坞、线缆和显示器厂商当前的支持页。每项附网址和适用型号，判断为支持、有限支持、不支持或未说明，并解释冲突。不要排名其他扩展坞，不要仅凭 USB-C 接口推断原生视频支持，不要联系卖家、下单或声称实测。未解决的问题列出后停止。”

检查引用里的型号是否与你打算购买或已经拥有的设备完全一致。微软的[扩展坞建议](https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/docking)分别说明原生替代模式视频和 USB 间接显示；再核对具体笔记本、扩展坞、系统和驱动的厂商资料。关键显示路径未说明时，先问厂商。` },
        { heading: "何时联系支持人员或实际测试", body: `如果一个型号有多个主板、处理器或地区版本，规格页没写 USB-C 的功能，扩展坞兼容表列出例外，或线缆型号不明，应请厂商确认具体配置。已经拥有设备时，可以逐项测试：连接符合要求的电源，确认系统识别扩展坞，检查每台显示器的分辨率与刷新率，传输数据，并观察负载下的充电情况。记录设备型号、系统、固件和线缆。

这些是用户可自行执行的测试建议，不代表 BrowserHub 做过实验。某一套设备连接成功也不能证明整个产品系列都兼容。把文档支持与实际观察分开记录。` }
      ],
      faq: [
        { question: "每个 USB-C 接口都支持扩展坞视频输出吗？", answer: "若要用显卡原生视频，需查具体型号是否支持 DP Alt Mode、Thunderbolt 或文档说明的 USB4 视频。USB 图形/DisplayLink 扩展坞可能通过 USB 数据传输，但要确认笔记本、系统和驱动均受厂商支持。" },
        { question: "笔记本能用 USB-C 充电，就能通过这个扩展坞充电吗？", answer: "不一定。需要确认笔记本接口支持 USB Power Delivery 输入，以及扩展坞的主机输出和功率限制。" },
        { question: "AI 浏览器能测试硬件兼容吗？", answer: "它可以对照公开规格。除非另有真实测试并记录，否则不能声称实际连接验证过。" },
        { question: "为什么两台显示器只能用较低分辨率？", answer: "组合限制可能由电脑的视频路径、扩展坞带宽、显示器、线缆和操作系统共同决定。查具体型号的同时显示表。" },
        { question: "手册里没列我的笔记本型号怎么办？", answer: "把能力标为未知；购买或依赖该功能前，向笔记本或扩展坞厂商确认具体型号和配置。" }
      ]
    }
  },
  "ai-browser-audit-subscriptions-before-cancelling": {
    en: {
      title: "Use an AI Browser to Audit Subscriptions Before You Cancel",
      description: "Build a dated subscription inventory from provider and billing sources, compare renewal terms, and keep the final cancellation decision under human control.",
      category: "AI browser guides",
      content: "A subscription audit is easy to confuse with a cancellation task. An AI browser can organize the services you name, locate each provider’s official billing path and prepare a review table. It cannot know which service your household should keep, and a clicked cancellation button is not proof that future billing stopped. This workflow ends before the agent changes an account, payment method or plan.",
      sections: [
        { heading: "Start from records you choose to share", body: `Use a list you prepare from receipts or a statement you have reviewed. Include provider, plan name, approximate charge, billing frequency, last known renewal date, purchase channel and who owns the account. You can omit card numbers, full account numbers, login details and unrelated transactions. Do not give an agent your banking password, one-time code, full payment credential or financial statement if the tool does not have a suitable privacy boundary.

Separate your own recollection from the record: “I think this renews in December” is not the same as a dated invoice. Mark uncertain entries as estimates and check them against a receipt or the provider’s billing page yourself. If you share account screenshots, crop unrelated people, balances and transactions first.` },
        { heading: "Identify the platform that actually bills you", body: `A service can be purchased on its website, through Apple or Google, from a reseller or through a business workspace. The cancellation controls may live with the billing platform rather than inside the service. For each item, record where the latest receipt came from, the account or workspace that owns it, and the official instructions that describe cancellation. Do not assume that deleting an app, uninstalling a browser extension or closing a login cancels recurring billing.

When the subscription is missing from one account, check the purchase receipt and the store account used at signup. A similarly named charge or app does not prove it belongs to the same plan. Keep duplicate or unclear charges in a “needs review” group and contact the provider yourself through its official support route.` },
        { heading: "Make a dated inventory instead of asking AI to decide", body: `A review table helps you see what to verify. For each entry, include charge amount and currency, billing period, next renewal date, price after a promotion, cancellation deadline if stated, access-end date, refund language, owner and source URL. Then add your own usage notes and keep them visibly separate from provider facts. An agent should not infer low value from low recent use: someone else in the household may rely on the service, or it may include bundled benefits.

| Field | Source to check | Human decision |
| --- | --- | --- |
| Current plan and price | Receipt or provider billing page | Is this the plan you meant to review? |
| Billing channel | Receipt, app store or workspace invoice | Which account controls the renewal? |
| Next renewal | Provider or billing-platform page | Is the date current and in the right time zone? |
| Cancellation effect | Official help page and plan terms | When does access end and what is lost? |
| Refund or credit | Provider’s current policy | Is a separate request required? |
| Keep/change/cancel | Your household’s needs | Does anyone else rely on it? |

Do not add numbers from memory to the verified subtotal. Keep unknown dates, taxes and foreign-currency conversions visible instead of turning them into a precise “savings” total.` },
        { heading: "Check terms before preparing a cancellation", body: `Cancellation can stop future renewal without refunding a past charge; it can also end access immediately or at the end of the paid period. Provider policies differ. Read the official instructions for the channel that billed the subscription, the deadline before renewal, whether a refund is separate, and what happens to shared seats, stored data or bundled services. OpenAI’s help page, for example, routes cancellation differently for web, Apple, Google Play and self-service Business subscriptions; its current instructions also distinguish stopping renewal from a refund.

The agent can collect the official steps and make a short checklist for you. It should not open the final confirmation button, change a plan, start a refund request, delete an account or alter a payment method. If the page says “pause,” “downgrade,” “cancel” or “delete” as different actions, keep those options separate and do not choose for the account owner.` },
        { heading: "Treat confirmation as evidence, then verify billing status", body: `If you choose to cancel, do it yourself on the correct provider or store account and read each confirmation screen. Save the provider’s dated confirmation email or status page. A browser message saying “done,” a closed tab, a disabled button or an agent summary is not enough. Check the same account’s subscription status and the next statement or renewal notice when it arrives.

If the status is pending, the provider asks for another confirmation, or the wrong account is open, stop and contact the official support channel. Do not ask the agent to repeat the final action; repeated clicks can create confusion even when they do not create a second subscription. Keep any confirmation number private and remove it from a public draft or shared screenshot.` },
        { heading: "Give the browser a read-only assignment", body: `A safe instruction is: “Using the subscription names and the public help pages I provide, prepare a dated inventory. For each service, identify the official billing channel, exact plan name, renewal timing, cancellation deadline, effect on access, refund rule and source URL. Separate details found in my records from provider documentation and mark every missing or conflicting item unknown. Do not sign in, open billing controls, change a plan or payment method, cancel, request a refund, delete an account, send a message or share account details. Stop with a review table and questions for me.”

The user should review the sources and decide what to keep, change or cancel. If you later choose to make a change, carry it out as a separate human-approved task with the correct account open. For the difference between reading signed-in browser state and acting on it, see [browser agent tab access permissions](/en/guides/ai-browser-tab-access-permissions/).` },
        { heading: "Keep the audit small and current", body: `Start with a few services and a defined review date. The table is a snapshot, not an ongoing bank monitor. Renewal dates, prices, store interfaces and provider policies can change; revisit the official billing source before acting. Do not infer that an agent found every subscription from the few entries supplied. Charges can also come from family accounts, annual plans or services purchased under a different email.

An audit is complete when you can explain which entries are confirmed, which need a human check, and what each provider says will happen next. It is not complete merely because the agent produced a neat savings number or reached a cancellation page. Keep actual payment and account changes separate from the research record.` }
      ],
      faq: [
        { question: "Can the agent decide which subscriptions I should cancel?", answer: "No. It can organize documented facts and your own usage notes. The account owner or household decides what to keep, change or cancel." },
        { question: "Does uninstalling an app cancel the subscription?", answer: "Do not assume so. Check the provider or billing-platform instructions for the account that was charged." },
        { question: "Should the browser click the final cancel button?", answer: "This workflow is read-only and stops before account changes. Review the terms and make any authorized change yourself as a separate action." },
        { question: "Does cancellation automatically refund the last charge?", answer: "Not necessarily. Future renewal, access end and refund eligibility are separate terms; check the provider’s current policy." },
        { question: "How can I tell that cancellation succeeded?", answer: "Check the status on the account that billed you and retain the provider’s confirmation. A closed page or agent message alone is not proof." }
      ]
    },
    "zh-cn": {
      title: "用 AI 浏览器盘点订阅，再由你决定是否取消",
      description: "从服务商和账单来源整理带日期的订阅清单，核对续费条款，并由用户保留最终取消决定。",
      category: "AI 浏览器指南",
      content: "订阅盘点很容易和取消操作混在一起。AI 浏览器可以整理你提供的服务名称、查找官方账单入口并准备复核表，但它不知道家庭应该保留哪些服务；点过取消也不代表未来扣费一定停止。本文流程停在账户变更之前。",
      sections: [
        { heading: "从你挑选的记录开始", body: `根据自己已检查过的收据或账单列清单，包括服务商、套餐名、大致金额、扣费周期、已知续费日期、购买渠道和账户所有者。可以去掉卡号、完整账户编号、登录信息和无关交易。不要向没有合适隐私边界的工具提供网银密码、短信验证码、完整支付凭证或整份财务账单。

把记忆和账单记录分开：“我记得大概十二月续费”不等于带日期的发票。先将不确定项标为估计，再自行对照收据或服务商账单页。若分享截图，先裁掉无关人员、余额和其他交易。` },
        { heading: "确认实际扣费的平台", body: `服务可能通过官网、Apple 或 Google、经销商或企业工作区购买。取消入口未必在服务本身的设置里。每项都记录最近收据来自哪里、哪个账户或工作区持有订阅，以及描述取消方式的官方说明。不要假设删除应用、卸载扩展或退出登录就能停止续费。

在某个账户里找不到订阅时，先查看购买收据和注册时使用的商店账户。名称相似的扣款或应用不能证明套餐相同。重复或说不清的扣费放入“待核对”，通过服务商官网上的支持渠道自行联系。` },
        { heading: "建立有日期的清单，不让 AI 替你决定", body: `每项可记录金额和币种、扣费周期、下次续费日、优惠结束后的价格、页面列出的取消期限、使用权结束时间、退款说明、账户所有者和来源网址，再另列你自己的使用情况。自己的使用记录与服务商事实分开呈现。不要仅因近期使用少就推断没有价值；家庭成员可能依赖该服务，也可能包含其他权益。

| 字段 | 核对来源 | 由人作出的决定 |
| --- | --- | --- |
| 当前套餐和价格 | 收据或服务商账单页 | 这是否是要复核的套餐？ |
| 扣费渠道 | 收据、应用商店或工作区账单 | 哪个账户控制续费？ |
| 下次续费 | 服务商或账单平台页面 | 日期是否最新、时区是否正确？ |
| 取消影响 | 官方帮助页和套餐条款 | 使用权何时结束、会失去什么？ |
| 退款或抵扣 | 服务商当前政策 | 是否需要另行申请？ |
| 保留/更改/取消 | 家庭实际需要 | 是否有人仍在使用？ |

不要把记忆中的金额计入已核实小计。未知日期、税费和汇率要保留为未知，不能拼成精确的“省钱金额”。` },
        { heading: "准备取消前先读清条款", body: `取消可能只停止未来续费，不退还已扣款；也可能让使用权立即结束或持续到付费周期末。各服务政策不同。查看实际扣费渠道的官方说明、续费前的处理期限、退款是否需单独申请，以及共享席位、存储数据或捆绑权益会怎样变化。例如 OpenAI 帮助页按官网、Apple、Google Play 和自助式 Business 订阅区分取消路径，也把停止续费与退款分别说明。

智能体可以收集官方步骤并整理成待办清单，但不应点最后的确认按钮、改套餐、申请退款、删除账户或修改支付方式。页面把“暂停”“降级”“取消”和“删除”列为不同操作时，应分别记录，不要替账户所有者选择。` },
        { heading: "把确认记录当证据，再核实扣费状态", body: `如果你决定取消，应在正确的服务商或商店账户中自行操作，并阅读每个确认页面。保留服务商带日期的确认邮件或状态页。浏览器显示“完成”、页面关闭、按钮变灰或智能体总结，都不足以证明取消成功。查看同一账户的订阅状态，并在下一份账单或续费提醒到来时复核。

若状态仍是待处理、服务商要求再次确认，或当前打开了错误账户，就先停止并通过官方渠道联系支持。不要让智能体重复点击最终操作；即使没有创建第二份订阅，重复动作也会让状态更难判断。确认编号应保密，不要放进公开草稿或共享截图。` },
        { heading: "给浏览器一项只读任务", body: `可以这样要求：“根据我提供的订阅名称和公开帮助页，整理一份带日期的清单。每项识别官方扣费渠道、准确套餐名、续费时间、取消期限、使用权影响、退款规则和来源网址。把我的记录和服务商资料分开，缺失或冲突都标未知。不要登录、打开账单控制项、改套餐或支付方式、取消、申请退款、删除账户、发送消息或分享账户资料。完成复核表和待确认问题后停止。”

用户应检查来源，再决定保留、更改或取消。如果之后确实要变更，应作为单独的人为授权任务，在正确账户中处理。关于读取已登录浏览器状态与采取操作的差别，可看[浏览器智能体标签页访问权限指南](/zh-cn/guides/ai-browser-tab-access-permissions/)。` },
        { heading: "让清单保持小而新", body: `先挑几项订阅，并定一个复核日期。表格只是某一天的快照，不是持续监控银行账户的工具。续费日、价格、商店界面和服务条款可能变化；操作前重新打开官方账单来源。不要根据用户提供的几项就推断智能体已找齐所有订阅。扣款还可能来自家庭账户、年付套餐或另一个邮箱注册的服务。交给家人复核前，再检查币种、账期、来源日期和未确认项目，避免把估算当成实际扣款。

当你能说清哪些项目已确认、哪些要人工核实，以及服务商说明了什么后续结果时，这次盘点才算完成。智能体给出整齐的省钱数字或打开取消页面，并不代表盘点完成。实际付款和账户变更应与资料整理分开。` }
      ],
      faq: [
        { question: "可以让智能体决定该取消哪些订阅吗？", answer: "不可以。它能整理有来源的事实和你的使用记录；由账户所有者或家庭决定保留、更改还是取消。" },
        { question: "卸载应用会取消订阅吗？", answer: "不要这样假设。要查看实际扣费账户或账单平台的官方说明。" },
        { question: "应该让浏览器点最后的取消按钮吗？", answer: "本文只读流程停在账户变更前。审阅条款后，由你将授权变更作为单独操作完成。" },
        { question: "取消会自动退回最近一次扣款吗？", answer: "不一定。停止续费、使用权结束和退款资格是不同条款，应查看服务商当前政策。" },
        { question: "如何确认订阅取消成功？", answer: "到实际扣费的账户查看状态并保留服务商确认。仅凭页面关闭或智能体消息不能证明成功。" }
      ]
    }
  },
  "playwright-test-spa-history-back-forward": {
    en: {
      title: "Test SPA History, Back and Forward with Playwright",
      description: "Exercise real client-side route changes and assert both the URL and settled visible state after pushState, popstate, back and forward actions.",
      category: "AI browser guides",
      content: "A single-page application can change its address bar without loading a new document. A test that checks only the URL can pass while the old screen remains visible, and a full page visit does not exercise the user’s in-app route transition. Start from a known history entry, use the same control a person uses, then verify both the destination URL and the settled page state. Treat a timeout as a clue about which event or application state was actually expected.",
      sections: [
        { heading: "Separate document navigation from an SPA route change", body: `A document navigation requests another page. A client-side router can instead push or replace an entry in the browser history and render a new view inside the current document. The address may update immediately while route data, loading indicators, guards or the visible component are still changing. Playwright’s navigation guide distinguishes these states and its tests include same-document history cases.

For a route test, avoid using page.goto(targetUrl) as the only setup if the bug appears when a person clicks between views. Direct loading is a useful separate check for deep links and server fallback. It does not prove that the router handles a click, preserves state or responds to browser back and forward.` },
        { heading: "Start with a known route and a real history stack", body: `Load the starting view through the application, then click a visible link or button that uses the router. Give each view a stable, user-visible marker such as a page heading, selected filter or item title. Before using back, ensure the test has created the history entry it expects. A component mounted directly at a route may not have a previous application route; a back action can leave the app or do nothing useful.

React Router warns that numeric navigation can go somewhere unexpected when the history stack has no entry. The same concern applies to a product’s own Back button. Seed the path through the actual user flow, or use a test fixture with an explicit initial history list when you are testing a component rather than the browser history.` },
        { heading: "Assert the URL and the rendered state together", body: `After a click, assert the URL pattern and a route-specific visible state. A URL assertion answers “where does the address point?” A heading, selected tab or result assertion answers “what did the application render?” Neither substitutes for the other. If the view includes asynchronous data, wait for the application’s meaningful ready condition, such as the loading message disappearing and the expected result becoming visible.

| Transition | Address assertion | Settled state assertion |
| --- | --- | --- |
| Link to a detail view | Detail path and expected item ID | Matching title or record appears |
| Filter or tab change | Query, hash or route reflects the choice | Selected control and matching results appear |
| Browser back | Previous route is restored | Previous view and relevant filter state return |
| Browser forward | Next route is restored | Next view and its record appear |
| Guard or redirect | Final route matches the app contract | Login, error or destination view is visible |

If the URL changes but the visible marker does not, investigate route data, rendering, hydration and guards. Do not add a fixed sleep to make the assertion pass; it does not identify which application condition was missing.` },
        { heading: "Wait for the right signal without losing fast transitions", body: `For a locator click followed by a web-first URL assertion, Playwright can wait for the address condition. When you need to capture an event emitted during the action, register the wait before clicking, often by starting the wait and click together. An event that is installed only after a fast click may already have fired. Then assert the visible route state separately.

Some applications can expose a router completion signal, but it must correspond to the view being ready, not merely to pushState. If you do not control the application, prefer an observable user-facing state: the new heading, a specific result, a selected filter, or the disappearance of a pending marker. A network response can explain data arrival but does not prove that the UI rendered it. Persistent polling can also make network-idle a poor readiness condition.` },
        { heading: "Exercise back and forward after real route transitions", body: `Create at least two in-app history entries, check each state, call page.goBack(), and then assert the previous URL and visible view. Call page.goForward() and verify the second URL and view return. Include state that a user expects to survive, such as a filter or list position, only when that behavior is part of the application contract. Do not assert internal history.state values unless your product intentionally owns that serialization format.

Also test refresh and direct entry as separate cases if deep links are supported. A route that works only after navigating from the home page can indicate a server rewrite problem. A route that loads directly but fails after back may indicate a client router restoration defect. A test should name which user path it covers so a future failure is actionable.` },
        { heading: "Keep browser history limitations in view", body: `Playwright’s current navigation guide says back-forward cache restoration testing is not supported; forcing BFCache behavior can bypass lifecycle signals that Playwright uses to track a page. Do not make BFCache restoration a required assertion in a routine SPA route test. That does not prevent testing ordinary client-side back and forward behavior in the supported setup.

When a test times out, inspect the trace for the action, URL, visible DOM and request activity at the failure point. If only the route marker is late, wait on the app state. If the URL never changed, check the link, router or browser event. If the prior view returns but filter state is gone, decide whether the intended behavior is to restore it and encode that contract explicitly.` },
        { heading: "Run the fixture, then adapt the assertions", body: `Download [playwright-spa-history-api-retry.mjs](/templates/playwright-spa-history-api-retry.mjs) and save it in a working directory with that exact filename. The fixture requires Node.js 22 or newer, the Playwright Node package, and an installed Chromium browser. The recorded root run used Node.js 22.22.3, Playwright 1.64.1, and Chromium 156.0.8078.76.

Use one command per step:

- Optional when Node cannot resolve the installed package: export PLAYWRIGHT_MODULE_URL=file:///absolute/path/to/node_modules/playwright/index.mjs
- Optional when Playwright cannot find the installed browser: export CHROME_EXECUTABLE_PATH=/absolute/path/to/chromium
- Run from the directory containing the saved file: node playwright-spa-history-api-retry.mjs

The fixture opens a fresh disposable Chromium process without a profile-directory override. It checks a direct deep link, then two in-app pushState transitions, two back steps, and two forward steps. Every transition checks both pathname and visible heading. In the maintainer’s recorded run of these exact bytes on 2 November 2026, the fixture passed once. It observed the deep link and all six URL-and-heading checks; the GET reset case used two local requests and returned 200, while the HTTP 500 case used one request. This is one synthetic run, not an evaluation of React Router, another production app, a real website, POST behavior, or physical/browser-background traffic. Page routing is limited to the exact loopback origin and the API calls use fixed loopback URLs; browser-background and physical network traffic were not audited. The script closes its contexts, browser and local server in cleanup code. Adapt the two-part assertions to your application's own controls and state before relying on them.` }
      ],
      faq: [
        { question: "Does waitForURL prove the new SPA screen is ready?", answer: "No. It confirms the URL condition. Also assert a route-specific visible state or the application’s documented ready condition." },
        { question: "Should the test use page.goto for every route?", answer: "Use direct navigation for deep-link behavior. Use in-app controls for transitions that users reach through the router, then test browser history separately." },
        { question: "Why can page.goBack leave the application?", answer: "The current history stack may not contain the previous route you expected. Create a known path first or use an explicit history fixture." },
        { question: "Can I wait for networkidle after every click?", answer: "That may not represent the app being ready, especially with polling or persistent connections. Prefer an observable state the user expects." },
        { question: "Should I assert BFCache restoration?", answer: "Playwright’s current navigation docs say BFCache restoration testing is unsupported. Test ordinary SPA history behavior without forcing BFCache." }
      ]
    },
    "zh-cn": {
      title: "用 Playwright 测试 SPA 路由与前进、后退",
      description: "触发真实的客户端路由变化，并在 pushState、popstate、后退和前进后同时断言网址与稳定的可见页面状态。",
      category: "AI 浏览器指南",
      content: "单页应用可以只改变地址栏而不加载新文档。若测试只检查网址，旧页面仍可能留在屏幕上；直接访问完整页面也不能覆盖用户在应用内切换路由的过程。先建立已知的历史记录，再使用用户实际会用的控件，最后同时核对目标网址和稳定后的页面状态。超时应帮助你判断真正缺少了哪个事件或状态。",
      sections: [
        { heading: "区分文档导航和 SPA 路由变化", body: `文档导航会请求另一个页面。客户端路由器也可以在当前文档中用 push 或 replace 修改浏览器历史，再渲染新的视图。地址可能已经变化，路由数据、加载状态、权限判断或可见组件却还在更新。Playwright 导航文档区分这些状态，官方测试也包含同文档历史变化。

如果问题发生在用户点击不同视图时，不要只用 page.goto(目标网址) 来覆盖整个路由测试。直接访问是深层链接和服务端回退的独立检查，不能证明应用能处理点击、保留状态或响应后退和前进。` },
        { heading: "从已知路由和真实历史栈开始", body: `通过应用加载起始视图，再点击会触发路由器的可见链接或按钮。给每个视图一个稳定且用户可见的标记，例如页面标题、选中的筛选条件或记录名称。使用后退前，要先建立测试预期的历史条目。如果组件直接从某个路由挂载，前面可能没有应用内页面；后退可能离开应用或无法得到预期视图。

React Router 提醒，历史栈没有上一项时，数字形式的导航可能去到意料之外的位置。产品自己的“返回”按钮也有同样风险。通过真实用户流程建立路径；如果是在测组件而非浏览器历史，则使用明确的初始历史列表。` },
        { heading: "同时断言网址和渲染结果", body: `点击后既要检查网址模式，也要检查该路由特有的可见状态。网址回答“地址指向哪里”，标题、选中标签或结果回答“应用渲染了什么”。两者不能互相替代。若视图包含异步数据，应等待应用真正可见的就绪状态，例如加载提示消失且预期结果出现。

| 路由变化 | 地址断言 | 稳定状态断言 |
| --- | --- | --- |
| 打开详情页 | 详情路径和预期记录 ID | 对应标题或记录出现 |
| 切换筛选或标签 | 查询参数、hash 或路由更新 | 控件选中且结果匹配 |
| 浏览器后退 | 恢复前一个路由 | 前一视图和相关筛选恢复 |
| 浏览器前进 | 恢复后一个路由 | 后一视图和记录重新出现 |
| 权限判断或重定向 | 最终地址符合应用约定 | 登录、错误或目标视图可见 |

网址变化但可见标记没变时，检查路由数据、渲染、水合和权限处理。不要添加固定休眠时间来让测试变绿；那无法指出缺少的是哪种应用状态。` },
        { heading: "等待正确信号，也要避免漏掉快速变化", body: `点击定位器后再做网页优先的网址断言时，Playwright 可以等待地址满足条件。如果需要捕获动作期间发出的事件，应在点击前注册等待，通常把等待和点击并行启动。点击完成后才装上的监听器，可能已经错过快速触发的事件。之后仍需单独断言可见路由状态。

应用可以提供路由完成信号，但它必须代表页面已就绪，而不只是 pushState 已执行。如果无法修改应用，优先等待可观察的用户状态，例如新标题、目标结果、选中的筛选，或待处理提示消失。响应到达只能说明数据返回，不能证明界面已渲染。持续轮询也会让 network-idle 不适合作为页面就绪条件。` },
        { heading: "在真实路由变化后检查后退和前进", body: `先创建至少两个应用内历史条目，逐个检查状态，再调用 page.goBack()，同时断言旧网址和旧视图。接着调用 page.goForward()，确认第二个网址和视图恢复。只有筛选项或列表位置确实属于应用约定时，才把它们列为状态恢复断言。除非产品明确负责序列化格式，否则不要依赖内部 history.state 值。

如果产品支持深层链接，再把刷新和直接访问做成独立用例。页面只能从首页导航后工作，可能是服务端重写有问题；页面直接打开正常、后退失败，则可能是客户端路由恢复缺陷。每个测试都应写明覆盖哪条用户路径，失败才便于排查。` },
        { heading: "注意浏览器历史的测试边界", body: `Playwright 当前导航文档说明不支持测试 back-forward cache 恢复；强制触发 BFCache 会绕过 Playwright 用于跟踪页面的生命周期信号。常规 SPA 路由测试不要把 BFCache 恢复设为必过断言。这不影响在受支持环境中测试普通客户端前进、后退行为。

测试超时时，从 trace 查看失败时执行的操作、网址、可见 DOM 和请求。如果只缺少路由标记，等待应用状态；网址没变，检查链接、路由器或浏览器事件；前一视图恢复但筛选丢失，则先确定产品是否要求恢复，再明确写进断言。` },
        { heading: "运行夹具，再调整断言", body: `下载 [playwright-spa-history-api-retry.mjs](/templates/playwright-spa-history-api-retry.mjs)，保存到工作目录并保持这个准确文件名。夹具需要 Node.js 22 或更高版本、Playwright Node 模块和已安装的 Chromium。项目维护者在 2026 年 11 月 2 日记录的一次运行使用 Node.js 22.22.3、Playwright 1.64.1 和 Chromium 156.0.8078.76。

每步单独运行一条命令：

- 若 Node 无法解析已安装的模块，可选设置：export PLAYWRIGHT_MODULE_URL=file:///absolute/path/to/node_modules/playwright/index.mjs
- 若 Playwright 找不到已安装浏览器，可选设置：export CHROME_EXECUTABLE_PATH=/absolute/path/to/chromium
- 在保存文件的目录运行：node playwright-spa-history-api-retry.mjs

脚本启动全新的临时 Chromium，不覆盖用户资料目录。它先检查一个直接深层链接，再执行两次应用内 pushState、两次后退和两次前进；每次都同时检查路径和可见标题。项目维护者在 2026 年 11 月 2 日对这份确切文件运行一次并通过：深层链接及六次网址/标题检查均符合预期；连接重置 GET 共发两次后返回 200，HTTP 500 GET 只发一次。这只是本地合成夹具的一次运行，不代表 React Router、其他生产应用、真实网站、POST 行为或物理/浏览器后台网络流量已测试。页面请求只路由到精确的回环来源，API 使用固定回环网址；没有审计浏览器后台或物理网络流量。脚本在清理步骤中关闭浏览器上下文、浏览器和本地服务。把这两类断言改用到真实应用控件和状态后再依赖结果。` }
      ],
      faq: [
        { question: "waitForURL 能证明 SPA 新页面已经就绪吗？", answer: "不能。它只确认网址条件。还要断言该路由特有的可见状态或应用文档化的就绪条件。" },
        { question: "每个路由都应该用 page.goto 吗？", answer: "深层链接可以单独直接访问。用户通过路由器进入的视图应通过应用控件切换，并另外测试浏览器历史。" },
        { question: "为什么 page.goBack 会离开应用？", answer: "当前历史栈可能没有预想中的前一个应用内路由。先建立已知路径，或使用明确的历史夹具。" },
        { question: "每次点击后都等 networkidle 可以吗？", answer: "它未必代表应用就绪，特别是存在轮询或持续连接时。应等待用户需要看到的可观察状态。" },
        { question: "应该断言 BFCache 恢复吗？", answer: "Playwright 当前导航文档称不支持测试 BFCache 恢复。不要强制它；测试普通 SPA 历史行为即可。" }
      ]
    }
  },
  "playwright-api-request-context-econnreset-retries": {
    en: {
      title: "Handle ECONNRESET Retries with Playwright APIRequestContext",
      description: "Understand the narrow maxRetries behavior, separate a connection reset from an HTTP error response, and keep retries away from unsafe write operations.",
      category: "AI browser guides",
      content: "A Playwright API request can fail with ECONNRESET before it receives an HTTP response. APIRequestContext exposes maxRetries for a narrow case: the current documentation says ECONNRESET is retried when the limit is above zero, while HTTP status codes are not retry triggers and the default is zero. This is not the same setting as Playwright Test’s retry count. Use it deliberately, keep the test endpoint local and read-only, and inspect the response status separately.",
      sections: [
        { heading: "Identify which retry mechanism you mean", body: `Playwright has a Test runner retry setting for rerunning a failed test. APIRequestContext has a request option named maxRetries for certain network errors while making one request. They operate at different levels: a test retry can repeat setup and assertions; a request retry tries the API call again. Confusing the two can multiply requests or hide a test that failed for another reason.

The official API reference says maxRetries was added in v1.46, defaults to 0, and currently retries only ECONNRESET. It does not retry based on HTTP response codes. Check the installed Playwright version and the current language-specific API reference before using the option; do not infer support from a copied example written for another version.` },
        { heading: "Distinguish a reset from an HTTP response", body: `A connection reset means the request did not complete as a normal HTTP exchange. There may be no response status to inspect. By contrast, a server response such as 429, 500 or 503 is still an HTTP response; maxRetries does not retry it simply because the status is unsuccessful. Read the response status and body, then decide what the application contract requires.

| Observation | What it means for maxRetries | Next check |
| --- | --- | --- |
| ECONNRESET before a response | Eligible for the configured narrow retry | Is the request read-only and is the reset reproducible? |
| HTTP 500 response | A response arrived; status alone does not trigger maxRetries | Inspect service error and expected test behavior |
| HTTP 429 response | Rate-limit response, not ECONNRESET | Check quota, request pacing and retry-after contract |
| Timeout or DNS error | Not documented as this option’s retry case | Check timeout, resolver, endpoint and network path |
| Test assertion failure | Test runner failure, not an API transport retry | Inspect actual result and assertion |

Do not treat “request failed” as one error class. A status code, transport exception, timeout and UI assertion require different diagnosis.` },
        { heading: "Keep the first example idempotent and local", body: `Start with a local GET endpoint that returns a small JSON response. Set maxRetries to 1 for that request and print the final status and body. A bounded fixture can close the first connection without sending an HTTP response, then answer the next GET. This illustrates the transport option without relying on a public service, real account, database write or rate limit.

The example’s retry counter belongs only to the local fixture. It does not model a production server’s application state, network intermediaries or every platform’s socket behavior. A successful second response shows that this test setup exercised the documented option; it is not evidence that all ECONNRESET failures are transient or safe to retry.` },
        { heading: "Do not replay writes just because the connection reset", body: `A reset does not tell the client whether the server performed a side effect before the connection was lost. For a POST that creates a payment, order, message or record, the server might commit the operation and then lose the response. Sending it again can create a duplicate. This article’s fixture is GET-only and makes no claim that automatically replaying a POST is safe.

If an application must retry a write, design that behavior explicitly with the API owner. A documented idempotency key, a lookup that confirms prior completion, or a transaction protocol may help, depending on the service contract. Do not add maxRetries to every request method without reviewing side effects. HTTP status responses also need a deliberate policy; this option does not provide status-based backoff.` },
        { heading: "Diagnose repeated resets before increasing the limit", body: `Look at the request URL, method, timing, server logs, proxy path, keep-alive behavior and the exact exception. A repeatable reset after a server closes an idle connection may have a different cause from a service outage. Playwright issue reports describe particular versions and environments; use them as examples of failure modes, not as proof that your run has the same bug.

The maxRetries value is a ceiling, not a diagnosis. Raising it can extend a test and obscure a deterministic server problem. Start with the smallest limit that demonstrates the behavior, log each local fixture request, and preserve a failing case with the default of zero. If the request keeps resetting after the limit, let the error surface and repair the endpoint or test environment.` },
        { heading: "Keep response and context cleanup explicit", body: `APIRequestContext retains response bodies so they can be read later. Dispose a standalone request context when the work is finished, especially in a loop that creates many contexts. If the context is owned by a browser context, follow the ownership and disposal behavior in the API documentation rather than disposing a shared object unexpectedly.

Check whether failOnStatusCode is enabled before assuming a response will throw. A 4xx or 5xx may be returned as an API response unless the configured behavior says otherwise. Assert the status you expect and read the body you need. Do not log secrets or full account data while investigating errors.` },
        { heading: "Run the local GET example and read its limits", body: `Download [playwright-spa-history-api-retry.mjs](/templates/playwright-spa-history-api-retry.mjs) and save it in a working directory with that exact filename. It requires Node.js 22 or newer, the Playwright Node package, and an installed Chromium browser. The exact fixture run recorded on 2 November 2026 used Node.js 22.22.3, Playwright 1.64.1, and Chromium 156.0.8078.76.

Run one command per step:

- Optional when Node cannot resolve the installed package: export PLAYWRIGHT_MODULE_URL=file:///absolute/path/to/node_modules/playwright/index.mjs
- Optional when Playwright cannot find the installed browser: export CHROME_EXECUTABLE_PATH=/absolute/path/to/chromium
- Run from the directory containing the saved file: node playwright-spa-history-api-retry.mjs

The script starts a synthetic server on 127.0.0.1, launches a fresh disposable Chromium process without a profile-directory override, blocks page requests outside the exact temporary origin, blocks Service Workers, and closes its contexts, browser and local server during cleanup. Its API portion sends GET to a fixed loopback URL: the server closes the first connection without an HTTP response, then returns JSON. With maxRetries set to 1, the test observes two requests and a 200 response. A second GET returns HTTP 500 once, showing that the response status alone does not trigger this retry option.

A maintainer ran these exact bytes once on 2 November 2026; the fixture passed: the SPA deep link and six path-plus-heading checks passed; the reset GET returned 200 after two requests, and the HTTP 500 GET was sent once. This is evidence for one local synthetic run only. It does not test a production backend, real application or framework, POST/replay behavior, external site access, or physical/browser-background traffic. Page routing is limited to the exact loopback origin and the API uses fixed loopback URLs; background and physical traffic were not audited. Running node --check checks syntax only and does not execute the fixture. If launch fails, check the Playwright module and browser paths; if the GET fails, confirm the installed version supports maxRetries and inspect the error before changing the retry limit.` }
      ],
      faq: [
        { question: "Does maxRetries retry every network failure?", answer: "No. The current API reference says it retries ECONNRESET only; the default is zero retries." },
        { question: "Will it retry HTTP 500 or 429 responses?", answer: "No. Those are HTTP responses, and status codes do not trigger this option’s retry behavior." },
        { question: "Is maxRetries the same as Playwright Test retries?", answer: "No. One retries a narrow API transport error; the other reruns a failed test." },
        { question: "Is it safe to retry a POST after ECONNRESET?", answer: "Do not assume so. The server may have performed the side effect before the connection was lost. This fixture uses GET only." },
        { question: "Does the fixture prove my backend is reliable?", answer: "No. It exercises a synthetic local endpoint and one bounded condition. It does not measure a production service or general network reliability." }
      ]
    },
    "zh-cn": {
      title: "用 Playwright APIRequestContext 处理 ECONNRESET 重试",
      description: "了解 maxRetries 的适用范围，区分连接重置与 HTTP 错误响应，并避免对不安全的写操作盲目重试。",
      category: "AI 浏览器指南",
      content: "Playwright API 请求可能在收到 HTTP 响应前遇到 ECONNRESET。APIRequestContext 的 maxRetries 只覆盖有限情况：当前文档说明配置次数大于零时会重试 ECONNRESET，但 HTTP 状态码不是重试条件，默认值为零。这与 Playwright Test 的失败用例重跑不是一回事。应有意配置，先用本地只读接口，并单独检查响应状态。",
      sections: [
        { heading: "先分清要配置哪一种重试", body: `Playwright 有用于重跑失败测试的 Test runner 重试设置。APIRequestContext 另有 maxRetries 请求选项，用于发送单次请求时处理某些网络错误。两者层级不同：测试重试可能重复执行准备工作和断言；请求重试是再次发起 API 调用。混淆两者会让请求次数成倍增加，也可能掩盖其他失败原因。

官方 API 参考说明 maxRetries 从 v1.46 开始提供，默认值是 0，目前只重试 ECONNRESET，并且不会按 HTTP 响应码重试。使用前核对项目实际安装的 Playwright 版本和当前语言的 API 参考；不要从其他版本的复制代码推断本地支持情况。` },
        { heading: "区分连接重置和 HTTP 响应", body: `连接重置表示请求没有完成正常的 HTTP 往返，可能根本没有可读取的状态码。相对地，服务器返回 429、500 或 503 时，HTTP 响应已经到达；不能仅因状态不成功就指望 maxRetries 重试。应读取状态和响应体，再按应用接口约定处理。

| 观察到的情况 | 对 maxRetries 的含义 | 下一步检查 |
| --- | --- | --- |
| 收到响应前 ECONNRESET | 属于此选项可处理的有限重试条件 | 请求是否只读，重置能否复现？ |
| HTTP 500 响应 | 已收到响应，状态码本身不触发重试 | 检查服务错误和测试预期 |
| HTTP 429 响应 | 限流响应，不是 ECONNRESET | 查看配额、请求频率和 Retry-After 约定 |
| 超时或 DNS 错误 | 当前文档没有将其列为此选项的重试范围 | 检查超时、解析器、地址和网络路径 |
| 测试断言失败 | 测试用例失败，不是 API 传输重试 | 检查实际结果和断言 |

不要把所有“请求失败”都当成同一种错误。状态码、传输异常、超时和界面断言需要不同的诊断。` },
        { heading: "先使用本地、只读且可安全重复的 GET", body: `从本机 GET 接口开始，让它返回一小段 JSON。为该请求设 maxRetries 为 1，并输出最终状态和响应体。一个有界夹具可以在首次请求时关闭连接且不发送 HTTP 响应，再对下一次 GET 返回数据。这样能展示传输选项，不依赖公共服务、真实账户、数据库写入或外部限流。

重试计数只属于本地合成夹具，不代表生产服务的应用状态、中间网络设备或所有平台的套接字行为。第二次得到响应，只说明本测试设置触发了文档所述选项；不能证明所有 ECONNRESET 都是暂时的或可以安全重试。` },
        { heading: "连接重置后不要默认重放写操作", body: `连接重置并不能告诉客户端：连接断开前服务器是否已经执行副作用。对创建付款、订单、消息或记录的 POST，服务器可能已经提交操作，只是在回复时断开。再次发送可能造成重复。本文夹具只发 GET，不声称自动重放 POST 安全。

如果应用必须重试写操作，应和 API 所有者共同明确设计。视服务约定而定，文档化的幂等键、查询此前是否已完成，或事务协议可能有帮助。不要未检查副作用就给所有 HTTP 方法配置 maxRetries。对 HTTP 状态响应也要制定单独策略；此选项不提供按状态码退避重试。` },
        { heading: "增加次数前先查明连接为什么重置", body: `查看请求网址和方法、发生时间、服务日志、代理路径、keep-alive 行为及具体异常。服务器关闭空闲连接后出现的可重复重置，原因可能与服务停机不同。Playwright issue 描述特定版本和环境，只能作为故障类型的例子，不能证明你的运行遇到了同一个缺陷。

maxRetries 是次数上限，不是故障诊断。调大它可能拉长测试，也可能掩盖确定性的服务问题。先使用最小次数验证现象，记录本地夹具的每次请求，同时保留默认零次重试时的失败情况。超过上限仍持续重置时，应让异常显示出来并修复接口或测试环境。` },
        { heading: "明确响应读取和上下文清理", body: `APIRequestContext 会保留响应体，供后续读取。独立创建的请求上下文用完后应释放，特别是在循环中创建许多上下文时。如果上下文由浏览器上下文持有，应按 API 文档中的所有权和释放规则处理，不要意外释放共享对象。

在假设状态码会抛异常前，先检查是否启用了 failOnStatusCode。除非配置另有约定，4xx 或 5xx 可能作为 API 响应返回。断言预期状态并读取需要的响应体。排查时不要记录密钥或完整账户数据。` },
        { heading: "运行本地 GET 示例并理解限制", body: `下载 [playwright-spa-history-api-retry.mjs](/templates/playwright-spa-history-api-retry.mjs)，保存到工作目录并保持这个准确文件名。运行需要 Node.js 22 或更高版本、Playwright Node 模块和已安装的 Chromium。2026 年 11 月 2 日记录的确切夹具运行使用 Node.js 22.22.3、Playwright 1.64.1 和 Chromium 156.0.8078.76。

每步单独运行一条命令：

- 若 Node 无法解析已安装模块，可选设置：export PLAYWRIGHT_MODULE_URL=file:///absolute/path/to/node_modules/playwright/index.mjs
- 若 Playwright 找不到已安装浏览器，可选设置：export CHROME_EXECUTABLE_PATH=/absolute/path/to/chromium
- 在保存文件的目录运行：node playwright-spa-history-api-retry.mjs

脚本在 127.0.0.1 启动合成服务，打开全新的临时 Chromium，不覆盖用户资料目录，阻止精确临时来源以外的页面请求和 Service Worker，并在清理时关闭浏览器上下文、浏览器和本地服务。API 部分对固定回环网址发 GET：第一次连接被关闭且没有 HTTP 响应，下一次返回 JSON。maxRetries 设为 1，观察到两次请求后得到 200；另一个 GET 只请求一次并收到 HTTP 500，说明状态响应本身不会触发这个重试选项。

项目维护者在 2026 年 11 月 2 日对这份确切文件运行一次并通过：SPA 深层链接和六次网址加标题检查均通过；连接重置 GET 两次后返回 200，HTTP 500 GET 只发一次。这只是本地合成夹具的一次结果，不代表生产后端、真实应用或框架、POST 重放行为、外部网站或物理/浏览器后台流量已测试。页面只允许精确回环来源，API 使用固定回环网址；后台和物理流量未审计。node --check 只检查语法，不会运行夹具。若启动失败，检查 Playwright 模块和浏览器路径；若 GET 失败，确认版本支持 maxRetries 并先查看异常，不要先增加重试次数。` }
      ],
      faq: [
        { question: "maxRetries 会重试每种网络故障吗？", answer: "不会。当前 API 参考只说明它重试 ECONNRESET，默认重试次数为零。" },
        { question: "它会重试 HTTP 500 或 429 吗？", answer: "不会。它们是 HTTP 响应，状态码不会触发该选项的重试。" },
        { question: "maxRetries 和 Playwright Test 重试一样吗？", answer: "不一样。前者处理有限的 API 传输错误，后者重跑失败的测试用例。" },
        { question: "ECONNRESET 后重试 POST 安全吗？", answer: "不要假设安全。连接断开前服务器可能已执行副作用。本文夹具只使用 GET。" },
        { question: "夹具能证明我的后端可靠运行吗？", answer: "不能。它只覆盖本地合成接口中的一种有限情况，不测量生产服务或普遍网络可靠性。" }
      ]
    }
  }
};

const related: Record<string, string[]> = {
  "ai-browser-audit-rental-listings-before-a-viewing": ["ai-browser-trip-planning", "ai-browser-compare-products-across-sites", "ai-browser-research-source-verification", "browser-agent-human-takeover"],
  "ai-browser-check-laptop-dock-compatibility": ["ai-browser-compare-products-across-sites", "ai-browser-research-source-verification", "browser-agent-structured-data-extraction"],
  "ai-browser-audit-subscriptions-before-cancelling": ["ai-browser-expense-report-reconciliation", "browser-agent-human-takeover", "ai-browser-tab-access-permissions", "ai-browser-research-source-verification"],
  "playwright-test-spa-history-back-forward": ["browser-agent-tabs-popups", "browser-agent-wait-for-page-ready", "browser-agent-debugging-traces", "browser-agent-session-expiry-recovery"],
  "playwright-api-request-context-econnreset-retries": ["browser-agent-request-mocking-har", "browser-agent-network-interruption-recovery", "browser-agent-debugging-traces", "playwright-test-multiple-roles-permissions"]
};

export const aiCycleTranslations02: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
export const aiCycleGuides02: EditorialGuide[] = Object.keys(copies).map((slug) => ({
  ...copies[slug]["zh-cn"],
  slug,
  date: "2026-11-02",
  sourcePath: `src/data/ai-cycle-2026-11-02.ts#${slug}`,
  availableLocales: ["en", "zh-cn"],
  relatedBrowsers: [],
  relatedTools: [],
  sources: sourcesBySlug[slug],
  relatedGuides: related[slug] ?? []
}));
