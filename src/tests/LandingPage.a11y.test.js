import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import LandingPage from "../components/LandingPage/LandingPage";
import { setViewportWidth, resetViewportWidth, MOBILE_WIDTH } from "./viewport";

expect.extend(toHaveNoViolations);

const renderComponent = () => render(
  <LandingPage
    headerTextHighlightRef={React.createRef()}
    scroll={() => {}}
    refinview="landingPage"
  />
);

describe("LandingPage accessibility", () => {
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
