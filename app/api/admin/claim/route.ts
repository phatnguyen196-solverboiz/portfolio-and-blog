import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { admins } from "@/db/schema";
import { adminState, sameOrigin } from "@/lib/content";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ error: "Invalid origin." }, { status: 403 });
  const { user, owner } = await adminState();
  if (!user) return Response.json({ error: "Sign in first." }, { status: 401 });
  if (owner) return Response.json({ error: "The studio already has an owner." }, { status: 409 });
  // First claim happens while the hosted Site is owner-private.
  try {
    await getDb().insert(admins).values({ id: "owner", userId: user.userId, email: user.email, claimedAt: Date.now() });
  } catch {
    return Response.json({ error: "The studio was already claimed." }, { status: 409 });
  }
  const [claimed] = await getDb().select().from(admins).where(eq(admins.id, "owner")).limit(1);
  if (claimed?.userId !== user.userId) return Response.json({ error: "Claim failed." }, { status: 403 });
  return Response.json({ ok: true });
}
