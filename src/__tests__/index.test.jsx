// Dependencies
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

// Page
import Home from "../app/page";

// Redux
import { Providers } from "../redux/provider";
// import cartReducer, { clearCart } from "../redux/features/cartSlice";
// import homeReducer, { searchProduct } from "../redux/features/homeSlice";

const HEADER_IDS = {
  header: "header",
  searchBtn: "header-searchBtn",
  cartBtn: "header-cartBtn",
  searchInput: "header-searchInput",
  searchClear: "header-searchClear",
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
  itemQty: "cart-itemQty",
  closeBtn: "cart-closeBtn",
  clearBtn: "cart-clearBtn",
  totalPrice: "cart-totalPrice",
};

const SORT_IDS = {
  name: "sort-nameBtn",
  description: "sort-descBtn",
  order: "sort-orderBtn",
};

describe("App", () => {
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

  it("Check if an invalid product is disabled", () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Home />
      </Providers>
    );

    const addProductBtn = screen.getAllByTestId(PRODUCT_LIST_IDS.addBtns);
    expect(addProductBtn[1]).toBeDisabled();
  });

  it("Search an item and clear", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Home />
      </Providers>
    );

    // Search Input is rendered but maxHeight is 0
    const searchInput = screen.getByTestId(HEADER_IDS.searchInput);
    await act(async () => {
      await user.type(searchInput, "flames");
    });

    // Search should give only one result
    expect(searchInput.value).toBe("flames");
    const productItems = screen.getAllByTestId(PRODUCT_LIST_IDS.items);
    expect(productItems.length).toBe(1);

    // Clearing
    const searchClearBtn = screen.getByTestId(HEADER_IDS.searchClear);
    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: searchClearBtn });
    });

    const updatedProductItems = screen.getAllByTestId(PRODUCT_LIST_IDS.items);
    expect(updatedProductItems.length).toBe(6);
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

  it("Add two items and clear the cart", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <Home />
      </Providers>
    );

    const addProductBtn = screen.getAllByTestId(PRODUCT_LIST_IDS.addBtns);
    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: addProductBtn[0] });
      await user.pointer({ keys: "[MouseLeft]", target: addProductBtn[3] });
    });

    const cartBtn = screen.getByTestId(HEADER_IDS.cartBtn);
    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: cartBtn });
    });

    const cartItems = screen.getAllByTestId(CART_IDS.item);
    expect(cartItems.length).toBe(2);

    const clearCartBtn = screen.getByTestId(CART_IDS.clearBtn);
    await act(async () => {
      await user.pointer({ keys: "[MouseLeft]", target: clearCartBtn });
    });

    setTimeout(async () => {
      expect(await screen.findByTestId(CART_IDS.cart)).not.toBeInTheDocument();
    }, 200);
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
});
