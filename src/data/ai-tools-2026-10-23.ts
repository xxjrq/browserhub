import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const copies: Record<"playwright-cli-vs-mcp" | "browser-agent-debugging-traces", Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  "playwright-cli-vs-mcp": {
    "en": {
      "title": "Playwright CLI vs MCP: a practical choice for browser agents",
      "description": "Choose Microsoft’s Playwright CLI or Playwright MCP by how your coding agent runs browser work, handles page state, and needs to inspect results.",
      "category": "AI browser development",
      "content": "If a coding agent already works in a terminal and needs to check a page, run a short browser task, or turn an observation into a code change, start with Playwright CLI. It is a separate browser automation tool built for coding-agent workflows. Playwright MCP fits agents whose runtime is organized around MCP tools and needs browser actions exposed as tools. Neither choice replaces Playwright Test: use the test runner for repeatable tests, assertions, fixtures, and CI results. This guide compares the agent-facing integration, not the quality of either tool in a benchmark. The official CLI guide describes CLI as suited to coding agents and describes MCP as suited to specialized loops that benefit from persistent state and iterative page inspection. Those are starting points; check the behavior in your own agent and project.\n\nFor a side-by-side comparison of two MCP integrations, read [Playwright MCP vs Chrome DevTools MCP](/en/guides/playwright-mcp-vs-chrome-devtools-mcp/). If your task needs a signed-in browser profile, see [using Playwright MCP with an existing browser](/en/guides/playwright-mcp-existing-browser/).",
      "sections": [
        {
          "heading": "Keep three Playwright tools distinct",
          "body": "Playwright CLI, Playwright MCP, and Playwright Test share Playwright browser technology, but they answer different questions. The CLI is a command-line interface for an agent or developer to open a browser, inspect a page, interact with it, and save outputs. The MCP server exposes browser capabilities through the Model Context Protocol. Playwright Test is a test runner for authored test files, with configuration such as projects, retries, assertions, and reporters. The Test runner also has a CLI, so the phrase “Playwright CLI” can be ambiguous unless you name the package or command. The coding-agent CLI has the global package @playwright/cli and executable playwright-cli; when the project already has Playwright installed, the documented local entry point is npx playwright cli. The test runner is invoked with commands such as npx playwright test. The older code generator is invoked with npx playwright codegen. These commands do not mean the same product. See the [coding-agent CLI guide](https://playwright.dev/agent-cli/introduction), [CLI repository](https://github.com/microsoft/playwright-cli), and [MCP repository](https://github.com/microsoft/playwright-mcp).\n\n| Your immediate job | Start with | What you still own |\n| --- | --- | --- |\n| Ask an IDE or terminal agent to inspect a page and change code | Playwright CLI | Decide what to assert and review the patch |\n| Integrate browser actions into an MCP-based agent runtime | Playwright MCP | Define the agent loop, permissions, and stopping rules |\n| Run stable regression checks in CI | Playwright Test | Maintain test data, assertions, and failure triage |\n| Generate a first draft from a manual browser walkthrough | Codegen, then edit the result | Replace brittle selectors and add assertions |\n| Debug a particular failed run | Trace Viewer | Identify the actual cause and fix the test or app |\n\nThe table is a workflow choice, not a claim that one interface passes more tasks."
        },
        {
          "heading": "Choose by where the agent already works",
          "body": "CLI is a natural fit when your coding agent can run shell commands in the repository and read files it creates. A short sequence such as open, navigate, snapshot, click, and screenshot can be requested in the same task that edits the application. The CLI can save snapshots, screenshots, PDFs, and storage state to files; it also provides commands for network requests, console messages, sessions, and tracing. This lets an agent inspect just the output it needs, though commands still return page state and do not make the context cost disappear. The command surface and installable skills are documented by Microsoft. Install the tool locally in a project when you want its dependency visible to the team, or globally when your setup calls for one shared executable. The current guide requires Node.js 20 or newer.\n\nMCP is a better fit when the agent host already manages tools through MCP and your application benefits from a persistent server session or repeated tool calls over a changing page. The Playwright MCP project exposes browser actions, page snapshots, screenshots, and optional capabilities. The host owns how those tool definitions are shown and how results enter the model context. A desktop agent with an MCP settings screen may be simpler to configure through MCP; a repository coding agent with terminal access may find the CLI easier to inspect, script, and version alongside the project. Check support in the exact agent version you use rather than assuming that “supports MCP” means every capability is available.\n\nIf both are available, run the same small, authorized task with each. Ask them to open a public demo page, locate a labeled control, perform a harmless interaction, capture the resulting state, and report the evidence file. Record setup time, whether a human can observe the browser, how output is retained, and the steps needed to repeat the task. This is a local evaluation plan, not a test we ran for this article."
        },
        {
          "heading": "Set up the CLI without mixing it with the test runner",
          "body": "The official installation guide documents two paths. If your project already depends on Playwright, use that installed version with npx playwright cli; the guide does not ask you to add a separate local @playwright/cli package. For a shared global command, install @playwright/cli with npm install -g @playwright/cli@latest and use playwright-cli. The guide requires Node.js 20 or newer. Check the command help, and install the agent skill only if your coding agent supports local skills. The skill supplies command instructions to that agent; it does not install a test suite or guarantee that the agent will use every command correctly. Keep the package version under your project’s normal dependency review and follow the project’s existing browser setup.\n\nA first manual walkthrough can use the public TodoMVC demo. Open the page in a headed browser, type a sample item, press Enter, ask the CLI for a snapshot, and save a screenshot. After each command the CLI reports current browser state and can point to a snapshot file. A coding agent can use the same commands through its shell. A reliable prompt gives the target URL, allowed actions, expected final state, and stop condition. For example: inspect the demo, add one disposable item, confirm it appears in the list, save a screenshot, then stop without deleting or submitting anything outside the demo. Keep a human-readable note of the command that produced each artifact.\n\nWhen you need a repeatable regression, promote the verified behavior into a Playwright Test spec with an assertion. A screenshot of a page is evidence of one observed state; it is not an assertion that future runs will remain correct. Codegen can help capture a walkthrough, but the generated script is a starting point and needs review for stable locators, test isolation, and meaningful expectations."
        },
        {
          "heading": "Decide how browser state should survive",
          "body": "State lifetime can change the choice. The CLI documentation says its default browser profile lives in memory: cookies and storage remain between commands in the same session, then are lost when the browser closes. A persistent CLI profile saves browser data across restarts. CLI sessions can be named so separate projects do not accidentally target the same browser. Make the session choice explicit in your prompt or wrapper, and close the session when the task is done.\n\nPlaywright MCP has isolated and persistent modes. In isolated mode, closing the browser ends the session and discards its storage state; the project also documents ways to supply an initial storage state or user data directory. That can make repeated runs convenient, but it changes what secrets and pages are accessible. Playwright’s authentication guide warns that saved browser state can contain cookies and headers capable of impersonating a test account, and recommends keeping authentication files out of source control. Use a dedicated test account, keep state files in an ignored directory, restrict access, and rotate credentials if a state file was exposed. Do not point an agent at your everyday signed-in profile simply to avoid a login step.\n\nBefore granting an agent browser access, write down which site it may visit, whether it may submit forms, where it may save files, which account it uses, and what action requires human approval. A tool interface does not enforce your business policy by itself. The agent may misread a page or encounter instructions in page content that should not change its task. Keep access bounded and inspect the final page or artifact."
        },
        {
          "heading": "Use an observable loop for debugging and evidence",
          "body": "For exploratory work, the useful loop is small: navigate to a known page, snapshot the relevant area, inspect the result, take one action, then capture the new state. The CLI writes snapshots to timestamped files by default and lets you name a snapshot file or limit snapshot depth. That helps a coding agent search the relevant output instead of repeatedly asking for a full page dump. MCP offers similar page snapshots and a find operation that returns matching nodes with nearby context. Both approaches can return more page text than the agent needs, especially on a long dashboard. Request a focused element or search result, and save only the evidence required for review.\n\nFor code changes, keep browser observations separate from the implementation claim. A screenshot demonstrates how the page looked at that point; a passing test demonstrates that configured assertions passed in that run. Neither proves that a production deployment is correct. Save the URL, browser version, test account class, command, output location, and any fixture data needed to reproduce a finding. Remove personal information from screenshots and snapshots before sharing them. If a test is flaky, capture the failing attempt and its retry separately; the two runs may have different state or timing.\n\nThe official CLI continues to evolve. Check the repository’s current command reference before copying a command from an older tutorial. The current Playwright release notes also describe a test-debugging handoff: run npx playwright test --debug=cli, then attach to the paused test with playwright-cli attach and inspect it step by step. This can be useful when the failing test already has the right account, mocks, and page state. Availability of a command does not tell you whether a particular agent host has permission to use its shell, display a headed browser, or read saved files."
        },
        {
          "heading": "Common setup mistakes",
          "body": "The first mistake is installing a different Playwright command than the guide describes. The coding-agent CLI guide documents two paths: with an existing project Playwright dependency, run npx playwright cli; for a shared global executable, install @playwright/cli globally and use playwright-cli. It requires Node.js 20 or newer. npx playwright test starts the Playwright Test runner, while npx playwright codegen starts the code generator. Check which command and package a tutorial means before copying it.\n\nAnother mistake is asking an agent to “test the site” without naming the environment or expected result. It may explore unrelated pages or report that a URL loaded even though the key behavior failed. Give it a route, test identity, concrete assertion, and stop condition. Avoid irreversible actions on real accounts.\n\nA third mistake is assuming sessions persist in the same way. The CLI's default session loses storage when its browser closes, while persistent mode writes profile data to disk. MCP's isolated mode also discards state after close, while its persistent setup has different storage behavior. Check the configured mode before debugging repeated login prompts.\n\nFinally, do not treat a generated script as a finished test. Replace unstable selectors, add an assertion for the user-visible outcome, and run it with the project's supported browser setup. For a one-off inspection, save the evidence and close the browser when finished."
        }
      ],
      "faq": [
        {
          "question": "Is Playwright CLI the same as npx playwright test?",
          "answer": "No. The coding-agent CLI global package is @playwright/cli and its executable is playwright-cli. When the project already has Playwright installed, use npx playwright cli. npx playwright test runs the Playwright Test runner, and npx playwright codegen is a separate generator."
        },
        {
          "question": "Should a coding agent use Playwright CLI or MCP?",
          "answer": "Start with CLI when the agent already works in a terminal and needs to inspect files or change code in the same repository task. Use MCP when the host is built around MCP tools or depends on that server session model. Verify support in your actual host."
        },
        {
          "question": "Does Playwright CLI replace Playwright Test?",
          "answer": "No. The CLI can inspect and operate a browser. Playwright Test runs authored tests with assertions, configuration, retries, and reports. Turn a verified browser observation into a test when it should protect behavior over time."
        }
      ]
    },
    "zh-cn": {
      "title": "Playwright CLI 与 MCP 怎么选：浏览器智能体接入指南",
      "description": "根据编码智能体的运行环境、页面状态管理和调试方式，选择 Microsoft Playwright CLI 或 Playwright MCP，并区分测试运行器与代码生成器。",
      "category": "AI 浏览器开发",
      "content": "如果编码智能体已经在终端中工作，需要检查网页、执行一段浏览器操作，或把观察结果转成代码修改，可以先用 Playwright CLI。它是面向编码智能体工作流的浏览器自动化命令行工具。若智能体运行时以 MCP 工具为中心，并希望把浏览器操作作为工具接入，可评估 Playwright MCP。两者都不能替代 Playwright Test：需要可重复测试、断言、fixture 和 CI 报告时，应使用测试运行器。本文比较的是智能体接入方式，没有做两种工具的成功率或性能实测。Playwright 官方 CLI 指南把 CLI 定位为编码智能体的工具，并把 MCP 介绍为适用于依赖持久状态和反复检查页面的专门流程。这些定位可以作为起点，最终仍要核对你使用的智能体和项目环境。\n\n如果你还要比较两种 MCP 接入方式，可读[Playwright MCP 与 Chrome DevTools MCP 对比](/zh-cn/guides/playwright-mcp-vs-chrome-devtools-mcp/)。需要连接已有登录浏览器时，可参考[Playwright MCP 连接现有浏览器指南](/zh-cn/guides/playwright-mcp-existing-browser/)。",
      "sections": [
        {
          "heading": "先分清 Playwright 的三个命令工具",
          "body": "Playwright CLI、Playwright MCP 和 Playwright Test 使用了相同的 Playwright 浏览器技术，但解决的问题不同。CLI 让开发者或智能体通过命令打开浏览器、查看页面、执行交互并保存结果。MCP 服务端通过 Model Context Protocol 暴露浏览器能力。Playwright Test 则运行编写好的测试文件，并管理项目、重试、断言和报告等配置。测试运行器本身也有命令行，所以如果只说“Playwright CLI”，容易把不同工具混在一起。编码智能体 CLI 的全局包是 @playwright/cli，可执行命令为 playwright-cli；项目已有 Playwright 依赖时，官方本地入口是 npx playwright cli。npx playwright test 启动测试运行器，npx playwright codegen 启动旧的代码生成命令。这些命令并不指同一产品。可查看 [编码智能体 CLI 指南](https://playwright.dev/agent-cli/introduction)、[CLI 仓库](https://github.com/microsoft/playwright-cli)和 [MCP 仓库](https://github.com/microsoft/playwright-mcp)。\n\n| 当前任务 | 建议先用 | 仍由你负责的部分 |\n| --- | --- | --- |\n| 让 IDE 或终端智能体查看页面并修改代码 | Playwright CLI | 定义断言并审查代码改动 |\n| 在 MCP 智能体运行时接入浏览器操作 | Playwright MCP | 设计智能体循环、权限和停止条件 |\n| 在 CI 运行稳定的回归检查 | Playwright Test | 维护测试数据、断言和失败排查 |\n| 把人工操作过程初步转成脚本 | Codegen，之后再编辑 | 换成稳定定位器并补上断言 |\n| 调查某次失败的具体步骤 | Trace Viewer | 确认真正原因并修复测试或应用 |\n\n这张表描述的是工作流选择，不代表某个接口通过任务更多。"
        },
        {
          "heading": "看智能体平时在哪里工作",
          "body": "如果编码智能体能在代码仓库中运行 shell 命令并读取生成的文件，CLI 会比较顺手。你可以让它打开浏览器、查看快照、点击页面，再保存截图，然后在同一任务里修改应用代码。CLI 也提供保存快照、截图、PDF 和存储状态的命令，并能查询网络请求、控制台消息、浏览器会话和 trace。智能体可以只读取需要的输出文件，不过命令仍会返回页面状态，不能据此认为上下文占用会消失。Microsoft 有完整的命令说明和可安装的 agent skill。若希望依赖版本记录在项目中，可以本地安装；若团队环境有统一命令，也可以全局安装。当前官方指南要求 Node.js 20 或更高版本。\n\n如果智能体宿主已经基于 MCP 管理工具，或者你的应用需要持久的服务端会话和连续检查不断变化的页面，MCP 会更合适。Playwright MCP 项目提供浏览器操作、页面快照、截图以及可选能力。宿主负责如何把工具定义展示给模型、如何把结果加入对话。部分桌面智能体的设置界面能直接添加 MCP 服务；有终端权限的仓库编码智能体则可能更容易检查 CLI 命令、写入脚本并与项目版本一起管理。不要假设“支持 MCP”就意味着你所需的所有能力都已启用，需按当前智能体版本核对。\n\n如果两种接入方式都可用，就用一个范围明确、已获授权的小任务比较。让两者打开公开演示页、找到带标签的控件、执行无害操作、保存页面状态并报告证据文件。记录配置耗时、能否人工观察浏览器、输出如何保存，以及同事能否重复执行。这里给出的是可自行执行的评估方案，本文没有跑过这个对照。"
        },
        {
          "heading": "安装 CLI 时别和测试运行器混为一谈",
          "body": "官方安装指南写了两条路径。若项目已经依赖 Playwright，可用项目中的版本运行 npx playwright cli；指南没有要求另外添加一个本地 @playwright/cli 包。需要共用的全局命令时，再执行 npm install -g @playwright/cli@latest 安装 @playwright/cli，并运行 playwright-cli。指南要求 Node.js 20 或更高版本。先查看命令帮助。只有当编码智能体支持本地 skill 时，才需要安装相应指引。skill 会告诉智能体有哪些命令，不会替你安装测试套件，也不能保证智能体每次都正确使用命令。依照项目已有的依赖评审和浏览器安装流程管理版本。\n\n可以用公开的 TodoMVC 演示做一次人工操作：在有界面浏览器中打开页面，输入一条样例事项，按 Enter，然后要求 CLI 查看快照并保存截图。每条命令执行后，CLI 会返回当前浏览器状态，也可以指向快照文件。编码智能体通过 shell 运行这些命令即可。提示词里应写出目标网址、允许操作、预期结果和停止条件。例如：查看演示页面，添加一条临时事项，确认它出现在列表中，保存截图，然后停止；不要操作演示站以外的页面。把命令和产物对应起来，方便复核。\n\n如果行为需要长期回归，就将已确认的流程整理成 Playwright Test 测试用例，并加入断言。单张截图只能说明某一刻看到的状态，不能保证后续版本仍然正确。Codegen 可以把浏览器操作转成脚本草稿，但生成结果仍需检查定位器是否稳定、测试之间是否隔离、断言是否验证了真正需要的结果。"
        },
        {
          "heading": "明确浏览器状态是否需要保留",
          "body": "状态生命周期可能影响选择。CLI 文档说明，默认浏览器资料保存在内存中：同一会话中的多条命令会保留 cookie 和存储；浏览器关闭后状态消失。使用持久化配置可以把资料保存到磁盘，以便重启后继续。CLI 支持给会话命名，减少不同项目误用同一浏览器的情况。应在提示词或包装脚本中明确会话选择，并在任务完成后关闭。\n\nPlaywright MCP 也有隔离与持久化模式。隔离模式下关闭浏览器会结束会话并清除其存储状态；项目还说明可以加载初始存储文件或用户资料目录。这样能简化重复登录，但也扩大了秘密和页面的可访问范围。Playwright 身份验证指南提醒，保存的浏览器状态可能包含能够冒用测试账号的 cookie 和请求头，并建议不要提交到源码仓库。使用专门的测试账号，把状态文件放在已加入 gitignore 的目录中，限制访问；若状态文件泄露，应轮换相关凭据。不要为了省略登录步骤，就让智能体使用你日常登录的个人浏览器资料。\n\n给智能体浏览器权限前，先写清它能访问哪些站点、是否可提交表单、文件能保存在哪里、使用哪个账号，以及哪些操作要人工确认。工具接口本身不会替你执行业务权限策略。智能体可能误读页面，也可能遇到网页中试图改变任务方向的内容。控制访问范围，并检查最终页面或证据文件。"
        },
        {
          "heading": "让浏览器检查过程可观察、可复核",
          "body": "探索网页时，循环保持简短会更好排查：先进入已知页面，对相关区域生成快照，阅读结果，执行一个动作，再查看新状态。CLI 默认可把快照保存成带时间信息的文件，也允许指定文件名或限制快照深度。这能让编码智能体只读取相关内容，减少反复获取整页输出。MCP 也支持页面快照和 find 搜索，可返回命中节点及上下文。遇到很长的后台页面时，两种工具都可能带回超出需要的文字。优先查找目标元素或只保存审查所需的证据。\n\n对代码改动，应把浏览器观察结果与实现结论分开。截图能显示当时的页面状态；测试通过表示本次运行中的已配置断言通过；两者都不能证明生产部署正确。保存网址、浏览器版本、测试账号类型、执行命令、产物位置和复现所需数据。分享前清理截图和快照中的个人信息。测试出现波动时，要分别查看失败尝试和重试结果，因为两次运行可能有不同状态或时序。\n\nPlaywright CLI 仍在更新。复制旧教程里的命令前，先查看当前仓库的命令说明。官方 CLI 现有资料包含 trace、网络检查、会话可视化面板和连接部分浏览器的功能。但工具有某条命令，不代表当前智能体宿主就有权限调用 shell、显示有界面浏览器或读取保存文件。"
        },
        {
          "heading": "容易遇到的配置误区",
          "body": "第一个误区是照着教程装错了命令。当前编码智能体 CLI 安装指南写了两条路径：项目已有 Playwright 依赖时，可直接运行 npx playwright cli；需要共用的全局命令时，再全局安装 @playwright/cli 并运行 playwright-cli。指南要求 Node.js 20 或更高版本。npx playwright test 启动的是 Playwright Test，npx playwright codegen 则运行代码生成器。复制教程前先看清它说的是哪个包和命令。\n\n另一个常见问题是只让智能体“测试网站”，却没有说明环境和预期结果。它可能转去浏览无关页面，或只报告网址能够打开，却没有验证关键功能。应提供目标路由、测试账号、明确断言和停止条件；不要让它在真实账号上执行不可逆操作。\n\n还要注意会话保存方式不同。CLI 默认会话在浏览器关闭后丢失存储状态，持久化模式则会把浏览器资料写入磁盘。MCP 的隔离模式关闭后也会丢弃状态，持久化配置的行为不同。反复遇到登录页时，先确认当前到底使用哪种模式。\n\n最后，不要把生成脚本直接当成完整测试。应替换不稳定的选择器，为用户可见结果补上断言，并在项目支持的浏览器配置中运行。一次性检查结束后，保存所需证据并关闭浏览器。"
        }
      ],
      "faq": [
        {
          "question": "Playwright CLI 和 npx playwright test 是同一个命令吗？",
          "answer": "不是。编码智能体 CLI 的全局包是 @playwright/cli，可执行命令是 playwright-cli；项目已有 Playwright 依赖时，官方本地入口是 npx playwright cli。npx playwright test 运行 Playwright Test，npx playwright codegen 则是独立的代码生成命令。"
        },
        {
          "question": "编码智能体应该用 Playwright CLI 还是 MCP？",
          "answer": "智能体已在终端工作、还要读取项目文件或修改代码时，可以先试 CLI。宿主以 MCP 工具为中心，或依赖 MCP 服务端的会话模型时，可评估 MCP。最终要在实际宿主中确认能力。"
        },
        {
          "question": "Playwright CLI 能替代 Playwright Test 吗？",
          "answer": "不能。CLI 可检查和操作浏览器；Playwright Test 则运行带断言、配置、重试和报告的测试。需要长期保护某项行为时，应把已验证的浏览器观察转成测试。"
        }
      ]
    }
  },
  "browser-agent-debugging-traces": {
    "en": {
      "title": "Debug browser-agent failures with Playwright traces",
      "description": "Capture the right Playwright run, inspect the failing action and page state, and share trace evidence safely when an agent or CI test fails.",
      "category": "AI browser development",
      "content": "When a browser agent or end-to-end test fails, a screenshot of the final page rarely explains whether the cause was a locator, navigation, timing, application error, or a retry that followed a different path. A Playwright trace records the action sequence and page state so you can inspect the failure after the run. For Playwright Test, enable tracing on the first retry in CI, find the trace attached to the correct run, then inspect the failing action and the state just before it. For current Playwright versions that include the trace-analysis commands, agents can also query actions and snapshots from the terminal. A trace is evidence about one execution; it does not by itself prove the root cause, reproduce the environment, or authorize sharing the captured page data.\n\nFor safe browser-agent boundaries, see [how to handle prompt injection in browser agents](/en/guides/browser-agent-prompt-injection/). If the workflow must retrieve a generated artifact, read [the browser-agent download guide](/en/guides/browser-agent-download-files/).",
      "sections": [
        {
          "heading": "Identify which run and which trace you need",
          "body": "Start with the test report, not with a random trace.zip file. A flaky test can have more than one result: the original failure, one or more retries, and an eventual pass. Each run may show a different page state. Record the test title, project or browser, retry number, and report link before opening the artifact. Playwright’s HTML report includes trace links for individual results. A reported Playwright issue in June 2026 described a case where selecting a retry but following the trace link opened the first run’s trace instead; the issue was closed and linked to a fix. Treat that report as a reason to check the selected run when investigating version-specific report bugs, not as evidence that current reports always open the wrong file. See [issue 41281](https://github.com/microsoft/playwright/issues/41281).\n\nThe JavaScript configuration shown in Playwright’s trace documentation records traces on the first retry. Your repository may have different retry or trace settings, so inspect its actual configuration before searching for a missing file. The relevant options include on-first-retry, on-all-retries, retain-on-failure, on, and off. The broad on mode can add substantial overhead because it records every test; Playwright recommends retry-based collection for CI troubleshooting. A local reproduction can force tracing with npx playwright test --trace on, or you can use UI Mode to inspect tests during development. Read the current project config and the [Trace Viewer guide](https://playwright.dev/docs/trace-viewer) first, since an old tutorial may describe defaults your repository no longer uses."
        },
        {
          "heading": "Open a trace locally or inspect it from the CLI",
          "body": "For a visual inspection, use the trace path from the selected test result and run npx playwright show-trace path/to/trace.zip. The Trace Viewer can also load a file in the browser at trace.playwright.dev. Playwright says that the hosted viewer loads the trace entirely in your browser and does not transmit the trace externally. A local viewer is a straightforward choice for CI artifacts or sensitive test pages; do not confuse a browser-based viewer with uploading the trace to a third-party ticket or chat. See [Playwright’s Trace Viewer instructions](https://playwright.dev/docs/trace-viewer).\n\nCurrent Playwright release notes also document command-line trace analysis for coding agents. In a version that supports these commands, start with npx playwright trace open path/to/trace.zip, list the actions with npx playwright trace actions, filter likely assertions with npx playwright trace actions --grep=expect, then inspect a specific action with npx playwright trace action 9. To capture a DOM snapshot around that action, use npx playwright trace snapshot 9 --name before or npx playwright trace snapshot 9 --name after. Replace 9 with the action number shown in your trace. Finish with npx playwright trace close. These commands are version-dependent; check npx playwright --help or the installed package’s official docs when the trace subcommand is unavailable. The familiar npx playwright show-trace command opens the visual viewer and is a different entry point.\n\nFor an AI coding agent, ask it to report the test title, run and retry, failing action, observed error, and the before/after page state. Ask it to stop after diagnosis and propose a minimal test or app change. This keeps “the test failed” separate from “the application is broken,” and leaves the code change for review. The [current release notes](https://github.com/microsoft/playwright/releases) describe trace commands for agents and show their output."
        },
        {
          "heading": "Read the timeline in an order that narrows the cause",
          "body": "In the Trace Viewer, select the failing action first. Read the error and action log, then inspect the page snapshot before the action. Ask what the test expected to exist, what the snapshot actually contains, and whether the locator matched the intended element. Compare the after snapshot next. If the page never reached the expected route, inspect the preceding navigation and network activity. If the element appeared after the assertion timed out, investigate waiting conditions, delayed application state, or an unstable external dependency. If the element is present but the click did nothing, check whether an overlay, disabled state, or different control intercepted the action.\n\nMove backward only as far as needed to find the first action where actual state diverges from expected state. A failure often appears at an assertion, while the cause happened earlier: a request returned an error, a consent panel covered the page, a redirect changed the route, or test setup loaded the wrong account. The trace viewer can show action timing, snapshots, logs, source, network requests, console messages, and errors for analysis. It records what the test observed, not a complete explanation of why the server returned a result. If backend state matters, correlate the request timestamp and test identifier with application logs that you are authorized to inspect.\n\nUse one hypothesis at a time. If the trace shows a missing control, check the route and data state before changing the locator. If the control is present under a different accessible name, inspect the application markup and use a user-facing locator that matches the intended label. If timing is the likely issue, wait for the actual state transition rather than increasing every timeout. Preserve the trace and record the change that made the rerun pass."
        },
        {
          "heading": "Capture traces that make intermittent failures diagnosable",
          "body": "For CI, Playwright’s documented setup is trace: on-first-retry with at least one retry. This records a trace when a test is retried after failure and avoids collecting every successful run. If a failure happens only on the first attempt and the retry passes, compare both run results when artifacts are present; the retry trace is not a recording of the original attempt. If your team needs traces for all retries, configure on-all-retries and account for artifact storage. For a test suite with no retries, retain-on-failure can preserve failed-test traces while removing successful ones. These options apply to Playwright Test configuration, not every script that happens to use Playwright.\n\nA minimal config is:\n\nimport { defineConfig } from '@playwright/test';\nexport default defineConfig({ retries: 1, use: { trace: 'on-first-retry' } });\n\nThis is a configuration example based on the official docs, not a configuration tested in this repository. Keep the trace adjacent to the specific test result and include the browser project and retry in artifact names or report metadata. Avoid overwriting the previous failure when a retry runs. If you use Playwright APIs without the Test runner, use BrowserContext tracing instead; start recording before page navigation and stop with a path for the resulting archive. The API guide and Test runner have different setup points, so copy the example that matches the code you run.\n\nA useful bug report pairs the trace with the exact command, Playwright version, browser project, test title, retry index, and a short note stating what result was expected. Do not attach unrelated storage files or a full user profile."
        },
        {
          "heading": "Protect page content and account state",
          "body": "A trace can contain screenshots and DOM snapshots of pages visited during the test, plus action details and debugging data. Those artifacts may reveal names, email addresses, internal URLs, records, or text entered into forms. Network details and console output can also expose application data. Review the contents before attaching a trace to a public issue, a vendor ticket, or an AI assistant. Use test accounts and synthetic records when practical, remove or mask sensitive values before sharing, and restrict CI artifact access and retention to the people who need it.\n\nKeep authentication state files separate from trace artifacts. Playwright warns that saved authentication state may contain cookies and headers that can impersonate the account, and advises against committing those files to source control. A trace and a storage state file are different artifacts, but both deserve access controls. Do not include storage-state JSON in the same public bundle as a trace. If you must share a trace externally, verify the destination, remove unrelated page data, set a short retention period, and revoke test credentials if you suspect exposure.\n\nThe hosted trace.playwright.dev viewer is documented as processing the selected trace in the browser without sending it elsewhere. That statement describes the viewer’s trace loading behavior; it does not remove your responsibility to protect the file, your browser session, downloads, backups, or the surrounding ticket. For internal data, keep the archive in the approved environment and use a local viewer when your policy requires it."
        },
        {
          "heading": "Troubleshoot a trace that is missing, empty, or hard to open",
          "body": "If there is no trace, confirm that the selected run matches the configured trace mode. on-first-retry will not create an archive for a test that passed on its first attempt, and off will never create one. Check the test-results folder and CI artifact upload step, then verify the artifact was not removed by a cleanup job. When an archive exists but the viewer reports that it cannot load it, check that the file is a complete Playwright trace archive and that the download finished. Compare its size with the CI artifact listing and try the local npx playwright show-trace command with the full path.\n\nVery large traces can be difficult to open or transfer. Playwright issue 39845, opened in March 2026, reports a Trace Viewer failure involving a large trace and a particular uncompressed trace entry; it is a specific issue report, not a general size limit or a guaranteed diagnosis. If your archive is unusually large, first capture fewer tests or use retry-only tracing, then retry the local viewer. Do not delete evidence from the only failing run before confirming another copy is available.\n\nIf the hosted viewer cannot fetch a trace from a local or internal network URL, try downloading the file and opening it locally. A [2025 issue about browser local-network permission behavior for a remote trace URL](https://github.com/microsoft/playwright/issues/38207) is historical and does not establish a current general restriction. For a CLI subcommand error, verify the installed Playwright version and consult its matching docs. An article or release note may describe a newer command than the version in your lockfile."
        },
        {
          "heading": "Avoid fixes that hide the original failure",
          "body": "Do not respond to every timeout by increasing all timeouts. A longer wait may hide a slow dependency or race without explaining the original failure. Do not replace a changing snapshot reference with an overly broad CSS selector; snapshot references are for that interaction and should not become permanent test identifiers. When a report contains multiple retries, open the trace attached to the selected run rather than assuming the first link is the failing attempt.\n\nA trace also cannot prove that an agent prompt caused a failure. Check whether the agent performed the intended action, what page state it observed, and whether the test timeout, account state, or fixtures differed. If the recorded action was wrong, tighten the instruction and stop condition. If the action was correct but the page response failed, investigate the application or test data. Make the smallest change supported by the trace, rerun the affected case, then run related tests.\n\nFor Playwright scripts outside the Test runner, browserContext.tracing records browser operations and network activity, but it does not record Playwright Test assertions such as expect calls. For assertion-aware failure debugging, enable tracing through Playwright Test configuration; the runner includes those assertions and produces a more complete test trace. This distinction matters when a trace shows clicks and requests but not why an expectation failed. The review standard is simple: another developer can identify the selected run, find the first unexpected state, and see why the fix follows from that evidence. No example trace was captured for this article."
        }
      ],
      "faq": [
        {
          "question": "How do I save a Playwright trace when a CI test fails?",
          "answer": "Configure Playwright Test with trace: on-first-retry and allow at least one retry. The first retry is recorded after an initial failure. Check the selected report result and CI artifact upload. For a local run, npx playwright test --trace on records every test run."
        },
        {
          "question": "Can I inspect a Playwright trace without a graphical viewer?",
          "answer": "Playwright v1.59 and newer document npx playwright trace commands for opening a trace and inspecting actions and snapshots. The exact subcommands depend on the installed version. The visual viewer can open a saved file with npx playwright show-trace path/to/trace.zip."
        },
        {
          "question": "Is it safe to attach a trace to a public issue?",
          "answer": "Review it first. A trace can contain screenshots, DOM snapshots, actions, and debugging details from private pages. Use synthetic test data, remove sensitive information where possible, and do not include authentication state files."
        },
        {
          "question": "Why is there no trace file for my failed run?",
          "answer": "Check the selected run, retry count, and recording mode. on-first-retry records on the first retry, while off records nothing. Then check the test-results directory and confirm CI uploaded artifacts before cleanup."
        }
      ]
    },
    "zh-cn": {
      "title": "用 Playwright Trace 排查浏览器智能体与测试失败",
      "description": "从选中正确的测试记录开始，查看失败动作及页面状态，并在安全范围内保存和分享 Playwright Trace 证据。",
      "category": "AI 浏览器开发",
      "content": "浏览器智能体或端到端测试失败后，一张最终页面截图通常无法说明问题来自定位器、导航、时序、应用报错，还是重试时走了不同路径。Playwright Trace 会记录操作过程与页面状态，方便在运行结束后回看。对 Playwright Test，可以在 CI 中配置首次重试时录制 trace，选中正确的运行记录，再检查失败动作及动作前的页面状态。较新的 Playwright 版本还提供面向编码智能体的命令行 trace 分析功能。Trace 只是某一次执行的证据，不能单独证明根因、复现运行环境，也不代表可以随意分享其中的页面数据。\n\n如果要为浏览器智能体设定网页内容边界，可读[浏览器智能体提示词注入指南](/zh-cn/guides/browser-agent-prompt-injection/)。工作流还需要取回生成文件时，可参考[浏览器智能体下载文件指南](/zh-cn/guides/browser-agent-download-files/)。",
      "sections": [
        {
          "heading": "先确认要看的运行记录和 Trace",
          "body": "从测试报告入手，不要随手打开一个 trace.zip。一次不稳定的测试可能有多个结果：初次失败、一次或多次重试，以及最终通过。每次运行看到的页面状态可能不同。打开附件前，先记下测试标题、项目或浏览器名称、重试次数和报告链接。Playwright HTML 报告会把 trace 链接对应到单个测试结果。2026 年 6 月，有开发者报告在某个版本中，选择了重试结果却打开第一次运行的 trace；该问题已关闭，并关联了修复。这个案例提醒排查特定版本问题时核对选中记录，不代表当前报告都会打开错误文件。参见 [issue 41281](https://github.com/microsoft/playwright/issues/41281)。\n\nPlaywright Trace 文档中的 JavaScript 配置会在首次重试时录制 trace。项目可能采用不同的重试或 trace 选项，查找缺失文件前应先读实际配置。可选模式包括 on-first-retry、on-all-retries、retain-on-failure、on 和 off。on 会为每个测试录制，增加明显的开销；Playwright 建议 CI 问题优先使用基于重试的录制。需要本地重现时，可以运行 npx playwright test --trace on，也可以在开发中使用 UI Mode。先读项目配置和 [Trace Viewer 官方指南](https://playwright.dev/docs/trace-viewer)，旧教程描述的默认值可能与当前仓库不同。"
        },
        {
          "heading": "本地打开 Trace，或用命令行查看动作",
          "body": "查看某个测试结果关联的 trace 路径，再运行 npx playwright show-trace path/to/trace.zip，即可打开可视化 Trace Viewer。也可以在浏览器中访问 trace.playwright.dev 并打开文件。Playwright 说明，托管版查看器完全在浏览器内载入 trace，不会向外部传输 trace 数据。CI 产物或敏感测试页面可以优先在本地检查；不要把浏览器查看器和把文件上传到第三方工单或聊天工具混为一谈。具体操作见 [Trace Viewer 文档](https://playwright.dev/docs/trace-viewer)。\n\nPlaywright 当前发布说明还记录了供编码智能体使用的命令行 trace 分析功能。在支持该命令的版本中，运行 npx playwright trace open path/to/trace.zip 打开记录；用 npx playwright trace actions 列出动作，或加上 npx playwright trace actions --grep=expect 筛选断言相关动作；然后运行 npx playwright trace action 9 查看指定动作。将 9 换成列表显示的动作编号。若要获取动作前后的 DOM 快照，可运行 npx playwright trace snapshot 9 --name before 或 npx playwright trace snapshot 9 --name after。完成后运行 npx playwright trace close。这些命令取决于 Playwright 版本；若没有 trace 子命令，请查看 npx playwright --help 和所安装版本的官方文档。常见的 npx playwright show-trace 命令则打开图形界面，两者入口不同。\n\n给编码智能体的任务可以要求它报告测试标题、具体运行及重试、失败动作、观察到的错误和前后页面状态。让它先停在诊断和最小改动建议，不要直接大范围重写。这样可以区分“测试失败”和“应用确实有问题”，代码改动也便于审查。[Playwright 当前发布说明](https://github.com/microsoft/playwright/releases)展示了面向智能体的 trace 命令及其输出。"
        },
        {
          "heading": "按时间线逐步缩小原因",
          "body": "在 Trace Viewer 中先选中失败动作。读错误和动作日志，再检查动作发生前的页面快照。确认测试要找什么、快照实际显示什么，以及定位器有没有匹配到目标元素。之后再看动作完成后的快照。如果页面没有进入预期路由，就检查前面的导航和网络活动。如果断言超时时控件才出现，可以调查等待条件、应用状态延迟或外部依赖。如果控件已经显示但点击没有生效，要看是否有遮罩、控件是否被禁用，或实际操作了其他按钮。\n\n向前回看，直到找到实际状态第一次偏离预期的位置即可。测试通常在断言处报错，但原因可能更早发生：请求返回错误、同意弹窗挡住页面、重定向改变了路由，或测试初始化加载了错误账号。Trace Viewer 可查看动作时间、页面快照、日志、源代码、网络请求、控制台消息和错误。Trace 呈现的是测试观察到的内容，不会自动解释服务器为什么返回该结果。若需要后端状态，使用你有权限查看的应用日志，并根据请求时间和测试标识进行关联。\n\n一次只检验一个原因假设。如果控件缺失，先核对路由和数据状态，再改定位器。如果控件在快照中显示了不同的可访问名称，检查应用标记，并选择符合目标标签的用户可见定位方式。如果更像时序问题，就等待真实状态变化，避免一味加大所有超时时间。保留 trace，并记录使重跑通过的改动。"
        },
        {
          "heading": "录制能定位间歇性失败的 Trace",
          "body": "Playwright 为 CI 推荐的配置是 trace: on-first-retry，并且至少允许一次重试。测试失败进入重试时才会录制，成功运行不会都留下 trace。如果首次失败但重试通过，且两次运行都有产物，应分别检查；重试 trace 不能代表初次失败现场。团队若需保存每次重试的 trace，可以配置 on-all-retries，同时计算工件存储成本。若测试没有重试，可用 retain-on-failure 保留失败 trace 并删除成功运行的记录。这些选项属于 Playwright Test 配置，不会自动作用于所有使用 Playwright 的脚本。\n\n最小配置示例：\n\nimport { defineConfig } from '@playwright/test';\nexport default defineConfig({ retries: 1, use: { trace: 'on-first-retry' } });\n\n这是根据官方文档整理的配置示例，本文没有在本仓库实测。让 trace 与具体测试结果对应，并在工件名或报告信息中标出浏览器项目和重试次数。避免重试运行覆盖首次失败记录。如果使用的不是 Test runner，而是 Playwright API，应改用 BrowserContext 的 tracing API；在页面导航前启动录制，结束时指定保存路径生成归档。两种用法的初始化位置不同，应采用与你实际运行代码相匹配的说明。\n\n一份便于排查的缺陷报告应同时记录确切命令、Playwright 版本、浏览器项目、测试名称、重试编号和预期结果。不要把无关存储文件或完整用户资料打包进去。"
        },
        {
          "heading": "保护页面内容和账号状态",
          "body": "Trace 可能包含测试经过页面的截图和 DOM 快照、操作细节与调试数据。这些内容可能暴露姓名、邮箱、内部网址、业务记录或表单输入。网络详情和控制台输出也可能包含应用数据。把 trace 发到公开 issue、厂商工单或 AI 助手前先检查内容。条件允许时使用测试账号和合成数据；分享前删除或遮盖敏感值，并限制 CI 工件的访问范围与保留时间。\n\n身份验证状态文件要与 trace 文件分开管理。Playwright 提醒，保存的认证状态可能包含可冒用账号的 cookie 和请求头，并建议不要提交到源码仓库。Trace 和存储状态文件不是同一类产物，但都需要访问控制。不要把 storage-state JSON 和 trace 一起放进公开压缩包。确需外发 trace 时，核实接收方，移除无关页面数据，设置较短的保留期限；若怀疑凭证泄露，应轮换测试凭据。\n\n官方说明称，托管的 trace.playwright.dev 查看器会在浏览器中载入所选 trace，不把 trace 传输给外部。这个说明描述的是查看器读取 trace 的方式，不会自动保护磁盘上的文件、浏览器会话、下载目录、备份或周边工单。处理内部数据时，应把压缩包留在批准的环境内；若组织政策要求本地查看，就使用本地查看器。"
        },
        {
          "heading": "排查 Trace 缺失、空白或无法打开",
          "body": "找不到 trace 时，先检查选中的运行记录、重试次数和 trace 模式。测试首次运行成功时，on-first-retry 不会生成 trace；off 模式则不会录制。再查看 test-results 目录和 CI 工件上传步骤，确认清理任务没有先删除文件。如果文件存在但查看器提示无法加载，先确认它是完整的 Playwright trace 归档，且下载已结束。比较本地文件大小与 CI 工件列表记录，再用带完整路径的 npx playwright show-trace path/to/trace.zip 在本地打开。\n\n体积很大的 trace 会增加打开与传输难度。Playwright issue 39845 于 2026 年 3 月报告，某个包含大型解压后条目的 trace 无法由 Trace Viewer 打开。这是一个特定问题报告，不是通用大小限制，也不足以直接诊断所有加载失败。若归档异常大，可以先只保留失败重试的记录，再用本地查看器打开。确认另有备份前，不要删除唯一一次失败的证据。\n\n如果托管查看器无法从本地或内网 URL 读取 trace，可以先下载文件并在本地打开。一份 [2025 年关于浏览器访问远端 trace 地址时本地网络权限行为的 issue](https://github.com/microsoft/playwright/issues/38207)属于历史报告，不能据此推断当前存在普遍限制。如果 CLI 提示找不到子命令，核对安装版本和对应文档。教程或发布说明中的命令可能比项目锁文件中的版本更新。"
        },
        {
          "heading": "避免用掩盖失败的改动结束排查",
          "body": "不要一遇到超时就把所有 timeout 都加大。更长的等待可能掩盖慢依赖或竞态，却没有解释原始失败。也不要因为快照引用编号变化，就换成过宽的 CSS 选择器；快照引用只适用于当次交互，不应成为长期测试标识。报告列出多次重试时，要打开对应失败运行的 trace，不要默认第一条链接就是失败尝试。\n\nTrace 不能单独证明问题由智能体提示词引起。检查智能体是否执行了预期动作、当时看到什么页面状态，以及测试超时、账号状态或 fixture 是否不同。如果记录显示动作本身有误，就收紧指令和停止条件；如果动作正确而页面响应异常，就调查应用或测试数据。依据证据做最小修改，重跑对应案例，再跑相关测试。\n\n对于 Playwright Test 运行器之外的脚本，browserContext.tracing 会记录浏览器操作和网络活动，但不会记录 expect 等 Playwright Test 断言。需要带断言信息的失败排查时，应通过 Playwright Test 配置启用 trace；测试运行器会把这些断言纳入更完整的测试 trace。理解这一区别很重要：trace 可能记录了点击和请求，却没有记录某个 expect 为什么失败。复核标准很直接：另一位开发者能确认查看的是哪次运行、找到第一个意外状态，并看懂修复如何对应证据。本文没有实际录制示例 trace。"
        }
      ],
      "faq": [
        {
          "question": "CI 测试失败时，怎样保存 Playwright Trace？",
          "answer": "在 Playwright Test 配置中设 trace: on-first-retry，并允许至少一次重试。首次失败后的第一次重试会被录制。核对报告选中的运行记录和 CI 工件上传步骤。本地可运行 npx playwright test --trace on，录制每次测试运行。"
        },
        {
          "question": "不用图形界面可以检查 Playwright Trace 吗？",
          "answer": "Playwright v1.59 及更高版本的发布说明包含 npx playwright trace 命令，可查看 trace 动作和快照。具体子命令取决于安装版本。可视化查看器可以通过 npx playwright show-trace path/to/trace.zip 打开存档。"
        },
        {
          "question": "把 Trace 附加到公开 issue 安全吗？",
          "answer": "先检查内容。Trace 可能包含私有页面的截图、DOM 快照、操作和调试信息。尽量使用合成测试数据，分享前清除敏感信息，也不要一起附上认证状态文件。"
        },
        {
          "question": "测试失败后为什么没有生成 Trace 文件？",
          "answer": "检查选中的运行记录、重试次数和录制模式。on-first-retry 只在首次重试录制，off 则完全不录制。随后检查 test-results 目录，并确认 CI 在清理之前已经上传工件。"
        }
      ]
    }
  }
};

const sources = {
  "cli": {
    "title": "Microsoft Playwright CLI: Coding agents guide",
    "url": "https://playwright.dev/agent-cli/introduction"
  },
  "installation": {
    "title": "Playwright CLI installation",
    "url": "https://playwright.dev/agent-cli/installation"
  },
  "cliRepo": {
    "title": "Microsoft Playwright CLI repository",
    "url": "https://github.com/microsoft/playwright-cli"
  },
  "cliSkills": {
    "title": "Playwright CLI: Skills",
    "url": "https://playwright.dev/agent-cli/skills"
  },
  "mcp": {
    "title": "Microsoft Playwright MCP repository",
    "url": "https://github.com/microsoft/playwright-mcp"
  },
  "trace": {
    "title": "Playwright: Trace Viewer",
    "url": "https://playwright.dev/docs/trace-viewer"
  },
  "traceIntro": {
    "title": "Playwright: Trace Viewer introduction",
    "url": "https://playwright.dev/docs/trace-viewer-intro"
  },
  "traceAPI": {
    "title": "Playwright: Tracing API",
    "url": "https://playwright.dev/docs/api/class-tracing"
  },
  "config": {
    "title": "Playwright: Test use options",
    "url": "https://playwright.dev/docs/test-use-options"
  },
  "auth": {
    "title": "Playwright: Authentication",
    "url": "https://playwright.dev/docs/auth"
  },
  "releases": {
    "title": "Playwright release notes",
    "url": "https://playwright.dev/docs/release-notes"
  },
  "issue": {
    "title": "Playwright issue 41281: HTML reporter opens the wrong trace run",
    "url": "https://github.com/microsoft/playwright/issues/41281"
  },
  "issueLarge": {
    "title": "Playwright issue 39845: Trace Viewer fails on a large trace",
    "url": "https://github.com/microsoft/playwright/issues/39845"
  },
  "issueNetwork": {
    "title": "Playwright issue 38207: Trace viewer local network access report",
    "url": "https://github.com/microsoft/playwright/issues/38207"
  }
};

export const aiToolsGuides: EditorialGuide[] = [
  {
    ...copies["playwright-cli-vs-mcp"]["zh-cn"],
    slug: "playwright-cli-vs-mcp",
    date: "2026-10-23",
    sourcePath: "src/data/ai-tools-2026-10-23.ts#playwright-cli-vs-mcp",
    availableLocales: ["en", "zh-cn"],
    relatedBrowsers: [],
    relatedTools: [],
    sources: [sources.cli, sources.installation, sources.cliRepo, sources.cliSkills, sources.mcp, sources.auth, sources.releases],
    relatedGuides: ["playwright-mcp-vs-chrome-devtools-mcp","browser-agent-download-files","browser-agent-structured-data-extraction","browser-use-existing-browser-session"]
  },
  {
    ...copies["browser-agent-debugging-traces"]["zh-cn"],
    slug: "browser-agent-debugging-traces",
    date: "2026-10-23",
    sourcePath: "src/data/ai-tools-2026-10-23.ts#browser-agent-debugging-traces",
    availableLocales: ["en", "zh-cn"],
    relatedBrowsers: [],
    relatedTools: [],
    sources: [sources.trace, sources.traceIntro, sources.traceAPI, sources.config, sources.auth, sources.issue, sources.issueLarge, sources.issueNetwork, sources.releases],
    relatedGuides: ["browser-agent-prompt-injection","browser-agent-download-files","browser-agent-structured-data-extraction","playwright-mcp-existing-browser"]
  }
];

export const aiToolsTranslations: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = copies;
