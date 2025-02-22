from conductor.client.worker.worker_task import worker_task
import os
import json
import datetime
from dotenv import load_dotenv
import requests


def get_recipes(items: list) -> dict:
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

@worker_task(task_definition_name="generate_recipes")
def workerFn(image_base64: str) -> dict[str, str | bool]:
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
