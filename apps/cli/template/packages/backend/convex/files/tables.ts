import { defineTable } from "convex/server";
import { v } from "convex/values";

export const filesTables = {
  files: defineTable({
    storageId: v.id("_storage"),
    userId: v.id("users"),
    filename: v.optional(v.string()),
    contentType: v.optional(v.string()),
  })
    .index("by_storageId", ["storageId"])
    .index("by_userId", ["userId"]),
};
