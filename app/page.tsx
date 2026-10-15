import Link from "next/link";
import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";

const destinations = [
  {
    number: "01",
    href: "/about",
    title: { en: "About / CV", vi: "Giới thiệu / CV" },
    description: { en: "Background, interests, and a concise résumé.", vi: "Thông tin, mối quan tâm và CV tóm tắt." },
  },
  {
    number: "02",
    href: "/projects",
    title: { en: "Projects", vi: "Dự án" },
    description: { en: "Selected work will appear here when ready.", vi: "Các dự án chọn lọc sẽ xuất hiện khi hoàn thiện." },
  },
  {
    number: "03",
    href: "/blog",
    title: { en: "Technical Writing", vi: "Chia sẻ kỹ thuật" },
    description: { en: "Practical notes on how things are built.", vi: "Ghi chép thực tế về cách xây dựng sản phẩm." },
  },
  {
    number: "04",
    href: "/contact",
    title: { en: "Contact", vi: "Liên hệ" },
    description: { en: "Email, GitHub, and LinkedIn.", vi: "Email, GitHub và LinkedIn." },
  },
];

export default function Home() {
  return (
    <SiteShell>
      <div className="wrap">
        <section className="home-hero" aria-labelledby="home-title">
          <div>
            <p className="eyebrow animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Bi en="Portfolio & technical writing" vi="Portfolio & chia sẻ kỹ thuật" />
            </p>
            <h1 id="home-title" className="hero-title serif animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Nguyen<br />Trong <em>Phat.</em>
            </h1>
          </div>
          <div className="hero-aside animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p>
              <Bi
                en="I build software, document what I learn, and share the decisions behind the work."
                vi="Tôi xây dựng phần mềm, ghi lại điều mình học và chia sẻ những quyết định kỹ thuật đằng sau công việc."
              />
            </p>
            <Link className="button" href="/about">
              <Bi en="More about me" vi="Tìm hiểu thêm" /> <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="home-index" aria-labelledby="explore-title">
          <div className="index-head animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <h2 id="explore-title" className="eyebrow" style={{ margin: 0 }}>
              <Bi en="Explore" vi="Khám phá" />
            </h2>
            <span className="muted"><Bi en="Four separate spaces" vi="Bốn trang riêng biệt" /></span>
          </div>
          {destinations.map((item, idx) => (
            <Link
              href={item.href}
              className="index-row animate-fade-in-up"
              key={item.number}
              style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
            >
              <span className="index-number">{item.number}</span>
              <span className="index-title"><Bi en={item.title.en} vi={item.title.vi} /></span>
              <span className="index-description"><Bi en={item.description.en} vi={item.description.vi} /></span>
              <span className="index-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </section>
        <div className="home-outro animate-fade-in-up" style={{ animationDelay: "1.0s" }}>
          <span><Bi en="Built to grow with the work." vi="Một không gian sẽ phát triển cùng công việc." /></span>
          <span>Nguyen Trong Phat · 2026</span>
        </div>
      </div>
    </SiteShell>
  );
}
