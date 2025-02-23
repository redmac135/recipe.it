import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import Header from "@/components/Header";
import StartButton from "@/components/Receipt/StartButton";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import * as ImagePicker from "expo-image-picker";

const receipt = () => {
  const dimensions = useWindowDimensions();
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | undefined>(
    undefined
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Header name={"Scan Receipt"} back={false} />
      <View style={{ flex: 1 }}>
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
              borderColor: "black",
            }}
          >
            <MenuOption onSelect={() => takeImage()} text="Camera" />
            <MenuOption
              onSelect={() => pickImage()}
              text="Library"
            ></MenuOption>
          </MenuOptions>
        </Menu>
        <View
          style={{
            flex: 2,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Picture:</Text>
          {image ? (
            <Image
              source={image}
              style={{
                maxHeight: "80%",
                maxWidth: "75%",
                objectFit: "contain",
              }}
            />
          ) : (
            <Text style={styles.subtitle}>Please Scan{"\n"}Your Receipt!</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    console.log(result);
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
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 34,
    color: Colors.black,
    fontFamily: "inter",
    fontWeight: "500",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    textAlign: "center",
    color: Colors.black,
    fontFamily: "inter",
    fontWeight: "400",
  },
});

export default receipt;
