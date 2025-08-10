import { Agent, saveMessage, UsageHandler } from "@convex-dev/agent";
import { components, internal } from "../_generated/api";
import { chat, textEmbedding } from "../models";
import { internalAction, mutation } from "../_generated/server";
import { v } from "convex/values";
import { MINUTE, RateLimiter, SECOND } from "@convex-dev/rate-limiter";
import { usageHandler as normalUsageHandler } from "../usage_tracking/usageHandler";
import { getAuthUserId } from "../utils";
import { authorizeThreadAccess } from "../threads";
import { estimateTokens } from "./utils";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  sendMessage: {
    kind: "fixed window",
    period: 5 * SECOND,
    rate: 1,
    capacity: 2,
  },
  tokenUsagePerUser: {
    kind: "token bucket",
    period: MINUTE,
    rate: 2000,
    capacity: 10000,
  },
  globalSendMessage: { kind: "token bucket", period: MINUTE, rate: 1_000 },
  globalTokenUsage: { kind: "token bucket", period: MINUTE, rate: 100_000 },
});

export const rateLimitedUsageHandler: UsageHandler = async (ctx, args) => {
  if (!args.userId) {
    console.warn("No user ID found in usage handler");
    return;
  }
  await rateLimiter.limit(ctx, "tokenUsagePerUser", {
    key: args.userId,
    count: args.usage.totalTokens,
    reserve: true,
  });
  await rateLimiter.limit(ctx, "globalTokenUsage", {
    count: args.usage.totalTokens,
    reserve: true,
  });

  await normalUsageHandler(ctx, args);
};

export const rateLimitedAgent = new Agent(components.agent, {
  name: "Rate Limited Agent",
  chat: chat,
  usageHandler: rateLimitedUsageHandler,
  textEmbedding,
});

export const submitQuestion = mutation({
  args: {
    question: v.string(),
    threadId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await authorizeThreadAccess(ctx, args.threadId);

    await rateLimiter.limit(ctx, "sendMessage", { key: userId, throws: true });
    await rateLimiter.limit(ctx, "globalSendMessage", { throws: true });

    const count = await estimateTokens(ctx, args.threadId, args.question);
    await rateLimiter.check(ctx, "tokenUsagePerUser", {
      key: userId,
      count,
      reserve: true,
      throws: true,
    });
    await rateLimiter.check(ctx, "globalTokenUsage", {
      count,
      reserve: true,
      throws: true,
    });

    const { messageId } = await saveMessage(ctx, components.agent, {
      threadId: args.threadId,
      prompt: args.question,
    });
    await ctx.scheduler.runAfter(
      0,
      internal.rate_limiting.rateLimiting.generateResponse,
      { threadId: args.threadId, promptMessageId: messageId }
    );
  },
});

export const generateResponse = internalAction({
  args: { threadId: v.string(), promptMessageId: v.string() },
  handler: async (ctx, args) => {
    await rateLimitedAgent.generateText(
      ctx,
      { threadId: args.threadId },
      { promptMessageId: args.promptMessageId }
    );
  },
});
