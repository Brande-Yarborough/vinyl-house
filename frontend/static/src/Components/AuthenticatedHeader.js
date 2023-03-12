import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthenticatedHeader = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="app-header" onClick={() => navigate("/")}>
          Vinyl House
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <ul className="nav d-flex align-items-center" id="main-nav">
              <li className="nav-item">
                <NavLink to="/">My Albums</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/collection/:username">My Collection</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/album-search">Search</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/my-friends">My Friends</NavLink>
              </li>
              <li className="nav-item">
                <Button onClick={logout}>Logout</Button>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default AuthenticatedHeader;
