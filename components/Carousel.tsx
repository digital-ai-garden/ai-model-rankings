"use client";

import { useEffect, useRef, useState } from "react";

export default function Carousel({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    updateEdges();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [children]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        aria-label="前へ"
        onClick={() => scrollBy(-1)}
        disabled={atStart}
        style={{
          position: "absolute",
          left: -14,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.5px solid var(--card-border)",
          background: "var(--card)",
          boxShadow: "0 3px 8px rgba(30,25,15,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: atStart ? "default" : "pointer",
          opacity: atStart ? 0.35 : 1,
          fontSize: 16,
          fontWeight: 900,
          color: "var(--ink-body)",
        }}
      >
        ‹
      </button>
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          scrollSnapType: "x proximity",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 4,
        }}
      >
        {children}
      </div>
      <button
        aria-label="次へ"
        onClick={() => scrollBy(1)}
        disabled={atEnd}
        style={{
          position: "absolute",
          right: -14,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 34,
          height: 34,
          borderRadius: "50%",
          border: "1.5px solid var(--card-border)",
          background: "var(--card)",
          boxShadow: "0 3px 8px rgba(30,25,15,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: atEnd ? "default" : "pointer",
          opacity: atEnd ? 0.35 : 1,
          fontSize: 16,
          fontWeight: 900,
          color: "var(--ink-body)",
        }}
      >
        ›
      </button>
    </div>
  );
}
