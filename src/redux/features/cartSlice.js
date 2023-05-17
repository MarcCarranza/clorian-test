// Dependencies
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updatedItems = [...state.items];
      if (itemIndex === -1) {
        updatedItems.push(action.payload);
      } else {
        let qty =
          parseInt(updatedItems[itemIndex].qty) + parseInt(action.payload.qty);
        // Checking if it's more than 10
        if (qty > 10) {
          qty = 10;
        }
        updatedItems[itemIndex].qty = qty;
      }
      state.items = updatedItems;
    },
    removeItemFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex === -1) {
        return;
      }

      const updatedItems = [...state.items];
      updatedItems.splice(itemIndex, 1);

      state.items = updatedItems;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
