import { defineTable } from "convex/server";
import { v } from "convex/values";

export const settingsTables = {
  userSettings: defineTable({
    userId: v.id("users"),
  }).index("by_user", ["userId"]),
};
