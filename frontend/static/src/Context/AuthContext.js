import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../utils/utilities";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  const login = async (user) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    setIsAuthenticated(true);
    navigate("/");
  };

  const register = async (user) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    setIsAuthenticated(true);
    navigate("/profile");
  };

  const logout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    await fetch("/dj-rest-auth/logout/", options).catch(handleError);
    Cookies.remove("Authorization");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/dj-rest-auth/user/");

      if (!response.ok) {
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
    };

    getUser();
  }, []);

  if (isAuthenticated === null) {
    return <div>Is loading ...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
