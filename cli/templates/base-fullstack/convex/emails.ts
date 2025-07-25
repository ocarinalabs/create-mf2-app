import { components, internal } from "./_generated/api";
import { Resend, vEmailEvent, vEmailId } from "@convex-dev/resend";
import { internalMutation, action } from "./_generated/server";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {
  testMode: true, // Set to false in production
  onEmailEvent: internal.emails.handleEmailEvent,
});

export const handleEmailEvent = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  handler: async (ctx, args) => {
    console.log("Got called back!", args.id, args.event);
    // Probably do something with the event if you care about deliverability!
  },
});

export const sendTestEmail = internalMutation({
  handler: async (ctx) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL environment variable is required. " +
          "Please set it to your verified sender email address."
      );
    }

    await resend.sendEmail(ctx, {
      from: `MF2 Stack Test <${fromEmail}>`,
      to: "Resend <delivered@resend.dev>",
      subject: "Hi there",
      html: "This is a test email",
    });
  },
});

export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
  },
  handler: async (ctx, args) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL environment variable is required. " +
          "Please set it to your verified sender email address."
      );
    }

    await resend.sendEmail(ctx, {
      from: `MF2 Stack <${fromEmail}>`,
      to: args.to,
      subject: args.subject,
      html: args.html,
    });
  },
});
