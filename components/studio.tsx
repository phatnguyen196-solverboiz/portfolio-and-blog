"use client";

import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { Bi } from "./language-switch";

type Kind = "project" | "blog";
type Status = "draft" | "published";
type Form = {
  kind: Kind; status: Status; titleEn: string; titleVi: string; excerptEn: string; excerptVi: string;
  bodyEn: string; bodyVi: string; tags: string[]; images: string[];
};
type Item = Omit<Form, "tags" | "images"> & { id: string; slug: string; tags: string; images: string; updatedAt: number };

const empty: Form = { kind: "blog", status: "draft", titleEn: "", titleVi: "", excerptEn: "", excerptVi: "", bodyEn: "", bodyVi: "", tags: [], images: [] };
function list(value: string): string[] { try { const data = JSON.parse(value); return Array.isArray(data) ? data : []; } catch { return []; } }

export function Studio({ mode }: { mode: "claim" | "editor" }) {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Form>(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [tagText, setTagText] = useState("");

  const refresh = useCallback(async () => {
    const response = await fetch("/api/admin/posts", { cache: "no-store" });
    if (response.ok) setItems(((await response.json()) as { posts: Item[] }).posts);
  }, []);
  useEffect(() => { if (mode === "editor") void refresh(); }, [mode, refresh]);

  async function claim() {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/claim", { method: "POST" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not claim editor.");
      window.location.reload();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not claim editor."); setBusy(false); }
  }

  function update<K extends keyof Form>(key: K, value: Form[K]) { setForm(previous => ({ ...previous, [key]: value })); }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;
    if (files.length + form.images.length > 5) { setMessage("Maximum five images per post."); return; }
    setBusy(true); setMessage("");
    try {
      const keys: string[] = [];
      for (const file of files) {
        const body = new FormData(); body.append("file", file);
        const response = await fetch("/api/admin/media", { method: "POST", body });
        const data = (await response.json()) as { error?: string; key: string };
        if (!response.ok) throw new Error(data.error || "Upload failed.");
        keys.push(data.key);
      }
      setForm(previous => ({ ...previous, images: [...previous.images, ...keys] }));
    } catch (error) { setMessage(error instanceof Error ? error.message : "Upload failed."); }
    finally { setBusy(false); }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch(editId ? `/api/admin/posts/${editId}` : "/api/admin/posts", {
        method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not save post.");
      setForm(empty); setEditId(null); setTagText(""); await refresh();
      setMessage("Saved. Published posts are now visible on the site.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not save post."); }
    finally { setBusy(false); }
  }

  function edit(item: Item) {
    setEditId(item.id);
    setForm({ kind: item.kind, status: item.status, titleEn: item.titleEn, titleVi: item.titleVi || "", excerptEn: item.excerptEn,
      excerptVi: item.excerptVi || "", bodyEn: item.bodyEn, bodyVi: item.bodyVi || "", tags: list(item.tags), images: list(item.images) });
    setTagText(list(item.tags).join(", "));
    setMessage(""); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(item: Item) {
    if (!window.confirm(`Delete “${item.titleEn}”? This cannot be undone.`)) return;
    setBusy(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/posts/${item.id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not delete post.");
      if (editId === item.id) { setEditId(null); setForm(empty); setTagText(""); }
      await refresh(); setMessage("Post deleted.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not delete post."); }
    finally { setBusy(false); }
  }

  if (mode === "claim") return <div className="empty-state"><span className="eyebrow">01 / 01</span><h2><Bi en="Set up your editor." vi="Thiết lập trang quản trị." /></h2><p><Bi en="As the owner of this private site, claim the editor once. Only your signed-in account can publish after that." vi="Với tư cách chủ trang riêng này, hãy nhận quyền quản trị một lần. Sau đó chỉ tài khoản của bạn mới có thể đăng bài." /></p><button className="button" type="button" disabled={busy} onClick={claim}><Bi en="Claim editor" vi="Nhận quyền quản trị" /> ↗</button>{message && <p role="alert">{message}</p>}</div>;

  return <div className="studio-layout">
    <form className="composer" onSubmit={save}>
      <div className="studio-heading"><div><p className="eyebrow"><Bi en="Compose" vi="Soạn bài" /></p><h2 className="studio-title"><Bi en={editId ? "Edit post" : "New post"} vi={editId ? "Sửa bài" : "Bài mới"} /></h2></div>{editId && <button type="button" className="text-action" onClick={() => { setEditId(null); setForm(empty); setTagText(""); }}><Bi en="Cancel edit" vi="Hủy sửa" /></button>}</div>
      <div className="studio-pair">
        <div className="form-field"><label htmlFor="post-kind"><Bi en="Section" vi="Mục" /></label><select id="post-kind" value={form.kind} onChange={event => update("kind", event.target.value as Kind)}><option value="blog">Technical Writing</option><option value="project">Projects</option></select></div>
        <div className="form-field"><label htmlFor="post-status"><Bi en="Visibility" vi="Hiển thị" /></label><select id="post-status" value={form.status} onChange={event => update("status", event.target.value as Status)}><option value="draft">Draft — private</option><option value="published">Published — visible</option></select></div>
      </div>
      <div className="form-field"><label htmlFor="title-en"><Bi en="Title (English)" vi="Tiêu đề (tiếng Anh)" /></label><input id="title-en" maxLength={120} required value={form.titleEn} onChange={event => update("titleEn", event.target.value)} placeholder="A clear title for the post" /></div>
      <div className="form-field"><label htmlFor="summary-en"><Bi en="Short summary (English)" vi="Mô tả ngắn (tiếng Anh)" /></label><textarea id="summary-en" maxLength={300} required value={form.excerptEn} onChange={event => update("excerptEn", event.target.value)} placeholder="One or two sentences for the listing" /></div>
      <div className="form-field"><label htmlFor="body-en"><Bi en="Post (English)" vi="Nội dung (tiếng Anh)" /></label><textarea id="body-en" className="body-editor" maxLength={12000} required value={form.bodyEn} onChange={event => update("bodyEn", event.target.value)} placeholder="Write your post here. Paragraph breaks are preserved." /></div>
      <details className="translation-fields"><summary><Bi en="Add Vietnamese translation (optional)" vi="Thêm bản tiếng Việt (tùy chọn)" /></summary><p className="muted"><Bi en="If omitted, visitors using VI will see the English post." vi="Nếu để trống, người xem chọn VI sẽ thấy bài tiếng Anh." /></p>
        <div className="form-field"><label htmlFor="title-vi">Tiêu đề</label><input id="title-vi" maxLength={120} value={form.titleVi} onChange={event => update("titleVi", event.target.value)} /></div>
        <div className="form-field"><label htmlFor="summary-vi">Mô tả ngắn</label><textarea id="summary-vi" maxLength={300} value={form.excerptVi} onChange={event => update("excerptVi", event.target.value)} /></div>
        <div className="form-field"><label htmlFor="body-vi">Nội dung</label><textarea id="body-vi" className="body-editor" maxLength={12000} value={form.bodyVi} onChange={event => update("bodyVi", event.target.value)} /></div>
      </details>
      <div className="form-field"><label htmlFor="post-tags"><Bi en="Tags (comma separated)" vi="Thẻ (phân cách bằng dấu phẩy)" /></label><input id="post-tags" value={tagText} onChange={event => { setTagText(event.target.value); update("tags", event.target.value.split(",").map(tag => tag.trim()).filter(Boolean)); }} placeholder="React, API, Design" /></div>
      <div className="form-field"><label htmlFor="post-images"><Bi en="Images · up to 5" vi="Ảnh · tối đa 5" /></label><input id="post-images" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" onChange={upload} disabled={busy || form.images.length >= 5} /></div>
      {form.images.length ? <div className="image-previews">{form.images.map((key, index) => <div key={key}><img src={`/api/media/${key}`} alt={`Post image ${index + 1}`} /><button type="button" onClick={() => update("images", form.images.filter(image => image !== key))} aria-label={`Remove image ${index + 1}`}>×</button></div>)}</div> : null}
      <div className="studio-actions"><button className="button" type="submit" disabled={busy}><Bi en={busy ? "Working…" : "Save post"} vi={busy ? "Đang xử lý…" : "Lưu bài"} /> ↗</button><span className="muted"><Bi en="Drafts stay private. Publish when ready." vi="Bản nháp chỉ mình bạn thấy. Xuất bản khi sẵn sàng." /></span></div>
      {message && <p role="status" className="studio-message">{message}</p>}
    </form>
    <section className="studio-posts" aria-labelledby="studio-posts-title"><p className="eyebrow"><Bi en="Your content" vi="Nội dung của bạn" /></p><h2 id="studio-posts-title" className="studio-title"><Bi en="Posts" vi="Bài đăng" /> <span className="muted">({items.length})</span></h2>
      {items.length ? items.map(item => <div className="studio-post-row" key={item.id}><div><span className="eyebrow">{item.kind === "blog" ? "TECH WRITING" : "PROJECT"} · {item.status.toUpperCase()}</span><h3>{item.titleEn}</h3><p className="muted">{new Date(item.updatedAt).toLocaleDateString("en-GB")}</p></div><div className="studio-row-actions"><button type="button" onClick={() => edit(item)}><Bi en="Edit" vi="Sửa" /></button>{item.status === "published" && <Link href={`/${item.kind === "blog" ? "blog" : "projects"}/${item.slug}`} target="_blank"><Bi en="View" vi="Xem" /></Link>}<button type="button" onClick={() => remove(item)}><Bi en="Delete" vi="Xóa" /></button></div></div>) : <p className="muted"><Bi en="No posts yet. Your first draft starts on the left." vi="Chưa có bài đăng. Hãy bắt đầu với bản nháp đầu tiên ở bên trái." /></p>}
    </section>
  </div>;
}
