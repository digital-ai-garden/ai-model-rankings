export type CreativeCategory = "画像生成" | "動画生成" | "音楽生成";

export type CreativeModel = {
  cat: CreativeCategory;
  en: string;
  name: string;
  maker: string;
  score: number;
  hue: number;
};

export const CREATIVE: CreativeModel[] = [
  { cat: "画像生成", en: "IMAGE", name: "Nano Banana 2", maker: "Google", score: 97, hue: 255 },
  { cat: "画像生成", en: "IMAGE", name: "FLUX.2 [max]", maker: "Black Forest Labs", score: 95, hue: 300 },
  { cat: "画像生成", en: "IMAGE", name: "Seedream 4", maker: "ByteDance", score: 93, hue: 25 },
  { cat: "動画生成", en: "VIDEO", name: "HappyHorse-1.0", maker: "Alibaba ATH", score: 98, hue: 20 },
  { cat: "動画生成", en: "VIDEO", name: "Seedance 2.0", maker: "ByteDance", score: 96, hue: 25 },
  { cat: "動画生成", en: "VIDEO", name: "Veo 3.1", maker: "Google", score: 94, hue: 255 },
  { cat: "音楽生成", en: "MUSIC", name: "Suno v6", maker: "Suno", score: 95, hue: 340 },
  { cat: "音楽生成", en: "MUSIC", name: "Udio 2", maker: "Udio", score: 93, hue: 320 },
  { cat: "音楽生成", en: "MUSIC", name: "Lyria 3", maker: "Google DeepMind", score: 90, hue: 255 },
];

export const CREATIVE_BLURB: Record<string, string> = {
  "Nano Banana 2":
    "Google の画像生成・画像編集モデル。プロンプト忠実度と、既存画像を作り直さずに部分修正できる編集能力の両立で評価が高い。文字の描画やレイアウト指定にも比較的強く、Gemini の画像モデルとして提供される。",
  "FLUX.2 [max]":
    "Black Forest Labs の最上位ティア。Schnell から max まで品質と生成コストを段階的に選べるのが特徴で、max は解像度・質感・写実性を重視する用途向け。オープン系の派生モデルが多く、エコシステムが広い。",
  "Seedream 4":
    "ByteDance の画像生成モデル。参照画像を使ったスタイル・キャラクターの一貫性維持に強みがあり、同社の動画モデル Seedance と組み合わせた制作フローで使われる。",
  "HappyHorse-1.0":
    "Alibaba ATH が2026年4月に公開した15Bの動画生成モデル。Artificial Analysis の音声なし部門で1357 Eloと首位、音声あり部門でも1212 Eloでほぼ首位。7言語のリップシンクと1080p、音声と映像の同時生成に対応し、fal.ai のAPIで利用できる。",
  "Seedance 2.0":
    "ByteDance が2026年2月に公開。Artificial Analysis の音声あり部門で1213 Eloの首位。1回の生成で画像9枚・クリップ3本・音声3本を入力でき、複数カットにまたがる被写体とスタイルの一貫性を保てる点が評価されている。",
  "Veo 3.1":
    "Google の動画生成モデル。48kHzの同期セリフを生成できる唯一のモデルとされ、効果音だけでなく会話込みのシーンを作れる。Lite / Fast / Quality の3ティアがあり、APIは秒単位課金。",
  "Suno v6":
    "楽曲生成の代表格。歌声の自然さと曲構成のまとまりに強く、ジャンル指定から数分の完成曲までを一括で生成できる。配信プラットフォームへの書き出しを含むワークフローが整っている。",
  "Udio 2":
    "ボーカルの質感と細かい制作コントロールを重視する楽曲生成サービス。セクション単位の作り直しや延長といった編集操作に強みがある。",
  "Lyria 3":
    "Google DeepMind の楽曲生成モデル。音楽理論的な構造の一貫性が高く、長尺でも展開が崩れにくい点が評価されている。",
};

export const CREATIVE_NOTE: Record<CreativeCategory, string> = {
  画像生成: "プロンプト忠実度・編集機能・タイポグラフィを含む編集部評価（参考値）。",
  動画生成:
    "Artificial Analysis の Elo が根拠。HappyHorse-1.0 は音声なし1357 Eloで1位、Seedance 2.0 は音声あり1213 Eloで1位、Veo 3.1 は48kHz同期セリフに唯一対応。",
  音楽生成: "ボーカル品質・曲構成・制作コントロールを見た編集部評価（参考値）。",
};
