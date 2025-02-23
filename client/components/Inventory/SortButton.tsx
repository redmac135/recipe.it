import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const SortButton = ({
  selected,
  text,
  onPress,
}: {
  selected: boolean;
  text: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 40,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: selected ? Colors.light.activity : Colors.light.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light.activity,
      }}
    >
      <Text
        style={{
          color: selected ? Colors.light.white : Colors.light.activity,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SortButton;
