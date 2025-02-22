import os
import json
import datetime
import requests
from dotenv import load_dotenv
from perplexipy import PerplexityClient

# Load environment variables from .env file
load_dotenv()

PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY")
if not PERPLEXITY_API_KEY:
    raise ValueError("PERPLEXITY_API_KEY is not set in your environment.")

# For our purposes, standard units:
# Solids: grams (g)
# Liquids: milliliters (ml)
# (You can expand this dictionary with more conversion factors as needed)
CONVERSION_FACTORS = {
    # weight
    ('lb', 'g'): 453.592,
    ('kg', 'g'): 1000,
    ('g', 'g'): 1,
    # volume
    ('l', 'ml'): 1000,
    ('liter', 'ml'): 1000,
    ('liters', 'ml'): 1000,
    ('ml', 'ml'): 1,
    # if necessary, add cups, tablespoons, etc.
}

def convert_units(amount: float, from_unit: str, to_unit: str) -> float:
    """
    Convert an amount from one unit to another using predefined conversion factors.
    Returns the converted amount. If conversion is not defined, returns None.
    """
    from_unit = from_unit.lower().strip()
    to_unit = to_unit.lower().strip()
    factor = CONVERSION_FACTORS.get((from_unit, to_unit))
    if factor is None:
        print(f"No conversion factor defined from {from_unit} to {to_unit}.")
        return None
    return amount * factor

def process_receipt(receipt_text: str) -> dict:
    """
    Uses the Perplexity API to extract receipt data.
    Expected JSON output format:
      {
        "purchase_date": "YYYY-MM-DD",
        "items": [
          {
            "name": "Item Name",
            "quantity": number,
            "unit": "unit",   // e.g. "lb", "g", "ml", "l"
            "expiry_date": "YYYY-MM-DD",
            "days_left": number
          },
          ...
        ]
      }
    """
    today = datetime.date.today().isoformat()
    prompt = f"""
You are a helpful receipt data extraction assistant.
Today's date is {today}.
Given the following receipt text, extract the purchase date and list of purchased items.
For each item, if available, extract the following details:
  - "name": the name of the item,
  - "quantity": the amount purchased as a number,
  - "unit": the unit of the quantity (for example, "lb", "kg", "g", "l", "ml", etc.),
  - "expiry_date": estimate the expiry date based on typical shelf life (in YYYY-MM-DD format),
  - "days_left": calculate how many days remain until expiry (using today's date).
Return only a valid JSON string exactly in this format:
{{
  "purchase_date": "YYYY-MM-DD",
  "items": [
      {{
         "name": "Item Name",
         "quantity": number,
         "unit": "unit",
         "expiry_date": "YYYY-MM-DD",
         "days_left": number
      }},
      ...
  ]
}}
Do not include any extra text.
Receipt text:
{receipt_text}
"""
    client = PerplexityClient(key=PERPLEXITY_API_KEY)
    response = client.query(prompt)
    print("Raw API response:")
    print(response)
    try:
        data = json.loads(response)
    except Exception as e:
        print("Error parsing JSON from API response:", e)
        data = {}
    return data

def sort_items_by_expiry(items: list) -> list:
    """Return items sorted by days_left (lowest first)."""
    return sorted(items, key=lambda x: x['days_left'])

def get_recipes(items: list) -> dict:
    """
    Given a list of items, builds a comma-separated list of ingredient names,
    queries the Spoonacular API for recipes using these ingredients,
    and returns recipes grouped as:
      - "complete_recipes": recipes that can be made entirely with available ingredients,
      - "partial_recipes": recipes that require additional ingredients.
    """
    sorted_items = sort_items_by_expiry(items)
    ingredients = [item['name'] for item in sorted_items]
    ingredients_str = ','.join(ingredients)
    
    spoon_api_key = os.environ.get("SPOONACULAR_API_KEY")
    if not spoon_api_key:
        print("SPOONACULAR_API_KEY is not set in your environment. Cannot fetch recipes.")
        return {}
    
    url = "https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        "ingredients": ingredients_str,
        "number": 5,
        "ranking": 1,
        "ignorePantry": "true",
        "apiKey": spoon_api_key
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        print("Error fetching recipes:", response.text)
        return {}
    recipes = response.json()
    complete_recipes = [r for r in recipes if r.get("missedIngredientCount", 0) == 0]
    partial_recipes = [r for r in recipes if r.get("missedIngredientCount", 0) > 0]
    return {
        "complete_recipes": complete_recipes,
        "partial_recipes": partial_recipes
    }

def update_inventory(recipe_ingredients: list, inventory: dict) -> dict:
    """
    Given a list of recipe ingredients (each with keys: name, amount, unit)
    and an inventory (a dict mapping item names to a dict with keys "quantity" and "unit"),
    convert the recipe amounts to the inventory's standard unit and decrement the amounts.
    If an ingredient is not found or conversion fails, print a warning.
    Returns the updated inventory.
    Example:
      recipe_ingredient: {"name": "Pork Rhine", "amount": 0.5, "unit": "lb"}
      inventory: {"Pork Rhine": {"quantity": 1000, "unit": "g"}}
    """
    updated_inventory = inventory.copy()
    for ingredient in recipe_ingredients:
        name = ingredient.get("name")
        req_amount = ingredient.get("amount")
        req_unit = ingredient.get("unit")
        if name not in updated_inventory:
            print(f"Ingredient {name} not found in inventory.")
            continue
        inv_item = updated_inventory[name]
        inv_quantity = inv_item["quantity"]
        inv_unit = inv_item["unit"]
        # Convert recipe amount to inventory unit
        converted_amount = convert_units(req_amount, req_unit, inv_unit)
        if converted_amount is None:
            print(f"Could not convert {req_amount} {req_unit} of {name} to {inv_unit}.")
            continue
        # Decrement inventory (ensure not negative)
        new_quantity = max(inv_quantity - converted_amount, 0)
        updated_inventory[name]["quantity"] = new_quantity
        print(f"Updated {name}: used {converted_amount} {inv_unit}, remaining {new_quantity} {inv_unit}.")
    return updated_inventory

def main():
    # Read receipt text
    receipt_file = "receipt.txt"
    if not os.path.exists(receipt_file):
        print(f"Error: {receipt_file} not found. Please provide a receipt text file.")
        return
    with open(receipt_file, "r", encoding="utf-8") as f:
        receipt_text = f.read()

    print("Processing receipt...")
    receipt_data = process_receipt(receipt_text)
    if not receipt_data:
        print("No data extracted from receipt.")
        return

    print("Extracted receipt data:")
    print(json.dumps(receipt_data, indent=2))
    
    items = receipt_data.get("items", [])
    if not items:
        print("No items found in receipt data.")
        return

    sorted_items = sort_items_by_expiry(items)
    print("\nItems sorted by expiry (lowest days_left first):")
    print(json.dumps(sorted_items, indent=2))
    
    recipes = get_recipes(sorted_items)
    print("\nRecipes based on your available ingredients:")
    print(json.dumps(recipes, indent=2))
    
    # Example: simulate a recipe ingredient list from Spoonacular API
    # Each ingredient object is expected to have "name", "amount", and "unit"
    example_recipe_ingredients = [
        {"name": "Pork Rhine", "amount": 0.5, "unit": "lb"},
        {"name": "Chinese broccoli", "amount": 200, "unit": "g"},
        {"name": "Beef Brisket Roll", "amount": 0.3, "unit": "lb"}
    ]
    # Example user kitchen inventory (amounts in standard units)
    # We assume "Pork Rhine" and "Beef Brisket Roll" are measured in grams, "Chinese broccoli" in grams.
    inventory = {
        "Pork Rhine": {"quantity": 1000, "unit": "g"},
        "Chinese broccoli": {"quantity": 500, "unit": "g"},
        "Beef Brisket Roll": {"quantity": 800, "unit": "g"}
    }
    print("\nInitial Inventory:")
    print(json.dumps(inventory, indent=2))
    
    # Update the inventory based on the recipe ingredients
    updated_inventory = update_inventory(example_recipe_ingredients, inventory)
    print("\nUpdated Inventory after using recipe:")
    print(json.dumps(updated_inventory, indent=2))

if __name__ == "__main__":
    main()
