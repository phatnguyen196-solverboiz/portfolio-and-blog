"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Home,
  User,
  Code,
  FileText,
  Mail,
  Copy,
  Printer,
  Languages,
  ArrowUp,
  ExternalLink,
  Check,
  Terminal,
  Sparkles,
  Layers,
  Briefcase,
  Shield,
  Trophy,
} from "lucide-react";
import { Bi, toggleGlobalLanguage } from "./language-switch";

export interface CommandMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function openCommandMenu() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-command-menu"));
  }
}

export function CommandMenu({ open: controlledOpen, onOpenChange }: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const router = useRouter();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  // Global keyboard shortcuts (Cmd+K, Ctrl+K, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!isOpen);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-menu", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-menu", handleCustomOpen);
    };
  }, [isOpen, setOpen]);

  // Lock body scroll when dialog is active
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  const runAction = useCallback(
    (action: () => void) => {
      setOpen(false);
      action();
    },
    [setOpen]
  );

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("phatnguyen1962005@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
        setOpen(false);
      }, 900);
    } catch {
      // Fallback
      setOpen(false);
    }
  }, [setOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="cmd-overlay"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="cmd-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        onClick={(e) => e.stopPropagation()}
      >
        <Command loop label="Global Command Menu">
          <div className="cmd-input-wrapper">
            <Search className="cmd-input-icon" size={18} aria-hidden="true" />
            <Command.Input
              className="cmd-input"
              placeholder="Type a command or search... / Nhập lệnh hoặc tìm kiếm..."
              autoFocus
            />
            <kbd className="cmd-shortcut">ESC</kbd>
          </div>

          <Command.List className="cmd-list">
            <Command.Empty className="cmd-group-label" style={{ textAlign: "center", padding: "28px 16px" }}>
              <Bi
                en="No matching commands or destinations found."
                vi="Không tìm thấy lệnh hoặc trang phù hợp."
              />
            </Command.Empty>

            {/* Navigation Category */}
            <Command.Group
              heading={<Bi en="Navigation" vi="Điều hướng các trang" />}
            >
              <Command.Item
                className="cmd-item"
                value="home trang chu trinh khoi tao landing"
                onSelect={() => runAction(() => { window.location.href = "/"; })}
              >
                <div className="cmd-item-left">
                  <Home className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Home" vi="Trang chủ" />
                  </span>
                </div>
                <span className="cmd-shortcut">G H</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="about cv resume curriculum vitae background kinh nghiem tieu su"
                onSelect={() => runAction(() => { window.location.href = "/about"; })}
              >
                <div className="cmd-item-left">
                  <User className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="About / CV" vi="Giới thiệu & Lý lịch CV" />
                  </span>
                </div>
                <span className="cmd-shortcut">G A</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="projects du an selected work showcases san pham source code"
                onSelect={() => runAction(() => { window.location.href = "/projects"; })}
              >
                <div className="cmd-item-left">
                  <Code className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Projects & Selected Work" vi="Dự án & Sản phẩm chọn lọc" />
                  </span>
                </div>
                <span className="cmd-shortcut">G P</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="blog technical blog bai viet chia se ky thuat essays articles"
                onSelect={() => runAction(() => { window.location.href = "/blog"; })}
              >
                <div className="cmd-item-left">
                  <FileText className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Technical Blog" vi="Blog Kỹ thuật & Kiến trúc" />
                  </span>
                </div>
                <span className="cmd-shortcut">G B</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="achievements thanh tuu giai thuong hackathons awards certifications credentials accolades"
                onSelect={() => runAction(() => { window.location.href = "/achievements"; })}
              >
                <div className="cmd-item-left">
                  <Trophy className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Achievements & Awards" vi="Thành tựu & Giải thưởng" />
                  </span>
                </div>
                <span className="cmd-shortcut">G T</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="contact lien he inquiry email trao doi hop tac message"
                onSelect={() => runAction(() => { window.location.href = "/contact"; })}
              >
                <div className="cmd-item-left">
                  <Mail className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Contact & Inquiry" vi="Liên hệ & Hợp tác" />
                  </span>
                </div>
                <span className="cmd-shortcut">G C</span>
              </Command.Item>
            </Command.Group>

            {/* Featured Projects Category */}
            <Command.Group
              heading={<Bi en="Featured Projects" vi="Dự án nổi bật" />}
            >
              <Command.Item
                className="cmd-item"
                value="distributed task queue worker engine go redis docker concurrency"
                onSelect={() => runAction(() => router.push("/projects#task-queue"))}
              >
                <div className="cmd-item-left">
                  <Terminal className="cmd-item-icon" size={16} />
                  <span>
                    <Bi
                      en="Distributed Task Queue & Worker Engine"
                      vi="Hệ thống hàng đợi tác vụ phân tán (Go & Redis)"
                    />
                  </span>
                </div>
                <span className="badge badge-sm badge-accent">Go / Redis</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="edge native bilingual content engine cms nextjs cloudflare drizzle"
                onSelect={() => runAction(() => router.push("/projects#cms-engine"))}
              >
                <div className="cmd-item-left">
                  <Sparkles className="cmd-item-icon" size={16} />
                  <span>
                    <Bi
                      en="Edge Bilingual CMS & Portfolio Engine"
                      vi="Nền tảng CMS & Portfolio đa ngôn ngữ trên Edge"
                    />
                  </span>
                </div>
                <span className="badge badge-sm badge-accent">Next.js 16</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="real time collaborative code canvas crdt yjs websockets monaco"
                onSelect={() => runAction(() => router.push("/projects#code-canvas"))}
              >
                <div className="cmd-item-left">
                  <Layers className="cmd-item-icon" size={16} />
                  <span>
                    <Bi
                      en="Real-Time Collaborative Code Canvas"
                      vi="Bảng vẽ mã nguồn cộng tác thời gian thực (CRDT)"
                    />
                  </span>
                </div>
                <span className="badge badge-sm badge-accent">CRDT / WebSockets</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="algorithmic asset analyzer portfolio simulator python typescript monte carlo"
                onSelect={() => runAction(() => router.push("/projects#asset-analyzer"))}
              >
                <div className="cmd-item-left">
                  <Briefcase className="cmd-item-icon" size={16} />
                  <span>
                    <Bi
                      en="Algorithmic Asset Analyzer & Simulator"
                      vi="Công cụ mô phỏng & phân tích danh mục định lượng"
                    />
                  </span>
                </div>
                <span className="badge badge-sm badge-accent">Python / TS</span>
              </Command.Item>
            </Command.Group>

            {/* Actions Category */}
            <Command.Group
              heading={<Bi en="Quick Actions" vi="Thao tác nhanh" />}
            >
              <Command.Item
                className="cmd-item"
                value="copy email sao chep dia chi email phatnguyen1962005@gmail.com"
                onSelect={handleCopyEmail}
              >
                <div className="cmd-item-left">
                  {copiedEmail ? (
                    <Check className="cmd-item-icon" size={16} style={{ color: "#10b981" }} />
                  ) : (
                    <Copy className="cmd-item-icon" size={16} />
                  )}
                  <span>
                    {copiedEmail ? (
                      <Bi en="Copied to clipboard!" vi="Đã sao chép vào bộ nhớ tạm!" />
                    ) : (
                      <Bi en="Copy Email Address" vi="Sao chép địa chỉ Email" />
                    )}
                  </span>
                </div>
                <span className="cmd-shortcut">⌘C</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="toggle switch language chuyen doi ngon ngu tieng anh tieng viet english vietnamese"
                onSelect={() => runAction(() => toggleGlobalLanguage())}
              >
                <div className="cmd-item-left">
                  <Languages className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Toggle Language (EN / VI)" vi="Chuyển đổi ngôn ngữ (EN / VI)" />
                  </span>
                </div>
                <span className="cmd-shortcut">⌘L</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="print export pdf cv resume in ban in resume"
                onSelect={() => runAction(() => window.print())}
              >
                <div className="cmd-item-left">
                  <Printer className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Print / Export CV to PDF" vi="In hoặc xuất lý lịch CV (PDF)" />
                  </span>
                </div>
                <span className="cmd-shortcut">⌘P</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="back to top cuon len dau trang scroll up"
                onSelect={() =>
                  runAction(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  })
                }
              >
                <div className="cmd-item-left">
                  <ArrowUp className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Scroll Back to Top" vi="Cuộn lên đầu trang" />
                  </span>
                </div>
                <span className="cmd-shortcut">↑</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="admin studio editor quan tri quan ly noi dung content"
                onSelect={() => runAction(() => router.push("/admin"))}
              >
                <div className="cmd-item-left">
                  <Shield className="cmd-item-icon" size={16} />
                  <span>
                    <Bi en="Content Studio / Editor" vi="Trang quản trị nội dung" />
                  </span>
                </div>
                <span className="cmd-shortcut">G E</span>
              </Command.Item>
            </Command.Group>

            {/* Social Links Category */}
            <Command.Group
              heading={<Bi en="Social & Profiles" vi="Mạng xã hội & Hồ sơ" />}
            >
              <Command.Item
                className="cmd-item"
                value="github repository source code open source phatnguyen196-solverboiz"
                onSelect={() =>
                  runAction(() => {
                    window.open(
                      "https://github.com/phatnguyen196-solverboiz",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  })
                }
              >
                <div className="cmd-item-left">
                  <ExternalLink className="cmd-item-icon" size={16} />
                  <span>GitHub Profile (@phatnguyen196-solverboiz)</span>
                </div>
                <span className="arrow">↗</span>
              </Command.Item>

              <Command.Item
                className="cmd-item"
                value="linkedin profile career network nguyen trong phat"
                onSelect={() =>
                  runAction(() => {
                    window.open(
                      "https://www.linkedin.com/in/tr%E1%BB%8Dng-ph%C3%A1t-nguy%E1%BB%85n-6714412bb/",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  })
                }
              >
                <div className="cmd-item-left">
                  <ExternalLink className="cmd-item-icon" size={16} />
                  <span>LinkedIn Profile (Nguyen Trong Phat)</span>
                </div>
                <span className="arrow">↗</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
