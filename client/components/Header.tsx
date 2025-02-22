import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface HeaderProps {
  name: string;
  back: boolean;
}

const Header = ({ name, back }: HeaderProps) => {
  return (
    <View
      style={{
        height: "15%",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      ></View>
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "inter",
            fontWeight: "bold",
          }}
          adjustsFontSizeToFit={true}
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontFamily: "inter",
    fontWeight: "500",
    fontSize: 36,
  },
});

export default Header;
