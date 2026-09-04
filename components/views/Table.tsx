import { useMemo } from "react";
import { MODELS, type Model } from "@/data/models";
import { METRICS, type MetricKey } from "@/data/metrics";
import { chipStyle } from "@/lib/ui";
import { useIsMobile } from "@/lib/useIsMobile";
import BrandLogo from "../BrandLogo";

type Props = {
  maker: string;
  sortKey: string;
  sortDir: 1 | -1;
  onMakerChange: (m: string) => void;
  onSort: (key: string) => void;
  onOpenModel: (name: string) => void;
  compact: boolean;
  /** トップページ用。見出し・提供元チップを隠し、指定件数・指定列だけに絞る */
  embedded?: boolean;
  limit?: number;
  only?: MetricKey[];
};

export default function Table({
  maker,
  sortKey,
  sortDir,
  onMakerChange,
  onSort,
  onOpenModel,
  compact,
  embedded = false,
  limit,
  only,
}: Props) {
  const isMobile = useIsMobile();
  const makers = useMemo(() => ["すべて", ...Array.from(new Set(MODELS.map((m) => m.maker)))], []);
  const tableMetrics = useMemo(() => {
    if (only) return METRICS.filter((m) => only.includes(m.key));
    return METRICS.filter((m) => m.key !== "cost").concat(METRICS.filter((m) => m.key === "cost"));
  }, [only]);

  const cols = useMemo(
    () => [
      { key: "name", label: "モデル", align: "left" as const },
      { key: "maker", label: "提供元", align: "left" as const },
      ...tableMetrics.map((m) => ({ key: m.key, label: m.label, align: "right" as const })),
      { key: "pIn", label: "入力単価", align: "right" as const },
    ],
    [tableMetrics]
  );

  const rows = useMemo(() => {
    const filtered = MODELS.filter((m) => maker === "すべて" || m.maker === maker);
    const sorted = [...filtered].sort((a, b) => {
      const k = sortKey as keyof Model;
      if (k === "name" || k === "maker") {
        return (a[k] as string).localeCompare(b[k] as string) * -sortDir;
      }
      return (((a[k] as number) ?? 0) - ((b[k] as number) ?? 0)) * sortDir;
    });
    return limit ? sorted.slice(0, limit) : sorted;
  }, [maker, sortKey, sortDir, limit]);

  const padY = compact || isMobile ? 8 : 13;
  // トップページ埋め込み時は列を絞るので、横幅の下限も下げる
  const minWidth = embedded ? 620 : 1020;

  return (
    <section className={embedded ? undefined : "view-pop"}>
      {!embedded && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>全モデル一覧</h2>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {makers.map((mk) => (
              <button key={mk} onClick={() => onMakerChange(mk)} style={chipStyle(maker === mk)}>
                {mk}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: 18, boxShadow: "0 1px 2px rgba(24, 24, 27, 0.05), 0 8px 24px rgba(24, 24, 27, 0.05)", padding: "8px 14px 14px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth }}>
          <thead>
            <tr>
              {cols.map((c) => (
                <th
                  key={c.key}
                  onClick={() => onSort(c.key)}
                  style={{
                    padding: "14px 9px",
                    textAlign: c.align,
                    fontSize: 12,
                    fontWeight: 700,
                    color: sortKey === c.key ? "#191817" : "var(--ink-faint-2)",
                    borderBottom: "2px solid var(--card-border)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.label}
                  {sortKey === c.key ? (sortDir < 0 ? " ▼" : " ▲") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((m, i) => (
              <tr
                key={m.id}
                onClick={() => onOpenModel(m.name)}
                style={{ cursor: "pointer", background: i % 2 === 1 ? "var(--card-sub)" : "transparent" }}
              >
                <td style={{ padding: `${padY}px 9px`, borderBottom: "1px solid var(--rule)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <BrandLogo maker={m.maker} model={m.name} size={17} />
                    <span style={{ fontSize: 14, fontWeight: 900, whiteSpace: "nowrap", textDecoration: "underline", textDecorationColor: "var(--ink-disabled-3)", textUnderlineOffset: 3 }}>
                      {m.name}
                    </span>
                    {m.pending && (
                      <span style={{ padding: "2px 8px", borderRadius: 999, background: "var(--card-sub)", border: "1px solid var(--card-border)", fontSize: 10, fontWeight: 900, color: "var(--ink-faint-2)", whiteSpace: "nowrap" }}>
                        測定中
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: `${padY}px 9px`, borderBottom: "1px solid var(--rule)", fontSize: 12, fontWeight: 700, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>
                  {/* ここは「提供元」列なので、モデルではなく会社のロゴを出す */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <BrandLogo maker={m.maker} size={13} />
                    {m.maker}
                  </span>
                </td>
                {tableMetrics.map((tm) => (
                  <td
                    key={tm.key}
                    className="font-num"
                    style={{
                      padding: `${padY}px 9px`,
                      borderBottom: "1px solid var(--rule)",
                      textAlign: "right",
                      fontSize: 14,
                      fontWeight: 700,
                      color: sortKey === tm.key ? m.color : "var(--ink-body)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {m.pending && tm.key !== "pOut" ? "測定中" : tm.fmt(m[tm.key])}
                  </td>
                ))}
                <td
                  className="font-num"
                  style={{
                    padding: `${padY}px 9px`,
                    borderBottom: "1px solid var(--rule)",
                    textAlign: "right",
                    fontSize: 14,
                    fontWeight: 700,
                    color: sortKey === "pIn" ? m.color : "var(--ink-body)",
                    whiteSpace: "nowrap",
                  }}
                >
                  ${m.pIn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
