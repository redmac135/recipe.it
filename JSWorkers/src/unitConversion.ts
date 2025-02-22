import { z } from "zod";
import { generateWithSchema } from "./geminiAPI";

export const CONVERSION_FACTORS = {
  lb_to_g: 453.592,
  kg_to_g: 1000,
  g_to_g: 1,
  l_to_ml: 1000,
  ml_to_ml: 1,
};

const unitConversionSchema = z.object({
  result: z.number()
})

export async function convertUnits(
  amount: number,
  fromUnit: string,
  toUnit: string,
): Promise<number> {
  const prompt = `
You are a unit conversion expert.
Convert the following value from its original unit to the target unit and output only the numerical result.
Value: ${amount} ${fromUnit}
Target unit: ${toUnit}
Return only the converted numerical value (do not include any extra text or explanation).
`;

  const { result }: { result: number } = await generateWithSchema(prompt, unitConversionSchema);
  return result;
}

