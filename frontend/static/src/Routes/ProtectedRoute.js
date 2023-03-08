import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;
