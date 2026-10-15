import { env } from "cloudflare:workers";
import { adminState, sameOrigin } from "@/lib/content";

const formats: Record<string, string> = {
  "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif",
};

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { isAdmin } = await adminState();
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });
  if (!env.BUCKET) return Response.json({ error: "Image storage is unavailable." }, { status: 503 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !formats[file.type] || file.size > 8_000_000 || file.size < 1) {
    return Response.json({ error: "Choose a JPG, PNG, WebP, or GIF image under 8 MB." }, { status: 400 });
  }
  const key = `${crypto.randomUUID()}.${formats[file.type]}`;
  await env.BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return Response.json({ key, url: `/api/media/${key}` }, { status: 201 });
}
