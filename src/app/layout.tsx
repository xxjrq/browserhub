import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DocumentLanguage } from "@/components/layout/document-language";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://browserhub.co"),
	title: { default: "指纹浏览器资源大全 | BrowserHub", template: "%s | BrowserHub" },
	description: "指纹浏览器、浏览器指纹检测、自动化、代理与隐私资源导航。",
	keywords: ["anti-detect browser", "fingerprint browser", "browser automation", "multi-account", "privacy"],
	authors: [{ name: "xxjrq" }],
	creator: "xxjrq",
	 alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "zh_CN",
		title: "指纹浏览器资源大全 | BrowserHub",
		description: "指纹浏览器、检测工具、自动化与隐私资源导航。",
		siteName: "BrowserHub",
		images: [{ url: "/brand/browserhub-og.png", width: 1200, height: 630, alt: "BrowserHub 指纹浏览器资源大全" }]
	},
	twitter: {
		card: "summary_large_image",
		title: "指纹浏览器资源大全 | BrowserHub",
		description: "指纹浏览器、检测工具、自动化与隐私资源导航。",
		images: ["/brand/browserhub-og.png"]
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
			<body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
				{process.env.NODE_ENV === "production" && <Script id="baidu-analytics" strategy="afterInteractive">{`var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?05e35203a9afa3bf3f9100645c520d27";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`}</Script>}
				<DocumentLanguage />
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
					{
						"@context": "https://schema.org",
						"@type": "Organization",
						"@id": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://browserhub.co"}/#organization`,
						name: "BrowserHub",
						url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://browserhub.co",
						sameAs: ["https://github.com/xxjrq/antidetect-browser-hub", "https://gitee.com/xxjrq/antidetect-browser-hub"]
					},
					{
						"@context": "https://schema.org",
						"@type": "WebSite",
						"@id": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://browserhub.co"}/#website`,
						name: "BrowserHub",
						url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://browserhub.co",
						publisher: { "@id": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://browserhub.co"}/#organization` }
					}
				]) }} />
				<div className="relative flex min-h-screen flex-col">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
