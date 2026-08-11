import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "指纹浏览器",
	description: "比较指纹浏览器的状态、价格、平台、代理、自动化和适用场景。",
	alternates: { canonical: "/browsers/" }
};

export default function BrowsersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
