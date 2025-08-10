import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const addToWaitlist = mutation({
  args: {
    email: v.string(),
    metadata: v.optional(
      v.object({
        source: v.optional(v.string()),
        referrer: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("Email already exists in waitlist");
    }

    const waitlistId = await ctx.db.insert("waitlist", {
      email: args.email,
      createdAt: Date.now(),
      notified: false,
      metadata: args.metadata,
    });

    return { success: true, waitlistId };
  },
});

export const getWaitlistCount = query({
  args: {},
  handler: async (ctx) => {
    const waitlist = await ctx.db.query("waitlist").collect();
    return waitlist.length;
  },
});

export const getWaitlistPosition = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!entry) {
      return null;
    }

    const position = await ctx.db
      .query("waitlist")
      .withIndex("by_created")
      .filter((q) => q.lt(q.field("createdAt"), entry.createdAt))
      .collect();

    return {
      position: position.length + 1,
      createdAt: entry.createdAt,
      notified: entry.notified,
    };
  },
});

export const getWaitlistStats = query({
  args: {},
  handler: async (ctx) => {
    const waitlist = await ctx.db.query("waitlist").collect();
    const notified = waitlist.filter((entry) => entry.notified).length;
    const pending = waitlist.length - notified;

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentEntries = waitlist.filter(
      (entry) => entry.createdAt > sevenDaysAgo
    );

    const entriesByDay = recentEntries.reduce(
      (acc, entry) => {
        const date = new Date(entry.createdAt).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      total: waitlist.length,
      notified,
      pending,
      entriesByDay,
      latestEntries: waitlist.slice(-10).reverse(),
    };
  },
});
