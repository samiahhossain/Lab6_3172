import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer with site name and current year", () => {
  render(<Footer />);

  expect(screen.getByText(/Samiah Hossain/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(`${new Date().getFullYear()}`))).toBeInTheDocument();
});
