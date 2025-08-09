// See the docs at https://docs.convex.dev/agents/rag
import { vSearchEntry, vSearchResult } from "@convex-dev/rag";
import { defineTable } from "convex/server";
import { v } from "convex/values";

export default {
  // tables for the basic rag example
  contextUsed: defineTable({
    messageId: v.string(),
    entries: v.array(vSearchEntry),
    results: v.array(vSearchResult),
  }).index("messageId", ["messageId"]),
};
