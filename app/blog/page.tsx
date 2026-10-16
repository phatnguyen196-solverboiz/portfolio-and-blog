import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { BlogExplorer } from "@/components/blog-explorer";
import { publishedPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const items = await publishedPosts("blog");

  return (
    <SiteShell>
      <div className="wrap">
        <header className="page-head animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="eyebrow">
            03 / 04 — <Bi en="Engineering notes & Deep-dives" vi="Ghi chép kỹ thuật & Phân tích" />
          </p>
          <h1 className="page-title">
            <Bi en="Technical Writing." vi="Chia sẻ kỹ thuật." />
          </h1>
          <p className="page-intro">
            <Bi
              en="Practical articles on building resilient software: system architecture, database optimization, edge runtimes, and engineering craft."
              vi="Bài viết thực tế về xây dựng phần mềm bền bỉ: kiến trúc hệ thống, tối ưu cơ sở dữ liệu, edge runtimes và chuẩn mực kỹ thuật."
            />
          </p>
        </header>

        <section className="page-content" aria-label="Technical writing">
          <BlogExplorer dynamicPosts={items} />
        </section>
      </div>
    </SiteShell>
  );
}
