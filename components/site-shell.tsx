"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Bi, LanguageSwitch } from "./language-switch";
import { CommandMenu } from "./command-menu";

const navigation = [
  { href: "/about", en: "About / CV", vi: "Giới thiệu / CV" },
  { href: "/projects", en: "Projects", vi: "Dự án" },
  { href: "/blog", en: "Technical Blog", vi: "Blog Kỹ thuật" },
  { href: "/achievements", en: "Achievements", vi: "Thành tựu" },
  { href: "/contact", en: "Contact", vi: "Liên hệ" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="site-shell">
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="/" className="wordmark" aria-label="Nguyen Trong Phat, home">
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                marginRight: 8,
                boxShadow: "0 0 10px rgba(129, 140, 248, 0.7)",
                animation: "pulse 2s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <span className="wordmark-name">Nguyen Trong Phat</span>
          </a>
          <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            {navigation.map(({ href, en, vi }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
              return (
                <a
                  key={href}
                  href={href}
                  className={active ? "nav-link active" : "nav-link"}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <Bi en={en} vi={vi} />
                </a>
              );
            })}
            {/* Quick search button inside mobile menu */}
            {menuOpen && (
              <button
                type="button"
                className="button-secondary button-sm no-print"
                style={{ marginTop: 12, width: "100%", justifyContent: "space-between" }}
                onClick={() => {
                  setMenuOpen(false);
                  setCommandOpen(true);
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Search size={14} />
                  <Bi en="Search & Commands" vi="Tìm kiếm & Thao tác" />
                </span>
                <span className="cmd-shortcut">⌘K</span>
              </button>
            )}
          </nav>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <button
              className="button-secondary button-sm no-print"
              onClick={() => setCommandOpen(true)}
              title="Quick actions (⌘K)"
              type="button"
              aria-label="Quick actions (Command+K)"
            >
              <Search size={14} />
              <span className="cmd-shortcut">⌘K</span>
            </button>
            <LanguageSwitch />
          </div>
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
