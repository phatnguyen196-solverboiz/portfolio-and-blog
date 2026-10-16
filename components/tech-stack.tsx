"use client";

import React, { useState } from "react";
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { Bi } from "./language-switch";

export interface SkillItem {
  name: string;
  nameVi?: string;
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
    titleEn: "Programming & Scientific Computing",
    titleVi: "Ngôn ngữ Lập trình & Tính toán",
    icon: <Code2 className="skills-category-icon" size={16} />,
    skills: [
      { name: "Python", badge: "Primary", badgeVi: "Chính", highlight: true },
      { name: "MATLAB", badge: "Simulation", badgeVi: "Mô phỏng", highlight: true },
      { name: "C++", badge: "Core", badgeVi: "Nền tảng", highlight: true },
      { name: "JavaScript", badge: "Web/Script", badgeVi: "Web/Script" },
      { name: "HTML5 / CSS3", badge: "Interface", badgeVi: "Giao diện" },
    ],
  },
  {
    id: "simulation_cad",
    titleEn: "Engineering Software & CAD",
    titleVi: "Phần mềm Kỹ thuật, Mô phỏng & CAD",
    icon: <Layers className="skills-category-icon" size={16} />,
    skills: [
      { name: "KiCad", badge: "PCB Design", badgeVi: "Thiết kế mạch", highlight: true },
      { name: "OriginLab", badge: "Data & Graphs", badgeVi: "Xử lý dữ liệu", highlight: true },
      { name: "FreeCAD", badge: "3D Modeling", badgeVi: "Dựng hình 3D", highlight: true },
      { name: "Google Colab", badge: "Cloud Compute", badgeVi: "Điện toán đám mây" },
    ],
  },
  {
    id: "hardware_embedded",
    titleEn: "Hardware, Instrumentation & IoT",
    titleVi: "Phần cứng, Thiết bị đo & Nhúng IoT",
    icon: <Cpu className="skills-category-icon" size={16} />,
    skills: [
      {
        name: "Oscilloscope",
        nameVi: "Dao động ký (Oscilloscope)",
        badge: "Measurement",
        badgeVi: "Đo kiểm tín hiệu",
        highlight: true,
      },
      {
        name: "Microcontrollers (MCU)",
        nameVi: "Vi điều khiển (MCU)",
        badge: "Firmware",
        badgeVi: "Lập trình vi điều khiển",
        highlight: true,
      },
      {
        name: "Embedded Systems",
        nameVi: "Hệ thống nhúng (Embedded)",
        badge: "C/C++",
        badgeVi: "Hệ thống nhúng",
        highlight: true,
      },
      {
        name: "Sensors & IoT",
        nameVi: "Cảm biến & IoT",
        badge: "Hardware",
        badgeVi: "Thiết bị & Cảm biến",
        highlight: true,
      },
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
    const highlightedSkills = SKILL_CATEGORIES.flatMap((c) =>
      c.skills.filter((s) => s.highlight || ["Python", "MATLAB", "C++", "KiCad", "OriginLab", "FreeCAD", "Oscilloscope", "Microcontrollers (MCU)"].includes(s.name))
    );

    return (
      <div className={`skills-grid ${className}`}>
        {highlightedSkills.map((skill) => (
          <div key={skill.name} className="skill-pill" title={skill.name}>
            <Sparkles className="skill-icon" size={14} style={{ color: "var(--accent-ink)" }} />
            <span>
              <Bi en={skill.name} vi={skill.nameVi || skill.name} />
            </span>
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {categoriesToRender.map((cat) => (
          <div key={cat.id} className="glass-card glow-card" style={{ padding: "24px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              {cat.icon}
              <h3 style={{ fontSize: 16, margin: 0, fontWeight: 600, color: "var(--ink)" }}>
                <Bi en={cat.titleEn} vi={cat.titleVi} />
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.skills.map((skill) => (
                <div key={skill.name} className="skill-pill" style={{ fontSize: 12.5 }}>
                  <span>
                    <Bi en={skill.name} vi={skill.nameVi || skill.name} />
                  </span>
                  {skill.badge && (
                    <span className="badge badge-sm badge-outline" style={{ fontSize: 9 }}>
                      <Bi en={skill.badge} vi={skill.badgeVi || skill.badge} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
