import { v } from "convex/values";
import { createEnv } from "convex-env";
import { clerk, resend } from "convex-env/presets";

export const env = createEnv({
  ...clerk,
  ...resend,
  CLERK_SECRET_KEY: v.string(),
  CLERK_WEBHOOK_SECRET: v.string(),
  AI_GATEWAY_API_KEY: v.string(),
  AI_GATEWAY_URL: v.string(),
});
