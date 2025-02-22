import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

interface HeaderProps {
  name: string;
  back: boolean;
}

const Header = ({ name, back }: HeaderProps) => {
  const router = useRouter();

  return (
    <View
      style={{
        height: "12%",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {back ? (
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back"
              size={30}
              style={{ marginLeft: 30 }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          flex: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title} adjustsFontSizeToFit={true}>
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
