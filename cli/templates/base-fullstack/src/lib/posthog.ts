import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

export const PostHogProvider = PHProvider;

// Only initialize PostHog if the environment variables are set
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    // Core configuration
    person_profiles: "identified_only", // Only create profiles for identified users
    capture_pageview: false, // Let Next.js handle pageviews
    capture_pageleave: true, // Useful for session analytics

    // Feature configuration
    disable_session_recording: false,
    mask_all_text: false,
    mask_all_element_attributes: false,

    // Privacy-focused defaults
    autocapture: {
      dom_event_allowlist: ["click", "change", "submit"], // Only capture specific events
      element_allowlist: ["a", "button", "input", "select", "textarea", "form"],
    },

    // Performance
    capture_performance: true,

    // Site apps
    opt_in_site_apps: true,

    // Development
    debug: process.env.NODE_ENV === "development",

    // Session configuration
    persistence: "localStorage+cookie",
    persistence_name: "__mf2_posthog",

    // Bootstrap
    bootstrap: {},

    // Loaded callback
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        console.log("PostHog loaded", posthog);
      }
    },
  });
}

// Helper functions for identifying users
export const posthogIdentify = (
  userId: string,
  properties?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && posthog) {
    posthog.identify(userId, properties);
  }
};

export const posthogReset = () => {
  if (typeof window !== "undefined" && posthog) {
    posthog.reset();
  }
};

// Export the PostHog instance
export default posthog;
