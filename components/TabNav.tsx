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
        flexWrap: isMobile ? "nowrap" : "wrap",
        overflowX: isMobile ? "auto" : "visible",
        justifyContent: isMobile ? "flex-start" : "center",
        marginTop: isMobile ? 16 : 30,
        padding: 6,
        background: "var(--card)",
        border: "1.5px solid var(--card-border)",
        borderRadius: 16,
        boxShadow: "0 3px 0 var(--card-border)",
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
              padding: isMobile ? "8px 11px" : "11px 14px",
              border: "none",
              borderRadius: 12,
              background: active ? "#191817" : "transparent",
              color: active ? "var(--dark-fg)" : "var(--ink-sub-2)",
              fontWeight: 700,
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
    </nav>
  );
}
