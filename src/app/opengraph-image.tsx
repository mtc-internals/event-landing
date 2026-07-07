import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #5C3BFE 0%, #9C53FE 50%, #FF5757 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "rgba(255,255,255,0.18)",
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 56, display: "flex" }}>✨</div>
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, color: "white", display: "flex" }}>Evento</div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.85)", marginTop: 16, display: "flex" }}>
          Discover events happening near you
        </div>
      </div>
    ),
    { ...size }
  );
}
