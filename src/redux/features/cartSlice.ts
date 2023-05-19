// Dependencies
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Types
import { CartState } from "../../types/Redux";

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

// TODO: PAYLOAD ACTIONS
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

      // Set Total
      if (!state.items.length) {
        return;
      }
      const totalSum = state.items.reduce(
        (acc, curr) => acc + curr.price * curr.qty,
        0
      );
      state.totalPrice = totalSum;
    },
    updateCartItems: (state: CartState, action: PayloadAction<any>) => {},
    clearCart: (state: CartState) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
