"use client";

import { useState } from "react";
import { User, Sparkles } from "lucide-react";
import { Bi } from "./language-switch";

export function HeroPortrait() {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="hero-portrait-wrap animate-fade-in-up"
      style={{
        animationDelay: "0.35s",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        className="glass-card glow-card"
        style={{
          width: "100%",
          maxWidth: 270,
          aspectRatio: "4 / 5",
          borderRadius: 20,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at top right, rgba(99, 102, 241, 0.15) 0%, rgba(20, 20, 28, 0.85) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 35px -8px rgba(99, 102, 241, 0.25)",
        }}
      >
        {!imageError ? (
          <img
            src="/avatar.jpg"
            alt="Nguyen Trong Phat — Engineering Physics & Computational Simulation"
            onError={() => setImageError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              textAlign: "center",
              gap: 12,
              color: "var(--quiet)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.12)",
                border: "1px dashed rgba(99, 102, 241, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#818cf8",
              }}
            >
              <User size={34} />
            </div>
            <div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  display: "block",
                  letterSpacing: "0.02em",
                }}
              >
                <Bi en="Profile Photo Slot" vi="Vị trí Ảnh đại diện" />
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--quiet)",
                  display: "block",
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                <Bi
                  en="Place your photo at /public/avatar.jpg"
                  vi="Thêm ảnh vào file /public/avatar.jpg"
                />
              </span>
            </div>
          </div>
        )}

        {/* Ambient status indicator badge */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            right: 12,
            padding: "6px 10px",
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: 8,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 10,
          }}
        >
          <span style={{ color: "#34d399", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span className="status-dot status-online" style={{ width: 6, height: 6 }} />
            HCMUS · 2027
          </span>
          <span style={{ color: "rgba(232, 230, 227, 0.65)", fontFamily: "monospace" }}>
            VNUHCM
          </span>
        </div>
      </div>
    </div>
  );
}
