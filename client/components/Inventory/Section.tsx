import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ItemButton from "./ItemButton";
import Colors from "../../constants/Colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { KitchenItem } from "@/types/models";

interface SectionProps {
  name: string;
  alphabetical: boolean;
  handleEdit: (item: KitchenItem) => void;
}

const Section = ({ name, alphabetical, handleEdit }: SectionProps) => {
  const inventoryList = useSelector(
    (state: RootState) => state.inventoryList
  ).inventoryList;

  const [newList, setNewList] = useState<KitchenItem[]>([]);

  useEffect(() => {
    let tempList = Array.from(inventoryList);

    if (alphabetical) {
      tempList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      tempList.sort((a, b) => a.expiry_date.localeCompare(b.expiry_date));
    }
    setNewList(tempList);
  }, [inventoryList, alphabetical]);

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.categoryTitle}>{name}</Text>
      {newList.map((item, index) =>
        item.category == name ? (
          <ItemButton
            key={index}
            unit={item.unit}
            quantity={item.quantity}
            name={item.name}
            expiry_date={item.expiry_date}
            category={item.category}
            handleEdit={() => handleEdit(item)}
          />
        ) : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    color: Colors.light.black,
    fontSize: 24,
    fontFamily: "inter",
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default Section;
