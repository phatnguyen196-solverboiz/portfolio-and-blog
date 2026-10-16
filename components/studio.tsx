"use client";

import { useCallback, useEffect, useState, useMemo, type ChangeEvent, type FormEvent } from "react";
import { Bi } from "./language-switch";
import type { Kind, Status } from "@/lib/types";
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Trophy,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles,
  Tag,
  ArrowRight,
} from "lucide-react";

type TabId = "overview" | "projects" | "blog" | "achievements" | "backup";

interface ProjectExtra {
  category?: string;
  categoryLabelEn?: string;
  categoryLabelVi?: string;
  statusBadge?: string;
  highlightEn?: string;
  highlightVi?: string;
  githubUrl?: string;
  demoUrl?: string;
  architectureEn?: string;
  architectureVi?: string;
}

interface BlogExtra {
  topic?: string;
  topicLabelEn?: string;
  topicLabelVi?: string;
  readTimeMin?: number;
  date?: string;
}

interface AchievementExtra {
  category?: string;
  categoryLabelEn?: string;
  categoryLabelVi?: string;
  organization?: string;
  year?: string;
  badgeEn?: string;
  badgeVi?: string;
  highlightMetric?: string;
  credentialUrl?: string;
  keyPointsEn?: string[];
  keyPointsVi?: string[];
}

interface RawPostItem {
  id: string;
  kind: Kind;
  slug: string;
  status: Status;
  titleEn: string;
  titleVi: string | null;
  excerptEn: string;
  excerptVi: string | null;
  bodyEn: string;
  bodyVi: string | null;
  tags: string;
  images: string;
  createdAt: number;
  updatedAt: number;
}

const emptyForm = {
  kind: "project" as Kind,
  status: "published" as Status,
  titleEn: "",
  titleVi: "",
  excerptEn: "",
  excerptVi: "",
  bodyEn: "",
  bodyVi: "",
  tags: [] as string[],
  images: [] as string[],
  // Extended fields
  category: "systems",
  statusBadge: "Production Ready",
  highlightEn: "",
  highlightVi: "",
  githubUrl: "",
  demoUrl: "",
  year: new Date().getFullYear().toString(),
  organization: "",
  credentialUrl: "",
  readTimeMin: 5,
};

function parseJsonSafe<T>(val: string, fallback: T): T {
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

export function Studio({ mode: _mode }: { mode?: "claim" | "editor" }) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [items, setItems] = useState<RawPostItem[]>([]);
  const [d1Connected, setD1Connected] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [markdownLang, setMarkdownLang] = useState<"en" | "vi">("en");

  // Fetch all posts from API
  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/posts", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as { posts: RawPostItem[]; d1Connected?: boolean };
        setItems(data.posts || []);
        if (typeof data.d1Connected === "boolean") setD1Connected(data.d1Connected);
      }
    } catch (err) {
      console.warn("Failed to fetch admin posts:", err);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Derived collections
  const projectsList = useMemo(() => items.filter((i) => i.kind === "project"), [items]);
  const blogList = useMemo(() => items.filter((i) => i.kind === "blog"), [items]);
  const achievementsList = useMemo(() => items.filter((i) => i.kind === "achievement"), [items]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function startCreate(kind: Kind) {
    setEditId(null);
    setForm({
      ...emptyForm,
      kind,
      category: kind === "project" ? "systems" : kind === "achievement" ? "awards" : "architecture",
    });
    setTagInput("");
    setImageUrlInput("");
    setMessage("");
    setErrorMessage("");
    if (kind === "project") setActiveTab("projects");
    else if (kind === "blog") setActiveTab("blog");
    else if (kind === "achievement") setActiveTab("achievements");
    window.scrollTo({ top: 380, behavior: "smooth" });
  }

  function startEdit(item: RawPostItem) {
    setEditId(item.id);
    const tagsArr = parseJsonSafe<string[]>(item.tags, []);
    const extra = parseJsonSafe<Record<string, unknown>>(item.images, {});

    setForm({
      kind: item.kind,
      status: item.status,
      titleEn: item.titleEn,
      titleVi: item.titleVi || "",
      excerptEn: item.excerptEn || "",
      excerptVi: item.excerptVi || "",
      bodyEn: item.bodyEn || "",
      bodyVi: item.bodyVi || "",
      tags: tagsArr,
      images: Array.isArray(extra) ? (extra as string[]) : [],
      category: String(extra.category || "systems"),
      statusBadge: String(extra.statusBadge || "Production Ready"),
      highlightEn: String(extra.highlightEn || ""),
      highlightVi: String(extra.highlightVi || ""),
      githubUrl: String(extra.githubUrl || ""),
      demoUrl: String(extra.demoUrl || ""),
      year: String(extra.year || "2025"),
      organization: String(extra.organization || ""),
      credentialUrl: String(extra.credentialUrl || ""),
      readTimeMin: Number(extra.readTimeMin) || 5,
    });

    setTagInput(tagsArr.join(", "));
    setMessage("");
    setErrorMessage("");

    if (item.kind === "project") setActiveTab("projects");
    else if (item.kind === "blog") setActiveTab("blog");
    else if (item.kind === "achievement") setActiveTab("achievements");

    window.scrollTo({ top: 380, behavior: "smooth" });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setErrorMessage("");

    try {
      const parsedTags = tagInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // Build structured extra metadata
      let extraData: Record<string, unknown> = {};
      if (form.kind === "project") {
        extraData = {
          category: form.category,
          statusBadge: form.statusBadge,
          highlightEn: form.highlightEn,
          highlightVi: form.highlightVi,
          githubUrl: form.githubUrl,
          demoUrl: form.demoUrl,
        } as ProjectExtra;
      } else if (form.kind === "blog") {
        extraData = {
          topic: form.category,
          readTimeMin: Number(form.readTimeMin) || 5,
          date: new Date().toISOString().slice(0, 10),
        } as BlogExtra;
      } else if (form.kind === "achievement") {
        extraData = {
          category: form.category,
          organization: form.organization,
          year: form.year,
          badgeEn: form.highlightEn,
          badgeVi: form.highlightVi,
          credentialUrl: form.credentialUrl,
        } as AchievementExtra;
      }

      const payload = {
        kind: form.kind,
        status: form.status,
        titleEn: form.titleEn,
        titleVi: form.titleVi || null,
        excerptEn: form.excerptEn,
        excerptVi: form.excerptVi || null,
        bodyEn: form.bodyEn,
        bodyVi: form.bodyVi || null,
        tags: parsedTags,
        images: extraData,
      };

      const res = await fetch(editId ? `/api/admin/posts/${editId}` : "/api/admin/posts", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(resData.error || "Failed to save item.");

      setMessage(editId ? "Updated successfully!" : "Created and published successfully!");
      setEditId(null);
      setForm(emptyForm);
      setTagInput("");
      await refresh();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error saving content.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item: RawPostItem) {
    if (!window.confirm(`Delete "${item.titleEn}"? This action cannot be undone.`)) return;
    setBusy(true);
    setMessage("");
    setErrorMessage("");

    try {
      const res = await fetch(`/api/admin/posts/${item.id}`, { method: "DELETE" });
      const resData = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(resData.error || "Failed to delete item.");

      if (editId === item.id) {
        setEditId(null);
        setForm(emptyForm);
      }
      setMessage("Item deleted successfully.");
      await refresh();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error deleting content.");
    } finally {
      setBusy(false);
    }
  }

  async function handleToggleStatus(item: RawPostItem) {
    setBusy(true);
    const newStatus: Status = item.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/posts/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: item.kind,
          status: newStatus,
          titleEn: item.titleEn,
          titleVi: item.titleVi,
          excerptEn: item.excerptEn,
          excerptVi: item.excerptVi,
          bodyEn: item.bodyEn,
          bodyVi: item.bodyVi,
          tags: parseJsonSafe(item.tags, []),
          images: parseJsonSafe(item.images, {}),
        }),
      });
      if (!res.ok) throw new Error("Status update failed.");
      await refresh();
      setMessage(`Item marked as ${newStatus}.`);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Could not toggle status.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDuplicate(item: RawPostItem) {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: item.kind,
          status: "draft",
          titleEn: `${item.titleEn} (Copy)`,
          titleVi: item.titleVi ? `${item.titleVi} (Bản sao)` : null,
          excerptEn: item.excerptEn,
          excerptVi: item.excerptVi,
          bodyEn: item.bodyEn,
          bodyVi: item.bodyVi,
          tags: parseJsonSafe(item.tags, []),
          images: parseJsonSafe(item.images, {}),
        }),
      });
      if (!res.ok) throw new Error("Duplicate failed.");
      await refresh();
      setMessage("Item duplicated as draft.");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Could not duplicate.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSeedDefaults() {
    if (!window.confirm("Seed default curated projects, blog posts, and achievements into the database?")) return;
    setBusy(true);
    setMessage("");
    setErrorMessage("");
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = (await res.json()) as { error?: string; seededCount?: number };
      if (!res.ok) throw new Error(data.error || "Seeding failed.");
      setMessage(`Successfully populated ${data.seededCount} items into your database!`);
      await refresh();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Seeding failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleImportBackup(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMessage("");
    setErrorMessage("");
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const res = await fetch("/api/admin/backup/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const data = (await res.json()) as { error?: string; importedCount?: number };
      if (!res.ok) throw new Error(data.error || "Import failed.");
      setMessage(`Backup restored successfully (${data.importedCount} items imported).`);
      await refresh();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Import failed.");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* TOP STATUS & USER BAR */}
      <div
        className="glass-card"
        style={{
          padding: "16px 24px",
          marginBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "20px",
              background: d1Connected ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
              border: `1px solid ${d1Connected ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
              fontSize: "12px",
              color: d1Connected ? "#34d399" : "#fbbf24",
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: d1Connected ? "#10b981" : "#f59e0b",
                boxShadow: d1Connected ? "0 0 8px #10b981" : "none",
              }}
            />
            <span>{d1Connected ? "D1 Database Live" : "Edge Resilient Fallback"}</span>
          </div>

          <span style={{ fontSize: "13px", color: "var(--quiet)" }}>
            Signed in as <strong style={{ color: "var(--ink)" }}>Nguyen Trong Phat</strong>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="button button-outline"
            style={{ fontSize: "12px", padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span><Bi en="View Live Site" vi="Xem Web Trực tiếp" /></span>
            <ExternalLink size={13} />
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="button button-outline"
            style={{ fontSize: "12px", padding: "6px 14px", color: "#ff8080", borderColor: "rgba(255, 100, 100, 0.2)" }}
          >
            <LogOut size={13} style={{ marginRight: 4 }} />
            <span><Bi en="Log out" vi="Đăng xuất" /></span>
          </button>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "1px solid var(--line)",
          marginBottom: "32px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {[
          { id: "overview" as TabId, labelEn: "Overview", labelVi: "Tổng quan", icon: LayoutDashboard, count: items.length },
          { id: "projects" as TabId, labelEn: "Projects", labelVi: "Dự án", icon: Briefcase, count: projectsList.length },
          { id: "blog" as TabId, labelEn: "Technical Blog", labelVi: "Blog Kỹ thuật", icon: BookOpen, count: blogList.length },
          { id: "achievements" as TabId, labelEn: "Achievements", labelVi: "Thành tựu", icon: Trophy, count: achievementsList.length },
          { id: "backup" as TabId, labelEn: "Backup & Restore", labelVi: "Sao lưu & Khôi phục", icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setMessage("");
                setErrorMessage("");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "8px 8px 0 0",
                background: isActive ? "rgba(255, 255, 255, 0.06)" : "transparent",
                border: "1px solid",
                borderColor: isActive ? "var(--line) var(--line) transparent" : "transparent",
                color: isActive ? "var(--ink)" : "var(--quiet)",
                fontWeight: isActive ? 600 : 500,
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={15} style={{ color: isActive ? "var(--accent-ink)" : "inherit" }} />
              <span><Bi en={tab.labelEn} vi={tab.labelVi} /></span>
              {typeof tab.count === "number" && (
                <span
                  style={{
                    padding: "2px 7px",
                    borderRadius: "12px",
                    background: isActive ? "var(--accent-glow)" : "rgba(255, 255, 255, 0.08)",
                    fontSize: "11px",
                    color: isActive ? "#34d399" : "var(--quiet)",
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* FEEDBACK ALERTS */}
      {message && (
        <div
          role="status"
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "#34d399",
            fontSize: "13.5px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: "12px 18px",
            borderRadius: "10px",
            background: "rgba(224, 64, 64, 0.12)",
            border: "1px solid rgba(224, 64, 64, 0.3)",
            color: "#ff7b7b",
            fontSize: "13.5px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div>
          {/* Quick Metrics Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <div className="glass-card glow-card" style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className="muted" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <Bi en="Projects" vi="Dự án" />
                </span>
                <Briefcase size={16} color="var(--accent-ink)" />
              </div>
              <div style={{ fontSize: "32px", fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
                {projectsList.length}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--quiet)" }}>
                {projectsList.filter((p) => p.status === "published").length} <Bi en="published online" vi="đang công khai" />
              </p>
            </div>

            <div className="glass-card glow-card" style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className="muted" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <Bi en="Blog Articles" vi="Bài viết Kỹ thuật" />
                </span>
                <BookOpen size={16} color="#818cf8" />
              </div>
              <div style={{ fontSize: "32px", fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
                {blogList.length}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--quiet)" }}>
                {blogList.filter((b) => b.status === "published").length} <Bi en="articles live" vi="bài viết đã đăng" />
              </p>
            </div>

            <div className="glass-card glow-card" style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span className="muted" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <Bi en="Achievements" vi="Thành tựu" />
                </span>
                <Trophy size={16} color="#fbbf24" />
              </div>
              <div style={{ fontSize: "32px", fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--ink)" }}>
                {achievementsList.length}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--quiet)" }}>
                <Bi en="Honors & cloud certs" vi="Giải thưởng & Chứng chỉ" />
              </p>
            </div>
          </div>

          {/* Quick Action Station */}
          <div className="glass-card" style={{ padding: "32px 28px", marginBottom: "32px" }}>
            <h3 className="serif" style={{ fontSize: "20px", margin: "0 0 12px 0", color: "var(--ink)" }}>
              <Bi en="Quick Actions & Creation" vi="Thao tác Nhanh & Tạo Mới" />
            </h3>
            <p className="muted" style={{ fontSize: "13px", margin: "0 0 24px 0", lineHeight: 1.6 }}>
              <Bi
                en="Select an entity to compose new content, or seed standard portfolio items if starting fresh."
                vi="Chọn loại nội dung bạn muốn tạo mới, hoặc nhập dữ liệu mẫu tiêu chuẩn nếu muốn bắt đầu nhanh."
              />
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <button
                type="button"
                onClick={() => startCreate("project")}
                className="button button-primary"
                style={{ fontSize: "13px" }}
              >
                <Plus size={14} />
                <span><Bi en="New Project" vi="Tạo Dự án Mới" /></span>
              </button>

              <button
                type="button"
                onClick={() => startCreate("blog")}
                className="button button-primary"
                style={{ fontSize: "13px", background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
              >
                <Plus size={14} />
                <span><Bi en="New Blog Post" vi="Viết Bài Mới" /></span>
              </button>

              <button
                type="button"
                onClick={() => startCreate("achievement")}
                className="button button-primary"
                style={{ fontSize: "13px", background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
              >
                <Plus size={14} />
                <span><Bi en="New Achievement" vi="Thêm Thành tựu Mới" /></span>
              </button>

              {items.length === 0 && (
                <button
                  type="button"
                  onClick={handleSeedDefaults}
                  disabled={busy}
                  className="button button-outline"
                  style={{ fontSize: "13px" }}
                >
                  <RefreshCw size={14} />
                  <span><Bi en="Seed Default Showcase Data" vi="Nạp Dữ liệu Mẫu Ban đầu" /></span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COMPOSER FORM (SHOWN WHEN IN PROJECT, BLOG, OR ACHIEVEMENTS TAB) */}
      {(activeTab === "projects" || activeTab === "blog" || activeTab === "achievements") && (
        <div>
          {/* Section Header with New Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h2 className="serif" style={{ fontSize: "24px", margin: "0 0 6px 0", color: "var(--ink)" }}>
                {activeTab === "projects" && <Bi en="Projects Management" vi="Quản lý Dự án" />}
                {activeTab === "blog" && <Bi en="Technical Blog Studio" vi="Biên tập Blog Kỹ thuật" />}
                {activeTab === "achievements" && <Bi en="Achievements & Accolades" vi="Quản lý Thành tựu & Giải thưởng" />}
              </h2>
              <p className="muted" style={{ fontSize: "13px", margin: 0 }}>
                {activeTab === "projects" && <Bi en="Add case studies, architecture briefs, and system metrics." vi="Thêm case studies, phân tích kiến trúc và chỉ số hệ thống." />}
                {activeTab === "blog" && <Bi en="Write high-value technical articles with live Markdown preview." vi="Viết bài phân tích chuyên sâu với khung xem trước Markdown." />}
                {activeTab === "achievements" && <Bi en="Manage certifications, hackathon awards, and scale milestones." vi="Quản lý chứng chỉ đám mây, giải thưởng hackathon và cột mốc kỹ thuật." />}
              </p>
            </div>

            <button
              type="button"
              onClick={() => startCreate(activeTab === "projects" ? "project" : activeTab === "blog" ? "blog" : "achievement")}
              className="button button-primary"
              style={{ fontSize: "13px" }}
            >
              <Plus size={14} />
              <span>
                {activeTab === "projects" && <Bi en="Add Project" vi="Thêm Dự án" />}
                {activeTab === "blog" && <Bi en="Write Article" vi="Viết Bài Mới" />}
                {activeTab === "achievements" && <Bi en="Add Achievement" vi="Thêm Thành tựu" />}
              </span>
            </button>
          </div>

          {/* COMPOSER DRAWER / CARD */}
          <div
            className="glass-card glow-card"
            style={{
              padding: "32px 28px",
              marginBottom: "40px",
              border: "1px solid rgba(16, 185, 129, 0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="badge badge-accent" style={{ fontSize: "11px", textTransform: "uppercase" }}>
                  {editId ? <Bi en="Edit Mode" vi="Chế độ Sửa" /> : <Bi en="New Entry" vi="Tạo Mới" />}
                </span>
                <h3 className="serif" style={{ fontSize: "20px", margin: 0, color: "var(--ink)" }}>
                  {form.titleEn || (editId ? "Untitled" : <Bi en="New Item" vi="Mục Mới" />)}
                </h3>
              </div>

              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm(emptyForm);
                    setTagInput("");
                  }}
                  className="button button-outline"
                  style={{ fontSize: "12px", padding: "4px 12px" }}
                >
                  <Bi en="Cancel" vi="Hủy sửa" />
                </button>
              )}
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Row 1: Title English & Vietnamese */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                <div className="form-field">
                  <label htmlFor="titleEn">
                    <Bi en="Title (English) *" vi="Tiêu đề (Tiếng Anh) *" />
                  </label>
                  <input
                    id="titleEn"
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    placeholder="e.g. Distributed Task Queue & Job Scheduler"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="titleVi">
                    <Bi en="Title (Vietnamese)" vi="Tiêu đề (Tiếng Việt)" />
                  </label>
                  <input
                    id="titleVi"
                    type="text"
                    value={form.titleVi}
                    onChange={(e) => setForm({ ...form, titleVi: e.target.value })}
                    placeholder="Ví dụ: Hệ thống điều phối hàng đợi tác vụ phân tán"
                  />
                </div>
              </div>

              {/* Row 2: Status, Category, and Kind-Specific Attributes */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                <div className="form-field">
                  <label htmlFor="status">
                    <Bi en="Status" vi="Trạng thái" />
                  </label>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                    style={{
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      padding: "10px 14px",
                      color: "var(--ink)",
                      width: "100%",
                    }}
                  >
                    <option value="published">Published (Công khai)</option>
                    <option value="draft">Draft (Bản nháp)</option>
                  </select>
                </div>

                {activeTab === "projects" && (
                  <>
                    <div className="form-field">
                      <label htmlFor="category">
                        <Bi en="Category" vi="Danh mục" />
                      </label>
                      <select
                        id="category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        style={{
                          background: "rgba(0,0,0,0.4)",
                          border: "1px solid var(--line)",
                          borderRadius: 8,
                          padding: "10px 14px",
                          color: "var(--ink)",
                          width: "100%",
                        }}
                      >
                        <option value="systems">Systems & Backend</option>
                        <option value="fullstack">Full-Stack Platforms</option>
                        <option value="frontend">High-Performance Web</option>
                        <option value="tools">DevOps & Tooling</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="githubUrl">
                        <Bi en="GitHub Repository URL" vi="Đường dẫn GitHub Repo" />
                      </label>
                      <input
                        id="githubUrl"
                        type="url"
                        value={form.githubUrl}
                        onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                        placeholder="https://github.com/phatnguyen196-solverboiz/..."
                      />
                    </div>
                  </>
                )}

                {activeTab === "blog" && (
                  <>
                    <div className="form-field">
                      <label htmlFor="blogTopic">
                        <Bi en="Topic" vi="Chủ đề" />
                      </label>
                      <select
                        id="blogTopic"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        style={{
                          background: "rgba(0,0,0,0.4)",
                          border: "1px solid var(--line)",
                          borderRadius: 8,
                          padding: "10px 14px",
                          color: "var(--ink)",
                          width: "100%",
                        }}
                      >
                        <option value="architecture">Architecture & Systems</option>
                        <option value="frontend">Edge & Next.js</option>
                        <option value="databases">Databases & Scale</option>
                        <option value="general">Engineering Notes</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="readTime">
                        <Bi en="Reading Time (Minutes)" vi="Thời gian đọc (Phút)" />
                      </label>
                      <input
                        id="readTime"
                        type="number"
                        min={1}
                        max={60}
                        value={form.readTimeMin}
                        onChange={(e) => setForm({ ...form, readTimeMin: Number(e.target.value) || 5 })}
                      />
                    </div>
                  </>
                )}

                {activeTab === "achievements" && (
                  <>
                    <div className="form-field">
                      <label htmlFor="achCategory">
                        <Bi en="Category" vi="Danh mục" />
                      </label>
                      <select
                        id="achCategory"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        style={{
                          background: "rgba(0,0,0,0.4)",
                          border: "1px solid var(--line)",
                          borderRadius: 8,
                          padding: "10px 14px",
                          color: "var(--ink)",
                          width: "100%",
                        }}
                      >
                        <option value="awards">Contests & Hackathons</option>
                        <option value="certifications">Certifications</option>
                        <option value="milestones">Engineering Milestones</option>
                        <option value="academic">Academic Honors</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label htmlFor="year">
                        <Bi en="Year / Period" vi="Năm / Thời gian" />
                      </label>
                      <input
                        id="year"
                        type="text"
                        value={form.year}
                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                        placeholder="e.g. 2025 or 2023 - Present"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="credentialUrl">
                        <Bi en="Credential URL" vi="Link chứng chỉ / xác thực" />
                      </label>
                      <input
                        id="credentialUrl"
                        type="url"
                        value={form.credentialUrl}
                        onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Row 3: Highlight Metric / Badge */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                <div className="form-field">
                  <label htmlFor="highlightEn">
                    <Bi en="Metric Highlight (English)" vi="Chỉ số Nổi bật (Tiếng Anh)" />
                  </label>
                  <input
                    id="highlightEn"
                    type="text"
                    value={form.highlightEn}
                    onChange={(e) => setForm({ ...form, highlightEn: e.target.value })}
                    placeholder="e.g. 12,000+ jobs/sec · Sub-15ms latency or 1st Place Champion"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="highlightVi">
                    <Bi en="Metric Highlight (Vietnamese)" vi="Chỉ số Nổi bật (Tiếng Việt)" />
                  </label>
                  <input
                    id="highlightVi"
                    type="text"
                    value={form.highlightVi}
                    onChange={(e) => setForm({ ...form, highlightVi: e.target.value })}
                    placeholder="Ví dụ: 12.000+ tác vụ/giây · Độ trễ dưới 15ms hoặc Quán Quân"
                  />
                </div>
              </div>

              {/* Row 4: Excerpt / Problem Statement */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                <div className="form-field">
                  <label htmlFor="excerptEn">
                    <Bi en={activeTab === "projects" ? "Problem Statement (English)" : "Brief Summary (English)"} vi={activeTab === "projects" ? "Vấn đề kỹ thuật (Tiếng Anh)" : "Tóm tắt ngắn (Tiếng Anh)"} />
                  </label>
                  <textarea
                    id="excerptEn"
                    rows={3}
                    value={form.excerptEn}
                    onChange={(e) => setForm({ ...form, excerptEn: e.target.value })}
                    placeholder="Short architectural explanation..."
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="excerptVi">
                    <Bi en={activeTab === "projects" ? "Problem Statement (Vietnamese)" : "Brief Summary (Vietnamese)"} vi={activeTab === "projects" ? "Vấn đề kỹ thuật (Tiếng Việt)" : "Tóm tắt ngắn (Tiếng Việt)"} />
                  </label>
                  <textarea
                    id="excerptVi"
                    rows={3}
                    value={form.excerptVi}
                    onChange={(e) => setForm({ ...form, excerptVi: e.target.value })}
                    placeholder="Mô tả tóm tắt..."
                  />
                </div>
              </div>

              {/* Row 5: Full Markdown Content with Live Split Preview */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)" }}>
                    <Bi
                      en={activeTab === "projects" ? "Architecture Deep-Dive & Solution (Markdown)" : "Full Article Body (Markdown)"}
                      vi={activeTab === "projects" ? "Phân tích Kiến trúc & Giải pháp (Markdown)" : "Nội dung Bài viết Chi tiết (Markdown)"}
                    />
                  </label>

                  {/* EN / VI Markdown Switcher */}
                  <div style={{ display: "inline-flex", gap: 4, background: "rgba(0,0,0,0.3)", padding: 3, borderRadius: 6 }}>
                    <button
                      type="button"
                      onClick={() => setMarkdownLang("en")}
                      style={{
                        padding: "3px 10px",
                        fontSize: "11px",
                        borderRadius: 4,
                        border: 0,
                        background: markdownLang === "en" ? "var(--accent-ink)" : "transparent",
                        color: markdownLang === "en" ? "#000" : "var(--quiet)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      EN Markdown
                    </button>
                    <button
                      type="button"
                      onClick={() => setMarkdownLang("vi")}
                      style={{
                        padding: "3px 10px",
                        fontSize: "11px",
                        borderRadius: 4,
                        border: 0,
                        background: markdownLang === "vi" ? "var(--accent-ink)" : "transparent",
                        color: markdownLang === "vi" ? "#000" : "var(--quiet)",
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      VI Markdown
                    </button>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  {/* Markdown Input */}
                  <textarea
                    rows={10}
                    value={markdownLang === "en" ? form.bodyEn : form.bodyVi}
                    onChange={(e) => {
                      if (markdownLang === "en") setForm({ ...form, bodyEn: e.target.value });
                      else setForm({ ...form, bodyVi: e.target.value });
                    }}
                    placeholder={
                      markdownLang === "en"
                        ? "## System Architecture\n\nExplain how components interact, throughput numbers, and failover mechanics..."
                        : "## Kiến trúc Hệ thống\n\nTrình bày chi tiết luồng xử lý, hiệu năng và giải pháp kỹ thuật..."
                    }
                    style={{
                      fontFamily: "monospace",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      background: "rgba(0,0,0,0.35)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      padding: "12px 14px",
                      color: "var(--ink)",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />

                  {/* Live Rendered Preview */}
                  <div
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid var(--line)",
                      borderRadius: 8,
                      padding: "14px 16px",
                      maxHeight: "260px",
                      overflowY: "auto",
                      fontSize: "13px",
                      lineHeight: 1.7,
                      color: "rgba(232, 230, 227, 0.85)",
                    }}
                  >
                    <div style={{ fontSize: "11px", textTransform: "uppercase", color: "var(--quiet)", marginBottom: 8 }}>
                      <Eye size={12} style={{ display: "inline", marginRight: 4 }} />
                      <Bi en="Live Preview" vi="Xem trước Trực tiếp" /> ({markdownLang.toUpperCase()})
                    </div>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {(markdownLang === "en" ? form.bodyEn : form.bodyVi) || (
                        <span style={{ color: "var(--quiet)", fontStyle: "italic" }}>
                          <Bi en="Preview will appear here as you type..." vi="Nội dung xem trước sẽ hiển thị ở đây..." />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 6: Tags & Technology Badges */}
              <div className="form-field">
                <label htmlFor="tags">
                  <Tag size={13} style={{ display: "inline", marginRight: 4 }} />
                  <Bi en="Technologies & Tags (comma separated)" vi="Công nghệ & Thẻ phân loại (ngăn cách bằng dấu phẩy)" />
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Go, Redis, Docker, Cloudflare, Next.js..."
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 12 }}>
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm(emptyForm);
                    setTagInput("");
                  }}
                  className="button button-outline"
                >
                  <Bi en="Reset" vi="Đặt lại" />
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="button button-primary"
                  style={{ minWidth: 140, justifyContent: "center" }}
                >
                  {busy ? <Bi en="Saving…" vi="Đang lưu…" /> : <Bi en="Save & Publish" vi="Lưu & Đăng bài" />}
                </button>
              </div>
            </form>
          </div>

          {/* ITEM LIST CARDS */}
          <div>
            <h3 className="serif" style={{ fontSize: "20px", margin: "0 0 16px 0", color: "var(--ink)" }}>
              <Bi en="Existing Items" vi="Danh sách Hiện có" /> (
              {activeTab === "projects"
                ? projectsList.length
                : activeTab === "blog"
                  ? blogList.length
                  : achievementsList.length}
              )
            </h3>

            {((activeTab === "projects" && projectsList.length === 0) ||
              (activeTab === "blog" && blogList.length === 0) ||
              (activeTab === "achievements" && achievementsList.length === 0)) && (
              <div
                className="glass-card"
                style={{
                  padding: "40px 24px",
                  textAlign: "center",
                  color: "var(--quiet)",
                  borderRadius: "12px",
                }}
              >
                <p style={{ margin: "0 0 16px 0", fontSize: "14px" }}>
                  <Bi
                    en="No items found in database yet. Click below to load curated portfolio items into your database."
                    vi="Chưa có dữ liệu trong cơ sở dữ liệu. Nhấn nút bên dưới để nạp các mục chuẩn vào bảng điều khiển."
                  />
                </p>
                <button
                  type="button"
                  onClick={handleSeedDefaults}
                  disabled={busy}
                  className="button button-primary"
                  style={{ display: "inline-flex" }}
                >
                  <RefreshCw size={14} />
                  <span><Bi en="Seed Curated Defaults" vi="Nạp Dữ liệu Mẫu" /></span>
                </button>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {(activeTab === "projects"
                ? projectsList
                : activeTab === "blog"
                  ? blogList
                  : achievementsList
              ).map((item) => {
                const tagsArr = parseJsonSafe<string[]>(item.tags, []);
                return (
                  <div
                    key={item.id}
                    className="glass-card glow-card"
                    style={{
                      padding: "20px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 16,
                      borderLeft: item.status === "published" ? "3px solid #10b981" : "3px solid #f59e0b",
                    }}
                  >
                    <div style={{ flex: "1 1 360px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span
                          className={`badge ${item.status === "published" ? "badge-accent" : "badge-outline"}`}
                          style={{ fontSize: "10.5px" }}
                        >
                          {item.status.toUpperCase()}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--quiet)", fontFamily: "monospace" }}>
                          /{item.kind === "blog" ? "blog" : item.kind === "project" ? "projects" : "achievements"}/{item.slug}
                        </span>
                      </div>

                      <h4 style={{ fontSize: "16px", margin: "0 0 6px 0", color: "var(--ink)", fontWeight: 600 }}>
                        {item.titleEn}
                      </h4>
                      {item.titleVi && (
                        <p style={{ fontSize: "13px", margin: "0 0 8px 0", color: "var(--quiet)" }}>
                          {item.titleVi}
                        </p>
                      )}

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {tagsArr.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: 4,
                              background: "rgba(255,255,255,0.05)",
                              color: "rgba(232, 230, 227, 0.75)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item)}
                        className="button button-outline"
                        style={{ fontSize: "12px", padding: "6px 12px" }}
                        title="Toggle Published / Draft"
                      >
                        {item.status === "published" ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDuplicate(item)}
                        className="button button-outline"
                        style={{ fontSize: "12px", padding: "6px 10px" }}
                        title="Duplicate"
                      >
                        <Copy size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="button button-primary"
                        style={{ fontSize: "12px", padding: "6px 12px" }}
                      >
                        <Edit3 size={13} />
                        <span><Bi en="Edit" vi="Sửa" /></span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="button button-outline"
                        style={{
                          fontSize: "12px",
                          padding: "6px 10px",
                          color: "#ff8080",
                          borderColor: "rgba(255,100,100,0.25)",
                        }}
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BACKUP & RESTORE */}
      {activeTab === "backup" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {/* Download Card */}
          <div className="glass-card glow-card" style={{ padding: "32px 28px" }}>
            <div style={{ display: "inline-flex", padding: 10, borderRadius: 10, background: "rgba(16, 185, 129, 0.1)", marginBottom: 16 }}>
              <Download size={22} color="#34d399" />
            </div>
            <h3 className="serif" style={{ fontSize: "20px", margin: "0 0 10px 0", color: "var(--ink)" }}>
              <Bi en="Export All Content" vi="Xuất Toàn bộ Dữ liệu" />
            </h3>
            <p className="muted" style={{ fontSize: "13.5px", margin: "0 0 24px 0", lineHeight: 1.6 }}>
              <Bi
                en="Download a timestamped JSON file containing all your projects, articles, honors, and site configuration. You can save this file safely on your computer."
                vi="Tải về file JSON hoàn chỉnh chứa toàn bộ dự án, bài viết, thành tựu và cấu hình hồ sơ. Bạn có thể lưu giữ file này an toàn trên máy tính của mình."
              />
            </p>
            <a
              href="/api/admin/backup/export"
              download
              className="button button-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Download size={15} />
              <span><Bi en="Download JSON Backup" vi="Tải Bản sao lưu JSON" /></span>
            </a>
          </div>

          {/* Restore Card */}
          <div className="glass-card glow-card" style={{ padding: "32px 28px" }}>
            <div style={{ display: "inline-flex", padding: 10, borderRadius: 10, background: "rgba(99, 102, 241, 0.1)", marginBottom: 16 }}>
              <Upload size={22} color="#818cf8" />
            </div>
            <h3 className="serif" style={{ fontSize: "20px", margin: "0 0 10px 0", color: "var(--ink)" }}>
              <Bi en="Restore from JSON Backup" vi="Khôi phục từ File JSON" />
            </h3>
            <p className="muted" style={{ fontSize: "13.5px", margin: "0 0 24px 0", lineHeight: 1.6 }}>
              <Bi
                en="Upload a previously exported backup file to restore or update all content in your database in a single click."
                vi="Tải lên file sao lưu đã xuất trước đó để khôi phục hoặc cập nhật toàn bộ nội dung cơ sở dữ liệu chỉ với 1 cú click."
              />
            </p>
            <label
              className="button button-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                cursor: "pointer",
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              }}
            >
              <Upload size={15} />
              <span><Bi en="Choose Backup File to Restore" vi="Chọn File để Khôi phục" /></span>
              <input type="file" accept=".json" onChange={handleImportBackup} style={{ display: "none" }} />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
