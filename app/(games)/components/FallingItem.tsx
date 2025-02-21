import { Fontisto } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { Dimensions } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");

const OBJECT_SIZE = 50; // Kích thước vật thể
const MOVE_RANGE = 100; // Phạm vi di chuyển theo trục X

const getRandomX = () => {
  "worklet";
  return Math.random() * (width - OBJECT_SIZE);
};

// Hàm tạo tốc độ rơi ngẫu nhiên (3s - 6s)
const getRandomFallDuration = () => 1000 + Math.random() * 3000;

// Hàm tạo tốc độ di chuyển ngang ngẫu nhiên (1s - 2s)
const getRandomMoveDuration = () => 1000 + Math.random() * 1000;

// Hàm tạo độ trễ ngẫu nhiên để vật thể không rơi cùng lúc
const getRandomDelay = () => Math.random() * 2000;

export default function FallingObject({
  startX,
  color,
  checkCollision,
}: Readonly<{
  startX: number;
  color: string;
  checkCollision: any;
}>) {
  const isOver = useWatch({ name: "GameOver", exact: true });
  const positionY = useSharedValue(-OBJECT_SIZE); // Bắt đầu từ trên màn hình
  const positionX = useSharedValue(startX); // Vị trí ban đầu theo trục X

  useEffect(() => {
    const fallDuration = getRandomFallDuration();
    if (isOver) {
      positionY.value = -OBJECT_SIZE;
      positionX.value = getRandomX();
      cancelAnimation(positionX);
      cancelAnimation(positionY);
      return;
    }
    // Animation rơi từ trên xuống với tốc độ khác nhau
    positionY.value = withDelay(
      getRandomDelay(),
      withRepeat(
        withTiming(height, {
          duration: fallDuration,
          easing: Easing.linear,
        }),
        -1,
        false,
        () => {
          positionY.value = -OBJECT_SIZE; // Reset lại vị trí trên cùng
          positionX.value = getRandomX(); // Đặt lại vị trí X ngẫu nhiên
        }
      )
    );

    const moveDuration = getRandomMoveDuration();
    positionX.value = withRepeat(
      withSequence(
        withTiming(positionX.value + (Math.random() * MOVE_RANGE) / 2, {
          duration: moveDuration,
          easing: Easing.linear,
        }),
        withTiming(positionX.value + (Math.random() * MOVE_RANGE) / 2, {
          duration: moveDuration,
          easing: Easing.linear,
        })
      ),
      -1,
      true
    );
    // Kiểm tra va chạm liên tục
    const interval = setInterval(() => {
      runOnJS(checkCollision)(positionX.value, positionY.value, color);
    }, 100);

    return () => clearInterval(interval);
  }, [isOver]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    >
      <Fontisto
        name="injection-syringe"
        size={OBJECT_SIZE}
        color={color}
        style={{ transform: [{ rotateZ: "45deg" }] }}
      />
    </Animated.View>
  );
}
