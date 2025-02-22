import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header name={"Inventory"} back={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
