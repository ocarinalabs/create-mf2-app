import { defineTable } from "convex/server";
import { v } from "convex/values";

export const waitlistTables = {
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
};
