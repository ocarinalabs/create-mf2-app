import { defineTable } from "convex/server";
import { v } from "convex/values";

export const textPart = v.object({
  type: v.literal("text"),
  text: v.string(),
});

export const reasoningPart = v.object({
  type: v.literal("reasoning"),
  text: v.string(),
  duration: v.optional(v.number()),
});

export const toolCallPart = v.object({
  type: v.literal("tool-call"),
  toolCallId: v.string(),
  toolName: v.string(),
  args: v.any(),
});

export const toolResultPart = v.object({
  type: v.literal("tool-result"),
  toolCallId: v.string(),
  toolName: v.string(),
  output: v.optional(v.any()),
  errorText: v.optional(v.string()),
});

export const messagePart = v.union(
  textPart,
  reasoningPart,
  toolCallPart,
  toolResultPart
);

export const chatTables = {
  threads: defineTable({
    userId: v.id("users"),
    title: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["userId"],
    }),

  messages: defineTable({
    threadId: v.id("threads"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    parts: v.optional(v.array(messagePart)),
    model: v.optional(v.string()),
  })
    .index("by_thread", ["threadId"])
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["threadId"],
    }),
};
