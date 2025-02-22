import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Checkbox } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ButtonProps {
  name: string;
  selected?: boolean;
  days_to_expire?: number;
  onPress: () => void;
  ai: boolean;
}

const ItemButton = ({
  name,
  selected,
  days_to_expire,
  onPress,
  ai,
}: ButtonProps) => {
  return (
    <View style={{ width: "100%", height: 70 }}>
      <View
        style={{
          width: "100%",
          height: 60,
          borderRadius: 40,
          borderWidth: 1,
          borderColor: ai ? Colors.activity : Colors.black,
          backgroundColor: ai ? Colors.white : Colors.button,
          justifyContent: "center",
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
        >
          {ai ? (
            <MaterialIcons
              name="add"
              size={20}
              color={Colors.activity}
              onPress={onPress}
            />
          ) : (
            <View
              style={{
                borderWidth: 0.7,
                borderColor: Colors.black,
                borderRadius: 50,
              }}
            >
              <Checkbox
                status={selected ? "checked" : "unchecked"}
                onPress={onPress}
                color={Colors.black}
              />
            </View>
          )}
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: ai ? Colors.activity : Colors.black,
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
            flex: 1,
          }}
        ></View>
      </View>
    </View>
  );
};

export default ItemButton;
