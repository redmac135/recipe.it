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
        backgroundColor: selected ? Colors.activity : Colors.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.activity,
      }}
    >
      <Text style={{ color: !selected ? Colors.activity : Colors.white }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SortButton;
