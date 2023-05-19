// Dependencies
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

// Components
import { Providers } from "../redux/provider";
import Home from "../app/page";

// Redux
import reducer, { addItemToCart } from "../redux/features/cartSlice";

// Test IDs
import { CART_IDS, HEADER_IDS, PRODUCT_LIST_IDS } from "../constants/testIds";

describe("Cart", () => {
  it("Open Cart and close it", () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );

    // Open
    const cartBtn = screen.getByTestId(HEADER_IDS.cartBtn);
    act(() => {
      cartBtn.click();
    });
    const cart = screen.getByTestId(CART_IDS.cart);
    expect(cart).toBeInTheDocument();

    const cartCloseBtn = screen.getByTestId(CART_IDS.closeBtn);
    // Close
    act(() => {
      cartCloseBtn.click();
    });

    // Timeout of the animation
    setTimeout(() => {
      expect(cart).not.toBeInTheDocument();
    }, 200);
  });

  it("Add three items, remove one and clear the cart", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Home />
      </Providers>
    );

    // First, second and last are valid
    const addProductBtn = screen.getAllByTestId(PRODUCT_LIST_IDS.addBtns);

    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: addProductBtn[0] });
      await user.pointer({ keys: "[MouseLeft]", target: addProductBtn[4] });
      await user.pointer({ keys: "[MouseLeft]", target: addProductBtn[5] });
    });

    const cartBtn = screen.getByTestId(HEADER_IDS.cartBtn);
    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: cartBtn });
    });

    const cartItems = screen.getAllByTestId(CART_IDS.item);
    expect(cartItems.length).toBe(3);

    const removeItemBtns = screen.getAllByTestId(CART_IDS.removeItemBtn);
    expect(removeItemBtns.length).toBe(3);

    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: removeItemBtns[0] });
    });

    const updatedCartItems = screen.getAllByTestId(CART_IDS.item);
    expect(updatedCartItems.length).toBe(2);

    const clearCartBtn = screen.getByTestId(CART_IDS.clearBtn);
    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: clearCartBtn });
    });

    setTimeout(async () => {
      expect(await screen.findByTestId(CART_IDS.cart)).not.toBeInTheDocument();
    }, 200);
  });

  it("Test addItemToCart reducer with invalid and valid items", () => {
    // Invalid Item
    const invalidItem = {
      id: "productTest0",
      name: "Invalid Item",
      description: "Testing this reducer",
      valid_until: "2023-05-01",
      price: 5.05,
      qty: 1,
    };

    const emptyState = reducer(undefined, addItemToCart(invalidItem));
    expect(emptyState.items.length).toBe(0);

    const validItem = {
      id: "productTest1",
      name: "Valid Item",
      description: "Testing this reducer",
      valid_until: "2023-07-01",
      price: 5.05,
      qty: 1,
    };

    const reduxState = reducer(undefined, addItemToCart(validItem));
    expect(reduxState.items.length).toBe(1);
  });
});
