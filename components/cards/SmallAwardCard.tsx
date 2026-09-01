import type { Award } from "@/lib/awards";

export default function SmallAwardCard({ a, onClick }: { a: Award; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="card-hover"
      style={{
        flex: "0 0 168px",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "13px 14px",
        background: "var(--card)",
        border: "1.5px solid var(--card-border)",
        borderRadius: 16,
        boxShadow: "0 3px 0 var(--card-border)",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11.5, fontWeight: 900, color: "var(--ink-body-2)" }}>最強{a.title}</span>
        {a.hasFlag && (
          <span style={{ padding: "1px 6px", borderRadius: 5, background: "var(--medal-rest-bg)", fontSize: 8.5, fontWeight: 900, color: "var(--ink-faint-2)" }}>
            {a.flag}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", borderRadius: 11, background: a.winBg }}>
        <span style={{ fontSize: 15, lineHeight: 1 }}>👑</span>
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 900,
              lineHeight: 1.25,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {a.winner}
          </span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: "var(--ink-weak-2)" }}>{a.winnerMaker}</span>
        </div>
      </div>
      <span className="font-num" style={{ fontSize: 16, fontWeight: 900, color: a.winColor }}>
        {a.winValue}
      </span>
    </div>
  );
}
