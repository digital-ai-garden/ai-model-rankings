// ============================================================================
// 商業リンク（お金が絡む部分）の定義ファイル
//
// このサイトで「報酬が発生しうるリンク」は、すべてこのファイルに集約されている。
// 何が換金対象なのかは、このファイルを読むだけで監査できる。
//
// 【三原則との関係】
//   ランキング・スコア・順位には一切影響させない。
//   ここに何を書いても、部門別ランキングや最強ランキングの結果は変わらない。
//   掲載料を取って順位を動かすことは絶対にしない。
//
// 【ASP審査に通ったあとの作業】
//   1. 下の OFFERS 配列にサービスを追加する
//   2. url に ASP が発行した計測リンクを入れる
//   3. 報酬が発生するなら pr: true にする（→ 自動で「PR」バッジが付く）
//   ※ url を空のままにすると、リンクにならず説明文だけが表示される。
//     審査前でもサイトを壊さずに置いておける。
//
// 【記入例】
//   {
//     id: "example-course",
//     useCase: "learn",              // data/useCases.ts の id と対応させる
//     name: "〇〇スクール",
//     kind: "course",
//     summary: "未経験から生成AIの実務利用までを学べるオンライン講座。",
//     url: "https://px.a8.net/....",  // ASP発行リンク
//     pr: true,
//   },
//
// 【禁止事項】
//   - 「稼げます」「儲かります」の類の表現を summary に書かない（会社の明文ルール）
//   - 実際に確認していない報酬額・実績を書かない
//   - 使ったことのないサービスを「おすすめ」と断定しない
// ============================================================================

export type OfferKind = "course" | "tool" | "career";

export type Offer = {
  /** 一意なID */
  id: string;
  /** どの用途セクションに出すか（data/useCases.ts の id） */
  useCase: string;
  /** サービス名 */
  name: string;
  /** 種別。表示ラベルに使う */
  kind: OfferKind;
  /** 中立的な一行説明。誇大表現を書かない */
  summary: string;
  /** ASPの計測リンク。未設定ならリンクにしない（審査前の状態） */
  url?: string;
  /** 報酬が発生するか。true なら「PR」バッジを表示する（景表法・ステマ規制対応） */
  pr: boolean;
};

export const KIND_LABEL: Record<OfferKind, string> = {
  course: "講座",
  tool: "ツール",
  career: "キャリア",
};

// ASP審査の通過後にここへ追加する。現時点では意図的に空。
//
// ※ 2026-09-03に検証済み：ここに url と pr:true を持つ要素を入れると、
//   「次の一歩」ブロック・PRバッジ・rel="sponsored nofollow noopener"・
//   ページ冒頭の広告表示が、すべて自動で出るところまで動作確認した。
export const OFFERS: Offer[] = [];

export function offersFor(useCaseId: string): Offer[] {
  return OFFERS.filter((o) => o.useCase === useCaseId);
}

/** 1件でも報酬が発生するリンクがあるか。ページ冒頭の広告表示の出し分けに使う */
export const HAS_PAID_OFFERS = OFFERS.some((o) => o.pr && o.url);
