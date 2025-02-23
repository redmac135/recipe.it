from firebase_admin import credentials, firestore, initialize_app

# Initialize Firebase Admin SDK
service_account_path = "../JSWorkers/src/privkey.json" ##@redmac69 change this if you moved the file loc.
cred = credentials.Certificate(service_account_path)
initialize_app(cred)
db = firestore.client()

def add_grocery_item():
    print("\n-- Add Grocery Item --")
    name = input("Enter grocery item name: ")
    quantity = float(input("Enter quantity: "))
    unit = input("Enter unit: ")
    is_approved_input = input("Is the item approved? (True/False): ")
    is_approved = is_approved_input.strip().lower() == "true"

    # Optional fields
    ai_reason = input("Enter AI reason (LOW_QUANTITY, USER_REQUEST, COMPLETE_RECIPE) or leave blank: ")
    ai_reason = ai_reason.strip() if ai_reason else None
    ai_reason_details = input("Enter AI reason details or leave blank: ") or None
    estimated_cost_input = input("Enter estimated cost or leave blank: ")
    estimated_cost = float(estimated_cost_input) if estimated_cost_input else None
    recipe_name = input("Enter recipe name (if applicable) or leave blank: ") or None

    item_data = {
        "name": name,
        "quantity": quantity,
        "unit": unit,
        "is_approved": is_approved,
        "ai_reason": ai_reason,
        "ai_reason_details": ai_reason_details,
        "estimated_cost": estimated_cost,
        "recipe_name": recipe_name,
    }

    try:
        doc_ref = db.collection("GroceryItems").add(item_data)
        print(f"Grocery item added successfully with id: {doc_ref[1].id}")
    except Exception as e:
        print("Error adding grocery item:", e)

def add_kitchen_item():
    print("\n-- Add Kitchen Item --")
    name = input("Enter kitchen item name: ")
    quantity = float(input("Enter quantity: "))
    unit = input("Enter unit: ")
    expiry_date = input("Enter expiry date (YYYY-MM-DD): ")

    item_data = {
        "name": name,
        "quantity": quantity,
        "unit": unit,
        "expiry_date": expiry_date,
    }

    try:
        doc_ref = db.collection("KitchenItems").add(item_data)
        print(f"Kitchen item added successfully with id: {doc_ref[1].id}")
    except Exception as e:
        print("Error adding kitchen item:", e)

def add_recipe():
    print("\n-- Add Recipe --")
    name = input("Enter recipe name: ")
    is_complete_input = input("Is the recipe complete? (True/False): ")
    is_complete = is_complete_input.strip().lower() == "true"
    max_servings = int(input("Enter max servings: "))

    # Gather ingredients per serving
    ingredients = []
    num_ingredients = int(input("How many ingredients per serving? "))
    for i in range(num_ingredients):
        print(f"Ingredient {i+1}:")
        ing_name = input("  Enter ingredient name: ")
        ing_quantity = float(input("  Enter quantity: "))
        ing_unit = input("  Enter unit: ")
        ingredients.append({
            "name": ing_name,
            "quantity": ing_quantity,
            "unit": ing_unit
        })

    # Optional: existing groceries per serving
    existing = []
    if input("Add existing groceries per serving? (y/n): ").strip().lower() == "y":
        num_existing = int(input("How many existing groceries per serving? "))
        for i in range(num_existing):
            print(f"Existing grocery {i+1}:")
            ex_name = input("  Enter grocery name: ")
            ex_quantity = float(input("  Enter quantity: "))
            ex_unit = input("  Enter unit: ")
            existing.append({
                "name": ex_name,
                "quantity": ex_quantity,
                "unit": ex_unit
            })

    # Optional: new groceries per serving
    new_groceries = []
    if input("Add new groceries per serving? (y/n): ").strip().lower() == "y":
        num_new = int(input("How many new groceries per serving? "))
        for i in range(num_new):
            print(f"New grocery {i+1}:")
            new_name = input("  Enter grocery name: ")
            new_quantity = float(input("  Enter quantity: "))
            new_unit = input("  Enter unit: ")
            new_groceries.append({
                "name": new_name,
                "quantity": new_quantity,
                "unit": new_unit
            })

    estimated_cost = None
    steps = None
    if not is_complete:
        estimated_cost_input = input("Enter estimated cost (or leave blank): ")
        estimated_cost = float(estimated_cost_input) if estimated_cost_input else None
    else:
        num_steps = int(input("How many steps? "))
        steps = []
        for i in range(num_steps):
            step = input(f"Enter step {i+1}: ")
            steps.append(step)

    recipe_data = {
        "name": name,
        "is_complete": is_complete,
        "ingredients_have_per_serving": ingredients,
        "existing_groceries_per_serving": existing if existing else None,
        "new_groceries_per_serving": new_groceries if new_groceries else None,
        "max_servings": max_servings,
        "estimated_cost": estimated_cost,
        "steps": steps if steps else None
    }

    try:
        doc_ref = db.collection("Recipes").add(recipe_data)
        print(f"Recipe added successfully with id: {doc_ref[1].id}")
    except Exception as e:
        print("Error adding recipe:", e)