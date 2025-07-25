"use client";

import * as React from "react";
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card";
import { Tab } from "@/components/ui/pricing-tab";
import { BlurFade } from "@/components/ui/blur-fade";

interface PricingSectionProps {
  title: string;
  subtitle: string;
  tiers: PricingTier[];
  frequencies: string[];
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(
    frequencies[0]
  );

  return (
    <section id="pricing" className="py-1">
      <div className="container">
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView={true}>
            <h2 className="font-sans text-3xl font-light mb-4 lg:text-5xl">
              {title}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView={true}>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          </BlurFade>
          <BlurFade delay={0.2} inView={true}>
            <div className="mx-auto flex w-fit rounded-full bg-muted p-1 mt-8">
              {frequencies.map((freq) => (
                <Tab
                  key={freq}
                  text={freq}
                  selected={selectedFrequency === freq}
                  setSelected={setSelectedFrequency}
                  discount={freq === "yearly"}
                />
              ))}
            </div>
          </BlurFade>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <BlurFade
              key={tier.name}
              delay={0.25 + index * 0.1}
              yOffset={20}
              inView={true}
            >
              <PricingCard tier={tier} paymentFrequency={selectedFrequency} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
