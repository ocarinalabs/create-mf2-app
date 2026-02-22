import type { Id } from "../_generated/dataModel";
import type { QueryCtx } from "../_generated/server";

export function getUserSettings(ctx: QueryCtx, userId: Id<"users">) {
  return ctx.db
    .query("userSettings")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .unique();
}
