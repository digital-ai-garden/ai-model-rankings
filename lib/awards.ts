import { MODELS } from "@/data/models";
import { METRICS, AWARD_EN, AWARD_TITLE, SOFT } from "@/data/metrics";
import { CREATIVE, CREATIVE_NOTE, type CreativeCategory } from "@/data/creative";
import { buildCompanyRanking } from "./ranking";

export type AwardRunner = { rank: number; name: string; value: string };

export type Award = {
  key: string;
  kind: "metric" | "creative";
  title: string;
  en: string;
  note: string;
  winner: string;
  winnerMaker: string;
  winValue: string;
  winColor: string;
  winBg: string;
  flag: string;
  hasFlag: boolean;
  runners: AwardRunner[];
};

export function buildMetricAwards(): Award[] {
  return METRICS.map((mt) => {
    const top = [...MODELS].sort((a, b) => (mt.lowerBetter ? a[mt.key] - b[mt.key] : b[mt.key] - a[mt.key])).slice(0, 3);
    const w = top[0];
    return {
      key: mt.key,
      kind: "metric",
      title: AWARD_TITLE[mt.key],
      en: AWARD_EN[mt.key],
      note: mt.note,
      winner: w.name,
      winnerMaker: w.maker,
      winValue: mt.fmt(w[mt.key]),
      winColor: w.color,
      winBg: SOFT(w.hue),
      flag: "",
      hasFlag: false,
      runners: top.slice(1).map((m, i) => ({ rank: i + 2, name: m.name, value: mt.fmt(m[mt.key]) })),
    };
  });
}

export function buildCreativeAwards(): Award[] {
  const cats: CreativeCategory[] = ["画像生成", "動画生成", "音楽生成"];
  return cats.map((cat) => {
    const top = CREATIVE.filter((c) => c.cat === cat).sort((a, b) => b.score - a.score);
    const w = top[0];
    return {
      key: cat,
      kind: "creative",
      title: cat,
      en: w.en,
      note: CREATIVE_NOTE[cat],
      flag: "参考",
      hasFlag: true,
      winner: w.name,
      winnerMaker: w.maker,
      winValue: String(w.score),
      winColor: `oklch(0.66 0.16 ${w.hue})`,
      winBg: SOFT(w.hue),
      runners: top.slice(1, 3).map((m, i) => ({ rank: i + 2, name: m.name, value: String(m.score) })),
    };
  });
}

export type PodiumCompany = ReturnType<typeof buildCompanyRanking>[number] & {
  place: string;
  crown: string;
  lift: string;
  bg: string;
  border: string;
  shadow: string;
  barPct: number;
  logoId: string;
};

export function buildPodium(mounted: boolean) {
  const companies = buildCompanyRanking();
  const topScore = companies[0].score;
  const podium: PodiumCompany[] = companies.slice(0, 3).map((c, i) => ({
    ...c,
    place: ["1ST", "2ND", "3RD"][i],
    crown: ["👑", "🥈", "🥉"][i],
    lift: i === 0 ? "-8px" : "0px",
    bg: c.monoBg,
    border: i === 0 ? c.color : "var(--card-border)",
    shadow: i === 0 ? `oklch(0.66 0.16 ${c.hue} / 0.35)` : "var(--card-border)",
    barPct: mounted ? (c.score / topScore) * 100 : 0,
    logoId: "logo-" + c.maker,
  }));
  const rest = companies.slice(3).map((c, i) => ({ ...c, place: i + 4 }));
  const ranked = companies.map((c, i) => ({ ...c, place: i + 1 }));
  return { podium, rest, companies, ranked };
}

export const TOP_CHAMPION_TITLES = ["総合", "コスパ", "コーディング"];
