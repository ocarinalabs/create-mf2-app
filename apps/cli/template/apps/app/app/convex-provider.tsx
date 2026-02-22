"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexClientProvider } from "@repo/convex/provider";
import type { ReactNode } from "react";

export function AppConvexProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider useAuth={useAuth}>{children}</ConvexClientProvider>
  );
}
