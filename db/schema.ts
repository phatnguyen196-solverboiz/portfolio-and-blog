import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admins", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  email: text("email").notNull(),
  claimedAt: integer("claimed_at").notNull(),
});

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  kind: text("kind", { enum: ["project", "blog"] }).notNull(),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleVi: text("title_vi"),
  excerptEn: text("excerpt_en").notNull(),
  excerptVi: text("excerpt_vi"),
  bodyEn: text("body_en").notNull(),
  bodyVi: text("body_vi"),
  tags: text("tags").notNull().default("[]"),
  images: text("images").notNull().default("[]"),
  status: text("status", { enum: ["draft", "published"] }).notNull().default("draft"),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});
