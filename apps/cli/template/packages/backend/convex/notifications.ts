import { PushNotifications } from "@convex-dev/expo-push-notifications";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { mutation, query } from "./_generated/server";

const pushNotifications = new PushNotifications(components.pushNotifications);

export const recordToken = mutation({
  args: { userId: v.id("users"), pushToken: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    await pushNotifications.recordToken(ctx, {
      userId: args.userId,
      pushToken: args.pushToken,
    });
    return null;
  },
});

export const send = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    body: v.optional(v.string()),
  },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    return await pushNotifications.sendPushNotification(ctx, {
      userId: args.userId,
      notification: {
        title: args.title,
        body: args.body,
      },
    });
  },
});

export const getStatus = query({
  args: { userId: v.id("users") },
  returns: v.object({
    hasToken: v.boolean(),
    isPaused: v.boolean(),
  }),
  handler: async (ctx, args) => {
    return await pushNotifications.getStatusForUser(ctx, {
      userId: args.userId,
    });
  },
});

export const getNotification = query({
  args: { id: v.string() },
  returns: v.union(
    v.object({
      state: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const notification = await pushNotifications.getNotification(ctx, args);
    if (!notification) {
      return null;
    }
    return { state: notification.state };
  },
});
