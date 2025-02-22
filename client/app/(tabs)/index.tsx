import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import {
  Text,
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import data from "@/constants/item_data";
import ItemButton from "@/components/ShoppingCart/ItemButton";
import { useState } from "react";
import CustomButton from "@/components/ShoppingCart/ActionButton";
import { Dialog } from "react-native-simple-dialogs";
import { TextInput } from "react-native-paper";

export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>(data.items);
  const [aiItems, setAiItems] = useState<string[]>([
    "Feta Cheese",
    "Provolone",
  ]);

  const [error, setError] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [nameText, setNameText] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Dialog
        visible={dialog}
        title="Name of New Preset"
        titleStyle={styles.dialog}
        onTouchOutside={() => {
          setDialog(false);
          setError(false);
          setNameText("");
        }}
        onRequestClose={() => {}}
        contentInsetAdjustmentBehavior={undefined}
        animationType="fade"
        dialogStyle={{ borderRadius: 20 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TextInput
              mode="flat"
              placeholder={"Type Here..."}
              placeholderTextColor={Colors.gray}
              onChangeText={(text: string) => {
                setNameText(text);
              }}
              activeOutlineColor={Colors.activity}
              outlineColor={Colors.gray}
              textColor="black"
              style={{
                backgroundColor: Colors.white,
                width: "90%",
              }}
            ></TextInput>
          </View>
          <View
            style={{
              width: "90%",
              height: 30,

              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {error && (
              <Text style={{ fontSize: 13, color: "red", marginLeft: "10%" }}>
                Please Enter A Name.
              </Text>
            )}
          </View>
          <CustomButton
            text="Add Item"
            bottom={0}
            backgroundColor={Colors.white}
            onPress={() => {
              // Error checking and confirmation alert
              if (nameText.length == 0) setError(true);
              else {
                setCartItems([...cartItems, nameText]);
                setDialog(false);
              }
            }}
          />
        </View>
      </Dialog>
      <Header name={"Shopping List"} back={false} />
      <ScrollView
        style={{ marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item, index) => (
          <ItemButton
            key={index}
            name={item}
            selected={selectedItems.includes(item) ? true : false}
            onPress={() => {
              handleToggle(item);
            }}
            ai={false}
          />
        ))}
        {aiItems.map((item, index) => (
          <ItemButton
            key={index}
            name={item}
            onPress={() => {
              handleAI(item);
            }}
            ai={true}
          />
        ))}
      </ScrollView>
      <View style={{ alignItems: "center", marginBottom: "20%" }}>
        <CustomButton
          text="Add Item"
          backgroundColor={Colors.activity}
          onPress={() => {
            setDialog(true);
          }}
          bottom={140}
        />
        <CustomButton
          text="Remove Selected Items"
          backgroundColor={Colors.activity}
          onPress={() => {
            setCartItems(
              cartItems.filter((item) => !selectedItems.includes(item))
            );
            setSelectedItems([]);
          }}
          bottom={60}
        />
      </View>
    </SafeAreaView>
  );

  function handleToggle(name: string) {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    } else {
      setSelectedItems([...selectedItems, name]);
    }
  }

  function handleAI(name: string) {
    setAiItems(aiItems.filter((item) => item !== name));
    setCartItems([...cartItems, name]);
  }
}

const styles = StyleSheet.create({
  dialog: {
    fontFamily: "inter",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 5,
  },
});
