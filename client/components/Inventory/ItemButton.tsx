import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { KitchenItem } from "@/types/models";
import { useDispatch } from "react-redux";
import KitchenItemEditModal from "./KitchenItemEditModal"

interface ItemButtonProps {
  name: string;
  expiry_date: string;
  unit: string;
  category: string;
  quantity: number;
  handleEdit: () => void;
}

const ItemButton = ({
  name,
  expiry_date,
  unit,
  category,
  quantity,
  handleEdit,
}: ItemButtonProps) => {
  const dispatch = useDispatch();

  return (
    <View style={{ height: 70 }}>
      <View
        style={{
          height: 60,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: Colors.black,
          backgroundColor: Colors.button,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          shadowColor: Colors.gray,
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowRadius: 3,
          shadowOpacity: 1.0,
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
            flex: 7,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: Colors.black,
              fontFamily: "inter",
              fontWeight: "500",
              letterSpacing: 0.5,
            }}
            adjustsFontSizeToFit={true}
            numberOfLines={2}
          >
            {name}
          </Text>
        </View>
        <View
          style={{
            flex: 6,
            flexDirection: "row",
          }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleEdit();
              }}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.countText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                return;
              }}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingLeft: 7,
            }}
          >
            <Text adjustsFontSizeToFit={true} numberOfLines={1}>
              {unit}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#444",
    borderRadius: 20,
    //padding: 10,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 7,
  },
});

export default ItemButton;
