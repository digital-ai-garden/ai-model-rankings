import type { DecoratedNews } from "@/lib/news";
import type { Award } from "@/lib/awards";
import Carousel from "../Carousel";
import AwardCard from "../cards/AwardCard";
import SmallAwardCard from "../cards/SmallAwardCard";
import NewsRailCard from "../cards/NewsRailCard";
import TopTen from "../TopTen";
import { useIsMobile } from "@/lib/useIsMobile";
import { headingRule } from "@/lib/ui";

type Props = {
  awards: Award[];
  news: DecoratedNews[];
  onGoNews: () => void;
  onGoAwards: () => void;
  onGoTable: () => void;
  onAwardClick: (a: Award) => void;
  onOpenModel: (name: string) => void;
};

// トップページの並び順は 2026-09-05 にオーナーが指定したもの。
//   ①ニュース自動横スクロール ②ヒーロー(Headerが描画) ③④タブ(page.tsxが下部固定で描画)
//   ⑤総合TOP10 ⑥最強総合 ⑦最強コーディング ⑧最強エージェント
//   ⑨最強動画生成 ⑩最強画像生成 ⑪部門別の帯 ⑫免責(Footer)
// ⑥〜⑩は単独カードで見せ、それ以外の部門は⑪の帯にまとめる。
const SOLO_AWARD_KEYS = ["overall", "coding", "agent", "動画生成", "画像生成"];

function SectionHead({ title, sub, onMore }: { title: string; sub?: string; onMore?: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, flexWrap: "wrap", minWidth: 0 }}>
        <span style={headingRule} />
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, letterSpacing: "-0.02em" }}>{title}</h2>
        {sub && <span style={{ fontSize: 12.5, color: "var(--ink-faint-2)" }}>{sub}</span>}
      </div>
      {onMore && (
        <a onClick={onMore} style={{ fontSize: 12.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
          すべて見る →
        </a>
      )}
    </div>
  );
}

export default function Home({
  awards,
  news,
  onGoNews,
  onGoAwards,
  onGoTable,
  onAwardClick,
  onOpenModel,
}: Props) {
  const isMobile = useIsMobile();
  const solo = SOLO_AWARD_KEYS.map((k) => awards.find((a) => a.key === k)).filter(
    (a): a is Award => Boolean(a)
  );
  const rest = awards.filter((a) => !SOLO_AWARD_KEYS.includes(a.key));

  return (
    <div className="view-pop" style={{ display: "flex", flexDirection: "column", gap: 34 }}>
      {/* ⑤ 総合ランキング TOP 10 */}
      <section>
        <SectionHead title="総合ランキング TOP 10" sub="公開ベンチマークから自動算出" onMore={onGoTable} />
        <TopTen onOpenModel={onOpenModel} />
      </section>

      {/*
        ⑥〜⑩ 主要5部門。
        PCでは縦一列だと間延びするため3列グリッドで横に並べる。
        1行目にテキストAIの3部門（総合・コーディング・エージェント）、
        2行目に生成系の2部門（動画・画像）が来るので、意味の区切りとも一致する。
        横スクロールにしない理由：5枚しかなく、スクロールさせると
        答えが画面外に隠れてしまう（同じ画面に横スクロールが3つ並ぶのも煩雑）。
      */}
      <section>
        <SectionHead title="部門別の最強" sub="主要5部門" />
        <div
          className="mq-1col"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "repeat(3, minmax(0,1fr))",
            gap: 14,
          }}
        >
          {solo.map((a) => (
            <div key={a.key} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: "var(--ink-sub)" }}>
                最強{a.title}
              </span>
              <AwardCard a={a} onClick={() => onAwardClick(a)} />
            </div>
          ))}
        </div>
      </section>

      {/* ⑪ 残りの部門は横スクロールの帯にまとめる */}
      <section>
        <SectionHead title="部門別ランキング" sub="横にスクロールできます" onMore={onGoAwards} />
        <Carousel>
          {rest.map((a) => (
            <SmallAwardCard key={a.key} a={a} onClick={() => onAwardClick(a)} />
          ))}
        </Carousel>
      </section>

      {/* ニュースは①で最上部に出しているので、ここでは繰り返さない */}
      <section>
        <SectionHead title="ＡＩニュース" onMore={onGoNews} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {news.slice(0, 5).map((n) => (
            <NewsRailCard key={n.title} n={n} onClick={onGoNews} />
          ))}
        </div>
      </section>
    </div>
  );
}
