from ...backend.endpoints import get_recipes, get_kitchen_items, get_grocery_items

@worker_task(task_definition_name="get_recipes")
def get_recipes_workerFn():
    return get_recipes()

@worker_task(task_definition_name="get_kitchen_items")
def get_kitchen_items_workerFn():
    return get_kitchen_items()

@worker_task(task_definition_name="get_grocery_items")
def get_grocery_items_workerFn():
    return get_grocery_items()