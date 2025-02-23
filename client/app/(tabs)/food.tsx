import { View, Text, SafeAreaView, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { DeckSwiper } from "expo-deck-swiper";
import data from "../../constants/item_data";

const Food = () => {
  const dimensions = useWindowDimensions();
  const [items, setItems] = useState<foodRecipes[]>(data.recipeItems);

  /**
   * #f04a5e, #642ce9, #4e7afd
   */
  console.log(items);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <Header name={"Recipes"} back={false} />
      <View
        style={{
          flex: 1,
        }}
      >
        <DeckSwiper
          data={items}
          renderCard={(item) => (
            <View
              style={{
                backgroundColor: Colors.black,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                  fontSize: 40,
                }}
              >
                {item.name}
              </Text>
            </View>
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
    // for incomplete recipe
    name: string;
    quantity: number;
    unit: string;
  }[];
  new_groceries_per_serving?: {
    // for incomplete recipe
    name: string;
    quantity: number;
    unit: string;
  }[];
  max_servings: number;
  estimated_cost?: number; // for incomplete recipe
  steps?: string[]; // for complete recipe
}

export default Food;
