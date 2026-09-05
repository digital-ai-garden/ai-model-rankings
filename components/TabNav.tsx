"use client";

import { useEffect, useRef } from "react";
import { TABS, type TabId } from "@/data/metrics";
import { useIsMobile } from "@/lib/useIsMobile";

export default function TabNav({ tab, onChange }: { tab: TabId; onChange: (t: TabId) => void }) {
  const isMobile = useIsMobile();
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
  }, [tab]);

  return (
    <nav
      className="mq-scroll-x"
      style={{
        display: "flex",
        gap: 6,
        // 下部固定バーは横に長くなるため、PCでも折り返さず横スクロールさせる
        flexWrap: "nowrap",
        overflowX: "auto",
        justifyContent: "flex-start",
        padding: 6,
        background: "var(--card)",
        border: "1px solid var(--card-border)",
        borderRadius: 999,
        boxShadow: "0 1px 2px rgba(24, 24, 27, 0.05), 0 8px 24px rgba(24, 24, 27, 0.05)",
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-x",
        width: isMobile ? "100%" : undefined,
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {TABS.map((t) => {
        const active = tab === t.id;
        return (
          <button
            key={t.id}
            ref={active ? activeRef : undefined}
            onClick={() => onChange(t.id)}
            className="chip-transition"
            style={{
              flex: isMobile ? "0 0 auto" : "0 1 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: isMobile ? "8px 13px" : "11px 17px",
              border: "none",
              borderRadius: 999,
              background: active ? "linear-gradient(135deg, #2b2b33, #18181b)" : "transparent",
              color: active ? "var(--dark-fg)" : "var(--ink-sub-2)",
              boxShadow: active ? "0 2px 10px rgba(24, 24, 27, 0.26)" : "none",
              fontWeight: active ? 900 : 700,
              fontSize: isMobile ? 12.5 : 14,
              cursor: "pointer",
              whiteSpace: "nowrap",
              touchAction: "manipulation",
            }}
          >
            {!isMobile && (
              <span className="font-num" style={{ fontSize: 10, letterSpacing: "0.16em", opacity: 0.65 }}>
                {t.en}
              </span>
            )}
            <span>{t.label}</span>
          </button>
        );
      })}

      {/* タブではなく別ページへのリンク。切替ではなく遷移するので <a> にしている */}
      <a
        href="/erabikata/"
        className="chip-transition"
        style={{
          flex: "0 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: isMobile ? "8px 13px" : "11px 17px",
          borderRadius: 999,
          background: "transparent",
          color: "var(--ink-sub-2)",
          fontWeight: 700,
          fontSize: isMobile ? 12.5 : 14,
          whiteSpace: "nowrap",
          textDecoration: "none",
        }}
      >
        {!isMobile && (
          <span className="font-num" style={{ fontSize: 10, letterSpacing: "0.16em", opacity: 0.65 }}>
            PICKS
          </span>
        )}
        <span>用途から選ぶ</span>
      </a>
    </nav>
  );
}
