import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FallingObject from "./components/FallingItem";
import { Point } from "./components/Point";
import { Ionicons } from "@expo/vector-icons";
import { GameOver } from "./components/GameOver";

const { width, height } = Dimensions.get("window");

const NUM_OBJECTS = 10; // Số vật thể rơi
const OBJECT_SIZE = 50; // Kích thước vật thể
const PLAYER_SIZE = 80; // Kích thước người chơi (thanh điều khiển)

// Danh sách màu sắc ngẫu nhiên
const COLORS = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];

// Hàm chọn màu ngẫu nhiên
const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// Hàm tạo vị trí X ngẫu nhiên
const getRandomX = () => Math.random() * (width - OBJECT_SIZE);

export default function Game() {
  const playerX = useSharedValue(width / 2 - PLAYER_SIZE / 2);
  const playerY = useSharedValue(height - PLAYER_SIZE);

  const pan = Gesture.Pan().onChange((e) => {
    playerX.value = Math.min(
      Math.max(playerX.value + e.changeX, 0),
      width - PLAYER_SIZE
    );
    playerY.value = Math.min(
      Math.max(playerY.value + e.changeY, 0),
      height - PLAYER_SIZE
    );
  });

  const playerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: playerX.value }, { translateY: playerY.value }],
  }));

  const checkCollision = (objX: number, objY: number) => {
    "worklet";
    const playerTop = playerY.value;
    const playerBottom = playerY.value + PLAYER_SIZE;
    const playerLeft = playerX.value;
    const playerRight = playerX.value + PLAYER_SIZE;

    const objTop = objY;
    const objBottom = objY + OBJECT_SIZE * 2;
    const objLeft = objX;
    const objRight = objX;

    // Kiểm tra nếu vật thể rơi chạm vào người chơi
    if (
      objBottom >= playerTop && // Vật thể rơi xuống chạm vào đầu người chơi
      objTop <= playerBottom - 20 && // Đảm bảo nó vẫn nằm trong vùng
      objRight >= playerLeft - 20 && // Chạm ngang
      objLeft <= playerRight - 20
    ) {
      methods.setValue("GameOver", true);
      return;
    }
    if (objBottom >= height) {
      methods.setValue("counts", methods.getValues("counts") + 1);
    }
  };

  const methods = useForm({
    mode: "all",
    defaultValues: { counts: 0, GameOver: false },
  });

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FormProvider {...methods}>
        {Array.from({ length: NUM_OBJECTS }).map((_, index) => (
          <FallingObject
            key={index}
            startX={getRandomX()}
            color={getRandomColor()}
            checkCollision={checkCollision}
          />
        ))}
        <GestureDetector gesture={pan}>
          <Animated.View style={[{ bottom }, playerStyle]}>
            <Ionicons name="balloon-sharp" size={PLAYER_SIZE} color={"#fff"} />
          </Animated.View>
        </GestureDetector>
        <Point />
        <GameOver />
      </FormProvider>
    </View>
  );
}
