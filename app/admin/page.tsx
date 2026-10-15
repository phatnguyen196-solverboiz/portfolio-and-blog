import { Bi } from "@/components/language-switch";
import { SiteShell } from "@/components/site-shell";
import { Studio } from "@/components/studio";
import { chatGPTSignInPath } from "@/app/chatgpt-auth";
import { adminState } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { user, owner, isAdmin } = await adminState();
  return <SiteShell><div className="wrap">
    <header className="page-head"><p className="eyebrow"><Bi en="Private workspace" vi="Không gian riêng" /></p><h1 className="page-title"><Bi en="Editor." vi="Quản trị bài viết." /></h1><p className="page-intro"><Bi en="Create and manage the posts shown in Projects and Technical Writing." vi="Tạo và quản lý bài đăng ở trang Dự án và Chia sẻ kỹ thuật." /></p></header>
    <section className="page-content">
      {!user ? <div className="empty-state"><h2><Bi en="Sign in to continue." vi="Đăng nhập để tiếp tục." /></h2><p><Bi en="Your editor is protected by your account." vi="Trình soạn bài được bảo vệ bằng tài khoản của bạn." /></p><a className="button" href={chatGPTSignInPath("/admin")} target="_top"><Bi en="Sign in with ChatGPT" vi="Đăng nhập bằng ChatGPT" /> ↗</a></div>
        : !owner ? <Studio mode="claim" />
        : !isAdmin ? <div className="empty-state"><h2><Bi en="Private editor." vi="Trình soạn bài riêng." /></h2><p><Bi en="This account does not own the editor." vi="Tài khoản này không có quyền quản trị." /></p></div>
        : <Studio mode="editor" />}
    </section>
  </div></SiteShell>;
}
