// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Data
import fakeData from "../../data/products.json";

const initialState = {
  products: [],
  search: "",
  productsQty: {},
  orderType: {
    type: "name",
    sort: false,
  },
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
    updateProductsQty: (state, action) => {
      const { productId, qty } = action.payload;

      const updatedProductsQty = {
        ...state.productsQty,
        [productId]: qty,
      };

      state.productsQty = updatedProductsQty;
    },
    clearProductsQty: (state) => {
      state.productsQty = {};
    },
    updateOrder: (state, action) => {
      state.orderType = {
        ...state.orderType,
        ...action.payload,
      };
    },
    resetOrder: (state) => {
      state.orderType = initialState.orderType;
    },
  },
});

export const {
  getProducts,
  searchProduct,
  updateProductsQty,
  clearProductsQty,
  updateOrder,
  resetOrder,
} = homeSlice.actions;

export default homeSlice.reducer;
