// Dependencies
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Types
import { CartState } from "../../types/Redux";

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state: CartState, action: PayloadAction<any>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedItems = [...state.items];
      if (itemIndex === -1) {
        updatedItems.push(action.payload);
      } else {
        let qty = updatedItems[itemIndex].qty + parseInt(action.payload.qty);
        // Checking if it's more than 10
        if (qty > 10) {
          qty = 10;
        }
        updatedItems[itemIndex].qty = qty;
      }
      state.items = updatedItems;
    },
    updateCartItems: (state: CartState, action: PayloadAction<any>) => {},
    clearCart: (state: CartState) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
