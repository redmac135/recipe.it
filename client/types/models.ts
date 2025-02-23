export enum GroceryAIReasonEnum {
  LOW_QUANTITY = "LOW_QUANTITY",
  AI_OTHER = "AI_OTHER",
  COMPLETE_RECIPE = "COMPLETE_RECIPE",
}

export enum KitchenItemCategoryEnum {
  PANTRY = "PANTRY",
  FRIDGE = "FRIDGE",
  FREEZER = "FREEZER",
}

export type GroceryItem = {
  name: string;
  quantity: number;
  unit: string;
  is_approved: boolean;

  // if it is ai generated
  ai_reason?: GroceryAIReasonEnum;
  ai_reason_details?: string;
  estimated_cost?: number;

  // if it to complete recipe
  recipe_name?: string;
};

export type Recipe = {
  name: string;
  is_complete: boolean;
  ingredients_have_per_serving: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  existing_groceries_per_serving?: {
    // for incomplete recipe
    name: string;
    quantity: number;
    unit: string;
  }[];
  new_groceries_per_serving?: {
    // for incomplete recipe
    name: string;
    quantity: number;
    unit: string;
  }[];
  max_servings: number;
  estimated_cost?: number; // for incomplete recipe
  steps?: string[]; // for complete recipe
};

export type KitchenItem = {
  name: string;
  category: KitchenItemCategoryEnum;
  quantity: number;
  unit: string;
  expiry_date: string; // YYYY-MM-DD
};
