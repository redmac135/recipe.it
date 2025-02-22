import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ButtonProps {
    name: string;
    category: string;
    quantity: number;
    unit: string;
    expiry_date: string; // YYYY-MM-DD
  };

// Array of Foods.
interface inventoryState {
    inventoryList : ButtonProps[]
}

// Initial State of the inventory Slice, the empty array.
const initState : inventoryState = {
    inventoryList : []
}

/* Slice for the inventory state.

    set: sets the inventory list to a new list.
    addQ : adds a quantity to the list.
    removeQ : removes a a quantity from the list.
*/

const inventorySlice = createSlice({
    name : "inventorys",
    initialState : initState,
    reducers : {
        set: (state, action : PayloadAction<ButtonProps[]>)=>{
            state.inventoryList = action.payload;
        },
        addQ : (state, action : PayloadAction<string>)=>{
            state.inventoryList = state.inventoryList.map((value)=>{
                if(value.name==action.payload){
                    return {...value, quantity : value.quantity+1}
                }
                return value;
            })
        },
        removeQ : (state, action : PayloadAction<string>)=>{
            state.inventoryList = state.inventoryList.map((value)=>{
                if(value.name==action.payload && value.quantity > 0){
                    return {...value, quantity : value.quantity-1}
                }
                return value;
            })  }

    }
})

export const {set, addQ, removeQ,} = inventorySlice.actions;
export type {inventoryState}
export default inventorySlice.reducer;