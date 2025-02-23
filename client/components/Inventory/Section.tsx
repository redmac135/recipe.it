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

    alphabetical
      ? setNewList(tempList.sort((a, b) => a.name.localeCompare(b.name)))
      : setNewList(
        tempList.sort((a, b) => a.expiry_date.localeCompare(b.expiry_date))
      );
  }, [inventoryList, alphabetical]);

  return (
    <View style={{ marginBottom: 20 }}>
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
  categoryTitle: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: "inter",
    fontWeight: "600",
    marginBottom: 10,
  },
});

export default Section;
