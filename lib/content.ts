import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { admins, posts } from "@/db/schema";
import { verifyAdminSession } from "./auth";

export type { Kind, Status, Post } from "./types";
export { safeList, postPath } from "./types";
type Admin = typeof admins.$inferSelect;

export async function publishedPosts(kind: Kind) {
  try {
    return await getDb().select().from(posts)
      .where(and(eq(posts.kind, kind), eq(posts.status, "published")))
      .orderBy(desc(posts.createdAt));
  } catch (error) {
    console.warn("D1 database not available, returning empty list:", error);
    return [];
  }
}

export async function publishedPost(kind: Kind, slug: string) {
  try {
    const rows = await getDb().select().from(posts)
      .where(and(eq(posts.kind, kind), eq(posts.slug, slug), eq(posts.status, "published"))).limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.warn("D1 database not available, returning null:", error);
    return null;
  }
}

export async function adminState(request?: Request): Promise<{
  user: { userId: string; displayName: string; email: string } | null;
  owner: { id: string } | null;
  isAdmin: boolean;
}> {
  try {
    const session = await verifyAdminSession(request);
    if (!session) return { user: null, owner: null, isAdmin: false };
    return {
      user: {
        userId: session.sub,
        displayName: session.name,
        email: session.email,
      },
      owner: { id: "owner" },
      isAdmin: true,
    };
  } catch {
    return { user: null, owner: null, isAdmin: false };
  }
}


export function validatePost(input: unknown) {
  if (!input || typeof input !== "object") throw new Error("Invalid post data.");
  const data = input as Record<string, unknown>;
  const string = (key: string, max: number, required = false) => {
    const value = typeof data[key] === "string" ? data[key].trim() : "";
    if (value.length > max || (required && !value)) throw new Error(`Check ${key}.`);
    return value;
  };
  const kind = data.kind;
  const status = data.status || "published";
  if (kind !== "project" && kind !== "blog" && kind !== "achievement" && kind !== "profile") {
    throw new Error("Choose Project, Blog, Achievement, or Profile.");
  }
  if (status !== "draft" && status !== "published") throw new Error("Choose draft or published.");

  const tags = Array.isArray(data.tags) ? data.tags : [];
  const images = Array.isArray(data.images)
    ? data.images
    : typeof data.images === "string"
      ? [data.images]
      : [];

  return {
    kind: kind as Kind,
    status: status as Status,
    titleEn: string("titleEn", 250, true),
    titleVi: string("titleVi", 250) || null,
    excerptEn: string("excerptEn", 2000, false),
    excerptVi: string("excerptVi", 2000) || null,
    bodyEn: string("bodyEn", 100000, false),
    bodyVi: string("bodyVi", 100000) || null,
    tags: JSON.stringify(tags.map((x) => String(x).trim()).filter(Boolean)),
    images: typeof data.images === "object" && !Array.isArray(data.images)
      ? JSON.stringify(data.images)
      : JSON.stringify(images.map((x) => String(x).trim()).filter(Boolean)),
  };
}

export function makeSlug(title: string, id: string) {
  const base = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 54);
  return `${base || "post"}-${id.slice(0, 8)}`;
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === new URL(request.url).origin);
}
