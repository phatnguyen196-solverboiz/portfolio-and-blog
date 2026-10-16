"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Bi } from "./language-switch";
import { postPath, safeList, type Post } from "@/lib/content";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  Filter,
} from "lucide-react";

export interface CuratedArticle {
  slug: string;
  titleEn: string;
  titleVi: string;
  topic: "architecture" | "frontend" | "databases" | "all";
  topicLabelEn: string;
  topicLabelVi: string;
  date: string;
  readTimeMin: number;
  readTimeEn: string;
  readTimeVi: string;
  excerptEn: string;
  excerptVi: string;
  tags: string[];
  contentEn?: string;
  contentVi?: string;
}

export const CURATED_ARTICLES: CuratedArticle[] = [
  {
    slug: "designing-high-throughput-background-job-workers",
    titleEn: "Designing High-Throughput Background Job Workers in Distributed Systems",
    titleVi: "Thiết kế hệ thống xử lý tác vụ nền thông lượng cao trong hệ thống phân tán",
    topic: "architecture",
    topicLabelEn: "Architecture & Systems",
    topicLabelVi: "Kiến trúc & Hệ thống",
    date: "2026-03-12",
    readTimeMin: 7,
    readTimeEn: "7 min read",
    readTimeVi: "7 phút đọc",
    excerptEn:
      "An architectural analysis of concurrency patterns, Redis streams persistence, dead-letter queues, and graceful shutdown semantics under high-volume load spikes.",
    excerptVi:
      "Phân tích kiến trúc chuyên sâu về mô hình worker pool đa luồng, lưu trữ Redis streams, hàng đợi dead-letter và cơ chế tắt máy an toàn khi tải tăng đột biến.",
    tags: ["Distributed Systems", "Go", "Redis", "Concurrency", "Reliability"],
  },
  {
    slug: "zero-latency-edge-rendering-nextjs-cloudflare",
    titleEn: "Zero-Latency Edge Rendering: Next.js with Cloudflare Workers Architecture",
    titleVi: "Kết xuất tại Edge không độ trễ: Kiến trúc Next.js cùng Cloudflare Workers",
    topic: "frontend",
    topicLabelEn: "Edge & Next.js",
    topicLabelVi: "Edge & Next.js",
    date: "2026-02-18",
    readTimeMin: 5,
    readTimeEn: "5 min read",
    readTimeVi: "5 phút đọc",
    excerptEn:
      "How to eliminate cold starts and client hydration flickers while deploying modern Next.js 16 App Router applications across globally distributed edge worker runtimes.",
    excerptVi:
      "Phương pháp triệt tiêu hiện tượng khởi động nguội và giật giao diện khi triển khai Next.js 16 App Router trên các trung tâm dữ liệu phân tán toàn cầu của Cloudflare.",
    tags: ["Next.js 16", "Cloudflare", "Edge Computing", "TypeScript", "Performance"],
  },
  {
    slug: "type-safe-database-modeling-drizzle-postgresql",
    titleEn: "Type-Safe Database Modeling with Drizzle ORM and PostgreSQL",
    titleVi: "Mô hình hóa cơ sở dữ liệu Type-Safe với Drizzle ORM và PostgreSQL",
    topic: "databases",
    topicLabelEn: "Databases & Performance",
    topicLabelVi: "Cơ sở dữ liệu & Hiệu năng",
    date: "2026-01-08",
    readTimeMin: 9,
    readTimeEn: "9 min read",
    readTimeVi: "9 phút đọc",
    excerptEn:
      "Practical lessons in architecting relational schemas, zero-downtime schema migrations, composite index tuning, and analyzing EXPLAIN ANALYZE execution trees.",
    excerptVi:
      "Kinh nghiệm thực tiễn thiết kế schema quan hệ, di chuyển dữ liệu không gián đoạn, tối ưu chỉ mục phức hợp và phân tích cây thực thi EXPLAIN ANALYZE.",
    tags: ["PostgreSQL", "Drizzle ORM", "SQL Tuning", "TypeScript", "Indexing"],
  },
];

const TOPICS = [
  { id: "all", labelEn: "All Topics", labelVi: "Tất cả chủ đề" },
  { id: "architecture", labelEn: "Systems & Architecture", labelVi: "Hệ thống & Kiến trúc" },
  { id: "frontend", labelEn: "Edge & Frontend", labelVi: "Edge & Giao diện" },
  { id: "databases", labelEn: "Databases & SQL", labelVi: "Cơ sở dữ liệu & SQL" },
];

export function BlogExplorer({ dynamicPosts = [] }: { dynamicPosts?: Post[] }) {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCurated = useMemo(() => {
    return CURATED_ARTICLES.filter((article) => {
      const matchesTopic =
        selectedTopic === "all" || article.topic === selectedTopic;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTopic;

      const matchesSearch =
        article.titleEn.toLowerCase().includes(q) ||
        article.titleVi.toLowerCase().includes(q) ||
        article.excerptEn.toLowerCase().includes(q) ||
        article.excerptVi.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      return matchesTopic && matchesSearch;
    });
  }, [selectedTopic, searchQuery]);

  const filteredDynamic = useMemo(() => {
    return dynamicPosts.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const matchesSearch =
        post.titleEn.toLowerCase().includes(q) ||
        (post.titleVi && post.titleVi.toLowerCase().includes(q)) ||
        post.excerptEn.toLowerCase().includes(q) ||
        (post.excerptVi && post.excerptVi.toLowerCase().includes(q)) ||
        safeList(post.tags).some((t) => t.toLowerCase().includes(q));

      return matchesSearch;
    });
  }, [dynamicPosts, searchQuery]);

  return (
    <div>
      {/* FILTER & SEARCH BAR */}
      <div
        className="glass-card"
        style={{
          padding: "20px 24px",
          marginBottom: 36,
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Topic Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span
            className="muted"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              marginRight: 4,
            }}
          >
            <Filter size={13} />
            <Bi en="Topic:" vi="Chủ đề:" />
          </span>
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              className={`badge ${
                selectedTopic === topic.id ? "badge-accent" : "badge-outline"
              }`}
              style={{
                cursor: "pointer",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: selectedTopic === topic.id ? 600 : 500,
              }}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <Bi en={topic.labelEn} vi={topic.labelVi} />
            </button>
          ))}
        </div>

        {/* Search input */}
        <div
          style={{
            position: "relative",
            minWidth: 260,
            flex: "1 1 240px",
            maxWidth: 360,
          }}
        >
          <Search
            size={15}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--quiet)",
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tag, or topic..."
            style={{
              width: "100%",
              padding: "8px 12px 8px 36px",
              borderRadius: 8,
              border: "1px solid var(--line)",
              background: "rgba(0, 0, 0, 0.3)",
              color: "var(--ink)",
              fontSize: 13,
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: 0,
                color: "var(--quiet)",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* DYNAMIC POSTS STREAM (IF ANY EXIST IN DB) */}
      {filteredDynamic.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <div style={{ marginBottom: 20 }}>
            <span className="eyebrow">
              <Bi en="Published Articles" vi="Bài viết đã xuất bản" />
            </span>
            <h2 className="serif" style={{ fontSize: 24, margin: "6px 0 0" }}>
              <Bi en="Recent Writing Feed" vi="Danh sách bài viết mới" />
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {filteredDynamic.map((post) => {
              const tags = safeList(post.tags);
              const wordCount = (post.bodyEn || "").split(/\s+/).length;
              const estReadMin = Math.max(1, Math.ceil(wordCount / 200));

              return (
                <article
                  key={post.id}
                  className="glass-card animate-fade-in-up"
                  style={{ padding: "26px 28px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                      flexWrap: "wrap",
                      fontSize: 12,
                      color: "var(--quiet)",
                    }}
                  >
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="badge badge-sm badge-outline">
                      {estReadMin} <Bi en="min read" vi="phút đọc" />
                    </span>
                  </div>

                  <h3
                    className="serif"
                    style={{
                      fontSize: 24,
                      margin: "0 0 10px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    <Link href={postPath(post)} style={{ color: "inherit" }}>
                      <Bi en={post.titleEn} vi={post.titleVi || post.titleEn} />
                    </Link>
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: "rgba(232, 230, 227, 0.8)",
                      margin: "0 0 18px",
                      maxWidth: 780,
                    }}
                  >
                    <Bi en={post.excerptEn} vi={post.excerptVi || post.excerptEn} />
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {tags.map((t) => (
                        <span key={t} className="badge badge-sm badge-outline">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={postPath(post)}
                      className="post-more"
                      style={{ fontSize: 13 }}
                    >
                      <Bi en="Read complete article" vi="Đọc toàn bộ bài viết" />
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* CURATED TECHNICAL DEEP-DIVES (NEVER EMPTY) */}
      <div>
        <div style={{ marginBottom: 22 }}>
          <span className="eyebrow">
            <Bi en="Engineering Notes & Architecture" vi="Ghi chép kỹ thuật & Kiến trúc" />
          </span>
          <h2 className="serif" style={{ fontSize: 24, margin: "6px 0 0" }}>
            <Bi en="Flagship Technical Deep-Dives" vi="Các bài viết kỹ thuật tiêu biểu" />
          </h2>
        </div>

        {filteredCurated.length === 0 ? (
          <div className="empty-state">
            <span className="eyebrow">00 / 00</span>
            <h3 className="serif" style={{ fontSize: 26, margin: "12px 0 8px" }}>
              <Bi en="No articles match your query." vi="Không tìm thấy bài viết phù hợp." />
            </h3>
            <p className="muted" style={{ margin: "0 auto 20px" }}>
              <Bi
                en="Try selecting a different topic or resetting your search input."
                vi="Hãy thử chọn chủ đề khác hoặc xóa từ khóa tìm kiếm."
              />
            </p>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setSelectedTopic("all");
                setSearchQuery("");
              }}
            >
              <Bi en="Reset Filters" vi="Đặt lại bộ lọc" />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {filteredCurated.map((article, idx) => (
              <article
                key={article.slug}
                className="glow-card animate-fade-in-up"
                style={{
                  padding: "32px 30px",
                  display: "flex",
                  flexDirection: "column",
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                {/* Meta row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                    flexWrap: "wrap",
                    fontSize: 12,
                    color: "var(--quiet)",
                  }}
                >
                  <span className="badge badge-sm badge-accent">
                    <Bi en={article.topicLabelEn} vi={article.topicLabelVi} />
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Calendar size={12} />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Clock size={12} />
                    <Bi en={article.readTimeEn} vi={article.readTimeVi} />
                  </span>
                </div>

                {/* Article Title */}
                <h3
                  className="serif"
                  style={{
                    fontSize: "clamp(22px, 3vw, 28px)",
                    margin: "0 0 12px",
                    lineHeight: 1.35,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  <Bi en={article.titleEn} vi={article.titleVi} />
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: "rgba(232, 230, 227, 0.8)",
                    margin: "0 0 22px",
                    maxWidth: 820,
                  }}
                >
                  <Bi en={article.excerptEn} vi={article.excerptVi} />
                </p>

                {/* Tags and CTA */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 14,
                    borderTop: "1px solid var(--line)",
                    paddingTop: 18,
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {article.tags.map((t) => (
                      <span key={t} className="badge badge-sm badge-outline">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span
                      className="post-more"
                      style={{ fontSize: 13, cursor: "pointer" }}
                      onClick={() => {
                        // Smoothly scroll or notify
                        const el = document.getElementById(article.slug);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <Bi en="Architecture Brief" vi="Tóm tắt kiến trúc" />
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
