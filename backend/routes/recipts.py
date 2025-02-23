from fastapi import APIRouter, File, Response, UploadFile, status
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from utils.conductor import Conductor


router = APIRouter()


class ImageProcessingRequest(BaseModel):
    image_base64: str  # Base64-encoded image data


@router.post("/upload-receipt/")
async def upload_receipt(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid image format")

    # read file
    image_bytes = await file.read()

    # encode to base64
    image_base64 = image_bytes.decode("utf-8")

    # create request payload
    request_payload = ImageProcessingRequest(image_base64=image_base64)

    input_data = {image_base64: image_base64}

    Conductor.execute_sync_workflow("receipt_upload", input_data)

    return Response(status_code=status.HTTP_200_OK)
