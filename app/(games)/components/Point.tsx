import React from "react";
import { useWatch } from "react-hook-form";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Point() {
  const point = useWatch({ name: "counts", exact: true });
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        alignItems: "center",
        height: "100%",
        width: "100%",
        top,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
        {point}
      </Text>
    </View>
  );
}
