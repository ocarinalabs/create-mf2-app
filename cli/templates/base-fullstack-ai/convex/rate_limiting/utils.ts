import { v } from "convex/values";
import { getAuthUserId, getAuthUserIdAsString } from "../utils";
import { query, QueryCtx } from "../_generated/server";
import { fetchContextMessages } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { rateLimiter } from "./rateLimiting";
import { DataModel } from "../_generated/dataModel";

export const { getRateLimit, getServerTime } = rateLimiter.hookAPI<DataModel>(
  "sendMessage",
  { key: async (ctx) => (await getAuthUserIdAsString(ctx)) ?? "anonymous" }
);

export const getPreviousUsage = query({
  args: { threadId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return estimateTokens(ctx, args.threadId, "");
  },
});

export async function estimateTokens(
  ctx: QueryCtx,
  threadId: string | undefined,
  question: string
) {
  const promptTokens = question.length / 4;
  const estimatedOutputTokens = promptTokens * 3 + 1;
  const latestMessages = await fetchContextMessages(ctx, components.agent, {
    threadId,
    userId: await getAuthUserIdAsString(ctx),
    messages: [{ role: "user" as const, content: question }],
    contextOptions: { recentMessages: 2 },
  });
  const lastUsageMessage = latestMessages
    .reverse()
    .find((message) => message.usage);
  const lastPromptTokens = lastUsageMessage?.usage?.totalTokens ?? 1;
  return lastPromptTokens + promptTokens + estimatedOutputTokens;
}
