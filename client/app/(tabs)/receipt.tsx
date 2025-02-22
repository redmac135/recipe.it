import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";

const receipt = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header name={"Scan Receipt"} back={false} />
    </SafeAreaView>
  );
};

export default receipt;
