import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFonts } from "expo-font";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a7ea4",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="inventory" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="mic" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="receipt"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="receipt" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="restaurant" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
