import { v } from "convex/values";
import { mutation, query, internalAction } from "../_generated/server";
import { components, internal } from "../_generated/api";
import { vStreamArgs } from "@convex-dev/agent";
import { supportAgent } from "./agents/support";
import { assistantAgent } from "./agents/assistant";
import { verifyThreadAccess } from "./threads";
import { aiRateLimiter, canSendMessage, checkTokenAllowance, consumeTokens } from "./rateLimiting";

// Send a message to an AI agent
export const sendMessage = mutation({
  args: {
    threadId: v.string(),
    prompt: v.string(),
  },
  handler: async (ctx, { threadId, prompt }) => {
    const userId = await verifyThreadAccess(ctx, threadId);
    
    // Check rate limits
    const canSend = await canSendMessage(ctx, userId);
    if (!canSend.allowed) {
      throw new Error(`Rate limit exceeded. Try again in ${Math.ceil((canSend.retryAfter || 60000) / 1000)} seconds`);
    }
    
    // Get thread metadata to determine agent type
    const thread = await ctx.runQuery(
      components.agent.threads.getThread,
      { threadId }
    );
    
    const agentType = thread?.metadata?.agentType || "assistant";
    const agent = agentType === "support" ? supportAgent : assistantAgent;
    
    // Save the message and schedule generation
    const { messageId } = await agent.saveMessage(ctx, {
      threadId,
      prompt,
      skipEmbeddings: true, // Generate embeddings in action
    });
    
    // Schedule async generation
    await ctx.scheduler.runAfter(0, internal.ai.chat.generateResponse, {
      threadId,
      promptMessageId: messageId,
      userId,
      agentType,
    });
    
    return { messageId };
  },
});

// Internal action to generate response
export const generateResponse = internalAction({
  args: {
    threadId: v.string(),
    promptMessageId: v.string(),
    userId: v.string(),
    agentType: v.union(v.literal("support"), v.literal("assistant")),
  },
  handler: async (ctx, { threadId, promptMessageId, userId, agentType }) => {
    const agent = agentType === "support" ? supportAgent : assistantAgent;
    
    // Estimate tokens (rough approximation)
    const estimatedTokens = 1000; // TODO: Better estimation based on context
    
    // Check token allowance
    const tokenCheck = await checkTokenAllowance(ctx, userId, estimatedTokens);
    if (!tokenCheck.allowed) {
      // Save error message instead of throwing
      await agent.saveMessage(ctx, {
        threadId,
        message: {
          role: "assistant",
          content: `I'm unable to respond right now due to usage limits. Please try again later.`,
        },
        metadata: {
          error: "Rate limit exceeded",
          retryAfter: tokenCheck.retryAfter,
        },
      });
      return;
    }
    
    try {
      // Generate response with streaming
      const { thread } = await agent.continueThread(ctx, { threadId });
      const result = await thread.streamText(
        { promptMessageId },
        { 
          saveStreamDeltas: true,
          maxSteps: 3,
        }
      );
      
      // Consume the stream
      await result.consumeStream();
      
      // Get actual token usage from result
      const usage = await result.usage;
      if (usage?.totalTokens) {
        await consumeTokens(ctx, userId, usage.totalTokens);
      }
      
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Save error message
      await agent.saveMessage(ctx, {
        threadId,
        message: {
          role: "assistant",
          content: "I encountered an error while generating a response. Please try again.",
        },
        metadata: {
          error: error instanceof Error ? error.message : "Unknown error",
        },
      });
    }
  },
});

// Query messages with streaming support
export const listMessages = query({
  args: {
    threadId: v.string(),
    paginationOpts: v.object({
      cursor: v.union(v.string(), v.null()),
      numItems: v.number(),
    }),
    streamArgs: vStreamArgs,
  },
  handler: async (ctx, { threadId, paginationOpts, streamArgs }) => {
    await verifyThreadAccess(ctx, threadId);
    
    // Get thread metadata to determine agent
    const thread = await ctx.runQuery(
      components.agent.threads.getThread,
      { threadId }
    );
    
    const agentType = thread?.metadata?.agentType || "assistant";
    const agent = agentType === "support" ? supportAgent : assistantAgent;
    
    // Get streaming updates
    const streams = await agent.syncStreams(ctx, {
      threadId,
      streamArgs,
      includeStatuses: ["aborted", "streaming"],
    });
    
    // Get messages
    const paginated = await agent.listMessages(ctx, {
      threadId,
      paginationOpts,
    });
    
    return {
      ...paginated,
      streams,
    };
  },
});

// Get rate limit status for UI
export const getRateLimitStatus = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) return null;
    
    const messageStatus = await ctx.runQuery(
      aiRateLimiter.getRateStatus,
      {
        name: "sendMessage",
        key: user._id,
      }
    );
    
    const tokenStatus = await ctx.runQuery(
      aiRateLimiter.getRateStatus,
      {
        name: "tokenUsagePerUser",
        key: user._id,
      }
    );
    
    return {
      messages: messageStatus,
      tokens: tokenStatus,
    };
  },
});