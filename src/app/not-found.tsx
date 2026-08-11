import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() { return <div className="container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center"><p className="text-sm text-muted-foreground">404</p><h1 className="mt-3 text-4xl font-bold">页面不存在</h1><p className="mt-4 max-w-md text-muted-foreground">这个资源可能还没有整理，或者链接已经失效。</p><Link href="/" className={buttonVariants({ variant: "outline" }) + " mt-8"}>返回首页</Link></div>; }
