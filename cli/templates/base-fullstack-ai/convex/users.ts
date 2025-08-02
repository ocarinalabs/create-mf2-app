import {
  internalMutation,
  internalQuery,
  mutation,
  query,
  QueryCtx,
  action,
  internalAction,
} from "./_generated/server";

import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { createClerkClient, UserJSON } from "@clerk/backend";
import { api, internal } from "./_generated/api";

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing CLERK_SECRET_KEY environment variable");
}

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

/**
 * Whether the current user is fully logged in, including having their information
 * synced from Clerk via webhook.
 *
 * Like all Convex queries, errors on expired Clerk token.
 */
export const userLoginStatus = query(
  async (
    ctx
  ): Promise<
    | ["No JWT Token", null]
    | ["No Clerk User", null]
    | ["Logged In", Doc<"users">]
  > => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return ["No JWT Token", null];
    }
    const user = await getCurrentUser(ctx);
    if (user === null) {
      // If Clerk has not told us about this user we're still waiting for the
      // webhook notification.
      return ["No Clerk User", null];
    }
    return ["Logged In", user];
  }
);

/** The current user, containing user preferences and Clerk user info. */
export const currentUser = query((ctx: QueryCtx) => getCurrentUser(ctx));

/** Get user by Clerk use id (AKA "subject" on auth)  */
export const getUser = internalQuery({
  args: { subject: v.string() },
  async handler(ctx, args) {
    return await userQuery(ctx, args.subject);
  },
});

/** Create a new Clerk user or update existing Clerk user data. */
export const updateOrCreateUser = internalMutation({
  args: { clerkUser: v.any() }, // no runtime validation, trust Clerk
  async handler(ctx, { clerkUser }: { clerkUser: UserJSON }) {
    const userRecord = await userQuery(ctx, clerkUser.id);

    if (userRecord === null) {
      const colors = ["red", "green", "blue"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      await ctx.db.insert("users", { clerkUser, color });

      const primaryEmail = clerkUser.email_addresses?.find(
        email => email.id === clerkUser.primary_email_address_id
      );
      
      if (primaryEmail?.email_address) {
        try {
          await ctx.scheduler.runAfter(
            0,
            api.emails.sendWelcomeEmail,
            {
              to: primaryEmail.email_address,
              username: clerkUser.first_name || clerkUser.username || "User",
            }
          );
        } catch (error) {
          console.error("Failed to send welcome email:", error);
          // Don't fail user creation if email fails
        }
      }
    } else {
      await ctx.db.patch(userRecord._id, { clerkUser });
    }
  },
});

/** Delete a user by clerk user ID. */
export const deleteUserByClerkId = internalMutation({
  args: { id: v.string() },
  async handler(ctx, { id }) {
    const userRecord = await userQuery(ctx, id);

    if (userRecord === null) {
      console.warn("can't delete user, does not exist", id);
    } else {
      await ctx.db.delete(userRecord._id);
    }
  },
});

/** Set the user preference of the color of their text. */
export const setColor = mutation({
  args: { color: v.string() },
  handler: async (ctx, { color }) => {
    const user = await mustGetCurrentUser(ctx);
    await ctx.db.patch(user._id, { color });
  },
});

// Helpers

export async function userQuery(
  ctx: QueryCtx,
  clerkUserId: string
): Promise<(Omit<Doc<"users">, "clerkUser"> & { clerkUser: UserJSON }) | null> {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", clerkUserId))
    .unique();
}

export async function userById(
  ctx: QueryCtx,
  id: Id<"users">
): Promise<(Omit<Doc<"users">, "clerkUser"> & { clerkUser: UserJSON }) | null> {
  return await ctx.db.get(id);
}

async function getCurrentUser(ctx: QueryCtx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userQuery(ctx, identity.subject);
}

export async function mustGetCurrentUser(ctx: QueryCtx): Promise<Doc<"users">> {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

// Delete a user from all services
export const deleteUser = action({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.runQuery(api.users.currentUser);
    if (!user) {
      throw new Error("Can't get current user");
    }

    // 1. Delete user from Clerk
    await ctx.runAction(internal.users.deleteClerkUser, {
      clerkUserId: user.clerkUser.id,
    });

    // 2. Delete user from Convex
    await ctx.runMutation(internal.users.deleteConvexUser, {
      userId: user._id,
    });

    return { success: true };
  },
});

// Delete a user from Clerk only
export const deleteClerkUser = internalAction({
  args: { clerkUserId: v.string() },
  handler: async (_, { clerkUserId }) => {
    // Delete from Clerk using SDK
    try {
      await clerkClient.users.deleteUser(clerkUserId);
      console.log("Successfully deleted user from Clerk:", clerkUserId);
    } catch (error) {
      console.error("Failed to delete user from Clerk:", error);
      throw new Error("Failed to delete user from Clerk");
    }

    return { success: true };
  },
});

// Delete a user from Convex database
export const deleteConvexUser = internalMutation({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    if (!user) {
      console.warn("User not found in Convex:", userId);
      return null;
    }

    // Delete the user document
    await ctx.db.delete(userId);
    console.log("Successfully deleted user from Convex:", userId);
    return null;
  },
});
