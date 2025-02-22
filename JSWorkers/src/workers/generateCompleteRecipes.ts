import { Task, TaskResult } from "@io-orkes/conductor-javascript";
import { z } from "zod";
import { KitchenItem } from "../models";
import { generateWithSchema } from "../geminiAPI";

const completeRecipesSchema = z.array(
  z.object({
    name: z.string(),
    ingredients_have_per_serving: z.array(
      z.object({
        name: z.string(),
        amount: z.number(),
        unit: z.string(),
      }),
    ),
    max_servings: z.number(),
    steps: z.array(z.string()),
    no_more_recipes: z.boolean(),
  }),
);

const systemPrompt =
  "You are a recipe generator. The user will give you a list of items in their kitchen sorted by expiry, recipes that they have already been given before, and a desired cuisine. Please generate a unique recipe that hasn't been asked before, prioritizes the food that will expire soon, and roughly matches their desired cuisine--it's ok if it isn't the desired cuisine, that is the lowest priority want.\n\nIn your output, please title the recipe in the `name` field, put the ingredients per serving in the `ingredients_have_per_serving` ensuring that the name of the ingredient matches. Finally, calculate a `max_servings` based on the quantity of ingredients that user has available to them. If you REALLY CANNOT think of any more reasonable recipes then those already generated with the ingredients given, then set `no_more_recipes` to true. Include detailed steps in the `steps` array, each step being a seperate item in the array.";

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

  const prompt = `
Here is a list of items in my kitchen sorted by expiry:
${inventory
  .map((item) => `- ${item.name} (${item.quantity} ${item.unit})`)
  .join("\n")}

I have been given these recipes before:
${previouslyRejectedRecipes.map((recipe) => `- ${recipe}`).join("\n")}
`;

  const { output } = await generateWithSchema(
    prompt,
    completeRecipesSchema,
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

  if (output.no_more_recipes) {
    return {
      status: "COMPLETED",
      outputData: {
        no_more_recipes: true,
      },
    };
  }

  output.is_complete = true;

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
