import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent, debug } from "@testing-library/react";
import Register from "./Pages/RegistrationForm";
import { AuthContext } from "./context/AuthContext";

const isAuthenticated = false;
const register = () => console.log("register");

describe("Register", () => {
  test("should render the form fields", () => {
    render(
      <Router>
        <AuthContext.Provider value={{ isAuthenticated, register }}>
          <Register />
        </AuthContext.Provider>
      </Router>
    );
    // debug();

    expect(
      screen.getByRole("textbox", { name: "Username" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Email address" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^verify password$/i)).toBeInTheDocument();
  });
});
