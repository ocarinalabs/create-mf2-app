"use node";

import { v } from "convex/values";
import { mutation, query, action, internalAction } from "../_generated/server";
import { components, internal } from "../_generated/api";
import { RAG } from "@convex-dev/rag";
import { getTextEmbeddingModel, getEmbeddingDimension } from "./models";
import { aiRateLimiter } from "./rateLimiting";

// Initialize RAG with embedding model
const rag = new RAG(components.rag, {
  textEmbeddingModel: getTextEmbeddingModel(),
  embeddingDimension: getEmbeddingDimension(),
});

// Add document to knowledge base
export const addDocument = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, { title, content, category }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Check rate limit
    await aiRateLimiter.limit(ctx, "documentUpload", {
      key: user._id,
      throws: true,
    });
    
    // Schedule async processing
    await ctx.scheduler.runAfter(0, internal.ai.knowledge.processDocument, {
      userId: user._id,
      title,
      content,
      category,
    });
    
    return { success: true };
  },
});

// Internal action to process document
export const processDocument = internalAction({
  args: {
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, { userId, title, content, category }) => {
    try {
      // Add to RAG
      await rag.add(ctx, {
        namespace: userId,
        title,
        text: content,
        metadata: category ? { category } : undefined,
      });
    } catch (error) {
      console.error("Failed to process document:", error);
      throw error;
    }
  },
});

// Search knowledge base
export const search = action({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { query, limit = 5 }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Check rate limit
    await aiRateLimiter.limit(ctx, "ragSearch", {
      key: user._id,
      throws: true,
    });
    
    // Search in user's namespace
    const results = await rag.search(ctx, {
      namespace: user._id,
      query,
      limit,
    });
    
    return {
      results: results.results,
      entries: results.entries,
      text: results.text,
    };
  },
});

// List documents
export const listDocuments = query({
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
    
    return await rag.list(ctx, {
      namespace: user._id,
      paginationOpts: paginationOpts || { cursor: null, numItems: 10 },
    });
  },
});

// Delete document
export const deleteDocument = mutation({
  args: {
    entryId: v.string(),
  },
  handler: async (ctx, { entryId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) throw new Error("User not found");
    
    // Verify ownership by checking namespace
    const entry = await rag.list(ctx, {
      namespace: user._id,
      paginationOpts: { cursor: null, numItems: 1000 },
    });
    
    const found = entry.page.find(e => e.entryId === entryId);
    if (!found) throw new Error("Document not found");
    
    await rag.delete(ctx, { entryId });
  },
});