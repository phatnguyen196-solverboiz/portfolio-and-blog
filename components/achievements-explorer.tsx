"use client";

import { useState, useMemo } from "react";
import { Bi } from "./language-switch";
import { type Post, safeList, safeJson } from "@/lib/types";
import {
  Trophy,
  ShieldCheck,
  Flame,
  GraduationCap,
  Search,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export type AchievementCategory = "all" | "awards" | "certifications" | "milestones" | "academic";

export interface AchievementItem {
  id: string;
  category: AchievementCategory;
  categoryLabelEn: string;
  categoryLabelVi: string;
  titleEn: string;
  titleVi: string;
  organization: string;
  year: string;
  badgeEn: string;
  badgeVi: string;
  highlightMetric?: string;
  descriptionEn: string;
  descriptionVi: string;
  keyPointsEn: string[];
  keyPointsVi: string[];
  technologies: string[];
  credentialUrl?: string;
}

/**
 * Curated achievements initialized empty per user request.
 * Real academic achievements, simulation lab milestones, and credentials
 * can be added dynamically anytime via the Admin Studio (/admin).
 */
export const curatedAchievements: AchievementItem[] = [];

export function AchievementsExplorer({ dynamicItems = [] }: { dynamicItems?: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sourceAchievements = useMemo<AchievementItem[]>(() => {
    if (!dynamicItems || dynamicItems.length === 0) {
      return curatedAchievements;
    }

    const mapped = dynamicItems.map((post) => {
      const extra = safeJson<Record<string, unknown>>(post.images, {});
      return {
        id: post.slug || post.id,
        category: (extra.category as AchievementCategory) || "academic",
        categoryLabelEn: String(extra.categoryLabelEn || "Academic Milestones"),
        categoryLabelVi: String(extra.categoryLabelVi || "Cột mốc Học thuật"),
        titleEn: post.titleEn,
        titleVi: post.titleVi || post.titleEn,
        organization: String(extra.organization || "HCMUS"),
        year: String(extra.year || "2024"),
        badgeEn: String(extra.badgeEn || post.excerptEn || "Milestone"),
        badgeVi: String(extra.badgeVi || post.excerptVi || extra.badgeEn || "Cột mốc"),
        highlightMetric: String(extra.highlightMetric || post.excerptEn || ""),
        descriptionEn: post.bodyEn || post.excerptEn || "",
        descriptionVi: post.bodyVi || post.excerptVi || post.bodyEn || "",
        keyPointsEn: Array.isArray(extra.keyPointsEn) ? (extra.keyPointsEn as string[]) : [],
        keyPointsVi: Array.isArray(extra.keyPointsVi) ? (extra.keyPointsVi as string[]) : [],
        technologies: safeList(post.tags),
        credentialUrl: extra.credentialUrl ? String(extra.credentialUrl) : undefined,
      };
    });

    return mapped.length > 0 ? mapped : curatedAchievements;
  }, [dynamicItems]);

  const stats = useMemo(() => {
    const awards = sourceAchievements.filter((a) => a.category === "awards").length;
    const certifications = sourceAchievements.filter((a) => a.category === "certifications").length;
    const milestones = sourceAchievements.filter((a) => a.category === "milestones").length;
    const academic = sourceAchievements.filter((a) => a.category === "academic").length;
    return { awards, certifications, milestones, academic };
  }, [sourceAchievements]);

  const filteredItems = useMemo(() => {
    return sourceAchievements.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.titleEn.toLowerCase().includes(q) || item.titleVi.toLowerCase().includes(q);
      const matchOrg = item.organization.toLowerCase().includes(q);
      const matchTech = item.technologies.some((t) => t.toLowerCase().includes(q));
      const matchDesc = item.descriptionEn.toLowerCase().includes(q) || item.descriptionVi.toLowerCase().includes(q);

      return matchTitle || matchOrg || matchTech || matchDesc;
    });
  }, [sourceAchievements, selectedCategory, searchQuery]);

  return (
    <div className="achievements-explorer">
      {/* Dynamic Stat Counters if items exist */}
      {sourceAchievements.length > 0 && (
        <div
          className="stats-grid animate-fade-in-up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 36,
          }}
        >
          <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
                <Bi en="Awards & Contests" vi="Giải thưởng & Thi đấu" />
              </span>
              <Trophy size={18} style={{ color: "#f59e0b" }} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>{stats.awards}</div>
          </div>

          <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
                <Bi en="Certifications" vi="Chứng chỉ chuyên môn" />
              </span>
              <ShieldCheck size={18} style={{ color: "#818cf8" }} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>{stats.certifications}</div>
          </div>

          <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
                <Bi en="Milestones" vi="Cột mốc kỹ thuật" />
              </span>
              <Flame size={18} style={{ color: "#10b981" }} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>{stats.milestones}</div>
          </div>

          <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
                <Bi en="Academic" vi="Học thuật" />
              </span>
              <GraduationCap size={18} style={{ color: "#a78bfa" }} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>{stats.academic}</div>
          </div>
        </div>
      )}

      {/* Control Bar: Category Filters & Search */}
      <div
        className="control-bar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button
            type="button"
            className={selectedCategory === "all" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("all")}
          >
            <Bi en="All Achievements" vi="Tất cả thành tựu" />
          </button>
          <button
            type="button"
            className={selectedCategory === "academic" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("academic")}
          >
            <GraduationCap size={13} style={{ marginRight: 5 }} />
            <Bi en="Academic & Research" vi="Học thuật & Nghiên cứu" />
          </button>
          <button
            type="button"
            className={selectedCategory === "milestones" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("milestones")}
          >
            <Flame size={13} style={{ marginRight: 5 }} />
            <Bi en="Lab & Engineering" vi="Thực nghiệm & Kỹ thuật" />
          </button>
          <button
            type="button"
            className={selectedCategory === "certifications" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("certifications")}
          >
            <ShieldCheck size={13} style={{ marginRight: 5 }} />
            <Bi en="Certifications" vi="Chứng chỉ chuyên môn" />
          </button>
          <button
            type="button"
            className={selectedCategory === "awards" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("awards")}
          >
            <Trophy size={13} style={{ marginRight: 5 }} />
            <Bi en="Awards & Contests" vi="Giải thưởng & Thi đấu" />
          </button>
        </div>

        {/* Search input */}
        <div style={{ position: "relative", minWidth: 240, flex: "1 1 200px", maxWidth: 360 }}>
          <Search
            size={15}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--quiet)", pointerEvents: "none" }}
          />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
            placeholder="Search keywords / Tìm theo từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {sourceAchievements.length === 0 ? (
        <div
          className="glass-card animate-fade-in-up"
          style={{
            padding: "54px 32px",
            textAlign: "center",
            borderRadius: 16,
            background: "radial-gradient(ellipse at top, rgba(16, 185, 129, 0.08) 0%, rgba(20, 20, 25, 0.6) 70%)",
            border: "1px dashed rgba(255, 255, 255, 0.15)",
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
            <Bi en="04 / 05 — Academic Milestones & Credentials" vi="04 / 05 — Cột mốc Học thuật & Chứng nhận" />
          </span>
          <h3 className="serif" style={{ fontSize: "28px", margin: "0 0 12px", color: "var(--ink)" }}>
            <Bi
              en="Academic Journey & Milestones in Preparation."
              vi="Hành trình Học thuật & Cột mốc Đang Chuẩn bị."
            />
          </h3>
          <p
            className="muted"
            style={{
              fontSize: "14px",
              lineHeight: 1.75,
              maxWidth: 580,
              margin: "0 auto 28px",
            }}
          >
            <Bi
              en="Currently studying Engineering Physics (Computational Physics & Simulation) at HCMUS — VNUHCM (2023 – 2027) with a cumulative GPA of 3.08 / 4.0. Scientific research milestones, laboratory certifications, and academic achievements are being compiled. You can manage and publish achievements anytime via the Admin Studio."
              vi="Đang theo học ngành Vật lý Kỹ thuật (chuyên ngành Vật lý Tin học, Tính toán & Mô phỏng) tại Trường ĐH Khoa học Tự nhiên - ĐHQG TP.HCM (2023 – 2027) với GPA tích lũy 3.08 / 4.0. Các cột mốc nghiên cứu khoa học, chứng nhận thực nghiệm và học thuật đang được chuẩn bị để đăng tải. Bạn có thể tự thêm hoặc chỉnh sửa thành tựu qua trang Quản trị."
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
        /* Achievement Cards Grid when items exist */
        <div style={{ display: "grid", gap: 24 }}>
          {filteredItems.length === 0 ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                background: "var(--card)",
                border: "1px dashed var(--line)",
                borderRadius: 14,
                color: "var(--quiet)",
              }}
            >
              <p style={{ fontSize: 15, marginBottom: 8 }}>
                <Bi en="No achievements match your search filter." vi="Không tìm thấy thành tựu nào khớp với từ khóa." />
              </p>
              <button
                type="button"
                className="button-secondary button-sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                <Bi en="Reset all filters" vi="Xóa tất cả bộ lọc" />
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <article
                key={item.id}
                className="achievement-card animate-fade-in-up"
                style={{
                  animationDelay: `${0.05 * (idx + 1)}s`,
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "28px 28px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                {/* Header: Organization, Year & Badge */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        color: "#818cf8",
                      }}
                    >
                      {item.organization}
                    </span>
                    <span style={{ color: "var(--line)" }}>•</span>
                    <span style={{ fontSize: 12, color: "var(--quiet)", fontFamily: "monospace" }}>
                      {item.year}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {item.highlightMetric && (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#10b981",
                          background: "rgba(16, 185, 129, 0.1)",
                          padding: "3px 10px",
                          borderRadius: 999,
                          border: "1px solid rgba(16, 185, 129, 0.25)",
                        }}
                      >
                        {item.highlightMetric}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "var(--ink)",
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "3px 10px",
                        borderRadius: 999,
                        border: "1px solid var(--line)",
                      }}
                    >
                      <Bi en={item.badgeEn} vi={item.badgeVi} />
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--ink)",
                    lineHeight: 1.35,
                    marginBottom: 14,
                  }}
                >
                  <Bi en={item.titleEn} vi={item.titleVi} />
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--quiet)",
                    lineHeight: 1.65,
                    marginBottom: 18,
                  }}
                >
                  <Bi en={item.descriptionEn} vi={item.descriptionVi} />
                </p>

                {/* Key Bullet Points */}
                {item.keyPointsEn.length > 0 && (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 20px 0",
                      display: "grid",
                      gap: 8,
                    }}
                  >
                    {item.keyPointsEn.map((pointEn, pIdx) => (
                      <li
                        key={pIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 13,
                          lineHeight: 1.55,
                          color: "var(--ink)",
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          style={{ color: "#818cf8", flexShrink: 0, marginTop: 3 }}
                        />
                        <span>
                          <Bi en={pointEn} vi={item.keyPointsVi[pIdx] || pointEn} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Footer: Tags & Verified Action */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    paddingTop: 16,
                    borderTop: "1px solid var(--line)",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: 11,
                          color: "var(--quiet)",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          padding: "2px 9px",
                          borderRadius: 6,
                          fontFamily: "monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-secondary button-sm"
                      style={{ fontSize: 11, padding: "5px 12px" }}
                    >
                      <Bi en="Verify Credential" vi="Xác minh chứng chỉ" />
                      <ExternalLink size={12} style={{ marginLeft: 4 }} />
                    </a>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
