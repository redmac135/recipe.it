import { Task, TaskResult } from "@io-orkes/conductor-javascript";
import { z } from "zod";
import { GroceryItem, KitchenItem } from "../models";
import { generateWithSchema } from "../geminiAPI";

const partialRecipesSchema = z.array(
  z.object({
    name: z.string(),
    ingredients_have_per_serving: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
        unit: z.string(),
      }),
    ),
    existing_groceries_per_serving: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
      }),
    ),
    new_groceries_per_serving: z.array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        unit: z.string(),
      }),
    ),
    max_servings: z.number(),
    estimated_cost: z.number(),
  }),
);

const systemPrompt =
  "You are a partial recipe generator. The user will give you a list of items in their kitchen sorted by expiry, recipes that they have already been given before, and a desired cuisine. Your job is to generate recipes that use *mostly* ingredients in the users kitchen with 1-4 other items that are either already in their grocery list or are not in their grocery list. Please prioritize items that are on their grocery list. Additionally, ensure that you do not recommend the same recipe twice. Store ingredients that exist already in `ingredients_have_per_serving`, ingredients on the grocery list in `existing_groceries_per_serving` and ingredients that are not on either that we want to recommend be added in `new_groceries_per_serving`. Based on the ingredients we already have, generate a `max_servings` number to indicate the maximum number of servings we can have. Additionally, generate an estimated cost of all grocery items (existing or new) that we would have to purchase in a Canadian Economy in CAD. ";

async function generateCompleteRecipes(
  task: Task,
): Promise<Omit<TaskResult, "workflowInstanceId" | "taskId">> {
  const inventory: KitchenItem[] = task.inputData?.inventory;
  if (!inventory) {
    return {
      status: "FAILED",
      outputData: {
        message: "Inventory is required",
      },
    };
  }

  const previouslyRejectedRecipes: string[] =
    task.inputData?.previouslyRejectedRecipes || [];

  const groceryList: GroceryItem[] = task.inputData?.groceryList || [];

  const prompt = `
Here is a list of items in my kitchen sorted by expiry:
${inventory
  .map((item) => `- ${item.name} (${item.quantity} ${item.unit})`)
  .join("\n")}

I have been given these recipes before:
${previouslyRejectedRecipes.map((recipe) => `- ${recipe}`).join("\n")}

Here is my existing grocery list:
${groceryList
  .map((item) => `- ${item.name} (${item.quantity} ${item.unit})`)
  .join("\n")}
`;

  const { output } = await generateWithSchema(
    prompt,
    partialRecipesSchema,
    systemPrompt,
  );

  if (!output) {
    return {
      status: "FAILED",
      outputData: {
        message: "Failed to generate recipes",
      },
    };
  }

  return {
    status: "COMPLETED",
    outputData: {
      recipes: output,
    },
  };
}

const generateCompleteRecipesWorker = {
  taskDefName: "generate_complete_recipes",
  execute: generateCompleteRecipes,
};

export default generateCompleteRecipesWorker;
