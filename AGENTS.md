<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 部署（已确认，不要再排查主机）

**`bash scripts/deploy.sh` 即可发布，部署目标已写死在脚本默认值里。**

- SSH：`root@178.156.220.215`（远端 hostname `mz1`），**公钥免密**，ssh 别名 `browserhub-deploy`
- 根目录：`/opt/browsertools`，`current` → `releases/<日期>-<commit>`，保留 5 个版本
- 源站直连域 `browsers.draxgr.cc`；`browserhub.co` 在 Cloudflare 后面（DNS 查不到源站）
- 发布流程：`npm run ci` → 上传 → `current` 原子切换 → reload nginx → 冒烟测试；失败自动保留旧版本

### 三条已踩过的坑

1. **不要用 `~/.ssh/config` 里的主机列表找部署机。** 那几台（myserver / 47.84.225.130 /
   centos-ainiu / vm-arm）跑的是**无关业务**（skyvora.cc、aimmme.com 等），
   在它们上面 grep `browserhub` 永远是空的。真正的部署机不在那个列表里。
2. **`centos-ainiu` 上的 `llms.txt` 属于 EasyBR 项目**，与本仓库无关，不要误判成部署目标。
3. **冒烟测试和复验都要打 `browsers.draxgr.cc`，不要打 `browserhub.co`。**
   Cloudflare 缓存可能让旧版本返回 200，造成"部署成功"的假象。
   发布后应对两个域名都 curl 一次，确认真实 HTML 已更新。

## 持续内容工作流

BrowserHub 使用 `tools/workflows/agent.mjs` 接入公共 LangGraph 运行器；先读 `tools/workflows/README.md`。保持业务执行器、内容、账号与私有状态在本项目。周期触发由本聊天的 Codex heartbeat 提供，公共运行器不提供调度器。

按用户指定的公共接入文档 `docs/MODEL-ROLES.md` 执行模型分工：常规内容执行 `gpt-6-luna`，独立审核 `gpt-6.1-sol`，复杂架构/关键决策与三次不同执行尝试仍未解决的问题使用 `gpt-6.1-sol` 的 `xhigh`。人工本次指定优先；不能静默换模型。能由代码完成的检查不调用模型。每轮保留实际角色、来源和未知项，不编造实际模型或 Token 消耗。

用户已授权持续研究优质指纹浏览器与环境检测内容、优化已有对比，并在审核和构建通过后直接上线。每天最多一个新主题（完整中英文）或两项实质旧文增强，避免同义重复。先做当前搜索与一手来源取证；用户暂缓收录操作，不提交索引、不把页数/爬虫当流量。不要修改 EasyBR 客户端和后端，不发送外联消息，不新增付费订阅。
