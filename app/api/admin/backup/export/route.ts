import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { adminState } from "@/lib/content";
import { CURATED_PROJECTS } from "@/components/projects-explorer";
import { CURATED_ARTICLES } from "@/components/blog-explorer";
import { curatedAchievements } from "@/components/achievements-explorer";

export async function GET(request: Request) {
  const { isAdmin } = await adminState(request);
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });

  let dbPosts: unknown[] = [];
  try {
    dbPosts = await getDb().select().from(posts).orderBy(desc(posts.updatedAt));
  } catch (error) {
    console.warn("D1 not available for backup export, using curated fallbacks:", error);
  }

  const backup = {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    dbPosts,
    curatedDefaults: {
      projects: CURATED_PROJECTS,
      articles: CURATED_ARTICLES,
      achievements: curatedAchievements,
    },
  };

  const filename = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;

  return new Response(JSON.stringify(backup, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
