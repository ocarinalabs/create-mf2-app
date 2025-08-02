import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { components } from "../_generated/api";
import { supportAgent } from "./agents/support";
import { assistantAgent } from "./agents/assistant";

// Create a new thread
export const createThread = mutation({
  args: {
    title: v.optional(v.string()),
    agentType: v.optional(v.union(v.literal("support"), v.literal("assistant"))),
  },
  handler: async (ctx, { title, agentType = "assistant" }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    const agent = agentType === "support" ? supportAgent : assistantAgent;
    
    const { threadId } = await agent.createThread(ctx, {
      userId: user._id,
      title: title || `New ${agentType} conversation`,
      metadata: {
        agentType,
        createdAt: Date.now(),
      },
    });
    
    return threadId;
  },
});

// List user's threads
export const listThreads = query({
  args: {
    paginationOpts: v.optional(
      v.object({
        cursor: v.union(v.string(), v.null()),
        numItems: v.number(),
      })
    ),
  },
  handler: async (ctx, { paginationOpts }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { page: [], continueCursor: null, isDone: true };
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) return { page: [], continueCursor: null, isDone: true };
    
    return await ctx.runQuery(
      components.agent.threads.listThreadsByUserId,
      {
        userId: user._id,
        paginationOpts: paginationOpts || { cursor: null, numItems: 10 },
      }
    );
  },
});

// Delete a thread
export const deleteThread = mutation({
  args: { threadId: v.string() },
  handler: async (ctx, { threadId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Verify thread ownership
    const thread = await ctx.runQuery(
      components.agent.threads.getThread,
      { threadId }
    );
    
    if (thread?.userId !== user._id) {
      throw new Error("Not authorized to delete this thread");
    }
    
    // Delete the thread
    await assistantAgent.deleteThreadAsync(ctx, { threadId });
  },
});

// Helper to verify thread access
export async function verifyThreadAccess(
  ctx: any,
  threadId: string
): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
    .unique();
  
  if (!user) throw new Error("User not found");
  
  const thread = await ctx.runQuery(
    components.agent.threads.getThread,
    { threadId }
  );
  
  if (!thread) throw new Error("Thread not found");
  if (thread.userId !== user._id) throw new Error("Not authorized");
  
  return user._id;
}