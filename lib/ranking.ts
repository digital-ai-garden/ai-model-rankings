import { RANKABLE_MODELS as MODELS, type Model } from "@/data/models";
import { HUE, C, SOFT, type Metric } from "@/data/metrics";

/**
 * 競技順位（同点処理）。findIndex は使わない — 同点が任意の順に並び、
 * 王冠バッジが誤って1体だけに付く不具合の原因になるため。
 */
export function rankOf(m: Model, metric: Metric): number {
  return (
    MODELS.filter((x) =>
      metric.lowerBetter ? x[metric.key] < m[metric.key] : x[metric.key] > m[metric.key]
    ).length + 1
  );
}

export function tiedAt(m: Model, metric: Metric): number {
  return MODELS.filter((x) => x[metric.key] === m[metric.key]).length;
}

export function rankLabel(m: Model, metric: Metric): string {
  const r = rankOf(m, metric);
  return r + "位" + (tiedAt(m, metric) > 1 ? "T" : "");
}

export function isSoleWinner(m: Model, metric: Metric): boolean {
  return rankOf(m, metric) === 1 && tiedAt(m, metric) === 1;
}

export type CompanyRank = {
  maker: string;
  score: number;
  best: string;
  initial: string;
  monoBg: string;
  color: string;
  hue: number;
  count: number;
  tie1: number;
  tie2: number;
  note: string;
};

/**
 * 会社ランキング：各社の最上位モデルの overall で比較。
 * タイブレーク1＝そのモデルの coding、タイブレーク2＝掲載モデル数。
 * 「最上位60%+平均40%」の合成方式は、掲載1件の会社が不当に有利になる不整合が
 * 発覚し廃止された過去がある。復活させないこと。
 */
export function buildCompanyRanking(): CompanyRank[] {
  const byMaker: Record<string, Model[]> = {};
  MODELS.forEach((m) => {
    (byMaker[m.maker] ||= []).push(m);
  });
  const companies = Object.keys(byMaker).map((maker) => {
    const list = byMaker[maker];
    const best = list.reduce((a, b) => (b.overall > a.overall ? b : a));
    const avg = list.reduce((t, m) => t + m.overall, 0) / list.length;
    return {
      maker,
      score: best.overall,
      best: best.name,
      initial: maker[0],
      monoBg: SOFT(HUE[maker]),
      color: C(HUE[maker]),
      hue: HUE[maker],
      count: list.length,
      tie1: best.coding,
      tie2: list.length,
      note: `最強モデルのコーディング ${best.coding.toFixed(1)}% / 掲載${list.length}モデル・平均${avg.toFixed(0)}`,
    };
  });
  return companies.sort((a, b) => b.score - a.score || b.tie1 - a.tie1 || b.tie2 - a.tie2);
}

/** PICK OF THE DAY：日付をシードにした決定論選出。同日再訪で結果は変わらない。 */
export function pickOfTheDay(now: Date = new Date()): Model {
  const dayIdx = Math.floor(now.getTime() / 86400000);
  return MODELS[dayIdx % MODELS.length];
}

export type ScatterPoint = {
  model: Model;
  leftPct: number;
  topPct: number;
  sizePx: number;
  labelTopPx: number;
  tickTopPx: number;
  tickHPx: number;
};

const CHART_W = 760;
const CHART_H = 460;
const LABEL_W = 104;
const LABEL_H = 27;
const CAND = [0, 30, -44, 60, -74, 90, -104, 120, -134, 150, -164, 180, -194, 210];

function logX(price: number): number {
  return (Math.log10(price) + 1) / (Math.log10(50) + 1);
}

/**
 * コスパ散布図のラベル衝突回避。候補オフセットを順に試し、
 * 他ラベルとの重なり・他の点との重なりの両方を避ける最初の位置を採用する。
 */
export function buildScatterPoints(): ScatterPoint[] {
  const pts = MODELS.map((m) => ({
    m,
    x: logX(m.pOut) * 94 + 3,
    y: (1 - (m.overall - 54) / 44) * 90 + 3,
    size: 13 + Math.min(26, Math.round(m.cost / 9)),
  })).sort((a, b) => a.y - b.y);

  const withPx = pts.map((p) => ({ ...p, px: (p.x / 100) * CHART_W, py: (p.y / 100) * CHART_H }));
  const dots = withPx.map((p) => ({ px: p.px, py: p.py, r: p.size / 2 + 4 }));

  const placed: { px: number; ly: number }[] = [];
  const withOffset = withPx.map((p) => {
    const gap = p.size / 2 + 8 + LABEL_H / 2;
    const base = p.py + gap;
    let dy = CAND.find((d) => {
      const ly = base + d;
      const hitsLabel = placed.some((q) => Math.abs(q.px - p.px) < LABEL_W && Math.abs(q.ly - ly) < LABEL_H);
      const hitsDot = dots.some((q) =>
        q.py === p.py && q.px === p.px
          ? false
          : Math.abs(q.px - p.px) < LABEL_W / 2 + q.r && Math.abs(q.py - ly) < LABEL_H / 2 + q.r
      );
      return !hitsLabel && !hitsDot;
    });
    if (dy === undefined) dy = CAND[CAND.length - 1];
    placed.push({ px: p.px, ly: base + dy });
    return { ...p, gap, dy };
  });

  return withOffset.map((p) => {
    const lc = p.gap + p.dy;
    const below = lc > 0;
    const tickTop = below ? p.size / 2 : lc + 13;
    const tickH = Math.max(0, below ? lc - 13 - p.size / 2 : -p.size / 2 - (lc + 13));
    return {
      model: p.m,
      leftPct: p.x,
      topPct: p.y,
      sizePx: p.size,
      labelTopPx: lc,
      tickTopPx: tickTop,
      tickHPx: tickH,
    };
  });
}

export function scatterGridY() {
  return [95, 85, 75, 65, 55].map((v) => ({ label: v, topPct: (1 - (v - 54) / 44) * 90 + 3 }));
}

export function scatterGridX() {
  return [0.3, 1, 3, 12, 50].map((v) => ({ label: "$" + v, leftPct: logX(v) * 94 + 3 }));
}
