import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferCard from "@/components/OfferCard";
import { USE_CASES } from "@/data/useCases";
import { offersFor, HAS_PAID_OFFERS } from "@/data/offers";
import { pickTop } from "@/lib/pick";
import { card, cardLg, pill } from "@/lib/ui";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "【用途別】結局どのAIを使えばいい？ | ＡＩモデル最強比較",
  description:
    "「学びたい」「文字起こしを楽にしたい」「文章を速く書きたい」など、やりたいことから使うAIモデルを選べます。順位は公開ベンチマークの数値から自動で算出しており、掲載料で順位を変えることはありません。",
  alternates: { canonical: `${SITE_URL}/erabikata/` },
  openGraph: {
    title: "【用途別】結局どのAIを使えばいい？",
    description: "やりたいことから使うAIモデルを選べるページ。順位は公開データから自動算出。",
    url: `${SITE_URL}/erabikata/`,
    siteName: SITE_NAME,
    locale: "ja_JP",
    type: "article",
  },
};

export default function ErabikataPage() {
  return (
    <div style={{ minHeight: "100vh", paddingBottom: 90 }}>
      <Header />

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "18px 28px 0" }}>
        <a
          href="/"
          style={{ display: "inline-block", fontSize: 13, fontWeight: 700, marginBottom: 16 }}
        >
          ← ランキングに戻る
        </a>

        <h1 style={{ margin: "0 0 10px", fontSize: 27, fontWeight: 900, lineHeight: 1.3 }}>
          結局、どのAIを使えばいい？
        </h1>
        <p style={{ margin: "0 0 14px", fontSize: 15, lineHeight: 1.9, color: "var(--ink-body)" }}>
          やりたいことから選べるようにまとめました。ここに出てくる「結論」は編集部の好みではなく、
          <strong>公開されているベンチマークの数値から自動で1位を取り出したもの</strong>です。
          モデルの数値が更新されれば、このページの答えも自動で変わります。
        </p>

        {/*
          ステマ規制（景品表示法・2023年10月施行）対応。
          報酬が発生するリンクが1件でもある場合に、ページ冒頭で必ず明示する。
        */}
        {HAS_PAID_OFFERS && (
          <div
            style={{
              ...card,
              padding: "12px 16px",
              marginBottom: 22,
              background: "var(--note-bg)",
              borderColor: "var(--note-border)",
              fontSize: 13,
              lineHeight: 1.8,
              color: "var(--note-fg)",
            }}
          >
            このページには広告（アフィリエイトリンク）を含みます。「PR」と表示のあるリンクから
            申し込みがあった場合、当サイトに紹介料が支払われることがあります。
            <strong>紹介料の有無はモデルの順位・スコアに一切影響しません。</strong>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 26 }}>
          {USE_CASES.map((uc, i) => {
            const top = pickTop(uc.metric);
            const offers = uc.monetized ? offersFor(uc.id) : [];

            return (
              <section key={uc.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
                  <span
                    className="font-num"
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 8,
                      background: "#191817",
                      color: "var(--dark-fg)",
                      fontSize: 13,
                      fontWeight: 900,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "0 0 auto",
                    }}
                  >
                    {i + 1}
                  </span>
                  <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900, lineHeight: 1.4 }}>
                    {uc.heading}
                  </h2>
                </div>

                <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.85, color: "var(--ink-body)" }}>
                  {uc.lead}
                </p>

                {/* 結論：データから自動で引いた1位 */}
                <div style={{ ...cardLg, padding: "18px 20px", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-faint-2)" }}>
                      いま{uc.metric === "cost" ? "コスパ" : "この用途"}で1位
                    </span>
                    <span
                      style={{
                        fontSize: 21,
                        fontWeight: 900,
                        color: top.model.color,
                        lineHeight: 1.3,
                      }}
                    >
                      {top.model.name}
                    </span>
                    <span style={{ fontSize: 12.5, color: "var(--ink-weak-2)" }}>{top.model.maker}</span>
                  </div>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                    <span style={pill}>
                      {top.metricLabel} {top.valueLabel}
                    </span>
                    <span style={pill}>API {top.priceLabel} / 1M</span>
                  </div>

                  <p
                    style={{
                      margin: "14px 0 0",
                      fontSize: 13.5,
                      lineHeight: 1.8,
                      color: "var(--ink-body-2)",
                    }}
                  >
                    {uc.reason}
                  </p>
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 12,
                      lineHeight: 1.7,
                      color: "var(--ink-faint-2)",
                    }}
                  >
                    判定に使った指標：{top.metricLabel}— {top.metricNote}
                  </p>
                </div>

                {/* 次の一歩：オファーはこの位置にだけ置く */}
                {offers.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <h3
                      style={{
                        margin: "0 0 10px",
                        fontSize: 14,
                        fontWeight: 900,
                        color: "var(--ink-sub)",
                      }}
                    >
                      次の一歩
                    </h3>
                    <div style={{ display: "grid", gap: 10 }}>
                      {offers.map((o) => (
                        <OfferCard key={o.id} offer={o} />
                      ))}
                    </div>
                  </div>
                )}

                {/* 意図的に広告を置かない節であることを読者に明示する */}
                {!uc.monetized && (
                  <p
                    style={{
                      margin: "10px 0 0",
                      fontSize: 12.5,
                      lineHeight: 1.75,
                      color: "var(--ink-faint-2)",
                    }}
                  >
                    ※ この項目には広告を掲載していません。安く済ませたい人に有料サービスを勧めるのは
                    筋が違うためです。
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <div style={{ ...card, padding: "18px 20px", marginTop: 34 }}>
          <h2 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 900 }}>このページの作り方</h2>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.85, color: "var(--ink-body)" }}>
            各項目の「1位」は、全モデルの公開データから該当する指標の最上位を機械的に取り出しています。
            編集部が順位を書き換えることはありません。能力の測定が終わっていない新しいモデルは、
            数値が確定するまで順位の計算から除外しています。
            数値の出どころと注意点はページ下部の注記をご覧ください。
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
