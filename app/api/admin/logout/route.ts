import { buildClearCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const isSecure = new URL(request.url).protocol === "https:";
  const response = Response.json({ ok: true });
  response.headers.set("Set-Cookie", buildClearCookie(isSecure));
  return response;
}

export async function GET(request: Request) {
  const isSecure = new URL(request.url).protocol === "https:";
  const response = new Response(null, {
    status: 302,
    headers: { Location: "/admin/login" },
  });
  response.headers.set("Set-Cookie", buildClearCookie(isSecure));
  return response;
}
