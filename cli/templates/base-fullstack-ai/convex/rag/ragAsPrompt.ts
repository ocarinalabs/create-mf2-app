import { RAG } from "@convex-dev/rag";
import { v } from "convex/values";
import { components, internal } from "../_generated/api";
import { action, internalAction, mutation } from "../_generated/server";
import { textEmbedding } from "../models";
import { agent } from "../agents/simple";
import { authorizeThreadAccess } from "../threads";

export const rag = new RAG(components.rag, {
  textEmbeddingModel: textEmbedding,
  embeddingDimension: 1536,
});

export const addContext = action({
  args: { title: v.string(), text: v.string() },
  handler: async (ctx, args) => {
    await rag.add(ctx, {
      namespace: "global",
      title: args.title,
      key: args.title,
      text: args.text,
    });
  },
});

export const answerQuestionViaRAG = internalAction({
  args: {
    threadId: v.string(),
    prompt: v.string(),
    promptMessageId: v.string(),
  },
  handler: async (ctx, { threadId, prompt: rawPrompt, promptMessageId }) => {
    const { thread } = await agent.continueThread(ctx, { threadId });

    const context = await rag.search(ctx, {
      namespace: "global",
      query: rawPrompt,
      limit: 2,
      chunkContext: { before: 1, after: 1 },
    });

    const prompt = `# Context:\n\n ${context.text}\n\n---\n\n# Question:\n\n"""${rawPrompt}\n"""`;
    const system =
      "Answer the user's question and explain what context you used to answer it.";

    const result = await thread.streamText(
      { prompt, promptMessageId, system },
      { saveStreamDeltas: true }
    );
    await ctx.runMutation(internal.rag.utils.recordContextUsed, {
      messageId: result.messageId,
      entries: context.entries,
      results: context.results,
    });
    await result.consumeStream();
  },
});

export const askQuestion = mutation({
  args: {
    threadId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { threadId, prompt }) => {
    await authorizeThreadAccess(ctx, threadId);
    const { messageId } = await agent.saveMessage(ctx, {
      threadId,
      prompt,
    });
    await ctx.scheduler.runAfter(
      0,
      internal.rag.ragAsPrompt.answerQuestionViaRAG,
      { threadId, prompt, promptMessageId: messageId }
    );
  },
});
