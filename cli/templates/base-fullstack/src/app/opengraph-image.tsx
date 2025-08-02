import { ImageResponse } from "next/og";

// Image metadata
export const alt = "Your App Name";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* App Name/Logo Placeholder */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            background: "linear-gradient(to bottom right, #000000, #434343)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          Your App
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 300,
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: 1.2,
            color: "#333",
          }}
        >
          Your tagline goes here
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: "#666",
            textAlign: "center",
            maxWidth: "70%",
            lineHeight: 1.4,
          }}
        >
          Replace this with a brief description of your app. This will appear
          when your link is shared on social media.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
