import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { ZodSchema } from "zod";

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

const generateWithSchema = async (prompt: string, schema: ZodSchema) => {
  return ai.generate({
    prompt: prompt,
    output: { schema: schema },
  });
};

export { generateWithSchema };
