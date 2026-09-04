import type { NewsWithExcerpt } from "@/lib/news";
import ImageSlot from "../ImageSlot";

export default function NewsSideCard({ n, onClick }: { n: NewsWithExcerpt; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 9,
        padding: "17px 20px",
        background: "var(--card)",
        border: "1px solid var(--card-border)",
        borderRadius: 18,
        boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ padding: "2px 8px", borderRadius: 6, background: n.catBg, color: n.catFg, fontSize: 10, fontWeight: 900 }}>{n.cat}</span>
        <span className="font-num" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint-2)" }}>
          {n.date} · {n.ago}
        </span>
      </div>
      <ImageSlot height={120} src={n.image} credit={n.credit} />
      <span style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.45 }}>{n.title}</span>
      <span style={{ fontSize: 12, lineHeight: 1.7, color: "var(--ink-sub)" }}>{n.excerpt}</span>
    </article>
  );
}
