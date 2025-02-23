import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Button } from "react-native-paper";

const StartButton = ({ done }: { done: boolean }) => {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 20,
        flex: 1,
        backgroundColor: Colors.teal,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 24,
          color: Colors.white,
          fontWeight: "bold",
        }}
      >
        Press The Comically Large Button To Take Your Picture
      </Text>
    </View>
  );
};

export default StartButton;
