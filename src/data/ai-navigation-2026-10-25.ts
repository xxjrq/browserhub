import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const sources = [
  {
    "title": "Playwright: Actions and scrolling",
    "url": "https://playwright.dev/docs/input#scrolling"
  },
  {
    "title": "Playwright: Locator API",
    "url": "https://playwright.dev/docs/api/class-locator"
  },
  {
    "title": "Playwright: Page API",
    "url": "https://playwright.dev/docs/api/class-page"
  },
  {
    "title": "Playwright: Network",
    "url": "https://playwright.dev/docs/network"
  },
  {
    "title": "Stack Overflow: looping through a lazy-loading page",
    "url": "https://stackoverflow.com/questions/72069363/playwright-how-to-loop-scroll-down-or-show-more-or-page-down-in-a-lazy-loading"
  },
  {
    "title": "Stack Overflow: reaching items on an infinite-scroll page",
    "url": "https://stackoverflow.com/questions/73800529/how-to-handle-infinite-scrolling-using-playwright-test"
  }
];

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "browser-agent-scroll-pagination": {
    "en": {
      "title": "How Browser Agents Navigate Infinite Scroll and Pagination",
      "description": "A bounded Playwright workflow for lazy-loaded lists, nested scroll containers, virtualized rows, and numbered pages, with observable waits and safe stop conditions.",
      "category": "AI browser guides",
      "content": "A browser agent can reach the bottom of a page and still miss most of a list. Infinite scroll, a “Load more” button, numbered pagination and virtualized rows need different actions and different evidence that progress happened. This guide gives a bounded Playwright workflow for authorized browsing: identify the scroll owner, save stable record keys as you move, wait for a real change, and stop with a stated coverage result. For adjacent concerns, see [structured data extraction](/en/guides/browser-agent-structured-data-extraction/) and [browser-agent debugging traces](/en/guides/browser-agent-debugging-traces/). This article is about reaching the content; the extraction guide covers output schema and provenance. The examples use official Playwright documentation checked October 25, 2026. They are templates, not tested against a live site.",
      "sections": [
        {
          "heading": "Classify the list before scrolling",
          "body": "Inspect the page once and decide which control advances the list. An infinite list requests another batch near a sentinel or the last row. A “Load more” control requires one intentional click per batch. Numbered pagination changes a page or cursor and usually changes the URL or current-page marker. A virtualized list may keep only a window of rows in the DOM while recycling the same elements as you scroll.\n\nDo not infer completion from reaching the document footer. A nested panel may own scrolling, a sticky header may cover the trigger, or the list may have a separate end marker. Check candidate elements for scrollHeight > clientHeight, scroll the likely container a little, and confirm its scrollTop changes. An agent using screenshots or an MCP wrapper must use that tool’s documented scroll/action API; Playwright calls are not universal agent commands."
        },
        {
          "heading": "Wait for progress, not a blind loop",
          "body": "Before each advance, capture the last visible record key or current page marker. Perform one action, then wait for a signal tied to it: a new record key, changed page number or URL, an end marker, or a matching data response. Playwright locators wait for actionability, but a successful click does not prove that another batch arrived. The official docs recommend assertions or locator conditions over fixed sleeps; they discourage networkidle as a general testing readiness condition because analytics and long-lived connections can keep the network active.\n\nIf the endpoint is known, register page.waitForResponse() before the scroll-triggering action and match the relevant path and request parameters. If it is unknown, wait on a site-specific row or sentinel condition. Use a finite timeout. A timeout means “no expected signal observed”; it does not prove that the list ended."
        },
        {
          "heading": "A bounded loop for an append-only list",
          "body": "This CommonJS template assumes the site appends cards without recycling old ones. Replace the selectors and key field with attributes inspected on a site you are allowed to automate. The loop saves each unique key, makes at most 40 advances, and reports whether it saw an end marker. Forty batches do not imply that the site’s full result set was reached.\n\nThe downloaded script collects unique data-record-id values, makes at most 40 advances, and reports completion only when the results-end marker is visible. Get the [bounded Playwright example](/templates/agent-pagination-playwright.cjs) and save the download as agent-pagination-playwright.cjs in your own project root. It requires Node.js, the Playwright package and its Chromium browser. In a project you control, install them with npm install -D playwright and npx playwright install chromium. Set AUTHORIZED_TEST_URL to an HTTP(S) page you are authorized to automate, then run from that project root: node agent-pagination-playwright.cjs. Actions have a 10-second default timeout, navigation has a 15-second timeout, and waiting for a changed last key is capped at 8 seconds. The sample has only been syntax checked; it has not been run against a live page.\n\nThe wait checks whether the last record key changed. A virtualized list may keep the same row count while removing old rows. For that case, capture stable keys during every viewport before advancing, and wait for the visible key window to change or for a documented response. Do not treat current DOM size as a total. If keys stop changing without an end marker or known count, return incomplete_or_stalled."
        },
        {
          "heading": "Find the scroll owner and handle load-more",
          "body": "A global window.scrollBy() can move the wrong surface. Playwright’s scrolling guide documents page.mouse.wheel() and scrolling a specific container through a locator; its locator actions also scroll an existing target into view when needed. Confirm the intended panel’s scrollTop changes before repeating the motion.\n\nFor “Load more,” locate one enabled control inside the results region. Start a matching response wait or record the last key before clicking once. Then wait for a new key, result-count change or status message. A generic timeout is not a reason to click again: the first action may still be processing or the button may have changed meaning. If a confirmation, sign-in prompt, CAPTCHA or access-denied page appears, stop and report it. Do not automate a bypass."
        },
        {
          "heading": "Treat numbered pages as navigation state",
          "body": "Read the current-page marker and whether “Next” is disabled. Before clicking, start a wait for the expected URL or response. Click once, then confirm the page marker changed and at least one record key differs. This distinguishes an accepted click from a completed transition. Treat cursor tokens as opaque state; use the visible next control or a documented API rather than guessing cursor values.\n\nAfter a timeout, inspect the URL, busy state and record keys once. If the page advanced, continue from the new state. If its state is ambiguous, stop for review instead of replaying a click that might submit a form or trigger an irreversible action."
        },
        {
          "heading": "Define completeness before starting",
          "body": "Choose a stop rule before navigating: a documented total count reached; an explicit end-of-results marker; a disabled next control on the last page; or a task-imposed page/record cap labeled as a cap. Track visited pages or cursors and deduplicate by stable record ID. Without an ID, use a composite of stable fields and disclose possible collisions.\n\nA URL is not always a stable key. One record may have tracking parameters, localized routes, pagination URLs or changing fragments; a redirect can also hide a meaningful variant. Normalize only fields you understand, retain the original URL, and do not merge records just because titles match. Return a coverage note such as “end marker observed after 126 unique IDs” or “stopped at the 40-advance cap; completion unknown.” A virtualized list’s visible row count is never its total."
        }
      ],
      "faq": [
        {
          "question": "Why does scrollIntoViewIfNeeded not load the next item?",
          "answer": "It scrolls an existing locator into view. A row that is not in the DOM cannot be targeted yet. Scroll the owning container or current last row, then wait for a new row or another documented progress signal."
        },
        {
          "question": "Can I stop when scrolling adds no rows?",
          "answer": "Only when a documented end state confirms it. A stalled request, virtualized DOM, wrong container or timeout can all leave the visible count unchanged; otherwise report the run as stalled or incomplete."
        },
        {
          "question": "How do I handle a virtualized result list?",
          "answer": "Save stable record keys as each viewport appears because old rows can be removed and DOM count can stay constant. Use an explicit end marker or known total to assess coverage."
        },
        {
          "question": "Should an agent click Next again after a timeout?",
          "answer": "Inspect the page once. If the URL or page marker advanced, continue; if the result is ambiguous, stop. Repeating a click can submit twice or advance another page."
        },
        {
          "question": "Does this work with every browser agent or MCP server?",
          "answer": "The navigation logic transfers, but Playwright JavaScript APIs do not. Check the specific tool’s documented scrolling, waiting and page-state operations."
        }
      ]
    },
    "zh-cn": {
      "title": "浏览器智能体如何处理无限滚动与分页",
      "description": "用有边界的 Playwright 流程处理懒加载、嵌套滚动区、虚拟列表和页码导航，并设置可观察的等待条件与停止规则。",
      "category": "AI 浏览器指南",
      "content": "浏览器智能体滚到了页面底部，列表却可能只读到一小段。无限滚动、“加载更多”、页码分页和虚拟列表需要不同的推进动作，也需要不同的进度证据。本篇给出一套有上限的 Playwright 流程，适用于你获准访问的页面：先找对滚动容器，移动时保存稳定记录键，等待页面出现变化，并明确说明停止时的覆盖情况。相邻主题可看[浏览器智能体结构化数据提取](/zh-cn/guides/browser-agent-structured-data-extraction/)和[浏览器智能体调试追踪](/zh-cn/guides/browser-agent-debugging-traces/)。本篇解决如何走到内容所在位置；结构化提取指南讨论输出格式和来源记录。代码依据 2026 年 10 月 25 日核对的 Playwright 官方文档整理，没有在真实网站上执行。",
      "sections": [
        {
          "heading": "滚动前先判断列表怎样推进",
          "body": "先检查页面，判断哪个控件负责加载下一批内容。无限列表通常在触发器或最后一行接近视口时请求新数据；“加载更多”按钮需要每批点击一次；页码分页会切换页码或 cursor，通常还能观察到 URL 或当前页标记变化；虚拟列表则可能只把一小段行保留在 DOM，滚动时重复利用相同元素。\n\n不要因为看见页面页脚就判断列表结束。页面可能由内嵌滚动面板控制，也可能被粘性标题遮住触发器，或使用独立结束标记。检查候选元素是否满足 scrollHeight > clientHeight，小幅滚动后确认 scrollTop 确实变化。只能操作截图或 MCP 封装工具的智能体，必须使用对应工具文档提供的滚动与动作接口；Playwright 方法名并非通用命令。"
        },
        {
          "heading": "等待进度信号，不要盲目循环",
          "body": "每次推进前，记录最后一条可见记录的键或当前页标记。然后只做一次动作，并等待相关信号：出现新记录键、页码或 URL 变化、结束标记出现，或者收到符合条件的数据响应。Playwright 定位器会等待元素满足操作条件，但点击成功不代表下一批内容已到达。官方文档建议依靠断言或定位器条件等待，避免用固定睡眠猜加载时间；文档不建议把 networkidle 当作通用测试就绪条件，因为分析脚本和长连接可能让网络一直活动。\n\n已知数据接口时，在触发滚动前先注册 page.waitForResponse()，按目标路径和请求参数筛选。还不知道接口时，则等待与列表相关的行或触发器状态。所有等待都应有超时。超时只说明“没有在限定时间里观察到预期信号”，不能单独证明列表结束。"
        },
        {
          "heading": "适用于追加式列表的有界循环",
          "body": "下面的 CommonJS 模板假设网站把新卡片追加到 DOM，不会回收旧卡片。请先检查你有权自动化的页面，再把选择器和键字段换成实际属性。循环保存已出现的唯一键，最多推进 40 次，并记录是否看到了结束标记。推进 40 批不代表已读完整个结果集。\n\n下载的脚本会按 data-record-id 保存唯一记录，最多推进 40 次；只有页面出现 results-end 结束标记才会报告完整。获取[有界 Playwright 示例脚本](/templates/agent-pagination-playwright.cjs)，并把下载文件保存到你自己项目的根目录，命名为 agent-pagination-playwright.cjs。运行需要 Node.js、项目中的 Playwright 包和 Playwright Chromium。在你管理的项目中运行 npm install -D playwright 和 npx playwright install chromium；把 AUTHORIZED_TEST_URL 设为你获准自动化的 HTTP(S) 页面，再从该项目根目录执行 node agent-pagination-playwright.cjs。动作默认超时为 10 秒，导航超时为 15 秒，等待最后一条记录键变化最多 8 秒。本示例只做了语法检查，没有在真实网页上运行。\n\n等待条件会检查最后一条记录键是否变化。虚拟列表可能维持相同的行数，同时移除旧行。这种场景要在每次滚动时保存当前视口出现过的稳定键，并等待可见键窗口变化或已知接口响应。不能把当前 DOM 行数当成总数。如果键不再变化，但没有结束标记或已知总数佐证，应报告 incomplete_or_stalled，不要声称已经读完。"
        },
        {
          "heading": "找到滚动容器，再操作加载按钮",
          "body": "直接调用 window.scrollBy() 可能滚错区域。Playwright 官方滚动说明列出了 page.mouse.wheel() 和通过定位器滚动指定容器的方法；定位器执行动作时也会在需要时把已有目标滚进视口。重复操作前，确认目标面板的 scrollTop 真的变化。\n\n“加载更多”按钮应从结果区域里只定位一个可用控件。点击前先注册匹配的响应等待，或记录当前最后一个键，然后只点一次。点击后等待新键、结果数变化或状态文字出现。通用超时到了，不代表应该重按：上次点击可能仍在处理，按钮也可能已经改变用途。如果出现确认对话框、登录提示、CAPTCHA 或拒绝访问页面，应停下并报告，不要绕过限制。"
        },
        {
          "heading": "把页码当作导航状态",
          "body": "先读当前页标记，并确认“下一页”是否禁用。点击前开始等待预期 URL 或响应，然后只点一次；之后核对页码更新，至少确认一条记录键发生变化。这样才能区分点击成功和页面真正切换。把 cursor 当作不透明状态；应使用页面提供的下一页控件或有文档支持的接口，不要猜 cursor 值。\n\n超时后只检查一次 URL、忙碌状态和记录键。如果页面已经翻页，就从新状态继续；如果情况不清楚，应停下来复核，不要重放可能提交表单或触发不可逆操作的点击。"
        },
        {
          "heading": "开始前定义什么叫完整",
          "body": "提前确定停止规则：达到文档说明的总数；页面出现明确的列表末尾；最后一页的下一页按钮已禁用；或者任务设定的页数/记录数上限，并明确标记为上限。记录访问过的页码或 cursor，用稳定记录 ID 去重。没有 ID 时，使用多个稳定字段组成键，并说明可能碰撞。\n\nURL 不总是稳定键。同一条记录可能带不同跟踪参数、本地化路由、分页地址或变化的片段；重定向也可能隐藏有意义的版本。只规范化理解的字段，同时保留原始 URL。不要只因标题相同就合并记录。结果应附带覆盖说明，例如“看到结束标记，共观察到 126 个唯一 ID”，或“达到 40 次推进上限，是否完整未知”。虚拟列表的可见行数不能替代总数。"
        }
      ],
      "faq": [
        {
          "question": "为什么调用 scrollIntoViewIfNeeded 后没有加载下一条？",
          "answer": "它只能把已经存在的定位元素滚进视口。尚未进入 DOM 的行无法直接定位。应滚动负责加载的容器或当前最后一行，再等待新行或其他明确的进度信号。"
        },
        {
          "question": "滚动后没有新行，就可以结束吗？",
          "answer": "只有页面明确显示结束状态时才可以。请求卡住、虚拟 DOM、滚错容器或超时都可能导致行数不变；否则应报告任务停滞或结果不完整。"
        },
        {
          "question": "虚拟列表怎样避免漏项？",
          "answer": "每个视口出现时就保存稳定记录键，因为旧行可能被移除，DOM 数量也可能一直不变。应依据明确结束标记或已知总数判断覆盖情况。"
        },
        {
          "question": "点击下一页超时后要再点一次吗？",
          "answer": "先检查一次页面状态。如果 URL 或当前页码已经更新，就继续；情况不明确就停止复核。重复点击可能重复提交，也可能多翻一页。"
        },
        {
          "question": "所有浏览器智能体和 MCP 服务都能用这套代码吗？",
          "answer": "判断逻辑可以借鉴，但 Playwright JavaScript API 不通用。请查正在使用的工具对滚动、等待和页面状态检查的文档。"
        }
      ]
    }
  }
};

export const aiNavigationGuides25: EditorialGuide[] = ["browser-agent-scroll-pagination"].map((slug) => ({
  ...copies[slug]["zh-cn"], slug, date: "2026-10-25", sourcePath: `src/data/ai-navigation-2026-10-25.ts#${slug}`,
  availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources,
  relatedGuides: ["browser-agent-structured-data-extraction", "browser-agent-debugging-traces"]
}));

export const aiNavigationTranslations25: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
