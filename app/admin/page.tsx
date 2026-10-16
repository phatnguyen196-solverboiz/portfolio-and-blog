import { redirect } from "next/navigation";
import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { Studio } from "@/components/studio";
import { adminState } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { isAdmin } = await adminState();
  if (!isAdmin) {
    redirect("/admin/login?return_to=/admin");
  }

  return (
    <SiteShell>
      <div className="wrap">
        <header className="page-head animate-fade-in-up">
          <p className="eyebrow">
            <Bi en="Admin Studio — Workspace" vi="Studio Quản trị — Bảng điều khiển" />
          </p>
          <h1 className="page-title">
            <Bi en="Content Studio." vi="Quản trị Nội dung." />
          </h1>
          <p className="page-intro">
            <Bi
              en="Manage your projects, technical blog articles, achievements, and portfolio profile in real-time."
              vi="Quản lý dự án, bài viết kỹ thuật, thành tựu và hồ sơ năng lực trực tiếp theo thời gian thực."
            />
          </p>
        </header>
        <section className="page-content" aria-label="Admin Studio">
          <Studio mode="editor" />
        </section>
      </div>
    </SiteShell>
  );
}
