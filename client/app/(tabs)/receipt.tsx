import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const receipt = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Text>receipt</Text>
    </SafeAreaView>
  );
};

export default receipt;
