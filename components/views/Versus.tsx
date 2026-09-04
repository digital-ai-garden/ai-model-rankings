import { RANKABLE_MODELS as MODELS } from "@/data/models";
import { METRICS } from "@/data/metrics";
import { useIsMobile } from "@/lib/useIsMobile";
import BrandLogo from "../BrandLogo";

type VsRow = {
  label: string;
  aLabel: string;
  bLabel: string;
  aPct: number;
  bPct: number;
  aBar: string;
  bBar: string;
  aFg: string;
  bFg: string;
};

type Props = {
  aId: string;
  bId: string;
  mounted: boolean;
  onPickA: (id: string) => void;
  onPickB: (id: string) => void;
};

function bestAxisLabel(m: (typeof MODELS)[number]): string {
  const candidates = METRICS.filter((x) => !x.lowerBetter && x.key !== "cost" && x.max === 100);
  const best = candidates.reduce((b, x) => (m[x.key] > m[b.key] ? x : b), candidates[0]);
  return best.label;
}

function summaryFor(m: (typeof MODELS)[number], wins: number): string {
  if (wins >= 6) return `10軸中${wins}軸で優勢。$${m.pOut}/1M出力で総合${m.overall}。`;
  return `得意分野は${bestAxisLabel(m)}。コスパ指数は${m.cost.toFixed(0)}。`;
}

export default function Versus({ aId, bId, mounted, onPickA, onPickB }: Props) {
  const isMobile = useIsMobile();
  const A = MODELS.find((m) => m.id === aId) || MODELS[0];
  const B = MODELS.find((m) => m.id === bId) || MODELS[1];

  let aWins = 0;
  let bWins = 0;
  const rows: VsRow[] = METRICS.map((m) => {
    const av = A[m.key];
    const bv = B[m.key];
    const aBetter = m.lowerBetter ? av < bv : av > bv;
    const bBetter = m.lowerBetter ? bv < av : bv > av;
    if (aBetter) aWins++;
    if (bBetter) bWins++;
    const norm = (v: number) => Math.max(2, Math.min(100, (m.lowerBetter ? 1 - v / m.max : v / m.max) * 100));
    return {
      label: m.label,
      aLabel: m.fmt(av),
      bLabel: m.fmt(bv),
      aPct: mounted ? norm(av) : 0,
      bPct: mounted ? norm(bv) : 0,
      aBar: aBetter ? A.color : "var(--ink-disabled-4)",
      bBar: bBetter ? B.color : "var(--ink-disabled-4)",
      aFg: aBetter ? A.color : "var(--ink-faint-3)",
      bFg: bBetter ? B.color : "var(--ink-faint-3)",
    };
  });

  const selectStyle = {
    padding: "11px 13px",
    borderRadius: 12,
    border: "1px solid var(--card-border)",
    background: "var(--card-sub-2)",
    fontWeight: 700,
    fontSize: 15,
    color: "#24221f",
  };

  return (
    <section className="view-pop">
      <h2 style={{ margin: "0 0 18px", fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>対決モード</h2>
      <div
        className="mq-1col"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "1fr auto 1fr",
          gap: isMobile ? 8 : 16,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <select value={aId} onChange={(e) => onPickA(e.target.value)} style={selectStyle}>
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* selectのoption内にはロゴを置けないため、ここで選択中モデルを示す */}
            <BrandLogo maker={A.maker} model={A.name} size={26} />
            <span className="font-num" style={{ fontSize: 40, fontWeight: 900, color: A.color, lineHeight: 1 }}>
              {aWins}
              <span style={{ fontSize: 15, color: "var(--ink-faint-2)" }}> / 10 勝</span>
            </span>
          </span>
          <span style={{ fontSize: 13, color: "var(--ink-weak)" }}>{summaryFor(A, aWins)}</span>
        </div>
        <span className="font-num" style={{ fontSize: 20, fontWeight: 900, color: "#cfc8ba", textAlign: "center" }}>
          VS
        </span>
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--card-border)",
            borderRadius: 20,
            boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <select value={bId} onChange={(e) => onPickB(e.target.value)} style={selectStyle}>
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* selectのoption内にはロゴを置けないため、ここで選択中モデルを示す */}
            <BrandLogo maker={B.maker} model={B.name} size={26} />
            <span className="font-num" style={{ fontSize: 40, fontWeight: 900, color: B.color, lineHeight: 1 }}>
              {bWins}
              <span style={{ fontSize: 15, color: "var(--ink-faint-2)" }}> / 10 勝</span>
            </span>
          </span>
          <span style={{ fontSize: 13, color: "var(--ink-weak)" }}>{summaryFor(B, bWins)}</span>
        </div>
      </div>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--card-border)",
          borderRadius: 22,
          boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
          padding: isMobile ? "16px 18px" : "22px 26px",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 14 : 15,
        }}
      >
        {rows.map((r) =>
          isMobile ? (
            <div key={r.label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-sub)" }}>{r.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="font-num" style={{ fontSize: 13, fontWeight: 900, color: r.aFg, width: 44, flex: "none" }}>
                  {r.aLabel}
                </span>
                <div style={{ flex: 1, height: 10, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                  <div className="bar-fill" style={{ height: "100%", width: `${r.aPct}%`, borderRadius: 999, background: r.aBar }} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="font-num" style={{ fontSize: 13, fontWeight: 900, color: r.bFg, width: 44, flex: "none" }}>
                  {r.bLabel}
                </span>
                <div style={{ flex: 1, height: 10, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                  <div className="bar-fill" style={{ height: "100%", width: `${r.bPct}%`, borderRadius: 999, background: r.bBar }} />
                </div>
              </div>
            </div>
          ) : (
            <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1fr 150px 1fr", gap: 14, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end" }}>
                <span className="font-num" style={{ fontSize: 15, fontWeight: 900, color: r.aFg }}>
                  {r.aLabel}
                </span>
                <div
                  style={{
                    width: "100%",
                    maxWidth: 300,
                    height: 12,
                    borderRadius: 999,
                    background: "var(--bar-track)",
                    display: "flex",
                    justifyContent: "flex-end",
                    overflow: "hidden",
                  }}
                >
                  <div className="bar-fill" style={{ height: "100%", width: `${r.aPct}%`, borderRadius: 999, background: r.aBar }} />
                </div>
              </div>
              <span style={{ textAlign: "center", fontSize: 12.5, fontWeight: 700, color: "var(--ink-sub)" }}>{r.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: "100%", maxWidth: 300, height: 12, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                  <div className="bar-fill" style={{ height: "100%", width: `${r.bPct}%`, borderRadius: 999, background: r.bBar }} />
                </div>
                <span className="font-num" style={{ fontSize: 15, fontWeight: 900, color: r.bFg }}>
                  {r.bLabel}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
