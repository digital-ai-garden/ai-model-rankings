import { NEWS_SEED, type NewsItem } from "@/data/news";
import { CAT_HUE } from "@/data/metrics";

export type DecoratedNews = NewsItem & {
  ago: string;
  slotId: string;
  credit: string;
  catBg: string;
  catFg: string;
};

export type NewsWithExcerpt = DecoratedNews & { excerpt: string };

function slug(t: string): string {
  let h = 7;
  for (const c of String(t)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return "s" + h.toString(36);
}

export function ago(dateStr: string, today: Date): string {
  const days = Math.round((today.getTime() - new Date(dateStr + "T09:00:00+09:00").getTime()) / 86400000);
  if (days <= 0) return "本日";
  if (days === 1) return "昨日";
  if (days < 30) return days + "日前";
  return Math.floor(days / 30) + "か月前";
}

export function decorate(n: NewsItem, today: Date): DecoratedNews {
  const hue = CAT_HUE[n.cat] ?? 60;
  return {
    ...n,
    ago: ago(n.date, today),
    slotId: "news-" + slug(n.title),
    credit: n.credit || "画像クレジット未設定",
    catBg: `oklch(0.66 0.16 ${hue} / 0.16)`,
    catFg: `oklch(0.45 0.13 ${hue})`,
  };
}

export function sortedNewsItems(today: Date) {
  return [...NEWS_SEED.items].sort((a, b) => b.date.localeCompare(a.date)).map((n) => decorate(n, today));
}

export function excerpt(body: string, len = 78): string {
  return body.length > len ? body.slice(0, len) + "…" : body;
}

export function formatDataAsOf(updated: string): string {
  const u = updated.slice(0, 10).split("-");
  return u.length === 3 ? `${u[0]}年${Number(u[1])}月${Number(u[2])}日 時点` : "更新日不明";
}
