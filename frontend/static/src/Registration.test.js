import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Register from "./Pages/RegistrationForm";

describe("Register", () => {
  test("should render the form fields", () => {
    const { getByLabelText } = render(<Register />);
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/email/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
    expect(getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test("should show error message when username field is empty", () => {
    const { getByLabelText, getByTestId } = render(<Register />);
    const usernameInput = getByLabelText(/username/i);
    const submitButton = getByTestId("submit-button");

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(getByTestId("username-error")).toHaveTextContent(
      "Please enter a username"
    );
  });

  test("should show error message when email field is empty", () => {
    const { getByLabelText, getByTestId } = render(<Register />);
    const emailInput = getByLabelText(/email/i);
    const submitButton = getByTestId("submit-button");

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(getByTestId("email-error")).toHaveTextContent(
      "Please enter an email"
    );
  });

  test("should show error message when password fields are empty", () => {
    const { getByLabelText, getByTestId } = render(<Register />);
    const password1Input = getByLabelText(/password/i);
    const password2Input = getByLabelText(/confirm password/i);
    const submitButton = getByTestId("submit-button");

    fireEvent.change(password1Input, { target: { value: "" } });
    fireEvent.change(password2Input, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(getByTestId("password1-error")).toHaveTextContent(
      "Please enter a password"
    );
    expect(getByTestId("password2-error")).toHaveTextContent(
      "Please confirm your password"
    );
  });

  test("should show error message when passwords do not match", () => {
    const { getByLabelText, getByTestId } = render(<Register />);
    const password1Input = getByLabelText(/password/i);
    const password2Input = getByLabelText(/confirm password/i);
    const submitButton = getByTestId("submit-button");

    fireEvent.change(password1Input, { target: { value: "password1" } });
    fireEvent.change(password2Input, { target: { value: "password2" } });
    fireEvent.click(submitButton);

    expect(getByTestId("password2-error")).toHaveTextContent(
      "Passwords do not match"
    );
  });

  test("should submit the form when all fields are filled in correctly", () => {
    const { getByLabelText, getByTestId } = render(<Register />);
    const usernameInput = getByLabelText(/username/i);
    const emailInput = getByLabelText(/email/i);
    const password1Input = getByLabelText(/password/i);
    const password2Input = getByLabelText(/confirm password/i);
    const submitButton = getByTestId("submit-button");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "testuser@test.com" } });
    fireEvent.change(password1Input, { target: { value: "testpassword" } });
    fireEvent.change(password2Input, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    expect(getByTestId("success-message")).toHaveTextContent(
      "Registration successful!"
    );
  });
});
