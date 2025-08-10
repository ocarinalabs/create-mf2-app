import { ActionCtx, MutationCtx, QueryCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export async function getAuthUserId(
  ctx: QueryCtx | MutationCtx | ActionCtx
): Promise<Id<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  if ("runQuery" in ctx && !("db" in ctx)) {
    const user = await ctx.runQuery(internal.auth.users.getUser, {
      subject: identity.subject,
    });
    return user?._id || null;
  }

  const user = await (ctx as QueryCtx | MutationCtx).db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", identity.subject))
    .unique();

  return user?._id || null;
}

export async function getAuthUserIdAsString(
  ctx: QueryCtx | MutationCtx | ActionCtx
): Promise<string | undefined> {
  const userId = await getAuthUserId(ctx);
  return userId ?? undefined;
}
