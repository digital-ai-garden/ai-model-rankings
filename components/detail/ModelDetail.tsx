import type { ModelDetailView } from "@/lib/detail";
import { backBtn, cardLg } from "@/lib/ui";
import { useIsMobile } from "@/lib/useIsMobile";

export default function ModelDetail({
  md,
  onBack,
  onCompany,
  onVersus,
}: {
  md: ModelDetailView;
  onBack: () => void;
  onCompany: () => void;
  onVersus: () => void;
}) {
  const isMobile = useIsMobile();
  return (
    <section className="detail-pop" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <button onClick={onBack} style={backBtn}>
        ← 戻る
      </button>

      <div className="mq-1col" style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : md.cols, gap: 18, alignItems: "start" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            padding: isMobile ? "20px 18px" : "28px 30px",
            background: md.bg,
            border: `2px solid ${md.color}`,
            borderRadius: 24,
            maxWidth: "78ch",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {md.hasCompany && (
              <button
                onClick={onCompany}
                style={{
                  padding: "5px 12px",
                  borderRadius: 999,
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  background: "var(--card)",
                  fontSize: 12,
                  fontWeight: 900,
                  color: "var(--ink-body-2)",
                }}
              >
                {md.maker} ↗
              </button>
            )}
            <span className="font-num" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-weak-2)" }}>
              {md.quarter}
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: isMobile ? 26 : 36, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{md.name}</h2>
          <span className="font-num" style={{ fontSize: 15, fontWeight: 700, color: "var(--ink-body-2)" }}>
            {md.price}
          </span>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.95, color: "var(--ink-body)" }}>{md.note}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {md.wins.map((w) => (
              <span
                key={w}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 12px",
                  borderRadius: 999,
                  background: "var(--card)",
                  border: `1.5px solid ${md.color}`,
                  fontSize: 12,
                  fontWeight: 900,
                  color: "#3a3630",
                }}
              >
                👑 最強{w}
              </span>
            ))}
          </div>
          {md.hasRows && (
            <button
              onClick={onVersus}
              style={{
                alignSelf: "flex-start",
                marginTop: 4,
                padding: "11px 20px",
                borderRadius: 999,
                border: "none",
                background: "#191817",
                color: "var(--dark-fg)",
                fontSize: 13,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              このモデルで対決させる →
            </button>
          )}
        </div>

        {md.hasRows && (
          <div style={{ ...cardLg, display: "flex", flexDirection: "column", gap: 12, padding: isMobile ? "18px 16px" : "24px 26px" }}>
            <span style={{ fontSize: 15, fontWeight: 900 }}>10軸スコアと順位</span>
            {md.rows.map((r) => (
              <div
                key={r.label}
                style={{ display: "grid", gridTemplateColumns: isMobile ? "76px 1fr 50px 38px" : "104px 1fr 62px 44px", gap: isMobile ? 6 : 10, alignItems: "center" }}
              >
                <span style={{ fontSize: isMobile ? 10.5 : 12, fontWeight: 700, color: "var(--ink-sub)" }}>{r.label}</span>
                <div style={{ height: 9, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                  <div className="bar-fill" style={{ height: "100%", width: `${r.barPct}%`, borderRadius: 999, background: r.color }} />
                </div>
                <span className="font-num" style={{ fontSize: 13, fontWeight: 900, textAlign: "right", color: "#3a3630" }}>
                  {r.value}
                </span>
                <span className="font-num" style={{ fontSize: 12, fontWeight: 700, textAlign: "right", color: "var(--ink-faint-2)" }}>
                  {r.rank}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
