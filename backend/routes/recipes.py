from fastapi import APIRouter, Response, status

from utils.conductor import Conductor
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


@router.post("/execute")
async def execute_recipe(recipe: dict, servings: int | None):
    Conductor.execute_sync_workflow(
        "handle_recipe_execution", {"recipe": recipe, "servings": servings}
    )

    return Response(status_code=status.HTTP_200_OK)
