// workers/updateGroceryItems.js
import { orkesTaskWorker } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";
import fetch from "node-fetch";

async function getGroceryDetails(missingIngredients, apiKey) {
    const prompt = `
You are an expert grocery assistant.
Given the following missing ingredients as JSON:
${JSON.stringify(missingIngredients, null, 2)}
For each ingredient, determine a realistic minimum required amount (with unit) and estimate the cost to purchase that amount.
Return only a valid JSON string exactly in this format:
{
  "items": [
    {
      "name": "Ingredient Name",
      "min_required": "amount with unit (e.g., '100g' or '2 tbsp')",
      "est_cost": number
    }
  ]
}
Do not include any extra text.
  `;

    const endpoint = "https://genai.googleapis.com/v1/models/gemini:predict"; // placeholder
    const payload = { prompt };

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", errorText);
        throw new Error("Gemini API error");
    }

    const data = await response.json();
    const result = data.output;
    console.log("Raw Gemini Grocery API response:", result);

    try {
        return JSON.parse(result);
    } catch (e) {
        console.error("Error parsing grocery details JSON from Gemini:", e);
        throw new Error("Invalid JSON response from Gemini API");
    }
}

export default orkesTaskWorker({
    taskDefName: "updateGroceryItems",
    async execute(task) {
        // Expected input: { userId, missingIngredients: [ { name, quantity, unit }, ... ] }
        const { userId, missingIngredients } = task.input;
        if (!userId || !missingIngredients) {
            throw new Error("Missing userId or missingIngredients in task input");
        }
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey) throw new Error("GOOGLE_GENAI_API_KEY is not set");

        const groceryDetails = await getGroceryDetails(missingIngredients, apiKey);
        await db.collection("GroceryItems").doc(userId).set(groceryDetails, { merge: true });
        return { updatedGroceryItems: groceryDetails };
    },
});
