import { store } from "../redux/store";
import { Item } from "./Cart";
import { Product } from "./Home";

export type AppState = {
  home: HomeState;
  cart: CartState;
};

export type HomeState = {
  products: Product[];
  search: string;
  productsQty: {
    [key: string]: string;
  };
  orderType: {
    type: string;
    sort: boolean;
  };
};

export type CartState = {
  items: Item[];
  totalPrice: number;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DispatchFunc = () => AppDispatch;
