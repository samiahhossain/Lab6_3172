import { render, screen } from "@testing-library/react";
import About from "./About";

test("renders About page heading", () => {
  render(<About />);

  expect(screen.getByRole("heading", { name: /About/i })).toBeInTheDocument();
});
