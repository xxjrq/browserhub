type ComparisonBrowser = {
	name: string; free: string; price: string; platforms: string[]; engine: string; storage: string;
};

/** Prose uses the same reviewed fields as the table, without a second price list. */
export function comparisonSectionsFor(a: ComparisonBrowser, b: ComparisonBrowser) {
	return [
		{ heading: "免费额度与预算如何核对", body: `${a.name}：${a.free}；套餐价格：${a.price}。\n\n${b.name}：${b.free}；套餐价格：${b.price}。\n\n先区分永久免费额度、限时试用、月付与长期预付折算，再按实际环境数、成员数、代理流量和税费计算总成本。币种不同的套餐不直接当作同币种排名；未能核实的报价请通过下方官方来源确认。` },
		{ heading: "部署与资料位置检查", body: `${a.name} 的已整理平台：${a.platforms.join("、")}；内核：${a.engine}；资料位置：${a.storage}。\n\n${b.name} 的已整理平台：${b.platforms.join("、")}；内核：${b.engine}；资料位置：${b.storage}。\n\n用实际操作系统验证安装、更新、代理连接、导入导出与备份恢复。本地优先不等于完全离线，云同步也不等于完整备份。Android 指纹、云手机和 Android 客户端是不同能力。` },
		{ heading: "功能确认与选型记录", body: "对照本页每个产品的官方来源和逐项核查状态，分别确认 API、自动化框架接入、代理协议与团队权限。表格中未标注支持表示本次未确认，并不等于产品明确不支持。\n\n用同一套业务检查表记录浏览器版本、套餐、环境数和测试日期。不要将编辑星级、单个检测页面的分数或供应商宣传当作账号安全保证。" }
	];
}
