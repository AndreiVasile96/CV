import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Experience from "../components/Experience/Experience";
import { setViewportWidth, resetViewportWidth, MOBILE_WIDTH } from "./viewport";

expect.extend(toHaveNoViolations);

const renderComponent = () => render(
  <Experience
    headerTextHighlightRef={React.createRef()}
    refinview="experience"
  />
);

describe("Experience accessibility", () => {
  afterEach(resetViewportWidth);

  it("has no violations on desktop", async () => {
    resetViewportWidth();
    const { container } = renderComponent();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations on mobile", async () => {
    setViewportWidth(MOBILE_WIDTH);
    const { container } = renderComponent();
    expect(await axe(container)).toHaveNoViolations();
  });
});
