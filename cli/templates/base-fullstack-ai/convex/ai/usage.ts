import { v } from "convex/values";
import { internalMutation, query } from "../_generated/server";
import { internal } from "../_generated/api";
import { vProviderMetadata, vUsage, type UsageHandler } from "@convex-dev/agent";

// Handler to track AI usage for billing
export const usageHandler: UsageHandler = async (ctx, args) => {
  const {
    userId,
    agentName,
    model,
    provider,
    usage,
    providerMetadata,
  } = args;

  if (!userId) {
    console.debug("Not tracking usage for anonymous user");
    return;
  }

  await ctx.runMutation(internal.ai.usage.insertUsage, {
    userId,
    agentName,
    model,
    provider,
    usage,
    providerMetadata,
  });
};

// Internal mutation to insert usage data
export const insertUsage = internalMutation({
  args: {
    userId: v.string(),
    agentName: v.optional(v.string()),
    model: v.string(),
    provider: v.string(),
    usage: vUsage,
    providerMetadata: v.optional(vProviderMetadata),
  },
  handler: async (ctx, args) => {
    const billingPeriod = getBillingPeriod(Date.now());
    
    return await ctx.db.insert("aiUsage", {
      ...args,
      billingPeriod,
      timestamp: Date.now(),
    });
  },
});

// Query to get usage for current billing period
export const getCurrentPeriodUsage = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const billingPeriod = getBillingPeriod(Date.now());
    
    const usage = await ctx.db
      .query("aiUsage")
      .withIndex("by_billingPeriod_userId", (q) =>
        q.eq("billingPeriod", billingPeriod).eq("userId", userId)
      )
      .collect();

    const totalTokens = usage.reduce(
      (sum, record) => sum + (record.usage.totalTokens || 0),
      0
    );

    const byModel = usage.reduce((acc, record) => {
      const key = `${record.provider}/${record.model}`;
      if (!acc[key]) {
        acc[key] = { tokens: 0, count: 0 };
      }
      acc[key].tokens += record.usage.totalTokens || 0;
      acc[key].count += 1;
      return acc;
    }, {} as Record<string, { tokens: number; count: number }>);

    return {
      billingPeriod,
      totalTokens,
      totalRequests: usage.length,
      byModel,
    };
  },
});

// Get billing period (first day of month)
function getBillingPeriod(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}-01`;
}

// Cost estimation (example rates, adjust based on actual pricing)
const COST_PER_1K_TOKENS: Record<string, number> = {
  "openai/gpt-4o": 0.005,
  "openai/gpt-4o-mini": 0.00015,
  "openai/gpt-4-turbo": 0.01,
  "openai/gpt-3.5-turbo": 0.0005,
};

export const estimateCost = (model: string, tokens: number): number => {
  const rate = COST_PER_1K_TOKENS[model] || 0.001;
  return (tokens / 1000) * rate;
};