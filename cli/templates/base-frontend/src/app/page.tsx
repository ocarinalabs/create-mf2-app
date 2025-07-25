"use client";

import { AnimatedNavFramer } from "@/components/ui/navigation-bar-animation";
import { Hero } from "@/components/ui/hero";
import { BentoFeatures } from "@/components/ui/bento-features";
import { PricingSection } from "@/components/ui/pricing-section";
import { PricingTier } from "@/components/ui/pricing-card";
import { FAQ } from "@/components/ui/faq";
import { Waitlist } from "@/components/ui/waitlist";
import { Footer } from "@/components/ui/footer";
import { BGPattern } from "@/components/ui/bg-pattern";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// CUSTOMIZE THIS: Update these tiers to match your product's pricing
const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: {
      monthly: "$0",
      yearly: "$0",
    },
    description:
      "Perfect for getting started. Add your product's core features here. Customize this text to match your offering.",
    features: [
      {
        title: "Up to 10 users",
        description: "Perfect for small teams",
      },
      {
        title: "Basic features",
        description: "Everything you need to start",
      },
      {
        title: "Community support",
        description: "Get help from the community",
      },
      {
        title: "99.9% uptime",
        description: "Reliable infrastructure",
      },
      {
        title: "SSL certificates",
        description: "Secure by default",
      },
      {
        title: "API access",
        description: "Build integrations",
      },
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: {
      monthly: "$0",
      yearly: "$0",
    },
    description:
      "For growing teams. Add your premium features here. This is where you showcase what makes the upgrade worth it.",
    highlighted: false,
    popular: false,
    features: [
      {
        title: "Everything in Starter",
        description: "All basic features included",
      },
      {
        title: "Unlimited users",
        description: "No limits on team size",
      },
      {
        title: "Advanced analytics",
        description: "Deep insights into usage",
      },
      {
        title: "Priority support",
        description: "Get help fast when you need it",
      },
      {
        title: "Custom integrations",
        description: "Connect with your tools",
      },
      {
        title: "White-label options",
        description: "Make it your own",
      },
    ],
    cta: "Upgrade to Pro",
  },
];

export default function Home() {
  const { theme } = useTheme();
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
      {/* Background pattern for entire page */}
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
        heading="Move F*cking Fast"
        description="Production-ready starter kit for building modern web applications with AI."
        buttons={{
          primary: { text: "Get started", url: "#waitlist" },
          secondary: { text: "Learn more", url: "#features" },
        }}
      />
      <BentoFeatures />
      <PricingSection
        title="Pricing"
        subtitle="The gap between price and value is your opportunity"
        tiers={pricingTiers}
        frequencies={["monthly", "yearly"]}
      />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
