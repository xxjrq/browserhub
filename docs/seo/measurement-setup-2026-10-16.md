# BrowserHub 流量观测配置：2026-10-16

本轮目标是建立可归属本站的未来流量数据。Google Search Console 的 `https://browserhub.co/` URL-prefix 资源已在本轮验证，数据处理中；Bing Webmaster Tools 已完成 XML 验证，sitemap 已提交、状态 Processing；Google sitemap 状态成功并发现 908 URL（不是已索引数量）。服务端观测不能替代搜索曝光、点击和索引覆盖数据。

## 已上线配置

上线时间：**2026-10-16 11:54:25 Asia/Shanghai**（03:54:25 UTC）。只操作已确认的 `browserhub-deploy` 部署机上 BrowserHub 的两个生效站点配置；未修改其他站点、域名路由、TLS、缓存或重定向规则。

| 站点 | 启用链接 → 实际配置 | 独立日志 |
|---|---|---|
| browserhub.co | `/etc/nginx/sites-enabled/browserhub.co` → `/etc/nginx/sites-available/browserhub.co` | `/var/log/nginx/browserhub.co.access.log`、`browserhub.co.error.log` |
| browsers.draxgr.cc | `/etc/nginx/sites-enabled/browsers.draxgr.cc` → `/etc/nginx/sites-available/browsers.draxgr.cc` | `/var/log/nginx/browsers.draxgr.cc.access.log`、`browsers.draxgr.cc.error.log` |

各站点的 HTTP、HTTPS server 块均设置相同的本站独立日志。access_log 使用 nginx 标准 combined；error_log 级别为 warn。仓库模板同步修改：`deploy/nginx/browserhub.co.conf` 与 `deploy/nginx/browsers.draxgr.cc.conf`。

修改前分别备份，写入后 `nginx -t` 通过才 `systemctl reload nginx`；两者均已成功。操作脚本设有失败恢复原文件并再次验证/reload 的回滚分支，未触发。备份：

```text
/etc/nginx/sites-available/browserhub.co.seo-log-backup-20261016T035425Z
/etc/nginx/sites-available/browsers.draxgr.cc.seo-log-backup-20261016T035425Z
```

如需恢复，请只恢复对应站点备份，再配置验证通过后 reload。后续如站点配置又有变更，不要直接用旧备份覆盖新的业务规则。

## 写入验收

用专用 `BrowserHub-measurement-check/1.0` User-Agent 分别访问两域，均返回 200。11:55:42 的只读聚合快照：

| 站点 | 新日志记录 | 状态码类别 | 自有测量探针 | UA 自称 Googlebot |
|---|---:|---|---:|---:|
| browserhub.co | 15 | 2xx=9，3xx=4，4xx=2 | 1 | 4，未验证 |
| browsers.draxgr.cc | 1 | 2xx=1 | 1 | 0 |

两份文件解析失败数均为 0；正式域第一条为 11:54:32，源站域第一条为 11:55:16。数量只是新日志写入验收，混有诊断、机器人和其他请求，不能称为新增访客、自然流量或真实 Googlebot 发现本站。未在文档中保存原日志、IP、原始 UA、referrer URL 或查询串。

## 只读聚合

运行位置为仓库根目录，脚本通过标准输入发到远端 Python 执行，远端不落地脚本文件：

```bash
ssh -o BatchMode=yes browserhub-deploy 'python3 - --site browserhub.co' < scripts/summarize-traffic.py
ssh -o BatchMode=yes browserhub-deploy 'python3 - --site browsers.draxgr.cc' < scripts/summarize-traffic.py
```

默认读取指定站点的 `.access.log*`，支持 gzip 轮换文件，分别输出最近 7/28 天窗口中**当前文件实际保留的记录**。指定固定结束时间可以复查同一窗口：

```bash
ssh -o BatchMode=yes browserhub-deploy 'python3 - --site browserhub.co --days 7 28 --now 2026-10-23T04:00:00Z' < scripts/summarize-traffic.py
```

输出只包含站点名、文件数、时间范围、请求与状态码汇总、按 UTC 日聚合、referrer 类别和自报 UA 类别。脚本不写任何文件，不输出或保留 IP、完整 UA、referrer、路径及查询串。可把纯聚合 JSON 保存到受控工作目录做每周对照，不要提交原始 nginx 日志。该脚本已通过合成数据检查：gzip、7/28 天边界、HTML 路径候选、UA 未验证标签、私有字段排除。

解释口径：

- `requests` 包含 HTTP 跳转、资源、错误、爬虫与探针；它不是用户或会话。
- `get_2xx_html_path_candidates` 是 GET + 2xx + 路径形态的估算。combined 没有 Content-Type，不能断言全部为 HTML 页面访问。
- referrer 分为未知/缺失、站内、搜索引擎、AI、其他外部。缺 referrer 很常见，来源也可伪造；这个分类不等于自然搜索点击。
- `claims_googlebot_unverified`、`claims_bingbot_unverified` 和 AI crawler 分类只表示 UA 自称。脚本不做 IP/DNS 验证，不能把它称为真实机器人。
- 浏览器形态的 UA 也可能来自机器人，不能用“总请求减机器人”推算真人。
- browserhub.co 的 Cloudflare 缓存命中可能不回源，源站日志可能漏记外部访问；browsers.draxgr.cc 应单独观察，不能把两个域名的记录直接合并成正式域流量。

默认 nginx combined 原始日志与过去一样包含客户端 IP 和完整请求字段，限服务器受控访问；本轮增加的是站点分流，没有新增客户端跟踪脚本或 Cookie。对外分享、仓库记录和后续分析默认只使用脱敏聚合。需要验证真实机器人时，应在有权限的服务器内完成来源验证，仅输出验证结果计数。

## 历史与后续基线

11:54:25 之前的默认 access.log 由多个站点共享且无 host 字段，不能可靠追溯本站 7/28 天历史。新日志窗口在积累足够时间和保留周期前均不完整；某一阶段没有保留记录应记未知，不记 0。

只读核验 `/etc/logrotate.d/nginx`：现有规则覆盖 `/var/log/nginx/*.log`，每日轮换、压缩、保留 14 份，因此两份新日志自动纳入已有轮换；本轮未改全局保留策略。直接读取日志的 28 天窗口长期也可能不完整。若要建立 28 天对比，需持续保留脱敏的完整 UTC 日汇总，并按站点与日期去重；每周快照合并时保留该日最后一次完整汇总，不能把重叠 7/28 天窗口相加。

每周保存一次聚合快照，检查正式域 4xx/5xx、HTML 候选变化、referrer 类别和可验证抓取变化。把这份观测与将来 GSC 的页面/搜索词曝光、点击、索引原因联看，才决定优先更新哪些文章。不得把日志中的“自称机器人来过”当作收录完成。

GSC 本轮已通过 HTML 公开文件完成 browserhub.co URL-prefix 验证，数据处理中。新版本部署后提交 canonical sitemap，抽样检查首页、pillar、1 个对比和 2 篇指南，再按每周最近 28 天导出品牌/非品牌和语言分组数据。公开站长验证文件需要持续可访问；登录验证码、密钥、Cookie、访问 token 不写入仓库或聊天记录。
