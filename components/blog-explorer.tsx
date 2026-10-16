"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Bi } from "./language-switch";
import { postPath, safeList, type Post } from "@/lib/types";
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

export const CURATED_ARTICLES: CuratedArticle[] = [];

const TOPICS = [
  { id: "all", labelEn: "All Topics", labelVi: "Tất cả chủ đề" },
  { id: "simulation", labelEn: "Computational & Simulation", labelVi: "Mô phỏng & Tính toán" },
  { id: "embedded", labelEn: "Embedded & IoT", labelVi: "Hệ thống Nhúng & IoT" },
  { id: "hardware", labelEn: "Hardware & Instrumentation", labelVi: "Phần cứng & Đo kiểm" },
];

export function BlogExplorer({ dynamicPosts = [] }: { dynamicPosts?: Post[] }) {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

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

      {/* ARTICLES FEED OR PREPARATION STATE */}
      {filteredDynamic.length === 0 && filteredCurated.length === 0 ? (
        <div
          className="glass-card glow-card animate-fade-in-up"
          style={{
            padding: "48px 36px",
            textAlign: "center",
            maxWidth: 680,
            margin: "0 auto",
            borderRadius: 16,
          }}
        >
          <span
            className="eyebrow"
            style={{
              padding: "4px 12px",
              borderRadius: 20,
              background: "rgba(99, 102, 241, 0.1)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              color: "#818cf8",
              display: "inline-block",
              marginBottom: 16,
            }}
          >
            <Bi en="03 / 05 — Technical Blog & Research" vi="03 / 05 — Blog Kỹ thuật & Nghiên cứu" />
          </span>
          <h3 className="serif" style={{ fontSize: "28px", margin: "0 0 12px", color: "var(--ink)" }}>
            <Bi
              en="Engineering Notes & Physics Write-ups in Preparation."
              vi="Ghi chép Kỹ thuật & Bài viết Vật lý Đang Chuẩn bị."
            />
          </h3>
          <p
            className="muted"
            style={{
              fontSize: "14px",
              lineHeight: 1.75,
              maxWidth: 540,
              margin: "0 auto 28px",
            }}
          >
            <Bi
              en="Personal write-ups on computational physics algorithms, numerical simulations (Python, MATLAB), and embedded instrumentation experiments are currently being drafted. You can compose and publish articles directly via the Admin Studio."
              vi="Các bài viết chia sẻ về thuật toán mô phỏng vật lý, phân tích số liệu (Python, MATLAB) và thực nghiệm mạch nhúng đang được hoàn thiện. Bạn có thể soạn và đăng bài mới trực tiếp từ trang Quản trị."
            />
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/admin" className="button button-primary">
              <Bi en="Open Admin Studio" vi="Mở Studio Soạn bài (/admin)" />
            </a>
            <a href="/about" className="button button-outline">
              <Bi en="View Background & Skills" vi="Xem Nền tảng & Kỹ năng" />
            </a>
          </div>
        </div>
      ) : (
        <div>
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

                {/* Expandable Full Article Body */}
                {expandedSlug === article.slug && (
                  <div
                    style={{
                      padding: "24px 22px",
                      background: "rgba(0, 0, 0, 0.45)",
                      border: "1px solid rgba(129, 140, 248, 0.3)",
                      borderRadius: 12,
                      marginBottom: 20,
                      fontSize: 14,
                      lineHeight: 1.8,
                    }}
                    className="animate-fade-in-up"
                  >
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>
                        <Bi en="💡 Architectural Summary & Takeaways" vi="💡 Tóm tắt kiến trúc & Bài học thực tế" />
                      </span>
                      <p style={{ margin: 0, color: "var(--ink)" }}>
                        <Bi en={article.excerptEn} vi={article.excerptVi} />
                      </p>
                    </div>

                    <div style={{ padding: "14px 16px", background: "rgba(255, 255, 255, 0.03)", borderRadius: 8, border: "1px solid var(--line)" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: ".1em", display: "block", marginBottom: 6 }}>
                        <Bi en="⚙️ Implementation & Technical Design" vi="⚙️ Thiết kế kỹ thuật & Giải pháp" />
                      </span>
                      <p style={{ margin: 0, color: "rgba(232, 230, 227, 0.85)", fontSize: 13, lineHeight: 1.65 }}>
                        <Bi
                          en="Under heavy production spikes, decoupling processing threads from connection listeners guarantees high service availability. Combining exponential backoff with dead-letter pipelines prevents cascades while ensuring strict delivery guarantees."
                          vi="Khi lưu lượng truy cập tăng vọt, việc phân tách luồng tiếp nhận kết nối và luồng xử lý tác vụ là điều kiện tiên quyết để đảm bảo uptime. Kết hợp thuật toán retry hồi quy cùng hàng đợi dead-letter giúp hệ thống tự phục hồi mà không gây tắc nghẽn dây chuyền."
                        />
                      </p>
                    </div>
                  </div>
                )}

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
                    <button
                      type="button"
                      className="post-more"
                      style={{ fontSize: 13, cursor: "pointer", background: "transparent", border: 0, padding: 0 }}
                      onClick={() => setExpandedSlug(expandedSlug === article.slug ? null : article.slug)}
                    >
                      <Bi
                        en={expandedSlug === article.slug ? "Close Deep-Dive" : "Read Full Deep-Dive"}
                        vi={expandedSlug === article.slug ? "Thu gọn bài viết" : "Đọc toàn bộ bài phân tích"}
                      />
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
