from fastapi import FastAPI
from firebase_admin import credentials, firestore, initialize_app

# Initialize FastAPI app
app = FastAPI()

# Path to your Firebase service account key JSON file
service_account_path = "../JSWorkers/src/privkey.json"

# Initialize Firebase Admin SDK
cred = credentials.Certificate(service_account_path)
initialize_app(cred)
db = firestore.client()

@app.get("/data")
def get_grocery_items():
    grocery_items = []

    # Retrieve all documents from the "GroceryItems" collection
    grocery_docs = db.collection("GroceryItems").stream()
    for doc in grocery_docs:
        grocery_items.append(doc.to_dict())

    return {"GroceryItems": grocery_items}

@app.get("/data")
def get_kitchen_items():
    kitchen_items = []

    # Retrieve all documents from the "KitchenItems" collection
    kitchen_docs = db.collection("KitchenItems").stream()
    for doc in kitchen_docs:
        kitchen_items.append(doc.to_dict())

    return {"KitchenItems": kitchen_items}

@app.get("/data")
def get_recipes():
    recipes = []
    # Retrieve all documents from the "Recipes" collection
    recipe_docs = db.collection("Recipes").stream()
    for doc in recipe_docs:
        recipes.append(doc.to_dict())

    return {"Recipes": recipes}