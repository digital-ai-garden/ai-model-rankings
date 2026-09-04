import { MODELS } from "@/data/models";
import { QUARTERS } from "@/data/metrics";
import { ACCENT } from "@/lib/ui";
import { useIsMobile } from "@/lib/useIsMobile";
import BrandLogo from "../BrandLogo";

type Props = {
  qi: number;
  playing: boolean;
  onToggle: () => void;
  onQuarterChange: (qi: number) => void;
};

export default function Timeline({ qi, playing, onToggle, onQuarterChange }: Props) {
  const isMobile = useIsMobile();
  const timeline = [...MODELS]
    .sort((a, b) => b.overall - a.overall)
    .map((m) => ({
      ...m,
      on: m.q <= qi,
    }));
  const shownCount = MODELS.filter((m) => m.q <= qi).length;

  return (
    <section className="view-pop">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>リリース時系列</h2>
        <span className="font-num" style={{ fontSize: isMobile ? 30 : 50, fontWeight: 900, lineHeight: 0.9, color: ACCENT }}>
          {QUARTERS[qi]}
        </span>
      </div>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
          borderRadius: 22,
          boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
          padding: isMobile ? "16px 16px" : "24px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, marginBottom: 22, flexWrap: "wrap" }}>
          <button
            onClick={onToggle}
            style={{
              padding: isMobile ? "9px 16px" : "11px 22px",
              borderRadius: 999,
              border: "none",
              background: ACCENT,
              color: "#fff",
              fontWeight: 900,
              fontSize: 13,
              boxShadow: "0 3px 0 rgba(0,0,0,0.12)",
              cursor: "pointer",
            }}
          >
            {playing ? "■ 停止" : "▶ 再生"}
          </button>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={qi}
            onChange={(e) => onQuarterChange(Number(e.target.value))}
            style={{ flex: 1, minWidth: 100, accentColor: "#d99a2b" }}
          />
          <span className="font-num" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-faint)" }}>
            {shownCount} models
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 10 }}>
          {timeline.map((m) =>
            isMobile ? (
              <div key={m.id} className="timeline-fade" style={{ display: "flex", flexDirection: "column", gap: 5, opacity: m.on ? 1 : 0.16 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                      <BrandLogo maker={m.maker} model={m.name} size={15} />
                      <span style={{ fontSize: 14, fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.name}</span>
                    </span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-faint-2)" }}>
                      {m.maker} · {m.quarter}
                    </span>
                  </div>
                  <span className="font-num" style={{ fontSize: 17, fontWeight: 900, color: m.color, flex: "none" }}>
                    {m.on ? (m.pending ? "測定中" : m.overall) : "—"}
                  </span>
                </div>
                <div style={{ height: 12, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                  <div
                    className="bar-fill"
                    style={{ height: "100%", width: m.on ? `${m.overall}%` : "0%", borderRadius: 999, background: `linear-gradient(90deg, ${m.color}, ${m.color2})` }}
                  />
                </div>
              </div>
            ) : (
              <div
                key={m.id}
                className="timeline-fade"
                style={{ display: "grid", gridTemplateColumns: "210px 1fr 60px", gap: 14, alignItems: "center", opacity: m.on ? 1 : 0.16 }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <BrandLogo maker={m.maker} model={m.name} size={16} />
                    <span style={{ fontSize: 15, fontWeight: 900 }}>{m.name}</span>
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint-2)" }}>
                    {m.maker} · {m.quarter}
                  </span>
                </div>
                <div style={{ height: 16, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                  <div
                    className="bar-fill"
                    style={{ height: "100%", width: m.on ? `${m.overall}%` : "0%", borderRadius: 999, background: `linear-gradient(90deg, ${m.color}, ${m.color2})` }}
                  />
                </div>
                <span className="font-num" style={{ fontSize: 19, fontWeight: 900, textAlign: "right", color: m.color }}>
                  {m.on ? (m.pending ? "測定中" : m.overall) : "—"}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
