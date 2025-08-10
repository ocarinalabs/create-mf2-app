import { Agent, createThread, saveMessage, storeFile } from "@convex-dev/agent";
import { components, internal } from "../_generated/api";
import { chat, textEmbedding } from "../models";
import { action, internalAction, mutation } from "../_generated/server";
import { v } from "convex/values";
import { getFile } from "@convex-dev/agent";
import { getAuthUserId } from "../utils";
import { usageHandler } from "../usage_tracking/usageHandler";

export const fileAgent = new Agent(components.agent, {
  name: "File Reviewer Agent",
  chat: chat,
  instructions: "You are an expert in reviewing and analyzing files & images.",
  textEmbedding,
  usageHandler,
});

export const uploadFile = action({
  args: {
    filename: v.string(),
    mimeType: v.string(),
    bytes: v.bytes(),
    sha256: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const {
      file: { fileId, url },
    } = await storeFile(
      ctx,
      components.agent,
      new Blob([args.bytes], { type: args.mimeType }),
      args.filename,
      args.sha256
    );
    return { fileId, url };
  },
});

export const submitFileQuestion = mutation({
  args: {
    fileId: v.string(),
    question: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const threadId = await createThread(ctx, components.agent, { userId });
    const { filePart, imagePart } = await getFile(
      ctx,
      components.agent,
      args.fileId
    );
    const { messageId } = await saveMessage(ctx, components.agent, {
      threadId,
      message: {
        role: "user",
        content: [imagePart ?? filePart, { type: "text", text: args.question }],
      },
      metadata: { fileIds: [args.fileId] },
    });
    await ctx.scheduler.runAfter(0, internal.files.addFile.generateResponse, {
      threadId,
      promptMessageId: messageId,
    });
    return { threadId };
  },
});

export const generateResponse = internalAction({
  args: { threadId: v.string(), promptMessageId: v.string() },
  handler: async (ctx, { threadId, promptMessageId }) => {
    const { thread } = await fileAgent.continueThread(ctx, { threadId });
    await thread.generateText({
      promptMessageId,
    });
  },
});
