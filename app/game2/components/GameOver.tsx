import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFormContext, useWatch } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
// Danh sách màu sắc ngẫu nhiên
const COLORS = ["white", "blue", "yellow"];
// Hàm chọn màu ngẫu nhiên
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
export default function GameOver() {
  const { setValue } = useFormContext();
  const { top } = useSafeAreaInsets();
  const { back } = useRouter();
  const isOver = useWatch({ name: "isOver", exact: true });

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
          setValue("core", 0);
          setValue("isOver", false);
          setValue("color", getRandomColor());
        }}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}
