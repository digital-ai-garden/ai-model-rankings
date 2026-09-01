"use client";

import { useEffect, useState } from "react";

const BREAKPOINT = 720;

function computeIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= BREAKPOINT;
}

export function useIsMobile(): boolean {
  // SSR/初回hydrationではサーバーと同じ false から始め、マウント後に
  // 実際のビューポート幅で確定させる(hydration mismatch回避のため)。
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(computeIsMobile());
    update();

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    let mq: MediaQueryList | null = null;
    try {
      mq = window.matchMedia(`(max-width: ${BREAKPOINT}px)`);
      mq.addEventListener("change", update);
    } catch {
      mq = null;
    }

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      mq?.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}
