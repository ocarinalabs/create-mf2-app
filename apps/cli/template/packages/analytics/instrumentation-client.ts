import posthog from "posthog-js";
import { keys } from "./keys";

export const initializeAnalytics = () => {
  const key = keys().NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    return;
  }

  posthog.init(key, {
    api_host: keys().NEXT_PUBLIC_POSTHOG_HOST,
    defaults: "2025-05-24",
  });
};
