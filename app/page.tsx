"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import TabNav from "@/components/TabNav";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import NewsRailCard from "@/components/cards/NewsRailCard";
import NewsTickerCard from "@/components/cards/NewsTickerCard";
import Home from "@/components/views/Home";
import News from "@/components/views/News";
import Awards from "@/components/views/Awards";
import Rank from "@/components/views/Rank";
import Scatter from "@/components/views/Scatter";
import Radar from "@/components/views/Radar";
import Versus from "@/components/views/Versus";
import Timeline from "@/components/views/Timeline";
import Table from "@/components/views/Table";
import ModelDetail from "@/components/detail/ModelDetail";
import CompanyDetail from "@/components/detail/CompanyDetail";

import { NEWS_SEED } from "@/data/news";
import { MODELS } from "@/data/models";
import { CAT_HUE, METRICS, QUARTERS, type MetricKey, type TabId } from "@/data/metrics";
import { C } from "@/data/metrics";
import { pill } from "@/lib/ui";
import { decorate, formatDataAsOf, type DecoratedNews } from "@/lib/news";
import { buildMetricAwards, buildCreativeAwards, buildPodium, TOP_CHAMPION_TITLES, type Award } from "@/lib/awards";
import { buildRankedList } from "@/lib/rankList";
import { buildScatterPoints } from "@/lib/ranking";
import { buildModelDetail, buildCreativeDetail, buildCompanyDetail, type DetailRef } from "@/lib/detail";

export default function Page() {
  const [tab, setTab] = useState<TabId>("top");
  const [metric, setMetric] = useState<MetricKey>("cost");
  const [mounted, setMounted] = useState(false);
  const [detail, setDetail] = useState<DetailRef | null>(null);
  const [cat, setCat] = useState("すべて");
  const [picks, setPicks] = useState<string[]>(["m0", "m5", "m9"]);
  const [aId, setAId] = useState("m0");
  const [bId, setBId] = useState("m5");
  const [qi, setQi] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [maker, setMaker] = useState("すべて");
  const [sortKey, setSortKey] = useState("overall");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setQi((q) => {
        if (q >= QUARTERS.length - 1) {
          setPlaying(false);
          return q;
        }
        return q + 1;
      });
    }, 1200);
    return () => clearInterval(t);
  }, [playing]);

  const today = useMemo(() => new Date(), []);

  // 手書きの件数は実データとずれる（実際に「18 models」のまま19件になっていた）。
  // 正確さがこのサイトの看板なので、必ずデータから数える。
  const counts = useMemo(
    () => ({
      models: MODELS.length,
      providers: new Set(MODELS.map((m) => m.maker)).size,
      metrics: METRICS.length,
    }),
    []
  );

  const changeTab = (t: TabId) => {
    setTab(t);
    setDetail(null);
  };

  const openModel = (name: string) => setDetail({ kind: "model", key: name });
  const openCreative = (name: string) => setDetail({ kind: "creative", key: name });
  const openCompany = (mk: string) => setDetail({ kind: "company", key: mk });
  const closeDetail = () => setDetail(null);

  const togglePickRadar = (id: string) =>
    setPicks((s) => {
      if (s.includes(id)) return s.length > 1 ? s.filter((p) => p !== id) : s;
      return [...s.slice(-2), id];
    });

  const sortBy = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d * -1) as 1 | -1);
    } else {
      setSortKey(key);
      setSortDir(-1);
    }
  };

  const onAwardClick = (a: Award) => {
    if (a.kind === "metric") openModel(a.winner);
    else openCreative(a.winner);
  };
  const onGoRank = (a: Award) => {
    if (a.kind === "metric") {
      setMetric(a.key as MetricKey);
      changeTab("rank");
    } else {
      openCreative(a.winner);
    }
  };

  // --- ニュース ---
  const allNews: DecoratedNews[] = useMemo(
    () => [...NEWS_SEED.items].sort((a, b) => b.date.localeCompare(a.date)).map((n) => decorate(n, today)),
    [today]
  );
  const homeNews = allNews.slice(0, 10);
  const catList = useMemo(
    () => ["すべて", ...Object.keys(CAT_HUE).filter((k) => allNews.some((n) => n.cat === k))],
    [allNews]
  );
  const catChips = catList.map((k) => ({ label: k, active: cat === k }));
  const newsList = allNews.filter((n) => cat === "すべて" || n.cat === cat);
  const catCounts = Object.keys(CAT_HUE).map((k) => ({
    label: k,
    n: allNews.filter((n) => n.cat === k).length,
    color: C(CAT_HUE[k]),
  }));
  const maxCat = Math.max(1, ...catCounts.map((c) => c.n));
  const catStats = catCounts
    .filter((c) => c.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((c) => ({ ...c, barPct: mounted ? (c.n / maxCat) * 100 : 0 }));
  const priceNews = allNews.filter((n) => n.cat === "価格").length;
  const newsUpdated = NEWS_SEED.updated.slice(0, 10).replace(/-/g, "/");
  const dataAsOf = formatDataAsOf(NEWS_SEED.updated);
  const digestHead = `直近${allNews.length}件のうち価格関連が${priceNews}件。値下げ競争が続いています。`;
  const digestBody =
    "入力単価の下限は $0.20（GPT-5.6 Luna）まで下がり、Claude Sonnet 5 の $2/$10 は恒久化。一方 SWE-bench Verified は上位5モデルが4ポイント差に収まり、実力差の判断は SWE-bench Pro に移りました。コスパで選ぶなら「最強ランキング」の格安・コスパ部門から。";

  // --- ランキング・最強 ---
  const awards = useMemo(() => [...buildMetricAwards(), ...buildCreativeAwards()], []);
  const mainAwards = awards.filter((a) => TOP_CHAMPION_TITLES.includes(a.title));
  const restAwards = awards.filter((a) => !TOP_CHAMPION_TITLES.includes(a.title));
  const { ranked: rankedCompanies } = useMemo(() => buildPodium(mounted), [mounted]);
  const ranked = useMemo(() => buildRankedList(metric, mounted), [metric, mounted]);
  const scatterPoints = useMemo(() => buildScatterPoints(), []);

  // --- 詳細ページ ---
  const modelDetail = detail?.kind === "model" ? buildModelDetail(detail.key, mounted) : null;
  const creativeDetail = detail?.kind === "creative" ? buildCreativeDetail(detail.key) : null;
  const companyDetail = detail?.kind === "company" ? buildCompanyDetail(detail.key, mounted) : null;
  const md = modelDetail || creativeDetail;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 120 }}>
      {/* ① 今日のAIニュースを最上部で自動横スクロール（毎日来る理由を最初に見せる） */}
      {tab === "top" && !md && !companyDetail && (
        <div style={{ maxWidth: 1220, margin: "0 auto", padding: "12px 16px 0" }}>
          <Carousel auto>
            {homeNews.map((n) => (
              <div key={n.title} style={{ flex: "0 0 250px", scrollSnapAlign: "start" }}>
                <NewsTickerCard n={n} onClick={() => changeTab("news")} />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* ② ヒーロー画像 */}
      <Header />

      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "10px 28px 0", display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
        <span style={pill}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "oklch(0.7 0.16 145)" }} />
          {dataAsOf}
        </span>
        <span className="font-num" style={{ fontSize: 12, color: "var(--ink-faint-2)", alignSelf: "center" }}>
          {counts.models} models / {counts.providers} providers / {counts.metrics} metrics
        </span>
      </div>

      <main style={{ maxWidth: 1220, margin: "0 auto", padding: "18px 28px 0" }}>
        {md ? (
          <ModelDetail
            md={md}
            onBack={closeDetail}
            onCompany={() => openCompany(md.maker)}
            onVersus={() => {
              if (modelDetail) {
                setDetail(null);
                setTab("vs");
                setAId(modelDetail.modelId);
              }
            }}
          />
        ) : companyDetail ? (
          <CompanyDetail cd={companyDetail} onBack={closeDetail} onModel={openModel} />
        ) : (
          <>
            {tab === "top" && (
              <Home
                awards={awards}
                news={homeNews}
                onGoNews={() => changeTab("news")}
                onGoAwards={() => changeTab("awards")}
                onGoTable={() => changeTab("table")}
                onAwardClick={onAwardClick}
                onOpenModel={openModel}
              />
            )}
            {tab === "news" && (
              <News
                newsList={newsList}
                catChips={catChips}
                onCatChange={setCat}
                catStats={catStats}
                newsUpdated={newsUpdated}
                digestHead={digestHead}
                digestBody={digestBody}
              />
            )}
            {tab === "awards" && (
              <Awards
                companies={rankedCompanies}
                awards={awards}
                onOpenCompany={openCompany}
                onAwardClick={onAwardClick}
                onGoRank={onGoRank}
              />
            )}
            {tab === "rank" && <Rank metric={metric} onMetricChange={setMetric} ranked={ranked} onOpenModel={openModel} />}
            {tab === "scatter" && <Scatter points={scatterPoints} mounted={mounted} onOpenModel={openModel} />}
            {tab === "radar" && <Radar picks={picks} mounted={mounted} onPick={togglePickRadar} />}
            {tab === "vs" && (
              <Versus
                aId={aId}
                bId={bId}
                mounted={mounted}
                onPickA={setAId}
                onPickB={setBId}
              />
            )}
            {tab === "time" && (
              <Timeline
                qi={qi}
                playing={playing}
                onToggle={() => {
                  if (playing) {
                    setPlaying(false);
                  } else {
                    setQi(0);
                    setPlaying(true);
                  }
                }}
                onQuarterChange={(v) => {
                  setQi(v);
                  setPlaying(false);
                }}
              />
            )}
            {tab === "table" && (
              <Table maker={maker} sortKey={sortKey} sortDir={sortDir} onMakerChange={setMaker} onSort={sortBy} onOpenModel={openModel} compact={false} />
            )}
          </>
        )}
      </main>
      <Footer />

      {/*
        ③④ タブは画面下部に固定する（2026-09-05 オーナー指定・スマホアプリ風）。
        スクロールしても常に触れる位置に置くため position:fixed とし、
        本文が隠れないよう <div> 側に paddingBottom を確保している。
      */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          padding: "8px 12px calc(8px + env(safe-area-inset-bottom))",
          background: "linear-gradient(to top, var(--bg-base) 62%, transparent)",
          pointerEvents: "none",
        }}
      >
        <div style={{ maxWidth: 1220, margin: "0 auto", pointerEvents: "auto" }}>
          <TabNav tab={tab} onChange={changeTab} />
        </div>
      </div>
    </div>
  );
}
