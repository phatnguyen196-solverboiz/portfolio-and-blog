import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { AchievementsExplorer } from "@/components/achievements-explorer";

export const dynamic = "force-dynamic";

export default function AchievementsPage() {
  return (
    <SiteShell>
      <div className="wrap">
        <header className="page-head animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="eyebrow">
            04 / 05 — <Bi en="Key Milestones & Accolades" vi="Cột mốc & Giải thưởng" />
          </p>
          <h1 className="page-title">
            <Bi en="Honors & Achievements." vi="Thành tựu & Vinh danh." />
          </h1>
          <p className="page-intro">
            <Bi
              en="A record of competitive hackathon victories, cloud architecture certifications, production scaling milestones, and leadership in developer communities."
              vi="Hồ sơ giải thưởng hackathon, chứng chỉ kiến trúc đám mây quốc tế, cột mốc quy mô hệ thống và hoạt động cố vấn cộng đồng lập trình."
            />
          </p>
        </header>

        <section className="page-content" aria-label="Achievements and Accolades">
          <AchievementsExplorer />
        </section>
      </div>
    </SiteShell>
  );
}
