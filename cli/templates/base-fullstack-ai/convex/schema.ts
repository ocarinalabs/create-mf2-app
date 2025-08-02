import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { vProviderMetadata, vUsage } from "@convex-dev/agent";

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    user: v.id("users"),
  }),
  users: defineTable({
    // this is UserJSON from @clerk/backend
    clerkUser: v.any(),
    color: v.string(),
  }).index("by_clerk_id", ["clerkUser.id"]),
  waitlist: defineTable({
    email: v.string(),
    createdAt: v.number(),
    notified: v.boolean(),
    metadata: v.optional(
      v.object({
        source: v.optional(v.string()),
        referrer: v.optional(v.string()),
      })
    ),
  })
    .index("by_email", ["email"])
    .index("by_created", ["createdAt"])
    .index("by_notified", ["notified", "createdAt"]),
  
  // AI usage tracking
  aiUsage: defineTable({
    userId: v.string(),
    agentName: v.optional(v.string()),
    model: v.string(),
    provider: v.string(),
    usage: vUsage,
    providerMetadata: v.optional(vProviderMetadata),
    billingPeriod: v.string(), // YYYY-MM-01
    timestamp: v.number(),
  })
    .index("by_billingPeriod_userId", ["billingPeriod", "userId"])
    .index("by_userId", ["userId"])
    .index("by_timestamp", ["timestamp"]),
});
