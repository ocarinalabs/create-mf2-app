import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import type { ReactNode } from "react";

type AuthProviderProps = {
  readonly children: ReactNode;
  readonly publishableKey: string;
};

export const AuthProvider = ({
  children,
  publishableKey,
}: AuthProviderProps) => (
  <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    {children}
  </ClerkProvider>
);
