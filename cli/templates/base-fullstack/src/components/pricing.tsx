"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { CheckoutLink } from "@convex-dev/polar/react";
import { api } from "@/convex/_generated/api";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  productId?: string;
  features: string[];
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for side projects",
    price: "$9",
    productId: process.env.NEXT_PUBLIC_POLAR_STARTER_PRODUCT_ID,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "48-hour support",
      "Export to CSV",
    ],
  },
  {
    name: "Pro",
    description: "For growing businesses",
    price: "$29",
    productId: process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large teams",
    price: "Custom",
    features: [
      "Everything in Pro",
      "SSO/SAML",
      "Dedicated support",
      "Custom contracts",
      "99.9% SLA",
    ],
  },
];

export function Pricing() {
  if (process.env.NEXT_PUBLIC_POLAR_ENABLED !== "true") {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Choose the plan that fits your needs. Always flexible to scale.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? "border-primary shadow-lg" : ""}
            >
              {plan.popular && (
                <div className="px-3 py-1 text-xs text-primary-foreground bg-primary rounded-br-lg rounded-tl-lg absolute top-0 left-0">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.productId ? (
                  <CheckoutLink
                    polarApi={api.payments.polar}
                    productIds={[plan.productId]}
                    className="w-full"
                  >
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CheckoutLink>
                ) : (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() =>
                      (window.location.href = "mailto:sales@example.com")
                    }
                  >
                    Contact Sales
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
