import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ahmed Nasser | Frontend Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #09090b, #18181b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              letterSpacing: "-0.05em",
              background: "linear-gradient(to right, #ffffff, #a1a1aa)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Ahmed Nasser
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#a1a1aa",
              letterSpacing: "-0.02em",
            }}
          >
            Senior Frontend Developer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
