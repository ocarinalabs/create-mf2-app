import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
});
