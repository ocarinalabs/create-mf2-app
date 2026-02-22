"use node";

import { generateChatTitle } from "@repo/ai/prompts/title";
import { v } from "convex/values";
import { internal } from "../../_generated/api";
import { internalAction } from "../../_generated/server";

export const generateTitle = internalAction({
  args: { threadId: v.id("threads") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const messages = await ctx.runQuery(internal.chat.api.messages.getHistory, {
      threadId: args.threadId,
    });

    if (messages.length === 0) {
      return null;
    }

    const firstUserMessage = messages.find((m) => m.role === "user");
    if (!firstUserMessage) {
      return null;
    }

    const title = await generateChatTitle(firstUserMessage.content);

    await ctx.runMutation(internal.chat.api.threads.updateTitleInternal, {
      threadId: args.threadId,
      title,
    });

    return null;
  },
});
