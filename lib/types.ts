export type Kind = "project" | "blog" | "achievement" | "profile";
export type Status = "draft" | "published";

export interface Post {
  id: string;
  kind: Kind;
  slug: string;
  status: Status;
  titleEn: string;
  titleVi: string | null;
  excerptEn: string;
  excerptVi: string | null;
  bodyEn: string;
  bodyVi: string | null;
  tags: string;
  images: string;
  createdAt: number;
  updatedAt: number;
}

export function safeList(value: string): string[] {
  try {
    const list = JSON.parse(value);
    return Array.isArray(list) ? list.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function safeJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function postPath(post: Pick<Post, "kind" | "slug">) {
  return `/${post.kind === "blog" ? "blog" : "projects"}/${post.slug}`;
}
