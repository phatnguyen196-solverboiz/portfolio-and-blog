"use client";

import { useEffect, useState } from "react";

type Language = "en" | "vi";

function setLanguage(next: Language) {
  document.documentElement.dataset.lang = next;
  document.documentElement.lang = next;
  window.localStorage.setItem("portfolio-language", next);
}

export function LanguageSwitch() {
  const [language, updateLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-language");
    const next: Language = stored === "vi" ? "vi" : "en";
    updateLanguage(next);
    setLanguage(next);
  }, []);

  return (
    <button
      className="language-switch"
      type="button"
      aria-label={language === "en" ? "Switch to Vietnamese" : "Chuyển sang tiếng Anh"}
      onClick={() => {
        const next = language === "en" ? "vi" : "en";
        updateLanguage(next);
        setLanguage(next);
      }}
    >
      <span className={language === "en" ? "selected" : undefined}>EN</span>
      <span className="slash" aria-hidden="true">/</span>
      <span className={language === "vi" ? "selected" : undefined}>VI</span>
    </button>
  );
}

export function Bi({ en, vi }: { en: string; vi: string }) {
  return (
    <>
      <span className="lang-en" lang="en">{en}</span>
      <span className="lang-vi" lang="vi">{vi}</span>
    </>
  );
}

export function PrintButton() {
  return (
    <button className="button-secondary no-print" type="button" onClick={() => window.print()}>
      <Bi en="Print this page" vi="In trang này" />
      <span aria-hidden="true">↗</span>
    </button>
  );
}
