import type { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

type DesignSystemNativeProviderProps = {
  readonly children: ReactNode;
};

export const DesignSystemNativeProvider = ({
  children,
}: DesignSystemNativeProviderProps) => (
  <SafeAreaProvider>{children}</SafeAreaProvider>
);
