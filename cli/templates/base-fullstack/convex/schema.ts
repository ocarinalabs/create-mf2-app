import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { waitlistTables } from "./waitlist/tables";

export default defineSchema({
  users: defineTable({
    clerkUser: v.any(),
  }).index("by_clerk_id", ["clerkUser.id"]),
  ...waitlistTables,
});
