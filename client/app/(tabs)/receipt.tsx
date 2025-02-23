// receipt.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import StartButton from "@/components/Receipt/StartButton";
import { useColorScheme } from "@/hooks/useColorScheme";

const Receipt = () => {
  const dimensions = useWindowDimensions();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>(
    undefined
  );
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    uploadImage();
  }, [image]);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function takeImage() {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
      });
      if (!result.canceled) {
        setImage(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadImage() {
    if (!image) {
      return;
    }

    console.log(image);

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}receipts/upload-receipt/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_base64: image.uri.split(",")[1],
          }),
        }
      );

      if (response.ok) {
        console.log("Receipt uploaded successfully!");
      } else {
        console.log("Error uploading receipt.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header name="Scan Receipt" back={false} />
      <Animatable.View animation="fadeIn" duration={600} style={{ flex: 1 }}>
        <Menu
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <MenuTrigger
            style={{
              height: dimensions.height / 4,
              width: dimensions.height / 4,
            }}
          >
            <StartButton done={false} />
          </MenuTrigger>
          <MenuOptions
            optionsContainerStyle={{
              position: "absolute",
              borderWidth: 1,
              borderColor: theme.white,
              backgroundColor: theme.background,
              borderRadius: 6,
            }}
          >
            <MenuOption onSelect={() => takeImage()} text="Camera" />
            <MenuOption onSelect={() => pickImage()} text="Library" />
          </MenuOptions>
        </Menu>

        <View style={styles.imageContainer}>
          <Text style={[styles.title, { color: theme.white, marginTop: 35  }]}>Picture:</Text>
          {image ? (
            <Image
              source={image}
              style={{
                maxHeight: "80%",
                maxWidth: "75%",
                resizeMode: "contain",
              }}
            />
          ) : (
            <Text style={[styles.subtitle, { color: theme.white }]}>
              Please Scan{"\n"}Your Receipt!
            </Text>
          )}
        </View>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "500",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "400",
  },
});

export default Receipt;
