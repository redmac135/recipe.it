import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ItemButton, { ButtonProps } from "./ItemButton";
import Colors from "../../constants/Colors";

interface SectionProps {
  name: string;
  items: Array<ButtonProps>;
  allItems: Array<ButtonProps>;
  setItems: () => void;
}

const Section = ({ name, items, setItems, allItems }: SectionProps) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.categoryTitle}>{name}</Text>
      {items.map((item, index) => (
        <ItemButton
          key={index}
          quantity={item.quantity}
          original_index={item.original_index!}
          items={allItems}
          name={item.name}
          expiry_date={item.expiry_date}
          setItems={setItems}
          ai={item.ai}
          category={item.category}
        />
      ))}
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
