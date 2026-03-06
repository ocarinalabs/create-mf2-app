import { Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

export const initRevenueCat = (): void => {
  const appleKey = process.env.EXPO_PUBLIC_REVENUECAT_APPLE_KEY;
  const googleKey = process.env.EXPO_PUBLIC_REVENUECAT_GOOGLE_KEY;

  if (Platform.OS === "ios" && appleKey) {
    Purchases.configure({ apiKey: appleKey });
  } else if (Platform.OS === "android" && googleKey) {
    Purchases.configure({ apiKey: googleKey });
  }

  if (process.env.NODE_ENV === "development") {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  }
};

export const checkSubscription = async (
  entitlementId: string
): Promise<boolean> => {
  const customerInfo = await Purchases.getCustomerInfo();
  return typeof customerInfo.entitlements.active[entitlementId] !== "undefined";
};

export const purchases = Purchases;
