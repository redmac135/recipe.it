from conductor.client.worker.worker_task import worker_task
from .connectToDb import db


@worker_task(task_definition_name="wipe_all_ai_suggestions")
def wipe_all_ai_suggestions_workerFn():
    # delete all grocery suggestions
    grocery_docs = (
        db.collection("GroceryItems").where("is_approved", "==", False).stream()
    )
    for doc in grocery_docs:
        doc.reference.delete()

    # delete all recipes
    recipe_docs = db.collection("Recipes").stream()
    for doc in recipe_docs:
        doc.reference.delete()

    return {"message": "All AI suggestions have been wiped"}
