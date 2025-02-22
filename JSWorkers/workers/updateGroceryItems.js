import { orkesTaskWorker } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";

// Dummy function to simulate calling the Gemini API.
// In a real implementation, perform an HTTP request to your Gemini API endpoint.
async function callGeminiAPI(ingredients) {
    return {
        items: ingredients.map(ing => {
            let min_required;
            let est_cost;
            if (ing.name.toLowerCase().includes("garlic")) {
                min_required = "100g";
                est_cost = 3;
            } else if (ing.name.toLowerCase().includes("chicken")) {
                min_required = "3";
                est_cost = 30;
            } else if (ing.name.toLowerCase().includes("canola")) {
                min_required = "2 tbsp";
                est_cost = 7;
            } else {
                min_required = "1 unit";
                est_cost = 5;
            }
            return {
                name: ing.name,
                min_required,
                est_cost
            };
        }),
    };
}

export default orkesTaskWorker({
    taskDefName: "updateGroceryItems",
    async execute(task) {
        // Expected input: { userId, missingIngredients: [ { name, quantity, unit }, ... ] }
        const { userId, missingIngredients } = task.input;
        if (!userId || !missingIngredients) {
            throw new Error("Missing userId or missingIngredients in task input");
        }
        const geminiResult = await callGeminiAPI(missingIngredients);
        const groceryDocRef = db.collection("GroceryItems").doc(userId);
        await groceryDocRef.set(geminiResult, { merge: true });
        return { updatedGroceryItems: geminiResult };
    },
});
