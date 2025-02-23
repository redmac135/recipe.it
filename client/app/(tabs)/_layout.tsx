// _layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.accentRed,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: theme.background,
          },
          android: {
            backgroundColor: theme.background,
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="inventory" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="suggestions"
        options={{
          title: "AI",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="mic" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="receipt"
        options={{
          title: "Receipt",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="receipt" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: "Food",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={22} name="restaurant" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};