import { z } from "zod";
import { generateWithSchema } from "../geminiAPI";
import { type TaskResult, type Task } from "@io-orkes/conductor-javascript";
import { KitchenItemCategoryEnum } from "../models";

const boughtSchema = z.array(
  z.object({
    name: z.string(),
    category: z.enum([
      KitchenItemCategoryEnum.FRIDGE,
      KitchenItemCategoryEnum.FREEZER,
      KitchenItemCategoryEnum.PANTRY,
    ]),
    quantity: z.number(),
    unit: z.string(),
    expiry_date: z.string(),
  }),
);

async function parseReceiptText(
  task: Task,
): Promise<Omit<TaskResult, "workflowInstanceId" | "taskId">> {
  const receiptText = task.inputData?.receipt_text;
  const prompt = `
You are a helpful receipt data extraction assistant.
Today's date is ${"hi"}.
Given the following receipt text, please extract the purchase date and list of purchased items.
For each item, estimate an expiry date based on common shelf life assumptions for that product category, and calculate how many days remain until expiry (using today's date).
Return your answer in JSON format with these keys:
  - "purchase_date": the date of purchase (YYYY-MM-DD),
  - "items": a list of objects, each containing:
      "name": the item name,
      "quantity": the amount (in units) purchased,
      "units": the unit of measurements (per breast, per kg, per mL, etc),
      "expiry_date": the estimated expiry date (YYYY-MM-DD)

additionally, please add a "category" field to indicate where it should be stored ("FRIDGE", "FREEZER", or "PANTRY").

if the units and quantity are unknown, please put forward your best guess.

Receipt text:
${receiptText}
`;

  if (!prompt) {
    return {
      status: "FAILED",
      outputData: {
        error: "prompt did not generate successfully",
      },
    };
  }

  const { output } = await generateWithSchema(prompt, boughtSchema);

  if (!output) {
    return {
      status: "FAILED",
      outputData: {
        error: "receiptText is required",
      },
    };
  }

  return {
    status: "COMPLETED",
    outputData: {
      bought: output,
    },
  };
}

const parseReceiptTextWorker = {
  taskDefName: "parse_receipt_text",
  execute: parseReceiptText,
};

export default parseReceiptTextWorker;
