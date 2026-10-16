import Link from "next/link";
import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { TechStack } from "@/components/tech-stack";
import { CopyEmailButton, Github } from "@/components/contact-widget";
import { ExternalLink, ArrowRight } from "lucide-react";

const destinations = [
  {
    number: "01",
    href: "/about",
    title: { en: "About / CV", vi: "Giới thiệu / CV" },
    description: {
      en: "Background, engineering philosophy, career timeline, and résumé.",
      vi: "Tiểu sử, triết lý kỹ thuật, tiến trình sự nghiệp và CV chi tiết.",
    },
  },
  {
    number: "02",
    href: "/projects",
    title: { en: "Selected Work", vi: "Dự án chọn lọc" },
    description: {
      en: "Flagship systems, edge architectures, and collaborative experiments.",
      vi: "Các hệ thống tiêu biểu, kiến trúc edge và ứng dụng cộng tác thời gian thực.",
    },
  },
  {
    number: "03",
    href: "/blog",
    title: { en: "Technical Blog", vi: "Blog Kỹ thuật" },
    description: {
      en: "Deep dives on distributed systems, edge runtimes, and database modeling.",
      vi: "Ghi chép chuyên sâu về hệ thống phân tán, edge runtimes và mô hình hóa dữ liệu.",
    },
  },
  {
    number: "04",
    href: "/achievements",
    title: { en: "Key Achievements & Awards", vi: "Thành tựu & Giải thưởng" },
    description: {
      en: "Competitive hackathons, cloud certifications, production scale, and honors.",
      vi: "Giải thưởng hackathon, chứng chỉ đám mây, quy mô hệ thống và danh hiệu học thuật.",
    },
  },
  {
    number: "05",
    href: "/contact",
    title: { en: "Contact & Availability", vi: "Liên hệ & Trạng thái" },
    description: {
      en: "Live timezone indicator, 1-click clipboard email, and direct inquiry form.",
      vi: "Đồng hồ múi giờ thời gian thực, sao chép email 1 chạm và biểu mẫu nhắn tin.",
    },
  },
];

const featuredProjects = [
  {
    id: "task-queue",
    titleEn: "Distributed Task Queue & Job Scheduler",
    titleVi: "Hệ thống điều phối hàng đợi tác vụ & Lập lịch phân tán",
    categoryEn: "Systems & Backend",
    categoryVi: "Hệ thống & Backend",
    statusBadge: "Production Ready",
    summaryEn:
      "A high-throughput distributed task scheduling engine built with Go and Redis, featuring dead-letter queues, exponential backoff retries, and fault-tolerant worker pools.",
    summaryVi:
      "Hệ thống điều phối hàng đợi tác vụ phân tán hiệu năng cao viết bằng Go và Redis, tích hợp hàng đợi dead-letter, cơ chế retry hồi quy và chịu lỗi worker pools.",
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
    categoryEn: "Full-Stack & Edge",
    categoryVi: "Full-Stack & Edge",
    statusBadge: "Active Showcase",
    summaryEn:
      "High-density editorial CMS and technical portfolio platform deployed on Cloudflare Workers edge runtime with zero client-side hydration penalty and instantaneous EN/VI localization.",
    summaryVi:
      "Nền tảng CMS và portfolio kỹ thuật triển khai trực tiếp trên edge runtime của Cloudflare Workers với tốc độ tải trang cực nhanh và hỗ trợ song ngữ EN/VI tức thì.",
    highlightEn: "Sub-50ms global TTFB · Type-safe Drizzle ORM schema · Zero layout-shift bilingual architecture",
    highlightVi: "TTFB toàn cầu dưới 50ms · Schema chặt chẽ với Drizzle ORM · Kiến trúc song ngữ không giật khung hình",
    tags: ["Next.js 16", "TypeScript", "Cloudflare", "Drizzle ORM", "Tailwind CSS"],
    githubUrl: "https://github.com/phatnguyen196-solverboiz/portfolio-and-blog",
    demoUrl: "https://phatnguyen.dev",
  },
  {
    id: "collab-canvas",
    titleEn: "Real-Time Code Collaboration Canvas",
    titleVi: "Bảng vẽ & Trình soạn thảo mã nguồn cộng tác thời gian thực",
    categoryEn: "Frontend & Systems",
    categoryVi: "Frontend & Hệ thống",
    statusBadge: "Open Source",
    summaryEn:
      "In-browser peer-to-peer collaborative code editor and whiteboard featuring conflict-free replicated data types (CRDTs), syntax highlighting, and live audio-visual presence.",
    summaryVi:
      "Trình biên tập mã nguồn và bảng vẽ cộng tác thời gian thực chạy trên trình duyệt, ứng dụng cấu trúc dữ liệu CRDT, tô sáng cú pháp và hiển thị con trỏ trực tiếp.",
    highlightEn: "Conflict-free state sync with Yjs & WebSockets · Under 20ms sync latency · In-browser WebAssembly sandbox",
    highlightVi: "Đồng bộ không xung đột với Yjs & WebSockets · Độ trễ dưới 20ms · Trình chạy mã nguồn WebAssembly trực tiếp",
    tags: ["React 19", "TypeScript", "WebSockets", "CRDTs", "Tailwind CSS"],
    githubUrl: "https://github.com/phatnguyen196-solverboiz/collaborative-code-canvas",
    demoUrl: "https://canvas.phatnguyen.dev",
  },
];

const featuredArticles = [
  {
    slug: "designing-high-throughput-background-job-workers",
    titleEn: "Designing High-Throughput Background Job Workers in Distributed Systems",
    titleVi: "Thiết kế hệ thống xử lý tác vụ nền thông lượng cao trong hệ thống phân tán",
    date: "Mar 2026",
    readTime: "7 min read",
    readTimeVi: "7 phút đọc",
    excerptEn:
      "An architectural deep-dive into worker pool concurrency patterns, backoff strategies, and dead-letter pipelines under intense traffic spikes.",
    excerptVi:
      "Phân tích kiến trúc chuyên sâu về mô hình worker pool đa luồng, chiến lược retry hồi quy và xử lý dead-letter khi lưu lượng tăng đột biến.",
    tags: ["Distributed Systems", "Go", "Redis", "Concurrency"],
  },
  {
    slug: "zero-latency-edge-rendering-nextjs-cloudflare",
    titleEn: "Zero-Latency Edge Rendering: Next.js with Cloudflare Workers Architecture",
    titleVi: "Kết xuất tại Edge không độ trễ: Kiến trúc Next.js cùng Cloudflare Workers",
    date: "Feb 2026",
    readTime: "5 min read",
    readTimeVi: "5 phút đọc",
    excerptEn:
      "How to eliminate cold starts and hydration flickers while deploying Next.js applications across distributed edge data centers worldwide.",
    excerptVi:
      "Phương pháp triệt tiêu hiện tượng khởi động nguội và giật giao diện khi triển khai Next.js trên mạng lưới edge data centers toàn cầu.",
    tags: ["Next.js 16", "Cloudflare", "Edge Computing", "Performance"],
  },
  {
    slug: "type-safe-database-modeling-drizzle-postgresql",
    titleEn: "Type-Safe Database Modeling with Drizzle ORM and PostgreSQL",
    titleVi: "Mô hình hóa cơ sở dữ liệu Type-Safe với Drizzle ORM và PostgreSQL",
    date: "Jan 2026",
    readTime: "9 min read",
    readTimeVi: "9 phút đọc",
    excerptEn:
      "Practical lessons architecting robust relational schemas, zero-downtime migrations, and composite index tuning in TypeScript applications.",
    excerptVi:
      "Kinh nghiệm thực tiễn thiết kế schema quan hệ vững chắc, di chuyển dữ liệu không gián đoạn và tối ưu chỉ mục phức hợp bằng TypeScript.",
    tags: ["PostgreSQL", "Drizzle ORM", "TypeScript", "Databases"],
  },
];

export default function Home() {
  return (
    <SiteShell>
      <div className="wrap">
        {/* HERO SECTION */}
        <section className="home-hero" aria-labelledby="home-title">
          <div>
            {/* Live Availability Status Pill */}
            <div
              className="status-pill animate-fade-in-up"
              style={{ animationDelay: "0.05s", marginBottom: 18 }}
            >
              <span className="status-dot status-online" />
              <span>
                <Bi
                  en="Available for Software Engineering Roles"
                  vi="Sẵn sàng cho các cơ hội kỹ sư phần mềm"
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
                en="Software Engineer · Systems & Full-Stack"
                vi="Kỹ sư phần mềm · Hệ thống & Full-Stack"
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

          <div className="hero-aside animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p>
              <Bi
                en="I build resilient full-stack applications, distributed services, and high-precision user interfaces. Focused on performance, system design, and clean architecture."
                vi="Tôi phát triển các ứng dụng full-stack bền bỉ, dịch vụ phân tán và giao diện người dùng độ chuẩn xác cao. Chú trọng hiệu năng, thiết kế hệ thống và kiến trúc mã sạch."
              />
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <a className="button button-primary" href="/projects">
                <Bi en="View Selected Work" vi="Xem dự án chọn lọc" />
                <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href="/contact">
                <Bi en="Get in Touch" vi="Liên hệ trao đổi" />
              </a>
              <CopyEmailButton />
            </div>
          </div>
        </section>

        {/* FEATURED WORK SPOTLIGHT */}
        <section
          style={{ paddingTop: 64, paddingBottom: 64, borderTop: "1px solid var(--line)" }}
          aria-labelledby="featured-work-heading"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 36,
              flexWrap: "wrap",
              gap: 16,
            }}
            className="animate-fade-in-up"
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                <Bi en="Proof of Work" vi="Sản phẩm tiêu biểu" />
              </p>
              <h2
                id="featured-work-heading"
                className="serif"
                style={{ fontSize: "clamp(30px, 4vw, 44px)", margin: 0, letterSpacing: "-0.03em" }}
              >
                <Bi en="Featured Projects." vi="Dự án nổi bật." />
              </h2>
            </div>
            <a
              href="/projects"
              className="post-more"
              style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Bi en="View all projects & case studies" vi="Xem tất cả dự án & nghiên cứu" />
              <ArrowRight size={14} />
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="glow-card animate-fade-in-up"
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${0.2 + idx * 0.1}s`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 14,
                    }}
                  >
                    <span className="badge badge-sm badge-accent">
                      <Bi en={project.categoryEn} vi={project.categoryVi} />
                    </span>
                    <span
                      className="badge badge-sm badge-outline"
                      style={{ fontSize: 10, color: "var(--quiet)" }}
                    >
                      {project.statusBadge}
                    </span>
                  </div>

                  <h3
                    className="serif"
                    style={{
                      fontSize: 22,
                      margin: "0 0 10px",
                      lineHeight: 1.3,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    <Bi en={project.titleEn} vi={project.titleVi} />
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: "rgba(232, 230, 227, 0.78)",
                      margin: "0 0 14px",
                    }}
                  >
                    <Bi en={project.summaryEn} vi={project.summaryVi} />
                  </p>

                  <div
                    style={{
                      padding: "8px 12px",
                      background: "rgba(99, 102, 241, 0.05)",
                      border: "1px solid rgba(99, 102, 241, 0.15)",
                      borderRadius: 6,
                      fontSize: 11,
                      color: "var(--accent-ink)",
                      marginBottom: 18,
                      lineHeight: 1.5,
                    }}
                  >
                    <Bi en={project.highlightEn} vi={project.highlightVi} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
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

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      borderTop: "1px solid var(--line)",
                      paddingTop: 14,
                    }}
                  >
                    <a
                      href={`/projects#${project.id}`}
                      className="button-sm button-primary"
                      style={{ textDecoration: "none" }}
                    >
                      <span><Bi en="View Architecture" vi="Xem kiến trúc chi tiết" /></span>
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-sm button-secondary"
                      style={{ textDecoration: "none" }}
                    >
                      <Github size={12} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
                en="Modern web frameworks, distributed backend patterns, relational databases, and edge infrastructure used to deliver resilient production software."
                vi="Các framework hiện đại, kiến trúc backend phân tán, cơ sở dữ liệu quan hệ và hạ tầng edge phục vụ triển khai phần mềm bền vững."
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
            <a
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
            </a>
          ))}
        </section>

        {/* TECHNICAL WRITING PREVIEW */}
        <section
          style={{ paddingTop: 64, paddingBottom: 64, borderTop: "1px solid var(--line)" }}
          aria-labelledby="writing-preview-heading"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 36,
              flexWrap: "wrap",
              gap: 16,
            }}
            className="animate-fade-in-up"
          >
            <div>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                <Bi en="Engineering Notes" vi="Ghi chép kỹ thuật" />
              </p>
              <h2
                id="writing-preview-heading"
                className="serif"
                style={{ fontSize: "clamp(30px, 4vw, 44px)", margin: 0, letterSpacing: "-0.03em" }}
              >
                <Bi en="Recent Technical Blog." vi="Blog Kỹ thuật mới nhất." />
              </h2>
            </div>
            <a
              href="/blog"
              className="post-more"
              style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <Bi en="View all articles & deep-dives" vi="Xem tất cả bài viết & phân tích" />
              <ArrowRight size={14} />
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {featuredArticles.map((article, idx) => (
              <article
                key={article.slug}
                className="glass-card animate-fade-in-up"
                style={{
                  padding: "26px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  animationDelay: `${0.2 + idx * 0.1}s`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 12,
                      fontSize: 11,
                      color: "var(--quiet)",
                    }}
                  >
                    <span>{article.date}</span>
                    <span className="badge badge-sm badge-outline">
                      <Bi en={article.readTime} vi={article.readTimeVi} />
                    </span>
                  </div>

                  <h3
                    className="serif"
                    style={{
                      fontSize: 19,
                      margin: "0 0 10px",
                      lineHeight: 1.35,
                      letterSpacing: "-0.015em",
                      color: "var(--ink)",
                    }}
                  >
                    <Link href="/blog" style={{ color: "inherit" }}>
                      <Bi en={article.titleEn} vi={article.titleVi} />
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
                    <Bi en={article.excerptEn} vi={article.excerptVi} />
                  </p>
                </div>

                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="badge badge-sm badge-outline"
                        style={{ fontSize: 10 }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/blog"
                    className="post-more"
                    style={{ fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}
                  >
                    <Bi en="Read deep-dive" vi="Đọc bài phân tích" />
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
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
            <div style={{ maxWidth: 540 }}>
              <div
                className="status-pill"
                style={{ marginBottom: 14, display: "inline-flex" }}
              >
                <span className="status-dot status-online" />
                <span>
                  <Bi
                    en="Available for new opportunities"
                    vi="Sẵn sàng đón nhận cơ hội mới"
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
                  en="Interested in building impactful software together?"
                  vi="Bạn quan tâm đến việc cùng xây dựng phần mềm chất lượng?"
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
                  en="Whether you have an engineering role, a system architecture discussion, or an open-source collaboration in mind, I'd love to connect."
                  vi="Dù là cơ hội việc làm kỹ sư, thảo luận kiến trúc hệ thống hay hợp tác mã nguồn mở, tôi luôn sẵn sàng lắng nghe."
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
          <span>Nguyen Trong Phat · 2026</span>
        </div>
      </div>
    </SiteShell>
  );
}
