import "server-only";
import { PostHog } from "posthog-node";
import { keys } from "./keys";

const key = keys().NEXT_PUBLIC_POSTHOG_KEY;

export const analytics = key
  ? new PostHog(key, {
      host: keys().NEXT_PUBLIC_POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    })
  : undefined;
