import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { DeckSwiper } from "expo-deck-swiper";
import data from "../../constants/item_data";
import { Button } from "react-native-paper";

const Food = () => {
  const dimensions = useWindowDimensions();
  const [items, setItems] = useState<foodRecipes[]>(data.recipeItems);
  const [count, setCount] = useState(1);

  const firstColour = "#f04a5e";
  const secondColour = "#642ce9";
  const thirdColour = "#4e7afd";
  /**
   * #f04a5e, #642ce9, #4e7afd
   */
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: secondColour,
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
                backgroundColor: firstColour,
                height: "100%",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: secondColour,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                Are We Feeling Some...
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: secondColour,
                  fontSize: 40,
                  marginBottom: 15,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: secondColour,
                  fontSize: 30,
                }}
              >
                You Have Everything You Need! {":)"}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  color: secondColour,
                  fontSize: 18,
                  marginTop: 5,
                }}
              >
                Max Serving: {item.max_servings}
              </Text>
              <View
                style={{
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    const newCount = count - 1;
                    if (newCount >= 1) {
                      setCount(newCount);
                    }
                  }}
                >
                  <Text
                    style={styles.buttonText}
                    onPress={() => {
                      const newCount = count - 1;
                      if (newCount >= 1) {
                        setCount(newCount);
                      }
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{count}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    console.log("Pressed");
                    const newCount = count + 1;
                    if (newCount <= item.max_servings) {
                      setCount(newCount);
                    }
                  }}
                >
                  <Text
                    style={styles.buttonText}
                    onPress={() => {
                      console.log("Pressed");
                      const newCount = count + 1;
                      if (newCount <= item.max_servings) {
                        setCount(newCount);
                      }
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                style={{
                  backgroundColor: thirdColour,
                  marginTop: 20,
                  borderRadius: 20,
                }}
                onPress={() => console.log("Pressed")}
                textColor={Colors.white}
              >
                Ingredients Per Serving
              </Button>
              <Button
                style={{
                  backgroundColor: thirdColour,
                  marginTop: 20,
                  borderRadius: 20,
                }}
                onPress={() => console.log("Pressed")}
                textColor={Colors.white}
              >
                Ingredients Per Serving
              </Button>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#444",
    borderRadius: 20,
    //padding: 10,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 7,
  },
});

export default Food;
