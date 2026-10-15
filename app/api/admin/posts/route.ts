import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { adminState, makeSlug, sameOrigin, validatePost } from "@/lib/content";

export async function GET() {
  const { isAdmin } = await adminState();
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });
  const items = await getDb().select().from(posts).orderBy(desc(posts.updatedAt));
  return Response.json({ posts: items }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { isAdmin } = await adminState();
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });
  try {
    const data = validatePost(await request.json());
    const id = crypto.randomUUID();
    const now = Date.now();
    await getDb().insert(posts).values({ id, slug: makeSlug(data.titleEn, id), ...data, createdAt: now, updatedAt: now });
    return Response.json({ id }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not save post." }, { status: 400 });
  }
}
