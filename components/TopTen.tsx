import { RANKABLE_MODELS } from "@/data/models";
import { METRICS } from "@/data/metrics";
import { card } from "@/lib/ui";
import BrandLogo from "./BrandLogo";

// トップページ用の「総合ランキング TOP 10」。
// 一覧表（Tableコンポーネント）より情報を絞り、1〜10の順位を明示して
// 縦に短く収まるようにしている。詳しく見たい人は「一覧表」タブへ誘導する。

const OVERALL = METRICS.find((m) => m.key === "overall")!;

export default function TopTen({ onOpenModel }: { onOpenModel: (name: string) => void }) {
  const rows = [...RANKABLE_MODELS]
    .sort((a, b) => b.overall - a.overall)
    .slice(0, 10);
  const peak = rows[0]?.overall || 100;

  return (
    <div style={{ ...card, padding: "6px 4px", overflow: "hidden" }}>
      {rows.map((m, i) => (
        <div
          key={m.id}
          onClick={() => onOpenModel(m.name)}
          className="card-hover"
          style={{
            display: "grid",
            gridTemplateColumns: "34px 22px minmax(0,1fr) auto",
            alignItems: "center",
            gap: 10,
            padding: "9px 12px",
            borderRadius: 12,
            cursor: "pointer",
            background: i % 2 === 1 ? "var(--card-sub)" : "transparent",
          }}
        >
          {/* 順位。上位3つだけ色を強めて視線を集める */}
          <span
            className="font-num"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 26,
              height: 26,
              borderRadius: 8,
              background: i < 3 ? m.color : "var(--medal-rest-bg)",
              color: i < 3 ? "#fff" : "var(--ink-weak)",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            {i + 1}
          </span>

          <BrandLogo maker={m.maker} model={m.name} size={20} />

          <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
            <span
              style={{
                fontSize: 14.5,
                fontWeight: 900,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {m.name}
            </span>
            {/* 順位の根拠が一目で分かるよう、簡易バーを添える */}
            <span style={{ height: 4, borderRadius: 999, background: "var(--bar-track)", marginTop: 4, overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: `${(m.overall / peak) * 100}%`,
                  borderRadius: 999,
                  background: `linear-gradient(90deg, ${m.color}, ${m.color2})`,
                }}
              />
            </span>
          </span>

          <span
            className="font-num"
            style={{ fontSize: 16, fontWeight: 900, color: m.color, letterSpacing: "-0.02em" }}
          >
            {OVERALL.fmt(m.overall)}
          </span>
        </div>
      ))}
    </div>
  );
}
