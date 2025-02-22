from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from firebase_admin import credentials, firestore, initialize_app

# Initialize FastAPI app
app = FastAPI()

# Path to your Firebase service account key JSON file
service_account_path = "../serviceAccountKey.json"

# Initialize Firebase Admin SDK
cred = credentials.Certificate(service_account_path)
initialize_app(cred)
db = firestore.client()

# Define Pydantic models based on your pseudo-schema

class GroceryAIReasonEnum(str, Enum):
    LOW_QUANTITY = "LOW_QUANTITY"
    USER_REQUEST = "USER_REQUEST"
    COMPLETE_RECIPE = "COMPLETE_RECIPE"

class GroceryItem(BaseModel):
    name: str
    quantity: float
    unit: str
    is_approved: bool
    # Optional fields if the item is AI-generated or recipe related
    ai_reason: Optional[GroceryAIReasonEnum] = None
    ai_reason_details: Optional[str] = None
    estimated_cost: Optional[float] = None
    recipe_name: Optional[str] = None

class RecipeIngredient(BaseModel):
    name: str
    quantity: float
    unit: str

class Recipe(BaseModel):
    name: str
    is_complete: bool
    ingredients_have_per_serving: List[RecipeIngredient]
    existing_groceries_per_serving: Optional[List[RecipeIngredient]] = None
    new_groceries_per_serving: Optional[List[RecipeIngredient]] = None
    max_servings: int
    estimated_cost: Optional[float] = None
    steps: Optional[List[str]] = None

class KitchenItem(BaseModel):
    name: str
    quantity: float
    unit: str
    expiry_date: str  # Format: YYYY-MM-DD

# GET endpoints for retrieving data

@app.get("/grocery")
def get_grocery_items():
    grocery_items = []
    grocery_docs = db.collection("GroceryItems").stream()
    for doc in grocery_docs:
        grocery_items.append(doc.to_dict())
    return {"GroceryItems": grocery_items}

@app.get("/kitchen")
def get_kitchen_items():
    kitchen_items = []
    kitchen_docs = db.collection("KitchenItems").stream()
    for doc in kitchen_docs:
        kitchen_items.append(doc.to_dict())
    return {"KitchenItems": kitchen_items}

@app.get("/recipes")
def get_recipes():
    recipes = []
    recipe_docs = db.collection("Recipes").stream()
    for doc in recipe_docs:
        recipes.append(doc.to_dict())
    return {"Recipes": recipes}

# POST endpoints for creating new items

@app.post("/grocery")
def create_grocery_item(item: GroceryItem):
    try:
        # Convert the Pydantic model to dict and add it to the "GroceryItems" collection
        doc_ref = db.collection("GroceryItems").add(item.dict())
        # doc_ref returns a tuple (update_time, document_reference)
        return {"message": "Grocery item created", "id": doc_ref[1].id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/kitchen")
def create_kitchen_item(item: KitchenItem):
    try:
        doc_ref = db.collection("KitchenItems").add(item.dict())
        return {"message": "Kitchen item created", "id": doc_ref[1].id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recipes")
def create_recipe(recipe: Recipe):
    try:
        doc_ref = db.collection("Recipes").add(recipe.dict())
        return {"message": "Recipe created", "id": doc_ref[1].id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
