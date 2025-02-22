from conductor.client.worker.worker_task import worker_task
from .lib.connectToDb import db
from .lib.models import Recipe


@worker_task(task_definition_name="upload_groceries_from_partial_recipe")
def workerFn(recipe: Recipe):
    assert recipe.is_complete == False, "Recipe is already complete"

    for grocery in recipe.new_groceries_per_serving:
        db.collection("GroceryItems").add(grocery)

    return
