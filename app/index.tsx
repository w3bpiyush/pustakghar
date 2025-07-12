import Colors from "@/constants/Color";
import Metrics from "@/constants/Metrics";
import { scale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  const router = useRouter();
  const version = "1.0";

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/Login");
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <Animated.Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          entering={FadeIn.duration(700).springify()}
        />
      </View>
      <Text style={styles.versionText}>v{version}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    width: scale(200),
    height: scale(200),
    resizeMode: "contain",
  },
  versionText: {
    fontSize: scale(Metrics.FontSizes.small),
    color: Colors.textSecondary,
    alignSelf: "center",
  },
});
