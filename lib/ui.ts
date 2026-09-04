import type { CSSProperties } from "react";

export const ACCENT = "oklch(0.68 0.165 60)";

/*
 * 2026-09-04：カードの見た目を作り直した。
 *
 * 9/3に「素人っぽさ」を消そうとして影と角丸を削り切った結果、
 * オーナーから「もっさりしている」という評価を受けた。削ったものが個性だった。
 * 白地は保ったまま、角丸を大きく取り、影を二段で落として立体感を戻している。
 * バナーのアプリアイコン的な質感（大きな角丸＋浮き）に合わせるのが狙い。
 */
export const card: CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--card-border)",
  borderRadius: 18,
  boxShadow: "0 1px 2px rgba(24, 24, 27, 0.05), 0 8px 24px rgba(24, 24, 27, 0.05)",
};

export const cardLg: CSSProperties = {
  ...card,
  borderRadius: 22,
  boxShadow: "0 1px 2px rgba(24, 24, 27, 0.05), 0 14px 34px rgba(24, 24, 27, 0.07)",
};

export const pill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "7px 14px",
  borderRadius: 999,
  background: "var(--card)",
  border: "1px solid var(--card-border)",
  boxShadow: "0 1px 2px rgba(24, 24, 27, 0.04)",
  fontSize: 12,
  fontWeight: 700,
  color: "var(--ink-weak-2)",
};

export function chipStyle(active: boolean): CSSProperties {
  return {
    padding: "8px 16px",
    borderRadius: 999,
    border: `1px solid ${active ? "transparent" : "var(--card-border)"}`,
    background: active ? "linear-gradient(135deg, #2b2b33, #18181b)" : "var(--card)",
    color: active ? "var(--dark-fg)" : "var(--ink-sub-2)",
    boxShadow: active
      ? "0 2px 8px rgba(24, 24, 27, 0.22)"
      : "0 1px 2px rgba(24, 24, 27, 0.04)",
    fontSize: 13,
    fontWeight: 800,
  };
}

/** セクション見出しに添える色付きのアクセント罫 */
export const headingRule: CSSProperties = {
  width: 5,
  height: 22,
  borderRadius: 999,
  background: `linear-gradient(180deg, ${ACCENT}, oklch(0.62 0.19 25))`,
  flex: "0 0 auto",
};

export const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  fontWeight: 900,
};

export const backBtn: CSSProperties = {
  alignSelf: "flex-start",
  padding: "8px 15px",
  borderRadius: 999,
  border: "1px solid var(--card-border)",
  background: "var(--card)",
  fontSize: 13,
  fontWeight: 700,
  color: "var(--ink-sub-2)",
};
