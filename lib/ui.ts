import type { CSSProperties } from "react";

export const ACCENT = "oklch(0.68 0.165 60)";

export const card: CSSProperties = {
  background: "var(--card)",
  border: "1.5px solid var(--card-border)",
  borderRadius: 20,
  boxShadow: "0 3px 0 var(--card-border)",
};

export const cardLg: CSSProperties = {
  ...card,
  borderRadius: 24,
  boxShadow: "0 4px 0 var(--card-border)",
};

export const pill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "7px 13px",
  borderRadius: 999,
  background: "var(--card)",
  border: "1.5px solid var(--card-border)",
  boxShadow: "0 2px 0 var(--card-border)",
  fontSize: 12,
  fontWeight: 700,
  color: "var(--ink-weak-2)",
};

export function chipStyle(active: boolean): CSSProperties {
  return {
    padding: "8px 15px",
    borderRadius: 999,
    border: `1.5px solid ${active ? "#191817" : "var(--card-border)"}`,
    background: active ? "#191817" : "var(--card)",
    color: active ? "var(--dark-fg)" : "var(--ink-sub-2)",
    fontSize: 13,
    fontWeight: 700,
  };
}

export const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  fontWeight: 900,
};

export const backBtn: CSSProperties = {
  alignSelf: "flex-start",
  padding: "9px 16px",
  borderRadius: 999,
  border: "1.5px solid var(--card-border)",
  background: "var(--card)",
  boxShadow: "0 2px 0 var(--card-border)",
  fontSize: 13,
  fontWeight: 700,
  color: "var(--ink-sub-2)",
};
