"use node";

import { vEmailEvent, vEmailId } from "@convex-dev/resend";
import { internalAction, action } from "../_generated/server";
import { v } from "convex/values";
import { resend, sendEmailWithResend, sendPlainEmail } from "./utils";

import WelcomeEmail from "../../email/templates/welcome";
import VerificationCodeEmail from "../../email/templates/verification-code";
import WaitlistConfirmationEmail from "../../email/templates/waitlist-confirmation";
import PasswordResetEmail from "../../email/templates/password-reset";

export const handleEmailEvent = internalAction({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    console.log("Got called back!", args.id, args.event);
    return null;
  },
});

export const sendTestEmail = internalAction({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await sendPlainEmail(
      ctx,
      "Hi there",
      "This is a test email",
      "Resend <delivered@resend.dev>",
      "MF2 Stack Test"
    );
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
    await sendPlainEmail(ctx, args.subject, args.html, args.to);
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
    await sendEmailWithResend(
      ctx,
      WelcomeEmail({ userFirstname: args.username }),
      "Welcome to MF2 Stack!",
      args.to
    );
    return null;
  },
});

export const sendVerificationCodeEmail = action({
  args: {
    to: v.string(),
    code: v.string(),
    expires: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmailWithResend(
      ctx,
      VerificationCodeEmail({
        validationCode: args.code,
        expiresInMinutes: Math.floor((args.expires - Date.now()) / (60 * 1000)),
      }),
      "Verify your email",
      args.to
    );
    return null;
  },
});

export const sendWaitlistConfirmationEmail = action({
  args: {
    to: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmailWithResend(
      ctx,
      WaitlistConfirmationEmail({
        userFirstname: args.to.split("@")[0],
      }),
      "You're on the waitlist!",
      args.to
    );
    return null;
  },
});

export const sendOTPEmail = action({
  args: {
    to: v.string(),
    code: v.string(),
    expires: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmailWithResend(
      ctx,
      VerificationCodeEmail({
        validationCode: args.code,
        expiresInMinutes: Math.floor((args.expires - Date.now()) / (60 * 1000)),
      }),
      "Sign in to MF2 Stack",
      args.to
    );
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
    await sendEmailWithResend(
      ctx,
      PasswordResetEmail({
        userFirstname: args.userFirstname,
        resetPasswordLink: args.resetPasswordLink,
      }),
      "Reset your password",
      args.to
    );
    return null;
  },
});
