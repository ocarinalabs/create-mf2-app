"use node";

import { render } from "@react-email/render";
import { components, internal } from "../_generated/api";
import { Resend } from "@convex-dev/resend";

export const resend: Resend = new Resend(components.resend, {
  testMode: true,
  onEmailEvent: internal.email.events.handleEmailEventMutation,
});

export async function sendEmailWithResend(
  ctx: any,
  template: React.ReactElement,
  subject: string,
  to: string,
  fromName: string = "MF2 Stack"
) {
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    throw new Error(
      "RESEND_FROM_EMAIL environment variable is required. " +
        "Please set it to your verified sender email address."
    );
  }

  const html = await render(template);

  await resend.sendEmail(ctx, {
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html,
  });
}

export async function sendPlainEmail(
  ctx: any,
  subject: string,
  html: string,
  to: string,
  fromName: string = "MF2 Stack"
) {
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!fromEmail) {
    throw new Error(
      "RESEND_FROM_EMAIL environment variable is required. " +
        "Please set it to your verified sender email address."
    );
  }

  await resend.sendEmail(ctx, {
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html,
  });
}
