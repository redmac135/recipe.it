import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { KitchenItem } from "@/types/models";
import { FetchStatus } from "@/types/types";
import { fetchAPI } from "@/utils/utils";

interface inventoryState {
  inventoryList: KitchenItem[];
  status: FetchStatus;
}

const initState: inventoryState = {
  inventoryList: [],
  status: FetchStatus.IDLE,
};

// Async thunk to fetch list
export const getInventoryList = createAsyncThunk(
  "inventory/getInventoryList",
  async () => {
    const response = await fetchAPI("kitchenitems/list", "GET");
    const inventoryList: KitchenItem[] = response.kitchenItems;

    return inventoryList;
  },
);

// Async thunk to add a kitchen item
export const addInventoryItem = createAsyncThunk(
  "inventory/addInventoryItem",
  async (item: KitchenItem) => {
    await fetchAPI("kitchenitems/add", "POST", JSON.stringify(item));

    return item;
  },
);

// Async thunk to edit a kitchen item
export const editInventoryItem = createAsyncThunk(
  "inventory/editInventoryItem",
  async (item: KitchenItem) => {
    await fetchAPI(
      `kitchenitems/edit/${item.id}`,
      "POST",
      JSON.stringify(item),
    );

    return item;
  },
);

// Slice for the inventory list
const inventorySlice = createSlice({
  name: "inventory",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInventoryList.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(getInventoryList.fulfilled, (state, action) => {
        state.inventoryList = action.payload;
        console.log(state.inventoryList);
        state.status = FetchStatus.SUCCEEDED;
      })
      .addCase(getInventoryList.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      })

      .addCase(addInventoryItem.pending, (state, action) => {
        // optimistic update
        state.inventoryList.push(action.meta.arg);
      })

      .addCase(editInventoryItem.pending, (state, action) => {
        // optimistic update
        state.inventoryList = state.inventoryList.map((item) => {
          if (item.id === action.meta.arg.id) {
            return action.meta.arg;
          }
          return item;
        });
        state.inventoryList = state.inventoryList.filter((item) => {
          return item.quantity > 0;
        });
      });
  },
});

export default inventorySlice.reducer;
