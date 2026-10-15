import Link from "next/link";
import { Bi, PrintButton } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="wrap">
        <header className="page-head animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="eyebrow"><Bi en="01 / About" vi="01 / Giới thiệu" /></p>
          <h1 className="page-title"><Bi en="About / CV" vi="Giới thiệu / CV" /></h1>
          <p className="page-intro">
            <Bi
              en="A short introduction to my work and the person behind it."
              vi="Đôi nét về công việc và con người đứng sau những dòng mã."
            />
          </p>
        </header>
        <div className="page-content">
          <section className="editorial-grid animate-fade-in-up" aria-labelledby="about-heading" style={{ animationDelay: "0.2s" }}>
            <div>
              <h2 id="about-heading" className="section-label"><Bi en="In brief" vi="Đôi nét" /></h2>
            </div>
            <div className="prose">
              <p>
                <Bi
                  en="I'm Nguyen Trong Phat. My work is centered on building software and understanding the systems underneath it. I prefer clear solutions, careful details, and writing down what I learn along the way."
                  vi="Tôi là Nguyễn Trọng Phát. Tôi tập trung vào xây dựng phần mềm và tìm hiểu các hệ thống phía sau nó. Tôi quan tâm đến giải pháp rõ ràng, chi tiết được chăm chút và việc ghi lại những gì mình học được."
                />
              </p>
              <p>
                <Bi
                  en="This portfolio is an evolving record. I'll add projects as they are ready to share; the writing section is reserved for technical explanations, notes, and lessons from implementation."
                  vi="Portfolio này sẽ tiếp tục được cập nhật. Tôi sẽ đăng dự án khi chúng sẵn sàng; mục bài viết dành riêng cho giải thích kỹ thuật, ghi chú và những điều rút ra trong quá trình thực hiện."
                />
              </p>
            </div>
          </section>

          <hr className="rule" style={{ margin: "56px 0 46px" }} />

          <section className="editorial-grid animate-fade-in-up" aria-labelledby="cv-heading" style={{ animationDelay: "0.3s" }}>
            <div>
              <h2 id="cv-heading" className="section-label"><Bi en="CV / Overview" vi="CV / Tổng quan" /></h2>
            </div>
            <div>
              <dl className="cv-list">
                <div className="cv-row">
                  <dt><Bi en="Name" vi="Họ tên" /></dt>
                  <dd>Nguyen Trong Phat</dd>
                </div>
                <div className="cv-row">
                  <dt><Bi en="Interests" vi="Quan tâm" /></dt>
                  <dd><Bi en="Software development, practical systems, technical communication" vi="Phát triển phần mềm, hệ thống ứng dụng, chia sẻ kiến thức kỹ thuật" /></dd>
                </div>
                <div className="cv-row">
                  <dt><Bi en="Public work" vi="Công việc công khai" /></dt>
                  <dd><Link href="/projects" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}><Bi en="Projects page" vi="Trang dự án" /></Link> · <Link href="/blog" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}><Bi en="Technical writing" vi="Chia sẻ kỹ thuật" /></Link></dd>
                </div>
                <div className="cv-row">
                  <dt>Email</dt>
                  <dd><a href="mailto:phatnguyen1962005@gmail.com" style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>phatnguyen1962005@gmail.com</a></dd>
                </div>
              </dl>
              <p className="about-note">
                <Bi
                  en="This is a concise public overview. More detailed experience and qualifications can be added here as the CV is finalized."
                  vi="Đây là phần tóm tắt công khai. Kinh nghiệm và thông tin chi tiết sẽ được bổ sung khi CV hoàn thiện."
                />
              </p>
              <div style={{ marginTop: 32 }}><PrintButton /></div>
            </div>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
