import Link from "next/link";
import { Bi, PrintButton } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { Timeline, EXPERIENCE_ITEMS, EDUCATION_ITEMS } from "@/components/timeline";
import { TechStack } from "@/components/tech-stack";
import { CopyEmailButton, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, Github, Linkedin } from "@/components/contact-widget";
import { ArrowRight, Phone, Mail, MapPin, GraduationCap, Compass } from "lucide-react";

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
                <Bi en="01 / 05 — About & Background" vi="01 / 05 — Giới thiệu & Hồ sơ năng lực" />
              </p>
              <h1 className="page-title">
                <Bi en="About & Curriculum Vitae." vi="Giới thiệu & Sơ yếu lý lịch." />
              </h1>
              <p className="page-intro">
                <Bi
                  en="Engineering Physics student at HCMUS (VNU-HCM), specializing in Computational Physics, numerical simulations, and embedded instrumentation."
                  vi="Sinh viên ngành Vật lý Kỹ thuật (Công nghệ Vật lý) tại HCMUS, chuyên sâu về Vật lý Tin học, tính toán mô phỏng và phần cứng nhúng."
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
                <Bi en="Get in touch" vi="Liên hệ trực tiếp" />
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
                <Bi en="In Brief & Philosophy" vi="Về bản thân & Triết lý" />
              </h2>
            </div>
            <div className="prose">
              <p>
                <Bi
                  en="I'm Nguyen Trong Phat, an Engineering Physics student at VNUHCM — University of Science (HCMUS), cohort 2023 – 2027. My technical focus is Computational Physics, Modeling & Simulation, bridging the gap between rigorous mathematical physics and real-world hardware engineering."
                  vi="Tôi là Nguyễn Trọng Phát, sinh viên ngành Vật lý Kỹ thuật (Công nghệ Vật lý) tại Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM (HCMUS), niên khóa 2023 – 2027. Hướng chuyên môn của tôi là Vật lý Tin học, Tính toán và Mô phỏng — kết nối giữa nền tảng toán lý với ứng dụng kỹ thuật và phần cứng thực tế."
                />
              </p>
              <p>
                <Bi
                  en="I am an intrinsically motivated self-learner who thrives on research, systematic problem-solving, and continuous optimization. Whether developing computational algorithms in Python, modeling physical systems in MATLAB, writing high-performance logic in C++, or capturing schematics and laying out PCBs in KiCad, I take pride in understanding systems down to their fundamental principles."
                  vi="Tôi là người có tinh thần tự học cao, say mê nghiên cứu khoa học, kiên trì giải quyết vấn đề và luôn hướng tới việc tối ưu hóa. Dù là xây dựng thuật toán tính toán bằng Python, mô phỏng hệ vật lý trong MATLAB, viết mã nguồn hiệu năng cao với C++, hay thiết kế sơ đồ mạch in trên KiCad, tôi luôn nỗ lực thấu hiểu cặn kẽ bản chất từ gốc rễ."
                />
              </p>
              <p>
                <Bi
                  en="I am actively seeking internship and fresher opportunities where I can apply my computational modeling, embedded programming, and hardware prototyping skills to real engineering projects, learn from experienced mentors, and contribute meaningfully to the team."
                  vi="Tôi đang tích cực tìm kiếm các cơ hội thực tập (Internship) và vị trí Fresher để áp dụng kiến thức mô phỏng tính toán, lập trình nhúng và kỹ năng đo kiểm phần cứng vào các dự án kỹ thuật thực tế, học hỏi từ các chuyên gia và đóng góp cho tổ chức."
                />
              </p>
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          {/* SECTION 2: EDUCATION */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="education-heading"
            style={{ animationDelay: "0.2s" }}
          >
            <div>
              <h2 id="education-heading" className="section-label">
                <Bi en="Education" vi="Học vấn & Đào tạo" />
              </h2>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                <Bi
                  en="University degree, major concentration, and GPA."
                  vi="Bằng cấp đại học, chuyên ngành và điểm tích lũy."
                />
              </p>
            </div>
            <div>
              <Timeline items={EDUCATION_ITEMS} dashed />
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          {/* SECTION 3: SKILLS */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="skills-heading"
            style={{ animationDelay: "0.25s" }}
          >
            <div>
              <h2 id="skills-heading" className="section-label">
                <Bi en="Technical Tooling" vi="Công cụ Kỹ thuật" />
              </h2>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                <Bi
                  en="Programming, scientific software, CAD, and laboratory instruments."
                  vi="Ngôn ngữ lập trình, phần mềm khoa học, CAD và thiết bị đo kiểm."
                />
              </p>
            </div>
            <div>
              <TechStack filterInteractive={true} />
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          {/* SECTION 4: EXPERIENCE & OBJECTIVES */}
          <section
            className="editorial-grid animate-fade-in-up"
            aria-labelledby="experience-heading"
            style={{ animationDelay: "0.3s" }}
          >
            <div>
              <h2 id="experience-heading" className="section-label">
                <Bi en="Journey & Goals" vi="Hành trình & Mục tiêu" />
              </h2>
              <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>
                <Bi
                  en="Academic activities and prospective internship domains."
                  vi="Hoạt động học tập và các lĩnh vực thực tập hướng tới."
                />
              </p>
            </div>
            <div>
              <Timeline items={EXPERIENCE_ITEMS} />
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
                <Bi en="Key Information" vi="Thông tin liên hệ" />
              </h2>
            </div>
            <div>
              <dl className="cv-list">
                <div className="cv-row">
                  <dt>
                    <Bi en="Full Name" vi="Họ và tên" />
                  </dt>
                  <dd style={{ fontWeight: 600 }}>Nguyen Trong Phat (Nguyễn Trọng Phát)</dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="University" vi="Trường Đại học" />
                  </dt>
                  <dd>
                    <Bi
                      en="VNUHCM — University of Science (HCMUS) · Cohort 2023 — 2027"
                      vi="Trường ĐH Khoa học Tự nhiên, ĐHQG-HCM · Niên khóa 2023 — 2027"
                    />
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Major & Specialization" vi="Chuyên ngành" />
                  </dt>
                  <dd>
                    <Bi
                      en="Engineering Physics · Computational Physics & Simulation"
                      vi="Vật lý Kỹ thuật · Vật lý Tin học, Tính toán & Mô phỏng"
                    />
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Academic GPA" vi="Điểm tích lũy" />
                  </dt>
                  <dd style={{ fontFamily: "monospace", color: "#34d399", fontWeight: 600 }}>
                    3.08 / 4.0
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Phone Number" vi="Số điện thoại" />
                  </dt>
                  <dd>
                    <a href="tel:+84797190605" style={{ color: "var(--accent-ink)", fontWeight: 500 }}>
                      +84 797 190 605
                    </a>
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Email Address" vi="Thư điện tử" />
                  </dt>
                  <dd style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <a href="mailto:phatnguyen1962005@gmail.com" style={{ color: "var(--ink)" }}>
                      phatnguyen1962005@gmail.com
                    </a>
                    <CopyEmailButton />
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Location" vi="Khu vực làm việc" />
                  </dt>
                  <dd>
                    <Bi
                      en="Ho Chi Minh City, Vietnam (Open to On-site, Hybrid, Remote)"
                      vi="TP. Hồ Chí Minh, Việt Nam (Linh hoạt Trực tiếp, Hybrid, Từ xa)"
                    />
                  </dd>
                </div>
                <div className="cv-row">
                  <dt>
                    <Bi en="Target Roles" vi="Vị trí ứng tuyển" />
                  </dt>
                  <dd>
                    <Bi
                      en="Computational Physics / Simulation Intern · Embedded Systems & IoT Intern · Hardware & Firmware Prototyping · R&D Engineering Intern"
                      vi="Thực tập sinh Mô phỏng Tính toán · Kỹ sư Thực tập Nhúng & IoT · Thiết kế Phần cứng KiCad / Firmware · Thực tập sinh R&D"
                    />
                  </dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
