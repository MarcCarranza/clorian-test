// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Data
import fakeData from "../../data/products.json";

const initialState = {
  products: [],
  search: "",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.products = fakeData;
    },
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { getProducts, searchProduct } = homeSlice.actions;

export default homeSlice.reducer;
