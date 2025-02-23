from fastapi import APIRouter, Response, status

from utils.db import db

router = APIRouter()


@router.get("/list")
async def list_groceryitems():
    grocery_items = []
    grocery_docs = db.collection("GroceryItems").stream()

    for doc in grocery_docs:
        doc_data = doc.to_dict()
        doc_data["id"] = doc.id
        grocery_items.append(doc_data)

    return {"groceryItems": grocery_items}


@router.get("/accept/{id}")
async def accept_groceryitem(id: str):
    doc = db.collection("GroceryItems").document(id)
    doc.update({"is_accepted": True})

    return Response(status_code=status.HTTP_200_OK)


@router.get("/delete/{id}")
async def delete_groceryitem(id: str):
    db.collection("GroceryItems").document(id).delete()

    return Response(status_code=status.HTTP_200_OK)


@router.post("/edit/{id}")
async def edit_groceryitem(item: dict, id: str):
    db.collection("GroceryItems").document(id).update(item)

    return Response(status_code=status.HTTP_200_OK)


@router.get("/list-for-recipe/{recipe_name}")
async def list_groceryitems_for_recipe(recipe_name: str):
    grocery_items = []
    grocery_docs = (
        db.collection("GroceryItems").where("recipe_name", "==", recipe_name).stream()
    )

    for doc in grocery_docs:
        doc_data = doc.to_dict()
        doc_data["id"] = doc.id
        grocery_items.append(doc_data)

    return {"groceryItems": grocery_items}
