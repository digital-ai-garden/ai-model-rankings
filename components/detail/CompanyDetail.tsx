import type { CompanyDetailView } from "@/lib/detail";
import { backBtn, cardLg } from "@/lib/ui";
import { useIsMobile } from "@/lib/useIsMobile";
import ImageSlot from "../ImageSlot";

export default function CompanyDetail({
  cd,
  onBack,
  onModel,
}: {
  cd: CompanyDetailView;
  onBack: () => void;
  onModel: (name: string) => void;
}) {
  const isMobile = useIsMobile();
  return (
    <section className="detail-pop" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <button onClick={onBack} style={backBtn}>
        ← 戻る
      </button>

      <div className="mq-1col" style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "1.15fr 1fr", gap: 18, alignItems: "start" }}>
        <div style={{ ...cardLg, display: "flex", flexDirection: "column", gap: 14, padding: isMobile ? "20px 18px" : "28px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <ImageSlot width={64} height={64} radius={14} />
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span className="font-num" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.16em", color: "var(--ink-faint-2)" }}>
                会社ランキング {cd.place}位
              </span>
              <h2 style={{ margin: 0, fontSize: isMobile ? 24 : 32, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em" }}>{cd.maker}</h2>
            </div>
          </div>
          <span style={{ fontSize: 14, fontWeight: 900, color: cd.color }}>{cd.tag}</span>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap", padding: "14px 16px", borderRadius: 14, background: "var(--card-sub)" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-faint-2)" }}>設立</span>
              <span style={{ fontSize: 14, fontWeight: 900 }}>{cd.founded}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-faint-2)" }}>拠点</span>
              <span style={{ fontSize: 14, fontWeight: 900 }}>{cd.hq}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-faint-2)" }}>最強モデル</span>
              <span style={{ fontSize: 14, fontWeight: 900 }}>{cd.best}</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.95, color: "var(--ink-body)" }}>{cd.body}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "14px 16px", borderRadius: 14, background: cd.monoBg }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: "#3a3630" }}>強み</span>
            <span style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-body)" }}>{cd.strength}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: "14px 16px",
              borderRadius: 14,
              background: "var(--note-bg)",
              border: "1.5px dashed var(--note-border)",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 900, color: "var(--note-fg)" }}>注意点</span>
            <span style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-body)" }}>{cd.caution}</span>
          </div>
        </div>

        <div style={{ ...cardLg, display: "flex", flexDirection: "column", gap: 11, padding: isMobile ? "18px 16px" : "24px 26px" }}>
          <span style={{ fontSize: 15, fontWeight: 900 }}>掲載モデル</span>
          {cd.models.map((m) => (
            <div
              key={m.name}
              onClick={() => onModel(m.name)}
              className="card-hover"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                padding: "14px 16px",
                borderRadius: 16,
                border: "1.5px solid var(--card-border)",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 900 }}>{m.name}</span>
                <span className="font-num" style={{ fontSize: 19, fontWeight: 900, color: m.pending ? "var(--ink-faint-2)" : m.color }}>
                  {m.pending ? "測定中" : m.overall}
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                <div className="bar-fill" style={{ height: "100%", width: `${m.barPct}%`, borderRadius: 999, background: m.color }} />
              </div>
              <span className="font-num" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-faint-2)" }}>
                SWE-bench V {m.coding} · {m.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
