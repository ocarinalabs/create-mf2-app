"use client";

import * as React from "react";
import { Check, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface PricingFeature {
  title: string;
  description?: string;
}

export interface PricingTier {
  name: string;
  price: Record<string, number | string>;
  description: string;
  features: (string | PricingFeature)[];
  cta: string;
  highlighted?: boolean;
  popular?: boolean;
  transactionFee?: string;
}

interface PricingCardProps {
  tier: PricingTier;
  paymentFrequency: string;
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const price = tier.price[paymentFrequency];
  const isHighlighted = tier.highlighted;
  const isPopular = tier.popular;

  return (
    <Card
      className={cn(
        "relative flex flex-col overflow-hidden p-4 h-full",
        isHighlighted
          ? "bg-foreground text-background"
          : "bg-background text-foreground",
        isPopular && "ring-2 ring-primary"
      )}
    >
      {isHighlighted && <HighlightedBackground />}
      {isPopular && <PopularBackground />}

      {/* Plan name - fixed height */}
      <div className="h-8 flex items-start mb-2">
        <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-sans font-medium capitalize">
          {tier.name}
          {isPopular && (
            <Badge variant="secondary" className="mt-1 z-10">
              Most Popular
            </Badge>
          )}
        </h2>
      </div>

      {/* Pricing section with prominent fees - fixed height */}
      <div className="h-20 flex flex-col justify-start">
        {typeof price === "number" ? (
          <>
            <p className="flex flex-row items-baseline gap-2">
              <span className="text-4xl font-sans font-light">RM {price}</span>
            </p>
            <p className="text-sm font-medium">+ processing fees</p>
          </>
        ) : price === "RM0" ? (
          <>
            <p className="flex flex-row items-baseline gap-2">
              <span className="text-4xl font-sans font-light">RM 0</span>
            </p>
            <p className="text-sm font-medium">+ processing fees</p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-sans font-light">{price}</h1>
            <p className="text-sm font-medium">+ processing fees</p>
          </>
        )}
      </div>

      {/* Description section - fixed height */}
      <div className="h-12 flex items-start mb-4">
        <h3 className="text-sm text-muted-foreground">{tier.description}</h3>
      </div>

      {/* Features section */}
      <div className="flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => {
            const isFeatureObject =
              typeof feature === "object" && "title" in feature;
            const featureTitle = isFeatureObject ? feature.title : feature;
            const featureDescription = isFeatureObject
              ? feature.description
              : undefined;

            return (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-4 w-4 mt-1 flex-shrink-0 min-w-[16px] min-h-[16px] text-green-400" />
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isHighlighted ? "text-background" : "text-foreground"
                    )}
                  >
                    {featureTitle}
                  </span>
                  {featureDescription && (
                    <span
                      className={cn(
                        "text-xs mt-0.5",
                        isHighlighted
                          ? "text-background/80"
                          : "text-muted-foreground"
                      )}
                    >
                      {featureDescription}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant={isHighlighted ? "secondary" : "default"}
        className="w-full font-sans"
      >
        {tier.cta}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}

const HighlightedBackground = () => (
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
);

const PopularBackground = () => (
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
);
