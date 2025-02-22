import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ItemButton from "./ItemButton";
import Colors from "../../constants/Colors";
import { ButtonProps } from "@/state/inventory/inventorySlice";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface SectionProps {
  name: string;
}

const Section = ({ name }: SectionProps) => {
  const inventoryList = useSelector(
    (state: RootState) => state.inventoryList
  ).inventoryList;

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.categoryTitle}>{name}</Text>
      {inventoryList.map((item, index) =>
        item.category === name ? (
          <ItemButton
            key={index}
            unit={item.unit}
            quantity={item.quantity}
            name={item.name}
            expiry_date={item.expiry_date}
            category={item.category}
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
    fontWeight: "500",
    marginBottom: 10,
  },
});

export default Section;
