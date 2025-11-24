import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders Home page heading and description", () => {
  render(<Home />);

  expect(screen.getByRole("heading", { name: /Samiah/i })).toBeInTheDocument();
  expect(screen.getByText(/Email/i)).toBeInTheDocument();
});
