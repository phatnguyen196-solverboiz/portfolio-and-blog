import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "admin_session";
const DEFAULT_MAX_AGE_SECONDS = 86400; // 24 hours
const REMEMBER_MAX_AGE_SECONDS = 2592000; // 30 days
const DEFAULT_ADMIN_PASSWORD = "phatnguyen2026!";

export interface AdminSession {
  sub: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
  nonce: string;
}

// In-memory rate limiting map for edge isolates
interface RateLimitRecord {
  attempts: number;
  blockedUntil: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

export function getClientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1"
  );
}

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) return { allowed: true };

  if (record.blockedUntil > now) {
    return {
      allowed: false,
      retryAfter: Math.ceil((record.blockedUntil - now) / 1000),
    };
  }

  if (record.blockedUntil !== 0 && record.blockedUntil <= now) {
    rateLimitMap.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { attempts: 0, blockedUntil: 0 };
  record.attempts += 1;

  if (record.attempts >= 5) {
    record.blockedUntil = now + 15 * 60 * 1000; // 15 minutes lockout
  }
  rateLimitMap.set(ip, record);
}

export function resetFailedAttempts(ip: string): void {
  rateLimitMap.delete(ip);
}

export function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function getAdminPassword(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cfEnv = (globalThis as any).env;
  const secret = cfEnv?.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  return secret || DEFAULT_ADMIN_PASSWORD;
}

export function getSessionSecret(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cfEnv = (globalThis as any).env;
  return cfEnv?.SESSION_SECRET || process.env.SESSION_SECRET || getAdminPassword();
}

async function getHmacKey(): Promise<CryptoKey> {
  const secret = getSessionSecret();
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(rememberMe = false): Promise<{ token: string; maxAge: number }> {
  const maxAge = rememberMe ? REMEMBER_MAX_AGE_SECONDS : DEFAULT_MAX_AGE_SECONDS;
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSession = {
    sub: "admin",
    name: "Nguyen Trong Phat",
    email: "phatnguyen1962005@gmail.com",
    iat: now,
    exp: now + maxAge,
    nonce: crypto.randomUUID(),
  };

  const encoder = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(encoder.encode(payloadStr));

  const key = await getHmacKey();
  const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  const sigB64 = base64UrlEncode(sigBuffer);

  return { token: `${payloadB64}.${sigB64}`, maxAge };
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payloadB64, sigB64] = parts;

    const key = await getHmacKey();
    const encoder = new TextEncoder();
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlDecode(sigB64),
      encoder.encode(payloadB64)
    );
    if (!isValid) return null;

    const payloadRaw = new TextDecoder().decode(base64UrlDecode(payloadB64));
    const payload = JSON.parse(payloadRaw) as AdminSession;

    const now = Math.floor(Date.now() / 1000);
    if (now > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}

export async function verifyMasterPassword(candidate: string): Promise<boolean> {
  const expected = getAdminPassword();
  const encoder = new TextEncoder();
  const [candidateHash, expectedHash] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);

  const candView = new Uint8Array(candidateHash);
  const expView = new Uint8Array(expectedHash);
  let diff = 0;
  for (let i = 0; i < 32; i++) {
    diff |= candView[i] ^ expView[i];
  }
  return diff === 0;
}

export async function getAdminSessionFromCookies(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function getAdminSessionFromRequest(request: Request): Promise<AdminSession | null> {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|; )\\s*${SESSION_COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  return verifySessionToken(decodeURIComponent(match[1]));
}

export async function verifyAdminSession(request?: Request): Promise<AdminSession | null> {
  if (request) {
    return getAdminSessionFromRequest(request);
  }
  return getAdminSessionFromCookies();
}

export function safeRelativeReturnPath(value: string | null | undefined): string {
  if (!value || typeof value !== "string") return "/admin";
  if (!value.startsWith("/") || value.startsWith("//")) return "/admin";

  try {
    const url = new URL(value, "https://app.local");
    if (url.origin !== "https://app.local") return "/admin";
    if (url.pathname.startsWith("/admin/login") || url.pathname.startsWith("/api/admin/logout")) {
      return "/admin";
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/admin";
  }
}

export function buildSessionCookie(token: string, maxAge: number, isSecure = true): string {
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}; ${isSecure ? "Secure;" : ""}`;
}

export function buildClearCookie(isSecure = true): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; ${isSecure ? "Secure;" : ""}`;
}
