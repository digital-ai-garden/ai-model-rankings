import type { Award } from "@/lib/awards";
import BrandLogo from "../BrandLogo";
import { card } from "@/lib/ui";

// 上位部門の「チャンピオンカード」。
// 2026-09-04：地味だったものを作り直した。提供元カラーの帯を上端に置き、
// 勝者ブロックに厚みを持たせ、スコアを大きく見せている。

export default function AwardCard({ a, onClick }: { a: Award; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="card-hover"
      style={{
        ...card,
        display: "flex",
        flexDirection: "column",
        gap: 11,
        padding: 0,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* 提供元カラーの帯。カードの主役が誰かを一目で示す */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${a.winColor}, ${a.winColor}44)` }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 11, padding: "14px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13.5, fontWeight: 900, color: "var(--ink-body-2)" }}>最強{a.title}</span>
          {a.hasFlag && (
            <span style={{ padding: "2px 7px", borderRadius: 6, background: "var(--medal-rest-bg)", fontSize: 9.5, fontWeight: 900, color: "var(--ink-faint-2)" }}>
              {a.flag}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 16px",
            borderRadius: 14,
            background: a.winBg,
          }}
        >
          {a.kind === "metric" && <BrandLogo maker={a.winnerMaker} model={a.winner} size={30} />}
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: 16, fontWeight: 900, lineHeight: 1.25 }}>{a.winner}</span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-weak-2)" }}>{a.winnerMaker}</span>
          </div>
          <span
            className="font-num"
            style={{ fontSize: 26, fontWeight: 900, color: a.winColor, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            {a.winValue}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {a.runners.map((r) => (
            <div key={r.rank} style={{ display: "grid", gridTemplateColumns: "20px 1fr auto", gap: 9, alignItems: "center" }}>
              <span
                className="font-num"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  borderRadius: 6,
                  background: "var(--medal-rest-bg)",
                  fontSize: 10.5,
                  fontWeight: 900,
                  color: "var(--ink-weak)",
                }}
              >
                {r.rank}
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {r.name}
              </span>
              <span className="font-num" style={{ fontSize: 13, fontWeight: 900, color: "var(--ink-weak)" }}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
