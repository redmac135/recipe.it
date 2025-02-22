from dataclasses import asdict
from conductor.client.worker.worker_task import worker_task

from workers.lib.models import KitchenItem
from .lib.connectToDb import db


@worker_task(task_definition_name="upload_kitchenitems_direct")
def workerFn(kitchenitems: list[KitchenItem]):

    for kitchenitem in kitchenitems:
        db.collection("KitchenItems").add(asdict(kitchenitem))

    return
