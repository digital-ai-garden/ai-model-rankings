import { modelLogo, providerLogo } from "@/data/logos";

// ブランドマークの表示。
//
//   model を渡す → モデルのロゴ（Claude・Gemini など）。モデル名の隣で使う
//   model を渡さない → 会社のロゴ（Anthropic・Google など）。提供元・会社ランキングで使う
//
// ロゴはCSSのマスクで塗っているため、SVG側の色に関係なくブランドカラーで出る。
// data/logos.ts で logo を外した場合は、自動で頭文字マークにフォールバックする。

export default function BrandLogo({
  maker,
  model,
  size = 18,
}: {
  maker: string;
  model?: string;
  size?: number;
}) {
  const p = model ? modelLogo(model, maker) : providerLogo(maker);

  if (!p.logo) {
    return (
      <span
        aria-hidden
        style={{
          width: size,
          height: size,
          flex: "0 0 auto",
          borderRadius: 5,
          background: p.color,
          color: "#fff",
          fontSize: size * 0.6,
          fontWeight: 900,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        {p.initial}
      </span>
    );
  }

  const url = `url(/logos/${p.logo}.svg)`;
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        display: "inline-block",
        backgroundColor: p.color,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
