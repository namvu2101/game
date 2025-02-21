import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useFormContext, useWatch } from "react-hook-form";

export function GameOver() {
  const { setValue } = useFormContext();
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
