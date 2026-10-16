"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Bi } from "./language-switch";
import type { Post } from "@/lib/types";
import { Github } from "./contact-widget";

function safeList(value: string): string[] {
  try {
    const list = JSON.parse(value);
    return Array.isArray(list) ? list.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}

function postPath(post: Pick<Post, "kind" | "slug">) {
  return `/${post.kind === "blog" ? "blog" : "projects"}/${post.slug}`;
}
import {
  Search,
  ExternalLink,
  Filter,
} from "lucide-react";

export interface CuratedProject {
  id: string;
  titleEn: string;
  titleVi: string;
  category: "all" | "fullstack" | "systems" | "frontend" | "tools";
  categoryLabelEn: string;
  categoryLabelVi: string;
  statusBadge: string;
  problemEn: string;
  problemVi: string;
  solutionEn: string;
  solutionVi: string;
  highlightEn: string;
  highlightVi: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
}

export const CURATED_PROJECTS: CuratedProject[] = [
  {
    id: "task-queue",
    titleEn: "Distributed Task Queue & Job Scheduler",
    titleVi: "Hệ thống điều phối hàng đợi tác vụ & Lập lịch phân tán",
    category: "systems",
    categoryLabelEn: "Systems & Backend",
    categoryLabelVi: "Hệ thống & Backend",
    statusBadge: "Production Ready",
    problemEn:
      "High-volume asynchronous operations often encounter dropped messages, unhandled worker crashes, and thundering herd failures during load spikes.",
    problemVi:
      "Các tác vụ bất đồng bộ khối lượng lớn thường gặp lỗi rơi tin nhắn, sự cố sập worker không kiểm soát và hiện tượng thundering herd khi lưu lượng đột biến.",
    solutionEn:
      "Constructed a resilient worker pool in Go utilizing Redis streams for durable persistence. Implemented distributed locks, priority lanes, dead-letter queues, and graceful worker shutdown.",
    solutionVi:
      "Xây dựng worker pool bền bỉ bằng Go sử dụng Redis streams để lưu trữ tin cậy. Tích hợp distributed locks, phân làn ưu tiên, hàng đợi dead-letter và tắt worker an toàn (graceful shutdown).",
    highlightEn: "12,000+ jobs/sec throughput · Sub-15ms scheduling latency · Zero data loss with Redis WAL persistence",
    highlightVi: "Xử lý hơn 12.000 tác vụ/giây · Độ trễ điều phối dưới 15ms · Đảm bảo không mất dữ liệu với Redis WAL",
    tags: ["Go", "Redis", "Docker", "gRPC", "Prometheus"],
    githubUrl: "https://github.com/phatnguyen196-solverboiz/distributed-task-queue",
    demoUrl: "https://task-queue-demo.phatnguyen.dev",
  },
  {
    id: "edge-cms",
    titleEn: "High-Performance Edge CMS & Portfolio",
    titleVi: "Nền tảng CMS & Portfolio hiệu năng cao trên Edge",
    category: "fullstack",
    categoryLabelEn: "Full-Stack & Edge",
    categoryLabelVi: "Full-Stack & Edge",
    statusBadge: "Active Showcase",
    problemEn:
      "Traditional CMS architectures suffer from heavy bundle sizes, slow cold starts on serverless providers, and flash-of-unstyled-content during client-side language switching.",
    problemVi:
      "Kiến trúc CMS truyền thống thường chịu tải bundle nặng nề, khởi động nguội chậm trên serverless và hiện tượng nháy giao diện khi chuyển ngôn ngữ ở client.",
    solutionEn:
      "Deployed Next.js 16 App Router on Cloudflare Workers edge runtime. Uses Drizzle ORM for type-safe SQLite schema access, CSS-driven bilingual toggling with zero hydration delay, and obsidian glassmorphism.",
    solutionVi:
      "Triển khai Next.js 16 App Router trên edge runtime của Cloudflare Workers. Sử dụng Drizzle ORM cho schema SQLite type-safe, chuyển ngữ song ngữ qua CSS không độ trễ hydration và giao diện obsidian glassmorphism.",
    highlightEn: "Sub-50ms global TTFB · Type-safe Drizzle ORM schema · Zero layout shift (CLS = 0.00)",
    highlightVi: "TTFB toàn cầu dưới 50ms · Schema chặt chẽ với Drizzle ORM · Kiến trúc song ngữ không giật khung hình",
    tags: ["Next.js 16", "TypeScript", "Cloudflare", "Drizzle ORM", "Tailwind CSS"],
    githubUrl: "https://github.com/phatnguyen196-solverboiz/portfolio-and-blog",
    demoUrl: "https://phatnguyen.dev",
  },
  {
    id: "collab-canvas",
    titleEn: "Real-Time Code Collaboration Canvas",
    titleVi: "Bảng vẽ & Trình soạn thảo mã nguồn cộng tác thời gian thực",
    category: "frontend",
    categoryLabelEn: "Frontend & Systems",
    categoryLabelVi: "Frontend & Hệ thống",
    statusBadge: "Open Source",
    problemEn:
      "Concurrent multi-user code editing across web browsers frequently causes race conditions, overwritten keystrokes, and disconnected cursor states.",
    problemVi:
      "Nhiều người dùng cùng chỉnh sửa mã nguồn đồng thời trên trình duyệt dễ dẫn đến tranh chấp dữ liệu (race conditions), ghi đè phím gõ và lệch con trỏ.",
    solutionEn:
      "Implemented Yjs Conflict-Free Replicated Data Types (CRDTs) over WebSockets with Monaco Editor and HTML5 Canvas. Includes real-time presence indicators, chat, and an isolated WebAssembly sandbox for client-side execution.",
    solutionVi:
      "Ứng dụng cấu trúc dữ liệu không xung đột Yjs CRDT qua WebSockets kết hợp Monaco Editor và HTML5 Canvas. Hỗ trợ hiển thị con trỏ trực tiếp, trao đổi nhóm và sandbox WebAssembly chạy mã tại trình duyệt.",
    highlightEn: "Sub-20ms peer sync latency · Memory footprint < 15MB · In-browser WebAssembly execution",
    highlightVi: "Độ trễ đồng bộ dưới 20ms · Chiếm dụng bộ nhớ dưới 15MB · Trình chạy mã nguồn WebAssembly trực tiếp",
    tags: ["React 19", "TypeScript", "WebSockets", "CRDTs", "Tailwind CSS"],
    githubUrl: "https://github.com/phatnguyen196-solverboiz/collaborative-code-canvas",
    demoUrl: "https://canvas.phatnguyen.dev",
  },
  {
    id: "asset-analyzer",
    titleEn: "Algorithmic Asset Analyzer & Portfolio Tracker",
    titleVi: "Công cụ phân tích tài sản định lượng & Mô phỏng danh mục",
    category: "tools",
    categoryLabelEn: "Tools & Analytics",
    categoryLabelVi: "Công cụ & Phân tích",
    statusBadge: "Research Tool",
    problemEn:
      "Individual investors and engineers lack fast, privacy-preserving client-side tools to simulate portfolio risk distributions, Sharpe ratios, and historical drawdowns.",
    problemVi:
      "Nhà đầu tư cá nhân thiếu công cụ nhanh gọn, bảo mật dữ liệu cục bộ để mô phỏng rủi ro danh mục, tỷ lệ Sharpe và kiểm thử suy giảm Monte Carlo.",
    solutionEn:
      "Engineered an analytical quantitative backtesting platform combining a Python/FastAPI statistical engine with an interactive React/Recharts interface. Runs Monte Carlo simulations in Web Workers without sending private holdings to remote servers.",
    solutionVi:
      "Xây dựng ứng dụng phân tích kết hợp công cụ định lượng Python/FastAPI với giao diện trực quan React/Recharts. Chạy 10.000 kịch bản Monte Carlo trên Web Worker mà không gửi dữ liệu riêng tư lên máy chủ.",
    highlightEn: "500ms multi-asset backtest latency · 10,000 Monte Carlo iterations in Web Worker · Responsive SVG charts",
    highlightVi: "Độ trễ backtest đa tài sản dưới 500ms · Chạy 10.000 kịch bản Monte Carlo trên Web Worker · Đồ thị SVG tương tác mượt mà",
    tags: ["Python", "FastAPI", "PostgreSQL", "Recharts", "Tailwind CSS"],
    githubUrl: "https://github.com/phatnguyen196-solverboiz/algorithmic-asset-analyzer",
    demoUrl: "https://analyzer.phatnguyen.dev",
  },
];

const CATEGORIES = [
  { id: "all", labelEn: "All Work", labelVi: "Tất cả dự án" },
  { id: "fullstack", labelEn: "Full-Stack & Edge", labelVi: "Full-Stack & Edge" },
  { id: "systems", labelEn: "Systems & Backend", labelVi: "Hệ thống & Backend" },
  { id: "frontend", labelEn: "Frontend & UI", labelVi: "Frontend & UI" },
  { id: "tools", labelEn: "Tools & Data", labelVi: "Công cụ & Dữ liệu" },
];

export function ProjectsExplorer({ dynamicItems = [] }: { dynamicItems?: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCurated = useMemo(() => {
    return CURATED_PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        project.titleEn.toLowerCase().includes(q) ||
        project.titleVi.toLowerCase().includes(q) ||
        project.problemEn.toLowerCase().includes(q) ||
        project.problemVi.toLowerCase().includes(q) ||
        project.solutionEn.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const filteredDynamic = useMemo(() => {
    return dynamicItems.filter((post) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const matchesSearch =
        post.titleEn.toLowerCase().includes(q) ||
        (post.titleVi && post.titleVi.toLowerCase().includes(q)) ||
        post.excerptEn.toLowerCase().includes(q) ||
        safeList(post.tags).some((t) => t.toLowerCase().includes(q));

      return matchesSearch;
    });
  }, [dynamicItems, searchQuery]);

  return (
    <div>
      {/* FILTER & SEARCH CONTROLS */}
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
        {/* Category Pills */}
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
            <Bi en="Filter:" vi="Lọc:" />
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`badge ${
                selectedCategory === cat.id ? "badge-accent" : "badge-outline"
              }`}
              style={{
                cursor: "pointer",
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: selectedCategory === cat.id ? 600 : 500,
              }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <Bi en={cat.labelEn} vi={cat.labelVi} />
            </button>
          ))}
        </div>

        {/* Search Bar */}
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
            placeholder="Search projects by keyword, tech, or problem..."
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

      {/* DYNAMIC POSTS FROM DB (IF ANY) */}
      {filteredDynamic.length > 0 && (
        <div style={{ marginBottom: 48 }}>
          <div style={{ marginBottom: 20 }}>
            <span className="eyebrow">
              <Bi en="Published Work" vi="Dự án xuất bản" />
            </span>
            <h2 className="serif" style={{ fontSize: 24, margin: "6px 0 0" }}>
              <Bi en="Recently Updated Systems" vi="Hệ thống cập nhật gần đây" />
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {filteredDynamic.map((post) => {
              const image = safeList(post.images)[0];
              const tags = safeList(post.tags);
              return (
                <div
                  key={post.id}
                  className="glow-card animate-fade-in-up"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {image && (
                      <div
                        style={{
                          borderRadius: 8,
                          overflow: "hidden",
                          marginBottom: 16,
                          maxHeight: 180,
                        }}
                      >
                        <img
                          src={`/api/media/${image}`}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}

                    <span className="eyebrow" style={{ fontSize: 10 }}>
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    <h3
                      className="serif"
                      style={{
                        fontSize: 20,
                        margin: "8px 0 10px",
                        letterSpacing: "-0.015em",
                      }}
                    >
                      <Link href={postPath(post)} style={{ color: "inherit" }}>
                        <Bi en={post.titleEn} vi={post.titleVi || post.titleEn} />
                      </Link>
                    </h3>

                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.7,
                        color: "rgba(232, 230, 227, 0.75)",
                        margin: "0 0 16px",
                      }}
                    >
                      <Bi en={post.excerptEn} vi={post.excerptVi || post.excerptEn} />
                    </p>
                  </div>

                  <div>
                    {tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                        {tags.map((t) => (
                          <span key={t} className="badge badge-sm badge-outline">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link href={postPath(post)} className="button-sm button-primary">
                      <Bi en="View Case Study" vi="Xem chi tiết" />
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CURATED FLAGSHIP SHOWCASE GRID (NEVER EMPTY) */}
      <div>
        <div style={{ marginBottom: 20 }}>
          <span className="eyebrow">
            <Bi en="Curated Flagship Showcases" vi="Dự án kỹ thuật tiêu biểu" />
          </span>
          <h2 className="serif" style={{ fontSize: 24, margin: "6px 0 0" }}>
            <Bi en="Architectural Case Studies" vi="Nghiên cứu kiến trúc & Hệ thống" />
          </h2>
        </div>

        {filteredCurated.length === 0 ? (
          <div className="empty-state">
            <span className="eyebrow">00 / 00</span>
            <h3 className="serif" style={{ fontSize: 26, margin: "12px 0 8px" }}>
              <Bi en="No matching projects found." vi="Không tìm thấy dự án phù hợp." />
            </h3>
            <p className="muted" style={{ margin: "0 auto 20px" }}>
              <Bi
                en="Try adjusting your category filter or search keywords."
                vi="Hãy thử chọn lại danh mục hoặc thay đổi từ khóa tìm kiếm."
              />
            </p>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              <Bi en="Reset Filters" vi="Đặt lại bộ lọc" />
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 28,
            }}
          >
            {filteredCurated.map((project, idx) => (
              <article
                key={project.id}
                className="glow-card animate-fade-in-up"
                style={{
                  padding: "30px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div>
                  {/* Card Header: Category & Status */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 14,
                    }}
                  >
                    <span className="badge badge-sm badge-accent">
                      <Bi en={project.categoryLabelEn} vi={project.categoryLabelVi} />
                    </span>
                    <span
                      className="badge badge-sm badge-outline"
                      style={{ fontSize: 10, color: "var(--quiet)" }}
                    >
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="serif"
                    style={{
                      fontSize: 23,
                      margin: "0 0 14px",
                      lineHeight: 1.3,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    <Bi en={project.titleEn} vi={project.titleVi} />
                  </h3>

                  {/* Problem & Architectural Solution */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 10 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--quiet)",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        <Bi en="The Challenge" vi="Thách thức kỹ thuật" />
                      </span>
                      <p
                        style={{
                          fontSize: 13,
                          lineHeight: 1.65,
                          color: "rgba(232, 230, 227, 0.72)",
                          margin: 0,
                        }}
                      >
                        <Bi en={project.problemEn} vi={project.problemVi} />
                      </p>
                    </div>

                    <div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--accent-ink)",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        <Bi en="Architecture & Design" vi="Giải pháp & Kiến trúc" />
                      </span>
                      <p
                        style={{
                          fontSize: 13,
                          lineHeight: 1.65,
                          color: "rgba(232, 230, 227, 0.88)",
                          margin: 0,
                        }}
                      >
                        <Bi en={project.solutionEn} vi={project.solutionVi} />
                      </p>
                    </div>
                  </div>

                  {/* Key Metric Highlight Box */}
                  <div
                    style={{
                      padding: "10px 14px",
                      background: "rgba(99, 102, 241, 0.06)",
                      border: "1px solid rgba(129, 140, 248, 0.2)",
                      borderRadius: 8,
                      fontSize: 11,
                      color: "var(--accent-ink)",
                      marginBottom: 20,
                      lineHeight: 1.55,
                    }}
                  >
                    <Bi en={project.highlightEn} vi={project.highlightVi} />
                  </div>
                </div>

                {/* Card Footer: Tags & Action Links */}
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge badge-sm badge-outline"
                        style={{ fontSize: 10 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Architecture View */}
                  {expandedId === project.id && (
                    <div
                      style={{
                        padding: "18px 18px",
                        background: "rgba(0, 0, 0, 0.45)",
                        border: "1px solid rgba(129, 140, 248, 0.3)",
                        borderRadius: 10,
                        marginBottom: 18,
                        display: "grid",
                        gap: 12,
                        fontSize: 13,
                        lineHeight: 1.6,
                      }}
                      className="animate-fade-in-up"
                    >
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 4 }}>
                          <Bi en="🏗️ System Architecture" vi="🏗️ Kiến trúc hệ thống" />
                        </span>
                        <p style={{ margin: 0, color: "var(--ink)" }}>
                          <Bi en={project.solutionEn} vi={project.solutionVi} />
                        </p>
                      </div>

                      <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: ".08em", display: "block", marginBottom: 4 }}>
                          <Bi en="⚡ Performance Benchmark" vi="⚡ Kiểm thử hiệu năng" />
                        </span>
                        <p style={{ margin: 0, color: "rgba(232, 230, 227, 0.85)" }}>
                          <Bi en={project.highlightEn} vi={project.highlightVi} />
                        </p>
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      borderTop: "1px solid var(--line)",
                      paddingTop: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                      className="button-sm button-primary"
                    >
                      <span>
                        <Bi
                          en={expandedId === project.id ? "Hide Architecture" : "Explore Architecture"}
                          vi={expandedId === project.id ? "Thu gọn kiến trúc" : "Xem kiến trúc chi tiết"}
                        />
                      </span>
                    </button>

                    <a
                      href={project.githubUrl || "https://github.com/phatnguyen196-solverboiz"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-sm button-secondary"
                    >
                      <Github size={13} />
                      <span>
                        <Bi en="Source Code" vi="Mã nguồn" />
                      </span>
                    </a>
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
