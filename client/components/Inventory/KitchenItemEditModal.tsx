import { KitchenItem, KitchenItemCategoryEnum } from "@/types/models";
import React, { useEffect, useState } from "react";
import { Modal, Text, TextInput, View, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"


type KitchenItemEditProps = {
  visible: boolean;
  onClose: () => void;
  kitchenItem: KitchenItem | null;
  onSave: (item: KitchenItem) => void;
};

const KitchenItemEditPopup: React.FC<KitchenItemEditProps> = ({ visible, onClose, kitchenItem, onSave }) => {
  const [name, setName] = useState(kitchenItem?.name || "");
  const [quantity, setQuantity] = useState(kitchenItem?.quantity?.toString() || "");
  const [unit, setUnit] = useState(kitchenItem?.unit || "");
  const [category, setCategory] = useState(kitchenItem?.category || KitchenItemCategoryEnum.PANTRY); // Default category
  const [expiryDate, setExpiryDate] = useState(kitchenItem?.expiry_date || "");

  useEffect(() => {
    setName(kitchenItem?.name || "");
    setQuantity(kitchenItem?.quantity?.toString() || "");
    setUnit(kitchenItem?.unit || "");
    setCategory(kitchenItem?.category || KitchenItemCategoryEnum.PANTRY);
    setExpiryDate(kitchenItem?.expiry_date || "");
  }, [kitchenItem]);

  const handleSave = () => {
    if (name && quantity && unit && expiryDate) {
      const updatedItem: KitchenItem = {
        ...kitchenItem!,
        name,
        quantity: parseFloat(quantity),
        unit,
        category,
        expiry_date: expiryDate,
      };
      onSave(updatedItem);
      onClose(); // Close the modal
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Edit Kitchen Item</Text>

          <Text>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text>Quantity</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />

          <Text>Unit</Text>
          <TextInput
            style={styles.input}
            value={unit}
            onChangeText={setUnit}
          />

          <Text>Category</Text>
          <Picker
            selectedValue={category}
            style={styles.input}
            onValueChange={(itemValue) => setCategory(itemValue as KitchenItemCategoryEnum)}
          >
            {Object.values(KitchenItemCategoryEnum).map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>

          <Text>Expiry Date</Text>
          <TextInput
            style={styles.input}
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="YYYY-MM-DD"
          />

          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default KitchenItemEditPopup;
