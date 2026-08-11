import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="container flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
			<p className="font-mono text-6xl font-semibold tracking-tight text-border sm:text-7xl">404</p>
			<h1 className="mt-5 text-2xl font-semibold tracking-tight">页面不存在</h1>
			<p className="mt-4 max-w-md text-muted-foreground">这个资源可能还没有整理，或者链接已经失效。</p>
			<Link href="/" className={buttonVariants({ variant: "outline" }) + " mt-8"}>返回首页</Link>
		</div>
	);
}
