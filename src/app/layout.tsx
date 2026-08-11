import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://browsers.draxgr.cc"),
	title: {
		default: "指纹浏览器资源大全 | Anti-Detect Browser Hub",
		template: "%s | 指纹浏览器资源大全"
	},
	description: "整理指纹浏览器、浏览器指纹检测、自动化与隐私资源，支持产品对比、技术百科和使用指南。",
	keywords: ["anti-detect browser", "fingerprint browser", "browser automation", "multi-account", "privacy"],
	authors: [{ name: "Anti-Detect Browser Hub" }],
	creator: "xxjrq",
	openGraph: {
		type: "website",
		locale: "zh_CN",
		title: "指纹浏览器资源大全",
		description: "指纹浏览器、检测工具、自动化与隐私资源导航。",
		siteName: "指纹浏览器资源大全"
	},
	twitter: {
		card: "summary_large_image",
		title: "指纹浏览器资源大全",
		description: "指纹浏览器、检测工具、自动化与隐私资源导航。"
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1
		}
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN" suppressHydrationWarning>
			<body className={`${inter.variable} font-sans antialiased`}>
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Organization",
					name: "指纹浏览器资源大全",
					url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://browsers.draxgr.cc",
					sameAs: ["https://github.com/xxjrq/antidetect-browser-hub", "https://gitee.com/xxjrq/antidetect-browser-hub"]
				}) }} />
				<div className="relative flex min-h-screen flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
