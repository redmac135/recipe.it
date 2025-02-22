import { Task, TaskResult } from "@io-orkes/conductor-javascript";
import { z } from "zod";
import db from "../firestore";
import {
  GroceryAIReasonEnum,
  GroceryItem,
  KitchenItem,
  Recipe,
} from "../models";
import { generateWithSchema } from "../geminiAPI";

// Example schema for Gemini conversion results (adjust to your actual response shape)
const conversionSchema = z.object() //ETHAN YOU DO THIS PART

// Example prompt for Gemini (could be in a separate file)
const systemPrompt = `
You are given two data structures:

1) A "Recipe" object with a key "ingredients_have_per_serving," which is an array of objects shaped like:
   {
     name: string,
     quantity: number,
     unit: string
   }
   - These represent the ingredients (and their amounts) needed per serving.

2) A list of "KitchenItem" objects, each shaped like:
   {
     name: string,
     quantity: number,
     unit: string,
     expiry_date: string
   }
   - This represents the items the user currently has in their kitchen.

Your task:
1) For each ingredient in "ingredients_have_per_serving," find the matching kitchen item by "name."
2) If the recipe's ingredient unit is different from the kitchen item's unit, call the Gemini API to convert the recipe's ingredient quantity to the kitchen item's unit.
3) Decrement the kitchen item's "quantity" by the converted amount.
4) Return or output the updated list of KitchenItem objects with their new, decremented quantities.
`;

async function decrementKitchenValues(
  task: Task
): Promise<TaskResult> {
  try {
    // 1. Pull input data
    const recipe: Recipe = task.inputData?.recipe;
    const kitchen: KitchenItem[] = task.inputData?.kitchen; // what the user currently has

    if (!recipe || !kitchen) {
      return {
        status: "FAILED",
        outputData: {
          message: "Both recipe and kitchen are required",
        },
      };
    }

    // 2. Get the ingredients from the recipe that need decrementing
    const { ingredients_have_per_serving } = recipe;
    if (!ingredients_have_per_serving || ingredients_have_per_serving.length === 0) {
      return {
        status: "COMPLETED",
        outputData: {
          updatedKitchen: kitchen,
          message: "No ingredients to decrement",
        },
      };
    }

    // Copy kitchen array so we don't mutate original
    const updatedKitchen = [...kitchen];

    // 3. Iterate over each needed ingredient
    for (const ingredient of ingredients_have_per_serving) {
      // Find matching kitchen item by name
      const matchIndex = updatedKitchen.findIndex(
        (item) => item.name.toLowerCase() === ingredient.name.toLowerCase()
      );
      if (matchIndex === -1) {
        // No match in the kitchen for this ingredient
        // (Optionally handle missing item logic here)
        continue;
      }

      const kitchenItem = updatedKitchen[matchIndex];

      // Determine how much we need to subtract
      let amountToSubtract = ingredient.quantity;

      // If units differ, call Gemini for conversion
      if (kitchenItem.unit !== ingredient.unit) {
        // Build a short prompt to pass to Gemini
        const geminiPrompt = `
          Convert ${ingredient.quantity} ${ingredient.unit} of ${ingredient.name}
          to the unit ${kitchenItem.unit}. Return the numeric quantity.
        `;

        const geminiResult = await generateWithSchema(
          geminiPrompt,
          conversionSchema,
          systemPrompt
        );

        // If Gemini provides a valid output, override the amountToSubtract
        if (geminiResult && geminiResult.output) {
          amountToSubtract = geminiResult.output.convertedQuantity;
        }
      }

      // Subtract from the kitchen
      const newQuantity = kitchenItem.quantity - amountToSubtract;
      updatedKitchen[matchIndex] = {
        ...kitchenItem,
        quantity: Math.max(newQuantity, 0), // or handle negative logic differently
      };

      // 4. Update Firestore for that item
      // Adjust doc ID to match your actual DB structure
      await db.collection("kitchen")
        .doc(kitchenItem.name.toLowerCase())
        .update({
          quantity: Math.max(newQuantity, 0),
        });
    }

    // 5. Return updated kitchen
    return {
      status: "COMPLETED",
      outputData: {
        updatedKitchen,
        message: "Kitchen items decremented successfully",
      },
    };
  } catch (error: any) {
    console.error("Error decrementing kitchen values:", error);
    return {
      status: "FAILED",
      outputData: {
        message: error.message || "An error occurred during decrement",
      },
    };
  }
}

export default decrementKitchenValues;
