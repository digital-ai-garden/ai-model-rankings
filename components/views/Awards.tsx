"use client";

import type { Award } from "@/lib/awards";
import type { CompanyRank } from "@/lib/ranking";
import { useIsMobile } from "@/lib/useIsMobile";
import AwardCard from "../cards/AwardCard";

type RankedCompany = CompanyRank & { place: number };

type Props = {
  companies: RankedCompany[];
  awards: Award[];
  onOpenCompany: (maker: string) => void;
  onAwardClick: (a: Award) => void;
  onGoRank: (a: Award) => void;
};

export default function Awards({ companies, awards, onOpenCompany, onAwardClick, onGoRank }: Props) {
  const isMobile = useIsMobile();
  return (
    <section className="view-pop">
      <h2 style={{ margin: "0 0 6px", fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>最強ＡＩ会社</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--ink-weak)" }}>
        各社の最上位モデルの総合指数で比較。同点の場合はそのモデルのコーディング（SWE-bench Verified）、次に掲載モデル数で順位を決めています。
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 40 }}>
        {companies.map((c) => (
          <div
            key={c.maker}
            onClick={() => onOpenCompany(c.maker)}
            className="card-hover mq-awards-row"
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "22px 24px minmax(0, 1fr) auto" : "26px 26px 1fr 190px 48px",
              gap: isMobile ? 8 : 12,
              alignItems: "center",
              padding: isMobile ? "8px 12px" : "9px 16px",
              background: c.place === 1 ? c.monoBg : "var(--card)",
              border: `1.5px solid ${c.place === 1 ? c.color : "var(--card-border)"}`,
              borderRadius: 13,
              cursor: "pointer",
            }}
          >
            <span className="font-num" style={{ fontSize: 12, fontWeight: 900, color: "var(--ink-faint-2)" }}>
              {c.place}
            </span>
            <span
              className="font-num"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                borderRadius: 7,
                background: c.place === 1 ? "var(--card)" : c.monoBg,
                fontSize: 11,
                fontWeight: 900,
                color: c.color,
              }}
            >
              {c.initial}
            </span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 900, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {c.maker}
              </span>
              <span
                className="mq-awards-best-inline"
                style={{
                  display: isMobile ? "block" : "none",
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "var(--ink-faint)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {c.best}
              </span>
            </span>
            <span
              className="mq-awards-best-col"
              style={{ display: isMobile ? "none" : "block", fontSize: 11.5, fontWeight: 700, color: "var(--ink-faint)" }}
            >
              {c.best}
            </span>
            <span className="font-num" style={{ fontSize: isMobile ? 14 : 16, fontWeight: 900, textAlign: "right", color: c.color }}>
              {c.score}
            </span>
          </div>
        ))}
      </div>

      <h2 style={{ margin: "0 0 6px", fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>部門別 最強モデル</h2>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: "var(--ink-weak)" }}>
        カードをクリックすると、その部門の王者モデルの詳細ページへ。部門のフルランキングは各カード下のリンクから。
      </p>
      <div className="mq-1col" style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
        {awards.map((a) => (
          <div key={a.key} style={{ display: "flex", flexDirection: "column" }}>
            <AwardCard a={a} onClick={() => onAwardClick(a)} />
            <a onClick={() => onGoRank(a)} style={{ fontSize: 12, fontWeight: 700, marginTop: 8, cursor: "pointer" }}>
              この部門のフルランキング →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
