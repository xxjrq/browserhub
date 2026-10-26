import { InfoPage } from "@/components/info-page";

export const metadata = { title: "关于项目", description: "BrowserHub 指纹浏览器、检测工具和隐私资源项目说明：目录结构、收录标准、复核方式与利益披露。", alternates: { canonical: "/zh-cn/about/" } };

export default function AboutPage() {
	return (
		<div className="container py-16 sm:py-20">
			<InfoPage locale="zh-cn" kind="about" />
		</div>
	);
}
