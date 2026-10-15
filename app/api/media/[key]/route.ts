import { env } from "cloudflare:workers";

type Context = { params: Promise<{ key: string }> };

export async function GET(_request: Request, context: Context) {
  const { key } = await context.params;
  if (!/^[a-f0-9-]+\.(png|jpg|webp|gif)$/.test(key) || !env.BUCKET) return new Response("Not found", { status: 404 });
  const file = await env.BUCKET.get(key);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(file.body, {
    headers: {
      "Content-Type": file.httpMetadata?.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
