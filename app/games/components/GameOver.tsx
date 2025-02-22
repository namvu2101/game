import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GameOver() {
  const { setValue } = useFormContext();
  const { top } = useSafeAreaInsets();
  const { back } = useRouter();
  const isOver = useWatch({ name: "GameOver", exact: true });
  if (!isOver) {
    return <></>;
  }
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={back}
        style={{ position: "absolute", zIndex: 1, top, left: 0 }}
      >
        <FontAwesome name="arrow-circle-left" color={"green"} size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          width: 100,
          height: 50,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={() => {
          setValue("counts", 0);
          setValue("GameOver", false);
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}
