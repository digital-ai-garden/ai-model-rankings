// ============================================================================
// 提供元ロゴの定義（1ファイルに集約）
//
// 【なぜ1ファイルにまとめてあるか】
//   ロゴは各社の商標であり、当サイトは比較・報道の目的で識別のために表示している。
//   権利者から掲載停止の申し出があった場合に **この1ファイルを編集するだけで
//   即座に外せる** ようにするため、定義を分散させていない。
//   外し方：該当社の logo を undefined にする → 自動で頭文字マークにフォールバックする。
//
// 【ロゴファイルの出どころ】
//   lobe-icons（https://github.com/lobehub/lobe-icons）。
//   AI・LLM各社のブランドロゴを集めたコレクションで、コードはMITライセンス。
//   ロゴそのものの商標権は各社に帰属する（MITライセンスは商標権には及ばない）。
//   全社が viewBox="0 0 24 24" / fill="currentColor" で揃っているため、
//   CSSのマスクでブランドカラーを乗せて表示している。
//
// 【色の出どころ】
//   Simple Icons が公表しているブランドカラーを基本とする（2026-09-03 取得）。
//   Simple Icons に収録がない OpenAI・xAI・Z.ai は下のコメントに個別の根拠を書いた。
//
// 【重要】
//   ロゴの掲載は「提携・後援・推奨」を意味しない。フッターの商標注記と必ずセットで運用する。
// ============================================================================

export type ProviderLogo = {
  /** public/logos/ 配下のファイル名（拡張子なし）。未設定なら頭文字マークで表示する */
  logo?: string;
  /** 表示に使うブランドカラー */
  color: string;
  /** ロゴを外したときに使う頭文字 */
  initial: string;
};

export const PROVIDER_LOGOS: Record<string, ProviderLogo> = {
  // Simple Icons 公表値 #191919（Anthropicのロゴマークは黒）
  Anthropic: { logo: "anthropic", color: "#191919", initial: "A" },
  // Simple Icons に収録なし。OpenAI が長年ブランドカラーとして使う緑
  OpenAI: { logo: "openai", color: "#10A37F", initial: "O" },
  // Simple Icons 公表値
  Google: { logo: "google", color: "#4285F4", initial: "G" },
  // Simple Icons に収録なし。xAI のロゴマークは黒
  xAI: { logo: "xai", color: "#191817", initial: "X" },
  // Simple Icons 公表値 #000000
  "Moonshot AI": { logo: "moonshot", color: "#000000", initial: "M" },
  // Simple Icons の qwen 公表値（Alibaba の Qwen ブランド）
  Alibaba: { logo: "qwen", color: "#6950EF", initial: "A" },
  // Simple Icons 公表値
  DeepSeek: { logo: "deepseek", color: "#5786FE", initial: "D" },
  // Simple Icons 公表値
  MiniMax: { logo: "minimax", color: "#E73562", initial: "M" },
  // Simple Icons に収録なし。Z.ai のロゴマークは黒
  "Z.ai": { logo: "zai", color: "#191817", initial: "Z" },
};

export function providerLogo(maker: string): ProviderLogo {
  return PROVIDER_LOGOS[maker] ?? { color: "#8a8478", initial: maker.slice(0, 1) };
}

// ============================================================================
// モデル側のロゴ
//
// 読者が知っているのは会社名ではなく製品名（Anthropic ではなく Claude、
// OpenAI ではなく GPT）。**モデル名の隣には、モデルのロゴを出す。**
// 会社のロゴは「提供元」列・会社ランキング・会社詳細でのみ使う。
// ラベルと絵を食い違わせない（サイトの原則「ラベルが嘘をつかないこと」）。
//
// 判定はモデル名の先頭一致。上から順に評価するので、
// より限定的なものを先に置くこと。
// 該当がなければ会社ロゴへ自動でフォールバックするため、
// 新しいモデルが増えても表示が壊れることはない。
// ============================================================================

export const MODEL_LOGOS: { match: string; mark: ProviderLogo }[] = [
  // Claude の象徴色。ロゴは lobe-icons の claude
  { match: "Claude", mark: { logo: "claude", color: "#D97757", initial: "C" } },
  // GPT 系は ChatGPT 単独のマークが無いため OpenAI のマークを使う（意匠は同じ）
  { match: "GPT", mark: { logo: "openai", color: "#10A37F", initial: "G" } },
  { match: "Gemini", mark: { logo: "gemini", color: "#4285F4", initial: "G" } },
  { match: "Grok", mark: { logo: "grok", color: "#191817", initial: "G" } },
  { match: "Kimi", mark: { logo: "kimi", color: "#000000", initial: "K" } },
  { match: "Qwen", mark: { logo: "qwen", color: "#6950EF", initial: "Q" } },
  { match: "DeepSeek", mark: { logo: "deepseek", color: "#5786FE", initial: "D" } },
  { match: "MiniMax", mark: { logo: "minimax", color: "#E73562", initial: "M" } },
  // GLM は Z.ai の製品なので Z.ai のマーク
  { match: "GLM", mark: { logo: "zai", color: "#191817", initial: "G" } },
];

export function modelLogo(modelName: string, maker: string): ProviderLogo {
  const hit = MODEL_LOGOS.find((m) => modelName.startsWith(m.match));
  return hit ? hit.mark : providerLogo(maker);
}
