// Dependencies
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Page
import Home from "../app/page";

// Redux
import { Providers } from "../redux/provider";
// import cartReducer, { clearCart } from "../redux/features/cartSlice";
// import homeReducer, { searchProduct } from "../redux/features/homeSlice";

// Test IDs
import { HEADER_IDS, PRODUCT_LIST_IDS } from "../constants/testIds";

describe("Home", () => {
  it("Renders Header and List", () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );
    const header = screen.getByTestId(HEADER_IDS.header);
    const productsList = screen.getByTestId(PRODUCT_LIST_IDS.list);
    const productItems = screen.getAllByTestId(PRODUCT_LIST_IDS.items);

    expect(header).toBeInTheDocument();
    expect(productsList).toBeInTheDocument();
    expect(productItems.length).toBe(6);
  });
});
