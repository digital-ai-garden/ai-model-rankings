import type { Award } from "@/lib/awards";

export default function AwardCard({ a, onClick }: { a: Award; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 9,
        padding: "18px 20px",
        background: "var(--card)",
        border: "1.5px solid var(--card-border)",
        borderRadius: 20,
        boxShadow: "0 3px 0 var(--card-border)",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 900, color: "var(--ink-body-2)" }}>最強{a.title}</span>
        {a.hasFlag && (
          <span style={{ padding: "2px 7px", borderRadius: 6, background: "var(--medal-rest-bg)", fontSize: 9.5, fontWeight: 900, color: "var(--ink-faint-2)" }}>
            {a.flag}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 14, background: a.winBg }}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>👑</span>
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.25 }}>{a.winner}</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-weak-2)" }}>{a.winnerMaker}</span>
        </div>
        <span className="font-num" style={{ fontSize: 20, fontWeight: 900, color: a.winColor }}>
          {a.winValue}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {a.runners.map((r) => (
          <div key={r.rank} style={{ display: "grid", gridTemplateColumns: "18px 1fr auto", gap: 9, alignItems: "center" }}>
            <span className="font-num" style={{ fontSize: 11.5, fontWeight: 900, color: "var(--ink-disabled)" }}>
              {r.rank}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-body)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.name}
            </span>
            <span className="font-num" style={{ fontSize: 12.5, fontWeight: 900, color: "var(--ink-weak)" }}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
