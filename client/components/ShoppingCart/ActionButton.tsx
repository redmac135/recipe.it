// CustomButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

interface CustomButtonProps {
  text: string;
  backgroundColor?: string;
  onPress: () => void;
  bottom: number;
}

const CustomButton = ({
  text,
  backgroundColor,
  onPress,
  bottom,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        {
          backgroundColor: backgroundColor || Colors.light.activity,
          marginBottom: bottom,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "75%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
});

export default CustomButton;
