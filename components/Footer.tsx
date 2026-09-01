export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: 1220,
        margin: "40px auto 0",
        padding: "0 28px 40px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontSize: 12,
        color: "var(--ink-faint-2)",
        lineHeight: 1.7,
      }}
    >
      <span>
        価格・コンテキスト長・SWE-bench Verified / Pro・出力速度・TTFT は2026年8月時点の各社公表値および第三者トラッカー（Artificial
        Analysis / llm-stats / Scale SEAL 等）の公開値にもとづく参考値です。
      </span>
      <span>
        期間限定価格を含みます（GPT-5.6 Sol は8月21日からの3か月限定の値下げ後、Gemini 3.7 Flash は12月31日までの導入価格、Claude
        Sonnet 5 は $2/$10 の恒久化と8月31日での改定の両説あり）。導入判断の前に各社の価格ページでご確認ください。
      </span>
      <span>
        総合指数・日本語・マルチモーダルの3項目は公開スコアを本サイトで合成・推定した独自値で、公式指標ではありません。ハーネスや計測条件により数値は変動します。
      </span>
      <span>
        画像生成・音楽生成の部門（「参考」表示）は編集部評価による参考順位です。動画生成は Artificial Analysis の Elo を根拠としています。
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          marginTop: 22,
          paddingTop: 22,
          borderTop: "1.5px solid var(--card-border)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: "var(--ink-sub)" }}>免責事項</span>
          <span>
            本サイトは公開情報にもとづく参考情報であり、内容の正確性・完全性・最新性を保証しません。価格やモデルの提供状況は予告なく変更されます。実際の導入判断は各社の公式ドキュメントおよび価格ページでご確認ください。本サイトの情報にもとづく判断により生じた損害について、当サイトは責任を負いません。
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: "var(--ink-sub)" }}>ニュースの取り扱い</span>
          <span>
            各ニュースは公表された事実を当サイトが独自に要約したもので、記事本文の翻訳・転載は行っていません。原文の著作権は各発行元に帰属します。全文は各カードの「原文を開く」から発行元サイトでご覧ください。
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: "var(--ink-sub)" }}>商標について</span>
          <span>
            記載の会社名・製品名・ロゴは各社の商標または登録商標です。本サイトでは比較・報道の目的で識別のために使用しており、各社との提携・後援・推奨関係を示すものではありません。
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 900, color: "var(--ink-sub)" }}>お問い合わせ・削除依頼</span>
          <span>掲載内容の誤り、権利に関するご指摘、掲載の停止・削除のご依頼は下記までご連絡ください。速やかに確認・対応します。</span>
          <span className="font-num" style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-sub)" }}>
            contact@example.com
          </span>
        </div>
      </div>
    </footer>
  );
}
