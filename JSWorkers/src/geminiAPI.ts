import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { ZodSchema } from "zod";

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

const generateWithSchema = async (
  prompt: string,
  schema: ZodSchema,
  system?: string,
) => {
  const request: {
    prompt: string;
    output: { schema: ZodSchema };
    system?: string;
  } = {
    prompt: prompt,
    output: { schema: schema },
  };

  if (system) request.system = system;

  return ai.generate(request);
};

export { generateWithSchema };
