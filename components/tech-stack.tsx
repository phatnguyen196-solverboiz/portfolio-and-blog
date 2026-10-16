"use client";

import React, { useState } from "react";
import {
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Boxes,
  Workflow,
  ShieldCheck,
  Container,
  Cloud,
} from "lucide-react";
import { Bi } from "./language-switch";

export interface SkillItem {
  name: string;
  badge?: string;
  badgeVi?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  titleEn: string;
  titleVi: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    titleEn: "Programming Languages",
    titleVi: "Ngôn ngữ lập trình",
    icon: <Code2 className="skills-category-icon" size={16} />,
    skills: [
      { name: "TypeScript", badge: "Primary", badgeVi: "Chính", highlight: true },
      { name: "JavaScript", badge: "ES2024", badgeVi: "ES2024" },
      { name: "Python", badge: "Data & ML", badgeVi: "Dữ liệu & ML" },
      { name: "Go", badge: "Systems", badgeVi: "Hệ thống", highlight: true },
      { name: "SQL", badge: "Relational", badgeVi: "Quan hệ" },
      { name: "HTML5 / CSS3", badge: "Semantic", badgeVi: "Tiêu chuẩn" },
    ],
  },
  {
    id: "frontend",
    titleEn: "Frontend & UI Engineering",
    titleVi: "Kỹ thuật giao diện Frontend",
    icon: <Layout className="skills-category-icon" size={16} />,
    skills: [
      { name: "React 19", badge: "Core", badgeVi: "Cốt lõi", highlight: true },
      { name: "Next.js 16", badge: "App Router", badgeVi: "App Router", highlight: true },
      { name: "Tailwind CSS 4", badge: "Styling", badgeVi: "Thiết kế" },
      { name: "Radix UI", badge: "Accessible", badgeVi: "Tiếp cận" },
      { name: "Vite", badge: "Bundler", badgeVi: "Build tool" },
    ],
  },
  {
    id: "backend",
    titleEn: "Backend & Systems",
    titleVi: "Hệ thống & Dịch vụ Backend",
    icon: <Server className="skills-category-icon" size={16} />,
    skills: [
      { name: "Node.js", badge: "Runtime", badgeVi: "Runtime", highlight: true },
      { name: "Express / Fastify", badge: "Services", badgeVi: "Dịch vụ" },
      { name: "RESTful APIs", badge: "Architecture", badgeVi: "Kiến trúc" },
      { name: "GraphQL", badge: "APIs", badgeVi: "API" },
      { name: "Drizzle ORM", badge: "Type-Safe", badgeVi: "Type-Safe", highlight: true },
    ],
  },
  {
    id: "devops",
    titleEn: "Databases & DevOps",
    titleVi: "Cơ sở dữ liệu & DevOps",
    icon: <Database className="skills-category-icon" size={16} />,
    skills: [
      { name: "PostgreSQL", badge: "ACID", badgeVi: "ACID", highlight: true },
      { name: "SQLite / D1", badge: "Edge DB", badgeVi: "Edge DB" },
      { name: "Cloudflare Workers", badge: "Edge Runtime", badgeVi: "Edge Runtime", highlight: true },
      { name: "Docker", badge: "Containers", badgeVi: "Container" },
      { name: "Git & CI/CD", badge: "Actions", badgeVi: "Tự động hóa" },
      { name: "Linux", badge: "Operations", badgeVi: "Vận hành" },
    ],
  },
];

export interface TechStackProps {
  compact?: boolean;
  filterInteractive?: boolean;
  className?: string;
}

export function TechStack({
  compact = false,
  filterInteractive = false,
  className = "",
}: TechStackProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoriesToRender =
    selectedCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  if (compact) {
    // Flattened top highlights for homepage or quick glance
    const highlightedSkills = SKILL_CATEGORIES.flatMap((c) =>
      c.skills.filter((s) => s.highlight || ["TypeScript", "Next.js 16", "React 19", "Go", "PostgreSQL", "Docker"].includes(s.name))
    );

    return (
      <div className={`skills-grid ${className}`}>
        {highlightedSkills.map((skill) => (
          <div key={skill.name} className="skill-pill" title={skill.name}>
            <Sparkles className="skill-icon" size={14} style={{ color: "var(--accent-ink)" }} />
            <span>{skill.name}</span>
            {skill.badge && (
              <span className="badge badge-sm badge-accent" style={{ marginLeft: "auto", fontSize: 9 }}>
                <Bi en={skill.badge} vi={skill.badgeVi || skill.badge} />
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`tech-stack-container ${className}`}>
      {filterInteractive && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          <button
            type="button"
            className={`badge ${selectedCategory === "all" ? "badge-accent" : "badge-outline"}`}
            style={{ cursor: "pointer", padding: "6px 14px", fontSize: 12 }}
            onClick={() => setSelectedCategory("all")}
          >
            <Bi en="All Disciplines" vi="Tất cả lĩnh vực" />
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`badge ${selectedCategory === cat.id ? "badge-accent" : "badge-outline"}`}
              style={{ cursor: "pointer", padding: "6px 14px", fontSize: 12 }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <Bi en={cat.titleEn} vi={cat.titleVi} />
            </button>
          ))}
        </div>
      )}

      {categoriesToRender.map((category) => (
        <div key={category.id} className="skills-category">
          <div className="skills-category-header">
            {category.icon}
            <h3 className="skills-category-title" style={{ margin: 0 }}>
              <Bi en={category.titleEn} vi={category.titleVi} />
            </h3>
            <span
              className="badge badge-sm badge-outline muted"
              style={{ marginLeft: "auto", fontSize: 10 }}
            >
              {category.skills.length} <Bi en="technologies" vi="công nghệ" />
            </span>
          </div>

          <div className="skills-grid">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-pill"
                title={`${skill.name} (${skill.badge || "Skill"})`}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: skill.highlight ? "var(--accent-ink)" : "rgba(255, 255, 255, 0.3)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontWeight: skill.highlight ? 600 : 500 }}>
                  {skill.name}
                </span>
                {skill.badge && (
                  <span
                    className={`badge badge-sm ${
                      skill.highlight ? "badge-accent" : "badge-outline"
                    }`}
                    style={{ marginLeft: "auto", fontSize: 9 }}
                  >
                    <Bi en={skill.badge} vi={skill.badgeVi || skill.badge} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
