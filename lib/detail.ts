import { MODELS, type Model } from "@/data/models";
import { CREATIVE, CREATIVE_BLURB, CREATIVE_NOTE } from "@/data/creative";
import { COMPANY } from "@/data/company";
import { MODEL_NOTE } from "@/data/modelNote";
import { METRICS, SOFT } from "@/data/metrics";
import { rankLabel, rankOf, tiedAt, isSoleWinner, buildCompanyRanking } from "./ranking";

export type DetailRef = { kind: "model" | "company" | "creative"; key: string };

export type ModelDetailRow = {
  label: string;
  value: string;
  rank: string;
  barPct: number;
  color: string;
};

export type ModelDetailView = {
  kind: "model" | "creative";
  modelId: string;
  name: string;
  maker: string;
  color: string;
  bg: string;
  note: string;
  quarter: string;
  price: string;
  companyTag: string;
  rows: ModelDetailRow[];
  wins: string[];
  hasRows: boolean;
  hasCompany: boolean;
  cols: string;
};

export function buildModelDetail(name: string, mounted: boolean): ModelDetailView | null {
  const dm = MODELS.find((m) => m.name === name);
  if (!dm) return null;
  if (dm.pending) {
    return {
      kind: "model",
      modelId: dm.id,
      name: dm.name,
      maker: dm.maker,
      color: dm.color,
      bg: SOFT(dm.hue),
      note: "現在このモデルは能力測定中です。ベンチマークが確定次第、正式にランキングへ反映します。",
      quarter: dm.quarter,
      price: `$${dm.pIn} / $${dm.pOut} （入力 / 出力・100万トークン）`,
      companyTag: COMPANY[dm.maker]?.tag || "",
      rows: [],
      wins: [],
      hasRows: false,
      hasCompany: true,
      cols: "1fr",
    };
  }
  const rows: ModelDetailRow[] = METRICS.map((mt) => {
    const r = rankOf(dm, mt);
    const barFrac = mt.lowerBetter ? 1 - dm[mt.key] / mt.max : dm[mt.key] / mt.max;
    return {
      label: mt.label,
      value: mt.fmt(dm[mt.key]),
      rank: rankLabel(dm, mt),
      barPct: mounted ? Math.max(3, Math.min(100, barFrac * 100)) : 0,
      color: r <= 3 ? dm.color : "var(--ink-disabled-2)",
    };
  });
  const wins = METRICS.filter((mt) => isSoleWinner(dm, mt)).map((mt) => mt.label);
  return {
    kind: "model",
    modelId: dm.id,
    name: dm.name,
    maker: dm.maker,
    color: dm.color,
    bg: SOFT(dm.hue),
    note: MODEL_NOTE[dm.name] || "",
    quarter: dm.quarter,
    price: `$${dm.pIn} / $${dm.pOut} （入力 / 出力・100万トークン）`,
    companyTag: COMPANY[dm.maker]?.tag || "",
    rows,
    wins,
    hasRows: true,
    hasCompany: true,
    cols: "1.15fr 1fr",
  };
}

export function buildCreativeDetail(name: string): ModelDetailView | null {
  const cr = CREATIVE.find((c) => c.name === name);
  if (!cr) return null;
  return {
    kind: "creative",
    modelId: "",
    name: cr.name,
    maker: cr.maker,
    color: `oklch(0.66 0.16 ${cr.hue})`,
    bg: SOFT(cr.hue),
    note: `${CREATIVE_BLURB[cr.name] || ""} ／ 順位の根拠：${CREATIVE_NOTE[cr.cat]}`,
    quarter: cr.cat + " 部門",
    price: `評価スコア ${cr.score}（${cr.cat}部門）`,
    companyTag: "",
    rows: [],
    wins: [cr.cat],
    hasRows: false,
    hasCompany: false,
    cols: "1fr",
  };
}

export type CompanyDetailView = {
  maker: string;
  place: number;
  color: string;
  monoBg: string;
  founded: string;
  hq: string;
  tag: string;
  body: string;
  strength: string;
  caution: string;
  best: string;
  models: {
    name: string;
    overall: number;
    coding: string;
    price: string;
    color: string;
    barPct: number;
    pending?: boolean;
  }[];
};

export function buildCompanyDetail(maker: string, mounted: boolean): CompanyDetailView | null {
  const companies = buildCompanyRanking();
  const c = companies.find((x) => x.maker === maker);
  const info = COMPANY[maker];
  if (!c || !info) return null;
  const place = companies.findIndex((x) => x.maker === maker) + 1;
  const models: Model[] = MODELS.filter((m) => m.maker === maker).sort((a, b) => b.overall - a.overall);
  return {
    maker: c.maker,
    place,
    color: c.color,
    monoBg: c.monoBg,
    founded: info.founded,
    hq: info.hq,
    tag: info.tag,
    body: info.body,
    strength: info.strength,
    caution: info.caution,
    best: c.best,
    models: models.map((m) => ({
      name: m.name,
      overall: m.overall,
      coding: m.pending ? "測定中" : m.coding.toFixed(1) + "%",
      price: `$${m.pIn} / $${m.pOut}`,
      color: m.color,
      barPct: mounted ? m.overall : 0,
      pending: m.pending,
    })),
  };
}
