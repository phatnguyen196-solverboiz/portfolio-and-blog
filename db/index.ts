import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (typeof env === "undefined" || !env || !env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Configure D1_DATABASE_ID or provide the D1 binding."
    );
  }

  return drizzle(env.DB, { schema });
}
