import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Footer from "../components/Footer/Footer";

expect.extend(toHaveNoViolations);

describe("Footer accessibility", () => {
  it("has no violations", async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
