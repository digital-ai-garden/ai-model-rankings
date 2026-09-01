"use client";

import { ACCENT } from "@/lib/ui";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Header() {
  const isMobile = useIsMobile();
  return (
    <header style={{ maxWidth: 1220, margin: "0 auto", padding: isMobile ? "16px 16px 0" : "22px 28px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="floaty" style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: ACCENT }} />
        <span
          className="font-num"
          style={{ fontWeight: 700, fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-weak-3)" }}
        >
          AI Model Rankings
        </span>
      </div>
      <h1 style={{ margin: "3px 0 0", fontSize: isMobile ? 20 : 26, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
        ＡＩモデル<span style={{ color: ACCENT }}>最強</span>比較
      </h1>
    </header>
  );
}
