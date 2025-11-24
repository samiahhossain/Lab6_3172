import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

test("renders 404 page and back link", () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );

  expect(screen.getByRole("heading", { name: /404 — Page Not Found/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Back to Home/i })).toBeInTheDocument();
});
