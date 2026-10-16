import Link from "next/link";
import { Bi, PrintButton } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { Timeline, EXPERIENCE_ITEMS, EDUCATION_ITEMS } from "@/components/timeline";
import { TechStack } from "@/components/tech-stack";
import { CopyEmailButton, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, Github, Linkedin } from "@/components/contact-widget";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="wrap">
        {/* PAGE HEADER */}
        <header className="page-head animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p className="eyebrow">
                <Bi en="01 / About & Experience" vi="01 / Giới thiệu & Kinh nghiệm" />
              </p>
              <h1 className="page-title">
                <Bi en="About & Curriculum Vitae." vi="Giới thiệu & Sơ yếu lý lịch." />
              </h1>
              <p className="page-intro">
                <Bi
                  en="Software engineer passionate about distributed systems, resilient cloud infrastructure, and pixel-precise interfaces."
                  vi="Kỹ sư phần mềm đam mê hệ thống phân tán, hạ tầng cloud bền bỉ và giao diện người dùng chuẩn xác đến từng pixel."
                />
              </p>
            </div>

            <div
              className="no-print"
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
                paddingTop: 12,
              }}
            >
              <PrintButton />
              <Link className="button button-primary" href="/contact">
                <Bi en="Get in touch" vi="Liên hệ trao đổi" />
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </header>

        <div className="page-content">
          {/* SECTION 1: NARRATIVE BIO & PHILOSOPHY */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="about-heading"
            style={{ animationDelay: "0.15s" }}
          >
            <div>
              <h2 id="about-heading" className="section-label">
                <Bi en="In Brief & Craft" vi="Tổng quan & Triết lý" />
              </h2>
            </div>
            <div className="prose">
              <p>
                <Bi
                  en="I'm Nguyen Trong Phat, a software engineer based in Ho Chi Minh City, Vietnam. My engineering work is grounded in systems thinking: building reliable services that scale gracefully under pressure, alongside high-precision frontend interfaces that respect user attention."
                  vi="Tôi là Nguyễn Trọng Phát, một kỹ sư phần mềm sinh sống và làm việc tại TP. Hồ Chí Minh, Việt Nam. Công việc của tôi xuất phát từ tư duy hệ thống: xây dựng các dịch vụ tin cậy, vận hành mượt mà dưới tải lớn, song hành với giao diện frontend chuẩn xác, tôn trọng trải nghiệm người dùng."
                />
              </p>
              <p>
                <Bi
                  en="I believe that enduring software is built on clean abstractions, solid database schemas, and thoughtful ergonomics. Whether architecting a distributed task scheduler with Go and Redis or crafting zero-flicker bilingual edge web applications, I value simplicity over cleverness and documentation over tribal knowledge."
                  vi="Tôi tin rằng một phần mềm bền vững được hình thành từ cấu trúc phân tách rõ ràng, lược đồ dữ liệu chặt chẽ và trải nghiệm người dùng tinh tế. Dù là thiết kế bộ điều phối tác vụ phân tán bằng Go và Redis hay tạo nên ứng dụng edge song ngữ mượt mà, tôi luôn đề cao sự đơn giản và tài liệu hóa chuẩn mực."
                />
              </p>
              <p>
                <Bi
                  en="Outside of writing code, I enjoy breaking down complex computer science concepts, benchmarking database queries, and exploring edge computing runtimes."
                  vi="Ngoài việc viết code, tôi yêu thích việc nghiên cứu các khái niệm khoa học máy tính chuyên sâu, đo lường tối ưu câu lệnh cơ sở dữ liệu và thử nghiệm các runtime tính toán tại biên (edge computing)."
                />
              </p>
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          {/* SECTION 2: EXPERIENCE TIMELINE */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="experience-heading"
            style={{ animationDelay: "0.2s" }}
          >
            <div>
              <h2 id="experience-heading" className="section-label">
                <Bi en="Experience" vi="Kinh nghiệm làm việc" />
              </h2>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                <Bi
                  en="Roles, impact metrics, and core responsibilities."
                  vi="Vai trò, kết quả đạt được và trách nhiệm chuyên môn."
                />
              </p>
            </div>
            <div>
              <Timeline items={EXPERIENCE_ITEMS} />
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          {/* SECTION 3: EDUCATION & HONORS */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="education-heading"
            style={{ animationDelay: "0.25s" }}
          >
            <div>
              <h2 id="education-heading" className="section-label">
                <Bi en="Education & Honors" vi="Học vấn & Thành tựu" />
              </h2>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                <Bi
                  en="Academic foundation and computer science coursework."
                  vi="Nền tảng học thuật và các môn học khoa học máy tính trọng tâm."
                />
              </p>
            </div>
            <div>
              <Timeline items={EDUCATION_ITEMS} dashed />
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          {/* SECTION 4: CORE TECHNICAL COMPETENCIES */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="skills-heading"
            style={{ animationDelay: "0.3s" }}
          >
            <div>
              <h2 id="skills-heading" className="section-label">
                <Bi en="Technical Skills" vi="Kỹ năng chuyên môn" />
              </h2>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                <Bi
                  en="Categorized breakdown of languages, frameworks, and infrastructure."
                  vi="Phân loại chi tiết các ngôn ngữ, framework và hạ tầng công nghệ."
                />
              </p>
            </div>
            <div>
              <TechStack filterInteractive={true} />
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          {/* SECTION 5: PROFILE OVERVIEW & DIRECT CONTACT */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="cv-heading"
            style={{ animationDelay: "0.35s" }}
          >
            <div>
              <h2 id="cv-heading" className="section-label">
                <Bi en="Key Information" vi="Thông tin cơ bản" />
              </h2>
            </div>
            <div>
              <dl className="cv-list">
                <div className="cv-row">
                  <dt>
                    <Bi en="Full Name" vi="Họ và tên" />
                  </dt>
                  <dd style={{ fontWeight: 600 }}>Nguyen Trong Phat</dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Location / Timezone" vi="Địa điểm / Múi giờ" />
                  </dt>
                  <dd>
                    <Bi
                      en="Ho Chi Minh City, Vietnam · UTC+7 (Indochina Time)"
                      vi="TP. Hồ Chí Minh, Việt Nam · UTC+7 (Giờ Đông Dương)"
                    />
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Focus Disciplines" vi="Lĩnh vực trọng tâm" />
                  </dt>
                  <dd>
                    <Bi
                      en="Full-Stack Systems, Distributed Worker Queues, Edge Runtimes, Clean Architecture"
                      vi="Hệ thống Full-Stack, Hàng đợi xử lý phân tán, Edge Runtimes, Kiến trúc mã sạch"
                    />
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Spoken Languages" vi="Ngôn ngữ" />
                  </dt>
                  <dd>
                    <Bi
                      en="Vietnamese (Native), English (Professional Working Proficiency)"
                      vi="Tiếng Việt (Bản ngữ), Tiếng Anh (Giao tiếp chuyên môn thành thạo)"
                    />
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>Email</dt>
                  <dd style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent-ink)",
                      }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                    <div className="no-print">
                      <CopyEmailButton />
                    </div>
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Public Profiles" vi="Hồ sơ công khai" />
                  </dt>
                  <dd style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--ink)",
                      }}
                    >
                      <Github size={14} />
                      <span>GitHub ↗</span>
                    </a>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        color: "var(--ink)",
                      }}
                    >
                      <Linkedin size={14} />
                      <span>LinkedIn ↗</span>
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="about-note">
                <Bi
                  en="Engineering with intentionality: striving for code that is simple to understand, predictable in execution, and resilient when failure occurs."
                  vi="Kỹ thuật phần mềm có chủ đích: hướng tới những dòng mã dễ hiểu, hoạt động dự đoán được và luôn kiên cường trước mọi sự cố."
                />
              </p>

              <div className="no-print" style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <PrintButton />
                <Link className="button button-secondary" href="/projects">
                  <Bi en="Explore Selected Work" vi="Xem dự án chọn lọc" />
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
