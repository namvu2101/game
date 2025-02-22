import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import Item from "./components/Item";
import Point from "./components/Point";
import GameOver from "./components/GameOver";

const NUM_OBJECTS = 5;
// Danh sách màu sắc ngẫu nhiên
const COLORS = ["white", "blue", "yellow"];
// Hàm chọn màu ngẫu nhiên
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

export default function Game2() {
  const { setOptions } = useNavigation();

  useEffect(() => {
    setOptions({ headerShown: false });
  }, []);
  const methods = useForm({
    defaultValues: {
      core: 0,
      isOver: false,
      level: 1,
      color: getRandomColor(),
    },
  });
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FormProvider {...methods}>
        <Point />
        {Array.from({ length: NUM_OBJECTS }).map((_, index) => (
          <Item key={index} />
        ))}
        <GameOver />
      </FormProvider>
    </View>
  );
}
