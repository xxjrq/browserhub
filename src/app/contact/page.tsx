import { InfoPage } from "@/components/info-page";

export const metadata = { title: "联系与贡献", description: "向 BrowserHub 提交资源纠错、新增产品、翻译修订或商务意向：提交材料要求、处理流程与可用渠道。", alternates: { canonical: "/zh-cn/contact/" } };

export default function ContactPage() {
	return (
		<div className="container py-16 sm:py-20">
			<InfoPage locale="zh-cn" kind="contact" />
		</div>
	);
}
