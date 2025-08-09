import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import ragTables from "./rag/tables";
import usageTables from "./usage_tracking/tables";

export default defineSchema({
  users: defineTable({
    // this is UserJSON from @clerk/backend
    clerkUser: v.any(),
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

  ...ragTables,
  ...usageTables,
});
