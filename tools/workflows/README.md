# BrowserHub 持续内容工作流

本项目已经接入公共 LangGraph。公共运行器负责检查点、暂停恢复和操作日志；本聊天的每日 Codex heartbeat 负责唤醒内容智能体。只有接线或写了计划文档，不会自行开始下一轮。

## 每轮执行

北京时间每天 09:00，最多新增一个完整中英主题，或对两篇现有页面做实质增强。先查现有主题及关键词映射，再取当前搜索和一手资料；没有独立新意图就补强旧页，不凑数。按用户要求暂缓收录工作，审核和构建通过后直接发布。

模型由当前智能体显式分派，配置在 `model-roles.json`：Luna 6 执行，Sol 6.1 独立审核，复杂决策及三次不同尝试仍失败时用 Sol 6.1 xhigh。人工明确指定优先；模型响应未报告实际型号时填 null。此项目使用当前智能体的工具执行研究和写作，不在公共框架中伪装模型自动执行节点。

先确认接线和真实依赖：

```sh
node tools/workflows/agent.mjs doctor
node tools/workflows/agent.mjs run --workflow inspect --task inspect-2026-10-20
```

用上海日期固定每天的任务身份，禁止靠新任务名重复提交同一天的发布：

```sh
node tools/workflows/agent.mjs run --workflow content-cycle --task content-2026-10-20 \
  --json '{"cycleId":"content-2026-10-20","authorization":{"external":true}}'
```

流程真实执行：依赖检查 → 等待内容与独立审核 → `npm run ci` → 仅提交审核覆盖文件 → 推送 → 原子部署 → 主域与源站正文核验 → 保存完成回执。等待文章时任务持久暂停，恢复不会重复已完成节点。

## 内容与审核交接

每轮私有目录为 `.local/workflows/cycles/content-YYYY-MM-DD/`。所有回执和运行状态被 Git 忽略，不能提交 Cookie、浏览器ID、密钥、原始账号数据或模型完整上下文。

1. 当前智能体调用明确的 Luna 执行者完成搜索、来源核查、完整双语内容及共享目录/系列导航接入。先保存 `handoff.json`，包含 `files`（相对路径列表）、`topics`、`urls`（需要核验的完整 browserhub.co URL）和 `executor`（请求/实际模型、推理强度、尝试与来源）。限制改动在内容、关键词记录和原有内容审计名单，不让写作执行者改公共内核或发布器。
2. 独立 Sol 上下文读取这些真实文件和来源，审核准确性、原创信息增益、语种、内链、技术边界及授权范围。按最终实际字节计算文件 SHA256，写 `review.json`：`cycleId`、`decision:"approved"`、`role:"reviewer"`、`modelRequested:"gpt-6.1-sol"`、实际型号未知时 `modelEffective:null`、`independentContext:true` 和 `files:[{path,sha256}]`。审核未通过就交回 Luna 修订，不能由脚本或执行者冒签通过。
3. 用正式交接工具校验并冻结，随后继续原任务：

```sh
node tools/workflows/prepare-cycle.mjs content-2026-10-20
node tools/workflows/agent.mjs resume --task content-2026-10-20
node tools/workflows/agent.mjs status --task content-2026-10-20
```

新文须接 `resources.ts`、`guide-editions.ts`、`guide-series.ts`，补关键词记录和必要的 HTML 审计名单；新文只生成完整的 en/zh-cn。首页特色入口按主题价值选择。对比页沿用统一产品核查数据，不另造价格表。

未被审核覆盖的工作区变化会阻止构建和发布，原文件保留。审核后的文件或 Git HEAD 变化也会停止流程，防止把别人的修改顺带发布。

## 运行与故障口径

`completed` 只表示图结束；交付需同时有 `content_cycle_completed`、真实部署 release 和主域/源站匹配的 `live.json`。首次初始化 inspect 不等于内容已生产或网站已发布。

CI、本地内容处理失败可在修正后按原任务状态恢复；外部推送或发布结果未知时保留 `needs_reconciliation`，先读原 `push.json`/`publish.json` 与实际远端状态，禁止重投、删除journal或换任务名绕过。日常无实质变化保持安静；真实发布、明确失败或需要用户处理才报告。

公共文档位于运行器仓库 `docs/INTEGRATION.md`、`docs/ADAPTER-API.md`、`docs/COMPONENTS.md`、`docs/MODEL-ROLES.md`。本机配置为私有 `.local/workflows/runtime.local.json`，换机器用公共 `lgw init --existing` 恢复接线，不覆盖旧检查点。
