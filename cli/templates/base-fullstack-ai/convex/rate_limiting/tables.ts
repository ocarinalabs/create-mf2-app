import { defineTable } from "convex/server";
import { v } from "convex/values";

export default {
  usage: defineTable({
    userId: v.string(),
    totalTokens: v.number(),
  }).index("by_user", ["userId"]),
};
