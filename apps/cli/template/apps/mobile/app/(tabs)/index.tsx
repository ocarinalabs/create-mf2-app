import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "@/tw";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="border-border border-b px-4 pt-3 pb-3">
        <Text className="font-semibold text-foreground text-lg">Home</Text>
      </View>
      <View className="flex-1 items-center justify-center p-6">
        <Text className="font-bold text-2xl text-foreground">
          Welcome to your app
        </Text>
        <Text className="mt-2 text-center text-muted-foreground">
          Start building something amazing
        </Text>
      </View>
    </View>
  );
}
