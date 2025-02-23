import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { DeckSwiper } from "expo-deck-swiper";
import data from "../../constants/item_data";

const food = () => {
  const [items, setItems] = useState<foodRecipes[]>([]);

  useEffect(() => {
    if (data.recipeItems && Array.isArray(data.recipeItems)) {
      const newList = data.recipeItems.map((food, index) => {
        return { id: index.toString(), ...food };
      });
      setItems(newList);
      console.log(newList);
    } else {
      console.error("data.recipeItems is not an array");
    }
  }, []);

  console.log(items);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header name={"Recipes"} back={false} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "green",
        }}
      >
        <DeckSwiper
          data={items}
          renderCard={(item) => (
            <View
              style={{
                backgroundColor: Colors.black,
                width: "50%",
                height: "70%",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: Colors.white, fontSize: 50 }}>
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

export default food;
