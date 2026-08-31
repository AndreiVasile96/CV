import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer/Footer";

describe("Footer", () => {
  it("links out to the GitHub and LinkedIn profiles", () => {
    render(<Footer />);

    const github = screen.getByRole("link", { name: /GitHub/i });
    expect(github).toHaveAttribute("href", "https://github.com/AndreiVasile96");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");

    const linkedin = screen.getByRole("link", { name: /LinkedIn/i });
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/andrei-vasile/");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("offers the CV download between the two profile links", () => {
    render(<Footer />);
    expect(screen.getByRole("button", { name: /download cv/i })).toBeInTheDocument();
  });

  it("shows the current year in the copyright line", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
