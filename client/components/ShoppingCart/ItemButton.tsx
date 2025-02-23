// ItemButton.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Checkbox } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ButtonProps {
  name: string;
  selected?: boolean;
  days_to_expire?: number;
  onPress: () => void;
  ai: boolean;
}

const ItemButton = ({ name, selected, onPress, ai }: ButtonProps) => {
  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.innerContainer,
          {
            borderColor: ai ? Colors.light.activity : Colors.light.black,
            backgroundColor: ai ? Colors.light.white : Colors.light.button,
          },
        ]}
      >
        {/* Left: Add icon or checkbox */}
        <View style={styles.leftSection}>
          {ai ? (
            <MaterialIcons
              name="add"
              size={20}
              color={Colors.light.activity}
              onPress={onPress} // Press triggers side panel for AI items
            />
          ) : (
            <View style={styles.checkboxBorder}>
              <Checkbox
                status={selected ? "checked" : "unchecked"}
                onPress={onPress} // Press triggers side panel for normal items
                color={Colors.light.black}
              />
            </View>
          )}
        </View>

        {/* Middle: Item name */}
        <View style={styles.middleSection}>
          <Text
            style={[
              styles.itemText,
              { color: ai ? Colors.light.activity : Colors.light.black },
            ]}
            adjustsFontSizeToFit={true}
            numberOfLines={2}
          >
            {name}
          </Text>
        </View>

        {/* Right: empty space */}
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: 70,
    marginBottom: 10,
  },
  innerContainer: {
    width: "100%",
    height: 60,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: Colors.light.gray,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 1.0,
  },
  leftSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBorder: {
    borderWidth: 0.7,
    borderColor: Colors.light.black,
    borderRadius: 50,
  },
  middleSection: {
    flex: 4,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});

export default ItemButton;
