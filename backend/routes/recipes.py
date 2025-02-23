from fastapi import APIRouter

from utils.db import db


router = APIRouter()


@router.get("/list")
async def list_recipes():
    recipes = []
    recipe_docs = db.collection("Recipes").stream()

    for doc in recipe_docs:
        doc_data = doc.to_dict()
        doc_data["id"] = doc.id
        recipes.append(doc_data)

    return {"recipes": recipes}
