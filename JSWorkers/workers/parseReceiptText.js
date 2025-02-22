import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { z } from "zod";

const BoughtSchema = z.object({
  purchase_date: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      expiry_date: z.string(),
    }),
  ),
});

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

async function parseReceiptText(task) {
  const receiptText = task.inputData?.receipt_text;
  const GOOGLE_GENAI_API_KEY = task.inputData?.google_genai_api_key;
  prompt = ```
You are a helpful receipt data extraction assistant.
Today's date is ${new Intl.DateTimeFormat("en-CA").format(new Date())}.
Given the following receipt text, please extract the purchase date and list of purchased items.
For each item, estimate an expiry date based on common shelf life assumptions for that product category, and calculate how many days remain until expiry (using today's date).
Return your answer in JSON format with these keys:
  - "purchase_date": the date of purchase (YYYY-MM-DD),
  - "items": a list of objects, each containing:
      "name": the item name,
      "expiry_date": the estimated expiry date (YYYY-MM-DD)

Receipt text:
${receiptText}
```;
  const { output } = await ai.generate({
    prompt: prompt,
    output: { schema: BoughtSchema },
  });

  if (!receiptText) {
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
      output,
    },
  };
}

const parseReceiptTextWorker = {
  taskDefName: "parse_receipt_text",
  execute: parseReceiptText,
};

export default parseReceiptTextWorker;
