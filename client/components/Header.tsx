import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
      <View style={styles.backContainer}>
        {back ? (
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={30} style={{ marginLeft: 30 }} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} adjustsFontSizeToFit={true}>
          {name}
        </Text>
      </View>
      <View style={styles.emptySpace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "80%",      // sets logo width to 80% of its container
    height: undefined, // allows height to scale automatically
    aspectRatio: 1,    // adjust this if your logo isn't square
  },
  backContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  emptySpace: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "500",
    fontSize: 36,
  },
});

export default Header;
