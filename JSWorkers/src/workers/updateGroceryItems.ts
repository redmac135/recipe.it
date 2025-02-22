import { type TaskResult, type Task } from "@io-orkes/conductor-javascript";
import db from "../firestore.js";
import fetch from "node-fetch";

async function getGroceryDetails(task:Task ): Promise<Omit<TaskResult, "workflowInstanceId" | "taskId">> {
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

    const endpoint = "https://genai.googleapis.com/v1/models/gemini:predict"; // Model
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
/////////////////////////////////
//////////////////////////////
/////////////////////////////

import { type TaskResult, type Task } from "@io-orkes/conductor-javascript";
import db from "../firestore";

async function getGroceryDetails(
  task: Task,
): Promise<Omit<TaskResult, "workflowInstanceId" | "taskId">> {
  const userId = task.inputData?.userId;
  const invDoc = await db.collection("KitchenInventory").doc(userId).get();
  if (!invDoc.exists) throw new Error("Kitchen inventory not found for user");
  const inventory = invDoc.data();

  // In a real implementation, prepare an AI prompt with the inventory to generate recipes.
  // For demonstration, we use a dummy response:
  const dummyRecipes = {
    complete: [
      {
        name: "Beef Bulgogi",
        ingredients_have: [{ name: "BEEF", quantity: 200, unit: "g" }],
      },
    ],
    incomplete: [
      {
        name: "Hamburger",
        ingredients_have: [{ name: "GROUND BEEF", quantity: 150, unit: "g" }],
        ingredients_purchasable: [
          { name: "BUNS", minQuantity: 1, unit: "loaf" },
        ],
        estimated_cost: 11.92,
        is_approved: false,
      },
    ],
  };

  await db.collection("Recipes").doc(userId).set(dummyRecipes);

  return {
    status: "COMPLETED",
    outputData: {
      ...dummyRecipes,
    },
  };
}

const recalcRecipesWorker = {
  taskDefName: "recalc_recipes",
  execute: recalcRecipes,
};

export default recalcRecipesWorker;

