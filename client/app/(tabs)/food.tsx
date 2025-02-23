// food.tsx
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { DeckSwiper } from "expo-deck-swiper";
import data from "../../constants/item_data";
import { useColorScheme } from "@/hooks/useColorScheme";

const Food = () => {
  const [items, setItems] = useState<foodRecipes[]>([]);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    if (data.recipeItems && Array.isArray(data.recipeItems)) {
      const newList = data.recipeItems.map((food, index) => {
        return { id: index.toString(), ...food };
      });
      setItems(newList);
    } else {
      console.error("data.recipeItems is not an array");
    }
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header name="Recipes" back={false} />
      <View style={styles.swiperContainer}>
        <DeckSwiper
          data={items}
          renderCard={(item) => (
            <Animatable.View
              animation="fadeInUp"
              duration={700}
              style={[styles.card, { backgroundColor: theme.white }]}
            >
              <Text style={[styles.cardText, { color: theme.black }]}>{item.name}</Text>
            </Animatable.View>
          )}
          onSwipeLeft={(item) => console.log("Swiped left:", item)}
          onSwipeRight={(item) => console.log("Swiped right:", item)}
        />
      </View>
    </SafeAreaView>
  );
};

export interface foodRecipes {
  id: string;
  name: string;
  is_complete: boolean;
  ingredients_have_per_serving: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  existing_groceries_per_serving?: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  new_groceries_per_serving?: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  max_servings: number;
  estimated_cost?: number;
  steps?: string[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "60%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardText: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Food;
