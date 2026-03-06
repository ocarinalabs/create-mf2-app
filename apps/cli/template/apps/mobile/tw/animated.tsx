import RNAnimated from "react-native-reanimated";
import { View } from "./index";

export const Animated = {
  ...RNAnimated,
  View: RNAnimated.createAnimatedComponent(View),
};
