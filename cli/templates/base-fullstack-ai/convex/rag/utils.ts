// See the docs at https://docs.convex.dev/agents/rag
import {
  getThreadMetadata,
  listMessages,
  syncStreams,
  vStreamArgs,
} from "@convex-dev/agent";
import { vEntryId, vSearchEntry, vSearchResult } from "@convex-dev/rag";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { internalMutation, query } from "../_generated/server";
import { getAuthUserId } from "../utils";
import { rag } from "./ragAsPrompt";
import { components } from "../_generated/api";

/**
 * Lists messages for a thread including the context used to generate them,
 * based on context saved when using RAG.
 */
export const listMessagesWithContext = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    streamArgs: vStreamArgs,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    const threadMetadata = await getThreadMetadata(ctx, components.agent, {
      threadId: args.threadId,
    });
    if (threadMetadata.userId && threadMetadata.userId !== userId) {
      throw new Error("You are not authorized to access this thread");
    }

    const results = await listMessages(ctx, components.agent, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });
    const streams = await syncStreams(ctx, components.agent, {
      threadId: args.threadId,
      streamArgs: args.streamArgs,
    });
    return {
      streams,
      ...results,
      page: await Promise.all(
        results.page.map(async (message) => ({
          ...message,
          contextUsed: await ctx.db
            .query("contextUsed")
            .withIndex("messageId", (q) => q.eq("messageId", message._id))
            .first(),
        })),
      ),
    };
  },
});

export const listEntries = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const namespace = await rag.getNamespace(ctx, {
      namespace: "global",
    });
    if (!namespace) {
      return { page: [], isDone: true, continueCursor: "" };
    }
    const results = await rag.list(ctx, {
      namespaceId: namespace.namespaceId,
      paginationOpts: args.paginationOpts,
    });
    return results;
  },
});

export const listChunks = query({
  args: {
    entryId: vEntryId,
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const paginatedChunks = await rag.listChunks(ctx, {
      entryId: args.entryId,
      paginationOpts: args.paginationOpts,
    });
    return paginatedChunks;
  },
});

export const recordContextUsed = internalMutation({
  args: {
    messageId: v.string(),
    entries: v.array(vSearchEntry),
    results: v.array(vSearchResult),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contextUsed", args);
  },
});
