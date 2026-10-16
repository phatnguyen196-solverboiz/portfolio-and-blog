import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { AchievementsExplorer } from "@/components/achievements-explorer";
import { publishedPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const items = await publishedPosts("achievement");

  return (
    <SiteShell>
      <div className="wrap">
        <header className="page-head animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="eyebrow">
            04 / 05 — <Bi en="Academic Milestones & Accolades" vi="Cột mốc Học thuật & Chứng nhận" />
          </p>
          <h1 className="page-title">
            <Bi en="Honors & Achievements." vi="Thành tựu & Vinh danh." />
          </h1>
          <p className="page-intro">
            <Bi
              en="Academic milestones, computational physics research progress, laboratory experimental credentials, and engineering projects at HCMUS — VNUHCM."
              vi="Các cột mốc học thuật, nghiên cứu vật lý tin học & tính toán mô phỏng, chứng nhận thực nghiệm và đề tài kỹ thuật tại HCMUS — ĐHQG TP.HCM."
            />
          </p>
        </header>

        <section className="page-content" aria-label="Achievements and Accolades">
          <AchievementsExplorer dynamicItems={items} />
        </section>
      </div>
    </SiteShell>
  );
}
