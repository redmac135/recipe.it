from dataclasses import dataclass
from pydantic import BaseModel


@dataclass
class GroceryItem:
    name: str
    quantity: float
    unit: str
    is_approved: bool

    ai_reason: str
    ai_reason_details: str
    estimated_cost: float

    recipe_name: str


@dataclass
class Recipe:
    name: str
    is_complete: bool
    ingredients_have_per_serving: list[dict[str, str]]
    existing_groceries_per_serving: list[dict[str, str]]
    new_groceries_per_serving: list[dict[str, str]]
    max_servings: int
    estimated_cost: float
    steps: list[str]


@dataclass
class KitchenItem:
    name: str
    quantity: float
    unit: str
    expiry_date: str
