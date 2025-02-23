import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GroceryItem } from "@/types/models";
import { FetchStatus } from "@/types/types";
import { fetchAPI } from "@/utils/utils";

interface groceryState {
  groceryList: GroceryItem[];
  status: FetchStatus;
}

const initState: groceryState = {
  groceryList: [],
  status: FetchStatus.IDLE,
};

// Async thunk to fetch list
export const getGroceryList = createAsyncThunk(
  "grocery/getGroceryList",
  async () => {
    const response = await fetchAPI("groceryitems/list", "GET");
    const groceryList: GroceryItem[] = response.groceryItems;

    return groceryList;
  },
);

// Async thunk to accept an ai suggestion
export const acceptGrocerySuggestion = createAsyncThunk(
  "grocery/acceptGrocerySuggestion",
  async (id: string) => {
    await fetchAPI(`groceryitems/accept/${id}`, "GET");

    return;
  },
);

// Async thunk to add a grocery item
export const addGroceryItem = createAsyncThunk(
  "grocery/addGroceryItem",
  async (item: Omit<GroceryItem, "id">) => {
    await fetchAPI("groceryitems/add", "POST", JSON.stringify(item));

    return item;
  },
);

// Async thunk to delete a grocery item
export const deleteGroceryItem = createAsyncThunk(
  "grocery/deleteGroceryItem",
  async (id: string) => {
    await fetchAPI(`groceryitems/delete/${id}`, "DELETE");

    return id;
  },
);

// Async thunk to edit a grocery item
export const editGroceryItem = createAsyncThunk(
  "grocery/editGroceryItem",
  async (item: GroceryItem) => {
    await fetchAPI(
      `groceryitems/edit/${item.id}`,
      "POST",
      JSON.stringify(item),
    );

    return item;
  },
);

// Slice for the grocery state.
const grocerySlice = createSlice({
  name: "grocery",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroceryList.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(getGroceryList.fulfilled, (state, action) => {
        state.groceryList = action.payload;
        console.log("GOT HERE");
        state.status = FetchStatus.SUCCEEDED;
      })
      .addCase(getGroceryList.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      })

      .addCase(addGroceryItem.pending, (state, action) => {
        // optimistic update
        const tmpItem: GroceryItem = {
          id: "tmpId",
          ...action.meta.arg,
        };
        state.groceryList.push(tmpItem);
      })

      .addCase(acceptGrocerySuggestion.pending, (state, action) => {
        // optimistic update
        state.groceryList = state.groceryList.map((item) => {
          if (item.id === action.meta.arg) {
            return { ...item, is_approved: true };
          }
          return item;
        });
      })

      .addCase(deleteGroceryItem.pending, (state, action) => {
        // optimistic update
        state.groceryList = state.groceryList.filter(
          (item) => item.id !== action.meta.arg,
        );
      })

      .addCase(editGroceryItem.pending, (state, action) => {
        // optimistic update
        state.groceryList = state.groceryList.map((item) => {
          if (item.id === action.meta.arg.id) {
            return action.meta.arg;
          }
          return item;
        });
      });
  },
});

export default grocerySlice.reducer;
