"use client";

import React from "react";
import { Bi } from "./language-switch";
import { MapPin, Calendar, Award, CheckCircle2 } from "lucide-react";

export interface TimelineItemData {
  id?: string;
  period: string;
  roleEn: string;
  roleVi: string;
  companyEn: string;
  companyVi: string;
  location?: string;
  descriptionEn?: string;
  descriptionVi?: string;
  achievementsEn?: string[];
  achievementsVi?: string[];
  tags?: string[];
  isActive?: boolean;
  badgeEn?: string;
  badgeVi?: string;
}

export interface TimelineProps {
  items: TimelineItemData[];
  dashed?: boolean;
  className?: string;
}

export function Timeline({ items, dashed = false, className = "" }: TimelineProps) {
  return (
    <div className={`timeline ${dashed ? "is-dashed" : ""} ${className}`}>
      {items.map((item, idx) => {
        const itemKey = item.id || `${item.period}-${idx}`;

        return (
          <div key={itemKey} className="timeline-item">
            {/* Timeline node icon */}
            <div
              className={`timeline-node ${item.isActive ? "pulse is-active" : ""}`}
              aria-hidden="true"
            />

            <div className="timeline-content">
              {/* Header: Title, Org, Date, Badges */}
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">
                    <Bi en={item.roleEn} vi={item.roleVi} />
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "6px 12px",
                      marginTop: 3,
                    }}
                  >
                    <span className="timeline-org">
                      <Bi en={item.companyEn} vi={item.companyVi} />
                    </span>
                    {item.location && (
                      <span
                        className="muted"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                        }}
                      >
                        <MapPin size={11} />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginLeft: "auto",
                  }}
                >
                  <span className="timeline-date">
                    <Calendar size={11} style={{ display: "inline", marginRight: 4 }} />
                    {item.period}
                  </span>
                  {(item.badgeEn || item.badgeVi) && (
                    <span
                      className={`badge badge-sm ${
                        item.isActive ? "badge-accent" : "badge-outline"
                      }`}
                    >
                      <Bi
                        en={item.badgeEn || ""}
                        vi={item.badgeVi || item.badgeEn || ""}
                      />
                    </span>
                  )}
                </div>
              </div>

              {/* Optional Narrative Description */}
              {(item.descriptionEn || item.descriptionVi) && (
                <div className="timeline-desc">
                  <p style={{ margin: 0 }}>
                    <Bi
                      en={item.descriptionEn || ""}
                      vi={item.descriptionVi || item.descriptionEn || ""}
                    />
                  </p>
                </div>
              )}

              {/* Bulleted Key Achievements / Responsibilities */}
              {((item.achievementsEn && item.achievementsEn.length > 0) ||
                (item.achievementsVi && item.achievementsVi.length > 0)) && (
                <div style={{ marginTop: 8 }}>
                  {item.achievementsEn && (
                    <ul
                      className="lang-en"
                      style={{
                        margin: "6px 0 0",
                        paddingLeft: 18,
                        fontSize: 13,
                        lineHeight: 1.75,
                        color: "rgba(232, 230, 227, 0.8)",
                      }}
                    >
                      {item.achievementsEn.map((bullet, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: 4 }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.achievementsVi && (
                    <ul
                      className="lang-vi"
                      style={{
                        margin: "6px 0 0",
                        paddingLeft: 18,
                        fontSize: 13,
                        lineHeight: 1.75,
                        color: "rgba(232, 230, 227, 0.8)",
                      }}
                    >
                      {item.achievementsVi.map((bullet, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: 4 }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Technology & Tooling Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="timeline-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="badge badge-sm badge-outline">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const EXPERIENCE_ITEMS: TimelineItemData[] = [
  {
    period: "2024 — Present",
    roleEn: "Full-Stack Software Engineer & Open-Source Contributor",
    roleVi: "Kỹ sư phần mềm Full-Stack & Đóng góp mã nguồn mở",
    companyEn: "Independent & Open-Source Projects",
    companyVi: "Dự án độc lập & Mã nguồn mở",
    location: "Ho Chi Minh City, Vietnam",
    isActive: true,
    badgeEn: "Current Focus",
    badgeVi: "Hiện tại",
    descriptionEn:
      "Architecting resilient web applications, distributed backend services, and high-precision user interfaces with modern toolchains.",
    descriptionVi:
      "Thiết kế và phát triển các ứng dụng web bền bỉ, dịch vụ backend phân tán và giao diện người dùng độ chính xác cao bằng các công nghệ hiện đại.",
    achievementsEn: [
      "Architected and deployed high-throughput web systems using Next.js 16, TypeScript, and distributed edge runtimes with sub-50ms TTFB.",
      "Implemented resilient relational database schemas using Drizzle ORM and SQLite/PostgreSQL with zero data-migration downtime.",
      "Engineered custom bilingual (EN/VI) internationalization system optimized for instant hydration and zero layout shifts.",
      "Integrated cmdk command palette, glassmorphism UI tokens, and print-ready curriculum vitae stylesheets.",
    ],
    achievementsVi: [
      "Thiết kế và triển khai hệ thống web hiệu năng cao với Next.js 16, TypeScript và edge runtimes phân tán, đạt TTFB dưới 50ms.",
      "Triển khai schema cơ sở dữ liệu quan hệ tối ưu với Drizzle ORM và SQLite/PostgreSQL, đảm bảo an toàn di chuyển dữ liệu (zero downtime).",
      "Xây dựng kiến trúc đa ngôn ngữ song ngữ (EN/VI) tức thì, loại bỏ hiện tượng giật giao diện (zero layout shift).",
      "Tích hợp command palette cmdk, hệ thống giao diện glassmorphism obsidian và định dạng in ấn chuyên nghiệp cho CV.",
    ],
    tags: ["Next.js 16", "React 19", "TypeScript", "Drizzle ORM", "Cloudflare Workers", "Tailwind CSS"],
  },
  {
    period: "2023 — 2024",
    roleEn: "Software Engineering Intern & Research Assistant",
    roleVi: "Thực tập sinh Kỹ thuật phần mềm & Trợ lý nghiên cứu",
    companyEn: "University Technology Lab",
    companyVi: "Phòng nghiên cứu Công nghệ trường Đại học",
    location: "Ho Chi Minh City, Vietnam",
    isActive: false,
    badgeEn: "Completed",
    badgeVi: "Hoàn thành",
    descriptionEn:
      "Collaborated on backend services, API designs, query latency optimization, and automated delivery pipelines.",
    descriptionVi:
      "Tham gia phát triển các dịch vụ backend, thiết kế API, tối ưu độ trễ truy vấn cơ sở dữ liệu và thiết lập luồng CI/CD tự động.",
    achievementsEn: [
      "Developed high-throughput RESTful API endpoints and real-time streaming services utilizing Node.js, WebSockets, and Redis.",
      "Benchmarked database query execution plans, reducing bottlenecks by 38% through composite indexing and query refactoring.",
      "Authored internal technical documentation, deployment runbooks, and automated CI/CD workflows using GitHub Actions.",
    ],
    achievementsVi: [
      "Phát triển các API RESTful và dịch vụ truyền dữ liệu thời gian thực sử dụng Node.js, WebSockets và Redis.",
      "Đo lường kế hoạch thực thi câu lệnh SQL, giảm 38% độ trễ cổ chai thông qua tối ưu hóa chỉ mục phức hợp.",
      "Soạn thảo tài liệu kỹ thuật nội bộ, quy trình triển khai và thiết lập luồng CI/CD tự động bằng GitHub Actions.",
    ],
    tags: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "GitHub Actions"],
  },
];

export const EDUCATION_ITEMS: TimelineItemData[] = [
  {
    period: "2023 — 2027 (Expected)",
    roleEn: "Bachelor of Science in Software Engineering",
    roleVi: "Cử nhân Kỹ thuật phần mềm",
    companyEn: "University of Science, VNU-HCM",
    companyVi: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
    location: "Ho Chi Minh City, Vietnam",
    isActive: true,
    badgeEn: "Academic Excellence",
    badgeVi: "Thành tích xuất sắc",
    descriptionEn:
      "Rigorous computer science curriculum focusing on distributed systems, data structures & algorithms, and software engineering methodologies.",
    descriptionVi:
      "Chương trình đào tạo khoa học máy tính chuyên sâu về hệ thống phân tán, cấu trúc dữ liệu & giải thuật và phương pháp phát triển phần mềm.",
    achievementsEn: [
      "Academic Excellence Scholarship recipient, ranked in Top 5% of semester cohort.",
      "Core Coursework: Data Structures & Algorithms, Distributed Systems, Database Management Systems, Computer Networks, Operating Systems, Software Architecture.",
      "Active participant in technical symposiums, algorithm competitions, and peer code reviews.",
    ],
    achievementsVi: [
      "Học bổng Khuyến khích Học tập Xuất sắc, xếp hạng Top 5% sinh viên tiêu biểu của kỳ.",
      "Các môn học trọng tâm: Cấu trúc dữ liệu & Giải thuật, Hệ thống phân tán, Hệ quản trị cơ sở dữ liệu, Mạng máy tính, Hệ điều hành, Kiến trúc phần mềm.",
      "Tích cực tham gia các hội thảo kỹ thuật, cuộc thi thuật toán và phản biện mã nguồn sinh viên.",
    ],
    tags: ["Algorithms", "Distributed Systems", "Database Systems", "Operating Systems", "Networking"],
  },
];
