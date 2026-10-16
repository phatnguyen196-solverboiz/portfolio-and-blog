import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { publishedPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const items = await publishedPosts("project");

  return (
    <SiteShell>
      <div className="wrap">
        <header className="page-head animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="eyebrow">
            02 / 04 — <Bi en="Selected work & Architecture" vi="Dự án chọn lọc & Kiến trúc" />
          </p>
          <h1 className="page-title">
            <Bi en="Projects & Case Studies." vi="Dự án & Nghiên cứu." />
          </h1>
          <p className="page-intro">
            <Bi
              en="A considered selection of production systems, distributed worker pipelines, and real-time collaborative experiments."
              vi="Các hệ thống thực tế chọn lọc, kiến trúc hàng đợi xử lý phân tán và các thử nghiệm cộng tác thời gian thực."
            />
          </p>
        </header>

        <section className="page-content" aria-label="Projects">
          <ProjectsExplorer dynamicItems={items} />
        </section>
      </div>
    </SiteShell>
  );
}
