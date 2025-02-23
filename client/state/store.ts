import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./inventory/inventorySlice";
import groceryReducer from "./groceryList/grocerySlice";
import recipeReducer from "./recipes/recipeSlice";

// Create the Redux store, with the reducers for the residence (used in account info screen for selecting favourite cafeterias)
// and preset slices (used to select the "temporary menu" of food items when cafeteria staff are updating the menu).
export const store = configureStore({
  reducer: {
    inventoryList: inventoryReducer,
    groceryList: groceryReducer,
    recipeList: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
