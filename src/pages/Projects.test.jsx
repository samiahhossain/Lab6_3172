import { render, screen } from "@testing-library/react";
import Projects from "./Projects";

test("renders Projects page heading", () => {
  render(<Projects />);

  expect(screen.getByRole("heading", { name: /Projects Page/i })).toBeInTheDocument();
});

test("renders project cards", () => {
  render(<Projects />);

  expect(screen.getByText(/MyTurn/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact Crawler/i)).toBeInTheDocument();
  expect(screen.getByText(/ScribbleSpace/i)).toBeInTheDocument();
});
