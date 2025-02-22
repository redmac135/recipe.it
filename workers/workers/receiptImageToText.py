from conductor.client.worker.worker_task import worker_task
import cv2
import numpy as np
from PIL import Image
from io import BytesIO
import pytesseract
import base64


def preprocess_image(image: Image.Image) -> np.ndarray:
    """Convert PIL image to grayscale and apply preprocessing"""
    image = image.convert("L")  # Convert to grayscale
    image_np = np.array(image)
    image_np = cv2.threshold(image_np, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[
        1
    ]  # Thresholding
    return image_np


@worker_task(task_definition_name="receipt_image_to_text")
def workerFn(image_base64: str) -> dict[str, str | bool]:
    if not image_base64:
        raise ValueError("Image data is required")

    image_bytes = base64.b64decode(image_base64)
    image = Image.open(BytesIO(image_bytes))

    # Preprocess and extract text
    processed_image = preprocess_image(image)

    languages = "eng+chi_tra"
    text = pytesseract.image_to_string(processed_image, lang=languages)

    total_found = False

    if "SUBTOTAL" in text:
        text = text.split("SUBTOTAL")[0]
        total_found = True
    elif "TOTAL" in text:
        text = text.split("TOTAL")[0]
        total_found = True

    return {"extracted_text": text, "total_found": total_found}
