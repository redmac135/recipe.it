from conductor.client.worker.worker_task import worker_task
from .lib.connectToDb import db


@worker_task(task_definition_name="get_recipes")
def get_recipes_workerFn():
    recipes = []
    recipe_docs = db.collection("Recipes").stream()
    for doc in recipe_docs:
        recipes.append(doc.to_dict())

    return {"recipes": recipes}


@worker_task(task_definition_name="get_kitchen_items")
def get_kitchen_items_workerFn():
    kitchen_items = []

    kitchen_docs = db.collection("KitchenItems").stream()
    for doc in kitchen_docs:
        kitchen_items.append(doc.to_dict())

    return {"kitchenItems": kitchen_items}


@worker_task(task_definition_name="get_grocery_items")
def get_grocery_items_workerFn():
    grocery_items = []

    grocery_docs = db.collection("GroceryItems").stream()
    for doc in grocery_docs:
        grocery_items.append(doc.to_dict())

    return {"groceryItems": grocery_items}
