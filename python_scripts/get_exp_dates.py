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

def process_receipt(receipt_text: str) -> dict:
    """
    Uses the Perplexity API to extract receipt data.
    Expected JSON output:
      {
        "purchase_date": "YYYY-MM-DD",
        "items": [
          {
            "name": "Item Name",
            "expiry_date": "YYYY-MM-DD",
            "days_left": <number>
          },
          ...
        ]
      }
    """
    today = datetime.date.today().isoformat()
    prompt = f"""
You are a helpful receipt data extraction assistant.
Today's date is {today}.
Given the following receipt text, please extract the purchase date and list of purchased items.
For each item, estimate an expiry date based on common shelf life assumptions for that product category, and calculate how many days remain until expiry (using today's date).
Return your answer in JSON format with these keys:
  - "purchase_date": the date of purchase (YYYY-MM-DD),
  - "items": a list of objects, each containing:
      "name": the item name,
      "expiry_date": the estimated expiry date (YYYY-MM-DD),
      "days_left": the number of days remaining until expiry.
Receipt text:
{receipt_text}
"""
    client = PerplexityClient()
    response = client.query(prompt)
    try:
        data = json.loads(response)
    except Exception as e:
        print("Error parsing JSON from API response:", e)
        data = {}
    return data

def sort_items_by_expiry(items: list) -> list:
    """Return the list of items sorted by days_left (lowest first)."""
    return sorted(items, key=lambda x: x['days_left'])

def get_recipes(items: list) -> dict:
    """
    Given a list of items (each with a name and expiry info), this function:
      - Sorts the items so that those expiring soon have higher priority.
      - Constructs a comma-separated string of ingredient names.
      - Queries the Spoonacular API for recipes using these ingredients.
      - Returns two groups of recipes:
            'complete_recipes' (recipes that can be made with available ingredients)
         and 'partial_recipes' (recipes that require additional ingredients).
    """
    sorted_items = sort_items_by_expiry(items)
    # Create a list of ingredient names
    ingredients = [item['name'] for item in sorted_items]
    ingredients_str = ','.join(ingredients)
    
    spoon_api_key = os.environ.get("SPOONACULAR_API_KEY")
    if not spoon_api_key:
        print("SPOONACULAR_API_KEY is not set in your environment. Cannot fetch recipes.")
        return {}
    
    url = "https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        "ingredients": ingredients_str,
        "number": 5,          # Number of recipes to retrieve
        "ranking": 1,         # Prioritize recipes that use most available ingredients
        "ignorePantry": "true",
        "apiKey": spoon_api_key
    }
    response = requests.get(url, params=params)
    if response.status_code != 200:
        print("Error fetching recipes:", response.text)
        return {}
    recipes = response.json()
    # Separate recipes into those that require no extra ingredients and those that do
    complete_recipes = [r for r in recipes if r.get("missedIngredientCount", 0) == 0]
    partial_recipes = [r for r in recipes if r.get("missedIngredientCount", 0) > 0]
    return {
        "complete_recipes": complete_recipes,
        "partial_recipes": partial_recipes
    }

def main():
    # Assume receipt.txt contains the OCR output of a receipt.
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

    # Sort items by expiry (soonest expiring first)
    sorted_items = sort_items_by_expiry(items)
    print("\nItems sorted by expiry (lowest days_left first):")
    print(json.dumps(sorted_items, indent=2))
    
    # Get recipes based on the available ingredients
    recipes = get_recipes(sorted_items)
    print("\nRecipes based on your available ingredients:")
    print(json.dumps(recipes, indent=2))

if __name__ == "__main__":
    main()
