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

export const CURATED_PROJECTS: CuratedProject[] = [];

const CATEGORIES = [
  { id: "all", labelEn: "All Work", labelVi: "Tất cả dự án" },
  { id: "systems", labelEn: "Computational & Simulation", labelVi: "Mô phỏng & Tính toán" },
  { id: "fullstack", labelEn: "Embedded & IoT", labelVi: "Nhúng & IoT" },
  { id: "frontend", labelEn: "Hardware & CAD", labelVi: "Phần cứng & CAD" },
  { id: "tools", labelEn: "Tools & Software", labelVi: "Công cụ & Phần mềm" },
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

      {/* PROJECTS SHOWCASE OR PREPARATION STATE */}
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
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#34d399",
              display: "inline-block",
              marginBottom: 16,
            }}
          >
            <Bi en="02 / 05 — Research & Engineering" vi="02 / 05 — Nghiên cứu & Kỹ thuật" />
          </span>
          <h3 className="serif" style={{ fontSize: "28px", margin: "0 0 12px", color: "var(--ink)" }}>
            <Bi
              en="Projects & Case Studies in Preparation."
              vi="Dự án & Đề tài Nghiên cứu Đang Chuẩn bị."
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
              en="Numerical simulation models (Python, MATLAB), circuit schematics (KiCad), 3D designs (FreeCAD), and embedded microcontroller/IoT experiments are currently being compiled. You can manage and publish projects anytime via the Admin Studio."
              vi="Các mô hình mô phỏng số (Python, MATLAB), thiết kế mạch in (KiCad), mô hình 3D (FreeCAD) và thực nghiệm vi điều khiển / IoT đang được chuẩn bị để đăng tải. Bạn có thể tự thêm hoặc chỉnh sửa dự án qua trang Quản trị."
            />
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <a href="/admin" className="button button-primary">
              <Bi en="Open Admin Studio" vi="Mở Trang Quản trị (/admin)" />
            </a>
            <a href="/about" className="button button-outline">
              <Bi en="View Background & Skills" vi="Xem Nền tảng & Kỹ năng" />
            </a>
          </div>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
}
