import {
  coolDownAsync,
  maybeCompleteAuthSession,
  warmUpAsync,
} from "expo-web-browser";
import { useEffect } from "react";
import { Platform } from "react-native";

maybeCompleteAuthSession();

export const useWarmUpBrowser = (): void => {
  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }
    warmUpAsync();
    return () => {
      coolDownAsync();
    };
  }, []);
};
