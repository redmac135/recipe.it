from conductor.client.worker.worker_task import worker_task
from .lib.connectToDb import db
from .lib.models import AIReason, GroceryItem, Recipe


@worker_task(task_definition_name="upload_groceries_from_partial_recipe")
def workerFn(recipe: Recipe):
    assert recipe.is_complete == False, "Recipe is already complete"

    if not recipe.new_groceries_per_serving:
        return

    for grocery in recipe.new_groceries_per_serving:
        db.collection("GroceryItems").add(
            {
                "name": grocery.name,
                "quantity": grocery.quantity,
                "unit": grocery.unit,
                "is_approved": False,
                "ai_reason": AIReason.COMPLETE_RECIPE.value,
                "ai_reason_details": None,
                "estimated_cost": None,
                "recipe_name": recipe.name,
            }
        )

    return
