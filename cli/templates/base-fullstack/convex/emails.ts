"use node";

import { components, internal } from "./_generated/api";
import { Resend, vEmailEvent, vEmailId } from "@convex-dev/resend";
import { internalAction, action } from "./_generated/server";
import { v } from "convex/values";
import { render } from "@react-email/render";

import WelcomeEmail from "../email/templates/welcome";
import VerificationCodeEmail from "../email/templates/verification-code";
import WaitlistConfirmationEmail from "../email/templates/waitlist-confirmation";
import PasswordResetEmail from "../email/templates/password-reset";

export const resend: Resend = new Resend(components.resend, {
  testMode: true, // Set to false in production
  onEmailEvent: internal.emailEvents.handleEmailEventMutation,
});

export const handleEmailEvent = internalAction({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    console.log("Got called back!", args.id, args.event);
    // Probably do something with the event if you care about deliverability!
    return null;
  },
});

export const sendTestEmail = internalAction({
  args: {},
  returns: v.null(),
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

    return null;
  },
});

export const sendEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
  },
  returns: v.null(),
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

    return null;
  },
});

export const sendWelcomeEmail = action({
  args: {
    to: v.string(),
    username: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL environment variable is required. " +
          "Please set it to your verified sender email address."
      );
    }

    const emailHtml = await render(
      WelcomeEmail({ userFirstname: args.username })
    );

    await resend.sendEmail(ctx, {
      from: `MF2 Stack <${fromEmail}>`,
      to: args.to,
      subject: "Welcome to MF2 Stack!",
      html: emailHtml,
    });

    return null;
  },
});

export const sendVerificationCodeEmail = action({
  args: {
    to: v.string(),
    code: v.string(),
    expires: v.number(), // timestamp
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL environment variable is required. " +
          "Please set it to your verified sender email address."
      );
    }

    const emailHtml = await render(
      VerificationCodeEmail({
        validationCode: args.code,
        expiresInMinutes: Math.floor((args.expires - Date.now()) / (60 * 1000)),
      })
    );

    await resend.sendEmail(ctx, {
      from: `MF2 Stack <${fromEmail}>`,
      to: args.to,
      subject: "Verify your email",
      html: emailHtml,
    });

    return null;
  },
});

export const sendWaitlistConfirmationEmail = action({
  args: {
    to: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL environment variable is required. " +
          "Please set it to your verified sender email address."
      );
    }

    const emailHtml = await render(
      WaitlistConfirmationEmail({
        userFirstname: args.to.split("@")[0], // Use email prefix as firstname
      })
    );

    await resend.sendEmail(ctx, {
      from: `MF2 Stack <${fromEmail}>`,
      to: args.to,
      subject: "You're on the waitlist!",
      html: emailHtml,
    });

    return null;
  },
});

export const sendOTPEmail = action({
  args: {
    to: v.string(),
    code: v.string(),
    expires: v.number(), // timestamp
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL environment variable is required. " +
          "Please set it to your verified sender email address."
      );
    }

    const emailHtml = await render(
      VerificationCodeEmail({
        validationCode: args.code,
        expiresInMinutes: Math.floor((args.expires - Date.now()) / (60 * 1000)),
      })
    );

    await resend.sendEmail(ctx, {
      from: `MF2 Stack <${fromEmail}>`,
      to: args.to,
      subject: "Sign in to MF2 Stack",
      html: emailHtml,
    });

    return null;
  },
});

export const sendPasswordResetEmail = action({
  args: {
    to: v.string(),
    userFirstname: v.string(),
    resetPasswordLink: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!fromEmail) {
      throw new Error(
        "RESEND_FROM_EMAIL environment variable is required. " +
          "Please set it to your verified sender email address."
      );
    }

    const emailHtml = await render(
      PasswordResetEmail({
        userFirstname: args.userFirstname,
        resetPasswordLink: args.resetPasswordLink,
      })
    );

    await resend.sendEmail(ctx, {
      from: `MF2 Stack <${fromEmail}>`,
      to: args.to,
      subject: "Reset your password",
      html: emailHtml,
    });

    return null;
  },
});
