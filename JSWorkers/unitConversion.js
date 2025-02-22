import fetch from "node-fetch";

async function convertUnitsUsingGemini(amount, fromUnit, toUnit) {
  // Build a prompt that instructs Gemini to perform the conversion.
  const prompt = `
You are a unit conversion expert.
Convert the following value from its original unit to the target unit and output only the numerical result.
Value: ${amount} ${fromUnit}
Target unit: ${toUnit}
Return only the converted numerical value (do not include any extra text or explanation).
`;

  const endpoint = "https://genai.googleapis.com/v1/models/gemini:predict"; // Model
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_GENAI_API_KEY is not set");
  }

  const payload = { prompt };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${errorText}`);
  }

  const data = await response.json();
  // Assume the Gemini API returns the converted number in a field called "output"
  const resultText = data.output;
  console.log("Raw Gemini API response for conversion:", resultText);

  // Parse the converted value
  const convertedValue = parseFloat(resultText);
  if (isNaN(convertedValue)) {
    throw new Error(`Failed to parse converted value from Gemini API response: ${resultText}`);
  }
  return convertedValue;
}

export default convertUnitsUsingGemini;
