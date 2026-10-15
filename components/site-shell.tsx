"use client";

import type { ReactNode } from "react";
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

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="wordmark" aria-label="Nguyen Trong Phat, home">
            <span className="wordmark-mark" aria-hidden="true">np.</span>
            <span className="wordmark-name">Nguyen Trong Phat</span>
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            {navigation.map(({ href, en, vi }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={active ? "nav-link active" : "nav-link"}
                  aria-current={active ? "page" : undefined}
                >
                  <Bi en={en} vi={vi} />
                </Link>
              );
            })}
          </nav>
          <LanguageSwitch />
        </div>
      </header>
      <main className="site-main">{children}</main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Nguyen Trong Phat</span>
          <div className="footer-links">
            <a href="https://github.com/phatnguyen196-solverboiz" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/tr%E1%BB%8Dng-ph%C3%A1t-nguy%E1%BB%85n-6714412bb/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <Link href="/admin"><Bi en="Editor" vi="Quản trị" /></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
