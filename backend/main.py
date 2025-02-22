from fastapi import FastAPI, UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import File
from pydantic import BaseModel
import requests

# dotenv
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()


class ImageProcessingRequest(BaseModel):
    image_base64: str  # Base64-encoded image data


def get_conductor_token() -> str:
    response = requests.post(
        f"{os.environ.get('CONDUCTOR_SERVER_URL')}/token",
        json={
            "key": os.environ.get("CONDUCTOR_AUTH_KEY"),
            "secret": os.environ.get("CONDUCTOR_AUTH_SECRET"),
        },
    )
    if response.status_code == 200:
        return response.json().get("token")
    else:
        raise HTTPException(status_code=500, detail="Failed to obtain Conductor token")


@app.post("/upload-receipt/")
async def upload_receipt(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid image format")

    # read file
    image_bytes = await file.read()

    # encode to base64
    image_base64 = image_bytes.decode("utf-8")

    # create request payload
    request_payload = ImageProcessingRequest(image_base64=image_base64)

    token = get_conductor_token()
    headers = {"Authorization": f"Bearer {token}"}

    input_data = {"image_base64": request_payload.image_base64}
    response = requests.post(
        f"{os.environ.get('CONDUCTOR_SERVER_URL')}/workflow/receipt_upload",
        json={
            "name": "receipt_upload",
            "input": input_data,
        },
        headers=headers,
    )

    print(response.json())

    return {"message": "Image uploaded successfully"}
