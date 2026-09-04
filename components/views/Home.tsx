import type { DecoratedNews } from "@/lib/news";
import type { Award } from "@/lib/awards";
import type { MetricKey } from "@/data/metrics";
import Carousel from "../Carousel";
import AwardCard from "../cards/AwardCard";
import SmallAwardCard from "../cards/SmallAwardCard";
import NewsRailCard from "../cards/NewsRailCard";
import Table from "./Table";
import { useIsMobile } from "@/lib/useIsMobile";
import { headingRule } from "@/lib/ui";

type Props = {
  mainAwards: Award[];
  restAwards: Award[];
  news: DecoratedNews[];
  onGoNews: () => void;
  onGoAwards: () => void;
  onGoTable: () => void;
  onAwardClick: (a: Award) => void;
  onOpenModel: (name: string) => void;
  sortKey: string;
  sortDir: 1 | -1;
  onSort: (key: string) => void;
};

// トップの表に出す列。全10指標を出すと横に長すぎるので、
// 読者の関心が高い4つに絞る（全列は「一覧表」タブで見られる）。
const HOME_COLS: MetricKey[] = ["overall", "cost", "coding", "ja"];

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
  mainAwards,
  restAwards,
  news,
  onGoNews,
  onGoAwards,
  onGoTable,
  onAwardClick,
  onOpenModel,
  sortKey,
  sortDir,
  onSort,
}: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="view-pop" style={{ display: "flex", flexDirection: "column", gap: 34 }}>
      {/*
        主要3部門（総合・コスパ・コーディング）は横スクロールさせず固定グリッドで見せる。
        スクロールしないと答えが見えない状態をなくすため。
        残りの部門は従来どおり帯（カルーセル）で続ける。
      */}
      <section>
        <SectionHead title="最強ランキング" sub="公開ベンチマークから自動算出" onMore={onGoAwards} />
        <div
          className="mq-1col"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "repeat(3, minmax(0, 1fr))",
            gap: 12,
            marginBottom: 14,
          }}
        >
          {mainAwards.map((a) => (
            <AwardCard key={a.key} a={a} onClick={() => onAwardClick(a)} />
          ))}
        </div>
        <Carousel>
          {restAwards.map((a) => (
            <SmallAwardCard key={a.key} a={a} onClick={() => onAwardClick(a)} />
          ))}
        </Carousel>
      </section>

      {/* データそのものをトップに置く。「読み物」ではなく「道具」に見せるため */}
      <section>
        <SectionHead title="総合ランキング TOP 10" sub="列見出しで並べ替え" onMore={onGoTable} />
        <Table
          maker="すべて"
          sortKey={sortKey}
          sortDir={sortDir}
          onMakerChange={() => {}}
          onSort={onSort}
          onOpenModel={onOpenModel}
          compact
          embedded
          limit={10}
          only={HOME_COLS}
        />
      </section>

      <section>
        <SectionHead title="ＡＩニュース" onMore={onGoNews} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {news.map((n) => (
            <NewsRailCard key={n.title} n={n} onClick={onGoNews} />
          ))}
        </div>
      </section>
    </div>
  );
}
