import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Item {
    title: string;
    body: string;
}

interface SidePanelProps {
    item: Item | null;
    onClose: () => void;
}

export default function SidePanel({ item, onClose }: SidePanelProps) {
    return (
        <View style={styles.panelContainer}>
            <Text style={styles.title}>
                {item ? item.title : "No Item Selected"}
            </Text>
            <Text style={styles.body}>
                {item ? item.body : ""}
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
        width: "70%",
        backgroundColor: "#fff",
        borderLeftWidth: 1,
        borderLeftColor: "#ccc",
        padding: 20,
        zIndex: 999,
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
    body: {
        fontSize: 16,
        marginBottom: 20,
        color: "#333",
    },
    closeButton: {
        alignSelf: "flex-start",
        backgroundColor: "#f04a5e",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
});
