import { RootState } from "@/state/store";
import { GroceryItem, Recipe } from "@/types/models";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

interface SidePanelProps {
    item: GroceryItem;
    onClose: () => void;
}

export default function SidePanel({ item, onClose }: SidePanelProps) {
    const recipes = useSelector((state: RootState) => state.recipeList.recipeList);
    const [ingredients, setIngredients] = useState<string[]>([]);

    useEffect(() => {
        if (item.recipe_name) {
            const recipe = recipes.find((recipe: Recipe) => recipe.name === item.recipe_name);
            const ingredientList: string[] = [];
            if (recipe) {
                for (const ingr of recipe.ingredients_have_per_serving) {
                    ingredientList.push(ingr.name);
                }
                if (recipe.existing_groceries_per_serving) {
                    for (const ingr of recipe.existing_groceries_per_serving) {
                        ingredientList.push(ingr.name);
                    }
                }
                if (recipe.new_groceries_per_serving) {
                    for (const ingr of recipe.new_groceries_per_serving) {
                        ingredientList.push(ingr.name);
                    }
                }
                setIngredients(ingredientList);
            }
        }
    }, [recipes, item.recipe_name]);

    return (
        <View style={styles.panelContainer}>
            <Text style={styles.title}>{item.name}</Text>

            <Text style={styles.itemName}>{item.id}</Text>

            {item.ai_reason ? (
                <View style={styles.blueBox}>
                    <Text style={styles.itemSubtitle}>
                        {item.ai_reason === "LOW_QUANTITY"
                            ? "You are running low on this item"
                            : item.ai_reason === "AI_OTHER"
                                ? "AI recommends this item."
                                : item.ai_reason === "COMPLETE_RECIPE" && item.recipe_name
                                    ? `You are a few ingredients away from ${item.recipe_name}. Missing ingredients: ${ingredients.join(", ")}`
                                    : ""}
                    </Text>
                </View>
            ) : null}

            <Text style={styles.itemSubtitle}>
                {item.ai_reason_details}
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
        width: "80%", // Adjust as needed
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
    itemName: {
        fontSize: 18,
        marginBottom: 20,
    },
    itemSubtitle: {
        fontSize: 15,
        color: "#666",
    },
    blueBox: {
        borderColor: "blue",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    closeButton: {
        alignSelf: "flex-start",
        backgroundColor: "#f04a5e",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
});
