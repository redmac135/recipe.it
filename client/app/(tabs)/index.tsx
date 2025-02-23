// index.tsx
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import { TextInput } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import data from "@/constants/item_data";
import ItemButton from "@/components/ShoppingCart/ItemButton";
import CustomButton from "@/components/ShoppingCart/ActionButton";
import { useColorScheme } from "@/hooks/useColorScheme";

// Import the new side panel
import SidePanel from "@/components/ShoppingCart/SidePanel";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { getGroceryList } from "@/state/groceryList/grocerySlice";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const groceryList = useSelector(
    (state: RootState) => state.groceryList
  ).groceryList;

  // Existing states
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>(data.items);
  const [aiItems, setAiItems] = useState<string[]>([
    "Feta Cheese",
    "Provolone",
  ]);
  const [error, setError] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [nameText, setNameText] = useState("");
  const [unitText, setUnitText] = useState("");

  useEffect(() => {
    const grocery = async () => await dispatch(getGroceryList());

    grocery().then((result) => {
      console.log(result);
      // For now, we'll just add all items to cart and AI
      setCartItems(groceryList.map((item) => item.name));
      setAiItems([]);
    });
  }, [dispatch]);
  // For side panel
  const [sidePanelVisible, setSidePanelVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // Only for toggling item selection
  function handleToggle(name: string) {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter((item) => item !== name));
    } else {
      setSelectedItems([...selectedItems, name]);
    }
  }

  // Move AI items into cart
  function handleAI(name: string) {
    setAiItems(aiItems.filter((item) => item !== name));
    setCartItems([...cartItems, name]);
  }

  // Show side panel with the item details
  function handleItemPress(itemName: string) {
    // You can also incorporate handleToggle or handleAI if needed
    // e.g. handleToggle(itemName) or handleAI(itemName)

    // For example, let's do selection toggling for normal items, AI logic for AI items:
    if (aiItems.includes(itemName)) {
      handleAI(itemName);
    } else {
      handleToggle(itemName);
    }

    // Then open side panel with the item
    setCurrentItem(itemName);
    setSidePanelVisible(true);
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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
        onRequestClose={() => {}}
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
              value={nameText}
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
              if (nameText.length === 0) {
                setError(true);
              } else {
                setCartItems([...cartItems, nameText]);
                setDialog(false);
              }
            }}
          />
        </View>
      </Dialog>

      <Header name="Shopping List" back={false} />

      {/* Scrollable list of items */}
      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        {groceryList.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={500}
            delay={index * 100}
          >
            <ItemButton
              name={item.name}
              selected={selectedItems.includes(item.name)}
              ai={false}
              // Press calls side panel
              onPress={() => handleItemPress(item.name)}
            />
          </Animatable.View>
        ))}

        {aiItems.map((item, index) => (
          <Animatable.View
            key={item}
            animation="fadeInUp"
            duration={500}
            delay={(cartItems.length + index) * 100}
          >
            <ItemButton
              name={item}
              // AI items not in selectedItems, so "selected" is false
              selected={false}
              ai={true}
              // Press calls side panel
              onPress={() => handleItemPress(item)}
            />
          </Animatable.View>
        ))}
      </ScrollView>

      {/* Bottom buttons - DO NOT trigger side panel */}
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
            setCartItems(
              cartItems.filter((item) => !selectedItems.includes(item))
            );
            setSelectedItems([]);
          }}
          bottom={0}
        />
      </View>

      {/* Conditionally render side panel if visible */}
      {sidePanelVisible && (
        <SidePanel
          item={currentItem}
          onClose={() => setSidePanelVisible(false)}
        />
      )}
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
