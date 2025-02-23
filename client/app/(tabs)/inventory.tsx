// inventory.tsx
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";

import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import Section from "@/components/Inventory/Section";
import data from "../../constants/item_data";
import { useDispatch } from "react-redux";
import { set } from "@/state/inventory/inventorySlice";
import SortButton from "@/components/Inventory/SortButton";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function Inventory() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Alphabetical");
  const categories = ["Pantry", "Fridge", "Freezer"];

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    dispatch(set(data.testerItems));
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header name="Inventory" back={false} />
      <View style={styles.sortContainer}>
        <Text style={[styles.sortLabel, { color: theme.white }]}>Sort By:</Text>
        <SortButton
          text="Alphabetical"
          selected={selected === "Alphabetical"}
          onPress={() => setSelected("Alphabetical")}
        />
        <SortButton
          text="Expiry"
          selected={selected === "Expiry"}
          onPress={() => setSelected("Expiry")}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView style={{ width: "85%" }} showsVerticalScrollIndicator={false}>
          {categories.map((category, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={500}
              delay={index * 200}
            >
              <Section name={category} alphabetical={selected === "Alphabetical"} />
            </Animatable.View>
          ))}
        </ScrollView>
        <View style={{ height: 60 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortContainer: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: "7.5%",
    marginTop: -4,
    marginBottom: 15,
  },
  sortLabel: {
    fontSize: 24,
    fontFamily: "inter",
    fontWeight: "500",
    letterSpacing: 0.5,
    marginRight: 20,
  },
});
