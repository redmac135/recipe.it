// index.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import { TextInput } from "react-native-paper";
import * as Animatable from "react-native-animatable";

import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import ItemButton from "@/components/ShoppingCart/ItemButton";
import CustomButton from "@/components/ShoppingCart/ActionButton";
import { useColorScheme } from "@/hooks/useColorScheme";

// Import the new side panel
import SidePanel from "@/components/ShoppingCart/SidePanel";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroceryList,
  acceptGrocerySuggestion,
  addGroceryItem,
  deleteGroceryItem,
} from "@/state/groceryList/grocerySlice";
import { GroceryItem } from "@/types/models";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const dimensions = useWindowDimensions();

  const dispatch = useDispatch<AppDispatch>();
  const groceryList = useSelector(
    (state: RootState) => state.groceryList.groceryList
  );

  // Existing states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<GroceryItem[]>([]);
  const [aiItems, setAiItems] = useState<GroceryItem[]>([]);
  const [error, setError] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [nameText, setNameText] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitText, setUnitText] = useState("");

  useFocusEffect(
    useCallback(() => {
      dispatch(getGroceryList());
    }, [dispatch])
  );

  useEffect(() => {
    console.log(groceryList);
  }, [groceryList]);

  useEffect(() => {
    dispatch(getGroceryList());
  }, [dispatch]);

  useEffect(() => {
    if (!groceryList) return;
    console.log(groceryList);
    setCartItems(groceryList.filter((item) => item.is_approved));
    setAiItems(groceryList.filter((item) => !item.is_approved));
  }, [groceryList]);

  // For side panel
  const [sidePanelVisible, setSidePanelVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<GroceryItem | null>(null);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  // Only for toggling item selection
  function handleToggle(id: string) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  // Move AI items into cart
  function handleAI(id: string) {
    dispatch(acceptGrocerySuggestion(id));
  }

  // Show side panel with the item details
  function handleItemPress(id: string) {
    if (aiItems.some((item) => item.id === id)) {
      handleAI(id);
    } else {
      handleToggle(id);
    }
  }

  function handleInfoPress(id: string) {
    setCurrentItem(groceryList.find((item) => item.id === id) || null);
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
          setQuantity(0);
          setUnitText("");
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
                width: dimensions.width * 0.65,
              }}
            />
            <TextInput
              mode="flat"
              placeholder="Quantity"
              placeholderTextColor={theme.gray}
              onChangeText={(text: string) => setQuantity(parseInt(text))}
              activeOutlineColor={theme.accentRed}
              outlineColor={theme.gray}
              textColor="black"
              style={{
                backgroundColor: theme.white,
                width: dimensions.width * 0.65,
                marginVertical: 10,
              }}
            />
            <TextInput
              mode="flat"
              placeholder="Unit"
              placeholderTextColor={theme.gray}
              value={unitText}
              onChangeText={(text: string) => setUnitText(text)}
              activeOutlineColor={theme.accentRed}
              outlineColor={theme.gray}
              textColor="black"
              style={{
                backgroundColor: theme.white,
                width: dimensions.width * 0.65,
              }}
            />
          </View>
          <View style={styles.dialogErrorContainer}>
            {error && (
              <Text style={{ fontSize: 13, color: "red", marginLeft: "10%" }}>
                Please Enter A Name, Quantity, and Unit.
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
                const newItem = {
                  name: nameText,
                  quantity: quantity,
                  unit: unitText,
                  is_approved: true,
                };
                dispatch(addGroceryItem(newItem));
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
            key={item.id}
            animation="fadeInUp"
            duration={500}
            delay={index * 100}
          >
            <ItemButton
              item={item}
              selected={selectedIds.includes(item.id)}
              ai={false}
              // Press calls side panel
              onPress={() => handleItemPress(item.id)}
              onInfo={handleInfoPress}
            />
          </Animatable.View>
        ))}

        {aiItems.map((item, index) => (
          <Animatable.View
            key={item.id}
            animation="fadeInUp"
            duration={500}
            delay={(cartItems.length + index) * 100}
          >
            <ItemButton
              item={item}
              // AI items not in selectedItems, so "selected" is false
              selected={false}
              ai={true}
              // Press calls side panel
              onPress={() => handleItemPress(item.id)}
              onInfo={handleInfoPress}
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
            for (let id of selectedIds) {
              dispatch(deleteGroceryItem(id));
            }
            setSelectedIds([]);
          }}
          bottom={0}
        />
      </View>

      {/* Conditionally render side panel if visible */}
      {sidePanelVisible && currentItem && (
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
    marginBottom: 60,
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
  },
  dialogErrorContainer: {
    width: "90%",
    height: 30,
    alignItems: "center",
    flexDirection: "row",
  },
});
