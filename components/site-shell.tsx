"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bi, LanguageSwitch } from "./language-switch";

const navigation = [
  { href: "/about", en: "About / CV", vi: "Giới thiệu / CV" },
  { href: "/projects", en: "Projects", vi: "Dự án" },
  { href: "/blog", en: "Technical Writing", vi: "Chia sẻ kỹ thuật" },
  { href: "/contact", en: "Contact", vi: "Liên hệ" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="wordmark" aria-label="Nguyen Trong Phat, home">
            <span className="wordmark-mark" aria-hidden="true">np.</span>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                marginLeft: 4,
                animation: "pulse 2s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <span className="wordmark-name">Nguyen Trong Phat</span>
          </Link>
          <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            {navigation.map(({ href, en, vi }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={active ? "nav-link active" : "nav-link"}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <Bi en={en} vi={vi} />
                </Link>
              );
            })}
          </nav>
          <LanguageSwitch />
          <button
            type="button"
            className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <div>
            <span>© {new Date().getFullYear()} Nguyen Trong Phat</span>
            <span style={{ display: "block", marginTop: 4, fontSize: 11, color: "var(--quiet)" }}>
              <Bi en="Built with care." vi="Xây dựng tận tâm." />
            </span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/phatnguyen196-solverboiz" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/tr%E1%BB%8Dng-ph%C3%A1t-nguy%E1%BB%85n-6714412bb/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <Link href="/admin"><Bi en="Editor" vi="Quản trị" /></Link>
            <button
              className="back-to-top"
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
            >
              ↑
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
