import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Tonkic — AI, Systems & Knowledge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "stretch",
        background: "#080908",
        color: "#f4f0e8",
        display: "flex",
        height: "100%",
        padding: "64px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "radial-gradient(circle, rgba(139,232,255,.34), transparent 68%)",
          border: "1px solid rgba(244,240,232,.18)",
          borderRadius: "999px",
          display: "flex",
          height: "460px",
          position: "absolute",
          right: "-40px",
          top: "-90px",
          width: "460px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", fontSize: 24, fontWeight: 800, letterSpacing: ".16em" }}>TONKIC</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 900, letterSpacing: "-.06em", lineHeight: 1 }}>
            AI, Systems
          </div>
          <div style={{ color: "#8be8ff", display: "flex", fontSize: 92, fontWeight: 900, letterSpacing: "-.06em", lineHeight: 1 }}>
            & Knowledge.
          </div>
        </div>
        <div style={{ color: "#b8afa2", display: "flex", fontSize: 26 }}>
          Blog · Portfolio · Model API Relay
        </div>
      </div>
    </div>,
    size,
  );
}
