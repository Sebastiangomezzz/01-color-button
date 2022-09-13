import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { replaceCamelCaseWithSpaces } from "./App";

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
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();
  // check that the checkbox starts unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("the button should be disabled when the checkbox is checked", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
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
});

test("should simulate possible user flows", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  //disable button --> button is gray --> enable button --> button is red
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //click button to change its color --> disable button --> button is grey --> enable button --> button is blue
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });
});

describe("Spaces before camelCase capital Letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
  });
  test("works for one inner capital letter", () => {
    expect(replaceCamelCaseWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("works for multiple inner capital letters", () => {
    expect(replaceCamelCaseWithSpaces("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
