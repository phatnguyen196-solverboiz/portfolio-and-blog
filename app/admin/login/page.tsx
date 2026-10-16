"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Bi } from "@/components/language-switch";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, rememberMe, returnTo: "/admin" }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Login failed");
        }
        window.location.href = data.redirect || "/admin";
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication error.");
      }
    });
  }

  return (
    <SiteShell>
      <div
        className="wrap"
        style={{
          minHeight: "calc(100vh - 220px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBlock: "60px 80px",
        }}
      >
        <div
          className="glass-card glow-card animate-fade-in-up"
          style={{
            width: "100%",
            maxWidth: "460px",
            padding: "40px 36px",
            borderRadius: "16px",
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.5), 0 0 32px rgba(16, 185, 129, 0.08)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#34d399",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            <ShieldCheck size={14} />
            <span>
              <Bi en="Owner Authentication" vi="Xác thực Chủ trang" />
            </span>
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "30px",
              margin: "0 0 8px 0",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            <Bi en="Admin Studio." vi="Trang Quản trị." />
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--quiet)",
              margin: "0 0 28px 0",
              lineHeight: 1.6,
            }}
          >
            <Bi
              en="Enter your master secret to manage projects, technical articles, and honors."
              vi="Nhập mật mã quản trị để chỉnh sửa dự án, bài viết kỹ thuật và thành tựu."
            />
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label
                htmlFor="admin-password"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  letterSpacing: "0.02em",
                }}
              >
                <Bi en="Master Password" vi="Mật mã quản trị" />
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  required
                  autoFocus
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "10px",
                    color: "var(--ink)",
                    fontSize: "14px",
                    fontFamily: showPassword ? "inherit" : "monospace",
                    letterSpacing: showPassword ? "normal" : "2px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: 0,
                    color: "var(--quiet)",
                    cursor: "pointer",
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  color: "var(--quiet)",
                }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: "var(--accent-ink)", width: "15px", height: "15px" }}
                />
                <Bi en="Remember for 30 days" vi="Ghi nhớ 30 ngày" />
              </label>

              <span style={{ fontSize: "11px", color: "rgba(232, 230, 227, 0.4)" }}>
                <Lock size={11} style={{ display: "inline", marginRight: "4px" }} />
                <Bi en="Edge Secure" vi="Bảo mật Edge" />
              </span>
            </div>

            {error && (
              <div
                role="alert"
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(224, 64, 64, 0.12)",
                  border: "1px solid rgba(224, 64, 64, 0.3)",
                  color: "#ff7b7b",
                  fontSize: "12.5px",
                  lineHeight: 1.4,
                }}
              >
                {error}
              </div>
            )}

            <button
              className="button button-primary"
              type="submit"
              disabled={isPending}
              style={{
                width: "100%",
                marginTop: "6px",
                justifyContent: "center",
                padding: "12px 20px",
                fontSize: "14px",
              }}
            >
              {isPending ? (
                <Bi en="Verifying…" vi="Đang xác thực…" />
              ) : (
                <>
                  <Bi en="Unlock Studio" vi="Vào trang Quản trị" />
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}
