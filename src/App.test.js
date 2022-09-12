import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("the button should have the correct initial color", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});
//test("the button should have the correct initial text", () => {});// TESTED ABOVE.
test("the button turns blue when clicked", () => {
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
  expect(colorButton.textContent).toBe('Change to red');
});
