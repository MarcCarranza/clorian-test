// Dependencies
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import homeReducer from "./features/homeSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
  },
  devTools: true,
});
