import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const downloadSlug = "browser-agent-download-files";
const extractionSlug = "browser-agent-structured-data-extraction";

const downloadSources = [
  { title: "Playwright: Downloads", url: "https://playwright.dev/docs/downloads" },
  { title: "Playwright: Download API", url: "https://playwright.dev/docs/api/class-download" },
  { title: "Playwright: BrowserContext API", url: "https://playwright.dev/docs/api/class-browsercontext" },
  { title: "Playwright: BrowserType launch API", url: "https://playwright.dev/docs/api/class-browsertype#browser-type-launch" },
  { title: "Browser Use: Browser configuration reference", url: "https://github.com/browser-use/browser-use/blob/main/skills/open-source/references/browser.md" },
  { title: "Browser Use: DownloadsWatchdog implementation", url: "https://github.com/browser-use/browser-use/blob/main/browser_use/browser/watchdogs/downloads_watchdog.py" },
  { title: "Browser Use: BrowserProfile source", url: "https://github.com/browser-use/browser-use/blob/main/browser_use/browser/profile.py" },
  { title: "Browser Use issue: files downloaded in a remote browser pod", url: "https://github.com/browser-use/browser-use/issues/3136" },
];

const extractionSources = [
  { title: "Browser Use: custom structured output example", url: "https://github.com/browser-use/browser-use/blob/main/examples/features/custom_output.py" },
  { title: "Browser Use: Agent service source", url: "https://github.com/browser-use/browser-use/blob/main/browser_use/agent/service.py" },
  { title: "Browser Use: structured output action schema", url: "https://github.com/browser-use/browser-use/blob/main/browser_use/tools/views.py" },
  { title: "Browser Use: history and structured output source", url: "https://github.com/browser-use/browser-use/blob/main/browser_use/agent/views.py" },
  { title: "Pydantic: Fields and required versus nullable values", url: "https://docs.pydantic.dev/latest/concepts/fields/" },
  { title: "Playwright: Locators and auto-waiting", url: "https://playwright.dev/docs/locators" },
  { title: "Browser Use issue: structured completion status and output schema", url: "https://github.com/browser-use/browser-use/issues/5955" }
];

const copy: Record<"en" | "zh-cn", Record<string, EditorialGuideCopy>> = {
  en: {
    [downloadSlug]: {
      title: "How browser agents download files without losing them",
      description: "Wait for the browser download event, save the completed file before its context closes, and keep remote-browser paths separate from the worker machine.",
      category: "Browser agent development",
      content: "A successful click does not mean your agent has a usable file. In Playwright, downloads belong to a browser context and its temporary files are deleted when that context closes. The reliable sequence is to register the download waiter, start the click, check for failure, save to a destination the agent process can access, then close the context. Browser Use exposes a downloads directory, but native-CDP, fetch-based and provider download flows can write files in different places. Check which process owns the returned path and whether the receiving worker can read it. These details are based on current project documentation checked on October 22, 2026. No browser or agent was launched for this article.",
      sections: [
        { heading: "Start listening before the click", body: "Downloads can begin immediately after the action. If code awaits the click first and only then starts waiting, the download event may already have fired. Register the waiter before the click and await both with Promise.all, so both rejections have handlers. The [Playwright downloads guide](https://playwright.dev/docs/downloads) uses this order and explains that each attachment emits a page download event. Use the locator that identifies the intended control, such as an accessible button name, and keep the wait near the action that triggers it.\n\nThe [download template](/templates/agent-download-playwright.mjs) shows this pattern with a 30-second timeout. Its command is node public/templates/agent-download-playwright.mjs <page-url> <button-name>. The target page must expose a button with that accessible name, and Playwright must be installed in the project. The template is source-checked here; it has not been run against a site." },
        { heading: "Save the file before the context ends", body: "The Download object has lifecycle methods as well as metadata. failure() resolves with a reason when the transfer fails or is canceled. saveAs(path) copies the completed payload to the path you choose and waits for completion when needed. Playwright deletes its managed temporary download when the producing browser context closes, so do not schedule saveAs in detached background work and immediately close the context. Await the save in the same control flow, then close the context in a finally block.\n\nThe [API reference](https://playwright.dev/docs/api/class-download) says path() throws for remote connections. Use saveAs() for a local copy when the remote provider supports transfer." },
        { heading: "Treat the suggested filename as untrusted input", body: "The browser derives suggestedFilename() from the response's Content-Disposition header or a page download attribute. That value is useful for preserving a human-readable extension, but it comes from page or server content. Reduce it to a basename before joining it to your output directory; otherwise a crafted path could escape the intended folder on some platforms. The template creates a unique run directory under downloads, which separates files from parallel runs. If one run saves several files, decide how to handle duplicate names." },
        { heading: "Verify which process owns the path", body: "Playwright's downloadsPath launch option controls its browser-side temporary downloads; saveAs creates the copy your script will keep. Browser Use has several paths: its current DownloadsWatchdog can emit a remote path for a native-CDP download, while another fetch flow obtains response bytes and writes them from Python. A downloads_path setting alone does not identify a universal storage host. Check which flow your pinned version and provider use, and which process writes that path. The [DownloadsWatchdog source](https://github.com/browser-use/browser-use/blob/main/browser_use/browser/watchdogs/downloads_watchdog.py) distinguishes these branches.\n\nWith CDP, cloud browsers, containers or worker pools, a path can be valid in one process and unreadable in another. A historical [Browser Use worker-pod issue](https://github.com/browser-use/browser-use/issues/3136) illustrates this integration question; it does not establish a current defect. Verify the receiving worker can read the actual file. Use shared storage or an explicit transfer when that flow needs it." },
        { heading: "Diagnose timeouts and empty downloads", body: "A timeout waiting for download usually means the click did not trigger an attachment: the control may be disabled, the page may need another interaction, the server may return an inline PDF, or the locator may identify the wrong button. Check the click result and page state, and confirm the response behavior using an authorized test account. If a download event arrives but failure() returns a reason, record that reason and the sanitized page URL; do not report the click itself as success.\n\n| Symptom | First check | Next step |\n| --- | --- | --- |\n| Waiter times out | Did this control start an attachment? | Check the locator and page response |\n| failure() has a reason | Was the transfer canceled or rejected? | Record the reason; retry only if safe |\n| File vanishes after the run | Was saveAs awaited before context.close()? | Save to a durable path first |\n| Worker cannot open the file | Which process owns the path? | Check that flow’s copy or transfer contract |\n\nWhen a file is missing, check whether the event fired, the transfer finished and saveAs returned before context shutdown. Then confirm the output directory belongs to the expected host and check the run-specific directory. Keep signed query strings and session identifiers out of logs." },
        { heading: "Check the browser-use transfer contract before handoff", body: "Browser Use's [browser configuration reference](https://github.com/browser-use/browser-use/blob/main/skills/open-source/references/browser.md) documents accept_downloads and downloads_path. Before relying on a returned path or attachment, inspect the exact SDK or MCP result contract. This article does not assume that every integration returns files the same way.\n\nStore a small manifest beside the file with a sanitized source URL, suggested filename, byte size and completion status. Have the worker check that the file is readable before parsing it." }
      ],
      faq: [
        { question: "Why does Playwright emit a download event but my file disappears?", answer: "The downloaded item is tied to the browser context. Playwright removes its temporary copy when that context closes. Await download.saveAs() to a durable path before closing it." },
        { question: "Can I call download.path() with a remote browser?", answer: "The Playwright Download API documents path() as unavailable for remote connections. Use saveAs() to copy the file to the test process if the remote service supports that transfer." },
        { question: "Does Browser Use downloads_path put a file on my worker?", answer: "Not by itself. Native-CDP, fetch-based and provider flows can have different storage owners. Check which process wrote the file and verify that the worker can read it." },
        { question: "Is the filename returned by the page safe to use directly?", answer: "Treat it as untrusted. Keep only the basename and write to a directory your process controls. The template isolates each invocation in a unique subdirectory." }
      ]
    },
    [extractionSlug]: {
      title: "Structured data extraction with browser agents and Pydantic",
      description: "Define typed extraction output, preserve source and uncertainty per field, and validate coverage separately from whether the page claims are true.",
      category: "Browser agent development",
      content: "A Pydantic schema makes a browser agent's answer easier to parse; it cannot prove the agent read the right page or found every record. Browser Use's current Python API takes a Pydantic model as output_model_schema, while older tutorials may show earlier names. Separate page-extraction and final-task schemas, represent unknown values explicitly, then check evidence and coverage. API notes were checked on October 22, 2026. The offline validator uses a synthetic fixture and makes no browser or model call.",
      sections: [
        { heading: "Model the answer your next step needs", body: "Start from the consumer's actual fields, not from whatever JSON shape is easiest for the model. A product record might need a name, displayed price text, source URL, observation date and evidence type. Use str | None when a field can be missing, but make the field required if you need the model to distinguish an explicit null from an omitted key. In Pydantic v2, price: str | None is required and nullable; price: str | None = None is optional and nullable. See [Pydantic's field documentation](https://docs.pydantic.dev/latest/concepts/fields/).\n\nFor extraction, the example keeps raw price text instead of converting a possibly ambiguous label into a number. It also allows an unknown evidence value. Extend the schema with currency or normalized numeric fields only when the source page and consumer have a clear rule for them." },
        { heading: "Use the current Browser Use parameter", body: "The current [Browser Use custom output example](https://github.com/browser-use/browser-use/blob/main/examples/features/custom_output.py) passes a Pydantic BaseModel subclass through Agent(..., output_model_schema=...), then validates the final JSON with model_validate_json(). AgentHistoryList.structured_output provides parsed data when the final result and schema are available. Some older guides use names such as output_model; check the installed package's version and signature before copying one of those examples.\n\nThe agent's output_model_schema describes the final result; extraction_schema or an Extract action's output_schema shapes one page extraction. The [agent service](https://github.com/browser-use/browser-use/blob/main/browser_use/agent/service.py) keeps them separate because those results have different fields. Confirm the contract before copying settings from another integration." },
        { heading: "Keep provenance with each value", body: "A typed value without provenance is hard to audit. Include the page URL for each record, and, when a page can change during a run, capture an observation time or page label as well. For facts that may be missing, distinguish three cases: the page was inspected and the value was absent; the relevant area was not reached; or the extraction could not determine the value. A single null cannot express all three meanings, so add a status or evidence field if the downstream decision depends on that distinction.\n\nFor example, price_text: null plus evidence: visible_text could mean the price area was inspected but showed no price; evidence: unknown means the agent cannot support a claim about the field. Define this convention in the prompt and schema description. Never turn a missing value into zero, an empty string, or a guessed default." },
        { heading: "Validate shape and truth in separate passes", body: "Pydantic checks types, required fields and constraints. It cannot establish that a product page really displayed the reported price, that a page was current, or that every result was collected. Keep the raw observation or a short quoted evidence fragment where policy permits, then compare each output field against that evidence. For high-impact values, verify the source separately.\n\nThe downloadable [offline validator](/templates/agent-extraction-validation.py) checks a JSON file against a typed model; its accompanying [fixture](/templates/agent-extraction-fixture.json) is marked synthetic. Run python public/templates/agent-extraction-validation.py after installing Pydantic. This validates only the supplied data's shape, dates and URLs. It does not inspect a live page, confirm a quote, or measure extraction accuracy." },
        { heading: "Give pagination and dynamic pages a coverage rule", body: "A schema for one record does not answer whether the collection is complete. Define a stopping condition: a known result count reached, a next-page control disabled, a stable end marker observed, or a documented page limit reached. Return complete and next_page or a more precise coverage status, and retain the pages visited. For lazy-loaded rows, wait for the relevant content or another observable condition instead of relying on a fixed sleep.\n\nUse stable, user-facing locators where possible. Playwright's [locator documentation](https://playwright.dev/docs/locators) explains its auto-waiting behavior; it does not make an unknown page's pagination logic automatic. Record why the agent stopped and retain page boundaries in the result manifest." },
        { heading: "Check task completion as well as parsed output", body: "A parseable object can describe an incomplete run. Keep the agent's completion or success state separate from fields inside your model, and inspect errors and coverage before accepting the result. Browser Use's history object exposes final output and success information in its current source, while [issue 5955](https://github.com/browser-use/browser-use/issues/5955) documents a version-specific discussion about structured completion status. That issue is a reason to verify the behavior of your pinned release, not evidence that every current release misreports success.\n\nScripted Playwright extraction is easier to review on repeatable pages with fixed selectors. Use an agent when the page varies or needs judgment, then constrain its answer with a schema and evidence policy. Recheck the installed API after upgrades." }
      ],
      faq: [
        { question: "Does Pydantic validation mean the extracted facts are correct?", answer: "No. It checks data against the declared structure and constraints. Compare important values with captured page evidence and verify that the intended pages were covered." },
        { question: "How should I represent a value the agent cannot find?", answer: "Use a nullable field and define whether null means inspected-but-absent. Add a separate evidence or status field when 'not inspected' and 'unknown' must be distinguished." },
        { question: "What is Browser Use's current structured output argument?", answer: "The current Python example uses output_model_schema with a Pydantic model. Check your installed version; older tutorials may use earlier parameter names." },
        { question: "Can a valid output schema prove that pagination finished?", answer: "No. Define a coverage and stopping condition, record visited pages, and check the agent's completion state separately from the parsed data." }
      ]
    }
  },
  "zh-cn": {
    [downloadSlug]: {
      title: "浏览器智能体下载文件后，怎样确保文件还在",
      description: "先等待下载事件，再将文件保存到上下文关闭后仍可访问的位置，并区分远程浏览器主机与执行进程的文件系统。",
      category: "浏览器智能体开发",
      content: "点击成功不等于智能体已经拿到文件。在 Playwright 中，下载属于创建它的浏览器上下文；上下文关闭时，Playwright 会删除其临时文件。可靠顺序是先注册下载等待，再点击，检查失败状态，把文件保存到执行进程能访问的路径，最后关闭上下文。Browser Use 提供下载目录设置，但原生 CDP、抓取和服务商下载流程可能在不同位置写入文件。应核对返回路径由哪个进程创建，以及接收文件的 worker 能否读取它。以下依据 2026 年 10 月 22 日查阅的项目文档整理，没有启动浏览器或智能体实测。",
      sections: [
        { heading: "点击之前先开始等待", body: "下载可能紧接着点击动作开始。如果代码先等待点击完成，再创建下载等待器，事件可能已经触发。先注册下载等待器，再用 Promise.all 同时等待它和点击操作，确保两个 Promise 的失败都得到处理。[Playwright 下载指南](https://playwright.dev/docs/downloads)采用这一顺序，并说明页面附件会触发 download 事件。定位器应指向实际要操作的控件，例如带有可访问名称的按钮；等待器尽量放在触发动作旁边。\n\n[下载示例文件](/templates/agent-download-playwright.mjs)展示了这一写法，并设置 30 秒超时。命令为 node public/templates/agent-download-playwright.mjs <page-url> <button-name>。目标页面需要有对应可访问名称的按钮，项目中也要安装 Playwright。本次只检查了示例源码，没有对网站运行它。" },
        { heading: "在上下文结束前保存文件", body: "Download 对象除了文件信息，还有下载生命周期方法。failure() 会在传输失败或取消时返回原因；saveAs(path) 会把文件复制到指定路径，必要时等待下载完成。Playwright 会在产生下载的浏览器上下文关闭时删除受它管理的临时文件，因此不要把 saveAs 放到脱离主流程的后台任务里，然后立刻关闭上下文。应在同一条控制流程中等待保存完成，再用 finally 关闭上下文。\n\n本地浏览器完成下载后，可以通过 path() 获取 Playwright 的临时文件路径。[Download API 文档](https://playwright.dev/docs/api/class-download)说明远程连接不支持 path()。如果测试进程需要从远程 Playwright 浏览器取回文件，应使用 saveAs()，前提是远程服务支持文件传输。" },
        { heading: "把建议文件名当作不可信输入", body: "浏览器会根据响应的 Content-Disposition 标头或页面的下载属性生成 suggestedFilename()。保留这个名字有助于沿用易读文件名和扩展名，但来源是网页或服务器内容。与输出目录拼接前应先只保留 basename；在某些系统上，带路径的文件名可能写出预期目录。示例会在项目的 downloads 目录中为每次运行创建独立子目录，避免不同运行的文件名冲突。同一次运行保存多个文件时，仍需决定怎样处理重复名称。" },
        { heading: "核对路径由哪个进程写入", body: "Playwright 的 downloadsPath 启动选项控制浏览器侧临时下载目录；saveAs 才创建脚本要保留的副本。Browser Use 存在不同处理路径：当前 DownloadsWatchdog 对原生 CDP 下载可以报告远端路径；另一类抓取流程则取得响应字节，再由 Python 写入文件。单看 downloads_path 不能断定文件总在 Chromium 主机或总在 worker 上。应检查固定版本和服务商走的是哪条流程，以及哪个进程实际写入该路径。[DownloadsWatchdog 源码](https://github.com/browser-use/browser-use/blob/main/browser_use/browser/watchdogs/downloads_watchdog.py)区分了这些分支。\n\n使用 CDP、云浏览器、容器或任务工作池时，一个进程中的有效路径可能无法被另一个进程读取。[Browser Use 关于 worker Pod 的历史 issue](https://github.com/browser-use/browser-use/issues/3136)说明有人遇到过这种集成问题，不能证明当前版本仍有缺陷。接收文件的 worker 应实际检查文件是否可读；若对应流程需要，再使用共享存储或明确的文件传输。" },
        { heading: "排查超时、空文件与文件消失", body: "等待 download 超时，通常表示点击没有触发附件下载：控件可能不可用，页面还需要额外操作，服务器可能以内嵌方式返回 PDF，或者定位器点错了按钮。检查点击结果和页面状态，并在获授权的测试账号下确认响应行为。即使 download 事件发生了，如果 failure() 返回原因，也应记录该原因和已清理敏感参数的网址；不能把点击成功报告成文件下载成功。\n\n| 现象 | 先检查 | 下一步 |\n| --- | --- | --- |\n| 等待器超时 | 控件是否触发附件下载 | 检查定位器和页面响应 |\n| failure() 有原因 | 传输是否取消或被拒绝 | 记录原因，确认安全后再重试 |\n| 运行结束后文件消失 | saveAs 是否在 context.close() 前完成 | 先保存到持久路径 |\n| worker 无法打开文件 | 哪个进程实际写入路径 | 核对该流程的保存或传输契约 |\n\n运行结束后找不到文件时，按顺序检查：事件是否发生、传输是否完成、saveAs 是否返回、是否先关闭了上下文，以及输出目录是否位于预期主机和本次运行目录。远程 Playwright 应使用官方记录的复制方法，不要依赖浏览器主机上的临时路径。日志里不要保留签名查询参数或会话标识。" },
        { heading: "交接文件前先核对 Browser Use 接口", body: "Browser Use 在[浏览器配置参考](https://github.com/browser-use/browser-use/blob/main/skills/open-source/references/browser.md)中记录了 accept_downloads 和 downloads_path。若代码需要附件或返回路径，应先查看当前 SDK 或 MCP 的结果格式：普通最终文本与结构化完成结果携带的文件信息可能不同。路径只对拥有它的环境有效。\n\n在智能体流水线中，可在文件旁保存简短清单：去除敏感信息后的来源网址、建议文件名、字节数、完成状态和运行 ID。接收文件的工作进程随后检查文件是否存在且可读，再进入解析步骤。这样可以把浏览失败和文件传输失败分开，也能为重试标明检查点。" }
      ],
      faq: [
        { question: "Playwright 触发了下载事件，为什么文件后来不见了？", answer: "下载文件属于对应的浏览器上下文。上下文关闭时，Playwright 会删除临时文件。关闭之前应等待 download.saveAs() 保存到持久路径。" },
        { question: "远程浏览器能否调用 download.path()？", answer: "Playwright Download API 说明，远程连接不支持 path()。如果远程服务支持传输，可用 saveAs() 将文件复制到测试进程。" },
        { question: "Browser Use 的 downloads_path 会把文件放到我的 worker 上吗？", answer: "不能仅凭这个设置判断。原生 CDP、抓取及服务商流程的文件位置可能不同，应确认哪个进程写入文件，并实际验证 worker 能否读取。" },
        { question: "网页返回的文件名可以直接使用吗？", answer: "应把它视为不可信输入，只保留 basename，再写入由当前进程控制的目录。示例为每次运行使用独立子目录；一次运行保存多个文件时仍要处理重复名称。" }
      ]
    },
    [extractionSlug]: {
      title: "用浏览器智能体和 Pydantic 提取结构化数据",
      description: "定义有类型的提取结果，为字段保留来源和不确定状态，并分别检查格式、事实与页面覆盖范围。",
      category: "浏览器智能体开发",
      content: "Pydantic schema 可以让浏览器智能体的答案更容易解析，但它不能证明智能体读对了页面，也不能证明没有漏掉记录。Browser Use 当前 Python API 用 output_model_schema 接收 Pydantic 模型；旧教程中的参数名可能对应更早版本。要区分单页抽取 schema 与最终任务结果 schema，为未知值保留明确表示，并在格式验证之外单独检查事实证据与页面覆盖。以下 API 说明在 2026 年 10 月 22 日对照当前项目源码核实。附带验证器使用合成样例，不会启动浏览器或调用模型。",
      sections: [
        { heading: "从下游真正需要的数据开始建模", body: "先看消费结果的代码需要哪些字段，不要只按模型最容易生成的 JSON 设计。商品记录可能需要名称、页面显示的价格文字、来源网址、观察日期和证据类型。如果字段允许没有值，可用 str | None；如果要区分显式 null 和字段未提供，就仍要把字段设为必填。在 Pydantic v2 中，price: str | None 是必填但可为空；price: str | None = None 则是可省略且可为空。可查阅 [Pydantic 字段文档](https://docs.pydantic.dev/latest/concepts/fields/)。\n\n示例保留原始价格文字，不把可能有歧义的页面标签直接转换成数值，也给证据状态留出 unknown。只有页面来源和下游使用方对币种、数值归一化规则达成明确约定后，才扩充这些字段。" },
        { heading: "使用 Browser Use 当前的参数名", body: "Browser Use 当前的[结构化输出示例](https://github.com/browser-use/browser-use/blob/main/examples/features/custom_output.py)通过 Agent(..., output_model_schema=...) 传入 Pydantic BaseModel 子类，再用 model_validate_json() 校验最终 JSON。结果历史对象的 structured_output 属性可以在存在最终结果与 schema 时提供解析后的数据。部分旧教程使用 output_model 等名称；复制前要检查已安装包的版本与函数签名。\n\n当前源码中有两类 schema。Agent 的 output_model_schema 描述整个任务的最终结果；extraction_schema 或 Extract action 的 output_schema 描述一次页面抽取。[Agent service 源码](https://github.com/browser-use/browser-use/blob/main/browser_use/agent/service.py)特意把两者分开，因为单页记录与完整任务结果通常不是同一结构。不要在没有确认接口契约时，从另一个 Browser Use 集成或 MCP 服务器照搬参数。" },
        { heading: "每个值都保留来源信息", body: "缺少来源的类型化字段很难审查。每条记录应包含页面网址；页面可能在运行中变化时，也记录观察时间或页面标识。对可能缺失的事实，要区分三种情况：已经检查但页面没有这个值；还没有访问相关区域；抽取过程无法判断。一个 null 表达不了这三种意思，如果下游决策依赖它们，就增加状态或证据字段。\n\n例如，price_text: null 加 evidence: visible_text 可以表示检查过价格区域但没有看到价格；evidence: unknown 则表示智能体没有依据判断该字段。应在提示和 schema 描述中规定这套含义。不要把缺失值补成零、空字符串或猜测值。" },
        { heading: "把格式验证和事实核对分开", body: "Pydantic 可以检查类型、必填字段和约束，但无法证明商品页面确实显示了该价格、页面内容是最新的，或所有结果都已采集。政策允许时，应保留原始观察或简短证据片段，再逐字段与结果对照。重要字段可以用确定性定位器或第二位审核者复核，不能把 schema 校验通过当作事实验证。\n\n| 字段 | 记录内容 | 不能证明 |\n| --- | --- | --- |\n| page_url | 值来自哪个页面 | 页面权威或可信 |\n| observed_on | 观察时间 | 内容现在仍有效 |\n| evidence | 可见证据或未知状态 | 抽取已经完整 |\n\n[离线验证脚本](/templates/agent-extraction-validation.py)会用类型模型检查 JSON 文件；附带的[样例](/templates/agent-extraction-fixture.json)已标明是合成数据。安装 Pydantic 后运行 python public/templates/agent-extraction-validation.py。它只检查所提供数据的结构、日期和网址，不会打开实时网页、确认引文或衡量抽取准确率。" },
        { heading: "为分页和动态页面规定覆盖条件", body: "单条记录的 schema 无法说明列表是否采全。要定义停止条件：达到已知结果数、下一页控件已禁用、观察到稳定的结束标记，或达到明确记录的页面上限。返回 complete 和 next_page，或更细的覆盖状态，并保留访问过的页面。如果页面滚动后才加载行，应等待目标内容或可观察条件；固定 sleep 可能在页面更新前就结束，也可能在内容已稳定后继续空等。\n\n条件允许时使用稳定、面向用户的定位器。[Playwright 定位器文档](https://playwright.dev/docs/locators)说明了它的自动等待行为，但不能替未知页面自动推断分页规则。保存足够的证据，说明智能体为什么停止。结果跨越多页时，应在返回数据或清单中保留页面边界。" },
        { heading: "解析成功后仍要核对任务是否完成", body: "可以成功解析的对象也可能描述一次未完成的运行。应把智能体的完成状态和成功状态与数据模型中的字段分开，并在接收结果前检查错误与覆盖范围。Browser Use 当前 history 对象提供最终输出和成功状态；[issue 5955](https://github.com/browser-use/browser-use/issues/5955)记录了结构化完成状态的版本讨论。该 issue 提醒开发者检查固定版本的行为，并不能证明当前所有版本都会错误报告成功。\n\n对固定选择器和流程重复的页面，脚本化 Playwright 抽取通常更容易审查。遇到布局变化或需要判断的任务再用智能体，然后通过 schema 和证据规则限制输出。升级依赖时重新核对已安装 API，因为本文观察的是当前源码，仓库主分支之后仍会变化。" }
      ],
      faq: [
        { question: "Pydantic 校验通过，能证明提取事实正确吗？", answer: "不能。它检查数据是否符合声明的结构和约束。重要值仍要与页面证据对照，也要确认目标页面都已覆盖。" },
        { question: "智能体找不到某个值时应该怎么表示？", answer: "使用可空字段，并明确 null 是否表示检查过但页面没有该值。如果还需区分未检查和无法判断，就增加单独的证据或状态字段。" },
        { question: "Browser Use 当前使用哪个结构化输出参数？", answer: "当前 Python 示例使用 output_model_schema 接收 Pydantic 模型。请检查自己的安装版本；较早教程可能使用旧参数名。" },
        { question: "输出符合 schema，能证明分页已经完成吗？", answer: "不能。要定义覆盖范围与停止条件，记录访问页面，并把智能体完成状态与解析后的数据分开检查。" }
      ]
    }
  }
};

export const aiDataGuides: EditorialGuide[] = [downloadSlug, extractionSlug].map((slug): EditorialGuide => {
  const relatedGuides = slug === downloadSlug
    ? ["browser-use-existing-browser-session", "browser-use-vs-playwright", "comet-vs-gemini-in-chrome", "browser-agent-prompt-injection"]
    : ["browser-use-existing-browser-session", "browser-use-vs-playwright", "comet-vs-gemini-in-chrome", "browser-agent-prompt-injection"];
  const sources = slug === downloadSlug ? downloadSources : extractionSources;
  return {
    ...copy["zh-cn"][slug],
    slug,
    date: "2026-10-22",
    sourcePath: "src/data/ai-data-2026-10-22.ts#" + slug,
    availableLocales: ["en", "zh-cn"],
    relatedBrowsers: [],
    relatedTools: ["playwright", "browser-use"],
    sources,
    relatedGuides
  };
});

export const aiDataTranslations: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  [downloadSlug]: { en: copy.en[downloadSlug], "zh-cn": copy["zh-cn"][downloadSlug] },
  [extractionSlug]: { en: copy.en[extractionSlug], "zh-cn": copy["zh-cn"][extractionSlug] }
};
