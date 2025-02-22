import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Section from "@/components/Inventory/Section";
import data from "../../constants/item_data";
import { ButtonProps } from "@/components/Inventory/ItemButton";

export default function Inventory() {
  const [items, setItems] = useState<
    {
      name: string;
      expiry_date: string;
      ai: boolean;
      category: string;
      quantity: number;
      original_index?: number;
    }[]
  >(data.testerItems);

  useEffect(() => {
    items.forEach((item, index) => {
      let newItems = Array.from(items);
      newItems[index].original_index = index;
      setItems(newItems);
    });
  }, []);

  const categories = ["Pantry", "Fridge", "Freezer"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header name={"Inventory"} back={false} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView style={{ width: "85%" }}>
          {categories.map((category, index) => {
            return (
              <Section
                key={index}
                name={category}
                allItems={items}
                items={items.filter((value) => value.category === category)}
                setItems={() => setItems}
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
