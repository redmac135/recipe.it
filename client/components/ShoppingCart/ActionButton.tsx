import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

interface CustomButtonProps {
  text: string;
  backgroundColor: string;
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
      style={{
        width: "75%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        backgroundColor: Colors.activity,
        height: 60,
      }}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
});

export default CustomButton;
