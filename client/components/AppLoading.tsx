import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import Colors from "../constants/Colors";

const AppLoading = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={Colors.activity} />
    </View>
  );
};

export default AppLoading;
