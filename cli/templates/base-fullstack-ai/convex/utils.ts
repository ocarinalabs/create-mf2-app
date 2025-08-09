import { ActionCtx, MutationCtx, QueryCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

// Returns the user ID as an Id<"users"> type for type safety
export async function getAuthUserId(ctx: QueryCtx | MutationCtx | ActionCtx): Promise<Id<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;
  
  // ActionCtx doesn't have direct database access
  // It has runQuery, runMutation, but not db
  if ('runQuery' in ctx && !('db' in ctx)) {
    // This is an ActionCtx - use the internal query to get the user
    const user = await ctx.runQuery(internal.auth.users.getUser, {
      subject: identity.subject
    });
    return user?._id || null;
  }
  
  // This is QueryCtx or MutationCtx - they have db access
  const user = await (ctx as QueryCtx | MutationCtx).db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
    .unique();
    
  return user?._id || null;
}

// Returns the user ID as a string for compatibility with Convex Agent component
export async function getAuthUserIdAsString(ctx: QueryCtx | MutationCtx | ActionCtx): Promise<string | undefined> {
  const userId = await getAuthUserId(ctx);
  // Convert null to undefined and Id<"users"> to string
  return userId ?? undefined;
}
