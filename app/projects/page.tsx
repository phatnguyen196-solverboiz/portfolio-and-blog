import { Bi } from "@/components/language-switch";
import { PostList } from "@/components/post-list";
import { SiteShell } from "@/components/site-shell";
import { publishedPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const items = await publishedPosts("project");
  return <SiteShell><div className="wrap">
    <header className="page-head"><p className="eyebrow">02 / 04 — <Bi en="Selected work" vi="Dự án chọn lọc" /></p><h1 className="page-title"><Bi en="Projects." vi="Dự án." /></h1><p className="page-intro"><Bi en="A considered selection of work, added when it is ready to share." vi="Những dự án được chọn lọc và đưa lên khi đã sẵn sàng chia sẻ." /></p></header>
    <section className="page-content" aria-label="Projects">
      {items.length ? <PostList items={items} /> : <div className="empty-state"><span className="eyebrow">00 / 00</span><h2><Bi en="Nothing here yet." vi="Chưa có dự án nào." /></h2><p><Bi en="Selected projects will appear here soon." vi="Các dự án chọn lọc sẽ xuất hiện ở đây sau." /></p></div>}
    </section>
  </div></SiteShell>;
}
