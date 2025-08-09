"use client";

import { AnimatedNavFramer } from "@/components/ui/navigation-bar-animation";
import { Hero } from "@/components/ui/hero";
import { BentoFeatures } from "@/components/ui/bento-features";
import { PricingSection } from "@/components/ui/pricing-section";
import { FAQ } from "@/components/ui/faq";
import { Waitlist } from "@/components/ui/waitlist";
import { Footer } from "@/components/ui/footer";
import { BGPattern } from "@/components/ui/bg-pattern";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { pricingTiers, pricingConfig } from "@/lib/pricing-data";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <BGPattern
        variant="grid"
        mask="fade-edges"
        size={40}
        fill={
          theme === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)"
        }
        className="fixed inset-0"
      />
      <AnimatedNavFramer />
      <Hero
        heading="Your Headline Should Focus on Transformation, Not Features"
        description="Expand on your promise here. Explain HOW you deliver the transformation in 1-2 clear sentences. Address their pain point and your unique solution."
        // CTA Tip: Use specific actions with clear value. Avoid "Get Started" or "Learn More"
        buttons={{
          primary: { text: "Try Free", url: "#waitlist" },
          secondary: { text: "See How It Works", url: "#features" },
        }}
      />
      <BentoFeatures />
      <PricingSection
        title={pricingConfig.title}
        subtitle={pricingConfig.subtitle}
        tiers={pricingTiers}
        frequencies={pricingConfig.frequencies}
      />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
