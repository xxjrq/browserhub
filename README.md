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

## 数据来源与维护

浏览器、工具、技术和场景目录集中存放在 `src/data/catalog/`；浏览器详情同时参考主资源库 `xxjrq/antidetect-browser-hub` 的公开整理内容。新增或修订条目时，请保留官方链接、适用场景和限制说明，不提交密码、令牌或其他敏感信息。

服务器部署示例位于 `deploy/nginx/`。本仓库只负责静态站源码和构建产物，不包含服务器凭据，也不在本地提交中自动发布线上服务。
