import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "指纹检测与自动化工具",
	description: "整理浏览器指纹检测、机器人检测、自动化框架、网络测试和隐私工具。",
	alternates: { canonical: "/tools/" }
};

export default function ToolsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
