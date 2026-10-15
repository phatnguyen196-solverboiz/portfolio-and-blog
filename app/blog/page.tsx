import { Bi } from "@/components/language-switch";
import { PostList } from "@/components/post-list";
import { SiteShell } from "@/components/site-shell";
import { publishedPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const items = await publishedPosts("blog");
  return <SiteShell><div className="wrap">
    <header className="page-head"><p className="eyebrow">03 / 04 — <Bi en="Engineering notes" vi="Ghi chép kỹ thuật" /></p><h1 className="page-title"><Bi en="Technical Writing." vi="Chia sẻ kỹ thuật." /></h1><p className="page-intro"><Bi en="Practical posts about building software: design choices, implementation details, and lessons worth keeping." vi="Bài viết thực tế về xây dựng phần mềm: lựa chọn thiết kế, chi tiết triển khai và kiến thức đáng lưu lại." /></p></header>
    <section className="page-content" aria-label="Technical writing">
      {items.length ? <PostList items={items} /> : <div className="empty-state"><span className="eyebrow">00 / 00</span><h2><Bi en="Notes are on the way." vi="Bài viết sẽ sớm xuất hiện." /></h2><p><Bi en="This space is reserved for technical explanations and useful references." vi="Không gian này dành cho giải thích kỹ thuật và tài liệu tham khảo hữu ích." /></p></div>}
    </section>
  </div></SiteShell>;
}
