// Dependencies
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import homeReducer from "./features/homeSlice";

export const store = configureStore({
  reducer: {
    homeReducer,
  },
  devTools: true,
});
