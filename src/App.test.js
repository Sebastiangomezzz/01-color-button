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
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial contitions", () => {
  // check that the button starts enabled
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  expect(colorButton).toBeEnabled();
  // check that the checkbox starts unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('the button should be disabled when the checkbox is checked', () => { 
  render(<App />);
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  const checkbox = screen.getByRole('checkbox', {name:'Disable button'});
  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
  //here we click the checkbox
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(checkbox).toBeChecked();
  //here we click the checkbox again
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(checkbox).not.toBeChecked();
  
})