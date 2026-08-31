import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../components/Footer/Footer";

describe("Footer", () => {
  it("links out to the GitHub and LinkedIn profiles", () => {
    render(<Footer scroll={() => {}} />);

    const github = screen.getByRole("link", { name: /GitHub/i });
    expect(github).toHaveAttribute("href", "https://github.com/AndreiVasile96");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");

    const linkedin = screen.getByRole("link", { name: /LinkedIn/i });
    expect(linkedin).toHaveAttribute("href", "https://www.linkedin.com/in/andrei-vasile/");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("scrolls back to the top when the arrow is clicked", () => {
    const scroll = jest.fn();
    render(<Footer scroll={scroll} />);

    fireEvent.click(screen.getByRole("button", { name: /back to top/i }));
    expect(scroll).toHaveBeenCalledWith("#landingPage");
  });

  it("shows the current year in the copyright line", () => {
    render(<Footer scroll={() => {}} />);
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
  });
});
