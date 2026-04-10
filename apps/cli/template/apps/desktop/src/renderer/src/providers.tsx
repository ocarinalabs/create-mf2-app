import { DesignSystemProvider } from "@repo/design-system";
import type { ReactNode } from "react";
import { ConvexProvider } from "./convex-provider";

type ProvidersProps = {
  readonly children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => (
  <ConvexProvider>
    <DesignSystemProvider>{children}</DesignSystemProvider>
  </ConvexProvider>
);
