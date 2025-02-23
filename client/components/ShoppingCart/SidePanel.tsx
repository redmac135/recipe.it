import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

/** Props:
 *  item: The name or data of the item clicked.
 *  onClose: A function to close the side panel.
 */
interface SidePanelProps {
    item: string | null;
    onClose: () => void;
}

export default function SidePanel({ item, onClose }: SidePanelProps) {
    return (
        <View style={styles.panelContainer}>
            <Text style={styles.title}>Item Details</Text>

            <Text style={styles.itemName}>
                {item ?? "No Item Selected"}
            </Text>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    panelContainer: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "70%",            // Adjust as needed
        backgroundColor: "#fff",
        borderLeftWidth: 1,
        borderLeftColor: "#ccc",
        padding: 20,
        zIndex: 999,
        // Optional shadow on the left edge:
        shadowColor: "#000",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    itemName: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        alignSelf: "flex-start",
        backgroundColor: "#f04a5e", // or your chosen accent
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
});
