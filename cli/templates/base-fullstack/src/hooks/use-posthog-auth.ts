"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { posthogIdentify, posthogReset } from "@/lib/posthog";

export function usePostHogAuth() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      // Identify the user in PostHog
      posthogIdentify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName || user.firstName || user.username,
        created_at: user.createdAt,
        // Add any other user properties you want to track
      });
    } else {
      // Reset PostHog when user logs out
      posthogReset();
    }
  }, [user, isLoaded]);
}
