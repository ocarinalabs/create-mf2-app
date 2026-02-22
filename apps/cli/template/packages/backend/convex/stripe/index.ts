import { StripeSubscriptions } from "@convex-dev/stripe";
import { v } from "convex/values";
import { components } from "../_generated/api";
import { action, query } from "../_generated/server";

const stripeClient = new StripeSubscriptions(components.stripe, {});

function getAppUrl(): string {
  const url = process.env.SITE_URL;
  if (!url) {
    throw new Error("SITE_URL environment variable is not set");
  }
  return url;
}

const subscriptionValidator = v.object({
  stripeSubscriptionId: v.string(),
  stripeCustomerId: v.string(),
  status: v.string(),
  priceId: v.string(),
  quantity: v.optional(v.number()),
  currentPeriodEnd: v.number(),
  cancelAtPeriodEnd: v.boolean(),
  metadata: v.optional(v.any()),
  userId: v.optional(v.string()),
  orgId: v.optional(v.string()),
});

const paymentValidator = v.object({
  stripePaymentIntentId: v.string(),
  stripeCustomerId: v.optional(v.string()),
  amount: v.number(),
  currency: v.string(),
  status: v.string(),
  created: v.number(),
  metadata: v.optional(v.any()),
  userId: v.optional(v.string()),
  orgId: v.optional(v.string()),
});

export const createSubscriptionCheckout = action({
  args: {
    priceId: v.string(),
    quantity: v.optional(v.number()),
  },
  returns: v.object({
    sessionId: v.string(),
    url: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const customer = await stripeClient.getOrCreateCustomer(ctx, {
      userId: identity.subject,
      email: identity.email,
      name: identity.name,
    });

    return stripeClient.createCheckoutSession(ctx, {
      priceId: args.priceId,
      customerId: customer.customerId,
      mode: "subscription",
      quantity: args.quantity,
      successUrl: `${getAppUrl()}/settings/billing?success=true`,
      cancelUrl: `${getAppUrl()}/settings/billing?canceled=true`,
      metadata: { userId: identity.subject, productType: "subscription" },
      subscriptionMetadata: { userId: identity.subject },
    });
  },
});

export const createPaymentCheckout = action({
  args: { priceId: v.string() },
  returns: v.object({
    sessionId: v.string(),
    url: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const customer = await stripeClient.getOrCreateCustomer(ctx, {
      userId: identity.subject,
      email: identity.email,
      name: identity.name,
    });

    return stripeClient.createCheckoutSession(ctx, {
      priceId: args.priceId,
      customerId: customer.customerId,
      mode: "payment",
      successUrl: `${getAppUrl()}/settings/billing?success=true`,
      cancelUrl: `${getAppUrl()}/settings/billing?canceled=true`,
      metadata: { userId: identity.subject, productType: "payment" },
      paymentIntentMetadata: { userId: identity.subject },
    });
  },
});

export const createCustomerPortal = action({
  args: {},
  returns: v.object({ url: v.string() }),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const customer = await stripeClient.getOrCreateCustomer(ctx, {
      userId: identity.subject,
      email: identity.email,
      name: identity.name,
    });

    return stripeClient.createCustomerPortalSession(ctx, {
      customerId: customer.customerId,
      returnUrl: `${getAppUrl()}/settings/billing`,
    });
  },
});

export const cancelSubscription = action({
  args: {
    subscriptionId: v.string(),
    immediately: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const subscription = await ctx.runQuery(
      components.stripe.public.getSubscription,
      { stripeSubscriptionId: args.subscriptionId }
    );
    if (!subscription || subscription.userId !== identity.subject) {
      throw new Error("Subscription not found or access denied");
    }

    await stripeClient.cancelSubscription(ctx, {
      stripeSubscriptionId: args.subscriptionId,
      cancelAtPeriodEnd: !args.immediately,
    });
    return null;
  },
});

export const getUserSubscriptions = query({
  args: {},
  returns: v.array(subscriptionValidator),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return ctx.runQuery(components.stripe.public.listSubscriptionsByUserId, {
      userId: identity.subject,
    });
  },
});

export const getUserPayments = query({
  args: {},
  returns: v.array(paymentValidator),
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return ctx.runQuery(components.stripe.public.listPaymentsByUserId, {
      userId: identity.subject,
    });
  },
});
