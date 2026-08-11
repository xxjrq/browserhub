import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { technologies } from "@/data/resources";

export default function FingerprintPage() {
	return <div className="container py-12"><div className="mb-12"><h1 className="text-4xl font-bold tracking-tight">浏览器指纹技术</h1><p className="mt-4 max-w-3xl text-lg text-muted-foreground">理解网站如何通过渲染、硬件、软件和网络信号识别浏览器环境。</p></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{technologies.map(technology => <Card key={technology.slug}><CardHeader><CardTitle className="text-xl">{technology.name}</CardTitle><CardDescription>{technology.description}</CardDescription></CardHeader><CardContent><Link href={`/fingerprint/${technology.slug}/`} className={buttonVariants({ variant: "outline" }) + " w-full"}>查看说明 <ArrowRight className="ml-2 h-4 w-4" /></Link></CardContent></Card>)}</div></div>;
}
