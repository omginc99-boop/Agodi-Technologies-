import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
          color: "#fff",
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: -1.5,
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
