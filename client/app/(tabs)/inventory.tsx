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
    // Load testerItems into Redux state
    dispatch(set(data.testerItems));
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header name="Inventory" back={false} />

      {/* Sort bar */}
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

      {/* Scroll area for inventory sections */}
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortContainer: {
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: "7.5%",
    marginTop: 4,
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 20,
    fontFamily: "inter",
    fontWeight: "500",
    letterSpacing: 0.5,
    marginRight: 20,
  },
  scrollArea: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
});
