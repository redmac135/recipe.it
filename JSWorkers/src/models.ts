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
  ingredients_have_per_serving: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  ingredients_need_per_serving: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  max_servings: number;
  estimated_cost: number;
  steps: string[];
};

export type KitchenItem = {
  name: string;
  quantity: number;
  unit: string;
  expiry_date: string; // YYYY-MM-DD
};
