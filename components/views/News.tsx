import type { DecoratedNews } from "@/lib/news";
import { chipStyle, cardLg } from "@/lib/ui";
import { useIsMobile } from "@/lib/useIsMobile";
import ImageSlot from "../ImageSlot";

export type CatChip = { label: string; active: boolean };
export type CatStat = { label: string; n: number; color: string; barPct: number };

type Props = {
  newsList: DecoratedNews[];
  catChips: CatChip[];
  onCatChange: (label: string) => void;
  catStats: CatStat[];
  newsUpdated: string;
  digestHead: string;
  digestBody: string;
};

export default function News({ newsList, catChips, onCatChange, catStats, newsUpdated, digestHead, digestBody }: Props) {
  const isMobile = useIsMobile();
  return (
    <section className="view-pop">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 26, fontWeight: 900 }}>今日のＡＩニュース</h2>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-weak-2)" }}>最終更新 {newsUpdated}</span>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
        {catChips.map((c) => (
          <button key={c.label} onClick={() => onCatChange(c.label)} style={chipStyle(c.active)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="mq-1col" style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "1.35fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {newsList.map((n) => (
            <article
              key={n.title}
              className="card-hover mq-1col"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "148px 1fr",
                gap: isMobile ? 10 : 18,
                padding: isMobile ? "14px 16px" : "20px 22px",
                background: "var(--card)",
                border: "1.5px solid var(--card-border)",
                borderRadius: 20,
                boxShadow: "0 3px 0 var(--card-border)",
              }}
            >
              <div className="mq-hide" style={{ display: isMobile ? "none" : "block" }}>
                <ImageSlot width={148} height={110} src={n.image} credit={n.credit} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ padding: "4px 11px", borderRadius: 8, background: n.catBg, color: n.catFg, fontSize: 11, fontWeight: 900 }}>{n.cat}</span>
                  <span className="font-num" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-faint-2)" }}>
                    {n.date}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#b8b2a6" }}>{n.ago}</span>
                </div>
                <h3 style={{ margin: 0, fontSize: 19, fontWeight: 900, lineHeight: 1.35, letterSpacing: "-0.01em" }}>{n.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: "var(--ink-body-2)" }}>{n.body}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-faint-2)" }}>出典 {n.source}</span>
                  <a href={n.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 700 }}>
                    原文を開く →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 14, position: isMobile ? "static" : "sticky", top: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "20px 22px", background: "#191817", color: "var(--dark-fg)", borderRadius: 20 }}>
            <span className="font-num" style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.18em", color: "#a09a8c" }}>
              DAILY DIGEST
            </span>
            <span style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.45 }}>{digestHead}</span>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "#cec8ba" }}>{digestBody}</p>
          </div>
          <div style={{ ...cardLg, boxShadow: "0 3px 0 var(--card-border)", display: "flex", flexDirection: "column", gap: 10, padding: "20px 22px" }}>
            <span style={{ fontSize: 14, fontWeight: 900 }}>今月の動き</span>
            {catStats.map((c) => (
              <div key={c.label} style={{ display: "grid", gridTemplateColumns: "96px 1fr 28px", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-sub)" }}>{c.label}</span>
                <div style={{ height: 9, borderRadius: 999, background: "var(--bar-track)", overflow: "hidden" }}>
                  <div className="bar-fill" style={{ height: "100%", width: `${c.barPct}%`, borderRadius: 999, background: c.color }} />
                </div>
                <span className="font-num" style={{ fontSize: 13, fontWeight: 900, textAlign: "right", color: "var(--ink-weak)" }}>
                  {c.n}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              padding: "18px 20px",
              background: "var(--note-bg)",
              border: "1.5px dashed var(--note-border)",
              borderRadius: 20,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 900, color: "var(--note-fg)" }}>自動更新について</span>
            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: "var(--ink-sub)" }}>
              この欄は現在サイト同梱の初期データを表示しています。毎朝の自動更新には、各社ブログ・ベンチマークサイトを巡回してニュースを取得・要約する定期ジョブが別途必要です（次のアクションとして計画中）。
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
