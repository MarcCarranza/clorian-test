// Dependencies
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Data
import fakeData from "../../data/products.json";

// Types
import { HomeState } from "../../types/Redux";

const initialState: HomeState = {
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
    getProducts: (state: HomeState) => {
      state.products = fakeData;
    },
    searchProduct: (state: HomeState, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    updateProductsQty: (
      state: HomeState,
      action: PayloadAction<{ productId: string; qty: string }>
    ) => {
      const { productId, qty } = action.payload;

      const updatedProductsQty = {
        ...state.productsQty,
        [productId]: qty,
      };

      state.productsQty = updatedProductsQty;
    },
    clearProductsQty: (state: HomeState) => {
      state.productsQty = {};
    },
    updateOrder: (
      state: HomeState,
      action: PayloadAction<{ [key: string]: string | boolean }>
    ) => {
      state.orderType = {
        ...state.orderType,
        ...action.payload,
      };
    },
    resetOrder: (state: HomeState) => {
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
