from typing import List
from conductor.client.worker.worker_task import worker_task
from .lib.connectToDb import db
from .lib.models import GroceryItem


@worker_task(task_definition_name="upload_groceries_direct")
def workerFn(groceries: List[GroceryItem]):
    for grocery in groceries:
        db.collection("GroceryItems").add(grocery.model_dump())

    return
