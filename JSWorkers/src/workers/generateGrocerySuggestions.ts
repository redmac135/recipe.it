import { Task, TaskResult } from "@io-orkes/conductor-javascript";
import { z } from "zod";
import { generateWithSchema } from "../geminiAPI";
import { GroceryItem, KitchenItem } from "../models";

const grocerySuggestionSchema = z.array(
  z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
    estimated_cost: z.number(),
    ai_reason_details: z.string(),
  }),
);

const systemPrompt =
  "You are a grocery expert. The user has a list of items in their kitchen and an existing grocery list. Your job is to suggest other things to add to their grocery list. For example, you can suggest salt because we're running low in salt or you can suggest cajun seasoning as it will pair will with many of our items. For each of these, ensure you add a quantity (such as 100) and a unit (such as 'g' or 'mL'). Furthermore, estimate a cost to purchase this grocery item in Canada Ontario in CAD.";

async function generateGrocerySuggestions(
  task: Task,
): Promise<Omit<TaskResult, "workflowInstanceId" | "taskId">> {
  const inventory = task.inputData?.inventory;
  if (!inventory) {
    return {
      status: "FAILED",
      outputData: {
        message: "Inventory is required",
      },
    };
  }

  const groceryList = task.inputData?.groceryList || [];

  const prompt = `
Here is a list of items in my kitchen sorted by expiry:
${inventory
  .map((item: KitchenItem) => `- ${item.name} (${item.quantity} ${item.unit})`)
  .join("\n")}

Here is my existing grocery list:
${groceryList
  .map((item: GroceryItem) => `- ${item.name} (${item.quantity} ${item.unit})`)
  .join("\n")}
`;

  const { output } = await generateWithSchema(
    prompt,
    grocerySuggestionSchema,
    systemPrompt,
  );

  if (!output) {
    return {
      status: "FAILED",
      outputData: {
        message: "Failed to generate grocery suggestions",
      },
    };
  }

  return {
    status: "COMPLETED",
    outputData: {
      grocerySuggestions: output,
    },
  };
}
