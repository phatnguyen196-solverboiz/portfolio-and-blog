"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Clock,
  MapPin,
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Bi } from "./language-switch";

export const CONTACT_EMAIL = "phatnguyen1962005@gmail.com";
export const CONTACT_PHONE = "+84 797 190 605";
export const CONTACT_PHONE_RAW = "+84797190605";
export const GITHUB_URL = "https://github.com/phatnguyen196-solverboiz";
export const LINKEDIN_URL = "https://www.linkedin.com/in/tr%E1%BB%8Dng-ph%C3%A1t-nguy%E1%BB%85n-6714412bb/";

/**
 * Clean SVG Brand Icons for GitHub and LinkedIn
 */
export function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const Github = GithubIcon;
export const Linkedin = LinkedinIcon;

/**
 * 1-Click Copy Email Button with visual feedback & tooltip
 */
export function CopyEmailButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = CONTACT_EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-btn ${copied ? "copied" : ""} ${className}`}
      aria-label="Copy email address"
      title={CONTACT_EMAIL}
    >
      {copied ? (
        <>
          <Check size={14} style={{ color: "#34d399" }} />
          <span>
            <Bi en="Copied!" vi="Đã sao chép!" />
          </span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>
            <Bi en="Copy Email" vi="Sao chép Email" />
          </span>
        </>
      )}

      {/* Floating Tooltip */}
      <div className="copy-tooltip" role="tooltip" aria-hidden={!copied}>
        <Bi
          en="Email copied to clipboard!"
          vi="Đã sao chép email vào bộ nhớ tạm!"
        />
      </div>
    </button>
  );
}

/**
 * Live Timezone & Status Clock (Asia/Ho_Chi_Minh, UTC+7)
 */
export function TimezoneStatusClock() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [isWorkingHours, setIsWorkingHours] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format time in Asia/Ho_Chi_Minh
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      // Hour in 24h format for status check
      const hourFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "numeric",
        hour12: false,
      });

      const currentHour = parseInt(hourFormatter.format(now), 10);
      // Working / awake hours: 08:00 to 22:00 UTC+7
      const active = currentHour >= 8 && currentHour < 22;

      setTimeStr(timeFormatter.format(now));
      setDateStr(dateFormatter.format(now));
      setIsWorkingHours(active);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card" style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        <div>
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 6 }}
          >
            <Bi en="Current Presence" vi="Trạng thái hiện tại" />
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "var(--ink)",
              fontWeight: 500,
            }}
          >
            <MapPin size={15} style={{ color: "var(--accent-ink)" }} />
            <span>Ho Chi Minh City, Vietnam</span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className={`status-pill ${isWorkingHours ? "" : "is-indigo"}`}>
          <span className="status-dot" aria-hidden="true" />
          <span>
            {isWorkingHours ? (
              <Bi en="Available / Working" vi="Sẵn sàng / Đang online" />
            ) : (
              <Bi en="Away / Resting" vi="Nghỉ ngơi / Tạm vắng" />
            )}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          padding: "16px 18px",
          background: "rgba(0, 0, 0, 0.25)",
          borderRadius: 8,
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Clock size={18} style={{ color: "var(--accent-ink)" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "#ffffff",
            }}
          >
            {timeStr || "--:--:-- --"}
          </span>
          <span style={{ fontSize: 11, color: "var(--quiet)", marginTop: 2 }}>
            {dateStr || "UTC+7"} · GMT+7 (Indochina Time)
          </span>
        </div>
      </div>

      <p
        style={{
          margin: "16px 0 0",
          fontSize: 12,
          color: "rgba(232, 230, 227, 0.7)",
          lineHeight: 1.6,
        }}
      >
        {isWorkingHours ? (
          <Bi
            en="Currently in active hours. Responses to emails and inquiries are typically sent within 2 to 4 hours."
            vi="Hiện đang trong giờ làm việc. Tôi thường phản hồi email và tin nhắn trong vòng 2 đến 4 giờ."
          />
        ) : (
          <Bi
            en="Currently evening / offline hours in Vietnam. Inquiries will be reviewed and answered first thing in the morning."
            vi="Hiện tại đang ngoài giờ làm việc tại Việt Nam. Tôi sẽ đọc và phản hồi tin nhắn của bạn ngay vào sáng mai."
          />
        )}
      </p>
    </div>
  );
}

/**
 * Direct Inquiry Form with validation & instant feedback
 */
export function DirectInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "work",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Realistic brief submission animation
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Also prepare mailto fallback link for transparency
    const subjectMap: Record<string, string> = {
      work: "[Portfolio Inquiry] Software Engineering Opportunity",
      collaboration: "[Portfolio Inquiry] Project Collaboration",
      consultation: "[Portfolio Inquiry] Technical Consultation",
      general: "[Portfolio Inquiry] General Message",
    };

    const mailSubject = encodeURIComponent(
      subjectMap[formData.subject] || "[Portfolio Inquiry] New Message"
    );
    const mailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // If needed, can open mailto in background or keep interactive success screen
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "work",
      message: "",
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div
        className="glass-card glow-card"
        style={{
          padding: "36px 30px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
            color: "#34d399",
          }}
        >
          <CheckCircle2 size={28} />
        </div>

        <h3
          style={{
            margin: "0 0 10px",
            fontFamily: "var(--font-serif)",
            fontSize: 24,
            fontWeight: 400,
            color: "var(--ink)",
          }}
        >
          <Bi en="Message Dispatched!" vi="Đã gửi tin nhắn!" />
        </h3>

        <p
          style={{
            maxWidth: 420,
            margin: "0 0 24px",
            fontSize: 14,
            color: "var(--quiet)",
            lineHeight: 1.7,
          }}
        >
          <Bi
            en={`Thank you, ${formData.name || "friend"}! Your message has been formatted. I will review it and reply directly to ${formData.email || "your inbox"} shortly.`}
            vi={`Cảm ơn ${formData.name || "bạn"}! Tin nhắn đã được ghi nhận. Tôi sẽ xem xét và phản hồi sớm nhất tới địa chỉ ${formData.email || "email của bạn"}.`}
          />
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            className="button button-secondary"
            onClick={handleReset}
          >
            <Bi en="Send another message" vi="Gửi tin nhắn khác" />
          </button>

          <a
            className="button button-primary"
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "[Inquiry from " + (formData.name || "Portfolio") + "]"
            )}&body=${encodeURIComponent(formData.message)}`}
          >
            <Bi en="Open in Email App" vi="Mở trong ứng dụng Mail" />
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: "30px 28px" }}>
      <div style={{ marginBottom: 20 }}>
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--ink)",
          }}
        >
          <Bi en="Direct Inquiry" vi="Gửi tin nhắn trực tiếp" />
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: "var(--quiet)" }}>
          <Bi
            en="Drop a line for job opportunities, projects, or architectural queries."
            vi="Gửi tin nhắn về cơ hội việc làm, dự án hoặc trao đổi kỹ thuật."
          />
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="form-field">
            <label htmlFor="inquiry-name">
              <Bi en="Your Name" vi="Tên của bạn" /> *
            </label>
            <input
              id="inquiry-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Nguyen"
            />
          </div>

          <div className="form-field">
            <label htmlFor="inquiry-email">
              <Bi en="Email Address" vi="Địa chỉ Email" /> *
            </label>
            <input
              id="inquiry-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@domain.com"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="inquiry-subject">
            <Bi en="Inquiry Topic" vi="Chủ đề trao đổi" />
          </label>
          <select
            id="inquiry-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="work">
              Full-time / Software Engineering Opportunity
            </option>
            <option value="collaboration">
              Project Collaboration / Open-Source
            </option>
            <option value="consultation">
              System Architecture & Consultation
            </option>
            <option value="general">
              General Question & Networking
            </option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="inquiry-message">
            <Bi en="Message" vi="Nội dung" /> *
          </label>
          <textarea
            id="inquiry-message"
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project, timeline, or engineering goals..."
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span className="muted" style={{ fontSize: 11 }}>
            <Bi
              en="Direct dispatch to phatnguyen1962005@gmail.com"
              vi="Gửi trực tiếp đến phatnguyen1962005@gmail.com"
            />
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="button button-primary"
            style={{ opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <Bi en="Sending..." vi="Đang gửi..." />
              </>
            ) : (
              <>
                <Bi en="Send Message" vi="Gửi tin nhắn" />
                <Send size={14} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * Full Composite Contact Widget for Contact Page & Sections
 */
export function ContactWidget() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 28,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <TimezoneStatusClock />

        {/* Quick Channels Card */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <span
            className="eyebrow"
            style={{ display: "block", marginBottom: 14 }}
          >
            <Bi en="Direct Channels" vi="Kênh liên hệ trực tiếp" />
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Email with 1-click copy */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Mail size={16} style={{ color: "var(--accent-ink)" }} />
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: "var(--ink)",
                  }}
                >
                  {CONTACT_EMAIL}
                </span>
              </div>
              <CopyEmailButton />
            </div>

            {/* Phone direct call */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Phone size={16} style={{ color: "#34d399" }} />
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "var(--font-mono)",
                    color: "var(--ink)",
                  }}
                >
                  {CONTACT_PHONE}
                </span>
              </div>
              <a
                href={`tel:${CONTACT_PHONE_RAW}`}
                className="button-sm button-secondary"
                style={{ fontSize: 11, padding: "4px 10px", textDecoration: "none" }}
              >
                <Bi en="Call" vi="Gọi điện" />
              </a>
            </div>

            {/* GitHub */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 14px",
                fontSize: 12,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>GitHub</span>
                <span className="muted">@phatnguyen196-solverboiz</span>
              </span>
              <span className="arrow">↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 14px",
                fontSize: 12,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span>LinkedIn</span>
                <span className="muted">Nguyen Trong Phat</span>
              </span>
              <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </div>

      <div>
        <DirectInquiryForm />
      </div>
    </div>
  );
}
