import type { MetricKey } from "@/data/metrics";
import { METRICS } from "@/data/metrics";
import { chipStyle } from "@/lib/ui";
import { useIsMobile } from "@/lib/useIsMobile";
import type { RankedModel } from "@/lib/rankList";

type Props = {
  metric: MetricKey;
  onMetricChange: (k: MetricKey) => void;
  ranked: RankedModel[];
  onOpenModel: (name: string) => void;
};

export default function Rank({ metric, onMetricChange, ranked, onOpenModel }: Props) {
  const isMobile = useIsMobile();
  const m = METRICS.find((x) => x.key === metric) || METRICS[0];
  return (
    <section className="view-pop">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>ランキング</h2>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {METRICS.map((mt) => (
            <button key={mt.key} onClick={() => onMetricChange(mt.key)} style={chipStyle(metric === mt.key)}>
              {mt.label}
            </button>
          ))}
        </div>
      </div>
      <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--ink-weak)" }}>{m.note}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ranked.map((r) => (
          <div
            key={r.name}
            onClick={() => onOpenModel(r.name)}
            className="card-hover"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "48px 1fr" : "62px 1fr",
              gap: isMobile ? 10 : 16,
              alignItems: "center",
              padding: isMobile ? "10px 12px" : "14px 18px",
              background: "var(--card)",
              border: "1.5px solid var(--card-border)",
              borderRadius: 18,
              boxShadow: "0 3px 0 var(--card-border)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: isMobile ? 48 : 62,
                height: isMobile ? 48 : 62,
                borderRadius: 14,
                background: r.medalBg,
                color: r.medalFg,
              }}
            >
              <span className="font-num" style={{ fontSize: 9, letterSpacing: "0.14em", opacity: 0.7 }}>
                NO.
              </span>
              <span className="font-num" style={{ fontSize: isMobile ? 20 : 26, fontWeight: 900, lineHeight: 0.9 }}>
                {r.rank}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 19, fontWeight: 900 }}>{r.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-faint)" }}>{r.maker}</span>
                  <span
                    className="font-num"
                    style={{ padding: "3px 9px", borderRadius: 7, background: "var(--medal-rest-bg)", fontSize: 11, fontWeight: 700, color: "var(--ink-weak-2)" }}
                  >
                    {r.priceLabel}
                  </span>
                </div>
                <span className="font-num" style={{ fontSize: isMobile ? 19 : 24, fontWeight: 900, color: r.color }}>
                  {r.valueLabel}
                </span>
              </div>
              <div style={{ height: 13, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                <div
                  className="bar-fill"
                  style={{ height: "100%", width: `${r.barPct}%`, borderRadius: 999, background: `linear-gradient(90deg, ${r.color}, ${r.color2})` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
