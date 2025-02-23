from fastapi import APIRouter, Response, status
from utils.conductor import Conductor
from utils.db import db


router = APIRouter()


@router.get("/list")
async def list_kitchenitems():
    kitchen_items = []
    kitchen_docs = db.collection("KitchenItems").stream()

    for doc in kitchen_docs:
        doc_data = doc.to_dict()
        doc_data["id"] = doc.id
        kitchen_items.append(doc_data)

    return {"kitchenItems": kitchen_items}


@router.post("/add")
async def add_kitchenitem(item: dict):
    db.collection("KitchenItems").add(item)

    Conductor.execute_async_workflow("handle_inventory_change", {})

    return Response(status_code=status.HTTP_200_OK)


@router.post("/edit/{id}")
async def edit_kitchenitem(item: dict, id: str):
    if "quantity" in item:
        if item["quantity"] <= 0:
            db.collection("KitchenItems").document(id).delete()
        else:
            db.collection("KitchenItems").document(id).update(item)
    else:
        raise ValueError("Quantity is required to edit a kitchen item")

    Conductor.execute_async_workflow("handle_inventory_change", {})

    return Response(status_code=status.HTTP_200_OK)
