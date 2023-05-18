// Dependencies
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Page
import Home from "../app/page";

// Redux
import { Providers } from "../redux/provider";

describe("Home", () => {
  it("Renders header and list", () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );

    const heading = screen.getByTestId("header", {
      name: "Marc(ket)",
    });
    const productsList = screen.getByTestId("products-list");
    // expect(productsList).toContainElement("")

    expect(heading).toBeInTheDocument();
    expect(productsList).toBeInTheDocument();
  });
});
