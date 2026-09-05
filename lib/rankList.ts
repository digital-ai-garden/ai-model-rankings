import { RANKABLE_MODELS as MODELS } from "@/data/models";
import { METRICS, type MetricKey } from "@/data/metrics";

export type RankedModel = {
  rank: number;
  name: string;
  maker: string;
  color: string;
  color2: string;
  priceLabel: string;
  valueLabel: string;
  barPct: number;
  medalBg: string;
  medalFg: string;
};

const MEDAL = ["var(--medal-1)", "var(--medal-2)", "var(--medal-3)"];

export function buildRankedList(metricKey: MetricKey, mounted: boolean): RankedModel[] {
  const metric = METRICS.find((m) => m.key === metricKey) || METRICS[0];
  // 未計測のモデルは順位表に出さない（空欄を0扱いして最下位に並べない）
  const eligible = MODELS.filter((m) => typeof m[metric.key] === "number");
  const sorted = [...eligible].sort((a, b) =>
    metric.lowerBetter
      ? (a[metric.key] as number) - (b[metric.key] as number)
      : (b[metric.key] as number) - (a[metric.key] as number)
  );
  const peak = Math.max(...eligible.map((m) => m[metric.key] as number));
  return sorted.map((m, i) => ({
    rank: i + 1,
    name: m.name,
    maker: m.maker,
    color: m.color,
    color2: m.color2,
    priceLabel: `$${m.pIn} / $${m.pOut}`,
    valueLabel: metric.fmt(m[metric.key] as number),
    barPct: mounted
      ? Math.max(
          3,
          (metric.lowerBetter
            ? 1 - (m[metric.key] as number) / metric.max
            : (m[metric.key] as number) / Math.max(peak, 1)) * 100
        )
      : 0,
    medalBg: i < 3 ? MEDAL[i] : "var(--medal-rest-bg)",
    medalFg: i < 3 ? "var(--medal-fg)" : "var(--medal-rest-fg)",
  }));
}
