import { components, internal } from "../_generated/api";
import { action, internalAction, mutation, query } from "../_generated/server";
import { saveMessage } from "@convex-dev/agent";
import { v } from "convex/values";
import { agent } from "../agents/simple";
import { authorizeThreadAccess } from "../threads";
import { paginationOptsValidator } from "convex/server";

export const generateTextInAnAction = action({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }) => {
    await authorizeThreadAccess(ctx, threadId);
    const result = await agent.generateText(ctx, { threadId }, { prompt });
    return result.text;
  },
});

export const sendMessage = mutation({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }) => {
    await authorizeThreadAccess(ctx, threadId);
    const { messageId } = await saveMessage(ctx, components.agent, {
      threadId,
      prompt,
    });
    await ctx.scheduler.runAfter(0, internal.chat.basic.generateResponse, {
      threadId,
      promptMessageId: messageId,
    });
  },
});

export const generateResponse = internalAction({
  args: { promptMessageId: v.string(), threadId: v.string() },
  handler: async (ctx, { promptMessageId, threadId }) => {
    await agent.generateText(ctx, { threadId }, { promptMessageId });
  },
});

export const listMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { threadId, paginationOpts } = args;
    await authorizeThreadAccess(ctx, threadId);
    const messages = await agent.listMessages(ctx, {
      threadId,
      paginationOpts,
    });
    return messages;
  },
});
