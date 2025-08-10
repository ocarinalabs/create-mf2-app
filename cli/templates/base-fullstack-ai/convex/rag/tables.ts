import { vSearchEntry, vSearchResult } from "@convex-dev/rag";
import { defineTable } from "convex/server";
import { v } from "convex/values";

export default {
  contextUsed: defineTable({
    messageId: v.string(),
    entries: v.array(vSearchEntry),
    results: v.array(vSearchResult),
  }).index("messageId", ["messageId"]),
};
