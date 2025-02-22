from conductor.client.worker.worker_task import worker_task
from .lib.connectToDb import db
from .lib.models import Recipe


@worker_task(task_definition_name="upload_recipe_direct")
def workerFn(recipe: Recipe):
    db.collection("Recipes").add(recipe.model_dump())

    return
