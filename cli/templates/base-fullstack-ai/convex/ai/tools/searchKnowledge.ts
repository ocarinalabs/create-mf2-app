"use node";

import { createTool } from "@convex-dev/agent";
import { z } from "zod";
import { rag } from "../knowledge";

// Tool for agents to search the knowledge base
export const searchKnowledgeTool = createTool({
  description: "Search the knowledge base for relevant information",
  args: z.object({
    query: z.string().describe("The search query"),
    limit: z.number().optional().default(5).describe("Maximum number of results"),
  }),
  handler: async (ctx, { query, limit }) => {
    try {
      const results = await rag.search(ctx, {
        namespace: ctx.userId,
        query,
        limit,
      });
      
      if (results.entries.length === 0) {
        return "No relevant information found in the knowledge base.";
      }
      
      return `Found ${results.entries.length} relevant documents:\n\n${results.text}`;
    } catch (error) {
      console.error("Knowledge search error:", error);
      return "Unable to search the knowledge base at this time.";
    }
  },
});