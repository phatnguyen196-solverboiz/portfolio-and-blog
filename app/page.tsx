import Link from "next/link";
import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { TechStack } from "@/components/tech-stack";
import { HeroPortrait } from "@/components/hero-portrait";
import { CopyEmailButton } from "@/components/contact-widget";
import { ArrowRight } from "lucide-react";

const destinations = [
  {
    number: "01",
    href: "/about",
    title: { en: "About / CV", vi: "Giới thiệu / CV" },
    description: {
      en: "HCMUS background, engineering philosophy, academic timeline, and résumé.",
      vi: "Tiểu sử HCMUS, triết lý kỹ thuật, tiến trình học vấn và CV chi tiết.",
    },
  },
  {
    number: "02",
    href: "/projects",
    title: { en: "Selected Work", vi: "Dự án chọn lọc" },
    description: {
      en: "Numerical simulations, KiCad circuit designs, and embedded IoT experiments.",
      vi: "Mô phỏng số, thiết kế mạch KiCad và thực nghiệm vi điều khiển / nhúng IoT.",
    },
  },
  {
    number: "03",
    href: "/blog",
    title: { en: "Technical Blog", vi: "Blog Kỹ thuật" },
    description: {
      en: "Technical notes on computational physics, modeling algorithms, and hardware.",
      vi: "Ghi chép chuyên sâu về vật lý tin học, thuật toán mô phỏng và phần cứng.",
    },
  },
  {
    number: "04",
    href: "/achievements",
    title: { en: "Academic Milestones", vi: "Cột mốc Học thuật" },
    description: {
      en: "HCMUS coursework, laboratory credentials, GPA 3.08, and research records.",
      vi: "Quá trình đào tạo HCMUS, chứng nhận thực nghiệm, GPA 3.08 và nghiên cứu.",
    },
  },
  {
    number: "05",
    href: "/contact",
    title: { en: "Contact & Availability", vi: "Liên hệ & Trạng thái" },
    description: {
      en: "Direct phone (+84 797 190 605), live timezone clock, and inquiry channels.",
      vi: "Số điện thoại (+84 797 190 605), đồng hồ múi giờ thực và các kênh liên hệ.",
    },
  },
];

export default function Home() {
  return (
    <SiteShell>
      <div className="wrap">
        {/* HERO TOP ROW: TITLE & PROFILE PHOTO SLOT */}
        <section
          className="home-hero"
          aria-labelledby="home-title"
          style={{ minHeight: "auto", paddingBottom: 20 }}
        >
          <div>
            {/* Live Availability Status Pill */}
            <div
              className="status-pill animate-fade-in-up"
              style={{ animationDelay: "0.05s", marginBottom: 18, display: "inline-flex" }}
            >
              <span className="status-dot status-online" />
              <span>
                <Bi
                  en="Seeking Intern / Fresher Roles in Simulation, Embedded & R&D"
                  vi="Sẵn sàng cho vị trí Thực tập / Fresher Mô phỏng, Nhúng & R&D"
                />
              </span>
              <span
                className="badge badge-sm badge-outline"
                style={{ marginLeft: 6, fontSize: 10, padding: "1px 6px" }}
              >
                GMT+7
              </span>
            </div>

            <p className="eyebrow animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <Bi
                en="Engineering Physics & Computational Simulation · HCMUS (2023 – 2027)"
                vi="Vật lý Kỹ thuật & Vật lý Tin học, Tính toán Mô phỏng · HCMUS (2023 – 2027)"
              />
            </p>

            <h1
              id="home-title"
              className="hero-title serif animate-fade-in-up"
              style={{ animationDelay: "0.25s" }}
            >
              Nguyen<br />Trong <em>Phat.</em>
            </h1>
          </div>

          {/* DEDICATED PHOTO / AVATAR SLOT ON THE RIGHT */}
          <HeroPortrait />
        </section>

        {/* HERO NARRATIVE & CTAS (TRẢI RỘNG BÊN DƯỚI TIÊU ĐỀ VÀ ẢNH) */}
        <section
          className="hero-narrative-block animate-fade-in-up"
          aria-label="Personal introduction and primary actions"
          style={{
            animationDelay: "0.4s",
            paddingTop: 32,
            paddingBottom: 54,
            borderBottom: "1px solid var(--line)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              lineHeight: 1.85,
              color: "rgba(232, 230, 227, 0.85)",
              maxWidth: 880,
              margin: "0 0 28px",
            }}
          >
            <Bi
              en="Undergraduate student in Engineering Physics at HCMUS (GPA 3.08 / 4.0). Passionate about self-directed learning, scientific computing, numerical simulations (Python, MATLAB, C++), PCB design (KiCad), 3D modeling (FreeCAD), and embedded microcontrollers & IoT."
              vi="Sinh viên ngành Vật lý Kỹ thuật tại Trường ĐH Khoa học Tự nhiên - ĐHQG TP.HCM (GPA 3.08 / 4.0). Đam mê tự học, nghiên cứu khoa học, mô phỏng số & tính toán khoa học (Python, MATLAB, C++), thiết kế mạch (KiCad), mô hình 3D (FreeCAD) và thực nghiệm vi điều khiển / nhúng IoT."
            />
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <Link className="button button-primary" href="/about">
              <Bi en="View Background & CV" vi="Xem Nền tảng & CV" />
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-secondary" href="/contact">
              <Bi en="Get in Touch" vi="Liên hệ trao đổi" />
            </Link>
            <CopyEmailButton />
          </div>
        </section>

        {/* CORE TECHNICAL CAPABILITIES */}
        <section
          style={{ paddingTop: 64, paddingBottom: 64, borderTop: "1px solid var(--line)" }}
          aria-labelledby="tech-stack-heading"
        >
          <div style={{ marginBottom: 32 }} className="animate-fade-in-up">
            <p className="eyebrow" style={{ marginBottom: 8 }}>
              <Bi en="Core Capabilities" vi="Năng lực cốt lõi" />
            </p>
            <h2
              id="tech-stack-heading"
              className="serif"
              style={{ fontSize: "clamp(30px, 4vw, 44px)", margin: "0 0 10px", letterSpacing: "-0.03em" }}
            >
              <Bi en="Technical Stack & Tooling." vi="Công nghệ & Công cụ kỹ thuật." />
            </h2>
            <p className="page-intro" style={{ maxWidth: 640 }}>
              <Bi
                en="Scientific computing languages, numerical modeling environments, CAD/PCB suites, and laboratory instruments utilized in Engineering Physics and embedded system prototyping."
                vi="Ngôn ngữ tính toán khoa học, môi trường mô phỏng số, bộ phần mềm thiết kế CAD/PCB và thiết bị đo kiểm trong ngành Vật lý Kỹ thuật và chế tạo hệ thống nhúng."
              />
            </p>
          </div>

          <TechStack filterInteractive={false} />
        </section>

        {/* EXPLORE 5 SPACES (INDEX TABLE) */}
        <section className="home-index" aria-labelledby="explore-title" style={{ paddingTop: 20 }}>
          <div className="index-head animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 id="explore-title" className="eyebrow" style={{ margin: 0 }}>
              <Bi en="Index & Spaces" vi="Mục lục & Không gian" />
            </h2>
            <span className="muted">
              <Bi en="Explore the five primary sections" vi="Khám phá năm khu vực chính" />
            </span>
          </div>
          {destinations.map((item, idx) => (
            <Link
              href={item.href}
              className="index-row animate-fade-in-up"
              key={item.number}
              style={{ animationDelay: `${0.3 + idx * 0.08}s` }}
            >
              <span className="index-number">{item.number}</span>
              <span className="index-title">
                <Bi en={item.title.en} vi={item.title.vi} />
              </span>
              <span className="index-description">
                <Bi en={item.description.en} vi={item.description.vi} />
              </span>
              <span className="index-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </section>

        {/* CONNECT CTA BANNER */}
        <section style={{ paddingTop: 20, paddingBottom: 64 }}>
          <div
            className="glass-card glow-card animate-fade-in-up"
            style={{
              padding: "40px 36px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <div
                className="status-pill"
                style={{ marginBottom: 14, display: "inline-flex" }}
              >
                <span className="status-dot status-online" />
                <span>
                  <Bi
                    en="Seeking Intern / Fresher Opportunities"
                    vi="Sẵn sàng cho vị trí Thực tập / Fresher"
                  />
                </span>
              </div>
              <h3
                className="serif"
                style={{
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  margin: "0 0 10px",
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                <Bi
                  en="Interested in simulation, embedded, or R&D collaboration?"
                  vi="Bạn quan tâm đến việc hợp tác mô phỏng, nhúng hoặc nghiên cứu R&D?"
                />
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "var(--quiet)",
                }}
              >
                <Bi
                  en="Whether you're looking for an intern or fresher in computational modeling, KiCad PCB layout, embedded firmware, or scientific problem-solving, feel free to reach out via phone (+84 797 190 605) or email."
                  vi="Dù bạn đang tìm kiếm thực tập sinh hoặc kỹ sư fresher về tính toán mô phỏng, thiết kế mạch KiCad, firmware nhúng hay giải quyết bài toán kỹ thuật, tôi luôn sẵn sàng trao đổi."
                />
              </p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <Link className="button button-primary" href="/contact">
                <Bi en="Start a Conversation" vi="Bắt đầu kết nối" />
                <ArrowRight size={14} />
              </Link>
              <CopyEmailButton />
            </div>
          </div>
        </section>

        {/* OUTRO */}
        <div className="home-outro animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <span>
            <Bi
              en="Obsidian Craft & Engineered Clarity."
              vi="Thiết kế Obsidian & Chuẩn mực kỹ thuật."
            />
          </span>
          <span>Nguyen Trong Phat · HCMUS · 2026</span>
        </div>
      </div>
    </SiteShell>
  );
}
