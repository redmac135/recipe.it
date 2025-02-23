// index.tsx
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import { TextInput } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import data from "@/constants/item_data";
import ItemButton from "@/components/ShoppingCart/ItemButton";
import CustomButton from "@/components/ShoppingCart/ActionButton";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>(data.items);
  const [aiItems, setAiItems] = useState<string[]>(["Feta Cheese", "Provolone"]);
  const [error, setError] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [nameText, setNameText] = useState("");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Dialog for adding a new item */}
      <Dialog
        visible={dialog}
        title="Name of New Preset"
        titleStyle={styles.dialog}
        onTouchOutside={() => {
          setDialog(false);
          setError(false);
          setNameText("");
        }}
        onRequestClose={() => { }}
        contentInsetAdjustmentBehavior={undefined}
        animationType="fade"
        dialogStyle={{ borderRadius: 20 }}
      >
        <View style={styles.dialogContent}>
          <View style={styles.dialogRow}>
            <TextInput
              mode="flat"
              placeholder="Type Here..."
              placeholderTextColor={theme.gray}
              value={nameText} // Ensure controlled input
              onChangeText={(text: string) => setNameText(text)}
              activeOutlineColor={theme.accentRed}
              outlineColor={theme.gray}
              textColor="black"
              style={{
                backgroundColor: theme.white,
                width: "90%",
              }}
            />
          </View>
          <View style={styles.dialogErrorContainer}>
            {error && (
              <Text style={{ fontSize: 13, color: "red", marginLeft: "10%" }}>
                Please Enter A Name.
              </Text>
            )}
          </View>
          <CustomButton
            text="Add Item"
            backgroundColor={theme.accentRed}
            bottom={0}
            onPress={() => {
              if (nameText.length === 0) setError(true);
              else {
                setCartItems([...cartItems, nameText]);
                setDialog(false);
              }
            }}
          />
        </View>
      </Dialog>

      <Header name="Shopping List" back={false} />

      {/* Scrollable list of items */}
      <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {cartItems.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={500}
            delay={index * 100}
          >
            <ItemButton
              name={item}
              selected={selectedItems.includes(item)}
              onPress={() => handleToggle(item)}
              ai={false}
            />
          </Animatable.View>
        ))}

        {aiItems.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={500}
            delay={(cartItems.length + index) * 100}
          >
            <ItemButton
              name={item}
              onPress={() => handleAI(item)}
              ai={true}
            />
          </Animatable.View>
        ))}
      </ScrollView>

      {/* Buttons at the bottom */}
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Add Item"
          backgroundColor={theme.accentRed}
          onPress={() => setDialog(true)}
          bottom={0}
        />
        <CustomButton
          text="Remove Selected Items"
          backgroundColor={theme.accentRed}
          onPress={() => {
            setCartItems(cartItems.filter((item) => !selectedItems.includes(item)));
            setSelectedItems([]);
          }}
          bottom={0}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
    marginHorizontal: 30,
  },
  buttonContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  dialog: {
    fontFamily: "inter",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 5,
  },
  dialogContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  dialogRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dialogErrorContainer: {
    width: "90%",
    height: 30,
    alignItems: "center",
    flexDirection: "row",
  },
});
