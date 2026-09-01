type ImageSlotProps = {
  width?: number | string;
  height?: number | string;
  radius?: number;
  credit?: string;
};

/** 画像は本番未確定のため空のドロップ枠のみ。CMS/DB連携は今回のスコープ外。 */
export default function ImageSlot({ width = "100%", height = 110, radius = 12, credit }: ImageSlotProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          width,
          height,
          borderRadius: radius,
          background: "var(--rule)",
          border: "1.5px dashed var(--ink-disabled-3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ink-faint-3)",
          fontSize: 11,
          fontWeight: 700,
          flex: "none",
        }}
      >
        画像未設定
      </div>
      <span style={{ fontSize: 10.5, color: "var(--ink-faint-2)" }}>{credit || "画像クレジット未設定"}</span>
    </div>
  );
}
