import { vProviderMetadata, vUsage } from "@convex-dev/agent";
import { defineTable } from "convex/server";
import { v } from "convex/values";

export default {
  rawUsage: defineTable({
    userId: v.string(),
    agentName: v.optional(v.string()),
    model: v.string(),
    provider: v.string(),

    usage: vUsage,
    providerMetadata: v.optional(vProviderMetadata),

    billingPeriod: v.string(),
  }).index("billingPeriod_userId", ["billingPeriod", "userId"]),

  invoices: defineTable({
    userId: v.string(),
    billingPeriod: v.string(),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed")
    ),
  }).index("billingPeriod_userId", ["billingPeriod", "userId"]),
};
