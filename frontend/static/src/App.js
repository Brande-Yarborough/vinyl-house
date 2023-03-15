import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/LoginForm";
import Register from "./pages/RegistrationForm";
import Footer from "./components/Footer";
import AuthenticatedHeader from "./components/AuthenticatedHeader";
import UnauthenticatedHeader from "./components/UnauthenticatedHeader";
import Albums from "./pages/Albums";
import AlbumSearch from "./pages/AlbumSearch";
import MyAlbums from "./pages/MyAlbums";
import ProfileForm from "./pages/ProfileForm";
import MyAlbumDetail from "./pages/MyAlbumDetail";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Albums />} />
          <Route path="album-search" element={<AlbumSearch />} />
          <Route path="my-albums" element={<MyAlbums />} />
          {/* <Route path="my-friends" element={<MyFriends />} /> */}
          <Route path="profile" element={<ProfileForm />} />
          <Route path="my-album-detail/:id" element={<MyAlbumDetail />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
