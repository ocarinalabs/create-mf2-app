import {
  saveMessage,
  listMessages,
  syncStreams,
  vStreamArgs,
} from "@convex-dev/agent";
import {
  action,
  internalAction,
  internalMutation,
  mutation,
  query,
} from "../_generated/server";
import { v } from "convex/values";
import { components } from "../_generated/api";
import { paginationOptsValidator } from "convex/server";
import { authorizeThreadAccess } from "../threads";
import { z } from "zod";
import { tool } from "ai";
import { agent } from "../agents/simple";

export const sendMessageFromHumanAgent = internalMutation({
  args: { agentName: v.string(), message: v.string(), threadId: v.string() },
  handler: async (ctx, args) => {
    const { messageId } = await saveMessage(ctx, components.agent, {
      threadId: args.threadId,
      agentName: args.agentName,
      message: {
        role: "assistant",
        content: args.message,
      },
    });
    return messageId;
  },
});

export const sendMessageFromUser = mutation({
  args: { message: v.string(), threadId: v.string() },
  handler: async (ctx, args) => {
    await authorizeThreadAccess(ctx, args.threadId);
    await saveMessage(ctx, components.agent, {
      threadId: args.threadId,
      prompt: args.message,
    });
  },
});

export const askHuman = tool({
  description: "Ask a human a question",
  parameters: z.object({
    question: z.string().describe("The question to ask the human"),
  }),
});

export const ask = action({
  args: { question: v.string(), threadId: v.string() },
  handler: async (ctx, { question, threadId }) => {
    const result = await agent.generateText(
      ctx,
      { threadId },
      {
        prompt: question,
        tools: { askHuman },
      }
    );
    const supportRequests = result.toolCalls
      .filter((tc) => tc.toolName === "askHuman")
      .map(({ toolCallId, args: { question } }) => ({
        toolCallId,
        question,
      }));
    if (supportRequests.length > 0) {
    }
    return {
      response: result.text,
      supportRequests,
      messageId: result.messageId,
    };
  },
});

export const humanResponseAsToolCall = internalAction({
  args: {
    humanName: v.string(),
    response: v.string(),
    toolCallId: v.string(),
    threadId: v.string(),
    messageId: v.string(),
  },
  handler: async (ctx, args) => {
    await agent.saveMessage(ctx, {
      threadId: args.threadId,
      message: {
        role: "tool",
        content: [
          {
            type: "tool-result",
            result: args.response,
            toolCallId: args.toolCallId,
            toolName: "askHuman",
          },
        ],
      },
      metadata: {
        provider: "human",
        providerMetadata: {
          human: { name: args.humanName },
        },
      },
    });
    await agent.generateText(
      ctx,
      { threadId: args.threadId },
      { promptMessageId: args.messageId }
    );
  },
});

export const getMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    streamArgs: vStreamArgs,
  },
  handler: async (ctx, args) => {
    const messages = await listMessages(ctx, components.agent, {
      threadId: args.threadId,
      paginationOpts: args.paginationOpts,
    });
    const streams = await syncStreams(ctx, components.agent, {
      threadId: args.threadId,
      streamArgs: args.streamArgs,
    });
    return { ...messages, streams };
  },
});
