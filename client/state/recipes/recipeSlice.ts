import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Recipe } from "@/types/models";
import { FetchStatus } from "@/types/types";
import { fetchAPI } from "@/utils/utils";

interface recipeState {
  recipeList: Recipe[];
  status: FetchStatus;
}

const initState: recipeState = {
  recipeList: [],
  status: FetchStatus.IDLE,
};

// Async thunk to fetch list
export const getRecipeList = createAsyncThunk(
  "recipe/getRecipeList",
  async () => {
    const response = await fetchAPI("recipes/list", "GET");
    const recipeList: Recipe[] = response.recipes;

    return recipeList;
  },
);

// Async thunk to execute a recipe
export const executeRecipe = createAsyncThunk(
  "recipe/executeRecipe",
  async ({ recipe, servings }: { recipe: Recipe; servings: number }) => {
    const data = JSON.stringify({ recipe, servings });
    const response = await fetchAPI("recipes/execute", "POST", data);

    return response;
  },
);

// Slice for the recipe list
const recipeSlice = createSlice({
  name: "recipe",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecipeList.pending, (state) => {
      state.status = FetchStatus.LOADING;
    });
    builder.addCase(getRecipeList.fulfilled, (state, action) => {
      state.status = FetchStatus.SUCCEEDED;
      state.recipeList = action.payload;
      console.log(state.recipeList);
    });
    builder.addCase(getRecipeList.rejected, (state) => {
      state.status = FetchStatus.FAILED;
    });
  },
});

export default recipeSlice.reducer;
