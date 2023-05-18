// Dependencies
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Page
import Home from "../app/page";

// Redux
import { Providers } from "../redux/provider";

describe("Home", () => {
  it("Renders header", () => {
    render(
      <Providers>
        <Home />
      </Providers>
    );

    const heading = screen.getByRole("heading", {
      name: "Marc(ket)",
    });

    expect(heading).toBeInTheDocument();
  });
});
