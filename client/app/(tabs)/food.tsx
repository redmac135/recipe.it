import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const food = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Text>food</Text>
    </SafeAreaView>
  );
};

export default food;
