"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpeedLinesShader = dynamic(
  () =>
    import("@/components/ui/speed-lines-shader").then((mod) => ({
      default: mod.SpeedLinesShader,
    })),
  { ssr: false }
);

const SPLASH_DURATION = 2800;
const FADE_DURATION = 800;
const SESSION_KEY = "mf2-splash-seen";

export const SplashScreen = () => {
  const [phase, setPhase] = useState<"loading" | "visible" | "fading" | "gone">(
    "loading"
  );

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("gone");
      return;
    }

    setPhase("visible");

    const fadeTimer = setTimeout(() => {
      setPhase("fading");
    }, SPLASH_DURATION);

    const goneTimer = setTimeout(() => {
      setPhase("gone");
      sessionStorage.setItem(SESSION_KEY, "1");
    }, SPLASH_DURATION + FADE_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (phase === "gone" || phase === "loading") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] transition-opacity"
      style={{
        transitionDuration: `${FADE_DURATION}ms`,
        opacity: phase === "fading" ? 0 : 1,
      }}
    >
      <SpeedLinesShader />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="select-none font-bold text-8xl text-white tracking-tight sm:text-9xl">
          ⏭ mf²
        </h1>
      </div>
    </div>
  );
};
