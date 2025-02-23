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
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryList, editInventoryItem } from "@/state/inventory/inventorySlice";
import SortButton from "@/components/Inventory/SortButton";
import { KitchenItem, KitchenItemCategoryEnum } from "@/types/models";
import KitchenItemEditModal from "@/components/Inventory/KitchenItemEditModal";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function Inventory() {

  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState("Alphabetical");
  const categories = [KitchenItemCategoryEnum.PANTRY, KitchenItemCategoryEnum.FREEZER, KitchenItemCategoryEnum.FRIDGE];

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<KitchenItem | null>(null);

  const handleEdit = (item: KitchenItem) => {
    console.log(item);
    setCurrentItem(item);
    setModalVisible(true);
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const handleSave = (item: KitchenItem) => {
    dispatch(editInventoryItem(item));
    setModalVisible(false);
  }

  useEffect(() => {
    dispatch(getInventoryList());
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KitchenItemEditModal visible={isModalVisible} onClose={handleCloseModal} kitchenItem={currentItem} onSave={handleSave} />
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
              <Section name={category} alphabetical={selected === "Alphabetical"} handleEdit={handleEdit} />
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
