from conductor.client.worker.worker_task import worker_task
import os
import json
import datetime
from dotenv import load_dotenv
import requests
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv()

PERPLEXITY_API_KEY = os.environ.get("PERPLEXITY_API_KEY", "")
if not PERPLEXITY_API_KEY:
    raise ValueError("PERPLEXITY_API_KEY is not set in your environment.")


class ItemFormat(BaseModel):
    name: str
    expiry_date: str
    days_left: int


class AnswerFormat(BaseModel):
    purchase_date: str
    items: list[ItemFormat]


def process_receipt(receipt_text: str) -> dict:
    """
    Uses the Perplexity API to extract receipt data.
    Expected JSON output:
      {
        "purchase_date": "YYYY-MM-DD",
        "items": [
          {
            "name": "Item Name",
            "expiry_date": "YYYY-MM-DD",
            "days_left": <number>
          },
          ...
        ]
      }
    """
    today = datetime.date.today().isoformat()
    prompt = f"""
You are a helpful receipt data extraction assistant.
Today's date is {today}.
Given the following receipt text, please extract the purchase date and list of purchased items.
For each item, estimate an expiry date based on common shelf life assumptions for that product category, and calculate how many days remain until expiry (using today's date).
Return your answer in JSON format with these keys:
  - "purchase_date": the date of purchase (YYYY-MM-DD),
  - "items": a list of objects, each containing:
      "name": the item name,
      "expiry_date": the estimated expiry date (YYYY-MM-DD),
      "days_left": the number of days remaining until expiry.

**Make sure you ONLY INCLUDE THE JSON RESPONSE WITHOUT ANY BACKTICKS (```) and nothing else. Do not include any other text or formatting. Your response will be passed through a JSON PARSER and HAS TO PASS.**

The user will now give the receipt text.
"""

    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + PERPLEXITY_API_KEY,
    }
    payload = {
        "model": "sonar",
        "messages": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": receipt_text},
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": {"schema": AnswerFormat.model_json_schema()},
        },
    }

    response = requests.post(url, headers=headers, json=payload).json()
    content = response["choices"][0]["message"]["content"]

    try:
        data = json.loads(content)
        return data
    except Exception as e:
        print("Error parsing JSON from API response:", e)
        raise e


@worker_task(task_definition_name="parse_receipt_text")
def workerFn(receipt_text: str) -> dict:
    processed_data = process_receipt(receipt_text)
    return processed_data
