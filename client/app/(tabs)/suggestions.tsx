// suggestions.tsx
import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import { useColorScheme } from "@/hooks/useColorScheme";

const Suggestions = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header name="AI Suggestions" back={false} />
      <Animatable.View animation="fadeInUp" duration={700} style={styles.inner}>
        <Text style={[styles.title, { color: theme.white }]}>AI Suggestions</Text>
        {/* Add your AI content here */}
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
  },
});

export default Suggestions;
