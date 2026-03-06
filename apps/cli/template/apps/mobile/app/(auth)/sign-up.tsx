import { SignUp } from "@repo/auth/components/sign-up.native";
import { View } from "@/tw";

export default function SignUpScreen() {
  return (
    <View className="flex-1 bg-background">
      <SignUp />
    </View>
  );
}
