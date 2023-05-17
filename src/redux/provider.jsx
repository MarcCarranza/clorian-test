"use client";

// Dependencies
import { Provider } from "react-redux";

// Redux
import { store } from "./store";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
