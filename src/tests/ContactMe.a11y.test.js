import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ContactMe from "../components/ContactMe/ContactMe";
import { setViewportWidth, resetViewportWidth, MOBILE_WIDTH } from "./viewport";

expect.extend(toHaveNoViolations);

const renderComponent = () => render(
  <ContactMe
    headerTextHighlightRef={React.createRef()}
    refinview="contactMe"
  />
);

describe("ContactMe accessibility", () => {
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
