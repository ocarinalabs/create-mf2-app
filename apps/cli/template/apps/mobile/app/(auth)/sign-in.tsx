import { SignIn } from "@repo/auth/components/sign-in.native";
import { View } from "@/tw";

export default function SignInScreen() {
  return (
    <View className="flex-1 bg-background">
      <SignIn />
    </View>
  );
}
