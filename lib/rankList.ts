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
  const sorted = [...MODELS].sort((a, b) => (metric.lowerBetter ? a[metric.key] - b[metric.key] : b[metric.key] - a[metric.key]));
  const peak = Math.max(...MODELS.map((m) => m[metric.key]));
  return sorted.map((m, i) => ({
    rank: i + 1,
    name: m.name,
    maker: m.maker,
    color: m.color,
    color2: m.color2,
    priceLabel: `$${m.pIn} / $${m.pOut}`,
    valueLabel: metric.fmt(m[metric.key]),
    barPct: mounted ? Math.max(3, (metric.lowerBetter ? 1 - m[metric.key] / metric.max : m[metric.key] / Math.max(peak, 1)) * 100) : 0,
    medalBg: i < 3 ? MEDAL[i] : "var(--medal-rest-bg)",
    medalFg: i < 3 ? "var(--medal-fg)" : "var(--medal-rest-fg)",
  }));
}
