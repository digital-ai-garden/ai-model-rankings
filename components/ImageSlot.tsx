type ImageSlotProps = {
  width?: number | string;
  height?: number | string;
  radius?: number;
  credit?: string;
  src?: string;
};

/** srcが無ければ空のドロップ枠を表示（CMS/DB連携は今回のスコープ外）。 */
export default function ImageSlot({ width = "100%", height = 110, radius = 12, credit, src }: ImageSlotProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          style={{
            width,
            height,
            borderRadius: radius,
            objectFit: "cover",
            flex: "none",
          }}
        />
      ) : (
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
      )}
      <span style={{ fontSize: 10.5, color: "var(--ink-faint-2)" }}>{credit || "画像クレジット未設定"}</span>
    </div>
  );
}
