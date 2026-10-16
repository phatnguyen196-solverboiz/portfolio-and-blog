import { env } from "cloudflare:workers";
import { adminState, sameOrigin } from "@/lib/content";

const formats: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { isAdmin } = await adminState(request);
  if (!isAdmin) return Response.json({ error: "Forbidden." }, { status: 403 });

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !formats[file.type] || file.size > 8_000_000 || file.size < 1) {
    return Response.json({ error: "Choose a JPG, PNG, WebP, GIF, or SVG image under 8 MB." }, { status: 400 });
  }

  // 1. If R2 bucket is bound, use R2
  if (typeof env !== "undefined" && env && env.BUCKET) {
    try {
      const key = `${crypto.randomUUID()}.${formats[file.type]}`;
      await env.BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
      return Response.json({ key, url: `/api/media/${key}` }, { status: 201 });
    } catch (err) {
      console.warn("R2 upload failed, falling back to data URL:", err);
    }
  }

  // 2. Free-tier fallback: Convert to Data URI (under 2MB for high performance)
  if (file.size > 2_500_000) {
    return Response.json(
      { error: "Without R2 storage, uploaded images must be under 2.5 MB. For larger images, please use an external Image URL." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  const dataUrl = `data:${file.type};base64,${base64}`;

  return Response.json({ key: dataUrl, url: dataUrl }, { status: 201 });
}
