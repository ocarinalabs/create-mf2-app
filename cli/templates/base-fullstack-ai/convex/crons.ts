import { cronJobs } from "convex/server";
import { components, internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";

const crons = cronJobs();

// Clean up old emails every hour
crons.interval(
  "Remove old emails from the resend component",
  { hours: 1 },
  internal.crons.cleanupResend
);

// Clean up unused files every hour
crons.interval(
  "deleteUnusedFiles",
  { hours: 1 },
  internal.files.vacuum.deleteUnusedFiles,
  {},
);

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
export const cleanupResend = internalMutation({
  args: {},
  handler: async (ctx) => {
    await ctx.scheduler.runAfter(0, components.resend.lib.cleanupOldEmails, {
      olderThan: ONE_WEEK_MS,
    });
    await ctx.scheduler.runAfter(
      0,
      components.resend.lib.cleanupAbandonedEmails,
      // These generally indicate a bug, so keep them around for longer.
      { olderThan: 4 * ONE_WEEK_MS }
    );
  },
});

export default crons;
