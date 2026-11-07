import type { EditorialGuide, EditorialGuideCopy } from "./editorial-guides";

const copies: Record<string, Record<"en" | "zh-cn", EditorialGuideCopy>> = {
	"dia-skills-create-edit-reuse": {
		"en": {
			"title": "Dia Skills missing? Check the version, builder and saved workflow",
			"description": "Diagnose missing or prompt-only Dia Skills, distinguish historical Mac builder paths from Windows support, and review a saved workflow before reuse.",
			"category": "AI browser guides",
			"content": "If you cannot find Dia Skills, first check the platform, installed version and account. Historical Mac instructions establish where the builder used to live; they do not verify its location in the current app. Windows 1.2.0 added custom Skills on October 15, 2026. The November 5 Mac 1.56.0 and Windows 1.5.0 notes do not announce a Skills redesign. Once your build exposes the controls, use the example below to define a small workflow and check its saved instructions and output.",
			"sections": [
				{
					"heading": "Check the release before looking for Skills",
					"body": "First record Mac or Windows, the installed version and the account or profile currently open. Compare the version with the [platform-specific Dia changelog](https://www.diabrowser.com/changelog). A Mac version number and a Windows version number refer to different release sequences.\n\nTwo official Mac notes provide dated creation paths. [Mac 1.0.1, October 9, 2025](https://www.diabrowser.com/changelog/mac/1-0-1), describes the Skills dropdown below the Command Bar, then New Skill. [Mac 1.2.0, October 24, 2025](https://www.diabrowser.com/changelog/mac/1-2-0), describes New Tab > Skills > New Skill and a sentence-based builder that assembles proposed steps. Those instructions are historical. The Windows 1.2.0 note confirms custom Skills on October 15, 2026, without establishing that every Mac menu applies to Windows.\n\n| What you have | What the source establishes | Next check |\n| --- | --- | --- |\n| Old Mac tutorial | A dated builder route in 2025 | Match the tutorial date to your release |\n| Windows 1.2.0 or later | Custom Skills reached Windows in October 2026 | Inspect your current app and platform help |\n| Mac 1.56.0 or Windows 1.5.0 | November 5 notes do not announce a Skills overhaul | Do not infer a new builder route from these notes |\n| No Skills entry in your current build | The current path is not verified by these historical pages | Record version and account, update officially, then contact in-app support |\n\nIf the old control is absent, stop following that tutorial. Updating and restarting are reasonable diagnostic steps, but neither guarantees a particular menu will appear. Keep the version details for support instead of repeatedly recreating a workflow you cannot locate."
				},
				{
					"heading": "Describe one repeatable job",
					"body": "A useful Skill is narrower than a general request such as “help with work.” Name the input it should use, the output you want, and the check you will make before using that output. For example: “For the public product page I am viewing, list the model number, listed price, warranty term, and page URL in a four-column table. Mark a field missing when the page does not show it.” This scope keeps the Skill tied to a visible source and gives you a way to spot a guessed value.\n\nUse a low-risk public page while shaping the workflow. If the builder proposes connected tools, inspect what each tool will read or change before saving. A workflow that only summarizes a public page does not need email or calendar access. Dia’s October 15 Windows release says Skills can be created by the user, but that note does not document every current prompt field or guarantee identical behavior across versions. Treat the generated steps as a draft. Run them on a second representative page and check that the output follows the format and includes the source you asked for."
				},
				{
					"heading": "Review and edit the Skill before reusing it",
					"body": "Open the Skill’s edit control, if your build exposes one, and read its instructions from top to bottom. Remove rules that could apply to unrelated pages, specify which page or tabs it may use, and say what to do when a required field is absent. If the Skill can use connected apps, confirm the account and action scope in the app connection settings. A browser Skill may package a prompt and tools; it is not a permission grant for every connected account.\n\nSave a version that has a clear name, then invoke it from a new Chat or page using the current control shown by Dia. Do not assume an old slash command, shortcut, or gallery path still works. Repeat the same small example after editing. Compare the output with the previous run: did it keep the requested columns, cite the right source, and leave missing information blank? If it does not, revise the instructions before using it for a consequential task. A Skill’s presence in a list confirms that it is saved, not that it ran correctly."
				},
				{
					"heading": "When a Skill is missing or behaves like plain text",
					"body": "Check three things before rebuilding it: the Dia platform and version, the account or profile currently open, and whether the Skill appears in the current Skills list. If a Skill disappeared after an update, capture its name and version, search Dia’s current changelog, and use the in-app Help or Support route for the installed build. Do not assume an older guide’s New Tab menu is still the correct path.\n\nIf invoking a Skill only inserts text into Chat, separate two questions: did Dia find the saved Skill, and did Chat execute its instructions or merely include them in the prompt? A community report from August 2026 described this difference after a newer Claude chat flow. That is a dated user report, not confirmation of current behavior in every Dia release. Test with a harmless public page and inspect the resulting response. If the Skill is visible but its expected steps do not run, record the browser version, selected model/provider, Skill name, and exact result for support. Avoid pasting private work content into a public troubleshooting post."
				},
				{
					"heading": "Choose a Skill when the same steps recur",
					"body": "Use a saved Skill when a repeat job needs the same source rules or output shape across multiple pages. Use a one-off prompt when the task changes each time or depends on new details you have not reviewed. A Skill is not a replacement for a project workspace that stores shared files and context, and it does not make a result authoritative. For research, keep the original page links beside the output. For actions in connected services, review the exact proposed action before confirming it.\n\nFor a second product’s reusable browser prompts, see [Perplexity Comet Query Shortcuts](/en/guides/comet-query-shortcuts/). That guide covers Comet’s own shortcut mechanism; Dia’s Skill builder and controls are separate. For a task that compares claims across websites, use the source checks in [AI browser research verification](/en/guides/ai-browser-research-source-verification/)."
				}
			],
			"faq": [
				{
					"question": "Can I use an old Mac New Skill tutorial on Windows?",
					"answer": "Windows gained custom Skills in version 1.2.0 on October 15, 2026. The 2025 Mac menu paths do not verify the current Windows interface; use your installed build and platform help."
				},
				{
					"question": "Why can I not find New Skill?",
					"answer": "Check the installed platform and version, then use that platform’s current app surface and help route. Older Mac menu paths may not match a newer release or Windows."
				},
				{
					"question": "Does saving a Skill mean it ran correctly?",
					"answer": "No. Run it on a low-risk example and check the source, fields, and output before relying on it."
				}
			]
		},
		"zh-cn": {
			"title": "Dia Skills 找不到怎么办：版本、创建入口与复用排查",
			"description": "排查 Dia Skills 入口消失或只插入提示文字的问题，区分旧版 Mac 创建路径与 Windows 支持，并检查保存的流程。",
			"category": "AI 浏览器指南",
			"content": "找不到 Dia Skills 时，先核对平台、安装版本和账号。旧版 Mac 更新记录能证明当时的创建入口，不能证明当前应用仍使用同一路径。Windows 1.2.0 于 2026 年 10 月 15 日加入自定义 Skills；11 月 5 日的 Mac 1.56.0 与 Windows 1.5.0 更新没有宣布 Skills 改版。确认当前版本提供相关控件后，再用下面的简单任务检查保存的指令与输出。",
			"sections": [
				{
					"heading": "先看版本，再找 Skills 入口",
					"body": "先记下 Mac 或 Windows、安装版本，以及当前账号或浏览器档案，再查[按平台区分的 Dia 更新记录](https://www.diabrowser.com/changelog)。两套平台的版本号属于不同发布序列，不能只看数字大小判断功能先后。\n\n两份 Mac 官方记录写明了当时的创建方式：[2025 年 10 月 9 日 Mac 1.0.1](https://www.diabrowser.com/changelog/mac/1-0-1)是 Command Bar 下方的 Skills 下拉菜单 > New Skill；[2025 年 10 月 24 日 Mac 1.2.0](https://www.diabrowser.com/changelog/mac/1-2-0)是 New Tab > Skills > New Skill，并介绍用一句话描述任务、由构建器生成待确认步骤的方式。这些都是历史路径。2026 年 10 月 15 日的 Windows 1.2.0 记录确认了自定义 Skills 支持，没有证明 Mac 所有菜单都适用于 Windows。\n\n| 遇到的情况 | 资料能确认什么 | 接下来查哪里 |\n| --- | --- | --- |\n| 照着旧 Mac 教程操作 | 2025 年当时的构建器路径 | 核对教程日期与安装版本 |\n| Windows 1.2.0 或以后 | 2026 年 10 月已加入自定义 Skills | 检查当前应用和对应平台帮助 |\n| Mac 1.56.0 或 Windows 1.5.0 | 11 月 5 日记录没有宣布 Skills 改版 | 不能由这份说明推断新入口 |\n| 当前应用没有 Skills | 历史页面不能确认当前路径 | 记录版本和账号，官方更新后再联系应用内支持 |\n\n旧控件不在时，先停下照图点击。更新和重启可以作为排查步骤，但不能保证某个菜单一定出现。把版本、账号和入口缺失的状态留给支持人员，比反复创建一个无法找到的流程更有用。"
				},
				{
					"heading": "把重复任务写成一项具体 Skill",
					"body": "Skill 应比“帮我处理工作”更具体。说明它要读取什么、输出什么，以及你会检查什么。例如：“针对我当前打开的公开产品页，把型号、标价、保修期限和页面网址整理成四列表格。页面没写的字段标为缺失。”这样可以限制来源，也能发现模型猜出的值。\n\n构建时先用公开页面。如果 Skill 建议调用已连接的工具，保存前检查每个工具会读取或修改什么。总结公开网页通常不需要邮箱或日历权限。Windows 1.2.0 更新说明 Skills 可以由用户创建，但没有列出每个版本中的所有提示字段，也没有保证 Mac 和 Windows 操作完全相同。把自动生成的步骤先当草稿，再找第二个类似页面运行，检查格式、来源和缺失字段是否都符合要求。"
				},
				{
					"heading": "复用前先检查并编辑 Skill",
					"body": "如果当前版本提供编辑入口，打开后逐条检查 Skill 指令。删掉会误用于其他页面的规则，明确允许读取的页面或标签，并说明找不到字段时怎么处理。Skill 若会使用已连接应用，还要到应用连接设置确认账号和操作范围。保存提示词和工具，不等于授权它访问所有账号。\n\n给 Skill 起一个容易识别的名字，然后在新 Chat 或页面中按当前界面提供的方式调用。不要假定旧版斜杠命令、快捷键或技能库入口仍适用。编辑后用同一个低风险样例再跑一次，对比输出是否保留指定栏目、引用正确页面，并把缺失信息留空。列表里能看到 Skill，只能证明它已保存，不能证明它执行成功。"
				},
				{
					"heading": "Skill 消失或看起来只插入了文字",
					"body": "重建之前先核对 Dia 平台与版本、当前账号或浏览器档案，以及 Skill 是否仍在当前列表中。若更新后找不到它，记录名称和版本，搜索该平台的 Dia 更新记录，再从当前应用里的 Help 或 Support 联系支持。不要只凭旧教程认定 New Tab 菜单仍是入口。\n\n如果调用 Skill 后 Chat 里只出现了一段文字，分别检查两个问题：Dia 是否找到已保存的 Skill，以及 Chat 是执行了步骤还是只把文字加入提示。2026 年 8 月有用户报告，新版 Claude Chat 中的 Skills 变成普通提示文字。这是特定日期的用户反馈，不能证明所有当前版本都会这样。先用公开、无风险页面测试并查看结果。若 Skill 在列表中但步骤没有执行，记录浏览器版本、模型或提供方、Skill 名称和结果，再交给支持排查。公开反馈里不要贴工作资料。"
				},
				{
					"heading": "重复步骤适合做成 Skill",
					"body": "同一项工作需要跨多个页面复用相同来源规则或输出格式时，可以保存为 Skill。每次任务细节不同，或需要加入新信息时，单独写提示更合适。Skill 不等于存放共享文件和上下文的项目空间，也不会让结果自动准确。研究结论应保留原页面链接；连接应用中的操作应在确认前逐项核对。\n\n还可以看 [Perplexity Comet 查询快捷方式](/zh-cn/guides/comet-query-shortcuts/)。那篇讲 Comet 自己的快捷方式，Dia 的 Skills 构建器和控件不同。若任务要对比多个网页的说法，可用 [AI 浏览器来源核验方法](/zh-cn/guides/ai-browser-research-source-verification/)。"
				}
			],
			"faq": [
				{
					"question": "旧 Mac 教程里的 New Skill 路径能直接用于 Windows 吗？",
					"answer": "Windows 1.2.0 于 2026 年 10 月 15 日加入自定义 Skills。2025 年 Mac 菜单不能证明当前 Windows 入口相同，应按安装版本和对应平台帮助查找。"
				},
				{
					"question": "为什么找不到 New Skill？",
					"answer": "先核对平台和版本，再按当前应用界面和该平台的帮助查找。旧 Mac 菜单不一定适用于新版本或 Windows。"
				},
				{
					"question": "保存后就能确认 Skill 正常运行了吗？",
					"answer": "不能。先用低风险页面运行一次，核对来源、字段和输出，再决定是否依赖它。"
				}
			]
		}
	},
	"comet-assistant-history-data-controls": {
		"en": {
			"title": "Comet Assistant History: Delete Threads Without Confusing Browser Data",
			"description": "Separate Comet’s local browsing data from Perplexity threads, memory and account export, then choose the right deletion control.",
			"category": "AI browser guides",
			"content": "Deleting a conversation in Comet and clearing Comet’s browser data are different operations. Comet is Perplexity’s browser, while Assistant conversations appear in the Perplexity account Library. Perplexity’s current self-serve data instructions separately describe local Comet data, individual or all threads, account export, and account deletion. Identify which record you want to remove before choosing a control. This guide covers documented account and browser settings; it does not claim that one deletion request removes every copy from backups, connected apps, or services you used.",
			"sections": [
				{
					"heading": "Choose which history you mean",
					"body": "Write down the object before deleting anything. A page in Comet history is local browsing data. A Comet Assistant conversation is a Perplexity thread in the Library. Saved memory is a separate account feature. An exported archive is a downloaded copy. These objects can have different controls and retention rules.\n\nPerplexity’s [self-serve data options](https://www.perplexity.ai/en-GB/hub/legal/self-serve-data-options) says clearing Comet browsing data removes local data and does not change the Perplexity account or synced settings. The same page sends thread deletion to the Library. If you only want to hide a thread from your working list, do not assume archiving is available or that deleting it is reversible. Read the action label in the account before confirming. A user report about Assistant threads appearing with Perplexity searches points to a real organization problem, but the account Library is the place to apply Perplexity’s documented thread controls.\n\n| Record to remove | Relevant control | Check afterwards |\n| --- | --- | --- |\n| A visited-page entry on this device | Comet > Settings > Privacy and security > Delete browsing data | Chosen time range and data types |\n| One Assistant conversation | Library > thread options > Delete | That thread in the same account |\n| All account threads | Library > more options > Delete all threads | Account Library, independently of local history |\n| A saved personal memory | The current account memory controls | Whether the saved memory remains |\n| A downloaded account export | The downloaded file on your device | Copies you saved outside Perplexity |"
				},
				{
					"heading": "Delete one thread or clear the thread list",
					"body": "For one conversation, sign in to the same Perplexity account used by Comet and open the Library. Find the relevant thread, open its more-options menu, and choose Delete. Perplexity’s instructions also describe deleting from inside the thread. Check the title and account before confirming because the action cannot be undone.\n\nFor a broader cleanup, the current instructions provide a Delete all threads action from the Library’s more-options menu. That operation removes account thread content and is irreversible. It is the current documented route for bulk cleanup; an older community request asking for a bulk control no longer describes the current help page. If you need to retain work, export your account data first and inspect what the export includes. Do not assume exporting is a restorable backup or that it preserves every browser-only setting."
				},
				{
					"heading": "Clear only local Comet browsing data",
					"body": "Open Comet Settings, then Privacy and security, then Delete browsing data. Choose a time range and the data types you intend to clear, then confirm. Perplexity says this clears local data only. It does not delete account threads or synced settings. If your goal is to remove an Assistant conversation, use the Library instead. If your goal is to clear local browsing traces, check the selected data types carefully so you do not remove cookies or site data needed for other work.\n\nFor a privacy review, Perplexity’s current [Privacy Snapshot description](https://www.perplexity.ai/en-GB/hub/blog/introducing-privacy-snapshot) says Comet settings group controls for Assistant access, ad blocking, password manager preferences, and advanced security. These access controls answer what Comet Assistant may use; they are not thread deletion controls. Review them separately from browser history and account Library cleanup."
				},
				{
					"heading": "Export account data before account deletion",
					"body": "To request an account export, sign in to Perplexity on the web, open Account details, and select Export my data. Perplexity says it emails a download link. Treat the export as a review copy unless the service documents a restore procedure for the item you need. Check the downloaded archive before deleting the account; an export request alone does not prove that every local Comet setting or connected service record is included.\n\nAccount deletion is broader than deleting a thread and may affect access to paid service. Perplexity’s data page advises cancelling an active subscription before requesting account deletion. It describes a 30-day deletion period and says signing in within 20 days cancels the deletion request. These are account-level rules stated by Perplexity on the page checked November 7, 2026; reread the current instructions before acting because the process can change. If you only want to remove Comet history, account deletion is an unnecessarily broad control."
				},
				{
					"heading": "What these controls do not erase",
					"body": "Deleting a Library thread is not the same as clearing local browser history. Clearing local history is not the same as deleting the Perplexity account. Removing an account connector may also have a separate control at the connected service. The self-serve page notes that uploaded files are associated with threads and directs readers to delete the thread to remove an upload; it lists a default 30-day file retention period. Follow the linked current retention details for any file whose deletion matters.\n\nKeep a short deletion record for regulated or work accounts: which account you used, which object you deleted, which control you selected, and the date. Do not put private content into the record. If the object remains visible after the documented action, capture the status and ask Perplexity support rather than repeatedly deleting unrelated browser data."
				},
				{
					"heading": "A practical order for a cleanup",
					"body": "If you want to remove Comet Assistant history but keep your account, export first if you need a copy, delete the chosen thread or all threads in the Library, then separately clear local browsing data if that is also your goal. Recheck the Library and local history independently. Avoid mixing memory settings, connected-app revocation and browser cookies into one broad cleanup unless you intend those effects too.\n\nFor the distinction between profile data and account records during browser migration, see [Comet import, export and sync](/en/guides/comet-import-export-vs-sync/). For page content attached to an AI conversation, [AI browser source verification](/en/guides/ai-browser-research-source-verification/) explains how to preserve the original links you still need."
				}
			],
			"faq": [
				{
					"question": "Does clearing Comet browsing data delete my Perplexity threads?",
					"answer": "No. Perplexity says local browsing-data deletion does not change your account or synced settings. Delete threads from the Library."
				},
				{
					"question": "Can I bulk-delete Comet Assistant threads?",
					"answer": "Perplexity’s current self-serve instructions describe Delete all threads in the Library’s more-options menu. The action cannot be undone."
				},
				{
					"question": "Does exporting account data create a restorable backup?",
					"answer": "The instructions describe an emailed download. They do not promise that the export can restore every account or browser setting."
				}
			]
		},
		"zh-cn": {
			"title": "Comet Assistant 历史记录：区分对话与浏览器数据再删除",
			"description": "分清 Comet 本地浏览数据、Perplexity 对话、记忆和账号导出，再选择相应删除入口。",
			"category": "AI 浏览器指南",
			"content": "删除 Comet 中的一条对话，与清除 Comet 浏览器数据不是一回事。Comet 是 Perplexity 的浏览器，Assistant 对话则保存在 Perplexity 账号的 Library 中。Perplexity 当前的数据说明分别列出本地 Comet 数据、单条或全部对话、账号导出和账号删除。操作前先确认要处理哪种记录。本文依据公开账号和浏览器设置说明，不声称一次删除能清除备份、连接应用或其他服务中的所有副本。",
			"sections": [
				{
					"heading": "先确认你说的“历史记录”是哪一种",
					"body": "删除前先写清楚对象。Comet 历史记录属于本地浏览数据；Comet Assistant 对话是 Perplexity Library 中的 thread；保存的记忆属于另一项账号功能；导出文件则是下载到设备的副本。它们的控制项和保留规则不同。\n\nPerplexity 的[自助数据选项](https://www.perplexity.ai/en-GB/hub/legal/self-serve-data-options)说明，清除 Comet 浏览数据只处理本地数据，不会改变 Perplexity 账号或同步设置。同一页面把对话删除入口指向 Library。如果你只是希望暂时从工作列表隐藏对话，不要默认存在可恢复的归档功能。确认前先阅读当前按钮说明。用户曾反馈 Assistant 对话和搜索历史混在一起；Perplexity 目前公开的对话控制在账号 Library。\n\n| 要处理的记录 | 对应控制项 | 操作后检查 |\n| --- | --- | --- |\n| 这台设备上的访问记录 | Comet 设置中的 Delete browsing data | 选中的时间范围和数据类型 |\n| 一条 Assistant 对话 | Library > 对话更多选项 > Delete | 同一账号中的目标对话 |\n| 账号里的全部对话 | Library 更多选项 > Delete all threads | 单独检查账号 Library |\n| 保存的个人记忆 | 当前账号的记忆设置 | 记忆是否仍然存在 |\n| 下载的账号导出文件 | 设备上的下载文件 | 保存在 Perplexity 以外的副本 |"
				},
				{
					"heading": "删除单条对话或清空对话列表",
					"body": "删除单条对话时，先登录 Comet 正在使用的同一个 Perplexity 账号，再打开 Library。找到目标 thread，打开更多选项并选择 Delete。官方说明也允许从对话内部删除。确认前核对标题和账号，因为该操作不可撤销。\n\n若要批量清理，当前数据说明提供 Library 更多选项中的 Delete all threads。此操作会清除账号对话内容，且不可撤销，是当前官方记载的批量删除入口。过去的社区功能请求曾提出增加批量删除，但现行说明已给出这个选项。需要留存工作内容时，先导出账号数据并检查文件包含什么。导出不是可恢复备份的承诺，也不保证包含所有浏览器专属设置。"
				},
				{
					"heading": "只清除 Comet 本地浏览数据",
					"body": "打开 Comet 设置 > Privacy and security > Delete browsing data。选择时间范围和要清除的数据类型后再确认。Perplexity 说明此操作只清除本地数据，不会删除账号对话或同步设置。若要删 Assistant 对话，应去 Library。若只是清除本地浏览痕迹，仔细查看选中的数据项，避免误删其他工作所需的 Cookie 或网站数据。\n\n若要检查 Assistant 能读取什么，Perplexity 当前的[Privacy Snapshot 说明](https://www.perplexity.ai/en-GB/hub/blog/introducing-privacy-snapshot)说，Comet 设置汇总了 Assistant 访问、广告拦截、密码管理器偏好和高级安全选项。这些是访问权限控制，不是对话删除入口。应与浏览器历史及账号 Library 分开处理。"
				},
				{
					"heading": "删除账号前先导出数据",
					"body": "要申请账号导出，先在网页端登录 Perplexity，打开 Account details 并选择 Export my data。Perplexity 表示会通过邮件发送下载链接。除非服务明确支持恢复，不要把导出文件当作可以还原账号的备份。删除账号前先打开压缩包核对内容；提交导出申请本身不能证明本地 Comet 设置或连接服务记录都在其中。\n\n账号删除比删除一条对话影响更大，也可能影响付费服务。Perplexity 数据页建议先取消有效订阅再删除账号。该页面称，账号数据会在 30 天后永久删除；发起删除后 20 天内重新登录会取消删除请求。这些是截至 2026 年 11 月 7 日页面所述的账号规则，实际操作前请再读当时的说明，因为流程可能变化。若只想清理 Comet 对话，没必要删整个账号。"
				},
				{
					"heading": "这些控制项不会替你清除什么",
					"body": "删除 Library 对话不等于清除本地浏览历史；清除本地历史不等于删除 Perplexity 账号；连接器还可能需要在所连接的服务端单独撤销。自助数据页面说明，上传文件与 thread 关联，删除 thread 可移除上传文件；页面列出默认 30 天的文件保留期。需要确保文件删除时，按页面链接查看当前详细保留说明。\n\n工作或受监管账号可以保留一条简短的操作记录：使用了哪个账号、删除了哪种对象、选择哪个控制项及操作日期。不要把私密内容写进记录。若按说明操作后对象仍可见，保存状态并联系 Perplexity 支持，不要反复清除无关浏览数据。"
				},
				{
					"heading": "按顺序清理更稳妥",
					"body": "若想删除 Comet Assistant 对话并保留账号，可先在需要时导出数据，再到 Library 删除单条或全部 thread。如果也要清除本地浏览数据，再单独执行该操作。之后分别检查 Library 与本地历史。除非明确要这些结果，不要把记忆设置、连接应用授权和浏览器 Cookie 清理混成一次大范围删除。\n\n浏览器迁移时需要区分档案数据和账号记录，可看 [Comet 导入、导出与同步](/zh-cn/guides/comet-import-export-vs-sync/)。如果还要保留 AI 对话引用的原始网页链接，[AI 浏览器来源核验](/zh-cn/guides/ai-browser-research-source-verification/)介绍了核对方法。"
				}
			],
			"faq": [
				{
					"question": "清除 Comet 浏览数据会删除 Perplexity 对话吗？",
					"answer": "不会。Perplexity 说明本地浏览数据删除不影响账号或同步设置。对话需从 Library 删除。"
				},
				{
					"question": "能批量删除 Comet Assistant 对话吗？",
					"answer": "Perplexity 当前说明了 Library 更多选项中的 Delete all threads。该操作不可撤销。"
				},
				{
					"question": "导出账号数据后能恢复账号吗？",
					"answer": "公开说明只承诺发送数据下载链接，没有承诺可以恢复所有账号或浏览器设置。"
				}
			]
		}
	},
	"perplexity-comet-google-drive-connector": {
		"en": {
			"title": "Comet and Google Drive: Find Files and Diagnose Connector Failures",
			"description": "Separate Drive authorization, Perplexity account access, project or chat context, and browser-specific failures before reconnecting.",
			"category": "AI browser guides",
			"content": "A Google Drive connector can appear authorized and still fail to show files. First identify the Perplexity account and surface you are using: Comet is the browser, while Perplexity Computer Projects have their own project context. A June 2026 forum report described a Drive picker that closed after OAuth in several browsers. That dated report suggests a useful cross-browser check; it does not establish a current outage. Locate the failing step before revoking and reconnecting an account. The checks below cover Drive search and file access.",
			"sections": [
				{
					"heading": "Check the account and surface first",
					"body": "Confirm the intended Google account and the signed-in Perplexity account. A browser profile can contain several Google sessions, so check the address in the consent window. Then name the surface where the failure occurs: Perplexity search or chat, a connector picker, or a Computer Project opened in a browser. Comet can display these websites, but that does not make their settings a Comet-specific feature.\n\nThe current [Projects page](https://www.perplexity.ai/en-GB/hub/products/projects) describes Perplexity Computer workspaces, with Spaces now called Projects. It shows a selected connector account and project instructions. Personal connections remain scoped to each member. Use that page to check a Computer Project’s context; it does not document an identical connector picker in every Perplexity chat or Comet panel.\n\nFor a Project task, inspect the selected Drive account and source instructions there. For ordinary search or chat, inspect that surface’s own source selector. If only one file is needed, compare the connector with a direct upload under your organization’s data rules. Record which route you use so a later browser comparison checks the same thing."
				},
				{
					"heading": "Connect Drive and test with one known file",
					"body": "Open Perplexity account settings and find Connectors. Locate Google Drive and follow the current sign-in and consent flow. Exact menus can change, so use Perplexity’s current connector screen rather than a copied screenshot. Once the connection reports ready, open a new conversation or the intended Project and choose Drive as a source if the interface offers that control.\n\nTest with one low-risk file whose exact title you know and can access in the selected Google account. Ask for a narrow task, such as identifying the document’s title and first section. If it appears in the source selector but the answer does not use it, check whether the current chat or Project actually includes Drive. If it never appears in the picker, record the account, surface and visible status. A green “connected” state alone does not prove that the file picker or search path works."
				},
				{
					"heading": "Use a cross-browser check to locate the fault",
					"body": "If the connector shows connected but the picker is blank, repeat the read-only check from Perplexity’s web app in another supported browser, using the same Perplexity account and Google account. Do not authorize a different Google account during this comparison. If the failure follows the account across browsers, it points away from a Comet-only issue. A June 2026 report in Perplexity’s community described the same Drive picker problem in Comet, Chrome and Safari after Google OAuth completed. That report is evidence of one dated incident, not proof of a current general outage.\n\nCapture the date, browser and version, Perplexity account type, Google account identity without sharing the full address publicly, Project or chat surface, and exact error or empty state. Do not paste private filenames, OAuth tokens or console logs containing personal data into a public forum. If only Comet fails while the web app works, update Comet and report the Comet-specific result. If all browsers fail, report it to Perplexity with the same controlled comparison.\n\n| Observation | Next controlled check | What it can tell you |\n| --- | --- | --- |\n| Google consent is rejected | Check the selected account and any administrator message | Authorization failed before file selection |\n| OAuth finishes, picker closes or stays empty | Repeat with the same accounts and file in another browser | Whether failure follows the account across browsers |\n| File is selectable, answer ignores it | Check the active chat source or Computer Project context | Whether the task actually includes Drive |\n| Only Comet fails | Compare versions and update Comet | A browser-specific difference for support |\n| Project removal leaves Drive connected elsewhere | Inspect account connections and the Google grant | Project context and account access are separate |"
				},
				{
					"heading": "Disconnect at the layer you mean",
					"body": "Removing Drive from one Computer Project changes that Project’s selected context or instructions. It does not establish that the account-wide connection or Google authorization has been revoked. To stop the Perplexity account using Drive, inspect its current connection settings, choose the intended Google account, and disconnect it there. The exact control depends on the account surface; do not treat a project source instruction as an OAuth restriction.\n\nTo revoke the Google grant itself, open [Google Account third-party connections](https://support.google.com/accounts/answer/13533235?hl=en), select the relevant Perplexity connection and remove its access. Google says this stops future access, while data already received may require deletion from the service separately. Recheck the connection status in Perplexity; a stale connected badge is not a new successful authorization.\n\nThese controls do not delete the original Drive document. A file previously uploaded or copied into a Perplexity thread or Project may need its own deletion. Identify that stored copy and use the relevant file or thread controls rather than repeatedly revoking Google access."
				},
				{
					"heading": "Drive search is different from Gmail actions",
					"body": "Perplexity’s connector announcement describes Gmail and Google Calendar for searching email and events, with some actions such as sending email or creating invites; it describes Drive as a separate file integration. Do not infer that authorizing Drive grants the same functions or scopes as Gmail, and do not infer that a Drive search can send email. Check the current consent screen and the connector’s own documentation before granting access. Plan access can differ by connector and account type, so rely on the current settings page and account UI rather than an old feature announcement.\n\nWhen the task is only to find or summarize a Drive document, keep the prompt read-only and name the file. If the task later asks for an email, calendar change or file edit, review that separate action and its account connection before approval. For work accounts, follow the administrator’s rules for connected services."
				},
				{
					"heading": "What to include in a support report",
					"body": "A useful report says what you expected, what happened, and where it failed. Include the connector label, the selected account type, the Perplexity surface, whether OAuth completed, whether the status persisted, and whether the same issue occurred in another browser. Add the exact app version and date. This gives support enough to distinguish an authorization rejection from a broken file picker or a Project configuration issue.\n\nRelated reading: [AI browser meeting preparation](/en/guides/ai-browser-meeting-prep-brief/) covers the work task after connected data is available. [Comet Assistant history controls](/en/guides/comet-assistant-history-data-controls/) explains how to distinguish a browser-local record from an account thread."
				}
			],
			"faq": [
				{
					"question": "Does a connected checkmark prove Drive search works?",
					"answer": "No. Test one known file on the intended Perplexity surface. A Computer Project’s Drive context is separate from Comet’s browser interface."
				},
				{
					"question": "Should I keep reconnecting if OAuth succeeds but the picker closes?",
					"answer": "First compare the same account and task in another browser. A cross-browser failure may be in the connector or service rather than Comet."
				},
				{
					"question": "Does revoking Google access delete data Perplexity already received?",
					"answer": "Google says revocation stops future access but may not delete previously received data. Use the service’s separate deletion controls."
				}
			]
		},
		"zh-cn": {
			"title": "Comet 连接 Google Drive：查找文件并排查连接故障",
			"description": "先区分 Google 授权、Perplexity 账号、项目或对话上下文和 Comet 浏览器故障，再决定是否重连。",
			"category": "AI 浏览器指南",
			"content": "Google Drive 显示已授权，文件仍可能不出现。先确认 Perplexity 账号和使用页面：Comet 是浏览器，Perplexity Computer Projects 有各自的项目上下文。2026 年 6 月的一条论坛报告称，OAuth 后 Drive 选择器会关闭，多个浏览器都能复现。这个个案适合用来设计跨浏览器检查，不能证明当前普遍故障。先找到失败步骤，再考虑撤销和重连。以下排查聚焦 Drive 搜索与文件访问。",
			"sections": [
				{
					"heading": "先核对账号和使用页面",
					"body": "确认准备使用的 Google 账号，以及当前登录的 Perplexity 账号。一个浏览器档案里可能同时存在多个 Google 登录态，授权窗口出现后要核对邮箱。再写清失败位置：Perplexity 搜索或普通对话、连接器文件选择器，还是在浏览器里打开的 Computer Project。Comet 能显示这些网页，不代表网页里的设置都是 Comet 专属功能。\n\n当前的[Projects 页面](https://www.perplexity.ai/en-GB/hub/products/projects)介绍 Perplexity Computer 工作空间，并说明 Spaces 已改称 Projects。它展示了连接器选中账号和项目说明，个人连接仍按成员账号区分。这份资料可用于核对 Computer Project 的上下文，不能证明所有 Perplexity 对话或 Comet 面板都有完全相同的选择器。\n\n任务若在 Project 中运行，检查其中的 Drive 账号和来源说明；普通搜索或对话则检查各自的来源选择。只需一份文件时，也可按组织数据规则比较连接器与直接上传。记下实际使用的方式，跨浏览器对照时保持一致。"
				},
				{
					"heading": "连接 Drive，再用一份已知文件测试",
					"body": "打开 Perplexity 账号设置里的 Connectors，找到 Google Drive，按当前登录和授权流程操作。菜单可能变化，应以 Perplexity 当前连接器页面为准，不要照抄旧截图。状态显示就绪后，打开目标对话或 Project；如果界面提供来源选择，明确选择 Drive。\n\n用当前 Google 账号确实可以访问、标题准确已知的一份低风险文件测试。可以要求助手指出文档标题和第一节名称。如果文件出现在来源选择器中，但回答没有使用它，检查当前对话或 Project 是否真的包含 Drive。若文件根本不出现在选择器里，记录账号、使用页面和界面状态。绿色“已连接”只能说明显示为连接状态，不能证明文件选择器或搜索正常。"
				},
				{
					"heading": "跨浏览器检查故障在哪一层",
					"body": "如果连接器显示已连接但文件列表空白，用同一 Perplexity 账号和 Google 账号，在另一款受支持浏览器里打开 Perplexity 网页版，重复只读检查。比较期间不要授权另一个 Google 账号。若多个浏览器都跟着账号失败，问题可能不只在 Comet。Perplexity 社区 2026 年 6 月的一条报告称，OAuth 完成后 Drive 选择器在 Comet、Chrome 和 Safari 中都失败。这是特定日期的个案，不能证明当前普遍故障。\n\n记录日期、浏览器与版本、Perplexity 账号类型、Google 账号身份（不要公开完整地址）、Project 或对话页面，以及确切错误或空白状态。公开反馈里不要贴文件名、OAuth token 或含个人资料的控制台日志。如果只有 Comet 出错而网页版正常，先更新 Comet 并报告差异。如果各浏览器都失败，则向 Perplexity 反馈这组对照结果。\n\n| 观察到的现象 | 下一项对照 | 能区分什么 |\n| --- | --- | --- |\n| Google 同意页面拒绝授权 | 核对所选账号和管理员提示 | 失败发生在选文件之前 |\n| OAuth 完成，选择器关闭或空白 | 相同账号和文件换浏览器检查 | 问题是否跟随账号跨浏览器出现 |\n| 文件可选，回答却未使用 | 核对对话来源或 Computer Project 上下文 | 当前任务是否实际包含 Drive |\n| 只有 Comet 失败 | 比较版本并更新 Comet | 向支持说明浏览器差异 |\n| 项目移除后其他页面仍已连接 | 检查账号连接和 Google 授权 | 项目上下文与账号访问是两层控制 |"
				},
				{
					"heading": "按需要撤销相应授权",
					"body": "从某个 Computer Project 移除 Drive 来源，改变的是该项目选中的上下文或说明，不能证明账号级连接或 Google 授权已撤销。若要让 Perplexity 账号停止使用 Drive，应检查账号当前的连接设置，选中对应 Google 账号并在这里断开。具体控件取决于账号页面；项目里的来源说明也不能代替 OAuth 权限限制。\n\n若要撤销 Google 本身授予的访问权限，进入[Google 账号的第三方连接](https://support.google.com/accounts/answer/13533235?hl=en)，选择对应的 Perplexity 连接并移除访问。Google 说明，这会停止未来访问；服务已经收到的数据可能仍需单独删除。再回到 Perplexity 核对连接状态，过时的“已连接”标记不能证明重新授权成功。\n\n这些操作不会删除原始 Drive 文档。此前上传或复制到 Perplexity 对话或 Project 的文件，可能另有存储副本。先确认是哪份副本，再使用相应文件或对话的删除控制，反复撤销 Google 授权无法代替这一步。"
				},
				{
					"heading": "Drive 搜索不等于 Gmail 操作",
					"body": "Perplexity 的连接器公告把 Gmail 和 Google Calendar 列为邮件、事件搜索，并提到发送邮件或创建日历邀请等操作；Drive 则是单独的文件连接。不要推断授权 Drive 就拥有 Gmail 的功能或授权范围，也不要以为 Drive 搜索能发送邮件。授权前查看当前同意页面和连接器说明。不同连接器的套餐和账号条件可能不同，应以当前设置页显示为准，别依赖旧公告推断。\n\n只需搜索或总结 Drive 文件时，把提示限制为只读，并写明文件名称。如果接下来还要发邮件、改日历或编辑文件，应单独核对对应账号连接和操作内容，再确认执行。工作账号还需遵守管理员对第三方服务的规定。"
				},
				{
					"heading": "向支持反馈时写哪些信息",
					"body": "有效的问题报告应写清预期、实际结果和失败位置。说明连接器名称、账号类型、Perplexity 使用页面、OAuth 是否完成、连接状态是否保留，以及同一问题是否在另一款浏览器复现。附上应用版本和日期。这样支持人员可以区分授权被拒、文件选择器故障和 Project 配置问题。\n\n连接可用后要做会前准备，可看[AI 浏览器会前简报](/zh-cn/guides/ai-browser-meeting-prep-brief/)。[Comet Assistant 历史记录控制](/zh-cn/guides/comet-assistant-history-data-controls/)则说明如何区分本地浏览记录和账号 thread。"
				}
			],
			"faq": [
				{
					"question": "显示已连接就说明 Drive 搜索正常吗？",
					"answer": "不能。应在实际使用的 Perplexity 页面里测试已知文件。Computer Project 的 Drive 上下文与 Comet 浏览器界面是不同层。"
				},
				{
					"question": "OAuth 成功但选择器关闭时，要不要反复重连？",
					"answer": "先用相同账号在另一浏览器对照。跨浏览器都失败时，问题可能在连接器或服务端，不一定是 Comet。"
				},
				{
					"question": "撤销 Google 授权会删除 Perplexity 已收到的数据吗？",
					"answer": "Google 说明撤销会停止未来访问，但不一定删除此前已收到的数据。请使用服务方单独的数据删除控制。"
				}
			]
		}
	},
	"comet-linux-browser-vs-local-computer": {
		"en": {
			"title": "Comet on Linux: Separate the Browser from Perplexity Computer",
			"description": "Check whether you need the Comet browser or Perplexity’s local Computer app before installing anything on Linux.",
			"category": "AI browser guides",
			"content": "Perplexity now documents Linux support for Portable Computer, but that is a different product from the Comet browser. Comet’s product page lists Mac, Windows, iOS, and Android; it does not list a native Linux download. If you need an AI browser on Linux, verify which Perplexity task you mean before installing an unofficial package or following an old download link. This guide separates the browser, the web app, and the Linux local-agent product using their current official descriptions.",
			"sections": [
				{
					"heading": "Identify which Perplexity product you need",
					"body": "Comet is Perplexity’s browser with its own tabs and browser-integrated Assistant. Perplexity’s web app runs inside a browser you already have. Portable Computer is a local agent stack installed on supported Windows or Linux hardware. The names can appear together in product pages, but the installation, permissions and task model differ.\n\nThe current [Comet product page](https://www.perplexity.ai/comet), checked November 7, 2026, says Comet is available for Mac, Windows, iOS, and Android. It does not offer Linux in that platform list. This supports a narrow statement: a native Comet Linux release is not listed on the official product page we checked. It does not establish that Linux builds can never exist, and it does not rule out opening the Perplexity web app in a Linux browser."
				},
				{
					"heading": "Comet browser versus web app on Linux",
					"body": "If your task is web research, file questions or ordinary Perplexity chat, try the Perplexity web app in a supported Linux browser before looking for a native Comet installer. The web app does not become Comet merely because it is open beside a webpage. You may not get Comet’s browser tabs, integrated controls or desktop-specific functions.\n\nFor an AI browser that runs on Linux, check a browser’s own official downloads and system requirements. Brave provides [Linux downloads](https://brave.com/linux/), and the [official Leo page](https://brave.com/leo/) explicitly lists Linux and webpage questions. Mozilla also publishes Linux Firefox builds; that download page alone does not establish a built-in assistant. Verify current availability for your distribution and package format from those primary pages. A Chromium wrapper, repackaged installer or community build is not an official Comet browser unless Perplexity documents it. Avoid entering a Perplexity password or importing a real browser profile into an unofficial build just to test a download."
				},
				{
					"heading": "Portable Computer is a separate Linux option",
					"body": "Perplexity’s [Portable Computer page](https://www.perplexity.ai/en-GB/hub/products/portable-computer) describes a local-first agent product for supported Linux PCs, including a supported NVIDIA RTX GPU with at least 24 GB VRAM in its Linux requirements. The page also lists an NVIDIA DGX Spark configuration. These hardware requirements apply to Portable Computer, not to Comet browser.\n\nThe product page describes an installed agent harness, local models, sandboxed execution and connected apps. That is a different task choice from installing a daily browser. Use it when you specifically need the documented local Computer workflows and your hardware meets the published requirements. If you only want a browser with AI chat about the current page, compare Linux browser options instead. Do not infer that installing Portable Computer adds Comet’s browser UI."
				},
				{
					"heading": "Check the Linux task and hardware before setup",
					"body": "Write down the task first: open pages and browse normally, ask questions about the page in a sidebar, or run an agent against local files and connected apps. Then compare that task with the official product page. For Portable Computer, check GPU model and VRAM, supported distribution instructions, plan eligibility and which work stays local or can use cloud escalation. Do not assume “Linux supported” means every desktop computer or every model is supported.\n\nFor Comet itself, inspect the official downloads page and platform list immediately before making a decision. If a third-party article offers a Linux package, check whether the download is hosted or linked by Perplexity, whether updates are signed, and whether the package is actually Comet or another client. The public Comet page does not provide an official Linux package as of the date checked. Treat community workarounds as unverified unless the vendor confirms them."
				},
				{
					"heading": "Move work without importing the wrong browser profile",
					"body": "If you decide to use the Perplexity web app or another Linux browser, start with a clean browser profile and sign in through the official website. Keep bookmarks and other browser settings separate from the account’s Perplexity threads and connected data. Do not copy a Mac or Windows profile directory into Linux unless the browser vendor documents that migration path; profile encryption, keychain integration and local storage can be platform-specific.\n\nIf you are comparing Comet with another AI browser, use the same low-risk task in each, such as summarizing one public article and checking whether the answer keeps its source link. See [Comet versus Dia](/en/guides/comet-vs-dia/) for a task-focused product comparison and [Comet import, export and sync](/en/guides/comet-import-export-vs-sync/) for Comet browser-data boundaries. Neither article establishes native Linux availability."
				},
				{
					"heading": "A quick decision",
					"body": "Choose the Perplexity web app if you need Perplexity features in a browser already available on Linux. Choose a Linux browser with a documented built-in AI assistant if you want page context inside the browser. Consider Portable Computer only when your task needs its local agent workflows and your hardware satisfies its current requirements. Choose Comet when you can use one of its listed platforms and specifically want Comet’s browser experience.\n\nRecheck official product pages before downloading. Platform support changes over time, and an AI desktop app, an AI browser, and a browser-based website are different products even when they share the same account.\n\n| Task | Product to check | Linux boundary |\n| --- | --- | --- |\n| Use Perplexity search or chat | Perplexity web app in an existing browser | Does not add Comet browser integration |\n| Ask about the current webpage inside a browser | A Linux browser with documented page assistance, such as Brave Leo | Verify distribution support and assistant controls |\n| Run local agents against files and connected apps | Portable Computer | Linux RTX PC needs a supported GPU with 24 GB VRAM or more; DGX Spark is another listed route |\n| Use Comet’s own browser experience | Comet | Official page lists Mac, Windows, iOS and Android, without Linux |"
				}
			],
			"faq": [
				{
					"question": "Is there an official Comet browser for Linux?",
					"answer": "The Comet page checked November 7, 2026 lists Mac, Windows, iOS and Android, with no Linux download listed. This is a dated page check, not a claim that support can never be added."
				},
				{
					"question": "Does Perplexity support Linux at all?",
					"answer": "Yes, Perplexity documents Portable Computer for supported Linux hardware. That local agent product is separate from the Comet browser."
				},
				{
					"question": "Can I use Perplexity in a Linux browser?",
					"answer": "You can access the Perplexity web app in a supported browser. That does not provide Comet’s native browser interface."
				}
			]
		},
		"zh-cn": {
			"title": "Linux 上的 Comet：区分浏览器与 Perplexity Computer",
			"description": "在 Linux 安装前，先确认要用 Comet 浏览器，还是 Perplexity 的本地 Computer。",
			"category": "AI 浏览器指南",
			"content": "Perplexity 目前记录了 Portable Computer 对 Linux 的支持，但它与 Comet 浏览器是不同产品。Comet 产品页列出的平台是 Mac、Windows、iOS 和 Android，没有列出 Linux 原生下载。如果你想在 Linux 上使用 AI 浏览器，先确认需要的 Perplexity 任务，再决定是否安装第三方包或旧链接。本文依据当前官方说明区分 Comet 浏览器、网页应用和 Linux 本地智能体产品。",
			"sections": [
				{
					"heading": "先确认你要用哪一种 Perplexity 产品",
					"body": "Comet 是 Perplexity 的浏览器，有自己的标签页和浏览器内 Assistant。Perplexity 网页应用运行在你已经安装的浏览器里。Portable Computer 则是在满足条件的 Windows 或 Linux 硬件上安装的本地智能体系统。产品页面可能同时提到这些名字，但它们的安装方式、权限和任务模式不同。\n\n截至 2026 年 11 月 7 日，[Comet 官方产品页](https://www.perplexity.ai/comet)写明 Comet 可用于 Mac、Windows、iOS 和 Android，没有列出 Linux。严谨的结论是：检查当天官方页面未列出 Linux 原生版本。这不能证明 Linux 永远不会支持，也不代表无法在 Linux 浏览器中打开 Perplexity 网页应用。"
				},
				{
					"heading": "Linux 上的 Comet 与网页应用不是一回事",
					"body": "如果任务是网页研究、询问文件或普通 Perplexity 对话，可以先在受支持的 Linux 浏览器中打开 Perplexity 网页应用，不必先找原生 Comet 安装包。网页应用不会因为旁边开着网页就变成 Comet，可能没有 Comet 自带的标签页、浏览器集成控件或桌面功能。\n\n若需要 Linux 上的 AI 浏览器，应去浏览器厂商的官方页面查 Linux 下载和系统要求。Brave 提供[Linux 下载](https://brave.com/linux/)，其[Leo 官方页面](https://brave.com/leo/)明确列出 Linux 支持和网页问答。Mozilla 也提供 Linux Firefox；仅凭下载页不能认定它有内置 AI 助手。选择前确认当前发行版和包格式。Chromium 包装器、第三方重打包程序或社区构建，除非 Perplexity 官方承认，否则不能称为 Comet。为了试包，不要向非官方程序输入 Perplexity 密码，也不要导入真实浏览器档案。"
				},
				{
					"heading": "Portable Computer 是另一种 Linux 方案",
					"body": "Perplexity 的[Portable Computer 页面](https://www.perplexity.ai/en-GB/hub/products/portable-computer)介绍了 Linux 本地智能体产品。Linux PC 的要求包含受支持的 NVIDIA RTX 显卡和至少 24 GB 显存；页面还列出 NVIDIA DGX Spark 配置。这些硬件条件针对 Portable Computer，不是 Comet 浏览器。\n\n该产品页描述本地智能体框架、本地模型、沙盒执行与连接应用。这种产品适合需要文档列明的本地 Computer 工作流、并且硬件满足要求的任务。如果只是要在侧栏询问当前网页内容，就应比较 Linux 浏览器本身的 AI 功能。安装 Portable Computer 不会自动获得 Comet 浏览器界面。"
				},
				{
					"heading": "安装前核对 Linux 任务与硬件",
					"body": "先写明任务：日常开网页、在侧栏询问页面，还是让智能体处理本地文件和连接应用。再与官方产品页对照。使用 Portable Computer 时，检查 GPU 型号和显存、支持的发行版安装说明、账号计划，以及哪些步骤留在本机、哪些可能使用云端。产品写着“支持 Linux”，不等于每台电脑或每种模型都适用。\n\n决定使用 Comet 前，临近安装时再次检查官方下载页和平台列表。第三方文章若提供 Linux 包，核对下载是否由 Perplexity 托管或链接、更新是否签名，以及它到底是 Comet 还是其他客户端。截至查询日，Comet 官方页面没有提供 Linux 安装包。未经厂商确认的社区方案应视为未验证。"
				},
				{
					"heading": "迁移工作时别导入错误的浏览器档案",
					"body": "如果你改用 Perplexity 网页应用或其他 Linux 浏览器，先创建干净的浏览器档案，再从官方网站登录。书签等浏览器设置与 Perplexity 账号里的对话及连接数据要分开。除非浏览器厂商说明支持，否则不要把 Mac 或 Windows 的档案目录直接复制到 Linux；加密方式、钥匙串和本地存储可能依赖平台。\n\n比较 Comet 与其他 AI 浏览器时，可用同一项低风险任务测试，例如总结一篇公开文章并检查回答是否保留来源链接。另见[Comet 与 Dia 怎么选](/zh-cn/guides/comet-vs-dia/)和[Comet 导入、导出与同步](/zh-cn/guides/comet-import-export-vs-sync/)，分别讨论任务比较与 Comet 浏览器数据边界。这两篇都不能证明 Linux 原生支持。"
				},
				{
					"heading": "快速选型",
					"body": "想在 Linux 浏览器里使用 Perplexity 功能，可以选网页应用；想在浏览器内访问当前页面上下文，可找官方支持 Linux 的浏览器及其 AI 助手；任务需要本地智能体并且硬件达标时，再考虑 Portable Computer；需要 Comet 自带浏览器体验时，使用其官方列出的平台。\n\n下载前复查官方产品页。平台支持会变化，而桌面 AI 应用、AI 浏览器和浏览器中的网站，即使共用账号，也不是同一种产品。\n\n| 实际任务 | 应查看的产品 | Linux 边界 |\n| --- | --- | --- |\n| 使用 Perplexity 搜索或对话 | 已有浏览器里的 Perplexity 网页应用 | 不会自动增加 Comet 浏览器集成功能 |\n| 在浏览器内询问当前网页 | 有官方页面问答支持的 Linux 浏览器，例如 Brave Leo | 另查发行版支持和助手控制项 |\n| 让本地智能体处理文件或连接应用 | Portable Computer | Linux RTX PC 需受支持显卡及至少 24 GB 显存；DGX Spark 是另一路径 |\n| 使用 Comet 本身的浏览器体验 | Comet | 官方页列出 Mac、Windows、iOS 和 Android，未列 Linux |"
				}
			],
			"faq": [
				{
					"question": "有官方 Linux 版 Comet 浏览器吗？",
					"answer": "2026 年 11 月 7 日检查的 Comet 页面列出 Mac、Windows、iOS 和 Android，没有 Linux 下载。此结论基于当日页面，不表示未来永远不会增加支持。"
				},
				{
					"question": "Perplexity 完全不支持 Linux 吗？",
					"answer": "并非如此。Perplexity 为符合条件的 Linux 硬件提供 Portable Computer，但它与 Comet 浏览器不同。"
				},
				{
					"question": "能在 Linux 浏览器中用 Perplexity 吗？",
					"answer": "可以在受支持的浏览器中访问 Perplexity 网页应用，但不会因此获得 Comet 原生浏览器界面。"
				}
			]
		}
	},
	"gemini-in-chrome-mobile-surfaces": {
		"en": {
			"title": "Gemini in Chrome on Android and iPhone: Availability and Controls",
			"description": "Compare Android, iPhone and desktop support, identify the mobile Ask Gemini entry point, and use only documented controls.",
			"category": "AI browser guides",
			"content": "Gemini in Chrome has different availability and controls on Android, iPhone and desktop. The mobile help pages describe asking about the current page, while desktop can share multiple tabs and has a documented setting to hide the Gemini toolbar icon. That desktop setting is not a mobile removal control. Google’s pages also say rollout is gradual, so an eligible phone may still lack the feature. This guide separates device requirements, page sharing, and the controls Google documents for each surface.",
			"sections": [
				{
					"heading": "Check which Gemini surface you opened",
					"body": "“Gemini in Chrome” means the Chrome feature that can use the current page as context. It is different from visiting gemini.google.com in a browser and from using the Gemini mobile app’s screen actions. Before changing settings, note whether the phone is Android or iPhone, which Chrome version is installed, and whether the entry appears in Chrome’s toolbar, Page tools, or the More menu.\n\nGoogle’s current [Android instructions](https://support.google.com/chrome/answer/16283624?co=GENIE.Platform%3DAndroid&hl=en) say to tap Ask Gemini in Chrome; they list Android 12 or later, at least 4 GB RAM, English device language, the latest Chrome, a signed-in Chrome profile outside Incognito, supported region, age 18+, and gradual rollout. The [iPhone and iPad instructions](https://support.google.com/chrome/answer/16283624?co=GENIE.Platform%3DiOS&hl=en) say to open Page tools and tap Ask Gemini; they require age 13 or the applicable age in your country, a supported region and device language, the latest Chrome, and a signed-in profile outside Incognito. Do not copy Android requirements to iOS or desktop.\n\n| Surface | Documented entry or control | Eligibility or limitation |\n| --- | --- | --- |\n| Chrome on Android | Ask Gemini, also available from More | 18+, Android 12+, 4 GB RAM, English device language; latest signed-in Chrome, supported region, rollout |\n| Chrome on iPhone or iPad | Page tools > Ask Gemini, or More > Ask Gemini | 13+ or applicable local age; supported device language and region, latest signed-in Chrome, rollout |\n| Either mobile Chrome surface | Stop sharing current page in the chat | Changes attached page context; no dedicated hide setting documented in the reviewed help |\n| Desktop Chrome | Gemini visibility preference in desktop settings | Desktop control; it does not document hiding a mobile entry |"
				},
				{
					"heading": "Use page context without sharing more than intended",
					"body": "On both mobile surfaces, Google says the current page is shared by default when you start a Gemini in Chrome chat. The chat controls include Stop sharing current page. On Android, the help page also describes a floating chat box that can be minimized and reopened. On iPhone and iPad, the documented entry is Page tools, with the conversation in a floating chat box. These are page-assistance workflows, not desktop multi-tab research.\n\nBefore asking about a private page, check the visible page-sharing state. If you only want a general answer, stop sharing the page first or open a new chat and verify which context is attached. If you are using Gemini’s mobile app screen actions rather than Gemini in Chrome, its account and controls are different. A chat entry point does not by itself show that the assistant has read an entire site or other open tabs."
				},
				{
					"heading": "Android: toolbar shortcuts and the Ask Gemini entry",
					"body": "Chrome’s Android toolbar shortcut is a separate control from the Ask Gemini feature. Google’s [toolbar help](https://support.google.com/chrome/answer/14835450?co=GENIE.Platform%3DAndroid&hl=en) says Settings > Appearance > Toolbar shortcut lets you turn that shortcut on or off or choose among listed actions such as New tab, Share, Voice search, Bookmark, Translate and Delete browsing data. The documented list does not name Ask Gemini as a selectable shortcut. On some pages Chrome may replace the chosen shortcut with a page-relevant action.\n\nIf Ask Gemini appears as a separate Chrome control, do not assume turning off the generic toolbar shortcut removes Gemini. Use the feature’s own current controls when they exist, and report a persistent unwanted entry through Chrome feedback. The Android help pages checked here explain how to start or close the chat and stop sharing the page; they do not document a dedicated setting that removes the Ask Gemini entry from every Android Chrome surface.\n\nChanging Android’s system assistant or the Gemini app affects a different surface. These Chrome instructions do not establish that either change will remove Ask Gemini from the browser."
				},
				{
					"heading": "iPhone and iPad: use Page tools and check the current options",
					"body": "Google’s iOS help page puts Ask Gemini under Page tools and also lists a More menu route. It documents stopping page sharing, starting a new chat, minimizing the chat and reopening it. It does not show a dedicated iOS setting to hide the Ask Gemini control. A September 2026 Google Chrome Community discussion asked how to remove the button; one community reply said there was no direct iOS hide control, but community answers are not official product documentation. Use the current Chrome menus and send feedback if the entry is unwanted. Avoid undocumented flags or configuration recipes from old posts.\n\nClosing or minimizing a chat changes the current panel, not the feature’s availability or the page-sharing default in future chats. To keep the assistant from using the current page, use Stop sharing current page when available. If the Page tools menu differs from Google’s help screenshot, update Chrome and compare the current localized help page for your OS.\n\nIf the item appears after selecting text on iOS, record that placement separately from Page tools. The reviewed Chrome help does not give a dedicated removal recipe for every selected-text or context-menu entry. A workaround for the Gemini app is not a documented Chrome menu setting."
				},
				{
					"heading": "Desktop controls do not apply to mobile",
					"body": "On supported desktop Chrome, Google documents Settings > AI innovations > Gemini in Chrome, where Preferences can hide “Show Gemini at the top of the browser.” It also documents removing the pinned icon from the browser toolbar. Those steps are for Chromebook Plus, Mac or Windows. The desktop page context can include up to 10 open tabs, unlike the mobile instructions reviewed here.\n\nFor children, account administrators and managed devices, additional controls may be available through Family Link or organization settings. They govern account eligibility or access, not a user-facing mobile toolbar preference. If a device is managed, ask the administrator to confirm the current policy before trying personal-account workarounds."
				},
				{
					"heading": "Troubleshoot a missing Ask Gemini entry",
					"body": "If the entry is missing, check the device OS first, then Chrome version, signed-in state, Incognito mode, language, region and gradual rollout. On Android, verify Android 12+, 4 GB RAM and the English device language listed in Google’s instructions. On iPhone and iPad, check age 13 or the applicable local age, supported device language and region, and the Page tools menu. Work or school accounts may require administrator enablement. Google also says Gemini in Chrome is unavailable on Google Search result pages. Check an ordinary webpage before concluding that the entry is missing everywhere.\n\nIf your concern is the amount of page data shared, use Stop sharing current page or choose a new chat with the context state visible. If your concern is the button itself, use a documented desktop hide control only on desktop; do not apply chrome://flags or unrelated Gemini app settings to mobile Chrome. The product is changing quickly, so check Google’s OS-specific help page again before relying on these steps."
				}
			],
			"faq": [
				{
					"question": "Can I hide Ask Gemini on iPhone?",
					"answer": "The current iPhone Chrome help page documents Page tools, chat and page-sharing controls, but no dedicated hide setting. The community answer is anecdotal; check the current app and use Chrome feedback."
				},
				{
					"question": "Can I turn off Gemini’s current-page access without hiding it?",
					"answer": "Yes. Google’s mobile instructions describe Stop sharing current page. This changes page context, not whether the Ask Gemini entry is displayed."
				},
				{
					"question": "Does Android use the same eligibility rules as iPhone?",
					"answer": "No. Android currently lists 18+, Android 12+, 4 GB RAM and English device language. iPhone and iPad list 13+ or the applicable local age and a supported device language. Both have region, sign-in and rollout conditions."
				}
			]
		},
		"zh-cn": {
			"title": "Android 与 iPhone 上的 Chrome Gemini：可用条件和控制项",
			"description": "比较 Android、iPhone 和桌面版支持，找到手机上的 Ask Gemini 入口，并只使用有文档说明的控制项。",
			"category": "AI 浏览器指南",
			"content": "Gemini in Chrome 在 Android、iPhone 和桌面版的使用条件与控制项不同。手机帮助页介绍了如何询问当前页面；桌面版可以分享多个标签页，并有隐藏 Gemini 工具栏图标的正式设置。这项桌面设置不是手机上的移除入口。Google 也说明功能正在逐步开放，因此符合条件的手机也可能暂时看不到入口。本文分别说明设备要求、页面共享和各平台有文档记录的控制项。",
			"sections": [
				{
					"heading": "先确认打开的是哪一个 Gemini 功能",
					"body": "“Gemini in Chrome”指的是能把当前网页作为上下文的 Chrome 功能。它不同于在浏览器里打开 gemini.google.com，也不同于 Gemini 手机应用的屏幕操作。修改设置前，记下手机是 Android 还是 iPhone、Chrome 版本，以及入口出现在工具栏、Page tools 还是 More 菜单。\n\nGoogle 当前的[Android 帮助](https://support.google.com/chrome/answer/16283624?co=GENIE.Platform%3DAndroid&hl=en)说明在 Chrome 里点击 Ask Gemini；要求包括 Android 12 或更新版本、至少 4 GB 内存、设备语言为英语、最新版 Chrome、已登录且不在无痕模式、支持地区、年满 18 岁，并受逐步开放影响。[iPhone 和 iPad 帮助](https://support.google.com/chrome/answer/16283624?co=GENIE.Platform%3DiOS&hl=en)说明从 Page tools 打开 Ask Gemini；要求年满 13 岁或达到所在国家适用年龄、位于支持地区、设备使用受支持语言、最新版 Chrome、已登录且不在无痕模式。不要把 Android 条件套到 iOS 或桌面版。\n\n| 使用页面 | 有文档记录的入口或控制 | 资格或限制 |\n| --- | --- | --- |\n| Android Chrome | Ask Gemini，也可从 More 进入 | 18 岁以上、Android 12 以上、4 GB 内存、英语设备语言；最新版已登录 Chrome、支持地区及逐步开放 |\n| iPhone 或 iPad Chrome | Page tools > Ask Gemini，或 More > Ask Gemini | 13 岁或当地适用年龄；支持的设备语言和地区、最新版已登录 Chrome、逐步开放 |\n| 两种手机 Chrome | 聊天里的 Stop sharing current page | 改变附加页面上下文；所查帮助未记录专门隐藏开关 |\n| 桌面 Chrome | 桌面设置中的 Gemini 显示偏好 | 属于桌面控制，不能当作手机入口隐藏方式 |"
				},
				{
					"heading": "使用页面上下文前确认分享状态",
					"body": "Google 说明，手机上启动 Gemini in Chrome 对话时，默认会分享当前页面。聊天控件里有 Stop sharing current page。Android 帮助还介绍了可最小化并重新打开的浮动聊天框；iPhone 和 iPad 则从 Page tools 进入，也会在浮动聊天框中显示对话。这些是询问当前页面的流程，不等于桌面版跨标签页研究。\n\n询问私密页面前，先确认页面共享状态。如果只是要一般性回答，可先停止分享当前页，或另开新对话并检查附加上下文。若使用的是 Gemini 手机应用的屏幕操作，账号与控制项不同。看到聊天入口不代表助手已经读取整个网站或其他打开的标签页。"
				},
				{
					"heading": "Android：工具栏快捷方式不等于 Gemini 功能开关",
					"body": "Chrome Android 工具栏快捷方式与 Ask Gemini 是两个控件。Google 的[工具栏帮助](https://support.google.com/chrome/answer/14835450?co=GENIE.Platform%3DAndroid&hl=en)说明，可以在设置 > 外观 > 工具栏快捷方式中开启或关闭快捷方式，也可以选择新标签、分享、语音搜索、书签、翻译和删除浏览数据等操作。官方列出的选项中没有 Ask Gemini。有些页面上 Chrome 还会临时显示与当前页面相关的快捷操作。\n\n如果 Ask Gemini 作为独立控件出现，不要假定关闭普通工具栏快捷方式就能隐藏 Gemini。只有在当前版本提供 Gemini 专属控制项时，才按该入口操作；找不到时可向 Chrome 反馈。本文查询的 Android 帮助说明如何启动或关闭聊天、停止分享页面，没有记载一个能从所有 Android Chrome 页面移除 Ask Gemini 的专门开关。\n\nAndroid 系统默认助手和 Gemini 手机应用属于另一个使用页面。这些 Chrome 文档不能证明更换系统助手或应用设置会移除浏览器中的 Ask Gemini。"
				},
				{
					"heading": "iPhone 和 iPad：从 Page tools 查看当前选项",
					"body": "Google 的 iOS 帮助说明 Ask Gemini 位于 Page tools，也可从 More 菜单打开。页面记录了停止共享、开启新对话、最小化聊天和重新打开等操作，没有列出隐藏 Ask Gemini 的专门设置。2026 年 9 月的 Chrome Community 讨论有人询问如何移除按钮；社区回复称 iOS 没有直接隐藏选项，但社区回复并非官方产品文档。请以当前 Chrome 菜单为准，如果不需要该入口，可向 Chrome 发送反馈。不要照搬旧帖中的未文档化 flag 或配置方法。\n\n关闭或最小化聊天只改变当前面板，不会关闭功能，也不会自动改变后续对话的页面共享默认值。若要阻止助手读取当前页，使用 Stop sharing current page。若 Page tools 与 Google 帮助截图不同，先更新 Chrome，再查对应操作系统当前的本地化帮助页。\n\n若入口出现在 iOS 选中文字后的菜单里，应单独记下这个位置，不要把它与 Page tools 混为一谈。所查 Chrome 帮助没有给出适用于所有选中文本或上下文菜单入口的移除步骤；Gemini 应用的调整也不是 Chrome 菜单设置。"
				},
				{
					"heading": "桌面控制项不适用于手机",
					"body": "在受支持的桌面 Chrome 上，Google 说明可进入设置 > AI innovations > Gemini in Chrome，在 Preferences 中关闭“Show Gemini at the top of the browser”。也可以从工具栏取消固定图标。这些步骤只针对 Chromebook Plus、Mac 或 Windows。本文查阅的桌面帮助还允许共享最多 10 个打开的标签页，手机说明没有相同的跨标签页入口。\n\n儿童账号、组织账号或受管理设备可能另有 Family Link 或管理员控制。这些设置管理账号资格或访问权限，不等同于用户自己的手机工具栏偏好。若设备由单位管理，应先询问管理员当前策略，不要尝试个人账号绕过方案。"
				},
				{
					"heading": "Ask Gemini 不见时的排查顺序",
					"body": "入口缺失时，先确认设备系统，再检查 Chrome 版本、登录状态、是否在无痕模式、语言、地区和逐步开放状态。Android 要核对 Google 列出的 Android 12、4 GB 内存及英语设备语言要求。iPhone 和 iPad 要核对 13 岁或当地适用年龄、受支持的设备语言和地区，以及 Page tools 菜单。工作或学校账号还可能需要管理员启用。Google 还说明 Google 搜索结果页不能使用此功能，应在普通网页检查后再判断是否处处没有入口。\n\n如果担心的是页面共享范围，点击 Stop sharing current page，或在新对话中确认当前上下文。如果担心的是按钮本身，桌面版才使用桌面隐藏设置；不要把 chrome://flags 或 Gemini 手机应用设置套到移动 Chrome。功能仍在更新，依赖这些步骤前请再查 Google 对应操作系统的帮助页。"
				}
			],
			"faq": [
				{
					"question": "iPhone 上能隐藏 Ask Gemini 吗？",
					"answer": "当前 iPhone Chrome 帮助记录了 Page tools、聊天和页面共享控制，没有列出专门的隐藏设置。社区回复属于用户经验，建议以当前应用为准并向 Chrome 反馈。"
				},
				{
					"question": "能阻止 Gemini 读取当前页但保留入口吗？",
					"answer": "可以。Google 手机帮助说明有 Stop sharing current page。它会改变页面上下文，不会隐藏 Ask Gemini。"
				},
				{
					"question": "Android 和 iPhone 的资格条件一样吗？",
					"answer": "不一样。Android 当前列出 18 岁、Android 12、4 GB 内存和英语设备语言要求；iPhone 和 iPad 则为 13 岁或当地适用年龄，并使用支持的设备语言。两者都受地区、登录和逐步开放条件限制。"
				}
			]
		}
	}
};

const sources: Record<string, Array<{ title: string; url: string }>> = {
	"dia-skills-create-edit-reuse": [
		{
			"title": "Dia Mac 1.0.1: historical Skills dropdown, October 9, 2025",
			"url": "https://www.diabrowser.com/changelog/mac/1-0-1"
		},
		{
			"title": "Dia Mac 1.2.0: historical natural-language builder, October 24, 2025",
			"url": "https://www.diabrowser.com/changelog/mac/1-2-0"
		},
		{
			"title": "Dia changelog: November 5, 2026, Mac 1.56.0",
			"url": "https://www.diabrowser.com/changelog/mac/1-56-0"
		},
		{
			"title": "Dia changelog: October 15, 2026, Windows 1.2.0 Skills release",
			"url": "https://www.diabrowser.com/changelog/windows/1-2-0"
		},
		{
			"title": "Dia changelog: November 5, 2026, Windows 1.5.0",
			"url": "https://www.diabrowser.com/changelog/windows/1-5-0"
		},
		{
			"title": "Dia: Create New Skills question",
			"url": "https://www.reddit.com/r/diabrowser/comments/1sjo5db/create_new_skills/"
		},
		{
			"title": "Dia: Skills not working report",
			"url": "https://www.reddit.com/r/diabrowser/comments/1voazdv/skills_not_working/"
		},
		{
			"title": "Dia Skills community master thread",
			"url": "https://www.reddit.com/r/diabrowser/comments/1m6pdk0/master_thread_for_dia_skills/"
		},
		{
			"title": "TechCrunch: Dia launches Skills gallery",
			"url": "https://techcrunch.com/2025/07/21/dia-launches-a-skill-gallery-perplexity-to-add-tasks-to-comet/"
		},
		{
			"title": "PiunikaWeb: Dia update adds custom Skills",
			"url": "https://piunikaweb.com/2026/10/16/dia-update-github-live-groups-custom-skills/"
		}
	],
	"comet-assistant-history-data-controls": [
		{
			"title": "Perplexity: Self-Serve Data Options",
			"url": "https://www.perplexity.ai/en-GB/hub/legal/self-serve-data-options"
		},
		{
			"title": "Perplexity: Privacy Snapshot",
			"url": "https://www.perplexity.ai/en-GB/hub/blog/introducing-privacy-snapshot"
		},
		{
			"title": "Perplexity changelog: Memory and thread management",
			"url": "https://www.perplexity.ai/en-GB/changelog/what-we-shipped---december-5th"
		},
		{
			"title": "Perplexity forum: Comet history bulk-removal request",
			"url": "https://community.perplexity.ai/t/perplexity-history-management-in-comet-browser/3918"
		},
		{
			"title": "Reddit: Separate Comet Assistant history from search history",
			"url": "https://www.reddit.com/r/perplexity_ai/comments/1m5s639"
		},
		{
			"title": "Reddit: Comet Assistant threads and history",
			"url": "https://www.reddit.com/r/perplexity_ai/comments/1mkx928"
		},
		{
			"title": "Reddit: Comet iOS thread cleanup",
			"url": "https://www.reddit.com/r/PerplexityComet/comments/1s0sgl8"
		},
		{
			"title": "TechRadar: Perplexity Comet multitasking and assistant",
			"url": "https://www.techradar.com/ai-platforms-assistants/gemini/perplexity-upgrades-comet-to-multitask-across-your-tabs"
		}
	],
	"perplexity-comet-google-drive-connector": [
		{
			"title": "Perplexity Computer Projects: context and account scope",
			"url": "https://www.perplexity.ai/en-GB/hub/products/projects"
		},
		{
			"title": "Perplexity changelog: Gmail, Calendar and Drive connectors",
			"url": "https://www.perplexity.ai/changelog/what-we-shipped-september-19th"
		},
		{
			"title": "Google Account Help: Remove third-party access",
			"url": "https://support.google.com/accounts/answer/13533235?hl=en"
		},
		{
			"title": "Perplexity forum: Google Drive connector crashes",
			"url": "https://community.perplexity.ai/t/google-drive-connector-crashes-and-does-not-show-drive-files/5403"
		},
		{
			"title": "Reddit: Error connecting Google Drive to Perplexity",
			"url": "https://www.reddit.com/r/perplexity_ai/comments/1t9zn8y/error_connecting_google_drive_to_perplexity/"
		},
		{
			"title": "Reddit: Problems with Google Drive connector",
			"url": "https://www.reddit.com/r/perplexity_ai/comments/1tfe61m/problems_with_google_drive_connector/"
		},
		{
			"title": "Reddit: Google Drive connector permission scope question",
			"url": "https://www.reddit.com/r/perplexity_ai/comments/1kzngdv"
		},
		{
			"title": "Perplexity workshop: Connectors and source selection",
			"url": "https://www.perplexity.ai/en-GB/hub/workshops/accelerated-research-for-consultants"
		}
	],
	"comet-linux-browser-vs-local-computer": [
		{
			"title": "Perplexity Comet official platform page",
			"url": "https://www.perplexity.ai/comet"
		},
		{
			"title": "Perplexity Portable Computer: Linux requirements",
			"url": "https://www.perplexity.ai/en-GB/hub/products/portable-computer"
		},
		{
			"title": "Brave: Download for Linux",
			"url": "https://brave.com/linux/"
		},
		{
			"title": "Brave Leo: Linux availability and webpage assistance",
			"url": "https://brave.com/leo/"
		},
		{
			"title": "Mozilla: Firefox for Linux",
			"url": "https://www.mozilla.org/firefox/linux/"
		},
		{
			"title": "iTechGuides: Perplexity Comet review, 2026",
			"url": "https://www.itechguides.com/perplexity-comet-browser-review-2026-is-it-worth-trying/"
		},
		{
			"title": "BrowserPedia: Comet profile",
			"url": "https://browserpedia.com/browsers/comet"
		},
		{
			"title": "Reddit: Comet browser in Linux",
			"url": "https://www.reddit.com/r/perplexity_ai/comments/1ma9xkr/comet_browser_in_linux/"
		},
		{
			"title": "Reddit: Comet for Linux",
			"url": "https://www.reddit.com/r/perplexity_ai/comments/1mndzxo"
		},
		{
			"title": "Perplexity: Portable Computer rollout and Linux support",
			"url": "https://www.perplexity.ai/changelog/effort-mode-gpt-6-astra-and-skills-marketplace"
		}
	],
	"gemini-in-chrome-mobile-surfaces": [
		{
			"title": "Google Chrome Help: Gemini in Chrome on Android",
			"url": "https://support.google.com/chrome/answer/16283624?co=GENIE.Platform%3DAndroid&hl=en"
		},
		{
			"title": "Google Chrome Help: Gemini in Chrome on iPhone and iPad",
			"url": "https://support.google.com/chrome/answer/16283624?co=GENIE.Platform%3DiOS&hl=en"
		},
		{
			"title": "Google Chrome Help: Desktop Gemini visibility controls",
			"url": "https://support.google.com/chrome/answer/16283624?hl=en"
		},
		{
			"title": "Google Chrome Help: Customize Android toolbar",
			"url": "https://support.google.com/chrome/answer/14835450?co=GENIE.Platform%3DAndroid&hl=en"
		},
		{
			"title": "Google Chrome Blog: Gemini in Chrome on Android",
			"url": "https://blog.google/products-and-platforms/products/chrome/bringing-chrome-ai-to-android/"
		},
		{
			"title": "Google Chrome Community: Ask Gemini mobile control question",
			"url": "https://support.google.com/chrome/thread/466551806/disabling-cumbersome-features?hl=en"
		},
		{
			"title": "Reddit: Remove Ask Gemini from Chrome mobile",
			"url": "https://www.reddit.com/r/chrome/comments/1uxar5z/how_do_we_delete_the_ask_gemini_bar_on_the_new/"
		},
		{
			"title": "Reddit: Ask Gemini in Chrome iOS context menu",
			"url": "https://www.reddit.com/r/chrome/comments/1skhn54/gemini_in_ios_chrome_context_menu/"
		},
		{
			"title": "Android Central: Gemini in Chrome rollout and device differences",
			"url": "https://www.androidcentral.com/apps-software/chromes-ai-assistant-finally-breaks-out-of-the-us"
		},
		{
			"title": "Tom's Guide: Chrome Android page-to-podcast feature",
			"url": "https://www.tomsguide.com/computing/browsers/chrome-can-turn-any-webpage-into-an-ai-podcast-heres-how-to-do-it"
		},
		{
			"title": "TechRadar: Chrome Gemini Skills walkthrough",
			"url": "https://www.techradar.com/ai-platforms-assistants/i-tried-chromes-new-ai-skills-feature-and-its-like-a-mini-toolkit-of-ai-shortcuts"
		}
	]
};

const slugs = Object.keys(copies);
export const aiCycleGuides07: EditorialGuide[] = slugs.map(slug => ({
	...copies[slug]["zh-cn"], slug, date: "2026-11-07", sourcePath: `src/data/ai-cycle-2026-11-07.ts#${slug}`,
	availableLocales: ["en", "zh-cn"], relatedBrowsers: [], relatedTools: [], sources: sources[slug],
	relatedGuides: slug.startsWith("dia-") ? ["comet-query-shortcuts", "ai-browser-research-source-verification"] : slug.startsWith("comet-assistant-") ? ["comet-import-export-vs-sync", "ai-browser-research-source-verification"] : slug.startsWith("perplexity-") ? ["ai-browser-meeting-prep-brief", "comet-assistant-history-data-controls"] : slug.startsWith("comet-linux-") ? ["comet-vs-dia", "comet-import-export-vs-sync"] : ["gemini-auto-browse-local-vs-remote", "ai-browser-tab-access-permissions"]
}));
export const aiCycleTranslations07 = copies;
