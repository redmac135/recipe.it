from dataclasses import dataclass
from enum import Enum


class AIReason(Enum):
    LOW_QUANTITY = "LOW_QUANTITY"
    AI_OTHER = "AI_OTHER"
    COMPLETE_RECIPE = "COMPLETE_RECIPE"


@dataclass
class GroceryItem:
    name: str
    quantity: float
    unit: str
    is_approved: bool

    ai_reason: str | None
    ai_reason_details: str | None
    estimated_cost: float | None

    recipe_name: str | None


@dataclass
class RecipeIngredient:
    name: str
    quantity: float
    unit: str


@dataclass
class Recipe:
    name: str
    is_complete: bool
    ingredients_have_per_serving: list[RecipeIngredient]
    existing_groceries_per_serving: list[RecipeIngredient] | None
    new_groceries_per_serving: list[RecipeIngredient] | None
    max_servings: int
    estimated_cost: float | None  # optional for complete recipe
    steps: list[str] | None


@dataclass
class KitchenItem:
    name: str
    quantity: float
    unit: str
    expiry_date: str
