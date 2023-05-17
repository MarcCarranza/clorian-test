// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Data
import fakeData from "../../data/products.json";

const initialState = {
  products: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.products = fakeData;
    },
  },
});

export const { getProducts } = homeSlice.actions;

export default homeSlice.reducer;
