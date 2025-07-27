"use client";

import { AnimatedNavFramer } from "@/components/ui/navigation-bar-animation";
import { Hero } from "@/components/ui/hero";
import { PhilosophySection } from "@/components/ui/philosophy-section";
import { CliPreview } from "@/components/ui/cli-preview";
import { TechStack } from "@/components/ui/tech-stack";
import { FAQ } from "@/components/ui/faq";
import { CommunitySection } from "@/components/ui/community-section";
import { Footer } from "@/components/ui/footer";
import BeamsBackground from "@/components/ui/beams-background";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      {/* 3D animated beams background */}
      <BeamsBackground />
      <AnimatedNavFramer />
      <Hero
        heading="Move F*cking Fast"
        description="The only starter kit where 'it works on my machine' means it works everywhere."
        buttons={{
          primary: { text: "Get Started", url: "https://github.com/korrect/create-mf2-app" },
          secondary: { text: "View Docs", url: "#faq" },
        }}
      />
      <PhilosophySection />
      <CliPreview />
      <TechStack />
      <FAQ />
      <CommunitySection />
      <Footer />
    </main>
  );
}
