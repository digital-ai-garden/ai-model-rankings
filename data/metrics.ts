export const HUE: Record<string, number> = {
  Anthropic: 45,
  OpenAI: 168,
  Google: 255,
  xAI: 300,
  "Moonshot AI": 285,
  Alibaba: 20,
  DeepSeek: 268,
  MiniMax: 205,
  "Z.ai": 142,
};

export const C = (h: number) => `oklch(0.66 0.16 ${h})`;
export const C2 = (h: number) => `oklch(0.77 0.13 ${h + 18})`;
export const SOFT = (h: number) => `oklch(0.66 0.16 ${h} / 0.16)`;

export const QUARTERS = [
  "2025 Q2",
  "2025 Q3",
  "2025 Q4",
  "2026 Q1",
  "2026 Q2",
  "2026 Q3",
];

export type MetricKey =
  | "cost"
  | "overall"
  | "coding"
  | "pro"
  | "ja"
  | "mm"
  | "ctx"
  | "speed"
  | "ttft"
  | "pOut";

export type Metric = {
  key: MetricKey;
  label: string;
  max: number;
  fmt: (v: number) => string;
  lowerBetter?: boolean;
  note: string;
};

export const METRICS: Metric[] = [
  {
    key: "overall",
    label: "総合指数",
    max: 100,
    fmt: (v) => v.toFixed(0),
    note: "公開ベンチマークを合成した本サイト独自の総合値（推定）。",
  },
  {
    key: "cost",
    label: "コスパ指数",
    max: 280,
    fmt: (v) => v.toFixed(0),
    note: "総合指数 ÷ 出力トークン単価。1ドルあたりどれだけ賢いか。",
  },
  {
    key: "coding",
    label: "コーディング",
    max: 100,
    fmt: (v) => v.toFixed(1),
    note: "SWE-bench Verified（%）。上位は飽和気味なので Pro も併せて見る。",
  },
  {
    key: "pro",
    label: "難問コーディング",
    max: 100,
    fmt: (v) => v.toFixed(1),
    note: "SWE-bench Pro（%）。Verified より難しく、実力差が出る。",
  },
  {
    key: "ja",
    label: "日本語",
    max: 100,
    fmt: (v) => v.toFixed(0),
    note: "日本語タスクの推定スコア（本サイト独自の参考値）。",
  },
  {
    key: "mm",
    label: "マルチモーダル",
    max: 100,
    fmt: (v) => v.toFixed(0),
    note: "画像・音声・動画入力の対応度の推定値（本サイト独自の参考値）。",
  },
  {
    key: "ctx",
    label: "文脈長",
    max: 1000,
    fmt: (v) => v.toFixed(0) + "K",
    note: "コンテキストウィンドウ（K トークン）。",
  },
  {
    key: "speed",
    label: "出力速度",
    max: 400,
    fmt: (v) => v.toFixed(0),
    note: "生成中の出力トークン毎秒（tok/s）。",
  },
  {
    key: "ttft",
    label: "初回応答",
    max: 30,
    fmt: (v) => v.toFixed(1) + "s",
    lowerBetter: true,
    note: "Time to first token。小さいほど体感が速い。",
  },
  {
    key: "pOut",
    label: "出力単価",
    max: 50,
    fmt: (v) => "$" + v,
    lowerBetter: true,
    note: "出力トークン $/1M。実際の請求額の大半を決める。",
  },
];

export type RadarKey = "overall" | "coding" | "pro" | "ja" | "mm" | "speed";

export const RADAR: { key: RadarKey; max: number; label: string }[] = [
  { key: "overall", max: 100, label: "総合" },
  { key: "coding", max: 100, label: "コーディング" },
  { key: "pro", max: 100, label: "難問コード" },
  { key: "ja", max: 100, label: "日本語" },
  { key: "mm", max: 100, label: "マルチモーダル" },
  { key: "speed", max: 400, label: "速度" },
];

export const AWARD_EN: Record<string, string> = {
  cost: "VALUE",
  overall: "OVERALL",
  coding: "CODING",
  pro: "HARD CODING",
  ja: "JAPANESE",
  mm: "MULTIMODAL",
  ctx: "CONTEXT",
  speed: "SPEED",
  ttft: "RESPONSE",
  pOut: "CHEAPEST",
};

export const AWARD_TITLE: Record<string, string> = {
  cost: "コスパ",
  overall: "総合",
  coding: "コーディング",
  pro: "難問コーディング",
  ja: "日本語",
  mm: "マルチモーダル",
  ctx: "長文脈",
  speed: "高速生成",
  ttft: "即レス",
  pOut: "格安",
};

export const CAT_HUE: Record<string, number> = {
  リリース: 145,
  価格: 60,
  ベンチマーク: 250,
  規制: 25,
  資金調達: 300,
  オープンウェイト: 190,
  研究: 285,
  "終了・移行": 210,
};

export type TabId =
  | "top"
  | "news"
  | "awards"
  | "rank"
  | "scatter"
  | "radar"
  | "vs"
  | "time"
  | "table";

export const TABS: { id: TabId; label: string; en: string }[] = [
  { id: "top", label: "トップ", en: "HOME" },
  { id: "news", label: "AIニュース", en: "NEWS" },
  { id: "awards", label: "最強ランキング", en: "AWARDS" },
  { id: "rank", label: "部門別一覧", en: "RANK" },
  { id: "table", label: "一覧表", en: "TABLE" },
  { id: "scatter", label: "コスパ散布図", en: "VALUE" },
  { id: "radar", label: "レーダー", en: "RADAR" },
  { id: "vs", label: "対決", en: "VERSUS" },
  { id: "time", label: "時系列", en: "TIMELINE" },
];
