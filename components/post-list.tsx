import Link from "next/link";
import { Bi } from "./language-switch";
import { postPath, safeList, type Post } from "@/lib/content";

export function PostList({ items }: { items: Post[] }) {
  return (
    <div className="post-grid">
      {items.map((post, idx) => {
        const image = safeList(post.images)[0];
        return (
          <article
            className="post-card animate-fade-in-up"
            key={post.id}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <Link href={postPath(post)} aria-label={post.titleEn}>
              {image ? (
                <div style={{ overflow: "hidden", borderRadius: 8, marginBottom: 18 }}>
                  <img
                    src={`/api/media/${image}`}
                    alt=""
                    loading="lazy"
                    style={{
                      transition: "transform 0.4s ease",
                      display: "block",
                      width: "100%",
                      height: "auto",
                      marginBottom: 0,
                    }}
                  />
                </div>
              ) : null}
              <span className="eyebrow">
                {new Date(post.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <h2>
                <Bi en={post.titleEn} vi={post.titleVi || post.titleEn} />
              </h2>
              <p>
                <Bi en={post.excerptEn} vi={post.excerptVi || post.excerptEn} />
              </p>
              <span className="post-more">
                <Bi en="Read post" vi="Đọc bài" /> <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
