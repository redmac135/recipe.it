import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Image } from "react-native-animatable";

interface HeaderProps {
  name: string;
  back: boolean;
}

const Header = ({ name, back }: HeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo-red.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title} adjustsFontSizeToFit={true}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: "80%", // sets logo width to 80% of its container
    height: undefined, // allows height to scale automatically
    aspectRatio: 3, // adjust this if your logo isn't square
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 36,
    paddingBottom: 10,
    marginBottom: 10,
  },
});

export default Header;
