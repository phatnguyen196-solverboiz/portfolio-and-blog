import Link from "next/link";
import { Bi } from "./language-switch";
import { safeList, type Post } from "@/lib/content";

export function PostDetail({ post }: { post: Post }) {
  const images = safeList(post.images);
  const tags = safeList(post.tags);
  return (
    <article className="wrap article-page">
      <Link className="article-back" href={post.kind === "blog" ? "/blog" : "/projects"}>
        ← <Bi en="Back to all posts" vi="Trở lại danh sách" />
      </Link>
      <header className="article-head">
        <p className="eyebrow"><Bi en={post.kind === "blog" ? "Technical Writing" : "Projects"} vi={post.kind === "blog" ? "Chia sẻ kỹ thuật" : "Dự án"} /> · {new Date(post.createdAt).toLocaleDateString("en-GB")}</p>
        <h1 className="page-title"><Bi en={post.titleEn} vi={post.titleVi || post.titleEn} /></h1>
        <p className="page-intro"><Bi en={post.excerptEn} vi={post.excerptVi || post.excerptEn} /></p>
        {tags.length ? <div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div> : null}
      </header>
      {images.length ? <div className="article-gallery">{images.map((key, index) => <img key={key} src={`/api/media/${key}`} alt={`${post.titleEn}, image ${index + 1}`} loading={index ? "lazy" : "eager"} />)}</div> : null}
      <div className="article-body"><div className="lang-en">{post.bodyEn}</div><div className="lang-vi">{post.bodyVi || post.bodyEn}</div></div>
    </article>
  );
}
