export const CONVERSION_FACTORS = {
  'lb_to_g': 453.592,
  'kg_to_g': 1000,
  'g_to_g': 1,
  'l_to_ml': 1000,
  'ml_to_ml': 1,
};

export function convertUnits(amount, fromUnit, toUnit) {
  fromUnit = fromUnit.toLowerCase().trim();
  toUnit = toUnit.toLowerCase().trim();
  if (fromUnit === 'lb' && toUnit === 'g') return amount * CONVERSION_FACTORS['lb_to_g'];
  if (fromUnit === 'kg' && toUnit === 'g') return amount * CONVERSION_FACTORS['kg_to_g'];
  if (fromUnit === 'g' && toUnit === 'g') return amount;
  if ((fromUnit === 'l' || fromUnit === 'liter') && toUnit === 'ml') return amount * CONVERSION_FACTORS['l_to_ml'];
  if (fromUnit === 'ml' && toUnit === 'ml') return amount;
  console.warn(`No conversion factor defined for ${fromUnit} to ${toUnit}`);
  return null;
}
