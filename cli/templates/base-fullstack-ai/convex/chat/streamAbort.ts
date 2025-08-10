import { v } from "convex/values";
import { components } from "../_generated/api";
import {
  query,
  action,
  mutation,
  internalMutation,
} from "../_generated/server";
import { abortStream, listStreams } from "@convex-dev/agent";
import { agent } from "../agents/simple";
import { smoothStream } from "ai";
import { authorizeThreadAccess } from "../threads";

export const abortStreamByOrder = mutation({
  args: { threadId: v.string(), order: v.number() },
  handler: async (ctx, { threadId, order }) => {
    await authorizeThreadAccess(ctx, threadId);
    if (
      await abortStream(ctx, components.agent, {
        threadId,
        order,
        reason: "Aborting explicitly",
      })
    ) {
      console.log("Aborted stream", threadId, order);
    } else {
      console.log("No stream found", threadId, order);
    }
  },
});

export const streamThenAbortAsync = action({
  args: {},
  handler: async (ctx) => {
    const { thread, threadId } = await agent.createThread(ctx, {
      title: "Thread with aborted message",
    });
    const result = await thread.streamText(
      {
        prompt: "Write an essay on the importance of effusive dialogue",
        experimental_transform: smoothStream({ chunking: "line" }),
        onError: (error) => {
          console.error(error);
        },
      },
      { saveStreamDeltas: { chunking: "line" } }
    );
    let canceled = false;
    try {
      for await (const chunk of result.textStream) {
        console.log(chunk);
        if (!canceled) {
          await abortStream(ctx, components.agent, {
            threadId,
            order: result.order,
            reason: "Aborting explicitly",
          });
          canceled = true;
        }
      }
    } catch (error) {
      console.warn("Catching what should be an AbortError", error);
    }
  },
});

export const list = query({
  args: { threadId: v.string() },
  handler: async (ctx, { threadId }) => {
    return listStreams(ctx, components.agent, { threadId });
  },
});

export const abortStreamByStreamId = internalMutation({
  args: { threadId: v.string() },
  handler: async (ctx, { threadId }) => {
    const streams = await listStreams(ctx, components.agent, { threadId });
    for (const stream of streams) {
      console.log("Aborting stream", stream);
      await abortStream(ctx, components.agent, {
        reason: "Aborting via async call",
        streamId: stream.streamId,
      });
    }
    if (!streams.length) {
      console.log("No streams found");
    }
  },
});

export const streamThenUseAbortSignal = action({
  args: {},
  handler: async (ctx) => {
    const { thread } = await agent.createThread(ctx, {
      title: "Thread using abortSignal",
    });
    const abortController = new AbortController();
    const result = await thread.streamText(
      {
        prompt: "Write an essay on the importance of effusive dialogue",
        abortSignal: abortController.signal,
        experimental_transform: smoothStream({ chunking: "line" }),
      },
      { saveStreamDeltas: { chunking: "line" } }
    );
    setTimeout(() => {
      abortController.abort();
    }, 1000);
    try {
      for await (const chunk of result.textStream) {
        console.log(chunk);
      }
    } catch (error) {
      console.warn("Catching what should be an AbortError", error);
    }
    await result.consumeStream();
  },
});
