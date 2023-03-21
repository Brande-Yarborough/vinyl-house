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
import AlbumSearch from "./pages/AlbumSearch";
import MyAlbums from "./pages/MyAlbums";
import ProfileForm from "./pages/ProfileForm";
import MyAlbumDetail from "./pages/MyAlbumDetail";
import CommentList from "./pages/Comment";
import FriendAlbums from "./pages/FriendAlbums";
import MyFriendList from "./pages/MyFriendList";
import FriendAlbumDetail from "./pages/FriendAlbumDetail";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      {isAuthenticated ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<MyAlbums />} />
          <Route path="album-search" element={<AlbumSearch />} />
          <Route path="my-friends" element={<MyFriendList />} />
          <Route
            path="friend-album-detail/:albumId"
            element={<FriendAlbumDetail />}
          />
          <Route path="friend-albums/:friendId" element={<FriendAlbums />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="my-album-detail/:id" element={<MyAlbumDetail />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
