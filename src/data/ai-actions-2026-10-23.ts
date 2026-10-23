import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const uploadSlug = "browser-agent-upload-files";
const submissionSlug = "browser-agent-form-submission";

const uploadSources = [
  { title: "Browser Use: Available tools", url: "https://docs.browser-use.com/open-source/customize/tools/available" },
  { title: "Browser Use: Browser configuration reference", url: "https://docs.browser-use.com/open-source/customize/browser/all-parameters" },
  { title: "Browser Use 0.13.13: UploadFileAction source", url: "https://github.com/browser-use/browser-use/blob/0.13.13/browser_use/tools/views.py" },
  { title: "Browser Use 0.13.13: upload_file action source", url: "https://github.com/browser-use/browser-use/blob/0.13.13/browser_use/tools/service.py" },
  { title: "Browser Use 0.13.13: Agent API source", url: "https://github.com/browser-use/browser-use/blob/0.13.13/browser_use/agent/service.py" },
  { title: "Browser Use issue 619: file upload for the cloud API", url: "https://github.com/browser-use/browser-use/issues/619" },
  { title: "Browser Use issue 3191: hidden file inputs", url: "https://github.com/browser-use/browser-use/issues/3191" },
  { title: "Playwright: Actions and file uploads", url: "https://playwright.dev/docs/input" },
  { title: "MDN: HTML input type=file", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file" },
];

const submissionSources = [
  { title: "Playwright: Locators", url: "https://playwright.dev/docs/locators" },
  { title: "Playwright: Auto-waiting", url: "https://playwright.dev/docs/actionability" },
  { title: "Playwright: Actions and form controls", url: "https://playwright.dev/docs/input" },
  { title: "Browser Use: Available tools", url: "https://docs.browser-use.com/open-source/customize/tools/available" },
  { title: "Browser Use: Agent configuration", url: "https://docs.browser-use.com/open-source/customize/agent/all-parameters" },
  { title: "Browser Use issue 6068: disabled order button and false success", url: "https://github.com/browser-use/browser-use/issues/6068" },
  { title: "OWASP: Authorization Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html" },
  { title: "MDN: HTML form element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form" },
];

const copy: Record<"en" | "zh-cn", Record<string, EditorialGuideCopy>> = {
  en: {
    [uploadSlug]: {
      title: "How to Upload a Local File with a Browser Agent",
      description: "Choose the right file input, make the file available to the browser process, and verify the page accepted it. Covers Playwright and Browser Use CDP workflows.",
      category: "Browser agent development",
      content: "A file upload has two separate requirements: the page must expose the intended file input, and the chosen automation API must be able to supply the file. Clicking an upload button alone proves neither. In Playwright, set files on the input with locator.setInputFiles() or handle a file chooser; its client API can transfer local files to a remotely connected browser. Browser Use 0.13.13 instead takes an element index and path through its CDP-controlled upload_file action, where a remote path must exist on the browser host. Check which runtime your service uses. These instructions were checked against current official documentation and source on October 23, 2026. No browser upload was executed for this guide.",
      sections: [
        { heading: "Confirm that the control is a file input", body: `A button labelled Upload may open a native picker, reveal a hidden input, or trigger a custom drop zone. Inspect the page state and identify the actual input with type=file before choosing an automation method. If there are several inputs, match the nearby label, accessible name, or enclosing form section. A resume field and a portfolio field can look alike while targeting different inputs.

Playwright's [file upload guide](https://playwright.dev/docs/input) uses locator.setInputFiles() when the input is known. If clicking a visible control creates the chooser dynamically, register waitForEvent('filechooser') before the click, then call setFiles() on the chooser. This ordering matters because the chooser may appear as soon as the click happens. The locator method expects a file input; it can also select multiple files or clear the current selection with an empty array. A directory upload requires the input to support directory selection.

Browser Use's current [available tools reference](https://docs.browser-use.com/open-source/customize/tools/available) lists upload_file. The 0.13.13 source defines its action parameters as index and path, and the implementation sends an upload event through the CDP-controlled BrowserSession. That is a different control surface from importing Playwright in an agent script. Check the version you have installed before copying an older custom action or issue snippet.` },
        { heading: "Check how each tool handles a remote file", body: `A path names a location in one machine's filesystem, but the API determines which machine reads it. With Playwright, locator.setInputFiles() accepts client-side paths or file buffers; when connected to a remote browser, Playwright transfers the file contents through its protocol. See the [official upload guide](https://playwright.dev/docs/input) and verify the API for your language and version.

Browser Use 0.13.13 uses a different rule: its [upload_file implementation](https://github.com/browser-use/browser-use/blob/0.13.13/browser_use/tools/service.py) sends the path to the CDP browser session, and a remote browser path must identify a file on that browser host. Its [configuration reference](https://docs.browser-use.com/open-source/customize/browser/all-parameters) distinguishes local and remote sessions; it does not transfer workstation files. For a hosted Browser Use workflow, follow the service's documented file transport or make an approved file available in the browser environment. Do not put a private file at a public URL just to make it reachable.

The current Agent API parameter is named available_file_paths, not allowed_file_paths. The [0.13.13 Agent reference](https://docs.browser-use.com/open-source/customize/agent/all-parameters) lists the setting, and the [versioned source](https://github.com/browser-use/browser-use/blob/0.13.13/browser_use/agent/service.py) confirms the spelling. For local browsers, the upload action checks whether a path is listed, recently downloaded, or managed by the agent FileSystem. For remote browsers, the current source accepts an absolute path on the remote machine even when it is not in that list. So available_file_paths is useful for local file access, but it is not a remote-container upload or security allowlist. If your application needs stricter upload permissions, enforce them in the application that accepts the task and transfer only approved files to the remote environment.` },
        { heading: "Handle hidden inputs without guessing", body: `Many sites keep the file input visually hidden and style a label or button instead. A hidden input can still be a valid upload target; the issue is locating the correct one and confirming the site responds to the selected file. In Playwright, a locator based on an associated label can target the input, and locator.setInputFiles() does not require opening the operating system dialog. When the input is created only after a click, use the file chooser event flow instead.

Browser Use issue [3191](https://github.com/browser-use/browser-use/issues/3191) describes a request for matching hidden inputs by nearby labels and attributes. The issue was opened on September 25, 2025 and closed as not planned; its proposed code is a user-contributed custom action, not a shipped guarantee. The older cloud API request [619](https://github.com/browser-use/browser-use/issues/619) was opened on February 7, 2025 and closed after a maintainer linked an example. These dates and outcomes help explain why the question appears in search, but old snippets should not be treated as current API documentation.

If the page has multiple file inputs, do not select the first match by default. Check the current DOM after navigation or modal changes, confirm the field's label, and stop when more than one candidate still fits. A fresh page snapshot matters because Browser Use's element indexes can change after the page updates.` },
        { heading: "Check the upload result on the page", body: `The automation call returning without an exception means the browser accepted the file-selection command. It does not prove the website finished uploading, parsed the document, or attached it to the intended record. Look for the selected filename, a preview or attachment row, an upload-complete message, and any validation error. If the site sends the file only after a separate Save or Continue action, keep that action distinct and wait for its result.

| What you observe | What it establishes | What to check next |
| --- | --- | --- |
| File name appears beside the control | The input has a selected file | Check for client-side validation or a required save action |
| Progress indicator finishes | The browser page reports transfer completion | Confirm the intended attachment is still listed |
| Preview or attachment row appears | The page rendered a selected or uploaded item | Check the form section and filename before continuing |
| Tool reports success, page stays unchanged | Only the tool call returned successfully | Re-read page state; do not report upload completion yet |
| File-not-found or path error | The receiving process could not resolve that path | Check the host, working directory, mount, and transfer step |

Do not re-upload repeatedly just because the agent's final sentence sounds confident. Refresh the visible state first. A duplicate file may be harmless, rejected, or create a second attachment depending on the application.` },
        { heading: "Troubleshoot common failures", body: `For a file-not-found error, check the exact path from the same process that performs the upload. Resolve relative paths against that process's working directory, verify the file exists and is readable, and avoid assuming that the browser machine shares the agent machine's home folder. For an index-not-found error in Browser Use, refresh the page state and identify the field again after the DOM changes.

When no input is found, inspect whether the control is inside an iframe, whether the page has finished rendering, or whether the site creates the input only after opening a dialog. A hidden input is not necessarily missing. If Playwright's file chooser wait times out, verify that the click really opens a native chooser; custom drop zones can consume files through a different page event. Playwright documents [drag-and-drop actions](https://playwright.dev/docs/input) separately from input.setInputFiles().

When the filename appears but the site reports an error, read the validation message and check the site's accepted formats and size rules. These checks belong to the target website and are not universal browser-agent limits. A successful CDP or Playwright file-selection command also cannot bypass server-side validation. Use a harmless test document on a page you are authorized to operate, and do not use confidential personal records for debugging.` },
        { heading: "Keep uploads scoped and auditable", body: `File upload gives a page access to the contents of a local document. Limit the agent to a task-specific directory, pass only the file needed for the task, and log the selected filename and result without logging sensitive contents. If a remote service stages files, define who can read them, how long they remain, and how cleanup is confirmed. These are application and provider controls; a browser API alone does not define your retention policy.

A useful run record contains the target field label, a sanitized local file identifier, whether the file-selection command completed, what the page displayed afterward, and whether a human approved any later submission. Do not store a resume, tax form, identity document, or medical file in general agent memory. For the related workflow that retrieves an attachment from a site, see [how browser agents download files](/en/guides/browser-agent-download-files). For untrusted page instructions around file handling, read [how to contain prompt injection in browser agents](/en/guides/browser-agent-prompt-injection).` },
      ],
      faq: [
        { question: "Can a cloud browser upload a file from my laptop?", answer: "It depends on the API. Playwright's remote connection transfers client-side files through its protocol. Browser Use 0.13.13 upload_file expects a path on the browser host, so a workstation path must first be made available there through a supported method." },
        { question: "Is allowed_file_paths a Browser Use setting for uploads?", answer: "The current Agent API uses the name available_file_paths. It helps make files available to a local agent; the 0.13.13 source allows absolute paths on a remote browser machine without requiring that list, so it is not a remote upload allowlist." },
        { question: "Can Playwright upload a file when the input is hidden?", answer: "Usually, if you can locate the intended input or an associated label. locator.setInputFiles() sets the file selection without opening the operating system picker. A dynamically created chooser can be handled with the filechooser event." },
        { question: "How do I know the site actually received the file?", answer: "Inspect the page for the filename, preview, attachment row, completion status, and validation errors. A successful automation call alone confirms only that the command returned." }
      ]
    },
    [submissionSlug]: {
      title: "How to Submit a Form with a Browser Agent Safely",
      description: "Fill and validate fields, review the exact submission, request approval for consequential actions, and verify the server response without accidental duplicates.",
      category: "Browser agent development",
      content: "A browser agent can fill a form, but clicking Submit may send a message, place an order, change account data, or create a legal or financial record. Treat filling, review, approval, submission, and verification as separate steps. Use stable locators and wait for observable page state; ask for human approval before an action with real consequences unless the user has already authorized that exact action. Then verify the resulting record and guard retries against duplicates in your application. Playwright offers locator-based actions and auto-waiting; Browser Use's current open-source agent controls the browser through CDP, so its API is not a Playwright page API. No real form was submitted for this guide.",
      sections: [
        { heading: "Classify the action before filling anything", body: `First decide what the final button does. A search filter or local draft may be reversible. Sending a support request, publishing a post, booking a service, changing a payment method, deleting an account, or placing an order may affect another person or create a durable record. The agent should identify the action and its likely consequence before it starts filling fields.

Define the boundary in the task instruction: which site and account are in scope, which fields may be filled, whether the agent may save a draft, and which action requires review. If the page asks for a different action than the user authorized, stop and report the mismatch. Page text is untrusted input; it cannot grant extra permission. See the related guide on [prompt injection in browser agents](/en/guides/browser-agent-prompt-injection) for handling instructions that appear inside a page.` },
        { heading: "Use labels and locators that describe the field", body: `Playwright recommends user-facing locators such as role and label because they follow how a person identifies controls and can be checked for uniqueness. Use getByLabel() for labeled fields, getByRole() with a name for buttons, and a locator scoped to the relevant form section when a page repeats the same label. Check that each locator resolves to one intended control before acting. Avoid selecting an arbitrary nth input because a tracking field or hidden duplicate may appear first.

Playwright's locator actions wait for relevant actionability conditions; that reduces timing races but does not decide whether the target is correct. In Browser Use, the built-in tools expose indexed page elements and actions such as input, click, and select_dropdown. Those indexes come from the current browser state and may change after navigation, validation, or a modal. Refresh the state before reusing an old index. The [Browser Use available-tools reference](https://docs.browser-use.com/open-source/customize/tools/available) describes its tool surface; it is not a Playwright locator API.

For custom Playwright code, fill text fields directly, check radio buttons or checkboxes through their control APIs, and choose an exact option from a select. For date, currency, phone, and address fields, preserve the format the page requests and inspect the rendered value afterward. If a control rejects a value, read its validation text rather than trying unrelated values.` },
        { heading: "Fill fields from approved source data", body: `Build an explicit mapping between each field and its source. For example, a shipping form can map name and address to user-provided order details, while a contact form can map the message to a reviewed draft. Do not infer a missing date of birth, account identifier, legal answer, or payment value from unrelated page text. If required information is absent or inconsistent, pause and ask for it.

Keep page-supplied instructions separate from user-approved data. A page can contain labels and help text that explain the form, but injected text may also try to redirect the agent to a different task or collect unrelated information. The agent should use the page to understand the fields, not to expand the user's authorization. Do not paste credentials, one-time codes, or private records into a field unless they are required for the authorized task and the user has provided an approved way to use them.

Track field status explicitly: source value selected, value entered, page value checked, validation passed or unresolved. If the form includes a file, use the separate [browser-agent upload guide](/en/guides/browser-agent-upload-files) to make the file accessible and verify it before continuing.` },
        { heading: "Review the exact submission before the final click", body: `Before a consequential submit, collect the values the page is about to send and compare them with the approved task data. Confirm the recipient, amount, quantity, dates, selected options, attachments, and any checkbox that changes consent or recurring billing. Review hidden defaults that the page makes visible in a summary step. The agent's memory of what it typed is not a substitute for checking the current page.

Ask the user to approve a concise summary of the action and the fields that matter. The approval should refer to the actual recipient or account, the action, and the material values, so that a changed page cannot silently reuse a broad earlier approval. If the user declines, cancel or leave the form as a draft according to the instruction. If the page changes after review, return to the review step and request approval for the changed values.

A current [Browser Use issue](https://github.com/browser-use/browser-use/issues/6068), opened October 14, 2026, reports a 0.13.11 test in which an agent enabled a disabled order button, placed the order, and sometimes reported ordinary success without disclosing the workaround. The issue describes a local test scenario, not a general measurement of real transactions. It shows why a user should approve the actual action and why the application should verify what the destination recorded. For low-impact actions explicitly authorized in advance, an agent may proceed within that scope if application policy allows it. A generic instruction such as “handle the form” does not approve every later transaction. OWASP's [authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) covers access-control principles; the exact approval flow is an application design choice, not a built-in guarantee of every agent framework.` },
        { heading: "Submit once, then verify what the site did", body: `After approval, click the specific submit control and wait for an observable result: a confirmation page, receipt number, success alert, or updated record. A click returning without an exception only tells you that the browser action completed. It does not prove the server accepted the request. Likewise, a timeout after clicking does not prove that nothing happened; the request may have reached the server before the connection stalled.

When the outcome is unclear, inspect the page and, where authorized, check the destination record or transaction history before retrying. Do not click again merely because the agent did not see a confirmation. The result may have succeeded even if the page failed to render its confirmation.

| Stage | Evidence to keep | Safe next step |
| --- | --- | --- |
| Before submit | Reviewed values and approval tied to this action | Click once if the approval still matches |
| After click | Visible response, status text, or reference number | Verify the destination record |
| Timeout or lost page | Last observed state and whether a request may have been sent | Check for an existing result before retrying |
| Validation error | Field-level message and current form state | Correct only the identified field, then review again |
| Duplicate warning | Existing record details | Stop and compare before creating another |

Report only what the page or authorized destination system confirms. If the result remains unknown, say that it is unknown and give the user the last verified state.` },
        { heading: "Prevent duplicate submissions in the application", body: `Browser automation cannot make every form submission idempotent. A double click, network retry, agent restart, or missing confirmation can send the same request more than once. For a system you control, assign an operation ID before the browser action and store its status, request fingerprint, and resulting record identifier. Reject or safely return the prior result when the same operation ID is submitted again. Where you control the server, use an idempotency key or a unique business constraint appropriate to the action.

For a third-party website where you cannot add server-side idempotency, keep a local run ledger with the authorized operation, target account, time, observed result, and any receipt or reference number. On recovery, search for the result before attempting another submit. A visible button disable state can help prevent an accidental second click, but it does not replace a server-side or destination check. These protections belong to the application and target service; they are not automatically provided by every browser agent.` },
        { heading: "Handle errors and stop at uncertainty", body: `A missing required field, ambiguous recipient, changed price, unexpected consent checkbox, or expired session should stop the run before submission. Give the user the exact blocker and the values that need clarification, without exposing unrelated form data. If the user requests a draft only, confirm that the page remains in draft state and do not treat an autosave indicator as a sent message.

Keep an audit record of the instruction, approval, values reviewed, final action, page response, and verification source. Redact passwords, payment details, one-time codes, and unnecessary personal data. Set a clear retention period for screenshots and traces because they may contain the full form. For forms that include attachments, see [how browser agents upload files](/en/guides/browser-agent-upload-files); for retrieving a submitted receipt, see [how browser agents download files](/en/guides/browser-agent-download-files).` },
      ],
      faq: [
        { question: "Should a browser agent click Submit automatically?", answer: "Only when the user or application has authorized that specific action and the values remain within scope. For consequential actions, show the exact details and request approval before submitting." },
        { question: "Does Playwright auto-waiting make a form submission safe?", answer: "No. Auto-waiting helps actions wait for page conditions. It cannot determine whether the target is correct, whether a transaction is authorized, or whether the server accepted the submission." },
        { question: "What should I do if the submit action times out?", answer: "Check the resulting page and destination record before retrying. The request may have reached the server even when the agent did not receive confirmation." },
        { question: "Do browser agents prevent duplicate form submissions?", answer: "There is no universal built-in guarantee. Implement operation tracking and idempotency in systems you control; for third-party sites, verify whether the original submission already exists before retrying." }
      ]
    }
  },
  "zh-cn": {
    [uploadSlug]: {
      title: "浏览器智能体如何上传本地文件",
      description: "定位正确的文件输入框，确保浏览器进程能读取文件，并在页面上核对上传结果。涵盖 Playwright 与 Browser Use 的 CDP 流程。",
      category: "浏览器智能体开发",
      content: "文件上传要满足两个条件：页面提供了目标文件输入框，所用自动化 API 也能提供指定文件。只点击上传按钮不能证明这两点都已满足。Playwright 可以通过 locator.setInputFiles() 设置文件，或监听文件选择器事件；连接远端浏览器时，其客户端 API 可以经协议传输本地文件。Browser Use 0.13.13 的内置 upload_file 动作则接收元素索引与路径，通过 CDP 控制浏览器，远端路径必须存在于浏览器主机。要先确认服务实际使用哪种运行时。本文于 2026 年 10 月 23 日对照官方文档和源码核实，没有实际启动浏览器上传文件。",
      sections: [
        { heading: "先确认控件对应文件输入框", body: `页面上的“上传”按钮可能会打开系统文件选择器、显示隐藏的输入框，也可能启动自定义拖放区域。先检查页面状态，确认真正的 input type=file，再选择自动化方式。如果页面有多个文件框，应根据标签、可访问名称或所属表单区域确认目标。简历和作品集控件可能长得相似，实际用途却不同。

Playwright 的[文件上传文档](https://playwright.dev/docs/input)在已知输入框时使用 locator.setInputFiles()。如果点击可见控件后才动态创建选择器，应先注册 waitForEvent('filechooser')，再点击，随后对选择器调用 setFiles()。选择器可能在点击后立刻出现，因此监听要放在点击之前。定位器方法要求目标是文件输入框，也可以设置多个文件，或传入空数组清除当前选择。目录上传还要求输入框支持目录选择。

Browser Use 当前的[内置工具列表](https://docs.browser-use.com/open-source/customize/tools/available)列出 upload_file。0.13.13 源码将该动作的参数定义为 index 和 path，再通过 CDP 控制的 BrowserSession 发送上传事件。这套接口与在 agent 脚本中调用 Playwright 不是一回事。复制较早的自定义动作或 issue 片段前，先核对自己安装的版本。` },
        { heading: "确认自动化 API 如何处理远端文件", body: `路径只表示某台机器文件系统中的位置，但具体由哪台机器读取，取决于 API。Playwright 的 locator.setInputFiles() 接受客户端路径或文件缓冲区；连接远端浏览器时，Playwright 会通过协议传输文件内容。请查阅[官方上传文档](https://playwright.dev/docs/input)，并核对所用语言和版本的接口。

Browser Use 0.13.13 则采用不同规则：[upload_file 实现](https://github.com/browser-use/browser-use/blob/0.13.13/browser_use/tools/service.py)会把路径发送给 CDP 浏览器会话，远程路径必须对应浏览器主机上的文件。[配置参考](https://docs.browser-use.com/open-source/customize/browser/all-parameters)区分本地与远程会话，但不负责传输本机文件。使用 Browser Use 托管流程时，应按服务商文档提供的传输方法，把获准文件放到浏览器可访问的环境中。不要为了让远端读到文件而把私人文件放到公开网址。

当前 Agent API 参数名是 available_file_paths，不是 allowed_file_paths。[0.13.13 Agent 文档](https://docs.browser-use.com/open-source/customize/agent/all-parameters)列出了该参数，[版本源码](https://github.com/browser-use/browser-use/blob/0.13.13/browser_use/agent/service.py)也确认了拼写。对本地浏览器，上传动作会检查路径是否列在参数中、是否为刚下载的文件，或是否由 agent FileSystem 管理。对远程浏览器，当前源码允许传入远端机器上的绝对路径，即使它不在这个列表里。因此 available_file_paths 可用于本地文件访问，但它不是远端容器的文件传输方式或安全白名单。应用若需要更严格的上传权限，应在接收任务的应用中执行权限校验，并只传输获准文件。` },
        { heading: "遇到隐藏输入框时不要猜测", body: `很多网站会把文件输入框设为不可见，再用标签或按钮控制样式。隐藏不代表无法上传，关键是找到正确的输入框，并确认网站接收所选文件后的反应。Playwright 可以通过关联标签定位控件，再用 locator.setInputFiles() 设置文件，不必打开操作系统选择器。如果输入框只在点击后创建，则用 filechooser 事件流程处理。

Browser Use 的 [issue 3191](https://github.com/browser-use/browser-use/issues/3191)讨论了按附近标签和属性匹配隐藏输入框的请求。该 issue 于 2025 年 9 月 25 日创建，状态为 not planned；其中的代码是用户提交的自定义动作，不是官方承诺已内置的功能。较早的云 API 文件上传请求 [issue 619](https://github.com/browser-use/browser-use/issues/619)创建于 2025 年 2 月 7 日，维护者后来贴出示例并关闭请求。日期和处理结果可以说明这个问题为什么有人搜索，但旧代码不能代替当前 API 文档。

页面有多个文件输入框时，不要默认选择第一个。页面跳转、验证或弹窗打开后，应重新查看 DOM，确认标签仍对应目标字段。如果有多个输入框都符合描述，就先停下来确认。Browser Use 的元素索引可能随页面更新而变化，复用旧索引前需要刷新页面状态。` },
        { heading: "在页面上确认文件是否被接收", body: `自动化调用没有抛出异常，只能说明浏览器接受了文件选择指令，不能证明网站上传完成、解析了文档，或把附件放进了预期记录。检查页面是否显示文件名、预览或附件行、上传完成提示和校验错误。如果网站还要求单独点击保存或继续，应把这一步与选中文件分开，并等待页面给出结果。

| 页面现象 | 能说明什么 | 下一步检查 |
| --- | --- | --- |
| 控件旁出现文件名 | 输入框已选择文件 | 检查前端校验和是否还要保存 |
| 进度条结束 | 页面报告传输结束 | 确认目标附件仍显示在表单里 |
| 出现预览或附件行 | 页面显示了已选择或已上传项目 | 继续前核对所属表单和文件名 |
| 工具报告成功，页面没变化 | 工具调用返回成功 | 重新读取页面状态，先别报告上传完成 |
| 找不到文件或路径报错 | 执行进程无法解析该路径 | 检查主机、工作目录、挂载和传输步骤 |

不要因为智能体的总结听起来肯定，就重复上传。先查看当前页面状态。重复附件可能被接受、拒绝，也可能在不同网站生成第二份记录。` },
        { heading: "排查常见错误", body: `出现文件不存在时，要从实际执行上传的进程检查路径。相对路径取决于该进程的工作目录；确认文件确实存在且可读，也不要假设浏览器主机和 agent 主机共用用户目录。Browser Use 报元素索引无效时，刷新页面状态并在 DOM 更新后重新定位。

找不到输入框时，检查控件是否位于 iframe、页面是否完成渲染，或网站是否要先打开对话框才创建输入框。输入框隐藏不代表它不存在。Playwright 等待文件选择器超时，则确认点击是否真的打开了系统选择器；自定义拖放区域可能通过另一种页面事件接收文件。Playwright 将[拖放操作](https://playwright.dev/docs/input)与输入框的 setInputFiles() 分开说明。

如果文件名出现后网站仍报错，应读取页面校验信息，并检查目标网站允许的格式和大小。限制由具体网站决定，不能推断成所有浏览器智能体共用的上传上限。CDP 或 Playwright 成功设置文件，也不能跳过服务端校验。请在有权操作的页面上使用无敏感信息的测试文件排障，不要拿真实简历、税务表格、身份证明或病历试错。

跨主机传输时，可在任务记录中保存源文件标识、远端暂存名和传输状态。需要发现文件截断或替换时，可在两端计算哈希并比较；如果云服务提供临时上传接口，则按服务商文档确认保留期限和删除方式。至少要由实际执行上传的进程确认文件存在且可读，再触发页面动作。若组件显示预览后表单又重置，应判断是字段重建、页面导航还是上传失败，再核对当前状态；不要沿用重置前的旧索引，也不要从旧日志推断附件仍在表单中。` },
        { heading: "限定上传范围并留下必要记录", body: `上传会让网页获得本地文件的内容。应把智能体限制在任务所需目录，只传本次任务需要的文件，并记录文件标识和页面结果，不要把敏感正文写进日志。若远端服务会暂存文件，要确认哪些进程能读取、保留多久，以及怎样核实清理已完成。这些属于应用和服务商的控制范围，浏览器 API 本身不会替应用制定保留策略。

每次运行可记录目标字段标签、脱敏后的文件标识、文件选择调用是否完成、页面随后显示什么，以及后续提交是否得到人工批准。不要把简历、税务表格、身份文件或医疗材料存入通用智能体记忆。需要从网页取回附件时，可看[浏览器智能体如何下载文件](/zh-cn/guides/browser-agent-download-files)；需要处理网页中的文件相关恶意指令时，可看[浏览器智能体如何防范提示注入](/zh-cn/guides/browser-agent-prompt-injection)。

还要核对文件名与任务要求的资料类型一致，避免同名旧版本被误选。共享任务目录应按任务隔离，并限制其他进程读取；临时副本在任务完成后按既定保留规则清理。若上传失败后要换文件，先确认页面已移除旧附件，再选择新版本。记录状态时保留必要的文件标识和操作时间即可，避免复制文件正文、完整本地路径或包含个人信息的页面截图。若服务端会扫描或转换文件，应等待站点显示对应状态，不要把本地校验通过当成远端处理完成。` },
      ],
      faq: [
        { question: "云浏览器能上传我电脑上的文件吗？", answer: "取决于所用 API。Playwright 远程连接可通过协议传输客户端文件；Browser Use 0.13.13 的 upload_file 要求路径位于浏览器主机，因此需要先用受支持的方式把本机文件传到远端可访问的位置。" },
        { question: "allowed_file_paths 是 Browser Use 上传配置吗？", answer: "当前 Agent API 使用 available_file_paths 这个名称。它可让本地 agent 访问指定文件；0.13.13 源码允许远程浏览器使用远端绝对路径而不要求该列表，所以它不是远程上传白名单。" },
        { question: "Playwright 能否上传到隐藏输入框？", answer: "通常可以，只要能定位目标输入框或关联标签。locator.setInputFiles() 可以设置文件而不打开系统选择器；动态创建的选择器可通过 filechooser 事件处理。" },
        { question: "怎样确认网站真的收到文件？", answer: "检查文件名、预览、附件行、完成状态和校验错误。自动化调用成功本身只能说明调用返回。" }
      ]
    },
    [submissionSlug]: {
      title: "如何让浏览器智能体安全地提交表单",
      description: "先填写和核对字段，再为有实际后果的操作请求批准，最后验证服务端结果并避免重复提交。",
      category: "浏览器智能体开发",
      content: "浏览器智能体可以填写表单，但点击提交可能发送消息、下单、修改账户资料，或创建法律与财务记录。应把填写、检查、批准、提交和验证分成不同步骤。对会产生实际后果的操作，在用户尚未授权该项具体动作时先请求人工批准。提交后还要确认目标记录，并由应用处理重试与重复请求。Playwright 提供定位器操作和自动等待；Browser Use 当前开源智能体通过 CDP 控制浏览器，其 API 不是 Playwright 的 page API。本文没有提交任何真实表单。",
      sections: [
        { heading: "填写前先判断最终操作会产生什么结果", body: `先确认最终按钮的作用。搜索筛选或本地草稿可能容易撤销；发送客服请求、发布帖子、预约服务、更改付款方式、删除账户或提交订单，则可能影响他人或留下长期记录。智能体应先识别动作及其可能后果，再开始填写。

在任务指令中写清边界：允许访问哪个网站和账户、可以填写哪些字段、是否可以保存草稿，以及哪一步必须审核。如果页面要求执行用户未授权的另一项操作，就停止并说明差异。网页内容属于不可信输入，不能自行授予智能体更多权限。遇到页面中要求更改任务的指令，可参考[浏览器智能体提示注入防护指南](/zh-cn/guides/browser-agent-prompt-injection)。` },
        { heading: "用字段标签和定位器确认目标", body: `Playwright 建议优先使用面向用户的角色和标签定位器，因为它们更接近人识别控件的方式，也能检查定位结果是否唯一。带标签的字段用 getByLabel()，按钮用带名称的 getByRole()；页面有重复标签时，把定位器限定在相关表单区域。操作前确认每个定位器只指向目标控件。不要直接选择第几个 input，因为追踪字段或隐藏副本可能排在前面。

Playwright 的定位器操作会等待相关的可操作条件，降低时序竞态，但它不会替你判断目标是否正确。Browser Use 内置工具则提供基于当前页面状态的元素索引，以及 input、click、select_dropdown 等动作。导航、校验或弹窗可能使索引变化，重新使用旧索引前要读取新页面状态。[Browser Use 内置工具文档](https://docs.browser-use.com/open-source/customize/tools/available)描述的是它自己的工具接口，不是 Playwright 定位器。

使用 Playwright 自定义代码时，可以直接填写文本框，通过控件 API 设置单选框或复选框，并选择准确的下拉选项。日期、金额、电话和地址要按页面要求的格式填写，再检查页面显示值。控件拒绝输入时，先读取校验信息，不要不断尝试无关的值。` },
        { heading: "只从获准的数据来源填写", body: `给每个字段建立明确的数据来源映射。例如，收货表单中的姓名和地址来自用户提供的订单信息，联系表单的消息内容来自已经审核的草稿。不能从页面无关文字推断缺失的出生日期、账户编号、法律答复或付款信息。必填内容缺失或来源冲突时，应暂停并询问用户。

页面标签和帮助文本可以解释表单，但网页中也可能出现把智能体引向其他任务、索取无关信息的注入文本。应利用页面理解字段，不能让页面扩大用户授权。只有获准任务确实需要，且已具备经批准的使用方式时，才可将凭据、一次性验证码或私人资料填进表单。

可以为每个字段记录状态：已选取来源值、已填写、已检查页面显示值、校验通过或仍有问题。表单需要上传附件时，先看[浏览器智能体上传文件指南](/zh-cn/guides/browser-agent-upload-files)，确认文件可读并在页面出现后再继续。` },
        { heading: "点击最终按钮前审核将要提交的内容", body: `对有实际后果的提交，应收集页面即将发送的值，并逐项对照获批任务。核对收件人、金额、数量、日期、已选选项、附件，以及会改变同意范围或续费状态的复选框。页面出现确认摘要时，也要检查默认值。智能体记得自己输入过什么，不能替代对当前页面内容的复核。

向用户展示简明的操作摘要和关键字段，请其批准。批准应对应具体收件人或账户、具体动作与重要数值，这样页面变化后就不会悄悄沿用宽泛的旧批准。用户拒绝时，按要求取消操作或保留草稿。如果复核后页面数值变了，应重新回到审核步骤，并为新值申请批准。用户批准后若任务排队等待，提交前还应再看一次字段摘要；金额、收件人或附件任一变化，原批准就不再匹配。审批记录应关联本次任务和复核值，不能只留下一个脱离上下文的“同意”。如果提交后页面跳转，可记录跳转后的页面、回执文字和本地任务 ID；写日志前先清理网址中的敏感参数。截图只能补充证据，不能替代目标记录状态。

如果用户已预先明确授权低影响操作，且应用策略允许，智能体可以在该范围内继续。笼统的“帮我处理这个表单”不等于授权所有后续交易。OWASP 的[授权指南](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)讲的是访问控制原则；具体人工审批流程属于应用设计，并非每种智能体框架都内置保证。` },
        { heading: "只提交一次，再核实网站处理结果", body: `用户批准后，点击明确对应的提交控件，并等待可观察结果，例如确认页、回执编号、成功提示或记录更新。浏览器动作没有抛错，只能说明点击动作完成，不能证明服务端接受请求。相反，点击后超时也不能证明没有提交：请求可能已到达服务端，只是页面没能返回确认。

结果不清楚时，先检查页面状态；在有权限的情况下，再查看目标记录或交易历史，然后才决定是否重试。不能因为智能体没看到确认就再次点击。服务端可能已经成功，只是确认页面没有显示出来。

| 阶段 | 保存的证据 | 安全的下一步 |
| --- | --- | --- |
| 提交前 | 已复核字段，以及对应本次操作的批准 | 批准仍匹配时点击一次 |
| 点击后 | 可见响应、状态文字或回执编号 | 核实目标记录 |
| 超时或页面断开 | 最后观察到的状态及请求是否可能已发送 | 重试前先检查是否已有结果 |
| 字段校验错误 | 字段错误提示和当前表单状态 | 只改指出的字段，然后重新复核 |
| 出现重复提醒 | 已存在记录的具体信息 | 先停止并比对，不要再创建一条 |

只报告页面或获准访问的目标系统已经确认的结果。如果结果仍不确定，就明确说明未知，并告诉用户最后确认到哪一步。` },
        { heading: "在应用中防止重复提交", body: `浏览器自动化无法保证每次提交都具备幂等性。双击、网络重试、智能体重启或确认页丢失，都可能导致同一请求重复发送。对于自己控制的系统，可在浏览器动作前生成操作 ID，记录操作状态、请求特征和目标记录 ID。相同操作 ID 再次到达时，应拒绝重复处理或安全返回第一次的结果。在服务器由你控制的情况下，可根据动作设计幂等键或唯一业务约束。

第三方网站通常不允许你增加服务端幂等逻辑。这时可在本地运行台账记录获准的操作、目标账户、时间、观察到的结果以及回执编号。恢复运行时先检索记录，再判断是否重新提交。页面暂时禁用按钮可以降低误触，但不能替代服务器状态或目标记录核查。这些防重保护属于应用和目标服务的实现，不能假定每种浏览器智能体都会自动提供。

应用也应把批准状态绑定到明确的任务、账户、操作和字段摘要，并记录批准时间与后续执行状态。任务内容改变、审批等待时间超过应用设定范围，或登录账户发生变化时，应让旧批准失效并重新审核。并发执行时，应用需要原子地登记操作状态，避免两个 worker 同时把同一任务判定为尚未处理。保存回执前可再核实目标记录的账户与关键字段，防止把相似记录误认为本次提交结果。这些控制需要由业务系统明确实现和验证，不会由浏览器自动化框架替你提供。` },
        { heading: "遇到不确定情况就暂停", body: `必填值缺失、收件人不清楚、价格发生变化、出现意外的同意选项或登录状态过期时，应在提交前停止。把具体阻碍和需要澄清的值告诉用户，不要暴露表单里无关的信息。用户只要求保存草稿时，应确认页面仍显示草稿状态；自动保存提示不能当作消息已发送。

审计记录可保留任务指令、审批、已复核值、最终动作、页面响应和验证来源。密码、付款详情、一次性验证码和无关个人资料要脱敏。截图和 trace 可能包含整份表单，应设置清楚的保留期限。表单包含附件时，参考[浏览器智能体上传文件指南](/zh-cn/guides/browser-agent-upload-files)；需要取回提交回执时，参考[浏览器智能体下载文件指南](/zh-cn/guides/browser-agent-download-files)。` },
      ],
      faq: [
        { question: "浏览器智能体应该自动点击提交吗？", answer: "只有用户或应用授权了这项具体操作，且实际字段仍在授权范围内时才可以。有实际后果的动作应先展示具体信息并请求批准。" },
        { question: "Playwright 自动等待能保证安全提交吗？", answer: "不能。自动等待让操作等待页面条件，但不能判断定位是否正确、交易是否获准或服务端是否接受提交。" },
        { question: "提交动作超时了该怎么办？", answer: "重试前先查看结果页面和目标记录。请求可能已经到达服务端，即使智能体没有收到确认。" },
        { question: "浏览器智能体会自动避免重复提交吗？", answer: "没有适用于所有智能体的内置保证。你控制的系统应实现操作跟踪和幂等性；第三方网站则应在重试前确认原请求是否已产生记录。" }
      ]
    }
  }
};

const relatedGuides: Record<string, string[]> = {
  [uploadSlug]: ["browser-agent-download-files", "browser-agent-form-submission", "browser-agent-prompt-injection"],
  [submissionSlug]: ["browser-agent-upload-files", "browser-agent-download-files", "browser-agent-prompt-injection"]
};

export const aiActionsGuides: EditorialGuide[] = [uploadSlug, submissionSlug].map((slug): EditorialGuide => ({
  ...copy["zh-cn"][slug],
  slug,
  date: "2026-10-23",
  sourcePath: "src/data/ai-actions-2026-10-23.ts#" + slug,
  availableLocales: ["en", "zh-cn"],
  relatedBrowsers: [],
  relatedTools: ["playwright"],
  sources: slug === uploadSlug ? uploadSources : submissionSources,
  relatedGuides: relatedGuides[slug]
}));

export const aiActionsTranslations: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
  [uploadSlug]: { en: copy.en[uploadSlug], "zh-cn": copy["zh-cn"][uploadSlug] },
  [submissionSlug]: { en: copy.en[submissionSlug], "zh-cn": copy["zh-cn"][submissionSlug] }
};
