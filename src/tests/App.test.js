import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { resetViewportWidth } from "./viewport";

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn(), warn: jest.fn() },
  ToastContainer: () => null
}));

describe("App", () => {
  beforeEach(resetViewportWidth);

  it("renders every section", () => {
    const { container } = render(<App />);

    ["landingPage", "about", "skills", "experience", "contact"].forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
  });

  // Section titles were demoted from <h1> to <h2>. What is left at level 1 is
  // the hero name, which the desktop layout splits across two lines and so
  // renders as two <h1> elements. Guards against a section regressing to <h1>.
  it("keeps level-1 headings to the hero title only", () => {
    render(<App />);

    const topLevel = screen.getAllByRole("heading", { level: 1 });
    expect(topLevel).toHaveLength(2);
    expect(topLevel.every((h) => h.closest("#landingPage"))).toBe(true);
  });
});
