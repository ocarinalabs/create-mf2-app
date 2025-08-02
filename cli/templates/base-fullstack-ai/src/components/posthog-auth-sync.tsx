"use client";

import { usePostHogAuth } from "@/hooks/use-posthog-auth";

export function PostHogAuthSync() {
  usePostHogAuth();
  return null;
}
