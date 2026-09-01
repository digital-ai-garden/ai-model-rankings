import type { DecoratedNews } from "@/lib/news";
import type { Award } from "@/lib/awards";
import Carousel from "../Carousel";
import AwardCard from "../cards/AwardCard";
import SmallAwardCard from "../cards/SmallAwardCard";
import NewsRailCard from "../cards/NewsRailCard";

type Props = {
  mainAwards: Award[];
  restAwards: Award[];
  news: DecoratedNews[];
  onGoNews: () => void;
  onGoAwards: () => void;
  onAwardClick: (a: Award) => void;
};

function SectionHead({ title, onMore }: { title: string; onMore?: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
      <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900 }}>{title}</h2>
      {onMore && (
        <a onClick={onMore} style={{ fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
          すべて見る →
        </a>
      )}
    </div>
  );
}

export default function Home({ mainAwards, restAwards, news, onGoNews, onGoAwards, onAwardClick }: Props) {
  return (
    <div className="view-pop" style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <section>
        <SectionHead title="最強ランキング" onMore={onGoAwards} />
        <Carousel>
          {mainAwards.map((a) => (
            <div key={a.key} style={{ flex: "0 0 300px", scrollSnapAlign: "start" }}>
              <AwardCard a={a} onClick={() => onAwardClick(a)} />
            </div>
          ))}
          {restAwards.map((a) => (
            <SmallAwardCard key={a.key} a={a} onClick={() => onAwardClick(a)} />
          ))}
        </Carousel>
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
