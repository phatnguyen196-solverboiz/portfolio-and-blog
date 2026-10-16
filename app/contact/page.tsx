import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { ContactWidget } from "@/components/contact-widget";
import { MessageSquare, ShieldCheck, Zap } from "lucide-react";

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="wrap">
        {/* PAGE HEADER */}
        <header className="page-head animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div
            className="status-pill animate-fade-in-up"
            style={{ animationDelay: "0.05s", marginBottom: 16, display: "inline-flex" }}
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

          <p className="eyebrow">
            <Bi en="05 / 05 — Contact & Direct Inquiries" vi="05 / 05 — Liên hệ & Trao đổi trực tiếp" />
          </p>
          <h1 className="page-title">
            <Bi en="Let's connect." vi="Kết nối nhé." />
          </h1>
          <p className="page-intro">
            <Bi
              en="Whether you're exploring internship or fresher opportunities in scientific simulation, embedded firmware, PCB design, or R&D engineering, feel free to reach out via direct phone (+84 797 190 605), email, or the form below."
              vi="Dù bạn đang tìm kiếm thực tập sinh hoặc kỹ sư fresher về mô phỏng số, firmware nhúng, thiết kế mạch KiCad hay nghiên cứu R&D, hãy liên hệ trực tiếp qua số điện thoại (+84 797 190 605), email hoặc biểu mẫu bên dưới."
            />
          </p>
        </header>

        {/* 2-COLUMN CONTACT INTERACTION */}
        <section className="page-content" aria-label="Contact information and inquiry form">
          <ContactWidget />

          {/* COLLABORATION PRINCIPLES CARD */}
          <div
            className="glass-card animate-fade-in-up"
            style={{
              marginTop: 48,
              padding: "32px 28px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  color: "var(--accent-ink)",
                }}
              >
                <Zap size={16} />
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                  <Bi en="Fast Response Time" vi="Phản hồi nhanh chóng" />
                </h4>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "rgba(232, 230, 227, 0.75)",
                }}
              >
                <Bi
                  en="I monitor incoming messages closely. Expect a thoughtful reply within 2 to 4 hours during working hours (08:00 — 22:00 GMT+7)."
                  vi="Tôi thường xuyên kiểm tra hòm thư. Bạn sẽ nhận được phản hồi chi tiết trong vòng 2 đến 4 giờ làm việc (08:00 — 22:00 GMT+7)."
                />
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  color: "var(--accent-ink)",
                }}
              >
                <MessageSquare size={16} />
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                  <Bi en="Async & Written-First" vi="Giao tiếp bất đồng bộ" />
                </h4>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "rgba(232, 230, 227, 0.75)",
                }}
              >
                <Bi
                  en="Clear written context, reproducible examples, and structured agendas help us move faster and make decisions efficiently."
                  vi="Bối cảnh rõ ràng bằng văn bản, ví dụ cụ thể và nội dung cô đọng giúp công việc tiến triển nhanh chóng và chuẩn xác."
                />
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  color: "var(--accent-ink)",
                }}
              >
                <ShieldCheck size={16} />
                <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>
                  <Bi en="Engineering Standards" vi="Tiêu chuẩn kỹ thuật" />
                </h4>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "rgba(232, 230, 227, 0.75)",
                }}
              >
                <Bi
                  en="Dedicated to code craftsmanship, typed contracts, comprehensive automated testing, and zero-compromise security."
                  vi="Cam kết chất lượng mã nguồn, ràng buộc kiểu dữ liệu chặt chẽ, kiểm thử tự động toàn diện và bảo mật an toàn."
                />
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
