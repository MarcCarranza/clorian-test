// Dependencies
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Types
import { CartState } from "../../types/Redux";
import { Item } from "../../types/Cart";

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const getItemIndexById = (items: Item[], itemId: string) => {
  return items.findIndex((item) => item.id === itemId);
};

// TODO: PAYLOAD ACTIONS
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state: CartState, action: PayloadAction<Item>) => {
      const itemIndex = getItemIndexById(state.items, action.payload.id);
      let updatedItems = [...state.items];
      if (itemIndex === -1) {
        updatedItems.push(action.payload);
      } else {
        let qty = updatedItems[itemIndex].qty + action.payload.qty;
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
    removeItemFromCart: (
      state: CartState,
      action: PayloadAction<{ id: string }>
    ) => {
      const itemIndex = getItemIndexById(state.items, action.payload.id);
      if (itemIndex === -1) {
        console.error("Item not found");
        return;
      }
      const updatedItems = [...state.items];
      updatedItems.splice(itemIndex, 1);

      state.items = updatedItems;
    },
    clearCart: (state: CartState) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
