import { Task, TaskResult } from "@io-orkes/conductor-javascript";
import { z } from "zod";
import { GroceryItem, KitchenItem, Recipe } from "../models";
import { generateWithSchema } from "../geminiAPI";

const systemPrompt = 
`You are given two data structures: a Recipe object and an array of KitchenItem objects. 
The Recipe object follows this schema:

{
  name: string;
  is_complete: boolean;
  ingredients_have_per_serving: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  existing_groceries_per_serving?: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  new_groceries_per_serving?: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  max_servings: number;
  estimated_cost?: number;
  steps?: string[];
}

The KitchenItem objects follow this schema:

{
  name: string;
  quantity: number;
  unit: string;
  expiry_date: string; // YYYY-MM-DD
}

**Task**:
1. For each ingredient in the recipe (e.g., 3 filets of salmon),
   - Convert the recipe's unit to the kitchen's unit using the Gemini API. 
     For example, if the recipe calls for "filets" and the kitchen item is in "kg," 
     Gemini might say that 1 filet = 1.15 kg. So 3 filets = 3.45 kg.
2. Once you have the converted amount, subtract it from the corresponding kitchen item's quantity.
   - For instance, if the kitchen has 5 kg of salmon, and the recipe uses 3.45 kg, 
     the new quantity is 5 - 3.45 = 1.55 kg.
3. Update the kitchen items accordingly, reflecting the reduced quantities. 
   - If an ingredient does not exist in the kitchen array, ignore it or note that it iss missing.
   - If the kitchen item does not have enough quantity, note that as well.
4. Return the updated array of KitchenItem objects in valid JSON format.

**Example**:
- Recipe calls for 3 filets of salmon.
- Kitchen has 5 kg of salmon.
- Gemini says 1 salmon filet = 1.15 kg, so 3 filets = 3.45 kg.
- Subtract 3.45 kg from 5 kg → updated salmon item has 1.55 kg remaining.

Please produce the final updated kitchen inventory as an array of KitchenItem objects in JSON.
`;

//////////////////////
export type Recipe = {
    name: string;
    is_complete: boolean;
    ingredients_have_per_serving: {
        name: string;
        quantity: number;
        unit: string;
    }[];
    existing_groceries_per_serving?: {
        // for incomplete recipe
        name: string;
        quantity: number;
        unit: string;
    }[];
    new_groceries_per_serving?: {
        // for incomplete recipe
        name: string;
        quantity: number;
        unit: string;
    }[];
    max_servings: number;
    estimated_cost?: number; // for incomplete recipe
    steps?: string[]; // for complete recipe
    };
    
    export type KitchenItem = {
    name: string;
    quantity: number;
    unit: string;
    expiry_date: string; // YYYY-MM-DD
    };
      


