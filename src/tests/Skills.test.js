import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Skills from "../components/Skills/Skills";
import skillsData from "../data/skills.json";
import { setViewportWidth, resetViewportWidth, MOBILE_WIDTH } from "./viewport";

const props = {
  refinview: "skills",
  headerTextHighlightRef: React.createRef(),
  scroll: jest.fn()
};

const categoryButton = (title) => screen.getByRole("button", { name: new RegExp(title, "i") });

describe.each([
  ["desktop", null],
  ["mobile", MOBILE_WIDTH]
])("Skills (%s)", (_label, width) => {
  beforeEach(() => {
    jest.clearAllMocks();
    if (width) setViewportWidth(width); else resetViewportWidth();
  });
  afterEach(resetViewportWidth);

  it("renders one toggle per category from skills.json", () => {
    render(<Skills {...props} />);

    skillsData.categories.forEach((category) => {
      expect(categoryButton(category.title)).toBeInTheDocument();
    });
  });

  it("opens the default category and reports it via aria-expanded", () => {
    render(<Skills {...props} />);

    const defaultCategory = skillsData.categories.find((c) => c.id === "devOps");
    expect(categoryButton(defaultCategory.title)).toHaveAttribute("aria-expanded", "true");

    const other = skillsData.categories.find((c) => c.id !== "devOps");
    expect(categoryButton(other.title)).toHaveAttribute("aria-expanded", "false");
  });

  it("switches the expanded category on click", () => {
    render(<Skills {...props} />);

    const target = skillsData.categories.find((c) => c.id !== "devOps");
    fireEvent.click(categoryButton(target.title));

    expect(categoryButton(target.title)).toHaveAttribute("aria-expanded", "true");
    expect(categoryButton("Dev-Sec-Ops")).toHaveAttribute("aria-expanded", "false");
  });

  it("collapses a category when its own toggle is clicked again", () => {
    render(<Skills {...props} />);

    fireEvent.click(categoryButton("Dev-Sec-Ops"));
    expect(categoryButton("Dev-Sec-Ops")).toHaveAttribute("aria-expanded", "false");
  });

  it("does not emit a stray 'null' class on unselected toggles", () => {
    render(<Skills {...props} />);

    const other = skillsData.categories.find((c) => c.id !== "devOps");
    expect(categoryButton(other.title).className).not.toMatch(/null/);
  });

  it("scrolls to the contact section from the inline call to action", () => {
    render(<Skills {...props} />);

    fireEvent.click(screen.getByRole("button", { name: /contact me/i }));
    expect(props.scroll).toHaveBeenCalledWith("#contact");
  });
});

describe("Skills data", () => {
  // Only cyan/red at 80/85/90/95 have bar styles; anything else renders an
  // invisible bar, which is silent and easy to miss when editing the JSON.
  it("only uses skill bars that have a matching CSS class", () => {
    const allowed = new Set(["cyan", "red"]);
    const levels = new Set([80, 85, 90, 95]);

    skillsData.categories.forEach((category) => {
      category.skills.forEach((skill) => {
        expect(allowed.has(skill.color)).toBe(true);
        expect(levels.has(skill.level)).toBe(true);
      });
    });
  });
});
