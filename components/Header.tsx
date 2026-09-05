// サイト上部のヒーローバナー。
//
// 【画像の出し分け】
//   JSの useIsMobile は使わない。描画後に切り替わるとちらつくため、
//   <picture> のメディアクエリでブラウザに確定させる。
//   /erabikata/ はサーバーコンポーネントなので、その点でも都合がよい。
//
// 【差し替えについて】
//   バナーには3社のロゴが含まれる（リスクを承知のうえでのオーナー判断・ADM-013/014）。
//   権利者から申し出があった場合は public/hero-wide.jpg と hero-compact.jpg の
//   2ファイルを置き換えるだけで済むよう、参照箇所をこのファイル1つに閉じている。

export default function Header() {
  return (
    <header style={{ maxWidth: 1220, margin: "0 auto", padding: "10px 16px 0" }}>
      <a href="/" style={{ display: "block", textDecoration: "none" }}>
        <picture>
          <source media="(max-width: 720px)" srcSet="/hero-compact.jpg" />
          <img
            src="/hero-wide.jpg"
            alt="ＡＩモデル最強比較 — AI Model Rankings"
            width={1800}
            height={383}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 18,
            }}
          />
        </picture>
      </a>

    </header>
  );
}
