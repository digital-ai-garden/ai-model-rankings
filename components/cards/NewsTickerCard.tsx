import type { DecoratedNews } from "@/lib/news";
import ImageSlot from "../ImageSlot";

// トップ最上部の自動横スクロール帯（ティッカー）専用の小型カード。
//
// 汎用の NewsRailCard は「画像130px＋本文」の横並びで、帯の中に入れると
// 幅が足りず縦に伸びてPCで大きすぎた。こちらは縦積みにして高さを抑えている。
// 本文（body）は出さず、カテゴリ・日付・見出しだけに絞る。

export default function NewsTickerCard({ n, onClick }: { n: DecoratedNews; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 10,
        background: "var(--card)",
        border: "1px solid var(--card-border)",
        borderRadius: 14,
        boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
        cursor: "pointer",
        height: "100%",
      }}
    >
      <ImageSlot width={230} height={96} src={n.image} credit={n.credit} />
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 6,
            background: n.catBg,
            color: n.catFg,
            fontSize: 9.5,
            fontWeight: 900,
            whiteSpace: "nowrap",
          }}
        >
          {n.cat}
        </span>
        <span className="font-num" style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-faint-2)" }}>
          {n.ago}
        </span>
      </div>
      {/* 見出しは2行で打ち切り、カードの高さを揃える */}
      <span
        style={{
          fontSize: 13.5,
          fontWeight: 900,
          lineHeight: 1.45,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {n.title}
      </span>
    </article>
  );
}
