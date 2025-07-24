import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { mustGetCurrentUser, userById } from "./users";

export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, args) => {
    const user = await mustGetCurrentUser(ctx);
    await ctx.db.insert("messages", { body: args.body, user: user._id });
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const messages = await ctx.db.query("messages").collect();
    return Promise.all(
      messages.map(async (message) => {
        // For each message, fetch the User who wrote it and
        // insert their name into the author field.
        const user = await userById(ctx, message.user);
        return {
          author: user?.clerkUser.first_name || "Anonymous",
          ...message,
        };
      }),
    );
  },
});

export const getForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
      .unique();
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("user"), user._id))
      .collect();
  },
});