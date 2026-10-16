import { eq } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { adminState, safeList, sameOrigin, validatePost } from "@/lib/content";

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Context) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { isAdmin } = await adminState(request);
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });

  try {
    const { id } = await context.params;
    const [existing] = await getDb().select().from(posts).where(eq(posts.id, id)).limit(1);
    if (!existing) return Response.json({ error: "Post not found." }, { status: 404 });
    const data = validatePost(await request.json());
    await getDb().update(posts).set({ ...data, updatedAt: Date.now() }).where(eq(posts.id, id));
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not update post." }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: Context) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { isAdmin } = await adminState(request);
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });

  try {
    const { id } = await context.params;
    const [existing] = await getDb().select().from(posts).where(eq(posts.id, id)).limit(1);
    if (!existing) return Response.json({ error: "Post not found." }, { status: 404 });
    await getDb().delete(posts).where(eq(posts.id, id));
    if (typeof env !== "undefined" && env && env.BUCKET) {
      await Promise.all(safeList(existing.images).map((key) => env.BUCKET!.delete(key)));
    }
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Could not delete post." }, { status: 400 });
  }
}
