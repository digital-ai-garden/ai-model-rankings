import { RADAR } from "@/data/metrics";
import { MODELS, type Model } from "@/data/models";
import { SOFT } from "@/data/metrics";
import { useIsMobile } from "@/lib/useIsMobile";

type Props = {
  picks: string[];
  mounted: boolean;
  onPick: (id: string) => void;
};

const CX = 190;
const CY = 190;
const R = 130;

function axisPoint(i: number, radius: number) {
  const ang = -Math.PI / 2 + (i * 2 * Math.PI) / RADAR.length;
  return { x: CX + Math.cos(ang) * radius, y: CY + Math.sin(ang) * radius, cos: Math.cos(ang) };
}

export default function Radar({ picks, mounted, onPick }: Props) {
  const rings = [0.25, 0.5, 0.75, 1].map((f) => R * f);
  const axes = RADAR.map((a, i) => {
    const p = axisPoint(i, R);
    const lp = axisPoint(i, R + 28);
    return {
      x: p.x,
      y: p.y,
      lx: lp.x,
      ly: lp.y + 4,
      anchor: p.cos > 0.25 ? "start" : p.cos < -0.25 ? "end" : "middle",
      label: a.label,
    };
  });

  const radarShapes = picks.map((id) => {
    const m = MODELS.find((x) => x.id === id) as Model;
    const pts = RADAR.map((a, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / RADAR.length;
      const f = mounted ? Math.min(1, m[a.key] / a.max) : 0.02;
      return `${(CX + Math.cos(ang) * R * f).toFixed(1)},${(CY + Math.sin(ang) * R * f).toFixed(1)}`;
    }).join(" ");
    return { points: pts, color: m.color, fill: SOFT(m.hue) };
  });

  const pickList = MODELS.map((m) => {
    const on = picks.includes(m.id);
    return { model: m, on };
  });

  const isMobile = useIsMobile();
  return (
    <section className="view-pop">
      <h2 style={{ margin: "0 0 16px", fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>
        レーダー比較<span style={{ marginLeft: 12, fontSize: 13, fontWeight: 700, color: "var(--ink-weak)" }}>最大3モデルまで選択</span>
      </h2>
      <div className="mq-1col" style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "1.05fr 1fr", gap: 20, alignItems: "start" }}>
        <div
          style={{
            background: "var(--card)",
            border: "1.5px solid var(--card-border)",
            borderRadius: 22,
            boxShadow: "0 4px 0 var(--card-border)",
            padding: isMobile ? 16 : 26,
            display: "flex",
            justifyContent: "center",
            position: isMobile ? "static" : "sticky",
            top: 20,
          }}
        >
          <svg viewBox="0 0 380 380" style={{ width: "100%", maxWidth: 470, overflow: "visible" }}>
            {rings.map((r) => (
              <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="var(--card-border)" strokeWidth={1} />
            ))}
            {axes.map((a) => (
              <line key={a.label} x1={CX} y1={CY} x2={a.x} y2={a.y} stroke="var(--rule-strong)" strokeWidth={1} />
            ))}
            {radarShapes.map((s, i) => (
              <polygon key={i} points={s.points} fill={s.fill} stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" />
            ))}
            {axes.map((a) => (
              <text
                key={a.label}
                x={a.lx}
                y={a.ly}
                textAnchor={a.anchor as "start" | "middle" | "end"}
                fontSize={13}
                fontWeight={700}
                fill="var(--ink-sub)"
                fontFamily="Zen Kaku Gothic New, sans-serif"
              >
                {a.label}
              </text>
            ))}
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {pickList.map(({ model: m, on }) => (
            <button
              key={m.id}
              onClick={() => onPick(m.id)}
              className="card-hover"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 15,
                border: `1.5px solid ${on ? m.color : "var(--card-border)"}`,
                background: on ? SOFT(m.hue) : "var(--card)",
                boxShadow: "0 3px 0 var(--card-border)",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <span style={{ width: 14, height: 14, borderRadius: 5, background: on ? m.color : "var(--ink-disabled-3)", flex: "none" }} />
              <span style={{ flex: 1, fontSize: 15, fontWeight: 900, color: "#24221f" }}>{m.name}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-faint)" }}>{m.maker}</span>
              <span className="font-num" style={{ fontSize: 16, fontWeight: 900, color: on ? m.color : "var(--ink-disabled-3)" }}>
                {m.overall}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
