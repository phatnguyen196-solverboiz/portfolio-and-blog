import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { admins, posts } from "@/db/schema";
import { getChatGPTUser, type ChatGPTUser } from "@/app/chatgpt-auth";

export type Kind = "project" | "blog";
export type Status = "draft" | "published";
export type Post = typeof posts.$inferSelect;
type Admin = typeof admins.$inferSelect;

export async function publishedPosts(kind: Kind) {
  return getDb().select().from(posts)
    .where(and(eq(posts.kind, kind), eq(posts.status, "published")))
    .orderBy(desc(posts.createdAt));
}

export async function publishedPost(kind: Kind, slug: string) {
  const rows = await getDb().select().from(posts)
    .where(and(eq(posts.kind, kind), eq(posts.slug, slug), eq(posts.status, "published"))).limit(1);
  return rows[0] ?? null;
}

export async function adminState(): Promise<{ user: ChatGPTUser | null; owner: Admin | null; isAdmin: boolean }> {
  const user = await getChatGPTUser();
  if (!user) return { user: null, owner: null, isAdmin: false };
  const [owner] = await getDb().select().from(admins).where(eq(admins.id, "owner")).limit(1);
  return { user, owner: owner ?? null, isAdmin: owner?.userId === user.userId };
}

export function safeList(value: string): string[] {
  try {
    const list = JSON.parse(value);
    return Array.isArray(list) ? list.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}

export function postPath(post: Pick<Post, "kind" | "slug">) {
  return `/${post.kind === "blog" ? "blog" : "projects"}/${post.slug}`;
}

export function validatePost(input: unknown) {
  if (!input || typeof input !== "object") throw new Error("Invalid post.");
  const data = input as Record<string, unknown>;
  const string = (key: string, max: number, required = false) => {
    const value = typeof data[key] === "string" ? data[key].trim() : "";
    if (value.length > max || (required && !value)) throw new Error(`Check ${key}.`);
    return value;
  };
  const kind = data.kind;
  const status = data.status;
  if (kind !== "project" && kind !== "blog") throw new Error("Choose Projects or Tech Writing.");
  if (status !== "draft" && status !== "published") throw new Error("Choose draft or published.");
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const images = Array.isArray(data.images) ? data.images : [];
  if (tags.length > 8 || tags.some(x => typeof x !== "string" || x.length > 24)) throw new Error("Use up to eight short tags.");
  if (images.length > 5 || images.some(x => typeof x !== "string" || !/^[a-f0-9-]+\.(png|jpg|webp|gif)$/.test(x))) throw new Error("Use up to five uploaded images.");
  return {
    kind: kind as Kind, status: status as Status,
    titleEn: string("titleEn", 120, true), titleVi: string("titleVi", 120) || null,
    excerptEn: string("excerptEn", 300, true), excerptVi: string("excerptVi", 300) || null,
    bodyEn: string("bodyEn", 12000, true), bodyVi: string("bodyVi", 12000) || null,
    tags: JSON.stringify(tags.map(x => x.trim()).filter(Boolean)),
    images: JSON.stringify(images),
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
