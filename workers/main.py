from conductor.client.automator.task_handler import TaskHandler
from conductor.client.configuration.configuration import Configuration
from dotenv import load_dotenv

load_dotenv()

# import all tasks
from workers import *


def main():
    configuration = Configuration()
    task_handler = TaskHandler(
        configuration=configuration, scan_for_annotated_workers=True
    )
    task_handler.start_processes()


if __name__ == "__main__":
    main()
