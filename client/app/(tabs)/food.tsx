import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import Header from "@/components/Header";
import { DeckSwiper } from "expo-deck-swiper";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { Dialog } from "react-native-simple-dialogs";
import { Recipe } from "@/types/models";
import { getRecipeList } from "@/state/recipes/recipeSlice";
import { useFocusEffect } from "expo-router";

const Food = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [items, setItems] = useState<Recipe[]>([]);
  const [count, setCount] = useState(0);
  const [firstDialog, setFirstDialog] = useState(false);
  const [secondDialog, setSecondDialog] = useState(false);
  const [thirdDialog, setThirdDialog] = useState(false);

  const [newList, setNewList] = useState<
    { name: string; quantity: number; unit: string }[]
  >([]);

  const recipeList = useSelector(
    (state: RootState) => state.recipeList.recipeList
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(getRecipeList());
    }, [dispatch])
  )

  useEffect(() => {
    dispatch(getRecipeList());
  }, [dispatch]);

  useEffect(() => {
    setItems(recipeList);
    setCount(recipeList.length)
  }, [recipeList]);

  const firstColour = "#f04a5e";
  const thirdColour = "#642ce9";
  const secondColour = "#24274a";
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
          key={items.length}
          allowedDirections={["left", "right"]}
          data={items}
          renderCard={(item: Recipe) =>
            item.is_complete ? (
              <>
                <Dialog
                  visible={firstDialog}
                  title="Total Ingredients"
                  titleStyle={{
                    fontFamily: "MerchantCopy",
                    fontSize: 36,
                    fontWeight: "500",
                    textAlign: "center",
                    marginHorizontal: 5,
                  }}
                  onTouchOutside={() => {
                    setFirstDialog(false);
                  }}
                  onRequestClose={() => { }}
                  contentInsetAdjustmentBehavior={undefined}
                  animationType="fade"
                  dialogStyle={{ borderRadius: 20, overflowY: "scroll" }}
                >
                  <TouchableOpacity onPress={() => setFirstDialog(false)}>
                    <Text
                      style={{
                        color: secondColour,
                        fontSize: 18,
                        position: "absolute",
                        right: 0,
                        top: -50,
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                  <View>
                    {item.ingredients_have_per_serving.map(
                      (ingredient, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            key={index}
                            style={{
                              color: secondColour,
                              fontSize: 18,
                              marginBottom: 5,
                            }}
                          >
                            {ingredient.name}: {ingredient.quantity * count}{" "}
                            {ingredient.unit}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </Dialog>
                <Dialog
                  visible={thirdDialog}
                  title="Cooking Steps"
                  titleStyle={{
                    fontFamily: "MerchantCopy",
                    fontSize: 36,
                    fontWeight: "500",
                    textAlign: "center",
                    marginHorizontal: 5,
                  }}
                  onTouchOutside={() => {
                    setThirdDialog(false);
                  }}
                  onRequestClose={() => { }}
                  contentInsetAdjustmentBehavior={undefined}
                  animationType="fade"
                  dialogStyle={{ borderRadius: 20, overflowY: "scroll" }}
                >
                  <TouchableOpacity onPress={() => setThirdDialog(false)}>
                    <Text
                      style={{
                        color: secondColour,
                        fontSize: 18,
                        position: "absolute",
                        right: 0,
                        top: -50,
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                  <View>
                    {item.steps!.map((ingredient, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          key={index}
                          style={{
                            color: secondColour,
                            fontSize: 18,
                            marginBottom: 5,
                          }}
                        >
                          {index + 1}. {ingredient}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Dialog>
                <View
                  style={{
                    backgroundColor: firstColour,
                    height: "100%",
                    padding: 15,
                    borderRadius: 10,
                    zIndex: 7,
                    overflowY: "scroll",
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
                      fontSize: 20,
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
                    onPress={() => setFirstDialog(true)}
                    textColor={"white"}
                  >
                    Total Ingredients
                  </Button>
                  <Button
                    style={{
                      backgroundColor: thirdColour,
                      marginTop: 20,
                      borderRadius: 20,
                    }}
                    onPress={() => setThirdDialog(true)}
                    textColor={"white"}
                  >
                    Cooking Steps
                  </Button>
                </View>
              </>
            ) : (
              <>
                <Dialog
                  visible={secondDialog}
                  title="Per Serving"
                  titleStyle={{
                    fontFamily: "MerchantCopy",
                    fontSize: 36,
                    fontWeight: "500",
                    textAlign: "center",
                    marginHorizontal: 5,
                  }}
                  onTouchOutside={() => {
                    setSecondDialog(false);
                  }}
                  onRequestClose={() => { }}
                  contentInsetAdjustmentBehavior={undefined}
                  animationType="fade"
                  dialogStyle={{ borderRadius: 20, overflowY: "scroll" }}
                >
                  <TouchableOpacity onPress={() => setSecondDialog(false)}>
                    <Text
                      style={{
                        color: secondColour,
                        fontSize: 18,
                        position: "absolute",
                        right: 0,
                        top: -50,
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                  <View>
                    {newList.map((ingredient, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          key={index}
                          style={{
                            color: secondColour,
                            fontSize: 18,
                            marginBottom: 5,
                          }}
                        >
                          {ingredient.name}: {ingredient.quantity * count}{" "}
                          {ingredient.unit}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Dialog>
                <View
                  style={{
                    backgroundColor: firstColour,
                    height: "100%",
                    padding: 15,
                    borderRadius: 10,
                    zIndex: 7,
                    overflowY: "scroll",
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
                      fontSize: 20,
                    }}
                  >
                    You Need More Ingredients {":("}
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
                  <Text
                    style={{
                      textAlign: "center",
                      color: secondColour,
                      fontSize: 18,
                      marginTop: 5,
                    }}
                  >
                    Estimated Cost: {item.estimated_cost! * count}
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
                    onPress={() => {
                      setNewList(item.ingredients_have_per_serving);
                      setSecondDialog(true);
                    }}
                    textColor={"white"}
                  >
                    Total Ingredients
                  </Button>
                  <Button
                    style={{
                      backgroundColor: thirdColour,
                      marginTop: 20,
                      borderRadius: 20,
                    }}
                    onPress={() => {
                      setNewList(item.new_groceries_per_serving || []);
                      setSecondDialog(true);
                    }}
                    textColor={"white"}
                  >
                    New Groceries To Be Added
                  </Button>
                </View>
              </>
            )
          }
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
