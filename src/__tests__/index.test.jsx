// Dependencies
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

// Page
import Home from "../app/page";

// Redux
import { Providers } from "../redux/provider";

const HEADER_IDS = {
  header: "header",
  searchBtn: "header-searchBtn",
  cartBtn: "header-cartBtn",
  searchInput: "header-searchInput",
};

const PRODUCT_LIST_IDS = {
  list: "products-list",
  items: "item-product",
  qtySelectors: "product-qtySelector",
  addBtns: "product-addBtn",
};

const CART_IDS = {
  cart: "cart",
  header: "cart-header",
  list: "cart-list",
  item: "cart-item",
  closeBtn: "cart-closeBtn",
  clearBtn: "cart-clearBtn",
};

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

  it("Search an item, change the quantity and add to cart", async () => {
    userEvent.setup();
    render(
      <Providers>
        <Home />
      </Providers>
    );

    // Search Input is rendered but maxHeight is 0
    const searchInput = screen.getByTestId(HEADER_IDS.searchInput);
    await act(async () => {
      await userEvent.type(searchInput, "flames");
    });

    // Search should give only one result
    expect(searchInput.value).toBe("flames");
    const productItems = screen.getAllByTestId(PRODUCT_LIST_IDS.items);
    expect(productItems.length).toBe(1);

    const addProductBtn = screen.getByTestId(PRODUCT_LIST_IDS.addBtns);
    await act(async () => {
      userEvent.pointer({ keys: "[MouseLeft]", target: addProductBtn });
    });

    const cartBtn = screen.getByTestId(HEADER_IDS.cartBtn);
    await act(async () => {
      userEvent.pointer({ keys: "[MouseLeft]", target: cartBtn });
    });

    // Get cart list
    const cart = await screen.getByTestId(CART_IDS.cart);
    expect(cart).toBeInTheDocument();

    const cartList = await screen.getAllByTestId(CART_IDS.item);
    expect(cartList.length).toBe(1);
  });
});
