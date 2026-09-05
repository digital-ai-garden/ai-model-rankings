import type { Model } from "@/data/models";
import type { MetricKey } from "@/data/metrics";

// 指標の値には「まだ計測されていない」状態がある（例：エージェント部門は
// DeepSWE v1.1 に未掲載のモデルが3つある）。
// 空欄を勝手に0で埋めると順位表が嘘をつくので、undefined のまま扱い、
// 順位計算からは除外して一覧では「—」と表示する（空欄も隠さない＝展示室方式）。

export function metricValue(m: Model, key: MetricKey): number | undefined {
  const v = m[key] as number | undefined;
  return typeof v === "number" ? v : undefined;
}

/** その指標が計測済みのモデルだけを返す */
export function measured(models: Model[], key: MetricKey): Model[] {
  return models.filter((m) => metricValue(m, key) !== undefined);
}

/** 順位づけ用の比較。値が無いモデルは呼び出し側で除外しておくこと */
export function compareBy(key: MetricKey, lowerBetter?: boolean) {
  return (a: Model, b: Model) => {
    const av = metricValue(a, key) ?? 0;
    const bv = metricValue(b, key) ?? 0;
    return lowerBetter ? av - bv : bv - av;
  };
}
