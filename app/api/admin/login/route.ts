import {
  checkRateLimit,
  recordFailedAttempt,
  resetFailedAttempts,
  getClientIp,
  verifyMasterPassword,
  createSessionToken,
  buildSessionCookie,
  safeRelativeReturnPath,
} from "@/lib/auth";
import { sameOrigin } from "@/lib/content";

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "Invalid origin." }, { status: 403 });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return Response.json(
      { error: `Too many failed attempts. Please try again in ${rateLimit.retryAfter} seconds.` },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }

  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";
    const rememberMe = Boolean(body.rememberMe);
    const returnTo = safeRelativeReturnPath(body.returnTo);

    const isValid = await verifyMasterPassword(password);
    if (!isValid) {
      await new Promise((r) => setTimeout(r, 1000));
      recordFailedAttempt(ip);
      return Response.json({ error: "Invalid master password." }, { status: 401 });
    }

    resetFailedAttempts(ip);

    const isSecure = new URL(request.url).protocol === "https:";
    const { token, maxAge } = await createSessionToken(rememberMe);

    const response = Response.json({ ok: true, redirect: returnTo });
    response.headers.set("Set-Cookie", buildSessionCookie(token, maxAge, isSecure));
    return response;
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Authentication error." },
      { status: 500 }
    );
  }
}
