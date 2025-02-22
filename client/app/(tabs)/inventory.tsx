import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Section from "@/components/Inventory/Section";
import data from "../../constants/item_data";
import { RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { ButtonProps, set } from "@/state/inventory/inventorySlice";

export default function Inventory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(set(data.testerItems));
  });

  const categories = ["Pantry", "Fridge", "Freezer"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header name={"Inventory"} back={false} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView style={{ width: "85%" }}>
          {categories.map((category, index) => {
            return <Section key={index} name={category} alphabetical={false} />;
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
