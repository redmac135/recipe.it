import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";

const food = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header name={"Recipes"} back={false} />
    </SafeAreaView>
  );
};

export default food;
