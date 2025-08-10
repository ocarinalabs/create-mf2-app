import { internalMutation } from "../_generated/server";
import { v } from "convex/values";
import { components, internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";

const THRESHOLD_MS = 1000 * 60 * 60 * 24;

export const deleteUnusedFiles = internalMutation({
  args: { cursor: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const files = await ctx.runQuery(components.agent.files.getFilesToDelete, {
      paginationOpts: {
        cursor: args.cursor ?? null,
        numItems: 100,
      },
    });
    const toDelete = files.page.filter(
      (f) => f.lastTouchedAt < Date.now() - THRESHOLD_MS
    );
    if (toDelete.length > 0) {
      console.debug(`Deleting ${toDelete.length} files...`);
    }
    await Promise.all(
      toDelete.map((f) => ctx.storage.delete(f.storageId as Id<"_storage">))
    );
    await ctx.runMutation(components.agent.files.deleteFiles, {
      fileIds: toDelete.map((f) => f._id),
    });
    if (!files.isDone) {
      console.debug(
        `Deleted ${toDelete.length} files but not done yet, continuing...`
      );
      await ctx.scheduler.runAfter(0, internal.files.vacuum.deleteUnusedFiles, {
        cursor: files.continueCursor,
      });
    }
  },
});
