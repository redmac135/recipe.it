export enum GroceryAIReasonEnum {
  LOW_QUANTITY = "LOW_QUANTITY",
  USER_REQUEST = "USER_REQUEST",
  COMPLETE_RECIPE = "COMPLETE_RECIPE",
}

export type GroceryItem = {
  name: string;
  quantity: number;
  unit: string;
  is_approved: boolean;

  // if it is ai generated
  ai_reason?: GroceryAIReasonEnum;
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
  quantity: number;
  unit: string;
  expiry_date: string; // YYYY-MM-DD
};
