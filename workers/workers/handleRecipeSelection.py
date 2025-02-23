from conductor.client.worker.worker_task import worker_task
from .lib.connectToDb import db
from .lib.models import Recipe


@worker_task(task_definition_name="execute_recipe")
def execute_recipe_workerFn(recipe: Recipe, servings: int):
    # decrement the quantity of each ingredient in the recipe
    for ingredient in recipe.ingredients_have_per_serving:
        # 1. search for this ingredient name in the kitchen items
        kitchenitem_docs = (
            db.collection("KitchenItems").where("name", "==", ingredient.name).stream()
        )

        # 2. decrement the quantity of this ingredient
        # 3. if the quantity is zero, delete the document
        kitchenitem_docs = list(kitchenitem_docs)

        if len(kitchenitem_docs) == 0:
            continue

        kitchenitem = kitchenitem_docs[0].to_dict()
        if kitchenitem is None:
            continue

        kitchenitem["quantity"] += ingredient.quantity * servings

        if kitchenitem["quantity"] <= 0:
            db.collection("KitchenItems").document(kitchenitem_docs[0].id).delete()
        else:
            db.collection("KitchenItems").document(kitchenitem_docs[0].id).set(
                kitchenitem
            )

    return


@worker_task(task_definition_name="add_recipe_suggestions")
def add_recipe_suggestions_workerFn(recipe: Recipe):
    if not recipe.existing_groceries_per_serving is None:

        for ingredient in recipe.existing_groceries_per_serving:
            # make them all approved!
            db.collection("GroceryItems").add(
                {
                    "name": ingredient.name,
                    "quantity": ingredient.quantity,
                    "unit": ingredient.unit,
                    "is_approved": True,
                }
            )

    if recipe.new_groceries_per_serving is None:
        return

    for ingredient in recipe.new_groceries_per_serving:
        # make them all approved!
        db.collection("GroceryItems").add(
            {
                "name": ingredient.name,
                "quantity": ingredient.quantity,
                "unit": ingredient.unit,
                "is_approved": True,
            }
        )

    return
