// Dependencies
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

// Components
import { Providers } from "../redux/provider";
import Home from "../app/page";

// Test IDs
import {
  CART_IDS,
  HEADER_IDS,
  PRODUCT_LIST_IDS,
  SORT_IDS,
} from "../constants/testIds";

describe("Product List", () => {
  it("Check if an invalid product is disabled", () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );

    const addProductBtn = screen.getAllByTestId(PRODUCT_LIST_IDS.addBtns);
    expect(addProductBtn[1]).toBeDisabled();
  });

  it("Sort by description and descending order", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Home />
      </Providers>
    );

    const sortDescBtn = screen.getByTestId(SORT_IDS.description);
    const sortOrderBtn = screen.getByTestId(SORT_IDS.order);

    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: sortDescBtn });
      await user.pointer({ keys: "[MouseLeft]", target: sortOrderBtn });
    });

    const firstItem = screen.getAllByTestId(PRODUCT_LIST_IDS.items)[0];
    expect(firstItem.querySelector("h4").textContent).toBe(
      "Frank Ocean - Blonde Vinyl (2022)"
    );
  });

  it("Change a valid product quantity to 4 and add to cart", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Home />
      </Providers>
    );

    const quantitySelect = screen.getAllByTestId(PRODUCT_LIST_IDS.qtySelectors);
    const addProductBtn = screen.getAllByTestId(PRODUCT_LIST_IDS.addBtns);
    await act(async () => {
      await user.selectOptions(quantitySelect[0], "4");
      await user.pointer({ keys: "[MouseLeft]", target: addProductBtn[0] });
    });

    const cartBtn = screen.getByTestId(HEADER_IDS.cartBtn);
    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: cartBtn });
    });

    const cartItems = screen.getAllByTestId(CART_IDS.item);
    const itemQuantity = screen.getByTestId(CART_IDS.itemQty);

    expect(cartItems.length).toBe(1);
    expect(itemQuantity.textContent).toBe("4");
  });
});
