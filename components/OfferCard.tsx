import { KIND_LABEL, type Offer } from "@/data/offers";
import { card } from "@/lib/ui";

// ============================================================================
// 商業リンクの唯一の出口。
//
// アフィリエイトリンクを出す場所をこの1コンポーネントに限定することで、
// 「PR表記の付け忘れ」「rel属性の付け忘れ」を構造的に防いでいる。
// 個別のページで <a href> を直接書いてオファーを出してはいけない。
//
//   - pr: true のとき「PR」バッジを必ず表示（景表法・ステマ規制対応）
//   - rel="sponsored nofollow noopener" を必ず付与（検索エンジンの要件）
//   - url 未設定なら、そもそもリンクにしない（ASP審査前の状態）
// ============================================================================

export default function OfferCard({ offer }: { offer: Offer }) {
  const linked = Boolean(offer.url);

  const inner = (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span
          className="font-num"
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-faint-2)",
          }}
        >
          {KIND_LABEL[offer.kind]}
        </span>
        {offer.pr && (
          <span
            style={{
              padding: "2px 7px",
              borderRadius: 999,
              background: "var(--note-bg)",
              border: "1px solid var(--note-border)",
              color: "var(--note-fg)",
              fontSize: 10.5,
              fontWeight: 900,
              letterSpacing: "0.04em",
            }}
          >
            PR
          </span>
        )}
      </div>

      <span style={{ fontSize: 16, fontWeight: 900, color: "var(--ink)" }}>{offer.name}</span>
      <span style={{ fontSize: 13.5, lineHeight: 1.75, color: "var(--ink-body)" }}>{offer.summary}</span>

      {linked && (
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--link)" }}>詳しく見る →</span>
      )}
    </>
  );

  const boxStyle = {
    ...card,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column" as const,
    gap: 7,
    textDecoration: "none",
  };

  if (!linked) {
    return <div style={boxStyle}>{inner}</div>;
  }

  return (
    <a
      href={offer.url}
      target="_blank"
      rel="sponsored nofollow noopener"
      className="card-hover"
      style={boxStyle}
    >
      {inner}
    </a>
  );
}
