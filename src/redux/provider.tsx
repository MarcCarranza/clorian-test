"use client";

// Dependencies
import { Provider } from "react-redux";

// Redux
import { store } from "./store";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};

export function Providers({ children }): ReactElement {
  return <Provider store={store}>{children}</Provider>;
}
