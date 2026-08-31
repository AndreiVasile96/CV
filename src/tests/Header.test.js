import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../components/Header/Header";
import { setViewportWidth, resetViewportWidth, MOBILE_WIDTH } from "./viewport";

describe("Header (desktop)", () => {
  beforeEach(resetViewportWidth);

  it("renders every navigation item", () => {
    render(<Header refinview="landingPage" scroll={() => {}} />);

    ["About me", "Skills", "Experience", "Contact me"].forEach((label) => {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });
  });

  it("scrolls to the matching anchor when a nav item is clicked", () => {
    const scroll = jest.fn();
    render(<Header refinview="landingPage" scroll={scroll} />);

    fireEvent.click(screen.getByRole("button", { name: "Skills" }));
    expect(scroll).toHaveBeenCalledWith("#skills-title");

    fireEvent.click(screen.getByRole("button", { name: "Experience" }));
    expect(scroll).toHaveBeenCalledWith("#experience-title");
  });

  it("highlights only the section currently in view", () => {
    render(<Header refinview="skills" scroll={() => {}} />);

    expect(screen.getByRole("button", { name: "Skills" })).toHaveClass("cyan-text");
    expect(screen.getByRole("button", { name: "About me" })).not.toHaveClass("cyan-text");
  });

  it("does not emit a stray 'null' class for inactive items", () => {
    render(<Header refinview="skills" scroll={() => {}} />);

    const inactive = screen.getByRole("button", { name: "About me" });
    expect(inactive.className).not.toMatch(/null/);
    expect(inactive.className).not.toMatch(/"/);
  });
});

describe("Header (mobile)", () => {
  beforeEach(() => setViewportWidth(MOBILE_WIDTH));
  afterEach(resetViewportWidth);

  it("opens the burger menu and reveals the navigation", async () => {
    render(<Header refinview="landingPage" scroll={() => {}} />);

    expect(screen.queryByRole("heading", { name: /About me/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Burger Logo" }));

    expect(await screen.findByRole("heading", { name: "About me" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  });
});
