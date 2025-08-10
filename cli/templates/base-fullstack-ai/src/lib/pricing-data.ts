import { PricingTier } from "@/components/ui/pricing-card";

// PRICING TIP: Price for profitability, not popularity
// - Free tier: Keep it generous enough to hook users, limited enough to upsell
// - Paid tiers: Price based on value delivered, not your costs
// - Annual discount: Offer 2+ months free (e.g., $20/mo = $200/year instead of $240)
// Note: The gap between price and value is your opportunity
//
// YC WISDOM: Most startups undercharge (it's the #1 pricing mistake)
// - Early adopters care about benefits, not price - they'll pay premium for value
// - Your value should be 10x your price (charge $20 → deliver $200 value)
// - Raise prices by 5% until you lose 20% of deals - that's the sweet spot
// - Avoid SMB "danger zone" ($2k-$10k/year) - too expensive for self-serve, too cheap for sales team
//
// PRICING MODELS:
// - Tiered (like this): Best for feature differentiation and upselling
// - Usage-based: Best when tied to customer success metrics (transactions, API calls)
// - User-based: Best for team collaboration tools (Slack, Google Workspace)
//
// SaaS METRICS TO TRACK:
// - MRR/ARR: Monthly/Annual Recurring Revenue (primary metric)
// - CAC: Customer Acquisition Cost (keep below 1/3 of LTV)
// - Net Revenue Retention: Should be >100% (expansion revenue from existing customers)
// - Growth Rate: Measure weekly early on, then monthly

export const pricingTiers: PricingTier[] = [
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
      monthly: "$20",
      yearly: "$200", // 2 months free
    },
    description:
      "Add your premium features here. This is where you showcase what makes the upgrade worth it.",
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

export const pricingConfig = {
  title: "Pricing",
  subtitle: "The gap between price and value is your opportunity",
  frequencies: ["monthly", "yearly"],
};
