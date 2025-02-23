import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

interface ItemButtonProps {
  name: string;
  expiry_date: string;
  unit: string;
  category: string;
  quantity: number;
  handleEdit: () => void;
}

const ItemButton = ({
  name,
  expiry_date,
  unit,
  category,
  quantity,
  handleEdit,
}: ItemButtonProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {/* Left spacer (if you want icons or something else, place here) */}
        <View style={styles.leftSection} />

        {/* Middle: Item name */}
        <View style={styles.nameSection}>
          <Text style={styles.itemName} numberOfLines={2}>
            {name}
          </Text>
        </View>

        {/* Right: +/- quantity controls */}
        <View style={styles.quantitySection}>
          <View style={styles.counterContainer}>
            <Text style={styles.countText}>{quantity} {unit}</Text>
            <Button
              title="Edit"
              onPress={() => {
                handleEdit();
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: 70,
    marginBottom: 10, // space between items
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.light.black,
    backgroundColor: Colors.light.button,
    alignItems: "center",
    shadowColor: Colors.light.gray,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1.0,
    paddingHorizontal: 10,
  },
  leftSection: {
    flex: 1,
  },
  nameSection: {
    flex: 7,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  itemName: {
    fontSize: 20,
    color: Colors.light.black,
    fontFamily: "inter",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  quantitySection: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#444",
    borderRadius: 20,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 7,
  },
  unitContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 7,
  },
});

export default ItemButton;
