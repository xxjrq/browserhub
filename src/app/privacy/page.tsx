import { InfoPage } from "@/components/info-page";

export const metadata = { title: "隐私说明", description: "BrowserHub 隐私说明：本站收集与不收集的数据、访问统计与服务器日志、第三方脚本，以及你的选择与提问方式。", alternates: { canonical: "/zh-cn/privacy/" } };

export default function PrivacyPage() {
	return (
		<div className="container py-16 sm:py-20">
			<InfoPage locale="zh-cn" kind="privacy" />
		</div>
	);
}
