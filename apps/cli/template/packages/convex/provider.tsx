"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ComponentProps, ReactNode } from "react";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

type ConvexClientProviderProps = {
  children: ReactNode;
  useAuth: ComponentProps<typeof ConvexProviderWithClerk>["useAuth"];
};

export function ConvexClientProvider({
  children,
  useAuth,
}: ConvexClientProviderProps) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
