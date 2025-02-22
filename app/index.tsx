import { Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Route, useRouter } from "expo-router";

type TGame = {
  id: string;
  name: string;
  route: Route;
  image?: string;
};

export default function Index() {
  const { top, bottom } = useSafeAreaInsets();
  const { push } = useRouter();
  const COLORS = ["gray", "blue", "green", "black", "purple"];

  // Hàm chọn màu ngẫu nhiên
  const getRandomColor = () =>
    COLORS[Math.floor(Math.random() * COLORS.length)];
  const data: TGame[] = [
    { id: "1", name: "Game 1", route: "/games" },
    { id: "2", name: "Game 2", route: "/game2" },
  ];

  const renderItem = ({ item }: { item: TGame }) => {
    const onPress = () => {
      push(item.route);
    };
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          minHeight: 50,
          borderRadius: 10,
          justifyContent: "center",
          backgroundColor: getRandomColor(),
          borderColor: "white",
          borderWidth: 2,
        }}
        onPress={onPress}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ThemedView
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <FlatList
        data={data}
        contentContainerStyle={{ gap: 10 }}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
      />
    </ThemedView>
  );
}
