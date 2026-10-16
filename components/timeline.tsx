"use client";

import React from "react";
import { Bi } from "./language-switch";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

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
                    <span className="timeline-company">
                      <Bi en={item.companyEn} vi={item.companyVi} />
                    </span>
                    {item.location && (
                      <span
                        className="timeline-meta"
                        style={{ display: "inline-flex", alignItems: "center", gap: 3 }}
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
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="timeline-date"
                    style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    <Calendar size={11} />
                    {item.period}
                  </span>

                  {(item.badgeEn || item.badgeVi) && (
                    <span
                      className={`badge badge-sm ${item.isActive ? "badge-accent" : "badge-outline"}`}
                    >
                      <Bi en={item.badgeEn || ""} vi={item.badgeVi || ""} />
                    </span>
                  )}
                </div>
              </div>

              {/* Narrative Description */}
              {(item.descriptionEn || item.descriptionVi) && (
                <p className="timeline-desc">
                  <Bi en={item.descriptionEn || ""} vi={item.descriptionVi || ""} />
                </p>
              )}

              {/* Bulleted Points */}
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
    period: "2023 — Present",
    roleEn: "Engineering Physics & Scientific Computing Student",
    roleVi: "Sinh viên Kỹ thuật Vật lý & Tính toán Khoa học",
    companyEn: "VNUHCM — University of Science (HCMUS)",
    companyVi: "Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM",
    location: "Ho Chi Minh City, Vietnam",
    isActive: true,
    badgeEn: "Active Studies",
    badgeVi: "Đang học tập",
    descriptionEn:
      "Specializing in Computational Physics, numerical simulations, electronic prototyping, and embedded instrumentation. Driven by self-directed study and methodical engineering problem-solving.",
    descriptionVi:
      "Chuyên sâu về Vật lý Tin học, mô phỏng số, thiết kế mạch điện tử và thiết bị đo lường nhúng. Tinh thần chủ động tự học và đam mê giải quyết các bài toán kỹ thuật thực tế.",
    achievementsEn: [
      "Conducting numerical modeling and scientific data analysis using Python, MATLAB, and Google Colab.",
      "Designing circuit schematics and printed circuit boards (PCB) using KiCad; 3D mechanical modeling in FreeCAD.",
      "Hands-on experimentation with laboratory instrumentation: Oscilloscopes, microcontrollers, sensor interfacing, and embedded IoT systems.",
      "Processing, visualizing, and analyzing experimental physics measurements with OriginLab.",
    ],
    achievementsVi: [
      "Thực hiện mô phỏng số và phân tích dữ liệu khoa học bằng Python, MATLAB và Google Colab.",
      "Thiết kế sơ đồ nguyên lý và mạch in PCB bằng KiCad; dựng mô hình 3D cơ khí bằng FreeCAD.",
      "Thao tác thực nghiệm với thiết bị đo phòng thí nghiệm: Dao động ký (Oscilloscope), vi điều khiển, giao tiếp cảm biến và hệ thống nhúng IoT.",
      "Xử lý, vẽ đồ thị và chuẩn hóa dữ liệu thực nghiệm vật lý bằng phần mềm OriginLab.",
    ],
    tags: ["Python", "MATLAB", "C++", "KiCad", "OriginLab", "FreeCAD", "Oscilloscope", "Microcontrollers", "Embedded IoT"],
  },
  {
    period: "Target 2025 — 2026",
    roleEn: "Prospective Intern / Fresher Roles",
    roleVi: "Mục tiêu Vị trí Thực tập / Fresher",
    companyEn: "Technology & Engineering Organizations",
    companyVi: "Các doanh nghiệp & Viện nghiên cứu công nghệ",
    location: "Ho Chi Minh City, Vietnam",
    isActive: false,
    badgeEn: "Open to Opportunities",
    badgeVi: "Sẵn sàng đón nhận",
    descriptionEn:
      "Seeking internship and fresher opportunities to apply engineering physics, simulation methods, and embedded hardware skills to production-grade engineering challenges.",
    descriptionVi:
      "Tìm kiếm cơ hội thực tập và vị trí fresher để áp dụng kiến thức vật lý kỹ thuật, phương pháp mô phỏng và phần cứng nhúng vào giải quyết các bài toán công nghệ trong thực tế.",
    achievementsEn: [
      "Computational Physics & Simulation Intern (Numerical modeling, algorithmic data processing, scientific software).",
      "Embedded Systems & IoT Intern (Microcontroller firmware in C/C++, sensor integration, hardware prototyping).",
      "Hardware / PCB Design & Testing Intern (KiCad schematic capture, PCB layout, lab verification with oscilloscope).",
      "R&D Engineering Intern (Experimental data analysis, process optimization, applied technical research).",
    ],
    achievementsVi: [
      "Thực tập sinh Mô phỏng & Tính toán Khoa học (Mô phỏng số, xử lý dữ liệu thuật toán, phần mềm khoa học).",
      "Thực tập sinh Hệ thống Nhúng & IoT (Lập trình vi điều khiển C/C++, tích hợp cảm biến, thử nghiệm phần cứng).",
      "Thực tập sinh Thiết kế & Đo kiểm Phần cứng (Thiết kế PCB KiCad, layout mạch, kiểm thử với dao động ký).",
      "Thực tập sinh Nghiên cứu & Phát triển R&D (Phân tích dữ liệu thực nghiệm, tối ưu hóa quy trình kỹ thuật).",
    ],
    tags: ["Computational Physics", "Simulation", "Embedded Systems", "Hardware Testing", "R&D"],
  },
];

export const EDUCATION_ITEMS: TimelineItemData[] = [
  {
    period: "2023 — 2027 (Expected)",
    roleEn: "Bachelor in Engineering Physics / Physical Technology",
    roleVi: "Kỹ sư / Cử nhân Vật lý Kỹ thuật (Công nghệ Vật lý)",
    companyEn: "VNUHCM — University of Science (HCMUS)",
    companyVi: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
    location: "Ho Chi Minh City, Vietnam",
    isActive: true,
    badgeEn: "GPA: 3.08 / 4.0",
    badgeVi: "GPA: 3.08 / 4.0",
    descriptionEn:
      "Major: Engineering Physics (Công nghệ Vật lý) · Concentration: Computational Physics, Modeling & Simulation (Vật lý Tin học Tính toán và Mô phỏng).",
    descriptionVi:
      "Ngành: Vật lý Kỹ thuật (Công nghệ Vật lý) · Chuyên ngành hẹp: Vật lý Tin học, Tính toán và Mô phỏng.",
    achievementsEn: [
      "Cumulative GPA: 3.08 / 4.0 across rigorous physics, mathematics, and computing curriculum.",
      "Core Foundations: Advanced Mathematics, Numerical Methods, General & Modern Physics, Classical & Quantum Mechanics, Electromagnetism, Optics, Computational Physics, Algorithm Design.",
      "Laboratory & Applied Skills: Circuit design, electronic prototyping, oscilloscope signal measurement, microcontroller firmware, scientific data regression.",
    ],
    achievementsVi: [
      "Điểm trung bình tích lũy: 3.08 / 4.0 trong chương trình đào tạo kết hợp toán, vật lý và tin học tính toán.",
      "Nền tảng cốt lõi: Toán cao cấp, Phương pháp tính & Giải tích số, Vật lý đại cương, Cơ học, Điện từ học, Quang học, Vật lý Tin học, Cấu trúc dữ liệu & Thuật toán.",
      "Kỹ năng thực nghiệm: Thiết kế mạch điện tử, đo kiểm tín hiệu bằng dao động ký, lập trình vi điều khiển, hồi quy và trực quan hóa số liệu thực nghiệm.",
    ],
    tags: ["HCMUS", "Engineering Physics", "Computational Physics", "Simulation", "GPA: 3.08", "Mathematics", "Lab Instrumentation"],
  },
];
