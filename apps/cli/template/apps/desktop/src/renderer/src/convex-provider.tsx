import { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

type ConvexProviderProps = {
  readonly children: ReactNode;
};

export const ConvexProvider = ({ children }: ConvexProviderProps) => {
  if (!convex) {
    return <>{children}</>;
  }

  // TODO: Wire up Clerk auth for desktop once @clerk/electron is available.
  // For now, Convex connects without auth.
  return <>{children}</>;
};
