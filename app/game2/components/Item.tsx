import { Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  cancelAnimation,
} from "react-native-reanimated";
import { useFormContext, useWatch } from "react-hook-form";

const ITEM_SIZE = 60;

const { width, height } = Dimensions.get("window");
const getRandomX = () => {
  "worklet";
  return Math.random() * (width - ITEM_SIZE * 2);
};
const getRandomY = () => {
  "worklet";
  return Math.random() * (height - ITEM_SIZE * 2);
};

export default function Item() {
  const positionX = useSharedValue(getRandomX());
  const positionY = useSharedValue(getRandomY());
  const opacity = useSharedValue(1);
  const color = useSharedValue("white");
  const { setValue, getValues } = useFormContext();
  const isOver = useWatch({ name: "isOver", exact: true });
  const COLORS = ["white", "blue", "yellow"];
  const getRandomColor = () =>
    COLORS[Math.floor(Math.random() * COLORS.length)];

  useEffect(() => {
    cancelAnimation(opacity);
    cancelAnimation(positionX);
    cancelAnimation(positionY);
    cancelAnimation(color);
    opacity.value = 0;
  }, [isOver]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
      opacity: opacity.value,
      backgroundColor: color.value,
    };
  });

  const moveItem = () => {
    opacity.value = withTiming(0, { duration: 300 }, () => {
      positionX.value = withTiming(getRandomX(), { duration: 10 });
      positionY.value = withTiming(getRandomY(), {
        duration: 10,
      });
      runOnJS(showItem)();
    });
  };

  const showItem = () => {
    runOnJS(() => {
      color.value = getRandomColor(); // Đổi màu bằng runOnJS
    })();
    opacity.value = withTiming(1, { duration: 300 });
  };

  useEffect(() => {
    const random = setInterval(moveItem, 2000);
    if (isOver) {
      clearInterval(random);
    }
    return () => clearInterval(random);
  }, [isOver]);

  const onPress = () => {
    if (getValues("color") !== color.value) {
      setValue("isOver", true);
      return;
    }
    opacity.value = 0;
    moveItem();
    setValue("core", getValues("core") + 1);
  };

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          height: ITEM_SIZE,
          width: ITEM_SIZE,
          borderRadius: ITEM_SIZE / 2,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 5,
          position: "absolute",
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{ height: "100%", width: "100%" }}
      />
    </Animated.View>
  );
}
