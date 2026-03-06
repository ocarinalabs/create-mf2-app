import PostHog, { PostHogProvider } from "posthog-react-native";
import type { ReactNode } from "react";

const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const posthogHost =
  process.env.EXPO_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

const posthog = posthogKey
  ? new PostHog(posthogKey, { host: posthogHost })
  : null;

type AnalyticsProviderProps = {
  readonly children: ReactNode;
};

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  if (!posthog) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider autocapture client={posthog}>
      {children}
    </PostHogProvider>
  );
};
