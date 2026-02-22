import type { WebhookEvent } from "@clerk/backend";
import { registerRoutes } from "@convex-dev/stripe";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { components, internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { env } from "./convex.env";
import { resend } from "./email/index";

async function validateClerkWebhook(
  request: Request
): Promise<WebhookEvent | undefined> {
  const svixHeaders = {
    "svix-id": request.headers.get("svix-id"),
    "svix-timestamp": request.headers.get("svix-timestamp"),
    "svix-signature": request.headers.get("svix-signature"),
  };

  if (
    !(
      svixHeaders["svix-id"] &&
      svixHeaders["svix-timestamp"] &&
      svixHeaders["svix-signature"]
    )
  ) {
    return;
  }

  try {
    const payload = await request.text();
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);
    return wh.verify(
      payload,
      svixHeaders as Record<string, string>
    ) as WebhookEvent;
  } catch {
    return;
  }
}

const http = httpRouter();

http.route({
  path: "/webhooks/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const event = await validateClerkWebhook(request);
    if (!event) {
      return new Response("Invalid webhook", { status: 400 });
    }

    switch (event.type) {
      case "user.created":
      case "user.updated":
        await ctx.runMutation(internal.auth.users.updateOrCreateUser, {
          clerkUser: event.data,
        });
        break;
      case "user.deleted":
        if (event.data.id) {
          await ctx.runMutation(internal.auth.users.deleteUserByClerkId, {
            id: event.data.id,
          });
        }
        break;
      default:
        break;
    }

    return new Response("OK", { status: 200 });
  }),
});

http.route({
  path: "/webhooks/resend",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    return await resend.handleResendEventWebhook(ctx, req);
  }),
});

registerRoutes(http, components.stripe, {
  webhookPath: "/stripe/webhook",
});

export default http;
