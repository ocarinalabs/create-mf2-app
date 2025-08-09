// See the docs at https://docs.convex.dev/agents/rag
import { openai } from "@ai-sdk/openai";
import { createTool } from "@convex-dev/agent";
import { RAG } from "@convex-dev/rag";
import { v } from "convex/values";
import { z } from "zod";
import { components, internal } from "../_generated/api";
import { action } from "../_generated/server";
import { agent } from "../agents/simple";
import { getAuthUserIdAsString } from "../utils";

const rag = new RAG(components.rag, {
  textEmbeddingModel: openai.embedding("text-embedding-3-small"),
  embeddingDimension: 1536,
});

export const sendMessage = action({
  args: { threadId: v.string(), prompt: v.string() },
  handler: async (ctx, { threadId, prompt }) => {
    const userId = await getAuthUserIdAsString(ctx);
    const { thread } = await agent.continueThread(ctx, { threadId });
    const { messageId } = await thread.generateText({
      prompt,
      tools: {
        addContext: createTool({
          description: "Store information to search later via RAG",
          args: z.object({
            title: z.string().describe("The title of the context"),
            text: z.string().describe("The text body of the context"),
          }),
          handler: async (ctx, args) => {
            await rag.add(ctx, {
              namespace: userId ?? "",  // Provide empty string as fallback
              title: args.title,
              text: args.text,
            });
          },
        }),
        searchContext: createTool({
          description: "Search for context related to this user prompt",
          args: z.object({
            query: z
              .string()
              .describe("Describe the context you're looking for"),
          }),
          handler: async (ctx, args) => {
            const context = await rag.search(ctx, {
              namespace: userId ?? "",  // Provide empty string as fallback
              query: args.query,
              limit: 5,
            });
            // To show the context in the demo UI, we record the context used
            await ctx.runMutation(internal.rag.utils.recordContextUsed, {
              messageId,
              entries: context.entries,
              results: context.results,
            });
            return (
              `Found results in ${context.entries
                .map((e) => e.title || null)
                .filter((t) => t !== null)
                .join(", ")}` + `Here is the context:\n\n ${context.text}`
            );
          },
        }),
      },
    });
  },
});
