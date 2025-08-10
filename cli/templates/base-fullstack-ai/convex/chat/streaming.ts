import { paginationOptsValidator } from "convex/server";
import { vStreamArgs } from "@convex-dev/agent";
import { internal } from "../_generated/api";
import {
  action,
  httpAction,
  internalAction,
  mutation,
  query,
} from "../_generated/server";
import { v } from "convex/values";
import { authorizeThreadAccess } from "../threads";
import { storyAgent } from "../agents/story";

export const streamOneShot = action({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }) => {
    await authorizeThreadAccess(ctx, threadId);
    const { thread } = await storyAgent.continueThread(ctx, { threadId });
    const result = await thread.streamText(
      { prompt },
      { saveStreamDeltas: true }
    );
    await result.consumeStream();
  },
});

export const initiateAsyncStreaming = mutation({
  args: { prompt: v.string(), threadId: v.string() },
  handler: async (ctx, { prompt, threadId }) => {
    await authorizeThreadAccess(ctx, threadId);
    const { messageId } = await storyAgent.saveMessage(ctx, {
      threadId,
      prompt,
      skipEmbeddings: true,
    });
    await ctx.scheduler.runAfter(0, internal.chat.streaming.streamAsync, {
      threadId,
      promptMessageId: messageId,
    });
  },
});

export const streamAsync = internalAction({
  args: { promptMessageId: v.string(), threadId: v.string() },
  handler: async (ctx, { promptMessageId, threadId }) => {
    const { thread } = await storyAgent.continueThread(ctx, { threadId });
    const result = await thread.streamText(
      { promptMessageId },
      { saveStreamDeltas: { chunking: "word", throttleMs: 100 } }
    );
    await result.consumeStream();
  },
});

export const listMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    streamArgs: vStreamArgs,
  },
  handler: async (ctx, args) => {
    const { threadId, paginationOpts, streamArgs } = args;
    await authorizeThreadAccess(ctx, threadId);
    const streams = await storyAgent.syncStreams(ctx, {
      threadId,
      streamArgs,
      includeStatuses: ["aborted", "streaming"],
    });

    const paginated = await storyAgent.listMessages(ctx, {
      threadId,
      paginationOpts,
    });

    return {
      ...paginated,
      streams,
    };
  },
});

export const streamTextWithoutSavingDeltas = action({
  args: { prompt: v.string() },
  handler: async (ctx, { prompt }) => {
    const { threadId, thread } = await storyAgent.createThread(ctx, {});
    const result = await thread.streamText({ prompt });
    for await (const chunk of result.textStream) {
      console.log(chunk);
    }
    return {
      threadId,
      text: await result.text,
      toolCalls: await result.toolCalls,
      toolResults: await result.toolResults,
    };
  },
});

export const streamOverHttp = httpAction(async (ctx, request) => {
  const { threadId, prompt } = (await request.json()) as {
    threadId?: string;
    prompt: string;
  };
  const { thread } = threadId
    ? await storyAgent.continueThread(ctx, { threadId })
    : await storyAgent.createThread(ctx, {});
  const result = await thread.streamText({ prompt });
  const response = result.toTextStreamResponse();
  response.headers.set("X-Message-Id", result.messageId);
  return response;
});

export const streamStoryInternalAction = storyAgent.asTextAction({
  stream: true,
});

export const listStreamingMessages = query({
  args: { threadId: v.string(), streamArgs: vStreamArgs },
  handler: async (ctx, { threadId, streamArgs }) => {
    await authorizeThreadAccess(ctx, threadId);
    const streams = await storyAgent.syncStreams(ctx, { threadId, streamArgs });
    return { streams };
  },
});
