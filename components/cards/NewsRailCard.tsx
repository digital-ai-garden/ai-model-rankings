import type { DecoratedNews } from "@/lib/news";
import { useIsMobile } from "@/lib/useIsMobile";
import ImageSlot from "../ImageSlot";

export default function NewsRailCard({ n, onClick }: { n: DecoratedNews; onClick: () => void }) {
  const isMobile = useIsMobile();
  return (
    <article
      onClick={onClick}
      className="card-hover mq-1col"
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "130px 1fr",
        gap: isMobile ? 8 : 16,
        padding: isMobile ? "14px 16px" : "18px 22px",
        background: "var(--card)",
        border: "1.5px solid var(--card-border)",
        borderRadius: 18,
        boxShadow: "0 3px 0 var(--card-border)",
        cursor: "pointer",
      }}
    >
      <div className="mq-hide" style={{ display: isMobile ? "none" : "flex", flexDirection: "column", gap: 4 }}>
        <ImageSlot width={130} height={98} credit={n.credit} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ padding: "2px 9px", borderRadius: 6, background: n.catBg, color: n.catFg, fontSize: 10, fontWeight: 900 }}>{n.cat}</span>
          <span className="font-num" style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint-2)" }}>
            {n.date} · {n.ago}
          </span>
        </div>
        <span style={{ fontSize: isMobile ? 15 : 17, fontWeight: 900, lineHeight: 1.42 }}>{n.title}</span>
        <span className="mq-hide" style={{ display: isMobile ? "none" : "block", fontSize: 13, lineHeight: 1.8, color: "var(--ink-body-2)" }}>
          {n.body}
        </span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint-2)" }}>出典 {n.source}</span>
      </div>
    </article>
  );
}
