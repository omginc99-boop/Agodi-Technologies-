import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #4B1FAF 0%, #7c2dd1 50%, #FF8C00 100%)",
          color: "#fff",
          fontSize: 118,
          fontWeight: 900,
          letterSpacing: -6,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
