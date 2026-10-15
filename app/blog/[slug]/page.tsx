import { notFound } from "next/navigation";
import { PostDetail } from "@/components/post-detail";
import { SiteShell } from "@/components/site-shell";
import { publishedPost } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await publishedPost("blog", slug);
  if (!post) notFound();
  return <SiteShell><PostDetail post={post} /></SiteShell>;
}
