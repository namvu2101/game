import React from "react";
import { useWatch } from "react-hook-form";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Point() {
  const point = useWatch({ name: "core", exact: true });
  const color = useWatch({ name: "color", exact: true });
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
      <Text style={{ color: color, fontSize: 20, fontWeight: "bold" }}>
        Your Color
      </Text>
    </View>
  );
}
