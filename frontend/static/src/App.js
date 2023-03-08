import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Login from "./Pages/LoginForm";
import Register from "./Pages/RegistrationForm";
import AuthenticatedHeader from "./Components/AuthenticatedHeader";
import UnauthenticatedHeader from "./Components/UnauthenticatedHeader";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          {/* <Route index element={<Albums />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
