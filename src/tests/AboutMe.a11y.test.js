import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import AboutMe from "../components/AboutMe/AboutMe";
import { setViewportWidth, resetViewportWidth, MOBILE_WIDTH } from "./viewport";

expect.extend(toHaveNoViolations);

const renderComponent = () => render(
  <AboutMe
    aboutMeRef={React.createRef()}
    refinview="aboutMe"
  />
);

describe("AboutMe accessibility", () => {
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
