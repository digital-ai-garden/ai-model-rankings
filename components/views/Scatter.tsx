import { useIsMobile } from "@/lib/useIsMobile";
import type { ScatterPoint } from "@/lib/ranking";
import { scatterGridX, scatterGridY } from "@/lib/ranking";

type Props = {
  points: ScatterPoint[];
  mounted: boolean;
  onOpenModel: (name: string) => void;
};

export default function Scatter({ points, mounted, onOpenModel }: Props) {
  const isMobile = useIsMobile();
  const gridY = scatterGridY();
  const gridX = scatterGridX();

  return (
    <section className="view-pop">
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>コスパ散布図</h2>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-weak)" }}>横軸＝出力トークン単価（対数・$/1M）／縦軸＝総合指数。左上ほどお得。円の大きさ＝コスパ指数。</p>
      </div>
      {isMobile && (
        <p style={{ margin: "0 0 8px", fontSize: 11.5, color: "var(--ink-faint-2)" }}>→ 横にスクロールできます</p>
      )}
      <div style={{ overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling: "touch" }}>
      <div
        style={{
          position: "relative",
          background: "var(--card)",
          border: "1px solid var(--card-border)",
          borderRadius: 22,
          boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
          padding: "26px 34px 46px 58px",
          minWidth: isMobile ? 820 : undefined,
        }}
      >
        <div style={{ position: "relative", height: 460, borderLeft: "1px solid var(--rule-strong)", borderBottom: "1px solid var(--rule-strong)" }}>
          {gridY.map((g) => (
            <div key={g.label} style={{ position: "absolute", left: 0, right: 0, top: `${g.topPct}%`, borderTop: "1px dashed var(--grid-dash)" }}>
              <span className="font-num" style={{ position: "absolute", left: -44, top: -9, fontSize: 11, color: "var(--ink-faint-2)" }}>
                {g.label}
              </span>
            </div>
          ))}
          {gridX.map((g) => (
            <div key={g.label} style={{ position: "absolute", top: 0, bottom: 0, left: `${g.leftPct}%`, borderLeft: "1px dashed var(--grid-dash)" }}>
              <span className="font-num" style={{ position: "absolute", bottom: -26, left: -16, fontSize: 11, color: "var(--ink-faint-2)" }}>
                {g.label}
              </span>
            </div>
          ))}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "44%",
              height: "32%",
              background: "linear-gradient(135deg, rgba(255,222,140,0.4), rgba(255,222,140,0))",
            }}
          >
            <span style={{ position: "absolute", left: 12, top: 10, fontSize: 12, fontWeight: 900, color: "#ac8524" }}>お得ゾーン</span>
          </div>
          {points.map((p) => (
            <div
              key={p.model.id}
              onClick={() => onOpenModel(p.model.name)}
              className="dot-move"
              style={{
                position: "absolute",
                left: `${p.leftPct}%`,
                top: mounted ? `${p.topPct}%` : "100%",
                width: 0,
                height: 0,
                cursor: "pointer",
                zIndex: 1,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: p.tickTopPx,
                  width: 1,
                  height: p.tickHPx,
                  background: "#e2dbcb",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: p.sizePx,
                  height: p.sizePx,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  background: p.model.color,
                  border: "3px solid #fff",
                  boxShadow: "0 3px 10px rgba(30,25,15,0.18)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: p.labelTopPx,
                  transform: "translate(-50%, -50%)",
                  whiteSpace: "nowrap",
                  padding: "3px 8px",
                  borderRadius: 7,
                  background: "var(--card-sub-3)",
                  border: "1.2px solid var(--card-border)",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--ink-body)",
                }}
              >
                {p.model.name}
              </span>
            </div>
          ))}
        </div>
        <span
          className="font-num"
          style={{ position: "absolute", left: 58, bottom: 12, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink-faint-2)" }}
        >
          OUTPUT PRICE →
        </span>
      </div>
      </div>
    </section>
  );
}
