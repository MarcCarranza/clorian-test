// Dependencies
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

// Components
import { Providers } from "../redux/provider";
import Home from "../app/page";

// Test IDs
import { HEADER_IDS, PRODUCT_LIST_IDS } from "../constants/testIds";

describe("Header", () => {
  it("Search an item and clear the search", async () => {
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
});
