import { defineTable } from "convex/server";
import { v } from "convex/values";

export const authTables = {
  users: defineTable({
    clerkUser: v.any(),
  }).index("by_clerk_id", ["clerkUser.id"]),
};
