# BrowserHub · 指纹浏览器资源大全

BrowserHub 是一个面向全球用户的静态资源导航站，集中整理指纹浏览器、浏览器指纹检测工具、自动化框架、代理与隐私技术。项目以中文内容为主，同时保留英文、日文、韩文、西班牙文、葡萄牙文和俄文入口，方便用户按场景查找资源。

## 在线入口

- 正式网站：[browserhub.co](https://browserhub.co/)
- GitHub 资源库：[xxjrq/antidetect-browser-hub](https://github.com/xxjrq/antidetect-browser-hub)
- Gitee 资源库：[xxjrq/antidetect-browser-hub](https://gitee.com/xxjrq/antidetect-browser-hub)

## 内容范围

- 36+ 个指纹浏览器与多账号浏览器
- 35+ 个指纹检测、自动化、代理和隐私工具
- 15+ 项浏览器指纹技术
- 9 个典型使用场景与选型指南
- 浏览器对比页、教程页、联系与社区入口

资源信息用于导航和选型参考；价格、免费额度、平台与功能可能随供应商调整，使用前请以官方页面为准。EasyBR 作为本站关联产品单独披露，不影响其他资源的客观列示。

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看本地站点。

## 静态构建与验收

```bash
# 生成品牌资源并构建 browserhub.co 的静态站
npm run ci
```

`npm run ci` 会依次执行 ESLint、品牌资源生成、Next.js 静态构建和产物检查。构建产物位于 `out/`，可直接部署到 Nginx、Vercel、Cloudflare Pages、GitHub Pages 或 Gitee Pages。

也可以按需执行：

```bash
npm run lint
npm run assets:brand
NEXT_PUBLIC_SITE_URL=https://browserhub.co npm run build
npm run check:dist
```

## 服务器部署

Nginx vhost 示例位于 `deploy/nginx/`。本仓库只负责静态站源码和构建产物，不包含服务器凭据。

**部署目标（已确认，直接用，不要再猜）**

| 项 | 值 |
|---|---|
| SSH | `root@178.156.220.215`（远端 hostname `mz1`），公钥免密 |
| ssh 别名 | `browserhub-deploy`（已写入 `~/.ssh/config`） |
| 部署根目录 | `/opt/browsertools`，`current` 软链接指向 `releases/<日期>-<commit>` |
| 保留版本数 | 5（`KEEP_RELEASES`） |
| 源站直连域 | `browsers.draxgr.cc`（nginx 1.24.0 Ubuntu） |
| Cloudflare 主域 | `browserhub.co`（DNS 指向 172.67.x / 104.21.x，代理回源到上面那台） |
| 证书 | `/etc/letsencrypt/live/{browserhub.co,browsers.draxgr.cc}` |

发布命令：

```bash
bash scripts/deploy.sh
# 等价于 DEPLOY_HOST=browserhub-deploy DOMAIN=browsers.draxgr.cc bash scripts/deploy.sh
```

`deploy.sh` 会依次执行：清理构建缓存 → `npm run ci` → 上传到新的 release 目录 →
`current` 原子切换 → reload Nginx → 冒烟测试。任一步失败都会保留上一版本继续对外服务。

**冒烟测试为什么用 `browsers.draxgr.cc` 而不是 `browserhub.co`**：主域在 Cloudflare 后面，
缓存可能让一次旧版本的响应返回 200，让部署看起来成功而实际没更新。`browsers.draxgr.cc`
直连本机，读到的就是刚上传的产物。上线后仍建议对两个域名都 curl 复验一次。

## 数据来源与维护

浏览器、工具、技术和场景目录集中存放在 `src/data/catalog/`；浏览器详情同时参考主资源库 `xxjrq/antidetect-browser-hub` 的公开整理内容。新增或修订条目时，请保留官方链接、适用场景和限制说明，不提交密码、令牌或其他敏感信息。
