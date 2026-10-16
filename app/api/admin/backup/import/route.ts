import { getDb } from "@/db";
import { posts } from "@/db/schema";
import { adminState, sameOrigin } from "@/lib/content";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { isAdmin } = await adminState(request);
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });

  try {
    const body = await request.json();
    const items = Array.isArray(body)
      ? body
      : Array.isArray(body?.dbPosts)
        ? body.dbPosts
        : [];

    if (!items.length) {
      return Response.json({ error: "No valid post items found in backup payload." }, { status: 400 });
    }

    const db = getDb();
    let importedCount = 0;

    for (const item of items) {
      if (!item.id || !item.kind || !item.titleEn) continue;
      const now = Date.now();
      await db
        .insert(posts)
        .values({
          id: String(item.id),
          kind: item.kind,
          slug: String(item.slug || `post-${item.id}`),
          status: item.status || "published",
          titleEn: String(item.titleEn),
          titleVi: item.titleVi ? String(item.titleVi) : null,
          excerptEn: String(item.excerptEn || ""),
          excerptVi: item.excerptVi ? String(item.excerptVi) : null,
          bodyEn: String(item.bodyEn || ""),
          bodyVi: item.bodyVi ? String(item.bodyVi) : null,
          tags: typeof item.tags === "string" ? item.tags : JSON.stringify(item.tags || []),
          images: typeof item.images === "string" ? item.images : JSON.stringify(item.images || []),
          createdAt: Number(item.createdAt) || now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: posts.id,
          set: {
            titleEn: String(item.titleEn),
            titleVi: item.titleVi ? String(item.titleVi) : null,
            excerptEn: String(item.excerptEn || ""),
            excerptVi: item.excerptVi ? String(item.excerptVi) : null,
            bodyEn: String(item.bodyEn || ""),
            bodyVi: item.bodyVi ? String(item.bodyVi) : null,
            tags: typeof item.tags === "string" ? item.tags : JSON.stringify(item.tags || []),
            images: typeof item.images === "string" ? item.images : JSON.stringify(item.images || []),
            status: item.status || "published",
            updatedAt: now,
          },
        });
      importedCount++;
    }

    return Response.json({ ok: true, importedCount });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Backup import failed." },
      { status: 500 }
    );
  }
}
