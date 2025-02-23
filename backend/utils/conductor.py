import requests
from dotenv import load_dotenv
import os
from fastapi.exceptions import HTTPException

load_dotenv()


class Conductor:
    CONDUCTOR_SERVER_URL = os.environ.get("CONDUCTOR_SERVER_URL")
    CONDUCTOR_AUTH_KEY = os.environ.get("CONDUCTOR_AUTH_KEY")
    CONDUCTOR_AUTH_SECRET = os.environ.get("CONDUCTOR_AUTH_SECRET")

    @staticmethod
    def get_conductor_token() -> str:
        response = requests.post(
            f"{Conductor.CONDUCTOR_SERVER_URL}/token",
            json={
                "keyId": Conductor.CONDUCTOR_AUTH_KEY,
                "keySecret": Conductor.CONDUCTOR_AUTH_SECRET,
            },
        )

        if response.status_code == 200:
            return response.json().get("token")
        else:
            raise HTTPException(
                status_code=500, detail="Failed to obtain Conductor token"
            )

    @staticmethod
    def execute_sync_workflow(name: str, input_data: dict) -> dict:
        token = Conductor.get_conductor_token()
        headers = {
            "X-Authorization": f"{token}",
            "Content-Type": "application/json",
        }

        response = requests.post(
            f"{Conductor.CONDUCTOR_SERVER_URL}/workflow/execute/{name}",
            json={"name": name, "input": input_data},
            headers=headers,
        )

        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=500, detail="Failed to execute workflow")

    @staticmethod
    def execute_async_workflow(name: str, input_data: dict) -> None:
        token = Conductor.get_conductor_token()
        headers = {
            "X-Authorization": f"{token}",
            "Content-Type": "application/json",
        }

        response = requests.post(
            f"{Conductor.CONDUCTOR_SERVER_URL}/workflow/{name}",
            json={"name": name, "input": input_data},
            headers=headers,
        )

        if response.status_code == 200:
            return
        else:
            raise HTTPException(status_code=500, detail="Failed to execute workflow")
