# 指纹浏览器资源大全

一个静态的指纹浏览器、浏览器指纹检测、自动化与隐私资源导航站。

- 临时站点：[browsers.draxgr.cc](https://browsers.draxgr.cc/)
- GitHub 资源库：[xxjrq/antidetect-browser-hub](https://github.com/xxjrq/antidetect-browser-hub)
- Gitee 资源库：[xxjrq/antidetect-browser-hub](https://gitee.com/xxjrq/antidetect-browser-hub)

## 本地开发

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看本地站点。

## 构建静态文件

```bash
NEXT_PUBLIC_SITE_URL=https://browsers.draxgr.cc npm run build
```

产物位于 `out/`，可直接由 Nginx、Vercel、Cloudflare Pages 或 GitHub Pages 托管。

服务器部署配置位于 `deploy/nginx/`。
