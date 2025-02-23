from fastapi import APIRouter, File, Response, UploadFile, status
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from utils.conductor import Conductor
import base64


router = APIRouter()


class ImageProcessingRequest(BaseModel):
    image_base64: str  # Base64-encoded image data


@router.post("/upload-receipt/")
async def upload_receipt(data: ImageProcessingRequest):
    input_data = {"image_base64": data.image_base64}

    Conductor.execute_sync_workflow("receipt_upload", input_data)

    return Response(status_code=status.HTTP_200_OK)
