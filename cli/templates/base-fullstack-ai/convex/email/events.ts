import { internal } from "../_generated/api";
import { vEmailEvent, vEmailId } from "@convex-dev/resend";
import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const handleEmailEventMutation = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.scheduler.runAfter(0, internal.email.actions.handleEmailEvent, args);
    return null;
  },
});
