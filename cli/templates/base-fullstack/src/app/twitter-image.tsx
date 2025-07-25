import { ImageResponse } from "next/og";

// Image metadata
export const alt = "MF2 Stack - Move F***ing Fast";
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
          fontSize: 128,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)`,
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: 180,
            fontWeight: 900,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
            letterSpacing: "-0.05em",
          }}
        >
          MF2
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 48,
            color: "white",
            fontWeight: 700,
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          Move F***ing Fast Stack
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#a0a0a0",
            marginBottom: 40,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          The opinionated SaaS starter with Next.js, Convex, Clerk, and Polar
        </div>

        {/* Tech stack badges */}
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          {["Next.js", "Convex", "Clerk", "Polar"].map((tech) => (
            <div
              key={tech}
              style={{
                padding: "8px 20px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 20,
                fontSize: 18,
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#667eea",
            fontWeight: 500,
          }}
        >
          Ship your startup in days, not months
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
