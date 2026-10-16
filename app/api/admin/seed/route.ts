import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { adminState, sameOrigin } from "@/lib/content";
import { CURATED_PROJECTS } from "@/components/projects-explorer";
import { CURATED_ARTICLES } from "@/components/blog-explorer";
import { curatedAchievements } from "@/components/achievements-explorer";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { isAdmin } = await adminState(request);
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });

  try {
    const db = getDb();
    let seededCount = 0;
    const now = Date.now();

    // 1. Seed Projects
    for (const p of CURATED_PROJECTS) {
      await db
        .insert(posts)
        .values({
          id: `proj-${p.id}`,
          kind: "project",
          slug: p.id,
          status: "published",
          titleEn: p.titleEn,
          titleVi: p.titleVi,
          excerptEn: p.problemEn,
          excerptVi: p.problemVi,
          bodyEn: p.solutionEn,
          bodyVi: p.solutionVi,
          tags: JSON.stringify(p.tags),
          images: JSON.stringify({
            category: p.category,
            categoryLabelEn: p.categoryLabelEn,
            categoryLabelVi: p.categoryLabelVi,
            statusBadge: p.statusBadge,
            highlightEn: p.highlightEn,
            highlightVi: p.highlightVi,
            githubUrl: p.githubUrl,
            demoUrl: p.demoUrl,
          }),
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoNothing();
      seededCount++;
    }

    // 2. Seed Articles
    for (const a of CURATED_ARTICLES) {
      await db
        .insert(posts)
        .values({
          id: `art-${a.slug}`,
          kind: "blog",
          slug: a.slug,
          status: "published",
          titleEn: a.titleEn,
          titleVi: a.titleVi,
          excerptEn: a.excerptEn,
          excerptVi: a.excerptVi,
          bodyEn: `## Architecture & Overview\n\n${a.excerptEn}\n\n### Key Technical Takeaways\n\n- Low latency edge isolation\n- Resilient fallback pipelines\n- Type-safe schema validation`,
          bodyVi: `## Tổng quan Kiến trúc\n\n${a.excerptVi}\n\n### Bài học Kỹ thuật Trọng tâm\n\n- Tối ưu hóa phân tán tại Edge\n- Dự phòng dữ liệu an toàn\n- Kiểm tra tính đúng đắn của dữ liệu`,
          tags: JSON.stringify(a.tags),
          images: JSON.stringify({
            topic: a.topic,
            topicLabelEn: a.topicLabelEn,
            topicLabelVi: a.topicLabelVi,
            readTimeMin: a.readTimeMin,
            date: a.date,
          }),
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoNothing();
      seededCount++;
    }

    // 3. Seed Achievements
    for (const ach of curatedAchievements) {
      await db
        .insert(posts)
        .values({
          id: `ach-${ach.id}`,
          kind: "achievement",
          slug: ach.id,
          status: "published",
          titleEn: ach.titleEn,
          titleVi: ach.titleVi,
          excerptEn: ach.highlightMetric || ach.badgeEn,
          excerptVi: ach.badgeVi,
          bodyEn: ach.descriptionEn,
          bodyVi: ach.descriptionVi,
          tags: JSON.stringify(ach.technologies),
          images: JSON.stringify({
            category: ach.category,
            categoryLabelEn: ach.categoryLabelEn,
            categoryLabelVi: ach.categoryLabelVi,
            organization: ach.organization,
            year: ach.year,
            badgeEn: ach.badgeEn,
            badgeVi: ach.badgeVi,
            highlightMetric: ach.highlightMetric,
            keyPointsEn: ach.keyPointsEn,
            keyPointsVi: ach.keyPointsVi,
            credentialUrl: ach.credentialUrl,
          }),
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoNothing();
      seededCount++;
    }

    return Response.json({ ok: true, seededCount });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Seeding failed. D1 database might not be bound." },
      { status: 500 }
    );
  }
}
