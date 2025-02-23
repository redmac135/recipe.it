import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Section from "@/components/Inventory/Section";
import data from "../../constants/item_data";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryList, editInventoryItem } from "@/state/inventory/inventorySlice";
import SortButton from "@/components/Inventory/SortButton";
import { KitchenItem, KitchenItemCategoryEnum } from "@/types/models";
import KitchenItemEditModal from "@/components/Inventory/KitchenItemEditModal";

/** 
  Inventory Screen For The App
*/
export default function Inventory() {
  const dispatch = useDispatch<AppDispatch>();

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
  });

  const [selected, setSelected] = useState("Alphabetical");

  const categories = [KitchenItemCategoryEnum.PANTRY, KitchenItemCategoryEnum.FREEZER, KitchenItemCategoryEnum.FRIDGE];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <KitchenItemEditModal visible={isModalVisible} onClose={handleCloseModal} kitchenItem={currentItem} onSave={handleSave} />
      <Header name={"Inventory"} back={false} />
      <View
        style={{
          height: 60,
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: "7.5%",
          marginTop: -4,
          marginBottom: 15,
        }}
      >
        <View
          style={{
            marginRight: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: Colors.black,
              fontFamily: "inter",
              fontWeight: "500",
              letterSpacing: 0.5,
            }}
          >
            Sort By:
          </Text>
        </View>
        <SortButton
          text={"Alphabetical"}
          selected={selected === "Alphabetical" ? true : false}
          onPress={() => setSelected("Alphabetical")}
        />
        <SortButton
          text={"Expiry"}
          selected={selected === "Expiry" ? true : false}
          onPress={() => setSelected("Expiry")}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView
          style={{ width: "85%" }}
          showsVerticalScrollIndicator={false}
        >
          {categories.map((category, index) => {
            return (
              <Section
                key={index}
                name={category}
                alphabetical={selected === "Alphabetical"}
                handleEdit={handleEdit}
              />
            );
          })}
        </ScrollView>
        <View style={{ height: 60 }} />
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
