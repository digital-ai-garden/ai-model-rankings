import { C, C2, HUE, QUARTERS } from "./metrics";

export type RawModel = {
  name: string;
  maker: string;
  q: number; // QUARTERS index
  pIn: number; // $ per 1M tokens (input)
  pOut: number; // $ per 1M tokens (output)
  overall: number; // 0-100 ★推定
  coding: number; // SWE-bench Verified %
  pro: number; // SWE-bench Pro %
  ja: number; // 0-100 ★推定
  mm: number; // 0-100 ★推定
  ctx: number; // K tokens
  // DeepSWE v1.1（長時間の実務タスクを解けるか）%。未掲載のモデルがあるため optional。
  // 値が無いモデルは順位表から除外し「—」と表示する（空欄を隠さない＝展示室方式）
  agent?: number;
  speed: number; // tok/s
  ttft: number; // s
  // trueの場合、ベンチマークが未確定（発表直後等）。価格以外は仮値のため
  // RANKABLE_MODELSから除外し、一覧表示でのみ「測定中」として扱う。
  pending?: boolean;
};

// q = QUARTERS index / pIn,pOut = $ per 1M tokens / coding = SWE-bench Verified %
// pro = SWE-bench Pro % / ctx = K tokens / speed = tok/s / ttft = s
const RAW: RawModel[] = [
  { name: "Claude Opus 5", maker: "Anthropic", q: 5, pIn: 5, pOut: 25, overall: 96, coding: 96.0, pro: 79.2, ja: 93, mm: 82, ctx: 1000, speed: 45, ttft: 2.2 , agent: 73.6 },
  { name: "Claude Fable 5", maker: "Anthropic", q: 4, pIn: 10, pOut: 50, overall: 95, coding: 95.0, pro: 80.3, ja: 92, mm: 80, ctx: 1000, speed: 40, ttft: 2.5 , agent: 69.7 },
  { name: "Claude Opus 4.8", maker: "Anthropic", q: 4, pIn: 5, pOut: 25, overall: 88, coding: 88.6, pro: 69.2, ja: 89, mm: 78, ctx: 1000, speed: 37, ttft: 2.0 , agent: 59.0 },
  { name: "Claude Sonnet 5", maker: "Anthropic", q: 4, pIn: 2, pOut: 10, overall: 86, coding: 82.0, pro: 63.2, ja: 87, mm: 76, ctx: 1000, speed: 70, ttft: 1.5 , agent: 53.8 },
  { name: "Claude Haiku 4.5", maker: "Anthropic", q: 2, pIn: 1, pOut: 5, overall: 72, coding: 73.3, pro: 42.0, ja: 80, mm: 68, ctx: 200, speed: 130, ttft: 0.6 },
  { name: "GPT-5.6 Sol", maker: "OpenAI", q: 5, pIn: 4, pOut: 20, overall: 94, coding: 96.2, pro: 64.6, ja: 91, mm: 85, ctx: 1000, speed: 60, ttft: 11.7 , agent: 72.7 },
  { name: "GPT-5.6 Terra", maker: "OpenAI", q: 5, pIn: 2, pOut: 12, overall: 89, coding: 93.0, pro: 63.4, ja: 89, mm: 83, ctx: 1000, speed: 90, ttft: 6.0 , agent: 69.6 },
  { name: "GPT-5.6 Luna", maker: "OpenAI", q: 5, pIn: 0.2, pOut: 1.2, overall: 86, coding: 93.0, pro: 62.7, ja: 86, mm: 80, ctx: 1000, speed: 170, ttft: 2.0 , agent: 67.2 },
  { name: "GPT-5.5", maker: "OpenAI", q: 4, pIn: 5, pOut: 30, overall: 87, coding: 88.7, pro: 58.6, ja: 88, mm: 82, ctx: 1000, speed: 55, ttft: 8.0 , agent: 67.0 },
  { name: "Gemini 3.1 Pro", maker: "Google", q: 3, pIn: 2, pOut: 12, overall: 84, coding: 80.6, pro: 46.1, ja: 88, mm: 95, ctx: 1000, speed: 121, ttft: 26.1 , agent: 11.7 },
  { name: "Gemini 3.7 Flash", maker: "Google", q: 5, pIn: 0.75, pOut: 3.75, overall: 87, coding: 82.0, pro: 46.0, ja: 86, mm: 91, ctx: 1000, speed: 250, ttft: 15.0 , agent: 65.3 },
  { name: "Gemini 2.5 Flash-Lite", maker: "Google", q: 0, pIn: 0.1, pOut: 0.4, overall: 58, coding: 55.0, pro: 20.0, ja: 72, mm: 78, ctx: 1000, speed: 379, ttft: 0.3 },
  { name: "Grok 4.5", maker: "xAI", q: 4, pIn: 2, pOut: 6, overall: 82, coding: 86.6, pro: 52.0, ja: 80, mm: 78, ctx: 500, speed: 80, ttft: 3.0 , agent: 53.8 },
  { name: "Kimi K3", maker: "Moonshot AI", q: 5, pIn: 3, pOut: 15, overall: 86, coding: 93.4, pro: 60.0, ja: 84, mm: 74, ctx: 1000, speed: 80, ttft: 3.5 , agent: 68.5 },
  { name: "Qwen3.8 Max", maker: "Alibaba", q: 5, pIn: 2, pOut: 6, overall: 85, coding: 90.0, pro: 67.7, ja: 86, mm: 76, ctx: 1000, speed: 100, ttft: 2.5 , agent: 57.5 },
  { name: "DeepSeek V4 Flash", maker: "DeepSeek", q: 3, pIn: 0.14, pOut: 0.28, overall: 74, coding: 80.0, pro: 45.0, ja: 78, mm: 40, ctx: 1000, speed: 200, ttft: 1.2 , agent: 53.3 },
  { name: "MiniMax M3", maker: "MiniMax", q: 4, pIn: 0.6, pOut: 2.4, overall: 76, coding: 80.5, pro: 48.0, ja: 80, mm: 65, ctx: 1000, speed: 150, ttft: 1.5 },
  { name: "GLM-5.3", maker: "Z.ai", q: 5, pIn: 1.4, pOut: 4.4, overall: 86, coding: 84.0, pro: 55.0, ja: 79, mm: 62, ctx: 1000, speed: 110, ttft: 2.0 , agent: 69.0 },
  { name: "Claude Fable 5.1", maker: "Anthropic", q: 5, pIn: 10, pOut: 50, overall: 0, coding: 0, pro: 0, ja: 0, mm: 0, ctx: 0, speed: 0, ttft: 0, pending: true },
  // 2026-09-05 追加。いずれも発表直後でベンチマークが出揃っていないため pending。
  // 判明済みの価格・文脈長だけ入れてある（性能スコアは確定後に埋める）。
  { name: "GPT-6 Astra", maker: "OpenAI", q: 5, pIn: 10, pOut: 50, overall: 0, coding: 0, pro: 0, ja: 0, mm: 0, ctx: 1050, speed: 0, ttft: 0, agent: 73.2, pending: true },
  { name: "Gemini 3.8 Flash", maker: "Google", q: 5, pIn: 0.75, pOut: 3.75, overall: 0, coding: 0, pro: 0, ja: 0, mm: 0, ctx: 1000, speed: 0, ttft: 0, agent: 73.8, pending: true },
  { name: "Muse Spark 1.3", maker: "Meta", q: 5, pIn: 1.25, pOut: 4.25, overall: 0, coding: 0, pro: 0, ja: 0, mm: 0, ctx: 1000, speed: 0, ttft: 0, pending: true },
];

export type Model = RawModel & {
  id: string;
  hue: number;
  color: string;
  color2: string;
  cost: number;
  quarter: string;
};

export const MODELS: Model[] = RAW.map((m, i) => ({
  ...m,
  id: "m" + i,
  hue: HUE[m.maker],
  color: C(HUE[m.maker]),
  color2: C2(HUE[m.maker]),
  cost: m.overall / m.pOut,
  quarter: QUARTERS[m.q],
}));

// ランキング・比較（部門別/最強/散布図/レーダー/対決/会社ランキング）に使う配列。
// pending中のモデルは仮値（0）しか持たないため、順位計算からは除外する。
export const RANKABLE_MODELS: Model[] = MODELS.filter((m) => !m.pending);
