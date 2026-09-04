import { RANKABLE_MODELS, type Model } from "@/data/models";
import { METRICS, type MetricKey } from "@/data/metrics";

export type TopPick = {
  model: Model;
  metricLabel: string;
  metricNote: string;
  valueLabel: string;
  priceLabel: string;
};

/**
 * 指定した指標の1位モデルを返す。
 *
 * 用途別ページの「結論」を手書きせずデータから引くための関数。
 * models.ts を更新すれば推奨も自動で追従するので、記事が陳腐化しない。
 * pending（能力測定中）のモデルは RANKABLE_MODELS の時点で除外されている。
 */
export function pickTop(metricKey: MetricKey): TopPick {
  const metric = METRICS.find((m) => m.key === metricKey) || METRICS[0];
  const sorted = [...RANKABLE_MODELS].sort((a, b) =>
    metric.lowerBetter ? a[metric.key] - b[metric.key] : b[metric.key] - a[metric.key]
  );
  const model = sorted[0];
  return {
    model,
    metricLabel: metric.label,
    metricNote: metric.note,
    valueLabel: metric.fmt(model[metric.key]),
    priceLabel: `$${model.pIn} / $${model.pOut}`,
  };
}
